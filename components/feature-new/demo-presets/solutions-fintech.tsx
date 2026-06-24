import { Fragment, type ReactNode } from "react";

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

// Fintech hero personas mapped to shared headshots.
const FINTECH_FACE = {
  priya: FACES.fenne,
  you: FACES.hope,
} as const;

// Simulated-UI demo nodes for the /for/fintech page. Keys are listed
// (pure-data) in ./solutions-fintech.keys.ts and merged into the shared
// registry by ../demo-registry.tsx. Visuals are simulated, not live SDK
// instances. Voice is fintech and FP&A: budgets, forecasts, models, cells, the
// close, maker-checker, committee quorum, auditors and regulators.

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

export const SOLUTIONS_FINTECH_DEMOS: Record<string, ReactNode> = {
  "solutions/fintech/hero": (
    <Frame
      app="FP"
      crumb={<><b>Q3 forecast</b> <span className="sep">/</span> FY26 plan</>}
      users={[
        { initials: "PR", tone: "a2", img: FINTECH_FACE.priya },
        { initials: "RA", agent: true },
      ]}
    >
      <ForecastGrid flagRow={1} flagCol={2} />

      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="RA" agent />
          Review Agent
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">now</span>
        </div>
        <p className="fb">
          Q3 travel is 18% over plan &mdash; variance note missing on this cell.
        </p>
        <p className="cmh-suggest">
          <span className="lbl">Suggested note</span>
          <span className="body">
            <del style={DEL_STYLE}>(no note)</del>{" "}
            <span style={{ color: "var(--vlp-color-text-subtle)" }}>&rarr;</span>{" "}
            <ins style={{ ...DEL_STYLE, ...{ background: "var(--vlp-color-approve-soft)", color: "#0c6a41", textDecoration: "none" } }}>
              Spike driven by Q3 offsite; CFO approved exception on 14 Jun.
            </ins>
          </span>
        </p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Accept</button>
          <button type="button" className="cmh-btn reject"><IconX />Dismiss</button>
        </div>
      </div>

      <div className="thread-head" style={{ gap: 9 }}>
        <Av initials="PR" tone="a2" img={FINTECH_FACE.priya} />
        <span className="who" style={{ fontSize: 12.5, fontWeight: 700 }}>Priya</span>
        <span className="cmh-role">&middot; FP&amp;A lead</span>
        <span className="chip chip-approved" style={{ marginLeft: "auto" }}>approved</span>
      </div>

      <Composer placeholder="Add a note or @mention&hellip;" you={FINTECH_FACE.you} />
    </Frame>
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
      <DarkPanel>{"POST /v2/activities/get\n{ \"data\": {\n  \"documentId\": \"q3-forecast\",\n  \"order\": \"asc\" } }"}</DarkPanel>
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
      <DarkPanel>{"velt.setDataProviders({ comment })\n// thread content → your database\n// Velt keeps minimal identifiers"}</DarkPanel>
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
