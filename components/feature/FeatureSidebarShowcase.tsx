// "Little Big Details" — section heading + sidebar showcase card.
// The card holds a left list of items (active = purple fill) and a right
// detail panel that shows a screenshot. Per-item screenshots can swap the
// detail when supplied; otherwise the section's defaultScreenshot renders.
//
// Figma node 93:11477 (showcase) + 93:11454 (heading group).

"use client";

import { useState } from "react";

export type FeatureSidebarShowcaseItem = {
  label: string;
  /** Optional per-item screenshot. Falls back to the section default. */
  screenshotSrc?: string;
};

export type FeatureSidebarShowcaseProps = {
  /** Optional small purple icon above the heading. */
  eyebrowIconSrc?: string;
  heading: string;
  subheading?: string;
  items: FeatureSidebarShowcaseItem[];
  defaultScreenshotSrc?: string;
  testimonial?: {
    name?: string;
    role?: string;
    quote?: string;
    accentFragment?: string;
    accentColor?: string;
    avatarSrc?: string;
  };
};

export function FeatureSidebarShowcase({
  eyebrowIconSrc,
  heading,
  subheading,
  items,
  defaultScreenshotSrc,
  testimonial,
}: FeatureSidebarShowcaseProps) {
  const initialActive = Math.max(
    0,
    items.findIndex((i) => i.label.toLowerCase() === "multi thread"),
  );
  const [activeIdx, setActiveIdx] = useState(initialActive >= 0 ? initialActive : 0);
  const active = items[activeIdx];
  const screenshotSrc = active?.screenshotSrc ?? defaultScreenshotSrc;
  const hasTestimonial = Boolean(testimonial?.quote);

  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "100px 80px", gap: 52 }}
    >
      <div className="flex flex-col items-center" style={{ gap: 24, maxWidth: 691 }}>
        {eyebrowIconSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={eyebrowIconSrc} alt="" style={{ width: 38, height: 38, display: "block" }} />
        ) : null}
        <div className="flex flex-col items-center text-center" style={{ gap: 16 }}>
          <h2
            className="font-urbanist font-bold"
            style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em", margin: 0 }}
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="font-urbanist" style={{ color: "#111", fontSize: 20, lineHeight: 1.2, margin: 0 }}>
              {subheading}
            </p>
          ) : null}
        </div>
      </div>

      {/* Showcase card */}
      <div
        className="overflow-hidden flex flex-col"
        style={{
          width: 1280,
          background: "#fff",
          border: "4px solid #1C1D21",
          borderRadius: 16,
        }}
      >
        <div
          className="flex"
          style={{
            background: "#fff",
            minHeight: 540,
          }}
        >
          {/* Sidebar */}
          <nav
            className="flex flex-col"
            style={{
              width: 280,
              padding: "32px 16px",
              gap: 4,
              background: "#fff",
              borderRight: "1px solid rgba(17,17,17,0.06)",
            }}
            aria-label="Detail items"
          >
            {items.map((item, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={`${item.label}-${i}`}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className="flex items-center text-left cursor-pointer"
                  style={{
                    height: 40,
                    padding: "0 16px",
                    borderRadius: 8,
                    background: isActive ? "var(--color-velt-purple)" : "transparent",
                    border: "none",
                    color: isActive ? "#fff" : "#111",
                    transition: "background-color 150ms ease, color 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "rgba(98,93,245,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    className="font-urbanist"
                    style={{
                      fontSize: 16,
                      fontWeight: isActive ? 600 : 400,
                      lineHeight: 1.2,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Detail panel */}
          <div
            className="flex-1 flex items-center justify-center relative"
            style={{
              padding: 40,
              background: "rgba(247,247,247,0.4)",
              minHeight: 540,
            }}
          >
            <div
              className="absolute"
              style={{
                top: 16,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#8E8E8E",
                fontFamily: '"Urbanist", sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span aria-hidden>📁</span>
              {heading}
            </div>
            {screenshotSrc ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={screenshotSrc}
                alt={active?.label ?? heading}
                style={{
                  maxWidth: "100%",
                  maxHeight: 480,
                  objectFit: "contain",
                  borderRadius: 12,
                  boxShadow: "0px 4px 24px rgba(17,17,17,0.08)",
                }}
              />
            ) : (
              // Placeholder when no screenshot has been uploaded yet.
              <div
                className="flex items-center justify-center"
                style={{
                  width: 540,
                  height: 360,
                  borderRadius: 12,
                  border: "2px dashed rgba(17,17,17,0.12)",
                  color: "#8E8E8E",
                  fontFamily: '"Urbanist", sans-serif',
                  fontSize: 14,
                }}
              >
                Detail screenshot — coming soon
              </div>
            )}
          </div>
        </div>

        {hasTestimonial && testimonial ? <TestimonialFooter t={testimonial} /> : null}
      </div>
    </section>
  );
}

function TestimonialFooter({ t }: { t: NonNullable<FeatureSidebarShowcaseProps["testimonial"]> }) {
  const quote = t.quote ?? "";
  return (
    <div
      style={{
        background: "#111",
        height: 224,
        padding: "0 57px 0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}
    >
      <div className="flex items-center" style={{ gap: 16, flexShrink: 0 }}>
        {t.avatarSrc ? (
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "2px solid #B4B1FA",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.avatarSrc}
              alt={t.name ? `${t.name} Profile Photo` : ""}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ) : null}
        <div className="flex flex-col" style={{ gap: 4 }}>
          {t.name ? (
            <p
              className="font-urbanist font-semibold"
              style={{ color: "#fff", fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              {t.name}
            </p>
          ) : null}
          {t.role ? (
            <p
              className="font-urbanist"
              style={{ color: "#fff", opacity: 0.52, fontSize: 16, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              {t.role}
            </p>
          ) : null}
        </div>
      </div>
      <p
        className="font-urbanist font-semibold"
        style={{
          color: "#fff",
          fontSize: 24,
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          width: 421,
          flexShrink: 0,
        }}
      >
        {renderQuoteWithAccent(quote, t.accentFragment, t.accentColor)}
      </p>
    </div>
  );
}

function renderQuoteWithAccent(quote: string, fragment?: string, color?: string) {
  if (!fragment || !color || !quote.includes(fragment)) return quote;
  const idx = quote.indexOf(fragment);
  return (
    <>
      {quote.slice(0, idx)}
      <span style={{ color }}>{fragment}</span>
      {quote.slice(idx + fragment.length)}
    </>
  );
}
