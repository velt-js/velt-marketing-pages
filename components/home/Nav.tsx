"use client";

// Nav — Figma node 8506:102880. Sticky top bar. Over dark sections (Hero,
// TrustedLogos) it sits transparent with white text; over the purple
// Outcomes section it flips to a white background with dark text. The
// flip point is driven by an IntersectionObserver on the Outcomes
// section — when Outcomes's top crosses the nav's bottom, we're "over
// purple".

import { useEffect, useState } from "react";

const navLinks: { label: string; hasCaret: boolean }[] = [
  { label: "Features", hasCaret: true },
  { label: "Use Cases", hasCaret: true },
  { label: "Platforms", hasCaret: true },
  { label: "Resources", hasCaret: true },
  { label: "Compare", hasCaret: true },
  { label: "Pricing", hasCaret: false },
];

export function Nav() {
  const [overPurple, setOverPurple] = useState(false);

  useEffect(() => {
    const NAV_STRIP = 80;
    const check = () => {
      const outcomes = document.querySelector<HTMLElement>("[data-outcomes]");
      const getStarted = document.querySelector<HTMLElement>("[data-getstarted]");
      if (!outcomes) return;
      const outcomesTop = outcomes.getBoundingClientRect().top;
      const getStartedTop = getStarted?.getBoundingClientRect().top ?? Infinity;
      // Light (white) from when Outcomes scrolls under the nav strip until
      // GetStartedSteps reaches it. Everything after GetStarted is dark bg.
      setOverPurple(outcomesTop <= NAV_STRIP && getStartedTop > NAV_STRIP);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const textColor = overPurple ? "#0f0f11" : "#fff";
  const textOpacity = overPurple ? 0.9 : 0.75;
  const bg = overPurple ? "rgba(255,255,255,0.92)" : "transparent";
  const iconFilter = overPurple ? "invert(1) brightness(0.2)" : "none";

  return (
    <nav
      className="flex items-center gap-6 w-full"
      style={{
        padding: "12px 80px",
        background: bg,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        transition: "background 180ms ease",
      }}
    >
      <div className="flex-1 flex items-center" style={{ gap: 16 }}>
        <a href="/" aria-label="Velt home" className="flex items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/velt-logo.svg"
            alt="Velt"
            width={24}
            height={24}
            style={{ filter: iconFilter, transition: "filter 180ms ease" }}
          />
        </a>
        <ul className="flex items-start" style={{ gap: 12 }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                className="flex items-center rounded-[4px]"
                style={{ padding: "4px 8px", gap: 4, background: "transparent", border: 0 }}
              >
                <span
                  className="font-urbanist font-medium whitespace-nowrap capitalize"
                  style={{
                    color: textColor,
                    opacity: textOpacity,
                    fontSize: 14,
                    lineHeight: 1.2,
                    letterSpacing: "-0.03em",
                    transition: "color 180ms ease",
                  }}
                >
                  {link.label}
                </span>
                {link.hasCaret && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/images/home/icon-chevron-down.svg"
                    alt=""
                    width={14}
                    height={14}
                    style={{ filter: iconFilter, transition: "filter 180ms ease" }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center" style={{ gap: 8 }}>
        <button
          className="flex items-start rounded-lg"
          style={{ padding: "8px 12px 8px 8px", gap: 6, background: "transparent", border: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/icon-login.svg"
            alt=""
            width={16}
            height={16}
            style={{ filter: iconFilter, transition: "filter 180ms ease" }}
          />
          <span
            className="font-urbanist font-medium whitespace-nowrap"
            style={{
              color: textColor,
              opacity: textOpacity,
              fontSize: 14,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              transition: "color 180ms ease",
            }}
          >
            Sign In
          </span>
        </button>
        <button
          className="flex items-start rounded-lg"
          style={{ padding: "8px 12px 8px 8px", gap: 6, background: "transparent", border: 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/icon-book-nav.svg"
            alt=""
            width={16}
            height={16}
            style={{ filter: iconFilter, transition: "filter 180ms ease" }}
          />
          <span
            className="font-urbanist font-medium whitespace-nowrap"
            style={{
              color: textColor,
              opacity: textOpacity,
              fontSize: 14,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              transition: "color 180ms ease",
            }}
          >
            Read Docs
          </span>
        </button>
        <button
          className="rounded-lg"
          style={{ padding: "8px 12px", background: "#625df5", border: 0 }}
        >
          <span
            className="font-urbanist font-semibold text-white whitespace-nowrap"
            style={{ fontSize: 14, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Book Demo
          </span>
        </button>
      </div>
    </nav>
  );
}
