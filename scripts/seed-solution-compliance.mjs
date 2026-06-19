#!/usr/bin/env node
/**
 * Seed the solutionPageV1-compliance document in Sanity so it renders at
 * /for/compliance via app/for/[slug]/page.tsx.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-solution-compliance.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-solution-compliance.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *visual / preview field references a
 * key wired in components/feature-new/demo-presets/solutions-compliance.tsx.
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
  _id: "solutionPageV1-compliance",
  _type: "solutionPageV1",
  title: "Compliance",
  slug: { _type: "slug", current: "compliance" },
  breadcrumbLabel: "Compliance",
  metaTitle: "Review and approval for compliance platforms | Velt",
  metaDescription:
    "Staged sign-off, immutable audit records, and AI first-pass checks for products where review is the regulated control itself.",

  hero: {
    kicker: "For compliance",
    title: "Every policy, filing, and attestation, signed and examiner-ready.",
    secondary:
      "In policy management, regulatory filing, and risk and attestation platforms, review is the regulated control itself. Velt embeds that control in your product: staged sign-off with quorum, immutable audit records that export for examiners, and review agents for the mechanical checks.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    visual: "solutions/compliance/hero",
  },

  logoStrip: {
    label:
      "Customers in this space include policy management, regulatory filing, and risk and attestation platforms.",
    migration: {
      label: "See how regulated platforms run review on Velt:",
      links: keyed([cta("Customers", "/customers"), cta("Examples", "/examples")]),
    },
  },

  reviewReality: {
    kicker: "The review reality",
    heading: "When the examiner asks, the answer is archaeology.",
    items: [
      "A filing went out with a stale disclaimer because the check lived in a reviewer's head, not in the product.",
      "The examiner asked who approved a disclosure, and the answer was a reconstruction from email threads and meeting notes.",
      "Your buyer's procurement asked whether you support staged sign-off with quorum, and the honest answer was a roadmap slide.",
      "The same disclaimer language got re-litigated three quarters in a row because the reviewers who settled it left.",
    ],
    close:
      "If your product carries policies, filings, or attestations that a named person is accountable for approving, this page is for you.",
  },

  theLoop: {
    kicker: "The loop",
    heading: "One filing, from first draft to examiner export.",
    body: "Velt runs one quarterly disclosure filing through the full review loop inside your product: an agent first pass on the mechanical checks, comment threads that resolve on the filing itself, staged quorum sign-off, an immutable record, and an examiner export. Both humans and agents act through the same primitives; nothing advances until a named person signs it.",
    beats: keyed(
      [
        {
          num: "1",
          title: "The filing lands",
          body: "A quarterly disclosure filing is drafted in your product, with the controls it attests to linked on the record so the review and the thing being reviewed live in one place.",
          visual: "solutions/compliance/loop/1",
          links: keyed([cta("Comments", "/comments")]),
        },
        {
          num: "2",
          title: "Agent first pass",
          body: "A review agent checks disclaimers, PII, and policy references and leaves each finding as a comment pinned to the exact line: \u201CRequired risk disclaimer missing for this product class.\u201D Approve and Reject are attached; the finding is a proposal, and a human decides.",
          visual: "solutions/compliance/loop/2",
          links: keyed([cta("Review agents", "/review-agents")]),
        },
        {
          num: "3",
          title: "Comments resolve on the artifact",
          body: "The compliance officer answers the flagged disclosure line in a thread on the filing itself, with internal deliberation scoped to the team. A workflow step can require all comments resolved before the filing advances, and Memory keeps what was settled from being re-flagged.",
          visual: "solutions/compliance/loop/3",
          links: keyed([cta("Comments", "/comments"), cta("Memory", "/memory")]),
        },
        {
          num: "4",
          title: "Staged quorum sign-off",
          body: "The workflow routes the filing: the analyst submits, the compliance officer approves, then a quorum group where two of three officers must sign. Approve advances it, reject routes it back, and every transition is timestamped and attributed.",
          visual: "solutions/compliance/loop/4",
          links: keyed([cta("Approval flows", "/approval-flows"), cta("Notifications", "/notifications")]),
        },
        {
          num: "5",
          title: "The immutable record",
          body: "Each finding, reply, and sign-off is captured automatically as it happens; immutability is on by default for new accounts, so the evidence stands even when the content it describes changes.",
          visual: "solutions/compliance/loop/5",
          links: keyed([cta("Audit trail", "/audit-trail")]),
        },
        {
          num: "6",
          title: "Examiner export",
          body: "The full chain pulls through the Get Activity Logs REST API as structured JSON, filtered by document, user, or time range, so the answer the examiner asks for is already assembled.",
          visual: "solutions/compliance/loop/6",
          links: keyed([cta("Audit trail", "/audit-trail")]),
        },
      ],
      "vspLoopBeat",
    ),
    caption:
      "// one filing, six steps, one examiner-ready export. Nothing advances until a named person signs it.",
  },

  featureMap: {
    kicker: "Feature map",
    heading: "What compliance platforms buy first.",
    support: "Each card links its feature page. Preview the UI, or read the code that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Audit trail",
          oneLiner:
            "Who approved the filing, who signed the attestation, what the disclosure said when they signed: queryable by document, user, or time range, and exportable when the examiner asks.",
          link: cta("Explore Audit trail", "/audit-trail"),
          code: "GET /v2/activities?document=FIL-2209",
          preview: "solutions/compliance/fm/audit-trail",
        },
        {
          num: "02",
          name: "Approval flows",
          beta: true,
          oneLiner:
            "Staged sign-off with quorum: two of three compliance officers must approve before the filing advances, and reject routes it back with every prior attempt on the record.",
          link: cta("Explore Approval flows", "/approval-flows"),
          code: "<VeltApprovalFlow\n  stages={[\"analyst\", \"officer\", \"quorum\"]}\n/>",
          preview: "solutions/compliance/fm/approval-flows",
        },
        {
          num: "03",
          name: "Review agents",
          oneLiner:
            "First-pass checks on disclaimers, PII, and policy references, landing as comments a compliance officer accepts or rejects. Mechanical checks before human judgment.",
          link: cta("Explore Review agents", "/review-agents"),
          code: "velt.addReviewAgent({\n  instructions: \"flag missing risk disclaimers\",\n});",
          preview: "solutions/compliance/fm/review-agents",
        },
        {
          num: "04",
          name: "Comments",
          oneLiner:
            "Threads pinned to the policy section, the disclosure line, the control. Deliberation scoped to the team; the resolution stays on the artifact.",
          link: cta("Explore Comments", "/comments"),
          code: "<VeltComments />",
          preview: "solutions/compliance/fm/comments",
        },
        {
          num: "05",
          name: "Memory",
          beta: true,
          oneLiner:
            "Settled disclaimer language stays settled: past decisions surface as precedent, and agents stop re-flagging what reviewers already cleared.",
          link: cta("Explore Memory", "/memory"),
          code: "<VeltMemory />",
          preview: "solutions/compliance/fm/memory",
        },
      ],
      "vspFeatureCard",
    ),
  },

  agentLayer: {
    kicker: "Agent action layer",
    heading: "Agents check the filing. A human signs it.",
    body: "An agent that checks every disclosure against the policy library is a tireless first-pass reviewer. An agent that edits the filing on its own is a regulatory finding waiting to happen. In Velt, every agent finding lands as a comment with Approve and Reject attached. On approve, the fix applies through your webhook with a permanent record of who allowed it; on reject, nothing changes and the rejection is logged. The agent never holds write access to policies, filings, or attestations. In compliance the stakes are the control itself: if AI can change the artifact without a name attached, the review your product sells stops being evidence.",
    visual: "solutions/compliance/agent",
  },

  inProduction: {
    kicker: "In production",
    heading: "Compliance platforms, in production.",
    body: "In policy management, regulatory filing, and risk and attestation platforms, review is the product's regulated control. Velt embeds staged sign-off, immutable records, and an examiner export inside the product, so the evidence is captured as it happens instead of reconstructed from email threads after the examiner asks.",
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "See it running in products like yours.",
      microcopy: "30 minutes, with an engineer, not a sales deck.",
      cta: cta("Book Demo", "/book-demo"),
    },
    visual: "solutions/compliance/in-production",
  },

  compliance: {
    kicker: "Compliance",
    heading: "The review is the evidence.",
    lead: "This buyer resells review as a control, so the strip leads with the evidence answer.",
    items: keyed(
      [
        {
          title: "The evidence answer",
          body: "Every comment, approval, and rejection is captured automatically with who, what, and when; immutability is on by default for new accounts; and the record exports through the REST API. SOC 2 Type II.",
          link: cta("Governance", "/governance"),
        },
        {
          title: "EU AI Act, scoped",
          body: "Article 14 requires demonstrable human oversight for high-risk AI systems under Annex III (credit, insurance, hiring, critical infrastructure, and essential services among them), enforceable from August 2, 2026. For products in or selling into that scope, Velt provides the mechanism (approval before action) and the evidence (a record of who approved what). It never implies the Act covers all AI products.",
          link: cta("Governance", "/governance"),
        },
        {
          title: "Residency for regulated data",
          body: "Data residency options including EU; self-host data providers keep comment and review content plus user PII on your infrastructure, and Velt stores minimal identifiers.",
          link: cta("Self-hosting", "/self-hosting"),
        },
      ],
      "vspComplianceItem",
    ),
    note: "Certifications and qualifiers beyond SOC 2 Type II are verified before they render.",
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions from compliance teams.",
    items: keyed(
      [
        {
          question: "Our product is the system of record for regulated filings. Can Velt's records serve as examiner evidence?",
          answer:
            "The review layer is captured automatically: every comment, approval, and rejection with who, what, and when, queryable by document, user, or time range, and retrievable as structured JSON through the REST API. Immutability is on by default for new accounts, so records stand even when the content they describe changes.",
        },
        {
          question: "Can we require two of three compliance officers to sign before a filing advances?",
          answer:
            "Yes. Workflows support sequential and parallel steps, quorum rules (two of three must approve), conditional branching, and comment-gated steps that hold the filing until every thread resolves. Every transition is timestamped and attributed.",
        },
        {
          question: "Can AI run the disclaimer and PII checks without ever touching the filing?",
          answer:
            "Yes. A review agent's findings land as comments pinned to the exact line, each with Approve and Reject. On approve, the fix applies through your webhook with a record of who allowed it; on reject, nothing changes. The agent never holds write access to the filing.",
        },
        {
          question: "Our customers face EU AI Act obligations. Does this give them Article 14 evidence?",
          answer:
            "Article 14 applies to high-risk AI systems defined in Annex III (credit, insurance, hiring, critical infrastructure, and essential services among them), enforceable from August 2, 2026; it is not a universal obligation on every AI feature. If your product or your customers operate in that scope, Velt provides the mechanism (approval before action) and the evidence (a record of who approved what, when, and why). Talk to your counsel about whether you are in scope; see /governance.",
        },
        {
          question: "Our buyers are banks and insurers. Can review data stay on our infrastructure?",
          answer:
            "Cloud by default, with a hybrid model: self-host data providers keep comment and review content plus user PII on your infrastructure while Velt stores only minimal identifiers, with data residency options including EU. Velt is SOC 2 Type II audited and supports HIPAA workloads. See /self-hosting and /governance.",
        },
        {
          question: "How does pricing work when one filing is touched by a dozen reviewers?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, so a filing reviewed by twelve people costs the same as one reviewed by two. There is a free tier for development and early production.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Every policy, filing, and attestation, signed and examiner-ready.",
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
