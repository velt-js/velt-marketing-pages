#!/usr/bin/env node
/**
 * Fix CMS-owned grammar/copy findings that cannot be fixed in repo code, because
 * the affected /for, /libraries, /use-case, /migrate, and feature pages render
 * their text straight from Sanity documents.
 *
 * Strategy: each fix is an exact phrase replacement ({ from, to }). The script
 * fetches every published document, performs a deep recursive literal string
 * replace across all string fields (including Portable Text leaves), and patches
 * only the top-level fields that actually changed. Because `from` disappears once
 * replaced, the script is naturally idempotent — re-runs are no-ops.
 *
 * A handful of phrases are intentionally REPEATED across many documents (e.g. a
 * boilerplate "Compare, Migration Guide." or a reused testimonial). The global
 * replace fixes every occurrence in one pass — that is the desired behavior.
 *
 * Usage:
 *   DRY_RUN=1 node --env-file=.env.local scripts/fix-grammar-2026-06.mjs   # preview + verify matches
 *   node --env-file=.env.local scripts/fix-grammar-2026-06.mjs             # apply
 */

import { createClient } from "@sanity/client";

const PROJECT_ID = "fk9mezqa";
const DATASET = "production";
const API_VERSION = "2024-01-01";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error(
    "SANITY_API_TOKEN is required (also for DRY_RUN reads). Pass --env-file=.env.local.",
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token,
  useCdn: false,
});

// Each entry: { f: finding id, from: exact current substring, to: corrected }.
const REPLACEMENTS = [
  // --- Solutions (/for/*) ---
  { f: "F1", from: "Data residency options including EU;", to: "Data residency options include the EU;" },
  { f: "F2", from: "require all comments resolved before the filing advances", to: "require all comments to be resolved before the filing advances" },
  { f: "F3", from: "In compliance the stakes are the control itself:", to: "In compliance, the stakes are the control itself:" },
  { f: "F18", from: "In sales enablement the stake is the client's brand.", to: "In sales enablement, the stake is the client's brand." },
  { f: "F36", from: "on reject, nothing changes and the reason is logged.", to: "on rejection, nothing changes and the reason is logged." },
  { f: "F38", from: "On accept, your code applies the language and the record carries who allowed it;", to: "On acceptance, your code applies the language and the record carries who allowed it;" },
  { f: "F40", from: "self-host data providers keep comment and suggestion content plus user PII on your infrastructure", to: "self-hosted data providers keep comment and suggestion content plus user PII on your infrastructure" },
  { f: "F77", from: "On approve, the change fires through your webhook with a permanent record of who allowed what; on reject, nothing happens and the rejection is logged.", to: "On approval, the change fires through your webhook with a permanent record of who allowed what; on rejection, nothing happens and the rejection is logged." },
  { f: "F78", from: "Accept applies the change or fires your webhook; reject leaves the data untouched.", to: "Accept applies the change or fires your webhook; Reject leaves the data untouched." },
  { f: "F79", from: "For buyers the EU AI Act actually covers,", to: "For buyers that the EU AI Act actually covers," },
  { f: "F80", from: "For AI-native products the stake is the user's data itself:", to: "For AI-native products, the stake is the user's data itself:" },

  // --- Libraries (/libraries/*) ---
  { f: "F8", from: "Compare, Migration Guide.", to: "Compare them in our Migration Guide." },
  { f: "F11", from: "React Flow's the graph moving are", to: "as the React Flow graph moves are" },
  // Reused inline testimonial (libraryPage.inlineTestimonial, many libs).
  // NOTE: the yjs *carousel* testimonials (F62–F65) are hardcoded in
  // components/feature/FeatureCustomerCarousel.tsx and fixed in code, not here.
  { f: "F66", from: "in our app, Velt made it possible", to: "in our app; Velt made it possible" },

  // --- Feature pages ---
  { f: "F14", from: "By default Velt stores them.", to: "By default, Velt stores them." },
  { f: "F16", from: "their own project. The 3 steps above replace all three.", to: "their own projects. The 3 steps above replace all three." },
  { f: "F17", from: "with no link and no calendar, participants are your existing signed-in users, and it is scoped", to: "with no link and no calendar; participants are your existing signed-in users; and it is scoped" },
  { f: "F21", from: "pass advances the work, fail routes it to the right human.", to: "pass advances the work; fail routes it to the right human." },
  { f: "F22", from: "or budget, fail routes to a specialist.", to: "or budget; fail routes to a specialist." },
  { f: "F23", from: "fixed findings resolve, open ones persist with their reply threads, only genuinely new issues notify.", to: "fixed findings resolve and open ones persist with their reply threads; only genuinely new issues notify." },
  { f: "F24", from: "until resolved, advisory findings", to: "until resolved; advisory findings" },
  { f: "F29", from: "One person holds the pen, everyone else watches live, read-only enforced by the SDK.", to: "One person holds the pen while everyone else watches live; read-only access is enforced by the SDK." },
  { f: "F30", from: "prevent two people overwriting each other?", to: "prevent two people from overwriting each other?" },
  { f: "F82", from: "in v1 the accept still applies", to: "in v1, the accept still applies" },
  { f: "F83", from: "at accept time the suggestion goes stale", to: "at accept time, the suggestion goes stale" },
  { f: "F84", from: "never creates a suggestion", to: "never create a suggestion" },

  // --- Migrate (/migrate/*) ---
  // F25 also covers F41: both /migrate/cord and /migrate/liveblocks live docs
  // carry the un-hyphenated "One click transfer to Velt database".
  { f: "F25", from: "One click transfer to Velt database", to: "One-click transfer to the Velt database" },

  // --- Use-cases (/use-case/*) ---
  { f: "F12", from: "Users can stay on task & act on insight", to: "Users can stay on task & act on insights" },
  { f: "F33", from: "filter, prioritize and assign tasks", to: "filter, prioritize, and assign tasks" },
  // Scoped: this FAQ is boilerplate on 8 use-case pages; "session replay tool"
  // is only correct on the session-replay-tool page, so restrict to that doc.
  { f: "F34", from: "Does it work with the libraries my video editor uses?", to: "Does it work with the libraries my session replay tool uses?", only: { type: "useCasePage", slug: "session-replay-tool" } },
  { f: "F35", from: "Users can deep dive on bugs directly on the session", to: "Users can dive deep into bugs directly within the session" },
  { f: "F46", from: "loom-like", to: "Loom-like" },
  { f: "F54", from: "User can directly comment on form elements, highlight text, and @teammates.", to: "Users can directly comment on form elements, highlight text, and @teammates." },
  { f: "F48a", from: "Frame by frame feedback and everything in between", to: "Frame-by-frame feedback and everything in between" },
  { f: "F48b", from: "Frame by Frame feedback and everything in between", to: "Frame-by-frame feedback and everything in between" },
  { f: "F49", from: "Users can co-create storyboards collaboratively", to: "Users can create storyboards collaboratively" },
  { f: "F51", from: "Users can Iterate and approve changes fast", to: "Users can iterate and approve changes fast" },
];

// Replacements applicable to a given document (honors the optional `only`
// {type, slug} scope).
function replacementsFor(doc) {
  return REPLACEMENTS.filter(
    (r) => !r.only || (r.only.type === doc._type && r.only.slug === doc?.slug?.current),
  );
}

// Apply a replacement list to a single string (literal, global).
// Skip when the corrected `to` is already present: keeps the script idempotent
// even when `from` is a substring of `to` (e.g. a singular→plural fix like
// "insight" → "insights", where the result still contains the original `from`).
function replaceInString(str, repls) {
  let out = str;
  for (const { from, to } of repls) {
    if (out.includes(from) && !out.includes(to)) out = out.split(from).join(to);
  }
  return out;
}

// Recursively clone a value, replacing strings in place.
function deepReplace(value, repls) {
  if (typeof value === "string") return replaceInString(value, repls);
  if (Array.isArray(value)) return value.map((v) => deepReplace(v, repls));
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, val] of Object.entries(value)) out[key] = deepReplace(val, repls);
    return out;
  }
  return value;
}

// F50: on the video-editor use-case, a benefit's description duplicates its
// title verbatim. Blank the duplicate description.
function applyF50(doc, nextDoc) {
  if (doc._type !== "useCasePage" || doc?.slug?.current !== "video-editor") return false;
  if (!Array.isArray(nextDoc.benefits)) return false;
  let changed = false;
  for (const item of nextDoc.benefits) {
    if (item && item.title && item.description && item.title.trim() === item.description.trim()) {
      item.description = "";
      changed = true;
    }
  }
  return changed;
}

const SYSTEM_KEYS = new Set(["_id", "_type", "_rev", "_createdAt", "_updatedAt"]);

async function main() {
  console.log(`Mode: ${DRY_RUN ? "DRY_RUN (no writes)" : "APPLY (writing to Sanity)"}`);
  const docs = await client.fetch('*[!(_id in path("drafts.**"))]');
  console.log(`Fetched ${docs.length} published documents.\n`);

  // 1) Verification: which findings actually match live content?
  const hitCounts = Object.fromEntries(REPLACEMENTS.map((r) => [r.f, 0]));
  for (const doc of docs) {
    const json = JSON.stringify(doc);
    for (const r of replacementsFor(doc)) {
      if (json.includes(r.from)) {
        // count occurrences
        hitCounts[r.f] += json.split(r.from).length - 1;
      }
    }
  }
  console.log("=== Match report (finding: occurrences across all docs) ===");
  const notFound = [];
  for (const r of REPLACEMENTS) {
    const n = hitCounts[r.f];
    if (n === 0) notFound.push(r.f);
    console.log(`${n === 0 ? "  ✗" : "  ✓"} ${r.f}: ${n}  "${r.from.slice(0, 60)}${r.from.length > 60 ? "…" : ""}"`);
  }
  if (notFound.length) {
    console.log(`\nNOT FOUND in live Sanity (need manual review): ${notFound.join(", ")}`);
  }

  // 2) Build per-doc patches.
  let patched = 0;
  const touchedDocs = [];
  for (const doc of docs) {
    const next = deepReplace(doc, replacementsFor(doc));
    const f50Changed = applyF50(doc, next);

    const changedKeys = {};
    for (const key of Object.keys(next)) {
      if (SYSTEM_KEYS.has(key)) continue;
      if (JSON.stringify(next[key]) !== JSON.stringify(doc[key])) {
        changedKeys[key] = next[key];
      }
    }
    if (Object.keys(changedKeys).length === 0 && !f50Changed) continue;
    if (f50Changed) changedKeys.benefits = next.benefits;

    touchedDocs.push({ id: doc._id, type: doc._type, slug: doc?.slug?.current, fields: Object.keys(changedKeys) });
    if (!DRY_RUN) {
      await client.patch(doc._id).set(changedKeys).commit();
      patched += 1;
    }
  }

  console.log(`\n=== Documents to change: ${touchedDocs.length} ===`);
  for (const d of touchedDocs) {
    console.log(`  ${d.type}${d.slug ? `/${d.slug}` : ""} (${d.id}) → fields: ${d.fields.join(", ")}`);
  }
  if (DRY_RUN) {
    console.log("\nDRY_RUN: no documents were written. Re-run without DRY_RUN=1 to apply.");
  } else {
    console.log(`\nApplied patches to ${patched} document(s).`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
