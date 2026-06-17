"use client";

import { useState } from "react";

import { ChevronIcon } from "./icons";
import type { FaqContent } from "./content";

import "./Faq.css";

type FaqProps = {
  content: FaqContent;
};

/**
 * FAQ accordion: feature questions phrased as buyers ask them. Feeds the
 * per-page FAQPage JSON-LD (built separately on the page).
 * @param {FaqProps} props Section content.
 * @returns {JSX.Element} The FAQ section.
 */
export default function Faq({ content }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  /**
   * Opens the clicked item and collapses any other open item.
   * @param {number} index Index of the clicked FAQ item.
   * @returns {void}
   */
  const handleToggle = (index: number) => {
    try {
      setOpenIndex((current) => (current === index ? null : index));
    } catch (error) {
      console.error("Toggle FAQ failed", error);
    }
  };

  return (
    <section className="band band-soft" id="faq" data-section="faq">
      <div className="wrap">
        <div className="sec-head" style={{ margin: "0 auto", textAlign: "center", justifyItems: "center" }}>
          <p className="kicker" style={{ justifyContent: "center" }}>
            {content.kicker}
          </p>
          <h2>{content.heading}</h2>
        </div>
        <div className="faq-list">
          {content.items.map((item, index) => (
            <div className={openIndex === index ? "faq-item open" : "faq-item"} key={item.q}>
              <button className="faq-q" aria-expanded={openIndex === index} onClick={() => handleToggle(index)}>
                <h3>{item.q}</h3>
                <ChevronIcon />
              </button>
              <div className="faq-a">
                <p className="faq-a-inner">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
