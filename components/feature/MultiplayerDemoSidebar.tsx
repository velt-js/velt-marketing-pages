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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.54353 1.39996C4.07086 1.32463 4.8102 1.49663 5.76553 2.04396L5.94686 2.15129L6.05353 2.21796L6.3182 2.16263C7.32739 1.96762 8.36282 1.94957 9.3782 2.10929L9.6822 2.16263L9.9462 2.21796L10.0535 2.15129C10.9769 1.59129 11.7115 1.37129 12.2682 1.38596L12.3775 1.39129L12.4755 1.40263L12.5262 1.41196L12.5595 1.41929L12.6555 1.45063C12.8127 1.5156 12.9391 1.63818 13.0089 1.79329C13.2817 2.40109 13.3736 3.07463 13.2735 3.73329L13.2422 3.91129L13.2115 4.04196L13.2935 4.15063C13.6762 4.68063 13.9135 5.30263 13.9802 5.95529L13.9955 6.15196L14.0002 6.33329C14.0002 8.90329 12.8942 10.2553 10.9042 10.7866L10.7409 10.8273L10.6529 10.8466L10.6622 10.954L10.6675 11.0586L10.6702 11.302L10.6689 11.444L10.6669 14C10.6668 14.1632 10.6069 14.3209 10.4984 14.4429C10.3899 14.5649 10.2404 14.6429 10.0782 14.662L10.0002 14.6666H6.0002C5.83691 14.6666 5.67931 14.6067 5.55728 14.4981C5.43526 14.3896 5.3573 14.2401 5.3382 14.078L5.33353 14V13.5106C4.12153 13.684 3.31353 13.228 2.59353 12.2586L2.23686 11.748C2.0502 11.484 1.93353 11.362 1.8442 11.3186L1.8122 11.306C1.64714 11.2523 1.5095 11.1364 1.42854 10.9829C1.34758 10.8294 1.32968 10.6504 1.37864 10.4839C1.4276 10.3173 1.53957 10.1765 1.69074 10.0912C1.84191 10.006 2.02038 9.98305 2.1882 10.0273C2.6162 10.1526 2.9042 10.406 3.23486 10.8533L3.59353 11.366C4.1002 12.0853 4.5002 12.3386 5.33286 12.16L5.33353 11.708L5.32153 11.596C5.30184 11.4135 5.29716 11.2298 5.30753 11.0466L5.31886 10.9233L5.33153 10.8433L5.25953 10.8273C3.27553 10.354 2.1242 9.11196 2.00953 6.73463L2.00286 6.52796L2.0002 6.33329C2.00097 5.61101 2.21124 4.90446 2.60553 4.29929L2.70686 4.15129L2.7882 4.04263L2.7582 3.91196C2.63801 3.32634 2.67131 2.71958 2.85486 2.15063L2.92153 1.96263L2.9922 1.79396C3.06179 1.63897 3.18794 1.51641 3.34486 1.45129L3.44086 1.41996L3.54353 1.39996Z" fill="currentColor" />
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
                  style={{ background: CHROME, padding: "6px 16px 4px", zIndex: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
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
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
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
              right: 0,
              bottom: 0,
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
