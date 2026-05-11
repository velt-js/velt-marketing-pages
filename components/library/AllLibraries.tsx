"use client";

// "All Libraries" section — tabs + filterable grid in one block.
//
// Section spec (matches velt.dev Framer source — framer-1fbfv1s):
//   inner stage width 820 (max-width 1280), single column, gap 24 between
//   header block / tabs / grid. Tabs row capped at 520 wide.
//
// Card spec (default):
//   height 180, light #f7f7f7 bg, 16 px radius, logo wrapper fixed at 25 px
//   tall (matches framer-w61anh) centered in a flex zone with 20 px padding.
// Card spec (hover):
//   white bg + 2 px inset border, two buttons slide up (View Docs + Learn More).
//
// Grid: 3 columns × N rows, 20 px gap, `repeat(3, minmax(50px, 1fr))`.

import { useMemo, useState } from "react";
import { LibraryTabs, type LibraryTab } from "./LibraryTabs";

export type LibraryCategory = string;

export type LibraryCardData = {
  name: string;
  /** Unified logo (icon+wordmark) as a single image. If omitted, `name` renders as bold text. */
  logoSrc?: string;
  logoAlt?: string;
  /** Natural pixel dimensions of the logo — becomes the <img> width/height
   *  attributes so the browser establishes the correct intrinsic aspect. */
  logoWidth?: number;
  logoHeight?: number;
  category: LibraryCategory;
  docsHref: string;
  /** Optional — when omitted (or when `hideLearnMore` is set on the grid),
   *  the card only shows the "View Docs" button on hover. */
  learnMoreHref?: string;
};

type AllLibrariesProps = {
  heading?: string;
  subheading?: string;
  items: LibraryCardData[];
  tabs?: LibraryTab[];
  /** When this section is the first white block after a dark block (as on
   *  /libraries), set true to render a rounded top + extra margin so the
   *  dark background shows through as breathing room. Leave false when it
   *  follows another white section (as on per-library pages). */
  topAccent?: boolean;
  /** Show only the "View Docs" button on hover (no "Learn More").
   *  Used on /integrations where there are no per-integration landing pages. */
  hideLearnMore?: boolean;
};

function LibraryLogoCard({ data, hideLearnMore }: { data: LibraryCardData; hideLearnMore?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const showLearnMore = !hideLearnMore && Boolean(data.learnMoreHref);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden"
      style={{
        height: 180,
        borderRadius: 16,
        background: hovered ? "rgb(255, 255, 255)" : "rgb(247, 247, 247)",
        boxShadow: hovered ? "inset 0px 0px 0px 2px rgb(0, 0, 0)" : "none",
        transition: "background 200ms ease, box-shadow 200ms ease",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{ width: "100%", height: "100%", padding: 20 }}
      >
        {data.logoSrc ? (
          // Logo wrapper is fixed 25 px tall (framer-w61anh) — image scales
          // by aspect with object-fit: contain, capped at 80% of inner width
          // (approximates the live flex:.8 of the logo zone).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.logoSrc}
            alt={data.logoAlt ?? data.name}
            width={data.logoWidth}
            height={data.logoHeight}
            style={{
              height: 25,
              maxHeight: 25,
              maxWidth: "80%",
              width: "auto",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
            }}
          />
        ) : (
          <span
            className="font-urbanist font-bold"
            style={{ fontSize: 18, color: "#111" }}
          >
            {data.name}
          </span>
        )}
      </div>

      <div
        className="absolute flex items-center"
        style={{
          left: 8,
          right: 8,
          bottom: hovered ? 8 : -40,
          height: 33,
          gap: 10,
          opacity: hovered ? 1 : 0,
          transition: "bottom 200ms ease, opacity 200ms ease",
        }}
      >
        <a
          href={data.docsHref}
          target="_blank"
          rel="noopener"
          className="flex items-center justify-center rounded-md font-urbanist font-semibold"
          style={{
            flex: showLearnMore ? "0 0 48%" : "1 1 100%",
            height: 33,
            padding: "8px 12px",
            background: showLearnMore ? "rgb(237, 237, 237)" : "rgb(0, 0, 0)",
            border: showLearnMore ? "1.5px solid rgb(237, 237, 237)" : "1.5px solid rgb(0, 0, 0)",
            color: showLearnMore ? "rgb(105, 105, 105)" : "rgb(255, 255, 255)",
            fontSize: 14,
            letterSpacing: "-0.02em",
            textDecoration: "none",
          }}
        >
          View Docs
        </a>
        {showLearnMore && (
          <a
            href={data.learnMoreHref}
            className="flex items-center justify-center rounded-md font-urbanist font-semibold"
            style={{
              flex: "0 0 48%",
              height: 33,
              padding: "8px 12px",
              background: "rgb(0, 0, 0)",
              border: "1.5px solid rgb(0, 0, 0)",
              color: "rgb(255, 255, 255)",
              fontSize: 14,
              letterSpacing: "-0.02em",
              textDecoration: "none",
            }}
          >
            Learn More
          </a>
        )}
      </div>
    </div>
  );
}

export function AllLibraries({
  heading = "All Libraries",
  subheading = "These libraries require less than 10 lines to integrate",
  items,
  tabs,
  topAccent = false,
  hideLearnMore = false,
}: AllLibrariesProps) {
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    if (!tabs || tabs.length === 0) return items;
    const activeLabel = tabs[active]?.label ?? "All";
    if (activeLabel === "All") return items;
    return items.filter((item) => item.category === activeLabel);
  }, [items, tabs, active]);

  return (
    <section
      // `data-outcomes` is the Nav's "light-start" marker — flips the
      // sticky nav from transparent-over-dark to solid-over-light as this
      // white section scrolls under it.
      // `full-bleed-bg` (globals.css) stretches the section to 100vw on
      // viewports ≥ 1440 so the white background matches the body edge —
      // same trick the homepage uses on its white content container.
      data-outcomes
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{
        padding: topAccent ? "60px 80px" : "52px 80px 60px",
        marginTop: topAccent ? 80 : 0,
        borderTopLeftRadius: topAccent ? 48 : 0,
        borderTopRightRadius: topAccent ? 48 : 0,
      }}
    >
      <div
        className="flex flex-col items-center"
        style={{ width: 820, maxWidth: 1280, gap: 24 }}
      >
        <div
          className="flex flex-col items-center text-center"
          style={{ gap: 12, maxWidth: 820 }}
        >
          <h2
            className="font-urbanist font-bold"
            style={{
              color: "#111",
              fontSize: 52,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            {heading}
          </h2>
          {subheading && (
            <p
              className="font-urbanist"
              style={{
                color: "#000",
                fontSize: 20,
                lineHeight: 1.2,
              }}
            >
              {subheading}
            </p>
          )}
        </div>

        {tabs && tabs.length > 0 && (() => {
          // Tab row width scales with tab count: ~130 px per tab, with a 520
          // floor (so the original 4-tab Libraries layout is unchanged) and an
          // 820 ceiling (the inner content stage width).
          const tabsMaxWidth = Math.max(520, Math.min(tabs.length * 130, 820));
          return (
            <div className="flex justify-center" style={{ marginTop: 20, maxWidth: tabsMaxWidth, width: "100%", borderBottom: "1px solid #e0e0e0" }}>
              <LibraryTabs
                tabs={tabs}
                variant="inline"
                active={active}
                onChange={setActive}
                maxWidth={tabsMaxWidth}
              />
            </div>
          );
        })()}

        <div
          className="grid"
          style={{
            width: "100%",
            gridTemplateColumns: "repeat(3, minmax(50px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((item) => (
            <LibraryLogoCard key={item.name} data={item} hideLearnMore={hideLearnMore} />
          ))}
        </div>
      </div>
    </section>
  );
}
