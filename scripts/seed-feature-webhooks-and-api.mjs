#!/usr/bin/env node
/**
 * Seed the featurePage-webhooks-and-api document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-webhooks-and-api.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-webhooks-and-api.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-webhooks-and-api.mjs
 *
 * Idempotent: re-runs replace the existing featurePage-webhooks-and-api doc.
 *
 * Reference: Figma node 177:33608 in HqWIZdR6ISJmaG2n4o3gr8 (Velt Marketing
 * 2026 — Webhooks & API page). Sections in order:
 *   1. Hero (chrome — heading "Extend with Webhooks & APIs")
 *   2. WebhooksAndApiDemoSidebar (chrome — slug-conditional in [slug]/page.tsx,
 *      shows the navy Slack Sync tabbed panel)
 *   3. TrustedLogos (chrome)
 *   4. WebhooksAndApiHighlights (slug-conditional component):
 *        - Card 1: Extensive API Coverage (heading + subhead + View Docs +
 *          POST /v2/organizations/add pill + Linda banner)
 *        - Card 2: Extend with Webhooks & APIs (heading + 2 CTAs +
 *          2x3 grid of feature cards + Linda banner)
 *   5. Security (chrome toggle)
 *   6. FeatureCustomerCarousel (chrome)
 *   7. FAQ + GetStartedSteps + Footer (chrome)
 *
 * Body content lives entirely in WebhooksAndApiHighlights — sections[] is
 * empty by design.
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
  const doc = {
    _id: "featurePage-webhooks-and-api",
    _type: "featurePage",
    title: "Webhooks & API",
    slug: { _type: "slug", current: "webhooks-and-api" },
    category: "Platform",
    tagline: "Integrate seamlessly with your systems for extended functionality.",
    metaTitle: "Webhooks & API | Velt",
    metaDescription:
      "Integrate seamlessly with your systems. Velt's REST API and Webhooks let you programmatically perform CRUD operations, sync to Slack, transform payloads, and recover from failures with custom encryption.",
    hero: {
      heading: "Extend with Webhooks & APIs",
      subheading:
        "Integrate seamlessly with your systems for extended functionality",
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
    // Body sections are rendered via the slug-conditional
    // WebhooksAndApiHighlights component in app/features/[slug]/page.tsx.
    // Keeping sections[] empty is intentional.
    sections: [],
    getStartedSteps: { step1PackageName: "@veltdev/react" },
    faq: {
      items: [
        {
          _key: "faq-rest-api",
          question: "What can I do with the REST API?",
          answer:
            "Programmatically perform CRUD operations on every Velt feature — comments, organizations, users, documents, recordings, notifications. The same data your frontend sees is available server-side via signed REST endpoints.",
        },
        {
          _key: "faq-webhook-sign",
          question: "How are webhooks signed?",
          answer:
            "Each webhook payload is signed with HMAC SHA-256 using your project's secret. Verify the X-Velt-Signature header before processing. Failed signature checks are dropped and retried.",
        },
        {
          _key: "faq-rate-limit",
          question: "What are the rate limits?",
          answer:
            "Default 100 requests per second per API key, with burst capacity for write traffic. Reach out for higher limits — enterprise plans get custom quotas plus dedicated retry queues.",
        },
      ],
    },
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
