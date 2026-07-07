"use client";

import { useCallback, useMemo, useState } from "react";

import SectionSplitHeader from "./SectionSplitHeader";

import "./DetailsShowcase.css";

export type DetailsShowcaseItem = {
  label: string;
  /** Optional per-item screenshot. Falls back to the section default. */
  screenshotSrc?: string;
};

export type DetailsShowcaseProps = {
  kicker: string;
  heading: string;
  support?: string;
  items: DetailsShowcaseItem[];
  defaultScreenshotSrc?: string;
};

const SANITY_CDN_HOST = "cdn.sanity.io";
const DEFAULT_ACTIVE_LABEL = "chart comments";

/**
 * Appends Sanity image-transform query params for retina-safe, byte-trimmed
 * delivery. Non-Sanity and empty URLs are returned untouched.
 * @param {string | null | undefined} src The source URL.
 * @param {number} [width] Target render width in px.
 * @returns {string | null} The (possibly) transformed URL.
 */
function withSanityResize(src: string | null | undefined, width = 1200): string | null {
  try {
    if (!src) {
      return null;
    }
    if (!src.includes(SANITY_CDN_HOST)) {
      return src;
    }
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}w=${width}&fit=max&auto=format&q=80`;
  } catch (error) {
    console.error("withSanityResize failed", error);
    return src ?? null;
  }
}

/**
 * Little Big Details: a v2-native section pairing a scrollable list of
 * micro-capabilities with a screenshot panel that swaps as each item is
 * hovered. Uses the shared split header and --vlp-* tokens so it matches the
 * rest of the feature page. Screenshots mount lazily on first hover.
 * @param {DetailsShowcaseProps} props Section content.
 * @returns {JSX.Element} The details showcase section.
 */
export default function DetailsShowcase({
  kicker,
  heading,
  support,
  items,
  defaultScreenshotSrc,
}: DetailsShowcaseProps) {
  const initialActive = useMemo(() => {
    try {
      const foundIndex = items.findIndex(
        (item) => item?.label?.toLowerCase() === DEFAULT_ACTIVE_LABEL,
      );
      return foundIndex >= 0 ? foundIndex : 0;
    } catch (error) {
      console.error("DetailsShowcase initial index failed", error);
      return 0;
    }
  }, [items]);

  const sources = useMemo(() => {
    try {
      return items.map((item) =>
        withSanityResize(item?.screenshotSrc ?? defaultScreenshotSrc ?? null),
      );
    } catch (error) {
      console.error("DetailsShowcase sources failed", error);
      return [];
    }
  }, [items, defaultScreenshotSrc]);

  const [activeIdx, setActiveIdx] = useState(initialActive);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([initialActive]));

  const hasAnyScreenshot = sources.some(Boolean);
  const activeItem = items[activeIdx];

  const showItem = useCallback((idx: number) => {
    try {
      setActiveIdx(idx);
      setMounted((prev) => {
        if (prev.has(idx)) {
          return prev;
        }
        const next = new Set(prev);
        next.add(idx);
        return next;
      });
    } catch (error) {
      console.error("DetailsShowcase showItem failed", error);
    }
  }, []);

  return (
    <section className="band" id="details" data-section="details">
      <div className="wrap">
        <SectionSplitHeader kicker={kicker} heading={heading} support={support} />
        <div className="ds-card">
          <nav className="ds-nav" aria-label="Detail items">
            {items.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={`${item.label}-${idx}`}
                  type="button"
                  className="ds-item"
                  data-active={isActive ? "true" : "false"}
                  onMouseEnter={() => showItem(idx)}
                  onFocus={() => showItem(idx)}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="ds-panel">
            <span className="ds-panel-label">{heading}</span>
            {hasAnyScreenshot ? (
              <div className="ds-shots">
                {sources.map((src, idx) => {
                  if (!src || !mounted.has(idx)) {
                    return null;
                  }
                  const isActive = idx === activeIdx;
                  return (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={`${src}-${idx}`}
                      className="ds-shot"
                      data-active={isActive ? "true" : "false"}
                      src={src}
                      alt={isActive ? (activeItem?.label ?? heading) : ""}
                      aria-hidden={!isActive}
                      decoding="async"
                      loading={idx === initialActive ? "eager" : "lazy"}
                      fetchPriority={idx === initialActive ? "high" : "low"}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="ds-empty">Detail screenshot: coming soon</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
