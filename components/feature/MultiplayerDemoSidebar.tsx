"use client";

// Multiplayer feature page hero demo — Figma node 219:14626 in
// HqWIZdR6ISJmaG2n4o3gr8. 1280-wide dark panel under PageHero with 6
// library tabs across the top and an iframe stage in the middle.
//
// Behavior mirrors components/library/LibraryDemoStage.tsx exactly: each
// tab renders a static preview image cover, hovering the stage dims it
// and reveals a "Not just a picture, click to try" annotation pointing
// up-right at the TRY DEMO button in the top-right of the header. Click
// TRY DEMO to swap the cover for the live iframe; the button flips to
// EXIT DEMO. Switching tabs resets back to the preview.
//
// Per-tab demoUrl + githubUrl + previewSrc mirror the
// components/library/LibraryDemo.tsx tab data so the multiplayer hero
// reuses the exact same demo apps and cover images as the per-library
// pages.

import Image from "next/image";
import { useState } from "react";

type DemoTab = {
  label: string;
  description: string;
  iframe: string;
  github?: string;
  previewSrc: string;
};

const TABS: DemoTab[] = [
  {
    label: "YJS",
    description: "Co-edit with Yjs CRDT.",
    iframe: "https://velt-general-crdt-demo.vercel.app/",
    github: "https://github.com/velt-js/velt-general-crdt-demo",
    previewSrc: "/images/home/libraries/demos/yjs.png",
  },
  {
    label: "Code Mirror",
    description: "Multiplayer code editing in CodeMirror.",
    iframe: "https://velt-codemirror-crdt-demo.vercel.app/",
    github: "https://github.com/velt-js/velt-codemirror-crdt-demo",
    previewSrc: "/images/home/libraries/demos/codemirror.png",
  },
  {
    label: "lexical",
    description: "Real-time co-edit inside Lexical.",
    iframe: "https://lexical-velt-comments-demo.vercel.app/",
    github: "https://github.com/velt-js/lexical-velt-comments-demo",
    previewSrc: "/images/home/libraries/demos/lexical.png",
  },
  {
    label: "Blocknote",
    description: "Block-based collaborative editing with BlockNote.",
    iframe: "https://velt-blocknote-crdt-demo.vercel.app/",
    github: "https://github.com/velt-js/velt-blocknote-crdt-demo",
    previewSrc: "/images/home/libraries/demos/blocknote.png",
  },
  {
    label: "Tiptap",
    description: "Multiplayer rich-text editing in Tiptap.",
    iframe: "https://velt-tiptap-crdt-demo.vercel.app/",
    github: "https://github.com/velt-js/velt-tiptap-crdt-demo",
    previewSrc: "/images/home/libraries/demos/tiptap.png",
  },
  {
    label: "Reactflow",
    description: "Collaborative canvas editing with React Flow.",
    iframe: "https://velt-reactflow-crdt-demo.vercel.app/",
    github: "https://github.com/velt-js/velt-reactflow-crdt-demo",
    previewSrc: "/images/home/libraries/demos/react-flow.png",
  },
];

const CHROME = "#1c1d21";
const TAB_INACTIVE = "rgba(255, 255, 255, 0.52)";
const TAB_HOVER = "rgba(255, 255, 255, 0.8)";

function IconGithub() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.142 3.291 -1.07l.225 .032l.198 .04l.176 .054l.151 .057l.124 .054l.111 .054l.099 .053l.083 .051c.221 .15 .394 .363 .489 .61l.04 .124l.031 .128l.023 .13l.017 .137l.014 .145l.013 .234l.007 .272l-.006 .575a10 10 0 0 1 -.05 .689l-.054 .413l-.07 .417a8.4 8.4 0 0 1 -.17 .733l-.124 .42l.014 .047c.211 .7 .315 1.428 .308 2.16l-.018 .398c-.211 4.207 -2.86 5.94 -6.546 6.122l-.534 .015c-.354 .009 -.677 .015 -1.001 .015a8 8 0 0 0 .04 .375l.072 .47c.137 .897 .192 1.811 .166 2.726l-.013 .31l-.024 .268a3.5 3.5 0 0 1 -.027 .211l-.034 .224a1 1 0 0 1 -1.971 -.219l.002 -.014l.024 -.13l.014 -.107l.029 -.327c.01 -.116 .017 -.255 .021 -.413l.005 -.397c.002 -.617 -.043 -1.236 -.123 -1.853l-.061 -.422a25.4 25.4 0 0 1 -.117 -.857l-.116 -.957l-.013 -.146l-.012 -.226c-.024 -.726 .166 -1.418 .613 -2.001l.135 -.163l-.082 -.001c-3.738 -.066 -6.591 -1.682 -6.819 -6.066l-.018 -.421c-.024 -.793 .08 -1.583 .308 -2.323l.124 -.422l-.123 -.42a8 8 0 0 1 -.169 -.733l-.07 -.417a10 10 0 0 1 -.104 -1.102l-.007 -.575l.004 -.232l.012 -.211l.018 -.18l.025 -.16l.034 -.151l.043 -.146l.045 -.122l.054 -.115l.06 -.107l.067 -.096l.075 -.087l.084 -.077l.094 -.066l.106 -.057l.196 -.077l.171 -.052l.181 -.039l.158 -.024z" />
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

export function MultiplayerDemoSidebar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [showIframe, setShowIframe] = useState(false);
  const [stageHover, setStageHover] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const active = TABS[activeIdx];

  const selectTab = (i: number) => {
    setActiveIdx(i);
    // Reset to the preview cover whenever the user switches libraries —
    // mirrors LibraryDemo's `key={activeId}` remount behavior.
    setShowIframe(false);
  };

  return (
    <section
      className="flex flex-col items-center bg-black full-bleed-bg"
      style={{ padding: "0 80px 100px" }}
    >
      <div
        className="relative flex flex-col items-start"
        style={{
          width: 1280,
          background: CHROME,
          border: `2px solid ${CHROME}`,
          borderRadius: 12,
        }}
      >
        {/* Header row: tab rail (left) + Try Demo button (right). Layout
            and styles ported verbatim from LibraryDemoStage. */}
        <div
          className="flex items-center gap-4 w-full relative"
          style={{ background: CHROME, padding: "6px 16px 4px", zIndex: 2 }}
        >
          <div
            role="tablist"
            aria-label="Multiplayer library"
            className="flex items-center gap-2 overflow-x-auto"
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
                  onClick={() => selectTab(i)}
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

          {/* Try Demo / Exit Demo button — top-right of the header, with
              the "Not just a picture" annotation hanging below-left and
              pointing up-right at the button on stage hover. Ported
              from LibraryDemoStage.tsx:66-160. */}
          <div className="ml-auto relative shrink-0">
            {showIframe ? (
              <button
                type="button"
                onClick={() => setShowIframe(false)}
                aria-label={`Exit the ${active.label} demo`}
                className="flex items-center gap-2 font-firamono uppercase cursor-pointer"
                style={{
                  padding: "8px 14px",
                  background: CHROME,
                  border: "1px solid #b4b1fa",
                  borderRadius: 4,
                  color: "#b4b1fa",
                  fontSize: 14,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Exit Demo
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowIframe(true)}
                  aria-label={`Try the ${active.label} demo live`}
                  className="flex items-center gap-2 font-firamono uppercase cursor-pointer"
                  style={{
                    padding: "8px 14px",
                    background: CHROME,
                    border: "1px solid #b4b1fa",
                    borderRadius: 4,
                    color: "#b4b1fa",
                    fontSize: 14,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                  }}
                >
                  <Image
                    src="/images/home/icon-pointer.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden
                  />
                  Try Demo
                </button>
                <div
                  className="absolute flex items-end gap-2 pointer-events-none transition-opacity duration-200"
                  style={{
                    top: "calc(100% + 6px)",
                    right: "calc(100% - 48px)",
                    opacity: stageHover ? 1 : 0,
                  }}
                  aria-hidden
                >
                  <p
                    className="font-urbanist"
                    style={{
                      color: "#b4b1fa",
                      fontSize: 16,
                      lineHeight: "1.4em",
                      letterSpacing: "-0.01em",
                      margin: 0,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Not just a picture,
                    <br />
                    Click to try
                  </p>
                  <Image
                    src="/images/home/demos/arrow-try-demo.svg"
                    alt=""
                    width={38}
                    height={50}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stage — preview cover by default, iframe once Try Demo is clicked */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setStageHover(true)}
          onMouseLeave={() => setStageHover(false)}
          style={{
            height: 620,
            background: "#000",
            border: `4px solid ${CHROME}`,
            borderRadius: 12,
          }}
        >
          {showIframe ? (
            <iframe
              key={`${active.label}-${active.iframe}`}
              src={active.iframe}
              title={`${active.label} multiplayer demo`}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              allowFullScreen
              allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; clipboard-write"
              className="w-full h-full"
              style={{ border: 0 }}
            />
          ) : (
            <>
              <Image
                key={active.previewSrc}
                src={active.previewSrc}
                alt={`${active.label} demo preview`}
                fill
                sizes="1280px"
                style={{ objectFit: "cover", objectPosition: "top left" }}
                priority={activeIdx === 0}
              />
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  opacity: stageHover ? 1 : 0,
                }}
                aria-hidden
              />
            </>
          )}
        </div>

        {/* Bottom-right Github pill (no Live Demo — its affordance is the
            top-right TRY DEMO button now). */}
        {active.github ? (
          <div
            className="absolute flex items-center gap-3"
            style={{
              right: -2,
              bottom: -2,
              background: CHROME,
              padding: 2,
              borderBottomRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <a
              href={active.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-2 py-1.5"
            >
              <Image
                src="/images/home/icon-github.svg"
                alt=""
                width={16}
                height={16}
              />
              <span
                className="font-firamono uppercase whitespace-nowrap"
                style={{
                  color: TAB_INACTIVE,
                  fontSize: 14,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                }}
              >
                Github
              </span>
            </a>
          </div>
        ) : null}

        {/* Bottom-left info icon */}
        <div
          className="absolute flex items-center"
          style={{
            left: -2,
            bottom: -2,
            background: CHROME,
            padding: 2,
            borderTopRightRadius: 10,
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
              className="flex items-center rounded-lg p-1.5"
              style={{
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
                  zIndex: 4,
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
    </section>
  );
}
