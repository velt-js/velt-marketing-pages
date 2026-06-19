#!/usr/bin/env node
/**
 * Seed the solutionPageV1-fintech document in Sanity so it renders at
 * /for/fintech via app/for/[slug]/page.tsx.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-solution-fintech.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-solution-fintech.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *visual / preview field references a
 * key wired in components/feature-new/demo-presets/solutions-fintech.tsx.
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
  _id: "solutionPageV1-fintech",
  _type: "solutionPageV1",
  title: "Fintech and FP&A",
  slug: { _type: "slug", current: "fintech" },
  breadcrumbLabel: "Fintech and FP&A",
  metaTitle: "Review and approval for fintech and FP&A | Velt",
  metaDescription:
    "Approval workflows, audit trails, and review agents for financial products where nothing ships unapproved. SOC 2, HIPAA.",

  hero: {
    kicker: "For fintech and FP&A",
    title: "Cell-level review and staged sign-off for budgets, forecasts, and models.",
    secondary:
      "Numbers ship with names attached. Velt embeds cell-level comments, approval chains with quorum, immutable audit records, and review agents for mechanical checks in products selling into regulated finance.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    visual: "solutions/fintech/hero",
  },

  logoStrip: {
    label: "Customers in this space include FP&A, budgeting, and financial modeling platforms.",
    migration: {
      label: "See how finance platforms run review on Velt:",
      links: keyed([cta("Customers", "/customers"), cta("Examples", "/examples")]),
    },
  },

  reviewReality: {
    kicker: "The review reality",
    heading: "Where the numbers wait on a name.",
    items: [
      "A regulated deal stalled on \u201Cwho approved this number?\u201D, and the answer was a reconstruction from old email threads.",
      "The security questionnaire asked how your product proves sign-off on the board pack. The honest answer was screenshots.",
      "The bank's vendor review stalled on \u201Cwhere does our data live?\u201D, and your roadmap had no field-level answer.",
      "An enterprise buyer asked for approval workflows on budgets, and the close calendar could not wait for the quarter it would take to build.",
    ],
    close:
      "If review is your product itself, policy management, regulatory filing, risk and attestation platforms, that page is /for/compliance. This page is for products where the numbers are the work: budgets, forecasts, models, the close.",
  },

  theLoop: {
    kicker: "The loop",
    heading: "One quarterly forecast, first comment to audit-ready record.",
    body: "Velt runs a quarterly forecast through the full review loop inside your product: comment threads on the cell, a review agent's mechanical first pass, a staged approval chain with committee quorum, and an immutable record of every decision. Both humans and agents act through the same primitives, and nothing in the model changes without a human accepting it.",
    beats: keyed(
      [
        {
          num: "1",
          title: "Cell comments",
          body: "The analyst submits the forecast. The CFO's question about Q3 lands on the Q3 cell itself: threaded, attributed, resolvable. Threads anchor to spreadsheet cells and tables, so feedback never detaches from the number it is about.",
          visual: "solutions/fintech/loop/1",
          links: keyed([cta("Comments", "/comments")]),
        },
        {
          num: "2",
          title: "Agent checks",
          body: "A review agent runs the mechanical pass: variance thresholds, tie-outs between sheets, rates against contract, missing variance notes. Findings land as cell comments with Approve and Reject attached. Nothing in the model changes.",
          visual: "solutions/fintech/loop/2",
          links: keyed([cta("Review agents", "/review-agents")]),
        },
        {
          num: "3",
          title: "Staged sign-off with quorum",
          body: "The forecast enters the approval chain your product's users defined: the FP&A lead first, then a two-of-three finance committee quorum, then the CFO. Comment-gated steps hold the pipeline until every open cell thread resolves, and a reject branches it back with the note attached.",
          visual: "solutions/fintech/loop/3",
          links: keyed([cta("Approval flows", "/approval-flows"), cta("Notifications", "/notifications")]),
        },
        {
          num: "4",
          title: "Immutable audit record",
          body: "Every transition is timestamped and attributed: who was asked, who responded, what they decided. The auditor's sample request is a filtered API query that returns the complete chain, and the audit package assembles from the trail, not from old email threads.",
          visual: "solutions/fintech/loop/4",
          links: keyed([cta("Audit trail", "/audit-trail")]),
        },
      ],
      "vspLoopBeat",
    ),
    caption:
      "// one forecast, four steps, one immutable record. The committee signs off without leaving your product.",
  },

  featureMap: {
    kicker: "Feature map",
    heading: "What finance teams buy first.",
    support: "Each card links its feature page. Preview the UI, or read the code that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Audit trail",
          oneLiner:
            "Every approval on a budget, forecast, or model, timestamped and attributed. The auditor's sample request is a query, not an investigation.",
          link: cta("Explore Audit trail", "/audit-trail"),
          code: "GET /v2/activities?document=q3-forecast",
          preview: "solutions/fintech/fm/audit-trail",
        },
        {
          num: "02",
          name: "Approval flows",
          beta: true,
          oneLiner:
            "Staged sign-off your users define in your UI on Velt's APIs: sequential steps, committee quorum, rejection paths. The close calendar runs as a pipeline, recorded.",
          link: cta("Explore Approval flows", "/approval-flows"),
          code: "<VeltApprovalFlow\n  stages={[\"fp&a\", \"committee\", \"cfo\"]}\n/>",
          preview: "solutions/fintech/fm/approval-flows",
        },
        {
          num: "03",
          name: "Comments",
          oneLiner:
            "Threads on the cell, not about it. The question about Q3 sits on the Q3 cell: attributed, resolved, on the record.",
          link: cta("Explore Comments", "/comments"),
          code: "<VeltComments />",
          preview: "solutions/fintech/fm/comments",
        },
        {
          num: "04",
          name: "Self-hosted data",
          oneLiner:
            "Comment content on budgets and forecasts persists to your database; Velt keeps minimal identifiers. The vendor security review gets a field-level inventory, not a promise.",
          link: cta("Explore Self-hosting", "/self-hosting"),
          code: "velt.setDataProvider(\"comments\")",
          preview: "solutions/fintech/fm/self-hosting",
        },
        {
          num: "05",
          name: "Review agents",
          oneLiner:
            "The mechanical pass before a human looks: variance thresholds, tie-outs, rates against contract. Findings land as cell comments a reviewer accepts or rejects.",
          link: cta("Explore Review agents", "/review-agents"),
          code: "velt.addReviewAgent({\n  instructions: \"flag variance over plan\",\n});",
          preview: "solutions/fintech/fm/review-agents",
        },
        {
          num: "06",
          name: "Memory",
          beta: true,
          oneLiner:
            "Past decisions surface as precedent, so close number ten is reviewed like close number one, even as the finance team turns over.",
          link: cta("Explore Memory", "/memory"),
          code: "<VeltMemory />",
          preview: "solutions/fintech/fm/memory",
        },
      ],
      "vspFeatureCard",
    ),
  },

  agentLayer: {
    kicker: "Agent action layer",
    heading: "Agents check the numbers. Your users sign them.",
    body: "In a financial product the stakes are the forecast, the model, and your customer's capital, so no agent holds write access to any of them. An agent finding arrives as a comment with the proposed action attached: \u201CVendor rate is 12% over contract. Suggest correcting line 7.\u201D A named human approves or rejects. On approve, the change applies through your webhook with a permanent record of who allowed what; on reject, nothing happens and the rejection is logged. For higher-stakes actions, a journal adjustment or a close entry, escalate the consent: from one click, to committee quorum, to type-the-name confirmation.",
    visual: "solutions/fintech/agent",
  },

  inProduction: {
    kicker: "In production",
    heading: "Fintech and FP&A teams, in production.",
    body: "Customers in this space include FP&A, budgeting, and financial modeling platforms running cell-level review, staged sign-off, and audit records on budgets, forecasts, and models inside their own products. They embed comments, approval chains with quorum, and the audit query their regulated buyers ask for, instead of reconstructing who approved what from old email threads.",
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "See it running in products like yours.",
      microcopy: "30 minutes, with an engineer, not a sales deck.",
      cta: cta("Book Demo", "/book-demo"),
    },
    visual: "solutions/fintech/in-production",
  },

  compliance: {
    kicker: "Compliance",
    heading: "Built for the bank's vendor review.",
    lead: "Your buyers sell into regulated finance, so the strip leads with the certifications their vendor review asks for first.",
    items: keyed(
      [
        {
          title: "SOC 2 Type II",
          body: "The report is available under NDA, the evidence the bank's vendor review opens with before it looks at anything else.",
          link: cta("Governance", "/governance"),
        },
        {
          title: "HIPAA support, with BAA",
          body: "HIPAA support with a Business Associate Agreement for products that touch protected information alongside the numbers.",
        },
        {
          title: "Data on your infrastructure",
          body: "EU data residency options, and per-feature data providers that keep comment content on budgets and forecasts on your infrastructure while Velt keeps minimal identifiers.",
          link: cta("Self-hosting", "/self-hosting"),
        },
      ],
      "vspComplianceItem",
    ),
    note: "Article 14 of the EU AI Act requires demonstrable human oversight for high-risk AI systems under Annex III, credit and insurance among them, enforceable from August 2, 2026. If your product or your customers operate in that scope, Velt provides the mechanism, approval before action, and the evidence, a record of who approved what, when, and why. Talk to your counsel about whether you are in scope.",
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions from fintech and FP&A teams.",
    items: keyed(
      [
        {
          question: "Can comment data stay on our infrastructure?",
          answer:
            "Yes. Register the comments data provider and thread content on budgets, forecasts, and models persists to your database; Velt stores only minimal structural identifiers. The Complete Field Inventory documents every persisted field on both sides, ready for the vendor security review. See /self-hosting.",
        },
        {
          question: "Can we prove to an auditor who approved a budget or a forecast?",
          answer:
            "Comments, edits, and approval state changes are recorded automatically and queryable by document, user, or time range through the REST API, exportable as structured JSON. Approval records capture who was asked, who responded, and what they decided, with the note attached. See /audit-trail.",
        },
        {
          question: "Do comments work at the cell level?",
          answer:
            "Yes. Threads anchor to spreadsheet cells and tables, charts, documents, and your own grid components, so the question about Q3 sits on the Q3 cell, attributed and resolved on the record. See /comments.",
        },
        {
          question: "Can sign-off require more than one approver?",
          answer:
            "Yes. Workflows support sequential and parallel steps and quorum rules, two of three must approve, with rejection paths and a full history per run. Approval flows is in beta. See /approval-flows.",
        },
        {
          question: "Does this satisfy EU AI Act Article 14?",
          answer:
            "Article 14 applies to high-risk AI systems defined in Annex III, credit and insurance among them, enforceable from August 2, 2026; it is not a universal obligation on every AI feature. If your product or your customers operate in that scope, Velt provides the oversight mechanism and the audit evidence. Talk to your counsel about whether you are in scope; see /governance.",
        },
        {
          question: "How is Velt priced for an FP&A or fintech platform?",
          answer:
            "Usage-based on monthly active documents: you pay for the workbooks, models, and board packs with review activity in a month, not per seat. There is a free tier for development and early production.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Cell-level review and staged sign-off for budgets, forecasts, and models.",
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
