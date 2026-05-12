#!/usr/bin/env node
/**
 * Seed the featurePage-notifications document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-notifications.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-notifications.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-notifications.mjs
 *
 * Idempotent: re-runs replace the existing featurePage-notifications doc and
 * re-upload the same image assets (Sanity dedupes by SHA-256).
 *
 * Reference: Figma node 220:22138 in HqWIZdR6ISJmaG2n4o3gr8 (Velt Marketing
 * 2026 — Notifications page). Sections in order:
 *   1. Hero (chrome)
 *   2. NotificationsDemoSidebar (chrome — slug-conditional in [slug]/page.tsx)
 *   3. TrustedLogos (chrome)
 *   4. Image Card "Why use Velt for Notifications?" (Prioritized Inbox +
 *      Group Notifications baked into one PNG) + Linda Belcher testimonial
 *   5. Customer Testimonial Carousel "Our Customers Trust Us" (chrome)
 *   6-8. FAQ + GetStartedSteps + Footer (chrome)
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

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

const PROJECT_ROOT = resolve(import.meta.dirname, "..");

async function uploadImage(relPath) {
  if (DRY_RUN) return { _type: "image", asset: { _ref: `dry-run-${basename(relPath)}` } };
  const filePath = resolve(PROJECT_ROOT, relPath);
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: basename(filePath),
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function main() {
  // The "Why use Velt for Notifications?" highlight section is rendered
  // as a hardcoded slug-conditional component (NotificationsHighlights) so
  // the popover mockups stay sharp at any zoom — see
  // components/feature/NotificationsHighlights.tsx and the slug check in
  // app/(features)/[slug]/page.tsx. As a result, Sanity has no body sections
  // for this page; chrome (TrustedLogos, FAQ, GetStarted, Footer, etc.)
  // still flows from the doc.

  const doc = {
    _id: "featurePage-notifications",
    _type: "featurePage",
    title: "Notifications",
    slug: { _type: "slug", current: "notifications" },
    category: "Async",
    tagline: "Add notifications to your product.",
    metaTitle: "Notifications | Velt",
    metaDescription:
      "Add a robust, reliable in-app notification system to your product. Prioritized inbox, group notifications, hooks, and more — fully customizable.",
    hero: {
      heading: "Add Notifications Before Standup",
      subheading:
        "Add AI powered collaboration features ridiculously fast",
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
    showSecurity: false,
    showCustomerStories: false,
    // No body sections — see NotificationsHighlights component.
    sections: [],
    getStartedSteps: { step1PackageName: "@veltdev/react" },
    // FAQ left empty — page falls back to the 4 sharedFAQ entries
    // from components/library/shared-content.ts.
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
