#!/usr/bin/env node
/**
 * Clean up and (re)seed the LIVE demo comment threads that render inside the
 * embedded demo apps surfaced on the marketing pages (/comments, /recording,
 * /review-agents, /self-hosting, /for/compliance, /libraries/tiptap,
 * /use-case/video-editor, /integrations).
 *
 * IMPORTANT — this script does NOT touch Sanity. Every other scripts/seed-*.mjs
 * writes page content to the Sanity CMS (projectId fk9mezqa). The junk comment
 * bodies flagged by the review ("csdf", "asdsad", "asdsd", raw "{{userId}}"
 * template strings shown instead of display names, the literal "Custom Status"
 * label, and the "Hello" test comment) are NOT Sanity data and are NOT in this
 * repo's source. They are live Velt comment annotations stored in the Velt
 * project that powers the demo apps embedded via <iframe> on those pages (e.g.
 * https://velt-tiptap-crdt-demo.vercel.app, https://velt-video-editor-app-demo.vercel.app).
 *
 * This script talks to the Velt Comments REST API (v2) to:
 *   1. fetch the comment annotations for each configured demo document,
 *   2. delete the junk comments / annotations it finds, and
 *   3. add curated, professional replacement threads with real display names.
 *
 * Required env vars (read exactly like the sibling scripts read SANITY_API_TOKEN;
 * never hardcode secrets):
 *   VELT_API_KEY     — the demo project's Velt API key   (header x-velt-api-key)
 *   VELT_AUTH_TOKEN  — a Velt auth token for that project (header x-velt-auth-token)
 *   VELT_ORG_ID      — the organizationId of the demo project
 *
 * Per-demo document IDs (these belong to the demo apps' Velt project, not this
 * repo — read them from the Velt console or the demo app source, then export
 * them). Any target whose document-id env var is unset is skipped with a notice:
 *   VELT_DOC_COMMENTS, VELT_DOC_RECORDING, VELT_DOC_REVIEW_AGENTS,
 *   VELT_DOC_SELF_HOSTING, VELT_DOC_COMPLIANCE, VELT_DOC_TIPTAP,
 *   VELT_DOC_VIDEO_EDITOR, VELT_DOC_INTEGRATIONS
 *
 * Optional:
 *   VELT_API_BASE    — override the API base (default https://api.velt.dev/v2)
 *   DRY_RUN=1        — preview the planned deletes/adds without writing anything
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-demo-comments.mjs
 *   # preview-only:
 *   DRY_RUN=1 node --env-file=.env.local scripts/seed-demo-comments.mjs
 *
 * Idempotent: re-runs delete any junk again and re-add the same curated threads.
 * The curated bodies never match the junk patterns, so they are not re-deleted.
 */

const DRY_RUN = process.env.DRY_RUN === "1";

const API_BASE = process.env.VELT_API_BASE ?? "https://api.velt.dev/v2";
const API_KEY = process.env.VELT_API_KEY;
const AUTH_TOKEN = process.env.VELT_AUTH_TOKEN;
const ORG_ID = process.env.VELT_ORG_ID;

const HEADER_API_KEY = "x-velt-api-key";
const HEADER_AUTH_TOKEN = "x-velt-auth-token";
const CONTENT_TYPE_JSON = "application/json";

const ENDPOINT_GET = `${API_BASE}/commentannotations/get`;
const ENDPOINT_ADD = `${API_BASE}/commentannotations/add`;
const ENDPOINT_DELETE_COMMENTS = `${API_BASE}/commentannotations/comments/delete`;

if (!DRY_RUN && (!API_KEY || !AUTH_TOKEN || !ORG_ID)) {
  console.error(
    "Set VELT_API_KEY, VELT_AUTH_TOKEN and VELT_ORG_ID env vars, or DRY_RUN=1 to preview without writing.",
  );
  process.exit(1);
}

/**
 * Curated demo personas. Human-readable display names replace the raw
 * "{{userId}}" template strings the review flagged. Kept consistent with the
 * personas already used in the simulated demos elsewhere in the repo
 * (Maya, Sarah, Ethan Veres, Kim, etc.).
 * @type {Record<string, { userId: string; name: string; email: string; role: string }>}
 */
const PERSONAS = {
  maya: {
    userId: "maya-chen",
    name: "Maya Chen",
    email: "maya.chen@example.com",
    role: "Product Manager",
  },
  sarah: {
    userId: "sarah-okoro",
    name: "Sarah Okoro",
    email: "sarah.okoro@example.com",
    role: "Legal Counsel",
  },
  ethan: {
    userId: "ethan-veres",
    name: "Ethan Veres",
    email: "ethan.veres@example.com",
    role: "CTO",
  },
  diego: {
    userId: "diego-alvarez",
    name: "Diego Alvarez",
    email: "diego.alvarez@example.com",
    role: "Software Engineer",
  },
  kim: {
    userId: "kim-park",
    name: "Kim Park",
    email: "kim.park@example.com",
    role: "Design Lead",
  },
  marcus: {
    userId: "marcus-rogers",
    name: "Marcus Rogers",
    email: "marcus.rogers@example.com",
    role: "Account Executive",
  },
};

// Human-readable status label that replaces the literal "Custom Status" filler
// shown in the Tiptap demo.
const TIPTAP_STATUS = { id: "IN_REVIEW", name: "In Review" };

/**
 * The demo documents to clean up, one per flagged page. `documentIdEnv` names
 * the env var holding that demo's Velt documentId (these IDs live in the demo
 * apps' Velt project, not this repo). `replacements` are the curated threads
 * written after the junk is removed. Each replacement becomes one new comment
 * annotation anchored at page level (location only) unless a target overrides it.
 * @type {Array<{
 *   key: string;
 *   label: string;
 *   documentIdEnv: string;
 *   locationName: string;
 *   replacements: Array<{ persona: keyof typeof PERSONAS; text: string; status?: { id: string; name: string } }>;
 * }>}
 */
const DEMO_TARGETS = [
  {
    key: "comments",
    label: "/comments",
    documentIdEnv: "VELT_DOC_COMMENTS",
    locationName: "Sales deck — pricing",
    replacements: [
      { persona: "maya", text: "This pricing line needs a liability cap before we send it to the client." },
      { persona: "sarah", text: "Confirmed the Q3 number — approving this thread." },
      { persona: "diego", text: "Anchored the comment to the exact clause so it survives edits." },
    ],
  },
  {
    key: "recording",
    label: "/recording",
    documentIdEnv: "VELT_DOC_RECORDING",
    locationName: "Q3 forecast — review",
    replacements: [
      { persona: "kim", text: "Recorded a 40-second walkthrough explaining the variance on this cell." },
      { persona: "maya", text: "Thanks — the transcription makes it easy to skim. Resolving." },
    ],
  },
  {
    key: "review-agents",
    label: "/review-agents",
    documentIdEnv: "VELT_DOC_REVIEW_AGENTS",
    locationName: "Contract — clause 7",
    replacements: [
      { persona: "diego", text: "The review agent flagged a missing liability cap here. Routing to legal." },
      { persona: "sarah", text: "Good catch — adding the cap now and approving the finding." },
    ],
  },
  {
    key: "self-hosting",
    label: "/self-hosting",
    documentIdEnv: "VELT_DOC_SELF_HOSTING",
    locationName: "Data residency — config",
    replacements: [
      { persona: "diego", text: "Comment content stays on our infrastructure via the self-host data provider." },
      { persona: "maya", text: "Confirmed only minimal identifiers reach Velt. Looks good for the audit." },
    ],
  },
  {
    key: "compliance",
    label: "/for/compliance",
    documentIdEnv: "VELT_DOC_COMPLIANCE",
    locationName: "Audit trail — filing",
    replacements: [
      { persona: "sarah", text: "Every change here is on the record with who, what, and when." },
      { persona: "marcus", text: "Shared the audit export with the reviewer — closing this out." },
    ],
  },
  {
    key: "tiptap",
    label: "/libraries/tiptap",
    documentIdEnv: "VELT_DOC_TIPTAP",
    locationName: "Document — draft",
    replacements: [
      // Replaces the "Hello" test comment with real product feedback and sets a
      // meaningful status label instead of the literal "Custom Status" filler.
      { persona: "maya", text: "Can we tighten this paragraph before the client review?", status: TIPTAP_STATUS },
      { persona: "ethan", text: "Anchored the thread to the second clause — it rebases correctly as we edit." },
    ],
  },
  {
    key: "video-editor",
    label: "/use-case/video-editor",
    documentIdEnv: "VELT_DOC_VIDEO_EDITOR",
    locationName: "Timeline — 00:42",
    replacements: [
      { persona: "kim", text: "Trim the first ten seconds and re-export — the intro runs long." },
      { persona: "marcus", text: "Looks great after the trim. Approving for the client." },
    ],
  },
  {
    key: "integrations",
    label: "/integrations",
    documentIdEnv: "VELT_DOC_INTEGRATIONS",
    locationName: "Workflow — connect",
    replacements: [
      { persona: "diego", text: "Wired the webhook so each comment event syncs to our backend." },
      { persona: "maya", text: "Verified the payload in staging. Ready to ship the integration." },
    ],
  },
];

// Exact junk comment bodies (compared case-insensitively after trimming).
const JUNK_BODIES = new Set(["csdf", "asdsad", "asdsd", "hello"]);

// "{{...}}" template strings, e.g. {{CgluQ555v9T8hjz2vw3XMm5Ry1z2}}.
const TEMPLATE_RE = /\{\{[^}]*\}\}/;

// Opaque, space-free identifiers (>= 20 chars) that look like raw user IDs.
const RAW_ID_RE = /^[A-Za-z0-9_-]{20,}$/;

/**
 * Strip HTML tags so a commentHtml body can be compared against the plain-text
 * junk patterns.
 * @param {string} value Raw string that may contain HTML.
 * @returns {string} The de-tagged, trimmed string.
 */
function stripHtml(value) {
  try {
    return String(value ?? "")
      .replace(/<[^>]*>/g, "")
      .trim();
  } catch (error) {
    console.error("stripHtml failed:", error);
    return "";
  }
}

/**
 * Decide whether a comment body is junk (keyboard mashing, a "{{...}}" template
 * string, or empty).
 * @param {{ commentText?: string; commentHtml?: string }} comment A Velt comment.
 * @returns {boolean} True when the body should be removed.
 */
function isJunkBody(comment) {
  try {
    const raw = comment?.commentText ?? stripHtml(comment?.commentHtml);
    const body = String(raw ?? "").trim();
    if (!body) return true;
    if (TEMPLATE_RE.test(body)) return true;
    return JUNK_BODIES.has(body.toLowerCase());
  } catch (error) {
    console.error("isJunkBody failed:", error);
    return false;
  }
}

/**
 * Decide whether an author identity is a raw, unrendered identifier rather than
 * a human-readable display name.
 * @param {{ name?: string; userId?: string }} [from] The comment author block.
 * @returns {boolean} True when the author renders as a raw id / template string.
 */
function isRawAuthor(from) {
  try {
    const name = String(from?.name ?? "").trim();
    if (!name) return true;
    if (TEMPLATE_RE.test(name)) return true;
    // A display name equal to the userId, or an opaque token with no spaces.
    if (from?.userId && name === String(from.userId)) return true;
    return RAW_ID_RE.test(name);
  } catch (error) {
    console.error("isRawAuthor failed:", error);
    return false;
  }
}

/**
 * Resolve the documentId for a target from its env var.
 * @param {{ documentIdEnv: string }} target A DEMO_TARGETS entry.
 * @returns {string | undefined} The configured documentId, if any.
 */
function resolveDocumentId(target) {
  try {
    const value = process.env[target?.documentIdEnv];
    return value && value.trim() ? value.trim() : undefined;
  } catch (error) {
    console.error("resolveDocumentId failed:", error);
    return undefined;
  }
}

/**
 * POST a JSON body to a Velt REST endpoint with the auth headers.
 * @param {string} url The full endpoint URL.
 * @param {object} data The `data` payload (wrapped as `{ data }`).
 * @returns {Promise<object>} The parsed JSON response.
 */
async function veltPost(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": CONTENT_TYPE_JSON,
        [HEADER_API_KEY]: API_KEY,
        [HEADER_AUTH_TOKEN]: AUTH_TOKEN,
      },
      body: JSON.stringify({ data }),
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(
        `${url} -> ${response.status} ${response.statusText}: ${JSON.stringify(json)}`,
      );
    }
    return json;
  } catch (error) {
    console.error("veltPost failed:", error);
    throw error;
  }
}

/**
 * Fetch all comment annotations for a document.
 * @param {string} documentId The Velt documentId.
 * @returns {Promise<Array<object>>} The annotations array (empty on error).
 */
async function getAnnotations(documentId) {
  try {
    const json = await veltPost(ENDPOINT_GET, {
      organizationId: ORG_ID,
      documentIds: [documentId],
    });
    const data = json?.result?.data;
    if (Array.isArray(data)) {
      // v2 groups by documentId; flatten any nested shape defensively.
      return data
        .flatMap((entry) => entry?.annotations ?? entry)
        .filter((entry) => entry && entry.annotationId);
    }
    return [];
  } catch (error) {
    console.error(`getAnnotations failed for ${documentId}:`, error);
    return [];
  }
}

/**
 * Delete a set of comments from a single annotation.
 * @param {string} documentId The Velt documentId.
 * @param {string} annotationId The annotation that owns the comments.
 * @param {Array<number>} commentIds The comment ids to remove.
 * @returns {Promise<void>} Resolves when the delete request completes.
 */
async function deleteComments(documentId, annotationId, commentIds) {
  try {
    if (!Array.isArray(commentIds) || commentIds.length === 0) return;
    if (DRY_RUN) {
      console.log(
        `  [DRY_RUN] would delete comments ${commentIds.join(", ")} from annotation ${annotationId}`,
      );
      return;
    }
    await veltPost(ENDPOINT_DELETE_COMMENTS, {
      organizationId: ORG_ID,
      documentId,
      annotationId,
      commentIds,
    });
    console.log(
      `  ✓ deleted comments ${commentIds.join(", ")} from annotation ${annotationId}`,
    );
  } catch (error) {
    console.error("deleteComments failed:", error);
  }
}

/**
 * Build a curated comment annotation payload from a replacement spec.
 * @param {{ persona: string; text: string; status?: { id: string; name: string } }} item Replacement spec.
 * @param {string} locationName Human-readable anchor label.
 * @returns {object} A commentAnnotations[] entry for the add API.
 */
function buildAnnotation(item, locationName) {
  try {
    const persona = PERSONAS[item?.persona];
    const from = {
      userId: persona?.userId,
      name: persona?.name,
      email: persona?.email,
    };
    const annotation = {
      location: {
        id: `${item?.persona}-${Math.random().toString(36).slice(2, 8)}`,
        locationName,
      },
      commentData: [
        {
          commentText: item?.text,
          commentHtml: `<p>${item?.text}</p>`,
          from,
        },
      ],
    };
    if (item?.status) annotation.status = item.status;
    return annotation;
  } catch (error) {
    console.error("buildAnnotation failed:", error);
    return null;
  }
}

/**
 * Add the curated replacement threads for a target document.
 * @param {string} documentId The Velt documentId.
 * @param {{ replacements: Array<object>; locationName: string }} target A DEMO_TARGETS entry.
 * @returns {Promise<void>} Resolves when the add request completes.
 */
async function addReplacements(documentId, target) {
  try {
    const commentAnnotations = (target?.replacements ?? [])
      .map((item) => buildAnnotation(item, target?.locationName))
      .filter(Boolean);
    if (commentAnnotations.length === 0) return;
    if (DRY_RUN) {
      console.log(
        `  [DRY_RUN] would add ${commentAnnotations.length} curated thread(s):`,
      );
      for (const annotation of commentAnnotations) {
        const comment = annotation?.commentData?.[0];
        console.log(`    • ${comment?.from?.name}: ${comment?.commentText}`);
      }
      return;
    }
    await veltPost(ENDPOINT_ADD, {
      organizationId: ORG_ID,
      documentId,
      commentAnnotations,
    });
    console.log(`  ✓ added ${commentAnnotations.length} curated thread(s)`);
  } catch (error) {
    console.error("addReplacements failed:", error);
  }
}

/**
 * Clean and reseed a single demo document: delete junk comments, then add the
 * curated replacement threads.
 * @param {object} target A DEMO_TARGETS entry.
 * @returns {Promise<void>} Resolves when the target is processed.
 */
async function processTarget(target) {
  try {
    const documentId = resolveDocumentId(target);
    console.log(`\n${target.label} (${target.documentIdEnv})`);
    if (!documentId) {
      console.log(
        `  – skipped: ${target.documentIdEnv} not set (provide the demo project's documentId).`,
      );
      // Still preview the curated content in DRY_RUN so reviewers can read it.
      if (DRY_RUN) await addReplacements("(unset)", target);
      return;
    }

    const annotations = DRY_RUN ? [] : await getAnnotations(documentId);
    for (const annotation of annotations) {
      const comments = Array.isArray(annotation?.comments)
        ? annotation.comments
        : [];
      const authorIsRaw = isRawAuthor(annotation?.from);
      const junkComments = comments.filter(
        (comment) => isJunkBody(comment) || isRawAuthor(comment?.from),
      );
      // If every comment is junk (or the whole annotation has a raw author and
      // no salvageable comment), drop all comments in the annotation.
      const dropAll =
        authorIsRaw && junkComments.length === comments.length;
      const idsToDelete = (dropAll ? comments : junkComments)
        .map((comment) => comment?.commentId)
        .filter((commentId) => commentId !== undefined && commentId !== null);
      if (idsToDelete.length > 0) {
        await deleteComments(documentId, annotation.annotationId, idsToDelete);
      }
    }

    await addReplacements(documentId, target);
  } catch (error) {
    console.error(`processTarget failed for ${target?.key}:`, error);
  }
}

/**
 * Entry point: process every configured demo target.
 * @returns {Promise<void>} Resolves when all targets are processed.
 */
async function main() {
  try {
    console.log(
      DRY_RUN
        ? "DRY RUN — previewing demo-comment cleanup (no writes)."
        : `Cleaning demo comments via ${API_BASE} for org ${ORG_ID}.`,
    );
    for (const target of DEMO_TARGETS) {
      await processTarget(target);
    }
    console.log("\nDone.");
  } catch (error) {
    console.error("main failed:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
