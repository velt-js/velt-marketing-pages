// Bento card UI — task management status pills.
// Two rows: priority flags (P0/P1/P2) and status chips (Open / In Progress / Completed).

export function TaskStatusPillsUi() {
  return (
    <div
      className="absolute flex flex-col"
      style={{
        top: 80,
        left: 60,
        right: 60,
        gap: 24,
        alignItems: "flex-end",
      }}
      aria-hidden
    >
      <div className="flex items-center" style={{ gap: 16 }}>
        <FlagPill label="P0" tint="#FFE7E0" stroke="#FF7162" />
        <FlagPill label="P1" tint="#FFF6D6" stroke="#FFCD2E" />
        <FlagPill label="P2" tint="#EEEEEE" stroke="#A8A8A8" muted />
      </div>
      <div className="flex items-center" style={{ gap: 16 }}>
        <StatusPill icon="○" label="Open" tint="#EBE9FF" stroke="#625DF5" />
        <StatusPill icon="◔" label="In Progress" tint="#FFF6D6" stroke="#FFCD2E" />
        <StatusPill icon="✓" label="Completed" tint="#DDF7E7" stroke="#0D9A5D" />
      </div>
    </div>
  );
}

function FlagPill({
  label,
  tint,
  stroke,
  muted = false,
}: {
  label: string;
  tint: string;
  stroke: string;
  muted?: boolean;
}) {
  return (
    <div
      className="flex items-center"
      style={{
        height: 40,
        padding: "0 16px",
        gap: 8,
        background: tint,
        border: `1.5px solid ${muted ? stroke : stroke}`,
        borderRadius: 999,
        opacity: muted ? 0.6 : 1,
      }}
    >
      <span style={{ fontSize: 14, color: stroke }} aria-hidden>
        🚩
      </span>
      <span
        className="font-urbanist font-bold"
        style={{ fontSize: 16, color: muted ? "#6F6F6F" : stroke, letterSpacing: "-0.01em" }}
      >
        {label}
      </span>
    </div>
  );
}

function StatusPill({
  icon,
  label,
  tint,
  stroke,
}: {
  icon: string;
  label: string;
  tint: string;
  stroke: string;
}) {
  return (
    <div
      className="flex items-center"
      style={{
        height: 40,
        padding: "0 16px",
        gap: 8,
        background: tint,
        border: `1.5px solid ${stroke}`,
        borderRadius: 999,
      }}
    >
      <span style={{ fontSize: 14, color: stroke, fontWeight: 700 }} aria-hidden>
        {icon}
      </span>
      <span
        className="font-urbanist font-semibold"
        style={{ fontSize: 14, color: stroke, letterSpacing: "-0.01em" }}
      >
        {label}
      </span>
    </div>
  );
}
