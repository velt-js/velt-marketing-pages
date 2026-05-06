// Reason 5 — Figma node 180:79677. Three rows of compliance cards:
//   Row 1: Self-hosting (SELF/VELT toggle vs no-self-host icon)
//   Row 2: GDPR APIs (blue shield+check vs orange shield+X)
//   Row 3: SOC 2 / HIPAA badges (Velt has ++ pen testing)

import { ReasonShell } from "./ReasonShell";
import { ComparisonSubCard } from "./ComparisonSubCard";
import { Media } from "../Media";

const VIDEO_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
} as const;

export function Security() {
  return (
    <ReasonShell
      num={5}
      iconSrc="/images/comparison/tabs/lock.svg"
      heading="Security"
      subheading="How refined, robust & complete is the SDK?"
    >
      <div className="flex flex-col" style={{ gap: 22 }}>
        <div className="grid" style={{ gridTemplateColumns: "454px 454px", gap: 22 }}>
          <ComparisonSubCard
            variant="velt"
            title="Option To Self-Host Data"
            subtitle="Keep full control of your sensitive data"
            mediaHeight={266}
          >
            <Media
              kind="video"
              src="/videos/comparison/storage-velt.mp4"
              style={VIDEO_STYLE}
            />
          </ComparisonSubCard>
          <ComparisonSubCard
            variant="other"
            title="No Self-Hosting Option"
            subtitle="Sensitive data must reside in their system"
            mediaHeight={266}
          >
            <Media
              kind="video"
              src="/videos/comparison/storage-competitor.mp4"
              style={VIDEO_STYLE}
            />
          </ComparisonSubCard>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "454px 454px", gap: 22 }}>
          <ComparisonSubCard
            variant="velt"
            title="GDPR APIs"
            subtitle="Built-in compliance with GDPR"
            mediaHeight={266}
          >
            <Media
              kind="video"
              src="/videos/comparison/gdpr-velt.mp4"
              style={VIDEO_STYLE}
            />
          </ComparisonSubCard>
          <ComparisonSubCard
            variant="other"
            title="No GDPR APIs"
            subtitle="Simple UI templates with no logic"
            mediaHeight={266}
          >
            <Media
              kind="video"
              src="/videos/comparison/gdpr-competitor.mp4"
              style={VIDEO_STYLE}
            />
          </ComparisonSubCard>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "454px 454px", gap: 22 }}>
          <ComparisonSubCard
            variant="velt"
            title="SOC II & HIPAA Compliance ++"
            subtitle="Fully compliant plus annual pen testing"
            mediaHeight={266}
          >
            <Media
              kind="image"
              src="/images/comparison/sections/security-velt.png"
              alt="SOC 2 Type 2 and HIPAA compliant badges with annual pen testing"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </ComparisonSubCard>
          <ComparisonSubCard
            variant="other"
            title="SOC II & HIPAA Compliant"
            subtitle="Meets base compliance requirements"
            mediaHeight={266}
          >
            <Media
              kind="image"
              src="/images/comparison/sections/security-competitors.png"
              alt="SOC 2 Type 2 and HIPAA compliant badges - base compliance"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </ComparisonSubCard>
        </div>
      </div>
    </ReasonShell>
  );
}
