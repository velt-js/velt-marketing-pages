import type { ReactNode } from "react";

import { AuditLog, AvatarStack, NotifItem, Precedent, DarkPanel, ProvRow, ProvArrow } from "../demos";
import { Av, Composer, DEL_STYLE, FACES, Frame, IconCheck, IconX, INS_STYLE } from "./hero-surface";

// Simulated-UI demo nodes for the /for/legal page. Keys are listed
// (pure-data) in ./solutions-legal.keys.ts and merged into the shared registry
// by ../demo-registry.tsx. Visuals are simulated, not live SDK instances. Voice
// is legal: contracts, clauses, redlines, the counterparty, the client
// approver, the matter.


// Legal-page personas mapped to shared headshots.
const LEGAL_FACE = {
  maya: FACES.hope,
} as const;

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
      <Precedent
        style={{ width: "100%" }}
        heading="proposed language"
        body={"Clause 7 liability: “all losses” → “direct losses, capped at fees paid.” Accept or reject like a diff, with a reason on reject."}
      />
    </div>
  ),

  "solutions/legal/fm/comments": (
    <div className="pv">
      <NotifItem
        avatar={{ initials: "CN", kind: "human", name: "Counsel" }}
        title={<>Anchored to the <strong>indemnification clause</strong> — survives the redline that moves it</>}
        chip={{ label: "internal", kind: "pending" }}
      />
    </div>
  ),

  "solutions/legal/fm/approval-flows": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "1", ev: <>counsel</>, chip: { label: "passed", kind: "approved" } },
          { ts: "2", ev: <>partner</>, chip: { label: "passed", kind: "approved" } },
          { ts: "3", ev: <>client approver</>, chip: { label: "pending", kind: "pending" } },
        ]}
      />
    </div>
  ),

  "solutions/legal/fm/audit-trail": (
    <div className="pv">
      <DarkPanel>{"POST /v2/activities/get\n{ \"data\": {\n  \"documentId\": \"mutual-nda\",\n  \"targetEntityId\": \"acme-counterparty\" } }"}</DarkPanel>
    </div>
  ),

  "solutions/legal/fm/single-editor": (
    <div className="pv">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, width: "100%" }}>
        <span className="chip chip-pending">associate · holds the pen</span>
        <AvatarStack
          users={[
            { initials: "PA", kind: "human", name: "Partner" },
            { initials: "CN", kind: "human", name: "Counsel" },
            { initials: "AS", kind: "human", name: "Associate" },
          ]}
          overflow={2}
        />
      </div>
    </div>
  ),
};
