import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, DarkPanel, ProvRow, ProvArrow } from "../demos";
import {
  Av,
  Composer,
  DEL_STYLE,
  FACES,
  Frame,
  IconCheck,
  IconX,
} from "./hero-surface";

// Simulated-UI demo nodes for the /for/sales-enablement page. Keys are
// listed (pure-data) in ./solutions-sales-enablement.keys.ts and merged into
// the shared registry by ../demo-registry.tsx. Visuals are simulated, not live
// SDK instances. Voice is sales-enablement: decks, emails, landing pages,
// brand, legal, the client.

// Sales-enablement personas mapped to shared headshots.
const FACE = {
  sarah: FACES.hope,
  jordan: FACES.ethan,
} as const;

/**
 * A minimal deck-slide block: a bold slide title and a pricing claim line with
 * an optional inline highlight marking the disputed text.
 * @param {{ title: string; claim: ReactNode }} props Slide title and the pricing claim (may contain a .cmh-mark span).
 * @returns {JSX.Element} Slide content block.
 */
function SlideBlock({ title, claim }: { title: string; claim: ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 8,
        border: "1px solid var(--vlp-border-subtle)",
        background: "var(--vlp-bg-section-alt)",
        padding: "14px 16px",
        display: "grid",
        gap: 6,
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--vlp-font-heading)",
          fontSize: 14,
          fontWeight: 700,
          color: "var(--vlp-color-ink)",
          letterSpacing: "-0.015em",
        }}
      >
        {title}
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--vlp-font-mono)",
          fontSize: 11.5,
          color: "var(--vlp-color-text-muted)",
        }}
      >
        {claim}
      </p>
      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
        <span className="chip chip-pending">slide 6 &middot; pricing</span>
        <span className="chip" style={{ background: "var(--vlp-bg-wash)", color: "var(--vlp-color-text-subtle)" }}>
          Enterprise tier
        </span>
      </div>
    </div>
  );
}

/**
 * A single approver sign-off row: avatar, name, role badge, and a resolved chip.
 * @param {{ initials: string; name: string; role: string; img?: string }} props Persona details.
 * @returns {JSX.Element} Sign-off row.
 */
function SignOff({ initials, name, role, img }: { initials: string; name: string; role: string; img?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <Av initials={initials} tone="a3" img={img} />
      <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--vlp-color-ink)" }}>{name}</span>
      <span className="cmh-role">{role}</span>
      <span className="chip chip-approved" style={{ marginLeft: "auto" }}>Approved</span>
    </div>
  );
}

export const SOLUTIONS_SALES_ENABLEMENT_DEMOS: Record<string, ReactNode> = {
  "solutions/sales-enablement/hero": (
    <Frame
      app="DK"
      crumb={<><b>Proposal deck</b> <span className="sep">/</span> slide 6 &middot; pricing</>}
      users={[{ initials: "SR", tone: "a3", img: FACE.sarah }, { initials: "BA", agent: true }]}
    >
      <SlideBlock
        title="Velt Platform — Enterprise Pricing"
        claim={<>Annual contract value: <span className="cmh-mark">$18 / seat / mo</span> (unlimited viewers)</>}
      />

      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="BA" agent />
          Brand Agent
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">1m</span>
        </div>
        <p className="fb">
          This seat price conflicts with the approved Q3 rate table &mdash; the published rate is higher.
        </p>
        <p className="cmh-suggest">
          <span className="lbl">Suggested fix</span>
          <span className="body">
            <del style={DEL_STYLE}>$18 / seat</del>{" "}
            <span style={{ color: "var(--vlp-color-text-subtle)" }}>&rarr;</span>{" "}
            <ins style={{ background: "var(--vlp-color-approve-soft)", color: "#0c6a41", borderRadius: 3, padding: "0 3px" }}>$26 / seat</ins>
          </span>
        </p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Approve</button>
          <button type="button" className="cmh-btn reject"><IconX />Reject</button>
        </div>
      </div>

      <SignOff initials="SR" name="Sarah" role="· Sales lead" img={FACE.sarah} />

      <Composer placeholder="Reply or @mention…" you={FACE.jordan} />
    </Frame>
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
      <DarkPanel>{"POST /v2/activities/get\n{ \"data\": {\n  \"documentId\": \"promo-email\",\n  \"targetEntityId\": \"acme-bank\" } }"}</DarkPanel>
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
