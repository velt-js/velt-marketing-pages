import Link from "next/link";

import type { FeaturePageContent } from "../content";
import { resolveDemo, resolveIcon } from "../demo-registry";

// Static content for the Audit Trail feature page. Copy mirrors the approved
// reference page (Audit Trail Page.html). The demo visuals are resolved from
// the shared demo registry (../demo-registry) by preset key, the same source
// the Sanity content mapper uses — so the CMS-driven page at
// /new-features/audit-trail renders identically to this static reference.

const STEP_INSTALL = `npm install @veltdev/react`;

const STEP_PROVIDER = `<VeltProvider
  apiKey={VELT_API_KEY}>
  <YourApp />
</VeltProvider>`;

const STEP_MOUNT = `// enable Activity Logs in the Velt Console first
<VeltActivityLog
  documentId="filing-q3"
/>`;

const SC01_CODE = `// nothing to instrument — capture is automatic
<VeltActivityLog />`;

const SC02_CODE = `{ "status": "approved", "changedBy": "sarah",
  "note": "Cleared with legal" }`;

const SC03_CODE = `{ "judgeType": "agent", "confidence": 0.88,
  "authority": "brand-policy-v4" }`;

const SC04_CODE = `GET /v2/activities?judgeType=agent`;

const SC05_CODE = `// recording pipeline is on from day one
// the feed UI stays opt-in`;

const SC06_CODE = `const records = useAllActivities({
  documentId, feature: "approvals",
});`;

const SC07_CODE = `{ "priorJudgments": ["rec_112", "rec_118"] }`;

const SC08_CODE = `// immutability is on by default for new accounts
// edits append a new linked record; deletes preserve`;

const SC09_CODE = `velt.activities.get({ document: "filing-q3", format: "json" });`;

const SC10_CODE = `velt.createActivity({
  type: "deploy", judgeType: "human",
  reasoning: "release v2.14",
});`;

const LOOK_CODE = `<VeltActivityLogWireframe>
  // your markup, Velt records
</VeltActivityLogWireframe>`;

const BEHAVIOR_CODE = `velt.setContentCapture("summary");
velt.webhooks.subscribe({ events: ["activity.*"] });`;

/**
 * Fully populated Audit Trail page content. Imported by the static
 * /audit-trail route and used as the Phase 2 seed reference.
 */
export const auditTrailContent: FeaturePageContent = {
  slug: "audit-trail",

  hero: {
    kicker: "Audit trail",
    title: "Add an audit trail for every action.",
    secondary:
      "An immutable, exportable record of every action in your product: comments, edits, approvals, rejections.",
    accent: "Stop losing regulated deals because your product can’t prove who approved what.",
    primaryCta: { label: "Get Free API Key", href: "https://console.velt.dev/", newTab: true },
    secondaryCta: { label: "Book Demo", href: "/book-demo" },
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    buildChip: { label: "Build this", href: "#how-it-works" },
    demoTabs: [
      { id: "timeline", label: "Timeline", content: resolveDemo("audit-trail/hero/timeline") },
      { id: "export", label: "Export", content: resolveDemo("audit-trail/hero/export") },
      { id: "history", label: "Workflow history", content: resolveDemo("audit-trail/hero/history") },
    ],
  },

  logoStrip: {
    label: "Evidence layers running inside products at",
    migration: {
      label: "Migrating from an in-house build or another SDK?",
      links: [
        { label: "Compare", href: "/compare/audit-trail" },
        { label: "Migration guide", href: "https://docs.velt.dev/audit-trail/migrate", newTab: true },
      ],
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "One chain of custody. Both actors.",
    body: "An immutable, exportable record of every action in your product’s review layer: every comment, edit, suggestion, approval, and rejection, with who, what, and when. Velt records activity automatically across all features; nothing to instrument. Records are queryable by document, user, workflow, or time range, and exportable for auditors and security reviews. Approval records capture the full chain: who was asked, who responded, what they decided, and what changed as a result.",
    docLinks: [
      { label: "View Docs", href: "https://docs.velt.dev/async-collaboration/activity/overview", newTab: true },
      { label: "View Examples", href: "/examples" },
    ],
    scene: resolveDemo("audit-trail/what-it-is/scene"),
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to the first record.",
    support:
      "Enable Activity Logs and capture runs automatically across every feature. Records stream to your UI live, answer REST queries, and push review events to your backend through webhooks.",
    steps: [
      {
        kicker: "Step 01 · Install",
        title: "Add the SDK.",
        filename: "terminal",
        code: STEP_INSTALL,
        copyText: STEP_INSTALL,
      },
      {
        kicker: "Step 02 · Wrap",
        title: "Provide your app.",
        filename: "_app.tsx",
        code: STEP_PROVIDER,
        copyText: STEP_PROVIDER,
      },
      {
        kicker: "Step 03 · Mount",
        title: "Add the timeline.",
        filename: "audit-page.tsx",
        code: STEP_MOUNT,
        copyText: STEP_MOUNT,
      },
    ],
    mechanics: {
      heading: "The mechanics",
      body: (
        <>
          Once enabled, Velt records activity across features automatically: comments, reactions, recordings, CRDT edits, and approval state changes. Every approval state change appends a{" "}
          <span className="chip-soon">statusHistory</span> entry: who changed it, when, and the note they left, written synchronously with the status change. Each record carries{" "}
          <span className="chip-soon">judgment</span> fields: reasoning, confidence, judge type (human or agent), authority, prior judgments, and content context. Enrichment runs async, so logging adds no latency.
        </>
      ),
      microcopy: "// getAllActivities streams records live · console toggle per docs",
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
      tabs: [
        { id: "cursor", label: "Cursor", command: "npx @veltdev/mcp add --client cursor" },
        { id: "claude", label: "Claude Code", command: "claude mcp add velt -- npx @veltdev/mcp" },
        { id: "windsurf", label: "Windsurf", command: "npx @veltdev/mcp add --client windsurf" },
        { id: "copilot", label: "Copilot", command: "npx @veltdev/mcp add --client vscode" },
        { id: "zed", label: "Zed", command: "npx @veltdev/mcp add --client zed" },
      ],
    },
    integrations: [
      {
        label: "SDK frameworks",
        chips: [
          { label: "React", href: "https://docs.velt.dev/quickstart/react", newTab: true, icon: "/images/home/nav-icons/react.svg" },
          { label: "Next.js", href: "https://docs.velt.dev/quickstart/nextjs", newTab: true, icon: "/images/home/nav-icons/nextdotjs.svg" },
          { label: "Angular", href: "https://docs.velt.dev/quickstart/angular", newTab: true, icon: "/images/home/nav-icons/angular.svg" },
          { label: "Vue", href: "https://docs.velt.dev/quickstart/vue", newTab: true, icon: "/images/home/nav-icons/vuedotjs.svg" },
          { label: "HTML", href: "https://docs.velt.dev/quickstart/html", newTab: true },
        ],
      },
      {
        label: "APIs and pipes",
        chips: [
          { label: "Activity Logs REST API v2", href: "https://docs.velt.dev/async-collaboration/activity/rest-api", newTab: true },
          { label: "Basic Webhooks", href: "https://docs.velt.dev/api-reference/webhooks", newTab: true },
          { label: "Advanced Webhooks", href: "https://docs.velt.dev/api-reference/webhooks/advanced", newTab: true },
        ],
      },
      {
        label: "Deployment",
        chips: [
          { label: "Activity data provider", href: "https://docs.velt.dev/async-collaboration/activity/self-hosting", newTab: true },
          { label: "Velt Console config", href: "https://console.velt.dev/", newTab: true },
        ],
      },
    ],
    ctaBanner: {
      title: "Launch your audit trail this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: { label: "Get Free API Key", href: "https://console.velt.dev/", newTab: true },
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Who approved what, on the record.",
    support: "Each card is the live SDK. Toggle to Code for the exact snippet that renders it.",
    cards: [
      {
        num: "01",
        name: "Automatic capture across every feature",
        codeKicker: "// capture",
        headline:
          "Comments, reactions, recordings, CRDT edits, and approval changes create records the moment they happen. Nothing to instrument.",
        preview: resolveDemo("audit-trail/showcase/capture"),
        code: SC01_CODE,
        copyText: SC01_CODE,
      },
      {
        num: "02",
        name: "Who, when, and why on every status change",
        codeKicker: "// attribution",
        headline: "“Who approved this filing?” becomes a lookup, not an investigation.",
        preview: resolveDemo("audit-trail/showcase/attribution"),
        code: SC02_CODE,
        copyText: SC02_CODE,
      },
      {
        num: "03",
        name: "Judgment fields on every record",
        codeKicker: "// judgment",
        headline:
          "Reasoning, confidence, judge type, and the authority that required the review. Evidence with context.",
        preview: resolveDemo("audit-trail/showcase/judgment"),
        code: SC03_CODE,
        copyText: SC03_CODE,
      },
      {
        num: "04",
        name: "Agent actions in the same record",
        codeKicker: "// agents",
        headline:
          "Agent findings land in the same trail as human decisions, marked judge type agent. One chain of custody.",
        preview: resolveDemo("audit-trail/showcase/agents"),
        code: SC04_CODE,
        copyText: SC04_CODE,
      },
      {
        num: "05",
        name: "Recording on by default",
        codeKicker: "// recording",
        headline:
          "The pipeline records silently from day one; the feed UI stays opt-in. The questionnaire arrives years after the actions.",
        preview: resolveDemo("audit-trail/showcase/recording"),
        code: SC05_CODE,
        copyText: SC05_CODE,
      },
      {
        num: "06",
        name: "Query API for documents, users, and time ranges",
        codeKicker: "// query",
        headline: "The auditor’s sample request is a query, not a week of log archaeology.",
        preview: resolveDemo("audit-trail/showcase/query"),
        code: SC06_CODE,
        copyText: SC06_CODE,
      },
      {
        num: "07",
        name: "Decision chains",
        codeKicker: "// decisions",
        headline:
          "The comment, the revision, the approval, in order. The full story behind a sign-off reads as one chain.",
        preview: resolveDemo("audit-trail/showcase/decisions"),
        code: SC07_CODE,
        copyText: SC07_CODE,
      },
      {
        num: "08",
        name: "Immutable records",
        codeKicker: "// immutable",
        headline: "On by default for new accounts: changes create new linked records. Evidence stays evidence.",
        preview: resolveDemo("audit-trail/showcase/immutable"),
        code: SC08_CODE,
        copyText: SC08_CODE,
      },
      {
        num: "09",
        name: "Exports for auditors",
        codeKicker: "// exports",
        headline:
          "Any record set as structured JSON through the API today; PDF and CSV packages assemble the same chain.",
        preview: resolveDemo("audit-trail/showcase/exports"),
        code: SC09_CODE,
        copyText: SC09_CODE,
      },
      {
        num: "10",
        name: "Custom events through the same API",
        codeKicker: "// custom events",
        headline:
          "Deploys, exports, and permission changes sit in the same timeline your reviewers already generate.",
        preview: resolveDemo("audit-trail/showcase/custom-events"),
        code: SC10_CODE,
        copyText: SC10_CODE,
      },
    ],
    docLinks: [
      { label: "View Docs", href: "https://docs.velt.dev/async-collaboration/activity/overview", newTab: true },
      { label: "View Examples", href: "/examples" },
    ],
    interstitial: {
      quote: "The auditor asked for the approval chain on a sample of filings. We ran one query and sent the records — who was asked, who decided, and the note they left.",
      who: "Compliance lead · FP&A platform",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support:
      "Shipped functionality only. The confirmed set leads; draft items render after engineering sign-off. This is the part of an in-house build that never ends.",
    visibleCount: 12,
    items: [
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
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your timeline, your privacy posture.",
    support:
      "VeltActivityLog for the fast path, wireframes and primitives for custom audit UIs, content capture tiers, and a full REST surface underneath.",
    cards: [
      {
        icon: resolveIcon("velt"),
        title: "Look",
        body: "VeltActivityLog for the fast path; wireframes and primitives for fully custom audit timelines; template variables and dark mode.",
        preview: resolveDemo("audit-trail/make-it-yours/look"),
        code: LOOK_CODE,
        copyText: LOOK_CODE,
      },
      {
        icon: resolveIcon("shield"),
        title: "Behavior",
        body: "Custom events via createActivity, content capture tiers per your privacy posture, webhooks into your compliance pipeline, self-host activity provider.",
        preview: resolveDemo("audit-trail/make-it-yours/behavior"),
        code: BEHAVIOR_CODE,
        copyText: BEHAVIOR_CODE,
      },
    ],
    interstitial: {
      quote: "We shipped a defensible trail in an afternoon. The hard part — immutability and attribution — was already done.",
      who: "Staff engineer · sales enablement platform",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "The trail, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: [
      {
        id: "sales",
        label: "Sales enablement",
        visual: resolveDemo("audit-trail/in-production/sales"),
        caption:
          "Brand and legal sign-off on every asset, recorded with the note attached. The regulated client’s question is one query.",
        link: { label: "For sales enablement", href: "/for/sales-enablement" },
      },
      {
        id: "fintech",
        label: "Fintech",
        visual: resolveDemo("audit-trail/in-production/fintech"),
        caption:
          "Every transition timestamped and attributed. The examiner’s sample request returns the complete chain.",
        link: { label: "For fintech and FP&A", href: "/for/fintech" },
      },
      {
        id: "ops",
        label: "Operations",
        visual: resolveDemo("audit-trail/in-production/operations"),
        caption:
          "Sign-offs on orders, shipments, and field records carry who decided and why. The record settles disputes.",
        link: { label: "For operations", href: "/for/operations" },
      },
      {
        id: "ai",
        label: "AI-native",
        visual: resolveDemo("audit-trail/in-production/ai"),
        caption:
          "Agent findings and human approvals land in one trail, with judge type marking each. AI oversight, queryable.",
        link: { label: "For AI-native SaaS", href: "/for/ai-native-saas" },
      },
    ],
    whereItFits: {
      label: "Where it fits:",
      links: [
        { label: "Sales enablement", href: "/for/sales-enablement" },
        { label: "Fintech and FP&A", href: "/for/fintech" },
        { label: "Operations", href: "/for/operations" },
        { label: "AI-native SaaS", href: "/for/ai-native-saas" },
      ],
    },
    ctaBanner: {
      title: "See it running in products like yours.",
      microcopy: "30 minutes, with an engineer, not a sales deck.",
      cta: { label: "Book Demo", href: "/book-demo" },
    },
  },

  related: {
    kicker: "Related primitives",
    heading: "Everything lands in the trail.",
    support: "Approvals, agent findings, and self-hosted storage all write to the same chain.",
    cards: [
      {
        icon: resolveIcon("shield"),
        title: "Approval flows",
        body: "Every transition lands in the trail with authority attached.",
        visual: resolveDemo("audit-trail/related/approval-flows"),
        link: { label: "Explore Approval flows", href: "/approval-flows" },
      },
      {
        icon: resolveIcon("velt"),
        title: "Review agents",
        body: "Findings are recorded decisions, judge type agent.",
        visual: resolveDemo("audit-trail/related/review-agents"),
        link: { label: "Explore Review agents", href: "/review-agents" },
      },
      {
        icon: resolveIcon("shield"),
        title: "Self-hosting",
        body: "The activity data provider keeps log content on your infrastructure.",
        visual: resolveDemo("audit-trail/related/self-hosting"),
        link: { label: "Explore Self-hosting", href: "/self-hosting" },
      },
    ],
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Audit-ready"],
    line: (
      <>
        Log content, entity snapshots, and custom fields can live on your infrastructure via the activity data provider, with only minimal identifiers on Velt. GDPR deletion runs through the compliance API with its own audit log. EU AI Act Article 14 (high-risk systems under Annex III, enforceable August 2, 2026): for products in that scope, this trail is the evidence layer — approval before action, recorded. See{" "}
        <Link href="/self-hosting">self-hosting</Link> and <Link href="/governance">governance</Link>.
      </>
    ),
    cta: { label: "Book Demo", href: "/book-demo" },
  },

  testimonials: {
    kicker: "Proof",
    heading: "The regulated deal, unblocked.",
    support: "“Who approved this?” stopped stalling our deals.",
    cards: [
      {
        metric: "1 query",
        quote:
          "The examiner asked for the approval chain on a sample of filings. We ran a query and sent the records: who was asked, who decided, and the note they left.",
        who: "Compliance lead, FP&A platform",
      },
      {
        metric: "5 min",
        quote: "Mounting the activity log took an afternoon. The hard part — immutability and attribution — was already done.",
        who: "Staff Engineer, sales platform",
      },
      {
        metric: "100%",
        quote: "Every agent action is attributed alongside our humans. Our auditors finally trust the record.",
        who: "VP Engineering, AI-native SaaS",
      },
    ],
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about the audit trail.",
    items: [
      {
        q: "How do I add an audit trail to a React app?",
        a: "Install @veltdev/react, wrap your app in VeltProvider with your API key, enable Activity Logs in the Velt Console, and add the VeltActivityLog component for a prebuilt, filterable timeline. The setup guide walks through it.",
      },
      {
        q: "What actions get recorded?",
        a: "Comments, replies, reactions, recordings, multiplayer edits, and every approval state change, recorded automatically. Your own product events join the same trail through the createActivity API, with judgment fields validated on write.",
      },
      {
        q: "Can I export the audit trail for an auditor or a security review?",
        a: "Yes. Pull any record set through the Get Activity Logs REST API as structured JSON, filtered by document, user, feature type, or time range. Audit report PDFs and CSV packages are coming to the same chain.",
      },
      {
        q: "Can this serve as evidence for EU AI Act Article 14 human oversight?",
        a: "Article 14 applies to high-risk AI systems defined in Annex III (credit, insurance, hiring, critical infrastructure, and essential services among them), enforceable from August 2, 2026; it is not a universal obligation on every AI feature. If your product or your customers operate in that scope, Velt provides the mechanism (approval before action) and the evidence (a record of who approved what, when, and why). Talk to your counsel about whether you are in scope.",
      },
      {
        q: "Can records be edited or deleted after the fact?",
        a: "Immutability is on by default for new accounts: edits create new records linked to the original, and deleting source content leaves the record standing. GDPR deletion runs through a dedicated compliance API and is itself logged.",
      },
      {
        q: "How do I tell agent actions from human actions?",
        a: "Every record carries a judge type of human or agent. An agent’s finding, its confidence score, and its reasoning sit in the same trail as the human decision that accepted or rejected it, so the oversight chain is explicit.",
      },
      {
        q: "Does logging slow down my product?",
        a: "No. The status record is written synchronously with the status change itself; everything else enriches asynchronously after the user-facing write completes. Records exist within a second, and user actions gain no latency.",
      },
      {
        q: "Can audit data stay on our infrastructure?",
        a: "Yes. The self-host activity data provider keeps log content, entity snapshots, and custom fields on your infrastructure while Velt stores only minimal identifiers. See the self-hosting page.",
      },
      {
        q: "What does an audit trail cost?",
        a: "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production. The audit trail is part of the SDK, not a separately priced add-on.",
      },
    ],
  },

  finalCta: {
    title: "Add an audit trail for every action.",
    primaryCta: { label: "Get Free API Key", href: "https://console.velt.dev/", newTab: true },
    secondaryCta: { label: "Book Demo", href: "/book-demo" },
    microcopies: ["Free tier. No credit card. First comment in 5 minutes.", "30 minutes, with an engineer, not a sales deck."],
  },
};
