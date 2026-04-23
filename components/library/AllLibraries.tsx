"use client";

// "All Libraries" grid — matches the Framer export's "2025/Library Card"
// (chunk-YRWKAGDD.js) tiled into the library-landing grid.
//
// Card spec (default state):
// - 271×150 px
// - background #f7f7f7, 16px radius
// - logo centered in flex-1 area (20px padding, 25px tall image)
// - no visible CTAs
//
// Card spec (hover):
// - background white, inset 0 0 0 2px rgb(0,0,0) border
// - two buttons slide up from bottom: "View Docs" and "Learn More"
// - buttons are 48% width each, 33px tall, sit at bottom 8px left/right 8px
//
// Grid: 3 columns × N rows, 16px gap. Header with "All Libraries" heading
// and a subtle subheading above the grid. Lives on a white section.

import { useState } from "react";

export type LibraryCardData = {
  name: string;
  logoSrc?: string;
  logoAlt?: string;
  docsHref: string;
  learnMoreHref: string;
};

type AllLibrariesProps = {
  heading?: string;
  subheading?: string;
  items: LibraryCardData[];
};

function LibraryLogoCard({ data }: { data: LibraryCardData }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden"
      style={{
        width: 271,
        height: 150,
        borderRadius: 16,
        background: hovered ? "rgb(255, 255, 255)" : "rgb(247, 247, 247)",
        boxShadow: hovered ? "inset 0px 0px 0px 2px rgb(0, 0, 0)" : "none",
        transition: "background 200ms ease, box-shadow 200ms ease",
      }}
    >
      {/* Logo area */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 20,
          transition: "padding-bottom 200ms ease",
          paddingBottom: hovered ? 60 : 20,
        }}
      >
        {data.logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.logoSrc}
            alt={data.logoAlt ?? data.name}
            style={{
              maxHeight: 25,
              maxWidth: "80%",
              objectFit: "contain",
            }}
          />
        ) : (
          <span
            className="font-urbanist font-bold"
            style={{ fontSize: 20, color: "#111" }}
          >
            {data.name}
          </span>
        )}
      </div>

      {/* Hover CTAs — slide up from bottom */}
      <div
        className="absolute flex items-center"
        style={{
          left: 8,
          right: 8,
          bottom: hovered ? 8 : -40,
          height: 33,
          gap: 10,
          opacity: hovered ? 1 : 0,
          transition: "bottom 200ms ease, opacity 200ms ease",
        }}
      >
        <a
          href={data.docsHref}
          target="_blank"
          rel="noopener"
          className="flex items-center justify-center rounded-md font-urbanist font-semibold"
          style={{
            flex: "0 0 48%",
            height: 33,
            padding: "8px 12px",
            background: "rgb(237, 237, 237)",
            border: "1.5px solid rgb(38, 34, 145)",
            color: "rgb(105, 105, 105)",
            fontSize: 14,
            letterSpacing: "-0.02em",
            textDecoration: "none",
          }}
        >
          View Docs
        </a>
        <a
          href={data.learnMoreHref}
          className="flex items-center justify-center rounded-md font-urbanist font-semibold"
          style={{
            flex: "0 0 48%",
            height: 33,
            padding: "8px 12px",
            background: "rgb(0, 0, 0)",
            border: "1.5px solid rgb(38, 34, 145)",
            color: "rgb(255, 255, 255)",
            fontSize: 14,
            letterSpacing: "-0.02em",
            textDecoration: "none",
          }}
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

export function AllLibraries({
  heading = "All Libraries",
  subheading = "These libraries require less than 10 lines to integrate",
  items,
}: AllLibrariesProps) {
  return (
    <section
      className="flex flex-col items-center bg-white"
      style={{ padding: "52px 80px 100px", gap: 52 }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 12, maxWidth: 820 }}
      >
        <h2
          className="font-urbanist font-bold"
          style={{
            color: "#111",
            fontSize: 52,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
          }}
        >
          {heading}
        </h2>
        {subheading && (
          <p
            className="font-urbanist"
            style={{ color: "#111", fontSize: 20, lineHeight: 1.2, opacity: 0.72 }}
          >
            {subheading}
          </p>
        )}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(3, 271px)",
          gap: 16,
        }}
      >
        {items.map((item) => (
          <LibraryLogoCard key={item.name} data={item} />
        ))}
      </div>
    </section>
  );
}
