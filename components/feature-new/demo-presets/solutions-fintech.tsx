import { type ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, ProvRow, ProvArrow } from "../demos";
import {
  AgentFindingCard,
  Av,
  IconArrowRight,
  IconReply,
} from "./hero-surface";
import { FintechBoard } from "./fintech-board";

import "./solutions-fintech-showcase.css";

/** @returns {JSX.Element} Lock glyph for signed / immutable audit events. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Clock glyph for the ordered-event audit footer. */
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/** @returns {JSX.Element} Sitemap glyph for the approval-chain header. */
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

/** @returns {JSX.Element} Database glyph for the data-residency "your DB" header. */
function IconDatabase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      <path d="M4 11.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  );
}

/** @returns {JSX.Element} History glyph for the precedent / cited-memory header. */
function IconHistory() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.05 11a9 9 0 1 1 .5 4" />
      <path d="M3 4v5h5" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

/** @returns {JSX.Element} Open-book glyph for memory citation pills. */
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6c-2-1.4-4.5-1.5-7-1v12c2.5-.5 5-.4 7 1 2-1.4 4.5-1.5 7-1V5c-2.5-.5-5-.4-7 1z" />
      <path d="M12 6v12" />
    </svg>
  );
}

// Simulated-UI demo nodes for the /for/fintech page. Keys are listed
// (pure-data) in ./solutions-fintech.keys.ts and merged into the shared
// registry by ../demo-registry.tsx. Visuals are simulated, not live SDK
// instances. Voice is fintech and FP&A: budgets, forecasts, models, cells, the
// close, maker-checker, committee quorum, auditors and regulators.

export const SOLUTIONS_FINTECH_DEMOS: Record<string, ReactNode> = {
  // Hero artifact: the light-mode invoice board, rendered wide so it bleeds off
  // the right edge of the hero (same treatment as the Sales enablement hero,
  // which uses <DigitalSalesRoom light />). Light + bleed CSS lives alongside the
  // .fin-board base in ../styles.css (see .fin-board--light).
  "solutions/fintech/hero": <FintechBoard light />,

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
        heading="Audit entry"
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
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--teal">
          <IconLock />
          Audit trail
          <span className="cmh-cc-pill">signed</span>
        </div>
        <div className="cmh-cc-body apf-evt-body">
          <div className="apf-evt-row">
            <span className="apf-evt-name">forecast.locked</span>
            <span className="apf-evt-seq">#4210</span>
            <span className="apf-evt-sig"><IconLock />signed</span>
            <span className="chip chip-approved">CFO</span>
          </div>
          <div className="apf-evt-row">
            <span className="apf-evt-name">cell.commented</span>
            <span className="apf-evt-seq">q3-forecast</span>
            <span className="apf-evt-sig"><IconLock />signed</span>
            <span className="chip chip-agent">activity</span>
          </div>
          <div className="apf-evt-foot">
            <IconClock />
            Every event ordered &amp; queryable via <code>activities/get</code>
          </div>
        </div>
      </div>
    </div>
  ),

  "solutions/fintech/fm/approval-flows": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--navy">
          <IconSitemap />
          Approval chain
          <span className="cmh-cc-pill">2 of 3</span>
        </div>
        <div className="cmh-cc-body">
          <div className="sft-chain">
            <div className="sft-step">
              <Av initials="FA" tone="a2" />
              <span className="sft-step-main">
                <span className="sft-step-name">FP&amp;A lead</span>
                <span className="sft-step-sub">mandatory</span>
              </span>
              <span className="chip chip-approved">passed</span>
            </div>
            <div className="sft-step">
              <Av initials="CM" tone="a1" />
              <span className="sft-step-main">
                <span className="sft-step-name">Committee</span>
                <span className="sft-step-sub">quorum · 2 of 3</span>
              </span>
              <span className="chip chip-approved">quorum</span>
            </div>
            <div className="sft-step">
              <Av initials="CF" tone="a4" />
              <span className="sft-step-main">
                <span className="sft-step-name">CFO</span>
                <span className="sft-step-sub">final sign-off</span>
              </span>
              <span className="chip chip-pending">pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "solutions/fintech/fm/comments": (
    <div className="pv">
      <div className="cmh-cmt">
        <Av initials="CF" tone="a4" />
        <div className="cmh-cmt-main">
          <div className="cmh-cmt-head">
            <span className="cmh-cmt-name">CFO</span>
            <span className="cmh-cmt-time">2m</span>
            <span className="chip chip-pending" style={{ marginLeft: "auto" }}>thread</span>
          </div>
          <p className="cmh-cmt-body">Anchored to the <strong>Q3 cell</strong>: not a note about it.</p>
          <span className="cmh-cmt-replies"><IconReply />1 Reply</span>
        </div>
      </div>
    </div>
  ),

  "solutions/fintech/fm/self-hosting": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--teal">
          <IconDatabase />
          Data residency
          <span className="cmh-cc-pill">your DB</span>
        </div>
        <div className="cmh-cc-body">
          <div className="sft-res">
            <div className="sft-res-row">
              <span className="sft-res-label">filing thread content</span>
              <span className="sft-res-arrow"><IconArrowRight /></span>
              <span className="chip chip-approved">your DB</span>
            </div>
            <div className="sft-res-row">
              <span className="sft-res-label">identifiers + timestamps</span>
              <span className="sft-res-arrow"><IconArrowRight /></span>
              <span className="chip chip-agent">Velt</span>
            </div>
          </div>
          <div className="apf-note">
            <span className="chip chip-agent">Velt</span>
            <span>keeps minimal identifiers: content never leaves your infra</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "solutions/fintech/fm/review-agents": (
    <div className="pv">
      <div className="cmh-afc-fill">
        <AgentFindingCard
          name="Variance Agent"
          time="now"
          body="Q3 travel is 18% over plan: variance over the declared threshold, note missing."
          replies={2}
          actions={false}
        />
      </div>
    </div>
  ),

  "solutions/fintech/fm/memory": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--navy">
          <IconHistory />
          Precedent
          <span className="cmh-cc-pill">cited</span>
        </div>
        <div className="cmh-cc-body">
          <div className="sft-mem">
            <div className="sft-mem-row">
              <span className="sft-mem-main">
                <span className="sft-mem-name">Q3 travel variance</span>
                <span className="sft-mem-meta">Close 09 · approved with note</span>
              </span>
              <span className="chip chip-approved">approved</span>
            </div>
          </div>
          <div className="apf-note">
            <span className="sft-cite"><IconBook />filing-2231</span>
            <span>Surfaced before Close 10 re-flags it</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
