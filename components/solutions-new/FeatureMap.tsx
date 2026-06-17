"use client";

import { useState } from "react";

import CopyButton from "@/components/home-new/CopyButton";
import SectionSplitHeader from "@/components/feature-new/SectionSplitHeader";
import { highlightCode } from "@/components/feature-new/highlight";
import { ArrowIcon } from "@/components/feature-new/icons";
import type { FeatureMapCard, FeatureMapContent } from "./content";

// Reuse the homepage primitive-card chrome (.prim-* / .sc-grid) so feature-map
// cards match the homepage and feature-page capability cards exactly.
import "@/components/home-new/Primitives.css";
import "@/components/feature-new/Showcase.css";
import "./solutions.css";

type FeatureMapProps = {
  content: FeatureMapContent;
};

/**
 * One feature-map card: the same Preview | Code primitive card as the homepage,
 * with a vertical-specific one-liner and a footer link to the feature page.
 * @param {{ card: FeatureMapCard }} props The card content.
 * @returns {JSX.Element} The feature-map card.
 */
function FeatureMapCardView({ card }: { card: FeatureMapCard }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <article className="prim-card2 sc-card fm-card">
      <div className="prim-card-head">
        <div className="prim-kicker">
          <span className="prim-kicker-badge">{card.num}</span>
          <span className="prim-kicker-name">{card.name}</span>
          {card.beta ? <span className="fm-beta">Beta</span> : null}
        </div>
        <div className="prim-tabs" role="tablist" aria-label={`${card.name} preview`}>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "preview"}
            onClick={() => setTab("preview")}
            className={tab === "preview" ? "prim-tab prim-tab-active" : "prim-tab prim-tab-inactive"}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "code"}
            onClick={() => setTab("code")}
            className={tab === "code" ? "prim-tab prim-tab-active" : "prim-tab prim-tab-inactive"}
          >
            Code
          </button>
        </div>
      </div>

      <div className="prim-stack">
        <div className={tab === "preview" ? "prim-stage" : "prim-stage prim-pane-hidden"}>{card.preview}</div>
        <div className={tab === "code" ? "prim-code-host" : "prim-code-host prim-pane-hidden"}>
          <div className="prim-code-card">
            <div className="prim-code-header">
              {`// ${card.name.toLowerCase()}`}
              <CopyButton />
            </div>
            <pre className="prim-pre">
              <code>{highlightCode(card.code)}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="prim-card-content">
        <div className="prim-card-text">
          <p className="prim-card-support">{card.oneLiner}</p>
          <a
            className="fm-link"
            href={card.link.href}
            target={card.link.newTab ? "_blank" : undefined}
            rel={card.link.newTab ? "noreferrer" : undefined}
          >
            {card.link.label}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

/**
 * Feature Map: 4-6 primitive cards ranked by what this vertical buys first,
 * each with a vertical-specific one-liner and a link to its feature page.
 * @param {FeatureMapProps} props Section content.
 * @returns {JSX.Element} The feature-map section.
 */
export default function FeatureMap({ content }: FeatureMapProps) {
  return (
    <section className="band" id="feature-map" data-section="feature-map">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.support} />
        <div className="sc-grid">
          {content.cards.map((card) => (
            <FeatureMapCardView key={card.num} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
