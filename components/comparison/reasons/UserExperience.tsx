// Reason 4 — Figma node 180:79592. Comment thread polish comparison:
//   Velt:  rounded marker + reply card / "Magical Delight for each pixel"
//   Other: same layout but bug-styled outline / "Primitive Experience"

import { ReasonShell } from "./ReasonShell";
import { ComparisonSubCard } from "./ComparisonSubCard";
import { Media } from "../Media";

const VIDEO_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
} as const;

export type UserExperienceProps = {
  /** Override the orange "COMPETITOR" badge label (e.g. "LIVEBLOCKS"). */
  competitorLabel?: string;
  /** Override the competitor subtitle copy. */
  competitorSubtitle?: string;
};

export function UserExperience({
  competitorLabel,
  competitorSubtitle = "Resize Buggy for Liveblock",
}: UserExperienceProps = {}) {
  return (
    <ReasonShell
      num={4}
      iconSrc="/images/comparison/tabs/click.svg"
      heading="User Experience"
      subheading="How refined, robust & complete is the SDK?"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full" style={{ gap: 22 }}>
        <ComparisonSubCard
          variant="velt"
          title="Magical Delight for each pixel"
          subtitle="Smooth experience through and through"
          mediaHeight={266}
        >
          <Media
            kind="video"
            src="/videos/comparison/experience-velt.mp4"
            style={VIDEO_STYLE}
          />
        </ComparisonSubCard>
        <ComparisonSubCard
          variant="other"
          title="Primitive Experience"
          subtitle={competitorSubtitle}
          mediaHeight={266}
          badgeLabel={competitorLabel}
        >
          <Media
            kind="video"
            src="/videos/comparison/experience-competitor.mp4"
            style={VIDEO_STYLE}
          />
        </ComparisonSubCard>
      </div>
    </ReasonShell>
  );
}
