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
  quote?: { text: string; attribution: string };
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
  wide = false,
}: PrimitiveCardProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <article className={wide ? "prim-card2 prim-card-wide" : "prim-card2"}>
      <div className="prim-card-head">
        <div className="prim-kicker">
          <span className="prim-kicker-id">{num} · {name}</span>
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

      <h3 className="prim-h3">{headline}</h3>
      {support ? <p className="prim-body-p">{support}</p> : null}
      <a href={exploreHref} className="prim-explore">{exploreLabel}</a>

      <div className="prim-card-body">
        {tab === "preview" ? preview : code}
      </div>

      {quote ? (
        <blockquote className="prim-blockquote">
          {quote.text}
          <span className="prim-blockquote-attr">{quote.attribution}</span>
        </blockquote>
      ) : null}
    </article>
  );
}
