// "Extensive Features" row visual — an in-canvas comment-thread mock with
// skeleton placeholder lines, an Open-status pill chain, a Velt comment
// card ("Chris ... Can we tone this down @Mark"), and Kim/Chris cursor
// name-tags floating below it.
//
// Spec: Figma HqWIZdR6ISJmaG2n4o3gr8 node 263:7978. Built as a React
// component (instead of a flat PNG) per the user's "no flat-image
// sections" rule — the Figma node has a transparent body that relies
// on its parent's white bg, which a screenshot won't reproduce.
//
// Icons are drawn from the Tabler icon set (referenced in the Figma by
// `tabler-icon-*` layer names). Inlined as SVG paths rather than the
// decomposed Figma shape exports, which lose their wrapping transforms
// when extracted.

import type { ReactNode } from "react";

const ASSET_BASE = "/images/migrate/comment";

// ---- Inline Tabler icons -----------------------------------------------

type IconProps = { size?: number; color?: string; strokeWidth?: number };

function TablerClock({ size = 22.816, color = "#625df5", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

function TablerChevronDown({ size = 22, color = "#625df5", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
}

function TablerFlag({ size = 22.816, color = "#999", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
      <line x1="5" y1="5" x2="5" y2="21" />
    </svg>
  );
}

function TablerDots({ size = 22.816, color = "#0a0a0a" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ display: "block" }}
    >
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function TablerAt({ size = 22.816, color = "#0a0a0a", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
    </svg>
  );
}

function TablerMoodSmile({ size = 22.816, color = "#0a0a0a", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="9" y1="10" x2="9.01" y2="10" />
      <line x1="15" y1="10" x2="15.01" y2="10" />
      <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
    </svg>
  );
}

function TablerChecks({ size = 22.816, color = "#999", strokeWidth = 2 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <path d="M7 12l5 5l10 -10" />
      <path d="M2 12l5 5m5 -5l5 -5" />
    </svg>
  );
}

export function FeatureExtensiveVisual() {
  return (
    <div
      className="relative overflow-clip"
      style={{
        width: "100%",
        height: "100%",
        background: "#ffffff",
        border: "1px solid #d9d9d9",
        borderRadius: 24,
      }}
    >
      <SkeletonLines />
      <CommentCard />
      <RightFade />
      <KimCursor />
      <ChrisCursor />
    </div>
  );
}

// ---- Skeleton placeholder lines (top of card) ---------------------------

function SkeletonLines() {
  // The lines extend past the card's left edge (-45.59px) and overflow
  // the right side too — `overflow-clip` on the parent crops them.
  const lineGradient =
    "linear-gradient(90deg, rgb(237, 237, 237) 0%, rgb(247, 247, 247) 100%)";

  return (
    <div
      className="absolute flex flex-col items-start"
      style={{ top: 35, left: -45.59, width: 578.75, gap: 8 }}
    >
      <div
        style={{
          width: 466.97,
          height: 36.564,
          borderRadius: 39.215,
          backgroundImage: lineGradient,
        }}
      />
      <div className="relative" style={{ width: 578.75, height: 36.564 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 39.215,
            backgroundImage: lineGradient,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0.08,
            left: 333.75,
            height: 36.25,
            width: 245,
            background: "rgba(255,208,39,0.24)",
            borderTopRightRadius: 33.43,
            borderBottomRightRadius: 33.43,
          }}
        />
      </div>
      <div
        style={{
          width: 540.097,
          height: 36.564,
          borderRadius: 39.215,
          backgroundImage: lineGradient,
        }}
      />
      <div
        style={{
          width: 466.97,
          height: 36.564,
          borderRadius: 39.215,
          backgroundImage: lineGradient,
        }}
      />
    </div>
  );
}

// ---- Comment card overlay ----------------------------------------------

function CommentCard() {
  return (
    <div
      className="absolute flex flex-col items-start overflow-clip bg-white"
      style={{
        top: 122.5,
        left: 160,
        width: 513.363,
        borderRadius: 17.112,
        filter: "drop-shadow(0px 0px 17.112px rgba(0,0,0,0.08))",
      }}
    >
      <CardHeader />
      <ThreadWrapper />
    </div>
  );
}

function CardHeader() {
  return (
    <div
      className="flex items-center justify-between bg-white w-full"
      style={{
        paddingTop: 22.816,
        paddingBottom: 16.268,
        paddingLeft: 22.816,
        paddingRight: 22.816,
      }}
    >
      <div className="flex items-center" style={{ gap: 11.408 }}>
        <OpenStatusPill />
        <FlagPill />
      </div>
      <div className="flex items-center" style={{ gap: 11.408 }}>
        <RoundButton icon={<TablerDots size={22.816} color="#0a0a0a" />} />
        <RoundButton icon={<TablerAt size={22.816} color="#0a0a0a" strokeWidth={2} />} />
        <RoundButton icon={<TablerMoodSmile size={22.816} color="#0a0a0a" strokeWidth={2} />} />
      </div>
    </div>
  );
}

function OpenStatusPill() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        background: "#f2f2fe",
        borderRadius: 114.081,
        height: 45.632,
        paddingLeft: 11.408,
        paddingRight: 11.408,
        paddingTop: 5.704,
        paddingBottom: 5.704,
        gap: 5.704,
      }}
    >
      <TablerClock size={22.816} color="#625df5" strokeWidth={2} />
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: 17.11,
          lineHeight: "34.224px",
          color: "#625df5",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        Open
      </p>
      <TablerChevronDown size={20} color="#625df5" strokeWidth={2.4} />
    </div>
  );
}

function FlagPill() {
  return (
    <div
      className="flex items-center"
      style={{
        background: "#f5f5f5",
        borderRadius: 114.081,
        height: 45.632,
        paddingLeft: 11.408,
        paddingRight: 11.408,
        paddingTop: 5.704,
        paddingBottom: 5.704,
        gap: 5.704,
      }}
    >
      <TablerFlag size={22.816} color="#999" strokeWidth={2} />
      <TablerChevronDown size={20} color="#999" strokeWidth={2.4} />
    </div>
  );
}

function RoundButton({ icon }: { icon: ReactNode }) {
  return (
    <div
      className="flex items-center justify-center bg-white"
      style={{
        width: 39.928,
        height: 39.928,
        borderRadius: 114.081,
      }}
    >
      {icon}
    </div>
  );
}

function ThreadWrapper() {
  return (
    <div
      className="flex flex-col items-start bg-white w-full"
      style={{ padding: 22.816 }}
    >
      <div className="flex flex-col items-end w-full">
        <ThreadHeader />
        <ThreadComment />
      </div>
    </div>
  );
}

function ThreadHeader() {
  return (
    <div
      className="flex items-start w-full"
      style={{ gap: 17.112 }}
    >
      <div
        className="overflow-clip"
        style={{
          width: 39.928,
          height: 39.928,
          borderRadius: 24,
          background: "#b1b5c3",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_BASE}/avatar-chris.png`}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div className="flex items-center self-stretch" style={{ gap: 11.408 }}>
        <p
          className="font-urbanist font-semibold"
          style={{
            fontSize: 22.82,
            lineHeight: "34.224px",
            letterSpacing: "0.2282px",
            color: "#0a0a0a",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Chris
        </p>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: 17.11,
            lineHeight: "24.242px",
            letterSpacing: "0.1711px",
            color: "#999",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          2w
        </p>
        <div
          className="flex items-center bg-white"
          style={{
            padding: 5.704,
            borderRadius: 114.081,
            gap: 5.704,
          }}
        >
          <TablerChecks size={22.816} color="#b5b5b5" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

function ThreadComment() {
  return (
    <div
      className="flex flex-col items-start w-full"
      style={{ paddingLeft: 57.04, gap: 11.408 }}
    >
      <div
        className="relative flex items-end w-full"
        style={{ gap: 5.704, minHeight: 45.632 }}
      >
        <div
          style={{
            position: "absolute",
            top: 12.83,
            left: 232.44,
            width: 75.578,
            height: 29.946,
            background: "rgba(98,93,245,0.08)",
            borderRadius: 4,
          }}
        />
        <p
          style={{
            flex: "1 0 0",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: 19.96,
            lineHeight: 1.8,
            color: "#525252",
            margin: 0,
            position: "relative",
          }}
        >
          Can we tone this down <span style={{ color: "#625df5" }}>@Mark</span>
        </p>
      </div>
    </div>
  );
}

// ---- Right-side white fade ---------------------------------------------

function RightFade() {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ top: 45, right: -110, width: 55, height: 247 }}
    >
      <div style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
        <div
          style={{
            width: 247,
            height: 55,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 100%)",
          }}
        />
      </div>
    </div>
  );
}

// ---- Floating cursor name-tags -----------------------------------------

function KimCursor() {
  return (
    <div
      className="absolute flex flex-col items-end"
      style={{ top: 313, left: 29 }}
    >
      <div className="flex items-center justify-center">
        <div style={{ transform: "scaleY(-1) rotate(180deg)" }}>
          <div className="relative" style={{ width: 37.5, height: 37.5 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSET_BASE}/cursor-up-blue.svg`}
              alt=""
              style={{
                position: "absolute",
                inset: "-16.21% -13.76% -27.57% -21.32%",
                width: "auto",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ paddingRight: 30 }}>
        <span
          className="font-urbanist font-bold"
          style={{
            display: "inline-block",
            background: "#046ded",
            color: "#fff",
            fontSize: 25.781,
            lineHeight: "39.844px",
            letterSpacing: "0.2578px",
            padding: "4.688px 18.75px",
            borderRadius: 42.188,
            boxShadow: "0px 2.344px 4.688px rgba(0,0,0,0.16)",
          }}
        >
          Kim
        </span>
      </div>
    </div>
  );
}

function ChrisCursor() {
  return (
    <div
      className="absolute flex flex-col items-start"
      style={{ top: 361, left: 399 }}
    >
      <div
        className="relative"
        style={{ width: 35.156, height: 35.156, marginBottom: -4.5 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${ASSET_BASE}/cursor-down-pink.svg`}
          alt=""
          style={{
            position: "absolute",
            inset: "-16.21% -13.75% -27.57% -21.33%",
            width: "auto",
            height: "auto",
            display: "block",
          }}
        />
      </div>
      <div style={{ paddingLeft: 28.125 }}>
        <span
          className="font-urbanist font-bold"
          style={{
            display: "inline-block",
            background: "#ec055a",
            color: "#fff",
            fontSize: 24.17,
            lineHeight: "37.354px",
            letterSpacing: "0.2417px",
            padding: "4.395px 17.578px",
            borderRadius: 39.551,
            boxShadow: "0px 2.197px 4.395px rgba(0,0,0,0.16)",
          }}
        >
          Chris
        </span>
      </div>
    </div>
  );
}
