import type { ReactNode } from "react";

import { AuditLog, Precedent, ProvRow, ProvArrow, DarkPanel } from "../demos";

// Simulated-UI demo nodes for the /new-features/self-hosting page. Keys match
// components/feature-new/demo-presets/self-hosting.keys.ts. Self-hosting is a
// deployment/governance capability, so these visuals lean on architecture and
// data-flow diagrams (DarkPanel, ProvRow/ProvArrow, int-chips) rather than
// avatar or comment UI. Visuals are simulated, not live SDK instances.

export const SELF_HOSTING_DEMOS: Record<string, ReactNode> = {
  "self-hosting/hero/architecture": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <div className="int-chips">
        <span className="int-chip"><i />your app</span>
        <span className="int-chip"><i />your database</span>
        <span className="int-chip"><i />your bucket</span>
      </div>
      <ProvRow>
        provider boundary <ProvArrow /> Velt cloud holds the structural record only
      </ProvRow>
      <p className="code-microcopy">your content and PII on your infrastructure · Velt keeps minimal identifiers</p>
    </div>
  ),

  "self-hosting/hero/data-flow": (
    <div style={{ display: "grid", gap: 10, padding: 22 }}>
      <ProvRow>
        comment written <ProvArrow /> PII stripped on the device
      </ProvRow>
      <ProvRow>
        structure <ProvArrow /> Velt cloud
      </ProvRow>
      <ProvRow>
        content <ProvArrow /> your database
      </ProvRow>
      <ProvRow>
        on read <ProvArrow /> the two merge into one rendered thread
      </ProvRow>
      <p className="code-microcopy">strip-on-write · merge-on-read · your database first</p>
    </div>
  ),

  "self-hosting/hero/field-inventory": (
    <div style={{ padding: 18 }}>
      <DarkPanel footer="docs.velt.dev/self-host-data/field-inventory">
        {"field            Velt DB   your DB\ncommentText      —         ✓\nuserId           ✓         —\nname / email      —         ✓\ndocumentId       ✓         ✓\nstatus / ts      ✓         —"}
      </DarkPanel>
    </div>
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
