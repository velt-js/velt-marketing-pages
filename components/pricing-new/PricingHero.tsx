import "./PricingHero.css";

/**
 * Light editorial pricing hero. Mirrors the homepage hero rhythm (eyebrow
 * + light-weight display title + muted subcopy + dual CTAs) but is
 * centered and single-column, with a mono metadata strip beneath the
 * actions that states the billing model in plain terms.
 * @returns The pricing hero section.
 */
export default function PricingHero() {
  return (
    <section className="prh-section">
      <div className="prh-inner">
        <div className="prh-eyebrow">
          <span className="prh-eyebrow-dot" />
          Pricing
        </div>
        <h1 className="prh-title">Pay only for meaningful collaboration.</h1>
        <p className="prh-sub">
          Usage-based pricing on monthly active documents — not seats, not
          connections. Start free, scale when your product does.
        </p>
        <div className="prh-actions">
          <a
            href="https://console.velt.dev/"
            target="_blank"
            rel="noopener"
            className="prh-btn-primary hdark"
          >
            Get Free API Key
          </a>
          <a href="/book-demo" className="prh-btn-secondary hsoft">
            Book Demo
          </a>
        </div>
        <div className="prh-meta">
          <span className="prh-meta-item">FREE TIER · NO CARD</span>
          <span className="prh-meta-dot">·</span>
          <span className="prh-meta-item">BILLED ON MADS, NOT SEATS</span>
          <span className="prh-meta-dot">·</span>
          <span className="prh-meta-item">CANCEL ANYTIME</span>
        </div>
      </div>
    </section>
  );
}
