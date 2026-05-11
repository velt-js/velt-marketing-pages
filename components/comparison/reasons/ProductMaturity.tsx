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

function CompetitorFeaturesMarquee() {
  const src = "/images/comparison/sections/features-competitor.svg";
  const imgStyle = { height: 56, flexShrink: 0, marginRight: 56 } as const;
  return (
    <div
      className="flex items-center w-full h-full"
      style={{ overflow: "hidden", position: "relative", transform: "scale(1.5)" }}
    >
      <style>{`
        @keyframes comparison-competitor-features-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          animation: "comparison-competitor-features-marquee 12s linear infinite",
          willChange: "transform",
        }}
      >
        <img src={src} alt="" style={imgStyle} />
        <img src={src} alt="" style={imgStyle} />
        <img src={src} alt="" style={imgStyle} />
        <img src={src} alt="" style={imgStyle} />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, #fff6f5 0%, transparent 12%, transparent 88%, #fff6f5 100%)",
        }}
      />
    </div>
  );
}

function FeaturesMarquee() {
  const src = "/images/comparison/sections/features-velt.svg";
  const imgStyle = { height: 56, flexShrink: 0, marginRight: 56 } as const;
  return (
    <div
      className="flex items-center w-full h-full"
      style={{ overflow: "hidden", position: "relative", transform: "scale(8)" }}
    >
      <style>{`
        @keyframes comparison-features-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          animation: "comparison-features-marquee 30s linear infinite",
          willChange: "transform",
        }}
      >
        <img src={src} alt="" style={imgStyle} />
        <img src={src} alt="" style={imgStyle} />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, #f5faff 0%, transparent 12%, transparent 88%, #f5faff 100%)",
        }}
      />
    </div>
  );
}

function FrameworkMarquee() {
  const src = "/images/comparison/sections/frameworks.svg";
  const imgStyle = { height: 56, flexShrink: 0, marginRight: 56 } as const;
  return (
    <div
      className="flex items-center w-full h-full"
      style={{ overflow: "hidden", position: "relative" }}
    >
      <style>{`
        @keyframes comparison-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-25%); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          animation: "comparison-marquee 12s linear infinite",
          willChange: "transform",
        }}
      >
        <img src={src} alt="" style={imgStyle} />
        <img src={src} alt="" style={imgStyle} />
        <img src={src} alt="" style={imgStyle} />
        <img src={src} alt="" style={imgStyle} />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, #f5faff 0%, transparent 12%, transparent 88%, #f5faff 100%)",
        }}
      />
    </div>
  );
}

function ReactOnlyMark() {
  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{ gap: 8 }}
    >
      <svg style={{ transform: "scale(1.5)" }} width="64" height="56" viewBox="0 0 64 56" fill="none" aria-hidden>
        <circle cx="32" cy="28" r="3.5" fill="#df7347" />
        <ellipse cx="32" cy="28" rx="22" ry="9" stroke="#df7347" strokeWidth="2" opacity="0.6" />
        <ellipse cx="32" cy="28" rx="22" ry="9" stroke="#df7347" strokeWidth="2" opacity="0.6" transform="rotate(60 32 28)" />
        <ellipse cx="32" cy="28" rx="22" ry="9" stroke="#df7347" strokeWidth="2" opacity="0.6" transform="rotate(120 32 28)" />
      </svg>
      <span
        className="font-urbanist font-bold"
        style={{ color: "#df7347", fontSize: 32, letterSpacing: "-0.02em" }}
      >
      </span>
    </div>
  );
}

export type ProductMaturityProps = {
  /** Override the orange "COMPETITOR" badge label on the right-hand cards
   *  (e.g. pass "LIVEBLOCKS" on /liveblocks-alternative). */
  competitorLabel?: string;
  /** Override the bare-bones-functionality subtitle on competitor cards. */
  competitorBareBonesSubtitle?: string;
  /** Override the "Just React" framework competitor subtitle. */
  competitorJustReactSubtitle?: string;
};

export function ProductMaturity({
  competitorLabel,
  competitorBareBonesSubtitle = "Bare bones functionality created over the past 6 months",
  competitorJustReactSubtitle = "Bare bones functionality created over the past 6 months",
}: ProductMaturityProps = {}) {
  return (
    <ReasonShell
      num={1}
      iconSrc="/images/comparison/tabs/brain.svg"
      heading="Product Maturity"
      subheading="How refined, robust & complete is the SDK?"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full" style={{ gap: 22 }}>
        <ComparisonSubCard
          variant="velt"
          title="25+ Functional Features"
          subtitle="Enhanced by 1000+ little features innovated over three years of development"
        >
          <FeaturesMarquee />
        </ComparisonSubCard>
        <ComparisonSubCard
          variant="other"
          title="3 Basic Feature + API"
          subtitle={competitorBareBonesSubtitle}
          badgeLabel={competitorLabel}
        >
          <CompetitorFeaturesMarquee />
        </ComparisonSubCard>

        <ComparisonSubCard
          variant="velt"
          title="All Frameworks"
          subtitle="Enhanced by 1000+ little features innovated over three years of development"
        >
          <FrameworkMarquee />
        </ComparisonSubCard>
        <ComparisonSubCard
          variant="other"
          title="Just React"
          subtitle={competitorJustReactSubtitle}
          badgeLabel={competitorLabel}
        >
          <ReactOnlyMark />
        </ComparisonSubCard>
      </div>
    </ReasonShell>
  );
}
