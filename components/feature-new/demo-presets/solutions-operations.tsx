import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, DarkPanel, ProvRow, ProvArrow, AvatarStack } from "../demos";
import { Av, Composer, FACES, Frame, IconCheck, IconX } from "./hero-surface";

// Simulated-UI demo nodes for the /for/operations page. Keys are listed
// (pure-data) in ./solutions-operations.keys.ts and merged into the shared
// registry by ../demo-registry.tsx. Visuals are simulated, not live SDK
// instances. Voice is physical-world operations: orders, shipments, work
// orders, change orders, manifests, dispatch, the field crew, the counterparty.

// Personas mapped to shared headshots for the hero surface.
const OPS_FACES = {
  leo: FACES.ethan,   // Leo Chen · Dispatch lead (real headshot)
} as const;

/**
 * A two-column field row inside the work-order surface: label on the left,
 * value on the right. Used to display work-order attributes concisely.
 * @param {{ label: string; value: ReactNode }} props Field label and value.
 * @returns {JSX.Element} A field row.
 */
function WoField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5 }}>
      <span style={{ fontFamily: "var(--vlp-font-mono)", color: "var(--vlp-color-text-muted)", fontSize: 11.5 }}>{label}</span>
      <span style={{ color: "var(--vlp-color-ink)", fontWeight: 600 }}>{value}</span>
    </div>
  );
}


export const SOLUTIONS_OPERATIONS_DEMOS: Record<string, ReactNode> = {
  "solutions/operations/hero": (
    <Frame
      app="WO"
      crumb={<><b>Work order</b> <span className="sep">/</span> WO-2271</>}
      users={[
        { initials: "LE", tone: "a1", img: OPS_FACES.leo },
        { initials: "RA", agent: true },
      ]}
    >
      {/* Work-order fields */}
      <div
        style={{
          display: "grid",
          gap: 7,
          padding: "10px 12px",
          borderRadius: 10,
          background: "var(--vlp-bg-wash)",
          border: "1px solid var(--vlp-border-subtle)",
        }}
      >
        <WoField label="site" value="Oakland Yard 3" />
        <WoField label="crew" value="Field Unit 7" />
        <WoField label="sign-off" value={<span className="chip chip-pending">awaiting field record</span>} />
        <WoField label="release" value={<span className="chip chip-pending">hold · pending signature</span>} />
      </div>

      {/* Internal visibility chip */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="chip chip-pending">internal</span>
        <span style={{ fontSize: 11.5, color: "var(--vlp-color-text-muted)" }}>
          counterparty sees only what is meant for them
        </span>
      </div>

      {/* Agent finding */}
      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="RA" agent />
          Review Agent
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">just now</span>
        </div>
        <p className="fb">
          Hold shipment until field record WO-2271 is signed &mdash; counterparty release blocked.
        </p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Approve</button>
          <button type="button" className="cmh-btn reject"><IconX />Reject</button>
        </div>
      </div>

      {/* Dispatch note thread */}
      <div className="thread">
        <div className="thread-head">
          <Av initials="LE" tone="a1" img={OPS_FACES.leo} />
          <span className="who">Leo</span>
          <span className="cmh-role">&middot; Dispatch</span>
          <span className="cmh-when">3m</span>
        </div>
        <p className="thread-body">
          Hold the shipment until the field record is signed. Do not release to carrier yet.{" "}
          <span className="agent-tag">INTERNAL</span>
        </p>
      </div>

      <Composer placeholder="Reply or @mention field crew&hellip;" you={OPS_FACES.leo} />
    </Frame>
  ),

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
        heading="audit line"
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
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "1", ev: <>ops lead</>, chip: { label: "passed", kind: "approved" } },
          { ts: "2", ev: <>commercial · rate exception</>, chip: { label: "passed", kind: "approved" } },
          { ts: "3", ev: <>counterparty signer</>, chip: { label: "pending", kind: "pending" } },
        ]}
      />
    </div>
  ),

  "solutions/operations/fm/comments": (
    <div className="pv">
      <NotifItem
        avatar={{ initials: "OP", kind: "human", name: "Ops lead" }}
        title={<>Anchored to the <strong>rate line</strong> on the manifest — not a screenshot of it</>}
        chip={{ label: "internal", kind: "pending" }}
      />
    </div>
  ),

  "solutions/operations/fm/notifications": (
    <div className="pv">
      <NotifItem
        title={<>Sign-off request · <strong>release the hold</strong></>}
        meta="in-app for dispatch · email for the yard · access-filtered"
        chip={{ label: "sent", kind: "pending" }}
      />
    </div>
  ),

  "solutions/operations/fm/audit-trail": (
    <div className="pv">
      <DarkPanel>{"POST /v2/activities/get\n{ \"data\": {\n  \"documentId\": \"ship-4127\",\n  \"actionTypes\": [\"approval.changed\"] } }"}</DarkPanel>
    </div>
  ),

  "solutions/operations/fm/presence": (
    <div className="pv">
      <AvatarStack
        users={[
          { initials: "DS", kind: "human", name: "Your dispatcher" },
          { initials: "CP", kind: "human", name: "Counterparty dispatcher" },
        ]}
      />
      <p className="code-microcopy">in the work order now · before two people release the same hold</p>
    </div>
  ),
};
