import Link from "next/link";
import "./PricingTiers.css";

import { TIERS, type Tier, type TierBullet } from "@/components/pricing/pricing-data";

// Per-tier price line shown under the tier name in the card header. The
// canonical price label also lives in pricing-data (`tier.price`) and is
// reused verbatim so the card and comparison-table headers never drift.
const PRICE_SUFFIX: Record<Tier["id"], string> = {
  hacker: "forever",
  growth: "contract-based",
  enterprise: "contract-based",
};

/**
 * Accent check glyph used at the start of every tier bullet.
 * @returns The check SVG.
 */
function CheckGlyph() {
  return (
    <svg className="prt-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Renders one tier bullet, optionally with a hover tooltip glyph.
 * @param bullet The bullet copy + optional tooltip.
 * @returns The list item element.
 */
function BulletRow({ bullet }: { bullet: TierBullet }) {
  return (
    <li className="prt-bullet">
      <CheckGlyph />
      <span className="prt-bullet-text">
        {bullet.text}
        {bullet.tooltip ? (
          <span className="prt-info" tabIndex={0}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 11v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="12" cy="8.2" r="1" fill="currentColor" />
            </svg>
            <span className="prt-tooltip" role="tooltip">
              {bullet.tooltip}
            </span>
          </span>
        ) : null}
      </span>
    </li>
  );
}

/**
 * A single pricing tier card. The highlighted tier (Growth) renders with
 * an ink border and a "Most popular" chip.
 * @param tier The tier data.
 * @returns The card element.
 */
function TierCard({ tier }: { tier: Tier }) {
  const highlighted = Boolean(tier.highlighted);
  const external = tier.cta.href.startsWith("http");

  return (
    <article className={highlighted ? "prt-card prt-card--featured" : "prt-card hcard"}>
      {highlighted ? <span className="prt-badge">Most popular</span> : null}
      <div className="prt-card-head">
        <h3 className="prt-name">{tier.name}</h3>
        <p className="prt-blurb">{tier.blurb}</p>
        <div className="prt-price-row">
          <span className="prt-price">{tier.price}</span>
          <span className="prt-price-suffix">{PRICE_SUFFIX[tier.id]}</span>
        </div>
      </div>

      <Link
        href={tier.cta.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener" : undefined}
        className={
          highlighted
            ? "prt-cta prt-cta--primary hdark"
            : "prt-cta prt-cta--outline houtline"
        }
      >
        {tier.cta.label}
      </Link>

      <ul className="prt-bullets">
        {tier.bullets.map((bullet) => (
          <BulletRow key={bullet.text} bullet={bullet} />
        ))}
      </ul>
    </article>
  );
}

/**
 * Pricing tiers section: three editorial tier cards on a cream band,
 * followed by the Y Combinator deal callout banner.
 * @returns The tiers section.
 */
export default function PricingTiers() {
  return (
    <section className="prt-section">
      <div className="prt-inner">
        <div className="prt-intro">
          <div className="prt-eyebrow">
            <span className="prt-eyebrow-dot" />
            Plans
          </div>
          <h2 className="prt-intro-h2">Choose your plan.</h2>
          <p className="prt-intro-p">
            Every plan ships all 15+ features, pre-built components, and full
            customization. You only scale the document volume.
          </p>
        </div>

        <div className="prt-grid">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <div className="prt-yc">
          <div className="prt-yc-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/KCKsYtZQajVlOxbwY95uLiMH7k.png"
              alt="Y Combinator"
              className="prt-yc-logo"
              width={28}
              height={28}
            />
            <p className="prt-yc-text">
              <strong>Are you a YC company?</strong> Check Bookface or reach out
              for the YC deal.
            </p>
          </div>
          <Link href="/book-demo" className="prt-yc-cta houtline">
            Reach out
          </Link>
        </div>
      </div>
    </section>
  );
}
