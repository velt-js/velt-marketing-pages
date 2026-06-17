import SectionSplitHeader from "@/components/feature-new/SectionSplitHeader";
import type { TheLoopContent } from "./content";

import "./solutions.css";

type TheLoopProps = {
  content: TheLoopContent;
};

/**
 * The Loop: the page centerpiece. One composed scene walks this vertical's
 * artifact through comments, agent first-pass, the approval chain, and the
 * audit record, as numbered beats beside the persistent artifact visual. Both
 * actor types are visible and the consent step is explicit.
 * @param {TheLoopProps} props Section content.
 * @returns {JSX.Element} The loop section.
 */
export default function TheLoop({ content }: TheLoopProps) {
  return (
    <section className="band band-soft" id="the-loop" data-section="the-loop">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.body} />
        <div className="loop-grid">
          <ol className="loop-beats">
            {content.beats.map((beat) => (
              <li className="loop-beat" key={beat.num}>
                <span className="loop-num" aria-hidden="true">
                  {beat.num}
                </span>
                <div className="loop-beat-body">
                  <h3>{beat.title}</h3>
                  <p>{beat.body}</p>
                  {beat.links.length > 0 ? (
                    <div className="loop-links">
                      {beat.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target={link.newTab ? "_blank" : undefined}
                          rel={link.newTab ? "noreferrer" : undefined}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <div className="loop-stage">{content.visual}</div>
        </div>
      </div>
    </section>
  );
}
