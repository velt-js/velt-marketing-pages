"use client";

// Preview clone of the live homepage, composed from vendored Unframer components.
// Source of truth: Framer MCP getNodeXml("zqFWsPM7N") captured 2026-04-19.
// Live URL: https://velt.dev  ·  Staging: https://own-music-950034.framer.app/
//
// The current production `/` still serves app/home-static.jsx. This preview at
// `/preview` lets us sanity-check visuals before swapping.

import "../../framer-components/styles.css";
import "../globals.css";

import { Bg } from "../../framer-components/_wrappers/Bg";
import { Nav } from "../../framer-components/_wrappers/Nav";
import { Button } from "../../framer-components/_wrappers/Button";
import { HomeInteractiveWindow } from "../../framer-components/_wrappers/HomeInteractiveWindow";
import { LogoGrid } from "../../framer-components/_wrappers/LogoGrid";
import { Benefits } from "../../framer-components/_wrappers/Benefits";
import { SectionTitle } from "../../framer-components/_wrappers/SectionTitle";
import { Features } from "../../framer-components/_wrappers/Features";
import { CustomerUi } from "../../framer-components/_wrappers/CustomerUi";
import { ThirdPartyApps } from "../../framer-components/_wrappers/ThirdPartyApps";
import { Testimonial } from "../../framer-components/_wrappers/Testimonial";
import { EnterpriseCards } from "../../framer-components/_wrappers/EnterpriseCards";
import { GetStartedSteps } from "../../framer-components/_wrappers/GetStartedSteps";
import { BetterWorkFooter } from "../../framer-components/_wrappers/BetterWorkFooter";
import { TestimonialsCards } from "../../framer-components/_wrappers/TestimonialsCards";

const CLI_CMD = "npx skills add velt-js/agent-skills";

export default function PreviewHomepage() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "rgb(0,0,0)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "clip",
      }}
    >
      {/* 1. Background band — absolute behind Nav+Hero */}
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          width: "100%",
          height: 436,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Bg />
      </div>

      {/* 2. Nav (sticky) */}
      <div style={{ position: "sticky", top: 0, width: "100%", zIndex: 10 }}>
        <Nav />
      </div>

      {/* 3. Hero — hand-written */}
      <section
        style={{
          width: "100%",
          maxWidth: 1280,
          padding: "80px 52px 0 52px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 650,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start", width: "100%" }}>
            <h1
              style={{
                fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
                fontWeight: 700,
                fontSize: 64,
                lineHeight: "110%",
                letterSpacing: "-0.03em",
                margin: 0,
                color: "rgb(255,255,255)",
              }}
            >
              The Complete Collaboration Toolkit
            </h1>
            <p
              style={{
                fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
                fontWeight: 500,
                fontSize: 18,
                lineHeight: "140%",
                margin: 0,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Add features like contextual Comments, Notifications, Recordings, Multiplayer editing &amp; Huddles to your product.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "fit-content" }}>
            <div style={{ display: "flex", flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center" }}>
              <Button label="Book Demo" href="/book-demo" variant="secondary" />
              <Button label="Get Free API Key" href="https://console.velt.dev/" variant="primary" withIcon newTab />
            </div>

            {/* Native CLI snippet row (from Framer design) */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                padding: "8px 8px 8px 16px",
                borderRadius: 8,
                background: "rgba(12,12,14,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                minWidth: 420,
                justifyContent: "space-between",
              }}
            >
              <code
                style={{
                  fontFamily: '"Geist Mono","IBM Plex Mono","Menlo",monospace',
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#fff",
                  whiteSpace: "nowrap",
                }}
              >
                {CLI_CMD}
              </code>
              <button
                type="button"
                aria-label="Copy command"
                onClick={() => navigator.clipboard?.writeText(CLI_CMD)}
                style={{
                  width: 28,
                  height: 28,
                  border: "none",
                  background: "transparent",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive product window */}
      <section style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <HomeInteractiveWindow />
      </section>

      {/* 5. Logo wall */}
      <section style={{ width: "100%" }}>
        <LogoGrid
          headlineLine1="Used by modern SaaS teams "
          headlineLine2="building collaborative editors"
        />
      </section>

      {/* 6. Benefits */}
      <section style={{ width: "100%" }}>
        <Benefits />
      </section>

      {/* 7. Section title (intro to Features below) */}
      <section style={{ width: "100%", maxWidth: 1280, padding: "0 52px" }}>
        <SectionTitle
          title="Steal Features from Popular Products"
          subtitle="Our components have different modes to match your product needs"
          primaryLabel="View Examples"
          primaryHref="/examples"
          secondaryLabel="View Docs"
          secondaryHref="https://docs.velt.dev/"
          showSublabel={false}
        />
      </section>

      {/* 8. Features section (with its own title) */}
      <section style={{ width: "100%", maxWidth: 1280, padding: "0 52px" }}>
        <SectionTitle
          title="Collaborative Features for Any Scenario"
          subtitle="A full suite of features that let your users collaborate and drive engagement"
          primaryLabel="Get Free API Key"
          primaryHref="https://console.velt.dev/"
          secondaryLabel="View Docs"
          secondaryHref="https://docs.velt.dev/"
        />
        <Features />
      </section>

      {/* 9. Customer UI examples */}
      <section style={{ width: "100%" }}>
        <CustomerUi />
      </section>

      {/* 10. 3rd Party Apps */}
      <section
        style={{
          width: "100%",
          maxWidth: 1280,
          padding: "0 52px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        <SectionTitle
          title="Connect Velt with 3rd Party Apps"
          subtitle="Velt connects with other services in your product workflow"
          primaryLabel="Book Demo"
          primaryHref="/book-demo"
          secondaryLabel="View Docs"
          secondaryHref="https://docs.velt.dev/webhooks/advanced"
        />
        <div style={{ width: "100%", maxWidth: 820, display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <ThirdPartyApps />
          <Testimonial
            name="Hope Callaway"
            title="Senior PM @Leadpages"
            quote="With Velt, Implementation took weeks, instead of the quarters it would have taken, even with 3 FTEs"
            paddingV="24px"
            paddingH="32px"
            style={{ maxWidth: 820 }}
          />
        </div>
      </section>

      {/* 11. Libraries — white background section
          XML structure (nodeId RlE6JZ5B_) couldn't be inspected via MCP
          (plugin disconnected). This section is a custom Framer group of library
          listings (editor / canvas / chart). Rendering SectionTitle only for now;
          the library grid itself is TODO and will be filled in after visual diff.
      */}
      <section
        style={{
          width: "100%",
          background: "rgba(255,255,255,1)",
          padding: "80px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 52,
        }}
      >
        <div style={{ width: "100%", maxWidth: 1280, padding: "0 52px" }}>
          <SectionTitle
            title="Works Seamlessly with Your Libraries"
            subtitle="We have 8+ custom integrations for popular libraries"
            primaryLabel="Book Demo"
            primaryHref="/book-demo"
            secondaryLabel=""
            hideSecondary
          />
        </div>
        <div style={{ padding: 32, color: "#555", fontFamily: "sans-serif", fontSize: 14, textAlign: "center" }}>
          [Libraries grid placeholder — to be populated after MCP plugin reconnect or by hand from XML lines 655–1362]
        </div>
      </section>

      {/* 12. Enterprise */}
      <section
        style={{
          width: "100%",
          maxWidth: 1280,
          padding: "0 52px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        <SectionTitle
          title="Enterprise-Grade Security"
          subtitle="Security and privacy features that enterprise companies need"
          primaryLabel="Book Demo"
          primaryHref="/book-demo"
          secondaryLabel="View Trust Center"
          secondaryHref="https://trust.velt.dev/"
        />
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <EnterpriseCards />
          <Testimonial
            name="Yuri Kleban"
            title="Senior PM @Google"
            quote="Velt gave great 1 on 1 support, added features fast, and offered highly customizable components."
          />
        </div>
      </section>

      {/* 13. "Our Customers Trust Us" section (dark, white text) */}
      <section style={{ width: "100%", maxWidth: 1280, padding: "0 52px" }}>
        <SectionTitle
          title="Our Customers Trust Us"
          subtitle=""
          primaryLabel="Get Free API Key"
          primaryHref="https://console.velt.dev/"
          secondaryLabel="View Customers"
          secondaryHref="/customers"
          textColor="rgb(255, 255, 255)"
          showSublabel={false}
        />
      </section>

      {/* 14. Get Started in 3 Steps */}
      <section
        style={{
          width: "100%",
          maxWidth: 1280,
          padding: "0 52px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        <SectionTitle
          title="Get Started in 3 Steps"
          subtitle="It takes less than 5 minutes to get basic collaboration up and running"
          primaryLabel="Get Free API Key"
          primaryHref="https://console.velt.dev/"
          secondaryLabel="View Docs"
          secondaryHref="https://docs.velt.dev/"
          textColor="rgb(255, 255, 255)"
        />
        <GetStartedSteps />
      </section>

      {/* 15. Footer */}
      <section style={{ width: "100%", maxWidth: 1280, padding: "0 52px" }}>
        <BetterWorkFooter />
      </section>

      {/* 16. Testimonials floater (rendered outside Desktop in XML; floats at bottom) */}
      <section style={{ width: "100%" }}>
        <TestimonialsCards />
      </section>
    </main>
  );
}
