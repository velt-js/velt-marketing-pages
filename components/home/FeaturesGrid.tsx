"use client";

/* eslint-disable @next/next/no-img-element */

// FeaturesGrid — responsive rewrite:
//
//  • lg+: matches Figma — 1280px-wide bordered container with TabRail across
//    the top and per-tab grids inside (Async = 6 cards in an asymmetric 2-col
//    layout; Realtime/AI = 2×2 grid of 640×450 cards).
//  • <lg: TabRail wraps; each tab renders as a vertical stack of full-width
//    cards (image on top, title + description below). Borders simplified to
//    a single bottom rule between cards.
//
// Data lives in plain arrays keyed by tab so both layouts share the same
// definitions.

import { useState } from "react";

type TabId = "async" | "realtime" | "ai";

const FEATURE_GRID_PATH = "/images/home/feature-grid";

interface AsyncCardDef {
  src: string;
  title: string;
  desc: string;
  // Desktop-only absolute positioning (Figma exact). Mobile ignores these.
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

interface GridCardDef {
  src: string;
  title: string;
  desc: string;
  borderRight?: boolean;
  borderBottom?: boolean;
}

const REALTIME_CARDS: GridCardDef[] = [
  { src: `${FEATURE_GRID_PATH}/Multiplayer%20Editing.png`, title: "Multiplayer Editing", desc: "Co-edit documents in real-time and see who is working with you", borderRight: true, borderBottom: true },
  { src: `${FEATURE_GRID_PATH}/Huddle.png`, title: "Huddle", desc: "Drop into impromptu live calls with audio, video, and screensharing", borderBottom: true },
  { src: `${FEATURE_GRID_PATH}/Cursor%20%26%20Presence.png`, title: "Cursor & Presence", desc: "See who is online working with you and where they are", borderRight: true },
  { src: `${FEATURE_GRID_PATH}/Single%20Editor%20Mode.png`, title: "Single Editor Mode", desc: "Limit editing control to one user in collaborative scenarios" },
];

const AI_CARDS: GridCardDef[] = [
  { src: `${FEATURE_GRID_PATH}/Contextual%20Text%20Suggestions.png`, title: "Contextual Text Suggestions", desc: "Get copy suggestions right within the commenting tool", borderRight: true, borderBottom: true },
  { src: `${FEATURE_GRID_PATH}/AI%20Insights.png`, title: "AI Insights", desc: "Chat with your Velt data using AI", borderBottom: true },
  { src: `${FEATURE_GRID_PATH}/Ask%20AI.png`, title: "Ask AI", desc: "Highlight text and ask AI questions, based on that context", borderRight: true },
  { src: `${FEATURE_GRID_PATH}/AI%20Assisted%20Implementation.png`, title: "AI-Assisted Implementation", desc: "Get instant guidance powered by our docs MCP" },
];

function TabRail({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  const tabs: { id: TabId; label: string }[] = [
    { id: "async", label: "Async" },
    { id: "realtime", label: "Realtime" },
    { id: "ai", label: "AI" },
  ];
  return (
    <div
      className="lg:absolute flex items-center justify-center w-full"
      style={{
        top: -2,
        left: -2,
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

// Single mobile/tablet card — image up top, title + desc below. Used for
// the <lg flat list across all three tabs.
function MobileFeatureCard({ src, title, desc, isLast }: { src: string; title: string; desc: string; isLast?: boolean }) {
  return (
    <article
      className="flex flex-col bg-white w-full overflow-hidden"
      style={{ borderBottom: isLast ? undefined : "2px solid #111" }}
    >
      <div className="relative w-full" style={{ aspectRatio: "640 / 450" }}>
        <img src={src} alt={title} className="absolute inset-0 w-full h-full object-cover object-top" />
      </div>
      <div className="flex flex-col items-start gap-2 px-6 py-6">
        <h3
          className="font-urbanist font-bold"
          style={{ color: "#111", fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.2, letterSpacing: "-0.03em" }}
        >
          {title}
        </h3>
        <p
          className="font-urbanist"
          style={{ color: "#111", fontSize: 16, lineHeight: 1.3, opacity: 0.6 }}
        >
          {desc}
        </p>
      </div>
    </article>
  );
}

/* =========================================================================
 * Desktop tab grids — preserved 1:1 from Figma. Wrapped in `hidden lg:block`
 * so they don't render below lg.
 * ========================================================================= */

function AsyncGridDesktop() {
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

function DesktopGridCard({ card }: { card: GridCardDef }) {
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

function GridDesktop2x2({ cards }: { cards: GridCardDef[] }) {
  return (
    <div style={{ paddingTop: 47 }}>
      <div className="flex">
        {cards.slice(0, 2).map((card) => <DesktopGridCard key={card.src} card={card} />)}
      </div>
      <div className="flex">
        {cards.slice(2, 4).map((card) => <DesktopGridCard key={card.src} card={card} />)}
      </div>
    </div>
  );
}

/* =========================================================================
 * Testimonial
 * ========================================================================= */

function TestimonialStrip() {
  return (
    <div
      className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4 lg:gap-0"
      style={{
        background: "#111",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        padding: "24px 28px",
        marginTop: -2,
      }}
    >
      <div className="flex items-center gap-4">
        <img src="/images/features/comments/trust-us/avatar-ethan.png" alt="Ethan Veres" className="rounded-full object-cover" style={{ width: 52, height: 52 }} />
        <div className="flex flex-col gap-1">
          <span className="font-urbanist font-semibold text-white" style={{ fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.03em" }}>Ethan Veres</span>
          <span className="font-urbanist text-white" style={{ fontSize: 16, lineHeight: 1.2, opacity: 0.52, letterSpacing: "-0.03em" }}>CTO @eqtble</span>
        </div>
      </div>
      <p
        className="font-urbanist font-semibold text-white lg:max-w-[380px]"
        style={{ fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.3, letterSpacing: "-0.03em" }}
      >
        Commenting is something we wanted in our app, Velt made it possible
      </p>
    </div>
  );
}

export function FeaturesGrid() {
  const [activeTab, setActiveTab] = useState<TabId>("async");
  // Async grid is 1327 tall (3-row asymmetric); Realtime/AI are 900+47=947
  const gridHeight = activeTab === "async" ? 1327 : 947;

  const mobileCards =
    activeTab === "async" ? ASYNC_CARDS : activeTab === "realtime" ? REALTIME_CARDS : AI_CARDS;

  return (
    <section className="flex flex-col items-center bg-white gap-10 lg:gap-13 px-6 lg:px-20 pt-20 lg:pt-[150px]">
      {/* Header */}
      <div className="flex flex-col items-center max-w-[800px] w-full gap-6 lg:gap-8">
        <div className="flex flex-col items-center text-center gap-3">
          <h2
            className="font-urbanist font-bold"
            style={{
              color: "#111",
              fontSize: "clamp(28px, 4.2vw, 52px)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            Collaborative Features
            <br />
            for Any Scenario
          </h2>
          <p
            className="font-urbanist"
            style={{
              color: "#111",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              lineHeight: 1.3,
            }}
          >
            A full suite of features that let your users collaborate and drive engagement
          </p>
        </div>
        <div className="flex items-start gap-3">
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
      <div className="flex flex-col items-center w-full max-w-[1280px]">
        {/* Desktop grid — absolute-positioned cards inside the bordered frame. */}
        <div
          className="hidden lg:block relative bg-white overflow-hidden w-full"
          style={{
            height: gridHeight,
            border: "2px solid #111",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <TabRail active={activeTab} onChange={setActiveTab} />
          {activeTab === "async" && <AsyncGridDesktop />}
          {activeTab === "realtime" && <GridDesktop2x2 cards={REALTIME_CARDS} />}
          {activeTab === "ai" && <GridDesktop2x2 cards={AI_CARDS} />}
        </div>

        {/* Mobile / tablet — flat single-column list with the TabRail on top
            as a normal block instead of an absolute overlay. */}
        <div
          className="lg:hidden w-full bg-white overflow-hidden"
          style={{
            border: "2px solid #111",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <TabRail active={activeTab} onChange={setActiveTab} />
          <div className="flex flex-col w-full">
            {mobileCards.map((card, i) => (
              <MobileFeatureCard
                key={card.src}
                src={card.src}
                title={card.title}
                desc={card.desc}
                isLast={i === mobileCards.length - 1}
              />
            ))}
          </div>
        </div>

        <TestimonialStrip />
      </div>
    </section>
  );
}
