// Reason 1 — Figma node 180:79110.
// 2x2 comparison grid:
//   Row 1 (Comment surfaces):
//     Velt:  6 surface types  / "25+ Functional Features"
//     Other: 4 surface types  / "3 Basic Feature + API"
//   Row 2 (Framework support):
//     Velt:  8 frameworks     / "All Frameworks"
//     Other: React only       / "Just React"
//
// Each card's visual slot is a single content area meant to be replaced
// by an mp4 animation later (wrap in <Media kind="video"/> when ready).
// For now the slots render label chips that mirror the Figma content.

import { ReasonShell } from "./ReasonShell";
import { ComparisonSubCard } from "./ComparisonSubCard";

const VELT_SURFACES = [
  "Comments",
  "Area Comments",
  "Text Comments",
  "Stream Comments",
  "Popover Comments",
  "Page Comments",
];
const OTHER_SURFACES = ["Comments", "Notifications", "Text Editors", "Realtime APIs"];

const VELT_FRAMEWORKS = [
  "React",
  "Next.js",
  "Vue",
  "Svelte",
  "Angular",
  "JavaScript",
  "HTML",
  "TypeScript",
];

function ChipRow({
  items,
  color,
}: {
  items: string[];
  color: string;
}) {
  return (
    <div
      className="flex flex-wrap items-center justify-center w-full h-full"
      style={{ gap: 14, padding: "20px 8px" }}
    >
      {items.map((label) => (
        <span
          key={label}
          className="font-urbanist font-medium"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 12px",
            borderRadius: 999,
            border: `1px solid ${color}`,
            color,
            fontSize: 16,
            lineHeight: 1.2,
            background: "rgba(255,255,255,0.6)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function ReactOnlyMark() {
  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{ gap: 8 }}
    >
      <svg width="64" height="56" viewBox="0 0 64 56" fill="none" aria-hidden>
        <circle cx="32" cy="28" r="3.5" fill="#df7347" />
        <ellipse cx="32" cy="28" rx="22" ry="9" stroke="#df7347" strokeWidth="2" opacity="0.6" />
        <ellipse cx="32" cy="28" rx="22" ry="9" stroke="#df7347" strokeWidth="2" opacity="0.6" transform="rotate(60 32 28)" />
        <ellipse cx="32" cy="28" rx="22" ry="9" stroke="#df7347" strokeWidth="2" opacity="0.6" transform="rotate(120 32 28)" />
      </svg>
      <span
        className="font-urbanist font-bold"
        style={{ color: "#df7347", fontSize: 32, letterSpacing: "-0.02em" }}
      >
        React
      </span>
    </div>
  );
}

export function ProductMaturity() {
  return (
    <ReasonShell
      num={1}
      iconSrc="/images/comparison/tabs/brain.svg"
      heading="Product Maturity"
      subheading="How refined, robust & complete is the SDK?"
    >
      <div className="grid" style={{ gridTemplateColumns: "454px 454px", gap: 22 }}>
        <ComparisonSubCard
          variant="velt"
          title="25+ Functional Features"
          subtitle="Enhanced by 1000+ little features innovated over three years of development"
        >
          <ChipRow items={VELT_SURFACES} color="#5693d0" />
        </ComparisonSubCard>
        <ComparisonSubCard
          variant="other"
          title="3 Basic Feature + API"
          subtitle="Bare bones functionality created over the past 6 months"
        >
          <ChipRow items={OTHER_SURFACES} color="#df7347" />
        </ComparisonSubCard>

        <ComparisonSubCard
          variant="velt"
          title="All Frameworks"
          subtitle="Enhanced by 1000+ little features innovated over three years of development"
        >
          <ChipRow items={VELT_FRAMEWORKS} color="#5693d0" />
        </ComparisonSubCard>
        <ComparisonSubCard
          variant="other"
          title="Just React"
          subtitle="Bare bones functionality created over the past 6 months"
        >
          <ReactOnlyMark />
        </ComparisonSubCard>
      </div>
    </ReasonShell>
  );
}
