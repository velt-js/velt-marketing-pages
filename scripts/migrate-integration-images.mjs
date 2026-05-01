// One-shot migration: download framerusercontent.com URLs stored in
// integrationPage's image fields, upload to Sanity assets, and replace
// the URL string with a proper Sanity image reference.
//
// Run:
//   node --env-file=.env.local scripts/migrate-integration-images.mjs
//
// Idempotent: docs whose field is already an image reference are skipped.

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const IMAGE_FIELDS = ["logo", "connectImage", "payloadImage", "unifiedImage"];

const docs = await client.fetch(`*[_type == "integrationPage"]{ _id, name, ${IMAGE_FIELDS.join(", ")} }`);

console.log(`Inspecting ${docs.length} integration docs...`);

let migrated = 0, skipped = 0, errored = 0;

for (const doc of docs) {
  const set = {};
  for (const field of IMAGE_FIELDS) {
    const value = doc[field];
    if (!value) continue;
    if (typeof value !== "string") continue; // already an image reference
    if (!value.startsWith("http")) continue;

    try {
      console.log(`  ${doc.name}/${field}: downloading ${value}`);
      const res = await fetch(value);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const filename = value.split("/").pop().split("?")[0] || `${doc.name}-${field}.png`;
      const asset = await client.assets.upload("image", buf, { filename });
      set[field] = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    } catch (err) {
      console.error(`  ${doc.name}/${field}: FAILED — ${err.message}`);
      errored++;
    }
  }

  if (Object.keys(set).length === 0) {
    skipped++;
    continue;
  }

  await client.patch(doc._id).set(set).commit();
  console.log(`  ${doc.name}: migrated ${Object.keys(set).join(", ")}`);
  migrated++;
}

console.log(`\nDone. Migrated ${migrated}, skipped ${skipped}, errored ${errored}.`);
