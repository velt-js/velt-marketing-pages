import type { ReactNode } from "react";

import { AiNativeBoard } from "./ai-board";
import { ComplianceBoard } from "./compliance-board";
import { DigitalSalesRoom } from "./digital-sales-room";
import { FintechBoard } from "./fintech-board";
import { LegalBoard } from "./legal-board";
import { OperationsBoard } from "./ops-board";
import {
  AgentFindingCard,
  Av,
  Composer,
  DEL_STYLE,
  FACES,
  Frame,
  IconArrowRight,
  IconCheck,
  IconReply,
  IconX,
  INS_STYLE,
} from "./hero-surface";

import "./suggestions-showcase.css";
import "./approval-flows-whatitis.css";
import "./suggestions-whatitis.css";

// Simulated-UI demo nodes for the /new-features/suggestions page. Keys match
// components/feature-new/demo-presets/suggestions.keys.ts and are merged into
// the registry by demo-registry.tsx. Visuals are simulated, not live SDK.

// Suggestions-page personas mapped to shared headshots.
const FACE = {
  sarah: FACES.hope,
  maya: FACES.fenne,
  roman: FACES.roman,
  you: FACES.jeff,
} as const;

// "What it is" scene constants: one rate cell, two proposals (agent + human).
const ACTOR_AGENT = "agent";
const ACTOR_HUMAN = "human";
const AGENT_NAME = "Rate Checker";
const TARGET_CELL = "Rate";
const CURRENT_VALUE = "12.0";
const APPLIED_VALUE = "10.5";

type SuggestionActor = typeof ACTOR_AGENT | typeof ACTOR_HUMAN;
type SuggestionStatus = "accepted" | "rejected";

/**
 * One suggestion node for the "What it is" scene: an actor (agent flower or
 * human headshot) proposing a del → ins diff on the shared cell, with the
 * owner's accept/reject decision shown as a colour-coded chip plus a rationale.
 * Sibling nodes are joined by the thin .sgw-stem spine so both proposals read
 * as edits to one primitive.
 * @param {{ name: string; actor: SuggestionActor; initials: string; img?: string; from: ReactNode; to: ReactNode; status: SuggestionStatus; note: string }} props Node content.
 * @returns {JSX.Element} A suggestion proposal node.
 */
function SuggestionNode({
  name,
  actor,
  initials,
  img,
  from,
  to,
  status,
  note,
}: {
  name: string;
  actor: SuggestionActor;
  initials: string;
  img?: string;
  from: ReactNode;
  to: ReactNode;
  status: SuggestionStatus;
  note: string;
}) {
  const isAgent = actor === ACTOR_AGENT;
  return (
    <div className={`sgw-node${status === "rejected" ? " sgw-node--rejected" : ""}`}>
      <div className="sgw-node-head">
        <Av initials={initials} agent={isAgent} img={img} tone="a2" />
        <span className="sgw-node-id">
          <span className="sgw-node-name">{name}</span>
          <span className={`sgw-node-kind${isAgent ? " sgw-node-kind--agent" : ""}`}>{actor}</span>
        </span>
        <span className={`chip chip-${status === "accepted" ? "approved" : "rejected"}`}>{status}</span>
      </div>
      <div className="sgw-node-diff">
        <span className="sgw-node-cell">{TARGET_CELL}</span>
        <del style={DEL_STYLE}>{from}</del>
        <span className="sgw-node-arrow" aria-hidden="true">{"→"}</span>
        <ins style={INS_STYLE}>{to}</ins>
      </div>
      <p className="sgw-node-note">
        {status === "rejected" ? <span className="sgw-node-reason">reason</span> : null}
        {note}
      </p>
    </div>
  );
}

/** @returns {JSX.Element} Crosshair glyph for the suggestion-targets header. */
function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

/** @returns {JSX.Element} Pencil glyph for the diff (suggested edit) header. */
function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20h4L18 10a2 2 0 0 0-3-3L5 17z" />
      <path d="M13.5 6.5l3 3" />
    </svg>
  );
}

/** @returns {JSX.Element} Camera glyph for the intent-capture header. */
function IconCapture() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8 7l1.5-2.5h5L16 7" />
      <circle cx="12" cy="13.5" r="3.2" />
    </svg>
  );
}

/** @returns {JSX.Element} Bolt glyph for the apply-logic header. */
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z" />
    </svg>
  );
}

/** @returns {JSX.Element} Database glyph for the apply-logic backend node. */
function IconDatabase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  );
}

/** @returns {JSX.Element} Layers glyph for the multi-control header. */
function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  );
}

/** @returns {JSX.Element} Shield-alert glyph for the stale/drift header. */
function IconShieldAlert() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 5 6v5c0 4.4 3 8.5 7 10 4-1.5 7-5.6 7-10V6l-7-3z" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

/** @returns {JSX.Element} Broken-link glyph for the stale (target removed) row. */
function IconUnlink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 15l-1.5 1.5a3.5 3.5 0 0 1-5-5L4 10" />
      <path d="M15 9l1.5-1.5a3.5 3.5 0 0 0-5-5L10 4" />
      <path d="M4 4l16 16" />
    </svg>
  );
}

/** @returns {JSX.Element} Shuffle glyph for the drift (value moved) row. */
function IconShuffle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h4v4" />
      <path d="M4 20 20 4" />
      <path d="M16 20h4v-4" />
      <path d="M4 4l5 5" />
      <path d="M15 15l5 5" />
    </svg>
  );
}

/** @returns {JSX.Element} Table glyph with one highlighted cell for the scene head. */
function IconTableCell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M9 10v10" />
      <rect x="3" y="10" width="6" height="5" fill="currentColor" stroke="none" opacity="0.18" />
    </svg>
  );
}

/** @returns {JSX.Element} Funnel glyph for the suggestion-queries header. */
function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 5h18l-7 8v6l-4-2v-4z" />
    </svg>
  );
}

/**
 * TEXT-EDITOR SUGGESTION hero artifact: a live contract document where a
 * reviewer's edit posts as a suggestion anchored to the exact clause it
 * touches. Mirrors the text-editor comment surface used across editor
 * integrations (toolbar + an inline redline + an anchored thread with the
 * Open/resolve chrome), but the thread carries a Suggested edit (del -> ins)
 * plus Accept / Reject consent actions: the suggestion lives as a real comment
 * on the line, not a separate panel.
 * @returns {JSX.Element} The text-editor suggestion frame.
 */
function SuggestionEditorHero() {
  return (
    <Frame
      app="CT"
      crumb={<><b>contract.md</b> <span className="sep">/</span> Clause 4</>}
      users={[
        { initials: "SR", tone: "a3", img: FACE.sarah },
        { initials: "RN", tone: "a1", img: FACE.roman },
      ]}
    >
      <div className="cmh-toolbar">
        <span className="tb" style={{ fontWeight: 800 }}>B</span>
        <span className="tb" style={{ fontStyle: "italic" }}>I</span>
        <span className="tb" style={{ textDecoration: "underline" }}>U</span>
        <span className="vbar" />
        <span className="tb">H1</span>
        <span className="tb">❝</span>
        <span className="vbar" />
        <span className="tb" style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10.5 }}>&lt;/&gt;</span>
      </div>

      <div className="cmh-td" style={{ minHeight: 262 }}>
        <p className="cmh-td-doc" style={{ margin: "22px 0 0", maxWidth: "100%" }}>
          The Provider shall deliver the project within{" "}
          <span className="cmh-mark" style={{ background: "rgba(255, 209, 102, 0.5)", boxShadow: "inset 0 -2px 0 rgba(255, 193, 7, 0.6)" }}>
            <del style={DEL_STYLE}>30 calendar days</del>{" "}
            <ins style={INS_STYLE}>14 business days</ins>
          </span>{" "}
          of the signed order.
        </p>

        <div className="cmh-td-comment" style={{ width: "82%" }}>
          <div className="cmh-td-chead">
            <span className="cmh-td-status">
              <svg className="cmh-td-dot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>
              Open
              <svg className="cmh-td-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </span>
            <span className="cmh-td-flag">
              <svg className="cmh-td-flagico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
              <svg className="cmh-td-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </span>
            <span className="cmh-td-actions">
              <svg className="cmh-td-kebab" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
              <span className="cmh-td-resolve" aria-label="Resolve">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
              </span>
            </span>
          </div>
          <div className="cmh-td-msg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cmh-td-avatar" src={FACE.sarah} alt="Sarah" />
            <span className="cmh-td-name">Sarah</span>
            <span className="cmh-role">· Legal</span>
            <span className="cmh-td-time">just now</span>
          </div>
          <p className="cmh-suggest">
            <span className="lbl">Suggested edit</span>
            <span className="body">
              <del style={DEL_STYLE}>30 calendar days</del>
              {" "}
              <span style={{ color: "var(--vlp-color-text-subtle)" }}>{"→"}</span>
              {" "}
              <ins style={INS_STYLE}>14 business days</ins>
            </span>
          </p>
          <div className="cmh-acts">
            <button type="button" className="cmh-btn approve"><IconCheck />Accept</button>
            <button type="button" className="cmh-btn reject"><IconX />Reject</button>
          </div>
        </div>
      </div>

      <p className="code-microcopy" style={{ margin: "4px 0 0" }}>a suggested edit anchored to the exact clause &middot; accept to apply the redline</p>
    </Frame>
  );
}

export const SUGGESTIONS_DEMOS: Record<string, ReactNode> = {
  "suggestions/hero/editor": <SuggestionEditorHero />,

  "suggestions/hero/custom": (
    <Frame
      app="IN"
      crumb={<><b>INV-2043</b> <span className="sep">/</span> line items</>}
      users={[
        { initials: "MA", tone: "a2", img: FACE.maya },
        { initials: "RN", tone: "a1", img: FACE.roman },
      ]}
    >
      {/* A field-level suggestion card: old value → new value with accept/reject */}
      <div
        style={{
          border: "1px solid var(--vlp-border-default)",
          borderRadius: 10,
          background: "var(--vlp-bg-section-alt)",
          padding: "10px 13px",
          display: "grid",
          gap: 6,
          fontSize: 12.5,
          color: "var(--vlp-color-ink-soft)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--vlp-color-text-subtle)" }}>Field · Qty</span>
          <span className="chip chip-pending" style={{ fontSize: 10 }}>pending</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 14 }}>
          <span style={DEL_STYLE}>12.0</span>
          <span style={{ color: "var(--vlp-color-text-subtle)", fontWeight: 400, fontSize: 12 }}>→</span>
          <ins style={INS_STYLE}>10.5</ins>
        </div>
        <p style={{ margin: 0, fontSize: 11.5, color: "var(--vlp-color-text-muted)" }}>Matches the contracted unit cap - Maya</p>
      </div>

      <div
        style={{
          border: "1px solid var(--vlp-border-default)",
          borderRadius: 10,
          background: "var(--vlp-bg-section-alt)",
          padding: "10px 13px",
          display: "grid",
          gap: 6,
          fontSize: 12.5,
          color: "var(--vlp-color-ink-soft)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--vlp-color-text-subtle)" }}>Field · Status</span>
          <span className="chip chip-pending" style={{ fontSize: 10 }}>pending</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: 14 }}>
          <span style={DEL_STYLE}>Draft</span>
          <span style={{ color: "var(--vlp-color-text-subtle)", fontWeight: 400, fontSize: 12 }}>→</span>
          <ins style={INS_STYLE}>In Review</ins>
        </div>
        <p style={{ margin: 0, fontSize: 11.5, color: "var(--vlp-color-text-muted)" }}>Ready for controller sign-off - Maya</p>
      </div>

      <div className="cmh-acts">
        <button type="button" className="cmh-btn approve"><IconCheck />Accept all</button>
        <button type="button" className="cmh-btn reject"><IconX />Reject</button>
      </div>

      <Composer placeholder="Comment on changes…" you={FACE.you} />
    </Frame>
  ),

  "suggestions/hero/agent": (
    <Frame
      app="PR"
      crumb={<><b>pricing.csv</b> <span className="sep">/</span> Pro · Proposed</>}
      users={[
        { initials: "KM", tone: "a2", img: FACE.maya },
        { initials: "PA", agent: true },
      ]}
    >
      {/* A spreadsheet cell carrying an anchored agent suggestion, approved by a human */}
      <div className="sgn-csv-wrap">
        <div className="sgn-csv" role="table" aria-label="Pricing">
          <div className="sgn-csv-row sgn-csv-row--head" role="row">
            <span role="columnheader">Plan</span>
            <span role="columnheader">Current</span>
            <span role="columnheader">Proposed</span>
          </div>
          <div className="sgn-csv-row" role="row">
            <span role="cell">Starter</span>
            <span role="cell">$29</span>
            <span role="cell">$35</span>
          </div>
          <div className="sgn-csv-row" role="row">
            <span role="cell">Pro</span>
            <span role="cell">$79</span>
            <span className="sgn-csv-cell--target" role="cell">$85</span>
          </div>
        </div>

        <div className="sgn-csv-pop">
          <div className="sgn-csv-pop-head">
            <Av initials="KM" tone="a2" img={FACE.maya} />
            <span className="sgn-csv-pop-by">Approved by Kim</span>
            <span className="sgn-csv-pop-check"><IconCheck /></span>
          </div>
          <div className="sgn-csv-pop-body">
            <div className="sgn-csv-pop-meta">
              <Av initials="PA" agent />
              <span className="sgn-csv-pop-name">Pricing Agent</span>
              <span className="sgn-csv-pop-time">58m</span>
            </div>
            <p className="sgn-csv-pop-text">
              Proposed Pro price was $92, above the approved Q3 band. I suggest $85, the band maximum.
            </p>
            <span className="sgn-csv-pop-reply"><IconReply />Reply</span>
          </div>
        </div>
      </div>
    </Frame>
  ),

  "suggestions/what-it-is/scene": (
    <div className="afw">
      <div className="afw-head">
        <span className="afw-head-title">
          <IconTableCell />
          Pricing table · {TARGET_CELL} cell
        </span>
        <span className="afw-head-meta">one cell · agent + human</span>
      </div>

      <div className="afw-body">
        <div className="sgw-stack">
          <SuggestionNode
            name={AGENT_NAME}
            actor={ACTOR_AGENT}
            initials="RC"
            from={CURRENT_VALUE}
            to={APPLIED_VALUE}
            status="accepted"
            note="Vendor rate is 12% over the contracted cap"
          />
          <span className="sgw-stem" aria-hidden="true" />
          <SuggestionNode
            name="Analyst"
            actor={ACTOR_HUMAN}
            initials="AN"
            img={FACE.maya}
            from={CURRENT_VALUE}
            to="11.4"
            status="rejected"
            note="Use the agent's contracted figure"
          />
        </div>

        <div className="afw-override">
          <p className="afw-override-head">
            <IconBolt />
            applied value · {TARGET_CELL}
          </p>
          <p className="afw-override-body">
            Owner accepted {AGENT_NAME}&rsquo;s edit — <code className="afw-code">{APPLIED_VALUE}</code> written
            by your code, never by Velt.
          </p>
          <p className="afw-override-meta">
            <span className="afw-consent">
              <IconCheck />
              consent visible
            </span>
            <span className="afw-dot">·</span>
            one primitive, both actors
          </p>
        </div>
      </div>
    </div>
  ),

  "suggestions/showcase/targets": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconTarget />
          Suggestion targets
          <span className="cmh-cc-pill">any element</span>
        </div>
        <div className="cmh-cc-body">
          <div className="sgn-targets">
            <div className="sgn-target-row">
              <span className="sgn-target-kind">cell</span>
              <span className="sgn-target-ctrl">Rate · $12.0</span>
              <span className="sgn-target-attr">data-velt-suggestion-target</span>
            </div>
            <div className="sgn-target-row">
              <span className="sgn-target-kind">input</span>
              <span className="sgn-target-ctrl">Qty · 12</span>
              <span className="sgn-target-attr">data-velt-suggestion-target</span>
            </div>
            <div className="sgn-target-row sgn-target-row--live">
              <span className="sgn-target-kind">field</span>
              <span className="sgn-diff">
                <del style={DEL_STYLE}>Draft</del>
                <span className="sgn-arrow"><IconArrowRight /></span>
                <ins style={INS_STYLE}>In Review</ins>
              </span>
              <span className="chip chip-pending">suggesting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "suggestions/showcase/diff": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--wide">
        <div className="cmh-cc-head apf-head--slate">
          <IconEdit />
          Suggested edit
          <span className="cmh-cc-pill">Field · Rate</span>
        </div>
        <div className="cmh-cc-body">
          <div className="cmh-cmt cmh-cmt--plain">
            <Av initials="SR" tone="a3" img={FACE.sarah} />
            <div className="cmh-cmt-main">
              <div className="cmh-cmt-head">
                <span className="cmh-cmt-name">Sarah</span>
                <span className="cmh-cmt-time">2m</span>
              </div>
              <div className="sgn-diff">
                <del style={DEL_STYLE}>$12.0</del>
                <span className="sgn-arrow"><IconArrowRight /></span>
                <ins style={INS_STYLE}>$10.5</ins>
              </div>
              <div className="cmh-acts">
                <button type="button" className="cmh-btn approve"><IconCheck />Accept</button>
                <button type="button" className="cmh-btn reject"><IconX />Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "suggestions/showcase/agents": (
    <div className="pv">
      <div className="cmh-afc-fill">
        <AgentFindingCard
          name="Rate Checker"
          time="now"
          body="Vendor rate on row 14 is 12% above the contracted cap. Proposing a corrected value."
          delText="8.25%"
          insText="7.35%"
          replies={1}
        />
      </div>
    </div>
  ),

  "suggestions/showcase/intent": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--teal">
          <IconCapture />
          Intent capture
          <span className="cmh-cc-pill">snapshot → diff</span>
        </div>
        <div className="cmh-cc-body sgn-intent">
          <div className="sgn-track">
            <span className="sgn-track-node">
              <span className="sgn-track-dot" />
              Edit starts
            </span>
            <span className="sgn-arrow"><IconArrowRight /></span>
            <span className="sgn-track-node">snapshot <b>12.0</b></span>
            <span className="sgn-arrow"><IconArrowRight /></span>
            <span className="sgn-track-node sgn-track-node--out">
              <span className="sgn-del">12.0</span>
              <span className="sgn-arrow"><IconArrowRight /></span>
              <span className="sgn-ins">10.5</span>
            </span>
          </div>
          <div className="sgn-noop">
            <span className="sgn-noop-key">No-op edit</span>
            <span className="sgn-arrow"><IconArrowRight /></span>
            <span className="sgn-noop-val">nothing created</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "suggestions/showcase/apply": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--purple">
          <IconBolt />
          Apply logic
          <span className="cmh-cc-pill">your code</span>
        </div>
        <div className="cmh-cc-body sgn-apply">
          <div className="sgn-apply-flow">
            <span className="sgn-apply-node sgn-apply-node--event">
              <span className="sgn-apply-cap">event</span>
              <span className="sgn-apply-evt">suggestionAccepted</span>
              <span className="sgn-apply-payload">
                <span className="sgn-del">12.0</span>
                <span className="sgn-arrow"><IconArrowRight /></span>
                <span className="sgn-ins">10.5</span>
              </span>
            </span>
            <span className="sgn-arrow"><IconArrowRight /></span>
            <span className="sgn-apply-node">
              <span className="sgn-apply-cap">your handler</span>
              <span className="sgn-apply-code">applyToBackend(newValue)</span>
            </span>
            <span className="sgn-arrow"><IconArrowRight /></span>
            <span className="sgn-apply-node">
              <span className="sgn-apply-cap">your backend</span>
              <span className="sgn-apply-db"><IconDatabase />Your DB</span>
            </span>
          </div>
          <div className="apf-note">
            <span className="chip chip-approved">consent</span>
            <span>Velt never mutates your data: your code writes the change</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "suggestions/showcase/multi-control": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--wide">
        <div className="cmh-cc-head apf-head--ink">
          <IconLayers />
          One target
          <span className="cmh-cc-pill">row-3</span>
        </div>
        <div className="cmh-cc-body">
          <div className="sgn-multi">
            <div className="sgn-multi-bracket">
              <div className="sgn-multi-ctrl">
                <span className="sgn-field">Qty</span>
                <span className="sgn-diff">
                  <span className="sgn-del">12</span>
                  <span className="sgn-arrow"><IconArrowRight /></span>
                  <span className="sgn-ins">10</span>
                </span>
              </div>
              <div className="sgn-multi-ctrl">
                <span className="sgn-field">Price</span>
                <span className="sgn-diff">
                  <span className="sgn-del">$8.25</span>
                  <span className="sgn-arrow"><IconArrowRight /></span>
                  <span className="sgn-ins">$7.35</span>
                </span>
              </div>
            </div>
            <div className="sgn-multi-foot">
              <span className="chip chip-pending">1 suggestion</span>
              <span>qty + price diff as one object</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "suggestions/showcase/stale": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--wide">
        <div className="cmh-cc-head apf-head--plum">
          <IconShieldAlert />
          Safety checks
          <span className="cmh-cc-pill">at accept</span>
        </div>
        <div className="cmh-cc-body sgn-checks">
          <div className="sgn-check-row">
            <span className="sgn-check-ic sgn-check-ic--stale"><IconUnlink /></span>
            <span className="sgn-check-main">
              <span className="sgn-check-title">Target removed</span>
              <span className="sgn-check-sub">does not apply</span>
            </span>
            <span className="chip chip-rejected">stale</span>
          </div>
          <div className="sgn-check-row">
            <span className="sgn-check-ic sgn-check-ic--drift"><IconShuffle /></span>
            <span className="sgn-check-main">
              <span className="sgn-check-title">Live value moved</span>
              <span className="sgn-check-sub">recorded, best-effort</span>
            </span>
            <span className="chip chip-pending">drift</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "suggestions/showcase/queries": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconFilter />
          useSuggestions()
          <span className="cmh-cc-pill">status: pending</span>
        </div>
        <div className="cmh-cc-body sgn-panel">
          <div className="sgn-panel-bar">
            <span className="sgn-panel-title">Review panel</span>
            <span className="sgn-panel-count">3 pending</span>
          </div>
          <div className="sgn-panel-list">
            <div className="sgn-panel-row">
              <Av initials="SR" tone="a3" img={FACE.sarah} />
              <span className="sgn-panel-target">Rate</span>
              <span className="sgn-diff sgn-panel-diff">
                <span className="sgn-del">12.0</span>
                <span className="sgn-arrow"><IconArrowRight /></span>
                <span className="sgn-ins">10.5</span>
              </span>
              <span className="chip chip-pending">pending</span>
            </div>
            <div className="sgn-panel-row">
              <Av initials="RC" agent />
              <span className="sgn-panel-target">Qty</span>
              <span className="sgn-diff sgn-panel-diff">
                <span className="sgn-del">12</span>
                <span className="sgn-arrow"><IconArrowRight /></span>
                <span className="sgn-ins">10</span>
              </span>
              <span className="chip chip-pending">pending</span>
            </div>
            <div className="sgn-panel-row">
              <Av initials="RN" tone="a1" img={FACE.roman} />
              <span className="sgn-panel-target">Tax</span>
              <span className="sgn-diff sgn-panel-diff">
                <span className="sgn-del">8.25%</span>
                <span className="sgn-arrow"><IconArrowRight /></span>
                <span className="sgn-ins">8.875%</span>
              </span>
              <span className="chip chip-approved">accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Look: the accept/reject diff surface that rides on the comment dialog,
  // themed — a red→green suggestion diff with restyled controls, plus the
  // primitives you reuse to build your own badges and review panels.
  "suggestions/make-it-yours/look": (
    <div className="pv">
      <div className="sgn-look">
        <div className="sgn-look-card">
          <div className="cmh-cmt cmh-cmt--plain">
            <Av initials="SR" tone="a3" img={FACE.sarah} />
            <div className="cmh-cmt-main">
              <div className="cmh-cmt-head">
                <span className="cmh-cmt-name">Sarah</span>
                <span className="chip chip-pending">suggestion</span>
              </div>
              <div className="sgn-diff">
                <span className="sgn-del">30 days</span>
                <span className="sgn-arrow"><IconArrowRight /></span>
                <span className="sgn-ins">14 days</span>
              </div>
              <div className="cmh-acts">
                <button type="button" className="cmh-btn approve"><IconCheck />Accept</button>
                <button type="button" className="cmh-btn reject"><IconX />Reject</button>
              </div>
            </div>
          </div>
        </div>
        <div className="sgn-look-controls">
          <div className="sgn-look-row">
            <span className="sgn-look-key">accept / reject</span>
            <span className="sgn-look-swatches">
              <span className="sgn-look-swatch sgn-look-swatch--a" />
              <span className="sgn-look-swatch sgn-look-swatch--b" />
              <span className="sgn-look-note">restyle the surface</span>
            </span>
          </div>
          <div className="sgn-look-row">
            <span className="sgn-look-key">your UI</span>
            <span className="sgn-look-tags">
              <span className="chip chip-pending">pending badge</span>
              <span className="chip chip-agent">review panel</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Behavior: the apply path is your code — a bound target, your accept handler,
  // a logged reject reason, and the event stream Velt fires on every decision.
  "suggestions/make-it-yours/behavior": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--ink">
          <IconBolt />
          Apply logic
          <span className="cmh-cc-pill">your code</span>
        </div>
        <div className="cmh-cc-body apf-gov-body">
          <div className="apf-gov-row">
            <span className="apf-gov-key">target</span>
            <span className="sgn-target-attr">data-velt-suggestion-target</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">on accept</span>
            <code className="sgn-cfg-code sgn-cfg-code--accent">applyToBackend(value)</code>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">on reject</span>
            <span className="chip chip-rejected">reason logged</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">events</span>
            <span className="sgn-rel-sig"><IconCheck />suggestionUpdated</span>
          </div>
          <div className="apf-note">
            <span className="chip chip-approved">consent</span>
            <span>Velt never writes: your handler commits</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "suggestions/in-production/sales": <DigitalSalesRoom />,

  "suggestions/in-production/fintech": <FintechBoard />,

  "suggestions/in-production/ops": <OperationsBoard />,

  "suggestions/in-production/compliance": <ComplianceBoard />,

  "suggestions/in-production/legal": <LegalBoard />,

  "suggestions/in-production/ai": <AiNativeBoard />,

  "suggestions/related/comments": (
    <div className="pv">
      <div className="sgn-rel">
        <div className="sgn-rel-cmt">
          <Av initials="SR" tone="a3" img={FACE.sarah} />
          <div className="sgn-rel-main">
            <div className="sgn-rel-head">
              <span className="sgn-rel-name">Sarah</span>
              <span className="chip chip-pending">suggestion</span>
            </div>
            <p className="sgn-rel-body">A comment of type <strong>suggestion</strong>, threaded like any other.</p>
          </div>
        </div>
      </div>
    </div>
  ),

  "suggestions/related/review-agents": (
    <div className="pv">
      <div className="sgn-rel">
        <div className="sgn-rel-cmt">
          <Av initials="RA" agent />
          <div className="sgn-rel-main">
            <div className="sgn-rel-head">
              <span className="sgn-rel-name">Rate Checker</span>
              <span className="chip chip-agent">finding</span>
            </div>
            <p className="sgn-rel-body">A proposed fix a human accepts.</p>
            <span className="sgn-diff">
              <span className="sgn-del">8.25%</span>
              <span className="sgn-arrow"><IconArrowRight /></span>
              <span className="sgn-ins">7.35%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),

  "suggestions/related/audit-trail": (
    <div className="pv">
      <div className="sgn-rel">
        <div className="apf-gov-row">
          <span className="apf-gov-key">accept · reject</span>
          <span className="sgn-rel-sig"><IconCheck />recorded</span>
        </div>
        <div className="apf-gov-row">
          <span className="apf-gov-key">entry</span>
          <span className="apf-gov-val">on the record</span>
        </div>
      </div>
    </div>
  ),
};
