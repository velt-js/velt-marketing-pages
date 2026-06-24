"use client";

import { useEffect, useState } from "react";

import type { FeatureHeroContent } from "./content";

import "./FeatureHero.css";

type FeatureHeroProps = {
  hero: FeatureHeroContent;
};

/**
 * Feature hero: add-format title, secondary, accent (Prevents) line, dual
 * CTAs, microcopy, and a tabbed live-demo shell with an inline "Build this"
 * chip. The active demo tab also syncs to the URL hash, so deep links such as
 * `/presence#cursors` open with the matching artifact selected.
 * @param {FeatureHeroProps} props Hero content.
 * @returns {JSX.Element} The hero section.
 */
export default function FeatureHero({ hero }: FeatureHeroProps) {
  const [activeTab, setActiveTab] = useState(hero.demoTabs[0]?.id ?? "");

  // Sync the active demo tab to the URL hash on mount and on hash changes, so
  // a deep link (or a same-page nav sub-link) toggles the matching artifact.
  useEffect(() => {
    /** Select the demo tab whose id matches the current location hash. */
    const selectTabFromHash = () => {
      try {
        const hash = window?.location?.hash?.replace(/^#/, "") ?? "";
        if (!hash) {
          return;
        }
        const matchedTab = hero.demoTabs?.find((tab) => tab?.id === hash);
        if (matchedTab?.id) {
          setActiveTab(matchedTab.id);
        }
      } catch (error) {
        console.error("FeatureHero hash sync failed", error);
      }
    };

    selectTabFromHash();
    window.addEventListener("hashchange", selectTabFromHash);
    return () => {
      window.removeEventListener("hashchange", selectTabFromHash);
    };
  }, [hero.demoTabs]);

  return (
    <section className="f-hero" id="hero" data-section="hero">
      <div className="wrap f-hero-grid">
        <div className="hero-copy">
          <p className="kicker">
            {hero.kicker}
            {hero.beta ? <span className="kicker-beta">Beta</span> : null}
          </p>
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
