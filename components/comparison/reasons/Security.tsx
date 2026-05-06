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

function HostToggle() {
  return (
    <div className="relative w-full h-full">
      <span
        style={{
          position: "absolute",
          top: 12,
          right: 0,
          fontFamily: "Fira Code, monospace",
          color: "#b9d3ed",
          fontSize: 14,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Choose Database
      </span>
      <div
        className="flex items-center"
        style={{
          gap: 15,
          position: "absolute",
          left: "50%",
          top: "55%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Chip variant="velt" active label="SELF" icon={<CloudIcon />} />
        <Chip variant="velt" label="VELT" icon={<RedHatIcon />} />
      </div>
    </div>
  );
}

function NoHostGlyph() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="#df7347" strokeWidth="1.5" />
        <path d="M12 3v18a9 9 0 0 0 0-18z" fill="#df7347" />
      </svg>
    </div>
  );
}

function ShieldRing({ color }: { color: string }) {
  // Concentric ring of dots (mirrors the imgGroup1707479566 / 1707479567
  // images — a circular GDPR-style ring) with a center filled circle.
  return (
    <svg width="174" height="174" viewBox="0 0 174 174" aria-hidden style={{ overflow: "visible" }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 70;
        const cx = 87 + Math.cos(angle) * r;
        const cy = 87 + Math.sin(angle) * r;
        return (
          <circle key={i} cx={cx} cy={cy} r="6" fill={color} opacity="0.25" />
        );
      })}
      <circle cx="87" cy="87" r="50" fill={color} opacity="0.08" />
    </svg>
  );
}

function GDPRMark({ accent }: { accent: "velt" | "other" }) {
  const ringColor = accent === "velt" ? "#065cc0" : "#df7347";
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <ShieldRing color={ringColor} />
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: "calc(50% - 50px)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: ringColor,
        }}
      >
        {accent === "velt" ? (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12.5l4 4 10-10"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

function SOCAndHIPAA() {
  return (
    <div
      className="relative w-full h-full flex items-center"
      style={{ gap: 8, justifyContent: "center" }}
    >
      <SOC2Shield />
      <HIPAABadge />
    </div>
  );
}

function SOC2Shield() {
  // Stylized AICPA SOC 2 TYPE 2 shield. Solid blue body with white type stack.
  return (
    <svg width="142" height="158" viewBox="0 0 142 158" aria-hidden>
      <defs>
        <linearGradient id="socShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f5fc6" />
          <stop offset="100%" stopColor="#053a87" />
        </linearGradient>
      </defs>
      <path
        d="M71 4 L138 28 V92 C138 124 105 148 71 156 C37 148 4 124 4 92 V28 Z"
        fill="url(#socShield)"
      />
      <text x="71" y="42" textAnchor="middle" fill="#fff" fontFamily="Urbanist, sans-serif" fontWeight="700" fontSize="11" letterSpacing="2.5" opacity="0.75">AICPA</text>
      <text x="71" y="92" textAnchor="middle" fill="#fff" fontFamily="Urbanist, sans-serif" fontWeight="700" fontSize="32" letterSpacing="-0.5">TYPE 2</text>
      <text x="71" y="124" textAnchor="middle" fill="#fff" fontFamily="Urbanist, sans-serif" fontWeight="700" fontSize="11" letterSpacing="2.5">SOC 2</text>
    </svg>
  );
}

function HIPAABadge() {
  return (
    <svg width="141" height="141" viewBox="0 0 141 141" aria-hidden>
      <circle cx="70.5" cy="70.5" r="65" fill="#fff" stroke="#1f2a44" strokeWidth="1.5" />
      <text
        x="70.5"
        y="62"
        textAnchor="middle"
        fill="#1f2a44"
        fontFamily="Urbanist, sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="-0.02em"
      >
        HIPAA
      </text>
      <text
        x="70.5"
        y="84"
        textAnchor="middle"
        fill="#1f2a44"
        fontFamily="Urbanist, sans-serif"
        fontWeight="500"
        fontSize="9"
        letterSpacing="0.15em"
      >
        COMPLIANT
      </text>
      <circle cx="70.5" cy="105" r="6" fill="#10b981" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="50" height="50" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6 18a4 4 0 0 1 0-8 6 6 0 0 1 11-2 4 4 0 0 1 1 8H6z" />
      <path d="M12 14v4" strokeLinecap="round" />
      <path d="M9.5 16.5l2.5 2.5 2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RedHatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="50" height="50" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 16c0-3.5 4-8 9-8s9 4.5 9 8H3z" />
      <path d="M3 16h18v3H3z" />
      <circle cx="8" cy="13" r="0.8" fill="currentColor" />
    </svg>
  );
}

function Chip({
  variant,
  active = false,
  label,
  icon,
}: {
  variant: "velt" | "other";
  active?: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  const ACCENT = variant === "velt" ? "#5693d0" : "#ff4d00";
  const MUTED = variant === "velt" ? "#b9d3ed" : "#ffc3ab";
  const BG = variant === "velt" ? "#f5faff" : "#fff6f5";
  return (
    <div
      style={{
        position: "relative",
        background: BG,
        border: active ? `1.875px solid ${ACCENT}` : undefined,
        borderRadius: 15,
        padding: 30,
        boxShadow: active ? `0 0 0 2.5px ${ACCENT}25` : undefined,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 15,
        width: 130,
      }}
    >
      {active ? (
        <span
          style={{
            position: "absolute",
            top: -6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: `9px solid ${ACCENT}`,
          }}
        />
      ) : null}
      <span
        style={{ width: 50, height: 50, color: active ? ACCENT : MUTED }}
        aria-hidden
      >
        {icon}
      </span>
      <span
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "0.05em",
          color: active ? ACCENT : MUTED,
        }}
      >
        {label}
      </span>
    </div>
  );
}

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
            <SOCAndHIPAA />
          </ComparisonSubCard>
          <ComparisonSubCard
            variant="other"
            title="SOC II & HIPAA Compliant"
            subtitle="Meets base compliance requirements"
            mediaHeight={266}
          >
            <SOCAndHIPAA />
          </ComparisonSubCard>
        </div>
      </div>
    </ReasonShell>
  );
}
