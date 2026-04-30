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

function ShieldIcon() {
  return (
    <svg width="32" height="38" viewBox="0 0 40 48" fill="none" aria-hidden="true">
      <path
        d="M20 2 L36 8 V22 C36 33 28 42 20 46 C12 42 4 33 4 22 V8 L20 2 Z"
        stroke="#625df5"
        strokeWidth="2"
        fill="none"
      />
      <line x1="20" y1="14" x2="20" y2="30" stroke="#625df5" strokeWidth="2" />
      <line x1="12" y1="22" x2="28" y2="22" stroke="#625df5" strokeWidth="2" />
    </svg>
  );
}

function CardVisual({ src }: { src: string }) {
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
  };
};

const DEFAULT_CARDS: SecurityCardData[] = [
  {
    title: "Self-Hosting of Data",
    subtitle: "Own and control your customer data",
    visual: <CardVisual src="/images/security/visual-self-hosting.png" />,
  },
  {
    title: "Multi-Region Hosting",
    subtitle: "Host your data where you need it",
    visual: <CardVisual src="/images/security/visual-multi-region.png" />,
  },
  {
    title: "Isolated Server and Data Storage",
    subtitle: "Our customer data is logically isolated and never co-mingled",
    visual: <CardVisual src="/images/security/visual-isolated-storage.png" />,
  },
  {
    title: "Custom Data Encryption",
    subtitle: "Encrypt with your own keys, so even we can't read your data",
    visual: <CardVisual src="/images/security/visual-encryption.png" />,
  },
];

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

export function Security({
  heading = "Enterprise-Grade Security",
  subheading = "Security and privacy features that enterprise companies need",
  primaryCta = { label: "View Trust Center", href: "https://trust.velt.dev" },
  secondaryCta = { label: "Book Demo", href: "/book-demo" },
  cards = DEFAULT_CARDS,
  certification = DEFAULT_CERTIFICATION,
}: SecurityProps = {}) {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "52px 80px 100px", gap: 40 }}
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
              height: 40,
              padding: "8px 16px",
              border: "1.5px solid #000",
              color: "#000",
              fontSize: 14,
              letterSpacing: "-0.02em",
              textDecoration: "none",
            }}
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            className="flex items-center justify-center rounded-lg font-urbanist font-semibold whitespace-nowrap"
            style={{
              height: 40,
              padding: "8px 16px",
              background: "#625df5",
              color: "#fff",
              fontSize: 14,
              letterSpacing: "-0.02em",
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
      </div>
    </section>
  );
}
