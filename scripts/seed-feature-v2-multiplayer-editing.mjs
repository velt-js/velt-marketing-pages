#!/usr/bin/env node
/**
 * Seed the featurePageV2-multiplayer-editing document in Sanity so it renders
 * at /new-features/multiplayer-editing via app/new-features/[slug]/page.tsx.
 *
 * Consolidated page: /multiplayer-editing covers co-editing + single editor
 * mode + live state sync. The folded features render as showcase cards (301
 * anchors #single-editor and #state-sync land on those cards).
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-multiplayer-editing.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-multiplayer-editing.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *Preset field references a key wired
 * in components/feature-new/demo-presets/multiplayer-editing.tsx.
 */

import { createClient } from "@sanity/client";

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

let keyCounter = 0;
/**
 * Add a stable _key (and optional _type) to each item in an array, as Sanity
 * requires for array members.
 * @param {Array<object>} arr Array of plain objects.
 * @param {string} [type] Optional _type to stamp on each item.
 * @returns {Array<object>} The keyed array.
 */
function keyed(arr, type) {
  return arr.map((item) => ({
    _key: `k${keyCounter++}`,
    ...(type ? { _type: type } : {}),
    ...item,
  }));
}

/**
 * Build a ctaLink object literal.
 * @param {string} label Link label.
 * @param {string} href Link href.
 * @param {boolean} [newTab] Open in new tab.
 * @returns {object} A ctaLink object.
 */
function cta(label, href, newTab) {
  return { _type: "ctaLink", label, href, ...(newTab ? { newTab: true } : {}) };
}

const STEP_INSTALL = `npm install @veltdev/react @veltdev/tiptap-crdt-react`;
const STEP_PROVIDER = `<VeltProvider
  apiKey={VELT_API_KEY}>
  <SetDocument documentId="brief-q3" />
  <YourApp />
</VeltProvider>`;
const STEP_MOUNT = `const { extension } = useCollaboration({
  editorId: "brief-q3",
});
// add the returned extension to your editor`;

const doc = {
  _id: "featurePageV2-multiplayer-editing",
  _type: "featurePageV2",
  title: "Multiplayer Editing",
  slug: { _type: "slug", current: "multiplayer-editing" },
  beta: false,
  breadcrumbLabel: "Multiplayer Editing",
  metaTitle: "Multiplayer Editing | Co-editing, single editor, state sync | Velt",
  metaDescription:
    "Yjs-based conflict-free co-editing, single editor mode, and live state sync. Humans and agents edit without overwrites.",

  hero: {
    kicker: "Multiplayer editing",
    title: "Add multiplayer editing to your product.",
    secondary:
      "Yjs-based conflict-free co-editing, in Tiptap, CodeMirror, and 10 other editor libraries, or your own.",
    accent: "Stop fielding bug reports that start with \u201Cmy changes disappeared.\u201D",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "co-editing", label: "Co-editing", demoPreset: "multiplayer-editing/hero/co-editing" },
        { id: "single-editor", label: "Single editor", demoPreset: "multiplayer-editing/hero/single-editor" },
        { id: "state-sync", label: "State sync", demoPreset: "multiplayer-editing/hero/state-sync" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Multiplayer editing running inside products at",
    migration: {
      label: "Migrating from Liveblocks or an in-house build?",
      links: keyed([
        cta("Compare", "/vs/liveblocks"),
        cta("Migrate from Liveblocks", "https://docs.velt.dev/migration/migrate-from-liveblocks-to-velt", true),
      ]),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "Humans and agents, one document.",
    body: "Velt Multiplayer Editing adds Yjs-based conflict-free co-editing to your product: concurrent edits merge automatically, with no lost work and no merge conflicts. It works out of the box in Tiptap, CodeMirror, and 10 other editor libraries, or bring your own editor. Offline edits merge on reconnect, and server-side writes through the CRDT REST API land in the same document your users are typing in. When an agent edit needs consent before it lands, it goes through Suggestions; co-editing is for the edits both actors are trusted to make.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/realtime-collaboration/crdt/overview", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "multiplayer-editing/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to live co-editing.",
    support:
      "Install the SDK and your editor\u2019s CRDT package, set the document, and call useCollaboration. Concurrent edits merge with Yjs and sync between connected clients, so there is no sync server to run.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app, set the document.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Bind", title: "Wire the editor.", filename: "Editor.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "Initialize the Velt client, create a CRDT store with a unique id and a data type \u2014 text, map, array, or xml \u2014 and your components subscribe to render the latest value and push updates. Yjs merges concurrent edits while Velt handles synchronization between connected clients, so there is no sync server to run. Single editor mode runs on the same live state sync element that powers state sync: a setLiveStateData call or the useLiveState hook. Server-side processes write through the CRDT and live state REST APIs into the same live document.",
      microcopy: "// create a CRDT store \u00b7 subscribe to render \u00b7 push updates",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "a CRDT or OT engine to choose and operate",
        "a websocket fleet that survives reconnection storms",
        "an offline queue with merge on reconnect",
        "per-editor bindings for every library you support",
        "awareness wiring for remote cursors",
        "version snapshots and restore",
        "a locking and handoff layer for controlled editing",
        "state persistence and compaction",
        "multi-tab dedupe",
      ],
      close:
        "Teams that build realtime sync budget multiple quarters for specialists and keep paying for the edge cases. The 3 steps above replace that build; the capability wall below replaces the long tail.",
    },
    mcp: {
      heading: "MCP: the faster path.",
      sub: "Skip the steps. Have your agent set it up.",
      tabs: keyed(
        [
          { id: "cursor", label: "Cursor", command: "npx -y @velt-js/mcp-installer" },
          { id: "claude", label: "Claude Code", command: "claude mcp add velt-installer -- npx -y @velt-js/mcp-installer" },
          { id: "windsurf", label: "Windsurf", command: "npx -y @velt-js/mcp-installer" },
          { id: "copilot", label: "Copilot", command: "npx -y @velt-js/mcp-installer" },
          { id: "zed", label: "Zed", command: "npx -y @velt-js/mcp-installer" },
        ],
        "vfpMcpTab",
      ),
    },
    integrations: keyed(
      [
        {
          label: "SDK frameworks",
          chips: keyed(
            [
              { label: "React", href: "https://docs.velt.dev/quickstart/react", newTab: true, icon: "/images/home/nav-icons/react.svg" },
              { label: "Next.js", href: "https://docs.velt.dev/quickstart/nextjs", newTab: true, icon: "/images/home/nav-icons/nextdotjs.svg" },
              { label: "Angular", href: "https://docs.velt.dev/quickstart/angular", newTab: true, icon: "/images/home/nav-icons/angular.svg" },
              { label: "Vue", href: "https://docs.velt.dev/quickstart/vue", newTab: true, icon: "/images/home/nav-icons/vuedotjs.svg" },
              { label: "HTML", href: "https://docs.velt.dev/quickstart/html", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "Editor integrations",
          chips: keyed(
            [
              { label: "Tiptap", href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/tiptap", newTab: true },
              { label: "React Flow", href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/reactflow", newTab: true },
              { label: "CodeMirror", href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/codemirror", newTab: true },
              { label: "BlockNote", href: "https://docs.velt.dev/realtime-collaboration/crdt/setup/blocknote", newTab: true },
              { label: "Core library", href: "https://docs.velt.dev/realtime-collaboration/crdt/overview", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "APIs and pipes",
          chips: keyed(
            [
              { label: "CRDT REST API", href: "https://docs.velt.dev/realtime-collaboration/crdt/overview", newTab: true },
              { label: "Live State REST API", href: "https://docs.velt.dev/", newTab: true },
              { label: "Broadcast Event REST API", href: "https://docs.velt.dev/", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch multiplayer editing this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Edits that never collide.",
    support: "Each card is the live SDK. Toggle to Code for the exact snippet that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Single editor mode",
          codeKicker: "// single editor",
          headline:
            "One person holds the pen while everyone else watches live; read-only access is enforced by the SDK. Overwrite bugs during handoffs are gone, and passing the pen is a request-and-accept, never a race.",
          preview: "multiplayer-editing/showcase/single-editor",
          code: "<VeltSingleEditorModePanel />\n// request, accept, reject access",
        },
        {
          num: "02",
          name: "Live state sync",
          codeKicker: "// state sync",
          headline:
            "Sync filters, toggles, form fields, any JSON across clients with no websocket code. A useState-style hook makes a synced component a one-line change: local-first, offline-safe, last-write-wins.",
          preview: "multiplayer-editing/showcase/state-sync",
          code: 'const [view, setView] = useLiveState("filters", {});',
        },
        {
          num: "03",
          name: "Conflict-free merge",
          codeKicker: "// merge",
          headline:
            "Yjs CRDTs merge concurrent edits automatically, eventual consistency with no merge conflicts. Two analysts type in the same forecast narrative and neither loses a keystroke.",
          preview: "multiplayer-editing/showcase/merge",
          code: '// Yjs merges concurrent edits\nuseCollaboration({ editorId: "forecast" });',
        },
        {
          num: "04",
          name: "Presence, cursors, and live selection",
          codeKicker: "// presence",
          headline:
            "Avatars, named cursors, and live selections inside the same document, humans and agents alike. The signals users expect from every multiplayer app, wired into the editor.",
          preview: "multiplayer-editing/showcase/presence",
          code: "<VeltPresence />\n<VeltCursor />",
        },
        {
          num: "05",
          name: "Version checkpoints",
          codeKicker: "// checkpoints",
          headline:
            "Named snapshots of the document state, saved and restored by API; a restore broadcasts to every client. The draft before the bad rewrite is one call away.",
          preview: "multiplayer-editing/showcase/checkpoints",
          code: 'velt.crdt.saveVersion({ name: "pre-rewrite" });',
        },
        {
          num: "06",
          name: "Customer-defined encryption",
          codeKicker: "// encryption",
          headline:
            "Encrypt synced content with keys you define; Velt moves ciphertext, not content. The compliance answer when the document itself is the sensitive asset.",
          preview: "multiplayer-editing/showcase/encryption",
          code: "// ciphertext only \u2014 your keys\nsetEncryptionProvider(provider);",
        },
        {
          num: "07",
          name: "Offline and multi-tab",
          codeKicker: "// offline",
          headline:
            "Local-first writes queue offline and sync on reconnect, and the same user\u2019s tabs stay synchronized. The warehouse dead-zone edit lands when the signal returns.",
          preview: "multiplayer-editing/showcase/offline",
          code: "// local-first; queues offline, syncs on reconnect",
        },
        {
          num: "08",
          name: "Editor integrations",
          codeKicker: "// editors",
          headline:
            "Tiptap, React Flow, CodeMirror, and BlockNote out of the box; Lexical is coming soon. The core library wires your own editor, whiteboard, or grid onto the same engine.",
          preview: "multiplayer-editing/showcase/editors",
          code: "@veltdev/tiptap-crdt-react\n@veltdev/codemirror-crdt-react",
        },
        {
          num: "09",
          name: "Core stores for custom state",
          codeKicker: "// stores",
          headline:
            "Framework-agnostic CRDT stores in four types \u2014 text, map, array, xml \u2014 with subscriptions and a typed React hook. Forms, whiteboards, dashboards: shared state, not just documents.",
          preview: "multiplayer-editing/showcase/stores",
          code: 'velt.crdt.getStore({ id, type: "map" });',
        },
        {
          num: "10",
          name: "Server and agent writes",
          codeKicker: "// server writes",
          headline:
            "The CRDT REST API writes proper CRDT operations onto the live document, and connected clients pick up the change. Your backend, or your agent, edits beside your users.",
          preview: "multiplayer-editing/showcase/server-writes",
          code: "POST /v2/crdt/update // server or agent writes",
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/realtime-collaboration/crdt/overview", true),
      cta("View Examples", "/examples"),
    ]),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "Our \u201Cmy changes disappeared\u201D tickets went to zero the week we moved to CRDT-backed editing. Two analysts type in the same forecast and nobody loses a keystroke.",
      who: "Engineering lead \u00b7 FP&A platform",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support:
      "Shipped functionality only, traceable to docs; engineering sign-off still applies. This is the part of an in-house build that never ends.",
    visibleCount: 12,
    items: keyed(
      [
        { label: "Editing-role API: setUserAsEditor, requestEditorAccess, accept and reject, editor-change events" },
        { label: "Conflict-free Yjs merge for concurrent edits" },
        { label: "Offline-first local reads and writes with automatic re-sync" },
        { label: "Multi-tab synchronization" },
        { label: "Version checkpoints: save, list, restore, apply locally" },
        { label: "Connection and sync-state monitoring: connecting, connected, disconnected, isSynced" },
        { label: "CRDT event subscription (updateData)" },
        { label: "Debounced backend writes (debounceMs)" },
        { label: "Initial content applied once for new documents; force-reset to template content" },
        { label: "Custom encryption provider for CRDT payloads before storage" },
        { label: "Yjs escape hatches: getDoc, getXmlFragment, getAwareness, getProvider, getStore" },
        { label: "Remote cursors with name labels via Yjs awareness in editor integrations" },
        { label: "CRDT REST APIs: add, get, update" },
        { label: "React hook wrapper (@veltdev/crdt-react)" },
        { label: "Single editor mode panel (VeltSingleEditorModePanel) with wireframe customization" },
        { label: "Custom mode with data-velt-sync-access element attributes" },
        { label: "Container scoping (singleEditorModeContainerIds)" },
        { label: "Single-tab editor lock and editCurrentTab takeover" },
        { label: "Editor-state hooks: useUserEditorState, useEditorAccessRequestHandler" },
        { label: "Server-timestamp last-write-wins conflict resolution" },
        { label: "Live state sync: setLiveStateData with merge config; listenToNewChangesOnly" },
        { label: "getLiveStateData subscription and fetchLiveStateData one-time reads" },
        { label: "useLiveState hook with syncDuration and resetLiveState" },
        { label: "Server connection states: online, offline, pendingInit, pendingData" },
        { label: "Redux middleware for synced state" },
        { label: "Broadcast Event REST API" },
        { label: "Live state data persists until manually removed" },
        { label: "Lexical CRDT co-editing", soon: true },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your editor, your rules.",
    support:
      "Prebuilt panels for the fast path, wireframes and CSS for fully custom UIs, and configuration, hooks, merge config, and REST APIs underneath.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "The single editor mode panel comes prebuilt and restyles through wireframes; collaboration cursors style with plain CSS via caret and label classes; global styles and dark mode apply.",
          preview: "multiplayer-editing/make-it-yours/look",
          code: "<VeltSingleEditorModePanelWireframe>\n  // your markup, Velt syncs\n</VeltSingleEditorModePanelWireframe>",
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "customMode for manual read-only control, container scoping, tab locking, debounceMs and syncDuration tuning, merge config, a custom encryption provider, the CRDT and live state REST APIs, and Redux middleware.",
          preview: "multiplayer-editing/make-it-yours/behavior",
          code: 'useCollaboration({ editorId, customMode: true });\nsetLiveStateData(id, data, { merge: true });',
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We dropped co-editing into our own editor without touching the engine. The merge config and the custom encryption provider were the only knobs we needed.",
      who: "Staff engineer \u00b7 document platform",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "Multiplayer editing, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "multiplayer-editing/in-production/sales",
          caption:
            "Two copywriters and a brand reviewer draft the same email live, edits merging mid-sentence. The intro paragraph nobody saved still survives the handoff.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech & FP&A",
          demoPreset: "multiplayer-editing/in-production/fintech",
          caption:
            "Single editor lock on the filing: one analyst holds the pen while reviewers watch the cells change live. The handoff is requested, accepted, and on the record.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "multiplayer-editing/in-production/ops",
          caption:
            "State sync keeps the dispatch board identical on every screen, and field edits from a dead zone merge on reconnect. No refresh, no stale statuses.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "compliance",
          label: "Compliance",
          demoPreset: "multiplayer-editing/in-production/compliance",
          caption:
            "The compliance team co-edits the disclosure live, a single-editor lock on the attestation line so two officers never overwrite each other. Reviewers watch the controls register change in real time before sign-off.",
          link: cta("For compliance", "/for/compliance"),
        },
        {
          id: "legal",
          label: "Legal",
          demoPreset: "multiplayer-editing/in-production/legal",
          caption:
            "Counsel and the deal team redline the clause together, edits merging mid-sentence with no versioned-email round-trip. The liability cap nobody saved still survives into the next revision.",
          link: cta("For legal", "/for/legal"),
        },
        {
          id: "ai",
          label: "AI-native SaaS",
          demoPreset: "multiplayer-editing/in-production/ai",
          caption:
            "An agent rewrites one section while the human drafts another, and Yjs merges both streams without conflict. Generated work lands in the document, not in a paste buffer.",
          link: cta("For AI-native SaaS", "/for/ai-native-saas"),
        },
      ],
      "vfpProdTab",
    ),
    whereItFits: {
      label: "Where it fits:",
      links: keyed([
        cta("Sales enablement", "/for/sales-enablement"),
        cta("Fintech and FP&A", "/for/fintech"),
        cta("Operations", "/for/operations"),
        cta("Compliance", "/for/compliance"),
        cta("Legal", "/for/legal"),
        cta("AI-native SaaS", "/for/ai-native-saas"),
      ]),
    },
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "See it running in products like yours.",
      microcopy: "30 minutes, with an engineer, not a sales deck.",
      cta: cta("Book Demo", "/book-demo"),
    },
  },

  related: {
    kicker: "Related primitives",
    heading: "Where the edit goes next.",
    support: "Consent before an edit lands, who is in the document, and the thread beside the change.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Suggestions",
          body: "When an edit needs consent before it lands, it arrives as a suggestion a human accepts or rejects.",
          visual: "multiplayer-editing/related/suggestions",
          link: cta("Explore Suggestions", "/suggestions"),
        },
        {
          iconKey: "shield",
          title: "Presence",
          body: "Who is in the document right now, human or agent, cursors included.",
          visual: "multiplayer-editing/related/presence",
          link: cta("Explore Presence", "/presence"),
        },
        {
          iconKey: "velt",
          title: "Comments",
          body: "The thread beside the edit, anchored to the exact line under discussion.",
          visual: "multiplayer-editing/related/comments",
          link: cta("Explore Comments", "/comments"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Customer-managed encryption"],
    line: "CRDT payloads can be encrypted with your own encryption provider before they reach Velt storage \u2014 Velt moves ciphertext, not content. Co-editing, single editor mode, and live state sync run on the same isolation guarantees as the rest of the SDK.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "The overwrite bug, gone.",
    support: "\u201CMy changes disappeared\u201D stopped reaching support.",
    cards: keyed(
      [
        {
          metric: "0 tickets",
          quote:
            "Our \u201Cmy changes disappeared\u201D support tickets went to zero after we switched to CRDT-backed co-editing. Concurrent edits just merge.",
          who: "Engineering lead, FP&A platform",
        },
        {
          metric: "1 afternoon",
          quote:
            "We had Tiptap co-editing, cursors, and version checkpoints running in an afternoon. The sync server we had scoped for a quarter never got built.",
          who: "Founding engineer, collaborative editor",
        },
        {
          metric: "0 conflicts",
          quote:
            "An agent rewrites one section while our user drafts another, and Yjs merges both streams without a single conflict. Generated work lands in the document.",
          who: "VP Engineering, AI-native SaaS",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about multiplayer editing.",
    items: keyed(
      [
        {
          question: "How do I add multiplayer editing to a React app?",
          answer:
            "Install @veltdev/react and the CRDT package for your editor (for Tiptap, @veltdev/tiptap-crdt-react), wrap your app in VeltProvider with your API key, set the document, then call useCollaboration with an editorId and add the returned extension to your editor. The quickstart and the Tiptap setup guide walk through it.",
        },
        {
          question: "How do you prevent two people from overwriting each other?",
          answer:
            "Two ways, both built in. Co-editing merges concurrent edits with Yjs CRDTs, so simultaneous changes combine instead of colliding. Single editor mode locks editing to one person while everyone else watches live, with request and handoff APIs for passing access. Use merge when everyone should type at once, the lock when exactly one person should.",
        },
        {
          question: "Which editors does multiplayer editing support?",
          answer:
            "Tiptap, CodeMirror, and 10 other editor libraries, or your own through the framework-agnostic core library with text, map, array, and xml stores.",
        },
        {
          question: "Does it work offline?",
          answer:
            "Yes. Co-editing is offline-first: writes apply locally and sync automatically on reconnect, with Yjs merging whatever happened while you were gone. Single editor mode and live state sync also keep working offline, syncing on reconnect with last-write-wins resolution.",
        },
        {
          question: "Do I need to run my own Yjs or websocket servers?",
          answer:
            "No. Velt handles synchronization between connected clients; you install the SDK and create a store. There is no sync server, websocket fleet, or persistence layer to operate.",
        },
        {
          question: "Can AI agents edit alongside my users?",
          answer:
            "Server-side edits go through the CRDT REST API, which writes proper CRDT operations onto the live document so every connected client picks up the change. A backend process or an agent can edit the same document your users are typing in. For agent edits that need human consent first, see Suggestions.",
        },
        {
          question: "When do I use co-editing vs single editor mode vs state sync?",
          answer:
            "Co-editing for documents everyone edits at once (Yjs merge). Single editor mode for one pen with a live audience and controlled handoffs. State sync for everything that is not a document: filters, toggles, form fields, any JSON your UI shares across clients.",
        },
        {
          question: "What does it cost to add multiplayer editing?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production. Multiplayer editing, single editor mode, and state sync are part of the SDK, not separately priced add-ons.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add multiplayer editing to your product.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    microcopies: [
      "Free tier. No credit card. First comment in 5 minutes.",
      "30 minutes, with an engineer, not a sales deck.",
    ],
  },
};

async function main() {
  if (DRY_RUN) {
    console.log("DRY RUN \u2014 document shape:");
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
