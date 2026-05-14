#!/usr/bin/env node
/**
 * Seed the libraryPage-chartjs document in Sanity from the live page at
 * https://velt.dev/libraries/chartjs.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-library-chartjs.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-library-chartjs.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-library-chartjs.mjs
 *
 * Idempotent. Re-runs replace the existing libraryPage-chartjs doc;
 * image assets dedupe by SHA-256 in Sanity.
 *
 * Note: live demo iframe + GitHub link both point to the reactflow demo
 * upstream. Mirrored verbatim here per direction; correct upstream and
 * re-seed when the real chartjs demo + repo are available.
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

const SETUP_CODE = `<div
    key={commentAnnotation.annotationId}
    style={{
        left: \`\${x}px\`,
        top: \`\${y}px\`,
        position: 'absolute',
        transform: 'translate(0%, -100%)',
        zIndex: 1000,
    }}
>
    <VeltCommentPin annotationId={commentAnnotation.annotationId} />
    {/* Velt comment pin component */}
</div>`;

async function main() {
  console.log("Uploading chartjs images...");
  const previewImage = await uploadImage("public/images/home/libraries/demos/chartjs.png");
  const logo = await uploadImage("public/images/home/libraries/chartjs.png");
  const avatarEthan = await uploadImage(
    "public/images/home/libraries/tiptap/avatars/ethan.png",
  );
  const tileComments = await uploadImage(
    "public/images/home/libraries/chartjs/bento/tile-comments.jpg",
  );
  const tileSticky = await uploadImage(
    "public/images/home/libraries/chartjs/bento/tile-sticky.jpg",
  );
  const tileCursors = await uploadImage(
    "public/images/home/libraries/chartjs/bento/tile-cursors.jpg",
  );
  const tileMentions = await uploadImage(
    "public/images/home/libraries/chartjs/bento/tile-mentions.jpg",
  );
  const tileNotification = await uploadImage(
    "public/images/home/libraries/chartjs/bento/tile-notification.jpg",
  );
  const tileOffline = await uploadImage(
    "public/images/home/libraries/chartjs/bento/tile-offline.jpg",
  );
  console.log("  → uploaded.");

  const doc = {
    _id: "libraryPage-chartjs",
    _type: "libraryPage",
    title: "Chart.js",
    slug: { _type: "slug", current: "chartjs" },
    category: "Charts",
    tagline:
      "Add comments, notifications, and review workflows to Chart.js in minutes.",
    logo,
    metaTitle: "Collaboration Toolkit for Chart.js | Velt",
    metaDescription:
      "Add comments, notifications, and review workflows to Chart.js in minutes.",
    hero: {
      heading: "Collaboration Toolkit for Chart.js",
      subheading:
        "Add comments, notifications, and review workflows to Chart.js in minutes",
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
        href: "https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/chartjs",
        newTab: true,
      },
    },
    demoStage: {
      label: "Chart.js",
      // NOTE: live page has these pointing at the reactflow demo. Mirrored
      // verbatim per direction; correct upstream and re-seed when the real
      // chartjs demo + repo are available.
      demoUrl: "https://velt-reactflow-crdt-demo.vercel.app/",
      githubUrl: "https://github.com/velt-js/velt-reactflow-crdt-demo/tree/main",
      previewImage,
    },
    bento: {
      eyebrow: "No Custom Logic Required",
      heading: "Built for Chart.js",
      subheading:
        "Deeply embedded in Chart.js and works reliably as data and visuals update",
      viewDocsCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/chartjs",
        newTab: true,
      },
      primaryCta: {
        _type: "ctaLink",
        label: "View Examples",
        href: "https://velt-tiptap-crdt-demo.vercel.app/",
        newTab: true,
      },
      // 3 rows × 2 columns. Heights mirror highcharts.
      rowHeights: [493, 429, 424],
      // Cards render in row-major order:
      //   Row 1: Comments on data points  | Sticky Across Filters
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
          title: "Notifications",
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
      body: "Install the Velt Chart.js extension. Test. Ship.",
      viewDocsHref:
        "https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/chartjs",
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
          _key: "faq-backend",
          question: "Do I need a backend?",
          answer: "No, Velt handles storage and notifications.",
        },
        {
          _key: "faq-attach",
          question: "What can comments attach to?",
          answer: "Points, series, and chart ranges.",
        },
        {
          _key: "faq-pricing",
          question: "How does pricing work?",
          answer:
            "Pricing is based on Monthly Active Collaborators who use Velt features.",
        },
        {
          _key: "faq-analytics",
          question: "Is this suitable for analytics reviews?",
          answer: "Yes, it’s designed for data feedback.",
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
