import type { CSSProperties, ReactNode } from "react";

import {
  Frame,
  AgentFindingCard,
  Composer,
  FACES,
} from "@/components/feature-new/demo-presets/hero-surface";
import { CoEditingHero } from "@/components/feature-new/demo-presets/multiplayer-editing";

// Contextual hero visuals for the integrations spokes. The review layer (the
// brand-agent finding + composer) stays constant, but the SURFACE behind it is
// drawn to match the category: a line of editor text, a contract clause, a
// spreadsheet cell, a canvas node, or a chart slice. Reuses the canonical
// feature-new atoms (Frame, AgentFindingCard, Composer) so it reads identically
// to the rest of the site. Visuals are simulated, not live SDK instances.

const PRESENCE = [
  { initials: "AG", agent: true },
  { initials: "MS", img: FACES.fenne },
  { initials: "JM", img: FACES.jeff },
];

const INK = "var(--vlp-color-text)";
const MUTED = "var(--vlp-color-text-muted)";
const ACCENT = "var(--vlp-color-accent)";
const ACCENT_BG = "var(--vlp-bg-accent-subtle)";

const surfaceStyle: CSSProperties = {
  border: "1px solid var(--vlp-border-card)",
  borderRadius: 10,
  padding: 14,
  background: "var(--vlp-color-white)",
  marginBottom: 12,
};

const markStyle: CSSProperties = {
  background: ACCENT_BG,
  borderRadius: 4,
  padding: "1px 4px",
  boxDecorationBreak: "clone",
  WebkitBoxDecorationBreak: "clone",
};

/** @returns {JSX.Element} A line of editor text with the commented span marked. */
function TextSurface() {
  return (
    <div style={surfaceStyle}>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: INK }}>
        Velt is <span style={markStyle}>our best-in-class platform</span> for
        teams shipping AI-native products.
      </p>
    </div>
  );
}

/** @returns {JSX.Element} A contract clause with the redlined span marked. */
function DocSurface() {
  return (
    <div style={surfaceStyle}>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: INK }}>
        7.2 The Provider shall{" "}
        <span style={markStyle}>indemnify and hold harmless</span> the Client
        against all claims arising from the Services.
      </p>
    </div>
  );
}

/** @returns {JSX.Element} A small spreadsheet with one outlier cell flagged. */
function GridSurface() {
  const head = ["", "Q2", "Q3", "Q4"];
  const rows = [
    ["Revenue", "1.3M", "1.42M", "1.5M"],
    ["Margin", "38%", "41%", "44%"],
  ];
  const cell: CSSProperties = {
    padding: "7px 10px",
    fontSize: 13,
    color: INK,
    borderBottom: "1px solid var(--vlp-border-faint)",
    textAlign: "right",
  };
  return (
    <div style={{ ...surfaceStyle, padding: 0, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {head.map((label) => (
              <th
                key={label || "metric"}
                style={{
                  ...cell,
                  textAlign: label ? "right" : "left",
                  color: MUTED,
                  fontWeight: 600,
                  background: "var(--vlp-bg-section-alt)",
                }}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((value, index) => {
                const flagged = row[0] === "Revenue" && index === 2;
                return (
                  <td
                    key={index}
                    style={{
                      ...cell,
                      textAlign: index === 0 ? "left" : "right",
                      fontWeight: index === 0 ? 600 : 400,
                      color: flagged ? ACCENT : INK,
                      background: flagged ? ACCENT_BG : "transparent",
                      outline: flagged ? `1px solid ${ACCENT}` : "none",
                    }}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** @returns {JSX.Element} An approval flow on a canvas with one node flagged. */
function CanvasSurface() {
  const node = (label: string, flagged?: boolean) => (
    <div
      style={{
        border: `1px solid ${flagged ? ACCENT : "var(--vlp-border-default)"}`,
        background: flagged ? ACCENT_BG : "var(--vlp-color-white)",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 13,
        fontWeight: 600,
        color: flagged ? ACCENT : INK,
      }}
    >
      {label}
    </div>
  );
  return (
    <div
      style={{
        ...surfaceStyle,
        display: "flex",
        alignItems: "center",
        gap: 8,
        justifyContent: "center",
      }}
    >
      {node("Draft")}
      <span style={{ color: MUTED }}>&rarr;</span>
      {node("Review", true)}
      <span style={{ color: MUTED }}>&rarr;</span>
      {node("Publish")}
    </div>
  );
}

/** @returns {JSX.Element} A donut chart with the flagged slice in accent. */
function ChartSurface() {
  return (
    <div
      style={{ ...surfaceStyle, display: "flex", alignItems: "center", gap: 16 }}
    >
      <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
        <g transform="rotate(-90 42 42)">
          <circle cx="42" cy="42" r="32" fill="none" stroke="var(--vlp-border-subtle)" strokeWidth="13" />
          <circle cx="42" cy="42" r="32" fill="none" stroke="var(--vlp-color-ink-soft)" strokeWidth="13" strokeDasharray="70 201" strokeDashoffset="-80" />
          <circle cx="42" cy="42" r="32" fill="none" stroke={ACCENT} strokeWidth="13" strokeDasharray="80 201" strokeDashoffset="0" />
        </g>
      </svg>
      <div style={{ fontSize: 13, color: MUTED }}>
        <div style={{ fontWeight: 600, color: INK, marginBottom: 2 }}>
          Q3 share
        </div>
        <div style={{ color: ACCENT, fontWeight: 600 }}>40% &middot; flagged</div>
      </div>
    </div>
  );
}

type CategoryArtifact = {
  surface: ReactNode;
  body: ReactNode;
  delText?: string;
  insText?: string;
};

/**
 * Pick the contextual surface mock + finding copy for a category.
 * @param {string} category The integrationLibrary category.
 * @returns {CategoryArtifact} The surface node, finding body, and optional diff.
 */
function artifactFor(category: string): CategoryArtifact {
  switch (category) {
    case "grids-tables":
      return {
        surface: <GridSurface />,
        body: <>Flagged the Q3 revenue cell as an outlier and suggested the correction.</>,
        delText: "1.42M",
        insText: "1.24M",
      };
    case "charts-dataviz":
      return {
        surface: <ChartSurface />,
        body: <>Annotated the Q3 spike and proposed a caption for the report.</>,
      };
    case "canvas-diagram":
      return {
        surface: <CanvasSurface />,
        body: <>Suggested an approval node before publish, pinned to the canvas.</>,
      };
    case "documents-pdf":
      return {
        surface: <DocSurface />,
        body: <>Flagged a missing liability cap on the clause and suggested a redline.</>,
        delText: "indemnify and hold harmless",
        insText: "indemnify, subject to a liability cap",
      };
    case "text-code-editors":
    default:
      return {
        surface: <TextSurface />,
        body: <>Flagged an off-message line and suggested a rewrite, pinned to the element.</>,
        delText: "our best-in-class platform",
        insText: "the review layer your users approve",
      };
  }
}

/**
 * Hero visual for a single integration spoke. Surfaces draw context per
 * category; plugins/agents get a generic framed finding.
 * @param {string} name The surface/tool name, e.g. "Tiptap".
 * @param {string} kind The spoke kind ("surface" | "plugin" | "agent").
 * @param {string} category The integrationLibrary category.
 * @returns {ReactNode} The hero demo node.
 */
export function buildSpokeHeroVisual(
  name: string,
  kind: string,
  category: string,
): ReactNode {
  try {
    if (kind === "plugin" || kind === "agent") {
      return (
        <Frame
          app="Velt"
          crumb={name}
          users={[{ initials: "AG", agent: true }, { initials: "JM", img: FACES.jeff }]}
        >
          <AgentFindingCard
            name={`${name} agent`}
            time="now"
            body={
              <>
                Wired Velt&apos;s review layer into your app, comments,
                co-editing, and agent suggestions a human approves.
              </>
            }
            replies={1}
          />
          <Composer placeholder="Reply…" />
        </Frame>
      );
    }

    // Editor surfaces (Tiptap, Lexical, BlockNote, …) showcase live co-editing —
    // the multiplayer story is the headline integration, so reuse the shared
    // co-editing artifact with the editor's own name in the file crumb.
    if (category === "text-code-editors") {
      return <CoEditingHero editorName={name} />;
    }

    const { surface, body, delText, insText } = artifactFor(category);
    return (
      <Frame app={name} crumb="Shared with your team" users={PRESENCE}>
        {surface}
        <AgentFindingCard
          name="Brand Agent"
          time="now"
          body={body}
          delText={delText}
          insText={insText}
          replies={2}
        />
        <Composer placeholder={`Reply in ${name}…`} />
      </Frame>
    );
  } catch (error) {
    console.error("buildSpokeHeroVisual failed", error);
    return null;
  }
}

/**
 * Hero visual for the hub. Defaults to a Tiptap text-editor surface, the same
 * surface the live demo opens on.
 * @returns {ReactNode} The hub hero demo node.
 */
export function buildHubHeroVisual(): ReactNode {
  return buildSpokeHeroVisual("Tiptap", "surface", "text-code-editors");
}
