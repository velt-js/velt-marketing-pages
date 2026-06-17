#!/usr/bin/env node
/**
 * Seed the featurePageV2-approval-flows document in Sanity so it renders at
 * /new-features/approval-flows via app/new-features/[slug]/page.tsx.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-approval-flows.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-v2-approval-flows.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-approval-flows.mjs
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
const STEP_MOUNT = `// define via REST, dispatch a run,
// record decisions from your panel
await velt.workflow.recordReviewerDecision({
  executionId, step: "legal", decision: "approved",
});`;

const doc = {
  _id: "featurePageV2-approval-flows",
  _type: "featurePageV2",
  title: "Approval Flows",
  slug: { _type: "slug", current: "approval-flows" },
  beta: true,
  breadcrumbLabel: "Approval Flows",
  metaTitle: "Approval Workflows | Add an approval workflow builder | Velt",
  metaDescription:
    "Your users define who reviews, in what order, and what happens on approve or reject. Velt runs the pipeline and records every step.",

  hero: {
    kicker: "Approval flows",
    title: "Add an approval workflow builder to your product.",
    secondary:
      "Your users define the steps: who reviews, in what order, what happens on approve or reject. Velt runs the pipeline and records every step.",
    accent: "No more building a workflow engine to close an enterprise deal.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "builder", label: "Workflow builder", demoPreset: "approval-flows/hero/builder" },
        { id: "run", label: "Run view", demoPreset: "approval-flows/hero/run" },
        { id: "quorum", label: "Quorum", demoPreset: "approval-flows/hero/quorum" },
        { id: "agent", label: "Agent node", demoPreset: "approval-flows/hero/agent" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Approval workflows running inside products at",
    migration: {
      label: "Migrating from an in-house workflow engine or another SDK?",
      links: keyed(
        [cta("Compare", "/compare/approval-flows"), cta("Migration guide", "https://docs.velt.dev/", true)],
      ),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "Humans and agents, one pipeline.",
    body: "Velt Approval Flows is a workflow engine for review and sign-off, embeddable in your product. Your users define multi-step pipelines through your product\u2019s UI; your product authors them through Velt\u2019s definition API: human reviewers, parallel groups with quorum, and AI review agents, in whatever order the work requires. One workflow execution can carry both actor types, with every override recorded.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "approval-flows/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to your first workflow.",
    support:
      "Wrap your app, define a workflow as JSON through the REST API, dispatch a run per work item, and record decisions from your own review panel. Signed events stream every transition back to your backend.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Record", title: "Define, dispatch, decide.", filename: "review-panel.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "A workflow is a JSON-configured graph of steps: agent and human node types, with parallel groups as containers. A definition is a versioned template; each submission dispatches an execution that tracks its own progress. Approve advances; reject follows your declared route, a follow-up step or a bounded revision loop back to the author with prior attempts attached. Routing is static or conditional, with edges carrying sandboxed JSON-AST expressions over step output and dispatch context, no eval. Dispatch is idempotent, so retries never spawn duplicate runs. Every transition is timestamped, attributed, and persisted; HMAC-signed webhooks fire on each, and a polling API replays by sequence number.",
      microcopy: "// execution.dispatched \u00b7 step.awaiting-approval \u00b7 group.quorum-met \u00b7 step.completed",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "a state machine with persistent, restart-safe executions",
        "sequential and parallel step orchestration with quorum math",
        "conditional routing over step output and context",
        "group assignment with reassignment rules",
        "SLA timers and escalation",
        "a notification pipeline",
        "workflow versioning so in-flight reviews survive definition changes",
        "webhook security: signing, idempotent callbacks, retries",
        "per-step permissions and an audit record for every transition",
      ],
      close:
        "Teams that build it budget a quarter for the first version and keep paying for the long tail. The 3 steps above replace the first quarter; the capability wall below replaces the long tail.",
    },
    mcp: {
      heading: "MCP: the faster path.",
      sub: "Skip the steps. Have your agent set it up.",
      tabs: keyed(
        [
          { id: "cursor", label: "Cursor", command: "npx @veltdev/mcp add --client cursor" },
          { id: "claude", label: "Claude Code", command: "claude mcp add velt -- npx @veltdev/mcp" },
          { id: "windsurf", label: "Windsurf", command: "npx @veltdev/mcp add --client windsurf" },
          { id: "copilot", label: "Copilot", command: "npx @veltdev/mcp add --client vscode" },
          { id: "zed", label: "Zed", command: "npx @veltdev/mcp add --client zed" },
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
              { label: "Workflow REST API", href: "https://docs.velt.dev/", newTab: true },
              { label: "Basic Webhooks", href: "https://docs.velt.dev/api-reference/webhooks", newTab: true },
              { label: "Advanced Webhooks", href: "https://docs.velt.dev/api-reference/webhooks/advanced", newTab: true },
              { label: "User Groups REST API", href: "https://docs.velt.dev/", newTab: true },
              { label: "Activity Logs", href: "https://docs.velt.dev/async-collaboration/activity/overview", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "Notification channels",
          chips: keyed(
            [
              { label: "In-app inbox", href: "https://docs.velt.dev/", newTab: true },
              { label: "Email", href: "https://docs.velt.dev/", newTab: true },
              { label: "Slack via webhooks", href: "https://docs.velt.dev/api-reference/webhooks", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch approval workflows this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Every approval, routed and recorded.",
    support: "Each card shows the real mechanics. Toggle to Code for the exact snippet behind it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Agent and human nodes",
          codeKicker: "// nodes",
          headline:
            "Agent checks and human approvals compose one pipeline through one API. The agent pre-screens the deck before legal signs off on the clause.",
          preview: "approval-flows/showcase/nodes",
          code: '{ "id": "brand", "type": "agent" }\n{ "id": "legal", "type": "human" }',
        },
        {
          num: "02",
          name: "Parallel groups and quorum",
          codeKicker: "// quorum",
          headline:
            "Reviewers run simultaneously under an N-of-M threshold; once quorum is met, waiting siblings are released. Two of three sign-offs move the contract without the third calendar.",
          preview: "approval-flows/showcase/quorum",
          code: '{ "type": "group", "quorum": 2,\n  "cancelOnQuorum": true }',
        },
        {
          num: "03",
          name: "Conditional routing",
          codeKicker: "// routing",
          headline:
            "Edges carry sandboxed predicates over step output and dispatch context, with no code execution. Invoices over 25,000 route to the CFO, the rest to the budget owner.",
          preview: "approval-flows/showcase/routing",
          code: '{ "if": "amount > 25000",\n  "then": "cfo", "else": "budget-owner" }',
        },
        {
          num: "04",
          name: "Mandatory reviewers",
          codeKicker: "// mandatory",
          headline:
            "Per-step reviewer lists carry mandatory flags, and quorum groups can name members whose approval is required. Legal and finance must both sign; brand counts as a bonus voice.",
          preview: "approval-flows/showcase/mandatory",
          code: '{ "requiredNodeIds": ["legal", "finance"] }',
        },
        {
          num: "05",
          name: "SLA timers and escalation",
          codeKicker: "// sla",
          headline:
            "Per-step deadlines mark a stalled step breached and route it along the escalation edge you define, firing an event. The filing stops sitting because the approver is on vacation.",
          preview: "approval-flows/showcase/sla",
          code: '{ "slaMs": 86400000,\n  "onBreach": "escalate" }',
        },
        {
          num: "06",
          name: "Revision loops",
          codeKicker: "// loops",
          headline:
            "A rejection loops the run back to the author with every prior attempt and reason attached, capped before escalation. The legal redline returns to the deck writer instead of failing the run.",
          preview: "approval-flows/showcase/loops",
          code: '{ "onReject": "loop-to-author",\n  "maxIterations": 3 }',
        },
        {
          num: "07",
          name: "Admin override with audit",
          codeKicker: "// override",
          headline:
            "An operator can force-approve, force-reject, or cancel a parked step, and the audit log separates reviewer decisions from overrides. The contract moves while the reviewer is unreachable, on the record.",
          preview: "approval-flows/showcase/override",
          code: 'velt.workflow.forceApprove({\n  step, reason: "reviewer unreachable",\n});',
        },
        {
          num: "08",
          name: "Workflow versioning",
          codeKicker: "// versioning",
          headline:
            "Every save creates a version; in-flight runs keep the rules they started with, new runs get the current ones. A mid-quarter policy change never breaks an open budget review.",
          preview: "approval-flows/showcase/versioning",
          code: '// in-flight runs keep v3\n// new runs dispatch on v4',
        },
        {
          num: "09",
          name: "Signed events and replay",
          codeKicker: "// events",
          headline:
            "Every transition posts an HMAC-signed webhook with retries, and missed deliveries replay by sequence number from the events API. Your audit pipeline never misses a sign-off.",
          preview: "approval-flows/showcase/events",
          code: 'GET /v2/workflow/events?sinceSeq=4210',
        },
        {
          num: "10",
          name: "Governance as API",
          codeKicker: "// governance",
          headline:
            "One call returns a run\u2019s status, pending step, and every recorded decision. Your publishing agent checks the approval state before touching the counterparty\u2019s data.",
          preview: "approval-flows/showcase/governance",
          code: 'GET /v2/workflow/executions/exec_8842',
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/", true),
      cta("View Examples", "/examples"),
    ]),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We had agent and human steps in one pipeline within a sprint. The quorum math and the retries we\u2019d scoped a quarter for were already done.",
      who: "Staff engineer \u00b7 contract platform",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support:
      "Shipped functionality only. The confirmed set leads; coming-soon items are labeled. This is the part of an in-house build that never ends.",
    visibleCount: 12,
    items: keyed(
      [
        { label: "Definition vs execution model: versioned templates, per-dispatch runs pinned to their version" },
        { label: "Agent and human node types in one definition" },
        { label: "Definitions scoped to workspace, organization, or document; most specific match wins" },
        { label: "Parallel groups with waitAll, cancelOnQuorum, and joinOnQuorum policies" },
        { label: "Quorum counts approvals only, with required-member quorum (requiredNodeIds)" },
        { label: "Mandatory and optional reviewers per step" },
        { label: "Strict mode: every human node declares a reject path, no silent dead-ends" },
        { label: "Revision loops with a 1-to-20 iteration cap and full previousAttempts history" },
        { label: "Conditional edges via sandboxed JSON-AST expressions; no eval" },
        { label: "SLA timers via slaMs with breach routing, enforced by the linter" },
        { label: "Agent nodes with configurable polling cadence and a hard runtime ceiling" },
        { label: "Definition linter with explicit error codes for every graph mistake" },
        { label: "Workflow versioning with optimistic concurrency (ifVersion) and prior-version snapshots" },
        { label: "Idempotent dispatch (idempotencyKey) and idempotent decision recording" },
        { label: "Monotonic per-execution event sequence with catch-up polling by sinceSeq" },
        { label: "HMAC-SHA256 signed webhooks with exponential retries and dead-lettering" },
        { label: "Webhook URL safety: HTTPS only, private and loopback hosts rejected" },
        { label: "Execution-level and step-level cancellation with an audited reason vocabulary" },
        { label: "Admin force actions plus reviewer-scoped resolve, distinguished in the audit log" },
        { label: "Graph capacity of 100 nodes and 500 edges per definition" },
        { label: "Webhook node runtime", soon: true },
        { label: "Custom approval states per element (Draft, Review, Approved, any set)", soon: true },
        { label: "Dynamic routing where your webhook decides", soon: true },
        { label: "Group-based assignment with reassignment locked to the step\u2019s group", soon: true },
        { label: "Ad-hoc step insertion and removal mid-flight", soon: true },
        { label: "SLA pre-breach reminders to the assigned reviewer", soon: true },
        { label: "Human override of agent findings with per-finding granularity", soon: true },
        { label: "Role-based permissions per step with 403 on unauthorized actions", soon: true },
        { label: "Five prebuilt UI components (VeltApprovalFlow and siblings), white-label and themeable", soon: true },
        { label: "Version diff history, rollback, and pruning", soon: true },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your review surface, your routing.",
    support:
      "Prebuilt review components for the fast path, headless mode for fully custom approval UIs, and JSON definitions, signed webhooks, and version pinning underneath.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "The five prebuilt components (VeltApprovalFlow, VeltApprovalStep, VeltApprovalComments, VeltApprovalActions, VeltApprovalAuditLog), all white-label and themeable, with headless mode for fully custom approval UIs and template variables and dark mode.",
          preview: "approval-flows/make-it-yours/look",
          code: "<VeltApprovalFlowWireframe>\n  // your review markup, Velt routes\n</VeltApprovalFlowWireframe>",
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "JSON workflow definitions with your own node ids and routing, free-form trigger context that edge conditions and agents read, signed event webhooks into your pipeline, version pinning per execution, and definitions scoped to workspace, organization, or document.",
          preview: "approval-flows/make-it-yours/behavior",
          code: 'velt.workflow.definitions.create(config);\nvelt.webhooks.subscribe({ events: ["step.*"] });',
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We built the builder UI our PMs wanted on top of Velt\u2019s definition API. The engine, the quorum, and the audit record were the parts we didn\u2019t have to write.",
      who: "Product lead \u00b7 agency platform",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "Approval flows, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "approval-flows/in-production/sales",
          caption:
            "Brand agent first, brand lead second, legal last: every deck and campaign email walks the same chain before the client sees it. A rejection routes back with the redline attached.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech",
          demoPreset: "approval-flows/in-production/fintech",
          caption:
            "Invoices over the threshold route to the CFO, the filing needs two of three sign-offs, every step timestamped. The auditor\u2019s \u201Cwho approved this?\u201D has an answer on the record.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "approval-flows/in-production/ops",
          caption:
            "Sign-off on the order, the shipment, the change request, with SLA escalation when the reviewer is off shift. The counterparty sees progress, never your internal debate.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "ai",
          label: "AI-native",
          demoPreset: "approval-flows/in-production/ai",
          caption:
            "Agent steps pre-screen generated work, humans hold the gates, and your publishing agent queries the approval state before acting. Nothing the AI produces ships unapproved.",
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
    heading: "Where every approval connects.",
    support: "Agent steps, the recorded chain, and the nudge that keeps reviewers moving.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Review agents",
          body: "An agent step invokes them; findings land as comments inside the workflow.",
          visual: "approval-flows/related/review-agents",
          link: cta("Explore Review agents", "/review-agents"),
        },
        {
          iconKey: "shield",
          title: "Audit trail",
          body: "Every transition is already a record; the workflow\u2019s full history is the export.",
          visual: "approval-flows/related/audit-trail",
          link: cta("Explore Audit trail", "/audit-trail"),
        },
        {
          iconKey: "velt",
          title: "Notifications",
          body: "The pipeline only completes if reviewers see their turn.",
          visual: "approval-flows/related/notifications",
          link: cta("Explore Notifications", "/notifications"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Audit-ready"],
    line: "Comment content at workflow steps can live on your infrastructure via the self-host data provider, with only minimal identifiers on Velt. Flow metadata is stored in a configurable region, encrypted at rest, and client-side encryption keys are available before data leaves the browser.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "The enterprise deal, unblocked.",
    support: "\u201CBuild us a workflow engine\u201D stopped blocking our deals.",
    cards: keyed(
      [
        {
          metric: "1 enterprise deal",
          quote:
            "The customer demanded a multi-step approval engine before they would sign. We shipped it on Velt instead of building one, and closed the quarter.",
          who: "VP Engineering, sales enablement platform",
        },
        {
          metric: "2 of 3",
          quote:
            "Our close week needs quorum sign-off on every filing. Two-of-three with required members was a config change, not a project.",
          who: "Controller, FP&A platform",
        },
        {
          metric: "0 spinners",
          quote:
            "Agent steps pre-screen generated work and humans hold the gates. Our users watch the pipeline instead of trusting a black box.",
          who: "Product lead, AI-native SaaS",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about approval flows.",
    items: keyed(
      [
        {
          question: "How do I add approval workflows to a React app?",
          answer:
            "Install @veltdev/react, wrap your app in VeltProvider with your API key, and define a workflow as JSON through the REST API. Dispatching against a work item creates an execution that routes itself; your review panel records decisions through the decision API.",
        },
        {
          question: "Can AI agents be a step in an approval workflow?",
          answer:
            "Yes. Agent is a node type: it runs automatically when the workflow reaches it and reports pass or fail with a findings summary that downstream routing reads. For human judgment on agent output, a human step downstream holds the gate.",
        },
        {
          question: "Do you support group approvals and quorum, like two of three reviewers?",
          answer:
            "Yes. A step declares its reviewer list with mandatory and optional members, and a parallel group runs steps simultaneously with an N-of-M threshold that can require specific approvers. When quorum is met the group resolves and remaining assignments are released.",
        },
        {
          question: "What happens when a reviewer doesn\u2019t respond?",
          answer:
            "Per-step SLA timers. If no action lands within the configured duration, the step is marked breached and routes along the escalation path you define, and a breach event fires so your backend knows.",
        },
        {
          question: "What happens when a reviewer rejects?",
          answer:
            "You decide per step: route the run to a follow-up step, or loop it back to the author with every prior attempt and rejection reason attached, capped at a set iteration count with an escalation route when the cap is hit. Every human step must declare a reject path; the engine refuses definitions with silent dead-ends.",
        },
        {
          question: "Does changing a workflow break reviews already in progress?",
          answer:
            "No. Every save creates a new version; in-flight executions keep the version they started on, and new runs use the current one. Updates are guarded against concurrent edits, and prior versions are snapshotted.",
        },
        {
          question: "How do approval workflows show up in the audit trail?",
          answer:
            "Every transition creates a timestamped, attributed event: who was asked, who acted, what they decided, and whether an admin overrode a reviewer. The full chain per run is queryable through the events API. See /audit-trail.",
        },
        {
          question: "Does Velt ship a prebuilt workflow builder UI?",
          answer:
            "No. Velt ships the engine, the definition APIs, and the review-surface components; you build the builder UI that fits your product, and your users define workflows through it.",
        },
        {
          question: "What does it cost to add approval workflows?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production. Approval flows are part of the SDK, not a separately priced add-on.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add an approval workflow builder to your product.",
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
