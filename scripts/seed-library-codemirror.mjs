#!/usr/bin/env node
/**
 * Seed the libraryPage-codemirror document in Sanity from the live page at
 * https://velt.dev/libraries/codemirror.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-library-codemirror.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-library-codemirror.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-library-codemirror.mjs
 *
 * Idempotent. Re-runs replace the existing libraryPage-codemirror doc;
 * image assets dedupe by SHA-256 in Sanity.
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

const SETUP_CODE = `// Initialize the Velt CRDT extension
const { store, isLoading } = useVeltCodeMirrorCrdtExtension({ editorId });

useEffect(() => {
  if (!store || !editorRef.current) return;

  const startState = EditorState.create({
    doc: store.getYText()?.toString() ?? '',
    extensions: [
      basicSetup,
      yCollab(store.getYText()!, store.getAwareness(), { undoManager: store.getUndoManager() }),
    ],
  });

  viewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current,
  });

  return () => viewRef.current?.destroy();
}, [store]);`;

async function main() {
  console.log("Uploading codemirror images...");
  const previewImage = await uploadImage("public/images/home/libraries/demos/codemirror.png");
  const logo = await uploadImage("public/images/home/libraries/codemirror.png");
  const avatarEthan = await uploadImage(
    "public/images/home/libraries/tiptap/avatars/ethan.png",
  );
  console.log("  → uploaded.");

  const doc = {
    _id: "libraryPage-codemirror",
    _type: "libraryPage",
    title: "CodeMirror",
    slug: { _type: "slug", current: "codemirror" },
    category: "Text Editor",
    tagline:
      "Add comments, notifications, cursors, and multiplayer editing to CodeMirror in minutes.",
    logo,
    metaTitle: "Collaboration Toolkit for CodeMirror | Velt",
    metaDescription:
      "Add comments, notifications, cursors, and multiplayer editing to CodeMirror in minutes.",
    hero: {
      heading: "Collaboration Toolkit for CodeMirror",
      subheading:
        "Add comments, notifications, cursors, and multiplayer editing to CodeMirror in minutes",
      decorated: true,
      primaryCta: {
        _type: "ctaLink",
        label: "Start Free",
        href: "https://console.velt.dev/?ref=library-codemirror",
        newTab: true,
      },
      secondaryCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/codemirror",
        newTab: true,
      },
    },
    demoStage: {
      label: "CodeMirror",
      demoUrl: "https://velt-codemirror-crdt-demo.vercel.app/",
      githubUrl: "https://github.com/velt-js/velt-codemirror-crdt-demo/tree/main",
      previewImage,
    },
    bento: {
      eyebrow: "No Custom Logic Required",
      heading: "Built for CodeMirror",
      subheading:
        "Deeply embedded in CodeMirror and works reliably as content changes line by line",
      viewDocsCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/codemirror",
        newTab: true,
      },
      primaryCta: {
        _type: "ctaLink",
        label: "View All Examples",
        href: "https://github.com/velt-js/velt-codemirror-crdt-demo",
        newTab: true,
      },
      // Card order is row-major and matches the tiptap/yjs/lexical seeds (2×4 grid):
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
          description: "Enable rich conversations with replies, @mentions, and reactions",
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
      avatar: avatarEthan,
    },
    getStartedCallout: {
      heading: "Production-Ready in Minutes",
      body: "Install the Velt CodeMirror extension. Test. Ship.",
      viewDocsHref:
        "https://docs.velt.dev/realtime-collaboration/crdt/setup/codemirror",
      getApiKeyHref: "https://console.velt.dev/",
      codeSnippet: {
        code: SETUP_CODE,
        language: "tsx",
      },
    },
    getStartedSteps: {
      step1PackageName: "@veltdev/crdt-react",
    },
    faq: {
      items: [
        {
          _key: "faq-anchor",
          question: "Will comments move as code changes?",
          answer:
            "Yes. Velt anchors each comment to a range in the CodeMirror document and rebases that anchor as the surrounding code is edited. Comments stay attached to the right line even after multi-user edits, refactors, or formatting changes.",
        },
        {
          _key: "faq-comments-only",
          question: "Can I add comments without multiplayer?",
          answer:
            "Yes. The comments package can be installed and used standalone, without enabling presence, cursors, or CRDT-backed multiplayer editing.",
        },
        {
          _key: "faq-backend",
          question: "Do I need backend infrastructure?",
          answer:
            "No. Velt provides a fully managed collaboration backend for comments, presence, and persistence — no server to run.",
        },
        {
          _key: "faq-code-review",
          question: "Is this suitable for code reviews?",
          answer:
            "Yes. Inline comments anchored to specific lines or ranges work well for code review and pair-programming workflows.",
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
