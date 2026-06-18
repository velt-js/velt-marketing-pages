import type { ReviewRealityContent } from "./content";

import "./solutions.css";

type ReviewRealityProps = {
  content: ReviewRealityContent;
};

/**
 * Small inline checkmark used as the symptom bullet.
 * @returns {JSX.Element} A checkmark SVG.
 */
function CheckMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The Review Reality: 3-4 symptoms in the vertical's own language, written as a
 * checklist. Each line is a stalled-review pain the vertical recognizes.
 * @param {ReviewRealityProps} props Section content.
 * @returns {JSX.Element} The review-reality section.
 */
export default function ReviewReality({ content }: ReviewRealityProps) {
  return (
    <section className="band" id="review-reality" data-section="review-reality">
      <div className="wrap">
        <div className="reality-grid">
          <div className="reality-col-left">
            <div className="sec-head">
              <p className="kicker">{content.kicker}</p>
              <h2>{content.heading}</h2>
            </div>
            {content.close ? <p className="reality-close">{content.close}</p> : null}
          </div>
          <div className="reality-col-right">
            <ul className="reality-list">
              {content.items.map((item) => (
                <li className="reality-item" key={item}>
                  <span className="reality-mark" aria-hidden="true">
                    <CheckMark />
                  </span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
