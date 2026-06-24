#!/usr/bin/env node
/**
 * Seed the solutionPageV1-ai-native-saas document in Sanity so it renders at
 * /for/ai-native-saas via app/for/[slug]/page.tsx.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-solution-ai-native-saas.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-solution-ai-native-saas.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *visual / preview field references a
 * key wired in components/feature-new/demo-presets/solutions-ai-native-saas.tsx.
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
  _id: "solutionPageV1-ai-native-saas",
  _type: "solutionPageV1",
  title: "AI-native SaaS",
  slug: { _type: "slug", current: "ai-native-saas" },
  breadcrumbLabel: "AI-native SaaS",
  metaTitle: "Review and approval for AI-native SaaS | Velt",
  metaDescription:
    "Agents propose, humans approve. The review layer for products where AI generates the work: comments, approvals, audit, memory.",

  hero: {
    kicker: "For AI-native SaaS",
    title: "The review layer between your agents and your users' data.",
    secondary:
      "Products where AI generates the work need the loop that makes the work shippable: agents propose through comments and suggestions, humans approve, memory keeps decisions consistent, and the audit trail proves oversight.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    visual: "solutions/ai-native-saas/hero",
  },

  logoStrip: {
    label: "Customers in this space include AI-native products where the model generates the work.",
    migration: {
      label: "See how AI-native products run review on Velt:",
      links: keyed([cta("Customers", "/customers"), cta("Examples", "/examples")]),
    },
  },

  reviewReality: {
    kicker: "The review reality",
    heading: "Your AI can generate the work. Getting it approved is the hard part.",
    items: [
      "Users turned off the AI the first time it changed something it shouldn't, and the feature you shipped became the feature they distrust.",
      "Your enterprise buyer's security review stalled on the AI feature, and the deal stalled with it.",
      "Agents need write access to be useful, and security says no, so the agent stays a demo instead of shipping into the product.",
    ],
    close: "If your product generates drafts, suggestions, or changes your users must answer for, this page is for you.",
  },

  theLoop: {
    kicker: "The loop",
    heading: "Agents propose. Humans approve.",
    body: "Your users want agents that act. Nobody wants agents that act alone. Velt is the layer between an agent's suggestion and a change to your users' data. Every agent suggestion becomes a comment with an action attached. A human approves or rejects. On approve, the change fires through your webhook with a permanent record of who allowed what; on reject, nothing happens and the rejection is logged. The agent never holds write access to your data.",
    beats: keyed(
      [
        {
          num: "1",
          title: "Agent proposes",
          body: "The product's own agent posts a comment on the draft it generated: a rationale, the proposed action, and the payload your webhook will apply. The avatar is AI-labeled, so everyone in the document knows an agent is acting. The agent calls the same commenting API a human user would.",
          visual: "solutions/ai-native-saas/loop/1",
          links: keyed([cta("Comments", "/comments")]),
        },
        {
          num: "2",
          title: "Human decides",
          body: "The owner reviews the proposal, and a teammate thread shows the deliberation: \u201C@Priya ok to apply this to all 14 accounts?\u201D High-stakes proposals route into a staged approval chain instead of a single click, so the consent step matches the stakes of the change.",
          visual: "solutions/ai-native-saas/loop/2",
          links: keyed([cta("Approval flows", "/approval-flows"), cta("Suggestions", "/suggestions")]),
        },
        {
          num: "3",
          title: "Webhook applies",
          body: "On approve, the POST payload hits the customer's endpoint and the user's data changes only now. The agent proposed the change; the human allowed it; your service applied it. Nothing reached the user's data that a human did not accept.",
          visual: "solutions/ai-native-saas/loop/3",
          links: keyed([cta("Notifications", "/notifications")]),
        },
        {
          num: "4",
          title: "Audit records",
          body: "An immutable line records who proposed, who allowed, what changed, and when. The trail is the evidence your security questionnaire asks for, written synchronously with the change rather than reconstructed after the fact.",
          visual: "solutions/ai-native-saas/loop/4",
          links: keyed([cta("Audit trail", "/audit-trail")]),
        },
      ],
      "vspLoopBeat",
    ),
    caption:
      "// agent proposes, human approves, webhook applies, audit records. The agent never holds write access.",
  },

  featureMap: {
    kicker: "Feature map",
    heading: "What AI-native teams buy first.",
    support: "Each card links its feature page. Preview the UI, or read the code that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Comments",
          oneLiner:
            "Your agent's findings and proposals land as comments on the generated draft, anchored to the exact claim or cell, with Approve and Reject attached. An agent is just a user with type agent.",
          link: cta("Explore Comments", "/comments"),
          code: "<VeltComments />",
          preview: "solutions/ai-native-saas/fm/comments",
        },
        {
          num: "02",
          name: "Suggestions",
          oneLiner:
            "Model-produced changes render as inline diffs on user content. Accept applies the change or fires your webhook; reject leaves the data untouched.",
          link: cta("Explore Suggestions", "/suggestions"),
          code: "<VeltSuggestions />",
          preview: "solutions/ai-native-saas/fm/suggestions",
        },
        {
          num: "03",
          name: "Approval flows",
          beta: true,
          oneLiner:
            "High-stakes agent output routes through staged sign-off: order, quorum, conditions, rejection paths, and a record for every run.",
          link: cta("Explore Approval flows", "/approval-flows"),
          code: "<VeltApprovalFlow\n  stages={[\"owner\", \"quorum\", \"confirm\"]}\n/>",
          preview: "solutions/ai-native-saas/fm/approval-flows",
        },
        {
          num: "04",
          name: "Audit trail",
          oneLiner:
            "Every proposal, decision, and applied change, attributed and exportable. The page of the security questionnaire your AI feature currently fails.",
          link: cta("Explore Audit trail", "/audit-trail"),
          code: "POST /v2/activities/get\n{ \"data\": { \"documentId\": \"renewal-email\" } }",
          preview: "solutions/ai-native-saas/fm/audit-trail",
        },
        {
          num: "05",
          name: "Memory",
          beta: true,
          oneLiner:
            "Your users' past decisions surface as precedent, so review of generated work stays consistent as output volume grows.",
          link: cta("Explore Memory", "/memory"),
          code: "velt.memory.search({\n  query: \"prior renewal decisions\",\n});",
          preview: "solutions/ai-native-saas/fm/memory",
        },
        {
          num: "06",
          name: "Presence",
          oneLiner:
            "See your agents work: avatars show the agent in the document, cursors and selection show exactly what it is touching, follow mode rides along.",
          link: cta("Explore Presence", "/presence"),
          code: "<VeltPresence />",
          preview: "solutions/ai-native-saas/fm/presence",
        },
      ],
      "vspFeatureCard",
    ),
  },

  agentLayer: {
    kicker: "Agent action layer",
    heading: "Agents propose. Your users decide.",
    body: "For AI-native products the stake is the user's data itself: the rows, fields, and content one unsupervised write can corrupt, and the trust that never comes back after it does. So every agent action in Velt arrives as a proposal: the generated draft, the model-produced change, the agent's output, each one a comment or suggestion with Approve and Reject attached. On approve, the change fires through your webhook with a permanent record of who allowed what; on reject, nothing happens and the rejection is logged. The agent never holds write access to your data. This shape is reversible, so you can build opinionated flows on top later; uniform, so you ship one consent pattern everywhere instead of per-feature approval UIs; and audit-complete by construction. For higher-stakes actions, escalate the consent: from one click, to quorum, to type-the-name confirmation. When Velt's built-in review agents reach GA, they slot into this same loop as a first pass on generated drafts before your users ever look.",
    visual: "solutions/ai-native-saas/agent",
  },

  inProduction: {
    kicker: "In production",
    heading: "AI-native products, in production.",
    body: "Customers in this space include products where AI generates the work and the propose-approve-apply loop runs inside the product: agents post proposals as comments and suggestions, humans approve or reject, and approved changes fire through the customer's own webhook with an audit record their security review asks for.",
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "See it running in products like yours.",
      microcopy: "30 minutes, with an engineer, not a sales deck.",
      cta: cta("Book Demo", "/book-demo"),
    },
    visual: "solutions/ai-native-saas/in-production",
  },

  compliance: {
    kicker: "Compliance",
    heading: "Consent before action, evidence after it.",
    lead: "Agent changes apply only through your webhook after human approval, and the audit trail records who allowed what.",
    items: keyed(
      [
        {
          title: "Human oversight by construction",
          body: "Approval before action is the mechanism; immutable records are the evidence. For buyers the EU AI Act actually covers, Article 14's human-oversight requirement maps directly to this loop, scoped to the features in scope and never implying every AI feature is.",
          link: cta("Governance", "/governance"),
        },
        {
          title: "Data on your infrastructure",
          body: "Content and user PII can stay on your infrastructure via per-feature data providers; Velt stores minimal identifiers.",
          link: cta("Self-hosting", "/self-hosting"),
        },
        {
          title: "SOC 2 Type II, audit export",
          body: "SOC 2 Type II, HIPAA support, and EU data residency options, with the exportable record of every proposal and decision that vendor security reviews ask for.",
          link: cta("Governance", "/governance"),
        },
      ],
      "vspComplianceItem",
    ),
    note: "Certifications and qualifiers beyond SOC 2 Type II are verified before they render.",
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions from AI-native teams.",
    items: keyed(
      [
        {
          question: "Can agents change data in my product without approval?",
          answer:
            "Not through Velt. Agent suggestions arrive as comments. A human approves or rejects; on approve, the change fires through your webhook with a permanent record of who allowed what. Agents never need write access to your data.",
        },
        {
          question: "How is this different from the approval flow in the OpenAI Agents SDK?",
          answer:
            "The OpenAI SDK pauses your own agent's tool calls so a developer-defined approver can resume them. Velt is the review surface your end users see inside your product: comment threads, multi-step approval workflows, audit records, and notifications, working across humans and agents with any model or framework.",
        },
        {
          question: "Does Velt care which model or agent framework we use?",
          answer:
            "No. Your agent is a Velt user with type agent and talks to the same REST APIs humans use: it posts comments and suggestions with a rationale and a payload, and your webhook applies approved changes. Any orchestration that can call an API works.",
        },
        {
          question: "Do my users have to approve every single agent action?",
          answer:
            "No. You decide where the consent step sits: generated drafts can flow freely, and the approval gate guards changes to user data. For higher-stakes actions, escalate the consent: from one click, to quorum, to type-the-name confirmation (quorum routing via approval flows, beta).",
        },
        {
          question: "Can my users watch what an agent is doing?",
          answer:
            "Yes. Agents appear in presence like any user, so your users always know when an agent is in the document. Cursors and live selection show exactly what it is touching, and follow mode lets a user ride along while it works.",
        },
        {
          question: "We generate thousands of drafts a month. How does pricing work?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month (monthly active documents), and agents are users, not billed seats. There is a free tier for development and early production.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "The review layer between your agents and your users' data.",
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
