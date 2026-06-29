"use client";

// UseCaseDemo — 5-tab product demo panel. Default state shows a static preview
// image with a "TRY DEMO" button overlay and a hand-drawn arrow annotation.
// Clicking TRY DEMO swaps the image for an <iframe> of the live demo in place.
// Switching tabs resets back to the image view.
//
// Responsive rewrite: relative w-full instead of absolute-positioned 1280px.
// Tab rail wraps to two rows on mobile (label + Try Demo on top, tabs in a
// horizontal scroll below). Stage uses aspect-ratio instead of fixed height
// so it scales with viewport.

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
const GITHUB_ORG = "https://github.com/velt-js";

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
      // Stacks vertically on mobile (label+CTA on top, scrollable tabs below);
      // single row on lg+.
      className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 w-full relative"
      style={{ background: "#1c1d21", padding: "6px 16px 4px", zIndex: 2 }}
    >
      <div className="flex items-center gap-2 justify-between lg:justify-start">
        <div className="flex items-center gap-2">
          <Image src="/images/home/icon-pointer.svg" alt="" width={16} height={16} aria-hidden="true" />
          <span
            className="font-firamono uppercase whitespace-nowrap"
            style={{ fontSize: 14, letterSpacing: "-0.03em", color: "#b4b1fa", lineHeight: 1.2 }}
          >
            Use Cases
          </span>
        </div>
        {/* On mobile only: Try Demo button next to label so it stays visible
            without the user having to scroll the tab strip horizontally. */}
        {showTryDemo && (
          <button
            type="button"
            onClick={onTryDemo}
            aria-label={`Try ${activeLabel} demo`}
            className="lg:hidden flex items-center gap-2 font-firamono uppercase cursor-pointer"
            style={{
              padding: "6px 10px",
              background: "#1c1d21",
              border: "1px solid #b4b1fa",
              borderRadius: 4,
              color: "#b4b1fa",
              fontSize: 12,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            <Image
              src="/images/home/icon-pointer.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />
            Try Demo
          </button>
        )}
      </div>
      {/* Tab strip — scrolls horizontally on mobile when content overflows.
          The right-edge fade mask cues the user that more tabs sit beyond
          the visible area. Mask is cleared at lg+ where no scroll is needed. */}
      <div
        className="use-case-tab-strip flex items-start gap-2 overflow-x-auto lg:overflow-visible -mx-2 px-2 lg:mx-0 lg:px-0 no-scrollbar w-full lg:w-auto"
      >
        {DEMO_TABS.map((tab) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelect(tab.id)}
              className="rounded-lg px-3 py-2 flex items-center font-firamono uppercase whitespace-nowrap cursor-pointer flex-shrink-0"
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

      {/* Desktop-only TRY DEMO at the right end of the header row, with the
          "Not just a picture, Click to try" annotation that arrows back at
          the button on hover. */}
      {showTryDemo && (
        <div className="hidden lg:block ml-auto relative">
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
              Not just a picture.
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
      className="relative w-full flex flex-col items-start"
      style={{
        background: "#1c1d21",
        border: "2px solid #1c1d21",
        borderRadius: 12,
      }}
    >
      {/* Blurred gradient accent bar — tracks container width. */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 26,
          left: 0,
          right: 0,
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

      {/* Screenshot stage — aspect-ratio derives height from width so it
          scales smoothly across viewports. 1280:620 matches the Figma. */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setStageHover(true)}
        onMouseLeave={() => setStageHover(false)}
        style={{
          aspectRatio: "1280 / 620",
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
            {/* All 5 images stay mounted so tab switches are instant after
                first paint. Only the dashboard image is priority (LCP); the
                rest load eagerly in parallel right after hydration. */}
            {DEMO_TABS.map((tab) => (
              <Image
                key={tab.id}
                src={tab.image}
                alt={`${tab.label} demo`}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                style={{
                  objectFit: "cover",
                  objectPosition: "top left",
                  opacity: tab.id === activeId ? 1 : 0,
                  transition: "opacity 150ms ease-out",
                }}
                priority={tab.id === "dashboard"}
                loading={tab.id === "dashboard" ? undefined : "eager"}
              />
            ))}
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

      {/* Bottom-right Github pill */}
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

      {/* Bottom-left info icon */}
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
