import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, ProvRow, ProvArrow } from "../demos";
import { Av, Composer, DEL_STYLE, FACES, Frame, IconArrowRight, IconCheck, IconX, INS_STYLE } from "./hero-surface";

import "./solutions-legal-showcase.css";

// Simulated-UI demo nodes for the /for/legal page. Keys are listed
// (pure-data) in ./solutions-legal.keys.ts and merged into the shared registry
// by ../demo-registry.tsx. Visuals are simulated, not live SDK instances. Voice
// is legal: contracts, clauses, redlines, the counterparty, the client
// approver, the matter.


// Legal-page personas mapped to shared headshots.
const LEGAL_FACE = {
  maya: FACES.hope,
  partner: FACES.roman,
  associate: FACES.ethan,
} as const;

/** @returns {JSX.Element} Clock glyph for a pending approval step. */
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/** @returns {JSX.Element} Lock glyph for a signed / tamper-evident audit event. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Pen glyph for the editor who currently holds the pen. */
function IconPen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20h4L18 10a2 2 0 0 0-3-3L5 17z" />
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

export const SOLUTIONS_LEGAL_DEMOS: Record<string, ReactNode> = {
  "solutions/legal/hero": (
    <Frame
      app="ND"
      crumb={<><b>Mutual NDA</b> <span className="sep">/</span> clause&nbsp;7</>}
      users={[
        { initials: "MA", tone: "a2", img: LEGAL_FACE.maya },
        { initials: "RA", agent: true },
      ]}
    >
      <p className="cmh-doc" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--vlp-color-ink)", margin: 0 }}>
        7.3&nbsp; The receiving party shall indemnify the disclosing party against{" "}
        <span className="cmh-mark">any and all losses</span> arising from any breach.
      </p>

      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="RA" agent />
          Review Agent
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">now</span>
        </div>
        <p className="fb">
          No liability cap &mdash; &ldquo;any and all losses&rdquo; is unbounded. Playbook caps at fees paid.
        </p>
        <p className="cmh-suggest">
          <span className="lbl">Suggested fix</span>
          <span className="body">
            <del style={DEL_STYLE}>any and all losses</del>{" "}
            <span style={{ color: "var(--vlp-color-text-subtle)" }}>&rarr;</span>{" "}
            <ins style={INS_STYLE}>direct losses, capped at fees paid</ins>
          </span>
        </p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Accept</button>
          <button type="button" className="cmh-btn reject"><IconX />Reject</button>
        </div>
      </div>

      <div className="thread cmh-pop">
        <div className="thread-head">
          <Av initials="MA" tone="a2" img={LEGAL_FACE.maya} />
          <span className="who">Maya</span>
          <span className="cmh-role">&middot; Counsel</span>
          <span className="cmh-when">3m</span>
        </div>
        <p className="thread-body">
          Agreed &mdash; accepting the cap. I&rsquo;ll note the rationale before we countersign.
        </p>
        <div style={{ marginTop: 2 }}>
          <span className="chip chip-approved">counsel approved</span>
        </div>
      </div>

      <Composer placeholder="Add a note to the matter&hellip;" you={LEGAL_FACE.maya} />
    </Frame>
  ),

  "solutions/legal/loop": (
    <AuditLog
      head={{ left: "Mutual NDA · counterparty paper", right: "first redline → attributed clause history" }}
      rows={[
        { ts: "1", ev: <>NDA lands · the deal team opens review on the <strong>matter</strong></>, chip: { label: "upload", kind: "pending" } },
        { ts: "2", ev: <><strong>Counsel</strong> threads the indemnification cap, scoped to the internal team</>, chip: { label: "internal", kind: "pending" } },
        { ts: "3", ev: <><strong>Counsel</strong> + <strong>agent</strong> propose redlines on clause 7 and the liability clause</>, chip: { label: "agent", kind: "agent" } },
        { ts: "4", ev: <>Reviewer accepts clause 7, rejects the fallback with a reason</>, chip: { label: "consent", kind: "pending" } },
        { ts: "5", ev: <>Chain advances: counsel → partner → <strong>client approver</strong> · history attributed</>, chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "solutions/legal/loop/1": (
    <div className="pv-doc" style={{ padding: "14px 16px" }}>
      <div className="sk d" style={{ width: "44%", height: 10 }} />
      <div className="sk" style={{ width: "80%" }} />
      <div className="sk" style={{ width: "62%" }} />
    </div>
  ),

  "solutions/legal/loop/2": (
    <div className="thread">
      <div className="thread-head">
        <span className="av-c a2">JR</span>
        <span className="who">Jordan</span>
        <span className="when">1h</span>
      </div>
      <p className="thread-body">
        Team-only: push back on the 2x cap before we send. <span className="agent-tag">INTERNAL</span>
      </p>
    </div>
  ),

  "solutions/legal/loop/3": (
    <div className="diff" style={{ fontSize: 12.5, padding: "12px 14px", boxShadow: "none" }}>
      <p>
        Liability capped at <del>fees paid</del> <ins>2x fees paid in the prior 12 months</ins>.
      </p>
    </div>
  ),

  "solutions/legal/loop/4": (
    <div className="dag" style={{ padding: 0 }}>
      <div className="dag-node done" style={{ minWidth: 0 }}>Counsel · approved</div>
      <div className="dag-edge" style={{ height: 12 }} />
      <div className="dag-node done" style={{ minWidth: 0 }}>Partner · approved</div>
      <div className="dag-edge" style={{ height: 12 }} />
      <div className="dag-node" style={{ minWidth: 0 }}>Client · pending</div>
    </div>
  ),

  "solutions/legal/loop/5": (
    <div className="audit" style={{ boxShadow: "none" }}>
      <div className="audit-row">
        <span className="ts">Mon</span>
        <span className="ev"><strong>Counsel</strong> proposed clause 7</span>
        <span className="chip chip-agent">proposed</span>
      </div>
      <div className="audit-row">
        <span className="ts">Tue</span>
        <span className="ev"><strong>Partner</strong> accepted redline</span>
        <span className="chip chip-approved">accepted</span>
      </div>
    </div>
  ),

  "solutions/legal/agent": (
    <div style={{ display: "grid", gap: 12 }}>
      <NotifItem
        avatar={{ initials: "RA", kind: "agent", name: "Redline Agent" }}
        title={<><strong>Proposes</strong> · fallback limitation-of-liability language on the liability clause</>}
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <ProvRow>counsel accepts <ProvArrow /> your handler applies the clause</ProvRow>
      <Precedent
        heading="attributed clause history"
        body={"Accepted · Counsel · Tue 09:14 · clause applied · agent never held write access"}
        meta="on reject, nothing changes and the reason is logged"
      />
    </div>
  ),

  "solutions/legal/in-production": (
    <AuditLog
      head={{ left: "Legal ops platform · matters in review", right: "attributed this month" }}
      rows={[
        { ts: "Mon", ev: "NDA · redlines accepted, counsel sign-off", chip: { label: "approved", kind: "approved" } },
        { ts: "Tue", ev: "MSA · partner approval on the position", chip: { label: "approved", kind: "approved" } },
        { ts: "Wed", ev: "Contract · client approver records final decision", chip: { label: "approved", kind: "approved" } },
        { ts: "Thu", ev: "Clause history exported for the client audit", chip: { label: "export", kind: "pending" } },
      ]}
    />
  ),

  "solutions/legal/fm/suggestions": (
    <div className="pv">
      <div className="slg-cap">
        Clause 7 &middot; liability
        <span className="chip chip-pending">pending</span>
      </div>
      <div className="slg-diff">
        <span className="slg-del">all losses</span>
        <span className="slg-arrow"><IconArrowRight /></span>
        <span className="slg-ins">direct losses, capped at fees paid</span>
      </div>
      <p className="slg-note">Accept or reject like a diff &mdash; a reason is logged on reject.</p>
    </div>
  ),

  "solutions/legal/fm/comments": (
    <div className="pv">
      <div className="slg-byline">
        <Av initials="CN" tone="a2" />
        <span className="slg-byline-name">Counsel</span>
        <span className="slg-byline-meta">&middot; 3m</span>
        <span className="chip chip-pending">internal</span>
      </div>
      <p className="cmh-cmt-body" style={{ fontSize: 12.5 }}>
        Anchored to the <strong>indemnification clause</strong> &mdash; survives the redline that moves it.
      </p>
    </div>
  ),

  "solutions/legal/fm/approval-flows": (
    <div className="pv">
      <div className="slg-chain">
        <div className="slg-chain-row">
          <span className="slg-step slg-step--done"><IconCheck /></span>
          <span className="slg-step-name">counsel</span>
          <span className="chip chip-approved">passed</span>
        </div>
        <div className="slg-chain-row">
          <span className="slg-step slg-step--done"><IconCheck /></span>
          <span className="slg-step-name">partner</span>
          <span className="chip chip-approved">passed</span>
        </div>
        <div className="slg-chain-row">
          <span className="slg-step slg-step--wait"><IconClock /></span>
          <span className="slg-step-name">client approver</span>
          <span className="chip chip-pending">pending</span>
        </div>
      </div>
    </div>
  ),

  "solutions/legal/fm/audit-trail": (
    <div className="pv">
      <div className="slg-cap">
        Mutual NDA &middot; activity
        <span className="slg-sig"><IconLock />signed</span>
      </div>
      <div className="slg-kv">
        <div className="slg-kv-row">
          <span className="slg-kv-key">event</span>
          <span className="slg-kv-val">clause.7.accepted</span>
        </div>
        <div className="slg-kv-row">
          <span className="slg-kv-key">actor</span>
          <span className="slg-kv-val">counsel</span>
        </div>
        <div className="slg-kv-row">
          <span className="slg-kv-key">counterparty</span>
          <span className="slg-kv-val">Meridian Holdings</span>
        </div>
      </div>
      <p className="slg-note">Every transition is already an attributed, exportable record.</p>
    </div>
  ),

  "solutions/legal/fm/single-editor": (
    <div className="pv">
      <div className="slg-pen-rows">
        <div className="slg-pen-row">
          <Av initials="AS" tone="a1" img={LEGAL_FACE.associate} />
          <span className="slg-pen-main">
            <span className="slg-pen-name">Associate</span>
            <span className="slg-pen-sub">drafting clause 7</span>
          </span>
          <span className="slg-pen-tag slg-pen-tag--pen"><IconPen />holds the pen</span>
        </div>
        <div className="slg-pen-row">
          <Av initials="PA" tone="a4" img={LEGAL_FACE.partner} />
          <span className="slg-pen-main">
            <span className="slg-pen-name">Partner &amp; counsel</span>
            <span className="slg-pen-sub">watching live</span>
          </span>
          <span className="slg-pen-tag slg-pen-tag--read"><IconEye />read-only</span>
        </div>
      </div>
      <p className="slg-note">Pen passes on accept &mdash; no racing, no overwrite.</p>
    </div>
  ),
};
