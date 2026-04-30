"use client";

// Dark notifications-mode demo block that sits directly under the
// notifications hero. Mirrors RecordingsDemoSidebar's structure so we can
// swap the static black panel for tab-switching iframes later. The user
// will provide real iframe + GitHub URLs once the demo apps exist; until
// then each tab renders an empty black stage matching Figma 220:23286.

import { useState } from "react";

type DemoTab = {
  label: string;
  description: string;
  iframe?: string;
  github?: string;
};

const TABS: DemoTab[] = [
  {
    label: "Button",
    description: "Trigger notifications from a button anywhere in your app.",
  },
  {
    label: "Embedded",
    description: "Embed the notifications panel inline inside your UI.",
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

export function NotificationsDemoSidebar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [openHover, setOpenHover] = useState(false);
  const [ghHover, setGhHover] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const active = TABS[activeIdx];

  return (
    <section
      className="flex flex-col items-center bg-black full-bleed-bg"
      style={{ padding: "0 80px 100px" }}
    >
      <div
        style={{
          // Same compact frame size as the recordings demo so the two
          // pages share the same vertical rhythm under the hero.
          width: 1200,
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
          aria-label="Notification mode"
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
          {active.github ? (
            <a
              href={active.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setGhHover(true)}
              onMouseLeave={() => setGhHover(false)}
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
                color: ghHover ? TAB_HOVER : TAB_INACTIVE,
                textDecoration: "none",
                transition: "color 160ms ease",
              }}
            >
              <IconGithub />
              Github
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
              <IconGithub />
              Github
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
    </section>
  );
}
