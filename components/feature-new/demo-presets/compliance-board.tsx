import type { ReactNode } from "react";

import { IconCommentBadge, IconReply } from "./hero-surface";

import "./compliance-board.css";

// Shared compliance controls-review board ("In production · Compliance") — a
// dark regulated-review app modeled in the same visual language as the other
// in-production boards: a left icon rail, a mono eyebrow, a quarterly-disclosure
// header, and a list of control / attestation rows with one flagged row that
// anchors a comment popover from the compliance officer. Officer sign-off on the
// exact filing line is the story. Dark surface that sits on the dark proof
// panel. Simulated, not a live SDK. Repeated copy is hoisted to constants.
const CPL_EYEBROW = "compliance / controls review";
const CPL_FILING = "Q3 Disclosure · FIL-2209";
const CPL_INTERNAL_LABEL = "internal";
const CPL_COMMENT_AUTHOR = "Nina · Compliance";
const CPL_COMMENT_TIME = "now";

type CplStatus = "signed" | "flagged" | "review" | "pending";

type CplControl = {
  id: string;
  label: string;
  status: string;
  statusKind: CplStatus;
  meta: string;
  comments?: number;
  active?: boolean;
};

// Controls register. The missing-attestation row (CTL-118) is the highlighted,
// commented control that anchors the officer thread; the rest are realistic
// disclosure-period controls in mixed states.
const CPL_CONTROLS: CplControl[] = [
  { id: "CTL-114", label: "Risk disclosure language", status: "Signed", statusKind: "signed", meta: "officer" },
  { id: "CTL-116", label: "Threshold ($500M AUM)", status: "Signed", statusKind: "signed", meta: "officer" },
  { id: "CTL-118", label: "Officer attestation", status: "Missing", statusKind: "flagged", meta: "Form ADV-W", comments: 1, active: true },
  { id: "CTL-120", label: "Conflicts-of-interest log", status: "In review", statusKind: "review", meta: "2 of 3" },
  { id: "CTL-122", label: "Marketing-rule controls", status: "Signed", statusKind: "signed", meta: "officer" },
  { id: "CTL-124", label: "Recordkeeping retention", status: "Scheduled", statusKind: "pending", meta: "Fri" },
];

// Left-rail navigation glyphs (Tabler-style, decorative chrome).
const CPL_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "controls",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6z" /><path d="M9.5 12l1.8 1.8L15 10" /></svg>
    ),
  },
  {
    key: "filings",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" /><path d="M9 9h5M9 13h6M9 17h4" /></svg>
    ),
  },
  {
    key: "policies",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 6c-2-1.4-4.5-1.5-7-1v12c2.5-.5 5-.4 7 1 2-1.4 4.5-1.5 7-1V5c-2.5-.5-5-.4-7 1z" /><path d="M12 6v12" /></svg>
    ),
  },
  {
    key: "exports",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12" /><path d="M8 11l4 4 4-4" /><path d="M5 19h14" /></svg>
    ),
  },
];

const CPL_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

const CPL_LOCK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
);

/**
 * The anchored comment popover that floats over the flagged control. The header
 * carries an "internal" visibility chip so the deliberation reads as scoped to
 * the compliance team and off the examiner-facing record until signed.
 * @returns {JSX.Element} The anchored officer comment popover.
 */
function CplCommentPopover() {
  return (
    <div className="cpl-pop">
      <span className="cpl-pop-av" aria-hidden="true">N</span>
      <div className="cpl-pop-main">
        <div className="cpl-pop-head">
          <span className="cpl-pop-name">{CPL_COMMENT_AUTHOR}</span>
          <span className="cpl-pop-time">{CPL_COMMENT_TIME}</span>
          <span className="cpl-pop-chip">{CPL_LOCK_ICON}{CPL_INTERNAL_LABEL}</span>
        </div>
        <p className="cpl-pop-body">
          Need the officer signature before we file. <span className="cpl-pop-mention">@Sam</span> can you sign off?
        </p>
        <span className="cpl-pop-replies"><IconReply />2 Replies</span>
      </div>
    </div>
  );
}

/**
 * One control row in the register: control id + label on the left, a status
 * chip + meta on the right. The active control carries the accent border, a
 * comment-count badge, and anchors the officer popover via children.
 * @param {{ control: CplControl; children?: ReactNode }} props Control data and an optional anchored popover.
 * @returns {JSX.Element} A control row.
 */
function CplRow({ control, children }: { control: CplControl; children?: ReactNode }) {
  return (
    <article className={`cpl-row${control.active ? " is-active" : ""}`}>
      <div className="cpl-row-lead">
        <span className="cpl-row-id">
          {control.id}
          {typeof control.comments === "number" ? (
            <span className="cpl-badge"><IconCommentBadge />{control.comments}</span>
          ) : null}
        </span>
        <span className="cpl-row-label">{control.label}</span>
      </div>
      <div className="cpl-row-trail">
        <span className={`cpl-status cpl-status-${control.statusKind}`}>{control.status}</span>
        <span className="cpl-row-meta">{control.meta}</span>
      </div>
      {children}
    </article>
  );
}

/**
 * The compliance controls-review board surface, rendered for the Comments page's
 * "comments/in-production/compliance" preset: a controls register with one
 * flagged attestation carrying an internal-scoped Velt comment thread. Visuals
 * are simulated, not a live SDK instance.
 * @returns {JSX.Element} The compliance controls board.
 */
export function ComplianceBoard() {
  return (
    <div className="cpl-board">
      <nav className="cpl-rail" aria-hidden="true">
        <span className="cpl-rail-group">
          {CPL_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`cpl-rail-btn${index === 0 ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="cpl-rail-btn">{CPL_SETTINGS_ICON}</span>
      </nav>

      <div className="cpl-main">
        <p className="cpl-eyebrow">{CPL_EYEBROW}</p>
        <p className="cpl-filing">{CPL_FILING}</p>
        <div className="cpl-list">
          {CPL_CONTROLS.map((control) => (
            <CplRow key={control.id} control={control}>
              {control.active ? <CplCommentPopover /> : null}
            </CplRow>
          ))}
        </div>
      </div>
    </div>
  );
}
