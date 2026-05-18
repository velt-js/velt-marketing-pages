#!/usr/bin/env node
/**
 * Seed the migrationPage-liveblocks document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-migrate-liveblocks.mjs
 *   # or:  SANITY_API_TOKEN=<token> node scripts/seed-migrate-liveblocks.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-migrate-liveblocks.mjs
 *
 * Idempotent: re-runs replace the existing migrationPage-liveblocks doc
 * and re-upload the same image assets (Sanity dedupes by SHA-256).
 *
 * Reference: Figma node 217:1642 in HqWIZdR6ISJmaG2n4o3gr8 (Velt Marketing
 * 2026 — Migrate-from-Liveblocks template).
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
  console.log("Uploading migrate-liveblocks assets…");

  const competitorLogo = await uploadImage(
    "public/images/migrate/liveblocks-logo.svg",
  );
  const lindaAvatar = await uploadImage(
    "public/images/migrate/linda-avatar.png",
  );
  const featureExtensiveImage = await uploadImage(
    "public/images/migrate/feature-extensive-features.png",
  );
  const featureCustomizationImage = await uploadImage(
    "public/images/migrate/feature-full-customization.png",
  );
  const featureSupportImage = await uploadImage(
    "public/images/migrate/feature-dedicated-support.png",
  );

  console.log("  → uploaded.");

  const doc = {
    _id: "migrationPage-liveblocks",
    _type: "migrationPage",
    title: "Liveblocks",
    slug: { _type: "slug", current: "liveblocks" },
    tagline: "Migrate from Liveblocks to Velt with dedicated support.",
    metaTitle: "Migrate from Liveblocks to Velt | Velt",
    metaDescription:
      "Move from Liveblocks to Velt in minutes. Hands-on dedicated support, scripts to export your data, and feature parity that ships in days, not quarters.",
    competitorLogo,
    hero: {
      _type: "useCaseHero",
      heading: "Migrate from Liveblocks to Velt in minutes",
      subheading:
        "We provide dedicated support to make the transition seamless.",
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
    migrationSteps: {
      _type: "migrationStepsPanel",
      headingPrefix: "Migrate",
      headingHighlight: "in 3 Steps",
      subtitle: "All features take less than 5 minutes to get started",
      primaryCta: {
        _type: "ctaLink",
        label: "Try for Free",
        href: "https://console.velt.dev/",
        newTab: true,
      },
      secondaryCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://velt.dev/docs/",
        newTab: true,
      },
      step1: {
        _type: "migrationStep",
        title: "1. Export Data from Liveblocks",
        description: "We provide scripts and apps to help you export data",
      },
      step2: {
        _type: "migrationStep",
        title: "2. Transfer to Velt",
        description: "One click transfer to Velt database",
      },
      step3: {
        _type: "migrationStep",
        title: "3. Update API Keys & Go Live",
        description: "Set your API key and you are ready to go",
      },
      testimonial: {
        _type: "migrationStepsTestimonial",
        name: "Linda Belcher",
        role: "Product Manager @HeyGen",
        avatar: lindaAvatar,
        quotePrefix: "Velt hosts all collaboration functionalities needed to ",
        quoteHighlight: "boost engagement",
        quoteSuffix: " at HeyGen",
      },
    },
    showTrustedLogos: true,
    showCustomerCarousel: true,
    showFaq: true,
    featureRows: [
      {
        _type: "useCaseFeatureRow",
        _key: "row-extensive-features",
        eyebrow: "01",
        heading: "Extensive Features",
        description: "Choose from comments, recordings and more",
        image: featureExtensiveImage,
        imagePosition: "right",
      },
      {
        _type: "useCaseFeatureRow",
        _key: "row-full-customization",
        eyebrow: "02",
        heading: "Full Customization",
        description: "Bring in your design system or customize CSS directly",
        image: featureCustomizationImage,
        imagePosition: "left",
      },
      {
        _type: "useCaseFeatureRow",
        _key: "row-dedicated-support",
        eyebrow: "03",
        heading: "Dedicated Support",
        description: "We provide resources to help you migrate from Liveblocks",
        image: featureSupportImage,
        imagePosition: "right",
      },
    ],
    carousel: {
      _type: "migrationCarouselSettings",
      heading: "Liveblocks Customers Trust Us",
      subheading:
        "Teams who left Liveblocks for Velt ship collaboration to millions of users every day.",
    },
    faq: {
      _type: "useCaseFaq",
      items: [
        {
          _key: "duration",
          question: "How long does the migration take?",
          answer:
            "Most teams move from Liveblocks to Velt in under a week. Our migration tooling exports your existing data and transfers it to Velt in one click — the rest is updating API keys and shipping.",
        },
        {
          _key: "data-loss",
          question: "Will I lose any of my existing data?",
          answer:
            "No. Our export scripts capture every comment, thread, presence record, and document state from Liveblocks; the transfer step preserves IDs and metadata so users see exactly the same conversations after the cutover.",
        },
        {
          _key: "support",
          question: "Do I have to do this alone?",
          answer:
            "No — every Liveblocks migration includes hands-on support from a Velt engineer. We pair with your team on the export, the cutover, and the smoke-test, typically over a single weekend so your users don't notice a thing.",
        },
        {
          _key: "feature-parity",
          question: "Does Velt support everything Liveblocks does?",
          answer:
            "Yes — and more. Velt covers the comments, presence, cursors, broadcast, and storage primitives Liveblocks customers depend on, plus huddles, recordings, notifications, and an enterprise-ready security posture (SOC 2 Type II + HIPAA-with-BAA).",
        },
        {
          _key: "pricing",
          question: "What does pricing look like compared to Liveblocks?",
          answer:
            "Velt prices on Monthly Active Collaborators (MACs) — users who actually perform CRUD operations on collaboration features — rather than every connected user. For most teams that's a meaningful reduction vs. Liveblocks' MAU-based pricing.",
        },
      ],
    },
  };

  if (DRY_RUN) {
    console.log("\n[DRY_RUN] Document that would be written:\n");
    console.log(JSON.stringify(doc, null, 2));
    return;
  }

  console.log("Writing migrationPage-liveblocks…");
  await client.createOrReplace(doc);
  console.log("  ✓ Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
