import "./Hero.css";

export default function Hero() {
  return (
      <section className="hero">
        <div>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot"></span>SOC 2 Type II · HIPAA · EU data residency
          </div>
          <h1 className="hero-title">Add a pull request to your product.</h1>
          <p className="hero-sub">Embeddable review and approval for AI-native apps. Add governance to the work that can't ship unapproved.</p>
          <div className="hero-actions">
            <a href="#cta" className="hero-btn-primary hdark">Get Free API Key <span className="hero-arrow">→</span></a>
            <a href="#proof" className="hero-btn-secondary hsoft">Book Demo</a>
          </div>
          <div className="hero-microcopy">FREE TIER · NO CREDIT CARD · FIRST COMMENT IN 5 MINUTES</div>
        </div>


        <div className="hero-panel">
          <div className="hero-panel-head">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#7a7974" strokeWidth="1.3"><path d="M8 1.5H3.5v11H10.5V4z"></path><path d="M8 1.5V4h2.5"></path></svg>
            <span className="hero-panel-filename">Q3 Pricing One-Pager</span>
            <span className="hero-badge-approved">APPROVED</span>
          </div>
          <div className="hero-panel-body">
            <div className="hero-meta-row">
              <div><div className="hero-meta-label">PLAN</div>Pro</div>
              <div><div className="hero-meta-label">CURRENT</div>$79</div>
              <div><div className="hero-meta-label">PROPOSED</div><span className="hero-meta-proposed">$85</span></div>
            </div>
            <div className="hero-card">
              <div className="hero-card-head">
                <span className="hero-avatar-ai">AI</span>
                <span className="hero-card-name">Pricing Agent</span>
                <span className="hero-card-time">just now</span>
              </div>
              <p className="hero-card-body">Proposed Pro price was $92, above the approved Q3 band. I suggest $85, the band maximum.</p>
              <div className="hero-card-actions">
                <button className="hero-btn-approve">Approve</button>
                <button className="hero-btn-reject">Reject</button>
              </div>
            </div>
            <div className="hero-approver">
              <span className="hero-avatar-mk">MK</span>
              Maya approved this change
            </div>
            <div className="hero-webhook">POST /webhooks/velt · <span className="hero-webhook-event">change.applied</span></div>
          </div>
        </div>
      </section>
  );
}
