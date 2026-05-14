// 10 use-case tiles for the "Find your Use Case" grid on /use-case.
// Order matches Figma 178:64310 (left→right, top→bottom across the
// 2-column × 5-row layout). Titles match velt.dev/use-case.

import type { UseCaseCardProps } from "./UseCaseCard";

export const USE_CASE_CARDS: UseCaseCardProps[] = [
  {
    title: "Video Editor",
    href: "/use-case/video-editor",
    media: { kind: "image", src: "/images/use-case/cards/video-editor.png", alt: "" },
  },
  {
    title: "Form Builder",
    href: "/use-case/form-builder",
    media: { kind: "image", src: "/images/use-case/cards/form-builder.png", alt: "" },
  },
  {
    title: "Analytics",
    href: "/use-case/analytics",
    media: { kind: "image", src: "/images/use-case/cards/analytics.png", alt: "" },
  },
  {
    title: "Task Manager",
    href: "/use-case/task-manager",
    media: { kind: "image", src: "/images/use-case/cards/task-manager.png", alt: "" },
  },
  {
    title: "Sheets",
    href: "/use-case/sheets",
    media: { kind: "image", src: "/images/use-case/cards/sheets.png", alt: "" },
  },
  {
    title: "Presentation",
    href: "/use-case/presentation",
    media: { kind: "image", src: "/images/use-case/cards/presentation.png", alt: "" },
  },
  {
    title: "Documentation",
    href: "/use-case/docs",
    media: { kind: "image", src: "/images/use-case/cards/documentation.png", alt: "" },
  },
  {
    title: "Code IDE",
    href: "/use-case/coding-tool",
    media: { kind: "image", src: "/images/use-case/cards/code-ide.png", alt: "" },
  },
  {
    title: "No-code Tool",
    href: "/use-case/no-code-tool",
    media: { kind: "image", src: "/images/use-case/cards/no-code-tool.png", alt: "" },
  },
  {
    title: "Session Replay",
    href: "/use-case/session-replay-tool",
    media: { kind: "image", src: "/images/use-case/cards/session-replay.png", alt: "" },
  },
];
