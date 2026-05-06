// Way 3 — Figma node 294:24466. Code editor + UI panel split.
//
// Left column: 4-line `<div>` + `<VeltData path="…"/>` snippet rendered
// in Fira Code with the same syntax highlighting Figma uses.
// Right column: bordered "<div>" mock card with two rows that show
// how the bound values (comment.status / custom.channels) actually
// render at runtime. Vertical divider between the two halves.

import { CustomizationCard } from "../CustomizationCard";

const FIRA = "Fira Code, ui-monospace, monospace";

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#625df5" strokeWidth="1.6" />
      <path
        d="M12 7v5l3 2"
        stroke="#625df5"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown({ color = "#625df5" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CodeLine({
  num,
  children,
}: {
  num: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline" style={{ gap: 16, paddingLeft: 8 }}>
      <span
        style={{
          fontFamily: FIRA,
          fontSize: 14,
          fontWeight: 500,
          color: "#000",
          opacity: 0.16,
          width: 16,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {num}.
      </span>
      <span
        style={{
          fontFamily: FIRA,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.6,
          whiteSpace: "pre",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function VeltDataLine({ value }: { value: string }) {
  // Reproduces the per-token coloring for ` <VeltData path="…"/>`.
  const ANGLE = "rgba(52,106,243,0.32)";
  const VELT = "#346af3";
  const ATTR = "#f37434";
  const ATTR_PUNC = "rgba(243,116,52,0.32)";
  const VAL = "#b54912";
  return (
    <>
      <span style={{ color: ANGLE }}>{" <"}</span>
      <span style={{ color: VELT }}>VeltData </span>
      <span style={{ color: ATTR }}>path</span>
      <span style={{ color: ATTR_PUNC }}>{`=“`}</span>
      <span style={{ color: VAL }}>{value}</span>
      <span style={{ color: ATTR_PUNC }}>{`”`}</span>
      <span style={{ color: ANGLE }}>{`/>`}</span>
    </>
  );
}

function DivLine({ closing = false }: { closing?: boolean }) {
  const BRACKET = "rgba(183,100,68,0.32)";
  const TAG = "#b76444";
  return (
    <>
      <span style={{ color: BRACKET }}>{closing ? "</" : "<"}</span>
      <span style={{ color: TAG }}>div</span>
      <span style={{ color: BRACKET }}>{">"}</span>
    </>
  );
}

function TemplateVariablesVisual() {
  return (
    <div
      className="relative bg-white"
      style={{ width: "100%", height: "100%" }}
    >
      {/* App.tsx header */}
      <div
        className="absolute flex items-center"
        style={{
          left: 16,
          top: 22,
          gap: 12,
          fontFamily: FIRA,
          fontSize: 14,
          fontWeight: 500,
          color: "#000",
          opacity: 0.16,
        }}
      >
        <span>{"//"}</span>
        <span>App.tsx</span>
      </div>

      {/* Code editor (left) */}
      <div
        className="absolute flex flex-col items-start"
        style={{ left: 8, top: 64, width: "44%", gap: 14 }}
      >
        <CodeLine num={1}>
          <DivLine />
        </CodeLine>
        <CodeLine num={2}>
          <VeltDataLine value="comment.status" />
        </CodeLine>
        <CodeLine num={3}>
          <VeltDataLine value="custom.channels" />
        </CodeLine>
        <CodeLine num={4}>
          <DivLine closing />
        </CodeLine>
      </div>

      {/* Vertical divider */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 12,
          bottom: 12,
          width: 1,
          background: "#eef0ff",
        }}
      />

      {/* UI panel (right) — bordered "<div>" mock card */}
      <div
        className="absolute"
        style={{
          left: "calc(50% + 24px)",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          border: "0.5px solid #3f5bea",
          borderRadius: 8,
          overflow: "hidden",
          padding: 16,
          paddingTop: 38,
        }}
      >
        {/* "<div>" pill in top-left of the bordered card */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            padding: "4px 10px",
            background: "#3f5bea",
            color: "#fff",
            fontFamily: FIRA,
            fontSize: 12,
            fontWeight: 500,
            borderRadius: 6,
          }}
        >
          {"<div>"}
        </div>

        <div className="flex flex-col" style={{ gap: 10 }}>
          {/* Row 1: Open status + comment.status badge */}
          <div
            className="flex items-center justify-between"
            style={{
              padding: 6,
              borderRadius: 12,
              border: "0.5px solid rgba(63,91,234,0.24)",
            }}
          >
            <span
              className="flex items-center"
              style={{
                gap: 4,
                padding: "3px 8px 3px 8px",
                background: "#e7e8fa",
                borderRadius: 24,
              }}
            >
              <ClockIcon />
              <span
                style={{
                  fontFamily: "Poppins, system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#625df5",
                  whiteSpace: "nowrap",
                }}
              >
                Open
              </span>
              <ChevronDown />
            </span>
            <span
              style={{
                padding: "3px 6px",
                background: "#e2f1ff",
                color: "#0371d7",
                fontFamily: FIRA,
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 6,
                whiteSpace: "nowrap",
              }}
            >
              comment.status
            </span>
          </div>

          {/* Row 2: #channel + custom.channels badge */}
          <div
            className="flex items-center justify-between"
            style={{
              padding: 6,
              borderRadius: 12,
              border: "0.5px solid rgba(63,91,234,0.24)",
            }}
          >
            <span
              className="flex items-center"
              style={{
                gap: 4,
                padding: "3px 8px",
                background: "#f4f5f6",
                borderRadius: 24,
              }}
            >
              <span
                style={{
                  fontFamily: "Poppins, system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#777e90",
                  whiteSpace: "nowrap",
                }}
              >
                #channel
              </span>
              <ChevronDown color="#777e90" />
            </span>
            <span
              style={{
                padding: "3px 6px",
                background: "rgba(3,215,88,0.12)",
                color: "#04994a",
                fontFamily: FIRA,
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 6,
                whiteSpace: "nowrap",
              }}
            >
              custom.channels
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplateVariables() {
  return (
    <CustomizationCard
      num={3}
      height={604}
      heading="Template Variables & Custom Data"
      subheading="Use your own data along with ours in wireframes"
      visual={<TemplateVariablesVisual />}
    />
  );
}
