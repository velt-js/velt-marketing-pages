import { Fragment, type ReactNode } from "react";

import { IconCommentBadge, IconReply } from "./hero-surface";

// Shared fintech financial-model board ("In production · Fintech") — a dark
// spreadsheet app modeled in the same visual language as the CRM pipeline board:
// a left icon rail, a mono eyebrow, and a quarterly forecast sheet with one cell
// highlighted and a cell-anchored comment popover. Cell-level review is the
// story. Dark surface that sits on the dark proof panel. Simulated, not a live
// SDK. Defined once here and reused across every feature page's Fintech tab.
const FIN_EYEBROW = "finance / close week";
const FIN_FILE = "forecast.xlsx";
const FIN_COMMENT_AUTHOR = "Maya";
const FIN_COMMENT_TIME = "4m";

type FinRow = {
  num: string;
  label: string;
  values: string[];
  activeIndex?: number;
  comments?: number;
};

// Quarterly column headers for the forecast sheet.
const FIN_COLS: string[] = ["Q1", "Q2", "Q3", "Q4"];

// Forecast rows. The "Forecast" row (Q3 = $3.6M) is the highlighted, commented
// cell that anchors the review thread; it sits high in the sheet so the popover
// opens downward into the rows below with clearance. The rest are realistic
// close-week lines that give the sheet breathing room beneath the thread.
const FIN_ROWS: FinRow[] = [
  { num: "08", label: "Revenue", values: ["$2.4M", "$2.7M", "$3.1M", "$3.6M"] },
  { num: "09", label: "New bookings", values: ["$0.8M", "$0.9M", "$1.1M", "$1.3M"] },
  { num: "10", label: "Forecast", values: ["$3.1M", "$3.4M", "$3.6M", "$4.0M"], activeIndex: 2, comments: 1 },
  { num: "11", label: "COGS", values: ["$0.9M", "$1.0M", "$1.1M", "$1.3M"] },
  { num: "12", label: "Gross margin", values: ["$1.5M", "$1.7M", "$2.0M", "$2.3M"] },
  { num: "13", label: "Operating exp.", values: ["$1.1M", "$1.2M", "$1.2M", "$1.3M"] },
  { num: "14", label: "EBITDA", values: ["$0.4M", "$0.5M", "$0.8M", "$1.0M"] },
  { num: "15", label: "Net margin", values: ["18%", "19%", "21%", "23%"] },
];

// Left-rail navigation glyphs (Tabler-style, decorative chrome).
const FIN_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "sheets",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M4 14h16M9 4v16M14 4v16" /></svg>
    ),
  },
  {
    key: "formulas",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5h6M7 19h4a3 3 0 0 0 3-3V8a3 3 0 0 1 3-3M6 12h7" /></svg>
    ),
  },
  {
    key: "charts",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V5M4 19h16" /><rect x="8" y="11" width="3" height="5" rx="0.5" /><rect x="14" y="7" width="3" height="9" rx="0.5" /></svg>
    ),
  },
  {
    key: "ledger",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" /><path d="M9 9h5M9 13h6M9 17h4" /></svg>
    ),
  },
];

const FIN_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

/**
 * The anchored comment popover that floats over the highlighted forecast cell,
 * mirroring the CRM thread preview (avatar, author + time, @-mention body, reply
 * count). Cell-level review is the fintech story.
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
        <p className="fin-pop-body">Is this the revised Q3 number? <span className="fin-pop-mention">@Sarah</span></p>
        <span className="fin-pop-replies"><IconReply />1 Reply</span>
      </div>
    </div>
  );
}

/**
 * One value cell in the forecast sheet. The active cell carries the accent
 * border and a comment-count badge; the review popover is rendered as a sibling
 * of the grid (see {@link FintechBoard}) so it is never clipped by the grid's
 * rounded-corner overflow.
 * @param {{ value: string; active?: boolean; comments?: number }} props Cell value, active flag, and optional comment count.
 * @returns {JSX.Element} A forecast value cell.
 */
function FinCell({ value, active, comments }: { value: string; active?: boolean; comments?: number }) {
  return (
    <span className={`fin-cell fin-cell-val${active ? " is-active" : ""}`}>
      {value}
      {typeof comments === "number" ? (
        <span className="fin-badge"><IconCommentBadge />{comments}</span>
      ) : null}
    </span>
  );
}

/**
 * The shared fintech financial-model board surface. Rendered once and reused for
 * the "<feature>/in-production/fintech" preset on every feature page, so the
 * Fintech tab proof surface is identical everywhere. Visuals are simulated, not
 * a live SDK instance.
 * @returns {JSX.Element} The fintech forecast board.
 */
export function FintechBoard() {
  return (
    <div className="fin-board">
      <nav className="fin-rail" aria-hidden="true">
        <span className="fin-rail-group">
          {FIN_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`fin-rail-btn${index === 0 ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="fin-rail-btn">{FIN_SETTINGS_ICON}</span>
      </nav>

      <div className="fin-main">
        <p className="fin-eyebrow">{FIN_EYEBROW}</p>
        <div className="fin-sheet">
          <div className="fin-grid">
            <span className="fin-h fin-h-corner" aria-hidden="true" />
            <span className="fin-h fin-h-label">{FIN_FILE}</span>
            {FIN_COLS.map((col) => (
              <span key={col} className="fin-h">{col}</span>
            ))}
            {FIN_ROWS.map((row) => (
              <Fragment key={row.num}>
                <span className="fin-rownum">{row.num}</span>
                <span className="fin-cell fin-cell-label">{row.label}</span>
                {row.values.map((value, index) => (
                  <FinCell
                    key={`${row.num}-${FIN_COLS[index]}`}
                    value={value}
                    active={row.activeIndex === index}
                    comments={row.activeIndex === index ? row.comments : undefined}
                  />
                ))}
              </Fragment>
            ))}
          </div>
          <FinCommentPopover />
        </div>
      </div>
    </div>
  );
}
