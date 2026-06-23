// Reuse the feature-page hero button styles (.hero-btn-primary / -secondary),
// scoped under .vfp, so the use-case hero CTAs match the rest of the site.
import "@/components/feature-new/FeatureHero.css";

import type { UseCaseHeroContent } from "./content";

type UseCaseHeroProps = {
  hero: UseCaseHeroContent;
};

/**
 * Centered editorial hero for the Use Case pages: optional mono kicker, the
 * page headline, secondary copy, dual CTAs, and microcopy. Reuses the shared
 * .vfp kicker/button primitives so it matches the rest of the new theme.
 * @param {UseCaseHeroProps} props Hero content.
 * @returns {JSX.Element} The hero section.
 */
export default function UseCaseHero({ hero }: UseCaseHeroProps) {
  try {
    const { kicker, title, secondary, primaryCta, secondaryCta, microcopy } = hero;

    return (
      <section className="vuc-hero" id="hero" data-section="hero">
        <div className="wrap">
          <div className="vuc-hero-inner">
            {kicker ? <p className="kicker">{kicker}</p> : null}
            <h1>{title}</h1>
            {secondary ? <p className="vuc-hero-sub">{secondary}</p> : null}
            <div className="cta-row">
              <a
                className="hero-btn-primary hdark"
                href={primaryCta?.href}
                target={primaryCta?.newTab ? "_blank" : undefined}
                rel={primaryCta?.newTab ? "noreferrer" : undefined}
              >
                {primaryCta?.label}
              </a>
              {secondaryCta ? (
                <a
                  className="hero-btn-secondary hsoft"
                  href={secondaryCta?.href}
                  target={secondaryCta?.newTab ? "_blank" : undefined}
                  rel={secondaryCta?.newTab ? "noreferrer" : undefined}
                >
                  {secondaryCta?.label}
                </a>
              ) : null}
            </div>
            {microcopy ? <p className="microcopy">{microcopy}</p> : null}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("UseCaseHero render failed", error);
    return null;
  }
}
