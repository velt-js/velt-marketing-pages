import type { SolutionHeroContent } from "./content";

// Reuse the feature-page hero chrome (.f-hero / hero buttons / demo-shell),
// scoped under .vfp, so the solutions hero matches the rest of the site. The
// solutions hero shows a single vertical artifact mid-approval (no tab strip).
import "@/components/feature-new/FeatureHero.css";

type SolutionHeroProps = {
  hero: SolutionHeroContent;
};

/**
 * Solutions hero: fit-claim title (the vertical's review problem as Velt's
 * claim), secondary truth, dual CTAs, microcopy, and a single artifact visual.
 * @param {SolutionHeroProps} props Hero content.
 * @returns {JSX.Element} The hero section.
 */
export default function SolutionHero({ hero }: SolutionHeroProps) {
  return (
    <section className="f-hero" id="hero" data-section="hero">
      <div className="wrap f-hero-grid">
        <div className="hero-copy">
          <p className="kicker">{hero.kicker}</p>
          <h1>{hero.title}</h1>
          <p className="hero-secondary">{hero.secondary}</p>
          <div className="cta-row">
            <a
              className="hero-btn-primary hdark"
              href={hero.primaryCta.href}
              target={hero.primaryCta.newTab ? "_blank" : undefined}
              rel={hero.primaryCta.newTab ? "noreferrer" : undefined}
            >
              {hero.primaryCta.label}
            </a>
            <a
              className="hero-btn-secondary hsoft"
              href={hero.secondaryCta.href}
              target={hero.secondaryCta.newTab ? "_blank" : undefined}
              rel={hero.secondaryCta.newTab ? "noreferrer" : undefined}
            >
              {hero.secondaryCta.label}
            </a>
          </div>
          <p className="microcopy">{hero.microcopy}</p>
        </div>

        <div className="demo-shell" aria-label="Solution demo">
          <div className="demo-stage">
            {hero.visual}
            {hero.buildChip ? (
              <a
                className="build-chip"
                href={hero.buildChip.href}
                target={hero.buildChip.newTab ? "_blank" : undefined}
                rel={hero.buildChip.newTab ? "noreferrer" : undefined}
              >
                {hero.buildChip.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
