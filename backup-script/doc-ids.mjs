/**
 * Sanity document IDs that the spell-fix re-seed will overwrite.
 * Shared by backup-sanity.mjs and restore-sanity.mjs so both stay in sync
 * with the list of seed scripts modified for the spell/grammar audit.
 *
 * If you add or remove a seed script, update this list.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const PROJECT_ROOT = resolve(import.meta.dirname, "..");

const INTEGRATION_SLUGS = JSON.parse(
  readFileSync(resolve(PROJECT_ROOT, "scripts/integration-content.json"), "utf8")
).map((entry) => entry.slug);

export const DOC_IDS = [
  // All featurePage docs. These are CMS-only (no code trail), so a full
  // list here ensures a deletion/re-seed can always be backed up and
  // restored. In Jun 2026 four of these were hard-deleted from production
  // and had to be rebuilt from the seed scripts.
  "featurePage-admin-console",
  "featurePage-comments",
  "featurePage-dev-tools",
  "featurePage-activity-logs",
  "featurePage-multiplayer",
  "featurePage-notifications",
  "featurePage-recordings",
  "featurePage-webhooks-and-api",
  "libraryPage-blocknote",
  "libraryPage-codemirror",
  "libraryPage-lexical",
  "libraryPage-slatejs",
  "libraryPage-tiptap",
  "libraryPage-yjs",
  ...INTEGRATION_SLUGS.map((slug) => `integrationPage-${slug}`),
];

export const SANITY_CONFIG = {
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
};
