import "@/components/home-new/FinalCta.css";

/**
 * Dark final CTA for /pricing. Reuses the homepage FinalCta visual system
 * (cta-* classes, scoped under .vlp) with pricing-specific copy.
 * @returns The final CTA section.
 */
export default function PricingCta() {
  return (
    <section id="cta" className="cta-section">
      <div className="cta-inner">
        <div className="cta-eyebrow">
          <span className="cta-eyebrow-dot" />
          Get started
        </div>
        <h2 className="cta-heading">Start free. Pay only when collaboration scales.</h2>
        <p className="cta-sub">Free tier. No credit card. First document in minutes.</p>
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
          Questions about volume?{" "}
          <a href="/book-demo" className="cta-founder-link">
            Talk to the team
          </a>
        </div>
      </div>
    </section>
  );
}
