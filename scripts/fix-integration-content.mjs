#!/usr/bin/env node
/**
 * Fix buggy content on the live `integration-<slug>` integrationPage docs, which
 * were cloned from the Slack template and never fully updated. See
 * docs/link-sweep-findings-2026-06.md for the full audit.
 *
 * Per buggy doc this fixes, all guarded (only patches when the current value
 * still matches the expected buggy value, so re-runs and drifted copy are safe):
 *   - connectBody: "...create a new endpoint for Slack"  ->  "...for {Name}"
 *                  (also fixes the "advance web hook" -> "advanced webhook" typo)
 *   - codeSnippet: wrong editor/chart code (Tiptap/Slate/Nivo/VeltCommentPin)
 *                  -> null  (hides the misleading "Add Velt to {name}" block;
 *                   matches the canonical clean `integrationPage-*` set)
 *   - docsUrl:     wrong-product docs page  ->  https://docs.velt.dev/
 *   - demoUrl:     wrong-product demo app    ->  https://console.velt.dev/
 *   - githubUrl:   wrong-product repo         ->  null
 * Plus SendGrid brand casing ("Sendgrid" -> "SendGrid") on BOTH the
 * integration-sendgrid and integrationPage-sendgrid docs.
 *
 * Images (connectImage/payloadImage/unifiedImage) and the richer descriptions
 * on the `integration-*` docs are intentionally preserved.
 *
 * Usage:
 *   DRY_RUN=1 node --env-file=.env.local scripts/fix-integration-content.mjs
 *   node --env-file=.env.local scripts/fix-integration-content.mjs
 */

import { createClient } from "@sanity/client";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN, or DRY_RUN=1 to preview without writing.");
  process.exit(1);
}

const client = createClient({
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const BUGGY_CONNECT_BODY =
  "Go to advance web hook configs and create a new endpoint for Slack";
// Markers that identify a wrong (editor/chart/library) code block on a webhook
// integration page. If codeSnippet contains any of these, it gets nulled.
const WRONG_CODE_MARKERS = [
  "useVeltTiptapCrdtExtension",
  "slate-velt-comments",
  "VeltNivoChartComments",
  "VeltCommentPin",
  "ResponsiveLine",
  "withVeltComments",
];
// Any integration docs/demo/repo URL pointing at a specific editor/chart library
// (rather than generic Velt docs/console) is a wrong-product leftover.
const WRONG_URL_RE =
  /tiptap|reactflow|slate|nivo|crdt-demo|crdt\/setup|chart-comments-setup|highcharts|chartjs/i;

/** SendGrid is the one integration whose brand name is mis-cased in the CMS. */
function correctName(doc) {
  if (doc.name === "Sendgrid") return "SendGrid";
  return doc.name;
}

async function main() {
  // The live (buggy) set is the `integration-<slug>` id scheme (distinct from the
  // clean `integrationPage-<slug>` twins). GROQ path() globbing doesn't match
  // these single-segment ids reliably, so filter by id prefix in JS. The regex
  // `^integration-` excludes `integrationPage-*` (next char there is "P", not "-").
  const allDocs = await client.fetch(
    `*[_type=="integrationPage"]{
      _id, name, heroTitle, tagline, description,
      codeSnippet, connectBody, docsUrl, demoUrl, githubUrl
    } | order(_id)`,
  );
  const docs = allDocs.filter((doc) => /^integration-/.test(doc._id));

  // SendGrid casing also needs the clean twin patched.
  const sendgridTwin = await client.fetch(
    `*[_type=="integrationPage" && _id=="integrationPage-sendgrid"][0]{
      _id, name, heroTitle, tagline, description, connectBody
    }`,
  );

  const tx = client.transaction();
  let planned = 0;
  const log = [];

  for (const doc of docs) {
    const set = {};
    const name = correctName(doc);

    // connectBody: Slack -> correct name (+ typo fix)
    if (doc.connectBody === BUGGY_CONNECT_BODY) {
      set.connectBody = `Go to advanced webhook configs and create a new endpoint for ${name}`;
    }

    // codeSnippet: wrong editor/chart code -> null
    if (
      typeof doc.codeSnippet === "string" &&
      WRONG_CODE_MARKERS.some((m) => doc.codeSnippet.includes(m))
    ) {
      set.codeSnippet = null;
    }

    // docsUrl / demoUrl / githubUrl: wrong-product links -> canonical
    if (typeof doc.docsUrl === "string" && WRONG_URL_RE.test(doc.docsUrl)) {
      set.docsUrl = "https://docs.velt.dev/";
    }
    if (typeof doc.demoUrl === "string" && WRONG_URL_RE.test(doc.demoUrl)) {
      set.demoUrl = "https://console.velt.dev/";
    }
    if (typeof doc.githubUrl === "string" && WRONG_URL_RE.test(doc.githubUrl)) {
      set.githubUrl = null;
    }

    // SendGrid casing on the live doc.
    if (doc.name === "Sendgrid") {
      Object.assign(set, sendgridCasingPatch(doc));
    }

    if (Object.keys(set).length === 0) {
      log.push(`OK    ${doc._id} — nothing to fix (already clean)`);
      continue;
    }
    log.push(
      `PATCH ${doc._id}\n${Object.entries(set)
        .map(([k, v]) => `        ${k}: ${JSON.stringify(v)?.slice(0, 90)}`)
        .join("\n")}`,
    );
    tx.patch(doc._id, (p) => p.set(set));
    planned++;
  }

  // Clean SendGrid twin (casing only). Field-guarded, so a re-run still catches
  // any single field (e.g. connectBody) left mis-cased after an earlier pass.
  if (sendgridTwin) {
    const set = sendgridCasingPatch(sendgridTwin);
    if (Object.keys(set).length) {
      log.push(
        `PATCH ${sendgridTwin._id} (casing)\n${Object.entries(set)
          .map(([k, v]) => `        ${k}: ${JSON.stringify(v)}`)
          .join("\n")}`,
      );
      tx.patch(sendgridTwin._id, (p) => p.set(set));
      planned++;
    }
  }

  console.log(log.join("\n"));
  console.log(`\nPlanned doc patches: ${planned}`);
  if (DRY_RUN) {
    console.log("DRY_RUN=1 — no writes performed.");
    return;
  }
  if (planned === 0) {
    console.log("Nothing to apply.");
    return;
  }
  await tx.commit();
  console.log(`Applied ${planned} doc patches.`);
}

/** Replace the mis-cased "Sendgrid" with "SendGrid" across text fields. */
function sendgridCasingPatch(doc) {
  const set = {};
  for (const field of ["name", "heroTitle", "tagline", "description", "connectBody"]) {
    const v = doc[field];
    if (typeof v === "string" && v.includes("Sendgrid")) {
      set[field] = v.replaceAll("Sendgrid", "SendGrid");
    }
  }
  return set;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
