import type { ReactNode } from "react";

import { AuditLog, Precedent, ProvRow, ProvArrow, DarkPanel } from "../demos";
import {
  AgentFindingCard,
  FACES,
  Frame,
  IconAgentMark,
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

/** Tabler check glyph (~13px) for the passed-variant badge. */
function IconCheckTabler() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

/** Tabler circle-dashed glyph (~21px) for the pending-variant avatar. */
function IconCircleDashed() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.6 3.6a9 9 0 0 0-3.1 2.3M3.6 8.6A9 9 0 0 0 3 12M3.6 15.4a9 9 0 0 0 1.9 3M8.6 20.4a9 9 0 0 0 3.4.6M15.4 20.4a9 9 0 0 0 3-1.9M20.4 15.4A9 9 0 0 0 21 12M20.4 8.6a9 9 0 0 0-1.9-3M15.4 3.6A9 9 0 0 0 12 3" />
    </svg>
  );
}

/** Tabler hourglass-empty glyph (~21px) for the waiting-variant avatar. */
function IconHourglass() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 7h11M6.5 17h11M7 3h10v4l-5 5-5-5V3zM7 21h10v-4l-5-5-5 5v4z" />
    </svg>
  );
}

/** Tabler plus glyph (20px) for the add-step row. */
function IconPlus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/**
 * One approval-chain row (Figma node 882:2418): an avatar (agent flower, real
 * headshot, or status icon) with an optional approved/pending badge, the name
 * with the status word beneath it, and a right slot (rule · count, or custom).
 * @param {{ status?: "passed" | "pending" | "waiting"; name: ReactNode; statusText?: string; rule?: string; count?: string; img?: string; agent?: boolean; badge?: "approved" | "pending"; right?: ReactNode }} props Row content.
 * @returns {JSX.Element} A single approval-chain step row.
 */
function ChainRow({
  status = "passed",
  name,
  statusText,
  rule,
  count,
  img,
  agent,
  badge,
  right,
}: {
  status?: "passed" | "pending" | "waiting";
  name: ReactNode;
  statusText?: string;
  rule?: string;
  count?: string;
  img?: string;
  agent?: boolean;
  badge?: "approved" | "pending";
  right?: ReactNode;
}) {
  const overlay = badge ?? ((img || agent) && status === "passed" ? "approved" : undefined);
  return (
    <div className="apc-row">
      <div className="apc-left">
        <div
          className={`apc-avatar ${agent ? "agent" : img ? "passed" : status}`}
          style={!agent && img ? { backgroundImage: `url(${img})` } : undefined}
        >
          {agent ? <IconAgentMark /> : null}
          {!agent && !img && status === "pending" ? (
            <span style={{ color: "#b07d2b", display: "grid", placeItems: "center" }}>
              <IconCircleDashed />
            </span>
          ) : null}
          {!agent && !img && status === "waiting" ? (
            <span style={{ color: "#5a5a5a", display: "grid", placeItems: "center" }}>
              <IconHourglass />
            </span>
          ) : null}
          {overlay === "approved" ? (
            <span className="apc-badge approved" style={{ color: "#1a7f4b" }}>
              <IconCheckTabler />
            </span>
          ) : overlay === "pending" ? (
            <span className="apc-badge pending" style={{ color: "#b07d2b" }}>
              <IconCircleDashed />
            </span>
          ) : null}
        </div>
        <span className="apc-text">
          <span className="apc-name">{name}</span>
          {statusText ? <span className="apc-sub">{statusText}</span> : null}
        </span>
      </div>
      {right ??
        (rule ? (
          <span className="apc-meta">
            <span className="apc-rule">{rule}</span>
            {count ? (
              <>
                <span className="apc-dot">·</span>
                <span className="apc-count">{count}</span>
              </>
            ) : null}
          </span>
        ) : null)}
    </div>
  );
}

/**
 * The "Add a step" affordance row at the bottom of the builder chain.
 * @returns {JSX.Element} The add-step row.
 */
function AddStepRow() {
  return (
    <div className="apc-add">
      <span style={{ color: "rgba(0, 0, 0, 0.5)", display: "grid", placeItems: "center" }}>
        <IconPlus />
      </span>
      <span className="apc-add-text">Add a step</span>
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
      <p className="apc-label">Approval chain</p>

      <div className="apc-chain">
        <ChainRow
          status="passed"
          img={FACE.ethan}
          name={<>FP&amp;A Lead</>}
          statusText="Passed"
          rule="Mandatory"
          count="1 / 1"
        />
        <ChainRow
          status="pending"
          name="Committee"
          statusText="Pending"
          rule="Quorum"
          count="2 / 3"
        />
        <ChainRow
          status="waiting"
          name="CFO"
          statusText="Waiting"
          rule="Mandatory"
          count="1 / 1"
        />
        <AddStepRow />
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
      <p className="apc-label">Approval chain</p>

      <div className="apc-chain">
        <ChainRow
          status="passed"
          img={FACE.ethan}
          name={<>FP&amp;A Lead</>}
          statusText="Passed"
          rule="Mandatory"
          count="1 / 1"
        />
        <ChainRow
          status="pending"
          name="Committee"
          statusText="Pending"
          rule="Quorum"
          count="1 / 3"
        />
        <ChainRow
          status="waiting"
          name="CFO"
          statusText="Waiting"
          rule="Mandatory"
          count="final"
        />
      </div>
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

      <div className="apc-chain">
        <ChainRow img={FACE.roman} name="Roman" statusText="Approved" badge="approved" />
        <ChainRow img={FACE.chris} name="Chris" statusText="Approved" badge="approved" />
        <ChainRow img={FACE.maya} name="Maya" statusText="Pending" badge="pending" />
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
      <div className="apc-chain">
        <ChainRow agent name="Policy Agent" statusText="Passed" rule="Auto · spend limits" />
        <ChainRow img={FACE.sarah} name="CFO" statusText="Awaiting" badge="pending" rule="Human gate" />
      </div>

      <AgentFindingCard
        name="Policy Agent"
        time="now"
        body={<>Invoice $22,400 &mdash; within the $25k pre-approval limit. All policy rules passed.</>}
      />
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
