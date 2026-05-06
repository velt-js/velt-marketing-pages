"use client";

// Generic outer card for each customization deep-dive on /customization.
// Card layout: white card with #0e0d36 border + 56 radius. Header
// (heading + subheading + optional clickable tab strip) at top, then
// a centered visual area that fills the remaining height with padding
// around it (no bottom-bleed) — mirrors the look of /comparison's
// ComparisonSubCard so videos read as proper centered playback.
//
// id="way-{num}" + scroll-margin-top:80 lets WaysToCustomizeHeader's
// in-page anchors land flush below the fixed Nav.
//
// Tabs are interactive when more than one is present: clicking swaps
// which entry of `visual` (when given as an array) is shown. Pass a
// single ReactNode for non-tabbed cards.

import { useState, type ReactNode } from "react";

export type CustomizationCardTabs = {
  /** Index (0-based) of the initially-active tab. Defaults to 0. */
  activeIndex?: number;
  labels: string[];
};

export type CustomizationCardProps = {
  num: 1 | 2 | 3 | 4 | 5 | 6;
  /** Card height in px. */
  height: number;
  heading: string;
  /** Single-line or multi-line subheading. */
  subheading?: string | string[];
  tabs?: CustomizationCardTabs;
  /** Visual content. Single ReactNode for cards without tabs;
   *  ReactNode[] (one per tab label) for cards with tabs. */
  visual: ReactNode | ReactNode[];
};

export function CustomizationCard({
  num,
  height,
  heading,
  subheading,
  tabs,
  visual,
}: CustomizationCardProps) {
  const [active, setActive] = useState(tabs?.activeIndex ?? 0);

  const subLines = Array.isArray(subheading)
    ? subheading
    : subheading
      ? [subheading]
      : [];

  const visuals = Array.isArray(visual) ? visual : [visual];
  const currentVisual = visuals[active] ?? visuals[0];

  return (
    <section
      id={`way-${num}`}
      className="relative bg-white flex flex-col items-center"
      style={{
        scrollMarginTop: 80,
        border: "1px solid #0e0d36",
        borderRadius: 56,
        height,
        width: "100%",
        paddingTop: 72,
        paddingBottom: 56,
        paddingLeft: 80,
        paddingRight: 80,
        gap: 32,
        overflow: "hidden",
      }}
    >
      <div className="flex flex-col items-center text-center" style={{ gap: 12 }}>
        <h3
          className="font-urbanist font-bold"
          style={{
            fontSize: 40,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            color: "#111",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {heading}
        </h3>
        {subLines.length > 0 ? (
          <p
            className="font-urbanist"
            style={{
              fontSize: 24,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "#111",
              opacity: 0.75,
              margin: 0,
            }}
          >
            {subLines.map((line, i) => (
              <span key={i} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </p>
        ) : null}
      </div>

      {tabs ? (
        <div
          className="flex items-center"
          style={{
            gap: 4,
            padding: 4,
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 8,
          }}
        >
          {tabs.labels.map((label, i) => {
            const isActive = i === active;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setActive(i)}
                className="font-urbanist font-semibold"
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: isActive ? "#625df5" : "transparent",
                  color: isActive ? "#fff" : "#a3a3a3",
                  fontSize: 16,
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                  whiteSpace: "nowrap",
                  transition: "background 160ms ease, color 160ms ease",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Visual area — fills remaining height, centered, full-rounded,
       *  bordered. Width capped at 1000 to keep proportions readable. */}
      <div
        className="flex items-center justify-center w-full"
        style={{ flex: 1, minHeight: 0 }}
      >
        <div
          className="relative bg-white"
          style={{
            width: "100%",
            maxWidth: 1000,
            height: "100%",
            border: "4px solid #eef0ff",
            borderRadius: 24,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {currentVisual}
        </div>
      </div>
    </section>
  );
}
