"use client";

import { useState } from "react";

import CopyButton from "@/components/home-new/CopyButton";
import { highlightCode } from "./highlight";
import type { ShowcaseCard as ShowcaseCardData } from "./content";

type ShowcaseCardProps = {
  card: ShowcaseCardData;
};

/**
 * One capability card. Reuses the homepage Primitives card chrome (the same
 * `.prim-*` classes from home-new/Primitives.css) so the feature page cards
 * are visually identical to the homepage primitive cards — minus the per-card
 * Explore pill and testimonial, which the capability wall doesn't use. Both
 * panes stay mounted (stacked in one grid cell) so toggling tabs never resizes
 * the card.
 * @param {ShowcaseCardProps} props The card content.
 * @returns {JSX.Element} The capability card.
 */
export default function ShowcaseCard({ card }: ShowcaseCardProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const kicker = card.codeKicker.replace(/^\/\/\s*/, "");

  return (
    <article className="prim-card2 sc-card">
      <div className="prim-card-head">
        <div className="prim-kicker">
          <span className="prim-kicker-badge">{card.num}</span>
          <span className="prim-kicker-name">{kicker}</span>
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
            <div className="prim-code-header">{card.codeKicker}<CopyButton /></div>
            <pre className="prim-pre">
              <code>{highlightCode(card.code)}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="prim-card-content">
        <div className="prim-card-text">
          <h3 className="prim-h3">{card.name}</h3>
          <p className="prim-card-support">{card.headline}</p>
        </div>
      </div>
    </article>
  );
}
