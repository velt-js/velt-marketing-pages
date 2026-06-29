import "./Proof.css";
import LogoCarousel from "./LogoCarousel";
import { PROOF_LOGOS } from "./TrustStrip";

export default function Proof() {
  return (
      <section id="proof" className="proof-section">
        <div className="proof-eyebrow"><span className="proof-eyebrow-dot"></span>Proof</div>
        <h2 className="proof-heading">Real teams. Real metrics. Real names.</h2>
        <div className="proof-grid">

          <div className="proof-dark-card">
            <div className="proof-dark-card-header"><span className="proof-dark-card-company">Leadpages</span><span className="proof-badge-orange">FEATURED · ANCHOR CUSTOMER</span></div>
            <h3 className="proof-dark-card-title">3 FTEs of work, shipped in weeks — not quarters.</h3>
            <p className="proof-dark-card-body">Implementing Velt took weeks, not the quarters it would have taken us to build in-house even with 3 FTE engineers. We&rsquo;re already seeing added value for our users and anticipate increased retention.</p>
            <div className="proof-attribution">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="proof-avatar" src="/images/features/comments/trust-us/avatar-hope.png" alt="Hope Callaway" loading="lazy" />
              <div className="proof-attribution-name">Hope Callaway<span className="proof-attribution-role">Senior PM · Leadpages</span></div>
            </div>
            <a href="/customers" className="proof-case-study-link">Read the case study</a>
            <div className="proof-stats-row">
              <div className="proof-stat"><div className="proof-stat-number">3 FTE</div><div className="proof-stat-label">SAVED</div></div>
              <div className="proof-stat"><div className="proof-stat-number">Weeks</div><div className="proof-stat-label">NOT QUARTERS</div></div>
              <div className="proof-stat"><div className="proof-stat-number">&uarr;</div><div className="proof-stat-label">RETENTION</div></div>
            </div>
          </div>

          <div className="proof-right-col">
            <div className="proof-small-card">
              <div className="proof-small-card-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="proof-small-card-logo" src="/images/features/comments/trust-us/logo-google.png" alt="Google" loading="lazy" />
                <span className="proof-small-card-label">BUNDLED WITH MAGIC</span>
              </div>
              <p className="proof-small-card-quote">Velt&rsquo;s commenting &amp; notifications are bundled with a lot of magic.</p>
              <div className="proof-small-card-attribution">Yuri Kleban · Sr. Product Manager</div>
            </div>
            <div className="proof-small-card">
              <div className="proof-small-card-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="proof-small-card-logo" src="/images/features/comments/trust-us/logo-x.png" alt="X" loading="lazy" />
                <span className="proof-small-card-label">SHIPPED IN A WEEK</span>
              </div>
              <p className="proof-small-card-quote">We shipped full collaboration features in under one week.</p>
              <div className="proof-small-card-attribution">Chris Bakke · Head of Product</div>
            </div>
            <div className="proof-small-card">
              <div className="proof-small-card-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="proof-small-card-logo" src="/images/features/comments/trust-us/logo-metaimpact.png" alt="MetaImpact" loading="lazy" />
                <span className="proof-small-card-label">WAU UP 26%</span>
              </div>
              <p className="proof-small-card-quote">Velt increased our weekly active users by 26%.</p>
              <div className="proof-small-card-attribution">Jeff Cunning · CPO</div>
            </div>
          </div>
        </div>
        <LogoCarousel logos={PROOF_LOGOS} className="proof-logos" monochrome />
        <div className="proof-cta-row">
          <span className="proof-cta-microcopy">30 MINUTES, WITH AN ENGINEER, NOT A SALES DECK</span>
          <a href="/book-demo" className="proof-cta-btn hdark">Book Demo</a>
        </div>
      </section>
  );
}
