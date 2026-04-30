// "Extend the Capabilities" — section heading + dual CTAs above a single
// 1280-wide white card holding 3 (or 4) equal-width feature cards. Each
// card has an icon eyebrow + title at the top, an embedded UI demo in the
// middle, and a "View Docs ›" link at the bottom. Optional inline
// testimonial bar attaches to the bottom edge of the outer card.
//
// Figma node 174:27194.

import Link from "next/link";
import type { ReactNode } from "react";

import {
  SECTION_ICONS,
  ChevronRightIcon,
  Book2Icon,
  type SectionIconKey,
} from "./uis/icons";

type CtaLink = { label?: string; href?: string; newTab?: boolean };

export type FeatureCardRowCard = {
  title: string;
  iconImageSrc?: string;
  /** Section title icon key. Resolves via SECTION_ICONS. */
  iconKey?: SectionIconKey;
  uiComponent?: ReactNode;
  viewDocsHref?: string;
};

export type FeatureCardRowProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: CtaLink;
  primaryCta?: CtaLink;
  cards: FeatureCardRowCard[];
  testimonial?: {
    name?: string;
    role?: string;
    quote?: string;
    accentFragment?: string;
    accentColor?: string;
    avatarSrc?: string;
  };
};

export function FeatureCardRow({
  eyebrow,
  heading,
  subheading,
  viewDocsCta,
  primaryCta,
  cards,
  testimonial,
}: FeatureCardRowProps) {
  const hasTestimonial = Boolean(testimonial?.quote);

  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "100px 80px" }}
    >
      <div
        className="overflow-hidden"
        style={{
          width: 1280,
          background: "#fff",
          border: "2px solid #0e0d36",
          borderRadius: 32,
        }}
      >
        <div className="flex flex-col items-center" style={{ gap: 32, padding: "55px 0 80px 0" }}>
          <div className="flex flex-col items-center text-center" style={{ gap: 12, maxWidth: 691 }}>
            {eyebrow ? (
              <span
                className="font-urbanist font-semibold uppercase"
                style={{ color: "#625df5", fontSize: 14, letterSpacing: "0.6px", lineHeight: 1.2 }}
              >
                {eyebrow}
              </span>
            ) : null}
            <h2
              className="font-urbanist font-bold"
              style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em", margin: 0 }}
            >
              {heading}
            </h2>
            {subheading ? (
              <p className="font-urbanist" style={{ color: "#111", fontSize: 20, lineHeight: 1.2, margin: 0 }}>
                {subheading}
              </p>
            ) : null}
          </div>
          {(viewDocsCta || primaryCta) && (
            <div className="flex items-start" style={{ gap: 12 }}>
              {viewDocsCta?.label && viewDocsCta.href ? (
                <RowCta variant="secondary" cta={viewDocsCta} />
              ) : null}
              {primaryCta?.label && primaryCta.href ? (
                <RowCta variant="primary" cta={primaryCta} />
              ) : null}
            </div>
          )}
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cards.length}, 1fr)`,
          }}
        >
          {cards.map((card, i) => (
            <CardCell
              key={`${card.title}-${i}`}
              card={card}
              isLast={i === cards.length - 1}
              hasTestimonialBelow={hasTestimonial}
            />
          ))}
        </div>

        {hasTestimonial && testimonial ? <TestimonialFooter t={testimonial} /> : null}
      </div>
    </section>
  );
}

function CardCell({
  card,
  isLast,
}: {
  card: FeatureCardRowCard;
  isLast: boolean;
  hasTestimonialBelow: boolean;
}) {
  const Icon = card.iconKey ? SECTION_ICONS[card.iconKey] : null;
  return (
    <article
      className="relative overflow-hidden"
      style={{
        background: "#fff",
        height: 440,
        borderRight: isLast ? "none" : "1px solid #f6f6f6",
      }}
    >
      {/* Icon + title — top:48.5, centered horizontally */}
      <div
        className="absolute flex items-center"
        style={{
          left: "50%",
          top: 48.5,
          transform: "translateX(-50%)",
          gap: 12,
          color: "#111",
        }}
      >
        {Icon ? <Icon size={card.iconKey === "braces" ? 30 : 32} stroke="#111" strokeWidth={1.6} /> : null}
        <h3
          className="font-urbanist font-semibold"
          style={{
            color: "#111",
            fontSize: 20,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {card.title}
        </h3>
      </div>

      {/* UI demo — UI component absolute-positions itself within this column */}
      {card.uiComponent ?? null}

      {/* White-to-transparent gradient mask on the right edge — fades the
          comments-card right overflow into nothing. */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: 0,
          top: 69.5,
          width: 186,
          height: 320,
          background:
            "linear-gradient(to left, #fff 5%, rgba(255,255,255,0) 100%)",
        }}
        aria-hidden
      />

      {/* View Docs footer — top:379.5, centered horizontally */}
      {card.viewDocsHref ? (
        <a
          href={card.viewDocsHref}
          target="_blank"
          rel="noopener"
          className="absolute flex items-center"
          style={{
            left: "50%",
            top: 379.5,
            transform: "translateX(-50%)",
            gap: 12,
            color: "#8f8f8f",
            fontFamily: "Urbanist, sans-serif",
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          <span>View Docs</span>
          <span
            className="flex items-center justify-center"
            style={{
              background: "#f3f4f7",
              padding: 4,
              borderRadius: 12,
              color: "#8f8f8f",
            }}
          >
            <ChevronRightIcon size={12} stroke="#8f8f8f" strokeWidth={2} />
          </span>
        </a>
      ) : null}
    </article>
  );
}

function RowCta({ variant, cta }: { variant: "primary" | "secondary"; cta: CtaLink }) {
  const isPrimary = variant === "primary";
  // Match the Customizer CTA shape — see FeatureCustomizer.tsx:CustCta.
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minWidth: 156,
    height: 44,
    padding: "8px 16px",
    borderRadius: 8,
    fontFamily: '"Urbanist", sans-serif',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 1.2,
    letterSpacing: "-0.03em",
    color: "#fff",
    textDecoration: "none",
    background: isPrimary ? "#615df5" : "transparent",
    border: "2px solid #615df5",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };
  const innerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    color: "#fff",
    mixBlendMode: isPrimary ? undefined : "exclusion",
  };
  const inner = (
    <span style={innerStyle}>
      {!isPrimary ? <Book2Icon size={18} stroke="#fff" /> : null}
      {cta.label}
    </span>
  );
  const isExternal = !!cta.href && /^(https?:)?\/\//.test(cta.href);
  if (isExternal || cta.newTab) {
    return (
      <a href={cta.href} target="_blank" rel="noopener" style={baseStyle}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={cta.href ?? "#"} style={baseStyle}>
      {inner}
    </Link>
  );
}

function TestimonialFooter({ t }: { t: NonNullable<FeatureCardRowProps["testimonial"]> }) {
  const quote = t.quote ?? "";
  return (
    <div
      style={{
        background: "#111",
        height: 224,
        padding: "0 57px 0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}
    >
      <div className="flex items-center" style={{ gap: 16, flexShrink: 0 }}>
        {t.avatarSrc ? (
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
              src={t.avatarSrc}
              alt={t.name ? `${t.name} Profile Photo` : ""}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ) : null}
        <div className="flex flex-col" style={{ gap: 4 }}>
          {t.name ? (
            <p
              className="font-urbanist font-semibold"
              style={{ color: "#fff", fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              {t.name}
            </p>
          ) : null}
          {t.role ? (
            <p
              className="font-urbanist"
              style={{ color: "#fff", opacity: 0.52, fontSize: 16, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              {t.role}
            </p>
          ) : null}
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
        {renderQuoteWithAccent(quote, t.accentFragment, t.accentColor)}
      </p>
    </div>
  );
}

function renderQuoteWithAccent(quote: string, fragment?: string, color?: string) {
  if (!fragment || !color || !quote.includes(fragment)) return quote;
  const idx = quote.indexOf(fragment);
  return (
    <>
      {quote.slice(0, idx)}
      <span style={{ color }}>{fragment}</span>
      {quote.slice(idx + fragment.length)}
    </>
  );
}
