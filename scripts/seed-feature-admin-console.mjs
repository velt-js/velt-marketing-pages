#!/usr/bin/env node
/**
 * Seed the featurePage-admin-console document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-admin-console.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-admin-console.mjs
 *
 * Idempotent: re-runs replace the existing featurePage-admin-console doc.
 *
 * Reference: Figma node 176:29292 in HqWIZdR6ISJmaG2n4o3gr8 (Velt Marketing
 * 2026 — Admin Console page). Layout:
 *   1. Hero (chrome — driven by this doc's hero)
 *   2. AdminConsoleAnalyticsPanel — slug-conditional dark chart panel
 *   3. TrustedLogos (chrome)
 *   4. AdminConsoleHighlights — slug-conditional component carries 4 cards
 *   5. Security (chrome — toggled on via showSecurity)
 *   6. FeatureCustomerCarousel + LibraryFAQ + GetStartedSteps + Footer (chrome)
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

async function main() {
  // Body content lives in AdminConsoleHighlights + AdminConsoleAnalyticsPanel
  // (hardcoded slug-conditional components in app/features/[slug]/page.tsx).
  // Sanity carries chrome + hero only.
  const doc = {
    _id: "featurePage-admin-console",
    _type: "featurePage",
    title: "Admin Console",
    slug: { _type: "slug", current: "admin-console" },
    category: "Platform",
    tagline: "Your Control Center For Building Collaboration",
    metaTitle: "Admin Console | Velt",
    metaDescription:
      "Chat with AI, debug issues, manage data, and measure impact all in one place. Velt's admin console gives developers everything they need to ship collaboration features faster.",
    hero: {
      heading: "Your Control Center For Building Collaboration",
      subheading:
        "Chat with AI, Debug Issues, Manage Data and Measure Impact all In One Place",
      decorated: true,
      primaryCta: {
        _type: "ctaLink",
        label: "Get Free API Key",
        href: "https://console.velt.dev/",
        newTab: true,
      },
      secondaryCta: {
        _type: "ctaLink",
        label: "Book Demo",
        href: "/book-demo",
      },
    },
    showTrustedLogos: true,
    showSecurity: true,
    showCustomerStories: false,
    sections: [],
    getStartedSteps: { step1PackageName: "@veltdev/react" },
  };

  if (DRY_RUN) {
    console.log("DRY RUN — document shape:");
    console.log(JSON.stringify(doc, null, 2));
    return;
  }

  await client.createOrReplace(doc);
  console.log(`\nDone! Upserted ${doc._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
