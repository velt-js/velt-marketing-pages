// InlineTestimonialCard — standalone dark testimonial card that sits
// between sections (not attached to the bottom of another card stack).
// Spec lifted from the live Framer source on velt.dev:
//   - Background #1c1d21
//   - Border-radius 24
//   - Padding 32 (matches the live `--l3pftz` CSS variable)
//   - Avatar 52×52 circle with 2px solid #b4b1fa border
//   - Name: Urbanist semibold 18px, line-height 120%, letter-spacing -0.03em
//   - Role: Urbanist regular 16px, line-height 120%, opacity 0.52
//   - Quote: Urbanist semibold 24px, line-height 120%, left-aligned,
//     constrained to maxWidth 420 so it wraps naturally to ~3 lines (matches
//     the live break points: "...support, added" / "...offered highly" /
//     "customizable components.")
// Use this for every "free-floating" testimonial card. For testimonial
// strips that live INSIDE another card (e.g. GetStartedSteps' 3-column
// dark card, ActivityLogs Card 1's attached banner), use the existing
// TestimonialStrip component instead.

export type InlineTestimonialCardProps = {
  name: string;
  role: string;
  quote: string;
  avatarSrc: string;
  /** Substring of `quote` to render in `accentColor`. Must appear verbatim. */
  accentFragment?: string;
  /** Hex color for the accent fragment. Defaults to #b4b1fa (matches the
   *  avatar border purple from the live Framer source). */
  accentColor?: string;
};

function QuoteWithAccent({
  quote,
  fragment,
  color,
}: {
  quote: string;
  fragment?: string;
  color: string;
}) {
  if (!fragment || !quote.includes(fragment)) {
    return <>{quote}</>;
  }
  const [before, after] = quote.split(fragment);
  return (
    <>
      {before}
      <span style={{ color }}>{fragment}</span>
      {after}
    </>
  );
}

export function InlineTestimonialCard({
  name,
  role,
  quote,
  avatarSrc,
  accentFragment,
  accentColor = "#b4b1fa",
}: InlineTestimonialCardProps) {
  return (
    <article
      // Mobile: stack with quote on top, author info on the bottom-left.
      // Desktop (lg+): single row, author left + quote right via flex order.
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0"
      style={{
        width: "100%",
        background: "#1c1d21",
        borderRadius: 24,
        padding: 28,
      }}
    >
      <div className="flex items-center shrink-0 order-2 lg:order-1 gap-4">
        <div
          className="relative overflow-hidden shrink-0"
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: "2px solid #b4b1fa",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt={name}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span
            className="font-urbanist font-semibold text-white"
            style={{ fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            {name}
          </span>
          <span
            className="font-urbanist text-white"
            style={{
              fontSize: 16,
              lineHeight: 1.2,
              opacity: 0.52,
              letterSpacing: "-0.03em",
            }}
          >
            {role}
          </span>
        </div>
      </div>
      <p
        className="font-urbanist font-semibold text-white order-1 lg:order-2 lg:max-w-[420px]"
        style={{
          fontSize: "clamp(18px, 2.2vw, 24px)",
          lineHeight: 1.3,
          letterSpacing: "-0.03em",
        }}
      >
        <QuoteWithAccent quote={quote} fragment={accentFragment} color={accentColor} />
      </p>
    </article>
  );
}
