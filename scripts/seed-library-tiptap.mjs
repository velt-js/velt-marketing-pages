#!/usr/bin/env node
/**
 * Seed the libraryPage-tiptap document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-library-tiptap.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-library-tiptap.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-library-tiptap.mjs
 *
 * Idempotent: re-runs replace the existing libraryPage-tiptap doc and
 * re-upload the same image assets (Sanity dedupes by SHA-256, so the
 * same file always resolves to the same asset _id).
 *
 * Content is lifted verbatim from the previous static page at
 * app/libraries/tiptap/page.tsx and components/library/shared-content.ts.
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

const SETUP_CODE = `const { VeltCrdt } = useVeltTiptapCrdtExtension({
  editorId: 'YOUR_EDITOR_ID'
});

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      history: false,
    }),
    ...(VeltCrdt ? [VeltCrdt] : []),
  ],
  content: ''
}, [VeltCrdt]);

return <EditorContent editor={editor} />;`;

async function main() {
  console.log("Uploading tiptap images...");
  const previewImage = await uploadImage("public/images/home/libraries/demos/tiptap.png");
  const logo = await uploadImage("public/images/home/libraries/tiptap.png");
  const avatarEthan = await uploadImage(
    "public/images/home/libraries/tiptap/avatars/ethan.png",
  );
  const tileMultiplayer = await uploadImage(
    "public/images/home/libraries/tiptap/bento/tile-multiplayer.jpg",
  );
  const tileComments = await uploadImage(
    "public/images/home/libraries/tiptap/bento/tile-comments.jpg",
  );
  const tileCursors = await uploadImage(
    "public/images/home/libraries/tiptap/bento/tile-cursors.jpg",
  );
  const tileMentions = await uploadImage(
    "public/images/home/libraries/tiptap/bento/tile-mentions.jpg",
  );
  const tileHistory = await uploadImage(
    "public/images/home/libraries/tiptap/bento/tile-history.jpg",
  );
  const tileSingleEditor = await uploadImage(
    "public/images/home/libraries/tiptap/bento/tile-single-editor.jpg",
  );
  const tileOffline = await uploadImage(
    "public/images/home/libraries/tiptap/bento/tile-offline.jpg",
  );
  console.log("  → uploaded.");

  const doc = {
    _id: "libraryPage-tiptap",
    _type: "libraryPage",
    title: "Tiptap",
    slug: { _type: "slug", current: "tiptap" },
    category: "Text Editor",
    tagline: "Add comments, notifications, cursors, and multiplayer editing to Tiptap in minutes.",
    logo,
    metaTitle: "Collaboration Toolkit for Tiptap | Velt",
    metaDescription:
      "Add comments, notifications, cursors, and multiplayer editing to Tiptap in minutes. Velt's Tiptap integration ships as a single extension.",
    hero: {
      heading: "Collaboration Toolkit for Tiptap",
      subheading:
        "Add comments, notifications, cursors, and multiplayer editing to Tiptap in minutes",
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
      label: "Tiptap",
      demoUrl: "https://velt-tiptap-crdt-demo.vercel.app/",
      githubUrl: "https://github.com/velt-js/velt-tiptap-crdt-demo",
      previewImage,
    },
    bento: {
      eyebrow: "No Custom Logic Required",
      heading: "Built for Tiptap",
      subheading:
        "Deeply embedded in Tiptap and works reliably through edits, reflows, and formatting changes",
      viewDocsCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://docs.velt.dev/async-collaboration/comments/setup/tiptap",
        newTab: true,
      },
      primaryCta: {
        _type: "ctaLink",
        label: "View All Examples",
        href: "https://github.com/velt-js/velt-tiptap-crdt-demo",
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
      body: "Install the Velt Tiptap extension. Test. Ship.",
      viewDocsHref: "https://docs.velt.dev/async-collaboration/comments/setup/tiptap",
      getApiKeyHref: "https://console.velt.dev/",
      codeSnippet: {
        code: SETUP_CODE,
        language: "tsx",
      },
    },
    getStartedSteps: {
      step1PackageName: "@veltdev/tiptap-collab",
    },
    faq: {
      items: [
        {
          _key: "faq-anchor",
          question: "Will comments move as the document changes?",
          answer:
            "Yes. Velt anchors each comment to a range in the Tiptap document and rebases that anchor as the surrounding content is edited. Comments stay attached to the right text even after multi-user edits, formatting changes, or block reflows.",
        },
        {
          _key: "faq-extensions",
          question: "Does this work with custom Tiptap extensions?",
          answer:
            "Yes. The Velt Tiptap integration ships as a Tiptap extension that composes alongside your own extensions without overriding their schema, commands, or keyboard shortcuts. You can keep using any other extensions you already have.",
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
