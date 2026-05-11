// "REST APIs and Webhooks" — Figma 174:28905.
// 1280×591 white card with 2px black-navy border + rounded-32. Inside:
//   • Heading + dual CTAs at top:55 (centered, single-line CTAs).
//   • Pill flow at top:249, left:-2 — left trail vector, then 3 stages
//     separated by dotted-square connectors, then right trail vector.
//   • Each stage is a "split pill": colored icon block on the left + a
//     white-bg label/logo area on the right, all wrapped in a colored
//     rounded-8 outline.
//   • The third stage renders a vertically-scrolling carousel of partner
//     logos (HubSpot / Zapier / Loops / OpenTelemetry / Inngest …) with
//     a white-fade gradient at the bottom edge.
// Optional dark testimonial bar attaches to the bottom of the same card
// via shared rounded corners + 2px border.

import Link from "next/link";

import { Book2Icon } from "./uis/icons";

type CtaLink = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

export type FeatureFlowStage = {
  label?: string;
  /** Pill color (border + icon block fill). e.g. "#ff4f00", "#ffc12f", "#0b353b". */
  color: string;
  /** Optional wordmark image — replaces the text label when set. */
  logoSrc?: string;
  /** Text color override for the label (Figma: dark on yellow Transform pill). */
  labelColor?: string;
  /** When true, the right side of the pill renders a partner-logo column with a bottom fade. */
  isCarousel?: boolean;
  /** Logos shown in the column when isCarousel is true. */
  carouselLogos?: { src: string; alt?: string }[];
};

export type FeatureFlowDiagramProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: CtaLink;
  primaryCta?: CtaLink;
  stages: FeatureFlowStage[];
  testimonial?: {
    name?: string;
    role?: string;
    quote?: string;
    accentFragment?: string;
    accentColor?: string;
    avatarSrc?: string;
  };
};

const BOLT_ICON = "/images/features/comments/flow/icon-bolt-white.svg";
const TRAIL_LEFT = "/images/features/comments/flow/trail-left.svg";
const TRAIL_RIGHT = "/images/features/comments/flow/trail-right.svg";

export function FeatureFlowDiagram({
  eyebrow,
  heading,
  subheading,
  viewDocsCta,
  primaryCta,
  stages,
  testimonial,
}: FeatureFlowDiagramProps) {
  const hasTestimonial = Boolean(testimonial?.quote);

  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg py-20 lg:py-[100px] px-6 lg:px-20"
      style={{ gap: 52 }}
    >
      {/* Outer card wraps heading area, flow row, and the optional testimonial */}
      <div
        className="overflow-hidden flex flex-col w-full max-w-[1280px]"
        style={{
          background: "#fff",
          border: "2px solid #0e0d36",
          borderRadius: 32,
        }}
      >
        {/* Top region — heading + flow diagram. Desktop: 591px tall fixed.
            Mobile: auto height, flow row hidden. */}
        <div className="relative" style={{ width: "100%", flexShrink: 0 }}>
          {/* Header: heading + subheading + dual CTAs centered at top:55 */}
          <div
            className="flex flex-col items-center px-6 lg:px-0"
            style={{
              paddingTop: 55,
              paddingBottom: 0,
              gap: 32,
            }}
          >
            <div
              className="flex flex-col items-center text-center"
              style={{ gap: 12, width: "100%", maxWidth: 691 }}
            >
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
                style={{
                  color: "#111",
                  fontSize: "clamp(28px, 4.2vw, 52px)",
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
                  style={{ color: "#111", fontSize: 20, lineHeight: 1.2, margin: 0 }}
                >
                  {subheading}
                </p>
              ) : null}
            </div>
            {(viewDocsCta || primaryCta) && (
              <div className="flex items-start" style={{ gap: 12 }}>
                {viewDocsCta?.label && viewDocsCta.href ? (
                  <FlowCta variant="secondary" cta={viewDocsCta} />
                ) : null}
                {primaryCta?.label && primaryCta.href ? (
                  <FlowCta variant="primary" cta={primaryCta} />
                ) : null}
              </div>
            )}
          </div>

          {/* Flow row — desktop only (hidden on mobile as it requires fixed width) */}
          <div
            className="hidden lg:flex items-center"
            style={{ left: -2, top: 249, right: -2, position: "absolute", justifyContent: "space-between" }}
          >
            {/* Left trail */}
            <div
              style={{ width: 206, height: 254, flexShrink: 0 }}
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={TRAIL_LEFT} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
            </div>

            {/* Pills + connectors */}
            <div className="flex items-center" style={{ gap: 16, flexShrink: 0 }}>
              {stages.map((stage, i) => (
                <FlowSequence
                  key={`${stage.label}-${i}`}
                  stage={stage}
                  nextColor={i < stages.length - 1 ? stages[i + 1].color : undefined}
                />
              ))}
            </div>

            {/* Right trail (mirrored) */}
            <div
              style={{ width: 206, height: 254, flexShrink: 0, transform: "scaleX(-1)" }}
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={TRAIL_RIGHT} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
            </div>
          </div>

          {/* Spacer so the absolute flow row has room on desktop */}
          <div className="hidden lg:block" style={{ height: 342 }} aria-hidden />
          {/* Small bottom gap on mobile so the card doesn't feel cramped */}
          <div className="lg:hidden" style={{ height: 40 }} aria-hidden />
        </div>

        {hasTestimonial && testimonial ? (
          <TestimonialFooter t={testimonial} />
        ) : null}
      </div>
    </section>
  );
}

function FlowSequence({
  stage,
  nextColor,
}: {
  stage: FeatureFlowStage;
  nextColor?: string;
}) {
  return (
    <div className="flex items-center" style={{ gap: 14.4 }}>
      <FlowPill stage={stage} />
      {nextColor ? <DottedConnector from={stage.color} to={nextColor} /> : null}
    </div>
  );
}

function FlowPill({ stage }: { stage: FeatureFlowStage }) {
  return (
    <div
      className="flex items-center overflow-hidden"
      style={{
        border: `2.4px solid ${stage.color}`,
        borderRadius: 8,
        background: "#fff",
      }}
    >
      {/* Colored icon block on the left. Negative top/left/bottom margins
          tuck the block under the pill's 2.4px border so the icon-block
          color and the pill border merge into one continuous stripe.
          Left corners are squared (clipped by the pill's overflow:hidden
          + outer border-radius); right corners keep the Figma rounded-9. */}
      <div
        className="flex items-center"
        style={{
          background: stage.color,
          padding: 14.4,
          margin: "-2.4px 0 -2.4px -2.4px",
          borderRadius: "0 9px 9px 0",
          flexShrink: 0,
        }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BOLT_ICON}
          alt=""
          style={{ width: 24, height: 24, display: "block" }}
        />
      </div>

      {/* Right side — carousel column, static logo, or text label */}
      {stage.isCarousel && stage.carouselLogos?.length ? (
        <FlowPillCarousel logos={stage.carouselLogos} />
      ) : stage.logoSrc ? (
        <div className="flex items-center justify-center" style={{ padding: 14.4 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stage.logoSrc}
            alt={stage.label ?? ""}
            style={{ height: 24, maxWidth: 140, objectFit: "contain", display: "block" }}
          />
        </div>
      ) : (
        <div className="flex items-center" style={{ padding: 14.4 }}>
          <span
            className="font-urbanist font-bold whitespace-nowrap"
            style={{
              color: stage.labelColor ?? stage.color,
              fontSize: 21.6,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            {stage.label}
          </span>
        </div>
      )}
    </div>
  );
}

// Static partner-logo column inside the third pill (Figma 174:28957).
// 189.6×52.8 visible window, logos stacked at 24px tall with a 14.4px
// bottom fade-to-white masking the clipped logos below.
function FlowPillCarousel({
  logos,
}: {
  logos: NonNullable<FeatureFlowStage["carouselLogos"]>;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: 189.6, height: 52.8, flexShrink: 0 }}
    >
      <div
        className="flex flex-col items-center"
        style={{ padding: "14.4px 14.4px 0", gap: 16 }}
      >
        {logos.map((logo, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${logo.src}-${i}`}
            src={logo.src}
            alt={logo.alt ?? ""}
            style={{
              height: 24,
              maxWidth: 140,
              objectFit: "contain",
              display: "block",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 14.4,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 91.67%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function DottedConnector({ from, to }: { from: string; to: string }) {
  // 4 squares (7.2×7.2), gap 14.4. First two use `from` color, last two `to`.
  return (
    <div
      className="flex items-center"
      style={{ gap: 14.4 }}
      aria-hidden
    >
      {[from, from, to, to].map((c, i) => (
        <span
          key={i}
          style={{ width: 7.2, height: 7.2, background: c, display: "inline-block" }}
        />
      ))}
    </div>
  );
}

function FlowCta({ variant, cta }: { variant: "primary" | "secondary"; cta: CtaLink }) {
  const isPrimary = variant === "primary";
  const accent = "#625df5";
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
    color: isPrimary ? "#fff" : accent,
    textDecoration: "none",
    background: isPrimary ? accent : "transparent",
    border: `2px solid ${accent}`,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };
  const innerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    color: isPrimary ? "#fff" : accent,
  };
  const inner = (
    <span style={innerStyle}>
      {!isPrimary ? <Book2Icon size={18} stroke={accent} /> : null}
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

// Same dark testimonial bar shape used by LibraryBento's footer.
function TestimonialFooter({
  t,
}: {
  t: NonNullable<FeatureFlowDiagramProps["testimonial"]>;
}) {
  const quote = t.quote ?? "";
  return (
    <div
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      style={{
        background: "#1c1d21",
        padding: "40px 52px",
        gap: 24,
        flexShrink: 0,
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
              style={{ color: "#fff", fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.03em", margin: 0 }}
            >
              {t.name}
            </p>
          ) : null}
          {t.role ? (
            <p
              className="font-urbanist"
              style={{ color: "#fff", opacity: 0.52, fontSize: 16, lineHeight: 1.2, letterSpacing: "-0.03em", margin: 0 }}
            >
              {t.role}
            </p>
          ) : null}
        </div>
      </div>
      <p
        className="font-urbanist font-semibold w-full lg:w-[421px] lg:flex-shrink-0"
        style={{
          color: "#fff",
          fontSize: 24,
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          margin: 0,
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
