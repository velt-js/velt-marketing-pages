"use client";

import "../../framer-components/styles.css";
// @ts-expect-error no types for generated Unframer JSX
import BgFramerComponent from "../../framer-components/2025/bg";
// @ts-expect-error no types for generated Unframer JSX
import FooterFramerComponent from "../../framer-components/2025/better-work-footer";

// Canonical unframer pattern (from unframer/README.md):
//   <Component.Responsive style={{width:'100%'}} /> or className='!w-full'
// to override the fixed width baked into the Framer component root.

export default function TestFramerPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "rgb(0,0,0)",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "436px", overflow: "hidden" }}>
        <h2 style={{ position: "absolute", top: 8, left: 8, zIndex: 10, fontSize: 14, margin: 0 }}>
          Pilot 1 — 2025/BG (.Responsive + style=100%)
        </h2>
        <BgFramerComponent.Responsive style={{ width: "100%", height: "436px" }} />
      </div>

      <div style={{ width: "100%" }}>
        <h2 style={{ padding: "16px 24px", fontSize: 14, margin: 0 }}>
          Pilot 2 — 2025/Better Work Footer (.Responsive + style=100%)
        </h2>
        <FooterFramerComponent.Responsive
          BLFfhcK3U="rgba(255,255,255,0)"
          ex5LyBkh4={false}
          style={{ width: "100%" }}
        />
      </div>
    </main>
  );
}
