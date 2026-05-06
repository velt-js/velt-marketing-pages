"use client";

// UseCaseDemo — 5-tab product demo panel. Default state shows a static preview
// image with a "TRY DEMO" button overlay and a hand-drawn arrow annotation.
// Clicking TRY DEMO swaps the image for an <iframe> of the live demo in place.
// Switching tabs resets back to the image view. Ported from the Framer export
// at /Users/yoenzhang/Downloads/velt-marketing-imported-html/page.html.

import { useEffect, useState } from "react";
import Image from "next/image";

type DemoTab = {
  id: "dashboard" | "documentation" | "video" | "cms" | "canvas";
  label: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
};

// TODO(yoen): per-product GitHub repo URLs. Using org root as a stopgap.
const GITHUB_ORG = "https://github.com/veltdev";

// Per-tab demo URLs — confirmed against the live iframes on velt.dev.
// Each tab loads its own dedicated product-specific demo app.
const DEMO_TABS: DemoTab[] = [
  {
    id: "dashboard",
    label: "Dashboard Product",
    image: "/images/home/demo-dashboard.png",
    demoUrl: "https://velt-spreadsheet-app-demo.vercel.app/",
    githubUrl: GITHUB_ORG,
  },
  {
    id: "documentation",
    label: "Documentation Product",
    image: "/images/home/demo-documentation.png",
    demoUrl: "https://documentation-app-demo.vercel.app/",
    githubUrl: GITHUB_ORG,
  },
  {
    id: "video",
    label: "Video Editor",
    image: "/images/home/demo-video.png",
    demoUrl: "https://velt-video-editor-app-demo.vercel.app/",
    githubUrl: GITHUB_ORG,
  },
  {
    id: "cms",
    label: "CMS Product",
    image: "/images/home/demo-cms.png",
    demoUrl: "https://velt-vercel-style-toolbar-demo.vercel.app/",
    githubUrl: GITHUB_ORG,
  },
  {
    id: "canvas",
    label: "Canvas Editor",
    image: "/images/home/demo-canvas.png",
    demoUrl: "https://figma-style-canvas-demo.vercel.app/",
    githubUrl: GITHUB_ORG,
  },
];

function UseCaseTabRail({
  activeId,
  onSelect,
  onTryDemo,
  activeLabel,
  showTryDemo,
  annotationVisible,
}: {
  activeId: DemoTab["id"];
  onSelect: (id: DemoTab["id"]) => void;
  onTryDemo: () => void;
  activeLabel: string;
  showTryDemo: boolean;
  annotationVisible: boolean;
}) {
  return (
    <div
      className="flex items-center gap-6 w-full relative"
      style={{ background: "#1c1d21", padding: "6px 16px 4px", zIndex: 2 }}
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

      {/* TRY DEMO button sits at the right end of the header row. Hovering or
          focusing the button reveals the "Not just a picture, Click to try"
          annotation below-left, with the arrow (natural up-right orientation)
          pointing back at the button. */}
      {showTryDemo && (
        // Button styling lifted from velt.dev's Framer export — 1px purple
        // border, 4px radius, Fira Mono 14px with -0.03em tracking.
        <div className="ml-auto relative">
          <button
            type="button"
            onClick={onTryDemo}
            aria-label={`Try ${activeLabel} demo`}
            className="flex items-center gap-2 font-firamono uppercase cursor-pointer"
            style={{
              padding: "8px 14px",
              background: "#1c1d21",
              border: "1px solid #b4b1fa",
              borderRadius: 4,
              color: "#b4b1fa",
              fontSize: 14,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            <Image
              src="/images/home/icon-pointer.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
            Try Demo
          </button>
          {/* "Not just a picture, Click to try" — Urbanist centered, 1.4em
              line height, -0.01em tracking, arrow in natural up-right
              orientation pointing back at the button. Visibility is driven
              by `annotationVisible`, which is wired to hover on the stage. */}
          <div
            className="absolute flex items-end gap-2 pointer-events-none transition-opacity duration-200"
            style={{
              top: "calc(100% + 6px)",
              right: "calc(100% - 48px)",
              opacity: annotationVisible ? 1 : 0,
            }}
            aria-hidden="true"
          >
            <p
              className="font-urbanist"
              style={{
                color: "#b4b1fa",
                fontSize: 16,
                lineHeight: "1.4em",
                letterSpacing: "-0.01em",
                margin: 0,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              Not just a picture,
              <br />
              Click to try
            </p>
            <Image
              src="/images/home/demos/arrow-try-demo.svg"
              alt=""
              width={38}
              height={50}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function UseCaseDemo() {
  const [activeId, setActiveId] = useState<DemoTab["id"]>("dashboard");
  const [showIframe, setShowIframe] = useState(false);
  const [stageHover, setStageHover] = useState(false);
  const activeTab = DEMO_TABS.find((t) => t.id === activeId) ?? DEMO_TABS[0];

  // Reset to image view whenever the tab changes so each product starts fresh.
  useEffect(() => {
    setShowIframe(false);
  }, [activeId]);

  return (
    <div
      className="absolute flex flex-col items-start"
      style={{
        top: 570,
        left: 80,
        width: 1280,
        background: "#1c1d21",
        border: "2px solid #1c1d21",
        borderRadius: 12,
      }}
    >
      {/* Blurred gradient accent bar */}
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

      <UseCaseTabRail
        activeId={activeId}
        onSelect={setActiveId}
        onTryDemo={() => setShowIframe(true)}
        activeLabel={activeTab.label}
        showTryDemo={!showIframe}
        annotationVisible={!showIframe && stageHover}
      />

      {/* Screenshot stage — renders either the preview image or the live
          iframe, keyed on activeTab so React remounts when tabs switch.
          Hover on the stage reveals the "Not just a picture" annotation
          that's anchored to the TRY DEMO button above. */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setStageHover(true)}
        onMouseLeave={() => setStageHover(false)}
        style={{
          height: 620,
          background: "#000",
          border: "4px solid #1c1d21",
          borderRadius: 12,
        }}
      >
        {showIframe ? (
          <iframe
            key={`${activeTab.id}-iframe`}
            src={activeTab.demoUrl}
            title={`${activeTab.label} demo`}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            allowFullScreen
            allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; clipboard-write"
            className="w-full h-full"
            style={{
              border: 0,
              borderRadius: 0,
              transformOrigin: "center top",
            }}
          />
        ) : (
          <>
            <Image
              key={activeTab.id}
              src={activeTab.image}
              alt={`${activeTab.label} demo`}
              fill
              sizes="1280px"
              style={{ objectFit: "cover", objectPosition: "top left" }}
              priority={activeId === "dashboard"}
            />
            {/* Hover dimmer — fades a 60% black overlay over the preview
                when the stage is hovered so the TRY DEMO CTA and arrow
                annotation pop. Mirrors the live velt.dev treatment. */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                opacity: stageHover ? 1 : 0,
              }}
              aria-hidden="true"
            />
          </>
        )}
      </div>

      {/* Bottom-right Github pill — real link now (Live Demo pill removed;
          its affordance is replaced by TRY DEMO on the stage). */}
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
        <a
          href={activeTab.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5"
        >
          <Image src="/images/home/icon-github.svg" alt="" width={16} height={16} />
          <span
            className="font-firamono uppercase whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.52)", fontSize: 14, letterSpacing: "-0.03em", lineHeight: 1.2 }}
          >
            Github
          </span>
        </a>
      </div>

      {/* Bottom-left info icon — unchanged */}
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
