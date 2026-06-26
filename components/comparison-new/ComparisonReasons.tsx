import "./ComparisonReasons.css";
import {
  REASONS,
  PRICE_VELT,
  PRICE_OTHER,
  type ComparisonReason,
  type ComparisonSide,
  type CardMedia,
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
 * Inline React-atom glyph for the "Just React" card (no asset exists).
 * @returns The orange React mark.
 */
function ReactAtomGlyph() {
  return (
    <div className="cmp-media-react">
      <svg width="72" height="64" viewBox="0 0 64 56" fill="none" aria-hidden="true">
        <circle cx="32" cy="28" r="3.5" fill="currentColor" />
        <ellipse cx="32" cy="28" rx="22" ry="9" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <ellipse cx="32" cy="28" rx="22" ry="9" stroke="currentColor" strokeWidth="2" opacity="0.6" transform="rotate(60 32 28)" />
        <ellipse cx="32" cy="28" rx="22" ry="9" stroke="currentColor" strokeWidth="2" opacity="0.6" transform="rotate(120 32 28)" />
      </svg>
    </div>
  );
}

/**
 * Renders the inner media element for a card's top slot.
 * @param media The media descriptor.
 * @param alt Accessible label for image media.
 * @returns The media element.
 */
function renderMedia(media: CardMedia, alt: string) {
  if (media.kind === "video") {
    return (
      <video
        className="cmp-media-video"
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  if (media.kind === "marquee") {
    return (
      <div className="cmp-media-marquee">
        <div className="cmp-media-marquee-track">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.src} alt={alt} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.src} alt="" aria-hidden="true" />
        </div>
      </div>
    );
  }
  if (media.kind === "react") {
    return <ReactAtomGlyph />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="cmp-media-image" src={media.src} alt={alt} loading="lazy" />
  );
}

/**
 * Renders one comparison card: a media slot with an overlaid Velt/Others
 * badge, then the title and subtitle.
 * @param props.side The card content (title, subtitle, media).
 * @param props.accent Whether this is the Velt (accent) card.
 * @returns The comparison card.
 */
function CompCard({ side, accent }: { side: ComparisonSide; accent: boolean }) {
  return (
    <div className={`cmp-card${accent ? " cmp-card--velt" : " cmp-card--other"}`}>
      <div className="cmp-card-media">
        {renderMedia(side.media, side.title)}
        <span
          className={`cmp-card-badge${accent ? " cmp-card-badge--velt" : ""}`}
        >
          {accent ? <CheckGlyph /> : <CrossGlyph />}
          {accent ? "Velt" : "Others"}
        </span>
      </div>
      <h4 className="cmp-card-title">{side.title}</h4>
      <p className="cmp-card-sub">{side.subtitle}</p>
    </div>
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
            <CompCard side={pair.velt} accent />
            <CompCard side={pair.other} accent={false} />
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
                Choose Velt for a serious production app, or others for basic
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
