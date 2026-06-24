#!/usr/bin/env node
/**
 * Seed the solutionPageV1-sales-enablement document in Sanity so it renders at
 * /for/sales-enablement via app/for/[slug]/page.tsx.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-solution-sales-enablement.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-solution-sales-enablement.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *visual / preview field references a
 * key wired in components/feature-new/demo-presets/solutions-sales-enablement.tsx.
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
  _id: "solutionPageV1-sales-enablement",
  _type: "solutionPageV1",
  title: "Sales enablement",
  slug: { _type: "slug", current: "sales-enablement" },
  breadcrumbLabel: "Sales enablement",
  metaTitle: "Review and approval for sales enablement | Velt",
  metaDescription:
    "Add review workflows, approvals, and audit trails to content production and sales enablement platforms. Embeddable SDK.",

  hero: {
    kicker: "For sales enablement",
    title: "The deck, the email, the landing page: reviewed and approved inside your product.",
    secondary:
      "Content platforms live and die on review cycles: brand, legal, and client approval on every asset. Velt puts that loop inside your platform: comments on decks and emails, approval chains with quorum, AI first-pass brand and compliance checks, and an audit trail for regulated clients.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    visual: "solutions/sales-enablement/hero",
  },

  logoStrip: {
    label: "Customers in this space include email creation and sales enablement platforms.",
    migration: {
      label: "See how content platforms run review on Velt:",
      links: keyed([cta("Customers", "/customers"), cta("Examples", "/examples")]),
    },
  },

  reviewReality: {
    kicker: "The review reality",
    heading: "Where campaign reviews actually stall.",
    items: [
      "Client feedback on the deck arrives as annotated screenshots and reply-all email, because threads, mentions, and anchoring in your own platform are a two-quarter build that keeps slipping.",
      "An enterprise prospect asks whether their legal team can sign off on every email before it sends, and the honest answer is a workflow engine you would have to build to close the deal.",
      "A bank or pharma client asks who approved last quarter's campaign, and the proof is a forwarded email, a screenshot, and a Slack thread someone deleted.",
      "Your AI already drafts emails and checks brand guidelines, but enterprise buyers will not turn it on while nothing sits between the AI and the client's content.",
    ],
    close: "Every one of these is the review loop living outside your product. Below is what it looks like inside.",
  },

  theLoop: {
    kicker: "The loop",
    heading: "One campaign email, draft to client-approved.",
    body: "Velt runs a campaign email through the full review loop inside your platform: comment threads on the draft, an AI first pass against the client's brand guidelines, a staged approval chain that ends with the client, and an audit record of every decision. Both humans and agents act through the same primitives; nothing changes without a human accepting it.",
    beats: keyed(
      [
        {
          num: "1",
          title: "The draft",
          body: "A marketer finishes a promo email for a bank client in your email builder and @mentions the brand lead on the subject line: \u201CToo close to the competitor's tagline?\u201D The thread anchors to the subject line itself, not to a screenshot of it.",
          visual: "solutions/sales-enablement/loop/1",
          links: keyed([cta("Comments", "/comments")]),
        },
        {
          num: "2",
          title: "Agent first pass",
          body: "A review agent checks the draft against the client's brand guidelines and disclosure rules and leaves three findings as comments anchored to the exact elements: the CTA button is off the client's palette, the APR claim is missing its required disclaimer, the footer carries an outdated logo. Each finding has a suggested fix with Approve and Reject.",
          visual: "solutions/sales-enablement/loop/2",
          links: keyed([cta("Review agents", "/review-agents")]),
        },
        {
          num: "3",
          title: "The consent step",
          body: "The marketer accepts the disclaimer fix and the text change applies as a suggestion; she rejects the logo finding because the client signed off on that version last week. Nothing reaches the email that a human does not accept. With Memory, the agent reads that rejection and stops re-flagging the logo.",
          visual: "solutions/sales-enablement/loop/3",
          links: keyed([cta("Suggestions", "/suggestions"), cta("Memory", "/memory")]),
        },
        {
          num: "4",
          title: "The approval chain",
          beta: true,
          body: "The email enters the chain the agency defined in your UI on Velt's approval APIs: brand review, then legal, then the client's approver. Each reviewer is notified in-app, by email, or in Slack, and the chain does not advance while comments on the draft stay unresolved.",
          visual: "solutions/sales-enablement/loop/4",
          links: keyed([cta("Approval flows", "/approval-flows"), cta("Notifications", "/notifications")]),
        },
        {
          num: "5",
          title: "The record",
          body: "The client clicks Approve and the email is cleared to send, with a timestamped record of who was asked, who approved, what the agent flagged, and what changed. The next audit question is answered before it is asked.",
          visual: "solutions/sales-enablement/loop/5",
          links: keyed([cta("Audit trail", "/audit-trail")]),
        },
      ],
      "vspLoopBeat",
    ),
    caption:
      "// one email, five steps, one record. Brand, legal, and the client never leave your product.",
  },

  featureMap: {
    kicker: "Feature map",
    heading: "What sales enablement teams buy first.",
    support: "Each card links to its feature page. Preview the UI, or read the code that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Comments",
          oneLiner:
            "Threads on the deck, the email, the landing page, anchored to the slide, the subject line, the hero image. Brand, legal, and the client comment on the asset, not on a screenshot of it.",
          link: cta("Explore Comments", "/comments"),
          code: "<VeltComments />",
          preview: "solutions/sales-enablement/fm/comments",
        },
        {
          num: "02",
          name: "Approval flows",
          beta: true,
          oneLiner:
            "Your users define the chain in your UI on Velt's APIs: brand, then legal, then the client, with quorum and reject paths. Campaign sign-off becomes a feature, not an email ritual.",
          link: cta("Explore Approval flows", "/approval-flows"),
          code: "<VeltApprovalFlow\n  stages={[\"brand\", \"legal\", \"client\"]}\n/>",
          preview: "solutions/sales-enablement/fm/approval-flows",
        },
        {
          num: "03",
          name: "Review agents",
          oneLiner:
            "An AI first pass on every campaign asset: off-brand colors, missing disclaimers, outdated logos, claims that need legal. Findings land as comments a human accepts or rejects.",
          link: cta("Explore Review agents", "/review-agents"),
          code: "velt.addReviewAgent({\n  instructions: \"flag off-brand colors\",\n});",
          preview: "solutions/sales-enablement/fm/review-agents",
        },
        {
          num: "04",
          name: "Suggestions",
          oneLiner:
            "Copy edits proposed inline on the email draft, accepted or rejected like a diff. The consent step between an agent's rewrite and the client's brand.",
          link: cta("Explore Suggestions", "/suggestions"),
          code: "<VeltSuggestions />",
          preview: "solutions/sales-enablement/fm/suggestions",
        },
        {
          num: "05",
          name: "Audit trail",
          oneLiner:
            "An exportable record of who approved every deck, email, and landing page, what changed, and when. The answer for bank and pharma clients who audit their agencies.",
          link: cta("Explore Audit trail", "/audit-trail"),
          code: "POST /v2/activities/get\n{ \"data\": { \"documentId\": \"promo-email\" } }",
          preview: "solutions/sales-enablement/fm/audit-trail",
        },
        {
          num: "06",
          name: "Notifications",
          oneLiner:
            "Approval requests reach reviewers in-app, by email, or in Slack before the launch date slips. Batching, routing, and per-user preferences for reviewers who live in their inbox.",
          link: cta("Explore Notifications", "/notifications"),
          code: "<VeltNotificationsTool />",
          preview: "solutions/sales-enablement/fm/notifications",
        },
      ],
      "vspFeatureCard",
    ),
  },

  agentLayer: {
    kicker: "Agent action layer",
    heading: "Agents draft. Your users and their clients decide.",
    body: "In sales enablement the stake is the client's brand. An email that reaches a bank's customers with the wrong disclaimer, or a deck that misquotes the client's pricing, is not a bug ticket; it is a fired agency. So every agent action in Velt arrives as a proposal: the generated subject line variant, the brand fix, the rewritten claim, each one a comment or suggestion with Approve and Reject attached. On approve, the change applies through your webhook with a permanent record of who allowed what; on reject, nothing touches the asset and the rejection is logged. The agent never holds write access to client content. With Memory, agents also read what this team already settled, so the tagline the client approved in March stops getting re-flagged in June.",
    visual: "solutions/sales-enablement/agent",
  },

  inProduction: {
    kicker: "In production",
    heading: "Sales enablement teams, in production.",
    body: "Customers in this space include email creation and sales enablement platforms running brand, legal, and client review on decks, emails, and landing pages inside their own products. They embed comments, approval chains, and the audit export their regulated clients ask for, instead of routing campaign sign-off through forwarded email.",
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "See it running in platforms like yours.",
      microcopy: "30 minutes, with an engineer, not a sales deck.",
      cta: cta("Book Demo", "/book-demo"),
    },
    visual: "solutions/sales-enablement/in-production",
  },

  compliance: {
    kicker: "Compliance",
    heading: "Built for the client's unannounced launch.",
    lead: "Your customers' campaigns are their clients' unannounced launches. The strip leads with isolation.",
    items: keyed(
      [
        {
          title: "Internal stays internal",
          body: "Comment visibility scopes per thread: only me, my team, or specific people. The agency's debate about the client's feedback never renders for the client.",
        },
        {
          title: "Content on your infrastructure",
          body: "Per-feature data providers keep decks, emails, comment content, and user PII on your infrastructure; Velt stores minimal identifiers.",
          link: cta("Self-hosting", "/self-hosting"),
        },
        {
          title: "SOC 2 Type II, audit export",
          body: "The exportable approval record per asset is what regulated clients' vendor reviews ask for.",
          link: cta("Governance", "/governance"),
        },
      ],
      "vspComplianceItem",
    ),
    note: "Certifications and qualifiers beyond SOC 2 Type II are verified before they render.",
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions from sales enablement teams.",
    items: keyed(
      [
        {
          question: "Can our clients approve a deck or an email without logging into a separate tool?",
          answer:
            "Client approvers act inside your product: the approval request reaches them by email or Slack with a link to the asset, and approve or reject happens on the asset itself, recorded.",
        },
        {
          question: "Can we keep internal comments hidden from the client?",
          answer:
            "Yes. Comment visibility is scoped per thread: only me, my team, or specific people. Internal debate about the client's brand feedback stays invisible to the client reviewing the same asset.",
        },
        {
          question: "Can an AI check every email against a client's brand guidelines before a human looks?",
          answer:
            "Yes. Review agents take plain English instructions, for example \u201Cflag off-brand colors, missing disclaimers, and outdated logos,\u201D and leave findings as comments with suggested fixes a human accepts or rejects.",
        },
        {
          question: "What do we show a bank or pharma client who audits campaign approvals?",
          answer:
            "An exportable record per asset: who was asked, who approved, what the AI flagged, what changed, and when. Records are queryable by document, user, workflow, or time range.",
        },
        {
          question: "Our emails and landing pages are built in a custom drag-and-drop builder. Does this work there?",
          answer:
            "Yes. Comments, suggestions, and approvals anchor to elements, not to editors, so they work in custom builders and canvases, with prebuilt setups for Tiptap, CodeMirror, and 10 other editor libraries.",
        },
        {
          question: "How does pricing work for a platform with thousands of campaign assets?",
          answer:
            "Usage-based on monthly active documents: you pay for the decks, emails, and pages that had review activity in a month, not per seat and not per asset stored. There is a free tier for development and early production.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "The deck, the email, the landing page: reviewed and approved inside your product.",
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
