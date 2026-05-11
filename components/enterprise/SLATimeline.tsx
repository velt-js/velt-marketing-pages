// Priority Support SLAs timeline. Renders as a vertical flow on mobile
// (matches velt.dev/enterprise mobile) and a horizontal flow on lg+
// (matches the live desktop design). Replaces the previous static
// /images/enterprise/support/slas.png so the orientation can flip
// responsively.

const STEPS = [
  {
    color: "#E5503C",
    time: "10:52 AM",
    label: "Issue Raised",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <line x1="12" y1="6" x2="12" y2="14" />
        <line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    ),
  },
  {
    color: "#3478F6",
    time: "11:05 AM",
    label: "Engineer Assigned",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.6 7.2" />
      </svg>
    ),
  },
  {
    color: "#1FAE6A",
    time: "11:35 AM",
    label: "Solution Provided",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="5 13 9 17 14 11" />
        <polyline points="11 13 15 17 20 11" />
      </svg>
    ),
  },
];

const LABEL_STYLE: React.CSSProperties = {
  color: "#111",
  fontSize: 16,
  fontWeight: 700,
  letterSpacing: "-0.01em",
};

const TIME_STYLE: React.CSSProperties = {
  color: "#9b9b9b",
  fontSize: 13,
  fontFamily: "'Geist Mono', 'Fira Mono', monospace",
  letterSpacing: "0.5px",
};

function Bullet({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: color,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Vertical timeline (mobile / below `lg`). Bullets on the left, label +
 * time stacked to the right of each bullet. Connecting line uses a
 * red → blue → green linear gradient that crosses the bullet centers.
 */
function VerticalTimeline() {
  return (
    <div className="flex lg:hidden flex-col w-full" style={{ maxWidth: 360, gap: 28, position: "relative" }}>
      {/* Connector line — sits behind the bullets, vertically centered
          on the left column. Gradient threads through all three colors. */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 12,
          top: 13,
          bottom: 13,
          width: 2,
          background: "linear-gradient(to bottom, #E5503C 0%, #3478F6 50%, #1FAE6A 100%)",
          zIndex: 0,
        }}
      />
      {STEPS.map((step) => (
        <div
          key={step.label}
          className="flex items-center"
          style={{ gap: 16, position: "relative", zIndex: 1 }}
        >
          <Bullet color={step.color}>{step.icon}</Bullet>
          <div className="flex items-center justify-between" style={{ flex: 1, gap: 12 }}>
            <span style={LABEL_STYLE}>{step.label}</span>
            <span style={TIME_STYLE}>{step.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Horizontal timeline (desktop / `lg+`). Bullets in a row, label below
 * each bullet, time below label. Connecting line threads horizontally
 * through the bullet centers with the same red → blue → green gradient.
 */
function HorizontalTimeline() {
  return (
    <div
      className="hidden lg:flex w-full items-start justify-between"
      style={{ maxWidth: 720, position: "relative", padding: "0 8px" }}
    >
      {/* Horizontal connector behind the bullets. */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 12,
          left: "12%",
          right: "12%",
          height: 2,
          background: "linear-gradient(to right, #E5503C 0%, #3478F6 50%, #1FAE6A 100%)",
          zIndex: 0,
        }}
      />
      {STEPS.map((step) => (
        <div
          key={step.label}
          className="flex flex-col items-center"
          style={{ gap: 14, position: "relative", zIndex: 1, minWidth: 0 }}
        >
          <Bullet color={step.color}>{step.icon}</Bullet>
          <div className="flex flex-col items-center" style={{ gap: 4 }}>
            <span style={LABEL_STYLE}>{step.label}</span>
            <span style={TIME_STYLE}>{step.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Composite — renders both variants; CSS visibility selects which one
 * shows at the current breakpoint. Keeps the SSR markup identical
 * across viewport widths so there's no hydration mismatch.
 *
 * @returns A responsive timeline composed of three status bullets.
 */
export function SLATimeline() {
  try {
    return (
      <>
        <VerticalTimeline />
        <HorizontalTimeline />
      </>
    );
  } catch {
    return null;
  }
}
