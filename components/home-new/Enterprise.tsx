import "./Enterprise.css";

export default function Enterprise() {
  return (
      <section className="ent-section">
        <div className="ent-container">
          <div className="ent-header-grid">
            <div>
              <div className="ent-eyebrow"><span className="ent-eyebrow-dot"></span>Built for enterprise</div>
              <h2 className="ent-heading">Built for your customers' compliance.</h2>
            </div>
            <p className="ent-desc">Per-feature data providers keep content and PII on your infrastructure. SOC 2 Type II audited, HIPAA workloads supported, data residency options including the EU.</p>
          </div>
          <div className="ent-pillars-grid">
            <div className="ent-pillar">
              <div className="ent-pillar-label">PILLAR 01 · DEPLOYMENT</div>
              <h4 className="ent-pillar-title">Your data stays yours.</h4>
              <p className="ent-pillar-body">Velt stores minimal identifiers. Everything sensitive lives where you say it does.</p>
              <div className="ent-pillar-mono">▸ comments → your db<br />▸ recordings → your S3<br />▸ user PII → never leaves</div>
              <div className="ent-pillar-link">velt.dev/self-hosting</div>
            </div>
            <div className="ent-pillar">
              <div className="ent-pillar-label">PILLAR 02 · RELIABILITY</div>
              <h4 className="ent-pillar-title">99.999% SLA</h4>
              <p className="ent-pillar-body">Reliability terms in writing for enterprise plans, with a public status page your team can watch.</p>
              <div className="ent-uptime-row"><span className="ent-uptime-label">trailing 90d</span><span className="ent-uptime-value">100.000%</span></div>
              <div className="ent-pillar-link">status.velt.dev</div>
            </div>
            <div className="ent-pillar">
              <div className="ent-pillar-label">PILLAR 03 · GLOBAL</div>
              <h4 className="ent-pillar-title">42 regions</h4>
              <p className="ent-pillar-body">Multi-region infrastructure with residency pinning, so review stays fast wherever your users work.</p>
              <div className="ent-regions-mono">us-east, eu-west,<br />ap-south, +39 more</div>
            </div>
            <div className="ent-pillar">
              <div className="ent-pillar-label">PILLAR 04 · COMPLIANCE</div>
              <h4 className="ent-pillar-title">SOC 2 Type II.</h4>
              <p className="ent-pillar-body">The answers your buyer's security team asks for, ready before they ask.</p>
              <div className="ent-pillar-mono">SOC 2 report under NDA<br />HIPAA BAA available<br />PEN TESTS regular</div>
              <div className="ent-pillar-link">trust.velt.dev</div>
            </div>
          </div>
          <div className="ent-actions">
            <a href="#proof" className="ent-btn-light hfade">Book Demo</a>
            <a href="/enterprise" className="ent-btn-outline houtline">Governance</a>
          </div>
        </div>
      </section>
  );
}
