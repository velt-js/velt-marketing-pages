// "Extend the Capabilities" — section heading + dual CTAs above a single
// 1280-wide white card holding 3 (or 4) equal-width feature cards. Each
// card has an icon eyebrow + title at the top, an embedded UI demo in the
// middle, and a "View Docs ›" link at the bottom. Optional inline
// testimonial bar attaches to the bottom edge of the outer card.
//
// The outer chrome (white card frame, header block, testimonial footer) is
// shared with FeatureImageCard via FeatureSectionShell.
//
// Figma node 174:27194.

import type { ReactNode } from "react";

import {
  SECTION_ICONS,
  ChevronRightIcon,
  type SectionIconKey,
} from "./uis/icons";
import {
  FeatureSectionShell,
  type FeatureSectionShellTestimonial,
  type ShellCtaLink,
} from "./FeatureSectionShell";

type CtaLink = ShellCtaLink;

const ICON_COLORS: Record<SectionIconKey, string> = {
  braces: "#625DF5",
  select: "#E04ECF",
  hash: "#625DF5",
};

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
  testimonial?: FeatureSectionShellTestimonial;
  /** First-light-block transition. Forwarded to FeatureSectionShell. */
  topAccent?: boolean;
};

export function FeatureCardRow({
  eyebrow,
  heading,
  subheading,
  viewDocsCta,
  primaryCta,
  cards,
  testimonial,
  topAccent = false,
}: FeatureCardRowProps) {
  return (
    <FeatureSectionShell
      eyebrow={eyebrow}
      heading={heading}
      subheading={subheading}
      viewDocsCta={viewDocsCta}
      primaryCta={primaryCta}
      testimonial={testimonial}
      topAccent={topAccent}
    >
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
          />
        ))}
      </div>
    </FeatureSectionShell>
  );
}

function CardCell({
  card,
  isLast,
}: {
  card: FeatureCardRowCard;
  isLast: boolean;
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
        {Icon ? <Icon size={card.iconKey === "braces" ? 30 : 32} stroke={ICON_COLORS[card.iconKey ?? "braces"]} strokeWidth={1.6} /> : null}
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
