"use client";

// Editorial feature-comparison table for /pricing. Reuses the SECTIONS /
// TIERS data from components/pricing/pricing-data. Layout: one wide label
// column + three equal tier columns. The tier-header row pins under the
// sticky Nav; each section heading is itself sticky (offset = nav +
// tier-header height) and clickable to collapse its rows. The section
// accent color drives a thin top rule + the heading text, echoing the
// live site's category strip but tuned to the editorial palette.
//
// Mobile (<lg): a per-tier accordion of label + value pairs.

import { Fragment, useEffect, useRef, useState } from "react";

import {
  SECTIONS,
  TIERS,
  type CellValue,
  type Tier,
} from "@/components/pricing/pricing-data";
import "./PricingTable.css";

// Per-tier CTA shown only in the comparison-table column headers (Hacker
// links to the console, Growth + Enterprise to /book-demo).
const HEADER_CTA: Record<Tier["id"], { label: string; href: string }> = {
  hacker: { label: "Get started", href: "https://console.velt.dev/" },
  growth: { label: "Book demo", href: "/book-demo" },
  enterprise: { label: "Book demo", href: "/book-demo" },
};

// Approx. sticky-nav height (Nav.css: 14px pad ×2 + 22px logo + 1px border).
const NAV_OFFSET = 52;

/**
 * Green outlined check used for boolean "included" cells.
 * @returns The check SVG.
 */
function CheckMark() {
  return (
    <svg className="prc-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4 4 10-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Muted dash used for boolean "not included" cells.
 * @returns The dash SVG.
 */
function CrossMark() {
  return (
    <svg className="prc-cross" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Renders a single comparison cell value (check, cross, or text).
 * @param value The cell value descriptor.
 * @returns The rendered cell content.
 */
function Cell({ value }: { value: CellValue }) {
  if (value.kind === "check") return <CheckMark />;
  if (value.kind === "x") return <CrossMark />;
  return (
    <div className="prc-cell-text">
      <span className="prc-cell-value">{value.value}</span>
      {value.sub ? <span className="prc-cell-sub">{value.sub}</span> : null}
    </div>
  );
}

/**
 * Caret used on collapsible section headers.
 * @param open Whether the section is expanded.
 * @returns The caret SVG.
 */
function Caret({ open }: { open: boolean }) {
  return (
    <svg
      className={open ? "prc-caret prc-caret--open" : "prc-caret"}
      viewBox="0 0 12 8"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Sticky tier-header row pinned under the Nav for the whole table.
 * @param innerRef Ref used to measure the header height for section offsets.
 * @returns The tier-header row.
 */
function TierHeader({ innerRef }: { innerRef: React.Ref<HTMLDivElement> }) {
  return (
    <div className="prc-tier-header" ref={innerRef}>
      <div className="prc-row prc-row--header">
        <div />
        {TIERS.map((tier) => {
          const cta = HEADER_CTA[tier.id];
          const external = cta.href.startsWith("http");
          return (
            <div key={tier.id} className="prc-tier-col">
              <span className="prc-tier-name">{tier.name}</span>
              <span className="prc-tier-price">{tier.price}</span>
              <a
                href={cta.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener" : undefined}
                className="prc-tier-cta hsoft"
              >
                {cta.label}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Mobile per-tier accordion. One collapsible block per tier listing every
 * section heading and its label/value rows for that tier.
 * @returns The mobile accordion.
 */
function MobileAccordion() {
  return (
    <div className="prc-mobile">
      {TIERS.map((tier, tierIdx) => {
        const cta = HEADER_CTA[tier.id];
        const external = cta.href.startsWith("http");
        return (
          <details key={tier.id} open={tierIdx === 0} className="prc-m-tier">
            <summary className="prc-m-summary">
              <div className="prc-m-head">
                <span className="prc-m-name">{tier.name}</span>
                <span className="prc-m-price">{tier.price}</span>
              </div>
              <a
                href={cta.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener" : undefined}
                className="prc-m-cta"
                onClick={(event) => event.stopPropagation()}
              >
                {cta.label}
              </a>
            </summary>
            <div className="prc-m-body">
              {SECTIONS.map((section) => (
                <div key={section.title}>
                  <div
                    className="prc-m-section"
                    style={{ borderTopColor: section.accent }}
                  >
                    <span
                      className="prc-m-section-title"
                      style={{ color: section.accent }}
                    >
                      {section.title}
                    </span>
                  </div>
                  {section.rows.map((row, rowIdx) => (
                    <div key={`${section.title}-${rowIdx}`} className="prc-m-row">
                      <div className="prc-m-label">
                        <span className="prc-m-label-main">{row.label}</span>
                        {row.sublabel ? (
                          <span className="prc-m-label-sub">{row.sublabel}</span>
                        ) : null}
                      </div>
                      <div className="prc-m-value">
                        <Cell value={row.values[tierIdx]} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}

/**
 * Full pricing comparison section: intro, desktop sticky table, and mobile
 * accordion.
 * @returns The comparison section.
 */
export default function PricingTable() {
  const tierHeaderRef = useRef<HTMLDivElement>(null);
  const [tierHeaderHeight, setTierHeaderHeight] = useState(120);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const element = tierHeaderRef.current;
      if (!element) return undefined;
      const update = () => setTierHeaderHeight(element.offsetHeight);
      update();
      const observer = new ResizeObserver(update);
      observer.observe(element);
      return () => observer.disconnect();
    } catch {
      return undefined;
    }
  }, []);

  /**
   * Toggles a section's collapsed state by title.
   * @param title The section title to toggle.
   */
  const toggleSection = (title: string) => {
    try {
      setCollapsed((prev) => {
        const next = new Set(prev);
        if (next.has(title)) {
          next.delete(title);
        } else {
          next.add(title);
        }
        return next;
      });
    } catch {
      // no-op: Set mutation guarded for the strict error policy
    }
  };

  return (
    <section className="prc-section">
      <div className="prc-inner">
        <div className="prc-intro">
          <div className="prc-eyebrow">
            <span className="prc-eyebrow-dot" />
            Compare
          </div>
          <h2 className="prc-intro-h2">Every feature, side by side.</h2>
          <p className="prc-intro-p">
            All plans include the full SDK. Higher tiers add scale, security,
            and integration depth.
          </p>
        </div>

        {/* Mobile */}
        <div className="prc-mobile-wrap">
          <MobileAccordion />
        </div>

        {/* Desktop */}
        <div className="prc-desktop">
          <div
            className="prc-tier-header-sticky"
            style={{ top: NAV_OFFSET }}
          >
            <TierHeader innerRef={tierHeaderRef} />
          </div>

          {SECTIONS.map((section) => {
            const open = !collapsed.has(section.title);
            return (
              <Fragment key={section.title}>
                <div
                  className="prc-section-head-sticky"
                  style={{
                    top: NAV_OFFSET + tierHeaderHeight,
                    borderTopColor: section.accent,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(section.title)}
                    aria-expanded={open}
                    className="prc-section-btn"
                  >
                    <span
                      className="prc-section-title"
                      style={{ color: section.accent }}
                    >
                      {section.title}
                    </span>
                    <Caret open={open} />
                  </button>
                </div>

                {open &&
                  section.rows.map((row, rowIdx) => (
                    <div
                      key={`${section.title}-${rowIdx}`}
                      className="prc-row prc-row--body"
                    >
                      <div className="prc-label">
                        <span className="prc-label-main">{row.label}</span>
                        {row.sublabel ? (
                          <span className="prc-label-sub">{row.sublabel}</span>
                        ) : null}
                      </div>
                      {row.values.map((value, valueIdx) => (
                        <div key={valueIdx} className="prc-value">
                          <Cell value={value} />
                        </div>
                      ))}
                    </div>
                  ))}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
