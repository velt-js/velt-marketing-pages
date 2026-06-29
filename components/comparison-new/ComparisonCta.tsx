import "@/components/home-new/FinalCta.css";

/**
 * Dark final CTA for /comparison. Reuses the homepage FinalCta visual system
 * (cta-* classes, scoped under .vlp) with comparison-specific copy.
 * @returns The final CTA section.
 */
export default function ComparisonCta() {
  try {
    return (
      <section id="cta" className="cta-section">
        <div className="cta-inner">
          <div className="cta-eyebrow">
            <span className="cta-eyebrow-dot" />
            See the difference
          </div>
          <h2 className="cta-heading">
            100% better experience. 90% less code.
          </h2>
          <p className="cta-sub">
            Free tier. No credit card. Your first collaborative document in
            minutes.
          </p>
          <div className="cta-actions">
            <a
              href="https://console.velt.dev/"
              target="_blank"
              rel="noopener"
              className="cta-btn-light hfade"
            >
              Get Free API Key
            </a>
            <a href="/book-demo" className="cta-btn-outline houtline">
              Book Demo
            </a>
          </div>
          <div className="cta-microcopy">
            DEMOS ARE 30 MINUTES, WITH AN ENGINEER, NOT A SALES DECK
          </div>
          <div className="cta-footnote">
            Evaluating against a specific tool?{" "}
            <a href="/book-demo" className="cta-founder-link">
              Talk to the team
            </a>
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
