#!/usr/bin/env node
/**
 * Seed the featurePageV2-audit-trail document in Sanity. This reproduces the
 * static /audit-trail page as CMS data so it renders at /new-features/audit-trail
 * via app/new-features/[slug]/page.tsx. It is the reference document for the
 * v10 feature-page template.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-audit-trail.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-v2-audit-trail.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-audit-trail.mjs
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
const STEP_MOUNT = `// enable Activity Logs in the Velt Console first
// document scope set via useSetDocumentId('filing-q3')
<VeltActivityLog />`;

const doc = {
  _id: "featurePageV2-audit-trail",
  _type: "featurePageV2",
  title: "Audit Trail",
  slug: { _type: "slug", current: "audit-trail" },
  beta: false,
  breadcrumbLabel: "Audit Trail",
  metaTitle: "Audit Trail | An immutable record of every action | Velt",
  metaDescription:
    "An immutable, exportable record of every comment, edit, approval, and rejection in your product. Audit-ready by default.",

  hero: {
    kicker: "Audit trail",
    title: "Add an audit trail for every action.",
    secondary:
      "An immutable, exportable record of every action in your product: comments, edits, approvals, rejections.",
    accent: "Stop losing regulated deals because your product can\u2019t prove who approved what.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "timeline", label: "Timeline", demoPreset: "audit-trail/hero/timeline" },
        { id: "export", label: "Export", demoPreset: "audit-trail/hero/export" },
        { id: "history", label: "Workflow history", demoPreset: "audit-trail/hero/history" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Evidence layers running inside products at",
    migration: {
      label: "Migrating from an in-house build or another SDK?",
      links: keyed(
        [cta("Compare", "/compare/audit-trail"), cta("Migration guide", "https://docs.velt.dev/audit-trail/migrate", true)],
      ),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "One chain of custody. Both actors.",
    body: "An immutable, exportable record of every action in your product\u2019s review layer: every comment, edit, suggestion, approval, and rejection, with who, what, and when. Velt records activity automatically across all features; nothing to instrument. Records are queryable by document, user, workflow, or time range, and exportable for auditors and security reviews. Approval records capture the full chain: who was asked, who responded, what they decided, and what changed as a result.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/activity/overview", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "audit-trail/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to the first record.",
    support:
      "Enable Activity Logs to capture activity automatically across every feature. Records stream to your UI live, answer REST queries, and push review events to your backend through webhooks.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Mount", title: "Add the timeline.", filename: "audit-page.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "Once enabled, Velt records activity across features automatically: comments, reactions, recordings, CRDT edits, and approval state changes. Every approval state change appends a statusHistory entry: who changed it, when, and the note they left, written synchronously with the status change. Each record carries judgment fields: reasoning, confidence, judge type (human or agent), authority, prior judgments, and content context. Enrichment runs async, so logging adds no latency.",
      microcopy: "// getAllActivities streams records live \u00b7 console toggle per docs",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "capture hooks inside every feature",
        "an append-only store",
        "attribution and timestamps on every write",
        "status-transition triggers",
        "query indexes by document, user, time range",
        "an export pipeline",
        "retention and GDPR deletion",
        "tamper evidence",
        "a feed UI with filters",
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
          label: "APIs and pipes",
          chips: keyed(
            [
              { label: "Activity Logs REST API v2", href: "https://docs.velt.dev/async-collaboration/activity/rest-api", newTab: true },
              { label: "Basic Webhooks", href: "https://docs.velt.dev/api-reference/webhooks", newTab: true },
              { label: "Advanced Webhooks", href: "https://docs.velt.dev/api-reference/webhooks/advanced", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "Deployment",
          chips: keyed(
            [
              { label: "Activity data provider", href: "https://docs.velt.dev/async-collaboration/activity/self-hosting", newTab: true },
              { label: "Velt Console config", href: "https://console.velt.dev/", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch your audit trail this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Who approved what, on the record.",
    support: "Each card is the live SDK. Toggle to Code for the exact snippet that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Automatic capture across every feature",
          codeKicker: "// capture",
          headline:
            "Comments, reactions, recordings, CRDT edits, and approval changes create records the moment they happen. Nothing to instrument.",
          preview: "audit-trail/showcase/capture",
          code: "// nothing to instrument \u2014 capture is automatic\n<VeltActivityLog />",
        },
        {
          num: "02",
          name: "Who, when, and why on every status change",
          codeKicker: "// attribution",
          headline: "\u201CWho approved this filing?\u201D becomes a lookup, not an investigation.",
          preview: "audit-trail/showcase/attribution",
          code: '{ "status": "approved", "changedBy": "sarah",\n  "note": "Cleared with legal" }',
        },
        {
          num: "03",
          name: "Judgment fields on every record",
          codeKicker: "// judgment",
          headline:
            "Reasoning, confidence, judge type, and the authority that required the review. Evidence with context.",
          preview: "audit-trail/showcase/judgment",
          code: '{ "judgeType": "agent", "confidence": 0.88,\n  "authority": "brand-policy-v4" }',
        },
        {
          num: "04",
          name: "Agent actions in the same record",
          codeKicker: "// agents",
          headline:
            "Agent findings land in the same trail as human decisions, marked judge type agent. One chain of custody.",
          preview: "audit-trail/showcase/agents",
          code: "POST /v2/activities/get\n{ \"data\": { \"documentId\": \"filing-q3\" } }",
        },
        {
          num: "05",
          name: "Recording on by default",
          codeKicker: "// recording",
          headline:
            "The pipeline records silently from day one; the feed UI stays opt-in. The questionnaire arrives years after the actions.",
          preview: "audit-trail/showcase/recording",
          code: "// recording pipeline is on from day one\n// the feed UI stays opt-in",
        },
        {
          num: "06",
          name: "Query API for documents, users, and time ranges",
          codeKicker: "// query",
          headline: "The auditor\u2019s sample request is a query, not a week of log archaeology.",
          preview: "audit-trail/showcase/query",
          code: "const records = useAllActivities({\n  documentId, feature: \"approvals\",\n});",
        },
        {
          num: "07",
          name: "Decision chains",
          codeKicker: "// decisions",
          headline:
            "The comment, the revision, the approval, in order. The full story behind a sign-off reads as one chain.",
          preview: "audit-trail/showcase/decisions",
          code: '{ "priorJudgments": ["rec_112", "rec_118"] }',
        },
        {
          num: "08",
          name: "Immutable records",
          codeKicker: "// immutable",
          headline: "On by default for new accounts: changes create new linked records. Evidence stays evidence.",
          preview: "audit-trail/showcase/immutable",
          code: "// immutability is on by default for new accounts\n// edits append a new linked record; deletes preserve",
        },
        {
          num: "09",
          name: "Exports for auditors",
          codeKicker: "// exports",
          headline:
            "Any record set is available as structured JSON through the API today; PDF and CSV packages assemble the same chain.",
          preview: "audit-trail/showcase/exports",
          code: 'velt.activities.get({ document: "filing-q3", format: "json" });',
        },
        {
          num: "10",
          name: "Custom events through the same API",
          codeKicker: "// custom events",
          headline:
            "Deploys, exports, and permission changes sit in the same timeline your reviewers already generate.",
          preview: "audit-trail/showcase/custom-events",
          code: 'velt.createActivity({\n  type: "deploy", judgeType: "human",\n  reasoning: "release v2.14",\n});',
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/activity/overview", true),
      cta("View Examples", "/examples"),
    ]),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "The auditor asked for the approval chain on a sample of filings. We ran one query and sent the records \u2014 who was asked, who decided, and the note they left.",
      who: "Compliance lead \u00b7 FP&A platform",
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
        { label: "VeltActivityLog: prebuilt, filterable, grouped by calendar date" },
        { label: "Dark mode prop" },
        { label: "Wireframes and standalone primitives for custom audit UIs" },
        { label: "useAllActivities live subscription with filters" },
        { label: "createActivity for custom events, judgment fields validated on write" },
        { label: "Activity Logs REST API v2: get, add, update, delete" },
        { label: "Webhooks on review events" },
        { label: "Self-host activity data provider" },
        { label: "GDPR data export and deletion APIs" },
        { label: "Supported-regions data residency" },
        { label: "statusHistory on every annotation: who, when, note" },
        { label: "approval.transition records with authority context" },
        { label: "Six judgment fields: reasoning, confidence, judgeType, authority, priorJudgments, contentContext" },
        { label: "Content capture tiers: metadata, summary, full content" },
        { label: "Immutability on by default for new accounts" },
        { label: "Sub-second record creation, async enrichment, zero added latency" },
        { label: "Historical backfill, flagged source backfill" },
        { label: "Per-document SHA-256 hash chains", soon: true },
        { label: "Regulatory packages: SOC 2, HIPAA, EU AI Act", soon: true },
        { label: "Evidence Center dashboard", soon: true },
        { label: "CSV and audit report PDF exports", soon: true },
        { label: "CloudEvents streaming to BI tools", soon: true },
        { label: "AI transparency report", soon: true },
        { label: "Scheduled reports", soon: true },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your timeline, your privacy posture.",
    support:
      "VeltActivityLog for the fast path, wireframes and primitives for custom audit UIs, content capture tiers, and a full REST surface underneath.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "VeltActivityLog for the fast path; wireframes and primitives for fully custom audit timelines; template variables and dark mode.",
          preview: "audit-trail/make-it-yours/look",
          code: "<VeltActivityLogWireframe>\n  // your markup, Velt records\n</VeltActivityLogWireframe>",
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "Custom events via createActivity, content capture tiers per your privacy posture, webhooks into your compliance pipeline, self-host activity provider.",
          preview: "audit-trail/make-it-yours/behavior",
          code: 'velt.setContentCapture("summary");\nvelt.webhooks.subscribe({ events: ["activity.*"] });',
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We shipped a defensible trail in an afternoon. The hard part \u2014 immutability and attribution \u2014 was already done.",
      who: "Staff engineer \u00b7 sales enablement platform",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "The trail, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "audit-trail/in-production/sales",
          caption:
            "Brand and legal sign-off on every asset, recorded with the note attached. The regulated client\u2019s question is one query.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech",
          demoPreset: "audit-trail/in-production/fintech",
          caption:
            "Every transition timestamped and attributed. The examiner\u2019s sample request returns the complete chain.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "audit-trail/in-production/operations",
          caption:
            "Sign-offs on orders, shipments, and field records carry who decided and why. The record settles disputes.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "ai",
          label: "AI-native",
          demoPreset: "audit-trail/in-production/ai",
          caption:
            "Agent findings and human approvals land in one trail, with judge type marking each. AI oversight, queryable.",
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
    heading: "Everything lands in the trail.",
    support: "Approvals, agent findings, and self-hosted storage all write to the same chain.",
    cards: keyed(
      [
        {
          iconKey: "shield",
          title: "Approval flows",
          body: "Every transition lands in the trail with authority attached.",
          visual: "audit-trail/related/approval-flows",
          link: cta("Explore Approval flows", "/approval-flows"),
        },
        {
          iconKey: "velt",
          title: "Review agents",
          body: "Findings are recorded decisions, judge type agent.",
          visual: "audit-trail/related/review-agents",
          link: cta("Explore Review agents", "/review-agents"),
        },
        {
          iconKey: "shield",
          title: "Self-hosting",
          body: "The activity data provider keeps log content on your infrastructure.",
          visual: "audit-trail/related/self-hosting",
          link: cta("Explore Self-hosting", "/self-hosting"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Audit-ready"],
    line: "Log content, entity snapshots, and custom fields can live on your infrastructure via the activity data provider, with only minimal identifiers on Velt. GDPR deletion runs through the compliance API with its own audit log. EU AI Act Article 14 (high-risk systems under Annex III, enforceable August 2, 2026): for products in that scope, this trail is the evidence layer \u2014 approval before action, recorded.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "The regulated deal, unblocked.",
    support: "\u201CWho approved this?\u201D stopped stalling our deals.",
    cards: keyed(
      [
        {
          metric: "1 query",
          quote:
            "The examiner asked for the approval chain on a sample of filings. We ran a query and sent the records: who was asked, who decided, and the note they left.",
          who: "Compliance lead, FP&A platform",
        },
        {
          metric: "5 min",
          quote:
            "Mounting the activity log took an afternoon. The hard part \u2014 immutability and attribution \u2014 was already done.",
          who: "Staff Engineer, sales platform",
        },
        {
          metric: "100%",
          quote: "Every agent action is attributed alongside our humans. Our auditors finally trust the record.",
          who: "VP Engineering, AI-native SaaS",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about the audit trail.",
    items: keyed(
      [
        {
          question: "How do I add an audit trail to a React app?",
          answer:
            "Install @veltdev/react, wrap your app in VeltProvider with your API key, enable Activity Logs in the Velt Console, and add the VeltActivityLog component for a prebuilt, filterable timeline. The setup guide walks through it.",
        },
        {
          question: "What actions get recorded?",
          answer:
            "Comments, replies, reactions, recordings, multiplayer edits, and every approval state change, recorded automatically. Your own product events join the same trail through the createActivity API, with judgment fields validated on write.",
        },
        {
          question: "Can I export the audit trail for an auditor or a security review?",
          answer:
            "Yes. Pull any record set through the Get Activity Logs REST API as structured JSON, filtered by document, user, feature type, or time range. Audit report PDFs and CSV packages are coming to the same chain.",
        },
        {
          question: "Can this serve as evidence for EU AI Act Article 14 human oversight?",
          answer:
            "Article 14 applies to high-risk AI systems defined in Annex III (credit, insurance, hiring, critical infrastructure, and essential services among them), enforceable from August 2, 2026; it is not a universal obligation on every AI feature. If your product or your customers operate in that scope, Velt provides the mechanism (approval before action) and the evidence (a record of who approved what, when, and why). Talk to your counsel about whether you are in scope; see /governance.",
        },
        {
          question: "Can records be edited or deleted after the fact?",
          answer:
            "Immutability is on by default for new accounts: edits create new records linked to the original, and deleting source content leaves the record standing. GDPR deletion runs through a dedicated compliance API and is itself logged.",
        },
        {
          question: "How do I tell agent actions from human actions?",
          answer:
            "Every record carries a judge type of human or agent. An agent\u2019s finding, its confidence score, and its reasoning sit in the same trail as the human decision that accepted or rejected it, so the oversight chain is explicit.",
        },
        {
          question: "Does logging slow down my product?",
          answer:
            "No. The status record is written synchronously with the status change itself; everything else enriches asynchronously after the user-facing write completes. Records exist within a second, and user actions gain no latency.",
        },
        {
          question: "Can audit data stay on our infrastructure?",
          answer:
            "Yes. The self-host activity data provider keeps log content, entity snapshots, and custom fields on your infrastructure while Velt stores only minimal identifiers. See /self-hosting.",
        },
        {
          question: "What does an audit trail cost?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production. The audit trail is part of the SDK, not a separately priced add-on.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add an audit trail for every action.",
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
