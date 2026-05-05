// Admin Console page body. One hardcoded slug-conditional component
// that renders 4 stacked card sections from Figma node 176:29292 in
// HqWIZdR6ISJmaG2n4o3gr8.
//
// Card 1 (Debug Dev Tools) embeds the entire white card as a Figma
// screenshot since the heading + CTA + 9-row event log all sit inside
// it; the dark testimonial banner is attached as DOM. Cards 2-4 use
// the standard FeatureSectionShell chrome (DOM heading + sub + CTAs +
// testimonial) wrapped around a single mockup screenshot for the body.
//
// Slug-conditional in app/features/[slug]/page.tsx — only rendered
// when the slug is "admin-console".

"use client";

import { useState } from "react";
import { FeatureSectionShell } from "./FeatureSectionShell";
import { FeatureFlowDiagram, type FeatureFlowStage } from "./FeatureFlowDiagram";
import { InlineTestimonialCard } from "@/components/home/InlineTestimonialCard";
import {
  ChevronRightIcon,
  DownloadIcon,
  EventIcon,
  FilterIcon,
  HomeIcon,
  SearchIcon,
} from "./AdminConsoleAnalyticsPanel";
import { Book2Icon } from "./uis/icons";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatarSrc: string;
};

const ethanTestimonial: Testimonial = {
  name: "Ethan Veres",
  role: "CTO @eqtble",
  quote: "Commenting is something we wanted in our app, Velt made it possible",
  avatarSrc: "/images/features/comments/trust-us/avatar-ethan.png",
};

const yuriTestimonial: Testimonial = {
  name: "Yuri Kleban",
  role: "Senior PM @Google",
  quote:
    "Velt gave great 1 on 1 support, added features fast, and offered highly customizable components.",
  avatarSrc: "/images/features/comments/trust-us/avatar-yuri.png",
};

export function AdminConsoleHighlights() {
  return (
    <>
      <Card1DebugDevTools />
      <Card2NavigateData />
      <Card3ConfigureWebhooks />
      <Card4ExtendIntegrations />
    </>
  );
}

// Card 1 — Debug locally with Velt Dev Tools. Rebuilt as DOM (Figma
// node 176:29380) so the heading, sub-tabs, and event log stay sharp
// at any zoom — the previous PNG screenshot rendered blurry. The dark
// Linda banner is attached at the bottom via TestimonialBannerAttached.
// topAccent=true since this is the first light section on the page
// (rounded 48px top + 80px gap).
function Card1DebugDevTools() {
  return (
    <section
      data-outcomes
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{
        padding: "100px 80px",
        marginTop: 80,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
      }}
    >
      <div
        className="overflow-hidden"
        style={{
          width: 1280,
          background: "#fff",
          border: "2px solid #0e0d36",
          borderRadius: 32,
        }}
      >
        <DebugLocallyCard />
        <TestimonialBannerAttached t={ethanTestimonial} />
      </div>
    </section>
  );
}

type DebugTab = "devTools" | "liveDebugger" | "activityLogs";

const TAB_COPY: Record<DebugTab, { heading: string; subheading: string; nowrap: boolean }> = {
  devTools: {
    heading: "Debug locally with Velt Dev Tools",
    subheading: "Install the chrome extension and debug instantly",
    nowrap: true,
  },
  liveDebugger: {
    heading: "Debug live sessions if you can't replicate locally",
    subheading: "Get a live feed of what actions your users perform to help with debugging",
    nowrap: false,
  },
  activityLogs: {
    heading: "Access historical data to debug",
    subheading: "Debug historical user issues",
    nowrap: true,
  },
};

// White Dev Tools card body. Mirrors Figma 176:29380 (Dev Tools),
// 177:31392 (Live Debugger), and the activity-logs sibling — 1280×729
// with the sub-tab strip pinned at the top, the heading + Get Started
// CTA centred, and a different mockup body per tab.
function DebugLocallyCard() {
  const [tab, setTab] = useState<DebugTab>("devTools");
  const copy = TAB_COPY[tab];

  return (
    <div
      className="relative"
      style={{ width: 1280, height: 729, overflow: "hidden" }}
    >
      {/* Sub-tab strip pinned at the top center */}
      <div
        role="tablist"
        aria-label="Debug experience"
        className="absolute flex items-center"
        style={{
          top: 48,
          left: "50%",
          transform: "translateX(-50%)",
          padding: 4,
          gap: 4,
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 8,
        }}
      >
        {(
          [
            { key: "devTools", label: "Dev Tools" },
            { key: "liveDebugger", label: "Live Debugger" },
            { key: "activityLogs", label: "Activity Logs" },
          ] as const
        ).map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className="font-urbanist font-semibold cursor-pointer"
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: "none",
                background: active ? "#625df5" : "transparent",
                color: active ? "#fff" : "#a3a3a3",
                fontSize: 16,
                lineHeight: 1.2,
                letterSpacing: "-0.48px",
                transition: "background 160ms ease, color 160ms ease",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Heading + subhead + Get Started CTA, centred */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          top: 127,
          left: "50%",
          transform: "translateX(-50%)",
          gap: 32,
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{ gap: 12, width: 691, textAlign: "center" }}
        >
          <h2
            className="font-urbanist font-bold"
            style={{
              fontSize: 52,
              lineHeight: 1.2,
              letterSpacing: "-1.56px",
              color: "#111",
              margin: 0,
              whiteSpace: copy.nowrap ? "nowrap" : "normal",
            }}
          >
            {copy.heading}
          </h2>
          <p
            className="font-urbanist"
            style={{
              fontSize: 20,
              lineHeight: 1.2,
              color: "#111",
              margin: 0,
            }}
          >
            {copy.subheading}
          </p>
        </div>
        <a
          href="https://docs.velt.dev/get-started/setup/install"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center font-urbanist font-semibold whitespace-nowrap"
          style={{
            width: 156,
            height: 44,
            padding: "8px 16px",
            borderRadius: 8,
            background: "transparent",
            color: "#111",
            fontSize: 16,
            lineHeight: 1.2,
            letterSpacing: "-0.48px",
            textDecoration: "none",
            border: "2px solid #625df5",
          }}
        >
          Get Started
        </a>
      </div>

      {/* Tab body */}
      {tab === "devTools" ? <DebugDevToolsPanel /> : null}
      {tab === "liveDebugger" ? <LiveDebuggerBody /> : null}
      {tab === "activityLogs" ? <ActivityLogsBody /> : null}
    </div>
  );
}

// Live Debugger body — Figma 177:31392. "LIVE EVENTS" header with stop
// indicator + filter button, then 3 large rounded event cards stacked
// vertically. Bottom card is intentionally clipped by the white card.
function LiveDebuggerBody() {
  return (
    <>
      {/* "LIVE EVENTS" + filter row */}
      <div
        className="absolute flex items-center"
        style={{ left: 321, top: 375, gap: 17, height: 25 }}
      >
        <span
          style={{
            border: "0.893px solid #e85a49",
            borderRadius: 27.679,
            padding: 5.357,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 14.286,
              height: 14.286,
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
            fontSize: 21.429,
            lineHeight: 0.9,
            color: "#111",
            opacity: 0.52,
            textTransform: "uppercase",
          }}
        >
          Live Events
        </span>
      </div>
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: 914.75,
          top: 365,
          width: 45,
          height: 45,
          background: "#f5f5f5",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <FilterIcon size={25} />
      </div>

      {/* Three event cards stacked vertically; cards are positioned by
          centre y in Figma (calc(50% + …)) — converted to top-edge
          values relative to the 729-tall white card. */}
      <LiveEventCard
        top={431}
        title="Error in Comment Read"
        subtitle="By Archie"
        time="13:24:24"
        iconColor="#ee392c"
        showAlert
      />
      <LiveEventCard
        top={548}
        title="Comment is Added"
        subtitle="By Mike Mulligan"
        time="13:24:24"
        iconColor="#1c4dff"
      />
      <LiveEventCard
        top={665}
        title="User Login"
        subtitle="By Mike Mulligan"
        time="13:24:24"
        iconColor="#1c4dff"
      />
    </>
  );
}

function LiveEventCard({
  top,
  title,
  subtitle,
  time,
  iconColor,
  showAlert,
}: {
  top: number;
  title: string;
  subtitle: string;
  time: string;
  iconColor: string;
  showAlert?: boolean;
}) {
  return (
    <div
      className="absolute flex items-center justify-between"
      style={{
        top,
        left: "50%",
        transform: "translateX(-50%)",
        width: 638.75,
        height: 96.068,
        padding: "23.034px 29.153px",
        border: "1.44px solid rgba(17,17,17,0.08)",
        borderRadius: 20,
        background: "#fff",
      }}
    >
      <div className="flex items-center" style={{ gap: 17.276 }}>
        <div
          className="relative flex items-center justify-center"
          style={{ width: 35, height: 35 }}
        >
          {/* Comment-bubble outline */}
          <span
            style={{
              width: 23.333,
              height: 23.333,
              border: `2.917px solid ${iconColor}`,
              borderRadius: "17.5px 17.5px 17.5px 2.917px",
              boxSizing: "border-box",
              display: "inline-block",
            }}
          />
          {showAlert ? (
            <AlertCircleFilled
              size={20}
              fill={iconColor}
              style={{ position: "absolute", top: -1.78, right: -0.85 }}
            />
          ) : null}
        </div>
        <div className="flex flex-col" style={{ gap: 5 }}>
          <p
            className="font-urbanist font-semibold"
            style={{ fontSize: 20, lineHeight: 1, color: "#111", margin: 0 }}
          >
            {title}
          </p>
          <p
            className="font-urbanist"
            style={{ fontSize: 17.5, lineHeight: 1, color: "#111", margin: 0 }}
          >
            {subtitle}
          </p>
        </div>
      </div>
      <span
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontWeight: 400,
          fontSize: 17.5,
          lineHeight: 1,
          color: "#111",
          opacity: 0.5,
          textAlign: "right",
          width: 194.351,
        }}
      >
        {time}
      </span>
    </div>
  );
}

function AlertCircleFilled({
  size = 20,
  fill = "#ee392c",
  style,
}: {
  size?: number;
  fill?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      aria-hidden
      style={style}
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M12 7v5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1.2" fill="#fff" />
    </svg>
  );
}

// Activity Logs body — Figma 177:31289. Horizontal timeline with 6
// waypoints (one active, larger filled marker), plus an Emma Howard
// user pill below the timeline.
function ActivityLogsBody() {
  const waypoints: {
    left: number;
    top: number;
    width: number;
    time: string;
    label: string;
    active?: boolean;
  }[] = [
    { left: 54, top: 401, width: 52, time: "02:32", label: "Identify" },
    { left: 204, top: 401, width: 110, time: "02:33", label: "access updated" },
    { left: 412, top: 383, width: 152, time: "02:33", label: "opened document", active: true },
    { left: 662, top: 401, width: 124, time: "02:33", label: "updated presence" },
    { left: 884, top: 401, width: 136, time: "02:33", label: "activated comment" },
    { left: 1118, top: 401, width: 116, time: "02:33", label: "added comment" },
  ];

  return (
    <>
      {/* Horizontal timeline line */}
      <div
        className="absolute"
        style={{
          left: 0,
          top: 409,
          width: 1280,
          height: 1,
          background: "rgba(17,17,17,0.08)",
        }}
      />

      {waypoints.map((w) => (
        <TimelineWaypoint key={w.label} {...w} />
      ))}

      {/* Emma Howard user pill */}
      <div
        className="absolute flex items-center justify-between"
        style={{
          left: 424,
          top: 559,
          width: 433,
          padding: "8px 32px 8px 8px",
          background: "#f5f5f5",
          borderRadius: 52,
        }}
      >
        <div className="flex items-center" style={{ gap: 12 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/features/admin-console/emma-howard.png"
              alt="Emma Howard avatar"
              width={54}
              height={54}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col" style={{ gap: 4 }}>
            <p
              className="font-urbanist font-bold"
              style={{ fontSize: 20, lineHeight: 1.2, color: "#000", margin: 0 }}
            >
              Emma Howard
            </p>
            <p
              className="font-urbanist"
              style={{
                fontSize: 15,
                lineHeight: 1.2,
                color: "#000",
                opacity: 0.52,
                margin: 0,
                fontWeight: 500,
              }}
            >
              emma@trombone.com
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end" style={{ gap: 2 }}>
          <p
            className="font-urbanist"
            style={{
              fontSize: 12,
              lineHeight: 1.2,
              color: "#000",
              letterSpacing: "0.48px",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Last Online
          </p>
          <div className="flex items-center" style={{ gap: 6 }}>
            <p
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1.2,
                color: "#000",
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              5m Ago
            </p>
            <svg
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <circle cx={7} cy={7} r={6.5} stroke="#ECA92F" />
              <circle cx={7} cy={7} r={4} fill="#ECA92F" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

function TimelineWaypoint({
  left,
  top,
  width,
  time,
  label,
  active,
}: {
  left: number;
  top: number;
  width: number;
  time: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left, top, width, gap: active ? 8 : 12 }}
    >
      {active ? <ActiveDocumentMarker /> : <RingMarker />}
      <div
        className="flex flex-col items-center"
        style={{ gap: active ? 9 : 8, width: "100%" }}
      >
        <p
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontWeight: 400,
            fontSize: active ? 15.75 : 14,
            lineHeight: 1.2,
            color: "#000",
            opacity: 0.52,
            margin: 0,
            textTransform: "capitalize",
            whiteSpace: "nowrap",
          }}
        >
          {time}
        </p>
        <p
          className="font-urbanist font-semibold"
          style={{
            fontSize: active ? 18 : 16,
            lineHeight: 1.2,
            color: "#000",
            margin: 0,
            textTransform: "capitalize",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function RingMarker() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden>
      <circle cx={8} cy={8} r={6.5} fill="#fff" stroke="#625df5" strokeWidth={2} />
      <circle cx={8} cy={8} r={2.4} fill="#625df5" />
    </svg>
  );
}

function ActiveDocumentMarker() {
  return (
    <svg width={52} height={52} viewBox="0 0 52 52" aria-hidden>
      <circle cx={26} cy={26} r={25} fill="#625df5" stroke="#3a36c2" strokeWidth={2} />
      <g transform="translate(16 14)" stroke="#fff" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 0H4a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V5z" />
        <path d="M14 0v5h5" />
      </g>
    </svg>
  );
}

// Light-theme Dev Tools panel (Figma 177:31209). Light variant of the
// dark panel inside the Debugger tab — same shape, light surfaces.
function DebugDevToolsPanel() {
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
    { icon: "user", label: "User Authenticated", time: "14:24:25" },
  ];
  return (
    <div
      className="absolute"
      style={{
        left: 227,
        top: 383,
        width: 826,
        height: 638,
        border: "1px solid rgba(17,17,17,0.12)",
        borderRadius: 26,
        background: "#fff",
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
              background: t.active ? "#111" : "transparent",
              fontFamily: "'Geist Mono', monospace",
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 0.9,
              color: t.active ? "#fff" : "rgba(17,17,17,0.52)",
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
              color: "#111",
              textTransform: "uppercase",
            }}
          >
            Listening...
          </span>
        </div>
        <div
          className="flex items-center"
          style={{
            border: "1px solid rgba(17,17,17,0.12)",
            borderRadius: 14,
            padding: 16,
            gap: 14,
            width: 379,
          }}
        >
          <SearchIcon />
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 500,
              fontSize: 18,
              lineHeight: 0.9,
              color: "rgba(17,17,17,0.52)",
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
          background: "rgba(17,17,17,0.08)",
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
                : "1px solid rgba(17,17,17,0.08)",
              background: e.highlighted ? "rgba(29,85,196,0.07)" : "transparent",
              borderRadius: e.highlighted ? 12 : 0,
            }}
          >
            <div className="flex items-center" style={{ gap: 14 }}>
              <EventIcon kind={e.icon} />
              <span
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 16,
                  color: "#111",
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
                color: "#111",
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

// Card 2 — Navigate Data with Ease (Figma 176:29688). White card with
// heading + dual CTAs at top and a 1526px-wide file browser table at
// left:54 top:292 — the table intentionally overflows the 1280 card on
// the right (clipped by overflow:hidden), and the bottom rows are
// clipped by the 711px card height.
function Card2NavigateData() {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "100px 80px" }}
    >
      <div
        className="overflow-hidden"
        style={{
          width: 1280,
          background: "#fff",
          border: "2px solid #0e0d36",
          borderRadius: 32,
        }}
      >
        <NavigateDataCard />
        <TestimonialBannerAttached t={ethanTestimonial} />
      </div>
    </section>
  );
}

function NavigateDataCard() {
  return (
    <div
      className="relative"
      style={{ width: 1280, height: 711, overflow: "hidden" }}
    >
      {/* Heading + subhead + dual CTAs centred at top:55 */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          top: 55,
          left: "50%",
          transform: "translateX(-50%)",
          gap: 32,
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{ gap: 12, width: 691, textAlign: "center" }}
        >
          <h2
            className="font-urbanist font-bold"
            style={{
              fontSize: 52,
              lineHeight: 1.2,
              letterSpacing: "-1.56px",
              color: "#111",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Navigate Data with Ease
          </h2>
          <p
            className="font-urbanist"
            style={{
              fontSize: 20,
              lineHeight: 1.2,
              color: "#111",
              margin: 0,
            }}
          >
            Enable multiplayer editing, text comments, version history and more
          </p>
        </div>
        <div className="flex items-start" style={{ gap: 12 }}>
          {/* View Docs (secondary, bordered, with book icon) */}
          <a
            href="https://docs.velt.dev/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center font-urbanist font-semibold whitespace-nowrap"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              borderRadius: 8,
              background: "transparent",
              color: "#111",
              fontSize: 16,
              lineHeight: 1.2,
              letterSpacing: "-0.48px",
              textDecoration: "none",
              border: "2px solid #3f12a1",
              gap: 4,
            }}
          >
            <Book2Icon size={18} stroke="#111" />
            View Docs
          </a>
          {/* View All Examples (primary, filled #3f12a1) */}
          <a
            href="https://velt.dev/examples"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center font-urbanist font-semibold whitespace-nowrap"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              borderRadius: 8,
              background: "#3f12a1",
              color: "#fff",
              fontSize: 16,
              lineHeight: 1.2,
              letterSpacing: "-0.48px",
              textDecoration: "none",
              border: "2px solid #3f12a1",
            }}
          >
            View All Examples
          </a>
        </div>
      </div>

      {/* File browser table — light theme, overflows past 1280 on the right */}
      <NavigateFileBrowser />
    </div>
  );
}

function NavigateFileBrowser() {
  return (
    <div
      className="absolute"
      style={{
        left: 54,
        top: 292,
        width: 1526,
        border: "2.586px solid #111",
        borderRadius: 16,
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Dark header bar with breadcrumb + download icon */}
      <div
        className="flex items-center justify-between"
        style={{
          height: 71.127,
          background: "#111",
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
        <NavigateColumn
          heading="Folders"
          rows={[
            { kind: "skeleton", width: 280.629 },
            { kind: "skeleton", width: 389.259 },
            { kind: "folderActive" },
          ]}
        />
        <NavigateColumn
          heading="documents"
          rows={[
            { kind: "skeleton", width: 280.629 },
            { kind: "documentActive" },
            { kind: "skeleton", width: 389.259 },
          ]}
        />
        <NavigateColumn
          heading="Locations"
          rows={[
            { kind: "skeleton", width: 280.629 },
            { kind: "skeleton", width: 389.259 },
            { kind: "skeleton", width: 280.629 },
            { kind: "skeleton", width: 389.259 },
          ]}
        />
      </div>
    </div>
  );
}

type NavigateRow =
  | { kind: "skeleton"; width: number }
  | { kind: "folderActive" }
  | { kind: "documentActive" };

function NavigateColumn({
  heading,
  rows,
}: {
  heading: string;
  rows: NavigateRow[];
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        flex: "1 0 0",
        minWidth: 0,
        border: "1.617px solid #f5f5f5",
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
          borderBottom: "1.617px solid #f0f0f0",
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
            color: "#111",
            opacity: 0.85,
            letterSpacing: "1.6165px",
            textTransform: "uppercase",
          }}
        >
          {heading}
        </span>
        <div className="flex items-center" style={{ padding: 6.466 }}>
          <FilterIcon size={25.864} />
        </div>
      </div>

      {rows.map((row, i) => (
        <NavigateRowEl key={i} row={row} />
      ))}
    </div>
  );
}

function NavigateRowEl({ row }: { row: NavigateRow }) {
  if (row.kind === "skeleton") {
    return (
      <div
        className="flex items-center"
        style={{
          height: 64.661,
          paddingLeft: 25.864,
          paddingRight: 25.864,
          paddingTop: 19.398,
          paddingBottom: 19.398,
          borderBottom: "1.617px solid #f0f0f0",
          opacity: 0.8,
        }}
      >
        <div
          style={{
            width: row.width,
            height: 25.864,
            borderRadius: 41.383,
            background: "#f6f6f6",
          }}
        />
      </div>
    );
  }
  if (row.kind === "folderActive") {
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
          borderBottom: "1.617px solid #f0f0f0",
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
            color: "#111",
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
        <ChevronRightIcon size={22.631} />
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
        borderTop: "1.617px solid #f0f0f0",
        borderBottom: "1.617px solid #f0f0f0",
        borderLeft: "2.586px solid #e6325f",
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
          color: "#111",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        sales-video-v2-after-effects
      </span>
      <ChevronRightIcon size={22.631} />
    </div>
  );
}

// Card 3 — Configure Advanced Webhooks (Figma 176:29516). Reuses the
// same FeatureFlowDiagram component shipped on /features/comments
// ("REST APIs and Webhooks"); only the copy changes per Figma. Stages
// mirror the commenting seed (Comment Added → Transform → Partners).
const WEBHOOK_FLOW_PARTNERS = "/images/features/comments/flow/partners";
const WEBHOOK_FLOW_STAGES: FeatureFlowStage[] = [
  { label: "Comment Added", color: "#ff4f00" },
  { label: "Transform", color: "#ffc12f", labelColor: "#111" },
  {
    label: "Partners",
    color: "#0b353b",
    isCarousel: true,
    carouselLogos: [
      { src: `${WEBHOOK_FLOW_PARTNERS}/hubspot.svg`, alt: "HubSpot" },
      { src: `${WEBHOOK_FLOW_PARTNERS}/close.svg`, alt: "Close" },
      { src: `${WEBHOOK_FLOW_PARTNERS}/zapier.svg`, alt: "Zapier" },
      { src: `${WEBHOOK_FLOW_PARTNERS}/calque.svg`, alt: "Brand mark" },
      { src: `${WEBHOOK_FLOW_PARTNERS}/brand-logo-1.svg`, alt: "Brand mark" },
      { src: `${WEBHOOK_FLOW_PARTNERS}/brand-logo-2.svg`, alt: "Brand mark" },
      { src: `${WEBHOOK_FLOW_PARTNERS}/loops.svg`, alt: "Loops" },
      { src: `${WEBHOOK_FLOW_PARTNERS}/keylines.svg`, alt: "Brand mark" },
      { src: `${WEBHOOK_FLOW_PARTNERS}/discord.svg`, alt: "Discord" },
      { src: `${WEBHOOK_FLOW_PARTNERS}/opentelemetry.svg`, alt: "OpenTelemetry" },
      { src: `${WEBHOOK_FLOW_PARTNERS}/inngest.png`, alt: "Inngest" },
    ],
  },
];

function Card3ConfigureWebhooks() {
  return (
    <FeatureFlowDiagram
      heading="Configure Advanced Webhooks"
      subheading="Enable multiplayer editing, text comments, version history and more"
      viewDocsCta={{ label: "View Docs", href: "https://docs.velt.dev/", newTab: true }}
      primaryCta={{ label: "View All Examples", href: "https://velt.dev/examples", newTab: true }}
      stages={WEBHOOK_FLOW_STAGES}
      testimonial={ethanTestimonial}
    />
  );
}

// Card 4 — narrower 912-wide integrations bento (Figma 177:31688). Reuses
// the homepage Connectors cell logic verbatim (components/home/Connectors.tsx)
// — same per-logo `calc(X% − Ypx)` positioning and the same single-PNG
// composites for Messaging/Email — so we get pixel-perfect cells without
// duplicating the homepage's wider 1280 chrome. Cells are 448×365 here vs.
// 632×365 on the homepage; percent positions adapt automatically.
type IntegrationLogo = {
  src: string;
  alt: string;
  left: string;
  top: string;
  w: number;
  h: number;
};

type IntegrationCategory = {
  title: string;
  description: string;
  logos: IntegrationLogo[];
  emailComposite?: boolean;
};

const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  // Row 1
  {
    title: "Messaging",
    description: "Push messages to Discord, Slack and Microsoft Teams",
    logos: [
      {
        src: "/images/home/connector-messaging.png",
        alt: "Discord, Slack, Microsoft Teams",
        left: "calc(50% - 134.5px)",
        top: "calc(40% - 47px)",
        w: 269,
        h: 94,
      },
    ],
  },
  {
    title: "Storage",
    description: "Store data on platforms like GCP, AWS S3, or Microsoft Azure",
    logos: [
      {
        src: "/images/home/connector-storage-gcp.png",
        alt: "Google Cloud Storage",
        left: "calc(25.6219% - 57.1889px)",
        top: "calc(23.5616% - 39.4298px)",
        w: 114,
        h: 79,
      },
      {
        src: "/images/home/connector-storage-aws.png",
        alt: "AWS S3",
        left: "calc(52.9851% - 52.6501px)",
        top: "calc(48.4932% - 24.0205px)",
        w: 105,
        h: 48,
      },
      {
        src: "/images/home/connector-storage-azure.png",
        alt: "Microsoft Azure Blob Storage",
        left: "calc(68.1592% - 82.1523px)",
        top: "calc(23.5616% - 24.4737px)",
        w: 164,
        h: 49,
      },
    ],
  },
  // Row 2
  {
    title: "CRM",
    description: "Link collaboration data to your customer lists",
    logos: [
      {
        src: "/images/home/connector-crm-hubspot.png",
        alt: "HubSpot",
        left: "calc(27.6119% - 52.5px)",
        top: "calc(40% - 15.5px)",
        w: 105,
        h: 31,
      },
      {
        src: "/images/home/connector-crm-close.png",
        alt: "Close",
        left: "calc(67.1642% - 53.5px)",
        top: "calc(40% - 14.75px)",
        w: 107,
        h: 30,
      },
    ],
  },
  {
    title: "Analytics",
    description: "Collect telemetry for analytics platforms",
    logos: [
      {
        src: "/images/home/connector-analytics-otel.png",
        alt: "OpenTelemetry",
        left: "calc(37.3134% - 63.75px)",
        top: "calc(41.0959% - 24px)",
        w: 128,
        h: 48,
      },
      {
        src: "/images/home/connector-analytics-segment.png",
        alt: "Segment",
        left: "calc(72.6368% - 23.25px)",
        top: "calc(41.0959% - 23.75px)",
        w: 47,
        h: 48,
      },
    ],
  },
  // Row 3
  {
    title: "Workflow Automation",
    description: "Make Velt features a part of existing workflows",
    logos: [
      {
        src: "/images/home/connector-workflow-inngest.png",
        alt: "Inngest",
        left: "calc(16.6667% - 21.75px)",
        top: "calc(35.0685% - 22.25px)",
        w: 44,
        h: 45,
      },
      {
        src: "/images/home/connector-workflow-zapier.png",
        alt: "Zapier",
        left: "calc(48.5075% - 56.25px)",
        top: "calc(35.0685% - 15.5px)",
        w: 113,
        h: 31,
      },
      {
        src: "/images/home/connector-workflow-windmill.png",
        alt: "Windmill",
        left: "calc(78.1095% - 20.5px)",
        top: "calc(34.5206% - 20.5px)",
        w: 41,
        h: 41,
      },
    ],
  },
  {
    title: "Email",
    description: "Send email notifications or updates on popular platforms",
    emailComposite: true,
    logos: [
      {
        src: "/images/home/connector-email.png",
        alt: "Resend, Customer.io, Loops, Sendgrid",
        left: "57px",
        top: "81px",
        w: 0,
        h: 0,
      },
    ],
  },
];

function Card4ExtendIntegrations() {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "60px 80px 120px" }}
    >
      <div
        className="flex flex-col items-center"
        style={{ width: 912, gap: 40 }}
      >
        {/* Header */}
        <div
          className="flex flex-col items-center"
          style={{ gap: 32, width: 691, textAlign: "center" }}
        >
          <div className="flex flex-col items-center" style={{ gap: 12 }}>
            <h3
              className="font-urbanist font-bold"
              style={{
                fontSize: 48,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                color: "#111",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              Extend Velt with pre-built Integrations
            </h3>
            <p
              className="font-urbanist"
              style={{ fontSize: 20, lineHeight: 1.2, color: "#111", margin: 0 }}
            >
              Velt connects with other services in your product workflow
            </p>
          </div>
          <div className="flex items-start" style={{ gap: 12 }}>
            {/* CTAs match the homepage Connectors block — green-tinted
                View Docs (purple border + mix-blend-exclusion text) and a
                solid purple primary button. */}
            <a
              href="https://docs.velt.dev/"
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-1 rounded-lg"
              style={{
                width: 156,
                height: 44,
                padding: "8px 16px",
                border: "2px solid #3152f5",
                textDecoration: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/icon-book-2.svg" alt="" width={18} height={18} />
              <span
                className="font-urbanist font-semibold text-white whitespace-nowrap"
                style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}
              >
                View Docs
              </span>
            </a>
            <a
              href="https://velt.dev/examples"
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 156,
                height: 44,
                padding: "8px 16px",
                background: "#625cf4",
                textDecoration: "none",
              }}
            >
              <span
                className="font-urbanist font-semibold text-white whitespace-nowrap"
                style={{ fontSize: 16, letterSpacing: "-0.03em" }}
              >
                View All Examples
              </span>
            </a>
          </div>
        </div>

        {/* 2×3 bento — 3 flex rows of 2 cells, each 448×365 (912 width) */}
        <div className="flex flex-col" style={{ width: 912, gap: 16 }}>
          {[0, 2, 4].map((rowStart) => (
            <div
              key={rowStart}
              className="flex"
              style={{ gap: 16, width: "100%" }}
            >
              <IntegrationCell cat={INTEGRATION_CATEGORIES[rowStart]} />
              <IntegrationCell cat={INTEGRATION_CATEGORIES[rowStart + 1]} />
            </div>
          ))}
        </div>

        {/* Free-standing Yuri testimonial — same component as Security */}
        <InlineTestimonialCard
          name={yuriTestimonial.name}
          role={yuriTestimonial.role}
          quote={yuriTestimonial.quote}
          avatarSrc={yuriTestimonial.avatarSrc}
        />
      </div>
    </section>
  );
}

function IntegrationCell({ cat }: { cat: IntegrationCategory }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        flex: "1 0 0",
        height: 365,
        background: "#f4f4f5",
        borderRadius: 24,
      }}
    >
      {cat.emailComposite ? (
        <div
          style={{
            position: "absolute",
            top: 81,
            right: 56,
            bottom: 185,
            left: 57,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cat.logos[0].src}
            alt={cat.logos[0].alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>
      ) : (
        cat.logos.map((logo) => (
          <div
            key={logo.alt}
            style={{
              position: "absolute",
              left: logo.left,
              top: logo.top,
              width: logo.w,
              height: logo.h,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        ))
      )}

      <div
        className="flex flex-col items-start"
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          right: 30,
          gap: 8,
        }}
      >
        <h3
          className="font-urbanist font-bold"
          style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}
        >
          {cat.title}
        </h3>
        <p
          className="font-urbanist"
          style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}
        >
          {cat.description}
        </p>
      </div>
    </div>
  );
}

// ---------- Shared helpers ----------

function PrimaryCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center justify-center font-urbanist font-semibold whitespace-nowrap"
      style={{
        minWidth: 156,
        height: 44,
        padding: "8px 16px",
        borderRadius: 8,
        background: "#615df5",
        color: "#fff",
        fontSize: 16,
        letterSpacing: "-0.03em",
        textDecoration: "none",
        border: "2px solid #615df5",
      }}
    >
      {label}
    </a>
  );
}

function SecondaryCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center justify-center font-urbanist font-semibold whitespace-nowrap"
      style={{
        minWidth: 156,
        height: 44,
        padding: "8px 16px",
        borderRadius: 8,
        background: "transparent",
        color: "#fff",
        fontSize: 16,
        letterSpacing: "-0.03em",
        textDecoration: "none",
        border: "2px solid #615df5",
        mixBlendMode: "exclusion",
      }}
    >
      {label}
    </a>
  );
}

function TestimonialBannerAttached({ t }: { t: Testimonial }) {
  // Attached to the bottom edge of the white outer card (Card 1 only —
  // the shell does this for cards 2/3 automatically). Compact spec from
  // Phase 4.1: bg #1c1d21, padding 40 vertical / 52 horizontal, no fixed
  // height (driven by avatar + padding ≈ 132).
  return (
    <div
      style={{
        background: "#1c1d21",
        padding: "40px 52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}
    >
      <div className="flex items-center" style={{ gap: 16, flexShrink: 0 }}>
        <Avatar src={t.avatarSrc} alt={t.name} />
        <div className="flex flex-col" style={{ gap: 4 }}>
          <p
            className="font-urbanist font-semibold"
            style={{
              color: "#fff",
              fontSize: 18,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {t.name}
          </p>
          <p
            className="font-urbanist"
            style={{
              color: "#fff",
              opacity: 0.52,
              fontSize: 16,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {t.role}
          </p>
        </div>
      </div>
      <p
        className="font-urbanist font-semibold"
        style={{
          color: "#fff",
          fontSize: 24,
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          width: 421,
          flexShrink: 0,
          margin: 0,
        }}
      >
        {t.quote}
      </p>
    </div>
  );
}

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        border: "2px solid #B4B1FA",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
