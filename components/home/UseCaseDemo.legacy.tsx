"use client";

// Legacy UseCaseDemo — preserved verbatim from Hero.tsx (pre-2026-04-22). Kept
// as a recoverable reference so the old "static image + decorative pills"
// variant can be restored by swapping the import in Hero.tsx.

import { useState } from "react";
import Image from "next/image";

type DemoTab = {
  id: "dashboard" | "documentation" | "video" | "cms" | "canvas";
  label: string;
  image: string;
};

const DEMO_TABS: DemoTab[] = [
  { id: "dashboard",     label: "Dashboard Product",     image: "/images/home/demo-dashboard.png" },
  { id: "documentation", label: "Documentation Product", image: "/images/home/demo-documentation.png" },
  { id: "video",         label: "Video Editor",          image: "/images/home/demo-video.png" },
  { id: "cms",           label: "CMS Product",           image: "/images/home/demo-cms.png" },
  { id: "canvas",        label: "Canvas Editor",         image: "/images/home/demo-canvas.png" },
];

function UseCaseTabRail({
  activeId,
  onSelect,
}: {
  activeId: DemoTab["id"];
  onSelect: (id: DemoTab["id"]) => void;
}) {
  return (
    <div
      className="flex items-center gap-6 w-full"
      style={{ background: "#1c1d21", padding: "6px 16px 4px" }}
    >
      <div className="flex items-center gap-2">
        <Image src="/images/home/icon-pointer.svg" alt="" width={16} height={16} aria-hidden="true" />
        <span
          className="font-firamono uppercase whitespace-nowrap"
          style={{ fontSize: 14, letterSpacing: "-0.03em", color: "#b4b1fa", lineHeight: 1.2 }}
        >
          Use Cases
        </span>
      </div>
      <div className="flex items-start gap-2">
        {DEMO_TABS.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelect(tab.id)}
              className="rounded-lg px-3 py-2 flex items-center font-firamono uppercase whitespace-nowrap cursor-pointer"
              style={{
                background: active ? "rgba(255,255,255,0.08)" : "transparent",
                color: active ? "#fff" : "rgba(255,255,255,0.52)",
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

export function UseCaseDemoLegacy() {
  const [activeId, setActiveId] = useState<DemoTab["id"]>("dashboard");
  const activeTab = DEMO_TABS.find((t) => t.id === activeId) ?? DEMO_TABS[0];

  return (
    <div
      className="absolute flex flex-col items-start"
      style={{
        top: 514,
        left: 80,
        width: 1280,
        background: "#1c1d21",
        border: "2px solid #1c1d21",
        borderRadius: 12,
      }}
    >
      <div
        className="absolute"
        style={{
          top: 26,
          left: -2,
          width: 1280,
          height: 26,
          filter: "blur(60px)",
          backgroundImage:
            "linear-gradient(90deg, rgb(159,159,159) 0%, rgb(45,125,255) 25%, rgb(197,93,245) 50%, rgb(45,125,255) 74.519%, rgb(159,159,159) 100%)",
        }}
      />
      <UseCaseTabRail activeId={activeId} onSelect={setActiveId} />
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 620,
          background: "#000",
          border: "4px solid #1c1d21",
          borderRadius: 12,
        }}
      >
        <Image
          key={activeTab.id}
          src={activeTab.image}
          alt={`${activeTab.label} demo`}
          fill
          sizes="1280px"
          style={{ objectFit: "cover", objectPosition: "top left" }}
          priority={activeId === "dashboard"}
        />
      </div>
      <div
        className="absolute flex items-center gap-3"
        style={{
          right: -2,
          bottom: -2,
          background: "#1c1d21",
          padding: 2,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
          <Image src="/images/home/icon-pointer-filled.svg" alt="" width={16} height={16} />
          <span
            className="font-firamono uppercase whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.52)", fontSize: 14, letterSpacing: "-0.03em", lineHeight: 1.2 }}
          >
            Live Demo
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
          <Image src="/images/home/icon-github.svg" alt="" width={16} height={16} />
          <span
            className="font-firamono uppercase whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.52)", fontSize: 14, letterSpacing: "-0.03em", lineHeight: 1.2 }}
          >
            Github
          </span>
        </div>
      </div>
      <div
        className="absolute flex items-center"
        style={{
          left: -2,
          bottom: -2,
          background: "#1c1d21",
          padding: 2,
          borderTopRightRadius: 10,
        }}
      >
        <div className="flex items-center rounded-lg p-1.5">
          <Image src="/images/home/icon-info.svg" alt="" width={16} height={16} aria-label="More info" />
        </div>
      </div>
    </div>
  );
}
