// CustomerUI — Figma node 1:20596. Interactive 11-customer carousel.
// Click a logo in the dark strip to swap the featured customer's headline
// pill, subtitle, product screenshot, and testimonial. Quotes scraped from
// velt.dev on 2026-04-21 — three tabs (Vareto/Toolio/Eqtble) reuse the
// Pendo testimonial on the live site.

"use client";

import { useState } from "react";

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
    testimonialQuote: "Velt had everything we needed for comments and notifications. We shipped in a week, no reinventing the wheel",
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
    testimonialAuthor: "Fenne Buitenrust",
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
    testimonialQuote: "Velt had everything we needed for comments and notifications. We shipped in a week, no reinventing the wheel",
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
    testimonialQuote: "Velt had everything we needed for comments and notifications. We shipped in a week, no reinventing the wheel",
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
      <span style={{ color: "#b387f7" }}>{highlight}</span>
      {quote.slice(idx + highlight.length)}
    </>
  );
}

export function CustomerUI({
  customers = DEFAULT_CUSTOMERS,
}: { customers?: Customer[] } = {}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = customers[activeIdx] ?? customers[0];
  if (!active) return null;

  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "52px 80px 0", gap: 52 }}
    >
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 32 }}>
        <div className="flex flex-col items-center" style={{ gap: 16, width: 721 }}>
          <div className="flex items-center justify-center w-full" style={{ gap: 12 }}>
            <span
              className="font-urbanist font-bold whitespace-nowrap"
              style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              How
            </span>
            <div
              className="relative flex items-center justify-center shrink-0"
              style={{
                width: active.pillLogoWidthPx + 26,
                height: 57.2,
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
                  height: active.pillLogoHeightPx,
                  width: "auto",
                  display: "block",
                }}
              />
            </div>
            <span
              className="font-urbanist font-bold whitespace-nowrap"
              style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              Leverages Velt
            </span>
          </div>
          <p
            className="font-urbanist text-center w-full"
            style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}
          >
            {active.subtitle}
          </p>
        </div>
        <div className="flex items-start justify-center" style={{ gap: 12 }}>
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
            href="https://velt.dev/customers"
            target="_blank"
            rel="noopener"
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
        className="flex flex-col overflow-hidden"
        style={{
          width: 1280,
          background: "#111",
          borderRadius: 24,
        }}
      >
        {/* Tab row: per-brand natural widths, centered, minimal gap.
            No pill on active — differentiation is opacity only,
            matching the live velt.dev look. Click a logo to swap the
            featured customer; no chevrons (live site has none). */}
        <div
          className="flex items-center w-full"
          style={{ height: 44, padding: "0 16px", background: "#111" }}
        >
          <div
            className="flex flex-1 items-center justify-center"
            style={{ gap: 22, minWidth: 0 }}
          >
            {customers.map((c, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-label={`Show ${c.name}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveIdx(i)}
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
        </div>

        {/* Product screenshot — fills edge-to-edge, 24px radius, object-cover */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            aspectRatio: "1920/1021",
            background: "#111",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={active.slug}
            src={active.productSrc}
            alt={`${active.name} integrated with Velt`}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>

        {/* Testimonial — swaps per customer */}
        <div
          className="flex items-center justify-between w-full"
          style={{ padding: 40, background: "#111" }}
        >
          <div className="flex items-center shrink-0" style={{ gap: 16 }}>
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
            <div className="flex flex-col" style={{ gap: 4 }}>
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
            className="font-urbanist font-semibold text-white"
            style={{ fontSize: 22, maxWidth: 540, lineHeight: 1.3, letterSpacing: "-0.03em", textAlign: "right" }}
          >
            {renderHighlightedQuote(active.testimonialQuote, active.testimonialHighlight)}
          </p>
        </div>
      </div>
    </section>
  );
}
