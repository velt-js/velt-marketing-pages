// Shared chrome for the "extend the capabilities" / "stacked image card"
// section family. Renders a 1280-wide white card with a dark border, a
// centered heading + subheading + CTA stack at top, a slot for the body,
// and an optional dark testimonial bar attached to the bottom edge.
//
// Used by FeatureCardRow (grid of 3-4 demo cells) and FeatureImageCard
// (single full-width image).

import Link from "next/link";
import type { ReactNode } from "react";

import { Book2Icon } from "./uis/icons";

export type ShellCtaLink = { label?: string; href?: string; newTab?: boolean };

export type FeatureSectionShellTestimonial = {
  name?: string;
  role?: string;
  quote?: string;
  accentFragment?: string;
  accentColor?: string;
  avatarSrc?: string;
};

export type FeatureSectionShellProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: ShellCtaLink;
  primaryCta?: ShellCtaLink;
  testimonial?: FeatureSectionShellTestimonial;
  /** When true, gives the section a 48px top corner curve and 80px top
   *  margin so it can sit immediately under a dark section as the first
   *  light block of the page. Mirrors LibraryBento's `topAccent`. Also
   *  sets `data-outcomes` so the Nav flips to its light/dark scheme. */
  topAccent?: boolean;
  children: ReactNode;
};

export function FeatureSectionShell({
  eyebrow,
  heading,
  subheading,
  viewDocsCta,
  primaryCta,
  testimonial,
  topAccent = false,
  children,
}: FeatureSectionShellProps) {
  const hasTestimonial = Boolean(testimonial?.quote);

  return (
    <section
      // `data-outcomes` is the Nav's "light-start" marker — flips the nav
      // chrome from transparent-on-dark to solid-on-light. Only set when
      // this section is the first light block on the page (topAccent).
      data-outcomes={topAccent ? true : undefined}
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{
        padding: "100px 80px",
        marginTop: topAccent ? 80 : 0,
        borderTopLeftRadius: topAccent ? 48 : 0,
        borderTopRightRadius: topAccent ? 48 : 0,
      }}
    >
      <div
        className="overflow-hidden flex flex-col"
        style={{
          width: 1280,
          background: "#fff",
          border: "2px solid #0e0d36",
          borderRadius: 32,
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{ gap: 32, padding: "55px 0 0 0" }}
        >
          <div
            className="flex flex-col items-center text-center"
            style={{ gap: 12, maxWidth: 691 }}
          >
            {eyebrow ? (
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
            ) : null}
            <h2
              className="font-urbanist font-bold"
              style={{
                color: "#111",
                fontSize: 52,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              {heading}
            </h2>
            {subheading ? (
              <p
                className="font-urbanist"
                style={{
                  color: "#111",
                  fontSize: 20,
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {subheading}
              </p>
            ) : null}
          </div>
          {(viewDocsCta || primaryCta) && (
            <div className="flex items-start" style={{ gap: 12 }}>
              {viewDocsCta?.label && viewDocsCta.href ? (
                <ShellCta variant="secondary" cta={viewDocsCta} />
              ) : null}
              {primaryCta?.label && primaryCta.href ? (
                <ShellCta variant="primary" cta={primaryCta} />
              ) : null}
            </div>
          )}
        </div>

        {/* Visual area — flex-grows to fill the card and vertically
         *  centers `children` in the slack between heading and testimonial.
         *  Without this, the heading block's old 80px bottom padding
         *  pushed the children block visually low, especially when paired
         *  with a testimonial bar that anchored everything to the bottom. */}
        <div
          className="flex-1 flex items-center justify-center w-full"
          style={{ paddingTop: 56, paddingBottom: 56 }}
        >
          {children}
        </div>

        {hasTestimonial && testimonial ? (
          <TestimonialFooter t={testimonial} />
        ) : null}
      </div>
    </section>
  );
}

export function ShellCta({
  variant,
  cta,
}: {
  variant: "primary" | "secondary";
  cta: ShellCtaLink;
}) {
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

export function TestimonialFooter({
  t,
}: {
  t: FeatureSectionShellTestimonial;
}) {
  const quote = t.quote ?? "";
  return (
    <div
      style={{
        background: "#1c1d21",
        padding: "40px 52px",
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
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              {t.name}
            </p>
          ) : null}
          {t.role ? (
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

function renderQuoteWithAccent(
  quote: string,
  fragment?: string,
  color?: string,
) {
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
