// "Little Big Details" — section heading + sidebar showcase card.
// The card holds a left list of items (active = purple fill) and a right
// detail panel that shows a screenshot. Per-item screenshots can swap the
// detail when supplied; otherwise the section's defaultScreenshot renders.
//
// Figma node 93:11477 (showcase) + 93:11454 (heading group).

"use client";

import { useCallback, useState } from "react";

// Sanity CDN supports inline transforms via query params. The detail panel
// maxes out near ~900px wide; w=1200 covers 2x retina without overshooting.
// auto=format picks AVIF/WebP based on Accept; q=80 trims bytes with no
// visible loss for screenshots. Skip non-Sanity URLs (local /public assets
// don't have a transform endpoint).
function withSanityResize(src: string | null | undefined, width = 1200) {
  if (!src) return null;
  if (!src.includes("cdn.sanity.io")) return src;
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}w=${width}&fit=max&auto=format&q=80`;
}

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
    items.findIndex((i) => i.label.toLowerCase() === "chart comments"),
  );
  const [activeIdx, setActiveIdx] = useState(initialActive >= 0 ? initialActive : 0);
  const active = items[activeIdx];
  const hasTestimonial = Boolean(testimonial?.quote);

  const stackedSources = items.map((item) =>
    withSanityResize(item.screenshotSrc ?? defaultScreenshotSrc ?? null),
  );
  const hasAnyScreenshot = stackedSources.some(Boolean);

  // Only mount images that have been visited. Initial paint loads one image
  // (the active one); hovering a sidebar item mounts that index's image and
  // it stays in the DOM — so subsequent hovers are free (in-DOM + browser
  // cache). Items the user never hovers never download. The old "stack
  // everything up front" approach saturated the network for ~10s on the
  // /comments page where the section has many items.
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([activeIdx]));
  const showItem = useCallback((idx: number) => {
    setActiveIdx(idx);
    setMounted((prev) => {
      if (prev.has(idx)) return prev;
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  }, []);

  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg py-20 lg:py-[100px] px-6 lg:px-20"
      style={{ gap: 52 }}
    >
      <style>{`.showcase-sidebar-nav::-webkit-scrollbar { display: none; }`}</style>
      <div className="flex flex-col items-center" style={{ gap: 24, maxWidth: 691 }}>
        {eyebrowIconSrc ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={eyebrowIconSrc} alt="" style={{ width: 38, height: 38, display: "block" }} />
        ) : null}
        <div className="flex flex-col items-center text-center" style={{ gap: 16 }}>
          <h2
            className="font-urbanist font-bold"
            style={{ color: "#111", fontSize: "clamp(28px, 4.2vw, 52px)", lineHeight: 1.2, letterSpacing: "-0.03em", margin: 0 }}
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
        className="overflow-hidden flex flex-col w-full max-w-[1280px]"
        style={{
          background: "#fff",
          border: "4px solid #1C1D21",
          borderRadius: 16,
        }}
      >
        <div
          className="flex flex-col lg:flex-row"
          style={{
            background: "#fff",
            minHeight: 540,
          }}
        >
          {/* Sidebar */}
          <nav
            className="flex flex-col overflow-y-auto showcase-sidebar-nav"
            style={{
              width: "100%",
              maxWidth: 280,
              padding: "8px",
              gap: 4,
              background: "#fff",
              borderRight: "1px solid rgba(17,17,17,0.06)",
              maxHeight: 540,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            aria-label="Detail items"
          >
            {items.map((item, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={`${item.label}-${i}`}
                  type="button"
                  className="flex items-center text-left cursor-pointer"
                  style={{
                    minHeight: 40,
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: isActive ? "#625DF5" : "transparent",
                    border: "none",
                    color: isActive ? "#fff" : "#111",
                    transition: "background-color 150ms ease, color 150ms ease",
                  }}
                  onMouseEnter={() => showItem(i)}
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
              padding: 12,
              background: "#FCFCFD",
              height: 540,
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
            {hasAnyScreenshot ? (
              <div
                className="relative"
                style={{ width: "100%", height: "100%" }}
              >
                {stackedSources.map((src, i) => {
                  if (!src || !mounted.has(i)) return null;
                  const isActive = i === activeIdx;
                  return (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={`${src}-${i}`}
                      src={src}
                      alt={isActive ? (active?.label ?? heading) : ""}
                      aria-hidden={!isActive}
                      decoding="async"
                      // The initially active screenshot is the LCP candidate
                      // for the section; everything else loads on hover.
                      loading={i === initialActive ? "eager" : "lazy"}
                      fetchPriority={i === initialActive ? "high" : "low"}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: 12,
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 150ms ease",
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <div
                className="flex items-center justify-center"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                  border: "2px dashed rgba(17,17,17,0.12)",
                  color: "#8E8E8E",
                  fontFamily: '"Urbanist", sans-serif',
                  fontSize: 14,
                }}
              >
                Detail screenshot: coming soon
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
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
    style={{
        background: "#111",
        padding: "40px 40px",
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
        className="font-urbanist font-semibold w-full lg:w-[421px] lg:flex-shrink-0"
        style={{
          color: "#fff",
          fontSize: 24,
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          margin: 0,
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
