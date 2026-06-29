import type { ReactNode } from "react";

import { IconCommentBadge, IconReply } from "./hero-surface";

import "./legal-board.css";

// Shared legal matter-review board ("In production · Legal") — a dark contract
// review app in the same visual language as the other in-production boards: a
// left icon rail, a mono eyebrow, a matter header, and a clause document with
// one clause highlighted that anchors a counsel comment popover. Clause-level
// redline review on the matter is the story. Dark surface that sits on the dark
// proof panel. Simulated, not a live SDK. Repeated copy is hoisted to constants.
const LGL_EYEBROW = "legal / matter review";
const LGL_MATTER = "Mutual NDA · Meridian Holdings";
const LGL_INTERNAL_LABEL = "internal";
const LGL_COMMENT_AUTHOR = "Maya · Counsel";
const LGL_COMMENT_TIME = "3m";

type LglClause = {
  num: string;
  title: string;
  body: ReactNode;
  active?: boolean;
  comments?: number;
};

// Clause document. Clause 7 (indemnification) is the highlighted, commented
// clause that anchors the counsel thread; the rest give the matter realistic
// surrounding context.
const LGL_CLAUSES: LglClause[] = [
  {
    num: "6",
    title: "Confidentiality",
    body: "Each party shall protect the other's Confidential Information with no less than reasonable care.",
  },
  {
    num: "7",
    title: "Indemnification",
    body: (
      <>
        The receiving party shall indemnify the disclosing party against{" "}
        <span className="lgl-clause-mark">any and all losses</span> arising from any breach.
      </>
    ),
    active: true,
    comments: 1,
  },
  {
    num: "8",
    title: "Term & termination",
    body: "This Agreement remains in effect for two (2) years from the Effective Date unless terminated earlier.",
  },
  {
    num: "9",
    title: "Governing law",
    body: "This Agreement is governed by the laws of the State of Delaware, without regard to conflict-of-law rules.",
  },
];

// Left-rail navigation glyphs (Tabler-style, decorative chrome).
const LGL_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "matters",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" /><path d="M9 9h5M9 13h6M9 17h4" /></svg>
    ),
  },
  {
    key: "clauses",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16M4 10h16M4 14h10M4 18h7" /></svg>
    ),
  },
  {
    key: "redlines",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20h4L18 10a2 2 0 0 0-3-3L5 17z" /><path d="M13.5 6.5l3 3" /></svg>
    ),
  },
  {
    key: "history",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 8v4l3 2" /><path d="M3.5 12a8.5 8.5 0 1 0 2.5-6M3 4v4h4" /></svg>
    ),
  },
];

const LGL_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

const LGL_LOCK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
);

/**
 * The anchored comment popover that floats over the highlighted clause. The
 * header carries an "internal" visibility chip so the deal team's deliberation
 * reads as scoped to counsel and hidden from the counterparty.
 * @returns {JSX.Element} The anchored counsel comment popover.
 */
function LglCommentPopover() {
  return (
    <div className="lgl-pop">
      <span className="lgl-pop-av" aria-hidden="true">M</span>
      <div className="lgl-pop-main">
        <div className="lgl-pop-head">
          <span className="lgl-pop-name">{LGL_COMMENT_AUTHOR}</span>
          <span className="lgl-pop-time">{LGL_COMMENT_TIME}</span>
          <span className="lgl-pop-chip">{LGL_LOCK_ICON}{LGL_INTERNAL_LABEL}</span>
        </div>
        <p className="lgl-pop-body">
          No liability cap here. <span className="lgl-pop-mention">@Dev</span> can we cap at fees paid before we send back?
        </p>
        <span className="lgl-pop-replies"><IconReply />1 Reply</span>
      </div>
    </div>
  );
}

/**
 * One clause block in the matter document: a clause number, its title, and the
 * clause text. The active clause carries the accent border, a comment-count
 * badge, and anchors the counsel popover via children.
 * @param {{ clause: LglClause; children?: ReactNode }} props Clause data and an optional anchored popover.
 * @returns {JSX.Element} A clause block.
 */
function LglClauseBlock({ clause, children }: { clause: LglClause; children?: ReactNode }) {
  return (
    <article className={`lgl-clause${clause.active ? " is-active" : ""}`}>
      <div className="lgl-clause-head">
        <span className="lgl-clause-num">{clause.num}</span>
        <span className="lgl-clause-title">{clause.title}</span>
        {typeof clause.comments === "number" ? (
          <span className="lgl-badge"><IconCommentBadge />{clause.comments}</span>
        ) : null}
      </div>
      <p className="lgl-clause-body">{clause.body}</p>
      {children}
    </article>
  );
}

/**
 * The legal matter-review board surface, rendered for the Comments page's
 * "comments/in-production/legal" preset: a clause document with one clause
 * carrying an internal-scoped Velt comment thread from counsel. Visuals are
 * simulated, not a live SDK instance.
 * @returns {JSX.Element} The legal matter board.
 */
export function LegalBoard() {
  return (
    <div className="lgl-board">
      <nav className="lgl-rail" aria-hidden="true">
        <span className="lgl-rail-group">
          {LGL_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`lgl-rail-btn${index === 0 ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="lgl-rail-btn">{LGL_SETTINGS_ICON}</span>
      </nav>

      <div className="lgl-main">
        <p className="lgl-eyebrow">{LGL_EYEBROW}</p>
        <p className="lgl-matter">{LGL_MATTER}</p>
        <div className="lgl-doc">
          {LGL_CLAUSES.map((clause) => (
            <LglClauseBlock key={clause.num} clause={clause}>
              {clause.active ? <LglCommentPopover /> : null}
            </LglClauseBlock>
          ))}
        </div>
      </div>
    </div>
  );
}
