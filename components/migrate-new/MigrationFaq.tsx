"use client";

import { useState } from "react";
import "./MigrationFaq.css";

/** A single FAQ entry from the Sanity `migrationPage.faq.items` array. */
export type MigrationFaqItem = {
  _key?: string;
  question: string;
  answer?: string;
};

/** Props for the migration FAQ accordion. */
type MigrationFaqProps = {
  items: MigrationFaqItem[];
};

const EYEBROW_LABEL = "Questions, answered";
const HEADING = "What teams ask before they migrate.";

/**
 * Accordion FAQ for the migration pages, restyled to the editorial home-new
 * skin (cream band, mono eyebrow, numbered rows). Mirrors the rendered text
 * the page's FAQPage JSON-LD is built from, so the two never drift.
 * @param {MigrationFaqProps} props The FAQ entries to render.
 * @returns {JSX.Element | null} The FAQ section, or null when empty.
 */
export default function MigrationFaq({ items }: MigrationFaqProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  /**
   * Toggles a row open, collapsing any other open row.
   * @param {number} index Index of the clicked row.
   * @returns {void}
   */
  const handleToggle = (index: number) => {
    try {
      setOpenIndex((current) => (current === index ? -1 : index));
    } catch (error) {
      console.error("Toggle migration FAQ failed", error);
    }
  };

  try {
    if (!items || items.length === 0) return null;

    return (
      <section id="faq" className="mig-faq">
        <div className="mig-faq-inner">
          <div className="mig-faq-eyebrow">
            <span className="mig-faq-eyebrow-dot" />
            {EYEBROW_LABEL}
          </div>
          <h2 className="mig-faq-heading">{HEADING}</h2>
          <div>
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item._key ?? item.question}
                  onClick={() => handleToggle(index)}
                  className="mig-faq-row"
                >
                  <div className="mig-faq-row-header">
                    <span className="mig-faq-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mig-faq-question">{item.question}</h3>
                    <span className="mig-faq-toggle">{isOpen ? "−" : "+"}</span>
                  </div>
                  {isOpen && item.answer ? (
                    <p className="mig-faq-answer">{item.answer}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
