import type { ReactNode } from "react";

import { AuditLog, Precedent } from "../demos";
import { AiNativeBoard } from "./ai-board";
import { CrmPipelineBoard } from "./crm-board";
import { FintechBoard } from "./fintech-board";
import { OperationsBoard } from "./ops-board";
import {
  AgentFindingCard,
  Av,
  FACES,
  Frame,
  IconAgentMark,
  IconX,
} from "./hero-surface";

import "./approval-flows-related.css";
import "./approval-flows-customize.css";

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

/** @returns {JSX.Element} Sitemap / pipeline glyph for the nodes header. */
function IconSitemap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="3" width="6" height="5" rx="1.5" />
      <rect x="3" y="16" width="6" height="5" rx="1.5" />
      <rect x="15" y="16" width="6" height="5" rx="1.5" />
      <path d="M12 8v4M6 16v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

/** @returns {JSX.Element} Group / quorum glyph for the quorum header. */
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5M17 14.2A6 6 0 0 1 21 20" />
    </svg>
  );
}

/** @returns {JSX.Element} Branch / git-fork glyph for conditional routing. */
function IconBranch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M6 7v6a3 3 0 0 0 3 3h6M6 17v-2" />
    </svg>
  );
}

/** @returns {JSX.Element} Lock glyph for mandatory reviewers and signed events. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Clock glyph for SLA timers. */
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/** @returns {JSX.Element} Bolt glyph for SLA escalation edges. */
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z" />
    </svg>
  );
}

/** @returns {JSX.Element} Loop / refresh glyph for revision loops. */
function IconLoop() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11a8 8 0 0 1 14-5l2 2M20 13a8 8 0 0 1-14 5l-2-2" />
      <path d="M18 3v5h-5M6 21v-5h5" />
    </svg>
  );
}

/** @returns {JSX.Element} Shield glyph for admin override and governance. */
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.4 3 8.5 7 10 4-1.5 7-5.6 7-10V6l-7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/** @returns {JSX.Element} Palette glyph for the themed / white-label look card. */
function IconPalette() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 2-2 2 2 0 0 1 2-2h1.6A3.4 3.4 0 0 0 21 11.6C21 6.85 16.97 3 12 3z" />
      <circle cx="7.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** @returns {JSX.Element} Curly-braces glyph for the JSON definition behavior card. */
function IconBraces() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 4a3 3 0 0 0-3 3v2a2 2 0 0 1-2 2 2 2 0 0 1 2 2v2a3 3 0 0 0 3 3" />
      <path d="M16 4a3 3 0 0 1 3 3v2a2 2 0 0 0 2 2 2 2 0 0 0-2 2v2a3 3 0 0 1-3 3" />
    </svg>
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
        body={<>Invoice $22,400: within the $25k pre-approval limit. All policy rules passed.</>}
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

  // Agent + human node types composing one pipeline (wide tile): a labeled card
  // wrapping an approval chain — an agent pre-screen step then a human sign-off.
  "approval-flows/showcase/nodes": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconSitemap />
          One pipeline
          <span className="cmh-cc-pill">agent + human</span>
        </div>
        <div className="cmh-cc-body">
          <div className="apc-chain">
            <ChainRow
              agent
              name="Brand Agent"
              statusText="Pre-screened the deck"
              right={<span className="apf-tag apf-tag--agent"><IconAgentMark />agent node</span>}
            />
            <ChainRow
              img={FACE.sarah}
              name="Legal"
              statusText="Signed off on the clause"
              right={<span className="apf-tag apf-tag--human">human node</span>}
            />
          </div>
        </div>
      </div>
    </div>
  ),

  // Parallel reviewers under an N-of-M threshold (narrow tile): a quorum card —
  // two of three approved, the third still pending, quorum already met.
  "approval-flows/showcase/quorum": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--purple">
          <IconUsers />
          Quorum
          <span className="cmh-cc-pill">2 of 3</span>
        </div>
        <div className="cmh-cc-body">
          <div className="apc-chain apf-chain--tight">
            <ChainRow img={FACE.roman} name="Roman" statusText="Approved" badge="approved" />
            <ChainRow img={FACE.chris} name="Chris" statusText="Approved" badge="approved" />
            <ChainRow img={FACE.maya} name="Maya" statusText="Pending" badge="pending" />
          </div>
          <div className="apf-note apf-note--ok">
            <span className="chip chip-approved">quorum met</span>
            <span>Waiting siblings released</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Conditional routing over a sandboxed predicate (narrow tile): one condition
  // pill fanning into two destination nodes — the over-threshold branch to CFO.
  "approval-flows/showcase/routing": (
    <div className="pv apf-route">
      <span className="apf-route-cond">
        <IconBranch />
        amount &gt; 25,000
      </span>

      <div className="apf-route-fan" aria-hidden="true">
        <span className="cmh-flow-stem" />
        <span className="cmh-flow-bar" />
        <span className="cmh-flow-arm cmh-flow-arm--left" />
        <span className="cmh-flow-arm cmh-flow-arm--right" />
      </div>

      <div className="apf-route-row">
        <span className="apf-route-branch">
          <span className="apf-route-edge">true</span>
          <span className="apf-route-dest apf-route-dest--hot">
            <Av initials="SR" img={FACE.sarah} />
            CFO
          </span>
        </span>
        <span className="apf-route-branch">
          <span className="apf-route-edge">false</span>
          <span className="apf-route-dest">
            <Av initials="ET" img={FACE.ethan} />
            Budget owner
          </span>
        </span>
      </div>
    </div>
  ),

  // Mandatory vs optional reviewers (wide tile): a reviewer-list card where legal
  // and finance carry required flags and the brand agent counts as a bonus voice.
  "approval-flows/showcase/mandatory": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--slate">
          <IconLock />
          Reviewers
          <span className="cmh-cc-pill">2 required</span>
        </div>
        <div className="cmh-cc-body">
          <div className="apc-chain">
            <ChainRow
              img={FACE.sarah}
              name="Legal"
              statusText="Approval required"
              right={<span className="apf-tag apf-tag--req"><IconLock />mandatory</span>}
            />
            <ChainRow
              img={FACE.roman}
              name="Finance"
              statusText="Approval required"
              right={<span className="apf-tag apf-tag--req"><IconLock />mandatory</span>}
            />
            <ChainRow
              agent
              name="Brand Agent"
              statusText="Bonus voice"
              right={<span className="apf-tag apf-tag--opt">optional</span>}
            />
          </div>
        </div>
      </div>
    </div>
  ),

  // SLA timer + escalation (wide tile): a stalled step marked breached after its
  // deadline, an escalation edge firing, then the step picked up by an ops lead.
  "approval-flows/showcase/sla": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--plum">
          <IconClock />
          SLA timer
          <span className="cmh-cc-pill">24h</span>
        </div>
        <div className="cmh-cc-body apf-sla-body">
          <div className="apc-chain">
            <ChainRow
              status="waiting"
              name="Controller"
              statusText="No action in 24h"
              right={<span className="apf-sla-badge"><IconClock />breached</span>}
            />
          </div>

          <div className="apf-escalate" aria-hidden="true">
            <span className="apf-escalate-line" />
            <span className="apf-escalate-pill"><IconBolt />escalation edge fires</span>
            <span className="apf-escalate-line" />
          </div>

          <div className="apc-chain">
            <ChainRow
              img={FACE.ethan}
              name="Ops lead"
              statusText="Picked up the step"
              right={<span className="chip chip-approved">approved</span>}
            />
          </div>
        </div>
      </div>
    </div>
  ),

  // Revision loop (narrow tile): a rejection routes the run back to the author
  // with prior attempts attached, capped before escalation.
  "approval-flows/showcase/loops": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--plum">
          <IconLoop />
          Revision loop
          <span className="cmh-cc-pill">max 3</span>
        </div>
        <div className="cmh-cc-body apf-loop-body">
          <span className="apf-loop-step apf-loop-step--reject">
            <span className="apf-loop-ic"><IconX /></span>
            Legal redline
          </span>
          <span className="apf-loop-arrow" aria-hidden="true">
            <IconLoop />
          </span>
          <span className="apf-loop-step">
            <Av initials="ET" img={FACE.ethan} />
            Back to deck writer
          </span>
          <div className="apf-note">
            <span className="chip chip-pending">attempt 1 / 3</span>
            <span>Prior attempts attached</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Admin override with audit (narrow tile): an operator force-approves a parked
  // step with a reason, recorded separately from reviewer decisions.
  "approval-flows/showcase/override": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--ink">
          <IconShield />
          Admin override
          <span className="cmh-cc-pill">audited</span>
        </div>
        <div className="cmh-cc-body">
          <div className="cmh-cmt cmh-cmt--plain">
            <Av initials="A" tone="a4" />
            <div className="cmh-cmt-main">
              <div className="cmh-cmt-head">
                <span className="cmh-cmt-name">Admin</span>
                <span className="cmh-cmt-time">10:02</span>
              </div>
              <p className="cmh-cmt-body">Force-approved the parked step: reviewer unreachable.</p>
              <div className="apf-row-tags">
                <span className="chip chip-rejected">override</span>
                <span className="chip chip-approved">recorded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Workflow versioning (wide tile): two lanes — in-flight runs keep v3, new runs
  // dispatch on v4 — so a mid-quarter change never breaks an open review.
  "approval-flows/showcase/versioning": (
    <div className="pv apf-ver">
      <div className="apf-ver-col">
        <div className="apf-ver-top">
          <span className="apf-ver-tag">v3</span>
          <span className="apf-ver-sub">in-flight runs</span>
        </div>
        <div className="apf-ver-lines" aria-hidden="true">
          <span className="apf-ver-line" style={{ width: "82%" }} />
          <span className="apf-ver-line" style={{ width: "64%" }} />
          <span className="apf-ver-line" style={{ width: "74%" }} />
        </div>
        <span className="apf-ver-pin">
          <span className="chip chip-pending">1 run open</span>
          keeps its rules
        </span>
      </div>

      <div className="apf-ver-col apf-ver-col--new">
        <div className="apf-ver-top">
          <span className="apf-ver-tag apf-ver-tag--new">v4</span>
          <span className="apf-ver-sub">new runs</span>
        </div>
        <div className="apf-ver-lines" aria-hidden="true">
          <span className="apf-ver-line apf-ver-line--hl" style={{ width: "70%" }} />
          <span className="apf-ver-line" style={{ width: "78%" }} />
          <span className="apf-ver-line" style={{ width: "58%" }} />
        </div>
        <span className="apf-ver-pin">
          <span className="chip chip-approved">current</span>
          dispatches on v4
        </span>
      </div>
    </div>
  ),

  // Signed events + replay (wide tile): an HMAC-signed event stream with retries,
  // and a replay-by-sequence affordance for missed deliveries.
  "approval-flows/showcase/events": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--teal">
          <IconLock />
          Signed events
          <span className="cmh-cc-pill">HMAC</span>
        </div>
        <div className="cmh-cc-body apf-evt-body">
          <div className="apf-evt-row">
            <span className="apf-evt-name">step.completed</span>
            <span className="apf-evt-seq">#4210</span>
            <span className="apf-evt-sig"><IconLock />signed</span>
            <span className="chip chip-approved">delivered</span>
          </div>
          <div className="apf-evt-row">
            <span className="apf-evt-name">step.awaiting</span>
            <span className="apf-evt-seq">#4211</span>
            <span className="apf-evt-sig"><IconLock />signed</span>
            <span className="chip chip-pending">retry 2s…8m</span>
          </div>
          <div className="apf-evt-foot">
            <IconLoop />
            Missed a delivery? Replay by <code>sinceSeq</code>
          </div>
        </div>
      </div>
    </div>
  ),

  // Governance as API (narrow tile): one execution-status read rendered as UI —
  // status, the pending step, and the recorded decisions so far.
  "approval-flows/showcase/governance": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--ink">
          <IconShield />
          exec_8842
          <span className="cmh-cc-pill">live</span>
        </div>
        <div className="cmh-cc-body apf-gov-body">
          <div className="apf-gov-row">
            <span className="apf-gov-key">status</span>
            <span className="chip chip-pending">in review</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">pending step</span>
            <span className="apf-gov-val">CFO sign-off</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">decisions</span>
            <span className="apf-gov-stack">
              <Av initials="ET" img={FACE.ethan} />
              <Av initials="RC" img={FACE.roman} />
              <span className="apf-gov-count">2</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Look: the prebuilt VeltApprovalFlow component rendered with the customer's
  // own theme — a themed approval chain, white-label tokens, and the sibling
  // component family (plus headless) as chips.
  "approval-flows/make-it-yours/look": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--purple">
          <IconPalette />
          VeltApprovalFlow
          <span className="cmh-cc-pill">themed</span>
        </div>
        <div className="cmh-cc-body">
          <div className="apc-chain apf-chain--tight">
            <ChainRow
              agent
              name="Brand Agent"
              statusText="Pre-screened"
              right={<span className="apf-tag apf-tag--agent"><IconAgentMark />agent</span>}
            />
            <ChainRow
              img={FACE.sarah}
              name="Legal"
              statusText="Your tokens, your chrome"
              badge="approved"
            />
          </div>
          <div className="afz-theme" aria-hidden="true">
            <span className="afz-swatch afz-swatch--brand" />
            <span className="afz-swatch afz-swatch--ink" />
            <span className="afz-swatch afz-swatch--soft" />
            <span className="afz-theme-label">white-label · dark mode</span>
          </div>
          <div className="afz-parts">
            <span className="int-chip"><i />VeltApprovalStep</span>
            <span className="int-chip"><i />VeltApprovalComments</span>
            <span className="int-chip"><i />VeltApprovalActions</span>
            <span className="int-chip"><i />VeltApprovalAuditLog</span>
            <span className="int-chip"><i />headless</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Behavior: a JSON workflow definition surfaced as config rows — your own node
  // ids, the routing predicate, a signed event webhook, version pinning, and the
  // scope it is registered at.
  "approval-flows/make-it-yours/behavior": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--ink">
          <IconBraces />
          definition.json
          <span className="cmh-cc-pill">your ids</span>
        </div>
        <div className="cmh-cc-body apf-gov-body">
          <div className="apf-gov-row">
            <span className="apf-gov-key">nodes</span>
            <span className="afz-ids">
              <code className="afz-id">legal_gate</code>
              <code className="afz-id">cfo_signoff</code>
            </span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">routing</span>
            <code className="afz-cond">amount &gt; 25000</code>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">webhook</span>
            <span className="apf-evt-sig"><IconLock />signed event</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">version</span>
            <span className="chip chip-approved">pinned · v4</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">scope</span>
            <span className="afz-scope">
              <span className="afz-scope-seg afz-scope-seg--on">workspace</span>
              <span className="afz-scope-seg">org</span>
              <span className="afz-scope-seg">document</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),

  "approval-flows/in-production/sales": <CrmPipelineBoard />,

  "approval-flows/in-production/fintech": <FintechBoard />,

  "approval-flows/in-production/ops": <OperationsBoard />,

  "approval-flows/in-production/ai": <AiNativeBoard />,

  "approval-flows/related/review-agents": (
    <div className="pv">
      <div className="cmh-cmt cmh-cmt--plain">
        <Av initials="RA" agent />
        <div className="cmh-cmt-main">
          <div className="cmh-cmt-head">
            <span className="cmh-cmt-name">Review Agent</span>
            <span className="cmh-cmt-time">agent step</span>
          </div>
          <p className="cmh-cmt-body">An agent step invokes a review agent: findings land as comments.</p>
        </div>
      </div>
    </div>
  ),

  "approval-flows/related/audit-trail": (
    <div className="pv">
      <div className="apf-gov-body">
        <div className="apf-gov-row">
          <span className="apf-gov-key">transition</span>
          <span className="apf-gov-val">CFO approved</span>
        </div>
        <div className="apf-gov-row">
          <span className="apf-gov-key">signed</span>
          <span className="apf-evt-sig"><IconLock />HMAC</span>
        </div>
        <div className="apf-gov-row">
          <span className="apf-gov-key">recorded</span>
          <span className="chip chip-approved">on the record</span>
        </div>
      </div>
    </div>
  ),

  "approval-flows/related/notifications": (
    <div className="pv">
      <div className="cmh-inrow">
        <span className="cmh-unread" />
        <Av initials="SR" tone="a3" img={FACE.sarah} />
        <div className="cmh-inmain">
          <p className="t"><b>Sarah</b>, it&apos;s your turn to approve</p>
          <p className="m">reviewers see their turn · the pipeline completes</p>
          <div className="afrl-chans">
            <span className="afrl-chan">Inbox</span>
            <span className="afrl-chan">Email</span>
            <span className="afrl-chan">Slack</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
