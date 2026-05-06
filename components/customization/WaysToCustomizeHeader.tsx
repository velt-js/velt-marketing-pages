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

const CARD_W = 270;
const CARD_H = 220;
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
        width: CARD_W,
        height: CARD_H,
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
          fontSize: 21,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          whiteSpace: label.length > 1 ? "normal" : "nowrap",
          width: label.length > 1 ? 187 : "auto",
        }}
      >
        {label.map((line, i) => (
          <span key={i} style={{ display: "block" }}>
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
      className="relative bg-black flex flex-col items-center full-bleed-bg"
      style={{ paddingTop: 80, paddingBottom: 100, gap: 52 }}
    >
      <h2
        className="font-urbanist font-bold text-white text-center"
        style={{
          fontSize: 52,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        Ways to Customize
      </h2>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(3, ${CARD_W}px)`,
          gridTemplateRows: `repeat(2, ${CARD_H}px)`,
          gap: GAP,
        }}
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
