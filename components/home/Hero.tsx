"use client";

// Hero — Figma node 8506:102927 (1440×1174). Rebuilt 1:1 from Figma design
// context: pixel-grid animated background, centered title + buttons at the
// top, a dark use-case demo panel in the lower half, and two cursor badges
// (Sean teal-left, Emma pink-right) overlaying the middle. Positions below
// are absolute-pixel to match the Figma canvas.
//
// Demo panel tabs swap a full-bleed screenshot per product variant (Figma
// nodes 8576:6546–6558). Click to switch — matches the live Framer demo.

import Image from "next/image";

import { UseCaseDemo } from "./UseCaseDemo";

function CursorSean() {
  // 8506:101911 — teal cursor, left side, y=235 x=248
  return (
    <div className="absolute flex flex-col items-end" style={{ top: 235, left: 248 }} aria-hidden="true">
      <div className="relative" style={{ width: 20, height: 20, transform: "scaleY(-1) rotate(180deg)" }}>
        <Image src="/images/home/cursor-pointer-teal.svg" alt="" width={20} height={20} />
      </div>
      <div style={{ paddingRight: 20 }}>
        <div
          className="flex items-start font-urbanist font-bold"
          style={{
            background: "#8bf2e1",
            borderRadius: 22.5,
            padding: "2.5px 10px",
            color: "#000",
            fontSize: 13.75,
            letterSpacing: "0.01em",
            boxShadow: "0px 1.25px 5px 0px rgba(0,0,0,0.16)",
            lineHeight: 1.545,
          }}
        >
          Sean
        </div>
      </div>
    </div>
  );
}

function CursorEmma() {
  // 8506:101910 — pink cursor, right side, y=324 x=1100
  return (
    <div className="absolute flex flex-col items-start" style={{ top: 324, left: 1100 }} aria-hidden="true">
      <div className="relative" style={{ width: 20, height: 20 }}>
        <Image src="/images/home/cursor-pointer-pink.svg" alt="" width={20} height={20} />
      </div>
      <div style={{ paddingLeft: 20 }}>
        <div
          className="flex items-start font-urbanist font-bold"
          style={{
            background: "#ff74f6",
            borderRadius: 18,
            padding: "2.5px 10px",
            color: "#020202",
            fontSize: 13.75,
            letterSpacing: "0.01em",
            boxShadow: "0px 1.25px 5px 0px rgba(0,0,0,0.16)",
            lineHeight: 1.545,
          }}
        >
          Emma
        </div>
      </div>
    </div>
  );
}

function TitleBlock() {
  // 8506:101901 — centered at y=140, 651px wide
  return (
    <div
      className="absolute flex flex-col items-center gap-10"
      style={{ top: 140, left: "50%", transform: "translateX(-50%)", width: 651 }}
    >
      <div className="flex flex-col gap-5 text-center w-full">
        <h1
          className="font-urbanist font-bold text-white"
          style={{ fontSize: 72, lineHeight: 1.2, letterSpacing: "-0.03em" }}
        >
          The Complete
          <br />
          Collaboration Toolkit
        </h1>
        <p
          className="font-urbanist font-medium"
          style={{
            fontSize: 24,
            lineHeight: 1.1,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Add features like contextual comments, notifications, recordings,
          multiplayer editing &amp; huddles to your product
        </p>
      </div>
      <div className="flex items-start gap-3">
        {/* Secondary — outlined purple, mix-blend-exclusion preserves text over the gradient bg */}
        <button
          className="flex items-center justify-center rounded-lg font-urbanist font-bold text-white"
          style={{
            minWidth: 150,
            padding: "12px 16px",
            border: "1.002px solid #625df5",
            fontSize: 16,
            letterSpacing: "-0.03em",
            mixBlendMode: "exclusion",
          }}
        >
          Book Demo
        </button>
        {/* Primary — solid purple */}
        <button
          className="flex items-center justify-center rounded-lg font-urbanist font-bold text-white"
          style={{
            minWidth: 150,
            padding: "12px 16px",
            background: "#625df5",
            fontSize: 16,
            letterSpacing: "-0.03em",
          }}
        >
          Get Free API Key
        </button>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative w-full bg-black"
      style={{ height: 1174 }}
    >
      {/* Pixel-grid animated background — Figma `grid-animation-gif`, 1440×740.
          Rendered as a CSS background-image so it tiles horizontally via
          repeat-x when the .hero-grid-full breakout kicks in at viewports
          ≥ 1440 (see globals.css). At and below 1440 the inline width/left
          keep it aligned to the design; at >1440 it fills the viewport. */}
      <div
        className="hero-grid-full absolute overflow-hidden"
        style={{
          top: 0,
          left: 0,
          width: 1440,
          height: 534,
          backgroundImage: "url('/images/home/grid-animation.gif')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "1440px 740px",
          backgroundPosition: "top center",
        }}
      />
      {/* Radial-vignette overlay fading grid into black. Uses the same
          .hero-grid-full breakout at ≥1440 so the vignette edges track the
          extended grid; the gradient size switches to 100% of the widened
          element so the fade spans the viewport. */}
      <div
        aria-hidden="true"
        className="hero-grid-full absolute"
        style={{
          top: 0,
          left: 0,
          width: 1440,
          height: 534,
          background:
            "radial-gradient(ellipse 100% 534px at 50% 0%, rgba(0,0,0,0.7) 0%, #000 100%)",
        }}
      />

      <TitleBlock />
      <UseCaseDemo />
      <CursorSean />
      <CursorEmma />
    </section>
  );
}
