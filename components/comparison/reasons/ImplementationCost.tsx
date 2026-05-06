// Reason 2 — Figma node 180:79250. Three stacked rows of comparison cards:
//   Row 1: Architecture (Velt: full UX/Logic/API/Backend stack vs Other:
//           strikethrough UX/Logic, only API+Backend)
//   Row 2: INTERN-suffices vs SENIOR-required difficulty
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

function ArchitectureDiagram({ partial = false }: { partial?: boolean }) {
  // Four corner labels (UX top-left, Logic top-right, API bottom-left,
  // Backend bottom-right) connected by curved arrows around a central
  // node. `partial` strikes out UX and Logic and recolors to competitor.
  const stroke = partial ? "#ff4d00" : "#0085ff";
  const strikeStyle = partial
    ? { textDecoration: "line-through", opacity: 0.3 }
    : {};
  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 320 240"
        width="100%"
        height="100%"
        fill="none"
        style={{ position: "absolute", inset: 0 }}
        aria-hidden
      >
        <circle cx="160" cy="120" r="34" stroke={stroke} strokeWidth="1.5" opacity="0.4" />
        <circle cx="160" cy="120" r="20" fill={stroke} opacity="0.12" />
        <path
          d="M50 50 C 90 60, 130 80, 160 110"
          stroke={stroke}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M270 50 C 230 60, 190 80, 160 110"
          stroke={stroke}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M50 190 C 90 180, 130 160, 160 130"
          stroke={stroke}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M270 190 C 230 180, 190 160, 160 130"
          stroke={stroke}
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </svg>
      <span
        style={{
          position: "absolute",
          top: 36,
          left: 26,
          fontFamily: "Space Mono, monospace",
          color: stroke,
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: partial ? 400 : 700,
          ...strikeStyle,
        }}
      >
        UX
      </span>
      <span
        style={{
          position: "absolute",
          top: 36,
          right: 26,
          fontFamily: "Space Mono, monospace",
          color: stroke,
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: partial ? 400 : 700,
          ...strikeStyle,
        }}
      >
        Logic
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 36,
          left: 26,
          fontFamily: "Space Mono, monospace",
          color: stroke,
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 400,
        }}
      >
        API
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 36,
          right: 26,
          fontFamily: "Space Mono, monospace",
          color: stroke,
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 400,
        }}
      >
        Backend
      </span>
    </div>
  );
}

function DifficultyChips({
  selected,
  variant,
}: {
  selected: "intern" | "senior";
  variant: "velt" | "other";
}) {
  const ACCENT = variant === "velt" ? "#5693d0" : "#ff4d00";
  const MUTED = variant === "velt" ? "#b9d3ed" : "#ffc3ab";
  const BG = variant === "velt" ? "#f5faff" : "#fff6f5";
  const Chip = ({
    label,
    icon,
    active,
  }: {
    label: string;
    icon: React.ReactNode;
    active: boolean;
  }) => (
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
        opacity: active ? 1 : 1,
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
      <span style={{ width: 50, height: 50, color: active ? ACCENT : MUTED }}>
        {icon}
      </span>
      <span
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "0.05em",
          color: active ? ACCENT : MUTED,
          opacity: !active && variant === "other" ? 0.3 : 1,
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="relative w-full h-full">
      <span
        style={{
          position: "absolute",
          top: 12,
          right: 0,
          fontFamily: "Fira Code, monospace",
          color: MUTED,
          fontSize: 14,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Select Difficulty
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
        <Chip
          label="INTERN"
          active={selected === "intern"}
          icon={<DatabaseSmile />}
        />
        <Chip
          label="SENIOR"
          active={selected === "senior"}
          icon={<RedHat />}
        />
      </div>
    </div>
  );
}

function DatabaseSmile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="50" height="50" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      <path d="M9 14a3 3 0 0 0 6 0" strokeLinecap="round" />
    </svg>
  );
}

function RedHat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="50" height="50" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 16c0-3.5 4-8 9-8s9 4.5 9 8H3z" />
      <path d="M3 16h18v3H3z" />
      <circle cx="8" cy="13" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function ImplementationCost() {
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
            <ArchitectureDiagram />
          </ComparisonSubCard>
          <ComparisonSubCard
            variant="other"
            title="Partial Solution"
            subtitle="Mainly backend solutions"
            mediaHeight={266}
          >
            <ArchitectureDiagram partial />
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
            <DifficultyChips variant="velt" selected="intern" />
          </ComparisonSubCard>
          <ComparisonSubCard
            variant="other"
            title="Complex integration"
            subtitle="Requires senior engineers"
            mediaHeight={266}
          >
            <DifficultyChips variant="other" selected="senior" />
          </ComparisonSubCard>
        </div>
      </div>
    </ReasonShell>
  );
}
