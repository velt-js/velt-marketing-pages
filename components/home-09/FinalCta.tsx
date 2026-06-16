import "./FinalCta.css";

export default function FinalCta() {
  return (
      <section id="cta" className="cta-section">
        <div className="cta-inner">
          <div className="cta-eyebrow"><span className="cta-eyebrow-dot"></span>Ship it</div>
          <h2 className="cta-heading">Add comments and approvals to your product this weekend.</h2>
          <p className="cta-sub">Free tier. No credit card. First comment in 5 minutes.</p>
          <div className="cta-actions">
            <a href="#" className="cta-btn-light hfade">Get Free API Key <span className="cta-arrow">→</span></a>
            <a href="#" className="cta-btn-outline houtline">Book Demo</a>
          </div>
          <div className="cta-microcopy">DEMOS ARE 30 MINUTES, WITH AN ENGINEER, NOT A SALES DECK</div>
          <div className="cta-footnote">Or <a href="#" className="cta-founder-link">talk to Rakesh, the founder →</a></div>
        </div>
      </section>
  );
}
