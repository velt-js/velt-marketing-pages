// Dark section header that sits between TrustedLogos and the peach
// SixReasonsSection. Renders the "6 Reasons Why Velt Outperforms Others"
// title and a 3-column × 2-row anchor grid (Figma node 180:77266).
// Row 1: Product Maturity / Implementation Cost / Scalability.
// Row 2: User Experience / Security / Support.
// Each tab links to #reason-1 through #reason-6 inside the peach card.

const TABS = [
  { num: 1, label: "Product Maturity",     icon: "/images/comparison/tabs/brain.svg" },
  { num: 2, label: "Implementation Cost",  icon: "/images/comparison/tabs/currency-dollar.svg" },
  { num: 3, label: "Scalability",          icon: "/images/comparison/tabs/dashboard.svg" },
  { num: 4, label: "User Experience",      icon: "/images/comparison/tabs/click.svg" },
  { num: 5, label: "Security",             icon: "/images/comparison/tabs/lock.svg" },
  { num: 6, label: "Support",              icon: "/images/comparison/tabs/headset.svg" },
];

const CARD_W = 270;
const CARD_H = 220;
const GAP = 24;

function TabCard({
  num,
  label,
  icon,
}: {
  num: number;
  label: string;
  icon: string;
}) {
  return (
    <a
      href={`#reason-${num}`}
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
      <img src={icon} alt="" width={32} height={32} style={{ display: "block" }} />
      <span
        className="font-urbanist font-medium text-white"
        style={{
          fontSize: 21,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </a>
  );
}

export function SixReasonsHeader() {
  return (
    <section
      className="relative bg-black flex flex-col items-center full-bleed-bg"
      style={{ paddingTop: 80, paddingBottom: 100, gap: 52 }}
    >
      <h2
        className="font-urbanist font-bold text-white text-center"
        style={{ fontSize: 52, lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0 }}
      >
        6 Reasons Why
        <br />
        Velt Outperforms Others
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
