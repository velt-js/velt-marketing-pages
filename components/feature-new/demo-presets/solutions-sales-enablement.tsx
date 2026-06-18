import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, DarkPanel, ProvRow, ProvArrow } from "../demos";

// Simulated-UI demo nodes for the /solutions/sales-enablement page. Keys are
// listed (pure-data) in ./solutions-sales-enablement.keys.ts and merged into
// the shared registry by ../demo-registry.tsx. Visuals are simulated, not live
// SDK instances. Voice is sales-enablement: decks, emails, landing pages,
// brand, legal, the client.

/**
 * Compact framed "artifact" panel (a deck slide / email under review) with a
 * label header. Keeps the vertical artifact visible across hero and the loop.
 * @param {{ label: string; children: ReactNode }} props Panel label + body.
 * @returns {JSX.Element} The artifact panel.
 */
function Artifact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", background: "var(--bg)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "9px 13px",
          borderBottom: "1px solid var(--line-soft)",
          fontFamily: "var(--mono)",
          fontSize: 11.5,
          color: "var(--muted)",
        }}
      >
        <span>{label}</span>
        <span className="chip chip-pending">in review</span>
      </div>
      <div style={{ padding: 14, display: "grid", gap: 10 }}>{children}</div>
    </div>
  );
}

export const SOLUTIONS_SALES_ENABLEMENT_DEMOS: Record<string, ReactNode> = {
  "solutions/sales-enablement/hero": (
    <Artifact label="Q3 promo deck · slide 4">
      <div
        style={{
          height: 72,
          borderRadius: 8,
          background: "linear-gradient(120deg, var(--brand-soft), var(--bg-wash))",
          display: "grid",
          placeItems: "center",
          fontFamily: "var(--heading)",
          fontWeight: 700,
          color: "var(--brand-ink)",
        }}
      >
        Save 30% this quarter
      </div>
      <NotifItem
        avatar={{ initials: "BA", kind: "agent", name: "Brand Agent" }}
        title={
          <>
            <strong>Brand Agent</strong> · This discount conflicts with the client&rsquo;s published rate card. Suggested fix attached.
          </>
        }
        meta="anchored to the pricing claim"
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <NotifItem
        avatar={{ initials: "ML", kind: "human", name: "Maya · Brand lead" }}
        title={
          <>
            <strong>Maya</strong> · Good catch, use the approved Q3 rate.
          </>
        }
        meta="brand lead"
        chip={{ label: "human", kind: "pending" }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span className="chip chip-approved">Client · Approve</span>
      </div>
    </Artifact>
  ),

  "solutions/sales-enablement/loop": (
    <AuditLog
      head={{ left: "Campaign email · bank client", right: "draft → client-approved" }}
      rows={[
        { ts: "1", ev: <><strong>Marketer</strong> @mentions brand lead on the subject line</>, chip: { label: "comment", kind: "pending" } },
        { ts: "2", ev: <><strong>Review Agent</strong> flags missing APR disclaimer + off-palette CTA</>, chip: { label: "agent", kind: "agent" } },
        { ts: "3", ev: <><strong>Marketer</strong> accepts the disclaimer fix, rejects the logo flag</>, chip: { label: "consent", kind: "pending" } },
        { ts: "4", ev: <>Chain advances: brand → legal → <strong>client approver</strong></>, chip: { label: "chain", kind: "pending" } },
        { ts: "5", ev: <><strong>Client</strong> approved · email cleared to send</>, chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "solutions/sales-enablement/loop/1": (
    <div className="thread">
      <div className="thread-head">
        <span className="av-c a2">JR</span>
        <span className="who">Jordan</span>
        <span className="when">now</span>
      </div>
      <p className="thread-body">Subject line too close to the competitor’s tagline? @Maya</p>
    </div>
  ),

  "solutions/sales-enablement/loop/2": (
    <div className="finding">
      <div className="fh">
        <span className="av-c av-agent">AI</span>Brand Agent
        <span className="chip chip-pending" style={{ marginLeft: "auto" }}>3 findings</span>
      </div>
      <p className="fb">APR claim is missing its required disclaimer.</p>
    </div>
  ),

  "solutions/sales-enablement/loop/3": (
    <div className="diff" style={{ fontSize: 12.5, padding: "12px 14px", boxShadow: "none" }}>
      <p>
        Rates from <del>4.9%</del> <ins>4.9% APR. Terms apply.</ins>
      </p>
    </div>
  ),

  "solutions/sales-enablement/loop/4": (
    <div className="dag" style={{ padding: 0 }}>
      <div className="dag-node done" style={{ minWidth: 0 }}>Brand · approved</div>
      <div className="dag-edge" style={{ height: 12 }} />
      <div className="dag-node done" style={{ minWidth: 0 }}>Legal · approved</div>
      <div className="dag-edge" style={{ height: 12 }} />
      <div className="dag-node" style={{ minWidth: 0 }}>Client approver · pending</div>
    </div>
  ),

  "solutions/sales-enablement/loop/5": (
    <div className="audit" style={{ boxShadow: "none" }}>
      <div className="audit-row">
        <span className="ts">14:02</span>
        <span className="ev"><strong>Legal</strong> approved the draft</span>
        <span className="chip chip-approved">approved</span>
      </div>
      <div className="audit-row">
        <span className="ts">15:40</span>
        <span className="ev"><strong>Client</strong> signed off</span>
        <span className="chip chip-approved">sent</span>
      </div>
    </div>
  ),

  "solutions/sales-enablement/agent": (
    <div style={{ display: "grid", gap: 12 }}>
      <NotifItem
        avatar={{ initials: "BA", kind: "agent", name: "Brand Agent" }}
        title={<><strong>Proposes</strong> · add the required APR disclaimer to the footer</>}
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <ProvRow>marketer approves <ProvArrow /> change applies via webhook</ProvRow>
      <Precedent
        heading="audit line"
        body={"Approved · Maya · Tue 14:21 · disclaimer applied · agent never held write access"}
        meta="on reject, nothing touches the asset and the rejection is logged"
      />
    </div>
  ),

  "solutions/sales-enablement/in-production": (
    <AuditLog
      head={{ left: "Agency · enterprise client campaign", right: "approvals this month" }}
      rows={[
        { ts: "Mon", ev: "Deck approved · brand + client", chip: { label: "approved", kind: "approved" } },
        { ts: "Tue", ev: "Promo email · legal sign-off", chip: { label: "approved", kind: "approved" } },
        { ts: "Wed", ev: "Landing page · client approver", chip: { label: "approved", kind: "approved" } },
        { ts: "Thu", ev: "Audit export delivered to client", chip: { label: "export", kind: "pending" } },
      ]}
    />
  ),

  "solutions/sales-enablement/fm/comments": (
    <div className="pv">
      <NotifItem
        avatar={{ initials: "JR", kind: "human", name: "Jordan" }}
        title={<>Anchored to the <strong>subject line</strong> — not a screenshot of it</>}
        chip={{ label: "thread", kind: "pending" }}
      />
    </div>
  ),

  "solutions/sales-enablement/fm/approval-flows": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "1", ev: <>brand</>, chip: { label: "passed", kind: "approved" } },
          { ts: "2", ev: <>legal</>, chip: { label: "passed", kind: "approved" } },
          { ts: "3", ev: <>client approver</>, chip: { label: "pending", kind: "pending" } },
        ]}
      />
    </div>
  ),

  "solutions/sales-enablement/fm/review-agents": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "AI", ev: <>off-brand CTA color</>, chip: { label: "flag", kind: "agent" } },
          { ts: "AI", ev: <>missing APR disclaimer</>, chip: { label: "flag", kind: "agent" } },
          { ts: "AI", ev: <>outdated footer logo</>, chip: { label: "flag", kind: "agent" } },
        ]}
      />
    </div>
  ),

  "solutions/sales-enablement/fm/suggestions": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="suggested edit"
        body={"“Save 30%” → “Save up to 30% (see rate card)”. Accept or reject like a diff."}
      />
    </div>
  ),

  "solutions/sales-enablement/fm/audit-trail": (
    <div className="pv">
      <DarkPanel>{"GET /v2/activities\n  ?document=promo-email\n  &client=acme-bank"}</DarkPanel>
    </div>
  ),

  "solutions/sales-enablement/fm/notifications": (
    <div className="pv">
      <NotifItem
        title={<>Approval request · <strong>legal review</strong></>}
        meta="in-app · email · Slack"
        chip={{ label: "sent", kind: "pending" }}
      />
    </div>
  ),
};
