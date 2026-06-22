import { Fragment, type ReactNode } from "react";

import { AuditLog, Precedent, ProvRow, ProvArrow, DarkPanel } from "../demos";
import { Frame } from "./hero-surface";

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

      <DarkPanel footer="velt.setDataProvider() — one call, full control">
        {"velt.setDataProvider(\"comments\", {\n  get:    (ids) => myDb.fetch(ids),\n  save:   (data) => myDb.insert(data),\n  delete: (id)   => myDb.remove(id),\n});"}
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

  "self-hosting/showcase/comments": (
    <div className="pv">
      <DarkPanel>{"commentProvider = {\n  get, save, delete  // your store\n}\n// Velt keeps thread structure only"}</DarkPanel>
    </div>
  ),

  "self-hosting/showcase/recordings": (
    <div className="pv">
      <ProvRow>
        recording file <ProvArrow /> your bucket
      </ProvRow>
      <ProvRow>Velt skips server-side encoding and transcription</ProvRow>
    </div>
  ),

  "self-hosting/showcase/notifications": (
    <div className="pv">
      <ProvRow>
        custom notification content <ProvArrow /> resolved from your database
      </ProvRow>
      <ProvRow>
        comment notifications <ProvArrow /> built client-side
      </ProvRow>
    </div>
  ),

  "self-hosting/showcase/activity": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "append", ev: <><strong>log content</strong> → your store</>, chip: { label: "saved", kind: "approved" } },
          { ts: "append", ev: <><strong>entity snapshot</strong> → your store</>, chip: { label: "saved", kind: "approved" } },
          { ts: "—", ev: <>no delete · append-only</>, chip: { label: "immutable", kind: "agent" } },
        ]}
      />
    </div>
  ),

  "self-hosting/showcase/attachments": (
    <div className="pv">
      <ProvRow>
        raw file <ProvArrow /> you upload to S3 / GCS / Azure Blob
      </ProvRow>
      <ProvRow>
        return a URL <ProvArrow /> Velt never touches the bytes
      </ProvRow>
    </div>
  ),

  "self-hosting/showcase/users": (
    <div className="pv">
      <DarkPanel>{"Velt stores: { userId }\nyour directory resolves at render:\n  name · email · avatar"}</DarkPanel>
    </div>
  ),

  "self-hosting/showcase/field-inventory": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="Complete Field Inventory"
        body={"every persisted field · types · examples · strip rules · Velt DB vs yours"}
        meta="hand it to the security reviewer instead of scheduling a call"
      />
    </div>
  ),

  "self-hosting/showcase/backend-sdks": (
    <div className="pv">
      <DarkPanel>{"sdk.selfHosting.getComments(req)  // MongoDB + S3\nsdk.api.*                         // REST, no database"}</DarkPanel>
    </div>
  ),

  "self-hosting/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>resolveTimeout · retryCount · retryDelay</ProvRow>
      <ProvRow>revertOnFailure rollback</ProvRow>
      <ProvRow>resolveUsersConfig: org · folder · document</ProvRow>
    </div>
  ),

  "self-hosting/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>fieldsToRemove · additionalFields</ProvRow>
      <ProvRow>callback or endpoint per operation</ProvRow>
      <ProvRow>
        dataProvider debug stream <ProvArrow /> your observability
      </ProvRow>
    </div>
  ),

  "self-hosting/in-production/sales": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <ProvRow>
        deck and email feedback <ProvArrow /> your database
      </ProvRow>
      <ProvRow>
        attachments <ProvArrow /> your bucket
      </ProvRow>
      <p className="code-microcopy">the client&apos;s content policy satisfied without a second architecture</p>
    </div>
  ),

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
      <ProvRow>
        comment content <ProvArrow /> stays on your database
      </ProvRow>
    </div>
  ),

  "self-hosting/related/audit-trail": (
    <div className="pv">
      <ProvRow>
        log content <ProvArrow /> your infrastructure
      </ProvRow>
    </div>
  ),

  "self-hosting/related/notifications": (
    <div className="pv">
      <ProvRow>
        self-hosted content <ProvArrow /> webhooks + your email provider
      </ProvRow>
    </div>
  ),
};
