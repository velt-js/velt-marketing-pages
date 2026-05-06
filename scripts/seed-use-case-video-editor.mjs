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
 *   1. Hero (chrome) — "Make your Video Editor Collaborative"
 *   2. TrustedLogos (chrome)
 *   3. Bento twoCol — storyboards + frame-by-frame feedback
 *   4. Bento oneCol — "Users can iterate and approve changes fast"
 *   5. Bento oneCol — "Get Velt — Integrate Velt"
 *   6. Library Support — Tiptap, Lexical, Slate, CodeMirror, BlockNote, …
 *   7. CustomerUI (chrome)
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

  // Re-use the listing thumbnail as the bento visual until per-bento
  // mp4s are produced. The 3 bento blocks share the same image for
  // now — flip individual `image` fields in the studio when bespoke
  // visuals (or videos) are ready.
  const cardImage = await uploadImage(
    "public/images/use-case/cards/video-editor.png",
  );

  const libraryLogo = async (relPath, name) => ({
    _type: "librarySupportLogo",
    _key: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    name,
    logo: await uploadImage(relPath),
  });

  const libraryLogos = [
    await libraryLogo("public/images/home/logo-tiptap.svg", "Tiptap"),
    await libraryLogo("public/images/home/logo-lexical.svg", "Lexical"),
    await libraryLogo("public/images/home/logo-slate.svg", "Slate"),
    await libraryLogo("public/images/home/logo-codemirror.svg", "CodeMirror"),
    await libraryLogo("public/images/home/logo-blocknote.svg", "BlockNote"),
    await libraryLogo("public/images/home/logo-reactflow.svg", "React Flow"),
    await libraryLogo("public/images/home/logo-highcharts-text.svg", "Highcharts"),
    await libraryLogo("public/images/home/logo-chartjs.svg", "Chart.js"),
  ];

  console.log("  → uploaded.");

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
    showCustomerUI: true,
    showSecurity: true,
    showCustomerCarousel: true,
    sections: [
      // --- Bento 1: two-col — storyboards + frame-by-frame feedback ---
      {
        _type: "useCaseBentoSection",
        _key: "bento-storyboards",
        variant: "twoCol",
        cards: [
          {
            _type: "useCaseBentoCard",
            _key: "storyboards",
            title: "Your users can create storyboards together",
            description:
              "Multiplayer storyboarding so editors and producers can iterate side-by-side.",
            image: cardImage,
            accentColor: "#EFEEFD",
          },
          {
            _type: "useCaseBentoCard",
            _key: "frame-feedback",
            title: "Frame by frame feedback and everything in between",
            description:
              "Comments, reactions, and assignments pinned to the exact timeline frame.",
            image: cardImage,
            accentColor: "#EFEEFD",
          },
        ],
      },
      // --- Bento 2: one-col — iterate and approve ---
      {
        _type: "useCaseBentoSection",
        _key: "bento-iterate",
        variant: "oneCol",
        cards: [
          {
            _type: "useCaseBentoCard",
            _key: "iterate",
            title: "Users can iterate and approve changes fast",
            description:
              "Stakeholders see edits and sign off without leaving the editor — no Loom round-trips, no Slack threads.",
            image: cardImage,
            accentColor: "#EFEEFD",
          },
        ],
      },
      // --- Bento 3: one-col — Integrate Velt ---
      {
        _type: "useCaseBentoSection",
        _key: "bento-integrate",
        variant: "oneCol",
        cards: [
          {
            _type: "useCaseBentoCard",
            _key: "integrate",
            title: "Integrate Velt in days, not quarters",
            description:
              "Drop-in components plus a powerful API surface. An intern can wire it up; senior engineers customise behaviour.",
            image: cardImage,
            accentColor: "#EFEEFD",
          },
        ],
      },
      // --- Library Support ---
      {
        _type: "librarySupportSection",
        _key: "library-support",
        heading: "Works seamlessly with your libraries",
        subheading:
          "First-class adapters for the editor, chart, and canvas libraries you already use.",
        logos: libraryLogos,
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
