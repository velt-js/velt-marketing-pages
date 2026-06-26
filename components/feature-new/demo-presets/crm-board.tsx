import type { ReactNode } from "react";

import { IconCommentBadge, IconReply } from "./hero-surface";

// Shared sales-enablement CRM pipeline board ("In production · Sales") — modeled
// on the Figma kanban surface: a left icon rail and Sourced/Contacted/Replied
// columns of lead cards, with one highlighted card carrying an anchored comment
// popover. Dark surface that sits on the dark proof panel. Simulated, not live
// SDK. Defined once here and reused across every feature page's Sales tab.
// Repeated sync-label copy is hoisted to constants.
const CRM_SYNC_LABEL = "Synced";
const CRM_SYNC_SUFFIX = "ago";
const CRM_EYEBROW = "sales / mid-size";

type CrmLead = {
  name: string;
  role: string;
  company: string;
  sync: string;
  comments?: number;
  active?: boolean;
};

type CrmColumn = { key: string; label: string; icon: ReactNode; leads: CrmLead[] };

// Left-rail navigation glyphs (Tabler-style, decorative chrome).
const CRM_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "board",
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
    key: "files",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /></svg>
    ),
  },
  {
    key: "inbox",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V16H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /></svg>
    ),
  },
  {
    key: "pipeline",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="4.5" height="12" rx="1" /><rect x="10" y="4" width="4.5" height="8" rx="1" /><rect x="16" y="4" width="4.5" height="14" rx="1" /></svg>
    ),
  },
];

const CRM_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

// Pipeline columns. The detailed Figma card (Rene Teses) is the highlighted,
// commented lead in "Sourced"; the rest are realistic mid-size sales leads.
const CRM_COLUMNS: CrmColumn[] = [
  {
    key: "sourced",
    label: "Sourced",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8" /></svg>,
    leads: [
      { name: "Dana Whitfield", role: "VP Sales", company: "Westvale", sync: "5m" },
      { name: "Rene Teses", role: "CFO", company: "Flacons", sync: "2m", comments: 1, active: true },
      { name: "Omar Haddad", role: "Head of Ops", company: "Pinecrest", sync: "14m" },
      { name: "Greta Olsen", role: "VP Finance", company: "Halden", sync: "31m" },
    ],
  },
  {
    key: "contacted",
    label: "Contacted",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="6" width="16" height="12" rx="2" /><path d="M5 8l7 5 7-5" /></svg>,
    leads: [
      { name: "Priya Nair", role: "CTO", company: "Loftbase", sync: "8m", comments: 2 },
      { name: "Marco Bianchi", role: "COO", company: "Velora", sync: "18m" },
      { name: "Sara Klein", role: "Director", company: "Quanta", sync: "25m" },
      { name: "Felix Moreau", role: "Head of RevOps", company: "Tactize", sync: "27m" },
    ],
  },
  {
    key: "replied",
    label: "Replied",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7 4 10l3 3M4 10h12a4 4 0 0 1 4 4M17 17l3-3-3-3M20 14H8a4 4 0 0 1-4-4" /></svg>,
    leads: [
      { name: "Tom Becker", role: "CEO", company: "Brightfold", sync: "3m", comments: 1 },
      { name: "Lena Fischer", role: "VP Eng", company: "Cobalt", sync: "9m" },
      { name: "Yuki Sato", role: "Founder", company: "Mesa", sync: "21m" },
      { name: "Aisha Rahman", role: "VP Marketing", company: "Larkfield", sync: "12m" },
    ],
  },
];

/**
 * One contact card in the sales CRM pipeline board, modeled on the detailed
 * Figma card: name + optional comment-count badge, role @ company, and a sync
 * timestamp. The active lead renders an anchored comment popover via children.
 * @param {{ lead: CrmLead; children?: ReactNode }} props Lead persona and an optional anchored popover.
 * @returns {JSX.Element} A pipeline lead card.
 */
function LeadCard({ lead, children }: { lead: CrmLead; children?: ReactNode }) {
  return (
    <article className={`crm-card${lead.active ? " is-active" : ""}`}>
      <div className="crm-card-top">
        <span className="crm-card-name">{lead.name}</span>
        {typeof lead.comments === "number" ? (
          <span className="crm-badge"><IconCommentBadge />{lead.comments}</span>
        ) : null}
      </div>
      <p className="crm-card-role"><b>{lead.role}</b> @{lead.company}</p>
      <span className="crm-card-foot">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19.5 11A7.5 7.5 0 0 0 6 7.5M4.5 5v3h3" /><path d="M4.5 13A7.5 7.5 0 0 0 18 16.5M19.5 19v-3h-3" /></svg>
        {CRM_SYNC_LABEL} {lead.sync} {CRM_SYNC_SUFFIX}
      </span>
      {children}
    </article>
  );
}

/**
 * The anchored comment popover that floats over the active lead card, mirroring
 * the Figma thread preview (avatar, author + time, @-mention body, reply count).
 * @returns {JSX.Element} The anchored comment popover.
 */
function CrmCommentPopover() {
  return (
    <div className="crm-pop">
      <span className="crm-pop-av" aria-hidden="true">M</span>
      <div className="crm-pop-main">
        <div className="crm-pop-head">
          <span className="crm-pop-name">Maya</span>
          <span className="crm-pop-time">2m</span>
        </div>
        <p className="crm-pop-body"><span className="crm-pop-mention">@Fin</span> We need to make a working demo for Rene and his team</p>
        <span className="crm-pop-replies"><IconReply />2 Replies</span>
      </div>
    </div>
  );
}

/**
 * The shared sales-enablement CRM pipeline board surface. Rendered once and
 * reused for the "<feature>/in-production/sales" preset on every feature page,
 * so the Sales tab proof surface is identical everywhere. Visuals are simulated,
 * not a live SDK instance.
 * @returns {JSX.Element} The CRM pipeline board.
 */
export function CrmPipelineBoard() {
  return (
    <div className="crm-board">
      <nav className="crm-rail" aria-hidden="true">
        <span className="crm-rail-group">
          {CRM_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`crm-rail-btn${index === 0 ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="crm-rail-btn">{CRM_SETTINGS_ICON}</span>
      </nav>

      <div className="crm-main">
        <p className="crm-eyebrow">{CRM_EYEBROW}</p>
        <div className="crm-cols">
          {CRM_COLUMNS.map((col) => (
            <section key={col.key} className="crm-col">
              <div className="crm-col-head"><span className="crm-col-ic">{col.icon}</span>{col.label}</div>
              {col.leads.map((lead) => (
                <LeadCard key={lead.name} lead={lead}>
                  {lead.active ? <CrmCommentPopover /> : null}
                </LeadCard>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
