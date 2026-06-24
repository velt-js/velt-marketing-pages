import type { ReactNode } from "react";

type LandingCta = {
  label: string;
  href: string;
  newTab?: boolean;
};

type LandingHeroProps = {
  /** Optional mono all-caps eyebrow label (rendered with the orange dot). */
  eyebrow?: string;
  heading: string;
  subheading?: string;
  primaryCta?: LandingCta;
  secondaryCta?: LandingCta;
  /** Optional microcopy rendered beneath the actions. */
  microcopy?: string;
  /** Center the hero copy (default left-aligned per DESIGN.md §11). */
  center?: boolean;
  /** Optional content rendered below the copy (e.g. an inline embed). */
  children?: ReactNode;
};

/**
 * Editorial light hero for the new-theme marketing landing pages: eyebrow,
 * title, subcopy, and dual CTAs following DESIGN.md typography and button
 * variants. Distinct from the feature-page FeatureHero, which requires a live
 * demo shell these conversion pages do not have.
 * @param {LandingHeroProps} props Hero content.
 * @returns {JSX.Element} The hero section.
 */
export default function LandingHero({
  eyebrow,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  microcopy,
  center = false,
  children,
}: LandingHeroProps) {
  return (
    <section className={center ? "lp-hero lp-hero--center" : "lp-hero"}>
      <div className="lp-wrap">
        <div className="lp-hero-inner">
          {eyebrow ? (
            <div className="lp-eyebrow">
              <span className="lp-eyebrow-dot" />
              {eyebrow}
            </div>
          ) : null}
          <h1>{heading}</h1>
          {subheading ? <p className="lp-hero-sub">{subheading}</p> : null}
          {primaryCta || secondaryCta ? (
            <div className="lp-cta-row">
              {primaryCta ? (
                <a
                  className="lp-btn-primary hdark"
                  href={primaryCta.href}
                  target={primaryCta.newTab ? "_blank" : undefined}
                  rel={primaryCta.newTab ? "noopener" : undefined}
                >
                  {primaryCta.label}
                </a>
              ) : null}
              {secondaryCta ? (
                <a
                  className="lp-btn-secondary houtline"
                  href={secondaryCta.href}
                  target={secondaryCta.newTab ? "_blank" : undefined}
                  rel={secondaryCta.newTab ? "noopener" : undefined}
                >
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          ) : null}
          {microcopy ? <p className="lp-hero-micro">{microcopy}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
