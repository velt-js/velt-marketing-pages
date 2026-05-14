#!/usr/bin/env node
/**
 * Seed the featurePage-dev-tools document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-dev-tools.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-dev-tools.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-dev-tools.mjs
 *
 * Idempotent: re-runs replace the existing featurePage-dev-tools doc and
 * re-upload the same image assets (Sanity dedupes by SHA-256).
 *
 * Reference: Figma node 177:53052 in HqWIZdR6ISJmaG2n4o3gr8 (Velt Marketing
 * 2026 — Dev Tools page). Sections in order:
 *   1. Hero (chrome — heading "Velt DevTools Chrome Extension")
 *   2. TrustedLogos (chrome) — no demo sidebar; Figma shows only an empty
 *      placeholder rect between hero and trusted logos.
 *   3. Image Card "Get The Overview" + Linda testimonial
 *   4. Image Card "Access Data" + Linda testimonial
 *   5. Image Card "Observe Event Stream" + Linda testimonial
 *   6. Image Card "Inspect Components" + Linda testimonial
 *   7. Image Card "Test With Any SDK Version" + Linda testimonial
 *   8. Customer Testimonial Carousel "Our Customers Trust Us" (chrome)
 *   9-11. FAQ (default sharedFAQ) + GetStartedSteps + Footer (chrome)
 *
 * showCustomerStories and showSecurity are both false — the Figma omits the
 * "How X Leverages Velt" carousel and the Enterprise-Grade Security block.
 *
 * All 5 image cards share the same inspector-table screenshot in the Figma
 * (image 3008, reused 5 times). Stored once at
 * public/images/features/dev-tools/card-shared-inspector.png and uploaded
 * once below — Sanity references it from each section. Swap individual
 * cards' images later via Sanity Studio when unique screenshots exist.
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
  console.log("Uploading dev-tools feature assets...");
  const avatarLinda = await uploadImage("public/images/home/linda-steps.png");
  const cardImage = await uploadImage(
    "public/images/features/dev-tools/card-shared-inspector.png",
  );
  console.log("  → uploaded.");

  const lindaTestimonial = {
    name: "Linda Belcher",
    role: "Product Manager @HeyGen",
    quote:
      "Velt hosts all collaboration functionalities needed to boost engagement at HeyGen",
    accentFragment: "boost engagement",
    accentColor: "#b4b1fa",
    avatar: avatarLinda,
  };

  const getExtensionCta = {
    _type: "ctaLink",
    label: "Get Extension",
    href: "https://chromewebstore.google.com/detail/velt-devtools/nfldoicbagllmegffdapcnohakpamlnl",
    newTab: true,
  };

  const sharedImageProps = {
    image: cardImage,
    imageAlt:
      "Velt DevTools inspector showing Api Key, User, Organization, Documents, Locations, and Folders rows",
    imageWidth: 1280,
    imageHeight: 568,
    imageBottomOffset: 0,
  };

  const doc = {
    _id: "featurePage-dev-tools",
    _type: "featurePage",
    title: "Dev Tools",
    slug: { _type: "slug", current: "dev-tools" },
    category: "Platform",
    tagline: "Debug Velt directly in the browser.",
    metaTitle: "Velt DevTools | Velt",
    metaDescription:
      "Debug Velt collaboration data right in your browser. View events, explore component structure, inspect data, and switch SDK versions with the Velt DevTools Chrome Extension.",
    hero: {
      heading: "Velt DevTools Chrome Extension",
      subheading:
        "View events, explore component structure, and debug collaboration data directly in the browser",
      decorated: true,
      primaryCta: {
        _type: "ctaLink",
        label: "Get Chrome Extension",
        href: "https://chromewebstore.google.com/detail/velt-devtools/nfldoicbagllmegffdapcnohakpamlnl",
        newTab: true,
      },
      secondaryCta: {
        _type: "ctaLink",
        label: "Get Free API Key",
        href: "https://console.velt.dev/",
        newTab: true,
      },
    },
    showTrustedLogos: true,
    showSecurity: false,
    showCustomerStories: false,
    sections: [
      {
        _type: "featureImageCardSection",
        _key: "img-overview",
        heading: "Get The Overview",
        subheading: "See key details about your Velt installation",
        primaryCta: getExtensionCta,
        ...sharedImageProps,
        videoSrc: "/videos/features/dev-tools/get-the-overview.mp4",
        inlineTestimonial: lindaTestimonial,
      },
      {
        _type: "featureImageCardSection",
        _key: "img-access-data",
        heading: "Access Data",
        subheading: "View all the Velt data surfaced in your product",
        primaryCta: getExtensionCta,
        ...sharedImageProps,
        videoSrc: "/videos/features/dev-tools/access-data.mp4",
        inlineTestimonial: lindaTestimonial,
      },
      {
        _type: "featureImageCardSection",
        _key: "img-event-stream",
        heading: "Observe Event Stream",
        subheading: "Monitor Velt events in real-time",
        primaryCta: getExtensionCta,
        ...sharedImageProps,
        videoSrc: "/videos/features/dev-tools/observe-event-stream.mp4",
        inlineTestimonial: lindaTestimonial,
      },
      {
        _type: "featureImageCardSection",
        _key: "img-inspect",
        heading: "Inspect Components",
        subheading:
          "Find and interact with Velt components in your product",
        primaryCta: getExtensionCta,
        ...sharedImageProps,
        videoSrc: "/videos/features/dev-tools/inspect-components.mp4",
        inlineTestimonial: lindaTestimonial,
      },
      {
        _type: "featureImageCardSection",
        _key: "img-sdk-version",
        heading: "Test With Any SDK Version",
        subheading: "Quickly switch between different versions of Velt SDK",
        primaryCta: getExtensionCta,
        ...sharedImageProps,
        videoSrc: "/videos/features/dev-tools/test-with-any-sdk-version.mp4",
        inlineTestimonial: lindaTestimonial,
      },
    ],
    getStartedSteps: { step1PackageName: "@veltdev/react" },
    // FAQ left empty — page falls back to the 4 sharedFAQ entries from
    // components/library/shared-content.ts. Matches the 4 placeholder rows
    // in the Figma FAQ block.
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
