import type { CSSProperties, ReactNode } from "react";

import { ProvRow, ProvArrow, DarkPanel, Chip, Precedent, AvatarStack, CursorTag } from "../demos";
import { Av, Frame, FACES } from "./hero-surface";

// Simulated-UI demo nodes for the /new-features/multiplayer-editing page. Keys
// match components/feature-new/demo-presets/multiplayer-editing.keys.ts;
// resolved by demo-registry.tsx. Visuals are simulated, not live SDK instances.

/** Multiplayer-editing page personas mapped to shared headshots. */
const FACE = {
  hope: FACES.hope,
  ethan: FACES.ethan,
  you: FACES.jeff,
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
    <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 0, position: "relative", verticalAlign: "bottom", userSelect: "none" }}>
      <span style={{ display: "inline-block", width: 2, height: 16, borderRadius: 1, background: tone.color as string, flexShrink: 0 }} />
      <span style={{
        position: "absolute",
        bottom: "100%",
        left: 0,
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

const EDIT_TEAM = [
  { initials: "MA", kind: "human" as const, name: "Maya" },
  { initials: "SR", kind: "human" as const, name: "Sarah" },
  { initials: "AG", kind: "agent" as const, name: "Agent" },
];

export const MULTIPLAYER_EDITING_DEMOS: Record<string, ReactNode> = {
  /**
   * CO-EDITING: A document being edited simultaneously by Hope and Ethan.
   * Each person has a live labeled cursor and a colored text selection highlight.
   */
  "multiplayer-editing/hero/co-editing": (
    <Frame
      app="ME"
      crumb={<><b>brief-q3.md</b> <span className="sep">/</span> Tiptap</>}
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
        The Q3 campaign centers on the <Sel tone={CURSOR_HOPE}>migration story</Sel> &mdash; moving teams
        from async reviews to <LiveCursor name="Hope" tone={CURSOR_HOPE} /> live collaboration inside the product itself.
      </p>

      <p className="cmh-doc" style={{ margin: "6px 0 0" }}>
        Pricing: <Sel tone={CURSOR_ETHAN}>three usage tiers, starting at $0</Sel> &mdash; no per-seat cost.{" "}
        <LiveCursor name="Ethan" tone={CURSOR_ETHAN} />
      </p>

      <p className="code-microcopy" style={{ margin: "4px 0 0" }}>two cursors, one document &middot; Yjs merges both streams, zero conflict</p>
    </Frame>
  ),

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
        Section 4.2 &mdash; Revenue recognition. Hope is revising the opening clause.
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

      <p className="code-microcopy" style={{ margin: 0 }}>pen passes on accept &mdash; no racing, no overwrite</p>
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

      <p className="code-microcopy" style={{ margin: 0 }}>Hope changes the filter &mdash; Ethan&apos;s tab updates instantly, no refresh</p>
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
          Campaign brief &mdash; Maya is typing the opening paragraph.
        </p>
        <div style={{ position: "absolute", top: 12, right: 20 }}>
          <CursorTag name="Maya" />
        </div>
        <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.5, opacity: 0.85 }}>
          <mark style={{ background: "color-mix(in srgb, var(--vlp-color-accent) 22%, transparent)", padding: "1px 2px" }}>
            Pricing section
          </mark>{" "}
          &mdash; rewritten by the agent through the CRDT REST API.
        </p>
        <div style={{ position: "absolute", bottom: 12, left: 18 }}>
          <CursorTag name="Agent" kind="agent" />
        </div>
      </DocSurface>
      <p className="code-microcopy">both streams live and interleaved, zero conflict &middot; consent-gated edits go through Suggestions</p>
    </div>
  ),

  "multiplayer-editing/showcase/single-editor": (
    <div className="pv">
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <AvatarStack users={[{ initials: "SR", kind: "human", name: "Sarah (editing)" }, { initials: "MA", kind: "human", name: "Maya (read-only)" }]} />
        <ProvRow>
          request access <ProvArrow /> accept <ProvArrow /> the pen passes
        </ProvRow>
        <p className="code-microcopy">one pen, a live audience, read-only enforced by the SDK</p>
      </div>
    </div>
  ),

  "multiplayer-editing/showcase/state-sync": (
    <div className="pv">
      <DarkPanel>{"const [view, setView] = useLiveState(\n  \"filters\", { status: \"open\" },\n);\n// filters, toggles, any JSON — synced"}</DarkPanel>
    </div>
  ),

  "multiplayer-editing/showcase/merge": (
    <div className="pv">
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
          Forecast narrative &mdash; two analysts typing at once
        </p>
        <div style={{ position: "absolute", top: 14, left: 36 }}>
          <CursorTag name="Maya" />
        </div>
        <div style={{ position: "absolute", bottom: 14, right: 20 }}>
          <CursorTag name="Sarah" />
        </div>
        <p className="code-microcopy" style={{ marginTop: 28 }}>Yjs merges concurrent edits &middot; neither loses a keystroke</p>
      </DocSurface>
    </div>
  ),

  "multiplayer-editing/showcase/presence": (
    <div className="pv">
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <AvatarStack users={EDIT_TEAM} />
        <ProvRow>
          avatars &middot; named cursors &middot; live selection <ProvArrow /> inside the editor
        </ProvRow>
      </div>
    </div>
  ),

  "multiplayer-editing/showcase/checkpoints": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="Version checkpoint"
        body={"“Before pricing rewrite” · saved 09:14 · restore broadcasts to every client"}
        meta="named snapshots, saved and restored by API"
      />
    </div>
  ),

  "multiplayer-editing/showcase/encryption": (
    <div className="pv">
      <ProvRow>
        your keys <ProvArrow /> encrypt synced content
      </ProvRow>
      <ProvRow>
        Velt moves ciphertext <ProvArrow /> never the content
      </ProvRow>
    </div>
  ),

  "multiplayer-editing/showcase/offline": (
    <div className="pv">
      <ProvRow>
        offline edit <ProvArrow /> queued locally <ProvArrow /> merges on reconnect
      </ProvRow>
      <ProvRow>
        tab A <ProvArrow /> tab B stay synchronized
      </ProvRow>
    </div>
  ),

  "multiplayer-editing/showcase/editors": (
    <div className="pv">
      <div style={{ padding: 14 }}>
        <div className="int-chips">
          <span className="int-chip"><i />Tiptap</span>
          <span className="int-chip"><i />React Flow</span>
          <span className="int-chip"><i />CodeMirror</span>
          <span className="int-chip"><i />BlockNote</span>
          <span className="int-chip"><i />Lexical (soon)</span>
        </div>
        <p className="code-microcopy" style={{ marginTop: 10 }}>plus the core library for your own editor, whiteboard, or grid</p>
      </div>
    </div>
  ),

  "multiplayer-editing/showcase/stores": (
    <div className="pv">
      <div style={{ padding: 14 }}>
        <div className="int-chips">
          <span className="int-chip"><i />text</span>
          <span className="int-chip"><i />map</span>
          <span className="int-chip"><i />array</span>
          <span className="int-chip"><i />xml</span>
        </div>
        <p className="code-microcopy" style={{ marginTop: 10 }}>framework-agnostic CRDT stores &middot; subscriptions &middot; typed React hook</p>
      </div>
    </div>
  ),

  "multiplayer-editing/showcase/server-writes": (
    <div className="pv">
      <DarkPanel>{"POST /v2/crdt/update\n{ \"documentId\": \"brief-q3\",\n  \"op\": \"insert\", \"text\": \"...\" }\n// connected clients pick up the change"}</DarkPanel>
    </div>
  ),

  "multiplayer-editing/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>single editor mode panel &middot; restyle via wireframes</ProvRow>
      <ProvRow>collaboration cursors &middot; caret + label CSS classes</ProvRow>
      <ProvRow>global styles &middot; dark mode</ProvRow>
    </div>
  ),

  "multiplayer-editing/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>customMode &middot; container scoping &middot; tab locking</ProvRow>
      <ProvRow>debounceMs &middot; syncDuration &middot; merge config</ProvRow>
      <ProvRow>custom encryption &middot; CRDT + live state REST &middot; Redux middleware</ProvRow>
    </div>
  ),

  "multiplayer-editing/in-production/sales": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <AvatarStack users={[{ initials: "CW", kind: "human", name: "Copywriter" }, { initials: "C2", kind: "human", name: "Copywriter 2" }, { initials: "BR", kind: "human", name: "Brand reviewer" }]} />
      <p className="code-microcopy">two copywriters and a brand reviewer draft the same email live, edits merging mid-sentence</p>
    </div>
  ),

  "multiplayer-editing/in-production/fintech": (
    <div style={{ padding: 18 }}>
      <DocSurface>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Quarterly filing</p>
          <Chip kind="approved">analyst holds the pen</Chip>
        </div>
        <p className="code-microcopy" style={{ marginTop: 10 }}>reviewers watch the cells change live &middot; the handoff is requested, accepted, on the record</p>
      </DocSurface>
    </div>
  ),

  "multiplayer-editing/in-production/ops": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <ProvRow>
        dispatch board <ProvArrow /> identical on every screen
      </ProvRow>
      <ProvRow>
        field edit from a dead zone <ProvArrow /> merges on reconnect
      </ProvRow>
      <p className="code-microcopy">no refresh, no stale statuses</p>
    </div>
  ),

  "multiplayer-editing/in-production/ai": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <AvatarStack users={[{ initials: "MA", kind: "human", name: "Maya" }, { initials: "AG", kind: "agent", name: "Agent" }]} />
      <p className="code-microcopy">the agent rewrites one section while the human drafts another &middot; Yjs merges both streams</p>
    </div>
  ),

  "multiplayer-editing/related/suggestions": (
    <div className="pv">
      <ProvRow>
        edit needs consent <ProvArrow /> arrives as a suggestion
      </ProvRow>
      <ProvRow>
        a human accepts <ProvArrow /> or rejects
      </ProvRow>
    </div>
  ),

  "multiplayer-editing/related/presence": (
    <div className="pv">
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <AvatarStack users={EDIT_TEAM} />
        <p className="code-microcopy">who is in the document right now, human or agent, cursors included</p>
      </div>
    </div>
  ),

  "multiplayer-editing/related/comments": (
    <div className="pv">
      <ProvRow>
        the thread beside the edit <ProvArrow /> anchored to the exact line
      </ProvRow>
    </div>
  ),
};
