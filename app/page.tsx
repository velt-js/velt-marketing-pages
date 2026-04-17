"use client";

import { useEffect } from "react";
import "../framer/styles.css";
// @ts-expect-error — user-translated JSX, no types
import HomeStatic from "./home-static";

const CLI_CMD = "npx skills add velt-js/agent-skills";

function injectCliSnippet() {
  if (document.getElementById("velt-cli-snippet")) return;
  // Anchor: the "Get Free API Key" button's <a> wrapper. From index.jsx structure,
  // the button row container sits 3 levels above the anchor.
  const label = Array.from(document.querySelectorAll("p")).find(
    (el) => el.textContent?.trim() === "Get Free API Key",
  );
  const anchor = label?.closest("a");
  let row: HTMLElement | null = anchor ?? null;
  for (let i = 0; i < 3 && row; i++) row = row.parentElement;
  if (!row || !row.parentElement) return;

  const wrap = document.createElement("div");
  wrap.id = "velt-cli-snippet";
  // Dimensions from Framer MCP XML (node lfBuetMTl): fit-content width,
  // 8px 8px 8px 16px padding, 10px gap, 8px border-radius.
  wrap.style.cssText = [
    "display:flex",
    "flex-direction:row",
    "align-items:center",
    "gap:10px",
    "padding:8px 8px 8px 16px",
    "border-radius:8px",
    "background:rgba(12,12,14,0.8)",
    "border:1px solid rgba(255,255,255,0.1)",
    "margin:12px auto 0",
    "width:420px",
    "box-sizing:border-box",
    "justify-content:space-between",
  ].join(";");
  wrap.innerHTML = `
    <code style="font-family:'Geist Mono','IBM Plex Mono','Menlo',monospace;font-weight:500;font-size:14px;line-height:1;color:#fff;white-space:nowrap;">${CLI_CMD}</code>
    <button type="button" aria-label="Copy command" id="velt-cli-copy" style="width:24px;height:24px;border:none;background:transparent;color:rgba(255,255,255,0.6);cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:4px;flex-shrink:0;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    </button>
  `;
  wrap.querySelector("#velt-cli-copy")?.addEventListener("click", () => {
    navigator.clipboard?.writeText(CLI_CMD);
  });
  row.parentElement.insertBefore(wrap, row.nextSibling);
}

// Silence known-harmless unframer/Framer runtime warnings that surface when
// the Framer-classed DOM is embedded directly.
if (typeof window !== "undefined" && !(window as { __framerWarningsPatched?: boolean }).__framerWarningsPatched) {
  (window as { __framerWarningsPatched?: boolean }).__framerWarningsPatched = true;
  const originalError = console.error.bind(console);
  const SUPPRESS = [
    "__withFX",
    "parentSize",
    "providedWindow",
    "motionChild",
    "scopeId",
    "clickTrackingId",
    "preserveParams",
    "relValues",
    "element.ref was removed",
    "Accessing element.ref was removed",
    'unique "key" prop',
    "hydration",
    "Hydration",
    "Invalid DOM property",
    "non-boolean attribute",
    "React does not recognize",
    "Unknown event handler",
    "Using kebab-case",
    "aria-",
    // Framer runtime tries to dynamically import CMS collection modules that
    // aren't shipped with the static export (blog moved to Sanity). The
    // runtime catches the failure internally — no user impact — but the
    // rejection still surfaces via console.error.
    "Failed to import collection module",
    "Failed to fetch dynamically imported module",
  ];
  console.error = (...args: unknown[]) => {
    const msg = args.map((a) => (typeof a === "string" ? a : "")).join(" ");
    if (SUPPRESS.some((s) => msg.includes(s))) return;
    originalError(...args);
  };

  // Framer's runtime calls `import(...)` for CMS/snippet chunks that aren't
  // shipped with the static export. It handles the failure internally, but
  // the rejected promise still bubbles up as an unhandledrejection, which
  // Next.js's dev error overlay catches independently of console.error.
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const msg =
      reason instanceof Error ? `${reason.name}: ${reason.message}` : String(reason);
    if (
      msg.includes("Failed to fetch dynamically imported module") ||
      msg.includes("Failed to import collection module") ||
      msg.includes("/framer-runtime/")
    ) {
      event.preventDefault();
    }
  });
}

export default function Home() {
  useEffect(() => {
    injectCliSnippet();
    // Framer's runtime re-renders parts of the tree asynchronously (including
    // after CMS module import failures), which can wipe out the injected node
    // after our initial attempts. Observe the body and re-inject whenever the
    // snippet goes missing.
    const observer = new MutationObserver(() => {
      if (!document.getElementById("velt-cli-snippet")) {
        injectCliSnippet();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return <HomeStatic />;
}
