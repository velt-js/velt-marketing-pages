import type { CSSProperties, ReactNode } from "react";

import { DarkPanel, AvatarStack, CursorTag } from "../demos";
import { AiNativeBoard } from "./ai-board";
import { ComplianceBoard } from "./compliance-board";
import { DigitalSalesRoom } from "./digital-sales-room";
import { FintechBoard } from "./fintech-board";
import { LegalBoard } from "./legal-board";
import { OperationsBoard } from "./ops-board";
import { Av, DEL_STYLE, Frame, FACES, IconArrowRight, IconCheck, INS_STYLE } from "./hero-surface";

import "./multiplayer-editing-showcase.css";

// Simulated-UI demo nodes for the /new-features/multiplayer-editing page. Keys
// match components/feature-new/demo-presets/multiplayer-editing.keys.ts;
// resolved by demo-registry.tsx. Visuals are simulated, not live SDK instances.

/** Multiplayer-editing page personas mapped to shared headshots. */
const FACE = {
  hope: FACES.hope,
  ethan: FACES.ethan,
  you: FACES.jeff,
  maya: FACES.fenne,
} as const;

/** Cursor color palette — two distinct on-brand hues, --vlp tokens where available. */
const CURSOR_HOPE: CSSProperties = { color: "oklch(0.60 0.13 35)", background: "oklch(0.60 0.13 35)" };
const CURSOR_ETHAN: CSSProperties = { color: "#5b7fb8", background: "#5b7fb8" };

/**
 * Inline live-cursor: a 2px caret line + a floating colored name pill above it.
 * Renders inline so it flows naturally within a .cmh-doc paragraph.
 * @param {{ name: string; tone: CSSProperties }} props Person name and brand-color object (color key used for both).
 * @returns {JSX.Element} Cursor tag.
 */
function LiveCursor({ name, tone }: { name: string; tone: CSSProperties }) {
  return (
    <span style={{
      position: "relative",
      display: "inline-block",
      width: 2,
      height: "1.15em",
      borderRadius: 1,
      background: tone.color as string,
      verticalAlign: "-0.2em",
      margin: "0 1px",
      userSelect: "none",
    }}>
      <span style={{
        position: "absolute",
        bottom: "100%",
        left: -1,
        whiteSpace: "nowrap",
        fontSize: 10,
        fontWeight: 700,
        color: "#fff",
        background: tone.color as string,
        borderRadius: "4px 4px 4px 0",
        padding: "2px 6px",
        lineHeight: 1.4,
        boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
        marginBottom: 2,
      }}>
        {name}
      </span>
    </span>
  );
}

/**
 * Colored selection-highlight span for simulating co-editing text selections.
 * Uses color-mix against the person's cursor tone at 18% opacity.
 * @param {{ children: ReactNode; tone: CSSProperties }} props Selected content and color object.
 * @returns {JSX.Element} Highlighted text span.
 */
function Sel({ children, tone }: { children: ReactNode; tone: CSSProperties }) {
  return (
    <span style={{
      background: `color-mix(in srgb, ${tone.color as string} 18%, transparent)`,
      borderRadius: 3,
      padding: "1px 1px",
    }}>
      {children}
    </span>
  );
}

/**
 * Green lock badge row showing who currently holds the editing pen.
 * @param {{ name: string; img: string }} props Editor display name and headshot URL.
 * @returns {JSX.Element} Lock badge.
 */
function LockBadge({ name, img }: { name: string; img: string }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      background: "var(--vlp-color-approve-soft)",
      border: "1px solid color-mix(in srgb, var(--vlp-color-green-approval) 30%, transparent)",
      borderRadius: 999,
      padding: "4px 10px 4px 5px",
      fontSize: 11.5,
      fontWeight: 700,
      color: "#0c6a41",
    }}>
      <Av initials={name.slice(0, 2).toUpperCase()} img={img} />
      <span style={{ fontSize: 12 }}>&#x1F512;</span>
      {name} is editing
    </div>
  );
}

/**
 * Mini "client tab" pane used in pairs to show two clients sharing the same
 * live state value. Highlighted variant signals the pane that was just updated.
 * @param {{ label: string; value: string; highlight?: boolean }} props Tab label, state value string, and optional active highlight.
 * @returns {JSX.Element} Client pane.
 */
function ClientPane({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{
      flex: 1,
      border: `1.5px solid ${highlight ? "color-mix(in srgb, var(--vlp-color-accent) 45%, transparent)" : "var(--vlp-border-default)"}`,
      borderRadius: 10,
      background: highlight ? "var(--vlp-color-accent-soft)" : "var(--vlp-bg-page)",
      padding: "10px 12px",
      display: "grid",
      gap: 6,
    }}>
      <span style={{ fontSize: 10, fontFamily: "var(--vlp-font-mono)", color: "var(--vlp-color-text-subtle)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</span>
      <span style={{
        fontSize: 12.5,
        fontWeight: 700,
        color: highlight ? "var(--vlp-color-accent-ink)" : "var(--vlp-color-ink)",
        fontFamily: "var(--vlp-font-mono)",
      }}>{value}</span>
    </div>
  );
}

/**
 * Bidirectional sync-pulse arrow column rendered between two ClientPane elements.
 * Uses --vlp-color-green-approval to convey "live and healthy".
 * @returns {JSX.Element} Sync indicator.
 */
function SyncPulse() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      flexShrink: 0,
      color: "var(--vlp-color-green-approval)",
    }}>
      <svg viewBox="0 0 20 20" width={15} height={15} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 10h12M12 6l4 4-4 4" />
      </svg>
      <svg viewBox="0 0 20 20" width={15} height={15} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 10H4M8 14l-4-4 4-4" />
      </svg>
    </div>
  );
}

/**
 * A framed "editor document" surface used to host non-hero co-editing demos.
 * @param {{ children: ReactNode }} props Surface content.
 * @returns {JSX.Element} Document surface.
 */
function DocSurface({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--line, #e7e2d9)",
        borderRadius: 12,
        background: "var(--bg, #fff)",
        padding: 16,
        position: "relative",
        minHeight: 104,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Small "Connected · Synced" status pill used in non-hero scenes.
 * @param {{ label?: string }} props Optional label override.
 * @returns {JSX.Element} Sync badge.
 */
function SyncBadge({ label = "Connected · Synced" }: { label?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        fontWeight: 700,
        color: "var(--ink, #0b353b)",
        background: "color-mix(in srgb, var(--vlp-color-accent) 12%, transparent)",
        border: "1px solid color-mix(in srgb, var(--vlp-color-accent) 30%, transparent)",
        borderRadius: 999,
        padding: "3px 9px",
      }}
    >
      <span className="pulse" />
      {label}
    </span>
  );
}

/** @returns {JSX.Element} Pen / edit glyph for single-editor mode + the editing tag. */
function IconPen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
      <path d="M13.5 6.5l3 3" />
    </svg>
  );
}

/** @returns {JSX.Element} Eye glyph for read-only watchers. */
function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** @returns {JSX.Element} Two-way refresh glyph for live-state sync. */
function IconSync() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11a8 8 0 0 1 14-5l2 2M20 13a8 8 0 0 1-14 5l-2-2" />
      <path d="M18 3v5h-5M6 21v-5h5" />
    </svg>
  );
}

/** @returns {JSX.Element} Git-merge glyph for conflict-free CRDT merges. */
function IconMerge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="15" r="2.4" />
      <path d="M6 8.4v7.2M8.3 7.2A6 6 0 0 0 15.6 14" />
    </svg>
  );
}

/** @returns {JSX.Element} People glyph for live presence. */
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5M17 14.2A6 6 0 0 1 21 20" />
    </svg>
  );
}

/** @returns {JSX.Element} History / version-snapshot glyph for checkpoints. */
function IconHistory() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.05 11a9 9 0 1 1 .5 4" />
      <path d="M3 21v-5h5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/** @returns {JSX.Element} Refresh-loop glyph for the restore affordance. */
function IconRestore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.05 11a9 9 0 1 1 .5 4" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

/** @returns {JSX.Element} Shield glyph for end-to-end encryption. */
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.4 3 8.5 7 10 4-1.5 7-5.6 7-10V6l-7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/** @returns {JSX.Element} Document glyph for plaintext content. */
function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

/** @returns {JSX.Element} Key glyph for customer-held encryption keys. */
function IconKey() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l8 8M16 16l2-2M18.5 18.5l2-2" />
    </svg>
  );
}

/** @returns {JSX.Element} Lock glyph for synced ciphertext. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Cloud-off glyph for offline-safe editing. */
function IconCloudOff() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.2 9.1A5 5 0 0 0 7 19h9.5a4 4 0 0 0 1.6-.3M9.2 5.2A5 5 0 0 1 17 9a4 4 0 0 1 2.6 6.9" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

/** @returns {JSX.Element} Plug glyph for drop-in editor bindings. */
function IconPlug() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 2v5M15 2v5" />
      <path d="M6 7h12v3a6 6 0 0 1-12 0V7z" />
      <path d="M12 16v6" />
    </svg>
  );
}

/** @returns {JSX.Element} Stacked-layers glyph for CRDT stores. */
function IconStack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3z" />
      <path d="M3 12l9 4.5L21 12" />
      <path d="M3 16.5 12 21l9-4.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Server glyph for server-side CRDT writes. */
function IconServer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  );
}

/** @returns {JSX.Element} Down-arrow glyph for vertical step connectors. */
function IconArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

/** @returns {JSX.Element} Paragraph-lines glyph for the text store type. */
function IconTextStore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 6h14M5 10h14M5 14h10M5 18h7" />
    </svg>
  );
}

/** @returns {JSX.Element} Braces glyph for the map store type. */
function IconMapStore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 4c-2 0-2 3-2 4s0 2-2 2c2 0 2 1 2 2s0 4 2 4" />
      <path d="M16 4c2 0 2 3 2 4s0 2 2 2c-2 0-2 1-2 2s0 4-2 4" />
    </svg>
  );
}

/** @returns {JSX.Element} Brackets glyph for the array store type. */
function IconArrayStore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 4H6v16h3M15 4h3v16h-3" />
    </svg>
  );
}

/** @returns {JSX.Element} Angle-brackets glyph for the xml store type. */
function IconXmlStore() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  );
}

/**
 * A labeled showcase card: the shared white apf-card shell with a colored
 * cmh-cc header bar (icon + title + pill) over a cmh-cc body.
 * @param {{ tone: string; icon: ReactNode; title: string; pill: string; narrow?: boolean; children: ReactNode }} props Header tone class suffix, header glyph, title, pill text, narrow-tile flag, and body content.
 * @returns {JSX.Element} Labeled capability card.
 */
function MpeCard({
  tone,
  icon,
  title,
  pill,
  narrow,
  children,
}: {
  tone: string;
  icon: ReactNode;
  title: string;
  pill: string;
  narrow?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="pv">
      <div className={`apf-card${narrow ? " apf-card--narrow" : ""}`}>
        <div className={`cmh-cc-head apf-head--${tone}`}>
          {icon}
          {title}
          <span className="cmh-cc-pill">{pill}</span>
        </div>
        <div className="cmh-cc-body">{children}</div>
      </div>
    </div>
  );
}

/**
 * One skeleton document line carrying a named live caret, used in the merge and
 * presence stages to suggest concurrent typing without literal text.
 * @param {{ width: string; tone: CSSProperties; name: string; align?: "start" | "end" }} props Line width, brand-color object (color key), cursor name, and caret side.
 * @returns {JSX.Element} Editor line with a caret.
 */
function EditLine({ width, tone, name, align = "start" }: { width: string; tone: CSSProperties; name: string; align?: "start" | "end" }) {
  const caret = (
    <span className="mpe-caret" style={{ background: tone.color as string }}>
      <span className="mpe-clabel" style={{ background: tone.color as string }}>{name}</span>
    </span>
  );
  return (
    <span className="mpe-eline">
      {align === "start" ? caret : null}
      <span className="mpe-bar" style={{ width }} />
      {align === "end" ? caret : null}
    </span>
  );
}

/**
 * Compact "related feature" teaser tile: a mini echo of the linked primitive
 * over a connector caption naming how multiplayer editing hands off to it.
 * @param {{ children: ReactNode; from: string; to: string }} props Echo visual plus the from/to connector phrases.
 * @returns {JSX.Element} Related teaser tile.
 */
function RelTile({ children, from, to }: { children: ReactNode; from: string; to: string }) {
  return (
    <div className="pv">
      <div className="mpe-rel">
        {children}
        <p className="mpe-rel-cap">
          <span>{from}</span>
          <span className="mpe-rel-arrow"><IconArrowRight /></span>
          <strong>{to}</strong>
        </p>
      </div>
    </div>
  );
}

/**
 * CO-EDITING hero artifact: a document edited simultaneously by Hope and Ethan,
 * each with a live labeled cursor and a colored selection highlight. Parametrized
 * by editor name so integration spokes (Tiptap, Lexical, BlockNote, …) can reuse
 * the exact component instead of a static per-page mock.
 * @param {{ editorName?: string }} props Editor label shown in the file crumb.
 * @returns {JSX.Element} The co-editing frame.
 */
export function CoEditingHero({ editorName = "Tiptap" }: { editorName?: string } = {}) {
  return (
    <Frame
      app="ME"
      crumb={<><b>brief-q3.md</b> <span className="sep">/</span> {editorName}</>}
      users={[
        { initials: "HO", tone: "a2", img: FACE.hope },
        { initials: "ET", tone: "a1", img: FACE.ethan },
        { initials: "JF", img: FACE.you },
      ]}
    >
      <div className="cmh-toolbar">
        <span className="tb" style={{ fontWeight: 800 }}>B</span>
        <span className="tb" style={{ fontStyle: "italic" }}>I</span>
        <span className="tb" style={{ textDecoration: "underline" }}>U</span>
        <span className="vbar" />
        <span className="tb">H1</span>
        <span className="tb">H2</span>
        <span className="vbar" />
        <span className="tb" style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10.5 }}>&lt;/&gt;</span>
      </div>

      <p className="cmh-doc" style={{ margin: 0 }}>
        The Q3 campaign centers on the <Sel tone={CURSOR_HOPE}>migration story</Sel>: moving teams
        from async reviews to <LiveCursor name="Hope" tone={CURSOR_HOPE} /> live collaboration inside the product itself.
      </p>

      <p className="cmh-doc" style={{ margin: "6px 0 0" }}>
        Pricing: <Sel tone={CURSOR_ETHAN}>three usage tiers, starting at $0</Sel>: no per-seat cost.{" "}
        <LiveCursor name="Ethan" tone={CURSOR_ETHAN} />
      </p>

      <p className="code-microcopy" style={{ margin: "4px 0 0" }}>two cursors, one document &middot; Yjs merges both streams, zero conflicts</p>
    </Frame>
  );
}

/**
 * CRDT co-editing + contextual comment hero. The flagship story for text-editor
 * integrations: a live co-edited document (two labeled cursors, Yjs merge) that
 * ALSO carries a contextual comment thread anchored to a highlighted span — both
 * Velt layers on one surface. Parametrized by editor name for the file crumb so
 * Tiptap, Lexical, BlockNote, … each read as their own editor. The app glyph is
 * derived from the editor name (initials of multi-word names, else first two
 * letters) so the chip reads as that integration, not a generic demo.
 * @param {{ editorName?: string }} props Editor label shown in the file crumb.
 * @returns {JSX.Element} The combined co-editing + comment frame.
 */
export function CoEditingCommentHero({ editorName = "Tiptap" }: { editorName?: string } = {}) {
  const words = editorName.trim().split(/\s+/).filter(Boolean);
  const appGlyph = (
    words.length > 1 ? words.slice(0, 2).map((word) => word[0]).join("") : editorName.slice(0, 2)
  ).toUpperCase() || "ED";
  return (
    <Frame
      app={appGlyph}
      crumb={<><b>brief-q3.md</b> <span className="sep">/</span> {editorName}</>}
      users={[
        { initials: "HO", tone: "a2", img: FACE.hope },
        { initials: "ET", tone: "a1", img: FACE.ethan },
        { initials: "MA", tone: "a3", img: FACE.maya },
      ]}
    >
      <div className="cmh-toolbar">
        <span className="tb" style={{ fontWeight: 800 }}>B</span>
        <span className="tb" style={{ fontStyle: "italic" }}>I</span>
        <span className="tb" style={{ textDecoration: "underline" }}>U</span>
        <span className="vbar" />
        <span className="tb">H1</span>
        <span className="tb">H2</span>
        <span className="vbar" />
        <span className="tb" style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10.5 }}>&lt;/&gt;</span>
      </div>

      <div className="cmh-td" style={{ minHeight: 236 }}>
        <p className="cmh-td-doc" style={{ margin: "22px 0 0", maxWidth: "100%" }}>
          The Q3 campaign centers on the <span className="cmh-mark" style={{ background: "rgba(255, 209, 102, 0.5)", boxShadow: "inset 0 -2px 0 rgba(255, 193, 7, 0.6)" }}>migration story</span>
          <LiveCursor name="Hope" tone={CURSOR_HOPE} />: moving from async reviews to{" "}
          <Sel tone={CURSOR_ETHAN}>live collaboration</Sel><LiveCursor name="Ethan" tone={CURSOR_ETHAN} />. Pricing:
          three usage tiers from $0, no per-seat cost.
        </p>

        <div className="cmh-td-comment">
          <div className="cmh-td-chead">
            <span className="cmh-td-status">
              <svg className="cmh-td-dot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>
              Open
              <svg className="cmh-td-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </span>
            <span className="cmh-td-flag">
              <svg className="cmh-td-flagico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
              <svg className="cmh-td-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </span>
            <span className="cmh-td-actions">
              <svg className="cmh-td-kebab" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
              <span className="cmh-td-resolve" aria-label="Resolve">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
              </span>
            </span>
          </div>
          <div className="cmh-td-msg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cmh-td-avatar" src={FACE.maya} alt="Maya" />
            <span className="cmh-td-name">Maya</span>
            <span className="cmh-td-time">14m</span>
            <svg className="cmh-td-read" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 13l4 4 8-9" /><path d="M11 16l1.5 1.5L21 8" /></svg>
          </div>
          <p className="cmh-td-text">Let&apos;s lead with this. Strongest angle we have, <span className="cmh-td-mention">@Ethan</span> can you tighten the wording?</p>
        </div>
      </div>

      <p className="code-microcopy" style={{ margin: "4px 0 0" }}>live cursors + a comment anchored to the selection &middot; Yjs merges every keystroke</p>
    </Frame>
  );
}

export const MULTIPLAYER_EDITING_DEMOS: Record<string, ReactNode> = {
  "multiplayer-editing/hero/co-editing": <CoEditingHero />,

  /**
   * SINGLE-EDITOR: Hope holds the pen; Ethan is watching live and can request access.
   * Lock badge + queued-editor finding card model the SDK's single-editor mode.
   */
  "multiplayer-editing/hero/single-editor": (
    <Frame
      app="ME"
      crumb={<><b>quarterly-filing.md</b> <span className="sep">/</span> Single-editor mode</>}
      users={[
        { initials: "HO", tone: "a2", img: FACE.hope },
        { initials: "ET", tone: "a1", img: FACE.ethan },
      ]}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <LockBadge name="Hope" img={FACE.hope} />
        <span style={{ fontSize: 11, color: "var(--vlp-color-text-subtle)", fontFamily: "var(--vlp-font-mono)" }}>read-only for others</span>
      </div>

      <p className="cmh-doc" style={{ margin: 0 }}>
        Section 4.2: Revenue recognition. Hope is revising the opening clause.
        <span style={{ display: "inline-block", width: 2, height: 14, borderRadius: 1, background: CURSOR_HOPE.color as string, verticalAlign: "-2px", marginLeft: 2 }} />
      </p>

      <div className="finding" style={{ boxShadow: "none", gap: 8, padding: "10px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Av initials="ET" tone="a1" img={FACE.ethan} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--vlp-color-ink)" }}>Ethan</span>
          <span style={{ fontSize: 11, color: "var(--vlp-color-text-muted)" }}>&middot; watching live</span>
          <span className="cmh-when" style={{ marginLeft: "auto" }}>queued</span>
        </div>
        <div style={{ display: "flex", gap: 6, paddingLeft: 35 }}>
          <button type="button" className="cmh-btn approve" style={{ fontSize: 11 }}>Request the pen</button>
        </div>
      </div>

      <p className="code-microcopy" style={{ margin: 0 }}>pen passes on accept: no racing, no overwrite</p>
    </Frame>
  ),

  /**
   * STATE-SYNC: Two mini client panes showing identical live state, plus a
   * useLiveState code snippet. A SyncPulse arrow between them signals real-time sync.
   */
  "multiplayer-editing/hero/state-sync": (
    <Frame
      app="ME"
      crumb={<><b>board</b> <span className="sep">/</span> useLiveState</>}
      users={[
        { initials: "HO", tone: "a2", img: FACE.hope },
        { initials: "ET", tone: "a1", img: FACE.ethan },
      ]}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
        <ClientPane label="Tab A &middot; Hope" value='status: "open"' highlight />
        <SyncPulse />
        <ClientPane label="Tab B &middot; Ethan" value='status: "open"' />
      </div>

      <DarkPanel footer="local-first &middot; offline-safe &middot; any JSON">
        {"const [filters, setFilters] = useLiveState(\n  \"board-filters\", { status: \"all\" },\n);\n// every connected client reflects the change"}
      </DarkPanel>

      <p className="code-microcopy" style={{ margin: 0 }}>Hope changes the filter: Ethan&apos;s tab updates instantly, no refresh</p>
    </Frame>
  ),

  "multiplayer-editing/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AvatarStack users={[{ initials: "MA", kind: "human", name: "Maya" }, { initials: "AG", kind: "agent", name: "Agent" }]} />
        <SyncBadge />
      </div>
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
          Campaign brief: Maya is typing the opening paragraph.
        </p>
        <div style={{ position: "absolute", top: 12, right: 20 }}>
          <CursorTag name="Maya" />
        </div>
        <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.5, opacity: 0.85 }}>
          <mark style={{ background: "color-mix(in srgb, var(--vlp-color-accent) 22%, transparent)", padding: "1px 2px" }}>
            Pricing section
          </mark>: rewritten by the agent through the CRDT REST API.
        </p>
        <div style={{ position: "absolute", bottom: 12, left: 18 }}>
          <CursorTag name="Agent" kind="agent" />
        </div>
      </DocSurface>
      <p className="code-microcopy">both streams live and interleaved, zero conflicts &middot; consent-gated edits go through Suggestions</p>
    </div>
  ),

  // SINGLE-EDITOR (wide): one pen, a live audience, read-only enforced — an
  // editor row + watcher row over a request → accept → pass handoff strip.
  "multiplayer-editing/showcase/single-editor": (
    <MpeCard tone="navy" icon={<IconPen />} title="Single-editor mode" pill="read-only enforced">
      <div className="mpe-rows">
        <div className="mpe-row">
          <Av initials="HO" tone="a2" img={FACE.hope} />
          <span className="mpe-row-main">
            <span className="mpe-row-name">Hope</span>
            <span className="mpe-row-sub">drafting the opening clause</span>
          </span>
          <span className="mpe-pen"><IconPen />holds the pen</span>
        </div>
        <div className="mpe-row">
          <Av initials="ET" tone="a1" img={FACE.ethan} />
          <span className="mpe-row-main">
            <span className="mpe-row-name">Ethan</span>
            <span className="mpe-row-sub">watching live</span>
          </span>
          <span className="apf-tag apf-tag--human"><IconEye />read-only</span>
        </div>
      </div>
      <div className="mpe-flow">
        <span className="mpe-flow-step">Request the pen</span>
        <span className="mpe-flow-arrow"><IconArrowRight /></span>
        <span className="mpe-flow-step">Hope accepts</span>
        <span className="mpe-flow-arrow"><IconArrowRight /></span>
        <span className="mpe-flow-step"><IconCheck />Pen passes</span>
      </div>
    </MpeCard>
  ),

  // STATE-SYNC (narrow): useLiveState — two client tabs reflect one value, a
  // bidirectional sync arrow between them.
  "multiplayer-editing/showcase/state-sync": (
    <MpeCard tone="slate" icon={<IconSync />} title="Shared live state" pill="useLiveState" narrow>
      <div className="mpe-sync">
        <div className="mpe-panes">
          <div className="mpe-pane mpe-pane--live">
            <span className="mpe-pane-label"><Av initials="HO" tone="a2" img={FACE.hope} />Tab A</span>
            <span className="mpe-pane-val">{'status: "open"'}</span>
          </div>
          <div className="mpe-sync-mid"><IconSync /></div>
          <div className="mpe-pane">
            <span className="mpe-pane-label"><Av initials="ET" tone="a1" img={FACE.ethan} />Tab B</span>
            <span className="mpe-pane-val">{'status: "open"'}</span>
          </div>
        </div>
        <div className="apf-note apf-note--ok">
          <span className="chip chip-approved">in sync</span>
          <span>One value, every client &middot; any JSON</span>
        </div>
      </div>
    </MpeCard>
  ),

  // MERGE (narrow): Yjs CRDT merges concurrent edits — skeleton doc lines each
  // carrying a named live caret, no keystroke lost.
  "multiplayer-editing/showcase/merge": (
    <MpeCard tone="plum" icon={<IconMerge />} title="Conflict-free merge" pill="Yjs CRDT" narrow>
      <div className="mpe-doc">
        <EditLine width="58%" tone={CURSOR_HOPE} name="Hope" align="start" />
        <EditLine width="74%" tone={CURSOR_ETHAN} name="Ethan" align="end" />
        <span className="mpe-eline"><span className="mpe-bar" style={{ width: "44%" }} /></span>
      </div>
      <div className="apf-note apf-note--ok">
        <span className="chip chip-approved">0 conflicts</span>
        <span>Both edits are kept, and neither loses a keystroke</span>
      </div>
    </MpeCard>
  ),

  // PRESENCE (wide): avatars · named cursors · live selection — a presence
  // stack over a live doc paragraph with two labeled cursors + a selection.
  "multiplayer-editing/showcase/presence": (
    <MpeCard tone="teal" icon={<IconUsers />} title="Live presence" pill="3 online">
      <div className="mpe-present">
        <div className="mpe-present-top">
          <span className="mpe-stack">
            <Av initials="HO" tone="a2" img={FACE.hope} />
            <Av initials="ET" tone="a1" img={FACE.ethan} />
            <Av initials="MA" tone="a3" img={FACE.maya} />
          </span>
          <span className="cmh-live"><i />live</span>
        </div>
        <div className="mpe-stage">
          <p className="cmh-doc" style={{ margin: 0 }}>
            The Q3 plan moves teams from <Sel tone={CURSOR_HOPE}>async reviews</Sel>{" "}
            <LiveCursor name="Hope" tone={CURSOR_HOPE} /> to live collaboration{" "}
            <LiveCursor name="Ethan" tone={CURSOR_ETHAN} /> inside the product.
          </p>
        </div>
      </div>
    </MpeCard>
  ),

  // CHECKPOINTS (wide): named version snapshots saved + restored by API, the
  // restore broadcasting to every client — a small saved-snapshot timeline.
  "multiplayer-editing/showcase/checkpoints": (
    <MpeCard tone="ink" icon={<IconHistory />} title="Version checkpoints" pill="named snapshots">
      <div className="mpe-snaps">
        <span className="mpe-snaps-rail" aria-hidden="true" />
        <div className="mpe-snap mpe-snap--current">
          <span className="mpe-snap-dot" />
          <span className="mpe-snap-main">
            <span className="mpe-snap-name">Live draft</span>
            <span className="mpe-snap-meta">editing now &middot; 3 collaborators</span>
          </span>
          <span className="chip chip-approved">current</span>
        </div>
        <div className="mpe-snap">
          <span className="mpe-snap-dot" />
          <span className="mpe-snap-main">
            <span className="mpe-snap-name">Before pricing rewrite</span>
            <span className="mpe-snap-meta">saved 09:14</span>
          </span>
          <button type="button" className="mpe-snap-btn"><IconRestore />Restore</button>
        </div>
        <div className="mpe-snap">
          <span className="mpe-snap-dot" />
          <span className="mpe-snap-main">
            <span className="mpe-snap-name">Outline approved</span>
            <span className="mpe-snap-meta">saved Mon 16:40</span>
          </span>
          <button type="button" className="mpe-snap-btn"><IconRestore />Restore</button>
        </div>
      </div>
      <div className="apf-note">
        <span className="chip chip-pending">broadcast</span>
        <span>Restore via API reaches every connected client</span>
      </div>
    </MpeCard>
  ),

  // ENCRYPTION (narrow): your keys encrypt synced content — Velt moves
  // ciphertext, never the content. A plaintext → key → ciphertext flow.
  "multiplayer-editing/showcase/encryption": (
    <MpeCard tone="navy" icon={<IconShield />} title="End-to-end encryption" pill="your keys" narrow>
      <div className="mpe-enc">
        <div className="mpe-enc-cell">
          <span className="mpe-enc-ic mpe-enc-ic--plain"><IconDoc /></span>
          <span className="mpe-enc-main">
            <span className="mpe-enc-label">Your content</span>
            <span className="mpe-enc-sub">brief-q3.md</span>
          </span>
        </div>
        <div className="mpe-down"><IconArrowDown /></div>
        <div className="mpe-enc-cell">
          <span className="mpe-enc-ic mpe-enc-ic--key"><IconKey /></span>
          <span className="mpe-enc-main">
            <span className="mpe-enc-label">Encrypted with your key</span>
            <span className="mpe-enc-sub">Velt never sees plaintext</span>
          </span>
        </div>
        <div className="mpe-down"><IconArrowDown /></div>
        <div className="mpe-enc-cell mpe-enc-cell--cipher">
          <span className="mpe-enc-ic mpe-enc-ic--cipher"><IconLock /></span>
          <span className="mpe-enc-main">
            <span className="mpe-enc-label">Synced ciphertext</span>
            <span className="mpe-cipher">a3f9c1 7e22b8 04d6e1…</span>
          </span>
        </div>
      </div>
    </MpeCard>
  ),

  // OFFLINE (narrow): offline edits queue locally and merge on reconnect — a
  // queued-offline row flowing down into a merged-on-reconnect row.
  "multiplayer-editing/showcase/offline": (
    <MpeCard tone="slate" icon={<IconCloudOff />} title="Offline-safe" pill="local-first" narrow>
      <div className="mpe-rows">
        <div className="mpe-row">
          <span className="mpe-row-ic mpe-row-ic--queued"><IconCloudOff /></span>
          <span className="mpe-row-main">
            <span className="mpe-row-name">Edited offline</span>
            <span className="mpe-row-sub">queued locally, nothing lost</span>
          </span>
          <span className="chip chip-pending">queued</span>
        </div>
        <div className="mpe-down"><IconArrowDown /></div>
        <div className="mpe-row">
          <span className="mpe-row-ic mpe-row-ic--merged"><IconCheck /></span>
          <span className="mpe-row-main">
            <span className="mpe-row-name">Back online</span>
            <span className="mpe-row-sub">changes merge in order</span>
          </span>
          <span className="chip chip-approved">merged</span>
        </div>
      </div>
    </MpeCard>
  ),

  // EDITORS (wide): drop-in bindings for popular editors plus the core library.
  "multiplayer-editing/showcase/editors": (
    <MpeCard tone="purple" icon={<IconPlug />} title="Editor bindings" pill="drop-in">
      <div className="int-chips">
        <span className="int-chip"><i />Tiptap</span>
        <span className="int-chip"><i />React Flow</span>
        <span className="int-chip"><i />CodeMirror</span>
        <span className="int-chip"><i />BlockNote</span>
        <span className="int-chip"><i />Lexical (soon)</span>
      </div>
      <p className="code-microcopy" style={{ marginTop: 12 }}>plus the core library for your own editor, whiteboard, or grid</p>
    </MpeCard>
  ),

  // STORES (wide): framework-agnostic CRDT store types with subscriptions and a
  // typed React hook — a grid of the four shared data structures.
  "multiplayer-editing/showcase/stores": (
    <MpeCard tone="teal" icon={<IconStack />} title="CRDT stores" pill="framework-agnostic">
      <div className="mpe-stores">
        <div className="mpe-store">
          <span className="mpe-store-ic"><IconTextStore /></span>
          <span className="mpe-store-name">text</span>
          <span className="mpe-store-type">Y.Text</span>
        </div>
        <div className="mpe-store">
          <span className="mpe-store-ic"><IconMapStore /></span>
          <span className="mpe-store-name">map</span>
          <span className="mpe-store-type">Y.Map</span>
        </div>
        <div className="mpe-store">
          <span className="mpe-store-ic"><IconArrayStore /></span>
          <span className="mpe-store-name">array</span>
          <span className="mpe-store-type">Y.Array</span>
        </div>
        <div className="mpe-store">
          <span className="mpe-store-ic"><IconXmlStore /></span>
          <span className="mpe-store-name">xml</span>
          <span className="mpe-store-type">Y.Xml</span>
        </div>
      </div>
      <p className="code-microcopy" style={{ marginTop: 12 }}>subscriptions &middot; typed React hook &middot; any framework</p>
    </MpeCard>
  ),

  // SERVER-WRITES (narrow): a REST CRDT update — connected clients pick up the
  // change. A request line + JSON body over a live "picked up" note.
  "multiplayer-editing/showcase/server-writes": (
    <MpeCard tone="ink" icon={<IconServer />} title="Server writes" pill="REST API" narrow>
      <div className="mpe-req">
        <div className="mpe-req-card">
          <div className="mpe-req-line">
            <span className="mpe-req-verb">POST</span>
            <span className="mpe-req-path">/v2/crdt/update</span>
          </div>
          <pre className="mpe-req-body">{"{\n  "}<span className="mpe-req-k">{'"documentId"'}</span>{": "}<span className="mpe-req-s">{'"brief-q3"'}</span>{",\n  "}<span className="mpe-req-k">{'"op"'}</span>{": "}<span className="mpe-req-s">{'"insert"'}</span>{"\n}"}</pre>
        </div>
        <div className="apf-note apf-note--ok">
          <span className="cmh-live"><i />live</span>
          <span>Connected clients pick up the change</span>
        </div>
      </div>
    </MpeCard>
  ),

  // LOOK — a themed editor binding: a mini toolbar with the adapter tag over a
  // live doc line carrying a recolored caret + selection, above the caret knobs.
  "multiplayer-editing/make-it-yours/look": (
    <div className="pv mpe-look">
      <div className="mpe-look-editor">
        <div className="mpe-look-tb" aria-hidden="true">
          <span className="mpe-look-tbtn" style={{ fontWeight: 800 }}>B</span>
          <span className="mpe-look-tbtn" style={{ fontStyle: "italic" }}>I</span>
          <span className="mpe-look-tbtn">H1</span>
          <span className="mpe-look-tbadge"><IconPlug />Tiptap</span>
        </div>
        <p className="cmh-doc mpe-look-doc">
          The Q3 plan moves teams to <Sel tone={CURSOR_HOPE}>live collaboration</Sel>{" "}
          <LiveCursor name="Hope" tone={CURSOR_HOPE} /> across every binding.
        </p>
      </div>
      <div className="mpe-look-knobs">
        <span className="mpe-look-sw mpe-look-sw--1" aria-hidden="true" />
        <span className="mpe-look-sw mpe-look-sw--2" aria-hidden="true" />
        <span className="mpe-look-knob">caret label</span>
        <span className="mpe-look-knob mpe-look-knob--dark">dark</span>
      </div>
    </div>
  ),

  // BEHAVIOR — the co-editing config: CRDT store types, a server REST write,
  // your-key encryption, and offline merge, as labeled config rows.
  "multiplayer-editing/make-it-yours/behavior": (
    <div className="pv mpe-cfg">
      <div className="mpe-cfg-row">
        <span className="mpe-cfg-ic"><IconStack /></span>
        <span className="mpe-cfg-main">
          <span className="mpe-cfg-key">CRDT stores</span>
          <span className="mpe-cfg-types">
            <span className="mpe-cfg-type">Y.Text</span>
            <span className="mpe-cfg-type">Y.Map</span>
            <span className="mpe-cfg-type">Y.Array</span>
            <span className="mpe-cfg-type">Y.Xml</span>
          </span>
        </span>
      </div>
      <div className="mpe-cfg-row">
        <span className="mpe-cfg-ic mpe-cfg-ic--rest"><IconServer /></span>
        <span className="mpe-cfg-main">
          <span className="mpe-cfg-key">POST /v2/crdt/update</span>
          <span className="mpe-cfg-sub">write from your server</span>
        </span>
        <span className="cmh-live"><i />REST</span>
      </div>
      <div className="mpe-cfg-row">
        <span className="mpe-cfg-ic mpe-cfg-ic--key"><IconKey /></span>
        <span className="mpe-cfg-main">
          <span className="mpe-cfg-key">encryption</span>
          <span className="mpe-cfg-sub">your key &middot; Velt sees ciphertext</span>
        </span>
        <span className="chip chip-approved">your key</span>
      </div>
      <div className="mpe-cfg-row">
        <span className="mpe-cfg-ic mpe-cfg-ic--off"><IconCloudOff /></span>
        <span className="mpe-cfg-main">
          <span className="mpe-cfg-key">offline</span>
          <span className="mpe-cfg-sub">local-first &middot; merge on reconnect</span>
        </span>
        <span className="chip chip-pending">queued</span>
      </div>
    </div>
  ),

  "multiplayer-editing/in-production/sales": <DigitalSalesRoom />,

  "multiplayer-editing/in-production/fintech": <FintechBoard />,

  "multiplayer-editing/in-production/ops": <OperationsBoard />,

  "multiplayer-editing/in-production/compliance": <ComplianceBoard />,

  "multiplayer-editing/in-production/legal": <LegalBoard />,

  "multiplayer-editing/in-production/ai": <AiNativeBoard />,

  "multiplayer-editing/related/suggestions": (
    <RelTile from="edit needs consent" to="arrives as a suggestion">
      <div className="mpe-rel-diff">
        <del style={DEL_STYLE}>async reviews</del>
        <span className="mpe-rel-diff-arrow"><IconArrowRight /></span>
        <ins style={INS_STYLE}>live collaboration</ins>
      </div>
      <div className="mpe-rel-acts">
        <span className="chip chip-approved">accept</span>
        <span className="chip chip-rejected">reject</span>
      </div>
    </RelTile>
  ),

  "multiplayer-editing/related/presence": (
    <RelTile from="who's in the document right now" to="human or agent, cursors included">
      <div className="mpe-rel-stack">
        <span className="mpe-rel-stack-avs">
          <Av initials="HO" tone="a2" img={FACE.hope} />
          <Av initials="ET" tone="a1" img={FACE.ethan} />
          <Av initials="MA" tone="a3" img={FACE.maya} />
          <Av initials="RA" agent />
        </span>
        <span className="cmh-live"><i />live</span>
      </div>
    </RelTile>
  ),

  "multiplayer-editing/related/comments": (
    <RelTile from="the thread beside the edit" to="anchored to the exact line">
      <div className="cmh-cmt cmh-cmt--plain">
        <Av initials="HO" tone="a2" img={FACE.hope} />
        <div className="cmh-cmt-main">
          <div className="cmh-cmt-head">
            <span className="cmh-cmt-name">Hope</span>
            <span className="cmh-cmt-time">now</span>
          </div>
          <p className="cmh-cmt-body">Should section 4.2 cite the revised SLA?</p>
        </div>
      </div>
    </RelTile>
  ),
};
