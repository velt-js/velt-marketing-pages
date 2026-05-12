"use client";

// Nav — labels and hrefs extracted from the Framer HTML export
// (/Users/yoenzhang/Downloads/79f9d44e-aee0-4640-93c0-37f7eddaf158/page.html,
// nav element at lines 1696 + 1702). Product dropdown mirrors Figma node
// 1:21692 "Nav". Hover animation approximates Framer Motion's
// `{ type: "spring", duration: 0.4, bounce: 0.2 }` with a cubic-bezier that
// overshoots slightly on enter and settles on exit.
//
// Scroll behavior: over dark sections (Hero, TrustedLogos) the bar is
// transparent with white text; over the white content block it flips to
// white-on-dark. Driven by an IntersectionObserver on the Outcomes and
// GetStartedSteps markers.

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

type DropdownId = "product" | "useCases" | "enterprise" | "resources";

type TopLink =
  | { label: string; href: string }
  | { label: string; dropdown: DropdownId };

const topLinks: TopLink[] = [
  { label: "Product", dropdown: "product" },
  { label: "Use Cases", dropdown: "useCases" },
  { label: "Enterprise", dropdown: "enterprise" },
  { label: "Resources", dropdown: "resources" },
  { label: "Pricing", href: "/pricing" },
];

// ---------- Product dropdown data — matches Figma 1:21692 ----------

type DropdownItem = {
  label: string;
  href: string;
  /** Inline icon (SVG) or image URL. Omit for text-only rows. */
  icon?: ReactNode;
  iconSrc?: string;
  /** optional tint applied to the icon container for monochrome Tabler glyphs */
  tint?: string;
};

type DropdownSection = {
  /** Optional group heading (e.g. "ASYNC"). Omit for Enterprise / Use Cases col 3. */
  heading?: string;
  items: DropdownItem[];
};

type DropdownColumn = {
  width: number;
  /** Row height — 33 for Product/Resources/Enterprise, 36 for Use Cases. */
  itemHeight?: number;
  /** Smaller 11.2px labels instead of 14px. */
  compact?: boolean;
  sections: DropdownSection[];
  footer?: { label: string; href: string };
};

// Tabler icon strokes (MIT). viewBox 0 0 24 24, stroke-width 1.6, stroke-linecap round.
function I({ d, children }: { d?: string; children?: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {d ? <path d={d} /> : children}
    </svg>
  );
}

const icons = {
  // Comments — custom speech-bubble shape per Figma 1:21698:
  // 10.667×10.667 box, 1.333 stroke, corners TL/TR/BR=8, BL=1.333 (tail stub).
  comments: (
    <span
      aria-hidden
      style={{
        display: "block",
        width: 13.33,
        height: 13.33,
        border: "1.667px solid currentColor",
        borderRadius: "10px 10px 10px 1.667px",
        boxSizing: "border-box",
      }}
    />
  ),
  bell: (
    <I>
      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </I>
  ),
  video: (
    <I>
      <path d="M15 10l4.553 -2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1 -1.447 .894L15 14" />
      <rect x="3" y="6" width="12" height="12" rx="2" />
    </I>
  ),
  movie: (
    <I>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 4v16 M16 4v16 M4 8h4 M4 16h4 M4 12h16 M16 8h4 M16 16h4" />
    </I>
  ),
  moodSmile: (
    <I>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01 M15 10h.01 M9.5 15a3.5 3.5 0 0 0 5 0" />
    </I>
  ),
  eye: (
    <I>
      <circle cx="12" cy="12" r="2" />
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </I>
  ),
  // Y.js mark for Multiplayer Editing
  yjs: (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 3 L8 9 L13 3 M8 9 L8 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  pencilStar: (
    <I>
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </I>
  ),
  refresh: (
    <I>
      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </I>
  ),
  click: (
    <I>
      <path d="M3 12h3 M12 3v3 M7.8 7.8l-2.2 -2.2 M16.2 7.8l2.2 -2.2 M7.8 16.2l-2.2 2.2" />
      <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
    </I>
  ),
  headphones: (
    <I>
      <rect x="4" y="13" width="5" height="7" rx="2" />
      <rect x="15" y="13" width="5" height="7" rx="2" />
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
    </I>
  ),
  usersGroup: (
    <I>
      <circle cx="12" cy="15" r="2" />
      <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
      <circle cx="17" cy="7" r="2" />
      <path d="M17 10h2a2 2 0 0 1 2 2v1" />
      <circle cx="7" cy="7" r="2" />
      <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
    </I>
  ),
  pointer: (
    <I d="M7.904 17.563a1.2 1.2 0 0 0 2.228 .308l2.09 -3.093l4.907 4.907a1.067 1.067 0 0 0 1.509 0l1.047 -1.047a1.067 1.067 0 0 0 0 -1.509l-4.907 -4.907l3.113 -2.09a1.2 1.2 0 0 0 -.309 -2.228l-12.358 -3.486l-.1 -.011a1.2 1.2 0 0 0 -1.1 1.611z" />
  ),
  hexagon: (
    <I d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98" />
  ),
  circle: <I d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" />,
  server: (
    <I>
      <rect x="3" y="4" width="18" height="8" rx="3" />
      <rect x="3" y="12" width="18" height="8" rx="3" />
      <path d="M7 8h.01 M7 16h.01" />
    </I>
  ),
  cloud: (
    <I d="M6.657 18a4.5 4.5 0 0 1 0 -9a5.5 5.5 0 0 1 10.9 -1a4 4 0 0 1 2.443 7h-13.343" />
  ),
  plug: (
    <I>
      <path d="M9.785 6l8.215 8.215l-2.054 2.054a5.81 5.81 0 1 1 -8.215 -8.215l2.054 -2.054z" />
      <path d="M4 20l3.5 -3.5 M15 4l-3.5 3.5 M20 9l-3.5 3.5" />
    </I>
  ),
  // Tabler: shield
  shield: (
    <I d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
  ),
  // Tabler: shield-check
  shieldCheck: (
    <I>
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
      <path d="M9 12l2 2l4 -4" />
    </I>
  ),
  // Tabler: lock
  lock: (
    <I>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <circle cx="12" cy="16" r="1" />
      <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
    </I>
  ),
  // Tabler: key
  key: (
    <I>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.85 12.15l10.15 -10.15 M18 5l3 3 M15 8l3 3" />
    </I>
  ),
  // Tabler: life-buoy
  lifebuoy: (
    <I>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M15 15l3.35 3.35 M9 15l-3.35 3.35 M15 9l3.35 -3.35 M9 9l-3.35 -3.35" />
    </I>
  ),
  // Tabler: book
  book: (
    <I>
      <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
      <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
      <path d="M3 6v13 M12 6v13 M21 6v13" />
    </I>
  ),
  // Tabler: scale (comparison)
  scale: (
    <I>
      <path d="M7 20l10 0" />
      <path d="M6 6l6 -1l6 1" />
      <path d="M12 3l0 17" />
      <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
      <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
    </I>
  ),
  // Tabler: sparkles
  sparkles: (
    <I d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
  ),
  // Tabler: rocket
  rocket: (
    <I>
      <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
      <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
      <circle cx="15" cy="9" r="1" />
    </I>
  ),
  // Tabler: palette
  palette: (
    <I d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  ),
  // Tabler: layout-grid
  grid: (
    <I>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </I>
  ),
  // Tabler: transfer / arrow-right
  transfer: (
    <I d="M4 12h16m-5 -5l5 5l-5 5" />
  ),
  // Tabler: list-details — used for Activity Logs
  list: (
    <I>
      <path d="M13 5h8 M13 9h5 M13 15h8 M13 19h5" />
      <rect x="3" y="4" width="6" height="6" rx="1" />
      <rect x="3" y="14" width="6" height="6" rx="1" />
    </I>
  ),
};

const productAsync: DropdownItem[] = [
  { label: "Comments", href: "/comments", icon: icons.comments, tint: "#ffa3fa" },
  { label: "Notifications", href: "/notifications", icon: icons.bell, tint: "#f5d14a" },
  { label: "Recording", href: "/recording", icon: icons.video, tint: "#f47474" },
  { label: "Activity Logs", href: "/activity-logs", icon: icons.list, tint: "#5ca3ff" },
  { label: "Video Editor", href: "https://docs.velt.dev/async-collaboration/recorder/setup", icon: icons.movie, tint: "#5ca3ff" },
  { label: "View Analytics", href: "https://docs.velt.dev/async-collaboration/view-analytics/overview", icon: icons.moodSmile, tint: "#b387f7" },
  { label: "Reactions", href: "https://docs.velt.dev/async-collaboration/reactions/overview", icon: icons.eye, tint: "#f5a15e" },
];

const productRealtime: DropdownItem[] = [
  { label: "Multiplayer Editing", href: "/multiplayer-editing", icon: icons.yjs, tint: "#48cfad" },
  { label: "Single Editor", href: "/multiplayer-editing", icon: icons.pencilStar, tint: "#5ca3ff" },
  { label: "Live State Sync", href: "https://docs.velt.dev/realtime-collaboration/live-state-sync/overview", icon: icons.refresh, tint: "#48cfad" },
  { label: "Live Selection", href: "https://docs.velt.dev/realtime-collaboration/live-selection/overview", icon: icons.click, tint: "#b387f7" },
  { label: "Huddle", href: "https://docs.velt.dev/realtime-collaboration/huddle/overview", icon: icons.headphones, tint: "#a4bd52" },
  { label: "Presence", href: "https://docs.velt.dev/realtime-collaboration/presence/overview", icon: icons.usersGroup, tint: "#97e07f" },
  { label: "Cursors", href: "https://docs.velt.dev/realtime-collaboration/cursors/overview", icon: icons.pointer, tint: "#f5a15e" },
  { label: "Follow Mode", href: "https://docs.velt.dev/realtime-collaboration/flock-mode/overview", icon: icons.pointer, tint: "#5eda7a" },
];

const productPlatform: DropdownItem[] = [
  { label: "Admin Console", href: "/platform", icon: icons.hexagon, tint: "#b387f7" },
  { label: "Dev Tools", href: "/devtools", icon: icons.circle, tint: "#f5d14a" },
  { label: "MCP", href: "https://docs.velt.dev/mcp/mcp", icon: icons.server, tint: "#ffa3fa" },
  { label: "Webhooks & API", href: "/webhooks-and-api", icon: icons.cloud, tint: "#5eda7a" },
  { label: "Integrations", href: "https://docs.velt.dev/integrations", icon: icons.plug, tint: "#ffa3fa" },
];

const productColumns: DropdownColumn[] = [
  {
    width: 171,
    sections: [{ heading: "ASYNC", items: productAsync }],
    footer: { label: "VIEW ALL FEATURES", href: "/features" },
  },
  { width: 201, compact: true, sections: [{ heading: "REALTIME", items: productRealtime }] },
  { width: 157, compact: true, sections: [{ heading: "PLATFORM", items: productPlatform }] },
];

// ---------- Use Cases dropdown — Figma 93:1268 ----------

// Library glyph icons extracted from the Framer reference (chunk-IJ4UZSEE).
// Rendered as a fixed 16×16 square — these are single marks, not wordmarks,
// so `object-fit: contain` centers them without letterboxing.
function LibraryIcon({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      style={{ display: "block", width: 20, height: 20, objectFit: "contain" }}
    />
  );
}

// TODO: add CRM Product when /use-case/crm page exists
const useCasesAppTypes: DropdownItem[] = [
  { label: "Video Editor", href: "/use-case/video-editor", icon: icons.movie, tint: "#f47474" },
  { label: "Form Builder", href: "/use-case/form-builder", icon: icons.list, tint: "#5ca3ff" },
  { label: "Analytics Product", href: "/use-case/analytics", icon: icons.eye, tint: "#b387f7" },
  { label: "Task Manager", href: "/use-case/task-manager", icon: icons.click, tint: "#f5d14a" },
  { label: "Sheets Product", href: "/use-case/sheets", icon: icons.grid, tint: "#48cfad" },
  { label: "Session Replay Tool", href: "/use-case/session-replay", icon: icons.refresh, tint: "#ffa3fa" },
];

const useCasesEditors: DropdownItem[] = [
  { label: "Lexical", href: "/libraries/lexical", iconSrc: "/images/home/nav-icons/lexical.svg" },
  { label: "SlateJS", href: "/libraries/slatejs", iconSrc: "/images/home/nav-icons/slatejs.png" },
  { label: "Tiptap", href: "/libraries/tiptap", iconSrc: "/images/home/nav-icons/tiptap.svg" },
  { label: "YJS", href: "/libraries/yjs", iconSrc: "/images/home/nav-icons/yjs.svg" },
  { label: "BlockNote", href: "/libraries/blocknote", iconSrc: "/images/home/nav-icons/blocknote.svg" },
  { label: "CodeMirror", href: "/libraries/codemirror", iconSrc: "/images/home/nav-icons/codemirror.svg" },
];

const useCasesCharts: DropdownItem[] = [
  { label: "React Flow", href: "/libraries/react-flow", iconSrc: "/images/home/nav-icons/reactflow.svg" },
  { label: "HighCharts", href: "/libraries/highcharts", iconSrc: "/images/home/nav-icons/highcharts.svg" },
  { label: "NivoCharts", href: "/libraries/nivo-charts", iconSrc: "/images/home/nav-icons/nivocharts.svg" },
  { label: "ChartJS", href: "/libraries/chartjs", iconSrc: "/images/home/nav-icons/chartjs.svg" },
];

const useCasesColumns: DropdownColumn[] = [
  {
    width: 171,
    itemHeight: 36,
    sections: [{ heading: "APP TYPES", items: useCasesAppTypes }],
    footer: { label: "ALL APP TYPES", href: "/use-case" },
  },
  {
    width: 201,
    itemHeight: 36,
    sections: [{ heading: "LIBRARIES", items: useCasesEditors }],
    footer: { label: "ALL LIBRARIES", href: "/libraries" },
  },
  {
    width: 201,
    itemHeight: 36,
    sections: [{ items: useCasesCharts }],
  },
];

// ---------- Enterprise dropdown — Figma 89:1230 ----------

const enterpriseItems: DropdownItem[] = [
  { label: "Self Hosting", href: "/enterprise#self-hosting", icon: icons.server, tint: "#5ca3ff" },
  { label: "Compliance Tools", href: "/enterprise#compliance-tools", icon: icons.shieldCheck, tint: "#5eda7a" },
  { label: "Advanced Encryption", href: "/enterprise#advanced-encryption", icon: icons.lock, tint: "#b387f7" },
  { label: "Access Controls", href: "/enterprise#access-controls", icon: icons.key, tint: "#f5d14a" },
  { label: "Security", href: "/enterprise#security", icon: icons.shield, tint: "#f47474" },
  { label: "Support", href: "/enterprise#support", icon: icons.lifebuoy, tint: "#48cfad" },
];

const enterpriseColumns: DropdownColumn[] = [
  { width: 201, sections: [{ heading: "ENTERPRISE", items: enterpriseItems }] },
];

// ---------- Resources dropdown — Figma 88:1113 ----------

const resourcesLearn: DropdownItem[] = [
  { label: "Docs", href: "https://docs.velt.dev/", icon: icons.book, tint: "#5ca3ff" },
  { label: "Comparison", href: "/comparison", icon: icons.scale, tint: "#f5a15e" },
  { label: "Examples", href: "https://samples.velt.dev/", icon: icons.sparkles, tint: "#f5d14a" },
];

const resourcesTools: DropdownItem[] = [
  { label: "Launch Kit", href: "https://velt.dev/launch-kit", icon: icons.rocket, tint: "#ffa3fa" },
  { label: "Themes Playground", href: "https://playground.velt.dev/themes", icon: icons.palette, tint: "#b387f7" },
  { label: "Figma UI Kit", href: "https://www.figma.com/community/file/1402312407969730816/velt-collaboration-kit", icon: icons.grid, tint: "#48cfad" },
];

const resourcesMigrate: DropdownItem[] = [
  { label: "Migrate from Liveblocks", href: "/migrate/liveblocks", icon: icons.transfer, tint: "#5eda7a" },
  { label: "Migrate from Cord", href: "/migrate/cord", icon: icons.transfer, tint: "#5eda7a" },
];

const resourcesOthers: DropdownItem[] = [
  { label: "Customers", href: "/customers", icon: icons.usersGroup, tint: "#97e07f" },
  { label: "Security", href: "https://trust.velt.dev/", icon: icons.shield, tint: "#f47474" },
  { label: "Release Notes", href: "https://docs.velt.dev/release-notes", icon: icons.list, tint: "#5ca3ff" },
  { label: "Blog", href: "/blog", icon: icons.book, tint: "#48cfad" },
];

const resourcesColumns: DropdownColumn[] = [
  {
    width: 201,
    sections: [
      { heading: "LEARN", items: resourcesLearn },
      { heading: "TOOLS", items: resourcesTools },
    ],
  },
  {
    width: 201,
    sections: [
      { heading: "MIGRATE", items: resourcesMigrate },
      { heading: "OTHERS", items: resourcesOthers },
    ],
  },
];

// ---------- Component ----------

export function Nav() {
  const [overPurple, setOverPurple] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState<DropdownId | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  // Body scroll-lock + escape-to-close while the mobile drawer is open.
  // Also closes the drawer when the viewport crosses into lg+ so the
  // desktop nav doesn't render while the body is still locked.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setDrawerOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [drawerOpen]);

  useEffect(() => {
    const NAV_STRIP = 80;
    // Sample point ~just below the fixed nav strip. Probing here gives us
    // "what the nav is actually sitting over" rather than relying on marker
    // attributes that page authors must remember to add.
    const SAMPLE_Y = NAV_STRIP + 8;

    /**
     * Probe the visible background colour at the nav strip and decide if it
     * is "light" (needs dark text + white nav fill) or "dark" (white text +
     * transparent nav). Walks elementsFromPoint top-down, skipping the nav
     * itself, and returns the first sufficiently-opaque background colour
     * found, falling back to the document body if none qualifies.
     *
     * @returns true if the nav is currently over a light section.
     */
    const isOverLightSection = (): boolean => {
      try {
        const navEl = document.querySelector<HTMLElement>("nav");
        const probes: ReadonlyArray<readonly [number, number]> = [
          [window.innerWidth / 2, SAMPLE_Y],
          [Math.min(80, window.innerWidth / 4), SAMPLE_Y],
          [Math.max(window.innerWidth - 80, (3 * window.innerWidth) / 4), SAMPLE_Y],
        ];
        for (const [pointX, pointY] of probes) {
          const stack = document.elementsFromPoint(pointX, pointY);
          for (const el of stack) {
            if (!(el instanceof HTMLElement)) continue;
            if (navEl && (el === navEl || navEl.contains(el))) continue;
            const bg = window.getComputedStyle(el).backgroundColor;
            const match = bg.match(/rgba?\(([^)]+)\)/);
            if (!match) continue;
            const parts = match[1]
              .split(",")
              .map((part) => parseFloat(part.trim()));
            const red = parts[0];
            const green = parts[1];
            const blue = parts[2];
            const alpha = parts.length >= 4 ? parts[3] : 1;
            if (!Number.isFinite(red) || alpha < 0.5) continue;
            // Perceived luminance — > 0.6 counts as a light surface, which
            // catches pure white (#fff), light grey (#f7f7f7), and the off-
            // white card backgrounds while still treating purple/navy panels
            // (#625df5, #0a092a, etc.) as dark.
            const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
            return luminance > 0.6;
          }
        }
      } catch {
        // elementsFromPoint can throw on detached docs — fall through.
      }
      return false;
    };

    // rAF-throttled wrapper so a burst of scroll events collapses into one
    // probe per frame. Without this, elementsFromPoint (×3) +
    // getComputedStyle (n elements per probe) ran on every scroll tick,
    // which adds up fast at 120Hz on a long page.
    let frameId: number | null = null;
    const runCheck = () => {
      frameId = null;
      try {
        // While still in the first NAV_STRIP px the hero owns the area and
        // the nav should be fully transparent — skip the probe entirely so
        // the dark gradient stays on top of the dark hero.
        if (window.scrollY <= NAV_STRIP) {
          setOverPurple(false);
          return;
        }
        setOverPurple(isOverLightSection());
      } catch {
        setOverPurple(false);
      }
    };
    const schedule = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(runCheck);
    };

    runCheck();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Defer the close so the cursor can cross the gap between trigger and panel.
  const requestOpen = (id: DropdownId) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(id);
  };
  const requestClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  const isSolid = overPurple || hovered;
  const textColor = overPurple ? "#0f0f11" : "#fff";
  const textOpacity = isSolid ? 0.9 : 0.75;
  const iconFilter = overPurple ? "invert(1) brightness(0.2)" : "none";
  const bg = overPurple
    ? "#fff"
    : hovered
      ? "rgba(0,0,0,0.85)"
      : "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0) 100%)";

  return (
    <nav
      className="relative w-full"
      style={{
        background: bg,
        transition: "background 180ms ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); requestClose(); }}
    >
    {/* Mobile bar — logo + hamburger only. Visible below lg. */}
    <div className="lg:hidden flex items-center justify-between px-6 py-3">
      <Link href="/" aria-label="Velt home" className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/velt-logo.svg"
          alt="Velt"
          width={24}
          height={24}
          style={{ filter: iconFilter, transition: "filter 180ms ease" }}
        />
        <span
          className="font-urbanist font-bold"
          style={{
            fontSize: 14,
            lineHeight: 1.2,
            color: textColor,
            transition: "color 180ms ease",
          }}
        >
          Velt
        </span>
      </Link>
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
        aria-expanded={drawerOpen}
        className="flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          background: "transparent",
          border: 0,
          cursor: "pointer",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke={textColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ transition: "stroke 180ms ease" }}
          />
        </svg>
      </button>
    </div>

    {/* Desktop nav — visible lg+. */}
    <div
      className="hidden lg:flex items-center gap-6 relative"
      style={{
        padding: "12px 80px",
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      <div className="flex-1 flex items-center" style={{ gap: 16 }}>
        <Link href="/" aria-label="Velt home" className="flex items-center shrink-0" style={{ gap: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/velt-logo.svg"
            alt="Velt"
            width={24}
            height={24}
            style={{ filter: iconFilter, transition: "filter 180ms ease" }}
          />
          <span
            className="font-urbanist font-bold"
            style={{
              fontSize: 14,
              lineHeight: 1.2,
              color: textColor,
              transition: "color 180ms ease",
            }}
          >
            Velt
          </span>
        </Link>
        <ul className="flex items-start" style={{ gap: 12 }}>
          {topLinks.map((link) => {
            const isDropdown = "dropdown" in link;
            const isOpen = isDropdown && open === link.dropdown;
            return (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={isDropdown ? () => requestOpen(link.dropdown) : undefined}
              >
                {isDropdown ? (
                  <>
                    <button
                      type="button"
                      className="flex items-center rounded-[4px]"
                      style={{
                        padding: "4px 8px",
                        gap: 4,
                        background: "transparent",
                        border: 0,
                      }}
                    >
                      <NavLabel color={textColor} opacity={textOpacity}>
                        {link.label}
                      </NavLabel>
                      <Caret open={isOpen} filter={iconFilter} />
                    </button>
                    <DropdownPanel
                      isOpen={isOpen}
                      onEnter={() => requestOpen(link.dropdown)}
                      onLeave={requestClose}
                    >
                      {link.dropdown === "product" ? (
                        <ProductDropdown light={overPurple} />
                      ) : link.dropdown === "useCases" ? (
                        <MultiColumnDropdown columns={useCasesColumns} light={overPurple} />
                      ) : link.dropdown === "enterprise" ? (
                        <MultiColumnDropdown columns={enterpriseColumns} light={overPurple} />
                      ) : (
                        <MultiColumnDropdown columns={resourcesColumns} light={overPurple} />
                      )}
                    </DropdownPanel>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center rounded-[4px]"
                    style={{ padding: "4px 8px" }}
                  >
                    <NavLabel color={textColor} opacity={textOpacity}>
                      {link.label}
                    </NavLabel>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center" style={{ gap: 8 }}>
        <a
          href="https://console.velt.dev/"
          target="_blank"
          rel="noopener"
          className="flex items-center rounded-lg"
          style={{ padding: "5px 12px 5px 8px", gap: 6 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/icon-login.svg"
            alt=""
            width={16}
            height={16}
            style={{ filter: iconFilter, transition: "filter 180ms ease" }}
          />
          <NavLabel color={textColor} opacity={textOpacity}>Sign In</NavLabel>
        </a>
        <a
          href="https://docs.velt.dev/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center rounded-lg"
          style={{ padding: "5px 12px 5px 8px", gap: 6 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/icon-book-nav.svg"
            alt=""
            width={16}
            height={16}
            style={{ filter: iconFilter, transition: "filter 180ms ease" }}
          />
          <NavLabel color={textColor} opacity={textOpacity}>Read Docs</NavLabel>
        </a>
        <Link
          href="/book-demo"
          className="rounded-lg"
          style={{ padding: "5px 12px", background: "#625df5" }}
        >
          <span
            className="font-urbanist font-semibold text-white whitespace-nowrap"
            style={{ fontSize: 14, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Book Demo
          </span>
        </Link>
      </div>

    </div>

    <MobileNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </nav>
  );
}

function NavLabel({
  color,
  opacity,
  children,
}: {
  color: string;
  opacity: number;
  children: ReactNode;
}) {
  return (
    <span
      className="font-urbanist font-semibold whitespace-nowrap capitalize"
      style={{
        color,
        opacity,
        fontSize: 14,
        lineHeight: 1.2,
        letterSpacing: "-0.03em",
        transition: "color 180ms ease",
      }}
    >
      {children}
    </span>
  );
}

function Caret({ open, filter }: { open: boolean; filter: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/home/icon-chevron-down.svg"
      alt=""
      width={14}
      height={14}
      style={{
        filter,
        transition: "filter 180ms ease, transform 180ms ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    />
  );
}

// ---------- Dropdown shell ----------

function DropdownPanel({
  isOpen,
  onEnter,
  onLeave,
  children,
}: {
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  children: ReactNode;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        paddingTop: 8,
        pointerEvents: isOpen ? "auto" : "none",
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "scale(1) translateY(0)" : "scale(0.98) translateY(-4px)",
        // easeOutBack on enter gives a gentle spring overshoot; easeOut on exit
        transition: isOpen
          ? "opacity 220ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "opacity 140ms ease-out, transform 160ms ease-out",
        transformOrigin: "top left",
        zIndex: 100,
      }}
    >
      {children}
    </div>
  );
}

// ---------- Product dropdown content ----------

function ProductDropdown({ light }: { light?: boolean }) {
  return (
    <div
      className="flex items-start"
      style={{
        background: light ? "#fff" : "#0c0c0d",
        border: `1px solid ${light ? "#e5e5e5" : "#171617"}`,
        borderRadius: 22,
        padding: 4,
        gap: 5,
        boxShadow: light
          ? "0 12px 40px rgba(0,0,0,0.1)"
          : "0 12px 40px rgba(0,0,0,0.4)",
      }}
    >
      {productColumns.map((col, i) => (
        <LinkGroup key={i} column={col} light={light} />
      ))}
      <PreviewCard />
    </div>
  );
}

function MultiColumnDropdown({ columns, light }: { columns: DropdownColumn[]; light?: boolean }) {
  return (
    <div
      className="flex items-start"
      style={{
        background: light ? "#fff" : "#0c0c0d",
        border: `1px solid ${light ? "#e5e5e5" : "#171617"}`,
        borderRadius: 22,
        padding: 4,
        gap: 5,
        boxShadow: light
          ? "0 12px 40px rgba(0,0,0,0.1)"
          : "0 12px 40px rgba(0,0,0,0.4)",
      }}
    >
      {columns.map((col, i) => (
        <LinkGroup key={i} column={col} light={light} />
      ))}
    </div>
  );
}

function GroupHeading({ label, itemHeight, light }: { label?: string; itemHeight: number; light?: boolean }) {
  return (
    <div
      className="flex items-center w-full"
      style={{ padding: 10, borderRadius: 12, height: itemHeight }}
    >
      {label ? (
        <span
          className="font-mono whitespace-nowrap"
          style={{
            fontSize: 10,
            opacity: light ? 0.5 : 0.32,
            color: light ? "#111" : "#fff",
            fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

function LinkGroup({ column, light }: { column: DropdownColumn; light?: boolean }) {
  const itemHeight = column.itemHeight ?? 40;
  return (
    <div
      className="flex flex-col items-start"
      style={{
        background: light ? "#fff" : "#0c0c0d",
        borderRadius: 16,
        padding: 4,
        gap: 4,
        width: column.width,
      }}
    >
      {column.sections.map((section, si) => (
        <Fragment key={si}>
          <GroupHeading label={section.heading} itemHeight={itemHeight} light={light} />
          {section.items.map((item) => (
            <DropdownLink
              key={item.label}
              item={item}
              compact={!!column.compact}
              itemHeight={itemHeight}
              light={light}
            />
          ))}
        </Fragment>
      ))}
      {column.footer ? (
        <DropdownFooterLink footer={column.footer} itemHeight={itemHeight} light={light} />
      ) : null}
    </div>
  );
}

function DropdownLink({
  item,
  compact,
  itemHeight,
  light,
}: {
  item: DropdownItem;
  compact: boolean;
  itemHeight: number;
  light?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const hasIcon = item.icon !== undefined || item.iconSrc !== undefined;
  const isExternal = item.href?.startsWith("http") ?? false;
  const Tag = isExternal ? "a" : Link;
  return (
    <Tag
      href={item.href}
      {...(isExternal ? { target: "_blank", rel: "noopener" } : {})}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center w-full"
      style={{
        padding: "6px 10px",
        borderRadius: 12,
        gap: 12,
        height: itemHeight,
        color: light ? "#111" : "#fff",
        background: hover
          ? (light ? "#f5f5f5" : "#1b1a1a")
          : "transparent",
        transition: "background 140ms ease",
      }}
    >
      {hasIcon ? (
        <span
          className="shrink-0 flex items-center justify-center"
          style={{
            minWidth: 20,
            height: 20,
            color: item.tint ?? (light ? "#111" : "#fff"),
          }}
        >
          {item.iconSrc ? <LibraryIcon src={item.iconSrc} /> : item.icon}
        </span>
      ) : null}
      <span
        className="font-urbanist font-medium whitespace-nowrap"
        style={{
          fontSize: compact ? 11.2 : 14,
          lineHeight: 1.2,
          letterSpacing: compact ? "0" : "-0.42px",
          color: light ? "#111" : "#fff",
        }}
      >
        {item.label}
      </span>
    </Tag>
  );
}

function DropdownFooterLink({
  footer,
  itemHeight,
  light,
}: {
  footer: { label: string; href: string };
  itemHeight: number;
  light?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={footer.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center w-full"
      style={{
        padding: 10,
        borderRadius: 12,
        gap: 8,
        height: itemHeight,
        background: hover
          ? (light ? "#f5f5f5" : "#1b1a1a")
          : "transparent",
        transition: "background 140ms ease",
      }}
    >
      <span
        className="font-mono whitespace-nowrap"
        style={{
          fontSize: 10,
          opacity: light ? 0.5 : 0.32,
          color: light ? "#111" : "#fff",
          fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
          fontWeight: 500,
        }}
      >
        {footer.label}
      </span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke={light ? "#111" : "#fff"}
        strokeOpacity={light ? "0.5" : "0.32"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M9 6l6 6l-6 6" />
      </svg>
    </Link>
  );
}

function PreviewCard() {
  // Figma 1:21794 "Link Card" — 250 wide, fills card-group height. Card Image
  // (1:21798) is 250×250 pinned top-right, card text pinned bottom-left.
  return (
    <div
      className="flex items-center self-stretch overflow-hidden"
      style={{ padding: 4 }}
    >
      <div
        className="relative overflow-hidden shrink-0"
        style={{
          width: 250,
          alignSelf: "stretch",
          background: "#1b1a1a",
          borderRadius: 16,
        }}
      >
        <div
          className="absolute"
          style={{ right: 0, top: 0, width: 250, height: 250 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/nav-preview-advance-ui.png"
            alt=""
            width={250}
            height={250}
            className="pointer-events-none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              maxWidth: "none",
            }}
          />
        </div>
        <div
          className="absolute flex flex-col items-start text-white"
          style={{ left: 16, bottom: 16, width: 218, gap: 12 }}
        >
          <p
            className="font-urbanist font-semibold"
            style={{ fontSize: 16, lineHeight: "normal" }}
          >
            Advance UI Customization
          </p>
          <p
            className="font-urbanist"
            style={{ fontSize: 12, lineHeight: "normal", opacity: 0.52 }}
          >
            Personalize your collaboration experience
          </p>
          <div className="flex items-center" style={{ gap: 8, marginTop: 4 }}>
            <PromoCardSecondary href="/customization">Learn More</PromoCardSecondary>
            <PromoCardPrimary href="https://docs.velt.dev/" external>
              View Docs
            </PromoCardPrimary>
          </div>
        </div>
      </div>
    </div>
  );
}

function PromoCardPrimary({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const Tag = external ? "a" : Link;
  const props = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  return (
    <Tag
      href={href}
      {...props}
      className="inline-flex items-center justify-center font-urbanist font-semibold whitespace-nowrap"
      style={{
        height: 28,
        padding: "0 12px",
        borderRadius: 6,
        background: "#625df5",
        color: "#fff",
        fontSize: 12,
        letterSpacing: "-0.36px",
        textDecoration: "none",
      }}
    >
      {children}
    </Tag>
  );
}

function PromoCardSecondary({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center font-urbanist font-semibold whitespace-nowrap"
      style={{
        height: 28,
        padding: "0 12px",
        borderRadius: 6,
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.32)",
        color: "#fff",
        fontSize: 12,
        letterSpacing: "-0.36px",
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  );
}

// ---------- Mobile drawer ----------
//
// Full-screen overlay below lg. Surfaces all top-level links with each
// dropdown flattened into an inline accordion (single column, all sections
// stacked vertically). Closes on link click, escape, or viewport >= lg.

const dropdownColumnsByDropdown: Record<DropdownId, DropdownColumn[]> = {
  product: productColumns,
  useCases: useCasesColumns,
  enterprise: enterpriseColumns,
  resources: resourcesColumns,
};

function MobileNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<DropdownId | null>(null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0b",
        zIndex: 60,
        pointerEvents: open ? "auto" : "none",
        opacity: open ? 1 : 0,
        transition: "opacity 200ms ease",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Sticky header — logo + close. Matches mobile bar height so it
          feels like the same surface zooming out. */}
      <div
        className="sticky top-0 flex items-center justify-between px-6 py-3"
        style={{ background: "#0a0a0b", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Link href="/" aria-label="Velt home" className="flex items-center gap-2" onClick={onClose}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/velt-logo.svg" alt="Velt" width={24} height={24} />
          <span
            className="font-urbanist font-bold text-white"
            style={{ fontSize: 14, lineHeight: 1.2 }}
          >
            Velt
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex items-center justify-center"
          style={{ width: 40, height: 40, background: "transparent", border: 0, cursor: "pointer" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6l-12 12"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col px-6 py-4 gap-1">
        {topLinks.map((link) => {
          if (!("dropdown" in link)) {
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="flex items-center font-urbanist font-semibold text-white"
                style={{ fontSize: 18, padding: "14px 4px", letterSpacing: "-0.03em" }}
              >
                {link.label}
              </Link>
            );
          }
          const isExpanded = expanded === link.dropdown;
          return (
            <div key={link.label} className="flex flex-col">
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : link.dropdown)}
                aria-expanded={isExpanded}
                className="flex items-center justify-between font-urbanist font-semibold text-white w-full"
                style={{
                  fontSize: 18,
                  padding: "14px 4px",
                  letterSpacing: "-0.03em",
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span>{link.label}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 180ms ease",
                  }}
                >
                  <path d="M6 9l6 6l6 -6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              {isExpanded && (
                <div className="flex flex-col pl-2 pb-3 gap-3">
                  {dropdownColumnsByDropdown[link.dropdown].map((col, ci) => (
                    <Fragment key={ci}>
                      {col.sections.map((section, si) => (
                        <div key={si} className="flex flex-col gap-1">
                          {section.heading ? (
                            <p
                              className="font-mono uppercase"
                              style={{
                                fontSize: 10,
                                color: "rgba(255,255,255,0.4)",
                                letterSpacing: "0.06em",
                                margin: "8px 4px 4px",
                                fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
                              }}
                            >
                              {section.heading}
                            </p>
                          ) : null}
                          {section.items.map((item) => (
                            <DrawerLink key={item.label} item={item} onClose={onClose} />
                          ))}
                        </div>
                      ))}
                      {col.footer ? (
                        <Link
                          key={`footer-${ci}`}
                          href={col.footer.href}
                          onClick={onClose}
                          className="flex items-center font-mono"
                          style={{
                            fontSize: 11,
                            padding: "10px 4px",
                            color: "rgba(255,255,255,0.5)",
                            letterSpacing: "0.06em",
                            fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
                            textTransform: "uppercase",
                          }}
                        >
                          {col.footer.label} →
                        </Link>
                      ) : null}
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer — utility links + primary CTA pinned at the end of the
          scrollable surface (not fixed, so it doesn't cover content on
          very short viewports). */}
      <div
        className="flex flex-col gap-3 px-6 py-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 16 }}
      >
        <div className="flex items-center gap-4">
          <a
            href="https://console.velt.dev/"
            target="_blank"
            rel="noopener"
            onClick={onClose}
            className="font-urbanist font-medium text-white/80"
            style={{ fontSize: 15 }}
          >
            Sign In
          </a>
          <a
            href="https://docs.velt.dev/"
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="font-urbanist font-medium text-white/80"
            style={{ fontSize: 15 }}
          >
            Read Docs
          </a>
        </div>
        <Link
          href="/book-demo"
          onClick={onClose}
          className="flex items-center justify-center rounded-lg font-urbanist font-bold text-white"
          style={{
            padding: "14px 16px",
            background: "#625df5",
            fontSize: 16,
            letterSpacing: "-0.03em",
            textDecoration: "none",
          }}
        >
          Book Demo
        </Link>
      </div>
    </div>
  );
}

function DrawerLink({ item, onClose }: { item: DropdownItem; onClose: () => void }) {
  const isExternal = item.href?.startsWith("http") ?? false;
  const Tag = isExternal ? "a" : Link;
  const tagProps = isExternal ? { target: "_blank" as const, rel: "noopener" } : {};
  return (
    <Tag
      href={item.href}
      {...tagProps}
      onClick={onClose}
      className="flex items-center gap-3 font-urbanist font-medium text-white"
      style={{ padding: "10px 4px", fontSize: 15 }}
    >
      {item.iconSrc ? (
        <span className="shrink-0 flex items-center justify-center" style={{ width: 20, height: 20 }}>
          <LibraryIcon src={item.iconSrc} />
        </span>
      ) : item.icon ? (
        <span
          className="shrink-0 flex items-center justify-center"
          style={{ width: 20, height: 20, color: item.tint ?? "#fff" }}
        >
          {item.icon}
        </span>
      ) : null}
      <span>{item.label}</span>
    </Tag>
  );
}

