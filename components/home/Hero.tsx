// Hero — Figma node 8506:102927 (1440×1174). Rebuilt 1:1 from Figma design
// context: pixel-grid animated background, centered title + buttons at the
// top, a dark use-case demo panel in the lower half, and two cursor badges
// (Sean teal-left, Emma pink-right) overlaying the middle. Positions below
// are absolute-pixel to match the Figma canvas.

import Image from "next/image";

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

function UseCaseTabRail() {
  // 8506:101872 — Use Cases label + 4 product tabs, first active
  const tabs = [
    { label: "Sheets Product", active: true },
    { label: "Documentation Product", active: false },
    { label: "Dashboards", active: false },
    { label: "Website Builder", active: false },
  ];
  return (
    <div
      className="flex items-center gap-6 w-full"
      style={{ background: "#1c1d21", padding: "6px 16px 4px" }}
    >
      <div className="flex items-center gap-2">
        <Image src="/images/home/icon-pointer.svg" alt="" width={16} height={16} aria-hidden="true" />
        <span
          className="font-firamono uppercase whitespace-nowrap"
          style={{ fontSize: 14, letterSpacing: "-0.03em", color: "#b4b1fa", lineHeight: 1.2 }}
        >
          Use Cases
        </span>
      </div>
      <div className="flex items-start gap-2">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className="rounded-lg px-3 py-2 flex items-center font-firamono uppercase whitespace-nowrap"
            style={{
              background: tab.active ? "rgba(255,255,255,0.08)" : "transparent",
              color: tab.active ? "#fff" : "rgba(255,255,255,0.52)",
              fontSize: 14,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function UseCaseDemo() {
  // 8506:101871 — 1280×660 panel at y=514 x=80
  return (
    <div
      className="absolute flex flex-col items-start"
      style={{
        top: 514,
        left: 80,
        width: 1280,
        background: "#1c1d21",
        border: "2px solid #1c1d21",
        borderRadius: 12,
      }}
    >
      {/* Blurred gradient accent bar — 8506:102928 */}
      <div
        className="absolute"
        style={{
          top: 26,
          left: -2,
          width: 1280,
          height: 26,
          filter: "blur(60px)",
          backgroundImage:
            "linear-gradient(90deg, rgb(159,159,159) 0%, rgb(45,125,255) 25%, rgb(197,93,245) 50%, rgb(45,125,255) 74.519%, rgb(159,159,159) 100%)",
        }}
      />
      <UseCaseTabRail />
      {/* 8506:101886 — black inner with 4px charcoal border */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 620,
          background: "#000",
          border: "4px solid #1c1d21",
          borderRadius: 12,
        }}
      />
      {/* 8506:101888 — bottom-right Live Demo + Github pill strip */}
      <div
        className="absolute flex items-center gap-3"
        style={{
          right: -2,
          bottom: -2,
          background: "#1c1d21",
          padding: 2,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
          <Image src="/images/home/icon-pointer-filled.svg" alt="" width={16} height={16} />
          <span
            className="font-firamono uppercase whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.52)", fontSize: 14, letterSpacing: "-0.03em", lineHeight: 1.2 }}
          >
            Live Demo
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
          <Image src="/images/home/icon-github.svg" alt="" width={16} height={16} />
          <span
            className="font-firamono uppercase whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.52)", fontSize: 14, letterSpacing: "-0.03em", lineHeight: 1.2 }}
          >
            Github
          </span>
        </div>
      </div>
      {/* 8506:101897 — bottom-left info icon */}
      <div
        className="absolute flex items-center"
        style={{
          left: -2,
          bottom: -2,
          background: "#1c1d21",
          padding: 2,
          borderTopRightRadius: 10,
        }}
      >
        <div className="flex items-center rounded-lg p-1.5">
          <Image src="/images/home/icon-info.svg" alt="" width={16} height={16} aria-label="More info" />
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
      className="relative w-full bg-black overflow-hidden"
      style={{ height: 1174 }}
    >
      {/* Pixel-grid animated background — Figma `grid-animation-gif`, 1440×740 */}
      <div
        className="absolute overflow-hidden"
        style={{ top: 0, left: 0, width: 1440, height: 534 }}
      >
        <Image
          src="/images/home/grid-animation.gif"
          alt=""
          width={1440}
          height={740}
          unoptimized
          priority
          style={{ objectFit: "cover", width: 1440, height: 740 }}
        />
      </div>
      {/* Radial-vignette overlay fading grid into black */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: 0,
          left: 0,
          width: 1440,
          height: 534,
          background:
            "radial-gradient(ellipse 1440px 534px at 50% 0%, rgba(0,0,0,0.7) 0%, #000 100%)",
        }}
      />

      <TitleBlock />
      <UseCaseDemo />
      <CursorSean />
      <CursorEmma />
    </section>
  );
}
