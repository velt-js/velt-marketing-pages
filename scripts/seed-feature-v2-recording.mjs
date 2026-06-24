#!/usr/bin/env node
/**
 * Seed the featurePageV2-recording document in Sanity so it renders at
 * /new-features/recording via app/new-features/[slug]/page.tsx.
 *
 * Consolidated page: /recording covers voice, video, and screen recordings
 * plus the built-in video editor (anchor #video-editor; the folded video
 * editor renders as a showcase card).
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-v2-recording.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-v2-recording.mjs
 *
 * Idempotent: re-runs replace the existing document (createOrReplace).
 * Demo visuals are NOT stored here; each *Preset field references a key wired
 * in components/feature-new/demo-presets/recording.tsx.
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
 * Add a stable _key (and optional _type) to each item in an array, as Sanity
 * requires for array members.
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

const STEP_INSTALL = `npm install @veltdev/react`;
const STEP_PROVIDER = `<VeltProvider
  apiKey={VELT_API_KEY}>
  <YourApp />
</VeltProvider>`;
const STEP_MOUNT = `<VeltRecorderNotes />
<VeltRecorderTool type="all" />
<VeltRecorderControlPanel />
<VeltRecorderPlayer />`;

const doc = {
  _id: "featurePageV2-recording",
  _type: "featurePageV2",
  title: "Recording",
  slug: { _type: "slug", current: "recording" },
  beta: false,
  breadcrumbLabel: "Recording",
  metaTitle: "Recording | Loom-style recordings and video editor | Velt",
  metaDescription:
    "Voice, video, and screen captures pinned to the exact spot in the work, with a built-in video editor.",

  hero: {
    kicker: "Recording",
    title: "Add Loom-style native recordings to your product.",
    secondary: "Voice, video, and screen captures pinned to the exact spot in the work.",
    accent: "Stop pushing your users to another tool every time they need to show, not tell.",
    microcopy: "Free tier. No credit card. First comment in 5 minutes.",
    primaryCta: cta("Get Free API Key", "https://console.velt.dev/", true),
    secondaryCta: cta("Book Demo", "/book-demo"),
    buildChip: cta("Build this", "#how-it-works"),
    demoTabs: keyed(
      [
        { id: "voice", label: "Voice", demoPreset: "recording/hero/voice" },
        { id: "video", label: "Video", demoPreset: "recording/hero/video" },
        { id: "screen", label: "Screen", demoPreset: "recording/hero/screen" },
        { id: "editor", label: "Video editor", demoPreset: "recording/hero/editor" },
      ],
      "vfpHeroTab",
    ),
  },

  logoStrip: {
    label: "Native recordings running inside products at",
    migration: {
      label: "Migrating from a screen recorder or an in-house build?",
      links: keyed([cta("Compare", "/compare/recording"), cta("Migration guide", "https://docs.velt.dev/", true)]),
    },
  },

  whatItIs: {
    kicker: "What it is",
    heading: "Show, don\u2019t tell. Both actors.",
    body: "Voice, video, and screen recordings pinned to the exact spot in the work. Recordings are Velt objects: commentable, notifiable, audit-trailed. The Velt Recorder is a set of components: Recorder Notes pin recordings to specific locations on the screen, the Recorder Tool starts one, the Control Panel manages it, the Player plays it back by ID, and the Video Editor edits it in place. Recordings transcribe automatically, so what was said becomes text that humans and agents can read.",
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/recorder/overview", true),
      cta("View Examples", "/examples"),
    ]),
    scene: "recording/what-it-is/scene",
  },

  howItWorks: {
    kicker: "How it works",
    heading: "Three steps to the first recording.",
    support:
      "Wrap your app, mount the recorder components, and voice, video, and screen recording work out of the box. Recordings pin to the work, transcribe automatically, and play back anywhere through the Player.",
    steps: keyed(
      [
        { kicker: "Step 01 \u00b7 Install", title: "Add the SDK.", filename: "terminal", code: STEP_INSTALL, copyText: STEP_INSTALL },
        { kicker: "Step 02 \u00b7 Wrap", title: "Provide your app.", filename: "_app.tsx", code: STEP_PROVIDER, copyText: STEP_PROVIDER },
        { kicker: "Step 03 \u00b7 Mount", title: "Add the recorder.", filename: "ReviewDoc.tsx", code: STEP_MOUNT, copyText: STEP_MOUNT },
      ],
      "vfpStep",
    ),
    mechanics: {
      heading: "The mechanics",
      body: "Mount the Recorder Tool where users work and set its type to audio, video, screen, or all. Recordings pin to on-screen locations through Recorder Notes and play back anywhere through the Player. Transcription runs automatically and can be turned off. The SDK fires an event at every step of the recording lifecycle, and recordings are queryable through the SDK and the Get Recordings REST API. The video editor opens on a finished take without leaving the page.",
      microcopy: "// type='audio' | 'video' | 'screen' | 'all' \u00b7 transcription on by default",
    },
    buildVsBuy: {
      heading: "What an in-house version requires",
      items: [
        "getUserMedia and getDisplayMedia handling across browsers",
        "encoding and MIME-type fallbacks",
        "chunked uploads for long takes and bad networks",
        "storage and CDN plumbing",
        "a playback player with waveforms",
        "pinning recordings to DOM positions that survive layout changes",
        "a transcription pipeline with subtitles",
        "a trim-and-split editor with re-encoding",
        "permission flows and GDPR deletion paths",
      ],
      close:
        "Teams that build it budget a quarter for the recorder alone; the editor and transcription are each their own project. The 3 steps above replace all three.",
    },
    mcp: {
      heading: "MCP: the faster path.",
      sub: "Skip the steps. Have your agent set it up.",
      tabs: keyed(
        [
          { id: "cursor", label: "Cursor", command: "npx -y @velt-js/mcp-installer" },
          { id: "claude", label: "Claude Code", command: "claude mcp add velt-installer -- npx -y @velt-js/mcp-installer" },
          { id: "windsurf", label: "Windsurf", command: "npx -y @velt-js/mcp-installer" },
          { id: "copilot", label: "Copilot", command: "npx -y @velt-js/mcp-installer" },
          { id: "zed", label: "Zed", command: "npx -y @velt-js/mcp-installer" },
        ],
        "vfpMcpTab",
      ),
    },
    integrations: keyed(
      [
        {
          label: "SDK frameworks",
          chips: keyed(
            [
              { label: "React", href: "https://docs.velt.dev/quickstart/react", newTab: true, icon: "/images/home/nav-icons/react.svg" },
              { label: "Next.js", href: "https://docs.velt.dev/quickstart/nextjs", newTab: true, icon: "/images/home/nav-icons/nextdotjs.svg" },
              { label: "Angular", href: "https://docs.velt.dev/quickstart/angular", newTab: true, icon: "/images/home/nav-icons/angular.svg" },
              { label: "Vue", href: "https://docs.velt.dev/quickstart/vue", newTab: true, icon: "/images/home/nav-icons/vuedotjs.svg" },
              { label: "HTML", href: "https://docs.velt.dev/quickstart/html", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "Self-hosted media",
          chips: keyed(
            [
              { label: "Amazon S3", href: "https://docs.velt.dev/async-collaboration/recorder/overview", newTab: true },
              { label: "Google Cloud Storage", href: "https://docs.velt.dev/async-collaboration/recorder/overview", newTab: true },
              { label: "Azure Blob", href: "https://docs.velt.dev/async-collaboration/recorder/overview", newTab: true },
              { label: "Your own servers", href: "https://docs.velt.dev/async-collaboration/recorder/overview", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
        {
          label: "APIs and data",
          chips: keyed(
            [
              { label: "Get Recordings REST API", href: "https://docs.velt.dev/async-collaboration/recorder/overview", newTab: true },
              { label: "Recorder data provider", href: "https://docs.velt.dev/async-collaboration/recorder/overview", newTab: true },
            ],
            "vfpIntegrationChip",
          ),
        },
      ],
      "vfpIntegrationGroup",
    ),
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "Launch recordings this week.",
      microcopy: "No credit card. Works with React, Next.js, Vue, Angular, and HTML.",
      cta: cta("Get Free API Key", "https://console.velt.dev/", true),
    },
  },

  showcase: {
    kicker: "Capabilities",
    heading: "Feedback you can watch.",
    support: "Each card is the live SDK. Toggle to Code for the exact snippet that renders it.",
    cards: keyed(
      [
        {
          num: "01",
          name: "Voice notes",
          codeKicker: "// voice",
          headline:
            "One tap starts an audio note; the clip pins to the cell or clause it is about. When the explanation is faster spoken than typed, it stays where the number is.",
          preview: "recording/showcase/voice",
          code: '<VeltRecorderTool type="audio" />',
        },
        {
          num: "02",
          name: "Video messages",
          codeKicker: "// video",
          headline:
            "Camera recordings captured and saved inside your product, played back in the thread. The reviewer\u2019s face and tone travel with the deck instead of a pasted link.",
          preview: "recording/showcase/video",
          code: '<VeltRecorderTool type="video" />',
        },
        {
          num: "03",
          name: "Screen capture",
          codeKicker: "// screen",
          headline:
            "Tab or full-screen recording with mic narration, started from one button in your UI. A reviewer walks through the filing the way they would in person.",
          preview: "recording/showcase/screen",
          code: '<VeltRecorderTool type="screen" />',
        },
        {
          num: "04",
          name: "Pinned recordings",
          codeKicker: "// pinned",
          headline:
            "Recorder Notes anchor every recording to a position on the screen: the cell, the field, the frame. Show-not-tell feedback lands on the work, not in a separate library.",
          preview: "recording/showcase/pinned",
          code: "<VeltRecorderNotes />",
        },
        {
          num: "05",
          name: "AI transcription and subtitles",
          codeKicker: "// transcription",
          headline:
            "Recordings transcribe automatically, with subtitles and an AI summary on the player; one prop opts out of the LLM. A three-minute walkthrough becomes skimmable text.",
          preview: "recording/showcase/transcription",
          code: "// transcription on by default\n<VeltRecorderPlayer />",
        },
        {
          num: "06",
          name: "Built-in video editor",
          codeKicker: "// editor",
          headline:
            "No more re-recording a take to fix the first ten seconds: trim, split, zoom, and delete segments right where the recording was made, no export, no third-party tool.",
          preview: "recording/showcase/editor",
          code: "// the editor opens on the finished take\n<VeltRecorderTool videoEditor />",
        },
        {
          num: "07",
          name: "Recordings in comment threads",
          codeKicker: "// threads",
          headline:
            "A recording attaches to a comment thread like any other Velt object: reply, resolve, deep-link. The walkthrough and the decision it triggered live in one place.",
          preview: "recording/showcase/threads",
          code: "// a recording attaches like any Velt object\n<VeltComments />",
        },
        {
          num: "08",
          name: "Recording lifecycle events",
          codeKicker: "// events",
          headline:
            "The SDK fires an event at every step: started, paused, done, transcription ready, edit complete. Drive your own UI, analytics, or audit pipeline from a recording\u2019s whole life.",
          preview: "recording/showcase/events",
          code: 'velt.on("recordingDone", handler);',
        },
        {
          num: "09",
          name: "Self-hosted recording data",
          codeKicker: "// self-host",
          headline:
            "The recorder data provider keeps recorded files, identity, transcription, and attachment URLs on your storage; Velt stores minimal identifiers. The compliance answer when users record regulated work.",
          preview: "recording/showcase/self-host",
          code: "// recorder data provider routes media to your storage",
        },
      ],
      "vfpShowcaseCard",
    ),
    docLinks: keyed([
      cta("View Docs", "https://docs.velt.dev/async-collaboration/recorder/overview", true),
      cta("View Examples", "/examples"),
    ]),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "Our reviewers record a 40-second walkthrough instead of typing a paragraph nobody reads. The feedback lands on the exact cell, and the transcription makes it searchable later.",
      who: "Head of product \u00b7 FP&A platform",
    },
  },

  details: {
    kicker: "Little big details",
    heading: "The long tail, already built.",
    support:
      "Shipped functionality only. Every item traces to the recorder docs; draft items render after engineering sign-off. This is the part of an in-house build that never ends.",
    visibleCount: 12,
    items: keyed(
      [
        { label: "Recording types: audio, video, screen, or all from one Recorder Tool (default audio)" },
        { label: "Floating or in-thread control panel modes" },
        { label: "Countdown before recording starts (default on, disableable)" },
        { label: "Picture-in-Picture with camera for screen recordings, Chrome (off by default)" },
        { label: "Mic enable and disable" },
        { label: "Max recording length (setMaxLength)" },
        { label: "Recording quality constraints: resolution and frame rate per browser" },
        { label: "Encoding options (bitrates) with automatic best-format MIME selection" },
        { label: "Full-screen playback and click-to-play on previews" },
        { label: "Custom Recorder Tool button label" },
        { label: "Embedded settings panel and media source settings component" },
        { label: "Recording preview steps dialog" },
        { label: "AI transcription default on; one prop off, then never sent to an LLM" },
        { label: "Subtitles component and AI summary transcript on the player" },
        { label: "Lifecycle events: recordingStarted, recordingPaused, recordingResumed, recordingStopped, recordingDone, transcriptionDone, recordingEditDone, and more" },
        { label: "Data APIs: fetchRecordings, getRecordings subscription, deleteRecordings, downloadLatestVideo" },
        { label: "Get Recordings REST API" },
        { label: "Video editor: trim, split, zoom, segment delete, retake, download, frame-preview timeline" },
        { label: "Auto-open editor after recording" },
        { label: "Recorder data provider: endpoint or function based, retries, timeouts, chunked uploads, scoped storage" },
        { label: "isRecorderResolverUsed and isUrlAvailable loading-state flags" },
        { label: "Velt DevTools extension debugging" },
        { label: "Prebuilt collaborative video player with comments on the timeline" },
        { label: "Recordings as comment attachments: voice, video, screen" },
        { label: "Crop and annotate in the video editor", soon: true },
      ],
      "vfpDetailItem",
    ),
  },

  makeItYours: {
    kicker: "Make it yours",
    heading: "Your recorder, your storage.",
    support:
      "Prebuilt recorder components for the fast path, wireframes for fully custom UIs, and configuration, events, data APIs, and a recorder data provider underneath.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Look",
          body: "Every recorder surface is wireframe-customizable: Recorder Tool, Control Panel, Media Source Settings, Player, Player Expanded, Recording Preview Steps Dialog, Subtitles, Transcription, and Video Editor. Template variables and dark mode apply.",
          preview: "recording/make-it-yours/look",
          code: "<VeltRecorderToolWireframe>\n  // your recorder markup\n</VeltRecorderToolWireframe>",
        },
        {
          iconKey: "shield",
          title: "Behavior",
          body: "Recording type per tool instance, floating vs thread mode, max length, quality and encoding controls, transcription and summary toggles, editor auto-open and retake, the full event stream, data APIs, the Get Recordings REST API, and the recorder data provider for storage routing.",
          preview: "recording/make-it-yours/behavior",
          code: '<VeltRecorderTool\n  type="all" recordingTranscription={false}\n/>',
        },
      ],
      "vfpMakeItYoursCard",
    ),
    interstitial: {
      _type: "vfpInterstitial",
      quote:
        "We routed recorded files to our own S3 with the recorder data provider and kept the prebuilt player. Customizing the editor and subtitles to match our brand was a config change, not a project.",
      who: "Staff engineer \u00b7 healthcare SaaS",
    },
  },

  inProduction: {
    kicker: "In production",
    heading: "Recordings, in products like yours.",
    support: "Tabbed by vertical, with verified customer screenshots.",
    tabs: keyed(
      [
        {
          id: "sales",
          label: "Sales enablement",
          demoPreset: "recording/in-production/sales",
          caption:
            "A strategist records a 60-second walkthrough pinned to slide 4; the client watches and replies in the thread. The approval happens on the deck, with no call scheduled.",
          link: cta("For sales enablement", "/for/sales-enablement"),
        },
        {
          id: "fintech",
          label: "Fintech",
          demoPreset: "recording/in-production/fintech",
          caption:
            "The variance explanation is a voice note on the Q3 cell, transcribed to text. Months later, the auditor reads what was said, when, and by whom.",
          link: cta("For fintech and FP&A", "/for/fintech"),
        },
        {
          id: "ops",
          label: "Operations",
          demoPreset: "recording/in-production/ops",
          caption:
            "A field tech records the damaged shipment from a phone, pinned to the order record. The claim decision happens on evidence, not on a description of evidence.",
          link: cta("For operations", "/for/operations"),
        },
        {
          id: "ai",
          label: "AI-native",
          demoPreset: "recording/in-production/ai",
          caption:
            "A reviewer records why a generated draft was rejected; transcription turns the rationale into text the next reviewer and your agents can read.",
          link: cta("For AI-native SaaS", "/for/ai-native-saas"),
        },
      ],
      "vfpProdTab",
    ),
    whereItFits: {
      label: "Where it fits:",
      links: keyed([
        cta("Sales enablement", "/for/sales-enablement"),
        cta("Fintech and FP&A", "/for/fintech"),
        cta("Operations", "/for/operations"),
        cta("AI-native SaaS", "/for/ai-native-saas"),
      ]),
    },
    ctaBanner: {
      _type: "vfpCtaBanner",
      title: "See it running in products like yours.",
      microcopy: "30 minutes, with an engineer, not a sales deck.",
      cta: cta("Book Demo", "/book-demo"),
    },
  },

  related: {
    kicker: "Related primitives",
    heading: "Where a recording leads next.",
    support: "The walkthrough lands in a thread, goes live in a huddle, or pings the right reviewer.",
    cards: keyed(
      [
        {
          iconKey: "velt",
          title: "Comments",
          body: "A recording can live inside any thread; the thread holds the decision.",
          visual: "recording/related/comments",
          link: cta("Explore Comments", "/comments"),
        },
        {
          iconKey: "shield",
          title: "Huddle",
          body: "When async recording is not enough, the conversation goes live in the same document.",
          visual: "recording/related/huddle",
          link: cta("Explore Huddle", "/huddle"),
        },
        {
          iconKey: "velt",
          title: "Notifications",
          body: "The pipeline that tells a reviewer a recording landed.",
          visual: "recording/related/notifications",
          link: cta("Explore Notifications", "/notifications"),
        },
      ],
      "vfpRelatedCard",
    ),
  },

  enterprise: {
    badges: ["SOC 2 Type II", "HIPAA", "EU data residency", "Self-host media"],
    line: "Recorded files, user identity, transcription, and attachment URLs can live on your infrastructure via the recorder data provider, with only minimal identifiers on Velt servers. Recording runs on the same isolation guarantees as the rest of the SDK.",
    links: keyed([cta("self-hosting", "/self-hosting"), cta("governance", "/governance")]),
    cta: cta("Book Demo", "/book-demo"),
  },

  testimonials: {
    kicker: "Proof",
    heading: "Users stopped leaving the product to record.",
    support: "Show-not-tell feedback, captured where the work is.",
    cards: keyed(
      [
        {
          metric: "0 tools",
          quote:
            "Our users used to leave for a screen recorder and paste a link back. Now they record in place, pinned to the cell, and never leave the product to show what they mean.",
          who: "Head of product, FP&A platform",
        },
        {
          metric: "1 afternoon",
          quote:
            "We mounted the recorder components and had voice, video, and screen recording working that afternoon. The transcription and editor were already there.",
          who: "Founding engineer, content platform",
        },
        {
          metric: "40s",
          quote:
            "A 40-second walkthrough replaced a thread of typed back-and-forth. The transcription makes it searchable months later when the auditor asks.",
          who: "Compliance lead, fintech SaaS",
        },
      ],
      "vfpTestimonialCard",
    ),
  },

  faq: {
    kicker: "FAQ",
    heading: "Questions about recording.",
    items: keyed(
      [
        {
          question: "How do I add Loom-style recording to a React app?",
          answer:
            "Install @veltdev/react, wrap your app in VeltProvider with your API key, and add the recorder components: VeltRecorderNotes for pinned recordings, VeltRecorderTool to start one, VeltRecorderControlPanel and VeltRecorderPlayer for control and playback. Voice, video, and screen recording work out of the box; the quickstart walks through it.",
        },
        {
          question: "Can users record voice, video, and screen?",
          answer:
            "Yes, all three from one Recorder Tool: set type to audio, video, screen, or all. Screen recordings support mic narration, and Picture-in-Picture in Chrome when the camera is on.",
        },
        {
          question: "Are recordings transcribed automatically?",
          answer:
            "Yes. AI transcription is on by default, with subtitles and an AI-generated summary on the player. One prop turns it off, and disabled means disabled: the recording is never sent to an LLM.",
        },
        {
          question: "Can users edit a recording without leaving my product?",
          answer:
            "Yes. The built-in video editor opens on the finished take: trim, split, zoom, and delete segments on a timeline with frame previews, for video and screen recordings. It can open automatically when recording stops, and users can retake from inside it.",
        },
        {
          question: "Where are recordings stored? Can they stay on our infrastructure?",
          answer:
            "By default Velt stores them. With the recorder data provider, recorded files, user identity, transcription, and attachment URLs stay on your storage (any provider: S3, Google Cloud Storage, Azure Blob, or your own servers) while Velt keeps only minimal identifiers. See /self-hosting.",
        },
        {
          question: "Can recordings be attached to comments?",
          answer:
            "Yes. Voice, video, and screen recordings attach to comment threads, and a recording links to a comment annotation under the hood, so feedback about a recording stays with the recording. See /comments.",
        },
        {
          question: "Does recording work on mobile?",
          answer:
            "Yes. Velt is optimized for mobile web, works inside WebViews in native apps, and pure native apps can integrate through the REST APIs with your own native UI.",
        },
        {
          question: "What does it cost to add recording?",
          answer:
            "Velt is priced on usage, not seats: you pay for documents with review activity in a month, and there is a free tier for development and early production. Recording is part of the SDK, not a separately priced add-on.",
        },
      ],
      "faqItem",
    ),
  },

  finalCta: {
    title: "Add Loom-style native recordings to your product.",
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
