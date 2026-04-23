// StealFeatures — Figma node 32:2588 (carousel), 8506:97488 (section header).
// Header + two buttons, then an auto-scrolling horizontal marquee of 7 product
// cards (400×452 each, bg #f7f7f7, radius 24). Ported from the Framer `Ticker`
// pattern in the HTML reference (src/framer/chunks/chunk-JHL2URRN.js): left-
// scrolling, 25% edge fade, hover slows playback to HOVER_FACTOR (0.1).
// Motion uses CSS keyframes for the base loop; hover adjusts `playbackRate`
// on the Web Animations API Animation object to preserve position (changing
// CSS `animation-duration` on :hover restarts the loop in WebKit).
//
// Cards 1–3 use pre-exported PNG illustrations from /public/images/home.
// Cards 4–7 render illustrations inline in React (adapted from
// components/home/FeaturesGrid.tsx) since MCP-based Figma export is not
// available in read-only mode.

"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

const CARD_W = 400;
const CARD_H = 452;
const CARD_GAP = 16;
// Scroll speed in px/s. Framer Ticker default is 100 px/s — the marquee
// duration is derived from the track shift (one full card set) divided by this.
const SCROLL_SPEED = 100;
// Framer Ticker `hoverFactor` semantics: on hover, playbackRate = HOVER_FACTOR.
// 0.1 = slow to 10% of normal speed (very slow drift, not a hard pause).
const HOVER_FACTOR = 0.1;
// Illustration area sits above the bottom title block (logo + 2 lines).
// Title block starts around y=287 on the Figma frames.
const ILLUSTRATION_H = 264;

type CardDef = {
  title: string;
  subtitle: string;
  illustration: ReactNode;
  icon: ReactNode;
};

// ---- Inline illustrations (cards 4–7) --------------------------------------

function CoEditingIllustration() {
  const barBg = "#f3f3f3";
  const bar = (w: number): CSSProperties => ({
    height: 31.2,
    width: w,
    background: barBg,
    borderRadius: 25.6,
  });
  return (
    <>
      {/* 5 document bars — first bar has a pink highlight selection */}
      <div className="absolute flex flex-col" style={{ left: -66, top: 56, gap: 8.8 }}>
        <div className="relative" style={bar(347.2)}>
          <div
            className="absolute"
            style={{ left: 148, top: 0, width: 123.2, height: 31.2, background: "#ea35c0", opacity: 0.12 }}
          />
        </div>
        <div style={bar(347.2)} />
        <div style={bar(387.2)} />
        <div style={bar(280)} />
        <div style={bar(397.6)} />
      </div>

      {/* Bob label + stem */}
      <div className="absolute" style={{ left: 205, top: 24 }}>
        <div style={{ width: 3.2, height: 63.2, background: "#ea35c0" }} />
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: 0,
            top: 0,
            background: "#ea35c0",
            padding: "4.8px 9.6px",
            borderTopLeftRadius: 1.6,
            borderTopRightRadius: 25.6,
            borderBottomRightRadius: 25.6,
            borderBottomLeftRadius: 1.6,
          }}
        >
          <span
            className="font-firamono whitespace-nowrap"
            style={{ fontSize: 22.4, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, textTransform: "uppercase" }}
          >
            Bob
          </span>
        </div>
      </div>

      {/* Linda label + stem */}
      <div className="absolute" style={{ left: 221, top: 142.4 }}>
        <div style={{ width: 3.2, height: 67.2, background: "#0e9a5d" }} />
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: 0,
            top: 0,
            background: "#0e9a5d",
            padding: "4.8px 9.6px",
            borderTopLeftRadius: 1.6,
            borderTopRightRadius: 25.6,
            borderBottomRightRadius: 25.6,
            borderBottomLeftRadius: 1.6,
          }}
        >
          <span
            className="font-firamono whitespace-nowrap"
            style={{ fontSize: 22.4, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, textTransform: "uppercase" }}
          >
            Linda
          </span>
        </div>
      </div>
    </>
  );
}

function HuddlesIllustration() {
  return (
    <div
      className="absolute flex flex-col bg-white overflow-hidden"
      style={{
        left: 112,
        top: 28,
        width: 320,
        borderRadius: 16,
        border: "1px solid #f0f0f0",
        boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.06)",
        padding: "16px 20px 20px",
        gap: 16,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center" style={{ gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 13v-2a8 8 0 0116 0v2" />
            <path d="M4 15a1 1 0 011-1h2v5H5a1 1 0 01-1-1v-3z" />
            <path d="M17 14h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v-5z" />
          </svg>
          <span className="font-poppins whitespace-nowrap" style={{ fontSize: 13, color: "#0a0a0a" }}>2 people in Huddle</span>
        </div>
        <div className="flex items-center" style={{ gap: 2 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#625df5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="7" r="4" />
            <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="16" y1="11" x2="22" y2="11" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a0a0a">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </div>
      </div>

      {/* User rows */}
      <div className="flex flex-col" style={{ gap: 10 }}>
        <UserRow name="You" src="/images/home/features/austin-avatar-1.png" ring="#625df5" mode="muted" />
        <UserRow name="Linda" src="/images/home/features/austin-avatar-2.png" ring="#ffcd2e" mode="bars" barColor="#ffcd2e" />
        <UserRow name="mihir@velt.dev" initial="M" ring="#0dcf82" mode="bars" barColor="#0dcf82" />
      </div>

      {/* Leave button */}
      <div className="flex items-center" style={{ gap: 6 }}>
        <div
          className="flex-1 flex items-center justify-center rounded-full"
          style={{ height: 32, border: "1px solid #ff7162", gap: 6 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff7162" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
          <span className="font-poppins font-semibold uppercase" style={{ fontSize: 10, color: "#ff7162", letterSpacing: "0.05em", lineHeight: 1 }}>Leave</span>
        </div>
        <div className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, border: "1px solid #ccc" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#0a0a0a">
            <path d="M13 6.3L7.7 11.6c-.4.4-.4 1 0 1.4l5.3 5.3c.4.4 1 .4 1.4 0s.4-1 0-1.4L10.4 13h9.6c.6 0 1-.4 1-1s-.4-1-1-1h-9.6l4-4c.4-.4.4-1 0-1.4s-1-.4-1.4 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function UserRow({
  name,
  src,
  initial,
  ring,
  mode,
  barColor,
}: {
  name: string;
  src?: string;
  initial?: string;
  ring: string;
  mode: "muted" | "bars";
  barColor?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center" style={{ gap: 10 }}>
        <div className="relative" style={{ width: 22, height: 22 }}>
          {src ? (
            <div
              className="absolute inset-0 overflow-hidden rounded-full"
              style={{ border: "2px solid #fff", boxShadow: `0 0 0 1px ${ring}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="absolute w-full h-full object-cover" />
            </div>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-full text-white font-poppins font-medium"
              style={{ background: ring, fontSize: 10, border: "2px solid #fff", boxShadow: `0 0 0 1px ${ring}` }}
            >
              {initial}
            </div>
          )}
        </div>
        <span className="font-poppins whitespace-nowrap" style={{ fontSize: 13, color: "#0a0a0a" }}>{name}</span>
      </div>
      {mode === "muted" ? (
        <div className="flex items-center" style={{ gap: 3 }}>
          {/* mic muted, video muted, screen muted — simple crossed rectangles */}
          {[0, 1, 2].map((i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c64545" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="3" x2="21" y2="21" />
              <rect x="8" y="4" width="8" height="12" rx="4" opacity="0.5" />
            </svg>
          ))}
        </div>
      ) : (
        <div className="flex items-center" style={{ gap: 2, height: 18 }}>
          <div style={{ width: 2, height: 6, background: barColor, borderRadius: 3 }} />
          <div style={{ width: 2, height: 12, background: barColor, borderRadius: 3 }} />
          <div style={{ width: 2, height: 6, background: barColor, borderRadius: 3 }} />
        </div>
      )}
    </div>
  );
}

function PresenceCursorsIllustration() {
  return (
    <>
      {/* Selection rectangle */}
      <div
        className="absolute"
        style={{
          left: 122,
          top: 75,
          width: 172,
          height: 158.4,
          border: "1px solid #fe965c",
        }}
      />
      {/* 4 corner handles */}
      {[
        { left: 117, top: 70 },
        { left: 289, top: 70 },
        { left: 117, top: 228 },
        { left: 289, top: 228 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: pos.left,
            top: pos.top,
            width: 10,
            height: 10,
            background: "#fe965c",
            border: "2px solid #fff",
            boxShadow: "0 0 0 1px #fe965c",
          }}
        />
      ))}

      {/* Emma cursor at bottom-right of selection */}
      <div className="absolute" style={{ left: 296, top: 167 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/features/cursor-pointer-orange.svg" alt="" style={{ width: 26, height: 26, display: "block" }} />
        <div
          className="flex items-center rounded-full"
          style={{
            marginLeft: 26,
            marginTop: -2,
            background: "#fe965c",
            padding: "3px 12px",
            boxShadow: "0px 2px 7px 0px rgba(0,0,0,0.16)",
          }}
        >
          <span className="font-urbanist font-bold whitespace-nowrap" style={{ fontSize: 16, color: "#fff", lineHeight: 1, letterSpacing: "0.01em" }}>
            Emma
          </span>
        </div>
      </div>

      {/* Presence avatar (top-left) — purple cursor + ringed profile */}
      <div className="absolute" style={{ left: -36, top: 88 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/features/cursor-pointer-purple.svg"
          alt=""
          style={{ width: 26, height: 26, display: "block", marginLeft: "auto", transform: "scaleX(-1)" }}
        />
        <div className="relative" style={{ width: 83, height: 83, marginTop: -4 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/features/cursor-ring-purple.svg" alt="" className="absolute inset-0 w-full h-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/features/cursor-profile.png"
            alt=""
            className="absolute rounded-full object-cover"
            style={{ width: 70, height: 70, top: 6.5, left: 6.5 }}
          />
        </div>
      </div>
    </>
  );
}

function NotificationsIllustration() {
  const notifs = [
    { avatar: "/images/home/avatar-notif-1.png", prefix: "Mihir Sodawalla", action: "mentioned you on", doc: "Velt-x-Pendo.png", file: "Slides", when: "2 mins ago" },
    { avatar: "/images/home/avatar-notif-2.png", prefix: "Rakesh Goyal", action: "replied to you on", doc: "Velt-x-Pendo.png", file: "Slides", when: "2 mins ago" },
  ];
  return (
    <>
      <div
        className="absolute flex flex-col bg-white overflow-hidden"
        style={{
          left: 96,
          top: 15,
          width: 342,
          borderRadius: 12,
          border: "1px solid #fafafa",
          boxShadow: "0px 0px 32px 0px rgba(0,0,0,0.08)",
          padding: 4,
          gap: 2,
        }}
      >
        <div className="flex items-center justify-between" style={{ padding: "8px 12px 2px" }}>
          <span className="flex-1 font-poppins font-medium" style={{ fontSize: 13, color: "#0a0a0a" }}>Notifications</span>
        </div>
        <div className="flex items-center p-2">
          <div className="flex flex-1 items-start gap-1 p-1 rounded-full" style={{ background: "#f0f0f0" }}>
            {[
              { label: "For You", active: true },
              { label: "Documents", active: false },
              { label: "All", active: false },
            ].map((t) => (
              <div
                key={t.label}
                className="flex flex-1 items-center justify-center font-poppins font-medium"
                style={{
                  background: t.active ? "#625df5" : "transparent",
                  color: t.active ? "#fff" : "#999",
                  padding: "6px 10px",
                  borderRadius: 15,
                  fontSize: 11,
                }}
              >
                {t.label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col" style={{ padding: 8, gap: 2 }}>
          {notifs.map((n, i) => (
            <div
              key={i}
              className="flex items-start rounded-xl"
              style={{ padding: "12px 12px 12px 10px", gap: 8, background: i === 1 ? "#fafafa" : "transparent" }}
            >
              <div className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.avatar} alt="" className="rounded-full object-cover" style={{ width: 22, height: 22 }} />
                <div className="absolute rounded-full" style={{ top: -2, right: -2, width: 7, height: 7, background: "#ff7162", border: "2px solid #fff" }} />
              </div>
              <div className="flex-1 flex flex-col" style={{ gap: 4 }}>
                <p className="font-poppins" style={{ fontSize: 12, lineHeight: 1.2 }}>
                  <span style={{ color: "#666" }}>{n.prefix}&nbsp;{n.action}</span>
                  <br />
                  <span style={{ color: "#0a0a0a", fontWeight: 500 }}>{n.doc}</span>
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-poppins" style={{ fontSize: 11, color: "#8f8f8f" }}>{n.file}</span>
                  <span className="font-poppins" style={{ fontSize: 11, color: "#8f8f8f" }}>{n.when}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* White-to-transparent fade over popover bottom so it dissolves into the card bg */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0,
          top: 220,
          width: 400,
          height: 70,
          background: "linear-gradient(to top, #f7f7f7 40%, rgba(247,247,247,0))",
        }}
      />
    </>
  );
}

// ---- Vendor logos (inline SVGs where we don't have PNG assets) -------------

function LogoFigma() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/home/icon-figma.png" alt="" style={{ width: 25.333, height: 38, display: "block" }} />;
}

function LogoSheets() {
  // Source PNG is 840×559 (Figma stores the image fill at its original bitmap
  // size with a lot of horizontal padding around the icon). Figma's own
  // rendering uses `object-cover` on a 38.569×44 frame to crop to the centered
  // icon — match that here so the icon isn't stretched to fit the portrait
  // aspect of the display box.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/home/icon-gsheets.png" alt="" style={{ width: 38.569, height: 44, objectFit: "cover", display: "block" }} />;
}

function LogoFrameio() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/home/icon-frameio.svg" alt="" style={{ width: 36, height: 41, display: "block" }} />;
}

// The 4 brand marks below come straight from the Figma file (MCP
// `get_design_context` on each icon node returns a CDN URL; curl to disk).
// Node IDs:
//   32:2757 → icon-gdocs.png         (Google Docs embedded bitmap, 256×256)
//   32:2803 → icon-slack-{tl,tr,bl,br}.svg  (4 quadrant SVGs composited)
//   32:2822 → icon-miro.svg          (vector, 41×41 viewBox)
//   32:2850 → icon-knock.svg         (vector, 111.673×36 viewBox)

function LogoDocs() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/home/icon-gdocs.png" alt="" style={{ width: 41, height: 41, objectFit: "contain", display: "block" }} />;
}

function LogoSlack() {
  // Slack is 4 quadrant SVGs in a 41×41 frame. Positions + 19.398×19.398
  // tile sizes come directly from the Figma design context output for the
  // parent "Group" node (32:2803). preserveAspectRatio="none" inside each
  // SVG doesn't distort because each tile is square (19.398×19.398 in both
  // viewBox and container).
  const tiles: Array<{ src: string; left: number; top: number }> = [
    { src: "/images/home/icon-slack-tl.svg", left: 0, top: 0 },
    { src: "/images/home/icon-slack-tr.svg", left: 21.6, top: 0 },
    { src: "/images/home/icon-slack-bl.svg", left: 0, top: 21.6 },
    { src: "/images/home/icon-slack-br.svg", left: 21.6, top: 21.6 },
  ];
  return (
    <div className="relative" style={{ width: 41, height: 41 }}>
      {tiles.map((t) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={t.src}
          src={t.src}
          alt=""
          className="absolute block"
          style={{ left: t.left, top: t.top, width: 19.398, height: 19.398 }}
        />
      ))}
    </div>
  );
}

function LogoMiro() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/home/icon-miro.svg" alt="" style={{ width: 41, height: 41, display: "block" }} />;
}

function LogoKnock() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/images/home/icon-knock.svg" alt="" style={{ width: 111.673, height: 36, display: "block" }} />;
}

// ---- Card definitions ------------------------------------------------------

const cards: CardDef[] = [
  {
    title: "Canvas Comments",
    subtitle: "like in Figma",
    illustration: (
      <div className="absolute" style={{ top: 0, right: -4, width: 368, height: 264 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/card-canvas-comments.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    ),
    icon: <LogoFigma />,
  },
  {
    title: "Cell Comments",
    subtitle: "like in Google Sheets",
    illustration: (
      <>
        <div className="absolute" style={{ top: -2, right: -2, width: 400, height: 344.5 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/card-cell-comments.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div
          className="absolute"
          style={{
            left: -2,
            top: 91,
            width: 400,
            height: 250,
            background: "linear-gradient(to bottom, rgba(247,247,247,0), #f7f7f7)",
          }}
        />
      </>
    ),
    icon: <LogoSheets />,
  },
  {
    title: "Video Comments",
    subtitle: "like Frame.io",
    illustration: (
      <div className="absolute" style={{ top: 0, left: 86, width: 314, height: 211 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/card-video-comments.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
    ),
    icon: <LogoFrameio />,
  },
  {
    title: "Co-editing",
    subtitle: "like in Google Docs",
    illustration: <CoEditingIllustration />,
    icon: <LogoDocs />,
  },
  {
    title: "Huddles",
    subtitle: "like in Slack",
    illustration: <HuddlesIllustration />,
    icon: <LogoSlack />,
  },
  {
    title: "Presence & Cursors",
    subtitle: "like in Miro",
    illustration: <PresenceCursorsIllustration />,
    icon: <LogoMiro />,
  },
  {
    title: "Notifications",
    subtitle: "like Knock",
    illustration: <NotificationsIllustration />,
    icon: <LogoKnock />,
  },
];

// Marquee translates by one full set (cards + their gaps) for a seamless loop.
const TRACK_SHIFT = cards.length * (CARD_W + CARD_GAP);
const MARQUEE_DURATION_S = TRACK_SHIFT / SCROLL_SPEED;

// ---- Component --------------------------------------------------------------

export function StealFeatures() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const setRate = (rate: number) => {
      // CSS keyframe animations show up in Element.getAnimations() as
      // CSSAnimation objects and accept playbackRate changes without a
      // position reset (unlike swapping animation-duration).
      for (const a of track.getAnimations()) {
        a.playbackRate = rate;
      }
    };

    const onEnter = () => setRate(HOVER_FACTOR);
    const onLeave = () => setRate(1);

    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);
    return () => {
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="flex flex-col items-center w-full" style={{ gap: 52 }}>
      <div className="flex flex-col items-center w-full" style={{ gap: 32 }}>
        <div className="flex flex-col items-center text-center" style={{ gap: 12, maxWidth: 850 }}>
          <h2
            className="font-urbanist font-bold"
            style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Steal Features from Popular Products
          </h2>
          <p className="font-urbanist" style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}>
            Our components have different modes to match your product needs
          </p>
        </div>
        <div className="flex items-start" style={{ gap: 12 }}>
          <button
            className="flex items-center justify-center gap-1 rounded-lg"
            style={{ width: 156, height: 44, padding: "8px 16px", border: "2px solid #625df5" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-book-2.svg" alt="" width={18} height={18} />
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}
            >
              View Docs
            </span>
          </button>
          <button
            className="flex items-center justify-center rounded-lg"
            style={{ width: 156, height: 44, padding: "8px 16px", background: "#625df5" }}
          >
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em" }}
            >
              View Examples
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes steal-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-${TRACK_SHIFT}px); }
        }
        .steal-marquee-track {
          animation: steal-marquee ${MARQUEE_DURATION_S}s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .steal-marquee-track { animation: none; }
          .steal-marquee-viewport { overflow-x: auto; }
        }
      `}</style>
      <div
        ref={viewportRef}
        className="steal-marquee-viewport w-full overflow-hidden"
        style={{
          // Framer Ticker fadeWidth: 25 → 25% total fade zone, 12.5% on each side.
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          ref={trackRef}
          className="steal-marquee-track flex items-center"
          style={{ gap: CARD_GAP, height: CARD_H, width: "max-content" }}
        >
          {[...cards, ...cards].map((card, i) => (
            <article
              key={`${card.title}-${i}`}
              aria-hidden={i >= cards.length}
              className="relative shrink-0 overflow-hidden"
              style={{
                width: CARD_W,
                height: CARD_H,
                background: "#f7f7f7",
                border: "2px solid #f7f7f7",
                borderRadius: 24,
              }}
            >
              {/* Illustration area (top ~287px of the card) */}
              <div className="absolute inset-0" style={{ height: ILLUSTRATION_H + 20 }}>
                {card.illustration}
              </div>

              {/* Title block at bottom: logo + 2 lines */}
              <div
                className="absolute flex flex-col items-start"
                style={{ bottom: 40, left: 40, width: 305, gap: 16 }}
              >
                {card.icon}
                <div
                  className="font-urbanist font-bold"
                  style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}
                >
                  {card.title}
                  <br />
                  {card.subtitle}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
