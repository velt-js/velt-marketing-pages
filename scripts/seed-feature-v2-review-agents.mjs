#!/usr/bin/env node
/**
 * Seed the featurePageV2-review-agents document in Sanity so it renders at
 * /new-features/review-agents via app/new-features/[slug]/page.tsx.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-review-agents.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-v2-review-agents.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-review-agents.mjs
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
const STEP_MOUNT = `// enable agents for the document in the Velt Console first
<VeltReviewAgents
  documentId="marketing-email"
/>`;

const doc = {
  _id: "featurePageV2-review-agents",
  _type: "featurePageV2",
  title: "Review Agents",
  slug: { _type: "slug", current: "review-agents" },
  beta: false,
  breadcrumbLabel: "Review Agents",
  metaTitle: "Review Agents | AI reviewers for the content in your product | Velt",
  metaDescription:
    "Add AI review agents that check the content and data in your product before a human looks. Findings land as comments a human accepts or rejects.",

  hero: {
    kicker: "Review agents",
    title: "Add agents that review the content and data in your product.",
    secondary:
      "Give your users built-in review agents, or let them create custom ones with plain English instructions. Findings land as comments a human accepts or rejects.",
    accent: "Stop launching AI features your enterprise buyers won\u2019t approve.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "define", label: "Define agent", demoPreset: "review-agents/hero/define" },
        { id: "run", label: "Run", demoPreset: "review-agents/hero/run" },
        { id: "findings", label: "Findings as comments", demoPreset: "review-agents/hero/findings" },
        { id: "accept", label: "Accept/reject", demoPreset: "review-agents/hero/accept" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Review agents running inside products at",
    migration: {
      label: "Migrating from an in-house build or another SDK?",
      links: keyed(
        [cta("Compare", "/compare/review-agents"), cta("Migration guide", "https://docs.velt.dev/", true)],
      ),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "Humans and agents in one thread.",
    body: "Velt Review Agents are AI reviewers that check the content and data in your product before a human looks. Offer built-in agents to your users, or let them create custom ones with plain English instructions: review for brand violations, missing clauses, broken claims, policy conflicts. Seven built-in agents come with Velt, each individually toggleable: Spell Check, Grammar Check, Broken Links, PII Detection, Profanity Filter, Sensitive Data, and Consistency Check.",
    docLinks: keyed([
      cta(
        "View Docs",
        "https://docs.velt.dev/api-reference/rest-apis/v2/comments-feature/comments/add-comments",
        true,
      ),
      cta("View Examples", "/examples"),
    ]),
    scene: "review-agents/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to your first finding.",
    support:
      "Install the SDK, wrap your app, and enable agents for the documents you want checked. Findings land as comments in your product, with redlines and suggested fixes where relevant.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Mount", title: "Enable agents.", filename: "review-page.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "An agent runs automatically on content submission, as a node in an approval workflow, or through the execution API. It reviews the target and leaves findings as contextual comments, with redlines and suggested fixes where relevant. Each finding carries Approve and Reject buttons: a human accepts the finding or rejects it. On accept, the finding becomes a durable comment or fires a custom action through your webhook. Prior runs are stored and inspectable, and with Memory enabled, agents read past decisions and stop re-flagging what the org has already settled.",
      microcopy: "// standalone on submission \u00b7 workflow node \u00b7 execution API",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "an agent runtime with queueing and per-customer concurrency",
        "prompt design plus injection sandboxing",
        "anchoring findings to live elements",
        "rerun matching that does not spam reviewers",
        "knowledge retrieval with citation verification",
        "confidence calibration and finding deduplication",
        "blocking and advisory gating",
        "an eval harness with golden datasets",
        "per-agent analytics",
      ],
      close:
        "Teams that build it budget a quarter for the first version and keep paying for evals and model churn. The 3 steps above replace the quarter; the capability wall below replaces the long tail.",
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
          label: "Where findings anchor",
          chips: keyed(
            [
              { label: "Editor plugins", href: "https://docs.velt.dev/", newTab: true },
              { label: "Charts", href: "https://docs.velt.dev/", newTab: true },
              { label: "HTML canvas", href: "https://docs.velt.dev/", newTab: true },
              { label: "Video", href: "https://docs.velt.dev/", newTab: true },
              { label: "Custom components", href: "https://docs.velt.dev/", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "APIs and pipes",
          chips: keyed(
            [
              { label: "Comments REST API v2", href: "https://docs.velt.dev/api-reference/rest-apis/v2/comments-feature/comments/add-comments", newTab: true },
              { label: "Basic Webhooks", href: "https://docs.velt.dev/api-reference/webhooks", newTab: true },
              { label: "Advanced Webhooks", href: "https://docs.velt.dev/api-reference/webhooks/advanced", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch review agents this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "The first pass, handled.",
    support: "Each card is the live SDK. Toggle to Code for the exact snippet that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Seven built-in agents",
          codeKicker: "// built-ins",
          headline:
            "Spell Check, Grammar Check, Broken Links, PII Detection, Profanity Filter, Sensitive Data, and Consistency Check, each toggleable on its own. A legal product keeps PII Detection and drops the spell check that trips on jargon.",
          preview: "review-agents/showcase/built-ins",
          code: '// seven built-ins, each toggleable\nvelt.agents.enable(["pii-detection"]);',
        },
        {
          num: "02",
          name: "Custom agents in plain English",
          codeKicker: "// custom",
          headline:
            "Type instructions like \u201Cflag any competitor mention\u201D; the setup assistant sharpens them and proves them on test samples. Every team\u2019s standards become agents, no engineering ticket.",
          preview: "review-agents/showcase/custom",
          code: 'velt.agents.create({\n  instruction: "flag any competitor mention",\n});',
        },
        {
          num: "03",
          name: "Findings as comments",
          codeKicker: "// findings",
          headline:
            "The agent posts through the comments API humans use: anchored to the clause or cell, threaded, AI-badged, with Approve and Reject on every finding. In the work, never a separate report.",
          preview: "review-agents/showcase/findings",
          code: "// posts through the comments API\n<VeltComments />",
        },
        {
          num: "04",
          name: "Blocking and advisory modes",
          codeKicker: "// modes",
          headline:
            "A toggle per agent: blocking findings gate content until resolved, advisory findings warn and record any override. PII removal is a gate; brand voice is a suggestion.",
          preview: "review-agents/showcase/modes",
          code: 'velt.agents.update("pii", { mode: "blocking" });',
        },
        {
          num: "05",
          name: "Knowledge sources from Memory",
          codeKicker: "// knowledge",
          headline:
            "Point an agent at the brand guidelines PDF or style manual stored in Memory; findings cite the exact section. The reviewer sees why, not just what.",
          preview: "review-agents/showcase/knowledge",
          code: 'velt.agents.update("brand", {\n  knowledge: ["brand-guidelines.pdf"],\n});',
        },
        {
          num: "06",
          name: "Suggested fixes inline",
          codeKicker: "// fixes",
          headline:
            "Where the agent can fix what it flagged, it proposes the redline: one tap accepts, the content updates, the agent reruns to verify. Flag to fixed without a resubmit cycle.",
          preview: "review-agents/showcase/fixes",
          code: "// one tap accepts the redline\nonFindingAccept(() => agent.rerun());",
        },
        {
          num: "07",
          name: "Match-and-merge reruns",
          codeKicker: "// reruns",
          headline:
            "On resubmit, fixed findings resolve, open ones persist with their reply threads, only genuinely new issues notify. The second pass on a filing reads like progress, not a fresh pile.",
          preview: "review-agents/showcase/reruns",
          code: '// resubmit: fixed resolve, open persist\nvelt.agents.run({ match: "merge" });',
        },
        {
          num: "08",
          name: "Agent nodes in approval workflows",
          codeKicker: "// workflows",
          headline:
            "Any agent runs as a step in an approval pipeline: pass advances the deck or budget, fail routes to a specialist. First-pass review happens before a human\u2019s queue fills.",
          preview: "review-agents/showcase/workflows",
          code: '// agent as an approval node\n{ type: "agent", onFail: "route:specialist" }',
        },
        {
          num: "09",
          name: "Checklist-to-agent converter",
          codeKicker: "// checklist",
          headline:
            "Upload a 300-item QA checklist; Memory normalizes it and the converter proposes focused agents, deduplicated, scoped to the right pages. Findings cite the checklist item they enforce.",
          preview: "review-agents/showcase/checklist",
          code: 'velt.agents.fromChecklist("qa-300.csv");',
        },
        {
          num: "10",
          name: "Confidence and scope declarations",
          codeKicker: "// confidence",
          headline:
            "Every finding carries confidence, the instruction or knowledge section behind it, and a declaration of what was and was not checked. Reviewers trust agents they can interrogate.",
          preview: "review-agents/showcase/confidence",
          code: '{ "confidence": 0.91,\n  "checked": ["text"], "notChecked": ["images"] }',
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta(
        "View Docs",
        "https://docs.velt.dev/api-reference/rest-apis/v2/comments-feature/comments/add-comments",
        true,
      ),
      cta("View Examples", "/examples"),
    ]),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "Agents pre-check every asset before a human opens it, and review time on first-pass items dropped by more than half. Reviewers spend their attention on judgment, not typos.",
      who: "Review operations lead \u00b7 content platform",
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
        { label: "Seven built-ins, each individually toggleable" },
        { label: "Advisory by default; blocking is an explicit choice" },
        { label: "Fail open on timeout or model error, with what-was-not-checked labels" },
        { label: "Confidence floor at 50 percent; low-confidence findings suppressed but logged" },
        { label: "Citation verification before any knowledge citation renders" },
        { label: "Finding deduplication: same element, same issue merges to the higher confidence" },
        { label: "Max 10 findings shown by confidence, the rest collapsed" },
        { label: "Scope declarations (\u201CChecked: text. Not checked: images\u201D)" },
        { label: "Degradation labels when knowledge sources are unavailable" },
        { label: "Instruction versioning with rollback across the last 10 versions" },
        { label: "Agent duplication and per-agent knowledge scoping" },
        { label: "Page-scoped agents with glob include and exclude patterns" },
        { label: "Cross-page consistency agents with auto-discovery and a source-of-truth document option" },
        { label: "Checklist converter with duplicate detection across QA roles" },
        { label: "Memory-suggested agents from detected reviewer patterns" },
        { label: "Per-agent analytics: runs, findings, overrides, false positive rate" },
        { label: "Per-item override of standalone blocking agents, recorded as an AI override" },
        { label: "Prompt injection sandboxing: instructions are data, never control flow" },
        { label: "Finding text sanitized before rendering" },
        { label: "Per-customer model routing, including a GCP-only option" },
        { label: "A judgment record behind every finding, included in audit exports with confidence and citations" },
        { label: "Parallel execution: 7+ agents in under 10 seconds" },
        { label: "Non-English content checked best effort, with a label" },
        { label: "Up to 10 custom agents per project" },
        { label: "Smart skip for previously approved content", soon: true },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your badge, your behavior.",
    support:
      "Themeable AI badge and confidence display, white-label naming, and a full API surface: definition CRUD, execution, hooks, custom accept actions, and events.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "AI badge distinguishable from human comments but fully themeable; confidence display configurable (percent, bar, or hidden); white-label, the badge shows the agent\u2019s name, never \u201CVelt AI\u201D; findings inherit the comment dialog primitives for fully custom UIs; dark mode via the same variables.",
          preview: "review-agents/make-it-yours/look",
          code: "<VeltReviewAgentsWireframe>\n  // your finding markup, Velt reviews\n</VeltReviewAgentsWireframe>",
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "Agent definition CRUD APIs, an execution API, the useAgentResults / useAgentConfig / useAgentAnalytics hooks, custom actions on accept through your webhook, and events on every finding.",
          preview: "review-agents/make-it-yours/behavior",
          code: 'velt.agents.create({ instruction });\nonFindingAccept((f) => runAction(f));',
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We white-labeled the agents under our own brand, and our users never see \u201CVelt AI.\u201D The consent step on every finding is what made our customers comfortable shipping it.",
      who: "Product lead \u00b7 AI-native SaaS",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "Review agents, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "review-agents/in-production/sales",
          caption:
            "Brand, legal, and compliance agents pre-check every email and deck against the uploaded guidelines. The client sees work that already passed the standards, and reviewers open queues that are mostly green.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech",
          demoPreset: "review-agents/in-production/fintech",
          caption:
            "PII Detection and Sensitive Data run as blocking gates on filings and forecasts before any human review. The numbers reach the approver clean, with every agent check on the record.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "review-agents/in-production/ops",
          caption:
            "Consistency agents compare the phone number, hours, and address across every page and record, citing where they differ. The counterparty never catches the mismatch your own site missed.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "ai",
          label: "AI-native",
          demoPreset: "review-agents/in-production/ai",
          caption:
            "Agents review generated drafts the moment they land, flagging issues as comments with Approve and Reject attached. Your users trust the AI because a consent step sits on every finding.",
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
    heading: "Findings live in the rest of the stack.",
    support: "Comments carry the findings, Memory grounds them, and Approval flows route them.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Comments",
          body: "Findings are comments, the same threads your users already know.",
          visual: "review-agents/related/comments",
          link: cta("Explore Comments", "/comments"),
        },
        {
          iconKey: "shield",
          title: "Memory",
          body: "Knowledge sources and the precedent agents read before flagging.",
          visual: "review-agents/related/memory",
          link: cta("Explore Memory", "/memory"),
        },
        {
          iconKey: "velt",
          title: "Approval flows",
          body: "Agents run as workflow nodes with pass/fail routing.",
          visual: "review-agents/related/approval-flows",
          link: cta("Explore Approval flows", "/approval-flows"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Zero data retention"],
    line: "Simple built-in agents (spell, grammar, PII) run inside Velt\u2019s GCP; the consistency built-in and custom agents use a frontier model under a zero-data-retention DPA, with a fully GCP-resident routing option per customer. Agent findings follow the self-host data provider model, so finding content can stay on your infrastructure.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "The AI feature your buyers approved.",
    support: "A consent step on every finding is what cleared the security review.",
    cards: keyed(
      [
        {
          metric: "0 blockers",
          quote:
            "Our enterprise buyer\u2019s security team approved the AI feature on the first review. Every finding had a consent step and a judgment record behind it.",
          who: "Head of Product, sales enablement platform",
        },
        {
          metric: "2x faster",
          quote:
            "Brand and legal queues open mostly green now. The agents pre-check every deck against our guidelines before a human ever sees it.",
          who: "Marketing operations lead, content platform",
        },
        {
          metric: "10s",
          quote:
            "Seven agents run in parallel in under ten seconds, and only genuinely new issues notify on a resubmit. Reviewers finally trust the second pass.",
          who: "Staff Engineer, AI-native SaaS",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about Review Agents.",
    items: keyed(
      [
        {
          question: "What are the built-in review agents in Velt?",
          answer:
            "Seven, each individually toggleable: Spell Check, Grammar Check, and Broken Links for quality; PII Detection, Profanity Filter, and Sensitive Data for sensitivity; and Consistency Check, which uses Memory and stays off until Memory has data. Built-ins use the same framework as custom agents, so disabling one never affects another.",
        },
        {
          question: "How do I add AI review agents to a React app?",
          answer:
            "Install @veltdev/react, wrap your app in VeltProvider with your API key, and enable agents for the documents you want checked; configure which agents run from the dashboard. Or have your coding agent set it up through the Velt MCP installer.",
        },
        {
          question: "Can non-engineers create review agents?",
          answer:
            "Yes. A PM writes plain English instructions, the setup assistant rewrites them into precise checks and proves them on test samples, and the PM marks each right or wrong until the agent behaves. No code, no prompt engineering.",
        },
        {
          question: "What happens to our data when review agents run?",
          answer:
            "Everything is isolated per tenant: agent definitions, findings, and knowledge are scoped to your API key, with physically separated vector store namespaces, and your content is never used to train models. Custom agents call a frontier model under a zero-data-retention agreement; simple built-ins (spell, grammar, PII) stay on Velt\u2019s GCP; the consistency built-in routes like custom agents, and a fully GCP-resident routing option exists for stricter requirements.",
        },
        {
          question: "Can an agent block content from reaching review?",
          answer:
            "Only if you make it blocking. Agents default to advisory: findings show as warnings, reviewers can proceed, and overrides are recorded. Blocking agents gate content until findings resolve, and an authorized override per item is always available.",
        },
        {
          question: "What happens when an agent is wrong?",
          answer:
            "A human rejects the finding and the override goes on the record, which feeds agent tuning. Findings below 50 percent confidence never render, citations are verified before display, and identical reruns return identical results. If infrastructure fails, content proceeds; reviews never block on Velt.",
        },
        {
          question: "Do review agents work with approval workflows?",
          answer:
            "Yes. Any agent runs as a node in a Velt approval workflow: pass advances the work, fail routes it to the right human. The same agent can also run standalone on every submission, with no workflow at all.",
        },
        {
          question: "Can agents use our brand guidelines or QA checklist?",
          answer:
            "Yes. Upload guidelines to Memory and point agents at them; findings cite the exact section. A QA checklist converts into focused agents that cite the checklist item they enforce.",
        },
        {
          question: "What do review agents cost?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, with a free tier for development and early production.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add agents that review the content and data in your product.",
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
