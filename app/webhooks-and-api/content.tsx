import Link from "next/link";

import { ShieldIcon, VeltMark } from "@/components/feature-new/icons";
import type { FeaturePageContent } from "@/components/feature-new/content";

import { WEBHOOKS_DEMOS as D } from "@/components/feature-new/demo-presets/webhooks-and-api";

// Local, in-repo content for the new-theme /webhooks-and-api page. Rendered
// statically by app/webhooks-and-api/page.tsx via FeaturePageView, no Sanity
// document is read or written. This static route shadows the dynamic
// app/(features)/[slug] route for /webhooks-and-api (Next.js prioritises
// static routes), so the legacy v1 CMS doc is left untouched. Copy carries
// over the live page's intent (REST coverage, signed webhooks, Slack sync,
// transforms, custom encryption, failure recovery); no em or en dashes.

const API_KEY_HREF = "https://console.velt.dev/";
const DEMO_HREF = "/book-demo";
const DOCS_HREF = "https://velt.dev/docs/";

const STEP_KEY = `# create an API key in the console
# console.velt.dev, or from code:
POST /v2/workspace/apikey/create
{ "name": "acme", "environment": "production" }`;

const STEP_CALL = `// call any feature from your server
GET /v2/comments?documentId=filing-q3
Authorization: Bearer sk_live_***`;

const STEP_SUBSCRIBE = `// point a webhook endpoint at your backend
// every event is signed, retried, and delivered
POST https://api.acme.com/velt-hooks`;

/** Typed content for the Webhooks & API page. */
export const webhooksContent: FeaturePageContent = {
  slug: "webhooks-and-api",

  hero: {
    kicker: "Webhooks & API",
    title: "Extend Velt with webhooks and a REST API.",
    secondary:
      "Integrate seamlessly with your systems: perform CRUD on every Velt feature server-side, and receive a signed, retried webhook for every event, from humans and agents alike.",
    accent:
      "// Stop polling and screen-scraping. The same data your frontend sees is available server-side, and every change can push to you.",
    primaryCta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
    secondaryCta: { label: "Book Demo", href: DEMO_HREF },
    microcopy: "Free tier. No credit card. Signed webhooks on every plan.",
    buildChip: { label: "View API docs", href: DOCS_HREF, newTab: true },
    demoTabs: [
      { id: "rest", label: "REST", content: D["hero/rest"] },
      { id: "webhooks", label: "Webhooks", content: D["hero/webhooks"] },
      { id: "transform", label: "Transforms", content: D["hero/transform"] },
      { id: "flow", label: "Delivery", content: D["hero/flow"] },
    ],
  },

  logoStrip: {
    label: "3M+ comments created in products built on Velt.",
    migration: {
      label: "Teams wired Velt into their backend in an afternoon.",
      links: [{ label: "Compare Velt", href: "/comparison" }],
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "One event and provisioning surface.",
    body:
      "The Velt REST API lets you programmatically perform CRUD operations on every feature: comments, organizations, users, documents, recordings, and notifications. Webhooks push the other direction: every event fires a signed payload to your endpoints with retries, rate limiting, payload transforms, custom encryption, and failure recovery. Humans and agents are treated the same, because an agent is a user with type agent, so its activity reaches your backend in the same event stream beside human users.",
    docLinks: [
      { label: "View Docs", href: DOCS_HREF, newTab: true },
      { label: "Admin console", href: "/platform" },
    ],
    scene: D["what-it-is/scene"],
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Key, call, subscribe.",
    support:
      "Create an API key, call any feature from your server, and point a webhook endpoint at your backend.",
    steps: [
      { kicker: "01", title: "Create an API key", filename: "console.velt.dev", code: STEP_KEY, copyText: STEP_KEY },
      { kicker: "02", title: "Call the REST API", filename: "server.ts", code: STEP_CALL, copyText: STEP_CALL },
      { kicker: "03", title: "Subscribe to webhooks", filename: "webhooks", code: STEP_SUBSCRIBE, copyText: STEP_SUBSCRIBE },
    ],
    mechanics: {
      heading: "Everything to integrate, included.",
      body:
        "Signed REST endpoints cover every feature, server-side. Webhooks deliver every event with HMAC SHA-256 signing, retries with backoff, rate limiting, payload transforms, customer-managed encryption, failure recovery, and two-way Slack sync. Platform-management REST APIs cover the workspace lifecycle: keys, domains, auth tokens, and the email, notification, webhook, activity, and permission configs.",
      microcopy: "signed, retried, encrypted, recovered",
    },
    buildVsBuy: {
      heading: "An in-house event pipeline is a project.",
      items: [
        "Signed delivery with verifiable HMAC signatures",
        "Retries with backoff and a dead-letter recovery path",
        "Rate limiting so a burst never drops events",
        "Payload transforms to fit your downstream schema",
        "Customer-managed encryption for sensitive payloads",
        "Two-way Slack sync and pre-built connectors",
      ],
      close:
        "Velt ships the whole event and provisioning surface with the SDK, so your engineers wire integrations instead of building delivery infrastructure.",
    },
    mcp: {
      heading: "Skip the glue code. Provision from code.",
      sub: "Use the REST APIs or the Velt MCP server for agents that set up and query Velt.",
      tabs: [
        { id: "rest", label: "REST", command: "POST /v2/organizations/add" },
        { id: "apikey", label: "API key", command: "POST /v2/workspace/apikey/create" },
        { id: "mcp", label: "MCP", command: "npx -y @velt-js/mcp-installer" },
      ],
    },
    integrations: [
      {
        label: "Pipe events anywhere",
        chips: [
          { label: "Slack", href: DOCS_HREF, icon: "/images/home/nav-icons/slack.svg" },
          { label: "Microsoft Teams", href: DOCS_HREF, icon: "/images/home/nav-icons/microsoftteams.svg" },
          { label: "AWS S3", href: DOCS_HREF, icon: "/images/home/logo-aws-s3-1.png" },
          { label: "HubSpot", href: DOCS_HREF, icon: "/images/home/logo-hubspot.svg" },
          { label: "Segment", href: DOCS_HREF, icon: "/images/home/logo-segment.svg" },
          { label: "Inngest", href: DOCS_HREF, icon: "/images/home/logo-inngest.png" },
          { label: "Zapier", href: DOCS_HREF, icon: "/images/home/nav-icons/zapier.svg" },
        ],
      },
    ],
    ctaBanner: {
      title: "Get a signed API key and start integrating today.",
      microcopy: "No credit card.",
      cta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
      variant: "primary",
    },
  },

  showcase: {
    kicker: "Showcase",
    heading: "Everything you need to integrate in production.",
    support: "Six capabilities, one surface. Toggle to Code where it is API driven.",
    cards: [
      {
        num: "01",
        name: "Extensive REST API coverage",
        codeKicker: "// rest api",
        headline:
          "Programmatically perform CRUD on every Velt feature: comments, organizations, users, documents, recordings, and notifications. The same data your frontend sees, server-side.",
        preview: D["showcase/rest-api"],
        code: "GET /v2/comments?documentId=filing-q3\nAuthorization: Bearer sk_live_***",
        copyText: "GET /v2/comments?documentId=filing-q3",
      },
      {
        num: "02",
        name: "Signed webhooks",
        codeKicker: "// webhooks",
        headline:
          "Every event fires a signed webhook. Verify the x-velt-signature HMAC SHA-256 header before processing, and failed signatures are dropped and retried.",
        preview: D["showcase/webhooks"],
        code: "event: comment.added → 200 OK\nx-velt-signature: t=1718,v1=9f2c...",
        copyText: "verify x-velt-signature before processing",
      },
      {
        num: "03",
        name: "Two-way Slack sync",
        codeKicker: "// slack",
        headline:
          "Sync comments and threads to Slack and reply from Slack back into your product. Keep the conversation in both places without copy-paste.",
        preview: D["showcase/slack-sync"],
        code: "// comment.added → #filing-q3\n// reply in Slack → synced back",
        copyText: "two-way Slack sync",
      },
      {
        num: "04",
        name: "Payload transforms",
        codeKicker: "// transforms",
        headline:
          "Reshape the payload before delivery so it fits your downstream schema, and redact fields you do not want to leave Velt.",
        preview: D["showcase/transforms"],
        code: "webhook.transform = (e) => ({ doc: e.documentId, actor: redact(e.user) })",
        copyText: "webhook.transform = (e) => redact(e)",
      },
      {
        num: "05",
        name: "Custom encryption",
        codeKicker: "// encryption",
        headline:
          "Encrypt webhook payloads with your own keys so sensitive content stays under your control end to end, plus custom signing headers.",
        preview: D["showcase/encryption"],
        code: "webhook.encryption.key = cmek://acme\nwebhook.headers = { 'x-tenant': id }",
        copyText: "webhook.encryption.key = cmek://acme",
      },
      {
        num: "06",
        name: "Retries and failure recovery",
        codeKicker: "// recovery",
        headline:
          "Retries with backoff, rate limiting, and a recovery path mean a slow or down endpoint never silently drops an event.",
        preview: D["showcase/recovery"],
        code: "delivery failed → retry 1 (2s) → retry 2 (8s) → 200 OK",
        copyText: "retries with backoff and failure recovery",
      },
    ],
    docLinks: [
      { label: "View Docs", href: DOCS_HREF, newTab: true },
      { label: "Admin console", href: "/platform" },
    ],
  },

  details: {
    kicker: "Little big details",
    heading: "The whole integration surface, in one place.",
    support: "The showcase is the highlight reel. This is the index.",
    items: [
      { label: "CRUD REST endpoints for comments" },
      { label: "CRUD for organizations and users" },
      { label: "CRUD for documents and folders" },
      { label: "Recordings and notifications APIs" },
      { label: "Bearer token authentication" },
      { label: "HMAC SHA-256 webhook signing" },
      { label: "x-velt-signature verification header" },
      { label: "Retries with exponential backoff" },
      { label: "Rate limiting with burst capacity" },
      { label: "Payload transforms before delivery" },
      { label: "Customer-managed payload encryption" },
      { label: "Custom webhook headers" },
      { label: "Failure recovery and replay" },
      { label: "Two-way Slack sync" },
      { label: "Messaging, storage, CRM, analytics connectors" },
      { label: "Workspace lifecycle REST APIs" },
      { label: "API key and Managed Domain management" },
      { label: "Email, notification, and activity config APIs" },
      { label: "Permission-provider config API" },
      { label: "MCP server for setup and queries" },
    ],
    visibleCount: 12,
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Wire it your way.",
    support: "The API and webhooks are the contract; what you build on them is yours.",
    cards: [
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Pull",
        body:
          "Read every feature through the REST API to populate your warehouse, your CRM, or your own dashboards, on your schedule.",
        preview: D["make-it-yours/look"],
        code: "GET /v2/comments → your warehouse\nGET /v2/users → your CRM",
        copyText: "GET /v2/comments → your warehouse",
      },
      {
        icon: <ShieldIcon />,
        title: "Push",
        body:
          "Transform and encrypt payloads, set custom headers, choose which events fire, and recover failures, all per endpoint.",
        preview: D["make-it-yours/behavior"],
        code: "webhook.transform = (e) => redact(e)\nwebhook.encryption.key = cmek://acme",
        copyText: "webhook.transform = (e) => redact(e)",
      },
    ],
  },

  inProduction: {
    kicker: "In production",
    heading: "See the API and webhooks on your work.",
    support: "Where the integration surface fits, by team.",
    tabs: [
      {
        id: "operations",
        label: "Operations",
        visual: D["in-production/operations"],
        caption: "Route every event into your ops stack, with retries and a recovery path so nothing drops.",
        link: { label: "For operations", href: "/for/operations" },
      },
      {
        id: "fintech",
        label: "Fintech and compliance",
        visual: D["in-production/fintech"],
        caption: "Deliver an encrypted, signed record to your audit pipeline and export it for examiners.",
        link: { label: "For fintech", href: "/for/fintech" },
      },
      {
        id: "ai",
        label: "AI-native SaaS",
        visual: D["in-production/ai"],
        caption: "Fire every approved agent change through your webhook with a verifiable record of who allowed what.",
        link: { label: "For AI-native SaaS", href: "/for/ai-native-saas" },
      },
      {
        id: "sales",
        label: "Sales enablement",
        visual: D["in-production/sales"],
        caption: "Sync comment activity and approvals to your CRM so deal records reflect what happened.",
        link: { label: "For sales enablement", href: "/for/sales-enablement" },
      },
    ],
    whereItFits: {
      label: "Where it fits",
      links: [
        { label: "Operations", href: "/for/operations" },
        { label: "Fintech", href: "/for/fintech" },
        { label: "AI-native SaaS", href: "/for/ai-native-saas" },
        { label: "Sales enablement", href: "/for/sales-enablement" },
      ],
    },
    ctaBanner: {
      title: "See webhooks fire on your data.",
      microcopy: "30 minutes, with an engineer.",
      cta: { label: "Book Demo", href: DEMO_HREF },
      variant: "secondary",
    },
  },

  related: {
    kicker: "Related",
    heading: "The pieces the API connects.",
    support: "Each is its own page.",
    cards: [
      {
        icon: <ShieldIcon />,
        title: "Admin console",
        body: "Configure endpoints, keys, and domains for the API.",
        visual: D["related/platform"],
        link: { label: "Admin console", href: "/platform" },
      },
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Audit trail",
        body: "The immutable record every event also writes.",
        visual: D["related/audit-trail"],
        link: { label: "Audit trail", href: "/audit-trail" },
      },
      {
        icon: <ShieldIcon />,
        title: "Notifications",
        body: "An outbound channel webhooks can feed.",
        visual: D["related/notifications"],
        link: { label: "Notifications", href: "/notifications" },
      },
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Comments",
        body: "The most-used feature behind the events.",
        visual: D["related/comments"],
        link: { label: "Comments", href: "/comments" },
      },
    ],
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA with BAA", "Self-hosting", "Multi-region", "BYOK encryption"],
    line: (
      <>
        Webhook payloads support bring-your-own-key encryption, with SOC 2 Type II and HIPAA with a BAA. See <Link href="/enterprise">Enterprise</Link> and <Link href="/self-hosting">Self-hosting</Link>.
      </>
    ),
    cta: { label: "View Trust Center", href: "https://trust.velt.dev/", newTab: true },
  },

  // Proof / testimonial wall intentionally left empty: this page opts out of
  // anonymous testimonials, so TestimonialWall renders nothing.
  testimonials: {
    kicker: "Proof",
    heading: "Teams that integrated Velt server-side.",
    support: "Real products, real pipelines.",
    cards: [],
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions buyers and agents ask.",
    items: [
      {
        q: "What can I do with the REST API?",
        a: "Programmatically perform CRUD operations on every Velt feature: comments, organizations, users, documents, recordings, and notifications. The same data your frontend sees is available server-side via signed REST endpoints.",
      },
      {
        q: "How are webhooks signed?",
        a: "Each webhook payload is signed with HMAC SHA-256 using your project's secret. Verify the x-velt-signature header before processing. Failed signature checks are dropped and retried.",
      },
      {
        q: "What are the rate limits?",
        a: "Default 100 requests per second per API key, with burst capacity for write traffic. Reach out for higher limits, enterprise plans get custom quotas plus dedicated retry queues.",
      },
      {
        q: "What happens if my endpoint is down?",
        a: "Deliveries are retried with exponential backoff and held for recovery, so a slow or temporarily unavailable endpoint does not silently drop events. You can replay failed deliveries once your endpoint is healthy.",
      },
      {
        q: "Can I transform or encrypt the payload?",
        a: "Yes. You can reshape the payload before delivery to fit your downstream schema, redact fields, set custom headers, and encrypt payloads with your own keys for end-to-end control.",
      },
      {
        q: "Does agent activity reach my webhooks?",
        a: "Yes. An agent is a user with type agent, so agent comments, approvals, and actions fire the same signed webhooks as human activity, with the actor type on the payload.",
      },
      {
        q: "Can I provision Velt from code?",
        a: "Yes. Platform-management REST APIs cover the workspace lifecycle: create and get a workspace, create, update, and list API keys, manage domains and auth tokens, and read or update the email, notification, webhook, activity, and permission-provider configs. You can also use the Velt MCP server.",
      },
      {
        q: "How do I get started?",
        a: "Create a free API key in the console, call any feature from your server with a bearer token, and point a webhook endpoint at your backend. Signed webhooks are available on every plan.",
      },
    ],
  },

  finalCta: {
    title: "Extend Velt with webhooks and a REST API.",
    primaryCta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
    secondaryCta: { label: "Book Demo", href: DEMO_HREF },
    microcopies: ["Free tier. No credit card.", "Signed webhooks on every plan."],
  },
};
