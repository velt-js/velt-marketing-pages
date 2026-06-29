import type { ReactNode } from "react";

import "./legal-board.css";

// Shared legal-tech board ("In production · Legal") — a dark contract-review app
// in the same visual language as the other in-production boards: a left icon
// rail, a document header with a collaborator stack + Share, the agreement body
// with one clause highlighted under review, and a right-hand comment thread where
// the highlighted clause is being negotiated. Document-level review on a live
// contract is the story. Simulated, not a live SDK. Defined once here and reused
// across every feature page's Legal tab. Mirrors Figma "Legal Tech" (937:2773).
const LGL_WORKSPACE = "Superflow";
const LGL_TITLE = "SaaS Monthly Subscription";

type LglClause = {
  label: string;
  body: ReactNode;
};

type LglComment = {
  initials: string;
  author: string;
  time: string;
  body: ReactNode;
  active?: boolean;
};

// The agreement body. Clause 3 carries the highlighted span under review, which
// the active comment in the thread is negotiating (the liability cap).
const LGL_CLAUSES: LglClause[] = [
  {
    label: "1 · Subscription & Fees",
    body: "Customer subscribes to the Service on a monthly basis and shall pay the then-current fees in advance of each billing period. Fees are non-refundable except as expressly set out in this Agreement.",
  },
  {
    label: "2 · Term & Auto-Renewal",
    body: "The subscription renews automatically for successive one-month terms unless either party gives at least thirty (30) days' written notice of non-renewal before the end of the then-current term.",
  },
  {
    label: "3 · Limitation of Liability",
    body: (
      <>
        Except for breaches of confidentiality, each party&apos;s total aggregate liability under this Agreement shall not exceed{" "}
        <span className="lgl-mark">the fees paid by Customer in the one (1) month preceding</span> the event giving rise to the claim.
      </>
    ),
  },
  {
    label: "4 · Governing Law",
    body: "This Agreement is governed by the laws of the State of Delaware, without regard to its conflict-of-laws provisions, and the parties consent to the exclusive jurisdiction of its courts.",
  },
];

// The negotiation thread on the contract. The middle comment is active — it is
// the one anchored to the highlighted liability-cap clause.
const LGL_COMMENTS: LglComment[] = [
  {
    initials: "M",
    author: "Maya",
    time: "5m",
    body: (
      <>
        <span className="lgl-cm-mention">@Jordan</span>{" "}Auto-renewal needs 60 days&apos; notice to match our policy, not 30.
      </>
    ),
  },
  {
    initials: "J",
    author: "Jordan",
    time: "2m",
    active: true,
    body: (
      <>
        <span className="lgl-cm-mention">@Maya</span>{" "}Liability cap is one month of fees — Legal wants 12 months before we sign.
      </>
    ),
  },
  {
    initials: "P",
    author: "Priya",
    time: "8m",
    body: (
      <>
        <span className="lgl-cm-mention">@Maya</span>{" "}Governing law should be New York to match the MSA.
      </>
    ),
  },
];

// Left-rail navigation glyphs for the contract app (Tabler-style, decorative
// chrome): dashboard, documents (active), parties, review, tasks.
const LGL_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "dashboard",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
    ),
  },
  {
    key: "documents",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v4h4" /><path d="M9 13h6M9 16h4" /></svg>
    ),
  },
  {
    key: "parties",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="2.8" /><path d="M4 19a5 5 0 0 1 10 0" /><path d="M15.5 6.2a2.8 2.8 0 0 1 0 5.2M20 19a5 5 0 0 0-3-4.6" /></svg>
    ),
  },
  {
    key: "review",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3z" /></svg>
    ),
  },
  {
    key: "tasks",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 6h10M10 12h10M10 18h10" /><path d="M4 6l1.3 1.3L7.5 5M4 12l1.3 1.3L7.5 11" /></svg>
    ),
  },
];

const LGL_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

const LGL_SHARE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="12" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="M7.9 11 16 7M7.9 13l8.1 4" /></svg>
);

// Index of the active (documents) rail glyph.
const LGL_RAIL_ACTIVE_INDEX = 1;

// Collaborators shown in the header presence stack.
const LGL_PRESENCE: string[] = ["J", "M"];

/**
 * One clause block in the agreement: a small section label and the clause text
 * (clause 3 carries the highlighted span under review).
 * @param {{ clause: LglClause }} props The clause to render.
 * @returns {JSX.Element} A clause block.
 */
function LglClauseBlock({ clause }: { clause: LglClause }) {
  return (
    <div className="lgl-clause">
      <p className="lgl-clause-label">{clause.label}</p>
      <p className="lgl-clause-body">{clause.body}</p>
    </div>
  );
}

/**
 * One comment card in the negotiation thread: avatar, author + time, and the
 * comment body. The active card is the one anchored to the highlighted clause.
 * @param {{ comment: LglComment }} props The comment to render.
 * @returns {JSX.Element} A comment card.
 */
function LglCommentCard({ comment }: { comment: LglComment }) {
  return (
    <div className={`lgl-cm${comment.active ? " is-active" : ""}`}>
      <span className="lgl-cm-av" aria-hidden="true">{comment.initials}</span>
      <div className="lgl-cm-main">
        <div className="lgl-cm-head">
          <span className="lgl-cm-name">{comment.author}</span>
          <span className="lgl-cm-time">{comment.time}</span>
        </div>
        <p className="lgl-cm-body">{comment.body}</p>
      </div>
    </div>
  );
}

/**
 * The shared legal-tech contract-review board surface. Rendered once and reused
 * for the "<feature>/in-production/legal" preset on every feature page (dark,
 * default), and for the "/for/legal" solutions hero in its light-mode,
 * edge-bleeding variant (pass `light`). Visuals are simulated, not a live SDK
 * instance.
 * @param {{ light?: boolean }} [props] Pass `light` for the inverted hero variant.
 * @returns {JSX.Element} The legal contract-review board.
 */
export function LegalBoard({ light = false }: { light?: boolean } = {}) {
  return (
    <div className={`lgl-board${light ? " lgl-board--light" : ""}`}>
      <nav className="lgl-rail" aria-hidden="true">
        <span className="lgl-rail-group">
          {LGL_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`lgl-rail-btn${index === LGL_RAIL_ACTIVE_INDEX ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="lgl-rail-btn">{LGL_SETTINGS_ICON}</span>
      </nav>

      <div className="lgl-main">
        <div className="lgl-top">
          <div className="lgl-head">
            <p className="lgl-eyebrow">{LGL_WORKSPACE}</p>
            <h3 className="lgl-title">{LGL_TITLE}</h3>
          </div>
          <div className="lgl-top-right">
            <span className="lgl-avatars" aria-hidden="true">
              {LGL_PRESENCE.map((initial) => (
                <span key={initial} className="lgl-av">{initial}</span>
              ))}
            </span>
            <span className="lgl-share">{LGL_SHARE_ICON}Share</span>
          </div>
        </div>

        <div className="lgl-body">
          <div className="lgl-doc">
            {LGL_CLAUSES.map((clause) => (
              <LglClauseBlock key={clause.label} clause={clause} />
            ))}
          </div>
          <div className="lgl-comments">
            {LGL_COMMENTS.map((comment) => (
              <LglCommentCard key={comment.author} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
