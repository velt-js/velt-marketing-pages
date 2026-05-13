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
  "featurePage-dev-tools",
  "featurePage-multiplayer",
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
