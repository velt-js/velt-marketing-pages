#!/usr/bin/env node
/**
 * Seed the libraryPage-blocknote document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-library-blocknote.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-library-blocknote.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-library-blocknote.mjs
 *
 * Idempotent: re-runs replace the existing libraryPage-blocknote doc and
 * re-upload the same image assets (Sanity dedupes by SHA-256, so the
 * same file always resolves to the same asset _id).
 *
 * Mirrors the live page at velt.dev/libraries/blocknote with copy-bug
 * fixes (bento subheading, "View Examples" target, primary CTA href).
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

const SETUP_CODE = `const { collaborationConfig } = useVeltBlockNoteCrdtExtension({
  editorId: 'YOUR_EDITOR_ID',
  initialContent: JSON.stringify([{ type: "paragraph", content: "" }])
});

const editor = useCreateBlockNote({
  collaboration: collaborationConfig,
}, [collaborationConfig]);

return (
  <BlockNoteView
    editor={editor}
    key={collaborationConfig ? 'collab-on' : 'collab-off'}
  />
);`;

async function main() {
  console.log("Uploading blocknote images...");
  const previewImage = await uploadImage("public/images/home/libraries/demos/blocknote.png");
  const logo = await uploadImage("public/images/home/libraries/blocknote.png");
  const avatarEthan = await uploadImage(
    "public/images/home/libraries/tiptap/avatars/ethan.png",
  );
  console.log("  → uploaded.");

  const doc = {
    _id: "libraryPage-blocknote",
    _type: "libraryPage",
    title: "BlockNote",
    slug: { _type: "slug", current: "blocknote" },
    category: "Text Editor",
    tagline:
      "Add comments, notifications, cursors, and multiplayer editing to BlockNote in minutes.",
    logo,
    metaTitle: "Collaboration Toolkit for BlockNote | Velt",
    metaDescription:
      "Add comments, notifications, cursors, and multiplayer editing to BlockNote in minutes. Velt's BlockNote integration ships as a single extension.",
    hero: {
      heading: "Collaboration Toolkit for BlockNote",
      subheading:
        "Add comments, notifications, cursors, and multiplayer editing to BlockNote in minutes",
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
      label: "BlockNote",
      demoUrl: "https://velt-blocknote-crdt-demo.vercel.app/",
      githubUrl: "https://github.com/velt-js/velt-blocknote-crdt-demo",
      previewImage,
    },
    bento: {
      eyebrow: "No Custom Logic Required",
      heading: "Built for BlockNote",
      subheading:
        "Deeply embedded in BlockNote and works reliably through edits, reflows, and formatting changes",
      viewDocsCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/blocknote",
        newTab: true,
      },
      primaryCta: {
        _type: "ctaLink",
        label: "View All Examples",
        href: "https://github.com/velt-js/velt-blocknote-crdt-demo",
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
          illustrationKey: "multiplayerEditing",
        },
        {
          _type: "bentoCard",
          _key: "card-comments",
          title: "Contextual Comments",
          description: "Enable rich conversations with replies, @mentions, and reactions",
          illustrationKey: "contextualComments",
        },
        {
          _type: "bentoCard",
          _key: "card-cursors",
          title: "Real-time Cursors & Presence",
          description: "Decide how users appear with fully customizable name tags and carets",
          illustrationKey: "customizableCursors",
        },
        {
          _type: "bentoCard",
          _key: "card-mentions",
          title: "User Mentions",
          description:
            "Tag teammates inline to bring them into the document and notify them instantly",
          illustrationKey: "userMentions",
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
          description: "Manage multiple versions to manage historical data",
          illustrationKey: "versionHistory",
        },
        {
          _type: "bentoCard",
          _key: "card-single-editor",
          title: "Single Editor Mode",
          description: "Limit editing control to one user in collaborative scenarios",
          illustrationKey: "singleEditorMode",
        },
        {
          _type: "bentoCard",
          _key: "card-offline",
          title: "Offline Storage",
          description: "Keep working when the connection drops. Data will sync when you reconnect",
          illustrationKey: "offlineStorage",
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
      body: "Install the Velt BlockNote extension. Test. Ship.",
      viewDocsHref: "https://docs.velt.dev/realtime-collaboration/crdt/setup/blocknote",
      getApiKeyHref: "https://console.velt.dev/",
      codeSnippet: {
        code: SETUP_CODE,
        language: "tsx",
      },
    },
    getStartedSteps: {
      step1PackageName: "@veltdev/blocknote-crdt",
    },
    faq: {
      items: [
        {
          _key: "faq-comments-only",
          question: "Can I enable comments only?",
          answer:
            "Yes, you can enable comments without multiplayer or presence features.",
        },
        {
          _key: "faq-backend",
          question: "Do I need a backend?",
          answer: "No, Velt handles collaboration infrastructure.",
        },
        {
          _key: "faq-block-reorder",
          question: "Will comments move as blocks reorder?",
          answer: "Yes, comments stay attached as blocks are added or moved.",
        },
        {
          _key: "faq-pricing",
          question: "How does pricing work?",
          answer:
            "Pricing is based on Monthly Active Collaborators who use Velt features.",
        },
        {
          _key: "faq-markdown",
          question: "Is this compatible with Markdown workflows?",
          answer: "Yes, Velt works with BlockNote's Markdown model.",
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
