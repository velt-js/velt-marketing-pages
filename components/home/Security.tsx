// Security — reusable Enterprise-Grade Security section.
//
// Used on the homepage, /libraries, /libraries/tiptap, and any future
// marketing page. Content is fully prop-driven so each page can swap copy,
// CTAs, cards, or the trailing certification card without forking the
// component. Defaults below mirror velt.dev/libraries (Framer source).
//
// Layout (matches live `framer-aon7pn` / `framer-dxs8hp`):
//   • Header: shield + h2 + subhead + two CTAs, max-width 820 (gap 16).
//   • 2×2 card grid: `repeat(2, 1fr)`, gap 16, max-width 820, each card 493 tall.
//   • Trust & Compliance: full-width pill card, ~130 tall, badges right-aligned.
//
// Card visuals are PNGs exported from the Velt-Marketing-2026 Figma file
// (node 164:20775), cropped to remove the title block. Each PNG carries the
// card's #f7f7f7 background and matching rounded corners.

import type { ReactNode } from "react";
import { InlineTestimonialCard } from "./InlineTestimonialCard";

function ShieldIcon() {
  return (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.9996 7.5C35.8392 12.6664 43.4608 15.3564 51.2496 15C52.3836 18.8575 52.7305 22.9037 52.2699 26.898C51.8093 30.8922 50.5504 34.7532 48.5681 38.2513C46.5858 41.7495 43.9206 44.8135 40.7307 47.2612C37.5409 49.7089 33.8916 51.4905 29.9996 52.5M29.9996 7.5C24.16 12.6664 16.5384 15.3564 8.74959 15C7.6156 18.8575 7.26863 22.9037 7.72927 26.898C8.18992 30.8922 9.44879 34.7532 11.4311 38.2513C13.4134 41.7495 16.0786 44.8135 19.2684 47.2612C22.4583 49.7089 26.1076 51.4905 29.9996 52.5M29.9996 7.5V52.5M8.75 30H51.25" stroke="#625CF4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
  );
}

export function CardVisual({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
    />
  );
}

export type SecurityCardData = {
  title: string;
  subtitle: string;
  visual: ReactNode;
};

export type SecurityBadge = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type SecurityTestimonialData = {
  name: string;
  role: string;
  quote: string;
  avatarSrc: string;
};

export type SecurityProps = {
  heading?: string;
  subheading?: string;
  primaryCta?: { label: string; href?: string };
  secondaryCta?: { label: string; href?: string };
  cards?: SecurityCardData[];
  certification?: {
    title: string;
    subtitle: string;
    badges: SecurityBadge[];
  } | null;
  /** Trailing testimonial below the certification card. Pass `null` to hide. */
  testimonial?: SecurityTestimonialData | null;
  /**
   * Optional full-width card rendered below the card grid and above the
   * certification pill. Matches SecurityCardBox chrome (#f7f7f7, rounded 24)
   * but spans the full 820px column. Visual is anchored to the right half
   * with title/subtitle on the left. Pass `null` (or omit) to hide.
   */
  wideBottomCard?: SecurityCardData | null;
  /** Override default section top padding (150). */
  paddingTop?: number;
  /** Override default section bottom padding (100). */
  paddingBottom?: number;
};

const DEFAULT_CARDS: SecurityCardData[] = [
  {
    title: "Self-Hosting of Data",
    subtitle: "Own and control your customer data",
    visual: <CardVisual src="/images/security/Bring%20your%20own%20database.png" />,
  },
  {
    title: "Multi-Region Hosting",
    subtitle: "Host your data where you need it",
    visual: <CardVisual src="/images/security/Mutli%20Region%20Hosting.png" />,
  },
  {
    title: "Isolated Server and Data Storage",
    subtitle: "Our customer data is logically isolated and never co-mingled",
    visual: <CardVisual src="/images/security/Isolated%20Data.png" />,
  },
  {
    title: "Custom Data Encryption",
    subtitle: "Encrypt with your own keys, so even we can't read your data",
    visual: <CardVisual src="/images/security/Custom%20Data%20Encryption.png" />,
  },
];

const DEFAULT_TESTIMONIAL: SecurityTestimonialData = {
  name: "Yuri Kleban",
  role: "Senior PM @Google",
  quote:
    "Velt gave great 1 on 1 support, added features fast, and offered highly customizable components.",
  avatarSrc: "/images/features/comments/trust-us/avatar-yuri.png",
};

const DEFAULT_CERTIFICATION = {
  title: "Trust & Compliance",
  subtitle: "SOC 2 Type II and HIPAA with BAA",
  badges: [
    {
      src: "/images/security/badge-soc2.png",
      alt: "AICPA SOC",
      width: 90,
      height: 90,
    },
    {
      src: "/images/security/badge-pentesting.svg",
      alt: "Annual Pentesting",
      width: 90,
      height: 90,
    },
    {
      src: "/images/security/badge-hipaa.png",
      alt: "HIPAA",
      width: 90,
      height: 90,
    },
  ],
};

function SecurityCardBox({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <article
      className="relative overflow-hidden"
      style={{
        width: "100%",
        height: 493,
        background: "#f7f7f7",
        borderRadius: 24,
      }}
    >
      <div
        className="absolute"
        style={{ top: 0, left: 0, right: 0, height: 340 }}
      >
        {children}
      </div>
      <div
        className="absolute flex flex-col items-start"
        style={{ bottom: 28, left: 28, right: 28, gap: 8 }}
      >
        <h3
          className="font-urbanist font-bold"
          style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}
        >
          {title}
        </h3>
        <p
          className="font-urbanist"
          style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}
        >
          {subtitle}
        </p>
      </div>
    </article>
  );
}

// WideBottomCardBox — full-width variant of SecurityCardBox.
// Same #f7f7f7 chrome and rounded-24 corners, but the visual sits in the
// right half of the card (top-aligned) while the title/subtitle anchor to
// the bottom-left. Used by Security's `wideBottomCard` prop for cases like
// the Support section's "Priority Support SLAs" timeline and the Security
// section's "Security Certification" badge row.
function WideBottomCardBox({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <article
      className="relative overflow-hidden"
      style={{
        width: "100%",
        height: 280,
        background: "#f7f7f7",
        borderRadius: 24,
      }}
    >
      <div
        className="absolute"
        style={{ top: 0, right: 0, bottom: 0, width: "50%" }}
      >
        {children}
      </div>
      <div
        className="absolute flex flex-col items-start"
        style={{ bottom: 28, left: 28, right: "52%", gap: 8 }}
      >
        <h3
          className="font-urbanist font-bold"
          style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}
        >
          {title}
        </h3>
        <p
          className="font-urbanist"
          style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}
        >
          {subtitle}
        </p>
      </div>
    </article>
  );
}

export function Security({
  heading = "Enterprise-Grade Security",
  subheading = "Security and privacy features that enterprise companies need",
  primaryCta = { label: "View Trust Center", href: "https://trust.velt.dev" },
  secondaryCta = { label: "Book Demo", href: "/book-demo" },
  cards = DEFAULT_CARDS,
  certification = DEFAULT_CERTIFICATION,
  testimonial = DEFAULT_TESTIMONIAL,
  wideBottomCard = null,
  paddingTop = 150,
  paddingBottom = 100,
}: SecurityProps = {}) {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: `${paddingTop}px 80px ${paddingBottom}px`, gap: 40 }}
    >
      <div className="flex flex-col items-center" style={{ gap: 24, maxWidth: 820 }}>
        <div className="flex flex-col items-center text-center" style={{ gap: 12 }}>
          <ShieldIcon />
          <h2
            className="font-urbanist font-bold"
            style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            {heading}
          </h2>
          <p
            className="font-urbanist"
            style={{ color: "#000", fontSize: 20, lineHeight: 1.3 }}
          >
            {subheading}
          </p>
        </div>
        <div className="flex items-center" style={{ gap: 12 }}>
          <a
            href={primaryCta.href}
            className="flex items-center justify-center rounded-lg font-urbanist font-semibold whitespace-nowrap"
            style={{
              height: 44,
              padding: "8px 16px",
              border: "2px solid #625df5",
              color: "#000",
              fontSize: 16,
              letterSpacing: "-0.03em",
              textDecoration: "none",
            }}
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            className="flex items-center justify-center rounded-lg font-urbanist font-semibold whitespace-nowrap"
            style={{
              height: 44,
              padding: "8px 16px",
              background: "#625df5",
              color: "#fff",
              fontSize: 16,
              letterSpacing: "-0.03em",
              textDecoration: "none",
            }}
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>

      <div className="flex flex-col" style={{ gap: 16, width: 820 }}>
        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}
        >
          {cards.map((card) => (
            <SecurityCardBox key={card.title} title={card.title} subtitle={card.subtitle}>
              {card.visual}
            </SecurityCardBox>
          ))}
        </div>

        {wideBottomCard && (
          <WideBottomCardBox
            title={wideBottomCard.title}
            subtitle={wideBottomCard.subtitle}
          >
            {wideBottomCard.visual}
          </WideBottomCardBox>
        )}

        {certification && (
          <article
            className="relative flex items-center justify-between overflow-hidden"
            style={{
              width: "100%",
              height: 170,
              background: "#f7f7f7",
              borderRadius: 24,
              padding: "0 61px 0 30px",
            }}
          >
            <div className="flex flex-col items-start" style={{ gap: 8 }}>
              <h3
                className="font-urbanist font-bold"
                style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}
              >
                {certification.title}
              </h3>
              <p
                className="font-urbanist"
                style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}
              >
                {certification.subtitle}
              </p>
            </div>
            <div className="flex items-center" style={{ gap: 32 }}>
              {certification.badges.map((b) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={b.src}
                  src={b.src}
                  alt={b.alt}
                  width={b.width ?? 90}
                  height={b.height ?? 90}
                  style={{ display: "block", objectFit: "contain" }}
                />
              ))}
            </div>
          </article>
        )}

        {testimonial && (
          <InlineTestimonialCard
            name={testimonial.name}
            role={testimonial.role}
            quote={testimonial.quote}
            avatarSrc={testimonial.avatarSrc}
          />
        )}
      </div>
    </section>
  );
}
