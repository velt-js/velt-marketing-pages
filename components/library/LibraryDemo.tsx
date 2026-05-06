"use client";

// LibraryDemo — interactive demo panel for /libraries. Mirrors the chrome +
// hover behavior of the homepage's UseCaseDemo: tab rail up top, preview
// image by default, click TRY DEMO to swap in the live iframe, hovering the
// stage dims it and reveals the "Not just a picture" annotation pointing
// at the TRY DEMO button.
//
// Per-tab demoUrl/githubUrl/previewSrc are mirrored from the individual
// velt.dev/libraries/<lib> pages. Where velt.dev hasn't built a dedicated
// demo yet (highcharts, nivo) the tab points at the shared React Flow demo
// — same behavior production shows today.

import { useState } from "react";

import { LibraryDemoStage } from "./LibraryDemoStage";

type LibraryDemoTab = {
  id: string;
  label: string;
  demoUrl: string;
  githubUrl: string;
  previewSrc: string;
  iconSrc: string;
  iconWidth: number;
  iconHeight: number;
};

// Icon-forward tab rail. Icon SVGs are extracted from the live
// velt.dev/libraries DOM (white-fill, designed at a uniform ~12-18 unit
// natural height). iconWidth/iconHeight reflect each SVG's viewBox
// scaled to a 22px render height. nivo and react-flow use PNGs because
// the live site sources them differently; the brightness/invert filter
// in the rail keeps every tab white regardless.
const TABS: LibraryDemoTab[] = [
  {
    id: "yjs",
    label: "Yjs",
    demoUrl: "https://velt-general-crdt-demo.vercel.app/",
    githubUrl: "https://github.com/velt-js/velt-general-crdt-demo",
    previewSrc: "/images/home/libraries/demos/yjs.png",
    iconSrc: "/images/home/libraries/icons/yjs.png",
    iconWidth: 19,
    iconHeight: 22,
  },
  {
    id: "codemirror",
    label: "CodeMirror",
    demoUrl: "https://velt-codemirror-crdt-demo.vercel.app/",
    githubUrl: "https://github.com/velt-js/velt-codemirror-crdt-demo",
    previewSrc: "/images/home/libraries/demos/codemirror.png",
    iconSrc: "/images/home/libraries/icons/codemirror.png",
    iconWidth: 95,
    iconHeight: 22,
  },
  {
    id: "lexical",
    label: "Lexical",
    demoUrl: "https://lexical-velt-comments-demo.vercel.app/",
    githubUrl: "https://github.com/velt-js/lexical-velt-comments-demo",
    previewSrc: "/images/home/libraries/demos/lexical.png",
    iconSrc: "/images/home/libraries/icons/lexical.png",
    iconWidth: 101,
    iconHeight: 22,
  },
  {
    id: "blocknote",
    label: "BlockNote",
    demoUrl: "https://velt-blocknote-crdt-demo.vercel.app/",
    githubUrl: "https://github.com/velt-js/velt-blocknote-crdt-demo",
    previewSrc: "/images/home/libraries/demos/blocknote.png",
    iconSrc: "/images/home/libraries/icons/blocknote.png",
    iconWidth: 122,
    iconHeight: 22,
  },
  {
    id: "tiptap",
    label: "Tiptap",
    demoUrl: "https://velt-tiptap-crdt-demo.vercel.app/",
    githubUrl: "https://github.com/velt-js/velt-tiptap-crdt-demo",
    previewSrc: "/images/home/libraries/demos/tiptap.png",
    iconSrc: "/images/home/libraries/icons/tiptap.png",
    iconWidth: 92,
    iconHeight: 22,
  },
  {
    id: "react-flow",
    label: "React Flow",
    demoUrl: "https://velt-reactflow-crdt-demo.vercel.app/",
    githubUrl: "https://github.com/velt-js/velt-reactflow-crdt-demo",
    previewSrc: "/images/home/libraries/demos/react-flow.png",
    iconSrc: "/images/home/libraries/icons/react-flow.png",
    iconWidth: 119,
    iconHeight: 22,
  },
  {
    id: "highcharts",
    label: "HighCharts",
    demoUrl: "https://velt-reactflow-crdt-demo.vercel.app/",
    githubUrl: "https://github.com/velt-js/velt-reactflow-crdt-demo",
    previewSrc: "/images/home/libraries/demos/highcharts.png",
    iconSrc: "/images/home/libraries/icons/highcharts.png",
    iconWidth: 125,
    iconHeight: 22,
  },
  {
    id: "nivo",
    label: "nivo",
    demoUrl: "https://velt-reactflow-crdt-demo.vercel.app/",
    githubUrl: "https://github.com/velt-js/velt-reactflow-crdt-demo",
    previewSrc: "/images/home/libraries/demos/nivo.png",
    iconSrc: "/images/home/libraries/icons/nivo-charts.png",
    iconWidth: 71,
    iconHeight: 22,
  },
];

function TabRail({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 overflow-hidden">
      {TABS.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            className="rounded-lg px-2.5 py-0 flex items-center cursor-pointer shrink-0"
            style={{
              background: active ? "rgba(255,255,255,0.08)" : "transparent",
              opacity: active ? 1 : 0.5,
              border: 0,
              transition: "opacity 160ms ease, background 160ms ease",
            }}
          >
            {/* Plain <img> — Next's <Image> optimizer rejects SVG by
                default. The brightness/invert filter keeps PNG fallbacks
                (react-flow, nivo) white and is a no-op on the SVGs that
                already ship with white fills. */}
            <img
              src={tab.iconSrc}
              alt={tab.label}
              width={tab.iconWidth}
              height={tab.iconHeight}
              style={{
                height: 32,
                width: "auto",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

export function LibraryDemo() {
  const [activeId, setActiveId] = useState<string>("yjs");
  const activeTab = TABS.find((t) => t.id === activeId) ?? TABS[0];

  return (
    <section className="flex justify-center w-full bg-black full-bleed-bg" style={{ padding: "0 80px" }}>
      {/* `key={activeId}` resets LibraryDemoStage's internal showIframe /
          stageHover state when the user switches tabs, so every library
          starts on its preview image. */}
      <LibraryDemoStage
        key={activeId}
        demoUrl={activeTab.demoUrl}
        githubUrl={activeTab.githubUrl}
        previewSrc={activeTab.previewSrc}
        label={activeTab.label}
        header={<TabRail activeId={activeId} onSelect={setActiveId} />}
      />
    </section>
  );
}
