// Reason 6 — Figma node 180:79646. Support channel comparison:
//   Velt:  "Dedicated Slack Channels" with video-call avatar
//   Other: "Email Support" with mail icon

import { ReasonShell } from "./ReasonShell";
import { ComparisonSubCard } from "./ComparisonSubCard";

function VideoAvatar() {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
    >
      <div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "8px solid #c3e6ff",
          background: "linear-gradient(135deg, #fbd1c3, #d9785d)",
          boxShadow: "0 0 0 4px #f5faff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden>
          <circle cx="100" cy="80" r="36" fill="#5e3a2a" opacity="0.85" />
          <path
            d="M55 200 Q100 130 145 200 L55 200 Z"
            fill="#3e2418"
            opacity="0.9"
          />
          <rect x="60" y="68" width="80" height="14" rx="6" fill="#222" />
          <circle cx="76" cy="75" r="8" fill="#0f0" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
}

function MailGlyph() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2"
          stroke="#df7347"
          strokeWidth="1.5"
        />
        <path
          d="M3 7l9 7 9-7"
          stroke="#df7347"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

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
          <VideoAvatar />
        </ComparisonSubCard>
        <ComparisonSubCard
          variant="other"
          title="Email Support"
          subtitle="Email support with no certainty"
          mediaHeight={266}
        >
          <MailGlyph />
        </ComparisonSubCard>
      </div>
    </ReasonShell>
  );
}
