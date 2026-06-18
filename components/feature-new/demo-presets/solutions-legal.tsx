import type { ReactNode } from "react";

import { AuditLog, AvatarStack, NotifItem, Precedent, DarkPanel, ProvRow, ProvArrow } from "../demos";

// Simulated-UI demo nodes for the /solutions/legal page. Keys are listed
// (pure-data) in ./solutions-legal.keys.ts and merged into the shared registry
// by ../demo-registry.tsx. Visuals are simulated, not live SDK instances. Voice
// is legal: contracts, clauses, redlines, the counterparty, the client
// approver, the matter.

/**
 * Compact framed "artifact" panel (a contract / NDA under review) with a label
 * header. Keeps the vertical artifact visible across hero and the loop.
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
 * Diff-style redline block: current language struck through, proposed language
 * highlighted. Mirrors how a suggestion renders on the exact clause.
 * @param {{ current: string; proposed: string }} props Current + proposed clause text.
 * @returns {JSX.Element} The redline diff block.
 */
function RedlineDiff({ current, proposed }: { current: string; proposed: string }) {
  return (
    <div style={{ display: "grid", gap: 6, fontSize: 12.5, lineHeight: 1.45 }}>
      <span
        style={{
          color: "var(--vlp-color-text-muted)",
          textDecoration: "line-through",
          textDecorationColor: "var(--vlp-color-accent)",
        }}
      >
        {current}
      </span>
      <span
        style={{
          color: "var(--vlp-color-ink)",
          background: "var(--vlp-color-accent-soft)",
          borderRadius: 6,
          padding: "4px 7px",
        }}
      >
        {proposed}
      </span>
    </div>
  );
}

/**
 * Right-rail approval chain row (counsel to partner to client) with a step
 * marker. Each node is a stage the contract routes through in order.
 * @param {{ step: number; total: number }} props Current step + total steps.
 * @returns {JSX.Element} The approval chain strip.
 */
function ApprovalChain({ step, total }: { step: number; total: number }) {
  const stages = ["counsel", "partner", "client"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6,
        padding: "8px 11px",
        border: "1px solid var(--vlp-border-subtle)",
        borderRadius: 8,
        background: "var(--vlp-bg-wash)",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {stages.map((stage, index) => (
          <span key={stage} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span
              className={`chip ${index < step ? "chip-approved" : index === step ? "chip-pending" : ""}`}
              style={index > step ? { opacity: 0.5 } : undefined}
            >
              {stage}
            </span>
            {index < stages.length - 1 ? <ProvArrow /> : null}
          </span>
        ))}
      </span>
      <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 11, color: "var(--vlp-color-text-muted)" }}>
        step {step + 1} of {total}
      </span>
    </div>
  );
}

export const SOLUTIONS_LEGAL_DEMOS: Record<string, ReactNode> = {
  "solutions/legal/hero": (
    <Artifact label="Mutual NDA · clause 7">
      <RedlineDiff
        current="The receiving party shall indemnify for all losses."
        proposed="The receiving party shall indemnify for direct losses, capped at fees paid."
      />
      <NotifItem
        avatar={{ initials: "RA", kind: "agent", name: "Redline Agent" }}
        title={
          <>
            <strong>Redline Agent</strong> · Proposes a liability cap matching your fallback playbook. Rationale attached.
          </>
        }
        meta="suggestion anchored to clause 7"
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <NotifItem
        title={
          <>
            Thread on the <strong>indemnification clause</strong> · deal-team strategy
          </>
        }
        meta="collapsed"
        chip={{ label: "internal", kind: "pending" }}
      />
      <ApprovalChain step={1} total={3} />
    </Artifact>
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
      <DarkPanel>{"GET /v2/activities\n  ?document=mutual-nda\n  &matter=acme-counterparty"}</DarkPanel>
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
