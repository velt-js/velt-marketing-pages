// "Build your own UI with our APIs" — Figma node 294:24697.
// Mirrors the Card1ExtensiveApiCoverage pattern from
// components/feature/WebhooksAndApiHighlights.tsx: a single 32-radius
// outer card with overflow:hidden, a 528-tall white inner area
// (heading + subhead + View Docs at top:55, API endpoint pill at
// top:305) and a dark Linda Belcher testimonial banner attached at
// the bottom via padding-driven height.
//
// Reuses existing icon assets from /images/features/webhooks-and-api/
// (icon-tabler-book-2.svg, icon-polygon-11.svg) so no new downloads.

import Image from "next/image";

const LINDA = {
  name: "Linda Belcher",
  role: "Product Manager @HeyGen",
  avatarSrc: "/images/customization/sections/linda-avatar.png",
};

export function BuildYourOwnUICTA() {
  return (
    <section
      className="overflow-hidden"
      style={{
        width: "100%",
        background: "#fff",
        border: "2px solid #0e0d36",
        borderRadius: 32,
      }}
    >
      {/* White inner area — 528px tall on desktop, flow on mobile */}
      <div className="flex flex-col items-center gap-10 py-12 px-6 lg:relative lg:h-[528px] lg:gap-0 lg:py-0 lg:px-0">
        {/* Heading + subhead + View Docs CTA */}
        <div
          className="flex flex-col items-center lg:absolute"
          style={{
            top: 55,
            left: "50%",
            transform: "translateX(-50%)",
            gap: 32,
          }}
        >
          <div
            className="flex flex-col items-center text-center"
            style={{ gap: 12 }}
          >
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
              Build your own UI with our APIs
            </h2>
            <p
              className="font-urbanist"
              style={{
                fontSize: "clamp(16px, 1.5vw, 20px)",
                fontWeight: 400,
                lineHeight: 1.3,
                color: "#111",
                margin: 0,
              }}
            >
              Power your collaborative experiences with our backend
            </p>
          </div>
          <ViewDocsButton />
        </div>

        {/* API endpoint pill — mobile: flow; desktop: absolute at top:305 */}
        <div className="w-full overflow-x-auto lg:hidden">
          <ApiEndpointPillMobile />
        </div>
        <div className="hidden lg:block">
          <ApiEndpointPill />
        </div>
      </div>

      {/* Dark testimonial banner attached at the bottom */}
      <div
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 px-6 lg:px-[52px] py-8 lg:py-[40px]"
        style={{ background: "#1c1d21" }}
      >
        <div className="flex items-center" style={{ gap: 16, flexShrink: 0 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "2px solid #B4B1FA",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Image
              src={LINDA.avatarSrc}
              alt={LINDA.name}
              width={52}
              height={52}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col" style={{ gap: 4 }}>
            <p
              className="font-urbanist font-semibold"
              style={{
                color: "#fff",
                fontSize: 18,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              {LINDA.name}
            </p>
            <p
              className="font-urbanist"
              style={{
                color: "#fff",
                opacity: 0.52,
                fontSize: 16,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              {LINDA.role}
            </p>
          </div>
        </div>
        <p
          className="font-urbanist font-semibold"
          style={{
            color: "#fff",
            fontSize: "clamp(16px, 1.8vw, 24px)",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            maxWidth: 421,
            margin: 0,
          }}
        >
          Velt hosts all collaboration functionalities needed to{" "}
          <span style={{ color: "#b4b1fa" }}>boost engagement</span> at HeyGen
        </p>
      </div>
    </section>
  );
}

// "View Docs" CTA — 156×44, 2px indigo #3f12a1 border, 18×18 book icon,
// white-text-with-mix-blend-exclusion label.
function ViewDocsButton() {
  return (
    <a
      href="https://docs.velt.dev/api-reference"
      target="_blank"
      rel="noopener"
      className="flex items-center justify-center"
      style={{
        width: 156,
        height: 44,
        gap: 4,
        padding: "8px 16px",
        border: "2px solid #3f12a1",
        borderRadius: 8,
        textDecoration: "none",
      }}
    >
      <Image
        src="/images/features/webhooks-and-api/icon-tabler-book-2.svg"
        alt=""
        width={18}
        height={18}
        style={{ display: "block" }}
      />
      <span
        className="font-urbanist font-semibold whitespace-nowrap"
        style={{
          fontSize: 16,
          color: "#111",
          letterSpacing: "-0.48px",
          lineHeight: 1.2,
        }}
      >
        View Docs
      </span>
    </a>
  );
}

// Shared inner content for both pill variants.
function ApiEndpointPillContent() {
  return (
    <>
      <div
        className="flex items-center"
        style={{
          flex: "1 0 0",
          minWidth: 0,
          gap: 20,
          padding: 8,
          background: "#f3f3f3",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <span
          className="font-urbanist font-bold flex items-center justify-center whitespace-nowrap"
          style={{
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: "-0.56px",
            color: "#3064e3",
            background: "rgba(48,100,227,0.08)",
            padding: "8px 24px",
            borderRadius: 16,
            flexShrink: 0,
          }}
        >
          POST
        </span>
        <div
          className="flex items-start whitespace-nowrap"
          style={{
            gap: 8,
            fontFamily: "'Geist Mono', ui-monospace, monospace",
            fontWeight: 700,
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: "-0.56px",
            color: "#111",
            flexShrink: 0,
          }}
        >
          <span style={{ opacity: 0.32 }}>/</span>
          <span>v2</span>
          <span style={{ opacity: 0.32 }}>/</span>
          <span>comments</span>
          <span style={{ opacity: 0.32 }}>/</span>
          <span>add</span>
        </div>
      </div>

      <a
        href="https://docs.velt.dev/api-reference"
        target="_blank"
        rel="noopener"
        className="flex items-center"
        style={{
          gap: 20,
          padding: "16px 24px",
          background: "#3064e3",
          borderRadius: 16,
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <span
          className="whitespace-nowrap"
          style={{
            fontFamily: "'Geist Mono', ui-monospace, monospace",
            fontWeight: 700,
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: "-0.56px",
            color: "#fff",
          }}
        >
          Try It
        </span>
        <span
          className="flex items-center justify-center"
          style={{ width: 18, height: 18, transform: "rotate(90deg)" }}
        >
          <Image
            src="/images/features/webhooks-and-api/icon-polygon-11.svg"
            alt=""
            width={15.59}
            height={13.5}
            style={{ display: "block" }}
          />
        </span>
      </a>
    </>
  );
}

// Desktop: absolutely positioned at top:305 within the 528px container.
function ApiEndpointPill() {
  return (
    <div
      className="absolute flex items-center"
      style={{
        top: 305,
        left: "calc(50% - 15px)",
        transform: "translateX(-50%)",
        width: 856,
        gap: 8,
        padding: 8,
        background: "#fff",
        border: "2px solid rgba(0,0,0,0.04)",
        borderRadius: 24,
        filter: "drop-shadow(0 12px 12px rgba(0,0,0,0.08))",
      }}
    >
      <ApiEndpointPillContent />
    </div>
  );
}

// Mobile: flow-positioned, full width.
function ApiEndpointPillMobile() {
  return (
    <div
      className="flex items-center"
      style={{
        width: "100%",
        minWidth: 320,
        gap: 8,
        padding: 8,
        background: "#fff",
        border: "2px solid rgba(0,0,0,0.04)",
        borderRadius: 24,
        filter: "drop-shadow(0 12px 12px rgba(0,0,0,0.08))",
      }}
    >
      <ApiEndpointPillContent />
    </div>
  );
}
