import "./MigrationSteps.css";

/** A call-to-action link (mirrors the Sanity `CtaLink` shape). */
type MigrationStepsCta = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

/** A single migration step (title + description). */
type MigrationStep = {
  title: string;
  description: string;
};

/** The optional closing testimonial rendered as a dark quote card. */
type MigrationStepsTestimonial = {
  name?: string;
  role?: string;
  avatar?: string | null;
  quotePrefix?: string;
  quoteHighlight?: string;
  quoteSuffix?: string;
};

/** Props for the editorial "migrate in 3 steps" section. */
type MigrationStepsProps = {
  headingPrefix: string;
  headingHighlight: string;
  subtitle?: string;
  primaryCta?: MigrationStepsCta;
  secondaryCta?: MigrationStepsCta;
  step1: MigrationStep;
  step2: MigrationStep;
  step3: MigrationStep;
  testimonial?: MigrationStepsTestimonial;
  /** Competitor display name, used in the data-flow strip. */
  competitorName?: string;
  /** Resolved competitor logo URL for the data-flow strip. */
  competitorLogoSrc?: string | null;
};

const EYEBROW_LABEL = "Migration plan";

/**
 * Small right-arrow used between data-flow nodes.
 * @returns {JSX.Element} The arrow SVG.
 */
function FlowArrow() {
  return (
    <svg
      className="mig-flow-arrow"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Editorial three-step migration plan: a left-aligned intro with optional
 * CTAs, three numbered step cards, a competitor→Velt data-flow strip, and an
 * optional dark testimonial quote card. All styling pulls `--vlp-*` tokens.
 * @param {MigrationStepsProps} props Section content.
 * @returns {JSX.Element | null} The section, or null on failure.
 */
export default function MigrationSteps({
  headingPrefix,
  headingHighlight,
  subtitle,
  primaryCta,
  secondaryCta,
  step1,
  step2,
  step3,
  testimonial,
  competitorName,
}: MigrationStepsProps) {
  try {
    const steps = [step1, step2, step3];
    const hasPrimary = Boolean(primaryCta?.label && primaryCta?.href);
    const hasSecondary = Boolean(secondaryCta?.label && secondaryCta?.href);
    const hasTestimonial = Boolean(testimonial?.name);

    return (
      <section className="mig-steps">
        <div className="mig-steps-inner">
          <div className="mig-steps-head">
            <div className="mig-steps-eyebrow">
              <span className="mig-steps-eyebrow-dot" />
              {EYEBROW_LABEL}
            </div>
            <h2 className="mig-steps-title">
              {headingPrefix}{" "}
              <span className="mig-steps-title-accent">{headingHighlight}</span>
            </h2>
            {subtitle ? <p className="mig-steps-sub">{subtitle}</p> : null}

            {hasPrimary || hasSecondary ? (
              <div className="mig-steps-actions">
                {hasPrimary ? (
                  <a
                    href={primaryCta?.href}
                    className="mig-steps-btn-primary hdark"
                    target={primaryCta?.newTab ? "_blank" : undefined}
                    rel={primaryCta?.newTab ? "noopener" : undefined}
                  >
                    {primaryCta?.label}
                  </a>
                ) : null}
                {hasSecondary ? (
                  <a
                    href={secondaryCta?.href}
                    className="mig-steps-btn-secondary houtline"
                    target={secondaryCta?.newTab ? "_blank" : undefined}
                    rel={secondaryCta?.newTab ? "noopener" : undefined}
                  >
                    {secondaryCta?.label}
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mig-steps-grid">
            {steps.map((step, index) => (
              <div className="mig-step-card hcard" key={step.title}>
                <span className="mig-step-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mig-step-title">{step.title}</h3>
                <p className="mig-step-desc">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mig-steps-flow" aria-hidden="true">
            <span className="mig-flow-node">
              {competitorName ?? "Your data"}
            </span>
            <FlowArrow />
            <span className="mig-flow-node">Data.json</span>
            <FlowArrow />
            <span className="mig-flow-node mig-flow-node--velt">Velt DB</span>
          </div>

          {hasTestimonial ? (
            <figure className="mig-steps-quote">
              <span className="mig-steps-quote-label">Customer story</span>
              <blockquote className="mig-steps-quote-text">
                {testimonial?.quotePrefix}
                {testimonial?.quoteHighlight ? (
                  <span className="mig-steps-quote-text-accent">
                    {testimonial.quoteHighlight}
                  </span>
                ) : null}
                {testimonial?.quoteSuffix}
              </blockquote>
              <figcaption className="mig-steps-quote-author">
                {testimonial?.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={testimonial.avatar}
                    alt=""
                    className="mig-steps-quote-avatar"
                  />
                ) : null}
                <span className="mig-steps-quote-meta">
                  <span className="mig-steps-quote-name">
                    {testimonial?.name}
                  </span>
                  {testimonial?.role ? (
                    <span className="mig-steps-quote-role">
                      {testimonial.role}
                    </span>
                  ) : null}
                </span>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
