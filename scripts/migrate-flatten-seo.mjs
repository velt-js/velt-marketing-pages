// One-shot migration: move SEO fields from the legacy `pageMeta` / `seo`
// wrapper objects onto the top level of each doc, then unset the wrapper.
//
// Run:
//   node --env-file=.env.local scripts/migrate-flatten-seo.mjs
//
// Idempotent: docs that no longer have a wrapper are filtered out by the
// GROQ query, so re-running is safe.

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const docs = await client.fetch(`
  *[_type in ["libraryPage", "featurePage", "blogPost", "marketingPage"] &&
    (defined(pageMeta) || defined(seo))]{
    _id, _type, pageMeta, seo
  }
`);

if (docs.length === 0) {
  console.log("No docs to migrate.");
  process.exit(0);
}

console.log(`Migrating ${docs.length} doc(s)...`);

for (const doc of docs) {
  const wrapper = doc.pageMeta ?? doc.seo ?? {};
  const wrapperKey = doc.pageMeta ? "pageMeta" : "seo";

  const set = {};
  if (wrapper.metaTitle) set.metaTitle = wrapper.metaTitle;
  if (wrapper.metaDescription) set.metaDescription = wrapper.metaDescription;
  if (wrapper.ogImage) set.ogImage = wrapper.ogImage;

  const patch = client.patch(doc._id);
  if (Object.keys(set).length > 0) patch.set(set);
  patch.unset([wrapperKey]);
  await patch.commit();

  console.log(`  ${doc._type}/${doc._id} → flattened (${Object.keys(set).join(", ") || "empty wrapper"})`);
}

console.log("Done.");
