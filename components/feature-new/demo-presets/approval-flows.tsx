import type { ReactNode } from "react";

import { AuditLog, Chip, Precedent, ProvRow, ProvArrow, AvatarStack, DarkPanel } from "../demos";

// Simulated-UI demo nodes for the /new-features/approval-flows page. Keys match
// components/feature-new/demo-presets/approval-flows.keys.ts; resolved by
// demo-registry.tsx. Visuals are simulated, not live SDK instances.

const WORKFLOW_DEF = `POST /v2/workflow/definitions/create
{
  "steps": [
    { "id": "brand",  "type": "agent" },
    { "id": "legal",  "type": "human" },
    { "id": "exec",   "type": "human" }
  ],
  "onReject": "loop-to-author"
}`;

const RUN_EVENT = `POST https://your-app.com/hooks
{
  "event": "step.completed",
  "executionId": "exec_8842",
  "step": "legal",
  "decision": "approved",
  "by": "sarah@acme.com"
}`;

const RUN_STATUS = `GET /v2/workflow/executions/exec_8842
{
  "status": "in-progress",
  "pendingStep": "exec",
  "decisions": [
    { "step": "brand", "result": "failed" },
    { "step": "legal", "result": "approved" }
  ]
}`;

/**
 * Compact node-type + status row used by approval-flow scenes.
 * @param {{ children: ReactNode }} props Row content.
 * @returns {JSX.Element} Flow row.
 */
function FlowRow({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink, #0b353b)" }}>
      {children}
    </div>
  );
}

export const APPROVAL_FLOWS_DEMOS: Record<string, ReactNode> = {
  "approval-flows/hero/builder": (
    <DarkPanel footer="your builder UI · Velt's definition API">{WORKFLOW_DEF}</DarkPanel>
  ),

  "approval-flows/hero/run": (
    <AuditLog
      head={{ left: "Run · Q3 campaign email", right: "execution exec_8842" }}
      rows={[
        {
          ts: "Step 1",
          ev: (
            <>
              <strong>Brand Agent</strong> flagged the headline claim
            </>
          ),
          chip: { label: "agent", kind: "agent" },
        },
        {
          ts: "Step 2",
          ev: (
            <>
              <strong>Sarah</strong> approved · redline on the CTA
            </>
          ),
          chip: { label: "approved", kind: "approved" },
        },
        {
          ts: "Step 3",
          ev: (
            <>
              <strong>Compliance Agent</strong> running
            </>
          ),
          chip: { label: "agent", kind: "agent" },
        },
        {
          ts: "Step 4",
          ev: (
            <>
              <strong>Final approval</strong> · team lead
            </>
          ),
          chip: { label: "pending", kind: "pending" },
        },
      ]}
    />
  ),

  "approval-flows/hero/quorum": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <AvatarStack
        users={[
          { initials: "LE", kind: "human", name: "Legal" },
          { initials: "FI", kind: "human", name: "Finance" },
          { initials: "BR", kind: "away", name: "Brand (waiting)" },
        ]}
      />
      <FlowRow>
        2 of 3 approved <ProvArrow /> <Chip kind="approved">quorum met</Chip>
      </FlowRow>
      <p className="code-microcopy">parallel group · N-of-M threshold · waiting siblings released</p>
    </div>
  ),

  "approval-flows/hero/agent": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <AvatarStack users={[{ initials: "BA", kind: "agent", name: "Brand Agent" }, { initials: "SA", kind: "human", name: "Sarah" }]} />
      <ProvRow>
        agent node runs <ProvArrow /> reports pass / fail <ProvArrow /> human gate downstream
      </ProvRow>
      <p className="code-microcopy">agent and human nodes compose one pipeline through one API</p>
    </div>
  ),

  "approval-flows/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <AuditLog
        head={{ left: "Workflow · marketing email", right: "one DAG, both actor types" }}
        rows={[
          {
            ts: "Step 1",
            ev: (
              <>
                <strong>Brand Agent</strong> failed · finding pinned to the headline
              </>
            ),
            chip: { label: "agent", kind: "agent" },
          },
          {
            ts: "Step 2",
            ev: (
              <>
                <strong>Sarah</strong> waiting · Approve / Reject
              </>
            ),
            chip: { label: "human", kind: "pending" },
          },
          {
            ts: "Step 3",
            ev: (
              <>
                <strong>Compliance Agent</strong> pending
              </>
            ),
            chip: { label: "agent", kind: "agent" },
          },
        ]}
      />
      <Precedent
        heading="override · recorded"
        body={"Dismiss on the agent finding requires a comment · recorded as overrideOfAi · by team lead"}
        meta="one pipeline, both actor types, consent visible"
      />
    </div>
  ),

  "approval-flows/showcase/nodes": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "1", ev: <><strong>Brand Agent</strong> pre-screened the deck</>, chip: { label: "agent", kind: "agent" } },
          { ts: "2", ev: <><strong>Legal</strong> signed off on the clause</>, chip: { label: "human", kind: "approved" } },
        ]}
      />
    </div>
  ),

  "approval-flows/showcase/quorum": (
    <div className="pv">
      <ProvRow>
        3 reviewers run in parallel <ProvArrow /> 2-of-3 threshold
      </ProvRow>
      <ProvRow>
        quorum met <ProvArrow /> waiting siblings released
      </ProvRow>
    </div>
  ),

  "approval-flows/showcase/routing": (
    <div className="pv">
      <DarkPanel>{"// sandboxed JSON-AST, no eval\namount > 25000\n  ? route(\"cfo\")\n  : route(\"budget-owner\")"}</DarkPanel>
    </div>
  ),

  "approval-flows/showcase/mandatory": (
    <div className="pv">
      <div className="int-chips">
        <span className="int-chip"><i />Legal · mandatory</span>
        <span className="int-chip"><i />Finance · mandatory</span>
        <span className="int-chip"><i />Brand · optional</span>
      </div>
    </div>
  ),

  "approval-flows/showcase/sla": (
    <div className="pv">
      <ProvRow>
        no action in 24h <ProvArrow /> step breached
      </ProvRow>
      <ProvRow>
        breach event <ProvArrow /> escalation edge fires
      </ProvRow>
    </div>
  ),

  "approval-flows/showcase/loops": (
    <div className="pv">
      <ProvRow>
        rejection <ProvArrow /> back to author, prior attempts attached
      </ProvRow>
      <ProvRow>
        capped iterations <ProvArrow /> escalation on exhaustion
      </ProvRow>
    </div>
  ),

  "approval-flows/showcase/override": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "10:02", ev: <><strong>Admin</strong> force-approved the parked step</>, chip: { label: "override", kind: "rejected" } },
          { ts: "10:02", ev: <>recorded separately from reviewer decisions</>, chip: { label: "audited", kind: "approved" } },
        ]}
      />
    </div>
  ),

  "approval-flows/showcase/versioning": (
    <div className="pv">
      <ProvRow>
        in-flight run <ProvArrow /> keeps v3
      </ProvRow>
      <ProvRow>
        new run <ProvArrow /> dispatches on v4
      </ProvRow>
    </div>
  ),

  "approval-flows/showcase/events": (
    <div className="pv">
      <DarkPanel>{"step.completed → HMAC-signed webhook\nretries 2s … 8m · dead-letter\nmissed? replay by sinceSeq"}</DarkPanel>
    </div>
  ),

  "approval-flows/showcase/governance": (
    <div className="pv">
      <DarkPanel>{"GET /v2/workflow/executions/exec_8842\n{ status, pendingStep, decisions[] }"}</DarkPanel>
    </div>
  ),

  "approval-flows/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>VeltApprovalFlow + 4 siblings</ProvRow>
      <ProvRow>white-label · themeable</ProvRow>
      <ProvRow>headless mode · fully custom UIs</ProvRow>
    </div>
  ),

  "approval-flows/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>JSON definitions · your node ids</ProvRow>
      <ProvRow>signed event webhooks · version pinning</ProvRow>
      <ProvRow>scope: workspace · org · document</ProvRow>
    </div>
  ),

  "approval-flows/in-production/sales": (
    <AuditLog
      head={{ left: "Asset · Q3 campaign deck", right: "brand → legal" }}
      rows={[
        { ts: "1", ev: "Brand agent pre-screened", chip: { label: "agent", kind: "agent" } },
        { ts: "2", ev: "Brand lead approved", chip: { label: "approved", kind: "approved" } },
        { ts: "3", ev: "Legal redline → back to writer", chip: { label: "rejected", kind: "rejected" } },
        { ts: "4", ev: "Re-approved, sent to client", chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "approval-flows/in-production/fintech": (
    <AuditLog
      head={{ left: "Invoice · $48,000", right: "2-of-3 sign-off" }}
      rows={[
        { ts: "14:02", ev: "Amount > $25k → routed to CFO", chip: { label: "pending", kind: "pending" } },
        { ts: "14:18", ev: "Controller approved", chip: { label: "approved", kind: "approved" } },
        { ts: "14:33", ev: "CFO approved · quorum met", chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "approval-flows/in-production/ops": (
    <AuditLog
      head={{ left: "Change request · CHG-2271", right: "SLA escalation" }}
      rows={[
        { ts: "Mon", ev: "Order sign-off requested", chip: { label: "pending", kind: "pending" } },
        { ts: "Tue", ev: "Reviewer off shift → breached", chip: { label: "breach", kind: "rejected" } },
        { ts: "Tue", ev: "Escalated to ops lead, approved", chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "approval-flows/in-production/ai": (
    <AuditLog
      head={{ left: "Run · publishing agent", right: "run #8842" }}
      rows={[
        { ts: "00:00", ev: "Agent pre-screened generated copy", chip: { label: "agent", kind: "agent" } },
        { ts: "00:02", ev: "Human held the gate", chip: { label: "pending", kind: "pending" } },
        { ts: "00:14", ev: "Reviewer approved", chip: { label: "approved", kind: "approved" } },
        { ts: "00:14", ev: "Agent queried state before acting", chip: { label: "agent", kind: "agent" } },
      ]}
    />
  ),

  "approval-flows/related/review-agents": (
    <div className="pv">
      <ProvRow>
        agent step invokes a review agent <ProvArrow /> findings land as comments
      </ProvRow>
    </div>
  ),

  "approval-flows/related/audit-trail": (
    <div className="pv">
      <AuditLog
        rows={[
          {
            ts: "09:21",
            ev: <><strong>every transition</strong> is already a record</>,
            chip: { label: "recorded", kind: "approved" },
          },
        ]}
      />
    </div>
  ),

  "approval-flows/related/notifications": (
    <div className="pv">
      <ProvRow>
        reviewers see their turn <ProvArrow /> the pipeline completes
      </ProvRow>
    </div>
  ),
};
