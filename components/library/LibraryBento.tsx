// Per-library "Built for X" bento — 2×4 grid of 640-wide cards with
// illustrations on top and title + description anchored to the bottom-left.
// Matches the Figma spec at node 1:5594 for /libraries/tiptap: each row is
// a fixed height (493 / 429 / 424 / 424) with a 2px #111 internal divider
// grid and a 2px #111 outline + 24px radius on the container.
//
// Section header is a heading + subheading + two CTAs (View Docs + View
// All Examples) + a "No Custom Logic Required" info pill below.

import type { ReactNode } from "react";

export type LibraryBentoCard = {
  title: string;
  description: string;
  /** Illustration rendered above the title block. */
  illustration?: ReactNode;
};

export type LibraryBentoCta = {
  label: string;
  href: string;
  newTab?: boolean;
};

type LibraryBentoProps = {
  heading: string;
  subheading?: string;
  /** Small all-caps purple pill below the CTAs (e.g. "No Custom Logic Required"). */
  eyebrow?: string;
  viewDocsCta?: LibraryBentoCta;
  primaryCta?: LibraryBentoCta;
  /** Exactly 8 cards, rendered in the 2×4 grid below the header. */
  cards: LibraryBentoCard[];
  /** When true, gives the section a 48px top corner curve and 80px top
   *  margin so it can sit immediately under a dark section as the first
   *  light block of the page. Mirrors AllLibraries' `topAccent`. */
  topAccent?: boolean;
};

// Row heights from Figma: 493 + 429 + 424 + 424 = 1770. These are baked in
// because the 8 tiles each rely on their own illustration geometry.
const ROW_HEIGHTS = [493, 429, 424, 424] as const;

export function LibraryBento({
  heading,
  subheading,
  eyebrow,
  viewDocsCta,
  primaryCta,
  cards,
  topAccent = false,
}: LibraryBentoProps) {
  if (cards.length === 0) return null;

  return (
    <section
      // `data-outcomes` is the Nav's "light-start" marker — flips the nav
      // chrome from transparent-on-dark to solid-on-light. Only set when
      // this section is the first light block on the page (topAccent).
      data-outcomes={topAccent ? true : undefined}
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{
        padding: "100px 80px",
        gap: 52,
        marginTop: topAccent ? 80 : 0,
        borderTopLeftRadius: topAccent ? 48 : 0,
        borderTopRightRadius: topAccent ? 48 : 0,
      }}
    >
      <div
        className="flex flex-col items-center"
        style={{ gap: 32 }}
      >
        <div
          className="flex flex-col items-center text-center"
          style={{ gap: 12, maxWidth: 691 }}
        >
          <h2
            className="font-urbanist font-bold"
            style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            {heading}
          </h2>
          {subheading && (
            <p
              className="font-urbanist"
              style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}
            >
              {subheading}
            </p>
          )}
        </div>

        {(viewDocsCta || primaryCta) && (
          <div className="flex items-start" style={{ gap: 12 }}>
            {viewDocsCta && (
              <a
                href={viewDocsCta.href}
                target={viewDocsCta.newTab ? "_blank" : undefined}
                rel={viewDocsCta.newTab ? "noopener" : undefined}
                className="flex items-center justify-center gap-1 rounded-lg"
                style={{
                  width: 156,
                  height: 44,
                  padding: "8px 16px",
                  border: "2px solid #625df5",
                  textDecoration: "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/home/icon-book-2.svg"
                  alt=""
                  width={18}
                  height={18}
                />
                <span
                  className="font-urbanist font-semibold text-white whitespace-nowrap"
                  style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}
                >
                  {viewDocsCta.label}
                </span>
              </a>
            )}
            {primaryCta && (
              <a
                href={primaryCta.href}
                target={primaryCta.newTab ? "_blank" : undefined}
                rel={primaryCta.newTab ? "noopener" : undefined}
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 156,
                  height: 44,
                  padding: "8px 16px",
                  background: "#625df5",
                  textDecoration: "none",
                }}
              >
                <span
                  className="font-urbanist font-semibold text-white whitespace-nowrap"
                  style={{ fontSize: 16, letterSpacing: "-0.03em" }}
                >
                  {primaryCta.label}
                </span>
              </a>
            )}
          </div>
        )}

        {eyebrow && (
          <div className="flex items-center" style={{ gap: 8 }}>
            {/* Tabler info-octagon — inline SVG to avoid an extra asset. */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#625cf4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12.802 2.165l5.575 2.389c.48.206.79.679.79 1.201v6.49a9 9 0 0 1 -5.428 8.255l-1.6 .685a2 2 0 0 1 -1.576 0l-1.6 -.685a9 9 0 0 1 -5.429 -8.254v-6.491a1.3 1.3 0 0 1 .79 -1.2l5.574 -2.39a3 3 0 0 1 2.904 0z" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
            <span
              className="font-urbanist font-semibold uppercase"
              style={{
                color: "#625cf4",
                fontSize: 14,
                letterSpacing: "0.6px",
                lineHeight: 1.2,
              }}
            >
              {eyebrow}
            </span>
          </div>
        )}
      </div>

      {/* 2×4 grid container */}
      <div
        className="overflow-hidden"
        style={{
          width: 1280,
          background: "#fff",
          border: "4px solid #1C1D21",
          borderRadius: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: ROW_HEIGHTS.map((h) => `${h}px`).join(" "),
        }}
      >
        {cards.slice(0, 8).map((card, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const isTopRow = row === 0;
          const isLastRow = row === ROW_HEIGHTS.length - 1;
          const isLeftCol = col === 0;
          const isRightCol = col === 1;
          // Match the parent's inner border-radius (outer 16 − 4 border = 12)
          // so corner cells' borders follow the outer curve instead of being
          // clipped by overflow:hidden.
          const R = 12;
          return (
            <article
              key={card.title}
              className="relative overflow-hidden"
              style={{
                background: "#fff",
                border: "1.5px solid #000",
                borderTopLeftRadius: isTopRow && isLeftCol ? R : undefined,
                borderTopRightRadius: isTopRow && isRightCol ? R : undefined,
                borderBottomLeftRadius: isLastRow && isLeftCol ? R : undefined,
                borderBottomRightRadius: isLastRow && isRightCol ? R : undefined,
              }}
            >
              {card.illustration}
              <div
                className="absolute flex flex-col items-start"
                style={{
                  bottom: 29,
                  left: 29,
                  maxWidth: "calc(100% - 58px)",
                  gap: 8,
                  color: "#111",
                }}
              >
                <h3
                  className="font-urbanist font-bold"
                  style={{
                    fontSize: 28,
                    lineHeight: 1.2,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-urbanist"
                  style={{
                    fontSize: 18,
                    lineHeight: 1.2,
                    opacity: 0.52,
                  }}
                >
                  {card.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
