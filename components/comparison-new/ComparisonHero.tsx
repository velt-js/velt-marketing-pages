import "./ComparisonHero.css";

/**
 * Light editorial hero for /comparison. Mirrors the pricing-hero rhythm
 * (eyebrow + light-weight display title + muted subcopy + dual CTAs) with a
 * mono metadata strip beneath the actions that frames the head-to-head.
 * @returns The comparison hero section.
 */
export default function ComparisonHero() {
  try {
    return (
      <section className="cmh-section">
        <div className="cmh-inner">
          <div className="cmh-eyebrow">
            <span className="cmh-eyebrow-dot" />
            Comparison
          </div>
          <h1 className="cmh-title">
            100% better experience with 90% less code.
          </h1>
          <p className="cmh-sub">
            Your developers do less and your customers get more. See how Velt
            stacks up against the alternatives across the six things that
            actually matter in production.
          </p>
          <div className="cmh-actions">
            <a
              href="https://console.velt.dev/"
              target="_blank"
              rel="noopener"
              className="cmh-btn-primary hdark"
            >
              Get Free API Key
            </a>
            <a
              href="https://velt.dev/docs/"
              target="_blank"
              rel="noopener"
              className="cmh-btn-secondary hsoft"
            >
              View Docs
            </a>
          </div>
          <div className="cmh-meta">
            <span className="cmh-meta-item">25+ FEATURES</span>
            <span className="cmh-meta-dot">·</span>
            <span className="cmh-meta-item">SHIPS IN A DAY</span>
            <span className="cmh-meta-dot">·</span>
            <span className="cmh-meta-item">SOC 2 · HIPAA</span>
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
