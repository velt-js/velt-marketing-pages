"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import "./Nav.css";

type NavSubEntry = {
  label: string;
  href: string;
};

type NavEntry = {
  label: string;
  href: string;
  badge?: string;
  /** Opens in a new tab with rel="noopener" (used for off-site links). */
  external?: boolean;
  /** Folded features rendered as small anchored sub-links under the parent. */
  children?: NavSubEntry[];
  /** Monochrome Tabler glyph rendered before the label (UI chrome). */
  icon?: ReactNode;
  /** Brand logo path rendered before the label (native color, e.g. libraries). */
  iconSrc?: string;
};

/** Console / docs destinations reused across the bar and the drawer. */
const CONSOLE_URL = "https://console.velt.dev/";
const DOCS_URL = "https://velt.dev/docs/";

/** Base path for bundled brand logos used by library nav entries. */
const NAV_ICON_BASE = "/images/home/nav-icons";

/**
 * Monochrome Tabler glyph wrapper. Strokes follow `currentColor` so the icon
 * inherits the muted nav-icon tone set in CSS (no per-item color tints — the
 * design spec reserves color for collaboration UI, not page chrome).
 * @param {{ children: ReactNode }} props The inner <path>/<shape> elements.
 * @returns {JSX.Element} The sized SVG wrapper.
 */
function TablerIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** Tabler icon strokes (MIT), keyed by usage. viewBox 0 0 24 24. */
const NAV_ICONS = {
  comments: (
    <TablerIcon>
      <path d="M8 9h8" />
      <path d="M8 13h6" />
      <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3" />
    </TablerIcon>
  ),
  checks: (
    <TablerIcon>
      <path d="M7 12l5 5l10 -10" />
      <path d="M2 12l5 5m5 -5l5 -5" />
    </TablerIcon>
  ),
  robot: (
    <TablerIcon>
      <path d="M6 6a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -4" />
      <path d="M12 2v2" />
      <path d="M9 12v9" />
      <path d="M15 12v9" />
      <path d="M5 16l4 -2" />
      <path d="M15 14l4 2" />
      <path d="M9 18h6" />
      <path d="M10 8v.01" />
      <path d="M14 8v.01" />
    </TablerIcon>
  ),
  bulb: (
    <TablerIcon>
      <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
      <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <path d="M9.7 17l4.6 0" />
    </TablerIcon>
  ),
  list: (
    <TablerIcon>
      <path d="M13 5h8" />
      <path d="M13 9h5" />
      <path d="M13 15h8" />
      <path d="M13 19h5" />
      <path d="M3 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M3 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
    </TablerIcon>
  ),
  brain: (
    <TablerIcon>
      <path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" />
      <path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" />
      <path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" />
      <path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" />
      <path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" />
      <path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10" />
    </TablerIcon>
  ),
  bell: (
    <TablerIcon>
      <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </TablerIcon>
  ),
  usersGroup: (
    <TablerIcon>
      <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
      <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M17 10h2a2 2 0 0 1 2 2v1" />
      <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
    </TablerIcon>
  ),
  edit: (
    <TablerIcon>
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" />
      <path d="M16 5l3 3" />
    </TablerIcon>
  ),
  video: (
    <TablerIcon>
      <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4" />
      <path d="M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8" />
    </TablerIcon>
  ),
  headphones: (
    <TablerIcon>
      <path d="M4 15a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2l0 -3" />
      <path d="M15 15a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2l0 -3" />
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
    </TablerIcon>
  ),
  server: (
    <TablerIcon>
      <path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3" />
      <path d="M3 15a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -2" />
      <path d="M7 8l0 .01" />
      <path d="M7 16l0 .01" />
    </TablerIcon>
  ),
  dashboard: (
    <TablerIcon>
      <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
      <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
      <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
      <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
    </TablerIcon>
  ),
  code: (
    <TablerIcon>
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </TablerIcon>
  ),
  cloud: (
    <TablerIcon>
      <path d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878" />
    </TablerIcon>
  ),
  plug: (
    <TablerIcon>
      <path d="M9.785 6l8.215 8.215l-2.054 2.054a5.81 5.81 0 1 1 -8.215 -8.215l2.054 -2.054" />
      <path d="M4 20l3.5 -3.5" />
      <path d="M15 4l-3.5 3.5" />
      <path d="M20 9l-3.5 3.5" />
    </TablerIcon>
  ),
  trendingUp: (
    <TablerIcon>
      <path d="M3 17l6 -6l4 4l8 -8" />
      <path d="M14 7l7 0l0 7" />
    </TablerIcon>
  ),
  coin: (
    <TablerIcon>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" />
      <path d="M12 7v10" />
    </TablerIcon>
  ),
  settings: (
    <TablerIcon>
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" />
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </TablerIcon>
  ),
  sparkles: (
    <TablerIcon>
      <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" />
    </TablerIcon>
  ),
  shieldCheck: (
    <TablerIcon>
      <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
      <path d="M15 19l2 2l4 -4" />
    </TablerIcon>
  ),
  shield: (
    <TablerIcon>
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
    </TablerIcon>
  ),
  scale: (
    <TablerIcon>
      <path d="M7 20l10 0" />
      <path d="M6 6l6 -1l6 1" />
      <path d="M12 3l0 17" />
      <path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
      <path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" />
    </TablerIcon>
  ),
  movie: (
    <TablerIcon>
      <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
      <path d="M8 4l0 16" />
      <path d="M16 4l0 16" />
      <path d="M4 8l4 0" />
      <path d="M4 16l4 0" />
      <path d="M4 12l16 0" />
      <path d="M16 8l4 0" />
      <path d="M16 16l4 0" />
    </TablerIcon>
  ),
  forms: (
    <TablerIcon>
      <path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3" />
      <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3" />
      <path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7" />
      <path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1" />
      <path d="M17 12h.01" />
      <path d="M13 12h.01" />
    </TablerIcon>
  ),
  chartBar: (
    <TablerIcon>
      <path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6" />
      <path d="M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10" />
      <path d="M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14" />
      <path d="M4 20h14" />
    </TablerIcon>
  ),
  checklist: (
    <TablerIcon>
      <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
      <path d="M14 19l2 2l4 -4" />
      <path d="M9 8h4" />
      <path d="M9 12h2" />
    </TablerIcon>
  ),
  table: (
    <TablerIcon>
      <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
      <path d="M3 10h18" />
      <path d="M10 3v18" />
    </TablerIcon>
  ),
  refresh: (
    <TablerIcon>
      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </TablerIcon>
  ),
  apps: (
    <TablerIcon>
      <path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M14 7l6 0" />
      <path d="M17 4l0 6" />
    </TablerIcon>
  ),
  book: (
    <TablerIcon>
      <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
      <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
      <path d="M3 6l0 13" />
      <path d="M12 6l0 13" />
      <path d="M21 6l0 13" />
    </TablerIcon>
  ),
  grid: (
    <TablerIcon>
      <path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
    </TablerIcon>
  ),
  rocket: (
    <TablerIcon>
      <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
      <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
      <path d="M14 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </TablerIcon>
  ),
  transfer: (
    <TablerIcon>
      <path d="M20 10h-16l5.5 -6" />
      <path d="M4 14h16l-5.5 6" />
    </TablerIcon>
  ),
} as const;

type NavGroup = {
  label: string;
  columns: { label: string; items: NavEntry[] }[];
  wide?: boolean;
};

/** Product links — primitives column. */
const PRODUCT_PRIMITIVES: NavEntry[] = [
  { label: "Comments", href: "/comments", icon: NAV_ICONS.comments },
  { label: "Approval flows", href: "/approval-flows", badge: "Beta", icon: NAV_ICONS.checks },
  { label: "Review agents", href: "/review-agents", icon: NAV_ICONS.robot },
  { label: "Suggestions", href: "/suggestions", badge: "Beta", icon: NAV_ICONS.bulb },
  { label: "Audit trail", href: "/audit-trail", icon: NAV_ICONS.list },
  { label: "Memory", href: "/memory", badge: "Beta", icon: NAV_ICONS.brain },
  { label: "Notifications", href: "/notifications", icon: NAV_ICONS.bell },
];

/** Product links — collaboration column. Folded features render as anchored sub-links. */
const PRODUCT_COLLABORATION: NavEntry[] = [
  {
    label: "Presence",
    href: "/presence",
    icon: NAV_ICONS.usersGroup,
    children: [
      { label: "Live cursors", href: "/presence#cursors" },
      { label: "Live selection", href: "/presence#selection" },
      { label: "Follow mode", href: "/presence#follow" },
    ],
  },
  {
    label: "Multiplayer editing",
    href: "/multiplayer-editing",
    icon: NAV_ICONS.edit,
    children: [
      { label: "CRDT", href: "/multiplayer-editing#co-editing" },
      { label: "Single editor mode", href: "/multiplayer-editing#single-editor" },
      { label: "Live state sync", href: "/multiplayer-editing#state-sync" },
    ],
  },
  {
    label: "Recording",
    href: "/recording",
    icon: NAV_ICONS.video,
    children: [{ label: "Video editor", href: "/recording#editor" }],
  },
  { label: "Huddle", href: "/huddle", icon: NAV_ICONS.headphones },
];

/** Product links — platform column. */
const PRODUCT_PLATFORM: NavEntry[] = [
  { label: "Self-hosting", href: "/self-hosting", icon: NAV_ICONS.server },
  { label: "Admin console", href: "/platform", icon: NAV_ICONS.dashboard },
  { label: "Dev tools", href: "/devtools", icon: NAV_ICONS.code },
  { label: "Webhooks & API", href: "/webhooks-and-api", icon: NAV_ICONS.cloud },
  { label: "Integrations", href: "/integrations", icon: NAV_ICONS.plug },
];

/** Solutions links — by industry. */
const SOLUTIONS: NavEntry[] = [
  { label: "Sales enablement", href: "/for/sales-enablement", icon: NAV_ICONS.trendingUp },
  { label: "Fintech & FP&A", href: "/for/fintech", icon: NAV_ICONS.coin },
  { label: "Operations", href: "/for/operations", icon: NAV_ICONS.settings },
  { label: "AI-native SaaS", href: "/for/ai-native-saas", icon: NAV_ICONS.sparkles },
  { label: "Compliance", href: "/for/compliance", icon: NAV_ICONS.shieldCheck },
  { label: "Legal", href: "/for/legal", icon: NAV_ICONS.scale },
];

/** Resources links — use cases column. */
const RESOURCES_USE_CASES: NavEntry[] = [
  { label: "Video editor", href: "/use-case/video-editor", icon: NAV_ICONS.movie },
  { label: "Form builder", href: "/use-case/form-builder", icon: NAV_ICONS.forms },
  { label: "Analytics", href: "/use-case/analytics", icon: NAV_ICONS.chartBar },
  { label: "Task manager", href: "/use-case/task-manager", icon: NAV_ICONS.checklist },
  { label: "Sheets", href: "/use-case/sheets", icon: NAV_ICONS.table },
  { label: "Session replay", href: "/use-case/session-replay-tool", icon: NAV_ICONS.refresh },
  { label: "All use cases", href: "/use-case", icon: NAV_ICONS.apps },
];

/** Resources links — libraries column. Brand logos render at native color. */
const RESOURCES_LIBRARIES: NavEntry[] = [
  { label: "Lexical", href: "/libraries/lexical", iconSrc: `${NAV_ICON_BASE}/lexical.svg` },
  { label: "Tiptap", href: "/libraries/tiptap", iconSrc: `${NAV_ICON_BASE}/tiptap.svg` },
  { label: "YJS", href: "/libraries/yjs", iconSrc: `${NAV_ICON_BASE}/yjs.svg` },
  { label: "BlockNote", href: "/libraries/blocknote", iconSrc: `${NAV_ICON_BASE}/blocknote.svg` },
  { label: "CodeMirror", href: "/libraries/codemirror", iconSrc: `${NAV_ICON_BASE}/codemirror.svg` },
  { label: "React Flow", href: "/libraries/react-flow", iconSrc: `${NAV_ICON_BASE}/reactflow.svg` },
  { label: "All libraries", href: "/libraries", icon: NAV_ICONS.book },
];

/** Resources links — more column. */
const RESOURCES_MORE: NavEntry[] = [
  { label: "Examples", href: "https://samples.velt.dev/", icon: NAV_ICONS.sparkles, external: true },
  { label: "Customization", href: "/customization", icon: NAV_ICONS.settings },
  { label: "Compare", href: "/comparison", icon: NAV_ICONS.grid },
  { label: "Customers", href: "/customers", icon: NAV_ICONS.usersGroup },
  { label: "Blog", href: "/blog", icon: NAV_ICONS.book },
  { label: "Enterprise", href: "/enterprise", icon: NAV_ICONS.shield },
  { label: "Launch kit", href: "/launch-kit", icon: NAV_ICONS.rocket },
  { label: "Migrate from Liveblocks", href: "/migrate/liveblocks", icon: NAV_ICONS.transfer },
  { label: "Migrate from Cord", href: "/migrate/cord", icon: NAV_ICONS.transfer },
];

/** Inline (single) nav links. */
const INLINE_LINKS: NavEntry[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: DOCS_URL, external: true },
];

/** Grouped dropdowns, shared by the desktop bar and the mobile drawer. */
const NAV_GROUPS: NavGroup[] = [
  {
    label: "Products",
    wide: true,
    columns: [
      { label: "Primitives", items: PRODUCT_PRIMITIVES },
      { label: "Collaboration", items: PRODUCT_COLLABORATION },
      { label: "Platform", items: PRODUCT_PLATFORM },
    ],
  },
  {
    label: "Solutions",
    columns: [{ label: "By industry", items: SOLUTIONS }],
  },
  {
    label: "Resources",
    wide: true,
    columns: [
      { label: "Use cases", items: RESOURCES_USE_CASES },
      { label: "Libraries", items: RESOURCES_LIBRARIES },
      { label: "More", items: RESOURCES_MORE },
    ],
  },
];

const MOBILE_DRAWER_ID = "nav-mobile-drawer";

/**
 * Renders a single nav entry link, optionally with a "Beta" style badge and a
 * nested list of folded-feature sub-links rendered as small secondary anchors.
 * @param entry The link data.
 * @param className The anchor class name.
 * @param subClassName Class name for any folded-feature sub-links.
 * @param onClick Optional click handler (used to close the mobile drawer).
 * @returns The anchor element, wrapped with its sub-links when present.
 */
function NavEntryLink({
  entry,
  className,
  subClassName,
  onClick,
}: {
  entry: NavEntry;
  className: string;
  subClassName: string;
  onClick?: () => void;
}) {
  const link = (
    <a
      href={entry.href}
      className={className}
      role="menuitem"
      onClick={onClick}
      target={entry.external ? "_blank" : undefined}
      rel={entry.external ? "noopener" : undefined}
    >
      {entry.iconSrc ? (
        <span className="nav-ico" aria-hidden="true">
          <Image
            src={entry.iconSrc}
            alt=""
            className="nav-ico-logo"
            width={16}
            height={16}
            unoptimized
          />
        </span>
      ) : entry.icon ? (
        <span className="nav-ico" aria-hidden="true">
          {entry.icon}
        </span>
      ) : null}
      {entry.label}
      {entry.badge ? <span className="nav-badge">{entry.badge}</span> : null}
    </a>
  );

  const children = entry.children;
  if (!children?.length) {
    return link;
  }

  return (
    <div className="nav-entry-group">
      {link}
      <div className="nav-sublinks">
        {children.map((child) => (
          <a
            key={child.href + child.label}
            href={child.href}
            className={subClassName}
            role="menuitem"
            onClick={onClick}
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/**
 * Site navigation header with a desktop bar and a mobile slide-in drawer.
 * @returns The navigation header.
 */
/** Scroll distance (px) past which the nav gains its blurred state. */
const SCROLL_THRESHOLD = 8;

export default function Nav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /** Closes the mobile drawer. */
  const closeDrawer = useCallback(() => {
    try {
      setIsDrawerOpen(false);
    } catch {
      // no-op: state setter is always safe, guard satisfies strict error policy
    }
  }, []);

  /** Toggles the mobile drawer open/closed. */
  const toggleDrawer = useCallback(() => {
    try {
      setIsDrawerOpen((open) => !open);
    } catch {
      // no-op
    }
  }, []);

  useEffect(() => {
    try {
      if (!isDrawerOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event?.key === "Escape") {
          closeDrawer();
        }
      };

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        try {
          document.body.style.overflow = previousOverflow;
          window.removeEventListener("keydown", handleKeyDown);
        } catch {
          // no-op
        }
      };
    } catch {
      return undefined;
    }
  }, [isDrawerOpen, closeDrawer]);

  useEffect(() => {
    try {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
      };

      // Sync immediately in case the page loads already scrolled.
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        try {
          window.removeEventListener("scroll", handleScroll);
        } catch {
          // no-op
        }
      };
    } catch {
      return undefined;
    }
  }, []);

  return (
    <header className={isScrolled ? "nav-header is-scrolled" : "nav-header"}>
      <div className="nav-inner">
        <a href="/" className="nav-logo" aria-label="Velt home">
          <Image
            src="/velt-logo.svg"
            alt="Velt"
            className="nav-logo-img"
            width={59}
            height={22}
            unoptimized
          />
        </a>

        <nav className="nav-links">
          {NAV_GROUPS.map((group) => (
            <div className="nav-item" key={group.label}>
              <button type="button" className="nav-link hl nav-trigger" aria-haspopup="true">
                {group.label}
                <span className="nav-caret" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6l6 -6" /></svg>
                </span>
              </button>
              <div className={group.wide ? "nav-menu nav-menu-wide" : "nav-menu"} role="menu">
                {group.columns.map((column) => (
                  <div className="nav-menu-col" key={column.label}>
                    <p className="nav-menu-label">{column.label}</p>
                    {column.items.map((entry) => (
                      <NavEntryLink
                        key={entry.href + entry.label}
                        entry={entry}
                        className="nav-menu-link"
                        subClassName="nav-menu-sublink"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {INLINE_LINKS.map((entry) => (
            <a
              href={entry.href}
              className="nav-link hl"
              key={entry.label + entry.href}
              target={entry.external ? "_blank" : undefined}
              rel={entry.external ? "noopener" : undefined}
            >
              {entry.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <a href={CONSOLE_URL} target="_blank" rel="noopener" className="nav-signin houtline">Sign in</a>
          <a href={CONSOLE_URL} target="_blank" rel="noopener" className="nav-cta hdark">Get Free API Key</a>
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={isDrawerOpen}
          aria-controls={MOBILE_DRAWER_ID}
          onClick={toggleDrawer}
        >
          <span className={isDrawerOpen ? "nav-burger-bars is-open" : "nav-burger-bars"} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        className={isDrawerOpen ? "nav-backdrop is-open" : "nav-backdrop"}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div
        id={MOBILE_DRAWER_ID}
        className={isDrawerOpen ? "nav-drawer is-open" : "nav-drawer"}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="nav-drawer-scroll">
          {NAV_GROUPS.map((group) => (
            <div className="nav-drawer-group" key={group.label}>
              <p className="nav-drawer-group-title">{group.label}</p>
              {group.columns.map((column) => (
                <div className="nav-drawer-col" key={column.label}>
                  <p className="nav-drawer-col-label">{column.label}</p>
                  {column.items.map((entry) => (
                    <NavEntryLink
                      key={entry.href + entry.label}
                      entry={entry}
                      className="nav-drawer-link"
                      subClassName="nav-drawer-sublink"
                      onClick={closeDrawer}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}

          <div className="nav-drawer-group">
            <p className="nav-drawer-group-title">More</p>
            {INLINE_LINKS.map((entry) => (
              <a
                href={entry.href}
                className="nav-drawer-link"
                key={entry.label + entry.href}
                onClick={closeDrawer}
                target={entry.external ? "_blank" : undefined}
                rel={entry.external ? "noopener" : undefined}
              >
                {entry.label}
              </a>
            ))}
          </div>

          <div className="nav-drawer-actions">
            <a href={CONSOLE_URL} target="_blank" rel="noopener" className="nav-signin houtline" onClick={closeDrawer}>Sign in</a>
            <a href={CONSOLE_URL} target="_blank" rel="noopener" className="nav-cta hdark" onClick={closeDrawer}>Get Free API Key</a>
          </div>
        </div>
      </div>
    </header>
  );
}
