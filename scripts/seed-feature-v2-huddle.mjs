#!/usr/bin/env node
/**
 * Seed the featurePageV2-huddle document in Sanity so it renders at
 * /new-features/huddle via app/new-features/[slug]/page.tsx.
 *
 * /huddle covers Slack-style live audio, video, and screen sharing scoped to
 * the document under review.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-huddle.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-huddle.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *Preset field references a key wired
 * in components/feature-new/demo-presets/huddle.tsx.
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

const STEP_INSTALL = `npm install @veltdev/react`;
const STEP_PROVIDER = `<VeltProvider
  apiKey={VELT_API_KEY}>
  <YourApp />
</VeltProvider>`;
const STEP_MOUNT = `<VeltHuddle />
// place the start button anywhere:
<VeltHuddleTool />`;

const doc = {
  _id: "featurePageV2-huddle",
  _type: "featurePageV2",
  title: "Huddle",
  slug: { _type: "slug", current: "huddle" },
  beta: false,
  breadcrumbLabel: "Huddle",
  metaTitle: "Huddles | Slack-style huddles in your product | Velt",
  metaDescription:
    "Spontaneous audio and video inside the document. No link, no invite, no calendar.",

  hero: {
    kicker: "Huddle",
    title: "Add Slack-style huddles to your product.",
    secondary:
      "Spontaneous audio and video inside the document, no link, no invite.",
    accent: "No more sending your users to Zoom to finish what started in your product.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "start", label: "Start", demoPreset: "huddle/hero/start" },
        { id: "join", label: "Join", demoPreset: "huddle/hero/join" },
        { id: "share", label: "Share", demoPreset: "huddle/hero/share" },
        { id: "decide", label: "Decide", demoPreset: "huddle/hero/decide" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Huddles running inside products at",
    migration: {
      label: "Migrating from an in-house build or another SDK?",
      links: keyed(
        [cta("Compare", "/compare/huddle"), cta("Migration guide", "https://docs.velt.dev/", true)],
      ),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "When the thread can\u2019t resolve it.",
    body: "Velt Huddle adds Slack-style live audio, video, and screen sharing inside your product, scoped to the document your users are working on. A huddle starts with one click: no link, no invite, no calendar. It exists for the moment reviewers genuinely disagree: when two reviewers are three replies deep and still apart, the conversation attached to the work resolves what the thread cannot. Agents appear in the same presence row and their findings sit in the thread under discussion; the humans take the call and the consent step closes it. Agents do not join the audio or video.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/realtime-collaboration/huddle/overview", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "huddle/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to the first huddle.",
    support:
      "Wrap your app, add VeltHuddle at the root, and drop VeltHuddleTool where the start button belongs. Clicking the tool starts a huddle on the current document; teammates already there join in place.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Mount", title: "Add the huddle.", filename: "Toolbar.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "The VeltHuddleTool button starts a huddle on the current document; teammates in the same document join from where they already are. The type config sets what a huddle carries: audio, video, screen, or all (default all). An ephemeral chat is on by default and toggles by prop or API. Calls run peer-to-peer and fall back to a server-side connection automatically (serverFallback, default on). Clicking a participant\u2019s avatar can start Follow Me mode (flockModeOnAvatarClick, default off). Every huddle created or joined fires a webhook with the acting user, document id, and page metadata.",
      microcopy: "// VeltHuddleTool starts a huddle on the current document",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "WebRTC signaling and session management",
        "STUN and TURN infrastructure",
        "device permission UX for camera, mic, and screen capture",
        "peer-to-peer transport with server fallback",
        "join and leave state synced to presence",
        "in-call chat",
        "reconnection handling",
        "cross-browser quirks",
        "call quality monitoring",
      ],
      close:
        "Teams that build live audio and video budget a quarter for the first version and keep paying for the transport long tail. The 3 steps above replace that quarter.",
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
          label: "Web components",
          chips: keyed(
            [
              { label: "velt-huddle", href: "https://docs.velt.dev/realtime-collaboration/huddle/setup", newTab: true },
              { label: "velt-huddle-tool", href: "https://docs.velt.dev/realtime-collaboration/huddle/setup", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "APIs and events",
          chips: keyed(
            [
              { label: "Huddle Webhooks", href: "https://docs.velt.dev/realtime-collaboration/huddle/webhooks", newTab: true },
              { label: "Customize Behavior", href: "https://docs.velt.dev/realtime-collaboration/huddle/customize-behavior", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch huddles this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Stuck reviews, settled live.",
    support: "Each card is the live SDK. Toggle to Code for the exact snippet that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Audio huddles",
          codeKicker: "// audio",
          headline:
            "One click in your toolbar opens a live voice channel on the document under review. The pricing dispute gets talked through next to the pricing table, not in another app.",
          preview: "huddle/showcase/audio",
          code: '<VeltHuddleTool type="audio" />',
        },
        {
          num: "02",
          name: "Video huddles",
          codeKicker: "// video",
          headline:
            "Faces on, still inside the document. When the negotiation needs more than text, the client conversation happens where the deck is, not in a separate meeting tool.",
          preview: "huddle/showcase/video",
          code: '<VeltHuddleTool type="video" />',
        },
        {
          num: "03",
          name: "Screen share in the huddle",
          codeKicker: "// screen",
          headline:
            "Any participant shares their screen inside the huddle. Walk the reviewer through the clause, the cell, or the field record while everyone watches live.",
          preview: "huddle/showcase/screen-share",
          code: '<VeltHuddleTool type="screen" />',
        },
        {
          num: "04",
          name: "No-link, no-invite start",
          codeKicker: "// start",
          headline:
            "Clicking the huddle tool starts the call on the spot. Teammates already in the document join from where they are: no URL, no invite, no calendar.",
          preview: "huddle/showcase/no-link",
          code: "<VeltHuddleTool />",
        },
        {
          num: "05",
          name: "Huddles scoped to the document",
          codeKicker: "// scoped",
          headline:
            "A huddle belongs to the document it started on; every event carries the document id and page metadata. The conversation about the filing stays attached to the filing.",
          preview: "huddle/showcase/scoped",
          code: '// every event carries documentId\n// and page metadata',
        },
        {
          num: "06",
          name: "Presence integration",
          codeKicker: "// presence",
          headline:
            "Huddle users render through the same presence layer as the rest of your app. Reviewers see who is already talking about the contract before they join.",
          preview: "huddle/showcase/presence",
          code: "<VeltHuddle /> // renders huddle users in your app",
        },
        {
          num: "07",
          name: "Built-in chat",
          codeKicker: "// chat",
          headline:
            "Every huddle carries an ephemeral chat, on by default, toggleable through the API. Drop the corrected number or the doc link without talking over whoever has the floor.",
          preview: "huddle/showcase/chat",
          code: "velt.enableChat();\nvelt.disableChat();",
        },
        {
          num: "08",
          name: "Webhooks on create and join",
          codeKicker: "// webhooks",
          headline:
            "Every huddle created or joined fires a webhook with the user, document, and page metadata. Pipe live-conversation activity into your analytics or your audit pipeline.",
          preview: "huddle/showcase/webhooks",
          code: '// huddle.created · huddle.joined\n{ "actionType": "joined",\n  "notificationSource": "huddle",\n  "actionUser": { "name": "maya" },\n  "metadata": { "documentId": "contract-114" } }',
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/realtime-collaboration/huddle/overview", true),
      cta("View Examples", "/examples"),
    ]),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "The deck review used to stall, then move to a scheduled call the next day. Now the huddle starts on the slide and the claim is settled before anyone leaves the document.",
      who: "Head of Product \u00b7 sales enablement platform",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support:
      "Shipped functionality only. The confirmed set leads; draft items render after engineering sign-off. This wall stays short on purpose and indexes shipped truth only.",
    visibleCount: 12,
    items: keyed(
      [
        { label: "Huddle type config: audio, video, screen, or all (default all)" },
        { label: "Built-in ephemeral chat, default on, with enableChat and disableChat APIs" },
        { label: "Follow Me mode on avatar click (flockModeOnAvatarClick, default off)" },
        { label: "Peer-to-peer transport with automatic server-side fallback (serverFallback, default on)" },
        { label: "Webhooks on huddle created and joined: actionUser, document id, locations, page info" },
        { label: "VeltHuddleTool placeable anywhere in your UI" },
        { label: "Web components (velt-huddle, velt-huddle-tool) for non-React frameworks" },
        { label: "UI customization via huddle wireframe parts, slots, and template variables" },
        { label: "Global styles and dark mode" },
        { label: "Participant limits per huddle", soon: true },
        { label: "Mute and device-switching controls", soon: true },
        { label: "Mobile and WebView behavior for live calls", soon: true },
        { label: "Huddle behavior across page navigation within a document", soon: true },
        { label: "Localization coverage for huddle UI strings", soon: true },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your huddle UI, your call rules.",
    support:
      "Wireframe parts, slots, and template variables for the in-call bar and chat, plus type config, chat toggles, follow mode, and webhooks underneath.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "Huddle wireframe customization via Parts, Slots, and Template Variables, plus global styles and dark mode. The in-call bar and chat can look nothing like Velt\u2019s defaults.",
          preview: "huddle/make-it-yours/look",
          code: "<VeltHuddleWireframe>\n  // your in-call bar markup\n</VeltHuddleWireframe>",
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "Type config per tool instance (an audio-only button next to a full one), chat toggle by prop or API, Follow Me mode on avatar click, server fallback control, and webhooks into your pipeline.",
          preview: "huddle/make-it-yours/behavior",
          code: '<VeltHuddleTool type="audio" />\nvelt.disableChat();',
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We restyled the in-call bar to match our editor in a day. The transport, the reconnects, the screen-capture permissions: all of that was already handled.",
      who: "Staff engineer \u00b7 collaborative editor",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "Huddles, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "huddle/in-production/sales",
          caption:
            "The deck review stalls on the claims slide, and the huddle starts right there. Brand, legal, and the writer settle it in one conversation on the asset itself.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech",
          demoPreset: "huddle/in-production/fintech",
          caption:
            "When the variance question is too tangled for a cell thread, the analyst and the controller talk over the live model. The forecast gets settled with the numbers on screen.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "huddle/in-production/ops",
          caption:
            "The shipment exception needs the planner and the field lead at the same moment. The huddle runs on the order record, screen share on the discrepancy itself.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "ai",
          label: "AI-native",
          demoPreset: "huddle/in-production/ai",
          caption:
            "An agent flags a clause and two reviewers disagree on the fix. They huddle on the document, decide together, and the decision lands back on the finding.",
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
    heading: "Where the huddle leads next.",
    support: "The async half, the recording when schedules miss, and the presence that finds the right person.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Comments",
          body: "The async half: the huddle resolves what the thread could not, and the decision lands back in the thread.",
          visual: "huddle/related/comments",
          link: cta("Explore Comments", "/comments"),
        },
        {
          iconKey: "shield",
          title: "Recording",
          body: "When schedules do not line up, record instead: voice, video, and screen pinned to the work.",
          visual: "huddle/related/recording",
          link: cta("Explore Recording", "/recording"),
        },
        {
          iconKey: "velt",
          title: "Presence",
          body: "Who is in the document, and who is already talking.",
          visual: "huddle/related/presence",
          link: cta("Explore Presence", "/presence"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Self-host identity"],
    line: "User identity behind every participant can stay on your infrastructure via the users data provider, with Velt storing only user IDs. Huddle runs on the same SOC 2 controls and isolation guarantees as the rest of the SDK.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "The conversation that stayed in the product.",
    support: "Users stopped leaving to finish the conversation somewhere else.",
    cards: keyed(
      [
        {
          metric: "0 Zoom links",
          quote:
            "Our users used to bail to Zoom to finish a review. Now the huddle starts on the document and the conversation never leaves the product.",
          who: "Head of Product, sales enablement platform",
        },
        {
          metric: "1 week",
          quote:
            "Live audio and video was a quarter of work we did not have. We dropped in VeltHuddle and shipped it in a week.",
          who: "Founding engineer, collaborative editor",
        },
        {
          metric: "5 min",
          quote:
            "The pricing dispute that took a day of async replies now gets settled in a five-minute huddle next to the model.",
          who: "Controller, FP&A platform",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about Huddle.",
    items: keyed(
      [
        {
          question: "How is this different from embedding Zoom?",
          answer:
            "Zoom is a meeting product: scheduled, link-based, with its own app and account model, and it is very good at that. A Velt huddle is a feature of your product: it starts with one click on the document, with no link and no calendar, participants are your existing signed-in users, and it is scoped to the work being discussed. It is also part of the same SDK as comments, presence, and recording, so there is no second vendor and no second user system.",
        },
        {
          question: "How do I add huddles to a React app?",
          answer:
            "Install @veltdev/react, wrap your app in VeltProvider with your API key, add VeltHuddle at the root, and place VeltHuddleTool where you want the start button. Clicking the tool starts a huddle. The huddle setup guide walks through it.",
        },
        {
          question: "Can I run audio-only huddles?",
          answer:
            "Yes. The type config accepts audio, video, screen, or all; the default is all. An audio-only huddle button is one prop.",
        },
        {
          question: "How do teammates join a huddle?",
          answer:
            "From the document itself: users signed into the same document see the active huddle and join in place, without a link or an invite.",
        },
        {
          question: "Is there chat inside a huddle?",
          answer:
            "Yes. Every huddle has built-in ephemeral chat, on by default, and you can disable it by prop or through the API.",
        },
        {
          question: "What happens if the peer-to-peer connection fails?",
          answer:
            "Huddles run peer-to-peer and automatically fall back to a server-side connection. The fallback is on by default and configurable.",
        },
        {
          question: "Can I track huddle activity in my own systems?",
          answer:
            "Yes. Velt fires a webhook when a huddle is created or joined, with the acting user, document id, and page metadata in the payload. Pipe it into analytics or your audit pipeline.",
        },
        {
          question: "What does it cost to add huddles?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production. Huddle is part of the SDK, not a separately priced add-on.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add Slack-style huddles to your product.",
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
