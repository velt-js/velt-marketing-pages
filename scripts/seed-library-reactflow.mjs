#!/usr/bin/env node
/**
 * Seed the libraryPage-reactflow document in Sanity from the live page at
 * https://velt.dev/libraries/reactflow.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-library-reactflow.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-library-reactflow.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-library-reactflow.mjs
 *
 * Idempotent. Re-runs replace the existing libraryPage-reactflow doc;
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

const SETUP_CODE = `const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useVeltReactFlowCrdtExtension({
  editorId: 'YOUR_EDITOR_ID',
  initialNodes: [{ id: '1', data: { label: 'Start' }, position: { x: 0, y: 0 } }],
  initialEdges: []
});

return (
  <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    fitView
  >
    <Background />
  </ReactFlow>
);`;

async function main() {
  console.log("Uploading reactflow images...");
  const previewImage = await uploadImage("public/images/home/libraries/demos/react-flow.png");
  const logo = await uploadImage("public/images/home/libraries/react-flow.png");
  const avatarEthan = await uploadImage(
    "public/images/home/libraries/tiptap/avatars/ethan.png",
  );
  const tileMultiplayer = await uploadImage(
    "public/images/home/libraries/reactflow/bento/tile-multiplayer.png",
  );
  const tileComments = await uploadImage(
    "public/images/home/libraries/reactflow/bento/tile-comments.png",
  );
  const tileCursors = await uploadImage(
    "public/images/home/libraries/reactflow/bento/tile-cursors.png",
  );
  const tileMentions = await uploadImage(
    "public/images/home/libraries/reactflow/bento/tile-mentions.png",
  );
  const tileNotification = await uploadImage(
    "public/images/home/libraries/reactflow/bento/tile-notification.png",
  );
  const tileHistory = await uploadImage(
    "public/images/home/libraries/reactflow/bento/tile-history.png",
  );
  const tileUndo = await uploadImage(
    "public/images/home/libraries/reactflow/bento/tile-undo.png",
  );
  const tileOffline = await uploadImage(
    "public/images/home/libraries/reactflow/bento/tile-offline.png",
  );
  console.log("  → uploaded.");

  const doc = {
    _id: "libraryPage-reactflow",
    _type: "libraryPage",
    title: "React Flow",
    slug: { _type: "slug", current: "reactflow" },
    category: "Canvas",
    tagline:
      "Add comments, notifications, cursors, and multiplayer editing to React Flow in minutes.",
    logo,
    metaTitle: "Collaboration Toolkit for React Flow | Velt",
    metaDescription:
      "Add comments, notifications, cursors, and multiplayer editing to React Flow in minutes",
    hero: {
      heading: "Collaboration Toolkit for React Flow",
      subheading:
        "Add comments, notifications, cursors, and multiplayer editing to React Flow in minutes",
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
        href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/reactflow",
        newTab: true,
      },
    },
    demoStage: {
      label: "React Flow",
      demoUrl: "https://velt-reactflow-crdt-demo.vercel.app/",
      githubUrl: "https://github.com/velt-js/velt-reactflow-crdt-demo/tree/main",
      previewImage,
    },
    bento: {
      eyebrow: "No Custom Logic Required",
      heading: "Built for React Flow",
      subheading:
        "Deeply embedded in React Flow and works reliably as nodes, edges, and layouts change",
      viewDocsCta: {
        _type: "ctaLink",
        label: "View Docs",
        href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/reactflow",
        newTab: true,
      },
      primaryCta: {
        _type: "ctaLink",
        label: "View All Examples",
        href: "https://github.com/velt-js/velt-reactflow-crdt-demo",
        newTab: true,
      },
      // 4 rows × 2 columns. Heights match the Tiptap/Yjs profile.
      rowHeights: [493, 429, 424, 424],
      // Cards render in row-major order, mirroring the live site:
      //   Row 1: Multiplayer Editing      | Comment on Nodes and Edges
      //   Row 2: Real-time Presence       | User Mentions
      //   Row 3: Notification             | Version History
      //   Row 4: Undo / Redo              | Offline Storage
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
          title: "Comment on Nodes and Edges",
          description: "Co-edit documents in real-time and see who is working with you",
          image: tileComments,
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
          _key: "card-history",
          title: "Version History",
          description: "Manage multiple versions to manage historical data",
          image: tileHistory,
        },
        {
          _type: "bentoCard",
          _key: "card-undo",
          title: "Undo / Redo",
          description: "Easily traverse between your actions",
          image: tileUndo,
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
      body: "Install the Velt React Flow extension. Test. Ship.",
      viewDocsHref:
        "https://docs.velt.dev/realtime-collaboration/crdt/setup/reactflow",
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
          _key: "faq-scope",
          question: "Can I comment only on nodes or edges?",
          answer: "Yes, comments can be scoped to nodes, edges, or canvas areas.",
        },
        {
          _key: "faq-backend",
          question: "Do I need to build a backend?",
          answer: "No, Velt runs the collaboration layer for you.",
        },
        {
          _key: "faq-attached",
          question: "Will comments stay attached when nodes move?",
          answer: "Yes, comments remain attached as nodes and layouts change.",
        },
        {
          _key: "faq-pricing",
          question: "How does pricing work?",
          answer: "Pricing is based on Monthly Active Collaborators who use Velt features.",
        },
        {
          _key: "faq-dynamic",
          question: "Does this work with dynamic graphs?",
          answer: "Yes, it works with auto-generated and dynamic graphs.",
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
