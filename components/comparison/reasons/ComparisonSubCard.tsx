// One sub-card inside a reason's comparison grid. The Velt variant uses
// a soft-blue background (#f5faff) + purple-blue VELT badge (#5693d0);
// the Competitor variant uses a soft-orange background (#fff6f5) +
// orange COMPETITOR badge (#df7347). Each card has a top media slot
// (rendered through <Media> for image→video swap-readiness), then a
// 24px-bold title and an 18px subtitle.
//
// Default size: 454w × auto, 40px padding, 52 radius, top media 260h.

import type { ReactNode } from "react";

import { Media, type MediaProps } from "../Media";

export type ComparisonSubCardProps = {
  variant: "velt" | "other";
  title: string;
  subtitle?: string;
  /** Top media slot. When omitted, children fill the slot directly
   *  (used for cards that need bespoke layouts in the visual area). */
  media?: MediaProps;
  children?: ReactNode;
  /** Override the default 260px visual-area height. */
  mediaHeight?: number;
};

const VARIANT = {
  velt: {
    bg: "#f5faff",
    badge: "#5693d0",
    label: "VELT",
    showVeltMark: true,
  },
  other: {
    bg: "#fff6f5",
    badge: "#df7347",
    label: "COMPETITOR",
    showVeltMark: false,
  },
} as const;

export function ComparisonSubCard({
  variant,
  title,
  subtitle,
  media,
  children,
  mediaHeight = 260,
}: ComparisonSubCardProps) {
  const v = VARIANT[variant];
  return (
    <div
      className="relative flex flex-col items-start"
      style={{
        width: 454,
        padding: 40,
        gap: 24,
        background: v.bg,
        borderRadius: 52,
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: mediaHeight, background: v.bg, borderRadius: 12 }}
      >
        {media ? <Media {...media} /> : children}
      </div>
      <div className="flex flex-col items-start w-full" style={{ gap: 7 }}>
        <h4
          className="font-urbanist font-bold"
          style={{
            fontSize: 24,
            lineHeight: 1.5,
            color: "#111",
            margin: 0,
          }}
        >
          {title}
        </h4>
        {subtitle ? (
          <p
            className="font-urbanist"
            style={{
              fontSize: 18,
              lineHeight: 1.8,
              letterSpacing: "0.03em",
              color: "#111",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      <span
        aria-hidden
        className="absolute flex items-center font-urbanist font-bold uppercase"
        style={{
          left: 30,
          top: 30,
          gap: 2,
          padding: "6px 8px",
          borderRadius: 32,
          background: v.badge,
          color: "#fff",
          fontSize: 12,
          letterSpacing: "0.05em",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {v.showVeltMark ? (
          <img
            src="/images/comparison/pricing/velt-mark.svg"
            alt=""
            width={18}
            height={18}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        ) : null}
        {v.label}
      </span>
    </div>
  );
}
