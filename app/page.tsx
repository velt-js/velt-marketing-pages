"use client";

import { useEffect } from "react";
import Script from "next/script";
import "./framer.css";
import HomeStatic from "./home-static";
import { FRAMER_HANDOVER_JSON, FRAMER_RUNTIME_SRC } from "./framer-handover";

const CLI_CMD = "npx skills add velt-js/agent-skills";

function injectCliSnippet() {
  if (document.getElementById("velt-cli-snippet")) return;
  const label = Array.from(document.querySelectorAll("p")).find(
    (el) => el.textContent?.trim() === "Get Free API Key",
  );
  const anchor = label?.closest("a");
  // The button row container sits 3 levels above the anchor in the Framer markup.
  let row: HTMLElement | null = anchor ?? null;
  for (let i = 0; i < 3 && row; i++) row = row.parentElement;
  if (!row || !row.parentElement) return;

  const wrap = document.createElement("div");
  wrap.id = "velt-cli-snippet";
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

export default function Home() {
  useEffect(() => {
    injectCliSnippet();
    // Framer's runtime re-renders the tree asynchronously and can wipe the
    // injected node; re-inject whenever it goes missing.
    const observer = new MutationObserver(() => {
      if (!document.getElementById("velt-cli-snippet")) {
        injectCliSnippet();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  // Order matters: handover JSON must be in the DOM before the runtime script
  // runs. Both are homepage-scoped — other routes would read this handover and
  // fatal-error during hydration.
  return (
    <>
      <script
        type="framer/handover"
        id="__framer__handoverData"
        dangerouslySetInnerHTML={{ __html: FRAMER_HANDOVER_JSON }}
      />
      <HomeStatic />
      <Script
        type="module"
        src={FRAMER_RUNTIME_SRC}
        strategy="afterInteractive"
      />
    </>
  );
}
