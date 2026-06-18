#!/usr/bin/env node
/**
 * Seed the solutionPageV1-operations document in Sanity so it renders at
 * /solutions/operations via app/solutions/[slug]/page.tsx.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-solution-operations.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-solution-operations.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *visual / preview field references a
 * key wired in components/feature-new/demo-presets/solutions-operations.tsx.
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
  _id: "solutionPageV1-operations",
  _type: "solutionPageV1",
  title: "Operations",
  slug: { _type: "slug", current: "operations" },
  breadcrumbLabel: "Operations",
  metaTitle: "Review and approval for operations platforms | Velt",
  metaDescription:
    "Human sign-off on operational decisions: approval workflows, audit trails, and notifications for physical-world ops software.",

  hero: {
    kicker: "For physical-world operations",
    title: "Sign-off on the order, the shipment, the work order. On the record, on both sides of the handoff.",
    secondary:
      "Operational decisions in supply chain, logistics, and field work need human sign-off with a record, often across organizations. Velt puts that sign-off inside your product: approval workflows on the record and its fields, comments scoped to your team or the counterparty, and notifications that reach reviewers in the yard, not just at a desk.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    visual: "solutions/operations/hero",
  },

  logoStrip: {
    label: "Customers in this space include supply chain, logistics, and field operations platforms.",
    migration: {
      label: "See how operations platforms run review on Velt:",
      links: keyed([cta("Customers", "/customers"), cta("Examples", "/examples")]),
    },
  },

  reviewReality: {
    kicker: "The review reality",
    heading: "When the approval never reaches the yard.",
    items: [
      "A shipment sat at the dock for two days because the release approval sat unread in an inbox, with no way to escalate it inside your product.",
      "A counterparty read an internal note about their own rates, because your product has one comment stream for everyone instead of threads scoped to the team.",
      "The field crew never saw the inspection request, because they work from phones in a yard, not from a desk inside your web app.",
      "A customer audit asked who approved the substitution on the manifest, and the answer lived in a text thread on someone's phone.",
    ],
    close:
      "If your product moves orders, shipments, or work orders that someone in another organization has to sign, this page is for you.",
  },

  theLoop: {
    kicker: "The loop",
    heading: "One change order, two organizations, no phone tree.",
    body:
      "Velt runs one change order from filed to signed inside your product: a review agent first pass on the rate, comment threads scoped to each side, a staged approval chain that crosses the org line, notifications that reach the field, and an audit record of every decision. Both humans and agents act through the same primitives; nothing changes without a human accepting it.",
    beats: keyed(
      [
        {
          num: "1",
          title: "The change order lands",
          body:
            "The carrier cannot meet the delivery window, so the counterparty files a change order against the shipment record inside your product. The thread anchors to the record itself, not to an email about it.",
          visual: "solutions/operations/loop/1",
          links: keyed([cta("Approval flows", "/approval-flows")]),
        },
        {
          num: "2",
          title: "Agent first pass",
          body:
            "A review agent checks the change order against the contract terms and leaves a comment pinned to the rate line: the revised rate is 9% over the contracted lane rate, flagged for commercial review. Approve and Reject are attached; the finding is advisory, and a human decides.",
          visual: "solutions/operations/loop/2",
          links: keyed([cta("Review agents", "/review-agents")]),
        },
        {
          num: "3",
          title: "Scoped comments",
          body:
            "Two threads live on the same record. The internal thread, badged internal, debates absorbing the cost versus disputing the rate, and the counterparty cannot see it. The shared thread asks the counterparty to confirm the new delivery date, and they reply in your product instead of in an email chain about it.",
          visual: "solutions/operations/loop/3",
          links: keyed([cta("Comments", "/comments")]),
        },
        {
          num: "4",
          title: "The approval chain across two orgs",
          body:
            "The workflow routes the record: the ops lead approves, commercial approves the rate exception, then the counterparty's signer records the final decision. Both sides are users your product provisioned with access to this record, and every transition is timestamped and attributed.",
          visual: "solutions/operations/loop/4",
          links: keyed([cta("Approval flows", "/approval-flows"), cta("Notifications", "/notifications")]),
        },
        {
          num: "5",
          title: "Notifications reach the field",
          body:
            "The site supervisor gets the request by email, opens the record on mobile web, and approves from the yard. The counterparty's signer is notified of the shared thread and their step only, because notifications generate solely for what each user can access.",
          visual: "solutions/operations/loop/5",
          links: keyed([cta("Notifications", "/notifications")]),
        },
        {
          num: "6",
          title: "The audit record",
          body:
            "The full chain sits in one place: who was asked, who decided, and what changed on the record, queryable by document, user, or time range, and exportable when the customer audit comes.",
          visual: "solutions/operations/loop/6",
          links: keyed([cta("Audit trail", "/audit-trail")]),
        },
      ],
      "vspLoopBeat",
    ),
    caption:
      "// one change order, six steps, one record. Both orgs sign off without leaving your product.",
  },

  featureMap: {
    kicker: "Feature map",
    heading: "What operations platforms buy first.",
    support: "Each card links its feature page. Preview the UI, or read the code that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Approval flows",
          beta: true,
          oneLiner:
            "Release chains, rate exceptions, and change order sign-off: your customer's steps first, the counterparty's signer last. Approve advances the record; reject routes it back with every prior attempt attached.",
          link: cta("Explore Approval flows", "/approval-flows"),
          code: "<VeltApprovalFlow\n  stages={[\"ops\", \"commercial\", \"counterparty\"]}\n/>",
          preview: "solutions/operations/fm/approval-flows",
        },
        {
          num: "02",
          name: "Comments",
          oneLiner:
            "Threads on the order, the manifest, and the field record. Internal deliberation stays scoped to the team; the counterparty reads only the thread meant for them.",
          link: cta("Explore Comments", "/comments"),
          code: "<VeltComments />",
          preview: "solutions/operations/fm/comments",
        },
        {
          num: "03",
          name: "Notifications",
          oneLiner:
            "The sign-off request leaves the building: in-app for dispatch, email for the yard, access-filtered so each organization sees only its own activity.",
          link: cta("Explore Notifications", "/notifications"),
          code: "<VeltNotificationsTool />",
          preview: "solutions/operations/fm/notifications",
        },
        {
          num: "04",
          name: "Audit trail",
          oneLiner:
            "Who released the hold, who approved the substitution, and what changed on the manifest, queryable by record, user, or time range, and exportable when the customer audit lands.",
          link: cta("Explore Audit trail", "/audit-trail"),
          code: "GET /v2/activities?document=ship-4127",
          preview: "solutions/operations/fm/audit-trail",
        },
        {
          num: "05",
          name: "Presence",
          oneLiner:
            "See who is in the work order right now, your dispatcher or theirs, before two people release the same hold.",
          link: cta("Explore Presence", "/presence"),
          code: "<VeltPresence />",
          preview: "solutions/operations/fm/presence",
        },
      ],
      "vspFeatureCard",
    ),
  },

  agentLayer: {
    kicker: "Agent action layer",
    heading: "Agents flag the manifest. A human releases the truck.",
    body:
      "An agent that reconciles a manifest against the order is a tireless first-pass reviewer. An agent that corrects the manifest on its own is a liability with a loading dock. In Velt, every agent finding lands as a comment with Approve and Reject attached. On approve, the correction applies through your webhook with a permanent record of who allowed it; on reject, nothing moves and the rejection is logged. The agent never holds write access to orders, inventory, or the counterparty's data. The stakes in operations are physical: a bad automated write is not a rollback, it is a truck at the wrong dock, a crew on the wrong site, a counterparty reading a number they were never meant to see.",
    visual: "solutions/operations/agent",
  },

  inProduction: {
    kicker: "In production",
    heading: "Operations teams, in production.",
    body:
      "Operations platforms run sign-off on orders, shipments, work orders, and change orders across organizations, where the reviewer is often in a yard, a truck, or a job site rather than at a desk. They embed approval chains, visibility-scoped comments, and the audit export their customers' auditors ask for, instead of routing release decisions through phone trees and forwarded email.",
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "See it running in products like yours.",
      microcopy: "30 minutes, with an engineer, not a sales deck.",
      cta: cta("Book Demo", "/book-demo"),
    },
    visual: "solutions/operations/in-production",
  },

  compliance: {
    kicker: "Compliance",
    heading: "Built for the org line and the customer audit.",
    lead:
      "In operations the leading concern is what crosses between organizations, so the strip leads with residency and counterparty visibility.",
    items: keyed(
      [
        {
          title: "Counterparty visibility is a security feature",
          body:
            "Per-thread visibility scopes and access-filtered notifications decide what crosses the org line. Internal activity stays internal, and notifications generate only for the documents and threads a user can access.",
        },
        {
          title: "Residency for global supply chains",
          body:
            "Data residency options including the EU. Self-host data providers keep order, shipment, and comment content plus user PII on your infrastructure, while Velt stores minimal identifiers.",
          link: cta("Self-hosting", "/self-hosting"),
        },
        {
          title: "The audit answer",
          body: "SOC 2 Type II, with immutable review records and export for customer audits.",
          link: cta("Governance", "/governance"),
        },
      ],
      "vspComplianceItem",
    ),
    note: "Enforcement wording and certifications beyond SOC 2 Type II are verified with engineering before they render.",
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions from operations teams.",
    items: keyed(
      [
        {
          question: "Can an approval run across two companies, our customer's team and their counterparty?",
          answer:
            "Yes, when both sides are users in your product. Your product provisions the counterparty's reviewers as users with access to the shared record, the workflow routes steps to either side's people in order, and every decision is timestamped and attributed. Internal-only threads and notifications never reach them.",
        },
        {
          question: "Can we keep internal comments invisible to the counterparty?",
          answer:
            "Yes. Any thread can be scoped to the author, the team, or specific people, and notifications generate only for documents and threads a user can access. The counterparty sees their shared thread move; your customer's internal deliberation never reaches their inbox.",
        },
        {
          question: "Our reviewers are in yards, trucks, and job sites, not at desks. How do they approve anything?",
          answer:
            "Velt is optimized for mobile web, works inside WebViews in native apps, and pure native apps can integrate through the REST APIs with your own native UI. The request also travels out of the product: email through your SendGrid account or any service via webhooks, and your own channels via webhooks.",
        },
        {
          question: "We review orders and work orders, not documents. Does the model fit?",
          answer:
            "Yes. A document in Velt is any unit of work your product renders: an order, a shipment record, a work order, or an inspection. Comments anchor to records and fields, approvals attach to the record, and the audit trail follows it.",
        },
        {
          question: "What do we show the customer's auditors when they ask who released a hold?",
          answer:
            "The record. Every comment, approval, and rejection is captured automatically with who, what, and when, queryable by document, user, or time range, and exportable. The answer to who approved the substitution is a query, not an archaeology project.",
        },
        {
          question: "How does pricing work when thousands of counterparty users touch a record once a month?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, so occasional counterparty reviewers do not multiply your bill. There is a free tier for development and early production.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Sign-off on the order, the shipment, the work order. On the record, on both sides of the handoff.",
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
