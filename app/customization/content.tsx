import Link from "next/link";

import { ShieldIcon, VeltMark } from "@/components/feature-new/icons";
import type { FeaturePageContent } from "@/components/feature-new/content";
import type { SpectrumContent } from "@/components/feature-new/Spectrum";
import type { GalleryContent } from "@/components/feature-new/ExamplesGallery";

import { CUSTOMIZATION_DEMOS as D, WhatItIsScene } from "@/components/feature-new/demo-presets/customization";

// Local, in-repo content for the new-theme /customization page.
// Rendered statically by app/customization/page.tsx via CustomizationView.
// No Sanity document is read or written. Copy follows the customization content
// spec; no em or en dashes (commas, colons, periods only).

const API_KEY_HREF = "https://console.velt.dev";
const DEMO_HREF = "/book-demo";
const DOCS_HREF = "https://velt.dev/docs/ui-customization";
const PLAYGROUND_HREF = "https://playground.velt.dev/themes";

const STEP_INSTALL = `// install the SDK and drop in a component
npm install @veltdev/react

import { VeltProvider, VeltComments } from '@veltdev/react';
<VeltProvider apiKey={VELT_API_KEY}>
  <VeltComments />
</VeltProvider>`;

const STEP_LAYER = `// pick your presentation layer:
// CSS variables apply globally, no Shadow DOM change needed
body { --velt-light-mode-accent: #4f46e5; }

// or set shadowDom={false} for selector CSS and wireframes
<VeltComments shadowDom={false} />`;

const STEP_EXTEND = `// extend behavior where needed
commentElement.on('commentPinClicked').subscribe(onClick);

// read, mutate, control through hooks
const { addComment } = useAddComment();

// REST APIs from your backend
POST https://api.velt.dev/v2/commentannotations/comments/add`;

/** Typed content for the Customization page. */
export const customizationContent: FeaturePageContent = {
  slug: "customization",

  hero: {
    kicker: "Customization",
    title: "Add review and collaboration UI that looks like your product.",
    secondary:
      "Theme it with CSS variables, restructure it with wireframes, compose it from primitives in your own UI library, or build it headless, and extend behavior with events, hooks, and REST APIs.",
    accent:
      "// No more collaboration UI that looks like it came from somewhere else.",
    primaryCta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
    secondaryCta: { label: "Book Demo", href: DEMO_HREF },
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    buildChip: { label: "Themes Playground", href: PLAYGROUND_HREF, newTab: true },
    demoTabs: [
      { id: "css", label: "CSS", content: D["hero/css"] },
      { id: "wireframes", label: "Wireframes", content: D["hero/wireframes"] },
      { id: "primitives", label: "Primitives", content: D["hero/primitives"] },
      { id: "headless", label: "Headless", content: D["hero/headless"] },
    ],
  },

  logoStrip: {
    label: "3M+ comments created in products built on Velt.",
    migration: {
      label: "Teams that moved from Liveblocks or Cord for design control.",
      links: [{ label: "Compare Velt", href: "/comparison" }],
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "Velt owns the behavior. You own the look.",
    body:
      "Velt customization is how you make the collaboration UI match your product: Velt owns the core behavior, data, and real-time sync, and you own the presentation. Take over as much of the look as you want across four layers, CSS, wireframes, primitives, and headless, and extend behavior through custom actions, events, hooks, and REST APIs. A human or a coding agent can turn a design into a working Velt UI.",
    docLinks: [
      { label: "View Docs", href: DOCS_HREF, newTab: true },
      { label: "Themes Playground", href: PLAYGROUND_HREF, newTab: true },
    ],
    scene: <WhatItIsScene />,
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Pick the layer, extend the behavior.",
    support: "Install the SDK, choose how much of the look you take over, then wire in your own behavior where needed.",
    steps: [
      {
        kicker: "01",
        title: "Install the SDK and drop in a component",
        filename: "app.tsx",
        code: STEP_INSTALL,
        copyText: STEP_INSTALL,
      },
      {
        kicker: "02",
        title: "Pick your presentation layer",
        filename: "your-theme.css",
        code: STEP_LAYER,
        copyText: STEP_LAYER,
      },
      {
        kicker: "03",
        title: "Extend behavior where needed",
        filename: "your-file.tsx",
        code: STEP_EXTEND,
        copyText: STEP_EXTEND,
      },
    ],
    mechanics: {
      heading: "One system across every layer.",
      body:
        "CSS variables pass through the shadow DOM, so variable theming always works. Selector CSS and styled wireframes need shadowDom={false}. Wireframes are cloned markup, so your own interactive components do not run inside a slot. For your own UI library or interactivity, use primitives, which are real React components you can wrap in MUI, shadcn, or Radix. Many parts are off by default (reply avatars, priority, minimap, @here, device badge) and switch on with a prop. Behavior extends through element API methods, subscribable events, headless hooks that read, mutate, and control, and the REST APIs.",
      microcopy: "mix layers on the same surface, one registry per app",
    },
    buildVsBuy: {
      heading: "A component system that stays live.",
      items: [
        "CSS variable theming through the shadow DOM",
        "Wireframe slots for custom HTML structure",
        "Primitive components to wrap in MUI, shadcn, or Radix",
        "Headless hooks for PDF, canvas, and video surfaces",
        "Custom actions, events, and hooks for behavior extension",
        "Correct against live multiplayer at every layer",
      ],
      close: "A themeable, restructurable, headless-capable component system that also exposes events, hooks, and APIs while staying correct against live multiplayer behavior is a UI framework in its own right. Velt gives you the whole spectrum, from a one-line color change to a fully custom UI, so your team styles and extends the layer instead of building it.",
    },
    mcp: {
      heading: "Agent-ready documentation.",
      sub: "The full customization model is documented end to end and available through the Velt MCP server, so a coding agent can resolve the right layer from a design.",
      tabs: [
        { id: "docs", label: "Docs", command: "velt.dev/docs/ui-customization" },
        { id: "playground", label: "Playground", command: "playground.velt.dev/themes" },
        { id: "mcp", label: "MCP", command: "npx -y @velt-js/mcp-installer" },
      ],
    },
    integrations: [
      {
        label: "Works across every SDK target",
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
      title: "Theme it in five minutes.",
      microcopy: "Free. No credit card.",
      cta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
      variant: "primary",
    },
  },

  showcase: {
    kicker: "Showcase",
    heading: "From a color change to a full rebuild.",
    support: "Four presentation layers plus a behavior axis, mixable per surface. Each card is the live SDK. Toggle to Code for the exact snippet.",
    cards: [
      {
        num: "01",
        name: "CSS theming",
        codeKicker: "// css",
        headline:
          "Recolor, respace, and retype with --velt-* CSS variables, or your own CSS or Tailwind. Variable theming even works through the shadow DOM. The fastest path.",
        preview: D["showcase/css-theming"],
        code: `// selector CSS needs shadowDom={false}; theme variables apply either way
<VeltProvider apiKey="..."><VeltComments shadowDom={false} /></VeltProvider>

body {
  --velt-light-mode-accent: #4f46e5;
  --velt-border-radius-md: 12px;
}`,
        copyText: "--velt-light-mode-accent: #4f46e5; --velt-border-radius-md: 12px;",
      },
      {
        num: "02",
        name: "Wireframes",
        codeKicker: "// wireframes",
        headline:
          "Supply your own HTML layout per slot (header, thread card, composer, empty state) and add, remove, or reorder parts while Velt keeps the behavior and data wiring.",
        preview: D["showcase/wireframes"],
        code: `<VeltWireframe>
  <VeltCommentDialogWireframe>
    <VeltCommentDialogWireframe.Header>
      <VeltData field="annotation.comments.length" /> comments
    </VeltCommentDialogWireframe.Header>
    <VeltCommentDialogWireframe.Composer />
  </VeltCommentDialogWireframe>
</VeltWireframe>`,
        copyText: "<VeltWireframe><VeltCommentDialogWireframe></VeltCommentDialogWireframe></VeltWireframe>",
      },
      {
        num: "03",
        name: "Primitives",
        codeKicker: "// primitives",
        headline:
          "Compose Velt's building-block components yourself and wrap them in your own UI library, MUI, shadcn, or Radix. Real React components, full control.",
        preview: D["showcase/primitives"],
        code: `import { VeltCommentDialog } from '@veltdev/react';

<MuiCard>
  <VeltCommentDialog annotationId={a.annotationId} />
</MuiCard>`,
        copyText: "import { VeltCommentDialog } from '@veltdev/react';",
      },
      {
        num: "04",
        name: "Headless hooks",
        codeKicker: "// headless",
        headline:
          "Velt gives you data and actions through hooks. You build 100 percent of the UI, even on surfaces Velt cannot draw, like PDF, canvas, or a video timeline.",
        preview: D["showcase/headless"],
        code: `const { data } = useGetCommentAnnotations();

return data?.map((a) => (
  <MyPin key={a.annotationId} data={a} />
));`,
        copyText: "const { data } = useGetCommentAnnotations();",
      },
      {
        num: "05",
        name: "Mix per surface",
        codeKicker: "// mix",
        headline:
          "Wireframe the dialog, use the sidebar as a primitive, theme both with CSS, all under one VeltWireframe registry. You are not locked into one layer.",
        preview: D["showcase/mix"],
        code: `<VeltWireframe>{/* dialog slots */}</VeltWireframe>
<VeltCommentsSidebar />   {/* primitive, same app, one registry */}`,
        copyText: "<VeltWireframe></VeltWireframe>",
      },
      {
        num: "06",
        name: "Your own data in the UI",
        codeKicker: "// custom data",
        headline:
          "Render your app's fields inside Velt components and wireframes with template variables and VeltData, and read that context back out. Threads can show your data, not just Velt's.",
        preview: D["showcase/custom-data"],
        code: `<div>
  <VeltData field="annotation.status.id" />
  <VeltData field="dealStage" />
</div>`,
        copyText: "<VeltData field=\"annotation.status.id\" />",
      },
      {
        num: "07",
        name: "Conditional UI and hidden features",
        codeKicker: "// conditional",
        headline:
          "Render differently by user, role, or any condition with VeltIf, and switch on parts that are off by default: reply avatars, priority, minimap, @here.",
        preview: D["showcase/conditional"],
        code: `<VeltIf condition="{user.role} === 'reviewer'">...</VeltIf>
<VeltComments replyAvatars={true} minimap={true} />`,
        copyText: "<VeltIf condition=\"{user.role} === 'reviewer'\">...</VeltIf>",
      },
      {
        num: "08",
        name: "UI variants",
        codeKicker: "// variants",
        headline:
          "Define a collection of reusable component variants once, then apply them consistently across every surface in your product.",
        preview: D["showcase/variants"],
        code: `<VeltComments variant="compact" />`,
        copyText: "<VeltComments variant=\"compact\" />",
      },
      {
        num: "09",
        name: "Extend behavior with APIs, events, and hooks",
        codeKicker: "// behavior",
        headline:
          "Velt owns the core sync, but you customize behavior: attach custom actions and handlers, subscribe to events, mutate through hooks, and call the REST APIs.",
        preview: D["showcase/extend-behavior"],
        code: `commentElement.on('commentPinClicked').subscribe(onClick);
const { addComment } = useAddComment();

# REST: create a comment from your backend
POST https://api.velt.dev/v2/commentannotations/comments/add`,
        copyText: "commentElement.on('commentPinClicked').subscribe(onClick);",
      },
      {
        num: "10",
        name: "Design to code, agent-ready",
        codeKicker: "// agent",
        headline:
          "The customization model is deterministic and documented end to end, so you or a coding agent can turn a Figma design into a working Velt UI.",
        preview: D["showcase/design-to-code"],
        code: `// Decision tree (guide 02):
// only colors? CSS.
// new layout? Wireframes.
// own UI library or interactivity? Primitives.
// own everything? Headless.`,
        copyText: "// only colors? CSS. new layout? Wireframes. own UI library? Primitives. own everything? Headless.",
      },
    ],
    docLinks: [
      { label: "View Docs", href: DOCS_HREF, newTab: true },
      { label: "Themes Playground", href: PLAYGROUND_HREF, newTab: true },
    ],
  },

  details: {
    kicker: "Little big details",
    heading: "The full system, enumerated.",
    support: "The showcase is the highlight reel. This is the index.",
    items: [
      { label: "Full set of --velt-* theme variables for color, radius, spacing, and type" },
      { label: "Separate --velt-light-mode-* and --velt-dark-mode-* color variables" },
      { label: "Stateful CSS classes to target, like --selected and --loading" },
      { label: "Custom font-family via --velt-default-font-family and class overrides" },
      { label: "shadowDom={false} for selector CSS and styled wireframes" },
      { label: "Wireframe components for every Velt surface" },
      { label: "Sub-components for each part via dot notation (Header, Body, Composer)" },
      { label: "Template variables like {annotation.status.id} and {user.name}" },
      { label: "velt-if, velt-class, and velt-data tokens" },
      { label: "Per-slot behavior wired by Velt" },
      { label: "Primitive components for full control (98+ for the Comment Dialog alone)" },
      { label: "Sub-component for nearly every child element" },
      { label: "Wrap in any UI library: MUI, shadcn, Radix" },
      { label: "Targeted single-component customization" },
      { label: "useGetCommentAnnotations, useAddComment, and more headless hooks" },
      { label: "Render on PDF, canvas, and video timelines" },
      { label: "Element API methods (getCommentElement and more)" },
      { label: "Subscribable events via .on()" },
      { label: "Action components (VeltButtonWireframe) with click callbacks" },
      { label: "Custom data via UI State (client.setUiState)" },
      { label: "REST APIs (POST /v2/commentannotations/comments/add and more)" },
      { label: "Reusable named UI variants" },
      { label: "Reply avatars, priority, minimap, @here, device badge (off by default)" },
      { label: "Coverage: comments, sidebar, notifications, reactions, presence, cursors, recorder, mentions, activity log, annotations" },
      { label: "Dark mode and theme presets" },
      { label: "Framework targets: React, Next.js, Vue, Angular, HTML" },
    ],
    visibleCount: 12,
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "The tools and the system behind it.",
    support: "Design tools to preview and prototype, and the component system to build on.",
    cards: [
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Design tools",
        body:
          "The Themes Playground lets you design and preview a theme live against real components. The Figma UI Kit gives you the components to design against. The Launch Kit gets you to production faster.",
        preview: D["make-it-yours/design-tools"],
        code: `// preview your theme live
playground.velt.dev/themes

// design against the Velt Figma UI Kit`,
        copyText: "playground.velt.dev/themes",
      },
      {
        icon: <ShieldIcon />,
        title: "The component system",
        body:
          "Prebuilt components for the fast path, wireframes for structure, primitives for full control, headless hooks for everything else. All themeable with the variable system, plus events, hooks, and APIs for behavior. Dark mode and theme presets included.",
        preview: D["make-it-yours/component-system"],
        code: `// the whole spectrum in one import
import {
  VeltComments,             // prebuilt
  VeltWireframe,            // wireframes
  VeltCommentDialog,        // primitive
  useGetCommentAnnotations, // headless
} from '@veltdev/react';`,
        copyText: "import { VeltComments, VeltWireframe, VeltCommentDialog, useGetCommentAnnotations } from '@veltdev/react';",
      },
    ],
  },

  // CustomizationView does not render inProduction (ExamplesGallery replaces it),
  // but FeaturePageContent requires the field. Minimal valid stub provided.
  inProduction: {
    kicker: "",
    heading: "",
    support: "",
    tabs: [],
    whereItFits: { label: "", links: [] },
    ctaBanner: { title: "", microcopy: "", cta: { label: "", href: "#" } },
  },

  related: {
    kicker: "Related",
    heading: "The surfaces you customize most.",
    support: "Each is its own page.",
    cards: [
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Comments",
        body: "The most-customized surface: dialogs, threads, pins, composers, and sidebars.",
        visual: D["related/comments"],
        link: { label: "Comments", href: "/comments" },
      },
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Notifications",
        body: "A customizable notification inbox and feed with its own component system.",
        visual: D["related/notifications"],
        link: { label: "Notifications", href: "/notifications" },
      },
      {
        icon: <VeltMark size={18} fill="var(--vlp-color-accent)" />,
        title: "Presence and cursors",
        body: "Themeable avatars and cursors for humans and agents, matched to your palette.",
        visual: D["related/presence"],
        link: { label: "Presence and cursors", href: "/presence" },
      },
      {
        icon: <ShieldIcon />,
        title: "Webhooks and API",
        body: "The events, hooks, and REST surface behind custom behavior and headless builds.",
        visual: D["related/webhooks"],
        link: { label: "Webhooks and API", href: "/webhooks-and-api" },
      },
    ],
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA with BAA", "Data residency"],
    line: (
      <>
        Customization is presentation and behavior extension only and does not change where your data lives. The one setup flag it touches is{" "}
        <code>shadowDom</code>. See <Link href="/enterprise">Enterprise</Link> and <Link href="/self-hosting">Self-hosting</Link>.
      </>
    ),
    cta: { label: "View Trust Center", href: "https://trust.velt.dev", newTab: true },
  },

  testimonials: {
    kicker: "Proof",
    heading: "Design control, in production.",
    support: "Teams that kept a cohesive look and feel.",
    cards: [
      {
        metric: "Design system match",
        quote: "Velt's customizable components let us keep a cohesive look and feel. Our users never knew it was a third-party SDK.",
        who: "Senior PM, Google",
      },
    ],
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions buyers and agents ask.",
    items: [
      {
        q: "Can I make Velt match my design system?",
        a: "Yes. Theme everything with --velt-* CSS variables, override classes with !important, and reuse your own CSS or Tailwind. For selector-based CSS, set shadowDom={false} so your styles reach inside the component.",
      },
      {
        q: "Can I change the layout, not just the colors?",
        a: "Yes. Wireframes let you supply your own HTML layout for each slot (header, thread card, composer, empty state) and add, remove, or reorder parts while Velt keeps the behavior and data wiring. This is the default for structural customization.",
      },
      {
        q: "Can I customize behavior, not just appearance?",
        a: "Yes. Velt owns the core sync, but you extend behavior: attach custom actions and handlers to components, subscribe to events with .on(), mutate through headless hooks, and call the REST APIs (for example POST /v2/commentannotations/comments/add).",
      },
      {
        q: "Can I use my own React component library inside the comment UI?",
        a: "Yes, with primitives, which are real React components you can wrap in MUI, shadcn, or Radix. Wireframes clone your markup, so interactive components do not run inside a slot. For your own interactivity, use primitives.",
      },
      {
        q: "Can I build a completely custom UI?",
        a: "Yes. Headless hooks give you the data and actions, and you build 100 percent of the UI, including on surfaces Velt does not draw, like a PDF, a canvas, or a video timeline.",
      },
      {
        q: "Why isn't my CSS working?",
        a: "Velt can render inside a shadow DOM, which your global stylesheets cannot reach. CSS variables still pass through, so variable theming works. For selector CSS or styled wireframes, set shadowDom={false}.",
      },
      {
        q: "Can I show my own data inside Velt components?",
        a: "Yes. Template variables and VeltData render your app's fields inside components and wireframes, and you can read that context back out, so a thread can carry your own data.",
      },
      {
        q: "A part of the component I want is not showing.",
        a: "Many parts are off by default (reply avatars, priority, minimap, @here, device badge) and switch on with a prop or method. Check the feature flags before assuming it is missing.",
      },
      {
        q: "Can an AI agent customize Velt from my design?",
        a: "Yes. The customization model is deterministic and documented end to end, and the docs are available to coding agents through the MCP server, so an agent can turn a Figma design into a working Velt UI.",
      },
      {
        q: "Does customization cost extra?",
        a: "No. Customization is part of the SDK, not a separately priced add-on. Velt is priced on usage (monthly active documents), not per seat, with a free tier for development and early production.",
      },
    ],
  },

  finalCta: {
    title: "Add review and collaboration UI that looks like your product.",
    primaryCta: { label: "Get Free API Key", href: API_KEY_HREF, newTab: true },
    secondaryCta: { label: "Book Demo", href: DEMO_HREF },
    microcopies: ["Free tier. No credit card.", "First comment in 5 minutes."],
  },
};

/** Spectrum section content for the /customization page (section 5 key art). */
export const spectrumContent: SpectrumContent = {
  kicker: "The spectrum",
  heading: "Pick the layer that expresses your design.",
  support: "Start at CSS and escalate only when the layer below cannot express your design. Mix layers on the same surface.",
  axisLeft: "less effort, Velt does more",
  axisRight: "more effort, you do more",
  layers: [
    { name: "CSS", sub: "theme" },
    { name: "Wireframes", sub: "your layout" },
    { name: "Primitives", sub: "compose, your UI" },
    { name: "Headless", sub: "build it all" },
  ],
  cssBracket: "CSS layers on top of every approach",
  behaviorLabel: "Behavior, any layer",
  behaviorItems: [
    "custom actions",
    "events (.on)",
    "hooks (read / mutate / control)",
    "REST APIs",
  ],
};

/** Examples gallery content for the /customization page (section 9). */
export const galleryContent: GalleryContent = {
  kicker: "In production",
  heading: "Looks like the tools your users already know.",
  support: "Velt can be styled into any pattern your users trust. These are in production today.",
  items: [
    { label: "Canvas comments", analogy: "like Figma.", visual: D["gallery/canvas"] },
    { label: "Cell comments", analogy: "like Google Sheets.", visual: D["gallery/cell"] },
    { label: "Video comments", analogy: "like Frame.io.", visual: D["gallery/video"] },
    { label: "Co-editing", analogy: "like Google Docs.", visual: D["gallery/coediting"] },
    { label: "Huddles", analogy: "like Slack.", visual: D["gallery/huddles"] },
    { label: "Presence and cursors", analogy: "like Miro.", visual: D["gallery/presence"] },
    { label: "Notifications", analogy: "like Knock.", visual: D["gallery/notifications"] },
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
    title: "Want it to look a specific way? Show us.",
    microcopy: "30 minutes, with an engineer.",
    cta: { label: "Book Demo", href: DEMO_HREF },
    variant: "secondary",
  },
};
