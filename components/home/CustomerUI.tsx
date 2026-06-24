// CustomerUI — Figma node 1:20596. Interactive 11-customer carousel.
// Click a logo in the dark strip to swap the featured customer's headline
// pill, subtitle, product screenshot, and testimonial. Quotes scraped from
// velt.dev on 2026-04-21 — three tabs (Vareto/Toolio/Eqtble) reuse the
// Pendo testimonial on the live site.

"use client";

import { useState } from "react";
import Image from "next/image";

export type Customer = {
  slug: string;
  name: string;
  subtitle: string;
  pillLogoSrc: string | null;
  pillLogoWidthPx: number;
  pillLogoHeightPx: number;
  // Tab strip — per-brand natural dimensions from Framer CSS so each
  // wordmark renders at its real aspect (not stretched to a uniform size).
  stripLogoSrc: string;
  stripLogoWidthPx: number;
  stripLogoHeightPx: number;
  productSrc: string;
  testimonialAuthor: string;
  testimonialRole: string;
  testimonialQuote: string;
  testimonialHighlight: string;
  testimonialAvatarSrc: string;
};

// Tab dimensions taken from Framer export CSS (live velt.dev) so each
// logo renders at its native aspect. Dimensions are in px.
export const DEFAULT_CUSTOMERS: Customer[] = [
  {
    slug: "pendo",
    name: "Pendo",
    subtitle: "Pendo uses Velt popover comments to enable collaboration on dashboards",
    pillLogoSrc: "/images/home/pill-pendo.svg",
    pillLogoWidthPx: 102,
    pillLogoHeightPx: 34,
    stripLogoSrc: "/images/home/tab-pendo.png",
    stripLogoWidthPx: 100,
    stripLogoHeightPx: 23,
    productSrc: "/images/home/customer-pendo.png",
    testimonialAuthor: "Chris Bakke",
    testimonialRole: "Head of Product @X",
    testimonialQuote: "Velt had everything we needed for comments and notifications. We shipped in a week, no reinventing the wheel.",
    testimonialHighlight: "shipped in a week",
    testimonialAvatarSrc: "/images/home/avatar-pendo.png",
  },
  {
    slug: "heygen",
    name: "HeyGen",
    subtitle: "HeyGen uses Velt to drive engagement across their AI video workflows",
    pillLogoSrc: "/images/home/pill-heygen.svg",
    pillLogoWidthPx: 150,
    pillLogoHeightPx: 40,
    stripLogoSrc: "/images/home/tab-heygen.png",
    stripLogoWidthPx: 48,
    stripLogoHeightPx: 33,
    productSrc: "/images/home/customer-heygen.png",
    testimonialAuthor: "Yuri Kleban",
    testimonialRole: "Senior PM @Google",
    testimonialQuote: "Velt gave great 1 on 1 support, added features fast, and offered highly customizable components.",
    testimonialHighlight: "highly customizable components",
    testimonialAvatarSrc: "/images/home/avatar-heygen.png",
  },
  {
    slug: "bigtincan",
    name: "BigTinCan",
    subtitle: "BigTinCan uses Velt to power collaboration across sales enablement",
    pillLogoSrc: "/images/home/pill-bigtincan.svg",
    pillLogoWidthPx: 129,
    pillLogoHeightPx: 38,
    stripLogoSrc: "/images/home/tab-bigtincan.png",
    stripLogoWidthPx: 78,
    stripLogoHeightPx: 23,
    productSrc: "/images/home/customer-bigtincan.png",
    testimonialAuthor: "Gavin McIver",
    testimonialRole: "Senior PM @Bigtincan",
    testimonialQuote: "With Velt we turned months of development into weeks of delivery.",
    testimonialHighlight: "weeks of delivery",
    testimonialAvatarSrc: "/images/home/avatar-bigtincan.png",
  },
  {
    slug: "trumpet",
    name: "Trumpet",
    subtitle: "Trumpet uses Velt for async feedback across buyer journeys",
    pillLogoSrc: "/images/home/pill-trumpet.svg",
    pillLogoWidthPx: 167,
    pillLogoHeightPx: 28,
    stripLogoSrc: "/images/home/tab-trumpet.png",
    stripLogoWidthPx: 100,
    stripLogoHeightPx: 23,
    productSrc: "/images/home/customer-trumpet.png",
    testimonialAuthor: "William Angel",
    testimonialRole: "Lead PM @Trumpet",
    testimonialQuote: "Engagement at Trumpet grew by 10% after adding collaborative features from Velt",
    testimonialHighlight: "grew by 10%",
    testimonialAvatarSrc: "/images/home/avatar-trumpet.png",
  },
  {
    slug: "colossyan",
    name: "Colossyan",
    subtitle: "Colossyan uses Velt to enable real-time collaboration on AI video scripts",
    pillLogoSrc: "/images/home/pill-colossyan.svg",
    pillLogoWidthPx: 146,
    pillLogoHeightPx: 30,
    stripLogoSrc: "/images/home/tab-colossyan.png",
    stripLogoWidthPx: 98,
    stripLogoHeightPx: 21,
    productSrc: "/images/home/customer-colossyan.png",
    testimonialAuthor: "Imre Nagy",
    testimonialRole: "VP of Engineering @Colossyan",
    testimonialQuote: "Since adding commenting with Velt, our platform has seen higher engagement.",
    testimonialHighlight: "higher engagement",
    testimonialAvatarSrc: "/images/home/avatar-colossyan.png",
  },
  {
    slug: "metaimpact",
    name: "MetaImpact",
    subtitle: "MetaImpact uses Velt to align teams on sustainability insights",
    pillLogoSrc: "/images/home/pill-metaimpact.png",
    pillLogoWidthPx: 183,
    pillLogoHeightPx: 26,
    stripLogoSrc: "/images/home/tab-metaimpact.png",
    stripLogoWidthPx: 130,
    stripLogoHeightPx: 18,
    productSrc: "/images/home/customer-metaimpact.png",
    testimonialAuthor: "Jeff Cunning",
    testimonialRole: "CPO @MetaImpact",
    testimonialQuote: "With Velt's collaborative features we boosted our app's weekly active users by 26%",
    testimonialHighlight: "weekly active users by 26%",
    testimonialAvatarSrc: "/images/home/avatar-metaimpact.png",
  },
  {
    slug: "cloudfactory",
    name: "CloudFactory",
    subtitle: "CloudFactory uses Velt to scale review workflows across data annotation",
    pillLogoSrc: "/images/home/pill-cloudfactory.png",
    pillLogoWidthPx: 160,
    pillLogoHeightPx: 30,
    stripLogoSrc: "/images/home/tab-cloudfactory.png",
    stripLogoWidthPx: 100,
    stripLogoHeightPx: 23,
    productSrc: "/images/home/customer-cloudfactory.png",
    testimonialAuthor: "Fenne Buitenrust Hettema",
    testimonialRole: "Product Lead @CloudFactory",
    testimonialQuote: "The Velt Commenting features allow our users to communicate and collaborate in-tool to achieve fast feedback loops",
    testimonialHighlight: "fast feedback loops",
    testimonialAvatarSrc: "/images/home/avatar-cloudfactory.png",
  },
  {
    slug: "leadpages",
    name: "Leadpages",
    subtitle: "Leadpages uses Velt to keep design and marketing in sync",
    pillLogoSrc: "/images/home/pill-leadpages.png",
    pillLogoWidthPx: 154,
    pillLogoHeightPx: 34,
    stripLogoSrc: "/images/home/tab-leadpages.png",
    stripLogoWidthPx: 100,
    stripLogoHeightPx: 25,
    productSrc: "/images/home/customer-leadpages.png",
    testimonialAuthor: "Hope Callaway",
    testimonialRole: "Senior PM @Leadpages",
    testimonialQuote: "With Velt, Implementation took weeks, instead of the quarters it would have taken, even with 3 FTEs",
    testimonialHighlight: "weeks, instead of the quarters",
    testimonialAvatarSrc: "/images/home/avatar-leadpages.png",
  },
  {
    slug: "vareto",
    name: "Vareto",
    subtitle: "Vareto uses Velt for comments across financial planning dashboards",
    pillLogoSrc: "/images/home/pill-vareto.svg",
    pillLogoWidthPx: 161,
    pillLogoHeightPx: 30,
    stripLogoSrc: "/images/home/tab-vareto.png",
    stripLogoWidthPx: 90,
    stripLogoHeightPx: 22,
    productSrc: "/images/home/customer-vareto.png",
    testimonialAuthor: "Chris Bakke",
    testimonialRole: "Head of Product @X",
    testimonialQuote: "Velt had everything we needed for comments and notifications. We shipped in a week, no reinventing the wheel.",
    testimonialHighlight: "shipped in a week",
    testimonialAvatarSrc: "/images/home/avatar-pendo.png",
  },
  {
    slug: "toolio",
    name: "Toolio",
    subtitle: "Toolio uses Velt to streamline merchandise planning reviews",
    pillLogoSrc: "/images/home/pill-toolio.svg",
    pillLogoWidthPx: 155,
    pillLogoHeightPx: 28,
    stripLogoSrc: "/images/home/tab-toolio.png",
    stripLogoWidthPx: 75,
    stripLogoHeightPx: 22,
    productSrc: "/images/home/customer-toolio.png",
    testimonialAuthor: "Chris Bakke",
    testimonialRole: "Head of Product @X",
    testimonialQuote: "Velt had everything we needed for comments and notifications. We shipped in a week, no reinventing the wheel.",
    testimonialHighlight: "shipped in a week",
    testimonialAvatarSrc: "/images/home/avatar-pendo.png",
  },
  {
    slug: "eqtble",
    name: "eqtble",
    subtitle: "eqtble uses Velt to make people-analytics dashboards collaborative",
    pillLogoSrc: "/images/home/pill-eqtble.png",
    pillLogoWidthPx: 150,
    pillLogoHeightPx: 30,
    stripLogoSrc: "/images/home/tab-eqtble.png",
    stripLogoWidthPx: 88,
    stripLogoHeightPx: 18,
    productSrc: "/images/home/customer-eqtble.png",
    testimonialAuthor: "Ethan Veres",
    testimonialRole: "Co-founder and CTO @eqtble",
    testimonialQuote: "We were able to launch 5x times faster than building from scratch.",
    testimonialHighlight: "5x times faster",
    testimonialAvatarSrc: "/images/home/avatar-eqtble.png",
  },
];

function renderHighlightedQuote(quote: string, highlight: string) {
  if (!highlight) return <>{quote}</>;
  const idx = quote.indexOf(highlight);
  if (idx === -1) return <>{quote}</>;
  return (
    <>
      {quote.slice(0, idx)}
      <span style={{ color: "#b4b1fa" }}>{highlight}</span>
      {quote.slice(idx + highlight.length)}
    </>
  );
}

export function CustomerUI({
  customers = DEFAULT_CUSTOMERS,
}: { customers?: Customer[] } = {}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const VISIBLE_COUNT = 8;
  const [scrollOffset, setScrollOffset] = useState(0);
  const maxOffset = Math.max(0, customers.length - VISIBLE_COUNT);
  const visibleCustomers = customers.slice(scrollOffset, scrollOffset + VISIBLE_COUNT);

  /**
   * Scrolls the logo strip left by one position
   */
  function handleScrollLeft() {
    setScrollOffset((prev) => Math.max(0, prev - 1));
  }

  /**
   * Scrolls the logo strip right by one position
   */
  function handleScrollRight() {
    setScrollOffset((prev) => Math.min(maxOffset, prev + 1));
  }

  const active = customers[activeIdx] ?? customers[0];
  if (!active) return null;

  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg px-6 lg:px-20 pt-20 lg:pt-[150px] gap-10 lg:gap-13"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-6 lg:gap-8 w-full">
        <div className="flex flex-col items-center gap-4 max-w-[721px] w-full">
          <div className="flex items-center justify-center w-full gap-3 flex-wrap">
            <span
              className="font-urbanist font-bold whitespace-nowrap"
              style={{
                color: "#111",
                fontSize: "clamp(28px, 4.2vw, 52px)",
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              How
            </span>
            <div
              className="relative flex items-center justify-center shrink-0"
              style={{
                paddingLeft: 13,
                paddingRight: 13,
                height: "clamp(40px, 4.6vw, 57.2px)",
                background: "rgba(98,93,245,0.08)",
                borderRadius: 16.3,
                transition: "width 200ms ease",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.pillLogoSrc ?? active.stripLogoSrc}
                alt={active.name}
                style={{
                  height: "clamp(22px, 3vw, 40px)",
                  width: "auto",
                  display: "block",
                }}
              />
            </div>
            <span
              className="font-urbanist font-bold whitespace-nowrap"
              style={{
                color: "#111",
                fontSize: "clamp(28px, 4.2vw, 52px)",
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              Leverages Velt
            </span>
          </div>
          <p
            className="font-urbanist text-center w-full"
            style={{
              color: "#111",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              lineHeight: 1.3,
            }}
          >
            {active.subtitle}
          </p>
        </div>
        <div className="flex items-start justify-center gap-3">
          <a
            href="/book-demo"
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              border: "2px solid #625df5",
              textDecoration: "none",
            }}
          >
            <span
              className="font-urbanist font-semibold text-white"
              style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}
            >
              Book Demo
            </span>
          </a>
          <a
            href="/customers"
            className="flex items-center justify-center rounded-lg"
            style={{
              padding: "8px 16px",
              background: "#625df5",
              height: 44,
              textDecoration: "none",
            }}
          >
            <span
              className="font-urbanist font-bold text-white"
              style={{ fontSize: 16, letterSpacing: "-0.03em" }}
            >
              View Customers
            </span>
          </a>
        </div>
      </div>

      {/* Dark rounded carousel */}
      <div
        className="flex flex-col overflow-hidden w-full max-w-[1280px]"
        style={{
          background: "#111",
          borderRadius: 24,
          border: "2px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Tab row: paginated logo strip. Arrow controls show on lg+; below
            lg the strip becomes a native horizontal scroller so touch users
            can swipe through logos. */}
        <div
          className="flex items-center w-full"
          style={{ height: 52, padding: "0 12px", background: "#111" }}
        >
          <button
            type="button"
            aria-label="Scroll logos left"
            onClick={handleScrollLeft}
            className="hidden lg:flex items-center justify-center shrink-0 cursor-pointer"
            style={{
              width: 32,
              height: 32,
              background: "transparent",
              border: "none",
              opacity: scrollOffset > 0 ? 0.7 : 0.2,
              transition: "opacity 150ms",
              pointerEvents: scrollOffset > 0 ? "auto" : "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Mobile strip: full list, horizontally scrollable. Renders
              below lg only. */}
          <div
            className="lg:hidden flex flex-1 items-center overflow-x-auto no-scrollbar gap-6"
            style={{ padding: "0 16px", minWidth: 0 }}
          >
            {customers.map((c) => {
              const realIdx = customers.indexOf(c);
              const isActive = realIdx === activeIdx;
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-label={`Show ${c.name}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveIdx(realIdx)}
                  className="flex items-center justify-center cursor-pointer shrink-0"
                  style={{
                    width: c.stripLogoWidthPx,
                    height: 28,
                    padding: 0,
                    background: "transparent",
                    border: "none",
                    opacity: isActive ? 1 : 0.45,
                    transition: "opacity 150ms",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.stripLogoSrc}
                    alt={c.name}
                    style={{
                      width: c.stripLogoWidthPx,
                      height: c.stripLogoHeightPx,
                      objectFit: "contain",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Desktop strip: paginated VISIBLE_COUNT window. */}
          <div
            className="hidden lg:flex flex-1 items-center justify-between overflow-hidden"
            style={{ padding: "0 16px", minWidth: 0 }}
          >
            {visibleCustomers.map((c) => {
              const realIdx = customers.indexOf(c);
              const isActive = realIdx === activeIdx;
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-label={`Show ${c.name}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveIdx(realIdx)}
                  className="flex items-center justify-center cursor-pointer shrink-0"
                  style={{
                    width: c.stripLogoWidthPx,
                    height: 28,
                    padding: 0,
                    background: "transparent",
                    border: "none",
                    opacity: isActive ? 1 : 0.45,
                    transition: "opacity 150ms",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = "0.45";
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.stripLogoSrc}
                    alt={c.name}
                    style={{
                      width: c.stripLogoWidthPx,
                      height: c.stripLogoHeightPx,
                      objectFit: "contain",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Scroll logos right"
            onClick={handleScrollRight}
            className="hidden lg:flex items-center justify-center shrink-0 cursor-pointer"
            style={{
              width: 32,
              height: 32,
              background: "transparent",
              border: "none",
              opacity: scrollOffset < maxOffset ? 0.7 : 0.2,
              transition: "opacity 150ms",
              pointerEvents: scrollOffset < maxOffset ? "auto" : "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Product screenshot — all 11 stacked so the browser fetches them
            in parallel and switching between customers is just an opacity
            swap (no network round-trip). next/image converts the source
            PNGs to AVIF/WebP at the displayed size. */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            aspectRatio: "1920/1021",
            background: "#111",
          }}
        >
          {customers.map((c, idx) => (
            <Image
              key={c.slug}
              src={c.productSrc}
              alt={`${c.name} integrated with Velt`}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="absolute inset-0"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                opacity: idx === activeIdx ? 1 : 0,
                transition: "opacity 150ms ease",
              }}
            />
          ))}
        </div>

        {/* Testimonial — swaps per customer. Stacks vertically on mobile. */}
        <div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-5 lg:gap-0"
          style={{ padding: "24px 24px 28px", background: "#111" }}
        >
          <div className="flex items-center shrink-0 gap-4">
            <div
              className="relative overflow-hidden shrink-0"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#b387f7",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={active.slug}
                src={active.testimonialAvatarSrc}
                alt={`${active.testimonialAuthor} profile photo`}
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="font-urbanist font-semibold text-white"
                style={{ fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.03em" }}
              >
                {active.testimonialAuthor}
              </span>
              <span
                className="font-urbanist text-white"
                style={{ fontSize: 16, lineHeight: 1.2, opacity: 0.52, letterSpacing: "-0.03em" }}
              >
                {active.testimonialRole}
              </span>
            </div>
          </div>
          <p
            className="font-urbanist font-semibold text-white lg:max-w-[380px]"
            style={{
              fontSize: "clamp(16px, 1.8vw, 22px)",
              lineHeight: 1.3,
              letterSpacing: "-0.03em",
            }}
          >
            {active.testimonialQuote}
          </p>
        </div>
      </div>
    </section>
  );
}
