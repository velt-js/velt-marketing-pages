#!/usr/bin/env node
/**
 * Fix the CMS-owned SEO / accessibility findings that cannot be fixed in repo
 * code, because the affected /for/[slug], /use-case/[slug], and
 * /libraries/[slug] pages render their hero text, body, and
 * metaTitle/metaDescription straight from Sanity documents.
 *
 * Scope (one Sanity document per finding):
 *   - libraryPage  yjs           : metaTitle 36 -> 50-60, metaDescription 67 -> 120-160
 *   - libraryPageV2 react-flow   : metaDescription (null, falls back to the 274-char
 *                                  heroSecondary) -> explicit 120-160 description
 *   - solutionPageV1 legal       : metaTitle 45 -> 50-60
 *   - solutionPageV1 sales-...   : remove/replace any stray "csdf" nonsense text
 *   - useCasePage form-builder   : metaTitle -> proper 50-60 char title
 *   - solutionPageV1 ai-native-saas : confirm the doc exists and is PUBLISHED
 *
 * Every write is guarded: a field is only patched when the current value still
 * matches the expected "from" value (or the new target, treated as a no-op), so
 * a re-run — or independently drifted copy — is never clobbered. The script is
 * idempotent and uses .patch().set() only (no createOrReplace; no document here
 * is missing).
 *
 * Usage:
 *   DRY_RUN=1 node --env-file=.env.local scripts/fix-cms-seo-a11y.mjs   # preview
 *   node --env-file=.env.local scripts/fix-cms-seo-a11y.mjs              # apply
 */

import { createClient } from "@sanity/client";

// ---- Shared connection constants (repeated across every seed script) -------
const PROJECT_ID = "fk9mezqa";
const DATASET = "production";
const API_VERSION = "2024-01-01";

// ---- Field name constants (avoid repeated string literals) -----------------
const META_TITLE = "metaTitle";
const META_DESCRIPTION = "metaDescription";
const NONSENSE_TOKEN = "csdf";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;

if (!token && !DRY_RUN) {
  console.error(
    "Set SANITY_API_TOKEN env var (e.g. via --env-file=.env.local), or DRY_RUN=1 to preview without writing.",
  );
  process.exit(1);
}

// A token is also required to READ in DRY_RUN (this dataset is not public-read
// for the projections we use), so fail clearly if it is missing entirely.
if (!token) {
  console.error("SANITY_API_TOKEN is required even for DRY_RUN (read access).");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token,
  useCdn: false,
  // "raw" so we see published docs (and could detect drafts) deterministically.
  perspective: "raw",
});

/**
 * Single-field patch definition. The target doc is addressed either by an
 * explicit `docId` or by a `type` + `slug` lookup.
 * @typedef {object} FieldPatch
 * @property {string} label Human-readable label for logs.
 * @property {string} [docId] Explicit Sanity document _id.
 * @property {string} [type] Document _type (when resolving by slug).
 * @property {string} [slug] slug.current (when resolving by type+slug).
 * @property {string} field Field name to patch (top-level).
 * @property {string|null} expectedFrom Current value we expect (null = unset).
 * @property {string} to New value to write.
 */

/** @type {FieldPatch[]} */
const FIELD_PATCHES = [
  {
    label: "/libraries/yjs · metaTitle",
    docId: "libraryPage-yjs",
    field: META_TITLE,
    expectedFrom: "Collaboration Toolkit for YJS | Velt",
    to: "Yjs Collaboration Toolkit & Realtime Sync SDK | Velt",
  },
  {
    label: "/libraries/yjs · metaDescription",
    docId: "libraryPage-yjs",
    field: META_DESCRIPTION,
    expectedFrom:
      "Run Yjs apps without building or operating realtime infrastructure.",
    to: "Run Yjs apps without building or operating realtime infrastructure. Velt manages sync, persistence, and connections so your editor stays reliable at scale.",
  },
  {
    // The v2 doc wins this slug (v2-then-v1 lookup). metaDescription is unset,
    // so the page falls back to the 274-char heroSecondary as its description.
    // Setting an explicit, tighter description fixes the SEO finding without
    // touching the on-page hero copy.
    label: "/libraries/react-flow · metaDescription (libraryPageV2)",
    docId: "libraryPageV2-react-flow",
    field: META_DESCRIPTION,
    expectedFrom: null,
    to: "Add comments, co-editing, and live presence to your React Flow canvas. Threads stay pinned to nodes as the graph moves, for your users and AI agents.",
  },
  {
    label: "/for/legal · metaTitle",
    docId: "solutionPageV1-legal",
    field: META_TITLE,
    expectedFrom: "Review and approval for legal software | Velt",
    to: "Review, redlines, and approval for legal software | Velt",
  },
  {
    label: "/use-case/form-builder · metaTitle",
    type: "useCasePage",
    slug: "form-builder",
    field: META_TITLE,
    // Live value is already "Velt for Form Builder | Velt" (28 chars) — the
    // stale "Velt Home Page - Git with Miri" reported earlier was fixed before
    // this run; we accept either as the "from" so the patch still applies.
    expectedFrom: "Velt for Form Builder | Velt",
    to: "Collaborative Form Builder SDK: Comments & Approvals | Velt",
  },
];

// An additional accepted "from" for the form-builder title, in case the very
// old stale value is still live in some environment.
const FORM_BUILDER_STALE_TITLE = "Velt Home Page - Git with Miri";

const SALES_ENABLEMENT = {
  label: "/for/sales-enablement · csdf scan",
  docId: "solutionPageV1-sales-enablement",
};

const AI_NATIVE_SAAS = {
  label: "/for/ai-native-saas · publish check",
  publishedId: "solutionPageV1-ai-native-saas",
  draftId: "drafts.solutionPageV1-ai-native-saas",
};

/**
 * Character count helper that tolerates null/undefined.
 * @param {string|null|undefined} value String to measure.
 * @returns {number} Length, or 0 when not a string.
 */
function charCount(value) {
  return typeof value === "string" ? value.length : 0;
}

/**
 * Resolve a patch definition to a concrete document _id.
 * @param {FieldPatch} patch The patch definition.
 * @returns {Promise<string|null>} The resolved _id, or null when not found.
 */
async function resolveDocId(patch) {
  try {
    if (patch?.docId) return patch.docId;
    if (patch?.type && patch?.slug) {
      const found = await client.fetch(
        `*[_type == $type && slug.current == $slug][0]._id`,
        { type: patch.type, slug: patch.slug },
      );
      return found ?? null;
    }
    return null;
  } catch (error) {
    console.error(`  ! resolveDocId failed for ${patch?.label}:`, error?.message ?? error);
    return null;
  }
}

/**
 * Read a single top-level field from a document.
 * @param {string} docId Document _id.
 * @param {string} field Field name.
 * @returns {Promise<unknown>} The current field value (or undefined).
 */
async function readField(docId, field) {
  try {
    return await client.fetch(`*[_id == $docId][0][$field]`, { docId, field });
  } catch (error) {
    console.error(`  ! readField failed for ${docId}.${field}:`, error?.message ?? error);
    return undefined;
  }
}

/**
 * Recursively collect string values containing a token, with their dotted path.
 * @param {unknown} node Current node.
 * @param {string} token Token to search for.
 * @param {string} path Accumulated path.
 * @param {Array<{path: string, value: string}>} hits Collector.
 * @returns {Array<{path: string, value: string}>} Matching string fields.
 */
function collectTokenHits(node, token, path, hits) {
  try {
    if (typeof node === "string") {
      if (node.includes(token)) hits.push({ path, value: node });
      return hits;
    }
    if (Array.isArray(node)) {
      node.forEach((item, index) =>
        collectTokenHits(item, token, `${path}[${index}]`, hits),
      );
      return hits;
    }
    if (node && typeof node === "object") {
      for (const key of Object.keys(node)) {
        if (key.startsWith("_")) continue;
        collectTokenHits(node?.[key], token, path ? `${path}.${key}` : key, hits);
      }
    }
    return hits;
  } catch (error) {
    console.error("  ! collectTokenHits failed:", error?.message ?? error);
    return hits;
  }
}

/**
 * Plan + (optionally) apply a single guarded field patch.
 * @param {FieldPatch} patch The patch definition.
 * @returns {Promise<"applied"|"skipped"|"ok"|"error">} Outcome.
 */
async function runFieldPatch(patch) {
  const docId = await resolveDocId(patch);
  if (!docId) {
    console.log(`SKIP  ${patch.label} — document not found.`);
    return "skipped";
  }

  const current = await readField(docId, patch.field);
  const acceptableFrom = [patch.expectedFrom];
  if (patch.field === META_TITLE && patch.slug === "form-builder") {
    acceptableFrom.push(FORM_BUILDER_STALE_TITLE);
  }

  if (current === patch.to) {
    console.log(`OK    ${patch.label} — already at target (${charCount(patch.to)} chars).`);
    return "ok";
  }

  const matchesExpected =
    acceptableFrom.includes(current) ||
    (patch.expectedFrom === null && (current === null || current === undefined));

  console.log(`\n--- ${patch.label} ---`);
  console.log(`  doc:   ${docId}`);
  console.log(`  field: ${patch.field}`);
  console.log(`  from:  ${JSON.stringify(current)} (${charCount(current)} chars)`);
  console.log(`  to:    ${JSON.stringify(patch.to)} (${charCount(patch.to)} chars)`);

  if (!matchesExpected) {
    console.log(
      `  SKIP — current value did not match expected ${JSON.stringify(
        patch.expectedFrom,
      )}; leaving untouched for human review.`,
    );
    return "skipped";
  }

  if (DRY_RUN) {
    console.log("  [DRY_RUN] would patch.");
    return "applied";
  }

  try {
    const result = await client
      .patch(docId)
      .set({ [patch.field]: patch.to })
      .commit();
    console.log(`  ✓ patched (rev: ${result._rev}).`);
    return "applied";
  } catch (error) {
    console.error(`  ! patch failed:`, error?.message ?? error);
    process.exitCode = 1;
    return "error";
  }
}

/**
 * Scan the sales-enablement doc for the "csdf" nonsense token and report any
 * occurrences. We do NOT auto-rewrite arbitrary prose: if a hit is found, its
 * path is printed so a human can supply context-appropriate copy. (As of this
 * writing the token is absent — the field was cleaned in an earlier edit.)
 * @returns {Promise<void>} Resolves when the scan is reported.
 */
async function scanSalesEnablement() {
  console.log(`\n--- ${SALES_ENABLEMENT.label} ---`);
  try {
    const doc = await client.fetch(`*[_id == $docId][0]`, {
      docId: SALES_ENABLEMENT.docId,
    });
    if (!doc) {
      console.log("  SKIP — document not found.");
      return;
    }
    const hits = collectTokenHits(doc, NONSENSE_TOKEN, "", []);
    if (hits.length === 0) {
      console.log(`  OK — no "${NONSENSE_TOKEN}" token present; content is clean.`);
      return;
    }
    console.log(`  FOUND ${hits.length} occurrence(s) of "${NONSENSE_TOKEN}":`);
    for (const hit of hits) {
      console.log(`    • path: ${hit.path}`);
      console.log(`      value: ${JSON.stringify(hit.value)}`);
    }
    console.log(
      "  NOTE — left untouched: a safe replacement needs human-authored copy " +
        "for the specific field above. Add a guarded patch entry once the " +
        "intended wording is decided.",
    );
  } catch (error) {
    console.error("  ! scanSalesEnablement failed:", error?.message ?? error);
    process.exitCode = 1;
  }
}

/**
 * Confirm the ai-native-saas solution page exists and is published (so the
 * route does not notFound() and crawlers get an H1/title/content).
 * @returns {Promise<void>} Resolves when the state is reported.
 */
async function checkAiNativeSaas() {
  console.log(`\n--- ${AI_NATIVE_SAAS.label} ---`);
  try {
    const published = await client.fetch(
      `*[_id == $id][0]{ _id, "slug": slug.current, metaTitle, "heroTitle": hero.title }`,
      { id: AI_NATIVE_SAAS.publishedId },
    );
    const draft = await client.fetch(`*[_id == $id][0]._id`, {
      id: AI_NATIVE_SAAS.draftId,
    });

    if (published?._id) {
      console.log(`  OK — published doc exists: ${published._id}`);
      console.log(`       slug: ${published.slug}`);
      console.log(`       metaTitle: ${JSON.stringify(published.metaTitle)}`);
      console.log(`       hero.title (H1): ${JSON.stringify(published.heroTitle)}`);
      if (draft) {
        console.log(
          `  NOTE — a draft (${AI_NATIVE_SAAS.draftId}) also exists; published copy is what renders.`,
        );
      }
      console.log("  No action needed: findings 24/25/26 (notFound) are already resolved.");
      return;
    }

    if (draft) {
      console.log(`  DRAFT-ONLY — ${AI_NATIVE_SAAS.draftId} exists but is NOT published.`);
      console.log("  ACTION NEEDED: publish the draft (out of scope for an automated patch — flagged for human review).");
      return;
    }

    console.log("  MISSING — no published or draft doc. Needs to be created from a healthy template (flagged for human review).");
  } catch (error) {
    console.error("  ! checkAiNativeSaas failed:", error?.message ?? error);
    process.exitCode = 1;
  }
}

/**
 * Verify final field values after a live run.
 * @returns {Promise<void>} Resolves when verification is printed.
 */
async function verify() {
  console.log("\n===== POST-RUN VERIFICATION =====");
  for (const patch of FIELD_PATCHES) {
    const docId = await resolveDocId(patch);
    if (!docId) {
      console.log(`  ${patch.label}: doc not found`);
      continue;
    }
    const value = await readField(docId, patch.field);
    const ok = value === patch.to ? "✓" : "✗";
    console.log(`  ${ok} ${patch.label}: ${charCount(value)} chars — ${JSON.stringify(value)}`);
  }
}

/**
 * Entry point.
 * @returns {Promise<void>} Resolves when the run completes.
 */
async function main() {
  console.log(
    `CMS SEO/a11y fix — ${DRY_RUN ? "DRY RUN (no writes)" : "LIVE (writing to Sanity)"}\n`,
  );

  let applied = 0;
  let skipped = 0;
  for (const patch of FIELD_PATCHES) {
    const outcome = await runFieldPatch(patch);
    if (outcome === "applied") applied += 1;
    if (outcome === "skipped") skipped += 1;
  }

  await scanSalesEnablement();
  await checkAiNativeSaas();

  console.log(
    `\nField patches — ${DRY_RUN ? "would apply" : "applied"}: ${applied}, skipped: ${skipped}.`,
  );

  if (DRY_RUN) {
    console.log("DRY_RUN=1 — no writes performed. Re-run without DRY_RUN=1 to apply.");
    return;
  }

  await verify();
  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
