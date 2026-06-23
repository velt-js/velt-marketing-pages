"use client";

import { useMemo, useState } from "react";

import { ArrowIcon } from "@/components/feature-new/icons";
import type { UseCaseLibrariesContent, UseCaseLibraryCard } from "./content";

const ALL_TAB = "All";
const DOCS_LABEL = "View docs";
const LEARN_MORE_LABEL = "Learn more";

type LibrariesProps = {
  content: UseCaseLibrariesContent;
};

/**
 * Determine whether a library card belongs to the active tab.
 * @param {UseCaseLibraryCard} card The library card.
 * @param {string} activeTab The currently selected tab label.
 * @returns {boolean} True when the card should be visible.
 */
function matchesTab(card: UseCaseLibraryCard, activeTab: string): boolean {
  try {
    if (activeTab === ALL_TAB) {
      return true;
    }
    return card?.category === activeTab;
  } catch (error) {
    console.error("Libraries matchesTab failed", error);
    return true;
  }
}

/**
 * "Works seamlessly with your libraries" band for use-case detail pages.
 * Reuses the shared library roster and renders it as new-theme cards with a
 * tab filter (All / Text Editor / Charts / Canvas).
 * @param {LibrariesProps} props Section content.
 * @returns {JSX.Element | null} The libraries section.
 */
export default function Libraries({ content }: LibrariesProps) {
  const [activeTab, setActiveTab] = useState<string>(ALL_TAB);

  const visibleCards = useMemo(() => {
    try {
      return (content?.cards ?? []).filter((card) => matchesTab(card, activeTab));
    } catch (error) {
      console.error("Libraries filter failed", error);
      return content?.cards ?? [];
    }
  }, [content?.cards, activeTab]);

  /**
   * Select a tab to filter the library grid.
   * @param {string} tab The tab label to activate.
   * @returns {void}
   */
  const handleSelectTab = (tab: string) => {
    try {
      setActiveTab(tab);
    } catch (error) {
      console.error("Libraries handleSelectTab failed", error);
    }
  };

  if (!content || (content.cards ?? []).length === 0) {
    return null;
  }

  const tabs = content.tabs ?? [];

  return (
    <section className="band band-soft" id="libraries" data-section="libraries">
      <div className="wrap">
        <div className="sec-head">
          {content.kicker ? <p className="kicker">{content.kicker}</p> : null}
          <h2>{content.heading}</h2>
          {content.support ? <p className="vuc-hero-sub">{content.support}</p> : null}
        </div>

        {tabs.length > 0 ? (
          <div className="vuc-libs-tabs" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={activeTab === tab ? "vuc-libs-tab on" : "vuc-libs-tab"}
                onClick={() => handleSelectTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : null}

        <div className="vuc-libs-grid">
          {visibleCards.map((card) => (
            <article className="vuc-lib-card" key={card.name}>
              <div className="vuc-lib-logo">
                {card.logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={card.logoSrc} alt={card.logoAlt ?? card.name} loading="lazy" />
                ) : (
                  <span className="vuc-lib-name">{card.name}</span>
                )}
              </div>
              <div className="vuc-lib-links">
                <a href={card.docsHref} target="_blank" rel="noreferrer">
                  {DOCS_LABEL} <ArrowIcon />
                </a>
                {card.learnMoreHref ? (
                  <a className="muted" href={card.learnMoreHref}>
                    {LEARN_MORE_LABEL}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
