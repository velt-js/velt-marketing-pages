// Per-library "Built for X" bento — 2-column grid of 640-wide cards. Row
// count and heights are configurable per library via `rowHeights`. Each
// card has an illustration on top and a title + description overlay
// anchored to the bottom-left.
//
// The illustration source is one of:
//   - a registered React component (`illustration`), used by tiptap/yjs
//     where each tile is a pre-built component pointing at a static PNG.
//   - a CMS-uploaded image URL (`imageSrc`), used by libraries that
//     supply their own PNGs through Sanity (e.g. highcharts).
//
// Either way, title + description render as a React overlay so they
// stay CMS-driven and selectable as text.
//
// When `testimonial` is provided, a dark customer-quote bar is rendered
// inside the same outer container, attached to the bottom of the cards
// grid. This matches the live design across all library pages.
//
// Tiptap's spec is from Figma node 1:5594; highcharts from 1:9845.

import type { ReactNode } from "react";

export type LibraryBentoCard = {
  title: string;
  description: string;
  /** Illustration rendered above the title block (illustration mode). */
  illustration?: ReactNode;
  /** Full-bleed image fill (image mode). Suppresses the React text overlay. */
  imageSrc?: string;
};

export type LibraryBentoCta = {
  label: string;
  href: string;
  newTab?: boolean;
};

export type LibraryBentoTestimonial = {
  name?: string;
  role?: string;
  quote?: string;
  /** Substring of `quote` to render in `accentColor`. Must appear verbatim. */
  accentFragment?: string;
  accentColor?: string;
  avatarSrc?: string;
};

function renderQuoteWithAccent(
  quote: string,
  fragment?: string,
  color?: string,
) {
  if (!fragment || !color || !quote.includes(fragment)) {
    return quote;
  }
  const idx = quote.indexOf(fragment);
  return (
    <>
      {quote.slice(0, idx)}
      <span style={{ color }}>{fragment}</span>
      {quote.slice(idx + fragment.length)}
    </>
  );
}

type LibraryBentoProps = {
  heading: string;
  subheading?: string;
  /** Small all-caps purple pill below the CTAs (e.g. "No Custom Logic Required"). */
  eyebrow?: string;
  viewDocsCta?: LibraryBentoCta;
  primaryCta?: LibraryBentoCta;
  /** Cards rendered in a 2-column grid. Length must equal rowHeights × 2. */
  cards: LibraryBentoCard[];
  /** Per-row pixel heights. Defaults to [493, 429, 424, 424] (tiptap/yjs). */
  rowHeights?: number[];
  /** Customer quote rendered as a dark footer attached to the bento's
   *  bottom edge. Only renders when `quote` is populated. */
  testimonial?: LibraryBentoTestimonial;
  /** When true, gives the section a 48px top corner curve and 80px top
   *  margin so it can sit immediately under a dark section as the first
   *  light block of the page. Mirrors AllLibraries' `topAccent`. */
  topAccent?: boolean;
};

const DEFAULT_ROW_HEIGHTS = [493, 429, 424, 424];

export function LibraryBento({
  heading,
  subheading,
  eyebrow,
  viewDocsCta,
  primaryCta,
  cards,
  rowHeights,
  testimonial,
  topAccent = false,
}: LibraryBentoProps) {
  if (cards.length === 0) return null;

  const rows =
    rowHeights && rowHeights.length > 0 ? rowHeights : DEFAULT_ROW_HEIGHTS;
  const expectedCardCount = rows.length * 2;
  const cardsForGrid = cards.slice(0, expectedCardCount);
  const hasTestimonial = Boolean(testimonial?.quote);

  return (
    <section
      // `data-outcomes` is the Nav's "light-start" marker — flips the nav
      // chrome from transparent-on-dark to solid-on-light. Only set when
      // this section is the first light block on the page (topAccent).
      data-outcomes={topAccent ? true : undefined}
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{
        padding: "60px 80px 40px",
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
              stroke="#625df5"
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
                color: "#625df5",
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

      {/* Outer container — wraps the cards grid and (optionally) a
          testimonial footer in one bordered, rounded box. */}
      <div
        className="overflow-hidden"
        style={{
          width: 1280,
          background: "#fff",
          border: "4px solid #1C1D21",
          borderRadius: 16,
        }}
      >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: rows.map((h) => `${h}px`).join(" "),
        }}
      >
        {cardsForGrid.map((card, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const isTopRow = row === 0;
          // When a testimonial footer is rendered, the bottom-row cards
          // are no longer at the outer container's corner — drop their
          // bottom-corner radii so the seam between cards and footer is
          // visually flush.
          const isLastRow = !hasTestimonial && row === rows.length - 1;
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
              {card.imageSrc ? (
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  aria-hidden
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.imageSrc}
                    alt=""
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              ) : (
                card.illustration
              )}
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

        {hasTestimonial && testimonial && (
          // Layout matches Figma node 1:5574 — 224px tall #111 bar with
          // avatar + name/role anchored to the left and the quote
          // pinned to the right at a fixed 421px column.
          <div
            style={{
              background: "#111",
              height: 160,
              padding: "0 57px 0 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div className="flex items-center" style={{ gap: 16, flexShrink: 0 }}>
              {testimonial.avatarSrc && (
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    border: "2px solid #B4B1FA",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={testimonial.avatarSrc}
                    alt={
                      testimonial.name
                        ? `${testimonial.name} Profile Photo`
                        : ""
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div className="flex flex-col" style={{ gap: 4 }}>
                {testimonial.name && (
                  <p
                    className="font-urbanist font-semibold"
                    style={{
                      color: "#fff",
                      fontSize: 18,
                      lineHeight: 1.2,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {testimonial.name}
                  </p>
                )}
                {testimonial.role && (
                  <p
                    className="font-urbanist"
                    style={{
                      color: "#fff",
                      opacity: 0.52,
                      fontSize: 16,
                      lineHeight: 1.2,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {testimonial.role}
                  </p>
                )}
              </div>
            </div>
            <p
              className="font-urbanist font-semibold"
              style={{
                color: "#fff",
                fontSize: 24,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                width: 421,
                flexShrink: 0,
              }}
            >
              {renderQuoteWithAccent(
                testimonial.quote ?? "",
                testimonial.accentFragment,
                testimonial.accentColor,
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
