import "./MigrationHero.css";

/** A hero call-to-action link (mirrors the Sanity `CtaLink` shape). */
type MigrationHeroCta = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

/** Props for the editorial migration hero. */
type MigrationHeroProps = {
  /** Mono eyebrow label (orange dot prefix added automatically). */
  eyebrow?: string;
  /** Display headline (sentence case, light-weight display scale). */
  heading: string;
  /** Supporting subcopy beneath the headline. */
  subheading?: string;
  /** Primary (ink-filled) action. */
  primaryCta?: MigrationHeroCta;
  /** Secondary (outline) action. */
  secondaryCta?: MigrationHeroCta;
  /** Competitor display name, used in the "from X to Velt" route pill. */
  competitorName?: string;
  /** Resolved competitor logo URL; rendered in the route pill when present. */
  competitorLogoSrc?: string | null;
};

const DEFAULT_EYEBROW = "Migration";

/** Default trust/proof tokens shown in the hero meta strip. */
const HERO_META = ["FREE MIGRATION PLAN", "SHIPS IN DAYS", "SOC 2 · HIPAA"];

/**
 * Light editorial hero for the migration landing pages. Mirrors the
 * /comparison hero rhythm (mono eyebrow → light-weight display title →
 * muted subcopy → dual CTAs) and adds a "from {competitor} to Velt" route
 * pill plus a mono proof strip, all pulling `--vlp-*` tokens.
 * @param {MigrationHeroProps} props Hero content.
 * @returns {JSX.Element | null} The hero section, or null on failure.
 */
export default function MigrationHero({
  eyebrow,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  competitorName,
}: MigrationHeroProps) {
  try {
    const hasPrimary = Boolean(primaryCta?.label && primaryCta?.href);
    const hasSecondary = Boolean(secondaryCta?.label && secondaryCta?.href);

    return (
      <section className="mig-hero">
        <div className="mig-hero-inner">
          <div className="mig-hero-eyebrow">
            <span className="mig-hero-eyebrow-dot" />
            {eyebrow ?? DEFAULT_EYEBROW}
          </div>

          <h1 className="mig-hero-title">{heading}</h1>

          {subheading ? <p className="mig-hero-sub">{subheading}</p> : null}

          {hasPrimary || hasSecondary ? (
            <div className="mig-hero-actions">
              {hasPrimary ? (
                <a
                  href={primaryCta?.href}
                  className="mig-hero-btn-primary hdark"
                  target={primaryCta?.newTab ? "_blank" : undefined}
                  rel={primaryCta?.newTab ? "noopener" : undefined}
                >
                  {primaryCta?.label}
                </a>
              ) : null}
              {hasSecondary ? (
                <a
                  href={secondaryCta?.href}
                  className="mig-hero-btn-secondary houtline"
                  target={secondaryCta?.newTab ? "_blank" : undefined}
                  rel={secondaryCta?.newTab ? "noopener" : undefined}
                >
                  {secondaryCta?.label}
                </a>
              ) : null}
            </div>
          ) : null}

          {competitorName ? (
            <div className="mig-hero-route" aria-hidden="true">
              <span className="mig-hero-route-node">
                {competitorName}
              </span>
              <svg
                className="mig-hero-route-arrow"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mig-hero-route-node mig-hero-route-node--velt">
                Velt
              </span>
            </div>
          ) : null}

          <div className="mig-hero-meta">
            {HERO_META.map((item, index) => (
              <span key={item} style={{ display: "inline-flex", gap: "var(--vlp-space-2-5)" }}>
                {index > 0 ? <span className="mig-hero-meta-dot">·</span> : null}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
