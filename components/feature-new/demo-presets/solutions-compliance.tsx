import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, DarkPanel, ProvRow, ProvArrow } from "../demos";

// Simulated-UI demo nodes for the /solutions/compliance page. Keys are listed
// (pure-data) in ./solutions-compliance.keys.ts and merged into the shared
// registry by ../demo-registry.tsx. Visuals are simulated, not live SDK
// instances. Voice is compliance: policies, filings, attestations, controls,
// the examiner, and the regulated review itself.

/**
 * Compact framed "artifact" panel (a filing / policy / attestation under
 * review) with a label header. Keeps the regulated artifact visible across the
 * hero and the loop.
 * @param {{ label: string; children: ReactNode }} props Panel label + body.
 * @returns {JSX.Element} The artifact panel.
 */
function Artifact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ border: "1px solid var(--vlp-border-default)", borderRadius: 12, overflow: "hidden", background: "var(--vlp-bg-page)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "9px 13px",
          borderBottom: "1px solid var(--vlp-border-subtle)",
          fontFamily: "var(--vlp-font-mono)",
          fontSize: 11.5,
          color: "var(--vlp-color-text-muted)",
        }}
      >
        <span>{label}</span>
        <span className="chip chip-pending">in review</span>
      </div>
      <div style={{ padding: 14, display: "grid", gap: 10 }}>{children}</div>
    </div>
  );
}

/**
 * Small labeled metadata row used inside the filing artifact header band
 * (period, due date) so the regulated record reads as a real document.
 * @param {{ label: string; value: string }} props Field label + value.
 * @returns {JSX.Element} The metadata row.
 */
function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--vlp-font-mono)", fontSize: 11.5 }}>
      <span style={{ color: "var(--vlp-color-text-muted)" }}>{label}</span>
      <span style={{ color: "var(--vlp-font-heading)" }}>{value}</span>
    </div>
  );
}

export const SOLUTIONS_COMPLIANCE_DEMOS: Record<string, ReactNode> = {
  "solutions/compliance/hero": (
    <Artifact label="Disclosure filing · FIL-2209">
      <div style={{ display: "grid", gap: 5, paddingBottom: 4, borderBottom: "1px solid var(--vlp-border-subtle)" }}>
        <MetaField label="period" value="Q3 2026" />
        <MetaField label="due" value="Oct 31" />
      </div>
      <div
        style={{
          borderLeft: "2px solid var(--vlp-color-accent)",
          padding: "7px 10px",
          background: "var(--vlp-bg-wash)",
          borderRadius: 6,
          fontSize: 12.5,
          color: "var(--vlp-color-ink)",
        }}
      >
        Product class C disclosure line
      </div>
      <NotifItem
        avatar={{ initials: "RA", kind: "agent", name: "Review Agent" }}
        title={
          <>
            <strong>Review Agent</strong> · Required risk disclaimer missing for this product class.
          </>
        }
        meta="anchored to the disclosure line"
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <Precedent
        heading="approval chain · quorum step"
        body={"2 of 3 compliance officers signed"}
        meta="reject routes it back · every transition timestamped and attributed"
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span className="chip chip-pending">Export record</span>
      </div>
    </Artifact>
  ),

  "solutions/compliance/loop": (
    <AuditLog
      head={{ left: "Quarterly disclosure · FIL-2209", right: "draft → examiner-ready" }}
      rows={[
        { ts: "1", ev: <><strong>Analyst</strong> drafts the filing, links the controls it attests to</>, chip: { label: "draft", kind: "pending" } },
        { ts: "2", ev: <><strong>Review Agent</strong> flags a missing risk disclaimer on the exact line</>, chip: { label: "agent", kind: "agent" } },
        { ts: "3", ev: <><strong>Compliance officer</strong> resolves the flagged line in a team thread</>, chip: { label: "comment", kind: "pending" } },
        { ts: "4", ev: <>Quorum sign-off: 2 of 3 officers must approve to advance</>, chip: { label: "quorum", kind: "pending" } },
        { ts: "5", ev: <>Each finding, reply, and sign-off captured · immutable by default</>, chip: { label: "record", kind: "pending" } },
        { ts: "6", ev: <>Examiner export pulls the full chain as structured JSON</>, chip: { label: "export", kind: "approved" } },
      ]}
    />
  ),

  "solutions/compliance/loop/1": (
    <div className="pv-doc" style={{ padding: "14px 16px" }}>
      <div className="sk d" style={{ width: "48%", height: 10 }} />
      <div className="sk" style={{ width: "82%" }} />
      <div className="sk" style={{ width: "66%" }} />
    </div>
  ),

  "solutions/compliance/loop/2": (
    <div className="finding">
      <div className="fh">
        <span className="av-c av-agent">AI</span>Policy Agent
        <span className="chip chip-pending" style={{ marginLeft: "auto" }}>3 findings</span>
      </div>
      <p className="fb">Required risk disclaimer missing for this product class.</p>
    </div>
  ),

  "solutions/compliance/loop/3": (
    <div className="thread">
      <div className="thread-head">
        <span className="av-c a1">MK</span>
        <span className="who">Maya · Compliance</span>
        <span className="when">now</span>
      </div>
      <p className="thread-body">Added the Reg-W disclaimer to the product-class section. Resolving.</p>
    </div>
  ),

  "solutions/compliance/loop/4": (
    <div className="dag" style={{ padding: 0 }}>
      <div className="dag-node done" style={{ minWidth: 0 }}>Compliance officer · approved</div>
      <div className="dag-edge" style={{ height: 12 }} />
      <div className="dag-node done" style={{ minWidth: 0 }}>Quorum · 2 of 3 signed</div>
      <div className="dag-edge" style={{ height: 12 }} />
      <div className="dag-node" style={{ minWidth: 0 }}>Filing · cleared</div>
    </div>
  ),

  "solutions/compliance/loop/5": (
    <div className="audit" style={{ boxShadow: "none" }}>
      <div className="audit-row">
        <span className="ts">09:14</span>
        <span className="ev"><strong>Officer</strong> approved FIL-2209</span>
        <span className="chip chip-approved">approved</span>
      </div>
      <div className="audit-row">
        <span className="ts">09:14</span>
        <span className="ev">statusHistory appended</span>
        <span className="chip chip-agent">recorded</span>
      </div>
    </div>
  ),

  "solutions/compliance/loop/6": (
    <div style={{ display: "grid", gap: 8 }}>
      <span className="prov-row" style={{ background: "var(--vlp-bg-page)", color: "var(--vlp-color-ink-soft)", borderColor: "var(--vlp-border-default)" }}>
        examiner request <span className="arr">→</span> filtered API query
      </span>
      <span className="prov-row" style={{ background: "var(--vlp-bg-page)", color: "var(--vlp-color-ink-soft)", borderColor: "var(--vlp-border-default)" }}>
        the chain <span className="arr">→</span> structured JSON export
      </span>
    </div>
  ),

  "solutions/compliance/agent": (
    <div style={{ display: "grid", gap: 12 }}>
      <NotifItem
        avatar={{ initials: "RA", kind: "agent", name: "Review Agent" }}
        title={<><strong>Proposes</strong> · add the required risk disclaimer to the product class C line</>}
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <ProvRow>compliance officer approves <ProvArrow /> fix applies via webhook</ProvRow>
      <Precedent
        heading="audit line"
        body={"Approved · compliance officer · disclaimer applied · agent never held write access to the filing"}
        meta="on reject, nothing changes and the rejection is logged"
      />
    </div>
  ),

  "solutions/compliance/in-production": (
    <AuditLog
      head={{ left: "Compliance platform · review activity", right: "sign-offs this period" }}
      rows={[
        { ts: "Mon", ev: "Policy update · quorum approved", chip: { label: "approved", kind: "approved" } },
        { ts: "Tue", ev: "Regulatory filing · officer sign-off", chip: { label: "approved", kind: "approved" } },
        { ts: "Wed", ev: "Control attestation · signed", chip: { label: "approved", kind: "approved" } },
        { ts: "Thu", ev: "Examiner export · structured JSON", chip: { label: "export", kind: "pending" } },
      ]}
    />
  ),

  "solutions/compliance/fm/audit-trail": (
    <div className="pv">
      <DarkPanel>{"GET /v2/activities\n  ?document=FIL-2209\n  &user=compliance-officer"}</DarkPanel>
    </div>
  ),

  "solutions/compliance/fm/approval-flows": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "1", ev: <>analyst submits</>, chip: { label: "passed", kind: "approved" } },
          { ts: "2", ev: <>compliance officer</>, chip: { label: "passed", kind: "approved" } },
          { ts: "3", ev: <>quorum · 2 of 3</>, chip: { label: "pending", kind: "pending" } },
        ]}
      />
    </div>
  ),

  "solutions/compliance/fm/review-agents": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "AI", ev: <>missing risk disclaimer</>, chip: { label: "flag", kind: "agent" } },
          { ts: "AI", ev: <>PII in exhibit B</>, chip: { label: "flag", kind: "agent" } },
          { ts: "AI", ev: <>stale policy reference</>, chip: { label: "flag", kind: "agent" } },
        ]}
      />
    </div>
  ),

  "solutions/compliance/fm/comments": (
    <div className="pv">
      <NotifItem
        avatar={{ initials: "CO", kind: "human", name: "Compliance officer" }}
        title={<>Anchored to the <strong>disclosure line</strong> — not a screenshot of it</>}
        chip={{ label: "thread", kind: "pending" }}
      />
    </div>
  ),

  "solutions/compliance/fm/memory": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="precedent"
        body={"Disclaimer language settled last quarter. The agent stops re-flagging what reviewers already cleared."}
      />
    </div>
  ),
};
