"use client";
import "./Faq.css";

import { useState } from "react";
import { FAQS } from "./faq-data";

export default function Faq() {
  const [faqOpen, setFaqOpen] = useState(0);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-inner">
        <div className="faq-eyebrow"><span className="faq-eyebrow-dot"></span>Objections, named</div>
        <h2 className="faq-heading">Questions buyers ask in the first meeting.</h2>
        <div>
          {FAQS.map((item, index) => {
            const isOpen = faqOpen === index;
            return (
              <div key={item.num} onClick={() => setFaqOpen(isOpen ? -1 : index)} className="faq-row">
                <div className="faq-row-header">
                  <span className="faq-num">{item.num}</span>
                  <span className="faq-question">{item.q}</span>
                  <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen && (
                  <p className="faq-answer">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
