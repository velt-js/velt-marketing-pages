import type { ReactNode } from "react";

import { IconReply } from "./hero-surface";

// Shared operations supply-chain board ("In production · Operations") — a dark,
// dotted canvas modeled in the same visual language as the other in-production
// boards: a left icon rail plus a provenance map that traces a product through
// its supply chain (Farm → Cotton Yarn → Manufacturer), connected by elbow
// links. One node carries a comment badge with an anchored thread, and a live
// teammate cursor + zoom controls sell the shared-canvas, cross-org review
// story. Simulated, not a live SDK. Defined once here and reused across every
// feature page's Operations tab. Mirrors Figma "Operations workflow" (937:2531).
const OPS_EYEBROW = "Cotton Supplier Ltd.";
const OPS_TITLE = "Mid Weight Indigo Denim";
const OPS_COMMENT_AUTHOR = "Maya";
const OPS_COMMENT_TIME = "2m";
const OPS_CURSOR_NAME = "Sean";

type OpsNode = {
  key: string;
  type: string;
  name: string;
  location: string;
  icon: ReactNode;
  x: number;
  y: number;
  comments?: number;
};

// Supply-chain stages, positioned (px, from the canvas top-left) in a staggered
// diagonal so the elbow links read as a left-to-right provenance flow. The
// "Cotton Yarn" stage is the commented node that anchors the review thread.
const OPS_FARM_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21V9M12 12c-2.4 0-4-1.6-4-4 2.4 0 4 1.6 4 4zM12 10c0-2.4 1.6-4 4-4 0 2.4-1.6 4-4 4zM7 21h10" /></svg>
);
const OPS_YARN_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20 14.5 9.5M14 6.5l3.5 3.5M16 4l4 4-2.5 2.5-4-4zM12 12l-2 2 1.5 1.5" /></svg>
);
const OPS_MAKER_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 21V9l8-5 8 5v12zM9 21v-5h6v5M9 11h.01M15 11h.01" /></svg>
);

const OPS_NODES: OpsNode[] = [
  { key: "farm", type: "Farm", name: "AgriCotton Farms", location: "Village Kheda, Gujarat, India", icon: OPS_FARM_ICON, x: 88, y: 176 },
  { key: "yarn", type: "Cotton Yarn", name: "SpinCo Yarns", location: "18 Narol Rd, Gujarat, India", icon: OPS_YARN_ICON, x: 348, y: 228, comments: 1 },
  { key: "maker", type: "Manufacturer", name: "DyeWorks International", location: "Calle de Mayo, Mexico", icon: OPS_MAKER_ICON, x: 602, y: 288 },
];

// Left-rail navigation glyphs for the supply-chain app (Tabler-style, decorative
// chrome): dashboard, suppliers, supply-chain map (active), shipments, compliance.
const OPS_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "dashboard",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
    ),
  },
  {
    key: "suppliers",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 21V7l8-4 8 4v14" /><path d="M9 21v-5h6v5" /><path d="M8 10h.01M16 10h.01" /></svg>
    ),
  },
  {
    key: "chain",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="2.2" /><circle cx="19" cy="6" r="2.2" /><circle cx="19" cy="18" r="2.2" /><path d="M7 11l10-4M7 13l10 4" /></svg>
    ),
  },
  {
    key: "shipments",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h3.5l3 3v3H14z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></svg>
    ),
  },
  {
    key: "compliance",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4 3 7 7 8 4-1 7-4 7-8V6z" /><path d="M9 12l2 2 4-4" /></svg>
    ),
  },
];

const OPS_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

// Index of the active (supply-chain map) rail glyph.
const OPS_RAIL_ACTIVE_INDEX = 2;

/**
 * The chat-bubble glyph inside the node comment badge — a rounded square with a
 * single squared bottom-left corner (the speech tail), matching the other boards.
 * @returns {JSX.Element} A filled comment-bubble icon.
 */
function OpsBadgeBubble() {
  return (
    <svg viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10H1.42857C0.639594 10 0 9.36041 0 8.57143V5Z" /></svg>
  );
}

/**
 * One supply-chain stage card: a type label with an accent glyph (and optional
 * comment badge), the supplier name, and its location.
 * @param {{ node: OpsNode }} props The stage data to render.
 * @returns {JSX.Element} A positioned supply-chain node card.
 */
function OpsStageNode({ node }: { node: OpsNode }) {
  return (
    <div className="ops-node" style={{ left: node.x, top: node.y }}>
      <div className="ops-node-head">
        <span className="ops-node-type">
          <span className="ops-node-icon" aria-hidden="true">{node.icon}</span>
          {node.type}
        </span>
        {typeof node.comments === "number" ? (
          <span className="ops-badge"><OpsBadgeBubble />{node.comments}</span>
        ) : null}
      </div>
      <p className="ops-node-name">{node.name}</p>
      <p className="ops-node-loc">{node.location}</p>
    </div>
  );
}

/**
 * The elbow links connecting consecutive supply-chain stages, drawn in the same
 * px coordinate space as the absolutely-positioned node cards so the paths meet
 * each card's edge.
 * @returns {JSX.Element} The accent connector overlay.
 */
function OpsLinks() {
  return (
    <svg className="ops-links" aria-hidden="true" preserveAspectRatio="none">
      <path d="M288 222 H312 Q318 222 318 228 V268 Q318 274 324 274 H348" />
      <path d="M548 274 H572 Q578 274 578 280 V328 Q578 334 584 334 H602" />
    </svg>
  );
}

/**
 * The anchored comment popover floating beside the commented "Cotton Yarn" stage
 * — avatar, author + time, an @-mention body, and a reply count. Cross-org
 * provenance review is the operations story.
 * @returns {JSX.Element} The anchored comment popover.
 */
function OpsCommentPopover() {
  return (
    <div className="ops-pop">
      <span className="ops-pop-av" aria-hidden="true">M</span>
      <div className="ops-pop-main">
        <div className="ops-pop-head">
          <span className="ops-pop-name">{OPS_COMMENT_AUTHOR}</span>
          <span className="ops-pop-time">{OPS_COMMENT_TIME}</span>
        </div>
        <p className="ops-pop-body">Can you attach the GOTS cert for this lot before we approve? <span className="ops-pop-mention">@Sean</span></p>
        <span className="ops-pop-replies"><IconReply />1 Reply</span>
      </div>
    </div>
  );
}

/**
 * A live teammate cursor on the shared canvas — a pointer plus a name pill,
 * reinforcing the multiplayer-review story.
 * @returns {JSX.Element} The live cursor.
 */
function OpsCursor() {
  return (
    <div className="ops-cursor" aria-hidden="true">
      <svg className="ops-cursor-arrow" viewBox="0 0 18 18" fill="currentColor"><path d="M2 2l14 5.5-6 1.8-1.8 6z" /></svg>
      <span className="ops-cursor-label">{OPS_CURSOR_NAME}</span>
    </div>
  );
}

/**
 * The shared operations supply-chain board surface. Rendered once and reused for
 * the "<feature>/in-production/operations" preset on every feature page, so the
 * Operations tab proof surface is identical everywhere. Also used for the
 * "/for/operations" solutions hero in its light-mode, edge-bleeding variant
 * (pass `light`). Visuals are simulated, not a live SDK instance.
 * @param {{ light?: boolean }} [props] Pass `light` for the inverted hero variant.
 * @returns {JSX.Element} The operations supply-chain board.
 */
export function OperationsBoard({ light = false }: { light?: boolean } = {}) {
  return (
    <div className={`ops-board${light ? " ops-board--light" : ""}`}>
      <nav className="ops-rail" aria-hidden="true">
        <span className="ops-rail-group">
          {OPS_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`ops-rail-btn${index === OPS_RAIL_ACTIVE_INDEX ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="ops-rail-btn ops-rail-btn-settings">{OPS_SETTINGS_ICON}</span>
      </nav>

      <div className="ops-canvas">
        <div className="ops-head">
          <p className="ops-eyebrow">{OPS_EYEBROW}</p>
          <h3 className="ops-title">{OPS_TITLE}</h3>
        </div>

        <OpsLinks />
        {OPS_NODES.map((node) => (
          <OpsStageNode key={node.key} node={node} />
        ))}

        <OpsCommentPopover />
        <OpsCursor />

        <div className="ops-zoom" aria-hidden="true">
          <span className="ops-zoom-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /></svg>
          </span>
          <span className="ops-zoom-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        </div>
      </div>
    </div>
  );
}
