"use client";

// FeaturesGrid — Figma nodes 8506:97311 (Async), 8576:6081 (Realtime),
// 8576:6217 (AI). A 3-tab feature showcase: a black tab rail at the top,
// a 2x2 feature-card grid that swaps per tab, and a shared dark
// testimonial strip at the bottom.

import { useState } from "react";

type TabId = "async" | "realtime" | "ai";

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
 * ASYNC TAB
 * ========================================================================= */

function AsyncCardTitle({ title, desc, maxWidth = 395, bottom = 29 }: { title: string; desc: string; maxWidth?: number; bottom?: number }) {
  return (
    <div className="absolute flex flex-col items-start" style={{ left: 30, bottom, gap: 8 }}>
      <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>{title}</h3>
      <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52, maxWidth }}>{desc}</p>
    </div>
  );
}

function CommentsCard() {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        top: 47,
        left: 0,
        width: 640,
        height: 493,
        borderRight: "2px solid #111",
        borderBottom: "2px solid #111",
      }}
    >
      <div className="absolute flex items-start" style={{ top: 90, left: 83 }}>
        <div className="relative flex items-start" style={{ gap: 0 }}>
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{
              width: 53,
              height: 53,
              background: "#625df5",
              border: "3.5px solid #fff",
              borderTopLeftRadius: 172,
              borderTopRightRadius: 172,
              borderBottomRightRadius: 172,
              borderBottomLeftRadius: 3,
              marginTop: 36,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/avatar-chris.png" alt="" className="rounded-full object-cover" style={{ width: 32, height: 32 }} />
          </div>
          <div
            className="flex flex-col bg-white shrink-0"
            style={{
              width: 411,
              marginLeft: 10,
              borderRadius: 14,
              boxShadow: "0px 0px 27px 0px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <div className="flex items-center justify-between" style={{ padding: "18px 18px 10px", gap: 8 }}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full" style={{ background: "#f2f2fe", padding: "4px 4px 4px 9px", height: 36 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/home/icon-clock.svg" alt="" width={18} height={18} />
                  <span className="font-poppins font-semibold text-[13.7px]" style={{ color: "#625df5" }}>Open</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#625df5" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                <div className="flex items-center gap-1 rounded-full" style={{ background: "#f5f5f5", padding: "4px 4px 4px 9px", height: 36 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/home/icon-flag.svg" alt="" width={18} height={18} />
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#999]">
                <span style={{ letterSpacing: "0.2em", fontSize: 18, lineHeight: 1 }}>⋯</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l2 2 4-4" /><path d="M20 6L9 17l-5-5" /></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            </div>
            <div className="flex flex-col items-start" style={{ padding: 18, gap: 10 }}>
              <div className="flex items-start w-full" style={{ gap: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/home/avatar-chris.png" alt="" className="rounded-full object-cover shrink-0" style={{ width: 32, height: 32 }} />
                <div className="flex-1 flex flex-col" style={{ gap: 2 }}>
                  <div className="flex items-center" style={{ gap: 9 }}>
                    <span className="font-urbanist font-semibold" style={{ fontSize: 18, color: "#0a0a0a" }}>Chris</span>
                    <span className="font-poppins" style={{ fontSize: 14, color: "#999" }}>2w</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/home/icon-checks.svg" alt="" width={18} height={18} />
                  </div>
                  <p className="font-poppins" style={{ fontSize: 16, color: "#525252", lineHeight: 1.8 }}>
                    Can we tone this down <span style={{ color: "#625df5", background: "rgba(98,93,245,0.08)", padding: "0 4px", borderRadius: 4 }}>@Mark</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center" style={{ padding: "9px 18px 22px", gap: 9 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#292929" strokeWidth="2"><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 004 4h12" /></svg>
              <span className="font-poppins" style={{ fontSize: 16, color: "#292929" }}>1 Reply</span>
            </div>
          </div>
        </div>
      </div>
      <AsyncCardTitle title="Comments" desc="Your users can comment on specific elements, sections, or documents." />
    </div>
  );
}

function AIReviewsCard() {
  const rowTops = [-32, 18, 68, 118];
  const colLefts = [62, 298, 534, 770];
  return (
    <div
      className="absolute overflow-hidden"
      style={{ top: 47, left: 640, width: 640, height: 326, borderBottom: "2px solid #111" }}
    >
      {/* 4×4 row/col grid pattern — Figma 32:4841–4856. Extends past the right edge and gets clipped. */}
      {rowTops.map((top) =>
        colLefts.map((left) => (
          <div
            key={`${top}-${left}`}
            className="absolute"
            style={{ top, left, width: 236, height: 50, border: "1px solid #ececec" }}
          />
        ))
      )}
      {/* $52 */}
      <span
        className="absolute font-urbanist font-semibold"
        style={{ top: 62, left: 75, fontSize: 24, color: "#000", lineHeight: 1.2 }}
      >
        $52
      </span>
      {/* AI comment pin (32×32) */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: 78,
          left: 223,
          width: 32,
          height: 32,
          background: "#625df5",
          border: "2.08px solid #fff",
          borderTopLeftRadius: 104,
          borderTopRightRadius: 104,
          borderBottomRightRadius: 104,
          borderBottomLeftRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        <div
          className="flex items-center justify-center bg-white overflow-hidden"
          style={{ width: 19.2, height: 19.2, borderRadius: 25.6 }}
        >
          <svg width="13.77" height="13.77" viewBox="0 0 14 14" fill="#625df5" aria-hidden>
            <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" />
          </svg>
        </div>
      </div>
      {/* Thread wrapper */}
      <div
        className="absolute flex flex-col bg-white"
        style={{
          top: 78,
          left: 264.55,
          width: 287.5,
          border: "1px solid #3e43ad",
          borderRadius: 17,
          padding: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-start w-full" style={{ gap: 12 }}>
          <div className="shrink-0" style={{ width: 20, height: 20 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#625df5" aria-hidden>
              <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
            </svg>
          </div>
          <div className="flex items-center flex-1" style={{ gap: 6 }}>
            <span className="font-firamono font-medium" style={{ fontSize: 14, color: "#0a0a0a", letterSpacing: "-0.02em", lineHeight: 1.37 }}>
              AI Auto Review
            </span>
            <span className="font-poppins" style={{ fontSize: 10, color: "#999", letterSpacing: "0.01em" }}>
              2w
            </span>
          </div>
        </div>
        <div style={{ paddingLeft: 32, marginTop: 6 }}>
          <p className="font-poppins" style={{ fontSize: 14, color: "#525252", lineHeight: 1.8 }}>
            This has increased 40% from last week <span style={{ color: "#625df5" }}>@Mark</span>
          </p>
        </div>
      </div>
      {/* "Reviewing..." cursor */}
      <div className="absolute flex flex-col items-start" style={{ top: 152, left: 439 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/features/cursor-pointer-purple.svg" alt="" width={40} height={40} />
        <div className="flex items-start" style={{ paddingLeft: 40 }}>
          <div
            className="flex items-start"
            style={{
              background: "linear-gradient(to right, #3e43ad, #191c47)",
              padding: "5px 20px",
              borderRadius: 18,
              boxShadow: "0 2.5px 10px rgba(0,0,0,0.16)",
            }}
          >
            <span
              className="font-urbanist font-bold whitespace-nowrap"
              style={{ fontSize: 27.5, color: "#fff", lineHeight: "42.5px", letterSpacing: "0.01em" }}
            >
              Reviewing...
            </span>
          </div>
        </div>
      </div>
      <AsyncCardTitle title="Automated AI Reviews" desc="Track users view activity" />
    </div>
  );
}

function RecordingCard() {
  return (
    <div className="absolute overflow-hidden" style={{ top: 981, left: 640, width: 640, height: 346 }}>
      {/* Ring + headshot: Figma card-relative left=421, top=64 */}
      <div className="absolute" style={{ left: 421, top: 64, width: 182, height: 182 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/recording-ring.svg" alt="" className="absolute inset-0 w-full h-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/recording-headshot.png" alt="" className="absolute rounded-full object-cover" style={{ width: 162.7, height: 162.7, top: 9.65, left: 9.65 }} />
        <div className="absolute flex items-center justify-center rounded-full bg-white" style={{ left: 44, bottom: -8, width: 94, height: 51, border: "2.14px solid #f5f5f5", padding: "8.5px" }}>
          <div className="flex items-center" style={{ gap: 8.5 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-mic.svg" alt="" width={25.7} height={25.7} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-video.svg" alt="" width={25.7} height={25.7} />
          </div>
        </div>
      </div>
      {/* Recording bar pill: Figma card-relative left=206, top=80 */}
      <div className="absolute flex items-center bg-white" style={{ left: 206, top: 80, gap: 5, padding: "5px 5px 5px 5px", borderRadius: 40, border: "1.25px solid #f0f0f0", boxShadow: "0px 0px 32px 0px rgba(0,0,0,0.04)" }}>
          <div className="flex items-center rounded-full" style={{ background: "#625df5", padding: 5 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-screen-share.svg" alt="" width={30} height={30} />
          </div>
          <div className="flex items-center rounded-full" style={{ padding: "7.5px 10px", gap: 10 }}>
            <span className="font-poppins" style={{ fontSize: 16.25, color: "#3d3d3d" }}>00:42</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#1f1f1f"><rect x="2" y="1" width="4" height="12" rx="1" /><rect x="8" y="1" width="4" height="12" rx="1" /></svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-stop-circle.svg" alt="" width={25} height={25} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-x.svg" alt="" width={25} height={25} />
          </div>
      </div>
      <AsyncCardTitle title="Recording" desc="Enable Loom-style recording. Your users can record their screen, camera or audio" />
    </div>
  );
}

function AnnotationModeCard() {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        top: 540,
        left: 0,
        width: 640,
        height: 461,
        borderRight: "2px solid #111",
        borderBottom: "2px solid #111",
      }}
    >
      {/* Dashed annotation outline — Figma 32:4978. Extends past top/right edges; clipped. */}
      <div
        className="absolute"
        style={{
          top: -67,
          left: 147,
          width: 653,
          height: 292,
          border: "2px dashed #ff7162",
          borderRadius: 12,
        }}
      />
      {/* Faded "Google Willow" headline */}
      <span
        className="absolute font-urbanist font-semibold whitespace-nowrap"
        style={{ top: 45, left: 281, fontSize: 54, color: "#000", opacity: 0.3, lineHeight: 1.2, letterSpacing: "-0.02em" }}
      >
        Google Willow
      </span>
      {/* Faded subheadline */}
      <span
        className="absolute font-urbanist whitespace-nowrap"
        style={{ top: 127, left: 204, fontSize: 24, color: "#000", opacity: 0.3, lineHeight: 1.2 }}
      >
        Meet Willow, our state-of-the-art quantum chip
      </span>
      {/* Annotation badge row: orange avatar + pill */}
      <div className="absolute flex items-start" style={{ top: 245, left: 147, gap: 6.25 }}>
        <div
          className="relative flex items-center justify-center rounded-full text-white font-poppins font-bold"
          style={{ background: "#ff7162", width: 40, height: 40, fontSize: 15, lineHeight: 1 }}
        >
          M
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            height: 42.5,
            padding: "7.5px 15px",
            borderRadius: 10,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), linear-gradient(90deg, #ff7162, #ff7162)",
          }}
        >
          <span
            className="font-urbanist font-semibold whitespace-nowrap"
            style={{ fontSize: 22.5, color: "#ff7162", lineHeight: 1.2 }}
          >
            This needs to be updated
          </span>
        </div>
      </div>
      <AsyncCardTitle title="Annotation Mode" desc="Mark and highlight sections" />
    </div>
  );
}

function AnalyticsCard() {
  const users: Array<{ bg: string; initial: string; name: string; when: string }> = [
    { bg: "#ff7162", initial: "M", name: "Miri", when: "2 Days ago" },
    { bg: "#0dcf82", initial: "S", name: "Sinclair", when: "5 Days ago" },
    { bg: "#3772ff", initial: "Y", name: "Yoen", when: "1 Week ago" },
  ];
  return (
    <div className="absolute overflow-hidden" style={{ top: 1001, left: 0, width: 640, height: 326, borderRight: "2px solid #111" }}>
      <div className="absolute" style={{ top: 30, left: 194 }}>
        <div className="relative flex bg-white" style={{ width: 425, height: 197.5, borderRadius: 15, border: "1.25px solid rgba(0,0,0,0.08)", boxShadow: "0px 0px 40px 0px rgba(0,0,0,0.08)" }}>
          <div className="flex flex-col items-start" style={{ padding: 30, gap: 5 }}>
            <div className="flex flex-col items-center justify-center rounded-[10px]" style={{ background: "#f4f3ff", width: 175, height: 137.5, padding: "31px 25px", gap: 12.5 }}>
              <span className="font-poppins font-semibold" style={{ fontSize: 40, color: "#111", lineHeight: 1 }}>32</span>
              <div className="flex items-center" style={{ gap: 5 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/home/icon-eye.svg" alt="" width={22.5} height={22.5} />
                <span className="font-poppins font-medium uppercase" style={{ fontSize: 15, color: "#625df5", letterSpacing: "0.02em" }}>Total views</span>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-[10px]" style={{ background: "#f4f3ff", width: 175, height: 30 }}>
              <span className="font-poppins font-medium uppercase" style={{ fontSize: 15, color: "#848297" }}>0 Views Today</span>
            </div>
          </div>
          <div className="flex flex-col items-start" style={{ paddingTop: 25, paddingLeft: 5, gap: 20 }}>
            {users.map((u) => (
              <div key={u.name} className="flex items-center" style={{ gap: 15 }}>
                <div className="flex items-center justify-center rounded-full text-white font-poppins font-bold" style={{ background: u.bg, width: 40, height: 40, fontSize: 15 }}>{u.initial}</div>
                <div className="flex flex-col" style={{ gap: 8 }}>
                  <span className="font-poppins font-medium" style={{ fontSize: 15, color: "#4c5366", lineHeight: 1 }}>{u.name}</span>
                  <span className="font-poppins font-medium uppercase" style={{ fontSize: 12.5, color: "#959595", lineHeight: 1, letterSpacing: "0.02em" }}>{u.when}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute pointer-events-none" style={{ left: 195, bottom: 0, width: 456, height: 153, background: "linear-gradient(to top, #fff, rgba(255,255,255,0) 56%)" }} />
      </div>
      <AsyncCardTitle title="View Analytics" desc="Track users view activity" />
    </div>
  );
}

function NotificationsCard() {
  const notifs: Array<{ avatar: string; prefix: string; action: string; doc: string; file: string; when: string; active: boolean }> = [
    { avatar: "/images/home/avatar-notif-1.png", prefix: "Mihir Sodawalla", action: "mentioned you on", doc: "Velt-x-Pendo.png", file: "Slides", when: "2 mins ago", active: true },
    { avatar: "/images/home/avatar-notif-2.png", prefix: "Rakesh Goyal", action: "replied to you on", doc: "Velt-x-Pendo.png", file: "Slides", when: "2 mins ago", active: true },
    { avatar: "/images/home/avatar-notif-3.png", prefix: "Vivek", action: "Approved", doc: "Velt-x-Pendo.png", file: "Slides", when: "2 mins ago", active: false },
  ];
  return (
    <div className="absolute overflow-hidden" style={{ top: 373, left: 640, width: 640, height: 608, borderBottom: "2px solid #111" }}>
      <div className="absolute inset-0">
        <div className="absolute flex items-center justify-center rounded-full" style={{ left: 131, top: 45, width: 52, height: 52, background: "#f5f5f5", padding: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/icon-bell.svg" alt="" width={26} height={26} />
        </div>
        <div className="absolute flex flex-col bg-white overflow-hidden" style={{ left: 200, top: 45, width: 380, height: 400, borderRadius: 16, border: "1px solid #fafafa", boxShadow: "0px 0px 32px 0px rgba(0,0,0,0.08)", padding: 4, gap: 2 }}>
          <div className="flex items-center justify-between w-full" style={{ padding: "8px 12px 2px" }}>
            <span className="flex-1 font-poppins font-medium" style={{ fontSize: 14, color: "#0a0a0a" }}>Notifications</span>
            <div className="flex items-center rounded-lg p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/icon-checks-blue.svg" alt="" width={18} height={18} />
            </div>
            <div className="flex items-center rounded-lg p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/icon-settings.svg" alt="" width={18} height={18} />
            </div>
          </div>
          <div className="flex items-center p-2 w-full">
            <div className="flex flex-1 items-start gap-1 p-1 rounded-full" style={{ background: "#f0f0f0" }}>
              {[
                { label: "For You", active: true },
                { label: "Documents", active: false },
                { label: "All", active: false },
              ].map((t) => (
                <div key={t.label} className="flex flex-1 items-center justify-center font-poppins font-medium" style={{ background: t.active ? "#625df5" : "transparent", color: t.active ? "#fff" : "#999", padding: "8px 12px", borderRadius: 15, fontSize: 12 }}>
                  {t.label}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start w-full" style={{ padding: 8, gap: 2 }}>
            {notifs.map((n, i) => (
              <div key={i} className="flex items-start w-full rounded-xl" style={{ padding: "16px 16px 16px 12px", gap: 10, background: i === 1 ? "#fafafa" : "transparent" }}>
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.avatar} alt="" className="rounded-full object-cover" style={{ width: 24, height: 24 }} />
                  {n.active && (
                    <div className="absolute rounded-full" style={{ top: -2, right: -2, width: 8, height: 8, background: "#ff7162", border: "2px solid #fff" }} />
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <p className="font-poppins" style={{ fontSize: 14, lineHeight: 1.2 }}>
                    <span style={{ color: "#666" }}>{n.prefix}&nbsp;{n.action}</span>
                    <br />
                    <span style={{ color: "#0a0a0a", fontWeight: 500 }}>{n.doc}</span>
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-0.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/home/icon-file.svg" alt="" width={12} height={12} />
                      <span className="font-poppins" style={{ fontSize: 12, color: "#8f8f8f" }}>{n.file}</span>
                    </div>
                    <span className="font-poppins" style={{ fontSize: 12, color: "#8f8f8f" }}>{n.when}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute pointer-events-none"
          style={{
            left: 179,
            top: 285,
            width: 423,
            height: 167,
            background: "linear-gradient(to top, #fff 56.63%, rgba(255,255,255,0))",
          }}
        />
      </div>
      <AsyncCardTitle title="Notifications" desc="Get collaboration notifications or push your own" bottom={181} />
    </div>
  );
}

function AsyncGrid() {
  return (
    <>
      <CommentsCard />
      <AIReviewsCard />
      <AnnotationModeCard />
      <NotificationsCard />
      <AnalyticsCard />
      <RecordingCard />
    </>
  );
}

/* =========================================================================
 * REALTIME TAB
 * ========================================================================= */

function CardTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="absolute flex flex-col items-start" style={{ left: 31.5, bottom: 31.5, gap: 8 }}>
      <h3 className="font-urbanist font-bold whitespace-nowrap" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>{title}</h3>
      <p className="font-urbanist whitespace-nowrap" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}>{desc}</p>
    </div>
  );
}

function RealtimeCardShell({ children, borderRight = false, borderBottom = false }: { children: React.ReactNode; borderRight?: boolean; borderBottom?: boolean }) {
  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{
        width: 640,
        height: 450,
        borderRight: borderRight ? "1px solid #e9e8e8" : undefined,
        borderBottom: borderBottom ? "1px solid #e9e8e8" : undefined,
      }}
    >
      {children}
    </div>
  );
}

function MultiplayerEditingCard() {
  const barStyle = (width: number) => ({
    height: 31.2,
    width,
    background: "#f3f3f3",
    borderRadius: 25.6,
  } as const);
  return (
    <RealtimeCardShell borderRight borderBottom>
      <div className="absolute flex flex-col" style={{ left: 32, top: 108, gap: 8.8 }}>
        <div className="relative" style={barStyle(347.2)}>
          <div className="absolute" style={{ left: 148, top: 0, width: 123.2, height: 31.2, background: "#ea35c0", opacity: 0.12 }} />
        </div>
        <div style={barStyle(347.2)} />
        <div style={barStyle(387.2)} />
        <div style={barStyle(280)} />
        <div style={barStyle(397.6)} />
      </div>

      {/* Bob label */}
      <div className="absolute" style={{ left: 303.2, top: 76 }}>
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
          <span className="font-firamono whitespace-nowrap" style={{ fontSize: 22.4, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, textTransform: "uppercase" }}>Bob</span>
        </div>
      </div>

      {/* Linda label */}
      <div className="absolute" style={{ left: 319.2, top: 194.4 }}>
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
          <span className="font-firamono whitespace-nowrap" style={{ fontSize: 22.4, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, textTransform: "uppercase" }}>Linda</span>
        </div>
      </div>

      <CardTitle title="Multiplayer Editing" desc="Co-edit documents in real-time and see who is working with you" />
    </RealtimeCardShell>
  );
}

function HuddleCard() {
  return (
    <RealtimeCardShell borderBottom>
      {/* Big headshot with purple ring */}
      <div className="absolute" style={{ left: 73, top: 50 }}>
        <div className="relative" style={{ width: 159.25, height: 159.25 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/features/huddle-ring-purple.svg" alt="" className="absolute inset-0 w-full h-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/features/huddle-headshot.png"
            alt=""
            className="absolute rounded-full object-cover"
            style={{ width: 142.4, height: 142.4, top: 8.4, left: 8.4 }}
          />
          {/* Mic + Video pill */}
          <div
            className="absolute flex items-center justify-center rounded-full bg-white"
            style={{
              left: 34.7,
              bottom: -22.5,
              width: 82.4,
              height: 45,
              border: "1.87px solid #f5f5f5",
              padding: "7.5px",
            }}
          >
            <div className="flex items-center" style={{ gap: 7.5 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/features/icon-mic-dark.svg" alt="" width={22.5} height={22.5} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/features/icon-video-dark.svg" alt="" width={22.5} height={22.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Huddle popup */}
      <div
        className="absolute flex flex-col bg-white overflow-hidden"
        style={{
          right: 35.88,
          top: 37.5,
          width: 320,
          borderRadius: 24,
          border: "1px solid #f0f0f0",
          boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.06)",
          padding: "20px 24px 24px",
          gap: 20,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-lg">
          <div className="flex items-center" style={{ gap: 12 }}>
            {/* Headphone icon w/ green bars */}
            <div className="relative" style={{ width: 24, height: 24 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 13v-2a8 8 0 0116 0v2" />
                <path d="M4 15a1 1 0 011-1h2v5H5a1 1 0 01-1-1v-3z" />
                <path d="M17 14h2a1 1 0 011 1v3a1 1 0 01-1 1h-2v-5z" />
              </svg>
              {/* Green bars cluster - skipped for simplicity */}
            </div>
            <span className="font-poppins" style={{ fontSize: 14, color: "#0a0a0a" }}>2 people in Huddle</span>
          </div>
          <div className="flex items-center" style={{ gap: 2 }}>
            <div className="flex items-center p-2 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" />
              </svg>
            </div>
            <div className="flex items-center p-2 rounded-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a0a0a">
                <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* User list */}
        <div className="flex flex-col items-center w-full" style={{ gap: 12 }}>
          {/* You */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center" style={{ gap: 12 }}>
              <div className="relative" style={{ width: 24, height: 24 }}>
                <div
                  className="absolute inset-0 overflow-hidden rounded-full"
                  style={{ border: "2px solid #fff", boxShadow: "0 0 0 1px #625df5" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/home/features/austin-avatar-1.png" alt="" className="absolute w-full h-full object-cover" />
                </div>
              </div>
              <span className="font-poppins" style={{ fontSize: 14, color: "#0a0a0a" }}>You</span>
            </div>
            <div className="flex items-center" style={{ gap: 4 }}>
              <div className="flex items-start p-1 rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/home/features/icon-mic-off.svg" alt="" width={20} height={20} />
              </div>
              <div className="flex items-start p-1 rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/home/features/icon-video-off.svg" alt="" width={20} height={20} />
              </div>
              <div className="flex items-start p-1 rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/home/features/icon-desktop-off.svg" alt="" width={20} height={20} />
              </div>
            </div>
          </div>
          {/* Linda */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center" style={{ gap: 12 }}>
              <div className="relative" style={{ width: 24, height: 24 }}>
                <div
                  className="absolute inset-0 overflow-hidden rounded-full"
                  style={{ border: "2px solid #fff", boxShadow: "0 0 0 1px #ffcd2e" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/home/features/austin-avatar-2.png" alt="" className="absolute w-full h-full object-cover" />
                </div>
              </div>
              <span className="font-poppins" style={{ fontSize: 14, color: "#0a0a0a" }}>Linda</span>
            </div>
            <div className="flex items-center" style={{ gap: 2 }}>
              <div className="flex items-center p-1">
                <div className="flex items-center" style={{ gap: 2, height: 20 }}>
                  <div style={{ width: 2, height: 6.25, background: "#ffcd2e", borderRadius: 3.125 }} />
                  <div style={{ width: 2, height: 12, background: "#ffcd2e", borderRadius: 3.125 }} />
                  <div style={{ width: 2, height: 6.25, background: "#ffcd2e", borderRadius: 3.125 }} />
                </div>
              </div>
            </div>
          </div>
          {/* mihir */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center" style={{ gap: 12 }}>
              <div className="relative" style={{ width: 24, height: 24 }}>
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-full text-white font-poppins font-medium"
                  style={{ background: "#0dcf82", fontSize: 10, border: "2px solid #fff", boxShadow: "0 0 0 1px #0dcf82" }}
                >
                  M
                </div>
              </div>
              <span className="font-poppins" style={{ fontSize: 14, color: "#0a0a0a" }}>mihir@velt.dev</span>
            </div>
            <div className="flex items-center" style={{ gap: 2 }}>
              <div className="flex items-center p-1">
                <div className="flex items-center" style={{ gap: 2, height: 20 }}>
                  <div style={{ width: 2, height: 6.25, background: "#0dcf82", borderRadius: 3.125 }} />
                  <div style={{ width: 2, height: 12, background: "#0dcf82", borderRadius: 3.125 }} />
                  <div style={{ width: 2, height: 6.25, background: "#0dcf82", borderRadius: 3.125 }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leave button */}
        <div className="flex items-center w-full" style={{ gap: 8 }}>
          <div className="flex-1 flex items-center justify-center rounded-full" style={{ height: 40, border: "1px solid #ff7162", gap: 8 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/features/icon-phone.svg" alt="" width={18} height={18} />
            <span className="font-poppins font-semibold uppercase" style={{ fontSize: 12, color: "#ff7162", letterSpacing: "0.05em", lineHeight: 1 }}>Leave</span>
          </div>
          <div className="flex items-center justify-center rounded-full" style={{ width: 40, height: 40, border: "1px solid #ccc", padding: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/features/icon-cursor-toggle.svg" alt="" width={20} height={20} />
          </div>
        </div>
      </div>

      <CardTitle title="Huddle" desc="Drop into impromptu live calls with audio, video, and screensharing" />
    </RealtimeCardShell>
  );
}

function CursorPresenceCard() {
  return (
    <RealtimeCardShell borderRight>
      {/* Selection rectangle */}
      <div
        className="absolute"
        style={{
          left: 246.52,
          top: 78.12,
          width: 178.64,
          height: 163.68,
          border: "0.88px solid #fe965c",
        }}
      />
      {/* 4 corner handles */}
      {[
        { left: 241.24, top: 72.84 },
        { left: 419.88, top: 72.84 },
        { left: 241.24, top: 236.52 },
        { left: 419.88, top: 236.52 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: pos.left,
            top: pos.top,
            width: 10.56,
            height: 10.56,
            background: "#fe965c",
            border: "1.76px solid #fff",
            boxShadow: "0 0 0 0.88px #fe965c",
          }}
        />
      ))}

      {/* Emma cursor */}
      <div className="absolute" style={{ left: 445.4, top: 187.24 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/features/cursor-pointer-orange.svg" alt="" style={{ width: 28.16, height: 28.16, marginLeft: 0 }} />
        <div className="flex items-center rounded-full" style={{ marginLeft: 28.16, marginTop: -2, background: "#fe965c", padding: "3.52px 14.08px", boxShadow: "0px 1.76px 7.04px 0px rgba(0,0,0,0.16)" }}>
          <span className="font-urbanist font-bold whitespace-nowrap" style={{ fontSize: 19.36, color: "#fff", lineHeight: 1, letterSpacing: "0.01em" }}>Emma</span>
        </div>
      </div>

      {/* Linda presence avatar with pointer */}
      <div className="absolute" style={{ left: 80.2, top: 100.12 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/features/cursor-pointer-purple.svg" alt="" style={{ width: 28.16, height: 28.16, display: "block", marginLeft: "auto", transform: "scaleX(-1)" }} />
        <div className="relative" style={{ width: 91.52, height: 91.52, marginTop: -4 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/features/cursor-ring-purple.svg" alt="" className="absolute inset-0 w-full h-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/features/cursor-profile.png"
            alt=""
            className="absolute rounded-full object-cover"
            style={{ width: 77.44, height: 77.44, top: 7.04, left: 7.04 }}
          />
        </div>
      </div>

      <CardTitle title="Cursor & Presence" desc="See who is online working with you and where they are" />
    </RealtimeCardShell>
  );
}

function SingleEditorModeCard() {
  return (
    <RealtimeCardShell>
      <div className="absolute overflow-hidden" style={{ left: 99, top: 52, width: 591, height: 283, borderRadius: 12, border: "2px solid #06f" }}>
        {/* Header bar */}
        <div className="flex items-center" style={{ width: "100%", height: 53, background: "#06f", paddingLeft: 16, gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/features/icon-lego.svg" alt="" width={28} height={28} />
          <span className="font-firamono font-bold whitespace-nowrap" style={{ fontSize: 22.4, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>YOEN IS EDITING</span>
        </div>
        {/* Body */}
        <div className="flex flex-col" style={{ padding: "50px 72px 0", gap: 17 }}>
          <div className="flex items-center" style={{ gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/features/icon-lock-2.svg" alt="" width={19} height={19} />
            <span className="font-urbanist font-bold uppercase" style={{ fontSize: 16, color: "#000", letterSpacing: "0.05em", lineHeight: 1 }}>Email Template</span>
          </div>
          <div className="relative" style={{ width: 413, height: 123, borderRadius: 12, border: "1px solid #000" }}>
            <div className="absolute flex flex-col" style={{ left: 20, top: 20, gap: 6, width: "77%" }}>
              {[30.43, 53.73, 95.03, 75.47].map((w, i) => (
                <div key={i} style={{ width: `${w}%`, height: 24, background: "#f4f4f4", borderRadius: 32 }} />
              ))}
            </div>
            <div className="absolute pointer-events-none" style={{ left: 0, right: 0, top: 20, height: 102, background: "linear-gradient(to bottom, rgba(255,255,255,0), #fff)" }} />
          </div>
        </div>
      </div>
      {/* Bottom fade */}
      <div className="absolute pointer-events-none" style={{ left: 98.5, top: 224.5, width: 558, height: 123, background: "linear-gradient(to bottom, rgba(255,255,255,0), #feffff)" }} />

      <CardTitle title="Single Editor Mode" desc="Limit editing control to one user in collaborative scenarios" />
    </RealtimeCardShell>
  );
}

function RealtimeGrid() {
  return (
    <div style={{ paddingTop: 47 }}>
      <div className="flex">
        <MultiplayerEditingCard />
        <HuddleCard />
      </div>
      <div className="flex">
        <CursorPresenceCard />
        <SingleEditorModeCard />
      </div>
    </div>
  );
}

/* =========================================================================
 * AI TAB
 * ========================================================================= */

function ContextualSuggestionsCard() {
  const barStyle = (width: number) => ({
    height: 31.2,
    width,
    background: "#f3f3f3",
    borderRadius: 25.6,
  } as const);
  return (
    <RealtimeCardShell borderRight borderBottom>
      {/* Text bars */}
      <div className="absolute flex flex-col" style={{ left: 32, top: 76, gap: 8.8 }}>
        <div className="relative" style={barStyle(347.2)}>
          <div className="absolute" style={{ left: 106.3, top: 0.1, width: 165, height: 31, background: "#625df5", opacity: 0.12 }} />
        </div>
        <div style={barStyle(347.2)} />
        <div style={barStyle(387.2)} />
        <div style={barStyle(280)} />
        <div style={barStyle(397.6)} />
      </div>

      {/* Rewrite pill */}
      <div
        className="absolute flex items-center bg-white rounded-full"
        style={{
          left: 229.3,
          top: 113.1,
          padding: 4,
          border: "1px solid rgba(0,0,0,0.04)",
          boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.08)",
        }}
      >
        {/* Chat-bubble icon */}
        <div className="flex items-center bg-white rounded-full" style={{ padding: "8px 12px" }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 9.5a7 7 0 01-7 7c-1 0-2-0.2-3-0.5l-4 1 1-4A7 7 0 1117 9.5z" />
          </svg>
        </div>
        {/* Rewrite chip */}
        <div className="flex items-center rounded-full" style={{ background: "#f5f5f5", padding: "8px 16px", gap: 9 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/features/icon-sparkles.svg" alt="" width={24} height={24} />
          <span className="font-firamono uppercase whitespace-nowrap" style={{ fontSize: 22.4, color: "#000", letterSpacing: "-0.03em", lineHeight: 1 }}>Rewrite</span>
        </div>
      </div>

      <CardTitle title="Contextual Text Suggestions" desc="Get copy suggestions right within the commenting tool" />
    </RealtimeCardShell>
  );
}

function AIInsightsCard() {
  return (
    <RealtimeCardShell borderBottom>
      {/* Query popover */}
      <div
        className="absolute flex flex-col bg-white"
        style={{
          left: 207.5,
          top: 68.5,
          width: 523.3,
          padding: 18.5,
          gap: 3,
          borderRadius: 32,
          border: "1px solid rgba(0,0,0,0.12)",
          boxShadow: "0px 4px 32px 0px rgba(0,0,0,0.12)",
        }}
      >
        {/* Query text */}
        <div className="flex items-center justify-center" style={{ padding: 12.3 }}>
          <p className="flex-1 font-urbanist" style={{ color: "#111", fontSize: 21.5, lineHeight: 1.5 }}>What are users talking about?</p>
        </div>
        {/* Scope chips */}
        <div className="flex items-center" style={{ gap: 4, padding: "0 6.15px" }}>
          <div className="flex items-center rounded-full" style={{ padding: "12.3px 6.15px", gap: 6.15, width: 87.5 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/features/icon-hierarchy-2.svg" alt="" width={18.5} height={18.5} />
            <span className="font-urbanist font-medium whitespace-nowrap" style={{ fontSize: 18.5, color: "#4298d7", lineHeight: 1.1 }}>org-1</span>
          </div>
          <div className="rounded-full" style={{ width: 6.15, height: 6.15, background: "#d9d9d9" }} />
          <div className="flex items-center rounded-full" style={{ padding: "12.3px 6.15px", gap: 6.15, width: 132.5 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/features/icon-folder-open.svg" alt="" width={18.5} height={18.5} />
            <span className="font-urbanist font-medium whitespace-nowrap" style={{ fontSize: 18.5, color: "#139b53", lineHeight: 1.1 }}>sales-video</span>
          </div>
          <div className="rounded-full" style={{ width: 6.15, height: 6.15, background: "#d9d9d9" }} />
          <div className="flex items-center flex-1 rounded-full" style={{ padding: "12.3px 6.15px", gap: 6.15 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/features/icon-file-description.svg" alt="" width={18.5} height={18.5} />
            <span className="font-urbanist font-medium whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: 18.5, color: "#ff7698", lineHeight: 1.1 }}>sales-video-v2-after-effects</span>
          </div>
        </div>
      </div>

      {/* Creating graphs status */}
      <div className="absolute flex items-center" style={{ left: 61, top: 258, gap: 24 }}>
        {/* 5x5 dot matrix */}
        <div className="flex flex-col" style={{ width: 32, height: 32, gap: 2.3 }}>
          {[
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
          ].map((row, i) => (
            <div key={i} className="flex items-center" style={{ gap: 2.3 }}>
              {row.map((filled, j) => (
                <div key={j} style={{ width: 4.57, height: 4.57, background: "#625df5", opacity: filled ? 1 : 0.1 }} />
              ))}
            </div>
          ))}
        </div>
        <p className="font-firamono whitespace-nowrap uppercase" style={{ fontSize: 20, letterSpacing: "0.05em", lineHeight: 1.5 }}>
          <span style={{ color: "#111", fontWeight: 500 }}>Creating graphs</span>
          <span style={{ color: "#111" }}> </span>
          <span style={{ color: "rgba(17,17,17,0.52)" }}>(3s)</span>
        </p>
      </div>

      <CardTitle title="AI Insights" desc="Chat with your Velt data using AI" />
    </RealtimeCardShell>
  );
}

function AskGPTCard() {
  return (
    <RealtimeCardShell borderRight>
      {/* Decorative gradient lines (left + right) */}
      <div className="absolute" style={{ left: -54, top: 0, width: 183.5, height: 298, transform: "scaleX(-1)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/features/ask-gpt-decor-left.svg" alt="" className="w-full h-full" />
      </div>
      <div className="absolute" style={{ right: -53.5, top: 0, width: 183.5, height: 298 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/features/ask-gpt-decor-right.svg" alt="" className="w-full h-full" />
      </div>

      {/* Rainbow gradient border pill */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: 78,
          transform: "translateX(-50%)",
          width: 504,
          height: 81,
          borderRadius: 21,
          backgroundImage: "linear-gradient(90deg, rgb(255,84,84) 0%, rgb(255,183,59) 20.192%, rgb(45,177,87) 39.423%, rgb(20,216,255) 52.404%, rgb(255,255,255) 66.346%, rgb(48,48,48) 80.769%, rgb(141,65,255) 91.346%, rgb(255,65,233) 100%)",
        }}
      />

      {/* Inner white input */}
      <div
        className="absolute flex items-center bg-white"
        style={{
          left: "50%",
          top: 84.8,
          transform: "translateX(-50%)",
          width: 501,
          height: 67,
          padding: "22px 22px",
          gap: 16.5,
          borderRadius: 20,
          border: "1.38px solid rgba(0,0,0,0.08)",
          boxShadow: "0px 5.5px 16.5px 0px rgba(0,0,0,0.08)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/features/ask-gpt-logo.png" alt="" style={{ width: 34.5, height: 34.5, opacity: 0.24 }} />
        <div className="flex items-center relative" style={{ gap: 2.7 }}>
          <span className="font-urbanist font-medium whitespace-nowrap" style={{ fontSize: 30.9, color: "#111", lineHeight: 1 }}>How can we make this bet</span>
          <div style={{ width: 2, height: 30, background: "#111" }} />
        </div>
      </div>

      <CardTitle title="Ask GPT" desc="Highlight text and ask AI questions, based on that context" />
    </RealtimeCardShell>
  );
}

function AIAssistedCard() {
  return (
    <RealtimeCardShell>
      <div className="absolute flex items-center" style={{ left: "50%", top: "calc(50% - 61px)", transform: "translate(-50%, -50%)", gap: 52 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/features/logo-gpt-big.png" alt="" style={{ width: 101, height: 100, objectFit: "contain" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/features/logo-mcp-cube.png" alt="" style={{ width: 84, height: 84, objectFit: "contain" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/home/features/logo-velt-w.png" alt="" style={{ width: 83, height: 49, objectFit: "contain" }} />
      </div>

      <CardTitle title="AI-Assisted Implementation" desc="Get instant guidance powered by our docs MCP" />
    </RealtimeCardShell>
  );
}

function AIGrid() {
  return (
    <div style={{ paddingTop: 47 }}>
      <div className="flex">
        <ContextualSuggestionsCard />
        <AIInsightsCard />
      </div>
      <div className="flex">
        <AskGPTCard />
        <AIAssistedCard />
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
    <section className="flex flex-col items-center bg-white" style={{ padding: "52px 80px 0", gap: 52 }}>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
