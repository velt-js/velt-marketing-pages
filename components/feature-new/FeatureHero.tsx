"use client";

import { useState } from "react";

import type { FeatureHeroContent } from "./content";

import "./FeatureHero.css";

type FeatureHeroProps = {
  hero: FeatureHeroContent;
};

/**
 * Feature hero: add-format title, secondary, accent (Prevents) line, dual
 * CTAs, microcopy, and a tabbed live-demo shell with an inline "Build this"
 * chip.
 * @param {FeatureHeroProps} props Hero content.
 * @returns {JSX.Element} The hero section.
 */
export default function FeatureHero({ hero }: FeatureHeroProps) {
  const [activeTab, setActiveTab] = useState(hero.demoTabs[0]?.id ?? "");

  return (
    <section className="f-hero" id="hero" data-section="hero">
      <div className="wrap f-hero-grid">
        <div className="hero-copy">
          <p className="kicker">{hero.kicker}</p>
          <h1>{hero.title}</h1>
          <p className="hero-secondary">{hero.secondary}</p>
          <p className="hero-accent">{hero.accent}</p>
          <div className="cta-row">
            <a className="hero-btn-primary hdark" href={hero.primaryCta.href} target={hero.primaryCta.newTab ? "_blank" : undefined} rel={hero.primaryCta.newTab ? "noreferrer" : undefined}>
              {hero.primaryCta.label}
            </a>
            <a className="hero-btn-secondary hsoft" href={hero.secondaryCta.href} target={hero.secondaryCta.newTab ? "_blank" : undefined} rel={hero.secondaryCta.newTab ? "noreferrer" : undefined}>
              {hero.secondaryCta.label}
            </a>
          </div>
          <p className="microcopy">{hero.microcopy}</p>
        </div>

        <div className="demo-shell" aria-label="Feature demo">
          <div className="pc-tabs" role="tablist">
            {hero.demoTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                className="pc-tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="demo-stage">
            {hero.demoTabs.map((tab) => (
              <div className="pc-pane" key={tab.id} role="tabpanel" hidden={activeTab !== tab.id}>
                {tab.content}
              </div>
            ))}
            <a className="build-chip" href={hero.buildChip.href} target={hero.buildChip.newTab ? "_blank" : undefined} rel={hero.buildChip.newTab ? "noreferrer" : undefined}>
              {hero.buildChip.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
