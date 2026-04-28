#!/usr/bin/env node
/**
 * Seed the libraryPage-highcharts document in Sanity from the live page at
 * https://velt.dev/libraries/highcharts.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-library-highcharts.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-library-highcharts.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-library-highcharts.mjs
 *
 * Idempotent. Re-runs replace the existing libraryPage-highcharts doc;
 * image assets dedupe by SHA-256 in Sanity.
 *
 * Note: live demo iframe + GitHub link both point to the reactflow demo
 * upstream. Mirrored verbatim here per direction.
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

const SETUP_CODE = `<div style={{ position: 'relative' }}>
    <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
    />
    {chartComponentRef.current && (
        <VeltHighChartComments
            id="HighChartsLineChartExample"
            chartComputedData={chartComponentRef.current as any}
        />
    )}
</div>`;

async function main() {
  console.log("Uploading highcharts images...");
  const previewImage = await uploadImage("public/images/home/libraries/demos/highcharts.png");
  const logo = await uploadImage("public/images/home/libraries/highcharts.png");
  const avatarEthan = await uploadImage(
    "public/images/home/libraries/tiptap/avatars/ethan.png",
  );
  const tileComments = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-comments.png",
  );
  const tileSticky = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-sticky.png",
  );
  const tileCursors = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-cursors.png",
  );
  const tileMentions = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-mentions.png",
  );
  const tileNotification = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-notification.png",
  );
  const tileOffline = await uploadImage(
    "public/images/home/libraries/highcharts/bento/tile-offline.png",
  );
  console.log("  → uploaded.");

  const doc = {
    _id: "libraryPage-highcharts",
    _type: "libraryPage",
    title: "HighCharts",
    slug: { _type: "slug", current: "highcharts" },
    category: "Charts",
    tagline:
      "Add comments, notifications, and review workflows to Highcharts in minutes.",
    logo,
    pageMeta: {
      metaTitle: "Collaboration Toolkit for HighCharts | Velt",
      metaDescription:
        "Add comments, notifications, and review workflows to Highcharts in minutes",
    },
    hero: {
      heading: "Collaboration Toolkit for HighCharts",
      subheading:
        "Add comments, notifications, and review workflows to Highcharts in minutes",
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
        href: "https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts",
        newTab: true,
      },
    },
    demoStage: {
      label: "HighCharts",
      // NOTE: live page has these pointing at the reactflow demo. Mirrored
      // verbatim per direction; correct upstream and re-seed when the real
      // highcharts demo + repo are available.
      demoUrl: "https://velt-reactflow-crdt-demo.vercel.app/",
      githubUrl: "https://github.com/velt-js/velt-reactflow-crdt-demo/tree/main",
      previewImage,
    },
    bento: {
      eyebrow: "No Custom Logic Required",
      heading: "Built for HighCharts",
      subheading:
        "Deeply embedded in Highcharts and works reliably as charts update and re-render",
      viewDocsCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts",
        newTab: true,
      },
      primaryCta: {
        _type: "ctaLink",
        label: "View Examples",
        href: "https://velt-tiptap-crdt-demo.vercel.app/",
        newTab: true,
      },
      // 3 rows × 2 columns. Heights match the highcharts Figma node 1:9845.
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
          description: "Enable rich conversations with replies, @mentions, and reactions",
          image: tileMentions,
        },
        {
          _type: "bentoCard",
          _key: "card-notification",
          title: "Notification",
          description: "See what changes have been made to a shared document with timestamps",
          image: tileNotification,
        },
        {
          _type: "bentoCard",
          _key: "card-offline",
          title: "Offline Storage",
          description: "Keep working when the connection drops. Data will sync when you reconnect",
          image: tileOffline,
        },
      ],
    },
    inlineTestimonial: {
      name: "Ethan Veres",
      role: "CTO @eqtble",
      quote: "Commenting is something we wanted in our app, Velt made it possible",
      avatar: avatarEthan,
    },
    getStartedCallout: {
      heading: "Production-Ready in Minutes",
      body: "Install the Velt HighCharts extension. Test. Ship.",
      viewDocsHref:
        "https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts",
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
          _key: "faq-restructure",
          question: "Do I need to restructure my dataset?",
          answer:
            "No, Velt works out-of-the-box without restructuring your data.",
        },
        {
          _key: "faq-servers",
          question: "Do I need to manage servers?",
          answer: "No, Velt handles collaboration infrastructure.",
        },
        {
          _key: "faq-attach",
          question: "What can comments attach to?",
          answer: "Chart elements, series, and ranges.",
        },
        {
          _key: "faq-pricing",
          question: "How does pricing work?",
          answer:
            "Pricing is based on Monthly Active Collaborators who use Velt features.",
        },
        {
          _key: "faq-enterprise",
          question: "Is this suitable for enterprise analytics tools?",
          answer: "Yes, it's built for enterprise analytics products.",
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
