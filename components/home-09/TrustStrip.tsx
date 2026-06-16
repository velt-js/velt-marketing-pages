import "./TrustStrip.css";

export default function TrustStrip() {
  return (
      <section className="trust-section">
        <div className="trust-header">
          <div className="trust-stat-row">
            <span className="trust-dot"></span>
            <span><strong className="trust-highlight">500k+ reviews</strong> running in production at OpenEnvoy</span>
          </div>
          <div className="trust-sub">// 2M+ review decisions across 33 products</div>
        </div>
        <div className="trust-logos">
          <span>OpenEnvoy</span><span>Bigtincan</span><span className="trust-logo-italic">trumpet</span><span>Datarails</span><span>Privado</span><span>Cofactr</span><span>Runway</span><span>HeyGen</span><span>CloudFactory</span><span>Leadpages</span><span className="trust-logo-bold">PERSUIT</span>
        </div>
      </section>
  );
}
