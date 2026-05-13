#!/usr/bin/env node
/**
 * Snapshot every Sanity document that the spell-fix re-seed will overwrite.
 * Writes one JSON file per doc into backup-script/backups/<timestamp>/.
 * Run this BEFORE re-seeding so you have a one-command rollback path.
 *
 * Usage:
 *   node --env-file=.env.local backup-script/backup-sanity.mjs
 *   node --env-file=.env.local backup-script/backup-sanity.mjs --tag pre-spellfix
 *
 * Output:
 *   backup-script/backups/2026-05-13T10-49-00Z[-tag]/
 *     featurePage-dev-tools.json
 *     featurePage-multiplayer.json
 *     libraryPage-blocknote.json
 *     ...
 *     integrationPage-slack.json
 *     ...
 *     _manifest.json   (timestamp, doc list, missing docs)
 *
 * Notes:
 *   - Snapshots include image asset references (_ref). Restore reuses
 *     those references; assets themselves are never deleted from Sanity,
 *     so the references remain valid.
 *   - Missing docs (never seeded yet) are logged but do not fail the run.
 *   - Read-only operation: no writes to Sanity.
 */

import { createClient } from "@sanity/client";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { DOC_IDS, SANITY_CONFIG } from "./doc-ids.mjs";

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("Set SANITY_API_TOKEN env var (use `node --env-file=.env.local …`).");
  process.exit(1);
}

const tagIndex = process.argv.indexOf("--tag");
const tag = tagIndex !== -1 ? process.argv[tagIndex + 1] : null;

const client = createClient({ ...SANITY_CONFIG, token, useCdn: false });

const timestamp = new Date().toISOString().replace(/[:.]/g, "-").replace(/Z$/, "Z");
const snapshotName = tag ? `${timestamp}-${tag}` : timestamp;
const snapshotDir = resolve(import.meta.dirname, "backups", snapshotName);
mkdirSync(snapshotDir, { recursive: true });

console.log(`Snapshot dir: ${snapshotDir}`);
console.log(`Fetching ${DOC_IDS.length} documents from Sanity (${SANITY_CONFIG.dataset})…\n`);

const found = [];
const missing = [];

for (const id of DOC_IDS) {
  const doc = await client.getDocument(id);
  if (!doc) {
    missing.push(id);
    console.log(`  · ${id} — not found (skipping)`);
    continue;
  }
  const filePath = resolve(snapshotDir, `${id}.json`);
  writeFileSync(filePath, JSON.stringify(doc, null, 2));
  found.push(id);
  console.log(`  ✓ ${id}`);
}

const manifest = {
  timestamp,
  tag,
  dataset: SANITY_CONFIG.dataset,
  projectId: SANITY_CONFIG.projectId,
  found,
  missing,
};
writeFileSync(resolve(snapshotDir, "_manifest.json"), JSON.stringify(manifest, null, 2));

console.log(`\nBacked up ${found.length}/${DOC_IDS.length} docs.`);
if (missing.length) {
  console.log(`Skipped ${missing.length} missing docs: ${missing.join(", ")}`);
}
console.log(`\nTo restore later:`);
console.log(`  node --env-file=.env.local backup-script/restore-sanity.mjs ${snapshotName}`);
