import Link from "next/link";

// Reuse the feature-page hero button styles (ink-filled .hero-btn-primary /
// outline .hero-btn-secondary), so the grid CTAs match the hero and DESIGN.md
// (primary filled = ink, not the orange accent .btn-primary).
import "@/components/feature-new/FeatureHero.css";

import { ArrowIcon } from "@/components/feature-new/icons";
import type { UseCaseGridContent } from "./content";

type UseCaseGridProps = {
  content: UseCaseGridContent;
};

/**
 * "Find your Use Case" grid for the /use-case index. Renders a split-style
 * section header with dual CTAs above a two-column grid of linked use-case
 * cards (image + title + arrow), styled in the new editorial theme.
 * @param {UseCaseGridProps} props Grid content.
 * @returns {JSX.Element} The use-case grid section.
 */
export default function UseCaseGrid({ content }: UseCaseGridProps) {
  try {
    const { kicker, heading, support, primaryCta, secondaryCta, cards } = content;

    return (
      <section className="band" id="use-cases" data-section="use-cases">
        <div className="wrap">
          <div className="vuc-grid-head">
            <p className="kicker">{kicker}</p>
            <h2>{heading}</h2>
            {support ? <p className="vuc-hero-sub">{support}</p> : null}
            {primaryCta || secondaryCta ? (
              <div className="cta-row">
                {primaryCta ? (
                  <a
                    className="hero-btn-primary hdark"
                    href={primaryCta?.href}
                    target={primaryCta?.newTab ? "_blank" : undefined}
                    rel={primaryCta?.newTab ? "noreferrer" : undefined}
                  >
                    {primaryCta?.label}
                  </a>
                ) : null}
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
            ) : null}
          </div>

          <div className="vuc-grid">
            {cards.map((card) => (
              <Link className="vuc-card" key={card.href} href={card.href}>
                <div className="vuc-card-media">
                  {card.imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={card.imageSrc} alt={card.imageAlt ?? card.title} loading="lazy" />
                  ) : (
                    <span className="img-slot">{card.title}</span>
                  )}
                </div>
                <div className="vuc-card-foot">
                  <span className="vuc-card-title">{card.title}</span>
                  <span className="vuc-card-arrow" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("UseCaseGrid render failed", error);
    return null;
  }
}
