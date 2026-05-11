// Dark section between TrustedLogos and CustomizationStack.
// Heading "Ways to Customize" + 3-column × 2-row grid of dark anchor
// cards (Figma node 294:23723). Each card links to #way-N inside the
// CustomizationStack panel below. Matches SixReasonsHeader from
// /comparison structurally.

const TABS = [
  { num: 1, label: ["Component", "Layout & Structure"], icon: "/images/customization/tabs/layout.svg",     iconWidth: 32 },
  { num: 2, label: ["CSS Styling"],                      icon: "/images/customization/tabs/paint.svg",      iconWidth: 32 },
  { num: 3, label: ["Template Variables", "& Custom Data"], icon: "/images/customization/tabs/braces.svg", iconWidth: 32 },
  { num: 4, label: ["Conditional Rendering"],            icon: "/images/customization/tabs/braces-alt.svg", iconWidth: 46.4 },
  { num: 5, label: ["Custom Behaviour"],                 icon: "/images/customization/tabs/select.svg",     iconWidth: 32 },
  { num: 6, label: ["UI Variants"],                      icon: "/images/customization/tabs/components.svg", iconWidth: 32 },
];

const GAP = 24;

function TabCard({
  num,
  label,
  icon,
  iconWidth,
}: {
  num: number;
  label: string[];
  icon: string;
  iconWidth: number;
}) {
  return (
    <a
      href={`#way-${num}`}
      className="flex flex-col items-center justify-center"
      style={{
        minHeight: 160,
        padding: 24,
        gap: 18,
        background: "#101010",
        borderRadius: 24,
        textDecoration: "none",
        transition: "background 180ms ease, transform 180ms ease",
      }}
      data-tab-num={num}
    >
      <img src={icon} alt="" width={iconWidth} height={32} style={{ display: "block" }} />
      <span
        className="font-urbanist font-medium text-white text-center"
        style={{
          fontSize: "clamp(16px, 1.6vw, 21px)",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}
      >
        {label.map((line, idx) => (
          <span key={idx} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </span>
    </a>
  );
}

export function WaysToCustomizeHeader() {
  return (
    <section
      className="relative bg-black flex flex-col items-center full-bleed-bg pt-16 pb-16 lg:pt-[80px] lg:pb-[100px] px-6 lg:px-20 gap-10 lg:gap-[52px]"
    >
      <h2
        className="font-urbanist font-bold text-white text-center"
        style={{
          fontSize: "clamp(28px, 4.2vw, 52px)",
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        Ways to Customize
      </h2>

      <div
        className="grid grid-cols-2 lg:grid-cols-3 w-full max-w-[900px]"
        style={{ gap: GAP }}
      >
        {TABS.map((t) => (
          <TabCard key={t.num} {...t} />
        ))}
      </div>

      <style>{`
        section [data-tab-num]:hover {
          background: #1a1a1a !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
