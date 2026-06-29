#!/usr/bin/env node
/**
 * Seed the featurePageV2-suggestions document in Sanity so it renders at
 * /new-features/suggestions via app/new-features/[slug]/page.tsx.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-suggestions.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-v2-suggestions.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-suggestions.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 *
 * Demo visuals are NOT stored here; each *Preset field references a key wired
 * in components/feature-new/demo-presets/suggestions.tsx.
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
  <VeltComments />
</VeltProvider>`;
const STEP_MOUNT = `// accept/reject render on the comment dialog
<div data-velt-suggestion-target="qty" />
const { enableSuggestionMode } = useEnableSuggestionMode();`;

const doc = {
  _id: "featurePageV2-suggestions",
  _type: "featurePageV2",
  title: "Suggestions",
  slug: { _type: "slug", current: "suggestions" },
  beta: true,
  breadcrumbLabel: "Suggestions",
  metaTitle: "Suggestion Mode | Add suggesting mode to any editor | Velt",
  metaDescription:
    "Inline edits from humans or agents, accepted or rejected like a diff. Works in any editor or custom component.",

  hero: {
    kicker: "Suggestions",
    title: "Add suggesting mode to any editor or custom component.",
    secondary:
      "Inline edits from humans or agents, accepted or rejected like a diff.",
    accent: "Stop letting humans or agents change user content without a consent step.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "editor", label: "Text editor", demoPreset: "suggestions/hero/editor" },
        { id: "custom", label: "Custom component", demoPreset: "suggestions/hero/custom" },
        { id: "agent", label: "Agent suggestion", demoPreset: "suggestions/hero/agent" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Suggesting mode running inside products at",
    migration: {
      label: "Migrating from an in-house build or another SDK?",
      links: keyed(
        [cta("Compare", "/vs/liveblocks"), cta("Migration guide", "https://docs.velt.dev/", true)],
      ),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "Both actors propose. The owner decides.",
    body: "Google Docs suggesting mode for your product. Humans or agents propose edits inline; the owner accepts or rejects each one like a diff. A suggestion is a comment of type suggestion, anchored to the exact content it proposes to change. With suggestion mode on, edits are never written to your data: the SDK captures the before and after value and stores a pending proposal. The accept and reject UI renders on the comment dialog, and on accept your code applies the change. The anchor model does not depend on the editor, so the same flow works inside supported editors and your own custom components.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/suggestions/overview", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "suggestions/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to suggesting mode.",
    support:
      "Wrap your app, set up Velt Comments so the review UI has a home, then tag any target and turn on suggestion mode. Accept and reject render on the comment dialog; your handler applies accepted changes.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Enable", title: "Turn on suggesting.", filename: "your-file.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "A suggestion is a comment of type suggestion, anchored to the exact content it proposes to change. With suggestion mode on, edits are not written to your data: the SDK snapshots the value when editing starts, diffs on commit, and stores the proposal as a pending suggestion. No-op edits create nothing. Accept and reject render on the comment dialog. Accept fires a frontend event with the old and new values and your handler applies the change; reject records an optional reason. The SDK never mutates your data, and because the anchor model does not depend on the editor, the same flow works inside supported editors and your own custom components.",
      microcopy: "// suggestionAccepted / suggestionRejected \u00b7 your handler applies the change",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "edit interception per input type (text, select, checkbox, contenteditable)",
        "before-and-after capture that reads intent, not keystrokes",
        "a proposal model with pending, accepted, rejected, stale, and failed states",
        "accept and reject UI in context",
        "reject reasons",
        "staleness and drift checks against live values",
        "idempotent apply across tabs and reconnects",
        "an event stream",
        "queries for pending-change indicators",
      ],
      close:
        "Teams that build it budget a quarter for one editor and start over for every other surface. The 3 steps above work on any element.",
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
          label: "Dependencies and events",
          chips: keyed(
            [
              { label: "Suggestions overview", href: "https://docs.velt.dev/async-collaboration/suggestions/overview", newTab: true },
              { label: "Velt Comments (required)", href: "https://docs.velt.dev/", newTab: true },
              { label: "SuggestionElement singleton", href: "https://docs.velt.dev/", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch suggesting mode this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Changes that ask first.",
    support: "Each card is the live SDK. Toggle to Code for the exact snippet that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Suggestion targets on any element",
          codeKicker: "// targets",
          headline:
            "Tag an input, cell, or field with one attribute and edits become proposed changes. Suggesting mode for the rate column and the qty field, not just the doc body.",
          preview: "suggestions/showcase/targets",
          code: '<div data-velt-suggestion-target="qty" />',
        },
        {
          num: "02",
          name: "Diff-style accept and reject",
          codeKicker: "// diff",
          headline:
            "The SDK captures the before and after value; the reviewer accepts or rejects from the comment dialog, with a reason on reject. Clause-level consent, on the record.",
          preview: "suggestions/showcase/diff",
          code: '// accept or reject on the comment dialog\n{ from: "12.0", to: "10.5" }',
        },
        {
          num: "03",
          name: "Agent-proposed changes",
          codeKicker: "// agents",
          headline:
            "An agent\u2019s fix lands as a pending suggestion on the exact field, accept and reject attached. The suggestion is the consent step: the agent proposes, the agent never writes.",
          preview: "suggestions/showcase/agents",
          code: 'commitSuggestion({\n  target: "qty", value: 10.5,\n});',
        },
        {
          num: "04",
          name: "Intent capture, not keystrokes",
          codeKicker: "// intent",
          headline:
            "The SDK snapshots the value when editing starts and diffs on commit; no-op edits create nothing. One reviewable proposal per edited field, not one per keystroke.",
          preview: "suggestions/showcase/intent",
          code: "// snapshot on start \u00b7 diff on commit\n// no-op edits create nothing",
        },
        {
          num: "05",
          name: "Apply logic in your code",
          codeKicker: "// apply",
          headline:
            "Accept fires an event with the old and new values; your handler writes the change to your state or backend. Velt never mutates your data, and neither does the agent.",
          preview: "suggestions/showcase/apply",
          code: "const accepted = useCommentEventCallback('suggestionAccepted');\napplyToBackend(accepted?.commentAnnotation?.suggestion?.newValue);",
        },
        {
          num: "06",
          name: "Multi-control targets",
          codeKicker: "// multi-control",
          headline:
            "Register a getter and one target spans several controls: the qty and price inputs on a row diff as one object. Propose the line item, not two disconnected edits.",
          preview: "suggestions/showcase/multi-control",
          code: 'registerTarget("row-3", { getValue });',
        },
        {
          num: "07",
          name: "Stale and drift detection",
          codeKicker: "// stale",
          headline:
            "If the target is gone at accept time the suggestion goes stale and does not apply; if the live value moved since capture, a drift flag is recorded, best-effort, not blocking.",
          preview: "suggestions/showcase/stale",
          code: "// status: stale \u00b7 does not apply\n// driftDetected: true \u00b7 best-effort",
        },
        {
          num: "08",
          name: "Suggestion queries for custom UI",
          codeKicker: "// queries",
          headline:
            "Query suggestions by target or status, reactively. A pending-change badge on the row, a count in the toolbar, a review panel that matches your design system.",
          preview: "suggestions/showcase/queries",
          code: 'useSuggestions({ status: "pending" });',
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/suggestions/overview", true),
      cta("View Examples", "/examples"),
    ]),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "Our agent proposes the fix and waits. Accept applies it through our code, reject logs the reason, and our users finally trust the AI because it asks first.",
      who: "Product lead \u00b7 AI-native SaaS",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support:
      "Shipped functionality only. The confirmed set leads; draft items render after engineering sign-off. This is the part of an in-house build that never ends.",
    visibleCount: 12,
    items: keyed(
      [
        { label: "One-attribute targets (data-velt-suggestion-target) with delegated listeners that track elements added to the DOM later" },
        { label: "Commit semantics per input type: text-like inputs commit on blur; select, checkbox, and radio commit on change" },
        { label: "No-op guard: focus and blur without a change never creates a suggestion; unchanged values are rejected" },
        { label: "Per-user suggestion mode toggle, global and not persisted across reloads" },
        { label: "Reactive mode state: useSuggestionModeState and isSuggestionModeEnabled$" },
        { label: "Auto-commit hook (onTargetEditCommit) with custom summary and metadata per suggestion" },
        { label: "Deferred commit via the targetEditCommit event with a pre-bound commitSuggestion builder" },
        { label: "Manual startSuggestion and commitSuggestion for non-DOM flows (canvas, custom widgets, an AI propose action)" },
        { label: "registerTarget and unregisterTarget with getters for complex multi-control values" },
        { label: "Typed Suggestion model stored as a CommentAnnotation with type suggestion" },
        { label: "Statuses: pending, accepted, rejected, stale, apply_failed" },
        { label: "Reject reasons on the reject event" },
        { label: "suggestionAccepted and suggestionRejected events on the comment element" },
        { label: "suggestionCreated, suggestionStale, targetEditStart, and targetEditCommit on the SuggestionElement" },
        { label: "Drift detection flag when the live value moved since capture, with stale taking precedence over drift" },
        { label: "Idempotent-apply contract; handler errors surfaced as apply_failed" },
        { label: "Reactive queries: getSuggestions (target and status filters), getPendingSuggestion, useSuggestions, usePendingSuggestion" },
        { label: "React hooks for the full surface; other frameworks via the SuggestionElement singleton" },
        { label: "Accept-time confirmation prompt on drift", soon: true },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your review surface, your rules.",
    support:
      "The accept and reject UI on the comment dialog for the fast path, wireframes and primitives to restyle it, and configuration, events, and queries underneath.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "The accept and reject UI renders on the Velt comment dialog, so comment dialog wireframes and primitives restyle the review surface. Build your own indicators \u2014 pending badges, review panels, toolbar counts \u2014 on the suggestion queries.",
          preview: "suggestions/make-it-yours/look",
          code: "<VeltCommentDialogWireframe>\n  // your accept / reject UI\n</VeltCommentDialogWireframe>",
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "Custom summary and metadata per suggestion, commit gating behind your own validation, custom apply logic on accept, reject reasons, and the full event stream.",
          preview: "suggestions/make-it-yours/behavior",
          code: "onTargetEditCommit(({ commitSuggestion }) => {\n  if (valid) commitSuggestion({ summary });\n});",
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We restyled the comment dialog to match our design system and drove our own pending badges off the suggestion queries. The review surface looks like our product, not a widget.",
      who: "Staff engineer \u00b7 collaborative editor",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "Suggesting mode, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "suggestions/in-production/sales",
          caption:
            "Brand proposes the copy edit on the live email and the owner accepts or rejects each one. The redline happens in the asset, not in a forwarded Word doc.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech & FP&A",
          demoPreset: "suggestions/in-production/fintech",
          caption:
            "An analyst proposes a new value for the Q3 cell, and it stays pending until the controller accepts. The number never changes without a name attached.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "suggestions/in-production/ops",
          caption:
            "The counterparty suggests a quantity change on the order line; your team accepts or rejects with a reason. Cross-org edits become proposals, not surprises in the record.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "compliance",
          label: "Compliance",
          demoPreset: "suggestions/in-production/compliance",
          caption:
            "An officer proposes new control language on the exact attestation line, and it stays pending until a second officer accepts. The filing never changes without a name attached.",
          link: cta("For compliance", "/for/compliance"),
        },
        {
          id: "legal",
          label: "Legal",
          demoPreset: "suggestions/in-production/legal",
          caption:
            "Counsel proposes the clause redline as a suggestion the counterparty accepts or rejects in place. The negotiation happens on the contract itself, not in a forwarded Word doc.",
          link: cta("For legal", "/for/legal"),
        },
        {
          id: "ai",
          label: "AI-native SaaS",
          demoPreset: "suggestions/in-production/ai",
          caption:
            "The agent proposes the fix on the exact field and waits. Accept applies it through your code; reject logs the reason. Users keep the AI on because it asks first.",
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
    heading: "Where a suggestion goes next.",
    support: "A suggestion is a comment, a finding becomes a proposal, and every decision lands in the trail.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Comments",
          body: "A suggestion is a comment of type suggestion; the dialog is where reviewers act.",
          visual: "suggestions/related/comments",
          link: cta("Explore Comments", "/comments"),
        },
        {
          iconKey: "shield",
          title: "Review agents",
          body: "Findings arrive with a proposed fix a human accepts.",
          visual: "suggestions/related/review-agents",
          link: cta("Explore Review agents", "/review-agents"),
        },
        {
          iconKey: "velt",
          title: "Audit trail",
          body: "Every accept and reject decision lands on the record.",
          visual: "suggestions/related/audit-trail",
          link: cta("Explore Audit trail", "/audit-trail"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Self-host data"],
    line: "Suggestions persist as comment annotations, so suggestion content can live on your infrastructure via the comments self-host data provider, with only minimal identifiers on Velt. Accept and reject decisions are recorded for the audit trail, and the same isolation guarantees cover the rest of the SDK.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "Changes that asked first.",
    support: "Nothing changed without a name attached.",
    cards: keyed(
      [
        {
          metric: "0 silent edits",
          quote:
            "Every change to a customer record is now a proposal someone accepts. Nothing moves without a name attached, and our auditors stopped asking how.",
          who: "Compliance lead, fintech platform",
        },
        {
          metric: "1 afternoon",
          quote:
            "We added suggesting mode to our custom invoice grid in an afternoon. The diff capture and the accept-reject UI were already built.",
          who: "Staff Engineer, billing platform",
        },
        {
          metric: "0 write access",
          quote:
            "We shipped agent fixes without ever granting the agent write access. It proposes on the exact field, a human accepts, and our users keep the AI on because it asks first.",
          who: "Product lead, AI-native SaaS",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about suggesting mode.",
    items: keyed(
      [
        {
          question: "Which editors does suggesting mode support?",
          answer:
            "Anything that renders on the web. Suggestion targets are DOM elements, so inputs, selects, table cells, contenteditable surfaces, and your own custom components work through the same attribute and anchor API; editor libraries connect through their setups.",
        },
        {
          question: "How do I add suggesting mode to a React app?",
          answer:
            "Install @veltdev/react, set up Velt Comments (the accept and reject buttons render on the comment dialog), tag elements with data-velt-suggestion-target, and call enableSuggestionMode. Handle the suggestionAccepted event to apply accepted values to your state or backend.",
        },
        {
          question: "Can AI agents propose changes through suggestions?",
          answer:
            "Yes. An agent's proposed value is committed as a pending suggestion on the exact target, and a human accepts or rejects it before anything is applied. The agent never holds write access to your data.",
        },
        {
          question: "What happens when a suggestion is accepted?",
          answer:
            "Velt records the outcome and fires suggestionAccepted with the old and new values; your handler applies the change to your state or backend. The SDK never mutates your data. Rejections fire suggestionRejected with an optional reason, and nothing is applied.",
        },
        {
          question: "What if the content changed before a reviewer accepts?",
          answer:
            "If the target no longer resolves at accept time, the suggestion goes stale instead of applying. If the live value moved since the proposal was captured, a drift flag is recorded (best-effort, requires a registered getter); in v1 the accept still applies, with a confirmation prompt planned. A stale target never applies.",
        },
        {
          question: "Do suggestions require Velt Comments?",
          answer:
            "Yes. A suggestion is stored as a comment annotation of type suggestion, and the accept and reject UI renders on the comment dialog, so Comments must be set up first. See /comments.",
        },
        {
          question: "Can I build my own suggestion UI?",
          answer:
            "Yes. Restyle the comment dialog with wireframes and primitives, and query suggestions by target or status to drive your own badges, counts, and review panels.",
        },
        {
          question: "What does it cost to add suggesting mode?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production. Suggestions is part of the SDK, not a separately priced add-on.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add suggesting mode to any editor or custom component.",
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
