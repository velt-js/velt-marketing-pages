"use client";

// Dark analytics panel directly under the admin-console hero. Mirrors
// Figma node 176:29295 in HqWIZdR6ISJmaG2n4o3gr8 — a 1280-wide
// rounded gradient panel with 4 tabs (Analytics / AI Chat / Debugger /
// Data) and a different mockup body per tab. Fully DOM-rebuilt for
// sharpness at any zoom (matches the activity-logs precedent).
//
// Slug-conditional in app/(features)/[slug]/page.tsx — only rendered
// when the slug is "admin-console".

import { useState } from "react";

type TabKey = "analytics" | "aiChat" | "debugger" | "data";

const TAB_DEFS: { key: TabKey; label: string }[] = [
  { key: "analytics", label: "Analytics" },
  { key: "aiChat", label: "AI Chat" },
  { key: "debugger", label: "Debugger" },
  { key: "data", label: "Data" },
];

const HEADING_GRADIENT = {
  backgroundImage:
    "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 240, 124) 25.481%, rgb(240, 69, 255) 52.404%, rgb(103, 232, 255) 85.096%)",
  WebkitBackgroundClip: "text" as const,
  backgroundClip: "text" as const,
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

// Panel surface colour beneath the rgba(0,0,0,0.14)→0.26 tint that all
// four tabs share. Analytics (Figma 176:29310) sits on a deep navy/purple
// gradient; AI Chat (Figma 177:33299), Debugger (Figma 177:33375), and
// Data (Figma 177:33498) all sit on near-black.
const PANEL_SURFACE: Record<TabKey, string> =  {
  analytics:
    "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.26) 100%), linear-gradient(180deg, rgb(13, 11, 56) 0%, rgb(28, 25, 118) 55%, rgb(44, 39, 180) 100%)",
  aiChat:
    "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.26) 100%), linear-gradient(180deg, rgb(13, 11, 56) 0%, rgb(28, 25, 118) 55%, rgb(44, 39, 180) 100%)",
  debugger:
    "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.26) 100%), linear-gradient(180deg, rgb(13, 11, 56) 0%, rgb(28, 25, 118) 55%, rgb(44, 39, 180) 100%)",
  data:
    "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.26) 100%), linear-gradient(180deg, rgb(13, 11, 56) 0%, rgb(28, 25, 118) 55%, rgb(44, 39, 180) 100%)",
};

export function AdminConsoleAnalyticsPanel() {
  const [tab, setTab] = useState<TabKey>("analytics");

  return (
    <section style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", background: "rgb(6, 5, 26)", borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: "36px 0 0", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", background: "rgb(10, 9, 42)", borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: "36px 0 0", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", background: "rgb(14, 12, 56)", borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: "40px 16px 80px", display: "flex", justifyContent: "center" }}>
          <div className="relative overflow-hidden" style={{ width: "100%", maxWidth: 1280, height: 879, borderRadius: 22, border: "1.5px solid rgba(255,255,255,0.24)", background: PANEL_SURFACE[tab], boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.25)", transition: "background 200ms ease" }}>
            <div role="tablist" aria-label="Admin Console capability" className="absolute flex items-center" style={{ top: 28, left: "50%", transform: "translateX(-50%)", width: "calc(100% - 60px)", maxWidth: 1220, padding: 8, gap: 2, border: "2px solid rgba(255,255,255,0.12)", borderRadius: 18 }}>
              {TAB_DEFS.map((t) => {
                const isActive = t.key === tab;
                return (
                  <button key={t.key} type="button" role="tab" aria-selected={isActive} onClick={() => setTab(t.key)} className="cursor-pointer" style={{ flex: "1 0 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "12px 8px", borderRadius: 12, border: "none", background: isActive ? "#fff" : "transparent", transition: "background 160ms ease, color 160ms ease" }}>
                    <TabIcon kind={t.key} active={isActive} />
                    <span className="font-urbanist whitespace-nowrap hidden lg:inline" style={{ fontWeight: isActive ? 700 : 500, fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.54px", color: isActive ? "#0d0b2c" : "rgba(255,255,255,0.52)" }}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
            {tab === "analytics" ? <AnalyticsBody /> : null}
            {tab === "aiChat" ? <AIChatBody /> : null}
            {tab === "debugger" ? <DebuggerBody /> : null}
            {tab === "data" ? <DataBody /> : null}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 180, background: "linear-gradient(to top, rgb(14, 12, 56) 0%, transparent 100%)", pointerEvents: "none", borderBottomLeftRadius: 22, borderBottomRightRadius: 22 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Heading shared by all 4 tabs (left-aligned, 70px). Defaults to the
// colorful gradient fill; AI Chat tab opts into pure white via whiteFill.
function PanelHeading({
  children,
  whiteFill = false,
}: {
  children: React.ReactNode;
  whiteFill?: boolean;
}) {
  return (
    <p
      className="absolute font-urbanist font-semibold"
      style={{
        left: 45,
        top: 133,
        width: 631,
        fontSize: 70,
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: "-2.1px",
        margin: 0,
        ...(whiteFill ? { color: "#fff" } : HEADING_GRADIENT),
      }}
    >
      {children}
    </p>
  );
}

// ----- Tab 1: Analytics — chart line + tooltip card -----

function AnalyticsBody() {
  return (
    <>
      <PanelHeading>
        Track usage and engagement added to your product
      </PanelHeading>

      {/* Chart wrapper */}
      <div
        className="absolute"
        style={{
          left: 45,
          top: 414,
          width: 1201,
          height: 421,
        }}
      >
        {/* Light grid */}
        <svg
          width="1201"
          height="421"
          viewBox="0 0 1201 421"
          fill="none"
          aria-hidden
          style={{ position: "absolute", inset: 0 }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={(421 / 6) * i}
              x2="1201"
              y2={(421 / 6) * i}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <line
              key={`v${i}`}
              x1={(1201 / 10) * i}
              y1="0"
              x2={(1201 / 10) * i}
              y2="421"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          ))}

          <defs>
            <linearGradient id="chart-line-grad" x1="0" y1="0" x2="1201" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff4f00" />
              <stop offset="20%" stopColor="#ffb547" />
              <stop offset="40%" stopColor="#ffc933" />
              <stop offset="65%" stopColor="#cc26c0" />
              <stop offset="85%" stopColor="#5b8aff" />
              <stop offset="100%" stopColor="#13d09d" />
            </linearGradient>
          </defs>

          {/* Chart line — a wandering polyline rising right */}
          <polyline
            points="0,330 70,310 140,260 210,210 280,200 350,250 420,260 480,260 540,250 600,250 670,140 740,120 810,90 870,90 920,75 980,80 1040,40 1100,30 1170,10 1201,5"
            fill="none"
            stroke="url(#chart-line-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Data point at week 04 */}
        <div
          style={{
            position: "absolute",
            left: 660,
            top: 130,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#cc26c0",
            border: "2px solid #fff",
            boxShadow: "0 0 12px rgba(204,38,192,0.6)",
            zIndex: 2,
          }}
          aria-hidden
        />

        {/* Tooltip card */}
        <div
          className="absolute"
          style={{
            left: 690,
            top: 88,
            width: 280,
            background: "#0e0c38",
            border: "1px solid #cc26c0",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 0 26px rgba(0,0,0,0.5)",
            zIndex: 3,
          }}
        >
          <p
            className="font-urbanist font-semibold"
            style={{
              color: "#fff",
              fontSize: 24,
              lineHeight: 1.2,
              letterSpacing: "-0.72px",
              margin: 0,
              marginBottom: 24,
              whiteSpace: "nowrap",
            }}
          >
            200 Hours of Engagement
          </p>
          <div className="flex flex-col" style={{ gap: 22, width: 235 }}>
            <TooltipMetric icon="users" value="4,255 " label="Active Collaborators" />
            <TooltipMetric icon="comment" value="55.4k " label="Comments Added" />
            <TooltipMetric icon="bell" value="87.3k " label="Notifications Added" />
          </div>
        </div>

        {/* Week labels */}
        <div
          className="absolute flex items-center justify-between font-urbanist"
          style={{
            left: 0,
            right: 0,
            top: 437,
            paddingLeft: 56,
            paddingRight: 56,
            color: "rgba(255,255,255,0.52)",
            fontSize: 12,
            letterSpacing: "-0.36px",
            textTransform: "uppercase",
          }}
        >
          {["01", "02", "03", "04", "05", "06"].map((n) => (
            <span key={n}>
              <span style={{ color: "rgba(255,255,255,0.52)" }}>week </span>
              <span style={{ color: "#fff" }}>{n}</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function TooltipMetric({
  icon,
  value,
  label,
}: {
  icon: "users" | "comment" | "bell";
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center" style={{ gap: 10 }}>
      <span
        style={{ color: "#fff", display: "inline-flex", width: 18, height: 18 }}
      >
        {icon === "users" ? <UsersIcon /> : icon === "comment" ? <CommentBubble /> : <BellIcon />}
      </span>
      <p
        className="font-urbanist"
        style={{
          color: "#fff",
          fontSize: 16,
          lineHeight: 1.2,
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontWeight: 600 }}>{value}</span>
        <span style={{ color: "rgba(255,255,255,0.75)" }}>{label}</span>
      </p>
    </div>
  );
}

// ----- Tab 2: AI Chat — skeleton cards + dashed lines + lightbulb callout -----

function AIChatBody() {
  return (
    <>
      <PanelHeading whiteFill>
        Discover new insights by asking the right questions
      </PanelHeading>

      {/* Dashed connector lines (SVG) */}
      <svg
        width="1280"
        height="879"
        viewBox="0 0 1280 879"
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <path
          d="M 244,492 V 410 H 1003 V 321"
          stroke="#e854a2"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 470,650 V 470 H 1003 V 321"
          stroke="#e8a75b"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 1003,554 V 321"
          stroke="#e85550"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <SkeletonCard left={51} top={492} borderColor="#e854a2" />
      <SkeletonCard left={376} top={650} borderColor="#e8a75b" />
      <SkeletonCard left={812} top={554} borderColor="#e85550" />

      {/* Lightbulb callout — pink→orange gradient stroke. The Figma file
          uses a gradient border which the MCP exports as a flat color; the
          screenshot shows the true rendering. We emulate it with the
          padding-box / border-box trick so the border-radius is preserved. */}
      <div
        className="absolute"
        style={{
          left: 839,
          top: 167,
          width: 327,
          padding: 44,
          gap: 25,
          display: "flex",
          flexDirection: "column",
          border: "3.16px solid transparent",
          borderRadius: 38,
          background:
            "linear-gradient(rgb(16, 14, 52), rgb(16, 14, 52)) padding-box, linear-gradient(135deg, #e854a2 0%, #e8a75b 100%) border-box",
        }}
      >
        <BulbIcon size={44} />
        <p
          className="font-urbanist"
          style={{
            color: "#fff",
            fontSize: 31.6,
            lineHeight: 1.3,
            fontWeight: 500,
            letterSpacing: "0.32px",
            margin: 0,
          }}
        >
          Users have trouble finding the PDF upload
        </p>
      </div>
    </>
  );
}

function SkeletonCard({
  left,
  top,
  borderColor,
}: {
  left: number;
  top: number;
  borderColor: string;
}) {
  return (
    <div
      className="absolute flex flex-col items-start"
      style={{
        left,
        top,
        width: 387,
        border: `1px solid ${borderColor}`,
        borderRadius: 24,
        // Radial highlight in the bottom-left corner, matches Figma's
        // inline SVG fill (very low alpha so it just suggests depth).
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 387 103.8' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='0.09'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(38.7 -9.9 5.9776 23.367 0 104)'><stop stop-color='rgba(255,255,255,1)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        boxShadow: "0 9.6px 19.2px rgba(15,15,15,0.1)",
        overflow: "hidden",
      }}
    >
      {/* Inner content is wider than the visible card (433.2 vs 387) and
          gets clipped on the right — mirrors Figma's overflow-clip. */}
      <div
        className="flex flex-col items-start"
        style={{
          width: 433.2,
          gap: 19.2,
          paddingLeft: 19.2,
          paddingRight: 19.2,
          paddingBottom: 19.2,
          paddingTop: 19.2,
        }}
      >
        {/* Row 1: avatar + small pill + invisible "7 min ago"/star spacer */}
        <div
          className="flex items-center"
          style={{ width: 394.8, gap: 9.6 }}
        >
          <div
            style={{
              width: 38.4,
              height: 38.4,
              borderRadius: 48,
              background: "rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              width: 70,
              height: 21,
              borderRadius: 32,
              background: "rgba(255,255,255,0.04)",
              flexShrink: 0,
            }}
          />
          {/* Invisible spacer reserves room for the hidden timestamp + star
              icon present in the Figma source (both opacity 0). */}
          <div style={{ flex: 1 }} />
        </div>

        {/* Row 2: indented wide pill */}
        <div
          className="flex items-center"
          style={{
            width: 394.8,
            paddingLeft: 48,
            paddingTop: 2.4,
            paddingBottom: 2.4,
            gap: 12,
          }}
        >
          <div
            style={{
              width: 167,
              height: 21,
              borderRadius: 32,
              background: "rgba(255,255,255,0.04)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ----- Tab 3: Debugger — Sean/Emma cursor selection + Dev Tools events -----

function DebuggerBody() {
  return (
    <>
      <PanelHeading whiteFill>
        Fastest way to debug Velt services and components
      </PanelHeading>

      {/* Sean (teal) selection box — Figma 177:33482, position+size from spec */}
      <CursorSelectionBox
        left={84}
        top={502}
        size={175}
        borderColor="#80ddcd"
        cursorColor="#8bf2e1"
        name="Sean"
        cursorAlign="topRight"
      />

      {/* Emma (pink) selection box — Figma 177:33490 */}
      <CursorSelectionBox
        left={384}
        top={640}
        size={175}
        borderColor="#ff74f6"
        cursorColor="#ff74f6"
        name="Emma"
        cursorAlign="topLeft"
      />

      {/* Dashed connector from Sean's box, around/past Emma, to the dev
          tools events panel. Approximates the single combined Vector463 in
          Figma with two coloured segments meeting at the circle marker. */}
      <svg
        width="1280"
        height="879"
        viewBox="0 0 1280 879"
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <path
          d="M 259,590 H 320 V 715 H 384"
          stroke="#80ddcd"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 559,715 H 620 V 511 H 671"
          stroke="#ff74f6"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Circle marker just left of the events panel (Figma 177:33496/97). */}
        <circle cx="683" cy="511" r="12" fill="none" stroke="#ff74f6" strokeWidth="2" />
        <circle cx="683" cy="511" r="5" fill="#ff74f6" />
      </svg>

      <DevToolsPanel />
    </>
  );
}

function CursorSelectionBox({
  left,
  top,
  size,
  borderColor,
  cursorColor,
  name,
  cursorAlign,
}: {
  left: number;
  top: number;
  size: number;
  borderColor: string;
  cursorColor: string;
  name: string;
  cursorAlign: "topLeft" | "topRight";
}) {
  // Corner handles are 16px squares centered on each corner of the box.
  const HANDLE = 16;
  const half = HANDLE / 2;
  const corners = [
    { left: -half, top: -half },
    { right: -half, top: -half },
    { left: -half, bottom: -half },
    { right: -half, bottom: -half },
  ] as const;

  return (
    <div
      className="absolute"
      style={{ left, top, width: size, height: size }}
    >
      {/* 1px border outline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `1px solid ${borderColor}`,
        }}
      />
      {/* Corner handles — 16px filled squares with navy outline */}
      {corners.map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: HANDLE,
            height: HANDLE,
            background: borderColor,
            border: "2px solid #191659",
            ...pos,
          }}
        />
      ))}
      {/* Cursor pointer + name pill, anchored inside the box near the top */}
      <div
        className="absolute"
        style={{
          ...(cursorAlign === "topRight"
            ? { right: 12, top: 28, alignItems: "flex-end" }
            : { left: 12, top: 28, alignItems: "flex-start" }),
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        <CursorPointer
          color={cursorColor}
          flipped={cursorAlign === "topRight"}
        />
        <span
          style={{
            background: cursorColor,
            padding: "3px 12px",
            borderRadius: 30,
            fontFamily: "Urbanist, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            lineHeight: 1.4,
            letterSpacing: "0.18px",
            color: "#020202",
            marginTop: -2,
            ...(cursorAlign === "topRight"
              ? { marginRight: 6 }
              : { marginLeft: 6 }),
          }}
        >
          {name}
        </span>
      </div>
    </div>
  );
}

function CursorPointer({
  color,
  flipped = false,
}: {
  color: string;
  flipped?: boolean;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M2 2 L18 8 L10 11 L8 18 Z"
        fill={color}
        stroke="#020202"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Dev Tools panel for the Debugger tab — Figma 177:33472 onward.
// Dark surface, Geist Mono captions, white event labels with timestamps
// on the right, one highlighted "Multi Cursor Initiated" row.
function DevToolsPanel() {
  const events: {
    icon: "doc" | "cursor" | "comment" | "users" | "user";
    label: string;
    time: string;
    highlighted?: boolean;
  }[] = [
    { icon: "doc", label: "Document is Set", time: "14:25:29" },
    { icon: "cursor", label: "Multi Cursor Initiated", time: "12:24:23", highlighted: true },
    { icon: "comment", label: "Comment is Added", time: "13:24:24" },
    { icon: "users", label: "New User Detected", time: "12:24:23" },
    { icon: "user", label: "User Authenticated", time: "12:24:26" },
    { icon: "comment", label: "Comment is Added", time: "11:24:27" },
    { icon: "doc", label: "Document is Set", time: "11:24:28" },
    { icon: "user", label: "User Validated", time: "14:24:25" },
  ];
  return (
    <div
      className="absolute"
      style={{
        left: 685,
        top: 268,
        width: 668,
        height: 638,
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 26,
        background: "transparent",
        overflow: "hidden",
      }}
    >
      {/* Sub-tab strip */}
      <div
        className="flex items-center"
        style={{ padding: "14px 20px 0", gap: 8 }}
      >
        {[
          { label: "Overview", active: false },
          { label: "Data", active: false },
          { label: "Events", active: true },
          { label: "Components", active: false },
        ].map((t) => (
          <span
            key={t.label}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              background: t.active ? "rgba(255,255,255,0.08)" : "transparent",
              fontFamily: "'Geist Mono', monospace",
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 0.9,
              color: t.active ? "#fff" : "rgba(255,255,255,0.52)",
              textTransform: "uppercase",
            }}
          >
            {t.label}
          </span>
        ))}
      </div>

      {/* Listening + search row */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "26px 20px 18px" }}
      >
        <div className="flex items-center" style={{ gap: 19 }}>
          <span
            style={{
              border: "1px solid #e85a49",
              borderRadius: 31,
              padding: 6,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: 3,
                background: "#e85a49",
                display: "inline-block",
              }}
            />
          </span>
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 500,
              fontSize: 24,
              lineHeight: 0.9,
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            Listening...
          </span>
        </div>
        <div
          className="flex items-center"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14,
            padding: "16px",
            gap: 14,
            width: 245,
          }}
        >
          <SearchIcon dark />
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 500,
              fontSize: 14,
              lineHeight: 0.9,
              color: "rgba(255,255,255,0.52)",
              textTransform: "uppercase",
            }}
          >
            Search events
          </span>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.08)",
        }}
      />

      {/* Event rows */}
      <div className="flex flex-col" style={{ padding: 20, gap: 0 }}>
        {events.map((e, i) => (
          <div
            key={i}
            className="flex items-center justify-between"
            style={{
              padding: "14px 18px",
              borderBottom: e.highlighted
                ? "none"
                : "1px solid rgba(255,255,255,0.08)",
              background: e.highlighted
                ? "rgba(255,255,255,0.08)"
                : "transparent",
              borderRadius: e.highlighted ? 12 : 0,
            }}
          >
            <div className="flex items-center" style={{ gap: 14 }}>
              <EventIcon kind={e.icon} dark />
              <span
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 16,
                  color: "#e1e1e1",
                }}
              >
                {e.label}
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 1,
                color: "#fff",
                opacity: e.highlighted ? 1 : 0.5,
                textAlign: "right",
                minWidth: 110,
              }}
            >
              {e.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----- Tab 4: Data — file browser mockup (Figma 177:33498) -----

function DataBody() {
  return (
    <>
      <PanelHeading whiteFill>
        Explore collaboration data and export
      </PanelHeading>

      {/* File browser container. Figma sets its width to 1526 — wider than
          the 1280 panel — so the right side is clipped by the panel's
          existing overflow:hidden. Same intentional clipping in Figma. */}
      <div
        className="absolute"
        style={{
          left: 74,
          top: 437,
          width: 1526,
          background: "transparent",
          border: "2.586px solid rgba(255,255,255,0.12)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Breadcrumb header bar */}
        <div
          className="flex items-center justify-between"
          style={{
            height: 71.127,
            background: "rgba(17,17,17,0.12)",
            paddingLeft: 25.86,
            paddingRight: 8.08,
          }}
        >
          <div className="flex items-center" style={{ gap: 19.398 }}>
            <HomeIcon dark size={19.398} />
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 400,
                fontSize: 19.398,
                lineHeight: 1,
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              superflow-recording-comments
            </span>
            <ChevronRightIcon dark size={16.165} />
            <span
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500,
                fontSize: 19.398,
                lineHeight: 1,
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              sales-video
            </span>
          </div>
          <div
            className="flex items-center justify-center"
            style={{ padding: 6.466 }}
          >
            <DownloadIcon dark size={22.631} />
          </div>
        </div>

        {/* 3-column body */}
        <div className="flex" style={{ width: "100%" }}>
          <FileColumn
            heading="Folders"
            items={[
              { kind: "skeleton", width: 280.629 },
              { kind: "skeleton", width: 389.259 },
              { kind: "folderActive" },
            ]}
          />
          <FileColumn
            heading="documents"
            items={[
              { kind: "skeleton", width: 280.629 },
              { kind: "documentActive" },
              { kind: "skeleton", width: 389.259 },
            ]}
          />
          <FileColumn
            heading="Locations"
            items={[
              { kind: "skeleton", width: 280.629 },
              { kind: "skeleton", width: 389.259 },
              { kind: "skeleton", width: 280.629 },
              { kind: "skeleton", width: 389.259 },
            ]}
          />
        </div>
      </div>
    </>
  );
}

type FileItem =
  | { kind: "skeleton"; width: number }
  | { kind: "folderActive" }
  | { kind: "documentActive" };

function FileColumn({
  heading,
  items,
}: {
  heading: string;
  items: FileItem[];
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        flex: "1 0 0",
        minWidth: 0,
        border: "1.617px solid rgba(245,245,245,0.12)",
      }}
    >
      {/* Column header */}
      <div
        className="flex items-center justify-between"
        style={{
          height: 64.661,
          paddingLeft: 25.864,
          paddingRight: 9.699,
          paddingTop: 19.398,
          paddingBottom: 19.398,
          borderBottom: "1.617px solid rgba(255,255,255,0.12)",
          gap: 16.165,
        }}
      >
        <span
          style={{
            flex: "1 0 0",
            minWidth: 0,
            fontFamily: "Urbanist, sans-serif",
            fontWeight: 500,
            fontSize: 16.165,
            lineHeight: 1,
            color: "#fff",
            opacity: 0.85,
            letterSpacing: "1.6165px",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </span>
        <div className="flex items-center" style={{ padding: 6.466 }}>
          <FilterIcon dark size={25.864} />
        </div>
      </div>

      {items.map((item, i) => (
        <FileRow key={i} item={item} />
      ))}
    </div>
  );
}

function FileRow({ item }: { item: FileItem }) {
  if (item.kind === "skeleton") {
    return (
      <div
        className="flex items-center"
        style={{
          height: 64.661,
          paddingLeft: 25.864,
          paddingRight: 25.864,
          paddingTop: 19.398,
          paddingBottom: 19.398,
          borderBottom: "1.617px solid rgba(255,255,255,0.12)",
          opacity: 0.8,
        }}
      >
        <div
          style={{
            width: item.width,
            height: 25.864,
            borderRadius: 41.383,
            background: "rgba(246,246,246,0.12)",
          }}
        />
      </div>
    );
  }
  if (item.kind === "folderActive") {
    return (
      <div
        className="flex items-center justify-between"
        style={{
          height: 64.661,
          paddingLeft: 25.864,
          paddingRight: 12.932,
          paddingTop: 19.398,
          paddingBottom: 19.398,
          background: "rgba(0,137,50,0.08)",
          borderBottom: "1.617px solid rgba(255,255,255,0.12)",
          borderLeft: "5.173px solid rgba(255,255,255,0.12)",
          opacity: 0.8,
          gap: 3.233,
        }}
      >
        <div
          className="flex flex-col"
          style={{
            flex: "1 0 0",
            minWidth: 0,
            gap: 3.233,
            fontFamily: "'Geist Mono', monospace",
            fontWeight: 400,
            color: "#fff",
          }}
        >
          <span
            style={{
              fontSize: 16.165,
              lineHeight: 1,
              opacity: 0.52,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            superflow-recording-comments /
          </span>
          <span
            style={{
              fontSize: 21.015,
              lineHeight: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            sales-video
          </span>
        </div>
        <ChevronRightIcon dark size={22.631} />
      </div>
    );
  }
  // documentActive
  return (
    <div
      className="flex items-center justify-between"
      style={{
        height: 64.661,
        paddingLeft: 25.864,
        paddingRight: 12.932,
        paddingTop: 19.398,
        paddingBottom: 19.398,
        background: "rgba(255,118,152,0.08)",
        borderBottom: "1.617px solid rgba(255,255,255,0.12)",
        borderLeft: "2.586px solid rgba(255,255,255,0.12)",
        opacity: 0.8,
        gap: 16.165,
      }}
    >
      <span
        style={{
          flex: "1 0 0",
          minWidth: 0,
          fontFamily: "'Geist Mono', monospace",
          fontWeight: 400,
          fontSize: 21.015,
          lineHeight: 1,
          color: "#fff",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        sales-video-v2-after-effects
      </span>
      <ChevronRightIcon dark size={22.631} />
    </div>
  );
}

// ----- Inline icons -----

function TabIcon({ kind, active }: { kind: TabKey; active: boolean }) {
  const inactiveOpacity = active ? 1 : 0.52;

  if (kind === "analytics") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M8.33333 8.42083C8.33333 8.29991 8.35715 8.18017 8.40343 8.06845C8.4497 7.95672 8.51753 7.85521 8.60304 7.76971C8.68855 7.6842 8.79006 7.61637 8.90178 7.57009C9.0135 7.52382 9.13324 7.5 9.25417 7.5H10.7458C10.8668 7.5 10.9865 7.52382 11.0982 7.57009C11.2099 7.61637 11.3115 7.6842 11.397 7.76971C11.4825 7.85521 11.5503 7.95672 11.5966 8.06845C11.6428 8.18017 11.6667 8.29991 11.6667 8.42083V16.5792C11.6667 16.8234 11.5697 17.0576 11.397 17.2303C11.2243 17.403 10.9901 17.5 10.7458 17.5H9.25417C9.00995 17.5 8.77573 17.403 8.60304 17.2303C8.43035 17.0576 8.33333 16.8234 8.33333 16.5792V8.42083Z" fill={active ? "#0D0B2C" : "rgba(255,255,255,0.52)"} />
        <path d="M14.1667 3.42083C14.1667 3.17661 14.2637 2.9424 14.4364 2.76971C14.6091 2.59702 14.8433 2.5 15.0875 2.5H16.5792C16.8234 2.5 17.0576 2.59702 17.2303 2.76971C17.403 2.9424 17.5 3.17661 17.5 3.42083V16.5792C17.5 16.8234 17.403 17.0576 17.2303 17.2303C17.0576 17.403 16.8234 17.5 16.5792 17.5H15.0875C14.8433 17.5 14.6091 17.403 14.4364 17.2303C14.2637 17.0576 14.1667 16.8234 14.1667 16.5792V3.42083Z" fill={active ? "#0D0B2C" : "rgba(255,255,255,0.52)"} />
        <path d="M2.5 15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5C4.60869 17.5 5.03262 17.3244 5.34518 17.0118C5.65774 16.6993 5.83333 16.2754 5.83333 15.8333C5.83333 15.3913 5.65774 14.9674 5.34518 14.6548C5.03262 14.3423 4.60869 14.1667 4.16667 14.1667C3.72464 14.1667 3.30072 14.3423 2.98816 14.6548C2.67559 14.9674 2.5 15.3913 2.5 15.8333Z" fill={active ? "#0D0B2C" : "rgba(255,255,255,0.52)"} />
      </svg>
    );
  }
  if (kind === "aiChat") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ opacity: active ? 1 : undefined }}>
        <g opacity={inactiveOpacity}>
          <path d="M13.3334 14.9997C13.7754 14.9997 14.1992 15.1752 14.5119 15.4878C14.8244 15.8003 15 16.2243 15 16.6663C15 16.2243 15.1756 15.8003 15.4881 15.4878C15.8008 15.1752 16.2246 14.9997 16.6666 14.9997C16.2246 14.9997 15.8008 14.8241 15.4881 14.5115C15.1756 14.199 15 13.775 15 13.333C15 13.775 14.8244 14.199 14.5119 14.5115C14.1992 14.8241 13.7754 14.9997 13.3334 14.9997ZM13.3334 4.99967C13.7754 4.99967 14.1992 5.17527 14.5119 5.48782C14.8244 5.80038 15 6.22431 15 6.66633C15 6.22431 15.1756 5.80038 15.4881 5.48782C15.8008 5.17527 16.2246 4.99967 16.6666 4.99967C16.2246 4.99967 15.8008 4.82407 15.4881 4.51152C15.1756 4.19896 15 3.77503 15 3.33301C15 3.77503 14.8244 4.19896 14.5119 4.51152C14.1992 4.82407 13.7754 4.99967 13.3334 4.99967ZM7.5 14.9997C7.5 13.6736 8.02679 12.4018 8.96446 11.4641C9.90215 10.5265 11.1739 9.99967 12.5 9.99967C11.1739 9.99967 9.90215 9.47288 8.96446 8.53521C8.02679 7.59752 7.5 6.32576 7.5 4.99967C7.5 6.32576 6.97321 7.59752 6.03554 8.53521C5.09785 9.47288 3.82609 9.99967 2.5 9.99967C3.82609 9.99967 5.09785 10.5265 6.03554 11.4641C6.97321 12.4018 7.5 13.6736 7.5 14.9997Z" stroke={active ? "#0D0B2C" : "white"} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  }
  if (kind === "debugger") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <g opacity={inactiveOpacity}>
          <path d="M8.33937 17.3139C7.61404 17.1494 6.91744 16.8771 6.2727 16.5064M11.6727 2.68555C13.3295 3.06393 14.8087 3.99362 15.8682 5.32238C16.9277 6.65115 17.5047 8.30026 17.5047 9.99971C17.5047 11.6992 16.9277 13.3482 15.8682 14.677C14.8087 16.0057 13.3295 16.9355 11.6727 17.3139M3.8219 14.2439C3.36731 13.5834 3.02206 12.8541 2.7994 12.0838M2.60938 8.74971C2.7427 7.95805 2.99938 7.20805 3.35938 6.52055L3.5002 6.26637M5.76204 3.81555C6.54175 3.2788 7.41648 2.89531 8.33954 2.68555" stroke={active ? "#0D0B2C" : "white"} strokeWidth="1.5625" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g opacity={inactiveOpacity}>
        <path d="M3.32812 5C3.32812 5.66304 4.03051 6.29892 5.28075 6.76776C6.53099 7.23661 8.22669 7.5 9.9948 7.5C11.7629 7.5 13.4586 7.23661 14.7089 6.76776C15.9591 6.29892 16.6615 5.66304 16.6615 5M3.32812 5C3.32812 4.33696 4.03051 3.70107 5.28075 3.23224C6.53099 2.76339 8.22669 2.5 9.9948 2.5C11.7629 2.5 13.4586 2.76339 14.7089 3.23224C15.9591 3.70107 16.6615 4.33696 16.6615 5M3.32812 5V10M16.6615 5V10M3.32812 10C3.32812 10.663 4.03051 11.2989 5.28075 11.7678C6.53099 12.2366 8.22669 12.5 9.9948 12.5C11.7629 12.5 13.4586 12.2366 14.7089 11.7678C15.9591 11.2989 16.6615 10.663 16.6615 10M3.32812 10V15C3.32812 15.663 4.03051 16.2989 5.28075 16.7677C6.53099 17.2366 8.22669 17.5 9.9948 17.5C11.7629 17.5 13.4586 17.2366 14.7089 16.7677C15.9591 16.2989 16.6615 15.663 16.6615 15V10" stroke={active ? "#0D0B2C" : "white"} strokeWidth="1.5625" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function BulbIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" opacity="0" />
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M8 14a6 6 0 1 1 8 0a3 3 0 0 0 -1 2v1a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-1a3 3 0 0 0 -1 -2" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </svg>
  );
}

function CommentBubble() {
  return (
    <span
      aria-hidden
      style={{
        display: "block",
        width: 14,
        height: 14,
        border: "1.5px solid #ffdc52",
        borderRadius: "8px 8px 8px 1px",
        boxSizing: "border-box",
      }}
    />
  );
}

function BellIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
  );
}

export function SearchIcon({ dark = false }: { dark?: boolean } = {}) {
  const stroke = dark ? "rgba(255,255,255,0.52)" : "rgba(17,17,17,0.52)";
  const size = dark ? 20 : 14;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export function HomeIcon({
  dark = false,
  size = 16,
}: { dark?: boolean; size?: number } = {}) {
  const stroke = dark ? "rgba(255,255,255,0.85)" : "#111";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
    </svg>
  );
}

export function FilterIcon({
  dark = false,
  size = 14,
}: { dark?: boolean; size?: number } = {}) {
  const stroke = dark ? "rgba(255,255,255,0.6)" : "rgba(17,17,17,0.5)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16l-6 8v6l-4 2v-8z" />
    </svg>
  );
}

export function DownloadIcon({
  dark = false,
  size = 22,
}: { dark?: boolean; size?: number } = {}) {
  const stroke = dark ? "rgba(255,255,255,0.85)" : "#111";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <path d="M7 11l5 5l5 -5" />
      <path d="M12 4v12" />
    </svg>
  );
}

export function ChevronRightIcon({
  dark = false,
  size = 16,
}: { dark?: boolean; size?: number } = {}) {
  const stroke = dark ? "rgba(255,255,255,0.85)" : "rgba(17,17,17,0.6)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 6l6 6l-6 6" />
    </svg>
  );
}

export function EventIcon({
  kind,
  dark = false,
}: {
  kind: "doc" | "cursor" | "comment" | "users" | "user";
  dark?: boolean;
}) {
  // Slightly larger + brighter on dark surfaces (Figma 23px @ this scale).
  const size = dark ? 22 : 18;
  if (kind === "doc") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={dark ? "#e879f9" : "#cc26c0"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      </svg>
    );
  }
  if (kind === "cursor") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffb547" stroke="#ffb547" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 3 L 19 11 L 11 13 L 9 21 Z" />
      </svg>
    );
  }
  if (kind === "comment") {
    // Figma uses a yellow/amber rounded square outline (#ffca1c).
    const borderColor = dark ? "#ffca1c" : "#1c4dff";
    return (
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: dark ? 18 : 16,
          height: dark ? 18 : 16,
          border: `2px solid ${borderColor}`,
          borderRadius: "10px 10px 10px 2px",
          boxSizing: "border-box",
        }}
      />
    );
  }
  if (kind === "users") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={dark ? "#5dffc8" : "#13d09d"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    );
  }
  // user
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={dark ? "#ff8fb8" : "#7a7a7a"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-2a6 6 0 0 1 12 0v2" />
    </svg>
  );
}
