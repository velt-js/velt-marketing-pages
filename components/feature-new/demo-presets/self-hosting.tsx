import { Fragment, type ReactNode } from "react";

import { Precedent, ProvRow, ProvArrow, DarkPanel } from "../demos";
import { CrmPipelineBoard } from "./crm-board";
import { Frame, IconArrowRight, IconCheck, IconX } from "./hero-surface";

import "./self-hosting-showcase.css";

// Simulated-UI demo nodes for the /new-features/self-hosting page. Keys match
// components/feature-new/demo-presets/self-hosting.keys.ts. Self-hosting is a
// deployment/governance capability, so these visuals lean on architecture and
// data-flow diagrams (DarkPanel, ProvRow/ProvArrow, NodeBox) rather than
// avatar or comment UI. No human faces — infra-focused page.

// ─── Local helpers ────────────────────────────────────────────────────────────

/**
 * A labeled architecture node box used in the ARCHITECTURE diagram.
 * Renders a bordered card with a small mono label and a subtitle line.
 * Uses --vlp-* tokens only.
 * @param {{ label: string; sub: string; accent?: boolean }} props Box label, subtitle, and optional accent border.
 * @returns {JSX.Element} Architecture node card.
 */
function NodeBox({ label, sub, accent }: { label: string; sub: string; accent?: boolean }) {
  return (
    <div
      style={{
        border: `1.5px solid ${accent ? "var(--vlp-color-accent)" : "var(--vlp-border-default)"}`,
        borderRadius: 10,
        background: accent ? "var(--vlp-color-accent-soft)" : "var(--vlp-bg-page)",
        padding: "10px 14px",
        display: "grid",
        gap: 3,
        flex: 1,
        minWidth: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--vlp-font-mono)",
          fontSize: 11,
          fontWeight: 700,
          color: accent ? "var(--vlp-color-accent-ink)" : "var(--vlp-color-ink)",
          letterSpacing: 0.2,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 10.5, color: "var(--vlp-color-text-muted)", lineHeight: 1.4 }}>{sub}</span>
    </div>
  );
}

/**
 * Vertical connector arrow between NodeBox rows in architecture diagrams.
 * @returns {JSX.Element} Thin vertical connector with an arrowhead label.
 */
function NodeConnector({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: "2px 0",
      }}
    >
      <div style={{ width: 1.5, height: 10, background: "var(--vlp-border-default)" }} />
      <span
        style={{
          fontFamily: "var(--vlp-font-mono)",
          fontSize: 10,
          color: "var(--vlp-color-text-subtle)",
          letterSpacing: 0.3,
          padding: "0 6px",
        }}
      >
        {label}
      </span>
      <div style={{ width: 1.5, height: 10, background: "var(--vlp-border-default)" }} />
    </div>
  );
}

/**
 * A small status chip for the field-inventory table header cells.
 * Colors use --vlp-* tokens only.
 * @param {{ kind: "yours" | "velt" }} props Which storage owner to represent.
 * @returns {JSX.Element} Ownership chip.
 */
function OwnerChip({ kind }: { kind: "yours" | "velt" }) {
  const isYours = kind === "yours";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--vlp-font-mono)",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 0.3,
        padding: "2px 8px",
        borderRadius: 999,
        background: isYours ? "var(--vlp-color-approve-soft)" : "var(--vlp-color-accent-soft)",
        color: isYours ? "#0c6a41" : "var(--vlp-color-accent-ink)",
        whiteSpace: "nowrap" as const,
      }}
    >
      {isYours ? "your DB" : "Velt"}
    </span>
  );
}

// Field inventory rows: field name + which owner(s) store it.
const FIELD_ROWS: Array<{ field: string; yours: boolean; velt: boolean; note: string }> = [
  { field: "commentText", yours: true, velt: false, note: "full content" },
  { field: "userId", yours: false, velt: true, note: "opaque identifier" },
  { field: "name / email", yours: true, velt: false, note: "PII — your directory" },
  { field: "documentId", yours: true, velt: true, note: "shared key" },
  { field: "status / ts", yours: false, velt: true, note: "structural metadata" },
  { field: "attachments", yours: true, velt: false, note: "S3 / GCS URL only" },
];

// ─── Showcase icon glyphs (Tabler-style, inherit currentColor) ─────────────────

/** @returns {JSX.Element} Database glyph for "your store" destinations. */
function IconDatabase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      <path d="M4 11.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  );
}

/** @returns {JSX.Element} Speech-bubble glyph for the comment-storage card. */
function IconMessage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 18v-9a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H8l-4 3z" />
      <path d="M9 10h6M9 13.5h4" />
    </svg>
  );
}

/** @returns {JSX.Element} Video glyph for the recordings card. */
function IconVideo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="13" height="12" rx="2.5" />
      <path d="M16 10l5-3v10l-5-3z" />
    </svg>
  );
}

/** @returns {JSX.Element} Bell glyph for the notifications card. */
function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

/** @returns {JSX.Element} History / clock-arrow glyph for the activity-log card. */
function IconHistory() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 9a9 9 0 1 1-.5 5" />
      <path d="M3 4v5h5" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

/** @returns {JSX.Element} Lock glyph for the append-only / immutable row. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Paperclip glyph for the attachments card. */
function IconPaperclip() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 7l-6.5 6.5a3 3 0 0 0 4.24 4.24L19 11a5 5 0 0 0-7.07-7.07L5 10.5" />
    </svg>
  );
}

/** @returns {JSX.Element} File glyph for the uploaded source asset. */
function IconFile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
    </svg>
  );
}

/** @returns {JSX.Element} Users glyph for the user-directory card. */
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5M17 14.2A6 6 0 0 1 21 20" />
    </svg>
  );
}

/** @returns {JSX.Element} Clipboard-check glyph for the field-inventory card. */
function IconClipboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="4" width="14" height="17" rx="2.5" />
      <path d="M9 4a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" />
      <path d="M9 13l2 2 4-4" />
    </svg>
  );
}

/** @returns {JSX.Element} Server-stack glyph for the backend-SDKs card. */
function IconServer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  );
}

/** @returns {JSX.Element} Curly-braces glyph for the stateless REST lane. */
function IconBraces() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 4a3 3 0 0 0-3 3v2a2 2 0 0 1-2 2 2 2 0 0 1 2 2v2a3 3 0 0 0 3 3" />
      <path d="M16 4a3 3 0 0 1 3 3v2a2 2 0 0 0 2 2 2 2 0 0 0-2 2v2a3 3 0 0 1-3 3" />
    </svg>
  );
}

/** @returns {JSX.Element} Down-arrow glyph for vertical pipe connectors. */
function IconArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

/** @returns {JSX.Element} Sliders glyph for the configurable-surface header. */
function IconSliders() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="14" cy="18" r="2" />
    </svg>
  );
}

/** @returns {JSX.Element} Globe glyph for the region / residency selector. */
function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </svg>
  );
}

export const SELF_HOSTING_DEMOS: Record<string, ReactNode> = {
  "self-hosting/hero/architecture": (
    <Frame
      app="YA"
      crumb={<><b>your-infra</b> <span className="sep">/</span> architecture</>}
      right={<span className="chip chip-approved" style={{ fontSize: 10, padding: "2px 9px" }}>data residency ✓</span>}
    >
      {/* Top row: Your App + Your Database side by side */}
      <div style={{ display: "flex", gap: 8 }}>
        <NodeBox label="Your App" sub="SDK runs here · strips PII before write" />
        <NodeBox label="Your Database" sub="content · PII · attachments" accent />
      </div>

      <NodeConnector label="identifiers only ↓" />

      {/* Bottom: Velt node */}
      <div style={{ display: "flex", gap: 8 }}>
        <NodeBox label="Velt Cloud" sub="thread structure · document IDs · timestamps" />
      </div>

      <DarkPanel footer="velt.setDataProviders() — one call, full control">
        {"velt.setDataProviders({\n  comment: {\n    get:    (req) => myDb.fetch(req),\n    save:   (req) => myDb.insert(req),\n    delete: (req) => myDb.remove(req),\n  },\n});"}
      </DarkPanel>
    </Frame>
  ),

  "self-hosting/hero/data-flow": (
    <Frame
      app="DF"
      crumb={<><b>your-infra</b> <span className="sep">/</span> data-flow</>}
      right={<span className="chip chip-agent" style={{ fontSize: 10, padding: "2px 9px" }}>strip-on-write</span>}
    >
      <ProvRow>
        user types comment <ProvArrow /> PII stripped on the client
      </ProvRow>
      <ProvRow>
        content + PII <ProvArrow /> <strong>your database</strong>
      </ProvRow>
      <ProvRow>
        identifiers + timestamps <ProvArrow /> Velt Cloud
      </ProvRow>
      <ProvRow>
        on read: Velt IDs + your content <ProvArrow /> merged thread
      </ProvRow>

      <DarkPanel footer="what Velt actually stores">
        {"// Velt record (no PII, no content)\n{\n  \"threadId\":   \"thr_8kx2\",\n  \"documentId\": \"doc-q3\",\n  \"userId\":     \"usr_a71f\",\n  \"status\":     \"open\",\n  \"createdAt\":  1718000000\n}"}
      </DarkPanel>
    </Frame>
  ),

  "self-hosting/hero/field-inventory": (
    <Frame
      app="FI"
      crumb={<><b>your-infra</b> <span className="sep">/</span> field-inventory</>}
      right={<span className="chip chip-pending" style={{ fontSize: 10, padding: "2px 9px" }}>security review ready</span>}
    >
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 70px 60px 1.2fr",
          gap: "0 8px",
          padding: "6px 10px",
          background: "var(--vlp-bg-wash)",
          borderRadius: 8,
          fontFamily: "var(--vlp-font-mono)",
          fontSize: 10,
          fontWeight: 700,
          color: "var(--vlp-color-text-muted)",
          letterSpacing: 0.4,
        }}
      >
        <span>FIELD</span>
        <span style={{ textAlign: "center" }}>YOUR DB</span>
        <span style={{ textAlign: "center" }}>VELT</span>
        <span>NOTE</span>
      </div>

      {/* Data rows */}
      <div
        style={{
          border: "1px solid var(--vlp-border-subtle)",
          borderRadius: 9,
          overflow: "hidden",
        }}
      >
        {FIELD_ROWS.map((row, idx) => (
          <Fragment key={row.field}>
            {idx > 0 && (
              <div style={{ height: 1, background: "var(--vlp-border-subtle)" }} />
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.6fr 70px 60px 1.2fr",
                gap: "0 8px",
                padding: "7px 10px",
                alignItems: "center",
                background: "var(--vlp-bg-page)",
              }}
            >
              <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 11, fontWeight: 600, color: "var(--vlp-color-ink)" }}>
                {row.field}
              </span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {row.yours ? <OwnerChip kind="yours" /> : <span style={{ color: "var(--vlp-color-text-subtle)", fontSize: 11 }}>—</span>}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {row.velt ? <OwnerChip kind="velt" /> : <span style={{ color: "var(--vlp-color-text-subtle)", fontSize: 11 }}>—</span>}
              </div>
              <span style={{ fontSize: 11, color: "var(--vlp-color-text-muted)" }}>{row.note}</span>
            </div>
          </Fragment>
        ))}
      </div>

      <p className="code-microcopy">hand this table to your security reviewer · no call needed</p>
    </Frame>
  ),

  "self-hosting/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <div className="int-chips">
        <span className="int-chip"><i />human reviewer</span>
        <span className="int-chip"><i />agent · AGENT</span>
      </div>
      <ProvRow>
        each write <ProvArrow /> structure → Velt cloud
      </ProvRow>
      <ProvRow>
        each write <ProvArrow /> content → your database
      </ProvRow>
      <Precedent
        heading="merge on read"
        body={"one rendered thread · the agent comment keeps its Approve and Reject buttons"}
        meta="PII is stripped on the device before any request to Velt is made"
      />
      <p className="code-microcopy">humans and agents write through the same providers</p>
    </div>
  ),

  // Comment storage (wide tile): the comment provider's three operations, each
  // routing to your own store, with Velt holding only the thread structure.
  "self-hosting/showcase/comments": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconMessage />
          Comment data
          <span className="cmh-cc-pill">your DB</span>
        </div>
        <div className="cmh-cc-body">
          <div className="shs-map">
            <div className="shs-map-row">
              <div className="shs-map-main">
                <span className="shs-map-name shs-map-name--code">get(req)</span>
                <span className="shs-map-sub">read a thread from your store</span>
              </div>
              <span className="shs-dest shs-dest--yours"><IconDatabase />your DB</span>
            </div>
            <div className="shs-map-row">
              <div className="shs-map-main">
                <span className="shs-map-name shs-map-name--code">save(req)</span>
                <span className="shs-map-sub">write the comment content</span>
              </div>
              <span className="shs-dest shs-dest--yours"><IconDatabase />your DB</span>
            </div>
            <div className="shs-map-row">
              <div className="shs-map-main">
                <span className="shs-map-name shs-map-name--code">delete(req)</span>
                <span className="shs-map-sub">remove it on request</span>
              </div>
              <span className="shs-dest shs-dest--yours"><IconDatabase />your DB</span>
            </div>
          </div>
          <div className="apf-note">
            <span className="chip chip-agent">Velt</span>
            <span>keeps only the thread structure — never the content</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Recordings (narrow tile): the raw media file lands in your own bucket, and
  // the server-side work Velt would normally run is skipped entirely.
  "self-hosting/showcase/recordings": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--purple">
          <IconVideo />
          Recordings
          <span className="cmh-cc-pill">your bucket</span>
        </div>
        <div className="cmh-cc-body">
          <div className="shs-pipe">
            <div className="shs-node">
              <span className="shs-node-ic"><IconVideo /></span>
              <div className="shs-node-main">
                <span className="shs-node-name">session-rec.webm</span>
                <span className="shs-node-sub">raw media file</span>
              </div>
            </div>
            <div className="shs-arrow">
              <IconArrowDown />
              <span className="shs-arrow-label">you upload</span>
            </div>
            <div className="shs-node shs-node--store">
              <span className="shs-node-ic"><IconDatabase /></span>
              <div className="shs-node-main">
                <span className="shs-node-name">Your bucket</span>
                <span className="shs-node-sub">S3 · GCS · Azure</span>
              </div>
              <span className="shs-dest shs-dest--yours">your infra</span>
            </div>
          </div>
          <div className="shs-skips">
            <div className="shs-skip">
              <span className="shs-skip-ic"><IconX /></span>
              <span className="shs-skip-name">server-side encoding</span>
              <span className="shs-skip-tag">skipped</span>
            </div>
            <div className="shs-skip">
              <span className="shs-skip-ic"><IconX /></span>
              <span className="shs-skip-name">transcription</span>
              <span className="shs-skip-tag">skipped</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Notifications (narrow tile): custom content is resolved server-side from your
  // database, while comment notifications are assembled in the browser.
  "self-hosting/showcase/notifications": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--slate">
          <IconBell />
          Notifications
          <span className="cmh-cc-pill">hybrid</span>
        </div>
        <div className="cmh-cc-body">
          <div className="shs-map">
            <div className="shs-map-row">
              <div className="shs-map-main">
                <span className="shs-map-name">Custom content</span>
                <span className="shs-map-sub">resolved on the server</span>
              </div>
              <span className="shs-dest shs-dest--yours"><IconDatabase />your DB</span>
            </div>
            <div className="shs-map-row">
              <div className="shs-map-main">
                <span className="shs-map-name">Comment notifications</span>
                <span className="shs-map-sub">assembled in the browser</span>
              </div>
              <span className="shs-dest shs-dest--client">client-side</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Activity log (wide tile): log content and entity snapshots are saved to your
  // store, and there is no delete path — the records are append-only.
  "self-hosting/showcase/activity": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--plum">
          <IconHistory />
          Activity log
          <span className="cmh-cc-pill">append-only</span>
        </div>
        <div className="cmh-cc-body">
          <div className="shs-map">
            <div className="shs-map-row">
              <span className="shs-map-ic shs-map-ic--green"><IconCheck /></span>
              <div className="shs-map-main">
                <span className="shs-map-name">Log content</span>
                <span className="shs-map-sub">every action recorded</span>
              </div>
              <span className="shs-dest shs-dest--yours">saved</span>
            </div>
            <div className="shs-map-row">
              <span className="shs-map-ic shs-map-ic--green"><IconCheck /></span>
              <div className="shs-map-main">
                <span className="shs-map-name">Entity snapshot</span>
                <span className="shs-map-sub">captured at write time</span>
              </div>
              <span className="shs-dest shs-dest--yours">saved</span>
            </div>
            <div className="shs-map-row">
              <span className="shs-map-ic shs-map-ic--lock"><IconLock /></span>
              <div className="shs-map-main">
                <span className="shs-map-name">No delete path</span>
                <span className="shs-map-sub">records never mutate</span>
              </div>
              <span className="chip chip-agent">immutable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Attachments (wide tile): you upload the raw bytes to your own object storage
  // and hand Velt back only the URL.
  "self-hosting/showcase/attachments": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--teal">
          <IconPaperclip />
          Attachments
          <span className="cmh-cc-pill">your storage</span>
        </div>
        <div className="cmh-cc-body">
          <div className="shs-pipe">
            <div className="shs-node">
              <span className="shs-node-ic"><IconFile /></span>
              <div className="shs-node-main">
                <span className="shs-node-name">contract-v3.pdf</span>
                <span className="shs-node-sub">raw bytes</span>
              </div>
            </div>
            <div className="shs-arrow">
              <IconArrowDown />
              <span className="shs-arrow-label">you upload</span>
            </div>
            <div className="shs-stores">
              <span className="shs-store"><IconDatabase />Amazon S3</span>
              <span className="shs-store"><IconDatabase />Google GCS</span>
              <span className="shs-store"><IconDatabase />Azure Blob</span>
            </div>
          </div>
          <div className="apf-note">
            <span className="shs-dest shs-dest--velt">URL only</span>
            <span>Velt stores the link — never touches the bytes</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // User directory (narrow tile): Velt persists only an opaque userId; your own
  // directory resolves the display fields at render time.
  "self-hosting/showcase/users": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--ink">
          <IconUsers />
          User directory
          <span className="cmh-cc-pill">{"{ userId }"}</span>
        </div>
        <div className="cmh-cc-body">
          <div className="shs-pipe">
            <div className="shs-node">
              <span className="shs-node-ic"><IconDatabase /></span>
              <div className="shs-node-main">
                <span className="shs-node-name">Velt cloud</span>
                <span className="shs-node-sub">{"stores { userId } — opaque id"}</span>
              </div>
              <span className="shs-dest shs-dest--velt">Velt</span>
            </div>
            <div className="shs-arrow">
              <IconArrowDown />
              <span className="shs-arrow-label">resolves at render</span>
            </div>
            <div className="int-chips">
              <span className="int-chip"><i />name</span>
              <span className="int-chip"><i />email</span>
              <span className="int-chip"><i />avatar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Field inventory (narrow tile): a Velt-vs-yours matrix of every persisted
  // field, ready to hand to a security reviewer.
  "self-hosting/showcase/field-inventory": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--navy">
          <IconClipboard />
          Field inventory
          <span className="cmh-cc-pill">{`${FIELD_ROWS.length} fields`}</span>
        </div>
        <div className="cmh-cc-body">
          <div className="shs-inv">
            <div className="shs-inv-head">
              <span>field</span>
              <span>yours</span>
              <span>velt</span>
            </div>
            {FIELD_ROWS.map((row) => (
              <div className="shs-inv-row" key={row.field}>
                <span className="shs-inv-field">{row.field}</span>
                <span className="shs-inv-cell">
                  {row.yours ? <span className="shs-inv-dot shs-inv-dot--yours" /> : <span className="shs-inv-dash" />}
                </span>
                <span className="shs-inv-cell">
                  {row.velt ? <span className="shs-inv-dot shs-inv-dot--velt" /> : <span className="shs-inv-dash" />}
                </span>
              </div>
            ))}
          </div>
          <div className="apf-note">
            <span className="chip chip-approved">review-ready</span>
            <span>hand it to your security reviewer — no call needed</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Backend SDKs (wide tile): a stateful server SDK reading from your own store,
  // beside a stateless REST surface that needs no database.
  "self-hosting/showcase/backend-sdks": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--slate">
          <IconServer />
          Backend SDKs
          <span className="cmh-cc-pill">server-side</span>
        </div>
        <div className="cmh-cc-body">
          <div className="shs-lanes">
            <div className="shs-lane">
              <div className="shs-lane-head">
                <span className="shs-lane-ic"><IconDatabase /></span>
                <span className="shs-lane-name">Self-hosting SDK</span>
              </div>
              <code className="shs-lane-code">sdk.selfHosting.getComments(req)</code>
              <span className="shs-lane-sub">reads straight from your MongoDB + S3</span>
              <div><span className="chip chip-approved">your store</span></div>
            </div>
            <div className="shs-lane shs-lane--ghost">
              <div className="shs-lane-head">
                <span className="shs-lane-ic"><IconBraces /></span>
                <span className="shs-lane-name">REST API</span>
              </div>
              <code className="shs-lane-code">sdk.api.*</code>
              <span className="shs-lane-sub">stateless calls — no database required</span>
              <div><span className="chip chip-pending">no database</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "self-hosting/make-it-yours/look": (
    <div className="pv">
      <div className="shs-cfg">
        <div className="shs-cfg-head">
          <span className="shs-cfg-ic"><IconSliders /></span>
          <span className="shs-cfg-title">velt.config</span>
          <span className="chip chip-approved">self-hosted</span>
        </div>
        <div className="shs-cfg-rows">
          <div className="shs-cfg-row">
            <span className="shs-cfg-label"><IconDatabase />Data provider</span>
            <span className="shs-cfg-toggle shs-cfg-toggle--on" aria-hidden="true"><i /></span>
          </div>
          <div className="shs-cfg-row">
            <span className="shs-cfg-label"><IconGlobe />Region</span>
            <span className="shs-cfg-seg" aria-hidden="true">
              <span className="shs-cfg-opt">US</span>
              <span className="shs-cfg-opt shs-cfg-opt--on">EU</span>
              <span className="shs-cfg-opt">APAC</span>
            </span>
          </div>
          <div className="shs-cfg-row">
            <span className="shs-cfg-label"><IconBraces />Interface</span>
            <span className="shs-cfg-seg" aria-hidden="true">
              <span className="shs-cfg-opt shs-cfg-opt--on">SDK</span>
              <span className="shs-cfg-opt">REST</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),

  "self-hosting/make-it-yours/behavior": (
    <div className="pv">
      <div className="shs-route">
        <div className="shs-map">
          <div className="shs-map-row">
            <div className="shs-map-main">
              <span className="shs-map-name shs-map-name--code">get · save · delete</span>
              <span className="shs-map-sub">your data provider contract</span>
            </div>
            <span className="shs-dest shs-dest--yours"><IconDatabase />your DB</span>
          </div>
          <div className="shs-map-row">
            <div className="shs-map-main">
              <span className="shs-map-name">Recordings · attachments</span>
              <span className="shs-map-sub">binary routed to object storage</span>
            </div>
            <span className="shs-dest shs-dest--yours"><IconDatabase />your bucket</span>
          </div>
          <div className="shs-map-row">
            <div className="shs-map-main">
              <span className="shs-map-name">Identifiers · timestamps</span>
              <span className="shs-map-sub">structure only — no content</span>
            </div>
            <span className="shs-dest shs-dest--velt">Velt cloud</span>
          </div>
        </div>
        <div className="apf-note">
          <span className="chip chip-approved">in-region</span>
          <span>residency stays in your region — call via REST or SDK</span>
        </div>
      </div>
    </div>
  ),

  "self-hosting/in-production/sales": <CrmPipelineBoard />,

  "self-hosting/in-production/fintech": (
    <div style={{ padding: 18 }}>
      <DarkPanel footer="field-level inventory for the vendor security review">
        {"filing thread content → your database\nVelt → identifiers + timestamps"}
      </DarkPanel>
    </div>
  ),

  "self-hosting/in-production/ops": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <ProvRow>
        disputes · shipment notes · field photos <ProvArrow /> your storage
      </ProvRow>
      <p className="code-microcopy">cross-org review without handing a vendor the counterparty&apos;s data</p>
    </div>
  ),

  "self-hosting/in-production/ai": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <ProvRow>
        agent findings <ProvArrow /> same provider as human replies
      </ProvRow>
      <p className="code-microcopy">one residency story for generated work and human review alike</p>
    </div>
  ),

  "self-hosting/related/comments": (
    <div className="pv">
      <div className="shs-rel">
        <div className="shs-rel-cmt">
          <span className="shs-rel-ic"><IconMessage /></span>
          <div className="shs-rel-cmt-main">
            <span className="shs-rel-name">Comment thread</span>
            <span className="shs-rel-sub">content + replies</span>
          </div>
          <span className="shs-dest shs-dest--yours"><IconDatabase />your DB</span>
        </div>
        <p className="shs-rel-cap">comment content <IconArrowRight /> stays on your database</p>
      </div>
    </div>
  ),

  "self-hosting/related/audit-trail": (
    <div className="pv">
      <div className="shs-rel">
        <div className="shs-rel-rows">
          <div className="shs-rel-kv">
            <span className="shs-rel-key"><IconHistory />log content</span>
            <span className="shs-dest shs-dest--yours">your infra</span>
          </div>
          <div className="shs-rel-kv">
            <span className="shs-rel-key"><IconLock />append-only</span>
            <span className="chip chip-agent">immutable</span>
          </div>
        </div>
        <p className="shs-rel-cap">log content <IconArrowRight /> your infrastructure</p>
      </div>
    </div>
  ),

  "self-hosting/related/notifications": (
    <div className="pv">
      <div className="shs-rel">
        <div className="shs-rel-cmt">
          <span className="shs-rel-ic"><IconBell /></span>
          <div className="shs-rel-cmt-main">
            <span className="shs-rel-name">Self-hosted content</span>
            <span className="shs-rel-sub">resolved from your store</span>
          </div>
        </div>
        <div className="shs-rel-chans">
          <span className="shs-rel-chan"><IconServer />webhooks</span>
          <span className="shs-rel-chan"><IconMessage />your email</span>
        </div>
        <p className="shs-rel-cap">self-hosted content <IconArrowRight /> webhooks + your email provider</p>
      </div>
    </div>
  ),
};
