#!/usr/bin/env node
/**
 * Seed the libraryPage-nivo-charts document in Sanity from the live page at
 * https://velt.dev/libraries/nivo-charts.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-library-nivo-charts.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-library-nivo-charts.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-library-nivo-charts.mjs
 *
 * Idempotent. Re-runs replace the existing libraryPage-nivo-charts doc;
 * image assets dedupe by SHA-256 in Sanity.
 *
 * Mirrors the highcharts seed structurally — same 3×2 image-mode bento with
 * the same 6 cards and the same demo-stage layout. Reuses the highcharts
 * bento PNGs since no nivo-specific tiles ship with the repo and the live
 * pages render the same 6 feature tiles. Only the text that is intrinsically
 * Nivo-specific differs: hero/bento headings + subheadings, page meta,
 * code snippet, package name, and FAQ.
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

const SETUP_CODE = `<ResponsiveLine
    data={data}
    layers={[
        'grid', 'markers', 'axes', 'areas', 'points',
        // Add this function with VeltNivoChartComments
        // component to allow Velt comments inside Chart
        (chartComputedData) => {
            return (
                <VeltNivoChartComments
                    id="NivoLineChartExample"
                    chartComputedData={chartComputedData}
                    dialogMetadataTemplate={['label', 'value', 'groupId']}
                />
            );
        },
    ]}
/>`;

async function main() {
  console.log("Uploading nivo-charts images...");
  const previewImage = await uploadImage(
    "public/images/home/libraries/demos/nivo.png",
  );
  const logo = await uploadImage(
    "public/images/home/libraries/nivo-charts.png",
  );
  const avatarEthan = await uploadImage(
    "public/images/home/libraries/tiptap/avatars/ethan.png",
  );
  // Bento tiles are reused from highcharts since both chart libraries surface
  // the same 6 feature tiles on the live site.
  const tileComments = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-comments.jpg",
  );
  const tileSticky = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-sticky.jpg",
  );
  const tileCursors = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-cursors.jpg",
  );
  const tileMentions = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-mentions.jpg",
  );
  const tileNotification = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-notification.jpg",
  );
  const tileOffline = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-offline.jpg",
  );
  console.log("  → uploaded.");

  const doc = {
    _id: "libraryPage-nivo-charts",
    _type: "libraryPage",
    title: "Nivo Charts",
    slug: { _type: "slug", current: "nivo-charts" },
    category: "Charts",
    tagline:
      "Add comments, notifications, and review workflows to Nivo charts in minutes.",
    logo,
    metaTitle: "Collaboration Toolkit for Nivo Charts | Velt",
    metaDescription:
      "Add comments, notifications, and review workflows to Nivo charts in minutes",
    hero: {
      heading: "Collaboration Toolkit for Nivo Charts",
      subheading:
        "Add comments, notifications, and review workflows to Nivo charts in minutes",
      decorated: true,
      primaryCta: {
        _type: "ctaLink",
        label: "Start Free",
        href: "https://console.velt.dev/?ref=library-tiptap",
        newTab: true,
      },
      secondaryCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://velt.dev/docs/async-collaboration/comments/setup/chart-comments-setup/nivo-charts",
        newTab: true,
      },
    },
    demoStage: {
      label: "Nivo Charts",
      // NOTE: live page has these pointing at the reactflow demo (same as
      // the highcharts page). Mirrored verbatim per direction; correct
      // upstream and re-seed when the real nivo demo + repo are available.
      demoUrl: "https://velt-reactflow-crdt-demo.vercel.app/",
      githubUrl:
        "https://github.com/velt-js/velt-reactflow-crdt-demo/tree/main",
      previewImage,
    },
    bento: {
      eyebrow: "No Custom Logic Required",
      heading: "Built for Nivo Charts",
      subheading:
        "Deeply embedded in Nivo and works reliably as chart data and layouts change",
      viewDocsCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://velt.dev/docs/async-collaboration/comments/setup/chart-comments-setup/nivo-charts",
        newTab: true,
      },
      primaryCta: {
        _type: "ctaLink",
        label: "View Examples",
        href: "https://velt-tiptap-crdt-demo.vercel.app/",
        newTab: true,
      },
      // 3 rows × 2 columns. Heights match the highcharts profile.
      rowHeights: [493, 429, 424],
      // Cards render in row-major order:
      //   Row 1: Comments on data points | Sticky Across Filters
      //   Row 2: Real-time Presence       | User Mentions
      //   Row 3: Notification             | Offline Storage
      cards: [
        {
          _type: "bentoCard",
          _key: "card-comments",
          title: "Comments on data points",
          description: "Leave comments on different types of charts",
          image: tileComments,
        },
        {
          _type: "bentoCard",
          _key: "card-sticky",
          title: "Sticky Across Filters",
          description: "Comments that stick across aggregation and filters",
          image: tileSticky,
        },
        {
          _type: "bentoCard",
          _key: "card-cursors",
          title: "Real-time Presence and Cursors",
          description: "View other users on your document",
          image: tileCursors,
        },
        {
          _type: "bentoCard",
          _key: "card-mentions",
          title: "User Mentions",
          description:
            "Enable rich conversations with replies, @mentions, and reactions",
          image: tileMentions,
        },
        {
          _type: "bentoCard",
          _key: "card-notification",
          title: "Notification",
          description:
            "See what changes have been made to a shared document with timestamps",
          image: tileNotification,
        },
        {
          _type: "bentoCard",
          _key: "card-offline",
          title: "Offline Storage",
          description:
            "Keep working when the connection drops. Data will sync when you reconnect",
          image: tileOffline,
        },
      ],
    },
    inlineTestimonial: {
      name: "Ethan Veres",
      role: "CTO @eqtble",
      quote:
        "Commenting is something we wanted in our app, Velt made it possible",
      avatar: avatarEthan,
    },
    getStartedCallout: {
      heading: "Production-Ready in Minutes",
      body: "Install the Velt Nivo Charts extension. Test. Ship.",
      viewDocsHref:
        "https://velt.dev/docs/async-collaboration/comments/setup/chart-comments-setup/nivo-charts",
      getApiKeyHref: "https://console.velt.dev/",
      codeSnippet: {
        code: SETUP_CODE,
        language: "tsx",
      },
    },
    getStartedSteps: {
      step1PackageName: "@veltdev/react",
    },
    faq: {
      items: [
        {
          _key: "faq-data-changes",
          question: "Will comments update as data changes?",
          answer:
            "Yes. Velt anchors each comment to a data point, series, or range and re-attaches as the underlying dataset is updated, filtered, or re-aggregated.",
        },
        {
          _key: "faq-animated",
          question: "Does this work with animated charts?",
          answer:
            "Yes. The integration tracks chart-computed coordinates after each render, so comments stay attached through transitions, animations, and re-layouts.",
        },
        {
          _key: "faq-comments-only",
          question: "Can I add comments only?",
          answer:
            "Yes. The chart-comments package can be installed and used standalone, without enabling presence, cursors, or notifications.",
        },
        {
          _key: "faq-backend",
          question: "Do I need backend infrastructure?",
          answer:
            "No. Velt provides a fully managed collaboration backend for comments, presence, and persistence — no server to run.",
        },
        {
          _key: "faq-pricing",
          question: "How does pricing work?",
          answer:
            "Pricing is based on Monthly Active Collaborators who actively use Velt features, not raw connections or messages.",
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
