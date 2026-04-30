// Bento card UI — Figma 93:10527 → Task Management cell (top-right).
// Two pill rows positioned so the right side overflows the cell edge:
//  - Priority row: P0 (red), P1 (yellow), P2 (gray) — flag icon + label
//  - Status row: Open (purple-tint), In Progress (yellow solid), Completed (green solid)
// "Completed" is partially clipped by the cell's overflow:hidden, matching Figma.

export function TaskPillsLarge() {
  return (
    <div
      className="absolute"
      style={{
        left: 86,
        top: 64,
        display: "flex",
        flexDirection: "column",
        gap: 30,
        // Wider than the 639 cell so the bottom row clips on the right.
        width: 750,
      }}
      aria-hidden
    >
      {/* Priority row */}
      <div className="flex items-center" style={{ gap: 22 }}>
        <PriorityPill label="P0" textColor="#ff7162" tint="rgba(255,113,98,0.08)" />
        <PriorityPill label="P1" textColor="#e2a600" tint="rgba(255,205,46,0.12)" />
        <PriorityPill label="P2" textColor="#909090" tint="rgba(204,204,204,0.12)" muted />
      </div>

      {/* Status row */}
      <div className="flex items-center" style={{ gap: 23 }}>
        <StatusPill
          label="Open"
          textColor="#625df5"
          background="rgba(98,93,245,0.08)"
          icon={<RingIcon stroke="#625df5" />}
        />
        <StatusPill
          label="In Progress"
          textColor="#474747"
          background="#ffcd2e"
          icon={<HalfRingIcon stroke="#474747" />}
        />
        <StatusPill
          label="Completed"
          textColor="#ffffff"
          background="#198f65"
          icon={<CheckRingIcon stroke="#ffffff" />}
        />
      </div>
    </div>
  );
}

function PriorityPill({
  label,
  textColor,
  tint,
  muted = false,
}: {
  label: string;
  textColor: string;
  tint: string;
  muted?: boolean;
}) {
  return (
    <div
      className="flex items-center"
      style={{
        background: tint,
        padding: "14px 19px",
        borderRadius: 24,
        gap: 9,
      }}
    >
      <FlagIcon stroke={muted ? "#909090" : textColor} />
      <span
        className="font-urbanist"
        style={{
          color: textColor,
          fontSize: 28,
          fontWeight: 600,
          lineHeight: 1.1,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function StatusPill({
  label,
  textColor,
  background,
  icon,
}: {
  label: string;
  textColor: string;
  background: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center shrink-0"
      style={{
        background,
        paddingLeft: 19,
        paddingRight: 24,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 24,
        gap: 10,
      }}
    >
      {icon}
      <span
        className="font-urbanist"
        style={{
          color: textColor,
          fontSize: 28,
          fontWeight: 500,
          lineHeight: 1.1,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function FlagIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 21V4a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707 1.707L15 8l3.293 3.293A1 1 0 0 1 17.586 13H5" />
    </svg>
  );
}
function RingIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
function HalfRingIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 v 5 l 3 2" />
    </svg>
  );
}
function CheckRingIcon({ stroke }: { stroke: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}
