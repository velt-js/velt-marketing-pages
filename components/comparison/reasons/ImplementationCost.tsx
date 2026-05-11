// Reason 2 — Figma node 180:79250. Three stacked rows of comparison cards:
//   Row 1: Architecture (Velt: full UX/Logic/API/Backend stack vs Other:
//           strikethrough UX/Logic, only API+Backend)
//   Row 2: Lines-of-code video comparison
//   Row 3: Simple integration (INTERN) vs Complex integration (SENIOR)

import { ReasonShell } from "./ReasonShell";
import { ComparisonSubCard } from "./ComparisonSubCard";
import { Media } from "../Media";

const VIDEO_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
} as const;

export type ImplementationCostProps = {
  /** Override the orange "COMPETITOR" badge label (e.g. "LIVEBLOCKS"). */
  competitorLabel?: string;
};

export function ImplementationCost({
  competitorLabel,
}: ImplementationCostProps = {}) {
  return (
    <ReasonShell
      num={2}
      iconSrc="/images/comparison/tabs/currency-dollar.svg"
      heading="Implementation Cost"
      subheading="Everything involved in integration"
    >
      <div className="flex flex-col" style={{ gap: 22 }}>
        <div className="grid" style={{ gridTemplateColumns: "454px 454px", gap: 22 }}>
          <ComparisonSubCard
            variant="velt"
            title="Complete Architecture"
            subtitle="All layers that are needed for "
            mediaHeight={266}
          >
            <Media
              kind="image"
              src="/images/comparison/sections/complete-architecture.png"
              alt="Velt complete architecture diagram showing UX, Logic, API, and Backend layers"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </ComparisonSubCard>
          <ComparisonSubCard
            variant="other"
            title="Partial Solution"
            subtitle="Mainly backend solutions"
            mediaHeight={266}
            badgeLabel={competitorLabel}
          >
            <Media
              kind="image"
              src="/images/comparison/sections/partial-architecture.png"
              alt="Competitor partial architecture with only API and Backend layers"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </ComparisonSubCard>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "454px 454px", gap: 22 }}>
          <ComparisonSubCard
            variant="velt"
            title="Requires a day to complete"
            subtitle="fully functional experience out of the box, that can be customized to your needs"
            mediaHeight={266}
          >
            <Media
              kind="video"
              src="/videos/comparison/lines-of-code-velt.mp4"
              style={VIDEO_STYLE}
            />
          </ComparisonSubCard>
          <ComparisonSubCard
            variant="other"
            title="Requires weeks to complete"
            subtitle="Requires you to write an excessive amount of code to get the feature working"
            mediaHeight={266}
            badgeLabel={competitorLabel}
          >
            <Media
              kind="video"
              src="/videos/comparison/lines-of-code-competitor.mp4"
              style={VIDEO_STYLE}
            />
          </ComparisonSubCard>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "454px 454px", gap: 22 }}>
          <ComparisonSubCard
            variant="velt"
            title="Simple integration"
            subtitle="So easy that an intern can do it"
            mediaHeight={266}
          >
            <Media
              kind="image"
              src="/images/comparison/sections/simple-integration.png"
              alt="Simple integration - intern level difficulty"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </ComparisonSubCard>
          <ComparisonSubCard
            variant="other"
            title="Complex integration"
            subtitle="Requires senior engineers"
            mediaHeight={266}
            badgeLabel={competitorLabel}
          >
            <Media
              kind="image"
              src="/images/comparison/sections/complex-integration.png"
              alt="Complex integration - requires senior engineers"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </ComparisonSubCard>
        </div>
      </div>
    </ReasonShell>
  );
}
