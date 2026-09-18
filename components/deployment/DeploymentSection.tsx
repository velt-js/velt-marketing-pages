import Link from "next/link";

import SectionHead from "@/components/landing-new/SectionHead";
import { ShieldIcon } from "@/components/feature-new/icons";
import {
  CLOUD_STATUS_LINE,
  DEPLOYMENT_BADGES,
  DEPLOYMENT_BETA_CTA,
  DEPLOYMENT_BODY,
  DEPLOYMENT_EYEBROW,
  DEPLOYMENT_HEADING,
  DEPLOYMENT_MODELS,
  FEDRAMP_NOTE,
  HAS_PRIVATE_BETA_CLOUD,
} from "@/lib/deployment";

import "./DeploymentSection.css";

type DeploymentSectionProps = {
  /** Anchor id, so nav and in-page links can deep link to the section. */
  id?: string;
  /**
   * Render the FedRAMP line. Only /enterprise and /self-hosting pass this.
   * See FEDRAMP_NOTE in lib/deployment.ts for why it is restricted.
   */
  showFedrampNote?: boolean;
};

/**
 * Dark deployment anchor section. Renders the deployment story, the current
 * cloud availability, and the three models named by where the data lives.
 *
 * Every string comes from lib/deployment.ts. This component hardcodes no cloud
 * name, no availability, and no badge label, so a cloud shipping is a one-line
 * change in that file.
 * @param {DeploymentSectionProps} props Anchor id and FedRAMP opt-in.
 * @returns {JSX.Element} The deployment section.
 */
export default function DeploymentSection({
  id = "deployment",
  showFedrampNote = false,
}: DeploymentSectionProps) {
  return (
    <section
      id={id}
      className="lp-section lp-section--dark dep-section"
      data-section="deployment"
      style={{ scrollMarginTop: 100 }}
    >
      <div className="lp-wrap">
        <SectionHead
          eyebrow={DEPLOYMENT_EYEBROW}
          heading={DEPLOYMENT_HEADING}
          subheading={DEPLOYMENT_BODY}
        />

        <div className="dep-status-row">
          <p className="dep-status">{CLOUD_STATUS_LINE}</p>
          {HAS_PRIVATE_BETA_CLOUD ? (
            <Link className="dep-beta-cta hfade" href={DEPLOYMENT_BETA_CTA.href}>
              {DEPLOYMENT_BETA_CTA.label}
            </Link>
          ) : null}
        </div>

        <div className="dep-models">
          {DEPLOYMENT_MODELS.map((model) => (
            <article className="dep-model" key={model.id}>
              <h3 className="dep-model-name">{model.name}</h3>
              <p className="dep-model-body">{model.body}</p>
            </article>
          ))}
        </div>

        <div className="dep-badges">
          {DEPLOYMENT_BADGES.map((badge) => (
            <span className="dep-badge" key={badge}>
              <ShieldIcon />
              {badge}
            </span>
          ))}
        </div>

        {showFedrampNote ? <p className="dep-fedramp">{FEDRAMP_NOTE}</p> : null}
      </div>
    </section>
  );
}
