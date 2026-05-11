// Figma node 180:80170. Light-themed mini-comparison ($1,299 active-document
// pricing for Velt vs ~$1,150 document-initiation pricing for "Others") with
// a "View pricing" outline pill that links to /pricing. Lives at the bottom
// of the SixReasonsSection peach card.

import Link from "next/link";

export type ComparePricingCTAProps = {
  /** Override the "Others" eyebrow on the right-hand price card.
   *  e.g. pass "Liveblocks" on /liveblocks-alternative. */
  competitorLabel?: string;
  /** Override the descriptor under the heading. */
  subheading?: string;
};

export function ComparePricingCTA({
  competitorLabel = "Others",
  subheading = "Consider Velt for serious production app or others for basic collaboration",
}: ComparePricingCTAProps = {}) {
  return (
    <section
      className="flex flex-col items-center"
      style={{ width: 800, margin: "0 auto", gap: 40 }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 17, maxWidth: 569 }}
      >
        <h3
          className="font-urbanist font-bold"
          style={{ fontSize: 48, lineHeight: 1.1, color: "#111", margin: 0 }}
        >
          Compare Pricing
        </h3>
        <p
          className="font-urbanist"
          style={{
            fontSize: 18,
            lineHeight: 1.4,
            color: "#111",
            opacity: 0.75,
            margin: 0,
          }}
        >
          {subheading}
        </p>
      </div>

      <div className="flex items-stretch w-full" style={{ gap: 24 }}>
        <PriceCard
          accent="velt"
          headerLabel="Document activity based pricing"
          headerIcon="/images/comparison/pricing/currency-dollar.svg"
          eyebrow={
            <span className="flex items-center" style={{ gap: 4, opacity: 0.5 }}>
              <img
                src="/images/comparison/pricing/velt-mark.svg"
                alt=""
                width={28}
                height={28}
              />
              <span
                className="font-urbanist font-bold"
                style={{
                  fontSize: 20,
                  lineHeight: 1.2,
                  letterSpacing: "-0.6px",
                  color: "#111",
                }}
              >
                Velt
              </span>
            </span>
          }
          price={{ amount: "$1,299", suffix: "/mo" }}
          rows={[
            { kind: "check", label: "Active Documents Only", info: true },
            { kind: "check", label: "Only charged for collaboration" },
          ]}
        />
        <PriceCard
          accent="other"
          headerLabel="Document initiation based pricing"
          headerIcon="/images/comparison/pricing/currency-dollar-alt.svg"
          eyebrow={
            <span
              className="font-urbanist"
              style={{
                fontSize: 20,
                lineHeight: 1.2,
                letterSpacing: "-0.6px",
                color: "#111",
                opacity: 0.5,
              }}
            >
              {competitorLabel}
            </span>
          }
          price={{ amount: "~$1,150", suffix: "/mo" }}
          rows={[
            { kind: "x", label: "All Documents" },
            { kind: "x", label: "Charged for initiation" },
          ]}
        />
      </div>

      <Link
        href="/pricing"
        className="flex items-center justify-center font-urbanist font-medium"
        style={{
          gap: 10.8,
          padding: "10.8px 14.4px",
          borderRadius: 28.8,
          border: "0.9px solid #625df5",
          color: "#625df5",
          fontSize: 14.4,
          textDecoration: "none",
        }}
      >
        View Pricing
        <img
          src="/images/comparison/pricing/chevron-right.svg"
          alt=""
          width={14.4}
          height={14.4}
        />
      </Link>
    </section>
  );
}

type PriceCardRow =
  | { kind: "check"; label: string; info?: boolean }
  | { kind: "x"; label: string };

function PriceCard({
  accent,
  headerLabel,
  headerIcon,
  eyebrow,
  price,
  rows,
}: {
  accent: "velt" | "other";
  headerLabel: string;
  headerIcon: string;
  eyebrow: React.ReactNode;
  price: { amount: string; suffix: string };
  rows: PriceCardRow[];
}) {
  return (
    <div
      style={{
        flex: "1 0 0",
        minWidth: 0,
        height: 384,
        position: "relative",
        background: "#f7f7f7",
        borderRadius: 32,
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          position: "absolute",
          top: 24,
          left: 10,
          width: 368,
          height: 56,
          gap: 8,
          padding: "16px 12px",
          border: "1px solid #010001",
          borderRadius: 32,
        }}
      >
        <img src={headerIcon} alt="" width={20} height={20} />
        <span
          className="font-urbanist"
          style={{
            fontSize: 18,
            lineHeight: 1.2,
            color: "#111",
            whiteSpace: "nowrap",
          }}
        >
          {headerLabel}
        </span>
      </div>

      <div
        className="flex flex-col items-start"
        style={{
          position: "absolute",
          left: 52,
          top: accent === "velt" ? 119 : 124,
          width: 284,
          gap: 24,
          textAlign: accent === "velt" ? "left" : "center",
        }}
      >
        {eyebrow}
        <p
          className="font-urbanist font-bold"
          style={{ color: "#111", margin: 0, lineHeight: 1.2 }}
        >
          <span style={{ fontSize: 32 }}>{price.amount}</span>
          <span style={{ fontSize: 20 }}>{price.suffix}</span>
        </p>
      </div>

      <div
        className="flex flex-col items-start"
        style={{
          position: "absolute",
          left: 52,
          top: accent === "velt" ? 261 : 262,
          width: 214,
          gap: 32,
        }}
      >
        {rows.map((row, i) => (
          <div key={i} className="flex items-center w-full" style={{ gap: 24 }}>
            <img
              src={
                row.kind === "check"
                  ? "/images/comparison/pricing/check.svg"
                  : "/images/comparison/pricing/x.svg"
              }
              alt=""
              width={24}
              height={24}
            />
            <span
              className="flex items-center"
              style={{ gap: 8 }}
            >
              <span
                className="font-urbanist"
                style={{
                  fontSize: 18,
                  lineHeight: 1.2,
                  color: row.kind === "x" ? "#ff3131" : "#111",
                  whiteSpace: "nowrap",
                }}
              >
                {row.label}
              </span>
              {row.kind === "check" && row.info ? (
                <img
                  src="/images/comparison/pricing/info.svg"
                  alt=""
                  width={18}
                  height={18}
                />
              ) : null}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
