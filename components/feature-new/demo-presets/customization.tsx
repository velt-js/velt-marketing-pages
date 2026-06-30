import type { CSSProperties, ReactElement, ReactNode } from "react";

import { AuditLog, Chip, CursorTag, DarkPanel } from "../demos";
import {
  AgentFindingCard,
  Av,
  Composer,
  FACES,
  Frame,
  IconBubble,
  IconReply,
} from "./hero-surface";

// Simulated-UI demo nodes for the static /customization page. Referenced
// directly by app/customization/content.tsx so the page renders fully without
// a CMS dependency. Visuals reuse the shared product-surface toolkit
// (hero-surface.tsx) so the comment UI here matches the comments + home pages:
// real headshot avatars, the agent finding card, a live composer, framed
// surfaces. Each of the four presentation layers (CSS, Wireframes, Primitives,
// Headless) restyles the SAME thread to show how far customization goes.

// Personas mapped to the shared headshots (fenne/hope read as women).
const FACE = {
  maya: FACES.fenne,
  sarah: FACES.hope,
  jordan: FACES.ethan,
  you: FACES.jeff,
} as const;

const BRAND = "#4f46e5";

/**
 * Set the local accent token so descendants (composer send, mentions, pins)
 * pick up a brand color, illustrating CSS-variable theming.
 * @param {string} color The accent color to apply.
 * @returns {CSSProperties} A style object overriding --vlp-color-accent.
 */
function accentVar(color: string): CSSProperties {
  return { ["--vlp-color-accent"]: color } as CSSProperties;
}

/**
 * A human comment bubble built from the shared .cmh-cmt classes (real headshot
 * avatar, name, time, body, optional reply count). Mirrors the comments page.
 * @param {{ name: string; initials: string; time: string; img: string; body: ReactNode; replies?: number; end?: boolean }} props Comment content.
 * @returns {JSX.Element} The comment bubble.
 */
function HumanComment({
  name,
  initials,
  time,
  img,
  body,
  replies,
  end,
}: {
  name: string;
  initials: string;
  time: string;
  img: string;
  body: ReactNode;
  replies?: number;
  end?: boolean;
}) {
  return (
    <div className={`cmh-cmt${end ? " cmh-cmt-end" : ""}`}>
      <Av initials={initials} tone="a2" img={img} />
      <div className="cmh-cmt-main">
        <div className="cmh-cmt-head">
          <span className="cmh-cmt-name">{name}</span>
          <span className="cmh-cmt-time">{time}</span>
        </div>
        <p className="cmh-cmt-body">{body}</p>
        {typeof replies === "number" ? (
          <span className="cmh-cmt-replies"><IconReply />{replies} {replies === 1 ? "Reply" : "Replies"}</span>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The shared review thread (agent finding + human reply + composer) that every
 * presentation layer restyles. The accent override demonstrates CSS theming.
 * @param {{ accent?: string; actions?: boolean }} props Optional brand accent and whether the agent card shows actions.
 * @returns {JSX.Element} The thread.
 */
function Thread({ accent, actions = true }: { accent?: string; actions?: boolean }) {
  return (
    <div style={{ display: "grid", gap: 12, ...(accent ? accentVar(accent) : null) }}>
      <AgentFindingCard
        name="Brand Agent"
        time="2m"
        body="This pricing claim needs a source before it ships."
        replies={2}
        actions={actions}
      />
      <HumanComment name="Maya" initials="MA" time="1m" img={FACE.maya} body="Source added to the doc." end />
      <Composer placeholder="Reply to Maya…" you={FACE.you} />
    </div>
  );
}

// Dashed "slot" wrapper for the Wireframes layer: your HTML structure, with
// Velt keeping behavior and data wiring inside each slot.
const SLOT: CSSProperties = {
  border: "1.5px dashed var(--vlp-border-strong, rgba(0,0,0,0.22))",
  borderRadius: 10,
  padding: "14px 12px 12px",
  position: "relative",
};
const SLOT_LABEL: CSSProperties = {
  position: "absolute",
  top: -9,
  left: 12,
  padding: "0 6px",
  background: "var(--vlp-bg-page)",
  fontFamily: "var(--vlp-font-mono)",
  fontSize: 10,
  letterSpacing: "0.02em",
  color: "var(--vlp-color-text-subtle)",
};

/**
 * A labeled wireframe slot wrapping real Velt content.
 * @param {{ label: string; children: ReactNode }} props Slot label and content.
 * @returns {JSX.Element} The slot.
 */
function Slot({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={SLOT}>
      <span style={SLOT_LABEL}>{label}</span>
      {children}
    </div>
  );
}

// "Your component library" chrome for the Primitives layer.
const YOUR_CARD: CSSProperties = {
  border: "1px solid var(--vlp-border-default)",
  borderRadius: 14,
  background: "var(--vlp-bg-page)",
  boxShadow: "var(--vlp-shadow-sm)",
  overflow: "hidden",
};
const YOUR_TAG: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 12px",
  borderBottom: "1px solid var(--vlp-border-subtle)",
  background: "var(--vlp-bg-section-alt)",
  fontFamily: "var(--vlp-font-mono)",
  fontSize: 10.5,
  color: "var(--vlp-color-text-muted)",
};

/**
 * One framed presentation layer for the hero tabs: a real product breadcrumb,
 * live presence, then the supplied body.
 * @param {{ children: ReactNode }} props The framed body.
 * @returns {JSX.Element} The framed surface.
 */
function HeroFrame({ children }: { children: ReactNode }) {
  return (
    <Frame
      app="SD"
      crumb={<><b>Sales deck</b> <span className="sep">/</span> slide 4 · pricing</>}
      users={[
        { initials: "SR", tone: "a3", img: FACE.sarah },
        { initials: "MA", tone: "a2", img: FACE.maya },
        { initials: "BA", agent: true },
      ]}
    >
      {children}
    </Frame>
  );
}

/**
 * Wrap a demo node with a small monospace caption beneath it.
 * @param {{ children: ReactNode; note: string }} props Demo node and caption.
 * @returns {JSX.Element} Captioned demo.
 */
function Captioned({ children, note }: { children: ReactNode; note: string }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {children}
      <p className="code-microcopy">{note}</p>
    </div>
  );
}

/**
 * A before/after split showing the Velt default thread beside a brand-themed
 * one, for the what-it-is scene.
 * @returns {JSX.Element} The mixed scene visual.
 */
export function WhatItIsScene(): ReactElement {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <p className="code-microcopy">Velt default</p>
        <AgentFindingCard name="Brand Agent" time="2m" body="Pricing claim needs a source." replies={2} actions={false} />
      </div>
      <div style={{ display: "grid", gap: 8, ...accentVar(BRAND) }}>
        <p className="code-microcopy">your design system</p>
        <AgentFindingCard name="Brand Agent" time="2m" body="Pricing claim needs a source." replies={2} actions={false} />
      </div>
    </div>
  );
}

// Keyed lookup the content module reads from. Keys are local to this page.
export const CUSTOMIZATION_DEMOS: Record<string, ReactNode> = {
  // Hero tabs: the same review thread, four presentation layers.
  "hero/css": (
    <Captioned note="--velt-primary: #4f46e5 applied, shadow DOM optional">
      <HeroFrame>
        <Thread accent={BRAND} />
      </HeroFrame>
    </Captioned>
  ),
  "hero/wireframes": (
    <Captioned note="<VeltCommentDialogWireframe> — your slots, Velt's behavior">
      <HeroFrame>
        <div style={{ display: "grid", gap: 16 }}>
          <Slot label="<thread slot>">
            <div style={{ display: "grid", gap: 12 }}>
              <AgentFindingCard name="Brand Agent" time="2m" body="This pricing claim needs a source before it ships." replies={2} actions={false} />
              <HumanComment name="Maya" initials="MA" time="1m" img={FACE.maya} body="Source added to the doc." end />
            </div>
          </Slot>
          <Slot label="<composer slot>">
            <Composer placeholder="Reply to Maya…" you={FACE.you} />
          </Slot>
        </div>
      </HeroFrame>
    </Captioned>
  ),
  "hero/primitives": (
    <Captioned note="<VeltCommentDialog> composed inside your own components">
      <HeroFrame>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={YOUR_CARD}>
            <span style={YOUR_TAG}>{"<Card> · shadcn"}</span>
            <div style={{ padding: 4 }}>
              <AgentFindingCard name="Brand Agent" time="2m" body="This pricing claim needs a source before it ships." replies={2} />
            </div>
          </div>
          <div style={YOUR_CARD}>
            <span style={YOUR_TAG}>{"<TextField> · MUI"}</span>
            <div style={{ padding: 10 }}>
              <Composer placeholder="Reply to Maya…" you={FACE.you} />
            </div>
          </div>
        </div>
      </HeroFrame>
    </Captioned>
  ),
  "hero/headless": (
    <Captioned note="useCommentAnnotations() — Velt's data, your render">
      <HeroFrame>
        <div style={{ display: "grid", gap: 12 }}>
          <DarkPanel>{"const annotations = useCommentAnnotations();\n// → [{ id, status: 'open', replies: 2 }]"}</DarkPanel>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span className="cmh-pin"><IconBubble />2</span>
            <span style={accentVar(BRAND)}><span className="cmh-pin"><IconBubble />1</span></span>
            <div style={{ display: "flex" }}>
              <Av initials="MA" tone="a2" img={FACE.maya} />
              <span style={{ marginLeft: -7 }}><Av initials="BA" agent /></span>
            </div>
            <span className="code-microcopy" style={{ margin: 0 }}>your custom pins</span>
          </div>
        </div>
      </HeroFrame>
    </Captioned>
  ),

  // What it is: before/after mixed scene
  "what-it-is/scene": <WhatItIsScene />,

  // Showcase card previews
  "showcase/css-theming": (
    <div className="pv">
      <div style={accentVar(BRAND)}>
        <AgentFindingCard name="Brand Agent" time="2m" body="Pricing claim needs a source." replies={2} />
        <div style={{ marginTop: 10 }}>
          <Composer placeholder="Reply to Maya…" you={FACE.you} />
        </div>
      </div>
    </div>
  ),
  "showcase/wireframes": (
    <div className="pv">
      <Slot label="<thread slot>">
        <AgentFindingCard name="Brand Agent" time="2m" body="Pricing claim needs a source." replies={2} actions={false} />
      </Slot>
    </div>
  ),
  "showcase/primitives": (
    <div className="pv">
      <div style={YOUR_CARD}>
        <span style={YOUR_TAG}>{"<Card> · shadcn"}</span>
        <div style={{ padding: 4 }}>
          <AgentFindingCard name="Brand Agent" time="2m" body="Pricing claim needs a source." replies={2} actions={false} />
        </div>
      </div>
    </div>
  ),
  "showcase/headless": (
    <div className="pv">
      <div style={{ display: "grid", gap: 10 }}>
        <DarkPanel>{"const a = useCommentAnnotations();"}</DarkPanel>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="cmh-pin"><IconBubble />2</span>
          <Av initials="MA" tone="a2" img={FACE.maya} />
          <Av initials="BA" agent />
          <span className="code-microcopy" style={{ margin: 0 }}>your render</span>
        </div>
      </div>
    </div>
  ),
  "showcase/mix": (
    <div className="pv" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <p className="code-microcopy" style={{ marginBottom: 0 }}>dialog: wireframe</p>
        <Slot label="<slot>">
          <HumanComment name="Maya" initials="MA" time="1m" img={FACE.maya} body="Source added." />
        </Slot>
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        <p className="code-microcopy" style={{ marginBottom: 0 }}>sidebar: primitive</p>
        <div style={YOUR_CARD}>
          <span style={YOUR_TAG}>{"<Card>"}</span>
          <div style={{ padding: 4 }}>
            <AgentFindingCard name="Brand Agent" time="2m" body="Flagged pricing." actions={false} />
          </div>
        </div>
      </div>
    </div>
  ),
  "showcase/custom-data": (
    <div className="pv">
      <Frame app="SD" crumb={<><b>Thread</b> <span className="sep">/</span> your data</>} right={<Chip kind="pending">in-review</Chip>}>
        <div style={{ display: "grid", gap: 10 }}>
          <AgentFindingCard name="Brand Agent" time="2m" body="Pricing claim needs a source." actions={false} />
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--vlp-color-accent)" }}>#brand-review</span>
            <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 11, color: "var(--vlp-color-text-muted)" }}>custom.channel</span>
          </div>
        </div>
      </Frame>
    </div>
  ),
  "showcase/conditional": (
    <div className="pv" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <p className="code-microcopy" style={{ marginBottom: 0 }}>reviewer</p>
        <div style={{ display: "flex", gap: 8, padding: 10, border: "1px solid var(--vlp-border-default)", borderRadius: 12 }}>
          <button type="button" className="cmh-btn approve">Accept</button>
          <button type="button" className="cmh-btn reject">Reject</button>
        </div>
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        <p className="code-microcopy" style={{ marginBottom: 0 }}>viewer</p>
        <div style={{ padding: 10, border: "1px solid var(--vlp-border-default)", borderRadius: 12 }}>
          <span style={{ fontSize: 12, color: "var(--vlp-color-text-subtle)" }}>read only</span>
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
            padding: "9px 12px",
            borderRadius: 10,
            border: index === 1 ? "1.5px solid var(--vlp-color-accent)" : "1px solid var(--vlp-border-subtle)",
            background: index === 1 ? "var(--vlp-bg-section-alt)" : "var(--vlp-bg-page)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: index === 1 ? 600 : 400, color: "var(--vlp-color-ink)" }}>{variantName}</span>
          {index === 1 ? <Chip kind="approved">active</Chip> : <span style={{ fontSize: 11, color: "var(--vlp-color-text-subtle)" }}>variant</span>}
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignItems: "center" }}>
        <div style={{ ...YOUR_CARD, opacity: 0.85 }}>
          <span style={YOUR_TAG}>Figma frame</span>
          <div style={{ padding: 12 }}>
            <div style={{ height: 40, borderRadius: 6, background: "var(--vlp-bg-section-alt)", marginBottom: 6 }} />
            <div style={{ height: 18, borderRadius: 6, background: "var(--vlp-border-subtle)" }} />
          </div>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <Slot label="<slot>">
            <HumanComment name="Maya" initials="MA" time="1m" img={FACE.maya} body="Looks good." />
          </Slot>
          <p className="code-microcopy" style={{ marginBottom: 0 }}>Wireframes + CSS</p>
        </div>
      </div>
    </div>
  ),

  // Make it yours cards
  "make-it-yours/design-tools": (
    <div className="pv">
      <div style={{ ...YOUR_CARD }}>
        <span style={YOUR_TAG}>playground.velt.dev</span>
        <div style={{ padding: 14, display: "grid", gap: 9 }}>
          {([["--velt-primary", "#4f46e5"], ["--velt-radius", "12px"], ["--velt-font", "Inter"]] as const).map(([varName, value]) => (
            <div key={varName} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
              <span style={{ fontFamily: "var(--vlp-font-mono)", color: "var(--vlp-color-ink-soft)" }}>{varName}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--vlp-font-mono)", color: "var(--vlp-color-text-muted)" }}>
                {varName === "--velt-primary" ? <span style={{ width: 12, height: 12, borderRadius: 3, background: BRAND }} /> : null}
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  "make-it-yours/component-system": (
    <div className="pv">
      <div style={{ display: "grid", gap: 6 }}>
        {(["CSS variables", "Wireframes", "Primitives", "Headless hooks", "Events + APIs", "Dark mode"] as const).map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 12px",
              borderRadius: 10,
              background: "var(--vlp-bg-section-alt)",
              fontSize: 12.5,
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
    <div style={{ position: "relative", height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CursorTag name="Maya" kind="approved" style={{ position: "absolute", top: 8, left: 16 }} />
      <CursorTag name="AI" kind="agent" style={{ position: "absolute", bottom: 10, right: 12 }} />
      <span className="cmh-pin"><IconBubble />1</span>
    </div>
  ),
  "gallery/cell": (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, padding: "8px 0" }}>
      {[["Q1", "Q2", "Q3"], ["$12k", "$15k", "$18k"], ["", "", ""]].flat().map((cell, index) => (
        <div
          key={index}
          style={{
            padding: "6px",
            border: "1px solid var(--vlp-border-subtle)",
            fontSize: 11.5,
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
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "6px 0" }}>
      <div style={{ height: 44, borderRadius: 8, background: "var(--vlp-bg-section-alt)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", paddingLeft: 12 }}>
        <div style={{ position: "absolute", top: 0, left: "32%", bottom: 0, width: 2, background: "var(--vlp-color-accent)", opacity: 0.85 }} />
        <span className="cmh-pin"><IconBubble />0:42</span>
      </div>
      <p className="code-microcopy" style={{ marginBottom: 0 }}>frame-accurate pin on the timeline</p>
    </div>
  ),
  "gallery/coediting": (
    <div style={{ padding: "8px 0", display: "grid", gap: 10 }}>
      <div style={{ display: "flex" }}>
        {[FACE.jordan, FACE.maya, FACE.sarah].map((img, index) => (
          <span key={index} style={{ marginLeft: index === 0 ? 0 : -8 }}>
            <Av initials="" tone="a1" img={img} />
          </span>
        ))}
        <span style={{ marginLeft: -8 }}><Av initials="BA" agent /></span>
      </div>
      <p className="code-microcopy" style={{ marginBottom: 0 }}>three editors + an agent, one doc</p>
    </div>
  ),
  "gallery/huddles": (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--vlp-border-default)", borderRadius: 12 }}>
        <Av initials="JD" tone="a1" img={FACE.jordan} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13, color: "var(--vlp-color-ink)" }}><strong>Jordan</strong> started a huddle</p>
          <p style={{ margin: 0, fontSize: 11.5, color: "var(--vlp-color-text-muted)" }}>2 participants</p>
        </div>
        <Chip kind="approved">live</Chip>
      </div>
    </div>
  ),
  "gallery/presence": (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "4px 0" }}>
      <div style={{ display: "flex" }}>
        <Av initials="JD" tone="a1" img={FACE.jordan} />
        <span style={{ marginLeft: -8 }}><Av initials="MA" tone="a2" img={FACE.maya} /></span>
        <span style={{ marginLeft: -8 }}><Av initials="BA" agent /></span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <CursorTag name="Jordan" />
        <CursorTag name="AI" kind="agent" />
      </div>
    </div>
  ),
  "gallery/notifications": (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Av initials="BA" agent />
        <p style={{ margin: 0, flex: 1, fontSize: 13, color: "var(--vlp-color-ink)" }}><strong>Brand Agent</strong> flagged a claim</p>
        <Chip kind="agent">agent</Chip>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Av initials="SA" tone="a3" img={FACE.sarah} />
        <p style={{ margin: 0, flex: 1, fontSize: 13, color: "var(--vlp-color-ink)" }}><strong>Sara</strong> approved the change</p>
        <Chip kind="approved">approved</Chip>
      </div>
    </div>
  ),

  // Related section visuals
  "related/comments": (
    <div className="pv">
      <div style={accentVar(BRAND)}>
        <AgentFindingCard name="Brand Agent" time="2m" body="Pricing claim needs a source." replies={2} actions={false} />
      </div>
    </div>
  ),
  "related/notifications": (
    <div className="pv">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Av initials="BA" agent />
        <p style={{ margin: 0, flex: 1, fontSize: 13, color: "var(--vlp-color-ink)" }}><strong>Brand Agent</strong> flagged pricing</p>
        <Chip kind="agent">agent</Chip>
      </div>
    </div>
  ),
  "related/presence": (
    <div className="pv">
      <div style={{ display: "flex" }}>
        <Av initials="JD" tone="a1" img={FACE.jordan} />
        <span style={{ marginLeft: -8 }}><Av initials="MA" tone="a2" img={FACE.maya} /></span>
        <span style={{ marginLeft: -8 }}><Av initials="BA" agent /></span>
      </div>
    </div>
  ),
  "related/webhooks": (
    <div className="pv">
      <DarkPanel>{"event: comment.added\nPOST /v2/comments/add → 200 OK"}</DarkPanel>
    </div>
  ),
};
