import SectionSplitHeader from "./SectionSplitHeader";
import type { TestimonialContent } from "./content";

import "./TestimonialWall.css";

type TestimonialWallProps = {
  content: TestimonialContent;
};

/**
 * Testimonial wall: metric-led headlines with the quote below. At least one
 * quote reverses the hero's Prevents line.
 * @param {TestimonialWallProps} props Section content.
 * @returns {JSX.Element} The testimonial wall section.
 */
export default function TestimonialWall({ content }: TestimonialWallProps) {
  return (
    <section className="band" id="proof" data-section="proof">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.support} />
        <div className="wall-grid">
          {content.cards.map((card) => (
            <figure className="wall-card" key={card.metric}>
              <p className="metric">{card.metric}</p>
              <blockquote>{card.quote}</blockquote>
              <figcaption className="who">{card.who}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
