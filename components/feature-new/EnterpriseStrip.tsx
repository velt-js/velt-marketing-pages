import { ShieldIcon } from "./icons";
import type { EnterpriseContent } from "./content";

import "./EnterpriseStrip.css";

type EnterpriseStripProps = {
  content: EnterpriseContent;
};

/**
 * Enterprise readiness strip: compliance badges, a feature-specific trust
 * line, and a Book Demo action on a dark band.
 * @param {EnterpriseStripProps} props Section content.
 * @returns {JSX.Element} The enterprise strip section.
 */
export default function EnterpriseStrip({ content }: EnterpriseStripProps) {
  return (
    <section className="ent-strip" data-section="enterprise">
      <div className="wrap ent-inner">
        <div className="ent-badges">
          {content.badges.map((badge) => (
            <span className="ent-badge" key={badge}>
              <ShieldIcon />
              {badge}
            </span>
          ))}
        </div>
        <p className="ent-line">{content.line}</p>
        <a className="btn btn-ghost-dark btn-sm" href={content.cta.href} target={content.cta.newTab ? "_blank" : undefined} rel={content.cta.newTab ? "noreferrer" : undefined}>
          {content.cta.label}
        </a>
      </div>
    </section>
  );
}
