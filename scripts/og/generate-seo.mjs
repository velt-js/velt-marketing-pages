#!/usr/bin/env node
/**
 * Generate Open Graph images for SEO comparison / alternative / migration
 * landing pages, in the NEW homepage theme.
 *
 * Template is copied 1:1 from the approved minimal scripts/og/home.html
 * (top orange rule, inline Velt logo SVG, mono eyebrow with orange dot,
 * Urbanist title with one orange accent word, muted sub). Per page we swap
 * {eyebrow, titleHtml, sub} (+ optional titleSize / subMax overrides for
 * overflow control) and screenshot each at 2400x1260 via Chrome headless.
 *
 * Usage:
 *   node scripts/og/generate-seo.mjs
 *   node scripts/og/generate-seo.mjs liveblocks-alternative   # subset
 *
 * Requires network (Google Fonts) at render time.
 */

import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const REPO_ROOT = resolve(import.meta.dirname, "..", "..");
const OUT_DIR = join(REPO_ROOT, "public", "og");

const VELT_LOGO_SVG = `<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" aria-label="Velt">
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
 * Build a full HTML document for one OG card.
 * @param {{eyebrow: string, titleHtml: string, sub: string, titleSize?: number, subMax?: number}} data
 * @returns {string} HTML string
 */
function buildHtml(data) {
  const titleSize = data.titleSize ?? 76;
  const subMax = data.subMax ?? 40;
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
    max-width: 17ch;
    text-wrap: balance;
  }
  .title .accent { color: var(--accent); }

  .sub {
    font-size: 24px;
    line-height: 1.45;
    color: var(--text-muted);
    max-width: ${subMax}ch;
    margin-top: 32px;
  }
</style>
</head>
<body>
  <div class="topline"></div>

  <div class="brand">
    ${VELT_LOGO_SVG}
  </div>

  <div class="eyebrow"><span class="dot"></span>${data.eyebrow}</div>

  <h1 class="title">${data.titleHtml}</h1>

  <p class="sub">${data.sub}</p>
</body>
</html>`;
}

const ACCENT = (word) => `<span class="accent">${word}</span>`;

/** @type {Array<{slug: string, eyebrow: string, titleHtml: string, sub: string, titleSize?: number, subMax?: number}>} */
const DATA = [
  {
    slug: "liveblocks-alternative",
    eyebrow: "Alternative",
    titleHtml: `The ${ACCENT("Liveblocks")} alternative, built for production`,
    sub: "Ship collaborative features that boost engagement. Velt powers flagship SaaS products, not side projects.",
    titleSize: 64,
  },
  {
    slug: "notion-like-comments",
    eyebrow: "Comments",
    titleHtml: `${ACCENT("Notion")}-style comments in your product`,
    sub: "Drop-in inline, block, and page-level comments with @mentions and notifications for docs and wikis.",
    subMax: 46,
  },
  {
    slug: "google-spreadsheets-like-comments",
    eyebrow: "Spreadsheets",
    titleHtml: `Google ${ACCENT("Sheets")}-style comments for your grids`,
    sub: "Cell comments, threaded replies, @mentions, and notifications for spreadsheets, tables, and data grids.",
    titleSize: 62,
  },
  {
    slug: "knock-like-notifications",
    eyebrow: "Notifications",
    titleHtml: `The ${ACCENT("Knock")} alternative for in-app notifications`,
    sub: "Drop-in inbox, bell, grouped notifications, and multi-channel delivery — shipped in days, not quarters.",
    titleSize: 60,
  },
  {
    slug: "tiptap-editor-comments",
    eyebrow: "Editor comments",
    titleHtml: `Add commenting to your ${ACCENT("Tiptap")} editor`,
    sub: "Inline text-anchored comments, threaded replies, @mentions, and notifications inside your Tiptap editor.",
  },
  {
    slug: "migrate-from-cord-to-velt",
    eyebrow: "Migration",
    titleHtml: `Migrate from ${ACCENT("Cord")} to Velt`,
    sub: "Cord shut down. Move in days with comments, presence, mentions, and notifications.",
  },
  {
    slug: "migrate-from-liveblocks-to-velt",
    eyebrow: "Migration",
    titleHtml: `Migrate from ${ACCENT("Liveblocks")} to Velt`,
    sub: "Move off Liveblocks in days with drop-in comments, notifications, presence, cursors, and recordings.",
  },
  // Dynamic /migrate/[slug] routes (data source: liveblocks, cord). These
  // overlap with the standalone migrate-from-*-to-velt pages above, so they
  // get distinct migrate-<source> filenames and the "in minutes" headline
  // from the Sanity hero copy to differentiate.
  {
    slug: "migrate-liveblocks",
    eyebrow: "Migration",
    titleHtml: `Migrate from ${ACCENT("Liveblocks")} to Velt in minutes`,
    sub: "We provide dedicated support to make the transition seamless — feature parity in days, not quarters.",
    titleSize: 62,
  },
  {
    slug: "migrate-cord",
    eyebrow: "Migration",
    titleHtml: `Migrate from ${ACCENT("Cord")} to Velt in minutes`,
    sub: "Dedicated support for a seamless move — comments, presence, mentions, and notifications.",
    titleSize: 62,
    subMax: 46,
  },
];

/**
 * Render one OG card to public/og/<slug>.png via headless Chrome.
 * @param {object} data card data
 * @param {string} tmpDir temp dir for the intermediate html
 * @returns {void}
 */
function render(data, tmpDir) {
  const htmlPath = join(tmpDir, `${data.slug}.html`);
  writeFileSync(htmlPath, buildHtml(data), "utf8");
  const outPath = join(OUT_DIR, `${data.slug}.png`);
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
      `file://${htmlPath}`,
    ],
    { stdio: "inherit" },
  );
  console.log(`  ✓ ${data.slug}.png`);
}

function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const filter = process.argv.slice(2);
  const cards = filter.length
    ? DATA.filter((card) => filter.includes(card.slug))
    : DATA;
  const tmpDir = mkdtempSync(join(tmpdir(), `velt-og-seo-${process.pid}-`));
  console.log(`Rendering ${cards.length} OG image(s) → public/og/`);
  try {
    for (const card of cards) {
      render(card, tmpDir);
    }
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
  console.log("Done.");
}

main();
