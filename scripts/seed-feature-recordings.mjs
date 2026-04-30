#!/usr/bin/env node
/**
 * Seed the featurePage-recordings document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-recordings.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-recordings.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-recordings.mjs
 *
 * Idempotent: re-runs replace the existing featurePage-recordings doc and
 * re-upload the same image assets (Sanity dedupes by SHA-256).
 *
 * Reference: Figma node 219:18857 in HqWIZdR6ISJmaG2n4o3gr8 (Velt Marketing
 * 2026 — Recordings page). Sections in order:
 *   1. Hero (chrome)
 *   2. RecordingsDemoSidebar (chrome — slug-conditional in [slug]/page.tsx)
 *   3. TrustedLogos (chrome)
 *   4. Image Card "Recordings enhanced by AI" + Linda testimonial
 *   5. Image Card "Keep users in your app" + Linda testimonial
 *   6. Image Card "Customize Everything" + Linda testimonial
 *   7. Customer Stories carousel ("How X Leverages Velt") (chrome toggle)
 *   8. Security (chrome)
 *   9. Customer Testimonial Carousel "Our Customers Trust Us"
 *  10-12. FAQ + GetStartedSteps + Footer (chrome)
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
  console.log("Uploading recordings feature assets...");
  const avatarLinda = await uploadImage("public/images/home/linda-steps.png");
  const card1Image = await uploadImage(
    "public/images/features/recordings/card-1-recordings-ai.png",
  );
  const card2Image = await uploadImage(
    "public/images/features/recordings/card-2-keep-users-in-app.png",
  );
  const card3Image = await uploadImage(
    "public/images/features/recordings/card-3-customize-everything.png",
  );
  console.log("  → uploaded.");

  // Inline-testimonial bar that appears at the bottom of each image card.
  // Accent color matches Figma (`#b4b1fa`, the same purple highlight the
  // commenting bento sections use).
  const lindaTestimonial = {
    name: "Linda Belcher",
    role: "Product Manager @HeyGen",
    quote:
      "Velt hosts all collaboration functionalities needed to boost engagement at HeyGen",
    accentFragment: "boost engagement",
    accentColor: "#b4b1fa",
    avatar: avatarLinda,
  };

  const doc = {
    _id: "featurePage-recordings",
    _type: "featurePage",
    title: "Recordings",
    slug: { _type: "slug", current: "recordings" },
    category: "Async",
    tagline: "Add Recording to your product.",
    metaTitle: "Recordings | Velt",
    metaDescription:
      "Add audio, video, and screen recording to your product. AI-enhanced summaries, transcriptions, captions, and instant shareable links — fully customizable.",
    hero: {
      heading: "Add Recording to your product",
      subheading:
        "Capture audio, video, and screen recordings inside your app",
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
    sections: [
      // ---- Image Card 1: Recordings enhanced by AI ----
      {
        _type: "featureImageCardSection",
        _key: "img-ai",
        heading: "Recordings enhanced by AI",
        subheading: "AI Batteries Included",
        primaryCta: {
          _type: "ctaLink",
          label: "Get Your API Key",
          href: "https://console.velt.dev/",
          newTab: true,
        },
        image: card1Image,
        imageAlt:
          "Summary card with transcription excerpt, plus floating Closed Captions, Summary & Transcription, and Instant Sharable link chips",
        imageWidth: 1280,
        imageHeight: 467,
        imageBottomOffset: -2.38,
        inlineTestimonial: lindaTestimonial,
      },
      // ---- Image Card 2: Keep users in your app ----
      {
        _type: "featureImageCardSection",
        _key: "img-inapp",
        heading: "Keep users in your app",
        subheading: "Users don't need to leave for recordings",
        primaryCta: {
          _type: "ctaLink",
          label: "Get Your API Key",
          href: "https://console.velt.dev/",
          newTab: true,
        },
        image: card2Image,
        imageAlt:
          "Three category cards — Feedback Tools, Sales Tools, Ticketing Systems — illustrating where embedded recording can replace external workflows",
        imageWidth: 1199,
        imageHeight: 297,
        imageBottomOffset: 68.62,
        inlineTestimonial: lindaTestimonial,
      },
      // ---- Image Card 3: Customize Everything ----
      {
        _type: "featureImageCardSection",
        _key: "img-customize",
        heading: "Customize Everything",
        subheading: "Components can match your product's look and feel",
        primaryCta: {
          _type: "ctaLink",
          label: "Get Your API Key",
          href: "https://console.velt.dev/",
          newTab: true,
        },
        image: card3Image,
        imageAlt:
          "Audio recording control row with pause button, timer, waveform, and Tim's Recording chip alongside CC and shareable link icons",
        imageWidth: 1280,
        imageHeight: 467,
        imageBottomOffset: -2.38,
        inlineTestimonial: lindaTestimonial,
      },
    ],
    getStartedSteps: { step1PackageName: "@veltdev/react" },
    // FAQ left empty for now — the page falls back to the 4 sharedFAQ entries
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
