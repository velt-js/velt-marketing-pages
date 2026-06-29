import type { ReactNode } from "react";

import { FACES } from "./hero-surface";

import "./digital-sales-room.css";

// Shared "Digital Sales Room" board ("In production · Sales enablement") — a
// dark mutual deal-room app recreated to match the Figma design
// (Velt Marketing 2026 · node 926:2307): a left icon rail, a centered
// Summary / Next Steps / Demo / Customer Stories tab strip, a "Hey Conductor!"
// intro with a ringed video thumbnail, an "Our Mutual Action Plan" checklist
// with a floating Velt comment popover, and a right-hand Comments panel with a
// composer. Dark surface that sits on the dark proof panel. Simulated, not a
// live SDK. Used by the Comments page's Sales enablement tab. Repeated copy is
// hoisted to constants.
const DSR_GREETING = "Hey Conductor!";
const DSR_GREETING_BODY =
  "This Digital Sales Room gives you everything you need to move forward - from proposal to plan.";
const DSR_PLAN_TITLE = "Our Mutual Action Plan";
const DSR_COMMENT_AUTHOR = "Maya";
const DSR_COMMENT_TIME = "2m";
const DSR_AVATAR_INITIAL = "M";
const DSR_MENTION = "@Fin";
const DSR_COMMENT_BODY = " We need to make a working demo for Rene and his team";
const DSR_COMMENTS_HEADING = "2 Comments";
const DSR_COMPOSER_PLACEHOLDER = "Add a comment";

// One thread in the right-hand Comments panel.
type DsrComment = {
  author: string;
  initial: string;
  time: string;
  mention: string;
  body: string;
  alt?: boolean;
};

// The Comments panel thread: Maya's ask (anchored to the action plan, mirrored
// by the popover) and Fin's reply. Distinct authors so the panel reads as a
// real back-and-forth rather than a duplicated card.
const DSR_COMMENTS: DsrComment[] = [
  {
    author: DSR_COMMENT_AUTHOR,
    initial: DSR_AVATAR_INITIAL,
    time: DSR_COMMENT_TIME,
    mention: DSR_MENTION,
    body: DSR_COMMENT_BODY,
  },
  {
    author: "Fin",
    initial: "F",
    time: "1m",
    mention: "@Maya",
    body: " On it. Spinning up the demo room now, ready before Thursday's sync.",
    alt: true,
  },
];

type DsrLead = "chevron-up" | "chevron-down" | "progress" | "radio";

type DsrPlanItem = {
  label: string;
  lead: DsrLead;
  count?: string;
  comments?: number;
  done?: boolean;
};

type DsrTab = { label: string; active?: boolean };

// Deal-room section tabs; "Summary" is the open tab in the captured state.
const DSR_TABS: DsrTab[] = [
  { label: "Summary", active: true },
  { label: "Next Steps" },
  { label: "Demo" },
  { label: "Customer Stories" },
];

// Mutual action plan — the expanded "Training" group with its in-flight items.
// "Creating a new Room" is the open, commented step that anchors the popover.
const DSR_PLAN_GROUP: DsrPlanItem[] = [
  { label: "Training", lead: "chevron-up", count: "2 / 5" },
  { label: "Creating a new Room", lead: "progress", comments: 1 },
  { label: "Build a working demo room", lead: "radio" },
];

// The collapsed, completed section below the active group.
const DSR_PLAN_COLLAPSED: DsrPlanItem = { label: "Contract sign-off", lead: "chevron-down", done: true };

// Left-rail navigation glyphs (Tabler-style, decorative chrome): panel, person,
// folder (active), chat bubble, board.
const DSR_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "panel",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v16" /></svg>
    ),
  },
  {
    key: "people",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.2" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>
    ),
  },
  {
    key: "rooms",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /></svg>
    ),
  },
  {
    key: "chat",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /></svg>
    ),
  },
  {
    key: "board",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="6" height="16" rx="1.5" /><rect x="14" y="4" width="6" height="10" rx="1.5" /></svg>
    ),
  },
];

// The active rail item (folder / rooms) in the captured state.
const DSR_RAIL_ACTIVE_INDEX = 2;

const DSR_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

const DSR_PLAY_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.2v13.6L19 12z" /></svg>
);

const DSR_PANEL_COLLAPSE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M15 4v16" /></svg>
);

const DSR_SEND_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 3 10.5 13.5" /><path d="M21 3 14.5 21l-4-7.5L3 9.5z" /></svg>
);

// Comment-count badge glyph on the active plan row: a filled speech bubble with
// a flat bottom-left corner. Uses currentColor so it inherits the badge's white.
const DSR_BADGE_ICON = (
  <svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
    <path d="M0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10H1.42857C0.639594 10 0 9.36041 0 8.57143V5Z" />
  </svg>
);

// Leading status glyph per plan-item lead kind.
const DSR_LEAD_ICONS: Record<DsrLead, ReactNode> = {
  "chevron-up": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 14l6-6 6 6" /></svg>
  ),
  "chevron-down": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 10l6 6 6-6" /></svg>
  ),
  progress: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3.4" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>
  ),
  radio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>
  ),
};

const DSR_TRAIL_DONE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
);

/**
 * One row in the mutual action plan: a leading status glyph, the task label,
 * an optional count or comment badge, and a trailing completion circle (a green
 * check when done, otherwise an empty radio).
 * @param {{ item: DsrPlanItem }} props The plan item to render.
 * @returns {JSX.Element} A plan row.
 */
function DsrPlanRow({ item }: { item: DsrPlanItem }) {
  return (
    <div className={`dsr-plan-row${item.lead === "chevron-up" || item.lead === "chevron-down" ? " is-section" : ""}`}>
      <span className={`dsr-plan-lead dsr-plan-lead-${item.lead}`} aria-hidden="true">{DSR_LEAD_ICONS[item.lead]}</span>
      <span className="dsr-plan-label">{item.label}</span>
      {item.count ? <span className="dsr-plan-count">{item.count}</span> : null}
      {typeof item.comments === "number" ? (
        <span className="dsr-badge">{DSR_BADGE_ICON}{item.comments}</span>
      ) : null}
      <span className={`dsr-plan-trail${item.done ? " is-done" : ""}`} aria-hidden="true">
        {item.done ? DSR_TRAIL_DONE_ICON : null}
      </span>
    </div>
  );
}

/**
 * One thread card in the right-hand Comments panel: an avatar, the author and
 * relative time, and the comment body with an accent @-mention.
 * @param {{ comment: DsrComment }} props The comment to render.
 * @returns {JSX.Element} A comment card.
 */
function DsrCommentCard({ comment }: { comment: DsrComment }) {
  return (
    <div className="dsr-cm-card">
      <span className={`dsr-cm-av${comment.alt ? " dsr-cm-av--alt" : ""}`} aria-hidden="true">{comment.initial}</span>
      <div className="dsr-cm-main">
        <div className="dsr-cm-head-row">
          <span className="dsr-cm-name">{comment.author}</span>
          <span className="dsr-cm-time">{comment.time}</span>
        </div>
        <p className="dsr-cm-body">
          <span className="dsr-cm-mention">{comment.mention}</span>{comment.body}
        </p>
      </div>
    </div>
  );
}

/**
 * The anchored comment popover that floats over the active action-plan item,
 * mirroring the canonical board thread preview (avatar, author + time) from the
 * Figma design.
 * @returns {JSX.Element} The anchored comment popover.
 */
function DsrCommentPopover() {
  return (
    <div className="dsr-pop">
      <span className="dsr-pop-av" aria-hidden="true">{DSR_AVATAR_INITIAL}</span>
      <div className="dsr-pop-main">
        <div className="dsr-pop-head">
          <span className="dsr-pop-name">{DSR_COMMENT_AUTHOR}</span>
          <span className="dsr-pop-time">{DSR_COMMENT_TIME}</span>
        </div>
        <p className="dsr-pop-body">
          <span className="dsr-pop-mention">{DSR_MENTION}</span>{DSR_COMMENT_BODY}
        </p>
      </div>
    </div>
  );
}

/**
 * The Digital Sales Room board surface. Rendered for the Comments page's
 * "comments/in-production/sales" preset, recreated to match the Figma design: a
 * left icon rail, a centered tab strip, a "Hey Conductor!" intro with a ringed
 * video thumbnail, a mutual action-plan checklist with an anchored Velt comment
 * popover, and a right-hand Comments panel with a composer. Visuals are
 * simulated, not a live SDK instance. Pass `light` for the inverted light-mode
 * surface used as the Sales enablement solutions-page hero artifact.
 * @param {{ light?: boolean }} props Whether to render the light-mode variant.
 * @returns {JSX.Element} The Digital Sales Room board.
 */
export function DigitalSalesRoom({ light = false }: { light?: boolean } = {}) {
  return (
    <div className={`dsr-board${light ? " dsr-board--light" : ""}`}>
      <nav className="dsr-rail" aria-hidden="true">
        <span className="dsr-rail-group">
          {DSR_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`dsr-rail-btn${index === DSR_RAIL_ACTIVE_INDEX ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="dsr-rail-btn dsr-rail-btn-settings">{DSR_SETTINGS_ICON}</span>
      </nav>

      <div className="dsr-main">
        <div className="dsr-tabs" role="tablist">
          {DSR_TABS.map((tab) => (
            <span key={tab.label} className={`dsr-tab${tab.active ? " on" : ""}`} role="tab">{tab.label}</span>
          ))}
        </div>

        <div className="dsr-stage">
          <div className="dsr-content">
            <div className="dsr-greet">
              <span className="dsr-thumb">
                <span className="dsr-thumb-img" style={{ backgroundImage: `url(${FACES.ethan})` }} role="img" aria-label="Intro video" />
                <span className="dsr-thumb-play" aria-hidden="true">{DSR_PLAY_ICON}</span>
              </span>
              <div className="dsr-greet-text">
                <h3 className="dsr-greet-title">{DSR_GREETING}</h3>
                <p className="dsr-greet-body">{DSR_GREETING_BODY}</p>
              </div>
            </div>

            <div className="dsr-plan">
              <div className="dsr-plan-title">{DSR_PLAN_TITLE}</div>
              <div className="dsr-plan-group">
                {DSR_PLAN_GROUP.map((item) => (
                  <DsrPlanRow key={item.label} item={item} />
                ))}
              </div>
              <div className="dsr-plan-collapsed">
                <DsrPlanRow item={DSR_PLAN_COLLAPSED} />
              </div>
              <DsrCommentPopover />
            </div>
          </div>
        </div>
      </div>

      <aside className="dsr-comments">
        <div className="dsr-cm-head">
          <span className="dsr-cm-head-title">{DSR_COMMENTS_HEADING}</span>
          <span className="dsr-cm-collapse" aria-hidden="true">{DSR_PANEL_COLLAPSE_ICON}</span>
        </div>
        <div className="dsr-cm-list">
          {DSR_COMMENTS.map((comment) => (
            <DsrCommentCard key={comment.author} comment={comment} />
          ))}
        </div>
        <div className="dsr-composer">
          <span className="dsr-composer-ph">{DSR_COMPOSER_PLACEHOLDER}</span>
          <span className="dsr-send" aria-hidden="true">{DSR_SEND_ICON}</span>
        </div>
      </aside>
    </div>
  );
}
