// Reason 3 — Figma node 180:79444. Storage/bandwidth scaling chart:
//   Velt:  ramping bar chart up to 2TB / "Engineered for scalable products"
//   Other: capped at 8GB with warning / "Made for side projects"

import { ReasonShell } from "./ReasonShell";
import { ComparisonSubCard } from "./ComparisonSubCard";
import { Media } from "../Media";

const VIDEO_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
} as const;

export function Scalability() {
  return (
    <ReasonShell
      num={3}
      iconSrc="/images/comparison/tabs/dashboard.svg"
      heading="Scalability"
      subheading="How the SDK handles growth in usage?"
    >
      <div className="grid" style={{ gridTemplateColumns: "454px 454px", gap: 22 }}>
        <ComparisonSubCard
          variant="velt"
          title="2000 GB Base Plan"
          subtitle="Never worry about hitting the upper limit"
          mediaHeight={266}
        >
          <Media
            kind="video"
            src="/videos/comparison/scalability-velt.mp4"
            style={VIDEO_STYLE}
          />
        </ComparisonSubCard>
        <ComparisonSubCard
          variant="other"
          title="8 GB Base Plan"
          subtitle="Quickly exhaust the usage limit as you grow"
          mediaHeight={266}
        >
          <Media
            kind="video"
            src="/videos/comparison/scalability-competitor.mp4"
            style={VIDEO_STYLE}
          />
        </ComparisonSubCard>
      </div>
    </ReasonShell>
  );
}
