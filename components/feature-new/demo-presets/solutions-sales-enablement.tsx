import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, ProvRow, ProvArrow } from "../demos";
import { DigitalSalesRoom } from "./digital-sales-room";
import {
  Av,
  DEL_STYLE,
  FACES,
  INS_STYLE,
} from "./hero-surface";

import "./solutions-sales-enablement-showcase.css";

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

/** @returns {JSX.Element} Shield glyph for the signed audit-trail card header. */
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.4 3 8.5 7 10 4-1.5 7-5.6 7-10V6l-7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/** @returns {JSX.Element} Download-to-file glyph for the audit-log export button. */
function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="M8 11l4 4 4-4" />
      <path d="M5 19h14" />
    </svg>
  );
}

export const SOLUTIONS_SALES_ENABLEMENT_DEMOS: Record<string, ReactNode> = {
  // The hero reuses the Digital Sales Room board (the Comments-page Sales
  // enablement artifact) in its light-mode variant.
  "solutions/sales-enablement/hero": <DigitalSalesRoom light />,

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
        heading="Audit entry"
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
      <div className="sse-mini">
        <div className="cmh-cmt cmh-cmt--plain">
          <Av initials="JR" tone="a1" img={FACE.jordan} />
          <div className="cmh-cmt-main">
            <div className="cmh-cmt-head">
              <span className="cmh-cmt-name">Jordan</span>
              <span className="cmh-cmt-time">2m</span>
              <span className="chip chip-pending" style={{ marginLeft: "auto" }}>thread</span>
            </div>
            <p className="cmh-cmt-body">
              Anchored to the <strong>subject line</strong>: not a screenshot of it. <span className="cmh-mention">@Maya</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ),

  "solutions/sales-enablement/fm/approval-flows": (
    <div className="pv">
      <div className="apc-chain apf-chain--tight">
        <div className="apc-row">
          <div className="apc-left">
            <Av initials="SR" tone="a3" img={FACE.sarah} />
            <span className="apc-text">
              <span className="apc-name">Brand</span>
              <span className="apc-sub">Passed</span>
            </span>
          </div>
          <span className="chip chip-approved">passed</span>
        </div>
        <div className="apc-row">
          <div className="apc-left">
            <Av initials="JR" tone="a1" img={FACE.jordan} />
            <span className="apc-text">
              <span className="apc-name">Legal</span>
              <span className="apc-sub">Passed</span>
            </span>
          </div>
          <span className="chip chip-approved">passed</span>
        </div>
        <div className="apc-row">
          <div className="apc-left">
            <Av initials="CA" tone="a4" />
            <span className="apc-text">
              <span className="apc-name">Client approver</span>
              <span className="apc-sub">Pending</span>
            </span>
          </div>
          <span className="chip chip-pending">pending</span>
        </div>
      </div>
    </div>
  ),

  "solutions/sales-enablement/fm/review-agents": (
    <div className="pv">
      <div className="sse-mini">
        <div className="sse-byline">
          <Av initials="BA" agent />
          <span className="sse-byline-name">Brand Agent</span>
          <span className="chip chip-agent">3 flags</span>
        </div>
        <div className="sse-finds">
          <span className="sse-find"><span className="sse-find-dot" />off-brand CTA color</span>
          <span className="sse-find"><span className="sse-find-dot" />missing APR disclaimer</span>
          <span className="sse-find"><span className="sse-find-dot" />outdated footer logo</span>
        </div>
      </div>
    </div>
  ),

  "solutions/sales-enablement/fm/suggestions": (
    <div className="pv">
      <div className="sse-mini">
        <div className="sse-byline">
          <Av initials="RA" agent />
          <span className="sse-byline-name">Review Agent</span>
          <span className="chip chip-pending">suggested edit</span>
        </div>
        <p className="cmh-suggest">
          <span className="lbl">Suggested fix</span>
          <span className="body">
            <del style={DEL_STYLE}>Save 30%</del>{" "}
            <span style={{ color: "var(--vlp-color-text-subtle)" }}>&rarr;</span>{" "}
            <ins style={INS_STYLE}>Save up to 30% (see rate card)</ins>
          </span>
        </p>
      </div>
    </div>
  ),

  "solutions/sales-enablement/fm/audit-trail": (
    <div className="pv">
      <div className="sse-mini sse-audit">
        <div className="sse-byline">
          <span className="sse-aud-shield">
            <IconShield />
          </span>
          <span className="sse-byline-name">Audit trail</span>
          <span className="chip chip-approved">signed</span>
        </div>
        <div className="sse-aud-stream">
          <div className="sse-aud-row">
            <Av initials="SR" tone="a3" img={FACE.sarah} />
            <span className="sse-aud-ev">
              <strong>Sarah</strong> approved promo-email
            </span>
            <span className="sse-aud-ts">2:14pm</span>
          </div>
          <div className="sse-aud-row">
            <Av initials="BA" agent />
            <span className="sse-aud-ev">
              <strong>Brand Agent</strong> flagged CTA
            </span>
            <span className="sse-aud-ts">2:09pm</span>
          </div>
          <div className="sse-aud-row">
            <Av initials="LG" tone="a4" />
            <span className="sse-aud-ev">
              <strong>Legal</strong> requested changes
            </span>
            <span className="sse-aud-ts">1:55pm</span>
          </div>
        </div>
        <div className="sse-aud-funnel" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <button type="button" className="sse-aud-export">
          <IconDownload />
          <span className="sse-aud-export-label">Export log</span>
          <span className="sse-aud-fmt">CSV</span>
        </button>
      </div>
    </div>
  ),

  "solutions/sales-enablement/fm/notifications": (
    <div className="pv">
      <div className="sse-mini">
        <div className="sse-byline">
          <Av initials="LG" tone="a3" />
          <span className="sse-byline-name">Approval request</span>
          <span className="chip chip-pending">sent</span>
        </div>
        <div>
          <p className="sse-note">Legal review &middot; campaign email</p>
          <div className="sse-channels">
            <span className="sse-ch">in-app</span>
            <span className="sse-ch">email</span>
            <span className="sse-ch">Slack</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
