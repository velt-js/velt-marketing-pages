#!/usr/bin/env node
/**
 * Restore Sanity documents from a snapshot created by backup-sanity.mjs.
 * Each JSON file in the snapshot dir is pushed back via createOrReplace,
 * which is exactly what the seed scripts do — so a restore returns the
 * docs to the state captured at snapshot time.
 *
 * Usage:
 *   # Restore the most recent snapshot:
 *   node --env-file=.env.local backup-script/restore-sanity.mjs
 *
 *   # Restore a specific snapshot (folder name from backups/):
 *   node --env-file=.env.local backup-script/restore-sanity.mjs 2026-05-13T10-49-00Z-pre-spellfix
 *
 *   # Preview without writing:
 *   DRY_RUN=1 node --env-file=.env.local backup-script/restore-sanity.mjs
 *
 *   # Restore one doc only:
 *   ONLY=libraryPage-blocknote node --env-file=.env.local backup-script/restore-sanity.mjs
 *
 * Notes:
 *   - Image asset references in the snapshot point at assets that still
 *     live in Sanity, so the restore is self-contained.
 *   - This is a destructive operation on Sanity content. Always sanity-check
 *     the snapshot folder before running without DRY_RUN.
 */

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { SANITY_CONFIG } from "./doc-ids.mjs";

const DRY_RUN = process.env.DRY_RUN === "1";
const ONLY = process.env.ONLY?.trim() || null;
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN env var, or DRY_RUN=1 to preview without writing.");
  process.exit(1);
}

const BACKUPS_DIR = resolve(import.meta.dirname, "backups");
if (!existsSync(BACKUPS_DIR)) {
  console.error(`No backups directory at ${BACKUPS_DIR}. Run backup-sanity.mjs first.`);
  process.exit(1);
}

const requestedSnapshot = process.argv[2];
let snapshotName;
if (requestedSnapshot) {
  snapshotName = requestedSnapshot;
} else {
  const snapshots = readdirSync(BACKUPS_DIR)
    .filter((name) => statSync(resolve(BACKUPS_DIR, name)).isDirectory())
    .sort();
  if (snapshots.length === 0) {
    console.error("No snapshots found in backup-script/backups/. Run backup-sanity.mjs first.");
    process.exit(1);
  }
  snapshotName = snapshots[snapshots.length - 1];
  console.log(`No snapshot specified — using latest: ${snapshotName}\n`);
}

const snapshotDir = resolve(BACKUPS_DIR, snapshotName);
if (!existsSync(snapshotDir)) {
  console.error(`Snapshot not found: ${snapshotDir}`);
  process.exit(1);
}

const manifestPath = resolve(snapshotDir, "_manifest.json");
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  console.log(`Snapshot taken: ${manifest.timestamp}`);
  if (manifest.tag) console.log(`Tag: ${manifest.tag}`);
  console.log(`Target dataset: ${manifest.dataset} (project ${manifest.projectId})`);
  console.log();
}

const files = readdirSync(snapshotDir).filter(
  (name) => name.endsWith(".json") && name !== "_manifest.json",
);
const targetFiles = ONLY ? files.filter((f) => f === `${ONLY}.json`) : files;

if (targetFiles.length === 0) {
  console.error(ONLY ? `No snapshot file for ${ONLY}` : "Snapshot is empty.");
  process.exit(1);
}

const client = DRY_RUN ? null : createClient({ ...SANITY_CONFIG, token, useCdn: false });

console.log(`Restoring ${targetFiles.length} document(s)${DRY_RUN ? " [DRY RUN]" : ""}…\n`);

let restored = 0;
const errors = [];
for (const file of targetFiles) {
  const doc = JSON.parse(readFileSync(resolve(snapshotDir, file), "utf8"));
  // Strip Sanity-managed fields that createOrReplace will set itself.
  delete doc._rev;
  delete doc._updatedAt;
  delete doc._createdAt;

  if (DRY_RUN) {
    console.log(`  [dry-run] would createOrReplace ${doc._id}`);
    restored++;
    continue;
  }

  try {
    await client.createOrReplace(doc);
    console.log(`  ✓ ${doc._id}`);
    restored++;
  } catch (err) {
    console.error(`  ✗ ${doc._id} — ${err.message}`);
    errors.push({ id: doc._id, error: err.message });
  }
}

console.log(`\nRestored ${restored}/${targetFiles.length} document(s).`);
if (errors.length) {
  console.error(`${errors.length} error(s):`);
  for (const { id, error } of errors) console.error(`  ${id}: ${error}`);
  process.exit(1);
}
