import { ShieldIcon, ArrowIcon } from "@/components/feature-new/icons";
import type { ComplianceStripContent } from "./content";

import "./solutions.css";

type ComplianceStripProps = {
  content: ComplianceStripContent;
};

/**
 * Compliance strip, tuned to the vertical: a lead line and 2-3 trust items
 * (each with an optional link to governance / self-hosting). Rendered on a dark
 * band, matching the feature-page enterprise strip's tone.
 * @param {ComplianceStripProps} props Section content.
 * @returns {JSX.Element} The compliance strip section.
 */
export default function ComplianceStrip({ content }: ComplianceStripProps) {
  return (
    <section className="comp-strip" id="compliance" data-section="compliance">
      <div className="wrap">
        <div className="comp-head">
          <p className="kicker comp-kicker">{content.kicker}</p>
          <h2>{content.heading}</h2>
          {content.lead ? <p className="comp-lead">{content.lead}</p> : null}
        </div>
        <div className="comp-items">
          {content.items.map((item) => (
            <div className="comp-item" key={item.title}>
              <span className="comp-icon" aria-hidden="true">
                <ShieldIcon />
              </span>
              <div className="comp-item-body">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.link ? (
                  <a
                    className="comp-link"
                    href={item.link.href}
                    target={item.link.newTab ? "_blank" : undefined}
                    rel={item.link.newTab ? "noreferrer" : undefined}
                  >
                    {item.link.label}
                    <ArrowIcon />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        {content.note ? <p className="comp-note">{content.note}</p> : null}
      </div>
    </section>
  );
}
