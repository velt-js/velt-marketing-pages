import CtaBanner from "@/components/feature-new/CtaBanner";
import type { InProductionCaseContent } from "./content";

import "./solutions.css";

type InProductionCaseProps = {
  content: InProductionCaseContent;
};

/**
 * In Production: a single case study from THIS vertical (screenshots + a quote
 * from this vertical only, never borrowed across verticals), followed by the
 * "see it running" CTA banner.
 * @param {InProductionCaseProps} props Section content.
 * @returns {JSX.Element} The in-production section.
 */
export default function InProductionCase({ content }: InProductionCaseProps) {
  return (
    <section className="band" id="in-production" data-section="in-production">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker">{content.kicker}</p>
          <h2>{content.heading}</h2>
        </div>
        <div className="case-grid">
          <div className="case-copy">
            <p className="case-body">{content.body}</p>
            {content.quote ? (
              <figure className="case-quote">
                {content.metric ? <p className="case-metric">{content.metric}</p> : null}
                <blockquote>{content.quote}</blockquote>
                {content.who ? <figcaption>{content.who}</figcaption> : null}
              </figure>
            ) : null}
          </div>
          <div className="case-stage">{content.visual}</div>
        </div>
        <CtaBanner banner={content.ctaBanner} style={{ marginTop: 40 }} />
      </div>
    </section>
  );
}
