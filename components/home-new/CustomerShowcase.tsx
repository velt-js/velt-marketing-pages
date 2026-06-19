// CustomerShowcase — the interactive customer carousel, restyled to the
// home-new editorial design system (--vlp-* tokens, Urbanist/Geist Mono,
// ink/cream/accent palette). Reuses the customer dataset from the legacy
// CustomerUI component so copy and assets stay in one place. Click a logo in
// the dark strip to swap the featured customer's headline pill, subtitle,
// product screenshot, and testimonial.

"use client";

import { useState } from "react";
import Image from "next/image";

import { DEFAULT_CUSTOMERS, type Customer } from "../home/CustomerUI";
import "./CustomerShowcase.css";

const VISIBLE_COUNT = 8;
const BOOK_DEMO_HREF = "/book-demo";
const CUSTOMERS_HREF = "/customers";

/**
 * Splits a quote so the highlighted phrase can be wrapped in an accent span.
 * Returns the quote untouched when the highlight is empty or not found.
 */
function renderHighlightedQuote(quote: string, highlight: string) {
  try {
    if (!highlight) return <>{quote}</>;
    const startIndex = quote.indexOf(highlight);
    if (startIndex === -1) return <>{quote}</>;
    return (
      <>
        {quote.slice(0, startIndex)}
        <span className="cust-quote-highlight">{highlight}</span>
        {quote.slice(startIndex + highlight.length)}
      </>
    );
  } catch {
    return <>{quote}</>;
  }
}

/**
 * Interactive customer showcase section for the home-new homepage.
 */
export default function CustomerShowcase({
  customers = DEFAULT_CUSTOMERS,
}: { customers?: Customer[] } = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  const maxOffset = Math.max(0, customers.length - VISIBLE_COUNT);
  const visibleCustomers = customers.slice(scrollOffset, scrollOffset + VISIBLE_COUNT);

  /**
   * Pages the desktop logo strip one position to the left.
   */
  function handleScrollLeft() {
    try {
      setScrollOffset((previous) => Math.max(0, previous - 1));
    } catch {
      /* no-op: state setter should never throw */
    }
  }

  /**
   * Pages the desktop logo strip one position to the right.
   */
  function handleScrollRight() {
    try {
      setScrollOffset((previous) => Math.min(maxOffset, previous + 1));
    } catch {
      /* no-op: state setter should never throw */
    }
  }

  /**
   * Selects the customer at the given index as the featured one.
   */
  function handleSelect(index: number) {
    try {
      setActiveIndex(index);
    } catch {
      /* no-op: state setter should never throw */
    }
  }

  const active = customers[activeIndex] ?? customers[0];
  if (!active) return null;

  /**
   * Renders a single logo button for the tab strip.
   */
  function renderLogoButton(customer: Customer) {
    const realIndex = customers.indexOf(customer);
    const isActive = realIndex === activeIndex;
    return (
      <button
        key={customer.slug}
        type="button"
        aria-label={`Show ${customer.name}`}
        aria-pressed={isActive}
        onClick={() => handleSelect(realIndex)}
        className={`cust-tab${isActive ? " is-active" : ""}`}
        style={{ width: customer.stripLogoWidthPx }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={customer.stripLogoSrc}
          alt={customer.name}
          className="cust-tab-logo"
          style={{
            width: customer.stripLogoWidthPx,
            height: customer.stripLogoHeightPx,
          }}
        />
      </button>
    );
  }

  return (
    <section className="cust-section">
      <div className="cust-header">
        <div className="cust-header-left">
          <div className="cust-eyebrow">
            <span className="cust-eyebrow-dot"></span>Customers
          </div>
          <h2 className="cust-heading">
            <span>How</span>
            <span className="cust-heading-pill">
              <span
                role="img"
                aria-label={active.name}
                className="cust-heading-pill-logo"
                style={{
                  maskImage: `url(${active.pillLogoSrc ?? active.stripLogoSrc})`,
                  WebkitMaskImage: `url(${active.pillLogoSrc ?? active.stripLogoSrc})`,
                  aspectRatio: `${active.pillLogoWidthPx} / ${active.pillLogoHeightPx}`,
                }}
              />
            </span>
            <span>leverages Velt</span>
          </h2>
        </div>
        <div className="cust-header-right">
          <p className="cust-subtitle">{active.subtitle}</p>
          <div className="cust-actions">
            <a href={BOOK_DEMO_HREF} className="cust-btn-primary hdark">
              Book Demo
            </a>
            <a href={CUSTOMERS_HREF} className="cust-btn-secondary houtline">
              View Customers
            </a>
          </div>
        </div>
      </div>

      <div className="cust-card">
        <div className="cust-tabs">
          <button
            type="button"
            aria-label="Scroll logos left"
            onClick={handleScrollLeft}
            className="cust-tabs-arrow"
            disabled={scrollOffset <= 0}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Mobile: full list, horizontally scrollable. */}
          <div className="cust-tabs-strip cust-tabs-strip-mobile">
            {customers.map((customer) => renderLogoButton(customer))}
          </div>

          {/* Desktop: paginated VISIBLE_COUNT window. */}
          <div className="cust-tabs-strip cust-tabs-strip-desktop">
            {visibleCustomers.map((customer) => renderLogoButton(customer))}
          </div>

          <button
            type="button"
            aria-label="Scroll logos right"
            onClick={handleScrollRight}
            className="cust-tabs-arrow"
            disabled={scrollOffset >= maxOffset}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* All screenshots are stacked so switching customers is an opacity
            swap, not a network round-trip. */}
        <div className="cust-screenshot">
          {customers.map((customer, index) => (
            <Image
              key={customer.slug}
              src={customer.productSrc}
              alt={`${customer.name} integrated with Velt`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="cust-screenshot-img"
              style={{ opacity: index === activeIndex ? 1 : 0 }}
            />
          ))}
        </div>

        <div className="cust-testimonial">
          <div className="cust-testimonial-author">
            <span className="cust-testimonial-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={active.slug}
                src={active.testimonialAvatarSrc}
                alt={`${active.testimonialAuthor} profile photo`}
                className="cust-testimonial-avatar-img"
              />
            </span>
            <span className="cust-testimonial-meta">
              <span className="cust-testimonial-name">{active.testimonialAuthor}</span>
              <span className="cust-testimonial-role">{active.testimonialRole}</span>
            </span>
          </div>
          <p className="cust-testimonial-quote">
            {renderHighlightedQuote(active.testimonialQuote, active.testimonialHighlight)}
          </p>
        </div>
      </div>
    </section>
  );
}
