"use client";

// "Check out assets from our customer launches" — light grey (#f7f7f7)
// rounded band containing a horizontally-scrolling marquee of 3 customer
// cards. Each card shows a small left-aligned customer logo on top and a
// vertical list of clickable asset links (label on the left, external-arrow
// on the right) below.
//
// Animation: CSS keyframe translateX on a doubled track so the loop wraps
// seamlessly. Pattern is cloned from FeatureCustomerCarousel.tsx — the
// canonical marquee in this repo. Hover slows playback to ~10% via the
// Web Animations API (so users can read a card without it jumping).
// prefers-reduced-motion disables animation and falls back to manual
// horizontal scroll.

import { useEffect, useRef } from "react";

import { ExternalLinkIcon } from "@/components/feature/uis/icons";

type AssetLink = {
  label: string;
  href: string;
};

type CustomerCard = {
  name: string;
  logoSrc: string;
  logoAlt: string;
  links: AssetLink[];
};

// Marquee tuning — matches FeatureCustomerCarousel.tsx feel.
const CARD_W = 360;
const CARD_GAP = 24;
const SCROLL_SPEED = 50; // px/sec
const HOVER_FACTOR = 0.1;

const CUSTOMER_CARDS: CustomerCard[] = [
  {
    name: "trumpet",
    logoSrc: "/images/launch-kit/customer-trumpet.png",
    logoAlt: "trumpet",
    links: [
      {
        label: "Social Post (Video)",
        href: "https://www.youtube.com/watch?v=2D091sFoCa8",
      },
      {
        label: "Launch Email",
        href: "https://drive.google.com/drive/folders/1cpWvsbmYECrO0DqvJJQehjIIk1u980BH",
      },
      {
        label: "Marketing Site",
        href: "https://www.sendtrumpet.com/product/collaboration-suite?ref=velt.dev",
      },
      {
        label: "Blog Post",
        href: "https://www.pendo.io/pendo-blog/introducing-team-management/",
      },
    ],
  },
  {
    name: "pendo",
    logoSrc: "/images/launch-kit/customer-pendo.png",
    logoAlt: "Pendo",
    links: [
      {
        label: "Marketing Site",
        href: "https://www.pendo.io/product/analytics/",
      },
      {
        label: "Blog Post",
        href: "https://support.pendo.io/hc/en-us/articles/24044494371483-Collaborate-on-dashboards",
      },
    ],
  },
  {
    name: "HeyGen",
    logoSrc: "/images/launch-kit/customer-heygen.png",
    logoAlt: "HeyGen",
    links: [
      {
        label: "Website Post",
        href: "https://community.heygen.com/public/resources/single-editor-mode-collaborate-on-video-projects-in-real-time",
      },
      {
        label: "Keynote",
        href: "https://www.youtube.com/live/sAULntQubQM?si=-c1l1w7akMQcyX4G&t=590",
      },
    ],
  },
];

type CustomerLaunchesProps = {
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CustomerLaunches({
  heading = "Check out assets from our customer launches",
  ctaLabel = "View all assets",
  ctaHref = "https://www.figma.com/community/file/1402312407969730816",
}: CustomerLaunchesProps = {}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const setRate = (rate: number) => {
      for (const a of track.getAnimations()) {
        a.playbackRate = rate;
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

  const trackShift = CUSTOMER_CARDS.length * (CARD_W + CARD_GAP);
  const durationSec = trackShift / SCROLL_SPEED;

  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "100px 80px" }}
    >
      <div
        className="overflow-hidden flex flex-col items-center"
        style={{
          width: 1280,
          background: "#f7f7f7",
          borderRadius: 32,
          padding: "80px 0",
          gap: 48,
        }}
      >
        <h2
          className="font-urbanist font-bold text-center"
          style={{
            color: "#111",
            fontSize: 52,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            margin: 0,
            padding: "0 80px",
            maxWidth: 900,
          }}
        >
          {heading}
        </h2>

        <style>{`
          @keyframes customer-launches-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-${trackShift}px); }
          }
          .customer-launches-track {
            animation: customer-launches-marquee ${durationSec}s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .customer-launches-track { animation: none; }
            .customer-launches-viewport { overflow-x: auto; }
          }
        `}</style>

        <div
          ref={viewportRef}
          className="customer-launches-viewport w-full overflow-hidden"
          style={{
            padding: "4px 0",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div
            ref={trackRef}
            className="customer-launches-track flex"
            style={{
              gap: CARD_GAP,
              width: "max-content",
              willChange: "transform",
              paddingLeft: CARD_GAP,
            }}
          >
            {[...CUSTOMER_CARDS, ...CUSTOMER_CARDS].map((card, i) => (
              <CustomerCardView
                key={`${card.name}-${i}`}
                card={card}
                ariaHidden={i >= CUSTOMER_CARDS.length}
              />
            ))}
          </div>
        </div>

        <a
          href={ctaHref}
          target="_blank"
          rel="noopener"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#625DF5",
            color: "#fff",
            fontFamily: '"Urbanist", sans-serif',
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 1,
            height: 48,
            padding: "0 24px",
            borderRadius: 999,
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          <AssetIcon />
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}

function CustomerCardView({
  card,
  ariaHidden,
}: {
  card: CustomerCard;
  ariaHidden: boolean;
}) {
  return (
    <article
      aria-hidden={ariaHidden}
      className="flex flex-col shrink-0"
      style={{
        width: CARD_W,
        background: "#fff",
        borderRadius: 24,
        padding: "32px 28px",
        gap: 24,
      }}
    >
      <div
        className="flex items-center"
        style={{ height: 32 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.logoSrc}
          alt={card.logoAlt}
          style={{
            height: 24,
            maxHeight: 24,
            maxWidth: 140,
            width: "auto",
            objectFit: "contain",
            objectPosition: "left center",
            display: "block",
          }}
        />
      </div>
      <ul
        className="flex flex-col"
        style={{ listStyle: "none", margin: 0, padding: 0, gap: 0 }}
      >
        {card.links.map((link, idx) => (
          <li
            key={link.label}
            style={{
              borderTop: idx === 0 ? "1px solid #e5e7eb" : "none",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-between"
              style={{
                color: "#111",
                textDecoration: "none",
                fontFamily: '"Urbanist", sans-serif',
                fontWeight: 600,
                fontSize: 16,
                lineHeight: 1.2,
                padding: "16px 4px",
                letterSpacing: "-0.01em",
              }}
            >
              <span>{link.label}</span>
              <ExternalLinkIcon size={18} stroke="#111" strokeWidth={1.8} />
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

function AssetIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}
