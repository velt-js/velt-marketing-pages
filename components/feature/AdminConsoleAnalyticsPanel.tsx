"use client";

// Dark analytics panel directly under the admin-console hero. Mirrors
// Figma node 176:29295 in HqWIZdR6ISJmaG2n4o3gr8 — a 1280-wide
// rounded gradient panel with 4 tabs (Analytics / AI Chat / Debugger /
// Data) and a different mockup body per tab. Fully DOM-rebuilt for
// sharpness at any zoom (matches the activity-logs precedent).
//
// Slug-conditional in app/features/[slug]/page.tsx — only rendered
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
const PANEL_SURFACE: Record<TabKey, string> = {
  analytics:
    "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.26) 100%), linear-gradient(180deg, rgb(13, 11, 56) 0%, rgb(28, 25, 118) 55%, rgb(44, 39, 180) 100%)",
  aiChat:
    "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.26) 100%), #050505",
  debugger:
    "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.26) 100%), #050505",
  data:
    "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.26) 100%), #050505",
};

export function AdminConsoleAnalyticsPanel() {
  const [tab, setTab] = useState<TabKey>("analytics");

  return (
    <section
      className="flex flex-col items-center bg-black full-bleed-bg"
      style={{
        padding: "0 80px 100px",
        background: "#000",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: 1280,
          height: 879,
          borderRadius: 40,
          border: "2px solid rgba(255,255,255,0.6)",
          background: PANEL_SURFACE[tab],
          boxShadow: "0 0 80px 4px rgba(0,0,0,0.32)",
          transition: "background 200ms ease",
        }}
      >
        {/* Tab strip */}
        <div
          role="tablist"
          aria-label="Admin Console capability"
          className="absolute flex items-center"
          style={{
            top: 28,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1220,
            padding: 8,
            gap: 2,
            border: "2px solid rgba(255,255,255,0.12)",
            borderRadius: 18,
          }}
        >
          {TAB_DEFS.map((t) => {
            const isActive = t.key === tab;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(t.key)}
                className="cursor-pointer"
                style={{
                  flex: t.key === "analytics" ? "0 0 291.5px" : "1 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  padding: "12px 20px",
                  borderRadius: 12,
                  border: "none",
                  background: isActive ? "#fff" : "transparent",
                  transition: "background 160ms ease, color 160ms ease",
                }}
              >
                <TabIcon kind={t.key} active={isActive} />
                <span
                  className="font-urbanist whitespace-nowrap"
                  style={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 18,
                    lineHeight: 1.2,
                    letterSpacing: "-0.54px",
                    color: isActive ? "#0d0b2c" : "rgba(255,255,255,0.52)",
                  }}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab body */}
        {tab === "analytics" ? <AnalyticsBody /> : null}
        {tab === "aiChat" ? <AIChatBody /> : null}
        {tab === "debugger" ? <DebuggerBody /> : null}
        {tab === "data" ? <DataBody /> : null}
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
        Analyze new engagement added to your product.
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
            "linear-gradient(#050505, #050505) padding-box, linear-gradient(135deg, #e854a2 0%, #e8a75b 100%) border-box",
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
        Discover new insights by asking the right questions
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
        Discover new insights by asking the right questions
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
  const color = active ? "#0d0b2c" : "rgba(255,255,255,0.52)";
  if (kind === "analytics") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3v18 M5 11l3 3l3 -3 M19 5l-3 3l-3 -3" />
        <rect x="4" y="13" width="4" height="8" rx="1" />
        <rect x="10" y="9" width="4" height="12" rx="1" />
        <rect x="16" y="13" width="4" height="8" rx="1" />
      </svg>
    );
  }
  if (kind === "aiChat") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        <path d="M19 14l.7 2.1l2.1.7l-2.1.7l-.7 2.1l-.7-2.1l-2.1-.7l2.1-.7z" />
      </svg>
    );
  }
  if (kind === "debugger") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3a9 9 0 0 1 9 9 M3 12a9 9 0 0 1 6 -8.5 M12 21a9 9 0 0 1 -9 -9" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  }
  // data
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8 -1.3 8 -3v-6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8 -1.3 8 -3v-6" />
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
