import type { CSSProperties, ReactNode } from "react";

import {
  AgentFindingCard,
  Av,
  Composer,
  FACES,
  Frame,
  IconReply,
} from "./hero-surface";

// Shared building blocks for the static /customization page artifacts. The page
// splits its demo nodes across four section modules (customization-hero,
// customization-showcase, customization-gallery, customization-related) so they
// can be authored independently; every module reuses the helpers here plus the
// shared product-surface toolkit in hero-surface.tsx. Styling reuses the global
// `.cmh-*` / `.afc-*` / `.pv` rules in components/feature-new/styles.css (scoped
// under `.vfp`, which wraps this page); anything bespoke lives in a per-section
// CSS file each module imports. Visuals are simulated, not live SDK instances.

/** Brand accent used across the customization demos to show CSS-variable theming. */
export const BRAND = "#4f46e5";

// Personas mapped to the shared headshots (fenne/hope read as women).
export const FACE = {
  maya: FACES.fenne,
  sarah: FACES.hope,
  jordan: FACES.ethan,
  you: FACES.jeff,
} as const;

/**
 * Set the local accent token so descendants (composer send, mentions, pins)
 * pick up a brand color, illustrating CSS-variable theming.
 * @param {string} color The accent color to apply.
 * @returns {CSSProperties} A style object overriding --vlp-color-accent.
 */
export function accentVar(color: string): CSSProperties {
  try {
    return { ["--vlp-color-accent"]: color } as CSSProperties;
  } catch (error) {
    console.error("accentVar failed", error);
    return {};
  }
}

/**
 * A human comment bubble built from the shared .cmh-cmt classes (real headshot
 * avatar, name, time, body, optional reply count). Mirrors the comments page.
 * @param {{ name: string; initials: string; time: string; img: string; body: ReactNode; replies?: number; end?: boolean }} props Comment content.
 * @returns {JSX.Element} The comment bubble.
 */
export function HumanComment({
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
export function Thread({ accent, actions = true }: { accent?: string; actions?: boolean }) {
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
export function Slot({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={SLOT}>
      <span style={SLOT_LABEL}>{label}</span>
      {children}
    </div>
  );
}

// "Your component library" chrome for the Primitives layer.
export const YOUR_CARD: CSSProperties = {
  border: "1px solid var(--vlp-border-default)",
  borderRadius: 14,
  background: "var(--vlp-bg-page)",
  boxShadow: "var(--vlp-shadow-sm)",
  overflow: "hidden",
};
export const YOUR_TAG: CSSProperties = {
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
export function HeroFrame({ children }: { children: ReactNode }) {
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
export function Captioned({ children, note }: { children: ReactNode; note: string }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {children}
      <p className="code-microcopy">{note}</p>
    </div>
  );
}
