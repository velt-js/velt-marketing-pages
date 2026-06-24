import Link from "next/link";

import { ShieldIcon, VeltMark } from "@/components/feature-new/icons";
import type { FeaturePageContent } from "@/components/feature-new/content";

import { PLATFORM_DEMOS as D } from "@/components/feature-new/demo-presets/platform";

// Local, in-repo content for the new-theme /platform (Admin Console) page.
// Rendered statically by app/platform/page.tsx via FeaturePageView — no Sanity
// document is read or written. Copy is the proposed net-new copy from the
// platform content spec; no em or en dashes (commas, colons, periods only).

const API_KEY_HREF = "https://console.velt.dev";
const DEMO_HREF = "/book-demo";
const DOCS_HREF = "https://docs.velt.dev";

const STEP_WORKSPACE = `# create a workspace and API key
# console.velt.dev, or from code:
POST /v2/workspace/create
{ "name": "acme", "email": "you@acme.com" }`;

const STEP_DOMAIN = `// add your domain under Managed Domains,
// then drop in the SDK
<VeltProvider apiKey={VELT_API_KEY}>
  <YourApp />
</VeltProvider>`;

const STEP_CONSOLE = `// open console.velt.dev to watch it run
// analytics · debugger · data · feature configs
// the console populates as your app sends events`;

/** Typed content for the Admin Console page. */
export const platformContent: FeaturePageContent = {
  slug: "platform",

  hero: {
    kicker: "Admin Console",
    title: "Add a control plane for the review layer you run in production.",
    secondary:
      "One console to measure adoption, debug live, explore and export every record, configure features, and automate it all through REST APIs and webhooks.",
    accent:
      "// No more building dashboards, debuggers, and audit exports for the SDK you adopted to stop building.",
    primaryCta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
    secondaryCta: { label: "Book Demo", href: DEMO_HREF },
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    buildChip: { label: "View the console", href: API_KEY_HREF, newTab: true },
    demoTabs: [
      { id: "analytics", label: "Analytics", content: D["hero/analytics"] },
      { id: "ai-chat", label: "AI chat", content: D["hero/ai-chat"] },
      { id: "debugger", label: "Debugger", content: D["hero/debugger"] },
      { id: "data", label: "Data", content: D["hero/data"] },
      { id: "webhooks", label: "Webhooks", content: D["hero/webhooks"] },
    ],
  },

  logoStrip: {
    label: "3M+ comments created in products built on Velt.",
    migration: {
      label: "Teams moved the control plane off in-house tooling.",
      links: [{ label: "Compare Velt", href: "/comparison" }],
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "One console for humans and agents.",
    body:
      "The Velt admin console is one place to run the review and approval layer you embedded: measure adoption, debug live, explore and export records, configure features, and automate it through REST APIs and webhooks. It treats humans and agents like the SDK does: an agent is a user with type agent, so its activity appears in analytics, the data explorer, and every webhook, beside human users. The console is where you prove who allowed what.",
    docLinks: [
      { label: "View Docs", href: DOCS_HREF, newTab: true },
      { label: "View Examples", href: "/customers" },
    ],
    scene: D["what-it-is/scene"],
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Live the moment a key exists.",
    support: "Create a key, add your domain, drop in the SDK. The console populates as your app sends events.",
    steps: [
      { kicker: "01", title: "Create a workspace and key", filename: "console.velt.dev", code: STEP_WORKSPACE, copyText: STEP_WORKSPACE },
      { kicker: "02", title: "Add a domain, drop in the SDK", filename: "app.tsx", code: STEP_DOMAIN, copyText: STEP_DOMAIN },
      { kicker: "03", title: "Open the console and watch", filename: "console", code: STEP_CONSOLE, copyText: STEP_CONSOLE },
    ],
    mechanics: {
      heading: "Everything to run it, included.",
      body:
        "The console comes with every Velt account, with nothing to install. It manages API keys and Managed Domains, monitors usage and monthly active documents, configures features without a deploy, sends every event to your webhook endpoints with signing, retries, transforms, and encryption, and exposes platform-management REST APIs for workspace lifecycle, keys, domains, and configs. Agent activity is first-class throughout, because an agent is a user with type agent.",
      microcopy: "nothing to install, live the same day",
    },
    buildVsBuy: {
      heading: "An in-house control plane is a product.",
      items: [
        "A usage and adoption dashboard",
        "A live debugger and a data browser with export",
        "Per-feature configuration without a deploy",
        "Multi-tenant API key and domain management",
        "Webhook delivery with signing, retries, transforms, and encryption",
        "The SOC 2 and HIPAA controls to operate all of it",
      ],
      close: "Velt includes the whole control plane with the SDK, so your engineers run the review layer instead of building the tools that run it.",
    },
    mcp: {
      heading: "Skip the console clicks. Provision it from code.",
      sub: "Use the REST APIs or the Velt MCP server for agents that set up and query Velt.",
      tabs: [
        { id: "rest", label: "REST", command: "POST /v2/workspace/create" },
        { id: "apikey", label: "API key", command: "POST /v2/workspace/apikey/create" },
        { id: "mcp", label: "MCP", command: "npx -y @velt-js/mcp-installer" },
      ],
    },
    integrations: [
      {
        label: "Pipe console activity anywhere",
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
      title: "Get the full console with your free API key.",
      microcopy: "No credit card.",
      cta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
      variant: "primary",
    },
  },

  showcase: {
    kicker: "Showcase",
    heading: "Everything you need to run it in production.",
    support: "Eight tools, one console. Toggle to Code where a capability is API driven.",
    cards: [
      {
        num: "01",
        name: "Adoption analytics",
        codeKicker: "// analytics",
        headline:
          "See whether the review layer is used: hours of engagement, active collaborators, comments and notifications added, week over week, with agents counted as users.",
        preview: D["showcase/adoption-analytics"],
        code: "// adoption you can take to a renewal\nGET /v2/analytics?metric=engagement&window=6w",
        copyText: "GET /v2/analytics?metric=engagement&window=6w",
      },
      {
        num: "02",
        name: "AI chat in the console",
        codeKicker: "// ai chat",
        headline:
          "Ask plain English questions about your setup, usage, and data, and get answers without writing a query. The console's built-in assistant for debugging and reporting.",
        preview: D["showcase/ai-chat"],
        code: "// ask: which documents had the most review activity?\n// the assistant reads your console data",
        copyText: "ask: which documents had the most review activity?",
      },
      {
        num: "03",
        name: "Live debugger",
        codeKicker: "// debugger",
        headline:
          "Watch Velt state, data, events, and components update live as your users and agents act. Find the broken wire in minutes, not a support thread.",
        preview: D["showcase/live-debugger"],
        code: "// state · data · events · components, live",
        copyText: "state · data · events · components, live",
      },
      {
        num: "04",
        name: "DevTools Chrome extension",
        codeKicker: "// devtools",
        headline:
          "Overview, Data, Events, and Components tabs in your browser, plus switch between SDK versions to reproduce a bug. Debug right where your product runs.",
        preview: D["showcase/devtools"],
        code: "// install the Velt DevTools extension\n// see /devtools",
        copyText: "install the Velt DevTools extension, see /devtools",
      },
      {
        num: "05",
        name: "Data explorer and export",
        codeKicker: "// data",
        headline:
          "Browse every comment, thread, recording, user, document, and location, then export to JSON or CSV. Your data is queryable and portable, not locked in.",
        preview: D["showcase/data-explorer"],
        code: "GET /v2/comments?document=filing-q3\n// → export JSON or CSV",
        copyText: "GET /v2/comments?document=filing-q3",
      },
      {
        num: "06",
        name: "Feature configuration",
        codeKicker: "// configs",
        headline:
          "Turn features on or off, manage API keys and Managed Domains, set email config and roles, all from the console. Change behavior without a deploy.",
        preview: D["showcase/feature-configs"],
        code: "// toggle features per environment\n// no deploy required",
        copyText: "toggle features per environment, no deploy required",
      },
      {
        num: "07",
        name: "Platform-management REST APIs",
        codeKicker: "// rest apis",
        headline:
          "Provision and configure from your own code: workspaces, API keys, domains, auth tokens, and the email, notification, webhook, activity, and permission configs.",
        preview: D["showcase/rest-apis"],
        code: "POST /v2/workspace/apikey/create\nAuthorization: Bearer sk_live_***",
        copyText: "POST /v2/workspace/apikey/create",
      },
      {
        num: "08",
        name: "Webhooks and integrations",
        codeKicker: "// webhooks",
        headline:
          "Every event fires a signed webhook with retries, payload transforms, custom encryption, and failure recovery, plus two-way Slack sync and pre-built connectors.",
        preview: D["showcase/webhooks"],
        code: "// signed · retried · transformed · encrypted\n// see /webhooks-and-api",
        copyText: "signed, retried, transformed, encrypted",
      },
    ],
    docLinks: [
      { label: "View Docs", href: DOCS_HREF, newTab: true },
      { label: "View Examples", href: "/customers" },
    ],
  },

  details: {
    kicker: "Little big details",
    heading: "The whole control plane, in one place.",
    support: "The showcase is the highlight reel. This is the index.",
    items: [
      { label: "Hours of engagement, week over week" },
      { label: "Active collaborators, agents counted as users" },
      { label: "Comments and notifications added" },
      { label: "Usage and monthly active document monitoring" },
      { label: "AI chat assistant", soon: true },
      { label: "Live debugger" },
      { label: "DevTools: Overview, Data, Events, Components" },
      { label: "SDK version switching" },
      { label: "Data explorer across folders, documents, users, threads" },
      { label: "Export to JSON and CSV" },
      { label: "Per-feature enable and disable" },
      { label: "API keys, testing and production" },
      { label: "Managed Domains and environments" },
      { label: "Email configuration and roles" },
      { label: "Workspace lifecycle REST APIs" },
      { label: "Webhook config: signing, retries, transforms, encryption" },
      { label: "Two-way Slack sync" },
      { label: "Activity and permission-provider config APIs" },
      { label: "MCP server for docs and setup" },
      { label: "Messaging, storage, CRM, analytics, automation connectors" },
    ],
    visibleCount: 12,
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Operate it your way.",
    support: "The console is Velt's UI, but the data and the controls behind it are yours.",
    cards: [
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Look",
        body:
          "Pull metrics and records through the data access, the export, and the REST APIs to build your own internal dashboards or embed adoption numbers in your own admin.",
        preview: D["make-it-yours/look"],
        code: "GET /v2/analytics?metric=engagement\n// render in your own dashboard",
        copyText: "GET /v2/analytics?metric=engagement",
      },
      {
        icon: <ShieldIcon />,
        title: "Behavior",
        body:
          "Feature flags per environment, custom webhook headers, payload transforms, customer-managed encryption keys, programmatic provisioning, and the MCP server for agent-driven setup.",
        preview: D["make-it-yours/behavior"],
        code: "webhook.transform = (e) => redact(e)\nencryption.key = cmek://acme",
        copyText: "webhook.transform = (e) => redact(e)",
      },
    ],
  },

  inProduction: {
    kicker: "In production",
    heading: "See the console on your work.",
    support: "Where the control plane fits, by team.",
    tabs: [
      {
        id: "sales",
        label: "Sales enablement",
        visual: D["in-production/sales"],
        caption: "Watch adoption climb as teams comment and approve on assets, and export the activity for QBRs.",
        link: { label: "For sales enablement", href: "/for/sales-enablement" },
      },
      {
        id: "fintech",
        label: "Fintech and compliance",
        visual: D["in-production/fintech"],
        caption: "Monitor monthly active documents, export an immutable record for examiners, and keep console data on your infrastructure.",
        link: { label: "For fintech", href: "/for/fintech" },
      },
      {
        id: "operations",
        label: "Operations",
        visual: D["in-production/operations"],
        caption: "Debug integrations across messy environments with the live debugger, and route events to your ops stack through webhooks.",
        link: { label: "For operations", href: "/for/operations" },
      },
      {
        id: "ai",
        label: "AI-native SaaS",
        visual: D["in-production/ai"],
        caption: "See agent activity beside human activity, and fire every approved change through your webhook with a record.",
        link: { label: "For AI-native SaaS", href: "/for/ai-native-saas" },
      },
    ],
    whereItFits: {
      label: "Where it fits",
      links: [
        { label: "Sales enablement", href: "/for/sales-enablement" },
        { label: "Fintech", href: "/for/fintech" },
        { label: "Operations", href: "/for/operations" },
        { label: "AI-native SaaS", href: "/for/ai-native-saas" },
      ],
    },
    ctaBanner: {
      title: "See the console on your data.",
      microcopy: "30 minutes, with an engineer.",
      cta: { label: "Book Demo", href: DEMO_HREF },
      variant: "secondary",
    },
  },

  related: {
    kicker: "Related",
    heading: "The pieces the console runs on.",
    support: "Each is its own page.",
    cards: [
      {
        icon: <ShieldIcon />,
        title: "Audit trail",
        body: "The immutable record the console explores and exports.",
        visual: D["related/audit-trail"],
        link: { label: "Audit trail", href: "/audit-trail" },
      },
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Webhooks and API",
        body: "The platform's event and provisioning surface.",
        visual: D["related/webhooks"],
        link: { label: "Webhooks and API", href: "/webhooks-and-api" },
      },
      {
        icon: <ShieldIcon />,
        title: "Self-hosting",
        body: "Where the console's data can live.",
        visual: D["related/self-hosting"],
        link: { label: "Self-hosting", href: "/self-hosting" },
      },
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Notifications",
        body: "The outbound channels webhooks and the console feed.",
        visual: D["related/notifications"],
        link: { label: "Notifications", href: "/notifications" },
      },
    ],
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA with BAA", "Self-hosting", "Multi-region", "BYOK encryption"],
    line: (
      <>
        Per-feature data providers keep content and PII on your infrastructure, with SOC 2 Type II, HIPAA with a BAA, and bring-your-own-key encryption. See <Link href="/enterprise">Enterprise</Link> and <Link href="/self-hosting">Self-hosting</Link>.
      </>
    ),
    cta: { label: "View Trust Center", href: "https://trust.velt.dev", newTab: true },
  },

  // Proof / testimonial wall intentionally left empty: anonymous testimonials
  // removed; TestimonialWall renders nothing when there are no cards.
  testimonials: {
    kicker: "Proof",
    heading: "Teams that stopped building admin tooling.",
    support: "Real names, real products.",
    cards: [],
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions buyers and agents ask.",
    items: [
      {
        q: "What is the Velt admin console?",
        a: "It is the control plane for the review and approval layer you embed with Velt: one place to measure adoption, debug live, explore and export data, configure features, manage API keys and domains, and send events to your systems through webhooks and REST APIs. It comes with every Velt account.",
      },
      {
        q: "How do I see whether my users actually use the review features?",
        a: "The console's adoption analytics tracks hours of engagement, active collaborators, and comments and notifications added, week over week, with agents counted as users. Export it for a QBR or a renewal.",
      },
      {
        q: "Can I export my Velt data?",
        a: "Yes. The data explorer browses every comment, thread, recording, user, and document, and exports to JSON or CSV. Your data is portable.",
      },
      {
        q: "How do I debug a Velt integration?",
        a: "Use the live debugger and the DevTools Chrome extension: Overview, Data, Events, and Components tabs in your browser, plus SDK version switching to reproduce a bug. See the DevTools page.",
      },
      {
        q: "Can I manage workspaces, API keys, and configs programmatically?",
        a: "Yes. The platform-management REST APIs cover the full workspace lifecycle: create and get a workspace, create, update, and list API keys, manage domains and auth tokens, and read or update the email, notification, webhook, activity, and permission-provider configs, so you can provision tenants and automate onboarding.",
      },
      {
        q: "What can webhooks do?",
        a: "Every event fires a signed webhook. You get retries, rate limiting, payload transforms, custom encryption, failure recovery, and two-way Slack sync, so review activity reaches your backend, analytics, or audit pipeline reliably.",
      },
      {
        q: "Does agent activity show up in the console?",
        a: "Yes. An agent is a user with type agent, so agent comments, approvals, and actions appear in analytics, the data explorer, and every webhook beside your human users. The console is where you prove an agent proposed and a human approved.",
      },
      {
        q: "Can the console's data stay on our infrastructure?",
        a: "Cloud by default, with a hybrid model where content and user PII stay on your infrastructure and Velt stores only minimal identifiers, plus multi-region and isolation options. Velt is SOC 2 Type II audited and supports HIPAA with a BAA.",
      },
      {
        q: "How do I get the admin console for my app?",
        a: "It is automatic: create a free API key, add your domain under Managed Domains, install the SDK, and the console populates as your app sends events. First comment renders in about five minutes and the console is live the same day.",
      },
      {
        q: "What does the platform cost?",
        a: "Velt is priced on usage, not seats: you pay for documents with review activity in a month (monthly active documents), and agents are users, not billed seats. The console, DevTools, webhooks, and REST APIs are part of the SDK. There is a free tier for development and early production.",
      },
    ],
  },

  finalCta: {
    title: "Add a control plane for the review layer you run in production.",
    primaryCta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
    secondaryCta: { label: "Book Demo", href: DEMO_HREF },
    microcopies: ["Free tier. No credit card.", "First comment in 5 minutes."],
  },
};
