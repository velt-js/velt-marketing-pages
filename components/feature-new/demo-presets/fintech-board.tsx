import { Fragment, type ReactNode } from "react";

import { IconReply } from "./hero-surface";

// Shared fintech invoicing board ("In production · Fintech") — a dark invoice app
// modeled in the same visual language as the CRM pipeline board: a left icon
// rail, a mono eyebrow, a row of receivables KPI cards, and an invoices table
// with comment badges on the rows under review plus a cell-anchored comment
// popover. Invoice-level review is the story. Dark surface that sits on the dark
// proof panel. Simulated, not a live SDK. Defined once here and reused across
// every feature page's Fintech tab. Mirrors Figma "Invoice app" (933:2312).
const FIN_EYEBROW = "finance / receivables";
const FIN_COMMENT_AUTHOR = "Maya";
const FIN_COMMENT_TIME = "2m";

type FinStat = {
  label: string;
  value: string;
};

type FinInvoice = {
  id: string;
  client: string;
  cost: string;
  active?: boolean;
  comments?: number;
};

// Receivables KPI cards across the top of the board.
const FIN_STATS: FinStat[] = [
  { label: "Active invoices", value: "$42,125" },
  { label: "Awaiting approval", value: "$8,400" },
  { label: "Paid this week", value: "$31,900" },
];

// Invoices-table column headers.
const FIN_TABLE_COLS: string[] = ["Invoice Id", "Client", "Cost"];

// Invoice rows. The first row (#20251 / Apex Manufacturers) is the highlighted,
// commented invoice that anchors the review thread; a couple of other rows carry
// comment badges so the sheet reads like review is happening across receivables.
const FIN_INVOICES: FinInvoice[] = [
  { id: "#20251", client: "Apex Manufacturers", cost: "$4,250", active: true, comments: 1 },
  { id: "#20248", client: "Northwind Logistics", cost: "$2,980" },
  { id: "#20245", client: "Helios Energy", cost: "$7,120", comments: 1 },
  { id: "#20242", client: "Cedar & Stone LLP", cost: "$3,540", comments: 2 },
  { id: "#20239", client: "Bluefin Capital", cost: "$5,860" },
];

// Left-rail navigation glyphs for the invoicing app (Tabler-style, decorative
// chrome): dashboard, invoices (active), clients, payments, reports.
const FIN_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "dashboard",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
    ),
  },
  {
    key: "invoices",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v4h4" /><path d="M9 12h6M9 16h4" /></svg>
    ),
  },
  {
    key: "clients",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="2.8" /><path d="M4 19a5 5 0 0 1 10 0" /><path d="M15.5 6.2a2.8 2.8 0 0 1 0 5.2M20 19a5 5 0 0 0-3-4.6" /></svg>
    ),
  },
  {
    key: "payments",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h3" /></svg>
    ),
  },
  {
    key: "reports",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V5M4 19h16" /><rect x="8" y="11" width="3" height="5" rx="0.5" /><rect x="13" y="7" width="3" height="9" rx="0.5" /></svg>
    ),
  },
];

const FIN_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

// Index of the active (invoices) rail glyph.
const FIN_RAIL_ACTIVE_INDEX = 1;

/**
 * The anchored comment popover that floats over the highlighted invoice row,
 * mirroring the CRM thread preview (avatar, author + time, @-mention body, reply
 * count). Invoice-level review is the fintech story.
 * @returns {JSX.Element} The anchored comment popover.
 */
function FinCommentPopover() {
  return (
    <div className="fin-pop">
      <span className="fin-pop-av" aria-hidden="true">M</span>
      <div className="fin-pop-main">
        <div className="fin-pop-head">
          <span className="fin-pop-name">{FIN_COMMENT_AUTHOR}</span>
          <span className="fin-pop-time">{FIN_COMMENT_TIME}</span>
        </div>
        <p className="fin-pop-body">Can we confirm the PO before approving this one? <span className="fin-pop-mention">@Sarah</span></p>
        <span className="fin-pop-replies"><IconReply />1 Reply</span>
      </div>
    </div>
  );
}

/**
 * The chat-bubble glyph inside the row comment badge — a rounded square with a
 * single squared bottom-left corner (the speech tail), per the Figma spec.
 * @returns {JSX.Element} A filled comment-bubble icon.
 */
function FinBadgeBubble() {
  return (
    <svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10H1.42857C0.639594 10 0 9.36041 0 8.57143V5Z" /></svg>
  );
}

/**
 * The trailing comment-count badge shown at the right edge of an invoice row
 * under review. Rendered only for rows that carry comments.
 * @param {{ comments: number }} props The comment count to display.
 * @returns {JSX.Element} The orange comment-count badge.
 */
function FinRowBadge({ comments }: { comments: number }) {
  return (
    <span className="fin-badge"><FinBadgeBubble />{comments}</span>
  );
}

/**
 * The shared fintech invoicing board surface. Rendered for the
 * "<feature>/in-production/fintech" preset on every feature page (dark, default),
 * and for the "/for/fintech" solutions hero in its light-mode, edge-bleeding
 * variant (pass `light`). Visuals are simulated, not a live SDK instance.
 * @param {{ light?: boolean }} [props] Pass `light` for the inverted hero variant.
 * @returns {JSX.Element} The fintech invoices board.
 */
export function FintechBoard({ light = false }: { light?: boolean } = {}) {
  return (
    <div className={`fin-board${light ? " fin-board--light" : ""}`}>
      <nav className="fin-rail" aria-hidden="true">
        <span className="fin-rail-group">
          {FIN_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`fin-rail-btn${index === FIN_RAIL_ACTIVE_INDEX ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="fin-rail-btn">{FIN_SETTINGS_ICON}</span>
      </nav>

      <div className="fin-main">
        <p className="fin-eyebrow">{FIN_EYEBROW}</p>

        <div className="fin-stats">
          {FIN_STATS.map((stat) => (
            <div key={stat.label} className="fin-stat">
              <span className="fin-stat-label">{stat.label}</span>
              <span className="fin-stat-value">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="fin-table">
          <div className="fin-thead" aria-hidden="true">
            {FIN_TABLE_COLS.map((col) => (
              <span key={col} className="fin-th">{col}</span>
            ))}
            <span className="fin-th" />
          </div>
          <div className="fin-rows">
            {FIN_INVOICES.map((invoice) => (
              <Fragment key={invoice.id}>
                <div className={`fin-row${invoice.active ? " is-active" : ""}`}>
                  <span className="fin-id">{invoice.id}</span>
                  <span className="fin-client">{invoice.client}</span>
                  <span className="fin-cost">{invoice.cost}</span>
                  <span className="fin-row-trail">
                    {typeof invoice.comments === "number" ? <FinRowBadge comments={invoice.comments} /> : null}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <FinCommentPopover />
        </div>
      </div>
    </div>
  );
}
