import "./ComparisonReasons.css";
import {
  REASONS,
  PRICE_VELT,
  PRICE_OTHER,
  type ComparisonReason,
  type PriceCardData,
} from "./comparison-data";

/**
 * Small check glyph used on the Velt (positive) side of every pair.
 * @returns The accent check SVG.
 */
function CheckGlyph() {
  return (
    <svg
      className="cmp-glyph cmp-glyph--velt"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12.5l4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Small cross glyph used on the "Others" (muted) side of every pair.
 * @returns The muted cross SVG.
 */
function CrossGlyph() {
  return (
    <svg
      className="cmp-glyph cmp-glyph--other"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 7l10 10M17 7L7 17"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Renders one reason block: a numbered header plus its stacked comparison
 * pairs (Velt card vs Others card).
 * @param props.reason The reason content.
 * @returns The reason section.
 */
function ReasonBlock({ reason }: { reason: ComparisonReason }) {
  const label = String(reason.num).padStart(2, "0");
  return (
    <div className="cmp-reason" id={`reason-${reason.num}`}>
      <div className="cmp-reason-head">
        <span className="cmp-reason-num">{label}</span>
        <div className="cmp-reason-headtext">
          <h3 className="cmp-reason-title">{reason.heading}</h3>
          <p className="cmp-reason-sub">{reason.subheading}</p>
        </div>
      </div>
      <div className="cmp-pairs">
        {reason.pairs.map((pair) => (
          <div className="cmp-pair" key={pair.velt.title}>
            <div className="cmp-card cmp-card--velt">
              <div className="cmp-card-head">
                <CheckGlyph />
                <span className="cmp-card-brand cmp-card-brand--velt">Velt</span>
              </div>
              <h4 className="cmp-card-title">{pair.velt.title}</h4>
              <p className="cmp-card-sub">{pair.velt.subtitle}</p>
            </div>
            <div className="cmp-card cmp-card--other">
              <div className="cmp-card-head">
                <CrossGlyph />
                <span className="cmp-card-brand">Others</span>
              </div>
              <h4 className="cmp-card-title">{pair.other.title}</h4>
              <p className="cmp-card-sub">{pair.other.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Renders one pricing-compare card.
 * @param props.data The price card content.
 * @param props.accent Whether this is the Velt (accent) card.
 * @returns The price card.
 */
function PriceCard({ data, accent }: { data: PriceCardData; accent: boolean }) {
  return (
    <div className={`cmp-price-card${accent ? " cmp-price-card--velt" : ""}`}>
      <div className="cmp-price-model">{data.model}</div>
      <div
        className={`cmp-price-brand${
          accent ? " cmp-price-brand--velt" : ""
        }`}
      >
        {data.brand}
      </div>
      <div className="cmp-price-amount">
        <span className="cmp-price-amount-num">{data.amount}</span>
        <span className="cmp-price-amount-suffix">{data.suffix}</span>
      </div>
      <div className="cmp-price-rows">
        {data.rows.map((row) => (
          <div className="cmp-price-row" key={row.label}>
            {row.positive ? <CheckGlyph /> : <CrossGlyph />}
            <span
              className={`cmp-price-row-label${
                row.positive ? "" : " cmp-price-row-label--muted"
              }`}
            >
              {row.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Editorial body of /comparison: an index of the six reasons, each reason
 * rendered as head-to-head cards, and a closing pricing-model comparison.
 * @returns The comparison reasons section.
 */
export default function ComparisonReasons() {
  try {
    return (
      <section className="cmp-section">
        <div className="cmp-inner">
          <div className="cmp-index">
            <div className="cmp-eyebrow">
              <span className="cmp-eyebrow-dot" />
              Why teams switch
            </div>
            <h2 className="cmp-index-title">
              Six reasons Velt outperforms the alternatives.
            </h2>
            <div className="cmp-index-grid">
              {REASONS.map((reason) => (
                <a
                  key={reason.num}
                  href={`#reason-${reason.num}`}
                  className="cmp-index-card hcard"
                >
                  <span className="cmp-index-num">
                    {String(reason.num).padStart(2, "0")}
                  </span>
                  <span className="cmp-index-label">{reason.heading}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="cmp-reasons">
            {REASONS.map((reason) => (
              <ReasonBlock key={reason.num} reason={reason} />
            ))}
          </div>

          <div className="cmp-price" id="compare-pricing">
            <div className="cmp-price-head">
              <div className="cmp-eyebrow">
                <span className="cmp-eyebrow-dot" />
                Compare pricing
              </div>
              <h2 className="cmp-price-title">
                Pay for collaboration, not connections.
              </h2>
              <p className="cmp-price-sub">
                Choose Velt for a serious production app — or others for basic
                collaboration.
              </p>
            </div>
            <div className="cmp-price-grid">
              <PriceCard data={PRICE_VELT} accent />
              <PriceCard data={PRICE_OTHER} accent={false} />
            </div>
            <a href="/pricing" className="cmp-price-link hl">
              View full pricing
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
