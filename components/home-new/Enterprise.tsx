import "./Enterprise.css";

/** A single CTA shown in the Enterprise section actions row. */
interface EnterpriseCta {
  label: string;
  href: string;
}

/** Configurable text/links for the Enterprise pillar section. */
interface EnterpriseProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  primaryCta?: EnterpriseCta;
  secondaryCta?: EnterpriseCta;
}

const DEFAULT_EYEBROW = "Built for enterprise";
const DEFAULT_HEADING = "Built for your customers' compliance.";
const DEFAULT_DESCRIPTION =
  "Per-feature data providers keep content and PII on your infrastructure. SOC 2 Type II audited, HIPAA workloads supported, data residency options including the EU.";
const DEFAULT_PRIMARY_CTA: EnterpriseCta = { label: "Book Demo", href: "/book-demo" };
const DEFAULT_SECONDARY_CTA: EnterpriseCta = {
  label: "Governance",
  href: "/enterprise",
};

/**
 * Dark "enterprise pillars" section. Header text and CTAs are configurable via
 * props so the same section can be reused across pages; defaults match the
 * homepage. The four pillar cards are shared content and stay fixed.
 * @param {EnterpriseProps} props Optional text/link overrides.
 * @returns {JSX.Element} The rendered enterprise section.
 */
export default function Enterprise({
  eyebrow = DEFAULT_EYEBROW,
  heading = DEFAULT_HEADING,
  description = DEFAULT_DESCRIPTION,
  primaryCta = DEFAULT_PRIMARY_CTA,
  secondaryCta = DEFAULT_SECONDARY_CTA,
}: EnterpriseProps = {}) {
  return (
      <section className="ent-section">
        <div className="ent-container">
          <div className="ent-header-grid">
            <div>
              <div className="ent-eyebrow"><span className="ent-eyebrow-dot"></span>{eyebrow}</div>
              <h2 className="ent-heading">{heading}</h2>
            </div>
            <p className="ent-desc">{description}</p>
          </div>
          <div className="ent-pillars-grid">
            <div className="ent-pillar">
              <div className="ent-pillar-label">PILLAR 01 · DEPLOYMENT</div>
              <h3 className="ent-pillar-title">Your data stays yours.</h3>
              <p className="ent-pillar-body">Velt stores minimal identifiers. Everything sensitive lives where you say it does.</p>
              <div className="ent-pillar-mono">▸ comments → your db<br />▸ recordings → your S3<br />▸ user PII → never leaves</div>
              <div className="ent-pillar-link">velt.dev/self-hosting</div>
            </div>
            <div className="ent-pillar">
              <div className="ent-pillar-label">PILLAR 02 · RELIABILITY</div>
              <h3 className="ent-pillar-title">99.999% SLA</h3>
              <p className="ent-pillar-body">Reliability terms in writing for enterprise plans, with a public status page your team can watch.</p>
              <div className="ent-uptime-row"><span className="ent-uptime-label">trailing 90d</span><span className="ent-uptime-value">100.000%</span></div>
              <div className="ent-pillar-link">status.velt.dev</div>
            </div>
            <div className="ent-pillar">
              <div className="ent-pillar-label">PILLAR 03 · GLOBAL</div>
              <h3 className="ent-pillar-title">42 regions</h3>
              <p className="ent-pillar-body">Multi-region infrastructure with residency pinning, so review stays fast wherever your users work.</p>
              <div className="ent-regions-mono">us-east, eu-west,<br />ap-south, +39 more</div>
            </div>
            <div className="ent-pillar">
              <div className="ent-pillar-label">PILLAR 04 · COMPLIANCE</div>
              <h3 className="ent-pillar-title">SOC 2 Type II.</h3>
              <p className="ent-pillar-body">The information your buyer's security team asks for, ready before they ask.</p>
              <div className="ent-pillar-mono">SOC 2 report under NDA<br />HIPAA BAA available<br />PEN TESTS regular</div>
              <div className="ent-pillar-link">trust.velt.dev</div>
            </div>
          </div>
          <div className="ent-actions">
            <a href={primaryCta?.href} className="ent-btn-light hfade">{primaryCta?.label}</a>
            <a href={secondaryCta?.href} className="ent-btn-outline houtline">{secondaryCta?.label}</a>
          </div>
        </div>
      </section>
  );
}
