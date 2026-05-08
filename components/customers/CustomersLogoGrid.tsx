// Customer logo grid for /customers — Figma node 536:8693.
//
// 3-column flex grid; each cell is `flex: 1, height: 136, bg: #f7f7f7,
// borderRadius: 24` per `get_design_context` for the section. The user
// has explicitly noted the live site's blue logo background should NOT
// be used — this section sits on a white page bg with the lighter-gray
// `#f7f7f7` cells. Logos render in grayscale by default (per the user's
// "logos should be placed in Black and white in the boxes/containers"
// rule).
//
// Each cell is wrapped in an external <a target="_blank"> linking to
// the customer's site (data driven by customer-logos.ts; URLs scraped
// from velt.dev/customers). On hover the logo fades out and a centered
// "VIEW SITE →" label fades in — mirrors the live framer interaction.

import type { CustomerLogoEntry } from "./customer-logos";

const COLS = 3;
const ROW_HEIGHT = 136;
const CELL_RADIUS = 24;
// Inner padding around each logo. Larger padding = smaller rendered logo,
// which keeps short-natural-height wordmarks (e.g. Trumpet at 48 px tall)
// from being upscaled into pixelation. 50 px ≈ 25% smaller than the
// previous 44 px setting (inner height 36 px vs. 48 px).
const CELL_PADDING = 50;
const GAP = 16;
const CELL_BG = "#f7f7f7";
const SECTION_PAD_TOP = 100;
const SECTION_PAD_BOTTOM = 120;

export function CustomersLogoGrid({
  entries,
}: {
  entries: CustomerLogoEntry[];
}) {
  return (
    <section
      data-outcomes
      className="relative flex flex-col items-center full-bleed-bg"
      style={{
        background: "#FFFFFF",
        paddingTop: SECTION_PAD_TOP,
        paddingBottom: SECTION_PAD_BOTTOM,
        // Rounded BOTTOM corners — the curve sits at the white→dark
        // boundary into FeatureCustomerCarousel below, not at the
        // white-on-white seam with CustomerUI above.
        borderBottomLeftRadius: 52,
        borderBottomRightRadius: 52,
      }}
    >
      <div
        className="grid"
        style={{
          width: 1280,
          gap: GAP,
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
        }}
      >
        {entries.map((entry) => (
          <LogoCell key={entry.name} entry={entry} />
        ))}
      </div>
    </section>
  );
}

function LogoCell({ entry }: { entry: CustomerLogoEntry }) {
  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener"
      aria-label={entry.name}
      className="group relative block"
      style={{
        minWidth: 0,
        height: ROW_HEIGHT,
        background: CELL_BG,
        borderRadius: CELL_RADIUS,
        overflow: "hidden",
      }}
    >
      {/* Logo — fills the cell with object-fit: contain. Default: solid
       *  black silhouette at 0.85 opacity. The framer source PNGs are
       *  white-on-transparent (designed for velt.dev's dark blue cells),
       *  so `brightness-0` darkens them to pure black against our light
       *  `#f7f7f7` cells; transparent regions stay transparent. On cell
       *  hover, fades out so the "View Site" overlay can take over.
       *  Opacity is controlled by Tailwind classes (instead of inline
       *  style) so the hover transition isn't fighting the inline default. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={entry.logoSrc}
        alt={entry.name}
        width={entry.logoWidth}
        height={entry.logoHeight}
        className="absolute block brightness-0 opacity-[0.85] transition-opacity duration-200 group-hover:opacity-0"
        style={{
          top: CELL_PADDING,
          left: CELL_PADDING,
          width: `calc(100% - ${CELL_PADDING * 2}px)`,
          height: `calc(100% - ${CELL_PADDING * 2}px)`,
          objectFit: "contain",
          objectPosition: "center",
        }}
      />

      {/* "VIEW SITE →" overlay — centered, hidden by default, fades in on
       *  cell hover. */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ gap: 8 }}
      >
        <span
          className="font-urbanist uppercase"
          style={{
            fontSize: 12,
            letterSpacing: "0.25em",
            color: "#999999",
          }}
        >
          View Site
        </span>
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#999999"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: "block" }}
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </a>
  );
}

