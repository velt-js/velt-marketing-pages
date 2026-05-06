// "Find your Use Case" — Figma node 178:64296 (1200×2299).
// White full-bleed wrapper with rounded TOP corners (matches the
// pattern from CustomizationStack / SixReasonsHeader on other pages).
// Carries `data-outcomes` so the Nav flips white when this section
// hits the strip.
//
// Layout: centered header (heading + subhead + 2 small CTAs) followed
// by a 2-column × 5-row grid of 10 UseCaseCard tiles (594×404, gap 12).

import Link from "next/link";

import { UseCaseCard } from "./UseCaseCard";
import { USE_CASE_CARDS } from "./use-case-cards";

export function UseCaseGrid() {
  return (
    <section
      data-outcomes
      className="relative flex flex-col items-center full-bleed-bg"
      style={{
        background: "#FFFFFF",
        paddingTop: 100,
        paddingBottom: 100,
        gap: 44,
        borderTopLeftRadius: 52,
        borderTopRightRadius: 52,
      }}
    >
      {/* Header — Figma 178:64413 (centered, max-width 720) */}
      <div
        className="flex flex-col items-center text-center"
        style={{ width: 720, gap: 32 }}
      >
        <div className="flex flex-col items-center" style={{ gap: 14 }}>
          <h2
            className="font-urbanist font-bold"
            style={{
              fontSize: 52,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              color: "#111",
              margin: 0,
            }}
          >
            Find your Use Case
          </h2>
          <p
            className="font-urbanist"
            style={{
              fontSize: 20,
              lineHeight: 1.2,
              color: "#111",
              opacity: 0.75,
              margin: 0,
            }}
          >
            Don&rsquo;t see your use case? Book Demo
          </p>
        </div>
        <div className="flex items-start" style={{ gap: 12 }}>
          <Link
            href="/book-demo"
            className="flex items-center justify-center font-urbanist font-semibold rounded-lg"
            style={{
              width: 150,
              height: 43,
              padding: "8px 16px",
              border: "2px solid #625df5",
              color: "#fff",
              fontSize: 16,
              letterSpacing: "-0.03em",
              mixBlendMode: "exclusion",
              textDecoration: "none",
            }}
          >
            Book Demo
          </Link>
          <Link
            href="https://console.velt.dev/"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center font-urbanist font-semibold rounded-lg"
            style={{
              width: 150,
              height: 43,
              padding: "8px 16px",
              background: "#625df5",
              color: "#fff",
              fontSize: 16,
              letterSpacing: "-0.03em",
              textDecoration: "none",
            }}
          >
            Get Free API Key
          </Link>
        </div>
      </div>

      {/* 2 × 5 grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(2, 594px)",
          gridTemplateRows: "repeat(5, 404px)",
          gap: 12,
        }}
      >
        {USE_CASE_CARDS.map((card) => (
          <UseCaseCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
