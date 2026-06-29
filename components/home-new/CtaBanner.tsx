import "./CtaBanner.css";

/** A framework chip shown in the optional logo/label row of a CTA banner. */
type Framework = {
  /** Display name, used as the visible label and image alt text. */
  name: string;
  /** Optional brand logo path; when absent the chip renders the label only. */
  logoSrc?: string;
};

/** Props for a single standalone conversion CTA banner (spec Part 5.3). */
type CtaBannerProps = {
  /** Mono kicker shown above the heading. */
  kicker: string;
  /** Banner headline. */
  heading: string;
  /** Primary action label (e.g. "Get Free API Key"). */
  ctaLabel: string;
  /** Primary action href. Reuses the real signup / book-demo URLs. */
  ctaHref: string;
  /** When true, the primary action opens in a new tab (external console URL). */
  ctaExternal?: boolean;
  /** Microcopy rendered beneath the action. */
  microcopy: string;
  /** Optional framework logo/label row (banner #1 only). */
  frameworks?: Framework[];
  /** Dark surface treatment (banner #2) vs light default (banner #1). */
  dark?: boolean;
};

/**
 * Standalone conversion CTA banner. One reusable, full-width component rendered
 * twice on the homepage: after How It Works (free API key + frameworks) and
 * after the proof region (book demo). No View Docs link is ever placed here,
 * per spec Part 5.3.
 * @param {CtaBannerProps} props Banner configuration.
 * @returns {JSX.Element} The rendered banner section.
 */
export default function CtaBanner({
  kicker,
  heading,
  ctaLabel,
  ctaHref,
  ctaExternal = false,
  microcopy,
  frameworks,
  dark = false,
}: CtaBannerProps) {
  const externalProps = ctaExternal
    ? { target: "_blank", rel: "noopener" }
    : {};

  return (
    <section className={dark ? "ctab-section ctab-section--dark" : "ctab-section"}>
      <div className="ctab-inner">
        <div className="ctab-eyebrow">
          <span className="ctab-eyebrow-dot"></span>
          {kicker}
        </div>
        <h2 className="ctab-heading">{heading}</h2>
        <div className="ctab-actions">
          <a
            href={ctaHref}
            className={dark ? "ctab-btn ctab-btn--light hfade" : "ctab-btn ctab-btn--dark hdark"}
            {...externalProps}
          >
            {ctaLabel}
          </a>
          <span className="ctab-microcopy">{microcopy}</span>
        </div>

        {frameworks?.length ? (
          <div className="ctab-frameworks" aria-label="Supported frameworks">
            {frameworks.map((framework) => (
              <span className="ctab-fw" key={framework.name}>
                {framework.logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="ctab-fw-logo" src={framework.logoSrc} alt="" />
                ) : null}
                <span className="ctab-fw-label">{framework.name}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
