#!/usr/bin/env node
/**
 * Seed the libraryPage-yjs document in Sanity from the live page at
 * https://velt.dev/libraries/yjs.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-library-yjs.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-library-yjs.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-library-yjs.mjs
 *
 * Idempotent. Re-runs replace the existing libraryPage-yjs doc; image
 * assets dedupe by SHA-256 in Sanity.
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

const SETUP_CODE = `import { useVeltCrdtStore } from '@veltdev/crdt-react';

function Component() {
  const { update } = useVeltCrdtStore<string>({ id: 'my-collab-note', type: 'text' });
  const onChange = (e) => update(e.target.value);
  return <input onChange={onChange} />;
}`;

async function main() {
  console.log("Uploading yjs images...");
  const previewImage = await uploadImage("public/images/home/libraries/demos/yjs.png");
  const logo = await uploadImage("public/images/home/libraries/yjs.png");
  const avatarEthan = await uploadImage(
    "public/images/home/libraries/tiptap/avatars/ethan.png",
  );
  console.log("  → uploaded.");

  const doc = {
    _id: "libraryPage-yjs",
    _type: "libraryPage",
    title: "Yjs",
    slug: { _type: "slug", current: "yjs" },
    category: "Text Editor",
    tagline: "Run Yjs apps without building or operating realtime infrastructure.",
    logo,
    metaTitle: "Collaboration Toolkit for YJS | Velt",
    metaDescription:
      "Run Yjs apps without building or operating realtime infrastructure.",
    hero: {
      heading: "Collaboration Toolkit for YJS",
      subheading:
        "Run Yjs apps without building or operating realtime infrastructure",
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
        href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/core",
        newTab: true,
      },
    },
    demoStage: {
      label: "Yjs",
      demoUrl: "https://velt-general-crdt-demo.vercel.app/",
      githubUrl: "https://github.com/velt-js/velt-general-crdt-demo/tree/main",
      previewImage,
    },
    bento: {
      eyebrow: "No Custom Logic Required",
      heading: "Built for YJS",
      subheading:
        "Velt handles sync, persistence, and connections so Yjs apps stay reliable at scale",
      viewDocsCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/core",
        newTab: true,
      },
      primaryCta: {
        _type: "ctaLink",
        label: "View All Examples",
        href: "https://github.com/velt-js/velt-general-crdt-demo",
        newTab: true,
      },
      // Card order is row-major and matches the tiptap seed (2×4 grid):
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
          description: "Decide how users appear with fully customizable name tags and cursors",
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
          description: "See what changes have been made to a shared document with timestamps",
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
      body: "Install the Velt YJS extension. Test. Ship.",
      viewDocsHref: "https://docs.velt.dev/realtime-collaboration/crdt/setup/core",
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
          _key: "faq-required",
          question: "Is this required to use Yjs?",
          answer:
            "No, Yjs works independently, but Velt removes the need to run your own backend.",
        },
        {
          _key: "faq-server",
          question: "Do I need to manage a Yjs server?",
          answer:
            "No, Velt provides a fully managed realtime server and persistence layer.",
        },
        {
          _key: "faq-persistence",
          question: "Does this handle persistence automatically?",
          answer:
            "Yes, document state is persisted without custom database wiring.",
        },
        {
          _key: "faq-pricing",
          question: "How does pricing work?",
          answer:
            "Pricing is based on real collaboration usage, not raw connections or messages.",
        },
        {
          _key: "faq-direct",
          question: "Can I still use Yjs directly?",
          answer:
            "Yes, Velt works alongside standard Yjs usage via a lightweight wrapper.",
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
