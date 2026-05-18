#!/usr/bin/env node
/**
 * Seed the libraryPage-lexical document in Sanity from the live page at
 * https://velt.dev/libraries/lexical.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-library-lexical.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-library-lexical.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-library-lexical.mjs
 *
 * Idempotent. Re-runs replace the existing libraryPage-lexical doc; image
 * assets dedupe by SHA-256 in Sanity.
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

const SETUP_CODE = `import { createEditor } from 'lexical';
import { CommentNode } from '@veltdev/lexical-velt-comments';

const editor = createEditor({
  namespace: 'MyEditor',
  nodes: [CommentNode],
  onError: (error) => console.error(error)
});`;

async function main() {
  console.log("Uploading lexical images...");
  const previewImage = await uploadImage(
    "public/images/home/libraries/demos/lexical.png",
  );
  const logo = await uploadImage("public/images/home/libraries/lexical.png");
  const avatarEthan = await uploadImage(
    "public/images/home/libraries/tiptap/avatars/ethan.png",
  );
  console.log("  → uploaded.");

  const doc = {
    _id: "libraryPage-lexical",
    _type: "libraryPage",
    title: "Lexical",
    slug: { _type: "slug", current: "lexical" },
    category: "Text Editor",
    tagline:
      "Add comments, notifications, cursors, and multiplayer editing to Lexical in minutes.",
    logo,
    metaTitle: "Collaboration Toolkit for Lexical | Velt",
    metaDescription:
      "Add comments, notifications, cursors, and multiplayer editing to Lexical in minutes.",
    hero: {
      heading: "Collaboration Toolkit for Lexical",
      subheading:
        "Add comments, notifications, cursors, and multiplayer editing to Lexical in minutes",
      decorated: true,
      primaryCta: {
        _type: "ctaLink",
        label: "Start Free",
        href: "https://console.velt.dev/?ref=library-lexical",
        newTab: true,
      },
      secondaryCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://velt.dev/docs/async-collaboration/comments/setup/lexical#lexical-setup",
        newTab: true,
      },
    },
    demoStage: {
      label: "Lexical",
      demoUrl: "https://lexical-velt-comments-demo.vercel.app/",
      githubUrl:
        "https://github.com/velt-js/lexical-velt-comments-demo/tree/main",
      previewImage,
    },
    bento: {
      eyebrow: "No Custom Logic Required",
      heading: "Built for Lexical",
      subheading:
        "Deeply embedded in Lexical and works reliably as the document tree updates",
      viewDocsCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://velt.dev/docs/async-collaboration/comments/setup/lexical#lexical-setup",
        newTab: true,
      },
      primaryCta: {
        _type: "ctaLink",
        label: "View All Examples",
        href: "https://github.com/velt-js/lexical-velt-comments-demo",
        newTab: true,
      },
      // Card order is row-major and matches the tiptap/yjs seeds (2×4 grid):
      //   Row 1: Multiplayer Editing | Contextual Comments
      //   Row 2: Real-time Cursors   | User Mentions
      //   Row 3: Notification        | Version History
      //   Row 4: Single Editor Mode  | Offline Storage
      cards: [
        {
          _type: "bentoCard",
          _key: "card-multiplayer",
          title: "Multiplayer Editing",
          description:
            "Co-edit documents in real-time and see who is working with you",
          illustrationKey: "multiplayerEditing",
        },
        {
          _type: "bentoCard",
          _key: "card-comments",
          title: "Contextual Comments",
          description:
            "Enable rich conversations with replies, @mentions, and reactions",
          illustrationKey: "contextualComments",
        },
        {
          _type: "bentoCard",
          _key: "card-cursors",
          title: "Real-time Cursors & Presence",
          description:
            "Decide how users appear with fully customizable name tags and cursors",
          illustrationKey: "customizableCursors",
        },
        {
          _type: "bentoCard",
          _key: "card-mentions",
          title: "User Mentions",
          description:
            "Enable rich conversations with replies, @mentions, and reactions",
          illustrationKey: "userMentions",
        },
        {
          _type: "bentoCard",
          _key: "card-notifications",
          title: "Notification",
          description:
            "See what changes have been made to a shared document with timestamps",
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
          description:
            "Limit editing control to one user in collaborative scenarios",
          illustrationKey: "singleEditorMode",
        },
        {
          _type: "bentoCard",
          _key: "card-offline",
          title: "Offline Storage",
          description:
            "Keep working when the connection drops. Data will sync when you reconnect",
          illustrationKey: "offlineStorage",
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
      body: "Install the Velt Lexical extension. Test. Ship.",
      viewDocsHref:
        "https://velt.dev/docs/async-collaboration/comments/setup/lexical#lexical-setup",
      getApiKeyHref: "https://console.velt.dev/",
      codeSnippet: {
        code: SETUP_CODE,
        language: "tsx",
      },
    },
    getStartedSteps: {
      step1PackageName: "@veltdev/lexical-velt-comments",
    },
    faq: {
      items: [
        {
          _key: "faq-anchor",
          question: "Will comments stay attached as the document tree updates?",
          answer:
            "Yes. Velt anchors each comment to a node in the Lexical tree and rebases that anchor as the surrounding content is edited. Comments stay attached to the right text even after multi-user edits, formatting changes, or block reflows.",
        },
        {
          _key: "faq-custom-nodes",
          question: "Does this support custom Lexical nodes?",
          answer:
            "Yes. The Velt Lexical integration composes alongside your own custom nodes without overriding their schema, commands, or transforms. You can keep using any custom nodes you already have.",
        },
        {
          _key: "faq-comments-only",
          question: "Can I use comments only?",
          answer:
            "Yes. The comments package can be installed and used standalone, without enabling presence, cursors, or multiplayer editing.",
        },
        {
          _key: "faq-backend",
          question: "Do I need a backend?",
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
