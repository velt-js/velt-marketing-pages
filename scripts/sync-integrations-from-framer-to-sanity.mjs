#!/usr/bin/env node
/**
 * Sync the 17 integration pages from Framer's CMS (collection `Z1rTLexh0`)
 * into Sanity as `integrationPage` documents.
 *
 * Usage:
 *   node --env-file=.env.local scripts/sync-integrations-from-framer-to-sanity.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/sync-integrations-from-framer-to-sanity.mjs
 *   # preview-only: DRY_RUN=1 node scripts/sync-integrations-from-framer-to-sanity.mjs
 *
 * Source: `npx unframer mcp getCMSItems --collectionId Z1rTLexh0` (YAML output).
 * Map: `scripts/framer-field-map.mjs` maps opaque Framer field IDs → Sanity
 *      schema fields. Adjust there if the schema changes.
 */

import { createClient } from "@sanity/client";
import { execSync } from "node:child_process";
import yaml from "js-yaml";
import { FRAMER_FIELD_MAP } from "./framer-field-map.mjs";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN env var, or DRY_RUN=1 to preview without writing.");
  process.exit(1);
}

const FRAMER_COLLECTION_ID = "Z1rTLexh0";

const client = DRY_RUN
  ? null
  : createClient({
      projectId: "fk9mezqa",
      dataset: "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

function fetchFramerItems() {
  // `unframer mcp getCMSItems` output includes leading guidance lines + a YAML
  // block. Trim any `#`-prefixed preamble before parsing.
  const raw = execSync(
    `npx unframer mcp getCMSItems --collectionId ${FRAMER_COLLECTION_ID}`,
    { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 },
  );
  const yamlStart = raw.search(/^message:/m);
  if (yamlStart === -1) {
    throw new Error("Framer MCP output doesn't look like expected YAML");
  }
  const doc = yaml.load(raw.slice(yamlStart));
  if (!doc || !Array.isArray(doc.items)) {
    throw new Error("Framer MCP response missing 'items' array");
  }
  return doc.items;
}

function toSanityDoc(item) {
  const slug = item.slug;
  if (!slug) throw new Error(`Item ${item.id} has no slug`);

  const doc = {
    _id: `integration-${slug}`,
    _type: "integrationPage",
    slug: { _type: "slug", current: slug },
  };

  for (const [fieldId, raw] of Object.entries(item.fieldData || {})) {
    const map = FRAMER_FIELD_MAP[fieldId];
    if (!map) continue;
    // Framer returns each field as { type, value } — extract value directly.
    doc[map.sanity] = raw?.value ?? null;
  }

  return doc;
}

async function main() {
  console.log(`Fetching Framer CMS items from collection ${FRAMER_COLLECTION_ID}...`);
  const items = fetchFramerItems();
  console.log(`  → ${items.length} items.`);

  const docs = items.map(toSanityDoc);

  if (DRY_RUN) {
    console.log("DRY RUN — showing first document shape:");
    console.log(JSON.stringify(docs[0], null, 2));
    console.log(`\nWould upsert ${docs.length} integrationPage docs:`);
    for (const d of docs) console.log(`  - ${d.slug.current} (${d.name || "?"})`);
    return;
  }

  const tx = client.transaction();
  for (const d of docs) tx.createOrReplace(d);
  await tx.commit();

  console.log(`Upserted ${docs.length} integrationPage docs:`);
  for (const d of docs) console.log(`  - ${d.slug.current} (${d.name || "?"})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
