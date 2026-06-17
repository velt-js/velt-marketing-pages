import SectionSplitHeader from "./SectionSplitHeader";
import type { WhatItIsContent } from "./content";

import "./WhatItIs.css";

type WhatItIsProps = {
  content: WhatItIsContent;
};

/**
 * "What it is" section: agent-quotable thesis (split header) plus the required
 * mixed humans + agents scene in one primitive.
 * @param {WhatItIsProps} props Section content.
 * @returns {JSX.Element} The What It Is section.
 */
export default function WhatItIs({ content }: WhatItIsProps) {
  return (
    <section className="band band-soft" id="what-it-is" data-section="what-it-is">
      <div className="wrap">
        <SectionSplitHeader
          kicker={content.kicker}
          heading={content.heading}
          support={content.body}
          docLinks={content.docLinks}
        />
        <div className="scene-card" style={{ maxWidth: 660, margin: "48px auto 0" }}>
          {content.scene}
        </div>
      </div>
    </section>
  );
}
