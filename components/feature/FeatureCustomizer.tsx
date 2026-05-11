// "Fully Customizable UI" — Figma 175:29289.
//
// Light-mode section: heading + dual CTAs above a 3-card row:
//   • Left sidebar (230 wide, white card, light-blue border): PLAY > Playground
//     (purple highlighted) and LIVE EXAMPLES > WindowsXP, Figma. Footer at the
//     bottom: View All Examples (external-link icon).
//   • Middle (flex-1, 480 tall, bg #f7f7f7, rounded-24): an empty light-gray
//     placeholder rectangle. Per Figma this is intentionally blank — the live
//     preview iframe goes here in production.
//   • Right control panel (230 wide, white card, same border): four control
//     groups — COLOR (4 swatches in a pill, dark blue selected), CUSTOM DATA
//     ("/comments" text in a pill), LOGIN BUTTON (Show / Hide toggle, Hide
//     active), VARIANTS (Default / Bubble toggle, Default active).

"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Book2Icon,
  BrushIcon,
  BrandWindowsIcon,
  BrandFigmaIcon,
  ExternalLinkIcon,
} from "./uis/icons";

type CtaLink = { label?: string; href?: string; newTab?: boolean };

export type FeatureCustomizerExample = {
  label: string;
  iconImageSrc?: string;
  previewImageSrc?: string;
};

export type FeatureCustomizerProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: CtaLink;
  primaryCta?: CtaLink;
  playground?: FeatureCustomizerExample;
  examples?: FeatureCustomizerExample[];
  controls?: {
    colors?: string[];
    onTheEdgeValue?: string;
    loggedInToggleLabel?: string;
    parentDefaultLabel?: string;
  };
};

const DEFAULT_COLORS = ["#fcca44", "#35a0f3", "#3f5bea", "#9e11b1"];

export function FeatureCustomizer({
  heading,
  subheading,
  viewDocsCta,
  primaryCta,
  playground = { label: "Playground" },
  examples,
  controls,
}: FeatureCustomizerProps) {
  const liveExamples: FeatureCustomizerExample[] =
    examples && examples.length > 0
      ? examples
      : [{ label: "WindowsXP" }, { label: "Figma" }];

  const colors = controls?.colors && controls.colors.length > 0 ? controls.colors : DEFAULT_COLORS;
  const [activeTab, setActiveTab] = useState<"playground" | string>("playground");
  const [activeColor, setActiveColor] = useState(colors[2] ?? colors[0]);
  const [showCustomTag, setShowCustomTag] = useState<"show" | "hide">("hide");
  const [variant, setVariant] = useState<"default" | "bubble">("default");

  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg py-20 lg:py-[100px] px-6 lg:px-20"
      style={{ gap: 40 }}
    >
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 32 }}>
        <div
          className="flex flex-col items-center text-center"
          style={{ gap: 12, maxWidth: 691 }}
        >
          <h2
            className="font-urbanist font-bold"
            style={{
              color: "#111",
              fontSize: "clamp(28px, 4.2vw, 52px)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {heading}
          </h2>
          {subheading ? (
            <p
              className="font-urbanist"
              style={{
                color: "#111",
                fontSize: 20,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {subheading}
            </p>
          ) : null}
        </div>
        {(viewDocsCta || primaryCta) && (
          <div className="flex items-start" style={{ gap: 12 }}>
            {viewDocsCta?.label && viewDocsCta.href ? (
              <CustCta variant="secondary" cta={viewDocsCta} />
            ) : null}
            {primaryCta?.label && primaryCta.href ? (
              <CustCta variant="primary" cta={primaryCta} />
            ) : null}
          </div>
        )}
      </div>

      {/* 3-column body */}
      <div
        className="flex flex-col lg:flex-row items-stretch w-full max-w-[1280px]"
        style={{ gap: 12 }}
      >
        {/* Left sidebar */}
        <aside
          className="flex flex-col justify-between w-full lg:w-[230px]"
          style={{
            background: "#fff",
            border: "1px solid rgba(24,42,133,0.12)",
            borderRadius: 24,
            padding: 12,
            flexShrink: 0,
          }}
        >
          <div className="flex flex-col" style={{ gap: 16, width: "100%" }}>
            {/* PLAY group */}
            <div className="flex flex-col" style={{ gap: 2 }}>
              <SidebarHeader>Play</SidebarHeader>
              <SidebarItem
                active={activeTab === "playground"}
                label={playground.label}
                icon={<BrushIcon size={20} stroke={activeTab === "playground" ? "#fff" : "#111"} />}
                onClick={() => setActiveTab("playground")}
              />
            </div>

            {/* LIVE EXAMPLES group */}
            <div className="flex flex-col" style={{ gap: 2 }}>
              <SidebarHeader>Live Examples</SidebarHeader>
              {liveExamples.map((ex, i) => {
                const isActive = activeTab === ex.label;
                return (
                  <SidebarItem
                    key={`${ex.label}-${i}`}
                    active={isActive}
                    label={ex.label}
                    icon={renderExampleIcon(ex.label, isActive)}
                    onClick={() => setActiveTab(ex.label)}
                  />
                );
              })}
            </div>
          </div>

          {/* Footer: View All Examples */}
          <a
            href="https://velt.dev/examples"
            target="_blank"
            rel="noopener"
            className="flex items-center"
            style={{
              gap: 12,
              padding: 12,
              borderRadius: 8,
              color: "#111",
              fontFamily: "Urbanist, sans-serif",
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            <ExternalLinkIcon size={20} stroke="#111" />
            <span>View All Examples</span>
          </a>
        </aside>

        {/* Middle: preview area */}
        <div
          className="flex-1 flex items-center justify-center relative overflow-hidden"
          style={{
            background: activeTab === "playground" ? "#F7F7F7" : "transparent",
            borderRadius: 24,
            height: 480,
            minWidth: 0,
          }}
        >
          {activeTab === "playground" ? (
            <CommentPreview
              accentColor={activeColor}
              showTag={showCustomTag === "show"}
              variant={variant}
            />
          ) : (
            <iframe
              src={getExampleUrl(activeTab)}
              title={`${activeTab} demo`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: 24,
              }}
              allow="clipboard-read; clipboard-write"
            />
          )}
        </div>

        {/* Right control panel */}
        <aside
          className="flex flex-col w-full lg:w-[230px]"
          style={{
            background: "#fff",
            border: "1px solid rgba(24,42,133,0.12)",
            borderRadius: 24,
            padding: 12,
            gap: 20,
            flexShrink: 0,
          }}
        >
          {/* COLOR */}
          <ControlGroup label="Color">
            <div
              className="flex items-stretch"
              style={{
                gap: 4,
                padding: 6,
                border: "1px solid rgba(17,17,17,0.08)",
                borderRadius: 32,
                width: "100%",
              }}
            >
              {colors.map((c) => {
                const isActive = c === activeColor;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveColor(c)}
                    className="cursor-pointer flex-1"
                    aria-label={`Color ${c}`}
                    aria-pressed={isActive}
                    style={{
                      height: 28,
                      padding: isActive ? 6 : 4,
                      background: isActive ? "#fff" : "transparent",
                      border: isActive ? "1.5px solid #3f5bea" : "none",
                      borderRadius: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        flex: 1,
                        height: "100%",
                        background: c,
                        borderRadius: 13,
                        display: "block",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </ControlGroup>

          {/* CUSTOM TAG */}
          <ControlGroup label="Custom Tag">
            <SegmentedToggle
              options={["show", "hide"] as const}
              labels={["Show", "Hide"]}
              value={showCustomTag}
              onChange={setShowCustomTag}
            />
          </ControlGroup>

          {/* VARIANTS */}
          <ControlGroup label="Variants">
            <SegmentedToggle
              options={["default", "bubble"] as const}
              labels={["Default", "Bubble"]}
              value={variant}
              onChange={setVariant}
            />
          </ControlGroup>
        </aside>
      </div>
    </section>
  );
}

/**
 * Renders an interactive comment card inspired by the Velt comment widget.
 * Reacts to accent color, tag visibility, and variant selections.
 */
function CommentPreview({
  accentColor,
  showTag,
  variant,
}: {
  accentColor: string;
  showTag: boolean;
  variant: "default" | "bubble";
}) {
  try {
    const isBubble = variant === "bubble";
    const avatarSrc = "/images/features/comments/avatar-robert.jpg";
    const pillBg = `color-mix(in srgb, ${accentColor} 12%, #F3F3F3)`;

    return (
      <div className="flex items-start" style={{ gap: 14, zIndex: 1 }}>
        {/* Comment pin */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: `3px solid ${accentColor}`,
            overflow: "hidden",
            flexShrink: 0,
            background: "#E8E8E8",
            boxShadow: `0 2px 12px color-mix(in srgb, ${accentColor} 30%, transparent)`,
            marginTop: 28,
          }}
        >
          <img
            src={avatarSrc}
            alt="Me"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>

        {/* Comment card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: isBubble ? "14px 20px" : 0,
            width: isBubble ? undefined : 380,
            minWidth: isBubble ? 360 : undefined,
            maxWidth: 420,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
            transition: "all 300ms ease",
          }}
        >
        {isBubble ? (
          /* ── Bubble variant ── */
          <div className="flex flex-col" style={{ gap: 10 }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#E8E8E8",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={avatarSrc}
                    alt="Me"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <span
                  className="font-urbanist font-bold"
                  style={{ color: "#111", fontSize: 15 }}
                >
                  Me
                </span>
                <span
                  className="font-urbanist"
                  style={{ color: "rgba(17,17,17,0.35)", fontSize: 13 }}
                >
                  7m
                </span>
              </div>
              <div className="flex items-center" style={{ gap: 8 }}>
                {showTag ? (
                  <span
                    className="font-urbanist"
                    style={{
                      color: accentColor,
                      fontSize: 12,
                      background: pillBg,
                      padding: "3px 10px",
                      borderRadius: 8,
                      fontWeight: 500,
                    }}
                  >
                    #team-design
                  </span>
                ) : null}
                <ThreeDotsHorizontal />
              </div>
            </div>
            <span
              className="font-urbanist"
              style={{ color: "#333", fontSize: 15, lineHeight: 1.5 }}
            >
              Fix the logo
            </span>
          </div>
        ) : (
          /* ── Default variant ── */
          <div className="flex flex-col">
            {/* Toolbar */}
            <div
              className="flex items-center justify-between"
              style={{ padding: "16px 20px 12px" }}
            >
              <div className="flex items-center" style={{ gap: 8 }}>
                {/* Open status pill */}
                <div
                  className="flex items-center"
                  style={{
                    gap: 6,
                    background: pillBg,
                    padding: "6px 14px",
                    borderRadius: 20,
                  }}
                >
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span
                    className="font-urbanist font-semibold"
                    style={{ color: accentColor, fontSize: 14 }}
                  >
                    Open
                  </span>
                  <ChevronDownSmall color={accentColor} />
                </div>
                {/* Tag pill */}
                {showTag ? (
                  <div
                    className="flex items-center"
                    style={{
                      gap: 6,
                      background: pillBg,
                      padding: "6px 14px",
                      borderRadius: 20,
                    }}
                  >
                    <span
                      className="font-urbanist font-medium"
                      style={{ color: accentColor, fontSize: 14 }}
                    >
                      #team-design
                    </span>
                    <ChevronDownSmall color={accentColor} />
                  </div>
                ) : null}
              </div>
              <div className="flex items-center" style={{ gap: 12 }}>
                <ThreeDotsHorizontal />
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="rgba(17,17,17,0.35)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M10 14a5 5 0 0 0 7.07 0l3.07-3.07a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
                  <path d="M14 10a5 5 0 0 0-7.07 0l-3.07 3.07a5 5 0 0 0 7.07 7.07l1.5-1.5" />
                </svg>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(17,17,17,0.06)", margin: "0 20px" }} />

            {/* Content area */}
            <div className="flex flex-col" style={{ padding: "16px 20px 20px", gap: 14 }}>
              {/* Author */}
              <div className="flex items-center" style={{ gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "#E8E8E8",
                    flexShrink: 0,
                    border: `2px solid ${pillBg}`,
                  }}
                >
                  <img
                    src={avatarSrc}
                    alt="Me"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <span
                  className="font-urbanist font-bold"
                  style={{ color: "#111", fontSize: 16 }}
                >
                  Me
                </span>
              </div>

              {/* Message */}
              <span
                className="font-urbanist"
                style={{ color: "#333", fontSize: 15, lineHeight: 1.5 }}
              >
                Fix the logo
              </span>

              {/* File attachment */}
              <div
                className="flex items-center"
                style={{
                  gap: 12,
                  background: "#F5F5F5",
                  borderRadius: 12,
                  padding: "10px 14px",
                }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 40,
                    borderRadius: 6,
                    background: "#fff",
                    border: "1px solid rgba(17,17,17,0.06)",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: "#E74C3C", letterSpacing: "0.02em", fontFamily: "Urbanist, sans-serif" }}>PDF</span>
                </div>
                <div className="flex flex-col" style={{ flex: 1, gap: 2, minWidth: 0 }}>
                  <span
                    className="font-urbanist font-medium"
                    style={{ color: "#111", fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    Ernest Hemmingway.pdf
                  </span>
                  <span
                    className="font-urbanist"
                    style={{ color: "rgba(17,17,17,0.4)", fontSize: 12 }}
                  >
                    12MB
                  </span>
                </div>
                <div className="flex items-center" style={{ gap: 8, flexShrink: 0 }}>
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#E74C3C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    );
  } catch {
    return null;
  }
}

function ThreeDotsHorizontal() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="rgba(17,17,17,0.35)" aria-hidden>
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function ChevronDownSmall({ color = "rgba(17,17,17,0.4)" }: { color?: string }) {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const EXAMPLE_URLS: Record<string, string> = {
  windowsxp: "https://customized-angular-windows-demo.vercel.app/",
  figma: "https://customized-angular-figma-demo.vercel.app/",
};

/**
 * Maps a sidebar example label to its demo URL.
 */
function getExampleUrl(label: string): string {
  try {
    return EXAMPLE_URLS[label.toLowerCase()] ?? `https://velt.dev/examples`;
  } catch {
    return "https://velt.dev/examples";
  }
}

function renderExampleIcon(label: string, isActive: boolean) {
  const stroke = isActive ? "#fff" : "#111";
  if (label.toLowerCase().includes("windows")) return <BrandWindowsIcon size={20} stroke={stroke} />;
  if (label.toLowerCase().includes("figma")) return <BrandFigmaIcon size={20} stroke={stroke} />;
  return <BrushIcon size={20} stroke={stroke} />;
}

function SidebarHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center"
      style={{
        padding: 12,
        opacity: 0.5,
        borderRadius: 8,
      }}
    >
      <span
        style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: 12,
          color: "#111",
          textTransform: "uppercase",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function SidebarItem({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center cursor-pointer"
      style={{
        gap: 12,
        padding: 12,
        borderRadius: 8,
        background: active ? "#625df5" : "transparent",
        color: active ? "#fff" : "#111",
        border: "none",
        width: "100%",
        textAlign: "left",
        transition: "background-color 150ms ease, color 150ms ease",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = "rgba(98,93,245,0.06)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}
    >
      {icon}
      <span
        className="font-urbanist"
        style={{
          fontSize: 16,
          lineHeight: 1.2,
          color: active ? "#fff" : "#111",
        }}
      >
        {label}
      </span>
    </button>
  );
}

function ControlGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col" style={{ gap: 4, width: "100%" }}>
      <div
        className="flex items-center"
        style={{ padding: 8, opacity: 0.5, borderRadius: 8 }}
      >
        <span
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 12,
            color: "#111",
            textTransform: "uppercase",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function SegmentedToggle<T extends string>({
  options,
  labels,
  value,
  onChange,
}: {
  options: readonly [T, T];
  labels: [string, string];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      className="flex items-stretch"
      style={{
        gap: 2,
        padding: 4,
        border: "1px solid rgba(17,17,17,0.08)",
        borderRadius: 32,
        width: "100%",
      }}
    >
      {options.map((opt, i) => {
        const isActive = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="cursor-pointer flex-1"
            style={{
              padding: 8,
              border: "none",
              borderRadius: 32,
              background: isActive ? "#625df5" : "transparent",
              color: isActive ? "#fff" : "rgba(17,17,17,0.4)",
              fontFamily: "Urbanist, sans-serif",
              fontSize: 14,
              lineHeight: 1.2,
            }}
          >
            {labels[i]}
          </button>
        );
      })}
    </div>
  );
}

function CustCta({
  variant,
  cta,
}: {
  variant: "primary" | "secondary";
  cta: CtaLink;
}) {
  const isPrimary = variant === "primary";
  // Figma renders both CTAs at h:44, padding 8/16, rounded-8, gap 4.
  // Width is min:156 so longer labels ("View Customization") don't wrap.
  // mix-blend-exclusion is applied ONLY to the inner text/icon (per Figma),
  // not the whole button — keeps the purple border rendering correctly.
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minWidth: 156,
    height: 44,
    padding: "8px 16px",
    borderRadius: 8,
    fontFamily: '"Urbanist", sans-serif',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 1.2,
    letterSpacing: "-0.03em",
    color: "#fff",
    textDecoration: "none",
    background: isPrimary ? "#615df5" : "transparent",
    border: "2px solid #615df5",
    cursor: "pointer",
    whiteSpace: "nowrap",
  };
  const innerStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    color: "#fff",
    mixBlendMode: isPrimary ? undefined : "exclusion",
  };
  const inner = (
    <span style={innerStyle}>
      {!isPrimary ? <Book2Icon size={18} stroke="#fff" /> : null}
      {cta.label}
    </span>
  );
  const isExternal = !!cta.href && /^(https?:)?\/\//.test(cta.href);
  if (isExternal || cta.newTab) {
    return (
      <a href={cta.href} target="_blank" rel="noopener" style={baseStyle}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={cta.href ?? "#"} style={baseStyle}>
      {inner}
    </Link>
  );
}
