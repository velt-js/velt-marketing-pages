"use client";

import { useState } from "react";

type DemoTab = {
  label: string;
  icon: string;
  iframe: string;
  containerBg: string;
};

const TABS: DemoTab[] = [
  {
    label: "Freestyle",
    icon: "/images/5kWH3XdtLmmy8sAlrXaZQUUI.png",
    iframe:
      "https://demo-examples.vercel.app/async/comments/area-comments?background=253792&theme=dark",
    containerBg: "#253792",
  },
  {
    label: "Popover",
    icon: "/images/LvV1JCkle2GnhxHmcuds6TA3FNY.png",
    iframe:
      "https://demo-examples.vercel.app/async/comments/popover-comments?background=253792&theme=dark",
    containerBg: "#253792",
  },
  {
    label: "Stream",
    icon: "/images/OodMCaRP53KDyMSWgJNpV2Z95aU.png",
    iframe:
      "https://demo-examples.vercel.app/async/comments/stream-comments?background=253792&theme=dark",
    containerBg: "#253792",
  },
  {
    label: "Text",
    icon: "/images/MKB3SQnzph0Q09CNzo6UbdqTo.png",
    iframe:
      "https://demo-examples.vercel.app/async/comments/text-comments?background=253792&theme=dark",
    containerBg: "#253792",
  },
  {
    label: "TipTap",
    icon: "/images/W2jl41FIbYYVPznSKeAaqt4mAK8.png",
    iframe: "https://documentation-app-demo.vercel.app/?focused=true",
    containerBg: "#253792",
  },
  {
    label: "Inline",
    icon: "/images/RYpJPS45TXba1vDBJm9cvBR2I.png",
    iframe:
      "https://demo-examples.vercel.app/async/comments/inline-comments?background=253792&theme=dark",
    containerBg: "#253792",
  },
  {
    label: "Inbox",
    icon: "/images/NwJ6Pnj2fTJzw6xK24smXuNHS10.png",
    iframe:
      "https://demo-examples.vercel.app/async/comments/inbox-comments?background=253792&theme=dark",
    containerBg: "#253792",
  },
  {
    label: "Chart",
    icon: "/images/PkFHpoQ3xkRoQ1ZudAuBvDKO6TA.png",
    iframe: "https://analytics-chartjs-demo.vercel.app/?focused=true",
    containerBg: "#253792",
  },
  {
    label: "Page",
    icon: "/images/gTos6l55MStJWMCTOtAIJin0gg.png",
    iframe:
      "https://demo-examples.vercel.app/async/comments/page-comments?background=253792&theme=dark",
    containerBg: "#253792",
  },
  {
    label: "Video",
    icon: "/images/AkAAMWdEBlDax8ZDB1zzT9wi5Q.png",
    iframe:
      "https://demo-examples.vercel.app/async/comments/video-comments?background=000000&theme=dark",
    containerBg: "#000000",
  },
  {
    label: "Lottie",
    icon: "/images/0S0F9nYwoP5WrPVnVnqOv88oxo.png",
    iframe:
      "https://demo-examples.vercel.app/async/comments/lottie-comments?background=1A1A1A&theme=dark",
    containerBg: "#1A1A1A",
  },
];

const SIDEBAR_BG = "#182986";

export function CommentsDemoSidebar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = TABS[activeIdx];

  return (
    <section
      className="flex flex-col items-center bg-black full-bleed-bg"
      style={{ padding: "0 80px 100px" }}
    >
      <div
        className="grid"
        style={{
          width: 1280,
          gridTemplateColumns: "200px 1fr",
          gap: 8,
          padding: 8,
          borderRadius: 12,
          background: active.containerBg,
          transition: "background-color 200ms ease",
        }}
      >
        {/* Tab sidebar */}
        <nav
          className="flex flex-col"
          style={{
            background: SIDEBAR_BG,
            borderRadius: 12,
            padding: 12,
            gap: 8,
          }}
          aria-label="Comment mode"
        >
          {TABS.map((tab, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveIdx(i)}
                className="flex items-center cursor-pointer"
                style={{
                  height: 48,
                  borderRadius: 8,
                  border: "none",
                  background: isActive
                    ? "rgba(255, 255, 255, 0.08)"
                    : SIDEBAR_BG,
                  opacity: isActive ? 1 : 0.5,
                  transition:
                    "opacity 180ms ease, background-color 180ms ease",
                  padding: "0 12px",
                  gap: 10,
                }}
                aria-pressed={isActive}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tab.icon}
                  alt=""
                  style={{
                    width: 28,
                    height: 28,
                    objectFit: "contain",
                    flexShrink: 0,
                    pointerEvents: "none",
                  }}
                />
                <span
                  className="font-urbanist"
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.2,
                    textAlign: "left",
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Iframe stage */}
        <div
          style={{
            background: active.containerBg,
            borderRadius: 12,
            height: 640,
            transition: "background-color 200ms ease",
            overflow: "hidden",
          }}
        >
          <iframe
            key={active.iframe}
            src={active.iframe}
            allow="camera; microphone; display-capture"
            allowFullScreen
            title={`${active.label} demo`}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: 8,
              display: "block",
            }}
          />
        </div>
      </div>
    </section>
  );
}
