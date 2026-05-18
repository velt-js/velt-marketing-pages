// "Check out Examples Made with Velt" — Figma node 294:25799.
// Header (heading + subheading + View Docs / View All Samples CTAs)
// followed by an auto-scrolling marquee of the same 7 product cards
// used in components/home/StealFeatures.tsx (Canvas / Cell / Video /
// Co-editing / Huddles / Presence & Cursors / Notifications). The
// header copy and CTAs come from this page's Figma; the cards and
// marquee mechanics are reused.

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import {
  stealFeaturesCards,
  STEAL_FEATURES_CARD_W,
  STEAL_FEATURES_CARD_H,
  STEAL_FEATURES_CARD_GAP,
  STEAL_FEATURES_ILLUSTRATION_H,
} from "@/components/home/StealFeatures";

const CARD_W = STEAL_FEATURES_CARD_W;
const CARD_H = STEAL_FEATURES_CARD_H;
const CARD_GAP = STEAL_FEATURES_CARD_GAP;
const ILLUSTRATION_H = STEAL_FEATURES_ILLUSTRATION_H;
const SCROLL_SPEED = 100; // px/sec — matches StealFeatures
const HOVER_FACTOR = 0.1;

const TRACK_SHIFT = stealFeaturesCards.length * (CARD_W + CARD_GAP);
const MARQUEE_DURATION_S = TRACK_SHIFT / SCROLL_SPEED;

export function ExamplesCarousel() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const setRate = (rate: number) => {
      for (const anim of track.getAnimations()) {
        anim.playbackRate = rate;
      }
    };
    const onEnter = () => setRate(HOVER_FACTOR);
    const onLeave = () => setRate(1);
    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);
    return () => {
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      className="flex flex-col items-center full-bleed-bg py-16 lg:py-[100px] px-6 lg:px-0"
      style={{
        background: "#fff",
        gap: 52,
        borderBottomLeftRadius: 52,
        borderBottomRightRadius: 52,
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center w-full max-w-[850px]" style={{ gap: 32 }}>
        <div className="flex flex-col items-center text-center w-full" style={{ gap: 12 }}>
          <h2
            className="font-urbanist font-bold"
            style={{
              fontSize: "clamp(28px, 4.2vw, 52px)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              color: "#111",
              margin: 0,
            }}
          >
            Check out Examples Made with Velt
          </h2>
          <p
            className="font-urbanist"
            style={{
              fontSize: "clamp(16px, 1.5vw, 20px)",
              lineHeight: 1.3,
              color: "#111",
              margin: 0,
            }}
          >
            Our components have different modes to match your product needs
          </p>
        </div>
        <div className="flex items-start" style={{ gap: 12 }}>
          {/* View Docs — outlined; mix-blend-exclusion only on the text
           *  span (matches components/home/StealFeatures.tsx). Putting it
           *  on the whole anchor blends the border too and turns the
           *  purple stroke green/yellow. */}
          <Link
            href="https://velt.dev/docs/"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-1 rounded-lg"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              border: "2px solid #625df5",
              textDecoration: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/icon-book-2.svg"
              alt=""
              width={18}
              height={18}
            />
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}
            >
              View Docs
            </span>
          </Link>
          <Link
            href="/examples"
            className="flex items-center justify-center font-urbanist font-semibold rounded-lg"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              background: "#625df5",
              color: "#fff",
              fontSize: 16,
              letterSpacing: "-0.03em",
              textDecoration: "none",
            }}
          >
            View All Samples
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes examples-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-${TRACK_SHIFT}px); }
        }
        .examples-marquee-track {
          animation: examples-marquee ${MARQUEE_DURATION_S}s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .examples-marquee-track { animation: none; }
          .examples-marquee-viewport { overflow-x: auto; }
        }
      `}</style>

      <div
        ref={viewportRef}
        className="examples-marquee-viewport w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 87.5%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          ref={trackRef}
          className="examples-marquee-track flex items-center"
          style={{ gap: CARD_GAP, height: CARD_H, width: "max-content" }}
        >
          {[...stealFeaturesCards, ...stealFeaturesCards].map((card, idx) => (
            <article
              key={`${card.title}-${idx}`}
              aria-hidden={idx >= stealFeaturesCards.length}
              className="relative shrink-0 overflow-hidden"
              style={{
                width: CARD_W,
                height: CARD_H,
                background: "#f7f7f7",
                border: "2px solid #f7f7f7",
                borderRadius: 24,
              }}
            >
              <div className="absolute inset-0" style={{ height: ILLUSTRATION_H + 20 }}>
                {card.illustration}
              </div>
              <div
                className="absolute flex flex-col items-start"
                style={{ bottom: 40, left: 40, width: 305, gap: 16 }}
              >
                {card.icon}
                <div
                  className="font-urbanist font-bold"
                  style={{
                    color: "#111",
                    fontSize: 28,
                    lineHeight: 1.2,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {card.title}
                  <br />
                  {card.subtitle}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
