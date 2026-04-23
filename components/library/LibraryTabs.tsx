"use client";

// Library category tab row — ported from the Framer export's
// "2025/Library Toggle Link" component (chunk-CTBEW7HV.js).
//
// Spec:
// - Each tab is 270×38 px, 10px padding, center-aligned
// - Label: Fira Mono 500, 15px, UPPERCASE
// - Active variant ("rMMaHcRS8"): white bg, 2px purple bottom border
//   (rgb(98, 93, 245)), full opacity
// - Inactive variant ("bRPYbZR1K"): transparent bg, no bottom border,
//   40% opacity label
// - Tab row sits at the top of the white content section below the dark
//   demo player.

import { useState } from "react";

export type LibraryTab = {
  label: string;
  href?: string;
};

type LibraryTabsProps = {
  tabs: LibraryTab[];
  initial?: number;
};

export function LibraryTabs({ tabs, initial = 0 }: LibraryTabsProps) {
  const safeInitial = Math.min(Math.max(initial, 0), Math.max(tabs.length - 1, 0));
  const [active, setActive] = useState(safeInitial);
  if (tabs.length === 0) return null;

  return (
    <section
      className="flex justify-center w-full bg-white"
      style={{ padding: "52px 80px 0" }}
    >
      <div
        className="flex items-center justify-center flex-wrap"
        style={{ maxWidth: 1280 }}
      >
        {tabs.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(i)}
              className="flex items-center justify-center cursor-pointer"
              style={{
                width: 270,
                height: 38,
                padding: 10,
                gap: 10,
                background: isActive ? "rgb(255, 255, 255)" : "transparent",
                borderBottom: isActive
                  ? "2px solid rgb(98, 93, 245)"
                  : "2px solid transparent",
                opacity: isActive ? 1 : 0.4,
                transition: "opacity 160ms ease, border-color 160ms ease",
                border: "none",
                borderBottomWidth: 2,
                borderBottomStyle: "solid",
                borderBottomColor: isActive ? "rgb(98, 93, 245)" : "transparent",
              }}
            >
              <span
                className="font-firamono"
                style={{
                  fontFamily: '"Fira Mono", monospace',
                  fontWeight: isActive ? 500 : 400,
                  fontSize: 15,
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                  color: "rgb(17, 17, 17)",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
