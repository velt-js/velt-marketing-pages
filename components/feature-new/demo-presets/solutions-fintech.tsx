import { Fragment, type ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, DarkPanel, ProvRow, ProvArrow } from "../demos";

// Simulated-UI demo nodes for the /solutions/fintech page. Keys are listed
// (pure-data) in ./solutions-fintech.keys.ts and merged into the shared
// registry by ../demo-registry.tsx. Visuals are simulated, not live SDK
// instances. Voice is fintech and FP&A: budgets, forecasts, models, cells, the
// close, maker-checker, committee quorum, auditors and regulators.

/**
 * Compact framed "artifact" panel (a budget grid / forecast / model under
 * review) with a label header. Keeps the vertical artifact visible across the
 * hero and the loop.
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
 * Small quarterly forecast grid with one cell flagged for review. Renders the
 * fintech artifact (numbers in a grid) so a comment can anchor to a single cell.
 * @param {{ flagRow: number; flagCol: number }} props Zero-based row/column of the flagged cell.
 * @returns {JSX.Element} The forecast grid.
 */
function ForecastGrid({ flagRow, flagCol }: { flagRow: number; flagCol: number }) {
  const columns = ["", "Q1", "Q2", "Q3"];
  const rows = [
    { label: "Revenue", values: ["4.10", "4.45", "4.90"] },
    { label: "Travel", values: ["0.22", "0.24", "0.41"] },
    { label: "Headcount", values: ["1.80", "1.92", "2.05"] },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr 1fr 1fr",
        border: "1px solid var(--vlp-border-subtle)",
        borderRadius: 8,
        overflow: "hidden",
        fontFamily: "var(--vlp-font-mono)",
        fontSize: 11.5,
      }}
    >
      {columns.map((column) => (
        <div
          key={`head-${column}`}
          style={{
            padding: "6px 9px",
            background: "var(--vlp-bg-wash)",
            color: "var(--vlp-color-text-muted)",
            borderBottom: "1px solid var(--vlp-border-subtle)",
            textAlign: column ? "right" : "left",
          }}
        >
          {column}
        </div>
      ))}
      {rows.map((row, rowIndex) => (
        <Fragment key={`row-${row.label}`}>
          <div
            style={{
              padding: "6px 9px",
              color: "var(--vlp-color-ink)",
              borderTop: rowIndex ? "1px solid var(--vlp-border-subtle)" : "none",
            }}
          >
            {row.label}
          </div>
          {row.values.map((value, colIndex) => {
            const isFlagged = rowIndex === flagRow && colIndex === flagCol;
            return (
              <div
                key={`cell-${row.label}-${colIndex}`}
                style={{
                  padding: "6px 9px",
                  textAlign: "right",
                  color: isFlagged ? "var(--vlp-color-accent)" : "var(--vlp-color-ink)",
                  fontWeight: isFlagged ? 700 : 500,
                  background: isFlagged ? "var(--vlp-color-accent-soft)" : "transparent",
                  borderTop: rowIndex ? "1px solid var(--vlp-border-subtle)" : "none",
                  borderLeft: "1px solid var(--vlp-border-subtle)",
                }}
              >
                {value}
              </div>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Right-rail sign-off chain showing a quorum mid-approval: two committee steps
 * passed, the CFO step still pending.
 * @returns {JSX.Element} The sign-off chain.
 */
function SignOffChain() {
  const steps = [
    { label: "FP&A lead", state: "approved" as const, note: "passed" },
    { label: "Committee · 2 of 3", state: "approved" as const, note: "quorum met" },
    { label: "CFO", state: "pending" as const, note: "pending" },
  ];
  return (
    <div
      style={{
        border: "1px solid var(--vlp-border-subtle)",
        borderRadius: 8,
        padding: "10px 12px",
        display: "grid",
        gap: 8,
      }}
    >
      <p style={{ margin: 0, fontFamily: "var(--vlp-font-mono)", fontSize: 10.5, letterSpacing: 0.4, color: "var(--vlp-color-text-muted)" }}>
        SIGN-OFF CHAIN
      </p>
      {steps.map((step) => (
        <div key={step.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12.5, color: "var(--vlp-color-ink)" }}>{step.label}</span>
          <span className={`chip chip-${step.state}`}>{step.note}</span>
        </div>
      ))}
    </div>
  );
}

export const SOLUTIONS_FINTECH_DEMOS: Record<string, ReactNode> = {
  "solutions/fintech/hero": (
    <Artifact label="Q3 forecast · FY26 plan">
      <ForecastGrid flagRow={1} flagCol={2} />
      <NotifItem
        avatar={{ initials: "RA", kind: "agent", name: "Review Agent" }}
        title={
          <>
            <strong>Review Agent</strong> · Q3 travel is 18% over the approved plan. Variance note missing.
          </>
        }
        meta="anchored to the Q3 travel cell"
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <NotifItem
        avatar={{ initials: "PR", kind: "human", name: "Priya · FP&A lead" }}
        title={
          <>
            <strong>Priya</strong> · Adding the variance note now, then routing for sign-off.
          </>
        }
        meta="FP&A lead"
        chip={{ label: "human", kind: "pending" }}
      />
      <SignOffChain />
    </Artifact>
  ),

  "solutions/fintech/loop": (
    <AuditLog
      head={{ left: "Q3 forecast · FY26", right: "draft → audit-ready" }}
      rows={[
        { ts: "1", ev: <><strong>Analyst</strong> submits the forecast; the CFO question lands on the Q3 cell</>, chip: { label: "comment", kind: "pending" } },
        { ts: "2", ev: <><strong>Review Agent</strong> flags the variance threshold + a missing variance note</>, chip: { label: "agent", kind: "agent" } },
        { ts: "3", ev: <><strong>FP&A lead</strong> accepts the fix, resolves the open cell thread</>, chip: { label: "consent", kind: "pending" } },
        { ts: "4", ev: <>Chain advances: FP&A → committee quorum (2 of 3) → <strong>CFO</strong></>, chip: { label: "chain", kind: "pending" } },
        { ts: "5", ev: <><strong>CFO</strong> approved · forecast locked with the record attached</>, chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "solutions/fintech/loop/1": (
    <div className="thread">
      <div className="thread-head">
        <span className="av-c a4">CF</span>
        <span className="who">CFO</span>
        <span className="when">now</span>
      </div>
      <p className="thread-body">Why is Q3 travel over plan? @Maya</p>
    </div>
  ),

  "solutions/fintech/loop/2": (
    <div className="finding">
      <div className="fh">
        <span className="av-c av-agent">AI</span>Variance Agent
        <span className="chip chip-pending" style={{ marginLeft: "auto" }}>2 findings</span>
      </div>
      <p className="fb">Travel 18% over plan; variance note missing.</p>
    </div>
  ),

  "solutions/fintech/loop/3": (
    <div className="dag" style={{ padding: 0 }}>
      <div className="dag-node done" style={{ minWidth: 0 }}>FP&amp;A lead · approved</div>
      <div className="dag-edge" style={{ height: 12 }} />
      <div className="dag-node done" style={{ minWidth: 0 }}>Committee · 2 of 3</div>
      <div className="dag-edge" style={{ height: 12 }} />
      <div className="dag-node" style={{ minWidth: 0 }}>CFO · pending</div>
    </div>
  ),

  "solutions/fintech/loop/4": (
    <div className="audit" style={{ boxShadow: "none" }}>
      <div className="audit-row">
        <span className="ts">09:14</span>
        <span className="ev"><strong>FP&amp;A</strong> approved variance</span>
        <span className="chip chip-approved">approved</span>
      </div>
      <div className="audit-row">
        <span className="ts">09:15</span>
        <span className="ev">exported · audit.json</span>
        <span className="chip chip-agent">json</span>
      </div>
    </div>
  ),

  "solutions/fintech/agent": (
    <div style={{ display: "grid", gap: 12 }}>
      <NotifItem
        avatar={{ initials: "RA", kind: "agent", name: "Review Agent" }}
        title={<><strong>Proposes</strong> · vendor rate is 12% over contract. Suggest correcting line 7.</>}
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <ProvRow>CFO approves <ProvArrow /> change applies via your webhook</ProvRow>
      <Precedent
        heading="audit line"
        body={"Approved · CFO · Tue 09:14 · line 7 corrected · agent never held write access"}
        meta="on reject, nothing touches the model and the rejection is logged"
      />
    </div>
  ),

  "solutions/fintech/in-production": (
    <AuditLog
      head={{ left: "FP&A platform · the close", right: "approvals this month" }}
      rows={[
        { ts: "Mon", ev: "Budget approved · FP&A + CFO", chip: { label: "approved", kind: "approved" } },
        { ts: "Tue", ev: "Forecast · committee quorum (2 of 3)", chip: { label: "approved", kind: "approved" } },
        { ts: "Wed", ev: "Model · maker-checker sign-off", chip: { label: "approved", kind: "approved" } },
        { ts: "Thu", ev: "Audit query returned to the examiner", chip: { label: "query", kind: "pending" } },
      ]}
    />
  ),

  "solutions/fintech/fm/audit-trail": (
    <div className="pv">
      <DarkPanel>{"GET /v2/activities\n  ?document=q3-forecast\n  &range=fy26-close"}</DarkPanel>
    </div>
  ),

  "solutions/fintech/fm/approval-flows": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "1", ev: <>FP&A lead</>, chip: { label: "passed", kind: "approved" } },
          { ts: "2", ev: <>committee · 2 of 3</>, chip: { label: "quorum", kind: "approved" } },
          { ts: "3", ev: <>CFO</>, chip: { label: "pending", kind: "pending" } },
        ]}
      />
    </div>
  ),

  "solutions/fintech/fm/comments": (
    <div className="pv">
      <NotifItem
        avatar={{ initials: "CF", kind: "human", name: "CFO" }}
        title={<>Anchored to the <strong>Q3 cell</strong> — not a note about it</>}
        chip={{ label: "thread", kind: "pending" }}
      />
    </div>
  ),

  "solutions/fintech/fm/self-hosting": (
    <div className="pv">
      <DarkPanel>{"velt.setDataProvider(\"comments\")\n// thread content → your database\n// Velt keeps minimal identifiers"}</DarkPanel>
    </div>
  ),

  "solutions/fintech/fm/review-agents": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "AI", ev: <>variance over threshold</>, chip: { label: "flag", kind: "agent" } },
          { ts: "AI", ev: <>tie-out mismatch between sheets</>, chip: { label: "flag", kind: "agent" } },
          { ts: "AI", ev: <>rate over contract</>, chip: { label: "flag", kind: "agent" } },
        ]}
      />
    </div>
  ),

  "solutions/fintech/fm/memory": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="precedent"
        body={"Close 09: the Q3 travel variance was approved with a note. Close 10 surfaces that decision before re-flagging it."}
      />
    </div>
  ),
};
