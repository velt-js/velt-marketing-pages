// Standalone detached testimonial card. Used by section components that
// render the inline testimonial as a SEPARATE card below the section's
// main card, with whitespace gap above (Figma 93:10528 pattern). Distinct
// from LibraryBento's footer-attached testimonial.
//
// 1280×224 #111 rounded-24, avatar+name+role on the left, accented quote
// on the right (421px width).

export type FeatureSectionTestimonialProps = {
  name?: string;
  role?: string;
  quote?: string;
  accentFragment?: string;
  accentColor?: string;
  avatarSrc?: string;
  /** Whitespace above the card. Default 52px. */
  marginTop?: number;
};

export function FeatureSectionTestimonial({
  name,
  role,
  quote,
  accentFragment,
  accentColor,
  avatarSrc,
  marginTop = 52,
}: FeatureSectionTestimonialProps) {
  if (!quote) return null;
  return (
    <div
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full max-w-[1280px]"
      style={{
        background: "#111",
        borderRadius: 24,
        padding: "40px 40px",
        gap: 24,
        marginTop,
      }}
    >
      <div className="flex items-center" style={{ gap: 16, flexShrink: 0 }}>
        {avatarSrc ? (
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
              src={avatarSrc}
              alt={name ? `${name} profile photo` : ""}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ) : null}
        <div className="flex flex-col" style={{ gap: 4 }}>
          {name ? (
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
              {name}
            </p>
          ) : null}
          {role ? (
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
              {role}
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
        {renderQuoteWithAccent(quote, accentFragment, accentColor)}
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
