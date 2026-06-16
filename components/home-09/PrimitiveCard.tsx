"use client";

import { useState } from "react";

type PrimitiveCardProps = {
  num: string;
  name: string;
  isNew?: boolean;
  headline: string;
  support?: string;
  exploreLabel: string;
  exploreHref: string;
  preview: React.ReactNode;
  code: React.ReactNode;
  quote?: { text: string; attribution: string; avatar?: string };
  showTestimonial?: boolean;
  wide?: boolean;
};

export default function PrimitiveCard({
  num,
  name,
  isNew = false,
  headline,
  support,
  exploreLabel,
  exploreHref,
  preview,
  code,
  quote,
  showTestimonial = true,
  wide = false,
}: PrimitiveCardProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <article className={wide ? "prim-card2 prim-card-wide" : "prim-card2"}>
      <div className="prim-card-head">
        <div className="prim-kicker">
          <span className="prim-kicker-badge">{num}</span>
          <span className="prim-kicker-name">{name}</span>
          {isNew ? <span className="prim-badge-new">NEW</span> : null}
        </div>
        <div className="prim-tabs" role="tablist" aria-label={`${name} preview`}>
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

      {/* Both panes stay mounted, stacked in one grid cell, so the card
          height equals the taller pane — switching tabs toggles visibility
          without resizing the card (and without jumping the shared row). */}
      <div className="prim-stack">
        <div className={tab === "preview" ? "prim-stage" : "prim-stage prim-pane-hidden"}>
          {preview}
        </div>
        <div className={tab === "code" ? "prim-code-host" : "prim-code-host prim-pane-hidden"}>
          {code}
        </div>
      </div>

      <div className="prim-card-content">
        <div className="prim-card-text">
          <h3 className="prim-h3">{headline}</h3>
          {support ? <p className="prim-card-support">{support}</p> : null}
        </div>
        <a href={exploreHref} className="prim-explore">{exploreLabel}</a>
      </div>

      {quote && showTestimonial ? (
        <div className="prim-quote">
          {quote.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="prim-quote-avatar" src={quote.avatar} alt={quote.attribution} />
          ) : (
            <span className="prim-quote-avatar" />
          )}
          <div className="prim-quote-text">
            <p className="prim-quote-attr">{quote.attribution}</p>
            <p className="prim-quote-body">{quote.text}</p>
          </div>
        </div>
      ) : null}
    </article>
  );
}
