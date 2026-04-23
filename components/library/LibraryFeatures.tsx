// Per-library feature grid — "Make Tiptap truly collaborative" etc.
// 2×2 grid of 400×493 cards in #f7f7f7 with 24-px radius, matching the
// home Security section card language (components/home/Security.tsx:107).
// Each card holds a visual preview area on top and a Urbanist-bold
// title + 52%-opacity subtitle anchored to the bottom-left.

import type { ReactNode } from "react";

export type LibraryFeatureCard = {
  title: string;
  description: string;
  preview?: ReactNode;
};

type LibraryFeaturesProps = {
  heading: string;
  subheading?: string;
  cards: LibraryFeatureCard[];
};

export function LibraryFeatures({ heading, subheading, cards }: LibraryFeaturesProps) {
  if (cards.length === 0) return null;

  return (
    <section
      className="flex flex-col items-center bg-white"
      style={{ padding: "52px 80px 100px", gap: 52 }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 12, maxWidth: 820 }}
      >
        <h2
          className="font-urbanist font-bold"
          style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
        >
          {heading}
        </h2>
        {subheading && (
          <p
            className="font-urbanist"
            style={{ color: "#111", fontSize: 20, lineHeight: 1.2, opacity: 0.72 }}
          >
            {subheading}
          </p>
        )}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(2, 400px)",
          gap: 16,
        }}
      >
        {cards.map((card) => (
          <article
            key={card.title}
            className="relative overflow-hidden"
            style={{
              width: 400,
              height: 493,
              background: "#f7f7f7",
              borderRadius: 24,
            }}
          >
            {card.preview && (
              <div
                className="absolute flex items-center justify-center"
                style={{ top: 0, left: 0, right: 0, bottom: 160 }}
              >
                {card.preview}
              </div>
            )}
            <div
              className="absolute flex flex-col items-start"
              style={{ bottom: 28, left: 30, width: 340, gap: 8 }}
            >
              <h3
                className="font-urbanist font-bold"
                style={{
                  color: "#111",
                  fontSize: 28,
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                }}
              >
                {card.title}
              </h3>
              <p
                className="font-urbanist"
                style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}
              >
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
