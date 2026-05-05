// "Powerful and Beautiful Commenting" — Figma 93:10527.
// Centered heading + dual CTAs above an asymmetric 4-cell bento card,
// followed by a sibling testimonial card with whitespace gap above.
//
// Cells (inside a 1280×859 outer rounded-24 white card with 2px black border):
//   • Top-left  642×493  — bordered  — @mentions cell (MentionsComposerStack)
//   • Top-right 639×429  — bordered  — Task Management cell (TaskPillsLarge)
//   • Bottom-left 640×366 — bordered — Recordings cell (RecordingsBlock)
//   • Bottom-right ~640×430 — NO border — Reactions cell (ReactionsCluster)
//
// Each bordered cell renders a title+description overlay anchored to its
// bottom-left. The Reactions overlay anchors to the outer card's bottom-right
// quadrant since the cell has no border of its own.

import Link from "next/link";

import { MentionsComposerStack } from "./uis/MentionsComposerStack";
import { TaskPillsLarge } from "./uis/TaskPillsLarge";
import { RecordingsBlock } from "./uis/RecordingsBlock";
import { ReactionsCluster } from "./uis/ReactionsCluster";
import { Book2Icon } from "./uis/icons";
import { type FeatureSectionTestimonialProps } from "./FeatureSectionTestimonial";

type CtaLink = { label?: string; href?: string; newTab?: boolean };

type CardCopy = { title?: string; description?: string };

export type FeaturePowerfulBentoProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: CtaLink;
  primaryCta?: CtaLink;
  mentionsCard?: CardCopy | null;
  tasksCard?: CardCopy | null;
  recordingsCard?: CardCopy | null;
  reactionsCard?: CardCopy | null;
  testimonial?: FeatureSectionTestimonialProps;
  /** Apply rounded top + 80px margin when this is the first light section. */
  topAccent?: boolean;
};

export function FeaturePowerfulBento({
  eyebrow,
  heading,
  subheading,
  viewDocsCta,
  primaryCta,
  mentionsCard,
  tasksCard,
  recordingsCard,
  reactionsCard,
  testimonial,
  topAccent = false,
}: FeaturePowerfulBentoProps) {
  // Heading rendered as two lines: "Powerful and / Beautiful Commenting".
  // Split on " and " or fallback to a single line.
  const headingParts = heading.includes(" and ")
    ? heading.split(/ and /)
    : [heading];

  return (
    <section
      data-outcomes={topAccent ? true : undefined}
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{
        padding: "100px 80px",
        gap: 52,
        marginTop: topAccent ? 80 : 0,
        borderTopLeftRadius: topAccent ? 48 : 0,
        borderTopRightRadius: topAccent ? 48 : 0,
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 32 }}>
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
            {headingParts.map((part, i) => (
              <p
                key={i}
                style={{ margin: 0, lineHeight: 1.2 }}
              >
                {i === 0 && headingParts.length > 1 ? `${part} and` : part}
              </p>
            ))}
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
              <BentoCta variant="secondary" cta={viewDocsCta} />
            ) : null}
            {primaryCta?.label && primaryCta.href ? (
              <BentoCta variant="primary" cta={primaryCta} />
            ) : null}
          </div>
        )}
      </div>

      {/* Outer wrapper — wraps the asymmetric bento grid AND the optional
          testimonial bar in a single rounded card with one shared 2px black
          border. This way the testimonial sits ATTACHED to the bottom of
          the bento (no whitespace between, shared bottom border-radius).
          Cells themselves have NO borders — internal seams are drawn as
          separate 2px divider lines so they render as single 2px lines. */}
      <div
        className="overflow-hidden flex flex-col"
        style={{
          width: 1280,
          background: "#fff",
          border: "2px solid #111",
          borderRadius: 24,
        }}
      >
      {/* Bento grid region — 859 tall, white. */}
      <div
        className="relative"
        style={{
          width: "100%",
          height: 859,
          background: "#fff",
          flexShrink: 0,
        }}
      >
        {/* Inner positioning context — accounts for outer card's 2px border.
            All inner offsets are relative to this 1276×855 inner box. */}
        <div className="absolute" style={{ inset: 0 }}>
          {/* Cell 1: @mentions — top-left. Figma w:640 h:491 (within 1276×855 inner). */}
          <div
            className="absolute overflow-hidden"
            style={{ left: 0, top: 0, width: 638, height: 489 }}
          >
            <MentionsComposerStack />
            <CardOverlay
              title={mentionsCard?.title}
              description={mentionsCard?.description}
              width={305}
            />
          </div>

          {/* Cell 2: Task Management — top-right, shorter. */}
          <div
            className="absolute overflow-hidden"
            style={{ left: 640, top: 0, width: 636, height: 425 }}
          >
            <TaskPillsLarge />
            <CardOverlay
              title={tasksCard?.title}
              description={tasksCard?.description}
              width={395}
            />
          </div>

          {/* Cell 3: Recordings — bottom-left. */}
          <div
            className="absolute overflow-hidden"
            style={{ left: 0, top: 491, width: 638, height: 364 }}
          >
            <RecordingsBlock />
            <CardOverlay
              title={recordingsCard?.title}
              description={recordingsCard?.description}
              width={395}
            />
          </div>

          {/* Cell 4: Reactions — bottom-right, no border. */}
          <div
            className="absolute overflow-hidden"
            style={{ left: 640, top: 427, width: 636, height: 428 }}
          >
            <ReactionsCluster />
            <CardOverlay
              title={reactionsCard?.title}
              description={reactionsCard?.description}
              width={395}
            />
          </div>

          {/* Internal divider lines — single 2px black lines, no doubling. */}
          {/* Vertical divider running full height (separates left/right columns). */}
          <div
            className="absolute pointer-events-none"
            style={{ left: 638, top: 0, width: 2, height: 855, background: "#111" }}
          />
          {/* Horizontal divider in left column (separates @mentions from Recordings). */}
          <div
            className="absolute pointer-events-none"
            style={{ left: 0, top: 489, width: 638, height: 2, background: "#111" }}
          />
          {/* Horizontal divider in right column (separates Task Mgmt from Reactions, at different y). */}
          <div
            className="absolute pointer-events-none"
            style={{ left: 640, top: 425, width: 636, height: 2, background: "#111" }}
          />
        </div>
      </div>

      {/* Attached testimonial bar — inline at the bottom of the same outer
          rounded card, sharing the bottom 2px border + 24px corner radii via
          the wrapper's overflow:hidden + border + rounded. */}
      {testimonial?.quote ? (
        <AttachedTestimonialBar t={testimonial} />
      ) : null}
      </div>
    </section>
  );
}

function AttachedTestimonialBar({ t }: { t: FeatureSectionTestimonialProps }) {
  const quote = t.quote ?? "";
  return (
    <div
      className="flex items-center justify-between"
      style={{
        width: "100%",
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
              alt={t.name ? `${t.name} profile photo` : ""}
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
                margin: 0,
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
                margin: 0,
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

// Title + description overlay anchored to the bottom-left of a cell.
function CardOverlay({
  title,
  description,
  width,
}: {
  title?: string;
  description?: string;
  width: number;
}) {
  if (!title && !description) return null;
  return (
    <div
      className="absolute flex flex-col items-start"
      style={{
        bottom: 28,
        left: 28,
        width,
        gap: 8,
        color: "#111",
      }}
    >
      {title ? (
        <h3
          className="font-urbanist font-bold"
          style={{
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {title}
        </h3>
      ) : null}
      {description ? (
        <p
          className="font-urbanist"
          style={{
            fontSize: 18,
            lineHeight: 1.2,
            opacity: 0.52,
            margin: 0,
          }}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function BentoCta({
  variant,
  cta,
}: {
  variant: "primary" | "secondary";
  cta: CtaLink;
}) {
  const isPrimary = variant === "primary";
  // Same shape as the Customizer's CustCta — purple #615df5 border on both
  // variants, mix-blend-exclusion on the inner span only (so the border
  // stays purple), minWidth 156 + whiteSpace nowrap so longer labels don't
  // wrap to two lines.
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
