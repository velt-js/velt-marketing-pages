import SectionSplitHeader from "./SectionSplitHeader";
import { ArrowIcon } from "./icons";
import type { RelatedContent } from "./content";

import "./Related.css";

type RelatedProps = {
  content: RelatedContent;
};

/**
 * Related primitives section: sibling features framed under the review thesis,
 * each with an icon, one-liner, and a mini visual. When `content.hideVisuals`
 * is set, cards render lean (icon + title + body + link) and the per-card
 * artifact preview is omitted entirely.
 * @param {RelatedProps} props Section content.
 * @returns {JSX.Element} The Related Primitives section.
 */
export default function Related({ content }: RelatedProps) {
  const hideVisuals = Boolean(content.hideVisuals);
  return (
    <section className="band band-soft" id="related" data-section="related">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.support} />
        <div className={hideVisuals ? "related-grid related-grid--lean" : "related-grid"}>
          {content.cards.map((card) => (
            <article className="collab-card" key={card.title}>
              {hideVisuals ? <span className="collab-ic">{card.icon}</span> : null}
              <div className="collab-meta">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
              {hideVisuals ? null : <div className="related-preview">{card.visual}</div>}
              <div className="collab-foot">
                <a className="primitive-link" href={card.link.href}>
                  {card.link.label} <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
