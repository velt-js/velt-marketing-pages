// Reason 6 — Figma node 180:79646. Support channel comparison:
//   Velt:  "Dedicated Slack Channels" with avatar image
//   Other: "Email Support" with mail icon image

import { ReasonShell } from "./ReasonShell";
import { ComparisonSubCard } from "./ComparisonSubCard";
import { Media } from "../Media";

export function Support() {
  return (
    <ReasonShell
      num={6}
      iconSrc="/images/comparison/tabs/headset.svg"
      heading="Support"
      subheading="How refined, robust & complete is the SDK?"
    >
      <div className="grid" style={{ gridTemplateColumns: "454px 454px", gap: 22 }}>
        <ComparisonSubCard
          variant="velt"
          title="Dedicated Slack Channels"
          subtitle="Connect to our team for smooth onboarding"
          mediaHeight={266}
        >
          <Media
            kind="image"
            src="/images/comparison/sections/support-slack.png"
            alt="Dedicated Slack channel support with direct team access"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </ComparisonSubCard>
        <ComparisonSubCard
          variant="other"
          title="Email Support"
          subtitle="Email support with no certainty"
          mediaHeight={266}
        >
          <Media
            kind="image"
            src="/images/comparison/sections/support-email.png"
            alt="Email-only support"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </ComparisonSubCard>
      </div>
    </ReasonShell>
  );
}
