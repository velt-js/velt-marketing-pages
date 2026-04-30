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
  const [loginState, setLoginState] = useState<"show" | "hide">("hide");
  const [variant, setVariant] = useState<"default" | "bubble">("default");

  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "100px 80px", gap: 40 }}
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
              fontSize: 52,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              margin: 0,
              whiteSpace: "nowrap",
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
        className="flex items-stretch"
        style={{ gap: 12, width: 1280 }}
      >
        {/* Left sidebar */}
        <aside
          className="flex flex-col justify-between"
          style={{
            width: 230,
            background: "#fff",
            border: "1px solid rgba(24,42,133,0.12)",
            borderRadius: 24,
            padding: 12,
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

        {/* Middle: light-gray placeholder */}
        <div
          className="flex-1"
          style={{
            background: "#f7f7f7",
            borderRadius: 24,
            height: 480,
            minWidth: 0,
          }}
          aria-hidden
        />

        {/* Right control panel */}
        <aside
          className="flex flex-col"
          style={{
            width: 230,
            background: "#fff",
            border: "1px solid rgba(24,42,133,0.12)",
            borderRadius: 24,
            padding: 12,
            gap: 20,
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

          {/* CUSTOM DATA */}
          <ControlGroup label="Custom Data">
            <div
              className="flex items-center"
              style={{
                padding: 4,
                border: "1px solid rgba(17,17,17,0.08)",
                borderRadius: 32,
                width: "100%",
              }}
            >
              <div className="flex items-center" style={{ flex: 1, padding: 8 }}>
                <span
                  className="font-urbanist"
                  style={{ color: "#111", fontSize: 14, lineHeight: 1.2 }}
                >
                  {controls?.onTheEdgeValue ?? "/comments"}
                </span>
              </div>
            </div>
          </ControlGroup>

          {/* LOGIN BUTTON */}
          <ControlGroup label="login Button">
            <SegmentedToggle
              options={["show", "hide"] as const}
              labels={["Show", "Hide"]}
              value={loginState}
              onChange={setLoginState}
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
