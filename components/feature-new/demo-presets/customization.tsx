import type { CSSProperties, ReactElement, ReactNode } from "react";

import { AuditLog, AvatarStack, Chip, CursorTag, DarkPanel, NotifItem } from "../demos";

// Simulated-UI demo nodes for the static /customization page. Referenced
// directly by app/customization/content.tsx so the page renders fully without
// a CMS dependency. Visuals are simulated comment dialogs styled four ways
// (CSS theme, Wireframes, Primitives, Headless) plus per-card previews. No
// CSS files are added; all styles use existing --vlp-* tokens and inline styles.

const PANEL: CSSProperties = {
  border: "1px solid var(--vlp-border-default)",
  borderRadius: "var(--vlp-radius-xl)",
  background: "var(--vlp-bg-page)",
  boxShadow: "var(--vlp-shadow-sm)",
  overflow: "hidden",
  fontSize: 12,
};

const PANEL_HEAD: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 14px",
  background: "var(--vlp-bg-section-alt)",
  borderBottom: "1px solid var(--vlp-border-subtle)",
  fontSize: 11.5,
  fontWeight: 500,
  color: "var(--vlp-color-text-muted)",
};

const MONO: CSSProperties = {
  fontFamily: "var(--vlp-font-mono)",
  fontSize: 10.5,
  color: "var(--vlp-color-accent)",
};

type CommentDialogVariant = "css" | "wireframe" | "primitives" | "headless";

/**
 * A simulated comment dialog shown four ways across the presentation spectrum.
 * The `variant` prop changes styling, layout, or render approach to illustrate
 * each customization layer.
 * @param {{ variant: CommentDialogVariant; accent?: string }} props Variant and optional accent color.
 * @returns {JSX.Element} The comment dialog visual.
 */
function CommentDialog({ variant, accent = "var(--vlp-color-accent)" }: { variant: CommentDialogVariant; accent?: string }) {
  const base: CSSProperties = {
    border: "1px solid var(--vlp-border-default)",
    borderRadius: variant === "wireframe" ? 6 : 10,
    background: variant === "headless" ? "transparent" : "var(--vlp-bg-page)",
    overflow: "hidden",
    fontSize: 12,
    boxShadow: variant === "headless" ? "none" : "var(--vlp-shadow-sm)",
  };

  const headerBg =
    variant === "css"
      ? accent
      : variant === "wireframe"
      ? "var(--vlp-bg-section-alt)"
      : variant === "primitives"
      ? "#1e1e2e"
      : "var(--vlp-bg-section-alt)";

  const headerColor =
    variant === "css" || variant === "primitives" ? "#fff" : "var(--vlp-color-ink)";

  const composerBorder = variant === "css" ? `2px solid ${accent}` : "1px solid var(--vlp-border-default)";

  if (variant === "headless") {
    return (
      <div style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 11, color: "var(--vlp-color-ink-soft)", padding: "8px 0" }}>
        <p style={{ margin: "0 0 6px", color: "var(--vlp-color-text-muted)", fontSize: 10 }}>{"// headless: your UI, Velt data"}</p>
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ background: "var(--vlp-bg-section-alt)", borderRadius: 8, padding: "8px 10px", border: "1px solid var(--vlp-border-subtle)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontWeight: 700, color: "var(--vlp-color-ink)", fontFamily: "inherit" }}>annotations[0]</span>
              <Chip kind="pending">open</Chip>
            </div>
            <p style={{ margin: 0, color: "var(--vlp-color-text-muted)", fontSize: 10.5 }}>{"status: 'open', replies: 2"}</p>
          </div>
          <AvatarStack users={[{ initials: "JD", kind: "human" }, { initials: "AI", kind: "agent" }]} />
        </div>
      </div>
    );
  }

  return (
    <div style={base}>
      <div style={{ background: headerBg, color: headerColor, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11.5, fontWeight: 600 }}>
        {variant === "wireframe" ? (
          <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10.5 }}>{"<slot: header>"} <span style={{ opacity: 0.5 }}>2 comments</span></span>
        ) : variant === "primitives" ? (
          <span>Feedback <span style={{ opacity: 0.6, fontWeight: 400, fontSize: 11 }}>(MUI card)</span></span>
        ) : (
          <span>Comments <span style={{ opacity: 0.7, fontWeight: 400 }}>2</span></span>
        )}
        <AvatarStack users={[{ initials: "JD", kind: "human" }, { initials: "AI", kind: "agent" }]} style={{ gap: 0 }} />
      </div>

      <div style={{ padding: "10px 12px", display: "grid", gap: 8 }}>
        <div style={{ padding: "8px 10px", borderRadius: 7, background: "var(--vlp-bg-section-alt)", border: "1px solid var(--vlp-border-subtle)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontWeight: 600, fontSize: 11.5, color: "var(--vlp-color-ink)" }}>Brand Agent</span>
            <Chip kind="agent">agent</Chip>
          </div>
          <p style={{ margin: 0, fontSize: 11.5, color: "var(--vlp-color-ink-soft)", lineHeight: 1.4 }}>Pricing claim needs a source.</p>
          <div style={{ display: "flex", gap: 6, marginTop: 7 }}>
            <span style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 5, background: accent, color: "#fff", fontWeight: 600 }}>Approve</span>
            <span style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 5, background: "var(--vlp-border-default)", color: "var(--vlp-color-ink-soft)" }}>Reject</span>
          </div>
        </div>

        <div style={{ padding: "7px 10px", borderRadius: 7, border: "1px solid var(--vlp-border-subtle)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
            <span style={{ fontWeight: 600, fontSize: 11.5, color: "var(--vlp-color-ink)" }}>Maya</span>
            <span style={{ fontSize: 10.5, color: "var(--vlp-color-text-muted)" }}>2m</span>
          </div>
          <p style={{ margin: 0, fontSize: 11.5, color: "var(--vlp-color-ink-soft)" }}>Source added to the doc.</p>
        </div>

        <div style={{ display: "flex", gap: 6, padding: "6px 8px", borderRadius: 7, border: composerBorder, background: "var(--vlp-bg-page)" }}>
          <span style={{ flex: 1, fontSize: 11.5, color: "var(--vlp-color-text-subtle)" }}>Reply...</span>
          <span style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 5, background: accent, color: "#fff", fontWeight: 600 }}>Send</span>
        </div>
      </div>
    </div>
  );
}

/**
 * A small "before/after" split showing the Velt default dialog beside a
 * restyled one. Used for the what-it-is mixed scene.
 * @returns {JSX.Element} The mixed scene visual.
 */
export function WhatItIsScene(): ReactElement {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div>
        <p className="code-microcopy" style={{ marginBottom: 6 }}>Velt default</p>
        <CommentDialog variant="css" accent="var(--vlp-color-ink)" />
      </div>
      <div>
        <p className="code-microcopy" style={{ marginBottom: 6 }}>your design system</p>
        <CommentDialog variant="css" accent="var(--vlp-color-accent)" />
      </div>
    </div>
  );
}

// Keyed lookup the content module reads from. Keys are local to this page.
export const CUSTOMIZATION_DEMOS: Record<string, ReactNode> = {
  // Hero tabs: same comment dialog, four layers
  "hero/css": (
    <div style={{ display: "grid", gap: 10 }}>
      <CommentDialog variant="css" accent="#4f46e5" />
      <p className="code-microcopy">--velt-primary: #4f46e5 applied, shadow DOM optional</p>
    </div>
  ),
  "hero/wireframes": (
    <div style={{ display: "grid", gap: 10 }}>
      <CommentDialog variant="wireframe" />
      <p className="code-microcopy">{"<VeltCommentDialogWireframe> with your header slot"}</p>
    </div>
  ),
  "hero/primitives": (
    <div style={{ display: "grid", gap: 10 }}>
      <CommentDialog variant="primitives" />
      <p className="code-microcopy">{"<VeltCommentDialog> wrapped in MUI card"}</p>
    </div>
  ),
  "hero/headless": (
    <div style={{ display: "grid", gap: 10 }}>
      <CommentDialog variant="headless" />
      <p className="code-microcopy">useCommentAnnotations(), your render</p>
    </div>
  ),

  // What it is: before/after mixed scene
  "what-it-is/scene": <WhatItIsScene />,

  // Showcase card previews
  "showcase/css-theming": (
    <div className="pv">
      <CommentDialog variant="css" accent="#4f46e5" />
    </div>
  ),
  "showcase/wireframes": (
    <div className="pv">
      <CommentDialog variant="wireframe" />
    </div>
  ),
  "showcase/primitives": (
    <div className="pv">
      <CommentDialog variant="primitives" />
    </div>
  ),
  "showcase/headless": (
    <div className="pv">
      <CommentDialog variant="headless" />
    </div>
  ),
  "showcase/mix": (
    <div className="pv" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      <div>
        <p className="code-microcopy" style={{ marginBottom: 4 }}>dialog: wireframe</p>
        <CommentDialog variant="wireframe" />
      </div>
      <div>
        <p className="code-microcopy" style={{ marginBottom: 4 }}>sidebar: primitive</p>
        <div style={{ ...PANEL }}>
          <div style={PANEL_HEAD}>
            <span>Sidebar</span>
            <span style={MONO}>primitive</span>
          </div>
          <div style={{ padding: 10 }}>
            <NotifItem
              avatar={{ initials: "AI", kind: "agent" }}
              title={<><strong>Brand Agent</strong> flagged pricing</>}
              chip={{ label: "agent", kind: "agent" }}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  "showcase/custom-data": (
    <div className="pv">
      <div style={{ ...PANEL }}>
        <div style={PANEL_HEAD}>
          <span>Thread with your data</span>
          <span style={MONO}>VeltData</span>
        </div>
        <div style={{ padding: 10, display: "grid", gap: 6 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Chip kind="pending">in-review</Chip>
            <span style={{ fontSize: 11, color: "var(--vlp-color-text-muted)" }}>comment.status</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--vlp-color-accent)" }}>#brand-review</span>
            <span style={{ fontSize: 11, color: "var(--vlp-color-text-muted)" }}>custom.channel</span>
          </div>
        </div>
      </div>
    </div>
  ),
  "showcase/conditional": (
    <div className="pv" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      <div>
        <p className="code-microcopy" style={{ marginBottom: 4 }}>reviewer</p>
        <div style={{ padding: 8, border: "1px solid var(--vlp-border-default)", borderRadius: 8 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 5, background: "var(--vlp-color-accent)", color: "#fff", fontWeight: 600 }}>Approve</span>
            <span style={{ fontSize: 10.5, padding: "3px 8px", borderRadius: 5, background: "var(--vlp-border-default)", color: "var(--vlp-color-ink-soft)" }}>Reject</span>
          </div>
        </div>
      </div>
      <div>
        <p className="code-microcopy" style={{ marginBottom: 4 }}>viewer</p>
        <div style={{ padding: 8, border: "1px solid var(--vlp-border-default)", borderRadius: 8 }}>
          <span style={{ fontSize: 11, color: "var(--vlp-color-text-subtle)" }}>read only</span>
        </div>
      </div>
    </div>
  ),
  "showcase/variants": (
    <div className="pv" style={{ display: "grid", gap: 6 }}>
      {(["compact", "full", "inline"] as const).map((variantName, index) => (
        <div
          key={variantName}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "7px 10px",
            borderRadius: 7,
            border: index === 1 ? "1.5px solid var(--vlp-color-accent)" : "1px solid var(--vlp-border-subtle)",
            background: index === 1 ? "var(--vlp-bg-section-alt)" : "var(--vlp-bg-page)",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: index === 1 ? 600 : 400, color: "var(--vlp-color-ink)" }}>{variantName}</span>
          {index === 1 ? <Chip kind="approved">active</Chip> : <span style={{ fontSize: 10.5, color: "var(--vlp-color-text-subtle)" }}>variant</span>}
        </div>
      ))}
    </div>
  ),
  "showcase/extend-behavior": (
    <div className="pv">
      <AuditLog
        head={{ left: "Event log", right: ".on() live" }}
        rows={[
          { ts: "now", ev: <><strong>commentClick</strong> fired</>, chip: { label: "evt", kind: "approved" } },
          { ts: "now", ev: <><strong>POST /v2/comments/add</strong></>, chip: { label: "200", kind: "approved" } },
        ]}
      />
    </div>
  ),
  "showcase/design-to-code": (
    <div className="pv">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ ...PANEL, opacity: 0.75 }}>
          <div style={PANEL_HEAD}>Figma frame</div>
          <div style={{ padding: 10 }}>
            <div style={{ height: 40, borderRadius: 5, background: "var(--vlp-bg-section-alt)", marginBottom: 6 }} />
            <div style={{ height: 20, borderRadius: 5, background: "var(--vlp-border-subtle)" }} />
          </div>
        </div>
        <div>
          <CommentDialog variant="wireframe" />
          <p className="code-microcopy" style={{ marginTop: 4 }}>Wireframes + CSS</p>
        </div>
      </div>
    </div>
  ),

  // Make it yours cards
  "make-it-yours/design-tools": (
    <div className="pv">
      <div style={{ ...PANEL }}>
        <div style={PANEL_HEAD}>
          <span>Themes Playground</span>
          <span style={MONO}>playground.velt.dev</span>
        </div>
        <div style={{ padding: 10 }}>
          <div style={{ display: "grid", gap: 6 }}>
            {(["--velt-primary", "--velt-radius", "--velt-font"] as const).map((varName) => (
              <div key={varName} style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                <span style={{ fontFamily: "var(--vlp-font-mono)", color: "var(--vlp-color-ink-soft)" }}>{varName}</span>
                <span style={{ color: "var(--vlp-color-accent)" }}>edit</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  "make-it-yours/component-system": (
    <div className="pv">
      <div style={{ display: "grid", gap: 5 }}>
        {(["CSS variables", "Wireframes", "Primitives", "Headless hooks", "Events + APIs", "Dark mode"] as const).map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 8px",
              borderRadius: 6,
              background: "var(--vlp-bg-section-alt)",
              fontSize: 11.5,
              color: "var(--vlp-color-ink)",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--vlp-color-accent)", flex: "none" }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  ),

  // Gallery item visuals
  "gallery/canvas": (
    <div style={{ position: "relative", height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CursorTag name="Maya" kind="approved" style={{ position: "absolute", top: 8, left: 16 }} />
      <CursorTag name="AI" kind="agent" style={{ position: "absolute", bottom: 10, right: 12 }} />
      <Chip kind="pending">1 comment</Chip>
    </div>
  ),
  "gallery/cell": (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, padding: "8px 0" }}>
      {[["Q1", "Q2", "Q3"], ["$12k", "$15k", "$18k"], ["", "", ""]].flat().map((cell, index) => (
        <div
          key={index}
          style={{
            padding: "5px 6px",
            border: "1px solid var(--vlp-border-subtle)",
            fontSize: 11,
            textAlign: "center",
            background: index === 5 ? "rgba(255, 79, 0, 0.08)" : "var(--vlp-bg-page)",
            color: "var(--vlp-color-ink)",
            position: "relative",
          }}
        >
          {cell}
          {index === 5 ? <span style={{ position: "absolute", top: 1, right: 1, width: 6, height: 6, borderRadius: "50%", background: "var(--vlp-color-accent)" }} /> : null}
        </div>
      ))}
    </div>
  ),
  "gallery/video": (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "6px 0" }}>
      <div style={{ height: 40, borderRadius: 6, background: "var(--vlp-bg-section-alt)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "30%", bottom: 0, width: 2, background: "var(--vlp-color-accent)", opacity: 0.8 }} />
        <Chip kind="pending" key="pin">pin at 0:42</Chip>
      </div>
      <p className="code-microcopy">frame-accurate pin on the timeline</p>
    </div>
  ),
  "gallery/coediting": (
    <div style={{ padding: "6px 0" }}>
      <AvatarStack
        users={[
          { initials: "JD", kind: "human", name: "Jordan" },
          { initials: "AI", kind: "agent", name: "Brand Agent" },
          { initials: "SA", kind: "human", name: "Sara" },
        ]}
        overflow={2}
      />
      <p className="code-microcopy" style={{ marginTop: 6 }}>three editors + 2 more, one doc</p>
    </div>
  ),
  "gallery/huddles": (
    <div style={{ display: "grid", gap: 6 }}>
      <NotifItem
        avatar={{ initials: "JD", kind: "human" }}
        title={<><strong>Jordan</strong> started a huddle</>}
        meta="2 participants"
        chip={{ label: "live", kind: "approved" }}
      />
    </div>
  ),
  "gallery/presence": (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "4px 0" }}>
      <AvatarStack users={[{ initials: "JD" }, { initials: "AI", kind: "agent" }, { initials: "SA" }]} overflow={1} />
      <div style={{ display: "flex", gap: 8 }}>
        <CursorTag name="Jordan" />
        <CursorTag name="AI" kind="agent" />
      </div>
    </div>
  ),
  "gallery/notifications": (
    <div style={{ display: "grid", gap: 0 }}>
      <NotifItem
        avatar={{ initials: "AI", kind: "agent" }}
        title={<><strong>Brand Agent</strong> flagged a claim</>}
        meta="needs review"
        actions
      />
      <NotifItem
        avatar={{ initials: "SA", kind: "human" }}
        title={<><strong>Sara</strong> approved the change</>}
        chip={{ label: "approved", kind: "approved" }}
      />
    </div>
  ),

  // Related section visuals
  "related/comments": (
    <div className="pv">
      <CommentDialog variant="css" accent="var(--vlp-color-accent)" />
    </div>
  ),
  "related/notifications": (
    <div className="pv">
      <NotifItem
        avatar={{ initials: "AI", kind: "agent" }}
        title={<><strong>Brand Agent</strong> flagged pricing</>}
        meta="needs review"
        chip={{ label: "agent", kind: "agent" }}
      />
    </div>
  ),
  "related/presence": (
    <div className="pv">
      <AvatarStack users={[{ initials: "JD" }, { initials: "AI", kind: "agent" }]} overflow={2} />
    </div>
  ),
  "related/webhooks": (
    <div className="pv">
      <DarkPanel>{"event: comment.added\nPOST /v2/comments/add → 200 OK"}</DarkPanel>
    </div>
  ),
};
