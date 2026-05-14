#!/usr/bin/env node
/**
 * Seed the libraryPage-slatejs document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-library-slatejs.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-library-slatejs.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-library-slatejs.mjs
 *
 * Idempotent. Re-runs replace the existing libraryPage-slatejs doc; image
 * assets dedupe by SHA-256 in Sanity.
 *
 * Mirrors the tiptap seed verbatim — same hero CTAs, same demo preview
 * image (demos/tiptap.png), same illustration-mode bento, same 8 cards in
 * the same row-major order, same testimonial. Only the text that is
 * intrinsically Slate-specific differs: hero/bento headings + subheadings,
 * page meta, demo URLs, docs URLs, code snippet, package name, and FAQ.
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

const SETUP_CODE = `import { withVeltComments } from '@veltdev/slate-velt-comments';
import { withReact, withHistory } from 'slate-react';

const editor = withVeltComments(
  withReact(withHistory(createEditor())),
  { HistoryEditor: SlateHistoryEditor }
);`;

async function main() {
  console.log("Uploading slatejs images...");
  // Demo cover image mirrors tiptap (per design direction — visually
  // matches the tiptap page rather than using a slate-specific preview).
  const previewImage = await uploadImage("public/images/home/libraries/demos/tiptap.png");
  const logo = await uploadImage("public/images/home/libraries/slatejs.png");
  const avatarEthan = await uploadImage(
    "public/images/home/libraries/tiptap/avatars/ethan.png",
  );
  const tileMultiplayer = await uploadImage(
    "public/images/home/libraries/slatejs/bento/tile-multiplayer.jpg",
  );
  const tileComments = await uploadImage(
    "public/images/home/libraries/slatejs/bento/tile-comments.jpg",
  );
  const tileCursors = await uploadImage(
    "public/images/home/libraries/slatejs/bento/tile-cursors.jpg",
  );
  const tileMentions = await uploadImage(
    "public/images/home/libraries/slatejs/bento/tile-mentions.jpg",
  );
  const tileHistory = await uploadImage(
    "public/images/home/libraries/slatejs/bento/tile-history.jpg",
  );
  const tileSingleEditor = await uploadImage(
    "public/images/home/libraries/slatejs/bento/tile-single-editor.jpg",
  );
  const tileOffline = await uploadImage(
    "public/images/home/libraries/slatejs/bento/tile-offline.jpg",
  );
  console.log("  → uploaded.");

  const doc = {
    _id: "libraryPage-slatejs",
    _type: "libraryPage",
    title: "SlateJS",
    slug: { _type: "slug", current: "slatejs" },
    category: "Text Editor",
    tagline: "Add comments, notifications, cursors, and multiplayer editing to Slate in minutes.",
    logo,
    metaTitle: "Collaboration Toolkit for SlateJS | Velt",
    metaDescription:
      "Add comments, notifications, cursors, and multiplayer editing to Slate in minutes. Velt's SlateJS integration ships as a single plugin.",
    hero: {
      heading: "Collaboration Toolkit for SlateJS",
      subheading:
        "Add comments, notifications, cursors, and multiplayer editing to Slate in minutes",
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
        newTab: false,
      },
    },
    demoStage: {
      label: "SlateJS",
      demoUrl: "https://slatejs-app-demo.vercel.app/",
      githubUrl: "https://github.com/velt-js/slatejs-app-demo/tree/main",
      previewImage,
    },
    bento: {
      eyebrow: "No Custom Logic Required",
      heading: "Built for SlateJS",
      subheading:
        "Deeply embedded in Slate and works reliably as nodes are edited and restructured",
      viewDocsCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://docs.velt.dev/async-collaboration/comments/setup/slatejs",
        newTab: true,
      },
      primaryCta: {
        _type: "ctaLink",
        label: "View All Examples",
        href: "https://github.com/velt-js/slatejs-app-demo",
        newTab: true,
      },
      // Card order is row-major. Bento renders as 2 columns × 4 rows:
      //   Row 1: Multiplayer Editing | Contextual Comments
      //   Row 2: Real-time Cursors   | User Mentions
      //   Row 3: Notification        | Version History
      //   Row 4: Single Editor Mode  | Offline Storage
      cards: [
        {
          _type: "bentoCard",
          _key: "card-multiplayer",
          title: "Multiplayer Editing",
          description: "Co-edit documents in real-time and see who is working with you",
          image: tileMultiplayer,
        },
        {
          _type: "bentoCard",
          _key: "card-comments",
          title: "Contextual Comments",
          description: "Enable rich conversations with replies, @mentions, and reactions",
          image: tileComments,
        },
        {
          _type: "bentoCard",
          _key: "card-cursors",
          title: "Real-time Cursors & Presence",
          description: "Decide how users appear with fully customizable name tags and cursors",
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
          _key: "card-notifications",
          title: "Notification",
          description: "See what changes have been made to a shared document with timestamps",
          illustrationKey: "notification",
        },
        {
          _type: "bentoCard",
          _key: "card-history",
          title: "Version History",
          description: "See what changes have been made to a shared document with timestamps",
          image: tileHistory,
        },
        {
          _type: "bentoCard",
          _key: "card-single-editor",
          title: "Single Editor Mode",
          description: "Limit editing control to one user in collaborative scenarios",
          image: tileSingleEditor,
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
      accentFragment: "Velt made it possible",
      accentColor: "#0085ff",
      avatar: avatarEthan,
    },
    getStartedCallout: {
      heading: "Production-Ready in Minutes",
      body: "Install the Velt SlateJS extension. Test. Ship.",
      viewDocsHref: "https://docs.velt.dev/async-collaboration/comments/setup/slatejs",
      getApiKeyHref: "https://console.velt.dev/",
      codeSnippet: {
        code: SETUP_CODE,
        language: "tsx",
      },
    },
    getStartedSteps: {
      step1PackageName: "@veltdev/slate-velt-comments",
    },
    faq: {
      items: [
        {
          _key: "faq-anchor",
          question: "Will comments move as the document changes?",
          answer:
            "Yes. Velt anchors each comment to a path in the Slate document tree and rebases that anchor as nodes are split, merged, or restructured. Comments stay attached to the right content even after multi-user edits, formatting changes, or block reflows.",
        },
        {
          _key: "faq-plugins",
          question: "Does this work with custom Slate plugins?",
          answer:
            "Yes. The Velt SlateJS integration ships as a `withVeltComments` plugin that composes alongside `withReact`, `withHistory`, and any of your own `with*` plugins without overriding their schema, commands, or transforms. You can keep using any plugins you already have.",
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
