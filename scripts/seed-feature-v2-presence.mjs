#!/usr/bin/env node
/**
 * Seed the featurePageV2-presence document in Sanity so it renders at
 * /new-features/presence via app/new-features/[slug]/page.tsx.
 *
 * Consolidated page: /presence covers presence + live cursors + live
 * selection + follow mode. The folded features render as showcase cards.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-presence.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-presence.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *Preset field references a key wired
 * in components/feature-new/demo-presets/presence.tsx.
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
 * Add a stable _key (and optional _type) to each item in an array.
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
const STEP_MOUNT = `<VeltPresence />
// siblings: <VeltCursor />,
// live selection, and flockMode`;

const doc = {
  _id: "featurePageV2-presence",
  _type: "featurePageV2",
  title: "Presence",
  slug: { _type: "slug", current: "presence" },
  beta: false,
  breadcrumbLabel: "Presence",
  metaTitle: "Presence | Agent or human presence, cursors, follow mode | Velt",
  metaDescription:
    "Live avatars, cursors, selection, and follow mode for humans and agents. See and supervise everyone working, live.",

  hero: {
    kicker: "Presence",
    title: "Add agent or human presence to your product.",
    secondary:
      "Live avatars show who is viewing and editing, human or agent, the signal users expect from every multiplayer app.",
    accent: "Stop building presence from scratch for a feature users assume exists.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "avatars", label: "Avatars", demoPreset: "presence/hero/avatars" },
        { id: "cursors", label: "Cursors", demoPreset: "presence/hero/cursors" },
        { id: "selection", label: "Selection", demoPreset: "presence/hero/selection" },
        { id: "follow", label: "Follow mode", demoPreset: "presence/hero/follow" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Presence running inside products at",
    migration: {
      label: "Migrating from Liveblocks or an in-house build?",
      links: keyed([cta("Compare", "/vs/liveblocks"), cta("Migration guide", "https://docs.velt.dev/", true)]),
    },
  },

  whatItIs: {
    kicker: "See your agents work",
    heading: "Both actor types, one primitive.",
    body: "Velt Presence adds live avatars showing who is viewing and editing, humans and agents alike. When agents act in your product, your users should never wonder what the AI is doing. Presence shows an agent is in the document. Cursors and live selection show exactly what it is touching, as it touches it. Follow mode lets a user ride along while an agent works, the same way they would follow a teammate. Supervision is not a dashboard somewhere else; it is the same multiplayer primitives your users already understand, with agents as first-class users.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/realtime-collaboration/presence/overview", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "presence/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to a live avatar row.",
    support:
      "Wrap your app, drop in VeltPresence, and avatars render for everyone on the document. Cursors, selection, and follow mode are sibling one-liners.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Mount", title: "Add presence.", filename: "your-file.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "Presence shows everyone online on the document, with heartbeat monitoring behind it. A user goes away after a configurable inactivity window (default 5 minutes) and immediately when their tab loses focus; offline after longer inactivity (default 10 minutes) or on connection loss. maxUsers collapses crowded avatar rows into an overflow count, and locationId scopes presence to a page, tab, or region. Agents and bots enter the same list via addUser() on the client or the Presence REST APIs from your backend. userStateChange events and the presence data API stream everything back to your code.",
      microcopy: "// heartbeat monitoring \u00b7 away after 5m or tab unfocus \u00b7 offline after 10m",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "websocket or realtime infrastructure",
        "heartbeats with idle and tab-focus detection",
        "connection-drop cleanup",
        "an avatar stack with overflow handling",
        "per-location scoping",
        "cursor throttling and position mapping across screen sizes",
        "selection tracking on editable elements",
        "viewport-following session management",
        "a path to register non-human participants",
      ],
      close:
        "Teams get a demo working in weeks; the idle states, reconnects, and fan-out scaling are the part that never ends. The 3 steps above replace the demo; the wall below replaces the long tail.",
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
          label: "Server and data",
          chips: keyed(
            [
              { label: "Presence REST APIs", href: "https://docs.velt.dev/realtime-collaboration/presence/overview", newTab: true },
              { label: "AG Grid", href: "https://docs.velt.dev/", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch presence this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Who\u2019s here, humans and agents.",
    support: "Each card is the live SDK. Toggle to Code for the exact snippet that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Avatar stack with overflow",
          codeKicker: "// avatars",
          headline:
            "Live avatars render for everyone on the document, and maxUsers collapses extras into a single +N avatar. The whole deal team opens the deck without burying your header.",
          preview: "presence/showcase/avatars",
          code: '<VeltPresence maxUsers={5} />',
        },
        {
          num: "02",
          name: "Online, away, and offline states",
          codeKicker: "// states",
          headline:
            "Heartbeats mark a user away after configurable inactivity, instantly on tab switch, and offline on connection loss. The \u201Cis anyone looking at this forecast\u201D question answers itself.",
          preview: "presence/showcase/states",
          code: '<VeltPresence\n  inactivityTime={5 * 60_000}\n/>',
        },
        {
          num: "03",
          name: "Agent presence",
          codeKicker: "// agents",
          headline:
            "addUser or the Presence REST API puts an agent in the avatar row while it works on the record. Your users see the reviewer is in before its findings land.",
          preview: "presence/showcase/agent",
          code: 'velt.addUser({\n  userId: "agent-1", type: "agent",\n});',
        },
        {
          num: "04",
          name: "Live cursors",
          codeKicker: "// cursors",
          headline:
            "No more real-time plumbing for table stakes: named cursors, or avatars in avatarMode, on every surface, humans and agents alike.",
          preview: "presence/showcase/cursors",
          code: '<VeltCursor />',
        },
        {
          num: "05",
          name: "Live selection",
          codeKicker: "// selection",
          headline:
            "Inputs, text areas, and contenteditable elements broadcast selection automatically; opt any element in. The \u201Cwhat are you looking at?\u201D question answers itself.",
          preview: "presence/showcase/selection",
          code: '<input data-velt-live-selection />',
        },
        {
          num: "06",
          name: "Follow mode",
          codeKicker: "// follow",
          headline:
            "No more black-box agent work your users can\u2019t watch: one click rides along with a teammate\u2019s or an agent\u2019s viewport, live.",
          preview: "presence/showcase/follow",
          code: '<VeltPresence flockMode />',
        },
        {
          num: "07",
          name: "Presence by location",
          codeKicker: "// location",
          headline:
            "locationId scopes the avatar row to a page, tab, or region of your app. See who is on this slide, not just somewhere in the deck.",
          preview: "presence/showcase/location",
          code: 'velt.setLocation({ id: "slide-4" });',
        },
        {
          num: "08",
          name: "Presence data and events",
          codeKicker: "// data",
          headline:
            "usePresenceData and userStateChange expose full presence state, queryable by status. Drive your own indicators, or escalate when the assigned reviewer goes idle.",
          preview: "presence/showcase/data",
          code: 'const users = usePresenceData({\n  statuses: ["away"],\n});',
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/realtime-collaboration/presence/overview", true),
      cta("View Examples", "/examples"),
    ]),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We had cursors, selection, and a working avatar row in an afternoon. The quarter we\u2019d budgeted for reconnects and idle states never happened.",
      who: "Founding engineer \u00b7 collaborative editor",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support: "All items trace to docs pages; engineering sign-off still applies.",
    visibleCount: 12,
    items: keyed(
      [
        { label: "Heartbeat monitoring for active-session visibility" },
        { label: "Configurable inactivityTime (default 5 min) and offlineInactivityTime (default 10 min)" },
        { label: "Instant away on tab unfocus (isTabAway); offline on connection loss" },
        { label: "maxUsers overflow avatar; include or exclude self" },
        { label: "locationId scoping to a page, tab, or region" },
        { label: "usePresenceData hook and getData API with status filters" },
        { label: "userStateChange and onPresenceUserClick events" },
        { label: "addUser and removeUser for AI agents, bots, and system accounts" },
        { label: "localOnly flag for client-only indicators" },
        { label: "Presence REST APIs (add, update, delete) for server-side presence" },
        { label: "Cursors: name labels or avatarMode; adaptation across screen sizes" },
        { label: "Cursors: allowedElementIds whitelisting; onCursorUserChange event" },
        { label: "Live selection on input, textarea, button, and contenteditable" },
        { label: "Live selection: per-element opt in/out via data attribute" },
        { label: "Live selection: indicator as avatar or label, position start or end" },
        { label: "getLiveSelectionData API and hook" },
        { label: "Follow mode via flockMode prop or enableFlockMode()" },
        { label: "Leader clicks, scrolls, and navigation replay on followers" },
        { label: "startFollowingUser / stopFollowingUser APIs; onNavigate callback" },
        { label: "Wireframes for Presence, Cursors, and Live Selection custom UIs" },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your avatar row, your rules.",
    support:
      "Prebuilt components for the fast path, wireframes for fully custom UIs, and configuration, hooks, events, and REST APIs underneath.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "Wireframe components for fully custom UIs across the family: Presence, Cursors, and Live Selection; template variables, dark mode, CSS customization. Your avatar row can look nothing like Velt\u2019s defaults.",
          preview: "presence/make-it-yours/look",
          code: "<VeltPresenceWireframe>\n  // your avatar markup\n</VeltPresenceWireframe>",
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "Configuration props (inactivity windows, maxUsers, locations, allowed elements), data subscriptions and hooks, presence events, addUser/removeUser, and the Presence REST APIs for server-driven presence.",
          preview: "presence/make-it-yours/behavior",
          code: 'velt.addUser({ userId, type: "agent" });\nonUserStateChange(handler);',
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "Adding the agent to the avatar row changed how users feel about our AI. They can see it working and follow along instead of staring at a spinner.",
      who: "Product lead \u00b7 AI-native SaaS",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "Presence, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "presence/in-production/sales",
          caption:
            "Brand, legal, and the client show up in the deck\u2019s avatar row, cursors on the slide they are reading. Nobody re-sends a link to ask who has seen the latest version.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech",
          demoPreset: "presence/in-production/fintech",
          caption:
            "Selection indicators sit on the exact cell each analyst is editing, and presence shows who is in the model right now. Close week runs without two people in one column.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "presence/in-production/ops",
          caption:
            "Dispatch sees who has the work order open before reassigning it; away and offline states show when the field crew dropped off. The handoff happens once, to someone actually there.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "ai",
          label: "AI-native",
          demoPreset: "presence/in-production/ai",
          caption:
            "The agent joins the avatar row while it drafts, and follow mode lets the user ride along as it works. Generated work is watchable, not a spinner.",
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
    heading: "Where presence leads next.",
    support: "Watching becomes feedback, editing, or a conversation in the document.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Comments",
          body: "When watching becomes feedback, threads anchor it to the element.",
          visual: "presence/related/comments",
          link: cta("Explore Comments", "/comments"),
        },
        {
          iconKey: "shield",
          title: "Multiplayer editing",
          body: "Presence shows who is in the work; co-editing lets them change it without overwrites.",
          visual: "presence/related/multiplayer-editing",
          link: cta("Explore Multiplayer editing", "/multiplayer-editing"),
        },
        {
          iconKey: "velt",
          title: "Huddle",
          body: "When presence finds the right person, the conversation starts inside the document.",
          visual: "presence/related/huddle",
          link: cta("Explore Huddle", "/huddle"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Self-host identity"],
    line: "User identity behind every avatar can stay on your infrastructure via the users data provider, with Velt storing only user IDs. Presence, cursors, and selection run on the same isolation guarantees as the rest of the SDK.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "The build-from-scratch quarter, skipped.",
    support: "A feature users assume exists, without the ML infrastructure quarter.",
    cards: keyed(
      [
        {
          metric: "1 afternoon",
          quote:
            "We\u2019d scoped a quarter for presence, cursors, and selection. We shipped all three in an afternoon and spent the quarter on our actual product.",
          who: "Founding engineer, collaborative editor",
        },
        {
          metric: "0 dashboards",
          quote:
            "Our users supervise the agent through the same avatar row and follow mode they already use for teammates. We never built a separate oversight dashboard.",
          who: "Product lead, AI-native SaaS",
        },
        {
          metric: "1 handoff",
          quote:
            "Away and offline states ended the double-assigned work orders. Dispatch sees who actually has the doc open before they reassign.",
          who: "Operations manager, logistics platform",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about Presence.",
    items: keyed(
      [
        {
          question: "How do I add presence to a React app?",
          answer:
            "Install @veltdev/react, wrap your app in VeltProvider with your API key, and add the VeltPresence component. Avatars render for everyone on the document; the quickstart walks through it in minutes.",
        },
        {
          question: "Can users see what an AI agent is doing?",
          answer:
            "Yes. Add the agent to the presence list with addUser or the Presence REST API and it appears in the avatar row like any user, including indicators visible only to one user via the localOnly flag. Cursors, live selection, and follow mode extend that to what the agent is touching and where it is going.",
        },
        {
          question: "When does a user show as away or offline?",
          answer:
            "Away after a configurable inactivity window (default 5 minutes) and immediately when their tab loses focus. Offline after longer inactivity (default 10 minutes) or when their connection drops. Both thresholds are one prop to change.",
        },
        {
          question: "Can I show presence for only part of my app?",
          answer:
            "Yes. locationId scopes the avatar row to a page, tab, or region; allowedElementIds restricts cursors to chosen elements; live selection opts elements in or out with a data attribute.",
        },
        {
          question: "Which surfaces do cursors and live selection work on?",
          answer:
            "Cursors work across your document and adapt across screen sizes and content differences, with optional element whitelisting. Live selection tracks inputs, text areas, buttons, and contenteditable elements automatically, and any other element you opt in with one attribute.",
        },
        {
          question: "How does follow mode work?",
          answer:
            "One user clicks another\u2019s avatar to start a session (docs call it Follow Me Mode). Whatever the leader does, clicking, scrolling, or navigating, happens on every follower\u2019s screen, with a callback to drive your own router.",
        },
        {
          question: "Can I build my own presence UI?",
          answer:
            "Yes. Use the prebuilt components as-is, restyle them with wireframes and template variables, or build fully custom UIs on the presence data hooks, events, and REST APIs. Your avatar row can look nothing like Velt\u2019s defaults.",
        },
        {
          question: "Does presence work outside React?",
          answer:
            "Yes. The SDK supports React, Next.js, Angular, Vue, and plain HTML via web components, and the Presence REST APIs cover server-side and non-web cases.",
        },
        {
          question: "What does it cost to add presence?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production. The presence family is part of the SDK, not a separately priced add-on.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add agent or human presence to your product.",
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
