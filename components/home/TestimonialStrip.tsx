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
      className="flex items-center justify-between w-full"
      style={{ padding: 40, background: "#1a1a1a" }}
    >
      <div className="flex items-center" style={{ gap: 16 }}>
        <div
          className="relative overflow-hidden"
          style={{ width: 52, height: 52, borderRadius: "50%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col" style={{ gap: 4 }}>
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
        className="font-urbanist font-semibold text-white"
        style={{ fontSize: 24, width: 421, lineHeight: 1.2, letterSpacing: "-0.03em" }}
      >
        <QuoteWithAccent quote={quote} fragment={accentFragment} color={accentColor} />
      </p>
    </div>
  );

  if (!standalone) return content;

  // Standalone wrapper — 1280-wide rounded card to sit between sections
  // on a black page background, matching the GetStartedSteps card proportions.
  return (
    <section className="flex justify-center bg-black w-full" style={{ padding: "0 80px" }}>
      <div
        className="overflow-hidden"
        style={{
          width: 1280,
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
