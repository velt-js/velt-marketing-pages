import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, DarkPanel, ProvRow, ProvArrow } from "../demos";
import {
  Av,
  Composer,
  FACES,
  Frame,
  IconCheck,
  IconX,
} from "./hero-surface";

// Simulated-UI demo nodes for the /for/compliance page. Keys are listed
// (pure-data) in ./solutions-compliance.keys.ts and merged into the shared
// registry by ../demo-registry.tsx. Visuals are simulated, not live SDK
// instances. Voice is compliance: policies, filings, attestations, controls,
// the examiner, and the regulated review itself.

// Compliance hero personas mapped to shared headshots.
// Nina = Compliance Officer (real face); Review Agent = blue agent avatar.
const COMPLIANCE_FACE = {
  nina: FACES.hope,
} as const;

/**
 * A single labeled field/value row inside the disclosure filing artifact.
 * Renders a label on the left and the value on the right, monospaced.
 * @param {{ label: string; value: ReactNode; flagged?: boolean }} props Field content and optional flag highlight.
 * @returns {JSX.Element} The field row.
 */
function FilingField({ label, value, flagged }: { label: string; value: ReactNode; flagged?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "var(--vlp-font-mono)",
        fontSize: 11.5,
        padding: "5px 8px",
        borderRadius: 6,
        background: flagged ? "var(--vlp-color-accent-soft)" : "transparent",
        border: flagged ? "1px solid var(--vlp-border-default)" : "1px solid transparent",
      }}
    >
      <span style={{ color: "var(--vlp-color-text-muted)" }}>{label}</span>
      <span
        style={{
          color: flagged ? "var(--vlp-color-accent)" : "var(--vlp-color-ink)",
          fontWeight: flagged ? 700 : 500,
        }}
      >
        {value}
      </span>
    </div>
  );
}


export const SOLUTIONS_COMPLIANCE_DEMOS: Record<string, ReactNode> = {
  "solutions/compliance/hero": (
    <Frame
      app="FL"
      crumb={<><b>Disclosure filing</b> <span className="sep">/</span> FIL-2209</>}
      users={[
        { initials: "NI", tone: "a3", img: COMPLIANCE_FACE.nina },
        { initials: "RA", agent: true },
      ]}
    >
      {/* Filing field grid */}
      <div
        style={{
          display: "grid",
          gap: 3,
          padding: "8px 0",
          borderBottom: "1px solid var(--vlp-border-subtle)",
          marginBottom: 4,
        }}
      >
        <FilingField label="Reporting period" value="Q3 2026" />
        <FilingField label="Filing type" value="Form ADV-W" />
        <FilingField label="Threshold" value="$500 M AUM" />
        <FilingField label="Attestation" value="missing" flagged />
      </div>

      {/* Agent finding anchored to the flagged attestation field */}
      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="RA" agent />
          Review Agent
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">now</span>
        </div>
        <p className="fb">
          Officer attestation is required before filing. No signature on record for this reporting period.
        </p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Accept</button>
          <button type="button" className="cmh-btn reject"><IconX />Reject</button>
        </div>
      </div>

      {/* Officer sign-off row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          paddingTop: 6,
          fontFamily: "var(--vlp-font-mono)",
          fontSize: 11.5,
          color: "var(--vlp-color-text-muted)",
        }}
      >
        <Av initials="NI" tone="a3" img={COMPLIANCE_FACE.nina} />
        <span>Nina &mdash; Compliance Officer</span>
        <span className="chip chip-approved" style={{ marginLeft: "auto" }}>signed off</span>
      </div>

      <Composer placeholder="Add a note to the filing record&hellip;" you={COMPLIANCE_FACE.nina} />
    </Frame>
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
