// OG image generator for the NEW-theme feature + quick-start pages.
//
// Reuses the approved MINIMAL template from scripts/og/home.html (top orange
// rule, inline Velt logo, mono eyebrow with orange dot, big Urbanist title with
// ONE orange accent word, muted sub, optional mono keyword strip).
//
// For each entry in DATA we write a temp HTML file and screenshot it with
// headless Chrome at 2x (2400x1260 output) into public/og/<slug>.png.
//
// Run:  node scripts/og/generate-features.mjs
// Needs network access for Google Fonts.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIR_NAME = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(DIR_NAME, "..", "..");
const OG_OUT_DIR = path.join(REPO_ROOT, "public", "og");
const OUT_SUFFIX = process.env.OG_SUFFIX ?? "";

// Per-process temp dir so parallel generator runs never clobber each other's
// intermediate HTML. Cleaned up at the end of main().
const TMP_DIR = path.join(DIR_NAME, `.tmp-features-${process.pid}`);

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Inline Velt logo SVG (fill #26251e) copied verbatim from home.html.
const LOGO_SVG = `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" aria-label="Velt">
      <g fill="#26251e">
        <path d="M143.704 82.6134L119.425 118.225L167.443 122.002L143.704 82.6134Z" />
        <path d="M150.175 80.4508L169.598 111.745L167.441 81.5297L150.175 80.4508Z" />
        <path d="M174.451 91.8011L176.609 119.319L186.86 111.764L174.451 91.8011Z" />
        <path d="M186.321 120.402L177.688 126.876L180.926 144.682L186.321 120.402Z" />
        <path d="M147.488 170.566L172.306 133.877L177.162 158.697L147.488 170.566Z" />
        <path d="M143.314 179.366L146.55 187.548L164.822 170.727L143.314 179.366Z" />
        <path d="M137.179 182.241L115.388 193.137L140.374 190.549L137.179 182.241Z" />
        <path d="M128.026 179.284L99.227 193.725L93.1001 174.028L128.026 179.284Z" />
        <path d="M85.9748 173.591L91.3689 191.18L65.6874 176.063L85.9748 173.591Z" />
        <path d="M61.5785 134.19L58.9374 170.099L82.7043 167.289L61.5785 134.19Z" />
        <path d="M55.297 128.177L52.993 160.209L40.3498 131.549L55.297 128.177Z" />
        <path d="M46.4059 94.4762L39.9998 124.823L54.6682 121.62L46.4059 94.4762Z" />
        <path d="M49.9999 83.5575L59.9461 115.701L83.1544 75.6897L49.9999 83.5575Z" />
        <path d="M113.544 128.94L93.4376 167.287L133.477 173.352L113.544 128.94Z" />
        <path d="M167.644 128.403L139.62 170.574L119.001 124.99L167.644 128.403Z" />
        <path d="M108.088 124.989L64.8499 127.147L88.0501 163.306L108.088 124.989Z" />
        <path d="M89.6077 77.8758L64.8499 120.312L108.539 118.231L89.6077 77.8758Z" />
        <path d="M137.823 79.3875L114.232 114.624L95.3126 74.6382L137.823 79.3875Z" />
        <path d="M138.363 55.2502L145.946 73.6339L160.499 74.6292L138.363 55.2502Z" />
        <path d="M167.844 69.3535L167.447 71.9576L159.188 64.4504L167.844 69.3535Z" />
        <path d="M128.093 48.3L99.0626 68.369L138.357 72.8883L128.093 48.3Z" />
        <path d="M86.2625 51.2764L91.6242 65.6007L116.75 48L86.2625 51.2764Z" />
        <path d="M80.2356 54.1377L57.5124 74.8862L85.4331 68.3565L80.2356 54.1377Z" />
        <path d="M271.502 175.188L234.862 75.3777H274.937L293.829 136.065L312.913 75.3777H348.217L311.768 175.188H271.502ZM405.325 177.668C373.456 177.668 349.985 159.539 349.985 126.523V124.997C349.985 92.5539 374.792 72.515 405.325 72.515C433.377 72.515 457.232 88.5459 457.232 124.424V133.585H387.96C388.914 145.608 395.974 152.096 406.661 152.096C417.157 152.096 421.164 147.134 422.309 141.409H457.422C454.369 164.31 437.003 177.668 405.325 177.668ZM388.151 113.928H420.973C420.592 103.24 415.439 96.7518 405.325 96.7518C396.165 96.7518 389.677 102.668 388.151 113.928ZM473.932 175.188V32.0566H511.335V175.188H473.932ZM574.654 177.478C551.181 177.478 537.824 166.791 537.824 141.791V100.569H526.182V75.3777H537.824V54.9578H575.417V75.3777H594.5V100.569H575.417V138.165C575.417 145.034 579.042 147.897 585.15 147.897C588.584 147.897 591.256 147.516 594.5 146.371V174.616C589.92 175.951 582.859 177.478 574.654 177.478Z" />
      </g>
    </svg>`;

/**
 * Build the full HTML document for one OG image.
 * @param {{eyebrow: string, titleHtml: string, sub: string, strip?: string, titleSize?: number, titleMaxWidth?: string}} entry
 * @returns {string}
 */
function buildHtml(entry) {
  const titleSize = entry.titleSize ?? 76;
  const titleMaxWidth = entry.titleMaxWidth ?? "17ch";
  const stripHtml = entry.strip
    ? `\n  <p class="feature-strip">${entry.strip}</p>`
    : "";
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

  .topline {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: var(--accent);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 56px;
  }
  .brand svg { height: 34px; width: auto; display: block; }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--ink);
    margin-bottom: 28px;
  }
  .eyebrow .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }

  .title {
    font-family: var(--font-heading);
    font-size: ${titleSize}px;
    line-height: 1.02;
    letter-spacing: -0.03em;
    font-weight: 600;
    color: var(--ink);
    max-width: ${titleMaxWidth};
    text-wrap: balance;
  }
  .title .accent { color: var(--accent); }

  .sub {
    font-size: 24px;
    line-height: 1.45;
    color: var(--text-muted);
    max-width: 40ch;
    margin-top: 32px;
  }

  .feature-strip {
    margin-top: 56px;
    font-family: var(--font-mono);
    font-size: 15px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-subtle);
  }
</style>
</head>
<body>
  <div class="topline"></div>

  <div class="brand">
    ${LOGO_SVG}
  </div>

  <div class="eyebrow"><span class="dot"></span>${entry.eyebrow}</div>

  <h1 class="title">${entry.titleHtml}</h1>

  <p class="sub">${entry.sub}</p>${stripHtml}
</body>
</html>`;
}

const accent = (text) =>
  `<span class="accent" style="white-space:nowrap">${text}</span>`;

// Per-page content. Heroes sourced from scripts/seed-feature-v2-*.mjs and the
// app/add-*-quick/page.tsx files. Titles are sentence case with exactly one
// orange accent word/phrase.
const DATA = [
  // ---- product feature pages (app/(features)/[slug]) ----
  {
    slug: "comments",
    eyebrow: "Async collaboration",
    titleHtml: `Add ${accent("comments")} to your product.`,
    sub: "Contextual threads from humans or agents, on any element, doc, cell, or canvas.",
    strip: "Threads · Mentions · Reactions · Anchoring",
  },
  {
    slug: "approval-flows",
    eyebrow: "Governance",
    titleHtml: `Add an ${accent("approval")} workflow builder.`,
    sub: "Your users define who reviews, in what order, and what happens on approve or reject.",
    strip: "Steps · Reviewers · Pipelines · Records",
  },
  {
    slug: "review-agents",
    eyebrow: "AI review",
    titleHtml: `Add ${accent("review agents")} to your product.`,
    sub: "Built-in or custom agents. Findings land as comments a human accepts or rejects.",
    strip: "Agents · Findings · Accept · Reject",
  },
  {
    slug: "suggestions",
    eyebrow: "Async collaboration",
    titleHtml: `Add ${accent("suggesting")} mode to any editor.`,
    sub: "Inline edits from humans or agents, accepted or rejected like a diff.",
    strip: "Inline edits · Diffs · Accept · Reject",
  },
  {
    slug: "audit-trail",
    eyebrow: "Governance",
    titleHtml: `Add an ${accent("audit trail")} for every action.`,
    sub: "An immutable, exportable record of every comment, edit, approval, and rejection.",
    strip: "Immutable · Exportable · Every action",
  },
  {
    slug: "memory",
    eyebrow: "AI review",
    titleHtml: `Add ${accent("memory")} to your reviews.`,
    sub: "Velt learns from past reviews. Previous approvals surface as precedent as teams grow.",
    strip: "Precedent · Consistency · Context",
  },
  {
    slug: "notifications",
    eyebrow: "Engagement",
    titleHtml: `Add real-time ${accent("notifications")}.`,
    sub: "In-app feeds, email, Slack, and Teams, with batching, routing, and per-user preferences.",
    strip: "In-app · Email · Slack · Teams",
  },
  {
    slug: "presence",
    eyebrow: "Realtime collaboration",
    titleHtml: `Add ${accent("presence")} to your product.`,
    sub: "Live avatars, cursors, and follow mode for humans and agents working, live.",
    strip: "Avatars · Cursors · Follow mode",
  },
  {
    slug: "multiplayer-editing",
    eyebrow: "Realtime collaboration",
    titleHtml: `Add ${accent("multiplayer")} editing to your product.`,
    sub: "Yjs-based conflict-free co-editing in Tiptap, CodeMirror, and 10 other editors.",
    strip: "Yjs · Co-editing · Conflict-free",
    titleSize: 64,
  },
  {
    slug: "recording",
    eyebrow: "Async collaboration",
    titleHtml: `Add Loom-style ${accent("recordings")}.`,
    sub: "Voice, video, and screen captures pinned to the exact spot in the work.",
    strip: "Voice · Video · Screen · Pinned",
  },
  {
    slug: "huddle",
    eyebrow: "Realtime collaboration",
    titleHtml: `Add Slack-style ${accent("huddles")}.`,
    sub: "Spontaneous audio and video inside the document. No link, no invite.",
    strip: "Audio · Video · In-document",
  },
  {
    slug: "self-hosting",
    eyebrow: "Security & compliance",
    titleHtml: `Add Velt without moving ${accent("your data")}.`,
    sub: "Per-feature data providers keep comments, recordings, and user PII on your infrastructure.",
    strip: "Data providers · Node · Python",
    titleSize: 64,
  },

  // ---- standalone quick-start pages ----
  {
    slug: "add-comments-quick",
    eyebrow: "Comments SDK",
    titleHtml: `Add comments in ${accent("days")}, not months.`,
    sub: "Drop-in threaded replies, mentions, reactions, recordings, and task management.",
    strip: "Mentions · Recordings · Reactions · Tasks",
    titleSize: 64,
  },
  {
    slug: "add-notifications-quick",
    eyebrow: "Notifications SDK",
    titleHtml: `Add notifications in ${accent("days")}, not months.`,
    sub: "A drop-in inbox, bell, grouped notifications, and multi-channel delivery.",
    strip: "Inbox · Bell · Grouping · Multi-channel",
    titleSize: 64,
  },
  {
    slug: "add-recording-quick",
    eyebrow: "Recording SDK",
    titleHtml: `Add recording in ${accent("days")}, not quarters.`,
    sub: "Loom-style audio, video, and screen recording. AI transcripts, captions, summaries.",
    strip: "Audio · Video · Screen · Transcripts",
    titleSize: 64,
  },
];

/**
 * Render one entry to public/og/<slug>.png via headless Chrome.
 * @param {(typeof DATA)[number]} entry
 */
function renderEntry(entry) {
  const tmpHtml = path.join(TMP_DIR, `${entry.slug}.html`);
  fs.writeFileSync(tmpHtml, buildHtml(entry), "utf8");
  const outPath = path.join(OG_OUT_DIR, `${entry.slug}${OUT_SUFFIX}.png`);
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
      `file://${tmpHtml}`,
    ],
    { stdio: "inherit" },
  );
  if (fs.existsSync(tmpHtml)) fs.unlinkSync(tmpHtml);
  console.log(`rendered ${path.basename(outPath)}`);
}

function main() {
  fs.mkdirSync(OG_OUT_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });
  // Optional CLI args restrict rendering to specific slugs (surgical re-renders).
  const only = process.argv.slice(2);
  const entries = only.length
    ? DATA.filter((entry) => only.includes(entry.slug))
    : DATA;
  try {
    for (const entry of entries) {
      renderEntry(entry);
    }
  } finally {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }
  console.log(`\nDone. Generated ${entries.length} OG images.`);
}

main();
