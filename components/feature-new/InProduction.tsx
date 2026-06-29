"use client";

import { useState } from "react";

import SectionSplitHeader from "./SectionSplitHeader";
import CtaBanner from "./CtaBanner";
import type { InProductionContent } from "./content";

import "./InProduction.css";

type InProductionProps = {
  content: InProductionContent;
};

/**
 * "In production + where it fits" section: customer proof tabbed by vertical,
 * a full /for/ link row, and CTA banner #2.
 * @param {InProductionProps} props Section content.
 * @returns {JSX.Element} The In Production section.
 */
export default function InProduction({ content }: InProductionProps) {
  const [activeTab, setActiveTab] = useState(content.tabs[0]?.id ?? "");

  return (
    <section className="band band-soft" id="in-production" data-section="in-production">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.support} />
        <div className="pc-card prod-shell">
          <div className="pc-tabs" role="tablist">
            {content.tabs.map((tab) => (
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
          <div className="pc-body">
            {content.tabs.map((tab) => (
              <div className="pc-pane" key={tab.id} role="tabpanel" hidden={activeTab !== tab.id}>
                <div className="prod-shot">{tab.visual}</div>
                <p className="prod-caption">
                  <span>{tab.caption}</span>
                  <a href={tab.link.href}>{tab.link.label}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mig-strip">
          <span>{content.whereItFits.label}</span>
          {content.whereItFits.links.map((link, index) => (
            <span key={link.href} style={{ display: "contents" }}>
              {index > 0 ? <span className="sep">·</span> : null}
              <a href={link.href}>{link.label}</a>
            </span>
          ))}
        </div>
        <CtaBanner banner={content.ctaBanner} style={{ marginTop: 48 }} />
      </div>
    </section>
  );
}
