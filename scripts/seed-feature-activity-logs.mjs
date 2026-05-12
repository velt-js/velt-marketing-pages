#!/usr/bin/env node
/**
 * Seed the featurePage-activity-logs document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-activity-logs.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-activity-logs.mjs
 *
 * Idempotent: re-runs replace the existing featurePage-activity-logs doc.
 *
 * Reference: Figma node 221:23313 in HqWIZdR6ISJmaG2n4o3gr8 (Velt Marketing
 * 2026 — Activity Logs page). Layout:
 *   1. Hero (chrome — driven by this doc's hero)
 *   2. TrustedLogos (chrome)
 *   3. ActivityLogsHighlights — slug-conditional component carries the
 *      section title plus 5 stacked card sections with all DOM mockups.
 *   4. Security (chrome — toggled on via showSecurity)
 *   5. FeatureCustomerCarousel + LibraryFAQ + GetStartedSteps + Footer (chrome)
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
  // The body of the page is rendered by ActivityLogsHighlights as a
  // hardcoded slug-conditional component (see
  // components/feature/ActivityLogsHighlights.tsx + the slug check in
  // app/(features)/[slug]/page.tsx). All 5 card mockups + section title
  // are DOM, so nothing flows through Sanity for the body.

  const doc = {
    _id: "featurePage-activity-logs",
    _type: "featurePage",
    title: "Activity Logs",
    slug: { _type: "slug", current: "activity-logs" },
    category: "Async",
    tagline: "Every action. Human or AI. One trail.",
    metaTitle: "Activity Logs | Velt",
    metaDescription:
      "Every user and AI agent action. Full attribution. Immutable trail. No schema design. No event infrastructure.",
    hero: {
      heading: "Every action.  Human or AI. One trail",
      subheading:
        "Every user and AI agent action. Full attribution. Immutable trail. No schema design. No event infrastructure.",
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
