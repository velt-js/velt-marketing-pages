"use client";

// Hand-composed hero for the homepage. Owns the cursor-presence bubbles,
// headline + sub-copy, primary/secondary CTA row, and the CLI snippet.
// The /generated page emits this via TAG_COMPONENT_MAP in generate-page.mjs —
// the XML's <Hero> tag maps to this file instead of being traversed.

import { Button } from "../_wrappers/Button";

const CLI_CMD = "npx skills add velt-js/agent-skills";

const SEAN_COLOR = "#3ECBB4";
const EMMA_COLOR = "#E762AF";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1440,
        padding: "80px 52px 0 52px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        zIndex: 1,
      }}
    >
      <CursorBadge
        name="Sean"
        color={SEAN_COLOR}
        style={{ top: "46%", left: "12%" }}
      />
      <CursorBadge
        name="Emma"
        color={EMMA_COLOR}
        style={{ top: "62%", right: "12%" }}
        flip
      />

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "center",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
              fontWeight: 700,
              fontSize: 64,
              lineHeight: "110%",
              letterSpacing: "-0.03em",
              margin: 0,
              color: "rgb(255,255,255)",
              textAlign: "center",
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
              textAlign: "center",
            }}
          >
            Add features like contextual Comments, Notifications, Recordings,
            Multiplayer editing &amp; Huddles to your product.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "fit-content",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button label="Book Demo" href="/book-demo" variant="secondary" />
            <Button
              label="Get Free API Key"
              href="https://console.velt.dev/"
              variant="primary"
              withIcon
              newTab
            />
          </div>

          <CliSnippet command={CLI_CMD} />
        </div>
      </div>
    </section>
  );
}

// `flip` mirrors the cursor+label so the pointer sits to the right (used for
// Emma on the right-hand side of the hero).
function CursorBadge({
  name,
  color,
  flip = false,
  style,
}: {
  name: string;
  color: string;
  flip?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 2,
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    >
      <CursorArrow color={color} />
      <span
        style={{
          transform: flip ? "translate(-4px, 8px) scaleX(-1)" : "translate(-4px, 8px)",
          padding: "2px 8px",
          background: color,
          color: "#0E1116",
          borderRadius: 999,
          fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
          fontWeight: 600,
          fontSize: 13,
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        {name}
      </span>
    </div>
  );
}

function CursorArrow({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))" }}
    >
      <path
        d="M2 1.5 L18 11 L10.5 12.5 L14 20 L11 21 L7.5 13.5 L2 17 Z"
        fill={color}
        stroke="#0E1116"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CliSnippet({ command }: { command: string }) {
  return (
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
        {command}
      </code>
      <button
        type="button"
        aria-label="Copy command"
        onClick={() => navigator.clipboard?.writeText(command)}
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
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>
    </div>
  );
}
