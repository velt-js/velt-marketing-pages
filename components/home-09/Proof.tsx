import "./Proof.css";

export default function Proof() {
  return (
      <section id="proof" className="proof-section">
        <div className="proof-eyebrow"><span className="proof-eyebrow-dot"></span>Proof</div>
        <h2 className="proof-heading">Real teams. Real metrics. Real names.</h2>
        <div className="proof-grid">

          <div className="proof-dark-card">
            <div className="proof-dark-card-header"><span className="proof-dark-card-company">OpenEnvoy</span><span className="proof-badge-orange">FEATURED · ANCHOR CUSTOMER</span></div>
            <h3 className="proof-dark-card-title">500k+ comments processed without adding headcount.</h3>
            <p className="proof-dark-card-body">OpenEnvoy gives every invoice review a timestamped, attributed audit trail. The migration took 3 days. Zero failed audits since.</p>
            <div className="proof-attribution"><span className="proof-avatar-dm">DM</span><div className="proof-attribution-name">Daniel Mejia<span className="proof-attribution-role">VP Engineering · OpenEnvoy</span></div></div>
            <a href="#" className="proof-case-study-link">Read the case study <span>→</span></a>
            <div className="proof-stats-row">
              <div><div className="proof-stat-number">500k+</div><div className="proof-stat-label">COMMENTS</div></div>
              <div><div className="proof-stat-number">0</div><div className="proof-stat-label">AUDITS FAILED</div></div>
              <div><div className="proof-stat-number">3 FTE</div><div className="proof-stat-label">ENG SAVED</div></div>
            </div>
          </div>

          <div className="proof-right-col">
            <div className="proof-small-card">
              <div className="proof-small-card-label">FEATURE LAUNCHED · TRUMPET</div>
              <p className="proof-small-card-quote">Engagement up 10% the week we shipped Velt.</p>
              <div className="proof-small-card-attribution">Eliana Cohen · Product Lead</div>
            </div>
            <div className="proof-small-card">
              <div className="proof-small-card-label">BUILD TIME SAVED · LEADPAGES</div>
              <p className="proof-small-card-quote">We modeled $750k loaded for three engineers, two quarters. Velt shipped the same surface in weeks.</p>
              <div className="proof-small-card-attribution">Jordan Lee · VP Engineering</div>
            </div>
            <div className="proof-small-card">
              <div className="proof-small-card-label">DEAL CLOSED · CLOUDFACTORY</div>
              <p className="proof-small-card-quote">We replaced Liveblocks in 3 days. BAA and SOC 2 closed the healthcare deal.</p>
              <div className="proof-small-card-attribution">Erin Kwon · Platform Eng</div>
            </div>
          </div>
        </div>
        <div className="proof-logo-bar">
          <span>Pendo</span><span>Stensul</span><span>Bigtincan</span><span>Cofactr</span><span>Datarails</span><span>Vareto</span><span className="proof-logo-bar-bold">PERSUIT</span><span>Vidyard</span><span>Highspot</span>
        </div>
        <div className="proof-cta-row">
          <span className="proof-cta-microcopy">30 MINUTES, WITH AN ENGINEER, NOT A SALES DECK</span>
          <a href="#cta" className="proof-cta-btn hdark">Book Demo <span className="proof-cta-arrow">→</span></a>
        </div>
      </section>
  );
}
