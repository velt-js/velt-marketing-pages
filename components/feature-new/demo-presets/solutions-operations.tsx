import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, ProvRow, ProvArrow } from "../demos";
import { Av, IconCheck } from "./hero-surface";
import { OperationsBoard } from "./ops-board";

import "./solutions-operations-showcase.css";

// Simulated-UI demo nodes for the /for/operations page. Keys are listed
// (pure-data) in ./solutions-operations.keys.ts and merged into the shared
// registry by ../demo-registry.tsx. Visuals are simulated, not live SDK
// instances. Voice is physical-world operations: orders, shipments, work
// orders, change orders, manifests, dispatch, the field crew, the counterparty.


export const SOLUTIONS_OPERATIONS_DEMOS: Record<string, ReactNode> = {
  "solutions/operations/hero": <OperationsBoard light />,

  "solutions/operations/loop": (
    <AuditLog
      head={{ left: "Change order · SHIP-4127", right: "filed → signed" }}
      rows={[
        { ts: "1", ev: <><strong>Counterparty</strong> files a change order against the shipment</>, chip: { label: "filed", kind: "pending" } },
        { ts: "2", ev: <><strong>Review Agent</strong> flags the revised rate at 9% over the lane rate</>, chip: { label: "agent", kind: "agent" } },
        { ts: "3", ev: <><strong>Ops lead</strong> debates internally, asks counterparty to confirm the date</>, chip: { label: "scoped", kind: "pending" } },
        { ts: "4", ev: <>Chain routes: ops → commercial → <strong>counterparty signer</strong></>, chip: { label: "chain", kind: "pending" } },
        { ts: "5", ev: <><strong>Site supervisor</strong> approves from the yard on mobile web</>, chip: { label: "approved", kind: "approved" } },
        { ts: "6", ev: <>The full chain recorded · queryable by record, user, or time</>, chip: { label: "audited", kind: "approved" } },
      ]}
    />
  ),

  "solutions/operations/loop/1": (
    <div style={{ display: "grid", gap: 8 }}>
      <span className="prov-row" style={{ background: "var(--vlp-bg-page)", color: "var(--vlp-color-ink-soft)", borderColor: "var(--vlp-border-default)" }}>
        delivery window <span className="arr">→</span> missed
      </span>
      <span className="prov-row" style={{ background: "var(--vlp-bg-page)", color: "var(--vlp-color-ink-soft)", borderColor: "var(--vlp-border-default)" }}>
        change order <span className="arr">→</span> filed on SHIP-4127
      </span>
    </div>
  ),

  "solutions/operations/loop/2": (
    <div className="finding">
      <div className="fh">
        <span className="av-c av-agent">AI</span>Ops Agent
      </div>
      <p className="fb">Revised rate is 9% over the contracted lane rate.</p>
    </div>
  ),

  "solutions/operations/loop/3": (
    <div className="thread">
      <div className="thread-head">
        <span className="av-c a1">MK</span>
        <span className="who">Maya · Ops</span>
        <span className="when">now</span>
      </div>
      <p className="thread-body">
        Internal: margin holds at 1,450. OK to confirm. <span className="agent-tag">INTERNAL</span>
      </p>
    </div>
  ),

  "solutions/operations/loop/4": (
    <div className="dag" style={{ padding: 0 }}>
      <div className="dag-node done" style={{ minWidth: 0 }}>Ops lead · approved</div>
      <div className="dag-edge" style={{ height: 12 }} />
      <div className="dag-node done" style={{ minWidth: 0 }}>Commercial · approved</div>
      <div className="dag-edge" style={{ height: 12 }} />
      <div className="dag-node" style={{ minWidth: 0 }}>Counterparty · pending</div>
    </div>
  ),

  "solutions/operations/loop/5": (
    <div className="notif-chans" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div className="notif-chan"><span className="ci ci-mail">@</span>Email</div>
      <div className="notif-chan"><span className="ci ci-app">in</span>Mobile web</div>
    </div>
  ),

  "solutions/operations/loop/6": (
    <div className="audit" style={{ boxShadow: "none" }}>
      <div className="audit-row">
        <span className="ts">11:02</span>
        <span className="ev"><strong>Both parties</strong> approved CO-12</span>
        <span className="chip chip-approved">applied</span>
      </div>
      <div className="audit-row">
        <span className="ts">11:02</span>
        <span className="ev">webhook → ERP update</span>
        <span className="chip chip-agent">synced</span>
      </div>
    </div>
  ),

  "solutions/operations/agent": (
    <div style={{ display: "grid", gap: 12 }}>
      <NotifItem
        avatar={{ initials: "MA", kind: "agent", name: "Manifest Agent" }}
        title={<><strong>Flags</strong> · manifest line 14 does not match the order quantity</>}
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <ProvRow>dispatcher approves <ProvArrow /> correction applies via webhook</ProvRow>
      <Precedent
        heading="Audit entry"
        body={"Approved · Dispatcher · Tue 09:14 · manifest corrected · agent never held write access to orders"}
        meta="on reject, nothing moves and the rejection is logged"
      />
    </div>
  ),

  "solutions/operations/in-production": (
    <AuditLog
      head={{ left: "Carrier · cross-org shipments", right: "sign-offs this week" }}
      rows={[
        { ts: "Mon", ev: "Release hold approved · ops + counterparty", chip: { label: "approved", kind: "approved" } },
        { ts: "Tue", ev: "Rate exception · commercial sign-off", chip: { label: "approved", kind: "approved" } },
        { ts: "Wed", ev: "Work order · field crew approved on mobile web", chip: { label: "approved", kind: "approved" } },
        { ts: "Thu", ev: "Audit export delivered to customer", chip: { label: "export", kind: "pending" } },
      ]}
    />
  ),

  "solutions/operations/fm/approval-flows": (
    <div className="pv">
      <div className="sop-tile">
        <div className="sop-cap">
          <span className="sop-cap-label">SHIP-4127 · sign-off chain</span>
          <span className="chip chip-pending">2 of 3</span>
        </div>
        <div className="sop-chain">
          <div className="sop-step sop-step--done">
            <span className="sop-step-ix"><IconCheck /></span>
            <span className="sop-step-name">Ops lead</span>
            <span className="chip chip-approved">passed</span>
          </div>
          <div className="sop-step sop-step--done">
            <span className="sop-step-ix"><IconCheck /></span>
            <span className="sop-step-name">Commercial · rate exception</span>
            <span className="chip chip-approved">passed</span>
          </div>
          <div className="sop-step">
            <span className="sop-step-ix sop-step-ix--wait" />
            <span className="sop-step-name">Counterparty signer</span>
            <span className="chip chip-pending">pending</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "solutions/operations/fm/comments": (
    <div className="pv">
      <div className="sop-tile">
        <div className="cmh-cmt cmh-cmt--plain">
          <Av initials="OP" tone="a1" />
          <div className="cmh-cmt-main">
            <div className="cmh-cmt-head">
              <span className="cmh-cmt-name">Ops lead</span>
              <span className="cmh-cmt-time">2m</span>
            </div>
            <p className="cmh-cmt-body">
              Anchored to the <strong>rate line</strong> on the manifest: not a screenshot of it.
            </p>
            <div className="sop-meta">
              <span className="chip chip-pending">internal</span>
              <span className="sop-anchor">manifest · rate line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "solutions/operations/fm/notifications": (
    <div className="pv">
      <div className="sop-tile">
        <div className="cmh-inrow">
          <span className="cmh-unread" />
          <div className="cmh-inmain">
            <p className="t">
              <b>Sign-off request</b> · release the hold
              <span className="chip chip-pending" style={{ marginLeft: 6 }}>sent</span>
            </p>
            <p className="m">access-filtered delivery</p>
          </div>
          <span className="cmh-when">now</span>
        </div>
        <div className="sop-chans">
          <span className="sop-chan"><span className="sop-chan-dot sop-chan-dot--app" />in-app · dispatch</span>
          <span className="sop-chan"><span className="sop-chan-dot sop-chan-dot--mail" />email · the yard</span>
        </div>
      </div>
    </div>
  ),

  "solutions/operations/fm/audit-trail": (
    <div className="pv">
      <div className="sop-tile">
        <div className="sop-cap">
          <span className="sop-cap-label">activities · query</span>
          <span className="chip chip-approved">signed</span>
        </div>
        <div className="apf-evt-row">
          <span className="apf-evt-name">approval.changed</span>
          <span className="apf-evt-sig"><IconCheck />signed</span>
          <span className="chip chip-approved">recorded</span>
        </div>
        <div className="sop-kv">
          <div className="sop-kv-row">
            <span className="sop-kv-key">documentId</span>
            <span className="sop-kv-val">ship-4127</span>
          </div>
          <div className="sop-kv-row">
            <span className="sop-kv-key">actionTypes</span>
            <span className="sop-kv-val">approval.changed</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "solutions/operations/fm/presence": (
    <div className="pv">
      <div className="sop-tile">
        <div className="sop-roster">
          <span className="sop-stack" aria-hidden="true">
            <Av initials="DS" tone="a1" />
            <Av initials="CP" tone="a3" />
          </span>
          <span className="sop-roster-meta">
            <span className="sop-roster-count">2 in this work order</span>
            <span className="sop-roster-sub">live · right now</span>
          </span>
        </div>
        <div className="sop-people">
          <div className="sop-person">
            <span className="sop-ava"><Av initials="DS" tone="a1" /><span className="sop-dot" /></span>
            <span className="sop-person-name">Your dispatcher</span>
            <span className="chip chip-approved">online</span>
          </div>
          <div className="sop-person">
            <span className="sop-ava"><Av initials="CP" tone="a3" /><span className="sop-dot" /></span>
            <span className="sop-person-name">Counterparty dispatcher</span>
            <span className="chip chip-approved">online</span>
          </div>
        </div>
        <p className="code-microcopy">in the work order now · before two people release the same hold</p>
      </div>
    </div>
  ),
};
