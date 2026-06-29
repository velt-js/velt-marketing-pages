"use client";

import { useState } from "react";

import SectionHead from "./SectionHead";

export type LandingFaqItem = { question?: string; answer?: string };

type LandingFaqProps = {
  eyebrow?: string;
  heading: string;
  items: LandingFaqItem[];
};

/** Chevron glyph for the FAQ toggle (Tabler chevron-down, currentColor). */
function ChevronIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
}

/**
 * Accordion FAQ section scoped to the .vlp landing pages. Mirrors the
 * feature-page FAQ behavior (single open item, animated reveal) but uses the
 * landing kit's own classes so it styles correctly inside the .vlp shell.
 * @param {LandingFaqProps} props Section content.
 * @returns {JSX.Element} The FAQ section.
 */
export default function LandingFaq({ eyebrow = "FAQ", heading, items }: LandingFaqProps) {
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
    <section className="lp-section lp-section--alt">
      <div className="lp-wrap">
        <SectionHead center eyebrow={eyebrow} heading={heading} />
        <div className="lp-faq">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className={isOpen ? "lp-faq-item is-open" : "lp-faq-item"} key={item.question ?? index}>
                <button
                  type="button"
                  className="lp-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => handleToggle(index)}
                >
                  <h3>{item.question}</h3>
                  <ChevronIcon />
                </button>
                <div className="lp-faq-a">
                  <p className="lp-faq-a-inner">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
