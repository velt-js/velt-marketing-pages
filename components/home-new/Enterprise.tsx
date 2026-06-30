import { Fragment } from "react";

import type {
  CtaLink,
  EnterprisePillar,
  EnterprisePillarsContent,
} from "@/components/feature-new/content";

import "./Enterprise.css";

/** Props for the Enterprise pillar section. */
type EnterpriseProps = EnterprisePillarsContent;

const DEFAULT_EYEBROW = "Built for enterprise";
const DEFAULT_HEADING = "Built for your customers' compliance.";
const DEFAULT_DESCRIPTION =
  "Per-feature data providers keep content and PII on your infrastructure. SOC 2 Type II audited, HIPAA workloads supported, data residency options including the EU.";
const DEFAULT_PRIMARY_CTA: CtaLink = { label: "Book Demo", href: "/book-demo" };
const DEFAULT_SECONDARY_CTA: CtaLink = {
  label: "Governance",
  href: "/enterprise",
};

const DEFAULT_PILLARS: EnterprisePillar[] = [
  {
    label: "PILLAR 01 · DEPLOYMENT",
    title: "Your data stays yours.",
    body: "Velt stores minimal identifiers. Everything sensitive lives where you say it does.",
    monoLines: [
      "▸ comments → your db",
      "▸ recordings → your S3",
      "▸ user PII → never leaves",
    ],
    footerLink: "velt.dev/self-hosting",
  },
  {
    label: "PILLAR 02 · RELIABILITY",
    title: "99.999% SLA",
    body: "Reliability terms in writing for enterprise plans, with a public status page your team can watch.",
    uptime: { label: "trailing 90d", value: "100.000%" },
    footerLink: "status.velt.dev",
  },
  {
    label: "PILLAR 03 · GLOBAL",
    title: "42 regions",
    body: "Multi-region infrastructure with residency pinning, so review stays fast wherever your users work.",
    regionsMono: ["us-east, eu-west,", "ap-south, +39 more"],
  },
  {
    label: "PILLAR 04 · COMPLIANCE",
    title: "SOC 2 Type II.",
    body: "The information your buyer's security team asks for, ready before they ask.",
    monoLines: [
      "SOC 2 report under NDA",
      "HIPAA BAA available",
      "PEN TESTS regular",
    ],
    footerLink: "trust.velt.dev",
  },
];

/**
 * Render a list of monospace lines into a single block, joining lines with
 * <br /> the same way the static markup did.
 * @param {string[]} lines The lines to render.
 * @param {string} className The wrapper class (mono vs. regions variant).
 * @param {string} keyPrefix A stable key prefix unique to the pillar.
 * @returns {JSX.Element} The rendered mono block.
 */
function MonoBlock({
  lines,
  className,
  keyPrefix,
}: {
  lines: string[];
  className: string;
  keyPrefix: string;
}) {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <Fragment key={`${keyPrefix}-${index}`}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Dark "Built for enterprise" pillar section. All copy, the four pillar cards,
 * and the CTAs are configurable via props so the same section can be reused
 * across pages and driven from the CMS; defaults match the homepage reference
 * design when a prop is omitted.
 * @param {EnterpriseProps} props Optional text/pillars/link overrides.
 * @returns {JSX.Element} The rendered enterprise section.
 */
export default function Enterprise({
  eyebrow = DEFAULT_EYEBROW,
  heading = DEFAULT_HEADING,
  description = DEFAULT_DESCRIPTION,
  pillars,
  primaryCta = DEFAULT_PRIMARY_CTA,
  secondaryCta = DEFAULT_SECONDARY_CTA,
}: EnterpriseProps = {}) {
  const resolvedPillars =
    pillars && pillars.length > 0 ? pillars : DEFAULT_PILLARS;

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
          {resolvedPillars.map((pillar, index) => (
            <div className="ent-pillar" key={`${pillar.label}-${index}`}>
              <div className="ent-pillar-label">{pillar.label}</div>
              <h3 className="ent-pillar-title">{pillar.title}</h3>
              <p className="ent-pillar-body">{pillar.body}</p>
              {pillar.monoLines && pillar.monoLines.length > 0 ? (
                <MonoBlock
                  lines={pillar.monoLines}
                  className="ent-pillar-mono"
                  keyPrefix={`${pillar.label}-mono`}
                />
              ) : null}
              {pillar.uptime ? (
                <div className="ent-uptime-row">
                  <span className="ent-uptime-label">{pillar.uptime.label}</span>
                  <span className="ent-uptime-value">{pillar.uptime.value}</span>
                </div>
              ) : null}
              {pillar.regionsMono && pillar.regionsMono.length > 0 ? (
                <MonoBlock
                  lines={pillar.regionsMono}
                  className="ent-regions-mono"
                  keyPrefix={`${pillar.label}-regions`}
                />
              ) : null}
              {pillar.footerLink ? (
                <div className="ent-pillar-link">{pillar.footerLink}</div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="ent-actions">
          <a
            href={primaryCta?.href}
            className="ent-btn-light hfade"
            target={primaryCta?.newTab ? "_blank" : undefined}
            rel={primaryCta?.newTab ? "noreferrer" : undefined}
          >
            {primaryCta?.label}
          </a>
          <a
            href={secondaryCta?.href}
            className="ent-btn-outline houtline"
            target={secondaryCta?.newTab ? "_blank" : undefined}
            rel={secondaryCta?.newTab ? "noreferrer" : undefined}
          >
            {secondaryCta?.label}
          </a>
        </div>
      </div>
    </section>
  );
}
