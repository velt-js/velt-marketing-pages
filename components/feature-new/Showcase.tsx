import SectionSplitHeader from "./SectionSplitHeader";
import ShowcaseCard from "./ShowcaseCard";
import type { ShowcaseContent } from "./content";
import { isAnonymousTestimonial, testimonialClassName } from "./anonymous-testimonial";

// Reuse the homepage primitive-card chrome (.prim-* classes) so the feature
// Capabilities cards match the homepage exactly.
import "@/components/home-new/Primitives.css";
import "./Showcase.css";

type ShowcaseProps = {
  content: ShowcaseContent;
};

/**
 * Showcase section: value-led split header plus a stack of capability cards,
 * each a Preview | Code toggle, followed by a metric-led interstitial quote.
 * @param {ShowcaseProps} props Section content.
 * @returns {JSX.Element} The showcase section.
 */
export default function Showcase({ content }: ShowcaseProps) {
  return (
    <section className="band band-soft" id="showcase" data-section="showcase">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.support} />
        <div className="sc-grid">
          {content.cards.map((card) => (
            <ShowcaseCard key={card.num} card={card} hideCodeTab={content.hideCodeTab} />
          ))}
        </div>
        {content.docLinks.length > 0 ? (
          <div className="doc-links" style={{ justifyContent: "center", display: "flex", marginTop: 36 }}>
            {content.docLinks.map((link) => (
              <a key={link.href} href={link.href} target={link.newTab ? "_blank" : undefined} rel={link.newTab ? "noreferrer" : undefined}>
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
        {content.interstitial ? (
          // TODO: anonymous interstitial quotes hidden via the
          // testimonial--anonymous CSS rule in styles.css until real named
          // testimonials are available.
          <div
            className={testimonialClassName("interstitial", content.interstitial.who)}
            data-anonymous={isAnonymousTestimonial(content.interstitial.who) ? "true" : undefined}
          >
            <blockquote>{content.interstitial.quote}</blockquote>
            <p className="who">{content.interstitial.who}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
