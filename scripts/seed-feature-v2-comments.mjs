#!/usr/bin/env node
/**
 * Seed the featurePageV2-comments document in Sanity. This reproduces the
 * static /comments page as CMS data so it renders at /new-features/comments
 * via app/new-features/[slug]/page.tsx. It is the reference document for the
 * v10 feature-page template.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-comments.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-v2-comments.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-comments.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 *
 * Demo visuals are NOT stored here; each *Preset field references a key wired
 * in components/feature-new/demo-registry.tsx.
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
const STEP_MOUNT = `<VeltComments />
// threads anchor to any
// element you wrap`;

const doc = {
  _id: "featurePageV2-comments",
  _type: "featurePageV2",
  title: "Comments",
  slug: { _type: "slug", current: "comments" },
  beta: false,
  breadcrumbLabel: "Comments",
  metaTitle: "Comments SDK | Add comments to your product | Velt",
  metaDescription:
    "Contextual threads from humans or agents on any element, doc, cell, or canvas. The feedback layer your users already expect.",

  hero: {
    kicker: "Comments",
    title: "Add comments to your product.",
    secondary:
      "Contextual threads from humans or agents, on any element, doc, cell, or canvas, so feedback stops scattering across email, Slack, and screenshots.",
    accent: "No more two-quarter detours to build threads, mentions, and anchoring.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "freestyle", label: "Freestyle", demoPreset: "comments/hero/freestyle" },
        { id: "popover", label: "Popover", demoPreset: "comments/hero/popover" },
        { id: "text", label: "Text", demoPreset: "comments/hero/text" },
        { id: "inbox", label: "Inbox", demoPreset: "comments/hero/inbox" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Comment threads running inside products at",
    migration: {
      label: "Migrating from an in-house build or another SDK?",
      links: keyed([cta("Compare", "/vs/liveblocks"), cta("Migration guide", "https://docs.velt.dev/", true)]),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "One thread. Humans and agents.",
    body: "Velt Comments adds contextual comment threads to any part of your product: text, documents, spreadsheet cells, canvases, video frames, charts, or your own custom components. Both humans and agents can comment through the same API; an agent is just a user with type agent. Threads support mentions, assignment, resolve states, reactions, attachments, and visibility controls, and every comment is queryable through the API and fires events to your backend.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/comments/overview", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "comments/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to the first comment.",
    support:
      "Install the SDK, wrap your app, and add VeltComments. Threads anchor to any element, stream live to your UI, answer REST queries, and fire webhooks to your backend.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Mount", title: "Add comments.", filename: "your-file.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "Install the SDK, wrap the target element, and threads anchor to it. Threads support mentions, assignment, resolve states, reactions, attachments, and visibility controls. Every comment is queryable through the API and fires events to your backend. Agents comment through the Comments REST API, the same surface humans use.",
      microcopy: "// VeltComments anchors to any element \u00b7 queryable via API \u00b7 webhooks on every event",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "anchoring that survives content changes",
        "threading and replies",
        "@mentions with a user directory",
        "assignment and resolve states",
        "attachments and storage",
        "reactions",
        "visibility and permissions",
        "a notification pipeline",
        "offline handling",
        "a moderation and API layer",
      ],
      close:
        "Teams that build it budget a quarter for the first version and keep paying for the long tail. The 3 steps above replace the first quarter; the capability wall below replaces the long tail.",
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
          label: "Editors and surfaces",
          chips: keyed(
            [
              { label: "Tiptap", href: "https://docs.velt.dev/", newTab: true },
              { label: "Lexical", href: "https://docs.velt.dev/", newTab: true },
              { label: "Quill", href: "https://docs.velt.dev/", newTab: true },
              { label: "CodeMirror", href: "https://docs.velt.dev/", newTab: true },
              { label: "Charts and canvas", href: "https://docs.velt.dev/", newTab: true },
              { label: "Video and Lottie", href: "https://docs.velt.dev/", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "APIs and pipes",
          chips: keyed(
            [
              { label: "Comments REST API", href: "https://docs.velt.dev/async-collaboration/comments/overview", newTab: true },
              { label: "Webhooks", href: "https://docs.velt.dev/api-reference/webhooks", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch comments this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Threads that carry decisions.",
    support: "Each card is the live SDK. Toggle to Code for the exact snippet that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Comments on anything",
          codeKicker: "// anywhere",
          headline:
            "A doc, a PDF, a table cell, a chart datapoint, a video frame, a canvas. Robust anchoring to text and complex DOM elements; the anchor model works on your custom components too.",
          preview: "comments/showcase/anything",
          code: "// anchors to text and complex DOM\n<VeltComments />",
        },
        {
          num: "02",
          name: "Agent comments",
          codeKicker: "// agents",
          headline:
            "Your agent reviews and drops findings as contextual comments, anchored to the exact clause, cell, or claim, with Approve and Reject attached. In the work, not in a separate report.",
          preview: "comments/showcase/agents",
          code: 'POST /v2/comments\n{ "type": "agent", "actions": ["approve", "reject"] }',
        },
        {
          num: "03",
          name: "Private comments",
          codeKicker: "// visibility",
          headline:
            "Scope any thread to me, my team, or specific people. Internal debate stays internal: notes the client never sees, deliberation the counterparty can\u2019t read, drafts only the author can open.",
          preview: "comments/showcase/private",
          code: '<VeltComments visibility="private" />',
        },
        {
          num: "04",
          name: "Mentions and assignment",
          codeKicker: "// mentions",
          headline:
            "@mention pulls the right reviewer into the thread; assignment makes the decision someone\u2019s job. Reviews move when ownership is explicit.",
          preview: "comments/showcase/mentions",
          code: "// @Maya pulled in \u00b7 assigned to Sarah",
        },
        {
          num: "05",
          name: "Status and read receipts",
          codeKicker: "// status",
          headline:
            "Open, in progress, resolved, and who has seen what. The \u201Cdid legal look at this?\u201D question answers itself.",
          preview: "comments/showcase/status",
          code: '{ "status": "resolved", "seenBy": 3 }',
        },
        {
          num: "06",
          name: "Attachments and reactions",
          codeKicker: "// attachments",
          headline:
            "Drop the evidence in the thread: the source file, the field photo, the reference deck. Reactions clear the noise of +1 replies.",
          preview: "comments/showcase/attachments",
          code: "// files + emoji reactions on any thread",
        },
        {
          num: "07",
          name: "Recordings in the thread",
          codeKicker: "// recordings",
          headline:
            "A voice note on a cell, a screen recording on a draft. When saying it beats typing it, the recording pins where the work is.",
          preview: "comments/showcase/recordings",
          code: "// voice + screen recordings, pinned in context",
        },
        {
          num: "08",
          name: "Webhooks on every event",
          codeKicker: "// webhooks",
          headline:
            "Every comment, reply, resolve, and approval fires a webhook with the full payload. Pipe review activity into your backend, your analytics, your audit pipeline.",
          preview: "comments/showcase/webhooks",
          code: 'POST /your-webhook\n{ "event": "comment.added" }',
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/comments/overview", true),
      cta("View Examples", "/examples"),
    ]),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "Feedback used to live in email chains about the asset. Now it lives on the asset, in a thread anyone can resolve.",
      who: "Product lead \u00b7 collaborative editor",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support:
      "Shipped functionality only. The confirmed set leads; the rest follows. This is the part of an in-house build that never ends.",
    visibleCount: 12,
    items: keyed(
      [
        { label: "Private comments scoped to me, my team, or specific people" },
        { label: "Comment status: open, in progress, resolved" },
        { label: "Read receipts: who has seen each thread" },
        { label: "Attachments on comments" },
        { label: "Emoji reactions" },
        { label: "Robust anchoring to text and complex DOM elements" },
        { label: "Agent comments via the Comments REST API" },
        { label: "@mentions and assignment" },
        { label: "Recording attachments: voice, video, screen" },
        { label: "Threaded replies" },
        { label: "Resolve and reopen" },
        { label: "Deep links to a comment" },
        { label: "Comment types: comment, suggestion, custom" },
        { label: "Full CRUD REST API (v1 and v2)" },
        { label: "Webhooks on every event" },
        { label: "Comments sidebar with filters" },
        { label: "Comment pin, bubble, composer, and standalone thread components" },
        { label: "Wireframe and primitive components for fully custom UIs" },
        { label: "Inline, popover, stream, page, and freestyle UX modes" },
        { label: "Chart comments: ChartJS, Highcharts, Nivo, custom" },
        { label: "Canvas comments" },
        { label: "Lottie and video comments" },
        { label: "Editor setups: Tiptap, Lexical, Plate, Quill, SlateJS, CodeMirror, Ace" },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your comment UI, your rules.",
    support:
      "Prebuilt components for the fast path, wireframes and primitives for fully custom comment UIs, and custom types, data, CRUD APIs, and webhooks underneath.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "Prebuilt components (Comments Sidebar, Comment Pin, Comment Bubble, Comment Composer, Standalone Thread) for the fast path; wireframe components and primitives for fully custom comment UIs; themes and template variables.",
          preview: "comments/make-it-yours/look",
          code: "<VeltCommentsWireframe>\n  // your markup, Velt threads\n</VeltCommentsWireframe>",
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "Custom comment types, custom data on threads, full CRUD APIs, and webhooks into your pipeline.",
          preview: "comments/make-it-yours/behavior",
          code: 'velt.comments.create({ type: "suggestion" });\nvelt.webhooks.subscribe({ events: ["comment.*"] });',
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We restyled the prebuilt thread with our own wireframe in a day. Our comment UI looks nothing like Velt\u2019s defaults, and the hard parts were already done.",
      who: "Design engineer \u00b7 fintech platform",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "Comments, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "comments/in-production/sales",
          caption:
            "Brand, legal, and the client comment on the deck, the email, the page itself. Feedback lands on the asset, not in an email chain about the asset.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech",
          demoPreset: "comments/in-production/fintech",
          caption:
            "Cell-level threads on budgets, forecasts, and filings. The question about Q3 sits on the Q3 cell, attributed, resolved, and on the record.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "comments/in-production/ops",
          caption:
            "Threads on the order, the shipment, the field record. Your team\u2019s debate stays internal; the counterparty sees only what is meant for them.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "ai",
          label: "AI-native",
          demoPreset: "comments/in-production/ai",
          caption:
            "Every agent finding is a comment with Approve and Reject attached. The review loop for generated work runs on the same threads your users already know.",
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
    heading: "Where threads lead next.",
    support: "A comment with a proposed change, a finding that lands as a comment, the pipeline that keeps threads alive.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Suggestions",
          body: "A suggestion is a comment with a proposed change.",
          visual: "comments/related/suggestions",
          link: cta("Explore Suggestions", "/suggestions"),
        },
        {
          iconKey: "shield",
          title: "Review agents",
          body: "Findings land as comments, anchored to the work.",
          visual: "comments/related/review-agents",
          link: cta("Explore Review agents", "/review-agents"),
        },
        {
          iconKey: "velt",
          title: "Notifications",
          body: "The pipeline that keeps threads alive.",
          visual: "comments/related/notifications",
          link: cta("Explore Notifications", "/notifications"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Self-host data"],
    line: "Comment content can live on your infrastructure via the self-host data provider, with only minimal identifiers on Velt. GDPR deletion runs through the compliance API with its own audit log. Comments run on the same isolation guarantees as the rest of the SDK.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "The two-quarter build, skipped.",
    support: "Threads, mentions, and anchoring, without the detour.",
    cards: keyed(
      [
        {
          metric: "2 quarters",
          quote:
            "We\u2019d scoped two quarters to build threads, mentions, and anchoring ourselves. We dropped in VeltComments and shipped it in a week.",
          who: "Founding engineer, collaborative editor",
        },
        {
          metric: "1 thread",
          quote:
            "Brand, legal, and the client comment on the asset itself now. Feedback stopped scattering across email, Slack, and screenshots.",
          who: "Head of content, sales enablement platform",
        },
        {
          metric: "100%",
          quote:
            "Every agent finding lands as a comment with approve and reject attached. Our reviewers act on it in the work, not in a separate report.",
          who: "VP Engineering, AI-native SaaS",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about Comments.",
    items: keyed(
      [
        {
          question: "Which editors and surfaces do comments work on?",
          answer:
            "Anything that renders on the web. Comments anchor to elements, so the surface type does not matter: rich text editors (Tiptap, BlockNote, Lexical, Plate, Quill, Slate, ProseMirror, CodeMirror, Ace), documents and PDFs, spreadsheets and tables, charts (ChartJS, Highcharts, Nivo, or your own), HTML canvas, video, Lottie animations, and any custom component via the anchor API.",
        },
        {
          question: "Can AI agents leave comments?",
          answer:
            "Yes. Agents post through the same Comments REST API humans use; an agent is a user with type agent. Findings can carry approve and reject actions so a human decides what happens next.",
        },
        {
          question: "How do comments survive content changes?",
          answer:
            "Velt handles anchoring so threads stay attached when content moves or changes.",
        },
        {
          question: "Can comment data stay on our infrastructure?",
          answer:
            "Yes. The comments data provider keeps comment content on your infrastructure while Velt stores only minimal identifiers. See /self-hosting.",
        },
        {
          question: "How do I add comments to a React app?",
          answer:
            "Install @veltdev/react, wrap your app in VeltProvider with your API key, and add the VeltComments component. The first comment renders in about five minutes; the quickstart walks through it.",
        },
        {
          question: "Can I build my own comment UI?",
          answer:
            "Yes. Use the prebuilt components as-is, restyle them with wireframes and template variables, or build fully custom UIs on the primitives and APIs. Your comment UI can look nothing like Velt\u2019s defaults.",
        },
        {
          question: "Can we migrate our existing comments into Velt?",
          answer:
            "Yes, through the Comments REST API: import threads with authors, timestamps, and anchors.",
        },
        {
          question: "Does it work on mobile?",
          answer:
            "Yes. Velt is optimized for mobile web, works inside WebViews in native apps, and pure native apps can integrate through the REST APIs with your own native UI.",
        },
        {
          question: "What does it cost to add comments?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production. Comments is part of the SDK, not a separately priced add-on.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add comments to your product.",
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
