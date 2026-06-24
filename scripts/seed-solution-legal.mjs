#!/usr/bin/env node
/**
 * Seed the solutionPageV1-legal document in Sanity so it renders at
 * /for/legal via app/for/[slug]/page.tsx.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-solution-legal.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-solution-legal.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *visual / preview field references a
 * key wired in components/feature-new/demo-presets/solutions-legal.tsx.
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

const doc = {
  _id: "solutionPageV1-legal",
  _type: "solutionPageV1",
  title: "Legal",
  slug: { _type: "slug", current: "legal" },
  breadcrumbLabel: "Legal",
  metaTitle: "Review and approval for legal software | Velt",
  metaDescription:
    "Clause-anchored comments, redline suggestions, and approval chains for contract and legal ops platforms. Every clause attributed.",

  hero: {
    kicker: "For legal",
    title: "Redlines on the clause, sign-off up the chain. Every change to every contract, attributed.",
    secondary:
      "Contract platforms, CLM, and legal ops tools live on redlines and sign-off. Velt embeds that loop in your product: clause-anchored comments, suggestion-mode redlining accepted or rejected like a diff, and approval chains from counsel to partner to client, every change attributed.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    visual: "solutions/legal/hero",
  },

  logoStrip: {
    label: "Customers in this space include contract, CLM, and legal ops platforms.",
    migration: {
      label: "See how legal platforms run review on Velt:",
      links: keyed([cta("Customers", "/customers"), cta("Examples", "/examples")]),
    },
  },

  reviewReality: {
    kicker: "The review reality",
    heading: "When redlines round-trip through Word.",
    items: [
      "Redlines live in a Word file emailed back and forth, and your product is where the final version gets pasted.",
      "A comment about clause 7 pointed at clause 9 by the time counsel read it, because the contract moved underneath it.",
      "\u201CWho changed the indemnification cap\u201D took a weekend of version archaeology before the client call.",
      "Two associates marked up the same draft during a handoff and one set of redlines disappeared.",
    ],
    close:
      "If your product carries contracts, NDAs, or matters that more than one lawyer marks up before a client signs, this page is for you.",
  },

  theLoop: {
    kicker: "The loop",
    heading: "One contract, from first redline to attributed clause history.",
    body: "Velt runs one counterparty contract through the full review loop inside your product: clause-anchored threads, suggestion-mode redlines accepted or rejected like a diff, an approval chain from counsel to partner to client, and an attributed history of every clause. Both humans and agents act through the same primitives; nothing changes the contract without a human accepting it.",
    beats: keyed(
      [
        {
          num: "1",
          title: "The contract lands",
          body: "Counterparty paper, an NDA, is uploaded into your product, and the deal team opens review on the matter.",
          visual: "solutions/legal/loop/1",
        },
        {
          num: "2",
          title: "Clause comments",
          body: "Threads anchor to the clause, not the page: the indemnification cap gets a thread, the term clause gets another. Deal strategy stays in threads scoped to the internal team; the client never sees the negotiating-position debate.",
          visual: "solutions/legal/loop/2",
          links: keyed([cta("Comments", "/comments")]),
        },
        {
          num: "3",
          title: "Redlines as suggestions",
          body: "Counsel proposes replacement language on clause 7 inline; an agent proposes a fallback definition on the liability clause with its rationale attached. Each pending redline shows current and proposed language; the reviewer accepts or rejects like a diff, with a reason on reject. Your code applies accepted language; the SDK never mutates the contract.",
          visual: "solutions/legal/loop/3",
          links: keyed([cta("Suggestions", "/suggestions")]),
        },
        {
          num: "4",
          title: "Counsel to partner to client",
          body: "The workflow routes the contract in order: counsel approves the redlines, the partner approves the position, and the client's approver records the final decision as a user your product provisioned with access to this contract. Approve advances it, reject routes it back with the redlines attached, and every transition is timestamped and attributed.",
          visual: "solutions/legal/loop/4",
          links: keyed([cta("Approval flows", "/approval-flows"), cta("Notifications", "/notifications")]),
        },
        {
          num: "5",
          title: "Attributed clause history",
          body: "Who proposed the language, who accepted the redline, who approved the version, when, and the note they left: queryable by document, user, or time range. The history of clause 7 reads as one chain, not a stack of file versions.",
          visual: "solutions/legal/loop/5",
          links: keyed([cta("Audit trail", "/audit-trail")]),
        },
      ],
      "vspLoopBeat",
    ),
    caption:
      "// one contract, five steps, one attributed clause history. The client never sees the negotiating-position debate.",
  },

  featureMap: {
    kicker: "Feature map",
    heading: "What legal platforms buy first.",
    support: "Each card links its feature page. Preview the UI, or read the code that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Suggestions",
          beta: true,
          oneLiner:
            "Redlining inside your product: proposed language on the exact clause, accepted or rejected like a diff, with a reason on reject. Your code applies accepted language; nothing changes the contract silently.",
          link: cta("Explore Suggestions", "/suggestions"),
          code: "<VeltSuggestions />",
          preview: "solutions/legal/fm/suggestions",
        },
        {
          num: "02",
          name: "Comments",
          oneLiner:
            "Threads anchored to the clause, surviving edits as the contract moves. Deal strategy scoped to the internal team; the client reads only the thread meant for them.",
          link: cta("Explore Comments", "/comments"),
          code: "<VeltComments />",
          preview: "solutions/legal/fm/comments",
        },
        {
          num: "03",
          name: "Approval flows",
          beta: true,
          oneLiner:
            "Counsel to partner to client, in order, with quorum where two partners must sign. Approve advances the contract; reject routes it back with the redlines attached.",
          link: cta("Explore Approval flows", "/approval-flows"),
          code: "<VeltApprovalFlow\n  stages={[\"counsel\", \"partner\", \"client\"]}\n/>",
          preview: "solutions/legal/fm/approval-flows",
        },
        {
          num: "04",
          name: "Audit trail",
          oneLiner:
            "Who proposed the clause, who accepted the redline, who approved the version: an attributed history queryable by contract, user, or time range, exportable when the dispute lands.",
          link: cta("Explore Audit trail", "/audit-trail"),
          code: "POST /v2/activities/get\n{ \"data\": { \"documentId\": \"mutual-nda\" } }",
          preview: "solutions/legal/fm/audit-trail",
        },
        {
          num: "05",
          name: "Single editor mode",
          oneLiner:
            "One associate holds the pen while the deal team watches live: clean handoffs between drafts, no overwritten redlines.",
          link: cta("Explore Single editor mode", "/multiplayer-editing#single-editor"),
          code: "velt.setSingleEditorMode(true);",
          preview: "solutions/legal/fm/single-editor",
        },
      ],
      "vspFeatureCard",
    ),
  },

  agentLayer: {
    kicker: "Agent action layer",
    heading: "Agents propose the clause. Counsel accepts it.",
    body: "An agent that flags a missing limitation-of-liability clause and proposes fallback language is a first-pass reviewer that never sleeps. An agent that rewrites the contract on its own is a problem no engagement letter covers. In Velt, every agent proposal lands as a suggestion on the exact clause, with the rationale attached and Accept and Reject on the dialog. On accept, your code applies the language and the record carries who allowed it; on reject, nothing changes and the reason is logged. The agent never holds write access to contracts, clauses, or matter data. In legal work the redline is the product: a change without an author and an acceptor is not a redline, it is a liability.",
    visual: "solutions/legal/agent",
  },

  inProduction: {
    kicker: "In production",
    heading: "Legal teams, in production.",
    body: "Customers in this space include contract, CLM, and legal ops platforms running counsel, partner, and client review on redlines and sign-off inside their own products. They embed clause-anchored comments, suggestion-mode redlining, approval chains, and the attributed clause history their clients ask for in a dispute, instead of round-tripping redlines through emailed Word files.",
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "See it running in products like yours.",
      microcopy: "30 minutes, with an engineer, not a sales deck.",
      cta: cta("Book Demo", "/book-demo"),
    },
    visual: "solutions/legal/in-production",
  },

  compliance: {
    kicker: "Compliance",
    heading: "Built for the matter that bills for discretion.",
    lead: "This buyer's customers bill for discretion, so the strip leads with confidentiality.",
    items: keyed(
      [
        {
          title: "Confidentiality by construction of access",
          body: "Per-thread visibility scopes keep deal-team deliberation off the client's screen, and notifications generate only for documents and threads a user can access. Scoping decides what crosses the matter line.",
        },
        {
          title: "Residency for client data",
          body: "Data residency options including the EU; self-host data providers keep comment and suggestion content plus user PII on your infrastructure, and Velt stores minimal identifiers.",
          link: cta("Self-hosting", "/self-hosting"),
        },
        {
          title: "The audit answer",
          body: "SOC 2 Type II, with an attributed record of who changed and approved every clause, exportable for disputes and client audits.",
          link: cta("Governance", "/governance"),
        },
      ],
      "vspComplianceItem",
    ),
    note: "Certifications and qualifiers beyond SOC 2 Type II are verified before they render.",
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions from legal teams.",
    items: keyed(
      [
        {
          question: "Can redlining happen inside our product instead of round-tripping Word files?",
          answer:
            "Yes. Proposed language lands inline on the exact clause as a pending suggestion showing current and proposed text; the reviewer accepts or rejects each one like a diff, with a reason on reject. Accept fires an event and your code applies the language, so nothing changes the contract without a name attached. Works in supported editors and your own custom components. Suggestions is in beta.",
        },
        {
          question: "Do comments stay pinned to the right clause as the contract changes?",
          answer:
            "Yes. Threads anchor to the content itself, with robust anchoring to text and complex elements, so the comment on clause 7 stays on clause 7 as the draft moves. If a suggestion's target disappears before review, it goes stale instead of applying.",
        },
        {
          question: "Can an approval chain run counsel to partner to client?",
          answer:
            "Yes, when the client's approver is a user in your product. The workflow routes steps in order, counsel to partner to the client's signer, with quorum available where two partners must approve; every decision is timestamped and attributed. Internal-only threads never reach the client. Approval flows is in beta.",
        },
        {
          question: "Can the client ever see our internal comments?",
          answer:
            "No, not when threads are scoped. Any thread can be limited to the author, the team, or specific people, and notifications generate only for what a user can access. The client sees the shared thread move; the deal team's deliberation never reaches their inbox.",
        },
        {
          question: "Partners review from phones between meetings. Does this work on mobile?",
          answer:
            "Yes. Velt is optimized for mobile web, works inside WebViews in native apps, and pure native apps can integrate through the REST APIs with your own native UI.",
        },
        {
          question: "How is this priced when matters spike and go quiet?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, so a quiet matter costs nothing and a busy closing does not multiply per-user fees. There is a free tier for development and early production.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Redlines on the clause, sign-off up the chain. Every change to every contract, attributed.",
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
