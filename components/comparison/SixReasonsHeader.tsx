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
      className="flex flex-col items-center justify-center w-full"
      style={{
        minHeight: 140,
        padding: 16,
        gap: 12,
        background: "#101010",
        borderRadius: 24,
        textDecoration: "none",
        transition: "background 180ms ease, transform 180ms ease",
      }}
      data-tab-num={num}
    >
      <img src={icon} alt="" width={28} height={28} style={{ display: "block" }} />
      <span
        className="font-urbanist font-medium text-white text-center"
        style={{
          fontSize: "clamp(13px, 1.4vw, 18px)",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </span>
    </a>
  );
}

export type SixReasonsHeaderProps = {
  /** Name of the competitor to render in the headline. Defaults to "Others"
   *  on the generic /comparison page; override (e.g. "Liveblocks") on a
   *  competitor-specific landing page. */
  competitor?: string;
};

export function SixReasonsHeader({
  competitor = "Others",
}: SixReasonsHeaderProps = {}) {
  return (
    <section
      className="relative bg-black flex flex-col items-center full-bleed-bg px-6 lg:px-20 pt-16 lg:pt-20 pb-16 lg:pb-[100px]"
      style={{ gap: 40 }}
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
        6 Reasons Why
        <br />
        Velt Outperforms {competitor}
      </h2>

      <div
        className="grid grid-cols-2 lg:grid-cols-3 w-full max-w-[894px]"
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
