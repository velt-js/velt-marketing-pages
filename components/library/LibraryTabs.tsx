"use client";

// Library category tab row — ported from Framer's "2025/Library Toggle Link".
// Dual-mode: "section" (default, wraps self in a padded white <section>) is
// used when the tabs appear standalone on a page; "inline" renders flat
// (no wrapper) for use inside AllLibraries.
//
// Tab spec: flex-equal width × 38 px tall; active tab has 2 px purple
// bottom border + full opacity; inactive tabs are 40 % opacity.

import { useState } from "react";

export type LibraryTab = {
  label: string;
  href?: string;
};

type LibraryTabsProps = {
  tabs: LibraryTab[];
  initial?: number;
  variant?: "section" | "inline";
  active?: number;
  onChange?: (index: number) => void;
  /** Cap on the tab row's width. Default 520 (sized for ~4 tabs). Pass a
   *  larger value when there are more tabs (e.g. /integrations has 7) to
   *  keep them on a single row. */
  maxWidth?: number;
};

export function LibraryTabs({
  tabs,
  initial = 0,
  variant = "section",
  active: controlledActive,
  onChange,
  maxWidth = 520,
}: LibraryTabsProps) {
  const safeInitial = Math.min(Math.max(initial, 0), Math.max(tabs.length - 1, 0));
  const [uncontrolledActive, setUncontrolledActive] = useState(safeInitial);
  const active = controlledActive ?? uncontrolledActive;
  const setActive = (i: number) => {
    if (onChange) onChange(i);
    else setUncontrolledActive(i);
  };
  if (tabs.length === 0) return null;

  const row = (
    <div
      className="flex items-center overflow-x-auto no-scrollbar"
      style={{ maxWidth, width: "100%" }}
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
              flex: "1 1 0px",
              height: 38,
              padding: 10,
              gap: 10,
              background: "transparent",
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
  );

  if (variant === "inline") return row;

  return (
    <section
      className="flex justify-center w-full bg-white px-6 lg:px-20 pt-10 lg:pt-[52px]"
    >
      {row}
    </section>
  );
}
