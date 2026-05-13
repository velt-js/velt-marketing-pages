"use client";

// Dark recording-mode demo block that sits directly under the recordings
// hero. Mirrors CommentsDemoSidebar's structure so we can swap the static
// black panel for tab-switching iframes later. The user will provide
// real iframe + GitHub URLs once the demo apps exist; until then each tab
// renders an empty black stage matching Figma 219:19595.

import { useState } from "react";

type DemoTab = {
  label: string;
  description: string;
  iframe?: string;
};

const TABS: DemoTab[] = [
  {
    label: "Audio",
    description: "Record audio messages inside your app.",
    iframe:
      "https://recorder-landing-page-demo.vercel.app/?type=audio&backgroundColor=000000",
  },
  {
    label: "Video",
    description: "Capture talking-head video clips.",
    iframe:
      "https://recorder-landing-page-demo.vercel.app/?type=video&backgroundColor=1A2A7C",
  },
  {
    label: "Screen",
    description: "Record screen captures with optional audio.",
    iframe:
      "https://recorder-landing-page-demo.vercel.app/?type=screen&backgroundColor=1A2A7C",
  },
  {
    label: "All",
    description: "All three recording modes available together.",
    iframe:
      "https://recorder-landing-page-demo.vercel.app/?backgroundColor=1A2A7C",
  },
];

const CHROME = "#1c1d21";
const TAB_INACTIVE = "rgba(255, 255, 255, 0.52)";
const TAB_HOVER = "rgba(255, 255, 255, 0.8)";

function IconExternalLink() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
      <path d="M11 13l9 -9" />
      <path d="M15 4h5v5" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986z" />
    </svg>
  );
}

export function RecordingsDemoSidebar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [openHover, setOpenHover] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const active = TABS[activeIdx];

  return (
    <section
      className="flex flex-col items-center bg-black full-bleed-bg px-6 pb-16 lg:px-20 lg:pb-[100px]"
    >
      <div className="w-full overflow-x-auto flex justify-center">
      <div
        style={{
          // Narrower than the 1280px page rail because the recorder demo's
          // natural content (a small centered "click to start" widget) is
          // narrow — a full-page-width frame leaves huge empty flanks.
          width: 1200,
          flexShrink: 0,
          background: CHROME,
          border: `2px solid ${CHROME}`,
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top tab bar */}
        <div
          role="tablist"
          aria-label="Recording mode"
          style={{
            background: CHROME,
            padding: "6px 16px 4px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            overflowX: "auto",
          }}
        >
          {TABS.map((tab, i) => {
            const isActive = i === activeIdx;
            const isHover = hoverIdx === i;
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                className="cursor-pointer"
                style={{
                  height: 30,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: isActive
                    ? "rgba(255, 255, 255, 0.08)"
                    : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition:
                    "background-color 160ms ease, color 160ms ease",
                  fontFamily: "'Fira Code', monospace",
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: 1.5,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  color: isActive
                    ? "#fff"
                    : isHover
                      ? TAB_HOVER
                      : TAB_INACTIVE,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Iframe stage. */}
        <div
          style={{
            background: "#000",
            border: `4px solid ${CHROME}`,
            borderRadius: 12,
            height: 600,
            overflow: "hidden",
            width: "100%",
          }}
        >
          {active.iframe ? (
            <iframe
              key={active.iframe}
              src={active.iframe}
              allow="camera; microphone; display-capture"
              allowFullScreen
              title={`${active.label} demo`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
            />
          ) : null}
        </div>

        {/* Bottom-right floating module: Open + Github */}
        <div
          style={{
            position: "absolute",
            bottom: -2,
            right: -2,
            background: CHROME,
            padding: 2,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {active.iframe ? (
            <a
              href={active.iframe}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setOpenHover(true)}
              onMouseLeave={() => setOpenHover(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 8px",
                borderRadius: 8,
                fontFamily: "'Fira Mono', monospace",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1.2,
                letterSpacing: "-0.42px",
                textTransform: "uppercase",
                color: openHover ? TAB_HOVER : TAB_INACTIVE,
                textDecoration: "none",
                transition: "color 160ms ease",
              }}
            >
              <IconExternalLink />
              Open
            </a>
          ) : (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 8px",
                borderRadius: 8,
                fontFamily: "'Fira Mono', monospace",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1.2,
                letterSpacing: "-0.42px",
                textTransform: "uppercase",
                color: TAB_INACTIVE,
              }}
            >
              <IconExternalLink />
              Open
            </span>
          )}
        </div>

        {/* Bottom-left floating info button */}
        <div
          style={{
            position: "absolute",
            bottom: -2,
            left: -2,
            background: CHROME,
            padding: 2,
            borderTopRightRadius: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              type="button"
              aria-label={`${active.label}: ${active.description}`}
              onMouseEnter={() => setInfoOpen(true)}
              onMouseLeave={() => setInfoOpen(false)}
              onFocus={() => setInfoOpen(true)}
              onBlur={() => setInfoOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 6,
                borderRadius: 8,
                border: "none",
                background: "transparent",
                color: infoOpen ? TAB_HOVER : TAB_INACTIVE,
                cursor: "help",
                transition: "color 160ms ease",
              }}
            >
              <IconInfo />
            </button>
            {infoOpen ? (
              <div
                role="tooltip"
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: 0,
                  background: "#000",
                  border: `1px solid rgba(255, 255, 255, 0.12)`,
                  borderRadius: 8,
                  padding: "8px 12px",
                  width: 260,
                  fontFamily: "Urbanist, sans-serif",
                  fontSize: 13,
                  lineHeight: 1.4,
                  color: "#fff",
                  pointerEvents: "none",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  {active.label}
                </span>
                <span style={{ color: "rgba(255, 255, 255, 0.72)" }}>
                  {active.description}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
