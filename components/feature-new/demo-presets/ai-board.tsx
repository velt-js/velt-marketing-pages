import type { ReactNode } from "react";

import {
  DEL_STYLE,
  IconAgentMark,
  IconArrowRight,
  IconReply,
  INS_STYLE,
} from "./hero-surface";

// Shared AI-native review board ("In production · AI-native") — a dark
// generated-work review app modeled in the same visual language as the CRM
// pipeline board: a left icon rail, a mono eyebrow, a generated run record, and
// a review queue, with an Agent finding presented as an anchored comment that
// carries Approve / Reject actions and a suggested diff. The propose → approve →
// apply loop is the story. Dark surface that sits on the dark proof panel.
// Simulated, not a live SDK. Defined once here and reused across every feature
// page's AI-native tab.
const AI_EYEBROW = "ai-native / review queue";
const AI_RUN_ID = "run #8842";
const AI_AGENT_NAME = "Review Agent";
const AI_AGENT_TIME = "just now";

type AiRun = { id: string; label: string; status: string; statusKind: "review" | "approved" | "queued" };

// Review queue. The first run (#8842) is the open, under-review record detailed
// above the list; the rest show recently resolved and queued agent runs.
const AI_QUEUE: AiRun[] = [
  { id: "8841", label: "Refund #4468 · partial approved", status: "applied", statusKind: "approved" },
  { id: "8843", label: "Refund #4473 · within policy", status: "queued", statusKind: "queued" },
  { id: "8844", label: "Chargeback #2210 · review", status: "queued", statusKind: "queued" },
];

// Left-rail navigation glyphs (Tabler-style, decorative chrome).
const AI_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "runs",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
    ),
  },
  {
    key: "drafts",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" /><path d="M9 12h6M9 16h4" /></svg>
    ),
  },
  {
    key: "queue",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
    ),
  },
  {
    key: "policy",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3z" /><path d="M9.5 12l1.8 1.8L15 10" /></svg>
    ),
  },
];

const AI_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

/**
 * The anchored Agent finding popover that floats over the generated draft. It
 * mirrors the canonical agent-finding component (flower avatar, name + time,
 * body, a suggested edit as red → green pills, and Approve / Reject actions) but
 * rendered as a white popover anchored to the run record for visual consistency
 * with the CRM board's comment popover.
 * @returns {JSX.Element} The anchored agent finding popover.
 */
function AiAgentPopover() {
  return (
    <div className="ai-pop">
      <span className="ai-pop-av" aria-hidden="true"><IconAgentMark /></span>
      <div className="ai-pop-main">
        <div className="ai-pop-head">
          <span className="ai-pop-name">{AI_AGENT_NAME}</span>
          <span className="ai-pop-time">{AI_AGENT_TIME}</span>
        </div>
        <p className="ai-pop-body">Refund exceeds policy by $40. Recommend partial approval at the $100 cap.</p>
        <div className="ai-pop-diff">
          <del style={DEL_STYLE}>$140 refund</del>
          <span className="ai-pop-arrow"><IconArrowRight /></span>
          <ins style={INS_STYLE}>$100 refund</ins>
        </div>
        <div className="ai-pop-actions">
          <button type="button" className="ai-pop-btn approve">Approve</button>
          <button type="button" className="ai-pop-btn reject">Reject</button>
          <span className="ai-pop-replies"><IconReply />1 Reply</span>
        </div>
      </div>
    </div>
  );
}

/**
 * One run row in the review queue: a status dot, the run label, and a status
 * chip. Decorative list context beneath the open run record.
 * @param {{ run: AiRun }} props The queued run record.
 * @returns {JSX.Element} A review-queue row.
 */
function AiQueueRow({ run }: { run: AiRun }) {
  return (
    <div className="ai-q-row">
      <span className={`ai-q-dot ai-q-dot-${run.statusKind}`} aria-hidden="true" />
      <span className="ai-q-label">{run.label}</span>
      <span className={`ai-q-status ai-q-status-${run.statusKind}`}>{run.status}</span>
    </div>
  );
}

/**
 * The shared AI-native review board surface. Rendered once and reused for the
 * "<feature>/in-production/ai" preset on every feature page, so the AI-native
 * tab proof surface is identical everywhere. Visuals are simulated, not a live
 * SDK instance.
 * @returns {JSX.Element} The AI-native review board.
 */
export function AiNativeBoard() {
  return (
    <div className="ai-board">
      <nav className="ai-rail" aria-hidden="true">
        <span className="ai-rail-group">
          {AI_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`ai-rail-btn${index === 0 ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="ai-rail-btn">{AI_SETTINGS_ICON}</span>
      </nav>

      <div className="ai-main">
        <p className="ai-eyebrow">{AI_EYEBROW}</p>
        <div className="ai-stage">
          <div className="ai-doc">
            <div className="ai-doc-head">
              <span className="ai-doc-run">{AI_RUN_ID}</span>
              <span className="ai-doc-chip">needs review</span>
            </div>
            <p className="ai-doc-body">
              Refund request <strong>#4471</strong>: customer cites a delayed delivery and asks for a{" "}
              <span className="ai-doc-mark">$140 full refund</span>. Policy caps discretionary refunds at $100.
            </p>
            <AiAgentPopover />
          </div>

          <div className="ai-queue">
            {AI_QUEUE.map((run) => (
              <AiQueueRow key={run.id} run={run} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
