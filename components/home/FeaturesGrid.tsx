"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

type TabId = "async" | "realtime" | "ai";

const FEATURE_GRID_PATH = "/images/home/feature-grid";

function TabRail({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  const tabs: { id: TabId; label: string }[] = [
    { id: "async", label: "Async" },
    { id: "realtime", label: "Realtime" },
    { id: "ai", label: "AI" },
  ];
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        top: -2,
        left: -2,
        width: 1280,
        height: 47,
        background: "#1c1d21",
        padding: "6px 16px 4px",
        zIndex: 2,
      }}
    >
      <div className="flex items-start gap-2">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className="flex items-center rounded-lg font-firamono font-medium uppercase whitespace-nowrap cursor-pointer"
              style={{
                padding: "8px 12px",
                background: isActive ? "#625df5" : "transparent",
                color: isActive ? "#fff" : "rgba(255,255,255,0.52)",
                fontSize: 14,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                border: 0,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
 * ASYNC TAB — each card renders its Figma-exported image + title overlay
 * ========================================================================= */

interface AsyncCardDef {
  src: string;
  title: string;
  desc: string;
  top: number;
  left: number;
  width: number;
  height: number;
  borderRight?: boolean;
  borderBottom?: boolean;
}

const ASYNC_CARDS: AsyncCardDef[] = [
  { src: `${FEATURE_GRID_PATH}/Comment.png`, title: "Comments", desc: "Leave precise feedback with contextual comments on any element", top: 47, left: 0, width: 640, height: 493, borderRight: true, borderBottom: true },
  { src: `${FEATURE_GRID_PATH}/AI%20Review.png`, title: "Automated AI Reviews", desc: "Help your users review their first drafts automatically", top: 47, left: 640, width: 640, height: 326, borderBottom: true },
  { src: `${FEATURE_GRID_PATH}/Annotation%20Mode.png`, title: "Annotation Mode", desc: "Mark and highlight sections", top: 540, left: 0, width: 640, height: 461, borderRight: true, borderBottom: true },
  { src: `${FEATURE_GRID_PATH}/Notifications.png`, title: "Notifications", desc: "Get collaboration notifications or push your own", top: 373, left: 640, width: 640, height: 530, borderBottom: true },
  { src: `${FEATURE_GRID_PATH}/View%20Analytics.png`, title: "View Analytics", desc: "Track users view activity", top: 1001, left: 0, width: 640, height: 326, borderRight: true },
  { src: `${FEATURE_GRID_PATH}/Recording.png`, title: "Recordings", desc: "Share clearer messages and feedback with audio, video, & contextual screen recordings", top: 903, left: 640, width: 640, height: 424 },
];

function AsyncGrid() {
  return (
    <>
      {ASYNC_CARDS.map((card) => (
        <div
          key={card.src}
          className="absolute overflow-hidden bg-white"
          style={{
            top: card.top,
            left: card.left,
            width: card.width,
            height: card.height,
            borderRight: card.borderRight ? "2px solid #111" : undefined,
            borderBottom: card.borderBottom ? "2px solid #111" : undefined,
          }}
        >
          <img src={card.src} alt={card.title} className="w-full object-cover object-top" style={{ height: "80%" }} />
          <div className="absolute flex flex-col items-start" style={{ left: 30, bottom: 29, gap: 8 }}>
            <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>{card.title}</h3>
            <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52, maxWidth: 395 }}>{card.desc}</p>
          </div>
        </div>
      ))}
    </>
  );
}

/* =========================================================================
 * REALTIME TAB
 * ========================================================================= */

interface GridCardDef {
  src: string;
  title: string;
  desc: string;
  borderRight?: boolean;
  borderBottom?: boolean;
}

function GridCard({ card }: { card: GridCardDef }) {
  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{
        width: 640,
        height: 450,
        borderRight: card.borderRight ? "2px solid #111" : undefined,
        borderBottom: card.borderBottom ? "2px solid #111" : undefined,
      }}
    >
      <img src={card.src} alt={card.title} className="w-full object-cover object-top" style={{ height: "80%" }} />
      <div className="absolute flex flex-col items-start" style={{ left: 31.5, bottom: 31.5, gap: 8 }}>
        <h3 className="font-urbanist font-bold whitespace-nowrap" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>{card.title}</h3>
        <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}>{card.desc}</p>
      </div>
    </div>
  );
}

const REALTIME_TOP_ROW: GridCardDef[] = [
  { src: `${FEATURE_GRID_PATH}/Multiplayer%20Editing.png`, title: "Multiplayer Editing", desc: "Co-edit documents in real-time and see who is working with you", borderRight: true, borderBottom: true },
  { src: `${FEATURE_GRID_PATH}/Huddle.png`, title: "Huddle", desc: "Drop into impromptu live calls with audio, video, and screensharing", borderBottom: true },
];

const REALTIME_BOTTOM_ROW: GridCardDef[] = [
  { src: `${FEATURE_GRID_PATH}/Cursor%20%26%20Presence.png`, title: "Cursor & Presence", desc: "See who is online working with you and where they are", borderRight: true },
  { src: `${FEATURE_GRID_PATH}/Single%20Editor%20Mode.png`, title: "Single Editor Mode", desc: "Limit editing control to one user in collaborative scenarios" },
];

function RealtimeGrid() {
  return (
    <div style={{ paddingTop: 47 }}>
      <div className="flex">
        {REALTIME_TOP_ROW.map((card) => <GridCard key={card.src} card={card} />)}
      </div>
      <div className="flex">
        {REALTIME_BOTTOM_ROW.map((card) => <GridCard key={card.src} card={card} />)}
      </div>
    </div>
  );
}

/* =========================================================================
 * AI TAB
 * ========================================================================= */

const AI_TOP_ROW: GridCardDef[] = [
  { src: `${FEATURE_GRID_PATH}/Contextual%20Text%20Suggestions.png`, title: "Contextual Text Suggestions", desc: "Get copy suggestions right within the commenting tool", borderRight: true, borderBottom: true },
  { src: `${FEATURE_GRID_PATH}/AI%20Insights.png`, title: "AI Insights", desc: "Chat with your Velt data using AI", borderBottom: true },
];

const AI_BOTTOM_ROW: GridCardDef[] = [
  { src: `${FEATURE_GRID_PATH}/Ask%20AI.png`, title: "Ask AI", desc: "Highlight text and ask AI questions, based on that context", borderRight: true },
  { src: `${FEATURE_GRID_PATH}/AI%20Assisted%20Implementation.png`, title: "AI-Assisted Implementation", desc: "Get instant guidance powered by our docs MCP" },
];

function AIGrid() {
  return (
    <div style={{ paddingTop: 47 }}>
      <div className="flex">
        {AI_TOP_ROW.map((card) => <GridCard key={card.src} card={card} />)}
      </div>
      <div className="flex">
        {AI_BOTTOM_ROW.map((card) => <GridCard key={card.src} card={card} />)}
      </div>
    </div>
  );
}

/* =========================================================================
 * SHARED
 * ========================================================================= */

function TestimonialStrip() {
  return (
    <div
      className="relative flex items-center justify-between"
      style={{
        width: 1280,
        height: 140,
        background: "#111",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        padding: "0 40px",
        marginTop: -2,
      }}
    >
      <div className="flex items-center" style={{ gap: 16 }}>
        <img src="/images/features/comments/trust-us/avatar-ethan.png" alt="Ethan Veres" className="rounded-full object-cover" style={{ width: 52, height: 52 }} />
        <div className="flex flex-col" style={{ gap: 4 }}>
          <span className="font-urbanist font-semibold text-white" style={{ fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.03em" }}>Ethan Veres</span>
          <span className="font-urbanist text-white" style={{ fontSize: 16, lineHeight: 1.2, opacity: 0.52, letterSpacing: "-0.03em" }}>CTO @eqtble</span>
        </div>
      </div>
      <p className="font-urbanist font-semibold text-white" style={{ fontSize: 20, maxWidth: 380, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
        Commenting is something we wanted in our app, Velt made it possible
      </p>
    </div>
  );
}

export function FeaturesGrid() {
  const [activeTab, setActiveTab] = useState<TabId>("async");
  // Async grid is 1327 tall (3-row asymmetric); Realtime/AI are 900+47=947
  const gridHeight = activeTab === "async" ? 1327 : 947;

  return (
    <section className="flex flex-col items-center bg-white" style={{ padding: "150px 80px 0", gap: 52 }}>
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 32, maxWidth: 800 }}>
        <div className="flex flex-col items-center text-center" style={{ gap: 12 }}>
          <h2 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
            Collaborative Features
            <br />
            for Any Scenario
          </h2>
          <p className="font-urbanist" style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}>
            A full suite of features that let your users collaborate and drive engagement
          </p>
        </div>
        <div className="flex items-start" style={{ gap: 12 }}>
          <button className="flex items-center justify-center gap-1 rounded-lg" style={{ width: 156, height: 44, padding: "8px 16px", border: "2px solid #625df5", background: "transparent" }}>
            <img src="/images/home/icon-book-2.svg" alt="" width={18} height={18} />
            <span className="font-urbanist font-semibold text-white whitespace-nowrap" style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}>View Docs</span>
          </button>
          <button className="flex items-center justify-center rounded-lg" style={{ width: 156, height: 44, padding: "8px 16px", background: "#625df5", border: 0 }}>
            <span className="font-urbanist font-semibold text-white whitespace-nowrap" style={{ fontSize: 16, letterSpacing: "-0.03em" }}>View All Examples</span>
          </button>
        </div>
      </div>

      {/* Feature grid + testimonial — attached, no gap between them */}
      <div className="flex flex-col items-center" style={{ width: 1280 }}>
        <div
          className="relative bg-white overflow-hidden"
          style={{
            width: 1280,
            height: gridHeight,
            border: "2px solid #111",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <TabRail active={activeTab} onChange={setActiveTab} />
          {activeTab === "async" && <AsyncGrid />}
          {activeTab === "realtime" && <RealtimeGrid />}
          {activeTab === "ai" && <AIGrid />}
        </div>
        <TestimonialStrip />
      </div>
    </section>
  );
}
