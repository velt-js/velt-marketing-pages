import type { ReactNode } from "react";

import { AvatarStack, CursorTag, ProvRow, ProvArrow, DarkPanel, Chip, Precedent } from "../demos";

// Simulated-UI demo nodes for the /new-features/multiplayer-editing page. Keys
// match components/feature-new/demo-presets/multiplayer-editing.keys.ts;
// resolved by demo-registry.tsx. Visuals are simulated, not live SDK instances.

const EDIT_TEAM = [
  { initials: "MA", kind: "human" as const, name: "Maya" },
  { initials: "SR", kind: "human" as const, name: "Sarah" },
  { initials: "AG", kind: "agent" as const, name: "Agent" },
];

/**
 * A framed "editor document" surface used to host co-editing demos.
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
 * Small "Connected · Synced" status pill used to mark live co-editing.
 * @param {{ label?: string }} props Optional label override.
 * @returns {JSX.Element} Sync badge.
 */
function SyncBadge({ label = "Connected \u00b7 Synced" }: { label?: string }) {
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

export const MULTIPLAYER_EDITING_DEMOS: Record<string, ReactNode> = {
  "multiplayer-editing/hero/co-editing": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AvatarStack users={EDIT_TEAM} />
        <SyncBadge />
      </div>
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
          Q3 campaign brief. The launch narrative leads with the migration story
          <span style={{ display: "inline-block", width: 1.5, height: 14, background: "var(--ink, #0b353b)", verticalAlign: "-2px", marginLeft: 2 }} />
        </p>
        <div style={{ position: "absolute", top: 12, left: 230 }}>
          <CursorTag name="Maya" />
        </div>
        <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.5, opacity: 0.85 }}>
          Pricing: three usage tiers, no per-seat cost
        </p>
        <div style={{ position: "absolute", bottom: 12, right: 18 }}>
          <CursorTag name="Agent" kind="agent" />
        </div>
      </DocSurface>
      <p className="code-microcopy">two cursors, one Tiptap document · Yjs merges both streams, zero conflict</p>
    </div>
  ),

  "multiplayer-editing/hero/single-editor": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AvatarStack users={[{ initials: "SR", kind: "human", name: "Sarah (editing)" }, { initials: "MA", kind: "human", name: "Maya (viewing)" }, { initials: "DV", kind: "human", name: "Dev (viewing)" }]} />
        <Chip kind="approved">Sarah holds the pen</Chip>
      </div>
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13 }}>
          One person edits, everyone else watches live. Read-only enforced by the SDK.
        </p>
        <div style={{ marginTop: 12 }}>
          <ProvRow>
            Maya requests access <ProvArrow /> Sarah accepts <ProvArrow /> the pen passes
          </ProvRow>
        </div>
      </DocSurface>
      <p className="code-microcopy">passing the pen is a request-and-accept, never a race</p>
    </div>
  ),

  "multiplayer-editing/hero/state-sync": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <div className="int-chips">
        <span className="int-chip"><i />Filter: open</span>
        <span className="int-chip"><i />Sort: newest</span>
        <span className="int-chip"><i />Group: owner</span>
      </div>
      <DarkPanel footer="local-first · offline-safe · last-write-wins">
        {"const [filters, setFilters] = useLiveState(\n  \"board-filters\", defaultFilters,\n);\n// any JSON, synced across every client"}
      </DarkPanel>
    </div>
  ),

  "multiplayer-editing/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AvatarStack users={[{ initials: "MA", kind: "human", name: "Maya" }, { initials: "AG", kind: "agent", name: "Agent" }]} />
        <SyncBadge />
      </div>
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
          Campaign brief — Maya is typing the opening paragraph.
        </p>
        <div style={{ position: "absolute", top: 12, right: 20 }}>
          <CursorTag name="Maya" />
        </div>
        <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.5, opacity: 0.85 }}>
          <mark style={{ background: "color-mix(in srgb, var(--vlp-color-accent) 22%, transparent)", padding: "1px 2px" }}>
            Pricing section
          </mark>{" "}
          — rewritten by the agent through the CRDT REST API.
        </p>
        <div style={{ position: "absolute", bottom: 12, left: 18 }}>
          <CursorTag name="Agent" kind="agent" />
        </div>
      </DocSurface>
      <p className="code-microcopy">both streams live and interleaved, zero conflict · consent-gated edits go through Suggestions</p>
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
          Forecast narrative — two analysts typing at once
        </p>
        <div style={{ position: "absolute", top: 14, left: 36 }}>
          <CursorTag name="Maya" />
        </div>
        <div style={{ position: "absolute", bottom: 14, right: 20 }}>
          <CursorTag name="Sarah" />
        </div>
        <p className="code-microcopy" style={{ marginTop: 28 }}>Yjs merges concurrent edits · neither loses a keystroke</p>
      </DocSurface>
    </div>
  ),

  "multiplayer-editing/showcase/presence": (
    <div className="pv">
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <AvatarStack users={EDIT_TEAM} />
        <ProvRow>
          avatars · named cursors · live selection <ProvArrow /> inside the editor
        </ProvRow>
      </div>
    </div>
  ),

  "multiplayer-editing/showcase/checkpoints": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="Version checkpoint"
        body={"\u201CBefore pricing rewrite\u201D \u00b7 saved 09:14 \u00b7 restore broadcasts to every client"}
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
        <p className="code-microcopy" style={{ marginTop: 10 }}>framework-agnostic CRDT stores · subscriptions · typed React hook</p>
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
      <ProvRow>single editor mode panel · restyle via wireframes</ProvRow>
      <ProvRow>collaboration cursors · caret + label CSS classes</ProvRow>
      <ProvRow>global styles · dark mode</ProvRow>
    </div>
  ),

  "multiplayer-editing/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>customMode · container scoping · tab locking</ProvRow>
      <ProvRow>debounceMs · syncDuration · merge config</ProvRow>
      <ProvRow>custom encryption · CRDT + live state REST · Redux middleware</ProvRow>
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
        <p className="code-microcopy" style={{ marginTop: 10 }}>reviewers watch the cells change live · the handoff is requested, accepted, on the record</p>
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
      <p className="code-microcopy">the agent rewrites one section while the human drafts another · Yjs merges both streams</p>
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
