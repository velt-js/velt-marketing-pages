#!/usr/bin/env node
/**
 * OG (social preview) image generator for the dynamic marketing families:
 *   - /for/<slug>          (solutions by industry)
 *   - /use-case/<slug>     (use cases)
 *   - /integrations/<slug> (integrations)
 *   - /libraries/<slug>    (libraries: surfaces, plugins, agents)
 *
 * Output: public/og/<slug>.png at 2400x1260 (1200x630 @2x), matching the
 * canonical MINIMAL template in scripts/og/home.html (do NOT modify that file
 * or public/og/home.png).
 *
 * Usage:
 *   node scripts/og/generate-solutions.mjs            # all families
 *   node scripts/og/generate-solutions.mjs only=slack # one slug
 *
 * Rendering shells out to headless Chrome and needs network access for the
 * Google Fonts <link>, so run with full_network permission.
 */

import { execFileSync } from "node:child_process";
import { writeFileSync, rmSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(SCRIPT_DIR, "..", "..");
const OUT_DIR = resolve(PROJECT_ROOT, "public/og");
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
// Per-process temp dir so concurrent regen runs (this script or others) never
// clobber a shared temp file. Cleaned up at the end of main().
const TMP_DIR = resolve(SCRIPT_DIR, `.tmp-solutions-${process.pid}`);

// Inline Velt wordmark (fill #26251e), lifted verbatim from home.html.
const VELT_LOGO = `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" aria-label="Velt"><g fill="#26251e"><path d="M143.704 82.6134L119.425 118.225L167.443 122.002L143.704 82.6134Z" /><path d="M150.175 80.4508L169.598 111.745L167.441 81.5297L150.175 80.4508Z" /><path d="M174.451 91.8011L176.609 119.319L186.86 111.764L174.451 91.8011Z" /><path d="M186.321 120.402L177.688 126.876L180.926 144.682L186.321 120.402Z" /><path d="M147.488 170.566L172.306 133.877L177.162 158.697L147.488 170.566Z" /><path d="M143.314 179.366L146.55 187.548L164.822 170.727L143.314 179.366Z" /><path d="M137.179 182.241L115.388 193.137L140.374 190.549L137.179 182.241Z" /><path d="M128.026 179.284L99.227 193.725L93.1001 174.028L128.026 179.284Z" /><path d="M85.9748 173.591L91.3689 191.18L65.6874 176.063L85.9748 173.591Z" /><path d="M61.5785 134.19L58.9374 170.099L82.7043 167.289L61.5785 134.19Z" /><path d="M55.297 128.177L52.993 160.209L40.3498 131.549L55.297 128.177Z" /><path d="M46.4059 94.4762L39.9998 124.823L54.6682 121.62L46.4059 94.4762Z" /><path d="M49.9999 83.5575L59.9461 115.701L83.1544 75.6897L49.9999 83.5575Z" /><path d="M113.544 128.94L93.4376 167.287L133.477 173.352L113.544 128.94Z" /><path d="M167.644 128.403L139.62 170.574L119.001 124.99L167.644 128.403Z" /><path d="M108.088 124.989L64.8499 127.147L88.0501 163.306L108.088 124.989Z" /><path d="M89.6077 77.8758L64.8499 120.312L108.539 118.231L89.6077 77.8758Z" /><path d="M137.823 79.3875L114.232 114.624L95.3126 74.6382L137.823 79.3875Z" /><path d="M138.363 55.2502L145.946 73.6339L160.499 74.6292L138.363 55.2502Z" /><path d="M167.844 69.3535L167.447 71.9576L159.188 64.4504L167.844 69.3535Z" /><path d="M128.093 48.3L99.0626 68.369L138.357 72.8883L128.093 48.3Z" /><path d="M86.2625 51.2764L91.6242 65.6007L116.75 48L86.2625 51.2764Z" /><path d="M80.2356 54.1377L57.5124 74.8862L85.4331 68.3565L80.2356 54.1377Z" /><path d="M271.502 175.188L234.862 75.3777H274.937L293.829 136.065L312.913 75.3777H348.217L311.768 175.188H271.502ZM405.325 177.668C373.456 177.668 349.985 159.539 349.985 126.523V124.997C349.985 92.5539 374.792 72.515 405.325 72.515C433.377 72.515 457.232 88.5459 457.232 124.424V133.585H387.96C388.914 145.608 395.974 152.096 406.661 152.096C417.157 152.096 421.164 147.134 422.309 141.409H457.422C454.369 164.31 437.003 177.668 405.325 177.668ZM388.151 113.928H420.973C420.592 103.24 415.439 96.7518 405.325 96.7518C396.165 96.7518 389.677 102.668 388.151 113.928ZM473.932 175.188V32.0566H511.335V175.188H473.932ZM574.654 177.478C551.181 177.478 537.824 166.791 537.824 141.791V100.569H526.182V75.3777H537.824V54.9578H575.417V75.3777H594.5V100.569H575.417V138.165C575.417 145.034 579.042 147.897 585.15 147.897C588.584 147.897 591.256 147.516 594.5 146.371V174.616C589.92 175.951 582.859 177.478 574.654 177.478Z" /></g></svg>`;

/**
 * Pick a title font-size (px) from the plain (tag-stripped) title length so
 * long titles don't clip or blow past three lines.
 * @param {string} titleHtml The title markup (may contain a .accent span).
 * @returns {number} Font size in px.
 */
function titleSize(titleHtml) {
  try {
    const plain = titleHtml.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
    const len = plain.length;
    if (len <= 20) return 76;
    if (len <= 28) return 70;
    if (len <= 36) return 62;
    if (len <= 46) return 56;
    return 50;
  } catch (error) {
    console.error("titleSize failed", error);
    return 56;
  }
}

/**
 * Render the full OG HTML document for one entry, based on home.html.
 * @param {{eyebrow:string,titleHtml:string,sub:string,strip:string}} entry Copy.
 * @returns {string} Complete HTML document.
 */
function renderHtml(entry) {
  const { eyebrow, titleHtml, sub, strip } = entry;
  const size = titleSize(titleHtml);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600&family=Urbanist:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  :root {
    --ink: #26251e;
    --cream: #f7f7f4;
    --white: #ffffff;
    --accent: #f54e00;
    --text-muted: #7a7974;
    --text-subtle: #a1a19f;
    --border-subtle: #e6e5e0;
    --font-body: 'Inter Tight', ui-sans-serif, system-ui, sans-serif;
    --font-heading: 'Urbanist', sans-serif;
    --font-mono: 'Geist Mono', ui-monospace, monospace;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    background: var(--white);
    color: var(--ink);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 96px;
  }
  .topline { position: absolute; top: 0; left: 0; right: 0; height: 6px; background: var(--accent); }
  .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 56px; }
  .brand svg { height: 34px; width: auto; display: block; }
  .eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: var(--font-mono); font-size: 15px; font-weight: 500;
    letter-spacing: 0.07em; text-transform: uppercase; color: var(--ink);
    margin-bottom: 28px;
  }
  .eyebrow .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
  .title {
    font-family: var(--font-heading); font-size: ${size}px; line-height: 1.02;
    letter-spacing: -0.03em; font-weight: 600; color: var(--ink); max-width: 17ch;
    text-wrap: balance;
  }
  .title .accent { color: var(--accent); }
  .sub { font-size: 24px; line-height: 1.45; color: var(--text-muted); max-width: 40ch; margin-top: 32px; }
  .feature-strip {
    margin-top: 56px; font-family: var(--font-mono); font-size: 15px;
    letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-subtle);
  }
</style>
</head>
<body>
  <div class="topline"></div>
  <div class="brand">${VELT_LOGO}</div>
  <div class="eyebrow"><span class="dot"></span>${eyebrow}</div>
  <h1 class="title">${titleHtml}</h1>
  <p class="sub">${sub}</p>
  <p class="feature-strip">${strip}</p>
</body>
</html>`;
}

/** Accent-span helper. */
const acc = (text) =>
  `<span class="accent" style="white-space:nowrap">${text}</span>`;

// Per-family feature strips.
const STRIP = {
  solution: "Comments · Approvals · Audit trails · Review agents",
  useCase: "Comments · Presence · Recording · Notifications",
  integration: "Webhooks · Payloads · Notifications · Security",
  librarySurface: "Comments · Co-editing · Presence · Suggestions",
  libraryPlugin: "Skills · Rules · Expert agent · MCP",
  libraryAgent: "Read · Propose · Approve · Audit",
  libraryYjs: "CRDT · Sync · Presence · Storage",
};

// ---- SOLUTIONS (/for/<slug>) ----------------------------------------------
const SOLUTIONS = [
  {
    slug: "ai-native-saas",
    titleHtml: `Review and approval for ${acc("AI-native SaaS")}`,
    sub: "Agents propose, humans approve. Memory keeps decisions consistent and the audit trail proves oversight.",
  },
  {
    slug: "compliance",
    titleHtml: `Sign-off and audit for ${acc("compliance")} platforms`,
    sub: "Staged sign-off with quorum, immutable audit records that export for examiners, and AI first-pass checks.",
  },
  {
    slug: "fintech",
    titleHtml: `Cell-level review for ${acc("fintech and FP&amp;A")}`,
    sub: "Cell-level comments, approval chains with quorum, and immutable audit records for regulated finance.",
  },
  {
    slug: "legal",
    titleHtml: `Redlines and sign-off for ${acc("legal")} software`,
    sub: "Clause-anchored comments, suggestion-mode redlining, and approval chains from counsel to client.",
  },
  {
    slug: "operations",
    titleHtml: `Sign-off for ${acc("operations")} platforms`,
    sub: "Approval workflows on the record, comments on both sides of the handoff, notifications that reach the field.",
  },
  {
    slug: "sales-enablement",
    titleHtml: `Review and approval for ${acc("sales enablement")}`,
    sub: "Comments on decks and emails, approval chains with quorum, and AI first-pass brand and compliance checks.",
  },
].map((entry) => ({
  ...entry,
  eyebrow: "Solution",
  strip: STRIP.solution,
}));

// ---- USE CASES (/use-case/<slug>) -----------------------------------------
const USE_CASES = [
  {
    slug: "analytics",
    titleHtml: `Make your ${acc("analytics")} product collaborative`,
    sub: "Add comments, real-time cursors, and co-editing to charts and tables in 30 minutes.",
  },
  {
    slug: "coding-tool",
    titleHtml: `Make your ${acc("code IDE")} collaborative`,
    sub: "Pair programming, code review, and debugging with cursors, comments, and huddles.",
  },
  {
    slug: "crm",
    titleHtml: `Make your ${acc("CRM")} collaborative`,
    sub: "Add comments, notifications, and real-time editing to your CRM in 30 minutes.",
  },
  {
    slug: "customer-support",
    titleHtml: `Make your ${acc("support")} product collaborative`,
    sub: "Live walkthroughs, screen recording, and huddles, integrated in 30 minutes.",
  },
  {
    slug: "docs",
    titleHtml: `Make your ${acc("docs")} product collaborative`,
    sub: "Real-time co-editing, inline comments, an AI copilot, and approval workflows.",
  },
  {
    slug: "email-marketing-tool",
    titleHtml: `Make your ${acc("email")} tool collaborative`,
    sub: "Add video recording, comments, and approvals to your email marketing tool.",
  },
  {
    slug: "form-builder",
    titleHtml: `Make your ${acc("form builder")} collaborative`,
    sub: "Real-time editing, comments, approvals, and analytics in 30 minutes.",
  },
  {
    slug: "no-code-tool",
    titleHtml: `Make your ${acc("no-code")} tool collaborative`,
    sub: "Comments, cursors, and live editing, integrated with 30+ frameworks.",
  },
  {
    slug: "presentation",
    titleHtml: `Make your ${acc("presentation")} product collaborative`,
    sub: "Real-time editing, comments, and live walkthroughs in 30 minutes.",
  },
  {
    slug: "session-replay-tool",
    titleHtml: `Make your ${acc("session replay")} tool collaborative`,
    sub: "Add comments, voice notes, and task assignment. Review and fix bugs faster.",
  },
  {
    slug: "sheets",
    titleHtml: `Make your ${acc("spreadsheet")} product collaborative`,
    sub: "Co-editing, comments, and live sync in 30 minutes.",
  },
  {
    slug: "task-manager",
    titleHtml: `Make your ${acc("task manager")} collaborative`,
    sub: "Comments, recording, live huddles, and real-time collaboration.",
  },
  {
    slug: "video-editor",
    titleHtml: `Make your ${acc("video editor")} collaborative`,
    sub: "Real-time presence, frame-accurate comments, and approval flows in days.",
  },
].map((entry) => ({
  ...entry,
  eyebrow: "Use case",
  strip: STRIP.useCase,
}));

// ---- INTEGRATIONS (/integrations/<slug>) ----------------------------------
const INTEGRATION_SUB = {
  Messaging:
    "Route comments and notifications into your team's channels with webhooks.",
  Storage:
    "Sync collaboration events to your buckets with webhooks and enterprise-grade security.",
  CRM: "Push comments and notifications into your CRM with webhooks and payload transforms.",
  Email:
    "Trigger transactional and lifecycle emails from collaboration events with webhooks.",
  Analytics:
    "Stream collaboration events into your analytics pipeline with webhooks.",
  Workflows:
    "Drive automated workflows from collaboration events with webhooks and payload transforms.",
};

const INTEGRATIONS = [
  { slug: "aws-s3", name: "AWS S3", cat: "Storage" },
  { slug: "close-crm", name: "Close CRM", cat: "CRM" },
  { slug: "customer-io", name: "Customer.io", cat: "Email" },
  { slug: "discord", name: "Discord", cat: "Messaging" },
  { slug: "google-cloud-storage", name: "Google Cloud Storage", cat: "Storage" },
  { slug: "hubspot", name: "HubSpot", cat: "CRM" },
  { slug: "inngest", name: "Inngest", cat: "Workflows" },
  { slug: "loops", name: "Loops", cat: "Email" },
  { slug: "microsoft-azure", name: "Microsoft Azure", cat: "Storage" },
  { slug: "microsoft-teams", name: "Microsoft Teams", cat: "Messaging" },
  { slug: "opentelemetry", name: "OpenTelemetry", cat: "Analytics" },
  { slug: "resend", name: "Resend", cat: "Email" },
  { slug: "segment", name: "Segment", cat: "Analytics" },
  { slug: "sendgrid", name: "Sendgrid", cat: "Email" },
  { slug: "slack", name: "Slack", cat: "Messaging" },
  { slug: "windmill", name: "Windmill", cat: "Workflows" },
  { slug: "zapier", name: "Zapier", cat: "Workflows" },
].map((entry) => ({
  slug: entry.slug,
  eyebrow: "Integration",
  titleHtml: `Add Velt to ${acc(entry.name)}`,
  sub: INTEGRATION_SUB[entry.cat],
  strip: STRIP.integration,
}));

// ---- LIBRARIES (/libraries/<slug>) ----------------------------------------
const SURFACE_COEDIT_SUB =
  "Threads stay pinned as content changes, and every agent edit lands as a suggestion a human approves.";
const SURFACE_ANNOTATE_SUB =
  "Annotations stay pinned to the data as it re-renders, and every agent markup lands for a human to approve.";

// kind: "coedit" | "annotate" | "plugin" | "agent" | "yjs"
const LIBRARY_DEFS = [
  { slug: "ace", name: "Ace Editor", kind: "coedit" },
  { slug: "ag-grid", name: "AG Grid", kind: "coedit" },
  { slug: "apryse", name: "Apryse", kind: "annotate" },
  { slug: "blocknote", name: "BlockNote", kind: "coedit" },
  { slug: "chartjs", name: "Chart.js", kind: "annotate" },
  { slug: "chat-sdk", name: "Chat SDK Adapter", kind: "agent" },
  { slug: "ckeditor", name: "CKEditor", kind: "coedit" },
  { slug: "claude", name: "Claude Code", kind: "plugin" },
  { slug: "codemirror", name: "CodeMirror", kind: "coedit" },
  { slug: "cursor", name: "Cursor", kind: "plugin" },
  { slug: "draftjs", name: "Draft.js", kind: "coedit" },
  { slug: "highcharts", name: "Highcharts", kind: "annotate" },
  { slug: "konva", name: "Konva", kind: "coedit" },
  { slug: "lexical", name: "Lexical", kind: "coedit" },
  { slug: "mcp", name: "MCP server", kind: "agent" },
  { slug: "monaco", name: "Monaco", kind: "coedit" },
  { slug: "nivo", name: "Nivo", kind: "annotate" },
  { slug: "nutrient", name: "Nutrient", kind: "annotate" },
  { slug: "platejs", name: "PlateJS", kind: "coedit" },
  { slug: "prosemirror", name: "ProseMirror", kind: "coedit" },
  { slug: "quill", name: "Quill", kind: "coedit" },
  { slug: "react-flow", name: "React Flow", kind: "coedit" },
  { slug: "slatejs", name: "Slate", kind: "coedit" },
  { slug: "spreadjs", name: "SpreadJS", kind: "coedit" },
  { slug: "superdoc", name: "SuperDoc", kind: "coedit" },
  { slug: "tanstack", name: "TanStack Table", kind: "coedit" },
  { slug: "tinymce", name: "TinyMCE", kind: "coedit" },
  { slug: "tiptap", name: "Tiptap", kind: "coedit" },
  // v1-only slugs (no libraryPageV2 equivalent).
  { slug: "nivo-charts", name: "Nivo charts", kind: "annotate" },
  { slug: "yjs", name: "Yjs", kind: "yjs" },
];

/**
 * Map a library definition to a renderable OG entry.
 * @param {{slug:string,name:string,kind:string}} def Library definition.
 * @returns {{slug:string,eyebrow:string,titleHtml:string,sub:string,strip:string}} Entry.
 */
function libraryEntry(def) {
  const { slug, name, kind } = def;
  if (kind === "coedit") {
    return {
      slug,
      eyebrow: "Library",
      titleHtml: `Comments and co-editing for ${acc(name)}`,
      sub: SURFACE_COEDIT_SUB,
      strip: STRIP.librarySurface,
    };
  }
  if (kind === "annotate") {
    return {
      slug,
      eyebrow: "Library",
      titleHtml: `Comments and annotations for ${acc(name)}`,
      sub: SURFACE_ANNOTATE_SUB,
      strip: STRIP.librarySurface,
    };
  }
  if (kind === "plugin") {
    return {
      slug,
      eyebrow: "Plugin",
      titleHtml: `Build with Velt inside ${acc(name)}`,
      sub: "Skills, rules, an expert agent, and an MCP server, so it scaffolds and wires Velt for you.",
      strip: STRIP.libraryPlugin,
    };
  }
  if (kind === "agent") {
    if (slug === "chat-sdk") {
      return {
        slug,
        eyebrow: "Agent",
        titleHtml: `${acc("Bots")} that reply in your comment threads`,
        sub: "Wire a cross-platform bot to your Velt threads; it replies in-thread, grounded with the document.",
        strip: STRIP.libraryAgent,
      };
    }
    return {
      slug,
      eyebrow: "Agent",
      titleHtml: `Let ${acc("agents")} read your Velt review data`,
      sub: "Any MCP-capable agent reads your review context and proposes changes a human approves.",
      strip: STRIP.libraryAgent,
    };
  }
  // yjs
  return {
    slug,
    eyebrow: "Library",
    titleHtml: `Run ${acc("Yjs")} without realtime infra`,
    sub: "Run Yjs apps without building or operating realtime infrastructure.",
    strip: STRIP.libraryYjs,
  };
}

const LIBRARIES = LIBRARY_DEFS.map(libraryEntry);

const ALL = [...SOLUTIONS, ...USE_CASES, ...INTEGRATIONS, ...LIBRARIES];

/**
 * Screenshot one entry to public/og/<slug>.png via headless Chrome.
 * @param {{slug:string}} entry The entry to render.
 * @returns {void}
 */
function render(entry) {
  const tmpPath = resolve(TMP_DIR, "page.html");
  const outPath = resolve(OUT_DIR, `${entry.slug}.png`);
  writeFileSync(tmpPath, renderHtml(entry));
  try {
    execFileSync(
      CHROME,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=2",
        "--window-size=1200,630",
        `--screenshot=${outPath}`,
        "--default-background-color=00000000",
        "--virtual-time-budget=4000",
        `file://${tmpPath}`,
      ],
      { stdio: "ignore" },
    );
  } finally {
    rmSync(tmpPath, { force: true });
  }
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(TMP_DIR, { recursive: true });

  const onlyArg = process.argv.find((arg) => arg.startsWith("only="));
  const only = onlyArg ? onlyArg.slice("only=".length) : null;

  // Guard against accidental filename collisions across families.
  const seen = new Set();
  for (const entry of ALL) {
    if (seen.has(entry.slug)) {
      throw new Error(`Duplicate slug collision: ${entry.slug}`);
    }
    seen.add(entry.slug);
  }

  const targets = only ? ALL.filter((entry) => entry.slug === only) : ALL;
  if (only && targets.length === 0) {
    console.error(`No entry with slug "${only}"`);
    process.exit(1);
  }

  console.log(`Generating ${targets.length} OG image(s)...`);
  let count = 0;
  try {
    for (const entry of targets) {
      render(entry);
      count += 1;
      console.log(`  [${count}/${targets.length}] ${entry.slug}.png`);
    }
  } finally {
    rmSync(TMP_DIR, { recursive: true, force: true });
  }
  console.log("Done.");
}

main();
