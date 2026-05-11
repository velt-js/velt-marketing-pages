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

export function NotificationsDemoSidebar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [openHover, setOpenHover] = useState(false);
  const [ghHover, setGhHover] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const active = TABS[activeIdx];

  return (
    <section
      className="flex flex-col items-center bg-black full-bleed-bg px-6 pb-16 lg:px-20 lg:pb-[100px]"
    >
      <div className="w-full overflow-x-auto">
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
      </div>
    </section>
  );
}
