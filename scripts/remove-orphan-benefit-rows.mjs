#!/usr/bin/env node
// Remove benefit rows from useCasePage docs whose heading is not present
// on the live velt.dev counterpart. Called out by the user after the
// image scrape: analytics / coding-tool / task-manager each have a 4th
// benefit in Sanity that doesn't appear on the live site.
//
// Strategy: GROQ unset by array _key. Idempotent: re-running after the
// row is gone is a no-op (Sanity ignores unset on missing paths).
//
// Usage:
//   DRY_RUN=1 node --env-file=.env.local scripts/remove-orphan-benefit-rows.mjs
//   node --env-file=.env.local scripts/remove-orphan-benefit-rows.mjs

import { createClient } from "@sanity/client";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN, or DRY_RUN=1 to preview.");
  process.exit(1);
}

const client = createClient({
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// Each entry: which Sanity slug, and which benefit heading to drop. We
// match on title text (rather than index) so the patch is resilient to
// CMS edits that reorder rows.
const TARGETS = [
  { slug: "analytics", title: "Users can analyze responses together." },
  { slug: "coding-tool", title: "Users can approve changes and suggestions fast" },
  { slug: "task-manager", title: "Users can analyze responses together." },
];

for (const t of TARGETS) {
  const doc = await client.fetch(
    `*[_type == "useCasePage" && slug.current == $slug][0]{ _id, benefits[]{ _key, title } }`,
    { slug: t.slug },
  );
  if (!doc) {
    console.error(`  ${t.slug}: doc not found, skipping`);
    continue;
  }
  const match = (doc.benefits ?? []).find((b) => b.title === t.title);
  if (!match) {
    console.log(`  ${t.slug}: no row with title "${t.title}" — already removed`);
    continue;
  }
  const path = `benefits[_key=="${match._key}"]`;
  if (DRY_RUN) {
    console.log(`  ${t.slug}: would unset ${path} ("${t.title}")`);
    continue;
  }
  await client.patch(doc._id).unset([path]).commit();
  console.log(`  ${t.slug}: removed ("${t.title}")`);
}
