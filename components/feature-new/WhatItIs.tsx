import type { WhatItIsContent } from "./content";

import "./WhatItIs.css";

type WhatItIsProps = {
  content: WhatItIsContent;
};

/**
 * "What it is" section: agent-quotable thesis on the left (kicker, heading,
 * body, doc links) with the mixed humans + agents scene artifact on the right.
 * @param {WhatItIsProps} props Section content.
 * @returns {JSX.Element} The What It Is section.
 */
export default function WhatItIs({ content }: WhatItIsProps) {
  return (
    <section className="band band-soft" id="what-it-is" data-section="what-it-is">
      <div className="wrap">
        <div className="wii-split">
          <div className="wii-text">
            <p className="kicker">{content.kicker}</p>
            <h2>{content.heading}</h2>
            {content.body ? <p className="wii-body">{content.body}</p> : null}
            {content.docLinks && content.docLinks.length > 0 ? (
              <div className="doc-links">
                {content.docLinks.map((link) => (
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
          <div className="scene-card wii-artifact">{content.scene}</div>
        </div>
      </div>
    </section>
  );
}
