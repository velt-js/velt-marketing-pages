import type { TheLoopContent } from "./content";

import "./solutions.css";

type TheLoopProps = {
  content: TheLoopContent;
};

/**
 * The Loop: the page centerpiece. The section header and body sit on the left
 * while the composed scene runs down the right as a vertical stepped flow
 * (mirroring the Review Reality split). Each beat is a card with its own inline
 * artifact, so the reader sees the actual UI for every step in a linear
 * sequence. Both actor types are visible and the consent step is explicit.
 * @param {TheLoopProps} props Section content.
 * @returns {JSX.Element} The loop section.
 */
export default function TheLoop({ content }: TheLoopProps) {
  return (
    <section className="band loop-stage" id="the-loop" data-section="the-loop">
      <div className="wrap">
        <div className="loop-grid">
          <div className="loop-col-left">
            <div className="sec-head">
              <p className="kicker">{content.kicker}</p>
              <h2>{content.heading}</h2>
            </div>
            {content.body ? <p className="loop-lead">{content.body}</p> : null}
            {content.caption ? <p className="loop-caption">{content.caption}</p> : null}
          </div>
          <div className="loop-col-right">
            <div className="loop-flow">
              {content.beats.map((beat) => (
                <div className="loop-beat" key={beat.num}>
                  <span className="beat-n" aria-hidden="true">
                    {beat.num}
                  </span>
                  <div className="beat-card">
                    <div className="beat-head">
                      <span className="beat-title">{beat.title}</span>
                      {beat.beta ? <span className="chip-beta">Beta</span> : null}
                    </div>
                    <p className="beat-body">{beat.body}</p>
                    {beat.visual ? <div className="beat-visual">{beat.visual}</div> : null}
                    {beat.links.length > 0 ? (
                      <div className="loop-links">
                        {beat.links.map((link) => (
                          <a
                            key={link.href}
                            className="beat-link"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
