#!/usr/bin/env node
/**
 * Seed the useCasePage-video-editor document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-use-case-video-editor.mjs
 *   # or:  SANITY_API_TOKEN=<token> node scripts/seed-use-case-video-editor.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-use-case-video-editor.mjs
 *
 * Idempotent: re-runs replace the existing useCasePage-video-editor doc and
 * re-upload the same image assets (Sanity dedupes by SHA-256).
 *
 * Reference: Figma node 177:55703 in HqWIZdR6ISJmaG2n4o3gr8 (Velt Marketing
 * 2026 — Use Case template, instantiated as the Video Editor page). Sections
 * in document order:
 *   1. Hero (chrome)        — eyebrow "Video Editor"
 *   2. TrustedLogos (chrome)
 *   3. Feature row — Build   (text left, image right)
 *   4. Feature row — Review  (image left, text right)
 *   5. Feature row — Approve (text left, image right)
 *   6. CustomerUI (chrome) — "How [Customer] Uses Velt"
 *   7. AllLibraries (chrome) — sourced from components/library/shared-content.ts,
 *                              gated on `showLibrarySection` (no CMS data)
 *   8. Security (chrome)
 *   9. FeatureCustomerCarousel (chrome)
 *  10. FAQ + GetStartedSteps + Footer (chrome)
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error(
    "Set SANITY_API_TOKEN env var, or DRY_RUN=1 to preview without writing.",
  );
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
  if (DRY_RUN)
    return { _type: "image", asset: { _ref: `dry-run-${basename(relPath)}` } };
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
  console.log("Uploading video-editor use-case assets…");

  // All three feature rows reuse the listing thumbnail until per-row
  // mp4s/screenshots are produced. Flip individual `image` fields in the
  // studio when bespoke visuals are ready.
  const rowImage = await uploadImage(
    "public/images/use-case/cards/video-editor.png",
  );

  console.log("  → uploaded.");

  const featureChip = (label) => ({ _type: "useCaseFeatureChip", label });
  const sharedFeatures = [
    { ...featureChip("Live State Sync"), _key: "live-state-sync" },
    { ...featureChip("Single Editor Mode"), _key: "single-editor-mode" },
  ];

  const doc = {
    _id: "useCasePage-video-editor",
    _type: "useCasePage",
    title: "Video Editor",
    slug: { _type: "slug", current: "video-editor" },
    tagline: "Make your video editor collaborative.",
    metaTitle: "Velt for Video Editors | Velt",
    metaDescription:
      "Add multiplayer commenting, presence, and approvals to your video editor — without rebuilding the collaboration stack.",
    hero: {
      _type: "useCaseHero",
      eyebrow: "Video Editor",
      heading: "Make your Video Editor Collaborative",
      subheading:
        "Add real-time presence, frame-accurate comments, and approval flows in days — not quarters.",
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
    showLibrarySection: true,
    showCustomerUI: true,
    showSecurity: true,
    showCustomerCarousel: true,
    sections: [
      {
        _type: "useCaseFeatureRow",
        _key: "row-build",
        eyebrow: "Build",
        heading: "Your users can create storyboards together",
        description:
          "Users can co-create storyboards collaboratively without ever leaving your video editor.",
        features: sharedFeatures,
        image: rowImage,
        imagePosition: "right",
      },
      {
        _type: "useCaseFeatureRow",
        _key: "row-review",
        eyebrow: "Review",
        heading: "Frame by frame feedback and everything in between",
        description:
          "Users can directly comment on individual frames or on segments of the media timeline.",
        features: sharedFeatures,
        image: rowImage,
        imagePosition: "left",
      },
      {
        _type: "useCaseFeatureRow",
        _key: "row-approve",
        eyebrow: "Approve",
        heading: "Users can iterate and approve changes fast",
        description:
          "Build approval flows directly into your video editor.",
        features: sharedFeatures,
        image: rowImage,
        imagePosition: "right",
      },
    ],
    faq: {
      _type: "useCaseFaq",
      items: [
        {
          _key: "libraries",
          question: "Does it work with the libraries my video editor uses?",
          answer:
            "Yes — Velt is framework-agnostic and ships first-class adapters for popular editor and chart libraries. Drop our SDK in alongside whatever you already use.",
        },
        {
          _key: "selfhost",
          question: "Can I self-host the data?",
          answer:
            "Enterprise plans include a self-hosting option so your customers' sensitive media stays in your infrastructure.",
        },
        {
          _key: "integration",
          question: "How long does integration take?",
          answer:
            "Most teams ship a working integration in under a week. Drop-in components cover the common surfaces (comments, presence, notifications, huddles); the API surface customises behaviour.",
        },
        {
          _key: "customize",
          question: "Can I customize the look and feel?",
          answer:
            "Velt components support full layout, CSS, template-variable, and conditional-rendering customization. Style with your existing design system, or build entirely custom UIs on top of our APIs.",
        },
      ],
    },
    getStartedSteps: {
      _type: "getStartedSteps",
      step1PackageName: "@veltdev/client",
    },
  };

  if (DRY_RUN) {
    console.log("\n[DRY_RUN] Document that would be written:\n");
    console.log(JSON.stringify(doc, null, 2));
    return;
  }

  console.log("Writing useCasePage-video-editor…");
  await client.createOrReplace(doc);
  console.log("  ✓ Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
