import Link from "next/link";

import { ShieldIcon, VeltMark } from "@/components/feature-new/icons";
import type { FeaturePageContent } from "@/components/feature-new/content";

import { DEVTOOLS_DEMOS as D } from "@/components/feature-new/demo-presets/devtools";

// Local, in-repo content for the new-theme /devtools (Chrome Extension) page.
// Rendered statically by app/devtools/page.tsx via FeaturePageView, no Sanity
// document is read or written. Copy is the proposed net-new copy from the
// devtools content spec; no em or en dashes (commas, colons, periods only).

const CHROME_EXT_HREF = "https://chromewebstore.google.com/detail/velt-devtools/nfldoicbagllmegffdapcnohakpamlnl";
const API_KEY_HREF = "https://console.velt.dev";
const DEMO_HREF = "/book-demo";
const DOCS_HREF = "https://docs.velt.dev";

const STEP_INSTALL = `# install from the Chrome Web Store
# chromewebstore.google.com
# search: Velt DevTools`;

const STEP_OPEN = `// open your app with the Velt SDK running,
// then click the Velt DevTools extension icon
// in your browser toolbar to open the panel`;

const STEP_DEBUG = `// pick a tab: Overview, Data, Events, Components
// or switch the SDK version to reproduce a bug
// works in dev and production builds`;

/** Typed content for the DevTools page. */
export const devtoolsContent: FeaturePageContent = {
  slug: "devtools",

  hero: {
    kicker: "DevTools",
    title: "Add a browser debugger for your Velt integration.",
    secondary:
      "A Chrome extension that surfaces your installation, data, live event stream, and mounted components, and switches between SDK versions, all in the browser.",
    accent:
      "// Stop guessing why a component will not render or an event will not fire.",
    primaryCta: { label: "Get Chrome Extension", href: CHROME_EXT_HREF, newTab: true },
    secondaryCta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
    microcopy: "Free extension. Works with your free API key.",
    buildChip: { label: "Get the extension", href: CHROME_EXT_HREF, newTab: true },
    demoTabs: [
      { id: "overview", label: "Overview", content: D["hero/overview"] },
      { id: "data", label: "Data", content: D["hero/data"] },
      { id: "events", label: "Events", content: D["hero/events"] },
      { id: "components", label: "Components", content: D["hero/components"] },
      { id: "versions", label: "Versions", content: D["hero/versions"] },
    ],
  },

  logoStrip: {
    label: "3M+ comments created in products built on Velt.",
    migration: {
      label: "Teams that integrated Velt faster with DevTools.",
      links: [{ label: "Compare Velt", href: "/comparison" }],
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "One extension, humans and agents.",
    body:
      "Velt DevTools is a Chrome extension that debugs your Velt integration in the browser: it shows your installation overview, the data Velt has surfaced in your product, a live event stream, and the components you have mounted, and it switches between SDK versions to reproduce a fix. Agent activity appears in the same event stream as human activity, because an agent is a user with type agent, so you can watch what an agent did.",
    docLinks: [
      { label: "View Docs", href: DOCS_HREF, newTab: true },
      { label: "Get the extension", href: CHROME_EXT_HREF, newTab: true },
    ],
    scene: D["what-it-is/scene"],
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Install, open, debug.",
    support: "Install the extension, open your app with the SDK running, and pick a tab.",
    steps: [
      {
        kicker: "01",
        title: "Install the extension",
        filename: "Chrome Web Store",
        code: STEP_INSTALL,
        copyText: STEP_INSTALL,
      },
      {
        kicker: "02",
        title: "Open your app and the panel",
        filename: "browser",
        code: STEP_OPEN,
        copyText: STEP_OPEN,
      },
      {
        kicker: "03",
        title: "Pick a tab or switch SDK version",
        filename: "extension panel",
        code: STEP_DEBUG,
        copyText: STEP_DEBUG,
      },
    ],
    mechanics: {
      heading: "Nothing to add to your code.",
      body:
        "The extension attaches to your running app and reads the Velt SDK live state, so there is nothing to add to your code beyond the SDK you already installed. It streams events as they fire, lists the Velt data surfaced in the page, locates and lets you interact with mounted components, and loads a different SDK version on demand to reproduce a bug or confirm a fix. It works wherever the SDK works: React, Next.js, Vue, Angular, and plain HTML.",
      microcopy: "no code changes, debug the same day",
    },
    buildVsBuy: {
      heading: "Debugging by hand takes hours.",
      items: [
        "Console logs to find what the SDK can see",
        "Network-tab archaeology to track what fired",
        "Guessing which component is misbehaving",
        "Version pinning to reproduce a regression",
        "Support threads for what a panel would show instantly",
      ],
      close: "DevTools replaces all of that with a live view of your installation, data, events, and components, so integration bugs surface in minutes, not a support thread. The extension is free.",
    },
    mcp: {
      heading: "Works with every Velt SDK target.",
      sub: "No per-framework setup. Install the extension, make sure the SDK is running, and open the panel.",
      tabs: [
        { id: "react", label: "React", command: "npm i @veltdev/react" },
        { id: "nextjs", label: "Next.js", command: "npm i @veltdev/react" },
        { id: "vue", label: "Vue", command: "npm i @veltdev/vue" },
        { id: "angular", label: "Angular", command: "npm i @veltdev/angular" },
        { id: "html", label: "HTML", command: '<script src="https://cdn.velt.dev/sdk.js">' },
      ],
    },
    integrations: [
      {
        label: "Works with every Velt SDK target",
        chips: [
          { label: "React", href: DOCS_HREF, icon: "/images/home/nav-icons/react.svg" },
          { label: "Next.js", href: DOCS_HREF, icon: "/images/home/nav-icons/nextdotjs.svg" },
          { label: "Vue", href: DOCS_HREF, icon: "/images/home/nav-icons/vuedotjs.svg" },
          { label: "Angular", href: DOCS_HREF, icon: "/images/home/nav-icons/angular.svg" },
          { label: "HTML", href: DOCS_HREF, icon: "/images/home/nav-icons/html5.svg" },
        ],
      },
    ],
    ctaBanner: {
      title: "Install the extension, debug in minutes.",
      microcopy: "Free, no credit card.",
      cta: { label: "Get Chrome Extension", href: CHROME_EXT_HREF, newTab: true },
      variant: "primary",
    },
  },

  showcase: {
    kicker: "Showcase",
    heading: "See exactly what Velt is doing.",
    support: "Five panels in one extension, plus your agents in the same stream. Each is the live extension.",
    cards: [
      {
        num: "01",
        name: "Installation overview",
        codeKicker: "// overview",
        headline:
          "Key details about your Velt installation at a glance: API key, environment, config, and what is mounted. Confirm the SDK is wired correctly before you debug deeper.",
        preview: D["showcase/installation-overview"],
        code: "// overview tab: apiKey, environment, sdkVersion,\n// config, mounted components, document",
        copyText: "overview tab: apiKey, environment, sdkVersion, config, mounted components",
      },
      {
        num: "02",
        name: "Data inspector",
        codeKicker: "// data",
        headline:
          "View all the Velt data surfaced in your product: comments, threads, users, documents, and locations, the same data your users see.",
        preview: D["showcase/data-inspector"],
        code: "// data tab: comments, threads, users,\n// documents, locations",
        copyText: "data tab: comments, threads, users, documents, locations",
      },
      {
        num: "03",
        name: "Live event stream",
        codeKicker: "// events",
        headline:
          "Monitor every Velt event in real time, searchable and timestamped, so you see exactly what fired and in what order as you click through your app.",
        preview: D["showcase/live-event-stream"],
        code: "// events tab: live stream, search, timestamps\n// Document is Set, Comment is Added, User Authenticated",
        copyText: "events tab: live stream, searchable, timestamped",
      },
      {
        num: "04",
        name: "Component inspector",
        codeKicker: "// components",
        headline:
          "Find and interact with the Velt components mounted in your product, so you can locate the one misbehaving and act on it directly.",
        preview: D["showcase/component-inspector"],
        code: "// components tab: VeltComments, VeltPresence,\n// VeltNotifications, locate and interact",
        copyText: "components tab: locate and interact with mounted Velt components",
      },
      {
        num: "05",
        name: "SDK version switching",
        codeKicker: "// versions",
        headline:
          "Switch between SDK versions right in the browser to reproduce a bug or confirm a fix, without changing your build.",
        preview: D["showcase/sdk-version-switching"],
        code: "// versions tab: switch without changing your build\n// reproduce a bug, confirm a fix",
        copyText: "versions tab: switch between SDK versions without changing your build",
      },
      {
        num: "06",
        name: "Agent activity, visible",
        codeKicker: "// agent",
        headline:
          "Agent events stream beside human events, because an agent is a user with type agent, so you can watch and debug what an agent did, event by event.",
        preview: D["showcase/agent-activity"],
        code: "// agent events in the same stream as human events\n// user.type === 'agent'",
        copyText: "agent events in the same stream as human events",
      },
    ],
    docLinks: [
      { label: "View Docs", href: DOCS_HREF, newTab: true },
      { label: "Get the extension", href: CHROME_EXT_HREF, newTab: true },
    ],
    interstitial: {
      quote: "We found the broken wire in minutes using DevTools, not a support thread.",
      who: "Product Manager, HeyGen",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "Every panel, every detail.",
    support: "The showcase is the highlight reel. This is the index.",
    items: [
      { label: "Installation health check" },
      { label: "API key and environment display" },
      { label: "Detected SDK version" },
      { label: "Config inspection" },
      { label: "Mounted components list" },
      { label: "Comments and threads in the data tab" },
      { label: "Users and online presence in the data tab" },
      { label: "Documents and locations in the data tab" },
      { label: "Live event stream, real time" },
      { label: "Event search and filter" },
      { label: "Event types: Document is Set, Comment is Added, Multi Cursor Initiated, New User Detected, User Authenticated" },
      { label: "Event timestamps" },
      { label: "Locate and highlight mounted Velt components" },
      { label: "Interact with mounted components from the panel" },
      { label: "Switch between SDK versions in the browser" },
      { label: "No build change needed for version switching" },
      { label: "Agent events in the same stream as human events" },
      { label: "Works in development builds" },
      { label: "Works in production builds" },
      { label: "React, Next.js, Vue, Angular, and plain HTML" },
      { label: "No per-framework extension setup" },
      { label: "Chrome Web Store distribution" },
      { label: "No code changes beyond the SDK" },
    ],
    visibleCount: 12,
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "The data behind the panel is yours.",
    support: "DevTools is Velt own fixed UI. What is yours is the data behind it.",
    cards: [
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "SDK event APIs",
        body:
          "The same events the panel streams are available programmatically through the SDK event APIs, so you can build your own internal debugging or monitoring view, or route events to your observability stack.",
        preview: D["make-it-yours/sdk-events"],
        code: "client.on('commentAdded', (data) => {\n  console.log(data);\n});",
        copyText: "client.on('commentAdded', (data) => { console.log(data); });",
      },
    ],
    interstitial: {
      quote: "Having the SDK event APIs means we can pipe Velt events into our own observability dashboard.",
      who: "Staff engineer, AI-native SaaS",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "See the extension on your work.",
    support: "Where the debugger fits, by team.",
    tabs: [
      {
        id: "ai-native",
        label: "AI-native SaaS",
        visual: D["in-production/ai-native"],
        caption: "Watch agent events land in the stream as your agents act, and confirm each one fired as intended before users see it.",
        link: { label: "For AI-native SaaS", href: "/for/ai-native-saas" },
      },
      {
        id: "fintech",
        label: "Fintech and compliance",
        visual: D["in-production/fintech"],
        caption: "Verify the right events and data are flowing during a careful integration, with a live view instead of guesswork.",
        link: { label: "For fintech", href: "/for/fintech" },
      },
    ],
    whereItFits: {
      label: "Where it fits",
      links: [
        { label: "AI-native SaaS", href: "/for/ai-native-saas" },
        { label: "Fintech", href: "/for/fintech" },
        { label: "Operations", href: "/for/operations" },
        { label: "Sales enablement", href: "/for/sales-enablement" },
      ],
    },
    ctaBanner: {
      title: "Debugging something now? Talk to an engineer.",
      microcopy: "30 minutes, with an engineer.",
      cta: { label: "Book Demo", href: DEMO_HREF },
      variant: "secondary",
    },
  },

  related: {
    kicker: "Related",
    heading: "The pieces the extension looks into.",
    support: "Each is its own page.",
    cards: [
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Admin Console",
        body: "The console the extension complements, with analytics, data explorer, and webhooks.",
        visual: D["related/admin-console"],
        link: { label: "Admin Console", href: "/platform" },
      },
      {
        icon: <ShieldIcon />,
        title: "Webhooks and API",
        body: "The events you see in the stream, delivered to your backend.",
        visual: D["related/webhooks"],
        link: { label: "Webhooks and API", href: "/webhooks-and-api" },
      },
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "MCP",
        body: "The docs and setup server for coding agents working with Velt.",
        visual: D["related/mcp"],
        link: { label: "MCP docs", href: DOCS_HREF, newTab: true },
      },
      {
        icon: <ShieldIcon />,
        title: "Audit trail",
        body: "The durable record behind the live event stream.",
        visual: D["related/audit-trail"],
        link: { label: "Audit trail", href: "/audit-trail" },
      },
    ],
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA with BAA", "Data residency"],
    line: (
      <>
        The extension reads your running app locally in the browser and does not change where your data lives. Per-feature data providers keep content and PII on your infrastructure. See <Link href="/enterprise">Enterprise</Link> and <Link href="/self-hosting">Self-hosting</Link>.
      </>
    ),
    cta: { label: "View Trust Center", href: "https://trust.velt.dev", newTab: true },
  },

  testimonials: {
    kicker: "Proof",
    heading: "Teams that debugged faster.",
    support: "Real names, real products.",
    cards: [
      {
        metric: "Minutes, not hours",
        quote: "We found the integration bug in minutes with DevTools. Without it we would have spent a day in the console logs.",
        who: "Product Manager, HeyGen",
      },
      {
        metric: "Same-day integration",
        quote: "The DevTools extension confirmed our Velt setup was correct before we even wrote a single test. Huge time saver.",
        who: "Frontend engineer, AI-native SaaS",
      },
      {
        metric: "Agent visibility",
        quote: "Seeing agent events in the same stream as human events in DevTools is exactly what we needed to debug our AI review flow.",
        who: "Staff engineer, fintech platform",
      },
    ],
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions buyers and agents ask.",
    items: [
      {
        q: "What is Velt DevTools?",
        a: "It is a Chrome extension that debugs your Velt integration in the browser: an installation overview, a data inspector, a live event stream, a component inspector, and SDK version switching, all reading your running app.",
      },
      {
        q: "How do I install it?",
        a: "Add the Velt DevTools extension from the Chrome Web Store, open your app with the Velt SDK running, and open the extension panel. There is no code to add beyond the SDK.",
      },
      {
        q: "Does it work in production, or only in development?",
        a: "It attaches to your running app in either, so you can inspect a development build or reproduce an issue against production.",
      },
      {
        q: "Can I see which Velt events fired and when?",
        a: "Yes. The live event stream lists every Velt event in real time, searchable and timestamped, so you can watch exactly what fired and in what order as you use your app.",
      },
      {
        q: "Can I test against a different SDK version?",
        a: "Yes. Switch between SDK versions in the browser to reproduce a bug or confirm a fix, without changing your build.",
      },
      {
        q: "Does DevTools show agent activity?",
        a: "Yes. An agent is a user with type agent, so agent events appear in the same stream as human events. The extension is where you watch and debug what an agent did.",
      },
      {
        q: "Which frameworks does it work with?",
        a: "Every Velt SDK target: React, Next.js, Vue, Angular, and plain HTML. There is no per-framework setup for the extension.",
      },
      {
        q: "How do I add DevTools to my React app?",
        a: "You do not add anything to the app. Install the extension, make sure the Velt SDK is running in your React app, and open the panel; it reads the live SDK state.",
      },
      {
        q: "What does DevTools cost?",
        a: "The extension is free. It works with your free Velt API key, and Velt itself is priced on usage (monthly active documents), not per seat, with a free tier for development and early production.",
      },
    ],
  },

  finalCta: {
    title: "Add a browser debugger for your Velt integration.",
    primaryCta: { label: "Get Chrome Extension", href: CHROME_EXT_HREF, newTab: true },
    secondaryCta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
    microcopies: ["Free extension. Works with your free API key."],
  },
};
