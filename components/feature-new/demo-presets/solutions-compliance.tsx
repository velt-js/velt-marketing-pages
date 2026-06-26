import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, ProvRow, ProvArrow } from "../demos";
import {
  AgentFindingCard,
  Av,
  Composer,
  FACES,
  Frame,
  IconCheck,
  IconX,
} from "./hero-surface";

import "./solutions-compliance-showcase.css";

// Simulated-UI demo nodes for the /for/compliance page. Keys are listed
// (pure-data) in ./solutions-compliance.keys.ts and merged into the shared
// registry by ../demo-registry.tsx. Visuals are simulated, not live SDK
// instances. Voice is compliance: policies, filings, attestations, controls,
// the examiner, and the regulated review itself.

// Compliance hero personas mapped to shared headshots.
// Nina = Compliance Officer (real face); Review Agent = blue agent avatar.
const COMPLIANCE_FACE = {
  nina: FACES.hope,
  analyst: FACES.ethan,
  officer: FACES.roman,
} as const;

/** @returns {JSX.Element} Lock glyph for signed / immutable audit events. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Open-book glyph for cited-precedent pills. */
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6c-2-1.4-4.5-1.5-7-1v12c2.5-.5 5-.4 7 1 2-1.4 4.5-1.5 7-1V5c-2.5-.5-5-.4-7 1z" />
      <path d="M12 6v12" />
    </svg>
  );
}

/** @returns {JSX.Element} Group glyph for the pending quorum step. */
function IconQuorum() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5M17 14.2A6 6 0 0 1 21 20" />
    </svg>
  );
}

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
        heading="Audit entry"
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
      <div className="scp-card scp-comment">
        <div className="scp-stack">
          <div className="apf-evt-row scp-evt">
            <span className="apf-evt-name">activity.recorded</span>
            <span className="apf-evt-seq">FIL-2209</span>
            <span className="apf-evt-sig"><IconLock />signed</span>
          </div>
          <div className="apf-evt-row scp-evt">
            <span className="apf-evt-name">officer.signoff</span>
            <span className="apf-evt-seq">#4211</span>
            <span className="apf-evt-sig"><IconLock />signed</span>
          </div>
        </div>
        <div className="scp-evt-foot">
          <span className="chip chip-approved">immutable</span>
          <span>every event on the record</span>
        </div>
      </div>
    </div>
  ),

  "solutions/compliance/fm/approval-flows": (
    <div className="pv">
      <div className="scp-card">
        <div className="scp-chain">
          <div className="scp-step">
            <Av initials="AN" tone="a1" img={COMPLIANCE_FACE.analyst} />
            <span className="scp-step-name">Analyst submits</span>
            <span className="chip chip-approved">passed</span>
          </div>
          <div className="scp-step">
            <Av initials="OF" tone="a4" img={COMPLIANCE_FACE.officer} />
            <span className="scp-step-name">Compliance officer</span>
            <span className="chip chip-approved">passed</span>
          </div>
          <div className="scp-step">
            <span className="scp-step-ic"><IconQuorum /></span>
            <span className="scp-step-name">Quorum · 2 of 3</span>
            <span className="chip chip-pending">pending</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "solutions/compliance/fm/review-agents": (
    <div className="pv scp-afc">
      <AgentFindingCard
        name="Review Agent"
        time="now"
        body="Missing risk disclaimer on the product-class line. Flag pinned to the exact filing row."
        actions={false}
      />
    </div>
  ),

  "solutions/compliance/fm/comments": (
    <div className="pv">
      <div className="scp-card scp-comment">
        <div className="cmh-cmt cmh-cmt--plain">
          <Av initials="CO" tone="a3" img={COMPLIANCE_FACE.nina} />
          <div className="cmh-cmt-main">
            <div className="cmh-cmt-head">
              <span className="cmh-cmt-name">Compliance officer</span>
              <span className="cmh-cmt-time">2m</span>
            </div>
            <p className="cmh-cmt-body">Anchored to the <strong>disclosure line</strong> — not a screenshot of it.</p>
            <span className="chip chip-pending">thread</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "solutions/compliance/fm/memory": (
    <div className="pv">
      <div className="scp-card scp-comment">
        <div className="scp-mem-row">
          <Av initials="NI" tone="a3" img={COMPLIANCE_FACE.nina} />
          <span className="scp-mem-main">
            <span className="scp-mem-name">Disclaimer language</span>
            <span className="scp-mem-meta">Nina · cleared last quarter</span>
          </span>
          <span className="chip chip-approved">precedent</span>
        </div>
        <p className="scp-mem-body">The agent stops re-flagging what reviewers already cleared.</p>
        <span className="scp-cite"><IconBook />source · FIL-1841</span>
      </div>
    </div>
  ),
};
