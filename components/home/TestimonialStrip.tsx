// TestimonialStrip — the Linda Belcher @HeyGen strip that lives at the bottom
// of GetStartedSteps' dark card (Figma node 8506:97727). Extracted so library
// pages can reuse it mid-page without recomposing the whole Get Started
// section. Defaults match the homepage copy; every prop is overridable.

export type TestimonialStripProps = {
  name?: string;
  role?: string;
  avatarSrc?: string;
  /** Full quote. If `accentFragment` appears inside, it's rendered in `accentColor`. */
  quote?: string;
  accentFragment?: string;
  accentColor?: string;
  /** When true, the strip renders its own surrounding card so it can be used
   *  standalone on a page section. When false (default), it renders flat for
   *  composition inside a parent card (as used in GetStartedSteps). */
  standalone?: boolean;
};

const DEFAULTS = {
  name: "Linda Belcher",
  role: "Product Manager @HeyGen",
  avatarSrc: "/images/home/linda-steps.png",
  quote: "Velt hosts all collaboration functionalities needed to boost engagement at HeyGen",
  accentFragment: "boost engagement",
  accentColor: "#0085ff",
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

export function TestimonialStrip({
  name = DEFAULTS.name,
  role = DEFAULTS.role,
  avatarSrc = DEFAULTS.avatarSrc,
  quote = DEFAULTS.quote,
  accentFragment = DEFAULTS.accentFragment,
  accentColor = DEFAULTS.accentColor,
  standalone = false,
}: TestimonialStripProps = {}) {
  const content = (
    <div
      // Quote stacks above author on mobile (same pattern as InlineTestimonialCard).
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-5 lg:gap-0"
      style={{ padding: "24px 24px 28px", background: "#1a1a1a" }}
    >
      <div className="flex items-center gap-4 order-2 lg:order-1">
        <div
          className="relative overflow-hidden shrink-0"
          style={{ width: 52, height: 52, borderRadius: "50%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
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
            style={{ fontSize: 16, lineHeight: 1.2, opacity: 0.52, letterSpacing: "-0.03em" }}
          >
            {role}
          </span>
        </div>
      </div>
      <p
        className="font-urbanist font-semibold text-white order-1 lg:order-2 lg:max-w-[421px]"
        style={{
          fontSize: "clamp(18px, 2.2vw, 24px)",
          lineHeight: 1.3,
          letterSpacing: "-0.03em",
        }}
      >
        <QuoteWithAccent quote={quote} fragment={accentFragment} color={accentColor} />
      </p>
    </div>
  );

  if (!standalone) return content;

  // Standalone wrapper — full-width up to 1280, rounded card sitting on
  // a black page background.
  return (
    <section className="flex justify-center bg-black w-full px-6 lg:px-20">
      <div
        className="overflow-hidden w-full max-w-[1280px]"
        style={{
          background: "#111",
          border: "2px solid #1a1a1a",
          borderRadius: 24,
        }}
      >
        {content}
      </div>
    </section>
  );
}
