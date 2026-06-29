"use client";

import { useState } from "react";

import SectionSplitHeader from "./SectionSplitHeader";
import type { DetailsContent } from "./content";

import "./DetailsWall.css";

type DetailsWallProps = {
  content: DetailsContent;
};

/**
 * Little Big Details: an exhaustive, expandable wall of micro-capabilities.
 * Items beyond the visible count are hidden until expanded.
 * @param {DetailsWallProps} props Section content.
 * @returns {JSX.Element} The details wall section.
 */
export default function DetailsWall({ content }: DetailsWallProps) {
  const [expanded, setExpanded] = useState(false);

  /**
   * Toggles the expanded state of the details wall.
   * @returns {void}
   */
  const toggle = () => {
    try {
      setExpanded((value) => !value);
    } catch (error) {
      console.error("Toggle details failed", error);
    }
  };

  return (
    <section className="band" id="details" data-section="details">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.support} />
        <div className={expanded ? "details-wall expanded" : "details-wall"}>
          {content.items.map((item, index) => (
            <span
              className={index >= content.visibleCount ? "detail-item hidden-detail" : "detail-item"}
              key={item.label}
            >
              {item.label}
              {item.soon ? <span className="chip-soon">Coming soon</span> : null}
            </span>
          ))}
        </div>
        {content.items.length > content.visibleCount ? (
          <div className="details-toggle">
            <button className="btn btn-secondary btn-sm" aria-expanded={expanded} onClick={toggle}>
              <span>{expanded ? "Show fewer" : `Show all ${content.items.length} details`}</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
