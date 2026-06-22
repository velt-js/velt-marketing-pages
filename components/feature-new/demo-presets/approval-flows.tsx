import type { ReactNode } from "react";

import { AuditLog, Precedent, ProvRow, ProvArrow, DarkPanel } from "../demos";
import {
  Av,
  Composer,
  FACES,
  Frame,
  IconCheck,
  IconX,
} from "./hero-surface";

// Simulated-UI demo nodes for the /new-features/approval-flows page. Keys match
// components/feature-new/demo-presets/approval-flows.keys.ts; resolved by
// demo-registry.tsx. Visuals are simulated, not live SDK instances.

// Approval-flows personas mapped to shared headshots. Keep the same face per
// person across all four hero tabs.
const FACE = {
  sarah: FACES.hope,
  maya: FACES.fenne,
  ethan: FACES.ethan,
  roman: FACES.roman,
  chris: FACES.chris,
} as const;

/**
 * A vertical DAG chain node: avatar, role label, and a status chip.
 * Used in the builder and run hero tabs.
 * @param {{ av: ReactNode; role: string; sub?: string; chip?: ReactNode; isAgent?: boolean }} props Node content.
 * @returns {JSX.Element} DAG node row.
 */
function ChainNode({
  av,
  role,
  sub,
  chip,
  isAgent,
}: {
  av: ReactNode;
  role: string;
  sub?: string;
  chip?: ReactNode;
  isAgent?: boolean;
}) {
  return (
    <div
      className={`dag-node${isAgent ? " agent" : ""}`}
      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}
    >
      {av}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--vlp-color-ink)" }}>{role}</span>
        {sub ? <span className="sub">{sub}</span> : null}
      </span>
      {chip}
    </div>
  );
}

/**
 * A DAG connector edge between chain nodes.
 * @returns {JSX.Element} Vertical hairline connector.
 */
function ChainEdge() {
  return <div className="dag-edge" style={{ height: 16 }} />;
}

/**
 * An "add step" affordance row at the bottom of the builder DAG.
 * @returns {JSX.Element} Dashed add-step row.
 */
function AddStepAffordance() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        border: "1.5px dashed var(--vlp-border-default)",
        borderRadius: 11,
        padding: "9px 14px",
        width: "100%",
        fontSize: 12,
        color: "var(--vlp-color-text-muted)",
        background: "var(--vlp-bg-wash)",
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "1.5px dashed var(--vlp-border-default)",
          display: "grid",
          placeItems: "center",
          fontSize: 14,
          lineHeight: 1,
          color: "var(--vlp-color-text-subtle)",
          flex: "none",
        }}
      >
        +
      </span>
      Add a step
    </div>
  );
}

/**
 * A quorum approver row: avatar, name, and approved/pending chip.
 * @param {{ av: ReactNode; name: string; approved: boolean }} props Quorum member content.
 * @returns {JSX.Element} Quorum member row.
 */
function QuorumMember({
  av,
  name,
  approved,
}: {
  av: ReactNode;
  name: string;
  approved: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {av}
      <span style={{ flex: 1, fontSize: 12.5, fontWeight: 550, color: "var(--vlp-color-ink)" }}>{name}</span>
      <span className={`chip chip-${approved ? "approved" : "pending"}`}>
        {approved ? "approved" : "pending"}
      </span>
    </div>
  );
}

export const APPROVAL_FLOWS_DEMOS: Record<string, ReactNode> = {
  // ── BUILDER ─────────────────────────────────────────────────────────────────
  // Composing an approval chain: three role nodes (FP&A lead → Committee → CFO)
  // plus an "add step" affordance, all inside a product-surface frame.
  "approval-flows/hero/builder": (
    <Frame
      app="AF"
      crumb={<><b>Q3 forecast</b> <span className="sep">/</span> approval chain</>}
      users={[
        { initials: "SR", tone: "a3", img: FACE.sarah },
        { initials: "MA", tone: "a2", img: FACE.maya },
      ]}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--vlp-font-mono)",
          fontSize: 10.5,
          letterSpacing: 0.4,
          color: "var(--vlp-color-text-muted)",
          textTransform: "uppercase",
        }}
      >
        Approval chain
      </p>

      <div className="dag" style={{ width: "100%" }}>
        <ChainNode
          av={<Av initials="ET" tone="a1" img={FACE.ethan} />}
          role="FP&A lead"
          sub="mandatory · 1 of 1"
          chip={<span className="chip chip-approved">passed</span>}
        />
        <ChainEdge />
        <ChainNode
          av={
            <div style={{ display: "flex" }}>
              <Av initials="ET" tone="a1" img={FACE.ethan} />
              <span style={{ marginLeft: -7 }}><Av initials="RC" tone="a4" img={FACE.roman} /></span>
              <span style={{ marginLeft: -7 }}><Av initials="CR" tone="a2" img={FACE.chris} /></span>
            </div>
          }
          role="Committee"
          sub="2 of 3 · quorum"
          chip={<span className="chip chip-pending">pending</span>}
        />
        <ChainEdge />
        <ChainNode
          av={<Av initials="SR" tone="a3" img={FACE.sarah} />}
          role="CFO"
          sub="mandatory · final"
          chip={<span className="chip chip-pending">waiting</span>}
        />
        <ChainEdge />
        <AddStepAffordance />
      </div>
    </Frame>
  ),

  // ── RUN ─────────────────────────────────────────────────────────────────────
  // A live run mid-approval: chain nodes with statuses, current step highlighted.
  "approval-flows/hero/run": (
    <Frame
      app="AF"
      crumb={<><b>Q3 forecast</b> <span className="sep">/</span> run #8842</>}
      users={[
        { initials: "ET", tone: "a1", img: FACE.ethan },
        { initials: "RC", tone: "a4", img: FACE.roman },
        { initials: "CR", tone: "a2", img: FACE.chris },
        { initials: "SR", tone: "a3", img: FACE.sarah },
      ]}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--vlp-font-mono)",
          fontSize: 10.5,
          letterSpacing: 0.4,
          color: "var(--vlp-color-text-muted)",
          textTransform: "uppercase",
        }}
      >
        Live run · step 2 of 3
      </p>

      <div className="dag" style={{ width: "100%" }}>
        <ChainNode
          av={<Av initials="ET" tone="a1" img={FACE.ethan} />}
          role="FP&A lead"
          sub="Ethan · approved 09:14"
          chip={<span className="chip chip-approved">approved</span>}
        />
        <ChainEdge />
        <ChainNode
          av={
            <div style={{ display: "flex" }}>
              <Av initials="RC" tone="a4" img={FACE.roman} />
              <span style={{ marginLeft: -7 }}><Av initials="CR" tone="a2" img={FACE.chris} /></span>
              <span style={{ marginLeft: -7 }}><Av initials="MA" tone="a2" img={FACE.maya} /></span>
            </div>
          }
          role="Committee · 1 of 3"
          sub="Roman approved · 2 pending"
          chip={<span className="chip chip-pending">in progress</span>}
        />
        <ChainEdge />
        <ChainNode
          av={<Av initials="SR" tone="a3" img={FACE.sarah} />}
          role="CFO"
          sub="Sarah · waiting"
          chip={<span className="chip chip-pending">waiting</span>}
        />
      </div>

      <Composer placeholder="Leave a note on this run…" />
    </Frame>
  ),

  // ── QUORUM ──────────────────────────────────────────────────────────────────
  // Committee quorum step: three approvers, 2 approved 1 pending.
  "approval-flows/hero/quorum": (
    <Frame
      app="AF"
      crumb={<><b>Committee</b> <span className="sep">/</span> 2 of 3</>}
      users={[
        { initials: "RC", tone: "a4", img: FACE.roman },
        { initials: "CR", tone: "a2", img: FACE.chris },
        { initials: "MA", tone: "a2", img: FACE.maya },
      ]}
    >
      <div
        style={{
          border: "1px solid var(--vlp-border-subtle)",
          borderRadius: 10,
          padding: "10px 13px",
          display: "grid",
          gap: 4,
          background: "var(--vlp-bg-section-alt)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--vlp-font-mono)",
            fontSize: 10.5,
            letterSpacing: 0.4,
            color: "var(--vlp-color-text-muted)",
            textTransform: "uppercase",
          }}
        >
          Committee · quorum step
        </p>
        <p style={{ margin: 0, fontSize: 12, color: "var(--vlp-color-text-muted)" }}>
          Threshold: <strong style={{ color: "var(--vlp-color-ink)" }}>2 of 3</strong> · Q3 forecast approval
        </p>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        <QuorumMember av={<Av initials="RC" tone="a4" img={FACE.roman} />} name="Roman" approved />
        <QuorumMember av={<Av initials="CR" tone="a2" img={FACE.chris} />} name="Chris" approved />
        <QuorumMember av={<Av initials="MA" tone="a2" img={FACE.maya} />} name="Maya" approved={false} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          border: "1px solid var(--vlp-color-accent-wash)",
          borderRadius: 9,
          background: "var(--vlp-color-approve-soft)",
        }}
      >
        <span className="chip chip-approved">quorum met</span>
        <span style={{ fontSize: 12, color: "#0c6a41" }}>
          2 of 3 approved · chain advancing to CFO
        </span>
      </div>
    </Frame>
  ),

  // ── AGENT ───────────────────────────────────────────────────────────────────
  // An agent step auto-checks a policy; human gate downstream with Approve/Reject.
  "approval-flows/hero/agent": (
    <Frame
      app="AF"
      crumb={<><b>Policy check</b> <span className="sep">/</span> agent step</>}
      users={[{ initials: "SR", tone: "a3", img: FACE.sarah }]}
    >
      <div className="dag" style={{ width: "100%" }}>
        <ChainNode
          av={<Av agent initials="PA" />}
          role="Policy Agent"
          sub="auto · checks spend limits"
          chip={<span className="chip chip-approved">passed</span>}
          isAgent
        />
        <ChainEdge />
        <ChainNode
          av={<Av initials="SR" tone="a3" img={FACE.sarah} />}
          role="CFO"
          sub="Sarah · human gate"
          chip={<span className="chip chip-pending">awaiting</span>}
        />
      </div>

      <div
        className="finding"
        style={{ boxShadow: "none", gap: 9, border: "1px solid var(--vlp-color-accent-wash)", background: "oklch(0.985 0.008 276)" }}
      >
        <div className="fh">
          <Av agent initials="PA" />
          <span>Policy Agent</span>
          <span className="chip chip-agent" style={{ marginLeft: "auto" }}>agent</span>
        </div>
        <p className="fb">Invoice $22,400 — within the $25k pre-approval limit. All policy rules passed.</p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Approve</button>
          <button type="button" className="cmh-btn reject"><IconX />Reject</button>
        </div>
      </div>
    </Frame>
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
