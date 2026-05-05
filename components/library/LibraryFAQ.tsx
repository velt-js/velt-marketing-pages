"use client";

// Dark-theme FAQ accordion — ported from Framer export's
// chunk-VHHYUZOX.js ("FAQ" row component) + library-faq.jsx (4-item
// container).
//
// Container spec: 957px wide, flex-col, gap 16px, on a black section.
// Row spec (closed):
// - 24px radius, 1px solid rgba(255, 255, 255, 0.1) border, dark bg
// - Question: Urbanist 700, 32px (titleFontSize default), white
// - 32px padding, triangle caret on right (rotated -90° when closed)
// Row spec (open):
// - Same border, radius
// - Question padded 32px
// - Answer padded 0 32px 32px 32px
// - Answer: Urbanist 500, 14px, rgba(255,255,255,0.4), line-height 1.5em,
//   paragraph spacing 20px

import { useState, type ReactNode } from "react";

export type FaqEntry = {
  question: string;
  /** Plain-text answer; split on blank lines for paragraphs. */
  answer?: string;
  /** Rich-content paragraphs. When provided, takes precedence over
   *  `answer` so individual entries can include inline links / formatting
   *  (e.g. /pricing FAQs that link to "Apply here", "Contact us"). */
  paragraphs?: ReactNode[];
};

type LibraryFAQProps = {
  heading?: string;
  items: FaqEntry[];
};

function Caret({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="shrink-0 flex items-center justify-center"
      style={{ width: 15, height: 15 }}
    >
      <svg
        width="15"
        height="8"
        viewBox="0 0 15 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: open ? "rotate(0deg)" : "rotate(-90deg)",
          transition: "transform 200ms ease",
        }}
      >
        <path
          d="M7.99902 8L0.998039 -6.11874e-07L15 4.03789e-07L7.99902 8Z"
          fill="white"
        />
      </svg>
    </span>
  );
}

export function LibraryFAQ({
  heading = "Frequently Asked Questions",
  items,
}: LibraryFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (items.length === 0) return null;

  return (
    <section
      // `data-getstarted` is the Nav's "dark-return" marker. On pages where
      // the FAQ is the first dark section after the white content block, it
      // tells Nav to flip back to transparent-on-dark here. On the homepage
      // there's no LibraryFAQ, so GetStartedSteps' own data-getstarted still
      // wins; querySelector returns the first DOM match either way.
      data-getstarted
      className="flex flex-col items-center bg-black"
      style={{ padding: "100px 80px", gap: 52 }}
    >
      <h2
        className="font-urbanist font-bold text-white text-center"
        style={{ fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
      >
        {heading}
      </h2>

      <ul
        className="flex flex-col"
        style={{ width: 957, gap: 16, margin: 0, padding: 0, listStyle: "none" }}
      >
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <li
              key={item.question}
              className="overflow-hidden"
              style={{
                width: "100%",
                background: "#0b0b0b",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 24,
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex items-center justify-between w-full text-left"
                style={{
                  padding: 32,
                  gap: 10,
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                }}
              >
                <span
                  className="font-urbanist font-bold"
                  style={{
                    fontSize: 32,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    color: "rgb(255, 255, 255)",
                    flex: 1,
                  }}
                >
                  {item.question}
                </span>
                <Caret open={isOpen} />
              </button>
              {isOpen && (
                <div
                  className="font-urbanist"
                  style={{
                    padding: "0 32px 32px 32px",
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: "1.5em",
                    color: "rgba(255, 255, 255, 0.4)",
                  }}
                >
                  {(
                    item.paragraphs ??
                    (item.answer ?? "").split(/\n\n+/)
                  ).map((para, pi) => (
                    <p key={pi} style={{ marginBottom: 20 }}>
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
