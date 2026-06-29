import type { ReactNode } from "react";

import "./compliance-board.css";

// Shared compliance privacy-review board ("In production · Compliance") — a dark
// agentic review app in the same visual language as the other in-production
// boards: a left icon rail, a review header (with collaborator stack + Share), a
// set of agent-driven review steps in mixed states, and a Review Comments thread
// where a policy agent flags the privacy risk. Agent-assisted policy review with
// human sign-off is the story. Simulated, not a live SDK. Defined once here and
// reused across every feature page's Compliance tab. Mirrors Figma "Compliance"
// (938:2943).
const CPL_EYEBROW = "Privacy Risk Review";
const CPL_TITLE = "New feature processing health data";
const CPL_DESC =
  "Wren discovered a feature request in Jira involving users' health data and triggered a review after analyzing the PRD in Confluence against company policy and US regulation.";
const CPL_STARTED_BY = "Juan Mendez";
const CPL_STARTED_INITIAL = "J";
const CPL_PRESENCE: string[] = ["J", "M"];
const CPL_COMMENT_AUTHOR = "Policy Agent";
const CPL_COMMENT_TIME = "2m";

type CplStatus = "done" | "todo" | "blocked";

type CplStep = {
  label: string;
  status: string;
  statusKind: CplStatus;
  comments?: number;
};

// The agent-driven review steps. Step 1 is complete with an analysis comment,
// step 2 is the next action, step 3 is blocked pending the Privacy Impact
// Assessment — each mirroring the Figma state (check / circle / alert).
const CPL_STEPS: CplStep[] = [
  { label: "Wren analyzed the PRD against policy and HIPAA", status: "See analysis", statusKind: "done", comments: 1 },
  { label: "Wren recommends a PIA based on the findings", status: "Start", statusKind: "todo" },
  { label: "Route the PIA to the Privacy Office for approval", status: "Waiting on PIA", statusKind: "blocked", comments: 1 },
];

// Left-rail navigation glyphs for the privacy-review app (Tabler-style,
// decorative chrome): dashboard, reviews (active), policies, discussions, tasks.
const CPL_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "dashboard",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
    ),
  },
  {
    key: "reviews",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 3h6v3H9z" /><path d="M9 13l2 2 4-4" /></svg>
    ),
  },
  {
    key: "policies",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6z" /><path d="M9.5 12l1.8 1.8L15 10" /></svg>
    ),
  },
  {
    key: "discussions",
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

const CPL_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

const CPL_SHARE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="12" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="M7.9 11 16 7M7.9 13l8.1 4" /></svg>
);

const CPL_SEND_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
);

const CPL_AGENT_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l1.9 4.6 4.6 1.9-4.6 1.9L12 15.5l-1.9-4.6L5.5 9l4.6-1.9z" /></svg>
);

// Index of the active (reviews) rail glyph.
const CPL_RAIL_ACTIVE_INDEX = 1;

/**
 * The chat-bubble glyph inside a step's comment badge — a rounded square with a
 * single squared bottom-left corner (the speech tail), matching the other boards.
 * @returns {JSX.Element} A filled comment-bubble icon.
 */
function CplBadgeBubble() {
  return (
    <svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10H1.42857C0.639594 10 0 9.36041 0 8.57143V5Z" /></svg>
  );
}

/**
 * The status indicator for a review step: a filled green circle with a check
 * (done), an outline circle (to-do), or a filled red circle with an alert
 * (blocked, waiting on the PIA).
 * @param {{ kind: CplStatus }} props The step status.
 * @returns {JSX.Element} A status indicator.
 */
function CplStatusIcon({ kind }: { kind: CplStatus }) {
  if (kind === "done") {
    return (
      <span className="cpl-step-icon is-done">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
      </span>
    );
  }
  if (kind === "blocked") {
    return (
      <span className="cpl-step-icon is-blocked">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="10.8" y="6" width="2.4" height="8" rx="1.2" /><circle cx="12" cy="17.4" r="1.4" /></svg>
      </span>
    );
  }
  return <span className="cpl-step-icon is-todo" aria-hidden="true" />;
}

/**
 * One agent-driven review step: a description, a status indicator + label, and an
 * optional comment-count badge.
 * @param {{ step: CplStep }} props The review step to render.
 * @returns {JSX.Element} A review step row.
 */
function CplStepRow({ step }: { step: CplStep }) {
  return (
    <div className="cpl-step">
      <span className="cpl-step-label">{step.label}</span>
      <span className="cpl-step-status">
        <CplStatusIcon kind={step.statusKind} />
        <span className="cpl-step-stat">{step.status}</span>
      </span>
      {typeof step.comments === "number" ? (
        <span className="cpl-badge"><CplBadgeBubble />{step.comments}</span>
      ) : (
        <span className="cpl-badge is-ghost" aria-hidden="true" />
      )}
    </div>
  );
}

/**
 * The shared compliance privacy-review board surface. Rendered once and reused
 * for the "<feature>/in-production/compliance" preset on every feature page, so
 * the Compliance tab proof surface is identical everywhere. Pass `light` for the
 * inverted, edge-bleeding hero variant used on the /for/compliance solutions page.
 * Visuals are simulated, not a live SDK instance.
 * @param {{ light?: boolean }} [props] Pass `light` for the inverted hero variant.
 * @returns {JSX.Element} The compliance privacy-review board.
 */
export function ComplianceBoard({ light = false }: { light?: boolean } = {}) {
  return (
    <div className={`cpl-board${light ? " cpl-board--light" : ""}`}>
      <nav className="cpl-rail" aria-hidden="true">
        <span className="cpl-rail-group">
          {CPL_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`cpl-rail-btn${index === CPL_RAIL_ACTIVE_INDEX ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="cpl-rail-btn">{CPL_SETTINGS_ICON}</span>
      </nav>

      <div className="cpl-main">
        <div className="cpl-top">
          <div className="cpl-head">
            <p className="cpl-eyebrow">{CPL_EYEBROW}</p>
            <h3 className="cpl-title">{CPL_TITLE}</h3>
            <p className="cpl-desc">{CPL_DESC}</p>
            <span className="cpl-started">
              <span className="cpl-started-av" aria-hidden="true">{CPL_STARTED_INITIAL}</span>
              Started by {CPL_STARTED_BY}
            </span>
          </div>
          <div className="cpl-top-right">
            <span className="cpl-avatars" aria-hidden="true">
              {CPL_PRESENCE.map((initial) => (
                <span key={initial} className="cpl-av">{initial}</span>
              ))}
            </span>
            <span className="cpl-share">{CPL_SHARE_ICON}Share</span>
          </div>
        </div>

        <div className="cpl-steps">
          {CPL_STEPS.map((step) => (
            <CplStepRow key={step.label} step={step} />
          ))}
        </div>

        <h4 className="cpl-section-title">Discussion</h4>

        <div className="cpl-composer">
          <span className="cpl-composer-ph">Add a comment</span>
          <span className="cpl-composer-send" aria-hidden="true">{CPL_SEND_ICON}</span>
        </div>

        <div className="cpl-agent">
          <span className="cpl-agent-av" aria-hidden="true">{CPL_AGENT_ICON}</span>
          <div className="cpl-agent-main">
            <div className="cpl-agent-head">
              <span className="cpl-agent-name">{CPL_COMMENT_AUTHOR}</span>
              <span className="cpl-agent-time">{CPL_COMMENT_TIME}</span>
            </div>
            <p className="cpl-agent-body">
              This feature processes PHI, so HIPAA applies. I recommend a PIA and a vendor BAA review before any data flows. <span className="cpl-agent-mention">@Juan</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
