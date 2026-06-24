#!/usr/bin/env node
/**
 * Seed the featurePageV2-memory document in Sanity so it renders at
 * /new-features/memory via app/new-features/[slug]/page.tsx.
 *
 * Memory is a BETA page (RG ruling 2026-06-10): beta=true renders the Beta
 * badge; pre-GA / spec-only capabilities render in the detail wall with
 * soon=true ("Coming soon"), never in shipped tense or FAQPage JSON-LD.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-memory.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-memory.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *Preset field references a key wired
 * in components/feature-new/demo-presets/memory.tsx.
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
const STEP_MOUNT = `// enable Memory in your workspace first
import { useSetDocument } from "@veltdev/react";

useSetDocument("filing-q3");`;

const doc = {
  _id: "featurePageV2-memory",
  _type: "featurePageV2",
  title: "Memory",
  slug: { _type: "slug", current: "memory" },
  beta: true,
  breadcrumbLabel: "Memory",
  metaTitle: "Review Memory | Add memory to your reviews | Velt",
  metaDescription:
    "Velt learns from past reviews. Previous approvals surface as precedent, so the tenth review is consistent with the first.",

  hero: {
    kicker: "Memory",
    title: "Add memory to your reviews.",
    secondary:
      "Velt learns from past reviews. Previous approvals surface as precedent, so the tenth review is consistent with the first as teams grow.",
    accent: "No more review features a competitor can clone in a quarter.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "precedent", label: "Precedent surfacing", demoPreset: "memory/hero/precedent" },
        { id: "grounding", label: "Agent grounding", demoPreset: "memory/hero/grounding" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Review intelligence running inside products at",
    migration: {
      label: "Migrating from an in-house ML build?",
      links: keyed([cta("Compare", "/compare/memory"), cta("Migration guide", "https://docs.velt.dev/", true)]),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "A learning layer over your reviews.",
    body: "Velt Memory is a learning layer over your users\u2019 review history. Past decisions surface as precedent \u2014 to review agents before they review, and to human reviewers in context \u2014 so the tenth review is consistent with the first. The precedent accumulates in your product: a competitor can clone your features in a quarter; they cannot clone your customers\u2019 settled judgments.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/activity/overview", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "memory/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to precedent.",
    support:
      "Enable Memory and your review activity becomes structured judgments automatically. Search, ask, and suggest over them through the REST API; agents and humans read the same precedent.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Mount", title: "Surface precedent.", filename: "review-page.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "Enable Memory in your workspace and Velt starts recording review activity as structured records. Each decision is enriched into a judgment automatically: the decision, the reasoning, who decided (human or agent), and the content type. Judgments are read-only through the API \u2014 there is no create endpoint \u2014 so a new workspace starts empty and fills as reviews happen. Search runs over two embedding spaces (the decision with its reasoning, or the reviewed content), filterable by decision, judge type, content type, reviewer, and date. Ask returns a grounded answer with citations and a confidence score, or an empty answer when nothing relevant exists. Suggest returns a recommendation with confidence and the judgment count it drew on. Memory recommends; it never acts. The reviewer always decides, and that decision becomes the next record.",
      microcopy: "// judgments are read-only \u00b7 a new workspace starts empty and fills as reviews happen",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "a vector store with per-tenant namespace isolation",
        "a multimodal embedding pipeline for text and attachments",
        "retrieval-grounded answers with citations",
        "scope enforcement that survives prompt injection",
        "pattern detection jobs",
        "knowledge ingestion with parsing, chunking, and versioning",
        "drift detection between stated rules and actual behavior",
        "GDPR deletion that reaches embeddings and derived patterns",
        "an eval harness for suggestion precision",
      ],
      close:
        "Teams that build this budget a year of ML infrastructure work and keep paying for eval upkeep. The 3 steps above replace the year; once Memory is enabled, your review activity builds the record from the first decision.",
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
          label: "Knowledge sources",
          chips: keyed(
            [
              { label: "PDF", href: "https://docs.velt.dev/", newTab: true },
              { label: "CSV", href: "https://docs.velt.dev/", newTab: true },
              { label: "Excel (.xlsx)", href: "https://docs.velt.dev/", newTab: true },
              { label: "Plain text", href: "https://docs.velt.dev/", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "Powers these Velt surfaces",
          chips: keyed(
            [
              { label: "Review agents", href: "/review-agents" },
              { label: "Approval flows", href: "/approval-flows" },
              { label: "Audit trail", href: "/audit-trail" },
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
      title: "Launch review memory this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Reviews that remember.",
    support: "Each card shows the real mechanics. Toggle to Code for the exact snippet behind it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Precedent in context",
          codeKicker: "// precedent",
          headline:
            "Before a reviewer opens the filing, Memory surfaces similar past judgments: 3 approved last month, who decided, and why. The tenth review starts where the first nine ended.",
          preview: "memory/showcase/precedent",
          code: "const ctx = useInlineContext({ documentId });\n// → similar judgments, who, when, why",
        },
        {
          num: "02",
          name: "AI suggestions with confidence",
          codeKicker: "// suggest",
          headline:
            "Based on 200 judgments: recommend approve. Confidence 94%. Every suggestion carries its source records, so routine items clear in seconds and low-confidence ones get a full read.",
          preview: "memory/showcase/suggestions",
          code: 'POST /v2/memory/suggest\n{ "documentId": "filing-q3" }',
        },
        {
          num: "03",
          name: "Semantic search over decisions",
          codeKicker: "// search",
          headline:
            "Two embedding spaces index every judgment: the decision with its reasoning, or the reviewed content itself. The deck that repeats a settled mistake surfaces its history.",
          preview: "memory/showcase/search",
          code: 'POST /v2/memory/search\n{ "query": "indemnity clause", "space": "decision" }',
        },
        {
          num: "04",
          name: "Natural language queries",
          codeKicker: "// ask",
          headline:
            "Ask in plain English: show me all rejections of financial projections in Q3. The answer cites the records behind it, so the audit takes minutes, not a quarter-end scramble.",
          preview: "memory/showcase/nl-queries",
          code: 'POST /v2/memory/ask\n{ "data": { "question": "rejections of Q3 projections" } }',
        },
        {
          num: "05",
          name: "Knowledge sources",
          codeKicker: "// knowledge",
          headline:
            "Upload the 50-page brand guide, the policy PDF, the pricing spreadsheet. Memory converts each into searchable text and extracted rules, so reviews check against the actual guide.",
          preview: "memory/showcase/knowledge",
          code: 'POST /v2/memory/knowledge/ingest\n{ "file": "brand-guide.pdf" }',
        },
        {
          num: "06",
          name: "Checklists as living rules",
          codeKicker: "// rules",
          headline:
            "Ingest the 300-item QA checklist; Memory extracts it into versioned, citeable rules. Updates produce a diff, and rules nobody enforces anymore surface for cleanup.",
          preview: "memory/showcase/checklists",
          code: "GET /v2/memory/knowledge/rules\n  ?sourceId=qa-checklist",
        },
        {
          num: "07",
          name: "Agents grounded on memory",
          codeKicker: "// agents",
          headline:
            "Review agents query past judgments and knowledge before flagging. What the org approved before is not re-flagged; what it rejected is caught earlier. A human still decides every finding.",
          preview: "memory/showcase/agents",
          code: 'POST /v2/memory/search\n{ "query": claim, "judgeType": "agent" }',
        },
        {
          num: "08",
          name: "Standards drift alerts",
          codeKicker: "// drift",
          headline:
            "Memory compares stated rules to actual behavior: the brand guide says sentence case, 60% of approvals use title case. The gap surfaces before the client or the auditor finds it.",
          preview: "memory/showcase/drift",
          code: "GET /v2/memory/alerts\n  ?type=standards-drift",
        },
        {
          num: "09",
          name: "Declared facts and rules",
          codeKicker: "// declared",
          headline:
            "Declare it once: brand voice changed in January; projections above 15% variance always get a human read. Declared rules override inferred patterns, so policy beats habit.",
          preview: "memory/showcase/declared",
          code: 'velt.memory.declare({\n  rule: "variance > 15% → human read",\n});',
        },
        {
          num: "10",
          name: "Reviewer profiles",
          codeKicker: "// profiles",
          headline:
            "Each reviewer\u2019s history becomes a behavioral profile: approval rate, average review time, top flags raised. The contract goes to the reviewer who actually clears contracts.",
          preview: "memory/showcase/profiles",
          code: "GET /v2/memory/profiles/get\n  ?reviewer=maya",
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
        "Routine brand reviews used to take a day of back-and-forth. With precedent in context, the reviewer sees what we approved before and clears the obvious ones in seconds.",
      who: "Head of content ops \u00b7 enablement platform",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support:
      "What ships today leads; pre-GA and spec-only capabilities render with a Coming soon tag, never in shipped tense.",
    visibleCount: 12,
    items: keyed(
      [
        { label: "Three-level scoping: apiKey (workspace-wide), organization, document" },
        { label: "Filters: decision, judge type, content type, reviewer, annotation, date range" },
        { label: "Two embedding spaces: decision-with-reasoning, or reviewed content" },
        { label: "Recency mode (1\u2013365 days) for digests" },
        { label: "Annotation shortcut reads one comment thread oldest-first" },
        { label: "Structured judgment listing by metadata, no embedding step" },
        { label: "Grounded answers with citations and a confidence score" },
        { label: "Honest empties: no relevant context returns confidence 0, never invented" },
        { label: "Suggestions carry confidence, judgment count, unique reviewers, and caveats" },
        { label: "Conflict suggestion beside the primary when evidence splits" },
        { label: "Agent block on every agent-made judgment (id, type, execution id)" },
        { label: "Knowledge ingestion: PDF, CSV, Excel, plain text (5 MB inline, 30 MB signed URL)" },
        { label: "Async ingestion with a pollable status; content-hash deduplication" },
        { label: "Rule extraction with categories; updates bump a version and return a diff" },
        { label: "Semantic search inside the knowledge base, fanned across up to 30 sources" },
        { label: "Reviewer profiles: approval rate, review time, top flags, peak hours" },
        { label: "Workspace stats and detected patterns with confidence and source counts" },
        { label: "Proactive alerts with severity, evidence, and a suggested action" },
        { label: "No cross-tenant reads: a foreign sourceId returns empty, never a leak" },
        { label: "Automatic in-context surfacing in the UI", soon: true },
        { label: "Confidence floor (suppress suggestions under 60%) and two-source minimum", soon: true },
        { label: "Custom context API for facts, rules, and reviewer overrides", soon: true },
        { label: "GDPR forget, per-content-type retention, and legal hold", soon: true },
        { label: "Opt-in cross-customer intelligence as anonymized statistics only", soon: true },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your panel, your policy.",
    support:
      "Inline context panel, suggestion card, and NL query results as components for the fast path, with a full REST surface underneath for backend and agent integrations.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "Inline context panel, AI suggestion card, and NL query results as components; panel position configurable (sidebar, bottom, modal); CSS variable theming, white-label, dark mode; headless hooks for fully custom UIs.",
          preview: "memory/make-it-yours/look",
          code: '<VeltInlineContext position="sidebar" />\n// or build on useMemorySuggestion()',
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "Full REST API for backend and agent integrations: search, ask, suggest, judgments query, knowledge lifecycle, profiles, patterns, stats, and alerts. Alert frequency, types, and severity thresholds via alert config.",
          preview: "memory/make-it-yours/behavior",
          code: 'POST /v2/memory/alerts/config/update\n{ "maxAlertsPerWeek": 3 }',
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We pointed our review agent at the suggest endpoint and it stopped re-flagging settled clauses overnight. Reviewers only see what is genuinely new.",
      who: "Founding engineer \u00b7 AI contract review",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "Precedent, in products like yours.",
    support: "Tabbed by vertical. Pre-GA, these are pilot patterns.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "memory/in-production/sales",
          caption:
            "The client\u2019s banned claims and settled brand debates surface as precedent on the next deck, email, and page. Brand review stays consistent when the content team doubles.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech",
          demoPreset: "memory/in-production/fintech",
          caption:
            "Past sign-offs on budgets, forecasts, and filings become queryable precedent with reasoning attached. The auditor\u2019s question returns cited records in minutes.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "memory/in-production/ops",
          caption:
            "Decisions on orders, shipments, and field records accumulate into the org\u2019s actual standard. The new coordinator reviews like a five-year veteran.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "ai",
          label: "AI-native",
          demoPreset: "memory/in-production/ai",
          caption:
            "Agents read the decision history before reviewing generated work, so settled decisions stay settled. Every suggestion carries confidence and provenance.",
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
    heading: "The feature that compounds.",
    support: "Comments and approvals create the records; Memory turns them into precedent.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Review agents",
          body: "Memory is what makes them accurate: grounded agents check against the org\u2019s actual standards.",
          visual: "memory/related/review-agents",
          link: cta("Explore Review agents", "/review-agents"),
        },
        {
          iconKey: "shield",
          title: "Audit trail",
          body: "The immutable records Memory indexes and learns from.",
          visual: "memory/related/audit-trail",
          link: cta("Explore Audit trail", "/audit-trail"),
        },
        {
          iconKey: "shield",
          title: "Approval flows",
          body: "Routing gets smarter with Memory\u2019s reviewer and content data.",
          visual: "memory/related/approval-flows",
          link: cta("Explore Approval flows", "/approval-flows"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["Per-customer isolation", "GDPR deletion", "Legal hold", "Beta"],
    line: "Review intelligence is isolated per customer with physical namespace separation: a foreign sourceId returns empty results and never a cross-tenant read. GDPR deletion, legal hold, and per-content-type retention are part of the model. Beta access requires being added to the beta list.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "The precedent that compounds.",
    support: "Accumulated review history became the reason customers stay.",
    cards: keyed(
      [
        {
          metric: "10x",
          quote:
            "New reviewers ramp in days, not months. The precedent reviews with them, so their tenth review matches our most senior person\u2019s first.",
          who: "VP Operations, logistics platform",
        },
        {
          metric: "minutes",
          quote:
            "The compliance audit used to be a quarter-end scramble. Now every rejection is a cited query and the answer comes back in minutes.",
          who: "Compliance lead, FP&A platform",
        },
        {
          metric: "0 re-flags",
          quote:
            "Our agent stopped re-flagging what we already settled. Reviewers trust it because every suggestion shows its sources and confidence.",
          who: "Founding engineer, AI-native SaaS",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about Memory.",
    items: keyed(
      [
        {
          question: "How do I add review memory to a React app?",
          answer:
            "Install @veltdev/react, wrap your app in VeltProvider with your API key, and your review activity is recorded as structured records. Enable Memory and mount the inline context panel where reviews happen; precedent and suggestions surface automatically.",
        },
        {
          question: "Is our review data used to train models for other customers?",
          answer:
            "No. Each customer\u2019s records live in a physically separate namespace, and nothing crosses it: not records, not content, not names.",
        },
        {
          question: "How does precedent surfacing work?",
          answer:
            "Velt indexes the decisions made in your product: every approval, rejection, and comment with its reasoning. When similar content comes up for review, the relevant past decisions appear in context, like \u201C3 similar items approved last month,\u201D each with who decided, when, and why.",
        },
        {
          question: "Can AI agents use the review memory?",
          answer:
            "Yes. Agents query the same API: past judgments, knowledge sources, and extracted rules. A grounded agent does not re-flag what your org already settled, and its suggestions carry confidence scores and cited sources. A human still decides.",
        },
        {
          question: "What can we upload as knowledge sources?",
          answer:
            "Brand guides, policy documents, QA checklists, and data sheets: PDF, CSV, Excel (.xlsx), and plain text. Files up to 5 MB upload inline; larger files up to 30 MB go through a signed upload URL. Checklists and guides are converted into versioned, individually citeable rules.",
        },
        {
          question: "Can Memory approve content on its own?",
          answer:
            "No. Memory suggests; it never acts. When it lacks grounding it returns nothing rather than guessing: a question with no relevant history comes back with an empty answer, not an invented one. The reviewer accepts or overrides, and either way the decision is recorded.",
        },
        {
          question: "What does Memory know on day one?",
          answer:
            "Nothing, by design. Once you enable Memory in your workspace, judgments are created automatically from review activity, not imported or written by hand, so it starts empty and gets richer as reviews happen. Until then, questions return an empty answer rather than a guess, and suggestions stay sparse.",
        },
        {
          question: "What does Beta mean for Memory?",
          answer:
            "Beta means the feature is real and running in production with two caveats: API contracts may still change between releases, and access requires being added to the beta list. Ask through Book Demo or your existing Velt contact.",
        },
        {
          question: "What does it cost to add review memory?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add memory to your reviews.",
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
