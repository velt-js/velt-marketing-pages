#!/usr/bin/env node
/**
 * Patch metaTitle + metaDescription on three Sanity featurePage docs
 * (admin-console, multiplayer, recordings).
 *
 * Why: the existing CMS values are weaker than what's live on Framer
 * velt.dev and were flagged by the SEO audit (see .qa-audit/FINAL_REPORT.md).
 *
 * Usage:
 *   DRY_RUN=1 node --env-file=.env.local scripts/patch-feature-metatitles.mjs   # preview
 *   node --env-file=.env.local scripts/patch-feature-metatitles.mjs              # apply
 *
 * Idempotent: a re-run with the same values is a no-op patch. Touches
 * only metaTitle and metaDescription — every other field on the doc
 * (hero, sections, slug, etc.) is left untouched.
 */

import { createClient } from "@sanity/client";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN env var, or DRY_RUN=1 to preview without writing.");
  process.exit(1);
}

const client = DRY_RUN
  ? null
  : createClient({
      projectId: "fk9mezqa",
      dataset: "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

// Sanity featurePage doc IDs are `featurePage-{slug}` (see existing seed
// scripts). Each entry below is one document we want to patch.
//
// Sources:
//   - multiplayer / recordings: copied verbatim from https://velt.dev
//   - admin-console: live title ("Velt SDK: Platform") is too thin SEO-wise,
//     so we use a richer keyword-loaded variant. Description still mirrors live.
const PATCHES = [
  {
    docId: "featurePage-admin-console",
    metaTitle: "Velt Admin Console: Manage Your Collaboration SDK",
    metaDescription:
      "The Velt platform has a comprehensive scope of tools and features to help you in succeeding when building collaboration into your product including Security Features, Analytics, DevTools and more!",
  },
  {
    docId: "featurePage-multiplayer",
    metaTitle: "CRDT-Powered Yjs Multiplayer Editing SDK | Velt",
    metaDescription:
      "Add conflict-free, Google Docs-style multiplayer editing to your app with Velt's CRDT-powered SDK. Get real-time collaboration with no infrastructure to manage.",
  },
  {
    docId: "featurePage-recordings",
    metaTitle: "Velt SDK: Loom-Style Recording in your product",
    metaDescription:
      "Add Loom-style recording to your product in minutes. Audio, video, and screen recording SDK with AI features. Keep users in-app and boost engagement.",
  },
];

/**
 * Apply or preview the patches.
 */
async function main() {
  for (const patch of PATCHES) {
    const { docId, metaTitle, metaDescription } = patch;

    if (DRY_RUN) {
      console.log(`--- ${docId} (DRY RUN) ---`);
      console.log(`  metaTitle:       ${metaTitle}`);
      console.log(`  metaDescription: ${metaDescription}`);
      continue;
    }

    try {
      const result = await client
        .patch(docId)
        .set({ metaTitle, metaDescription })
        .commit();
      console.log(`patched ${docId} (rev: ${result._rev})`);
    } catch (err) {
      console.error(`FAILED ${docId}:`, err?.message ?? err);
      process.exitCode = 1;
    }
  }

  if (DRY_RUN) {
    console.log("\nDRY RUN — no writes. Rerun without DRY_RUN=1 to apply.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
