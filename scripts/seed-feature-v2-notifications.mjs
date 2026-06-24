#!/usr/bin/env node
/**
 * Seed the featurePageV2-notifications document in Sanity so it renders at
 * /new-features/notifications via app/new-features/[slug]/page.tsx.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-notifications.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-notifications.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *Preset field references a key wired
 * in components/feature-new/demo-presets/notifications.tsx.
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
const STEP_MOUNT = `// enable Notifications in the Velt Console first
<VeltNotificationsTool />
// or embed VeltNotificationsPanel`;

const doc = {
  _id: "featurePageV2-notifications",
  _type: "featurePageV2",
  title: "Notifications",
  slug: { _type: "slug", current: "notifications" },
  beta: false,
  breadcrumbLabel: "Notifications",
  metaTitle: "Notifications | Real-time, cross-channel | Velt",
  metaDescription:
    "Cross-channel out of the box: in-app, email, Slack, and Teams with batching, routing, broadcasts, and per-user preferences.",

  hero: {
    kicker: "Notifications",
    title: "Add real-time notifications to your product.",
    secondary:
      "Cross-channel out of the box: in-app feeds, email, Slack, and Teams, with batching, routing, broadcasts, and per-user preferences.",
    accent: "Stop letting deadlines die in unread inboxes.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "inbox", label: "In-app inbox", demoPreset: "notifications/hero/inbox" },
        { id: "email", label: "Email", demoPreset: "notifications/hero/email" },
        { id: "slack", label: "Slack", demoPreset: "notifications/hero/slack" },
        { id: "preferences", label: "Preferences", demoPreset: "notifications/hero/preferences" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Notification feeds running inside products at",
    migration: {
      label: "Migrating from an in-house build or another SDK?",
      links: keyed([cta("Compare", "/compare/notifications"), cta("Migration guide", "https://docs.velt.dev/", true)]),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "One feed, both actor types.",
    body: "Cross-channel notifications for the review layer, out of the box: in-app feeds, email, Slack, and Microsoft Teams. By default the inbox is connected to Comments \u2014 mentions, replies, and thread activity generate notifications automatically, and only for documents the user has access to. Your backend adds custom events through the REST API, an optional pipeline batches bursts into digests, and each user sets their own preferences per channel.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/notifications/overview", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "notifications/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to the first notification.",
    support:
      "Enable Notifications in the Velt Console, drop in the tool, and comment activity flows into the inbox automatically. Email, batching, and custom events layer on from there.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Mount", title: "Add the bell.", filename: "app-header.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "By default the inbox is connected to Comments: mentions, replies, and thread activity generate notifications automatically, and only for documents the user has access to. Custom events from your backend land in the same inbox through the REST API with full CRUD. Email goes out through your SendGrid account or any email service via webhooks. An optional delay-and-batch pipeline holds notifications, suppresses delivery when the recipient already saw the activity, and groups the rest into digests. Preferences are per-user: set all, mine, or none per channel, per document or org-wide.",
      microcopy: "// comment activity flows in automatically \u00b7 scoped to documents the user can access",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "event capture across every feature",
        "an inbox UI with tabs and read states",
        "permission filtering so users never see activity they lack access to",
        "email delivery and templates",
        "channel fan-out",
        "batching and digest logic",
        "suppression of already-seen activity",
        "per-user preference storage at document and org level",
        "retention rules and an API for custom events",
      ],
      close:
        "Teams that build it budget weeks for the inbox and a quarter for the pipeline, then keep paying for the long tail. The 3 steps above replace the inbox; the capability wall below replaces the pipeline.",
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
          label: "Channels and pipes",
          chips: keyed(
            [
              { label: "SendGrid (email)", href: "https://docs.velt.dev/async-collaboration/comments/customize-behavior/notifications", newTab: true },
              { label: "Webhooks", href: "https://docs.velt.dev/api-reference/webhooks", newTab: true },
              { label: "Notifications REST API", href: "https://docs.velt.dev/async-collaboration/notifications/overview", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch notifications this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Reviewers, reached in time.",
    support: "Each card is the live SDK. Toggle to Code for the exact snippet that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "In-app inbox",
          codeKicker: "// inbox",
          headline:
            "Prebuilt tool and panel components with For You, Document, and All tabs. The reviewer opens one feed and finds every mention, reply, and sign-off request waiting.",
          preview: "notifications/showcase/inbox",
          code: "<VeltNotificationsTool />\n// panel opens automatically",
        },
        {
          num: "02",
          name: "Email notifications",
          codeKicker: "// email",
          headline:
            "Mentions and replies fire emails through your SendGrid account or any service via webhooks. The reviewer who hasn\u2019t opened your product today still sees the sign-off request.",
          preview: "notifications/showcase/email",
          code: "// SendGrid integration: API key,\n// template ID, from address in console",
        },
        {
          num: "03",
          name: "Batching and digests",
          codeKicker: "// batching",
          headline:
            "A delay-and-batch pipeline holds bursts, drops what the recipient already saw, and delivers one digest. Deadline-day activity arrives as a summary, not forty separate pings.",
          preview: "notifications/showcase/batching",
          code: "// delay-and-batch + already-seen\n// suppression, configured in console",
        },
        {
          num: "04",
          name: "Per-user preferences",
          codeKicker: "// preferences",
          headline:
            "Each user sets all, mine, or none per channel, per document or org-wide, through the settings UI or REST API. The reviewer decides what reaches them.",
          preview: "notifications/showcase/preferences",
          code: '<VeltNotificationsTool enableSettings />',
        },
        {
          num: "05",
          name: "Custom notifications via REST API",
          codeKicker: "// custom",
          headline:
            "POST your app\u2019s own events into the same inbox: deadline alerts, counterparty updates, workflow steps. One feed carries everything your reviewers need to act on.",
          preview: "notifications/showcase/custom",
          code: 'POST /v2/notifications\n{ "type": "deadline", "to": userId }',
        },
        {
          num: "06",
          name: "Webhooks to your channels",
          codeKicker: "// webhooks",
          headline:
            "Comment and review events fire to your endpoint with full payloads; route them to Slack or any channel you run. Your pipeline, your rules, Velt supplies the events.",
          preview: "notifications/showcase/webhooks",
          code: 'velt.webhooks.subscribe({\n  events: ["comment.*", "review.*"],\n});',
        },
        {
          num: "07",
          name: "Agent activity notifications",
          codeKicker: "// agents",
          headline:
            "An agent is a user: its findings notify the assigned reviewer like anyone\u2019s. The agent works overnight; the reviewer finds the approve-or-reject queue at nine.",
          preview: "notifications/showcase/agents",
          code: '// agent comments + inbox auto-\n// connection to Comments',
        },
        {
          num: "08",
          name: "Permission-scoped feeds",
          codeKicker: "// permissions",
          headline:
            "Notifications generate only for documents the user can access. The counterparty sees their thread move; your team\u2019s internal deliberation never reaches their inbox.",
          preview: "notifications/showcase/permissions",
          code: "// notifications fetched only for\n// documents the user can access",
        },
        {
          num: "09",
          name: "Notification data on your infrastructure",
          codeKicker: "// self-host",
          headline:
            "The self-host data provider keeps notification content on your servers; Velt stores minimal identifiers. The deal blocked on data residency clears without a feature trade.",
          preview: "notifications/showcase/self-host",
          code: "// notifications data provider →\n// content on your infrastructure",
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/notifications/overview", true),
      cta("View Examples", "/examples"),
    ]),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "Approval requests used to sit unread until the deadline passed. With the inbox and email out of the box, the approver sees their turn the same day \u2014 our campaigns stopped slipping.",
      who: "Marketing ops lead \u00b7 content platform",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support:
      "Shipped functionality leads; draft items render after engineering sign-off. This is the part of an in-house build that never ends.",
    visibleCount: 12,
    items: keyed(
      [
        { label: "VeltNotificationsTool and VeltNotificationsPanel components" },
        { label: "Panel tabs: For You, Document, and All" },
        { label: "Default fetch limits (50 in For You, 15 per document), all configurable" },
        { label: "Notifications generated and fetched only for documents the user can access" },
        { label: "Custom notifications via REST API with full CRUD (v1 and v2)" },
        { label: "Notification config REST API (get and set), per-user preference keys" },
        { label: "Preference values ALL, MINE, or NONE, per document or org default" },
        { label: "User-facing settings on the tool or panel (enableSettings)" },
        { label: "setSettings, getSettings, and a settingsUpdated event" },
        { label: "Delay-and-batch delivery with already-seen suppression and digests" },
        { label: "Email via SendGrid integration or any service via webhooks" },
        { label: "Documented email template payload plus a sample HTML template" },
        { label: "Wireframes and primitives for the Panel and Tool" },
        { label: "Self-host notification content via the data provider" },
        { label: "Mark-as-read and read states in the panel UI", soon: true },
        { label: "First-party Slack, Teams, Discord, Resend, and Customer.io delivery", soon: true },
        { label: "Routing rules and broadcasts", soon: true },
        { label: "Deadline reminders", soon: true },
        { label: "Settings scope beyond the root document", soon: true },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your inbox, your pipeline.",
    support:
      "Prebuilt Tool and Panel for the fast path, wireframes and primitives for fully custom inbox UIs, and a REST surface for custom events and preferences.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "Prebuilt Notifications Tool and Panel for the fast path; wireframes and primitives for both for fully custom inbox UIs; template variables, global styles, dark mode. Your SendGrid email template is yours end to end.",
          preview: "notifications/make-it-yours/look",
          code: "<VeltNotificationsPanelWireframe>\n  // your markup\n</VeltNotificationsPanelWireframe>",
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "Custom notifications via REST API; notification config API at document or org level; settings APIs with an extendable channel list; batching and delay configuration in the console; webhooks into your own channel pipeline.",
          preview: "notifications/make-it-yours/behavior",
          code: 'POST /v2/notifications/config\n{ "channel": "email", "value": "MINE" }',
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We POST our own deadline and counterparty events into the same inbox as comment activity. Reviewers have one place to look instead of five.",
      who: "Staff engineer \u00b7 deal management platform",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "Reached in time, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "notifications/in-production/sales",
          caption:
            "Brand and legal get the review request where they work: inbox, email, or their channel. The campaign deadline survives because the approver saw their turn today, not Thursday.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech",
          demoPreset: "notifications/in-production/fintech",
          caption:
            "A sign-off request on the Q3 forecast reaches the controller as one digest, not a ping per cell. The close calendar holds because no approval waits unseen.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "notifications/in-production/ops",
          caption:
            "The shipment exception notifies your team in-app and the counterparty by email, each seeing only their side. Deskless reviewers get the request without living in your product.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "ai",
          label: "AI-native",
          demoPreset: "notifications/in-production/ai",
          caption:
            "Agent findings land in the reviewer\u2019s feed the moment the run completes, batched into one digest. Generated work moves to a human decision instead of waiting to be discovered.",
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
    heading: "Everything that needs a reviewer\u2019s eyes.",
    support: "Comment threads, approval steps, and agent findings all reach the inbox.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Comments",
          body: "The default notification source: every thread event lands in the inbox.",
          visual: "notifications/related/comments",
          link: cta("Explore Comments", "/comments"),
        },
        {
          iconKey: "shield",
          title: "Approval flows",
          body: "A pipeline only completes if reviewers see their turn.",
          visual: "notifications/related/approval-flows",
          link: cta("Explore Approval flows", "/approval-flows"),
        },
        {
          iconKey: "velt",
          title: "Review agents",
          body: "Findings reach a human through the feed.",
          visual: "notifications/related/review-agents",
          link: cta("Explore Review agents", "/review-agents"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Permission-scoped"],
    line: "Notification content can live on your infrastructure via the self-host data provider, with only minimal identifiers on Velt. Notifications generate only for documents a user can access, so internal deliberation never reaches the wrong inbox.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "Deadlines that held.",
    support: "Reviews stopped stalling on unseen requests.",
    cards: keyed(
      [
        {
          metric: "0 slips",
          quote:
            "Approval requests used to die in unread inboxes. Now the approver gets it in-app and by email the same day, and our campaign deadlines stopped slipping.",
          who: "Marketing ops lead, content platform",
        },
        {
          metric: "1 digest",
          quote:
            "Close week used to mean a ping per cell. Batching turned it into one digest a day, and the controller actually reads it.",
          who: "Controller, FP&A platform",
        },
        {
          metric: "1 day",
          quote:
            "We had a working inbox the day we dropped in the tool. The pipeline \u2014 batching, preferences, email \u2014 was already there.",
          who: "Staff Engineer, ops platform",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about Notifications.",
    items: keyed(
      [
        {
          question: "How do I add in-app notifications to a React app?",
          answer:
            "Install @veltdev/react, wrap your app in VeltProvider with your API key, enable Notifications in the Velt Console, and add the VeltNotificationsTool component where the bell belongs. The panel opens automatically; comment activity flows in with nothing else to wire.",
        },
        {
          question: "Which channels does Velt Notifications support?",
          answer:
            "In-app inbox components out of the box. Email through your SendGrid account or any email service via webhooks. Other channels like Slack via webhooks, with a Slack key in the per-user preference API.",
        },
        {
          question: "Can I send my own notifications through Velt?",
          answer:
            "Yes. POST custom notifications from your backend through the REST API and they land in the same inbox as comment activity, with full CRUD to update or remove them later.",
        },
        {
          question: "Can users control which notifications they get?",
          answer:
            "Yes. Turn on settings on the tool or panel and each user picks all, mine, or none per channel. The same config is settable via REST API, per document or as the org-wide default, and the settings UI channel list is extendable.",
        },
        {
          question: "Can Velt batch notifications into digests?",
          answer:
            "Yes. An opt-in delivery pipeline holds notifications, suppresses delivery when the recipient has already seen the activity, and groups the rest into digests before sending. Configured in the Velt Console.",
        },
        {
          question: "Do agent actions trigger notifications?",
          answer:
            "Yes. An agent is a user with type agent, so its comments and findings generate the same notifications as anyone\u2019s: the assigned reviewer gets the agent\u2019s output in their feed with the approve-or-reject step attached.",
        },
        {
          question: "How is this different from notification infrastructure like Knock?",
          answer:
            "Knock is general-purpose notification infrastructure: you send it events and it orchestrates delivery across channels at scale. Velt notifications come pre-wired to the review layer: comments, mentions, and review activity generate notifications automatically, the inbox components are included, and your backend adds custom events via REST API. If you need a standalone notification platform for your whole product, that is infrastructure like Knock; if you need your review loop noticed without building the pipeline, that is Velt.",
        },
        {
          question: "Can notification data stay on our infrastructure?",
          answer:
            "Yes. The notifications data provider keeps notification content on your infrastructure while Velt stores only minimal identifiers. See the self-hosting page.",
        },
        {
          question: "What does it cost to add notifications?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production. Notifications is part of the SDK, not a separately priced add-on.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add real-time notifications to your product.",
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
