import type { ReactNode } from "react";

import { IconCommentBadge, IconReply } from "./hero-surface";

// Shared operations work-order board ("In production · Operations") — a dark
// dispatch app modeled in the same visual language as the CRM pipeline board: a
// left icon rail, a mono eyebrow, and a scrollable list of work orders /
// shipments with one highlighted and an internal-scoped comment popover.
// Cross-org sign-off is the story: the internal note is invisible to the
// counterparty. Dark surface that sits on the dark proof panel. Simulated, not a
// live SDK. Defined once here and reused across every feature page's Operations
// tab.
const OPS_EYEBROW = "operations / dispatch";
const OPS_INTERNAL_LABEL = "internal";
const OPS_COMMENT_AUTHOR = "Dispatch";
const OPS_COMMENT_TIME = "now";

type OpsStatus = "transit" | "hold" | "done" | "scheduled";

type OpsOrder = {
  id: string;
  route: string;
  status: string;
  statusKind: OpsStatus;
  meta: string;
  comments?: number;
  active?: boolean;
};

// Dispatch queue. SHP-4471 (on hold, 12 pallets) is the highlighted, commented
// order that anchors the internal thread; the rest are realistic field jobs.
const OPS_ORDERS: OpsOrder[] = [
  { id: "WO-2270", route: "Depot 4 → Site A", status: "In transit", statusKind: "transit", meta: "ETA 2h" },
  { id: "SHP-4471", route: "Rail yard → Plant 12", status: "On hold", statusKind: "hold", meta: "12 pallets", comments: 1, active: true },
  { id: "WO-2273", route: "Site C → Warehouse", status: "Scheduled", statusKind: "scheduled", meta: "tomorrow" },
  { id: "WO-2274", route: "Plant 12 → Depot 4", status: "Delivered", statusKind: "done", meta: "signed" },
  { id: "WO-2275", route: "Site A → Site B", status: "In transit", statusKind: "transit", meta: "ETA 5h" },
  { id: "WO-2276", route: "Warehouse → Site C", status: "Scheduled", statusKind: "scheduled", meta: "Fri" },
];

// Left-rail navigation glyphs (Tabler-style, decorative chrome).
const OPS_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "orders",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 9h8M8 13h8M8 17h5" /></svg>
    ),
  },
  {
    key: "fleet",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="1.6" /><circle cx="17.5" cy="17" r="1.6" /></svg>
    ),
  },
  {
    key: "map",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2zM9 4v14M15 6v14" /></svg>
    ),
  },
  {
    key: "schedule",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9h16M8 3v4M16 3v4" /></svg>
    ),
  },
];

const OPS_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

/**
 * Lock glyph for the internal-visibility chip — signals the note is scoped to
 * the internal team and hidden from the counterparty.
 * @returns {JSX.Element} A lock icon.
 */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
  );
}

/**
 * The anchored, internal-scoped comment popover that floats over the highlighted
 * work order. The header carries an "internal" visibility chip to make the
 * cross-org sign-off story explicit (the counterparty never sees this note).
 * @returns {JSX.Element} The anchored internal comment popover.
 */
function OpsCommentPopover() {
  return (
    <div className="ops-pop">
      <span className="ops-pop-av" aria-hidden="true">D</span>
      <div className="ops-pop-main">
        <div className="ops-pop-head">
          <span className="ops-pop-name">{OPS_COMMENT_AUTHOR}</span>
          <span className="ops-pop-time">{OPS_COMMENT_TIME}</span>
          <span className="ops-pop-chip"><IconLock />{OPS_INTERNAL_LABEL}</span>
        </div>
        <p className="ops-pop-body">Hold the shipment until the field record is signed.</p>
        <span className="ops-pop-replies"><IconReply />2 Replies</span>
      </div>
    </div>
  );
}

/**
 * One work-order row in the dispatch queue: order id + route on the left, a
 * status chip + meta on the right. The active order carries the accent border, a
 * comment-count badge, and anchors the internal popover via children.
 * @param {{ order: OpsOrder; children?: ReactNode }} props Order data and an optional anchored popover.
 * @returns {JSX.Element} A work-order row.
 */
function OpsRow({ order, children }: { order: OpsOrder; children?: ReactNode }) {
  return (
    <article className={`ops-row${order.active ? " is-active" : ""}`}>
      <div className="ops-row-lead">
        <span className="ops-row-id">
          {order.id}
          {typeof order.comments === "number" ? (
            <span className="ops-badge"><IconCommentBadge />{order.comments}</span>
          ) : null}
        </span>
        <span className="ops-row-route">{order.route}</span>
      </div>
      <div className="ops-row-trail">
        <span className={`ops-status ops-status-${order.statusKind}`}>{order.status}</span>
        <span className="ops-row-meta">{order.meta}</span>
      </div>
      {children}
    </article>
  );
}

/**
 * The shared operations work-order board surface. Rendered once and reused for
 * the "<feature>/in-production/ops" preset on every feature page, so the
 * Operations tab proof surface is identical everywhere. Visuals are simulated,
 * not a live SDK instance.
 * @returns {JSX.Element} The operations dispatch board.
 */
export function OperationsBoard() {
  return (
    <div className="ops-board">
      <nav className="ops-rail" aria-hidden="true">
        <span className="ops-rail-group">
          {OPS_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`ops-rail-btn${index === 0 ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="ops-rail-btn">{OPS_SETTINGS_ICON}</span>
      </nav>

      <div className="ops-main">
        <p className="ops-eyebrow">{OPS_EYEBROW}</p>
        <div className="ops-list">
          {OPS_ORDERS.map((order) => (
            <OpsRow key={order.id} order={order}>
              {order.active ? <OpsCommentPopover /> : null}
            </OpsRow>
          ))}
        </div>
      </div>
    </div>
  );
}
