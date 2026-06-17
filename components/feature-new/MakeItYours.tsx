"use client";

import { useState } from "react";

import SectionSplitHeader from "./SectionSplitHeader";
import { highlightCode } from "./highlight";
import type { MakeItYoursCard, MakeItYoursContent } from "./content";

import "./MakeItYours.css";

type MakeItYoursProps = {
  content: MakeItYoursContent;
};

/**
 * One Look/Behavior card with a Preview | Code toggle.
 * @param {{ card: MakeItYoursCard }} props The card content.
 * @returns {JSX.Element} The collab card.
 */
function CollabCard({ card }: { card: MakeItYoursCard }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <article className="collab-card">
      <div className="collab-head">
        <span className="collab-ic">{card.icon}</span>
        <div className="pc-tabs" role="tablist">
          <button type="button" role="tab" className="pc-tab" aria-selected={tab === "preview"} onClick={() => setTab("preview")}>
            Preview
          </button>
          <button type="button" role="tab" className="pc-tab" aria-selected={tab === "code"} onClick={() => setTab("code")}>
            Code
          </button>
        </div>
      </div>
      <div className="collab-meta">
        <h3>{card.title}</h3>
        <p>{card.body}</p>
      </div>
      <div className="pc-body">
        <div className="pc-pane pc-preview" hidden={tab !== "preview"}>
          {card.preview}
        </div>
        <pre className="pc-pane pc-code" hidden={tab !== "code"}>
          <code>{highlightCode(card.code)}</code>
        </pre>
      </div>
    </article>
  );
}

/**
 * "Make it yours" section: the Look (themes/wireframes) and Behavior (custom
 * data, APIs, webhooks) halves, each a Preview | Code card, plus a metric-led
 * interstitial quote.
 * @param {MakeItYoursProps} props Section content.
 * @returns {JSX.Element} The Make It Yours section.
 */
export default function MakeItYours({ content }: MakeItYoursProps) {
  return (
    <section className="band" id="make-it-yours" data-section="make-it-yours">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.support} />
        <div className="miy-grid">
          {content.cards.map((card) => (
            <CollabCard key={card.title} card={card} />
          ))}
        </div>
        {content.interstitial ? (
          <div className="interstitial">
            <blockquote>{content.interstitial.quote}</blockquote>
            <p className="who">{content.interstitial.who}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
