import type { ReactNode } from "react";

import { AvatarStack, Chip, ProvRow, ProvArrow, Precedent } from "../demos";
import {
  AgentFindingCard,
  Av,
  Composer,
  DEL_STYLE,
  FACES,
  Frame,
  IconArrowRight,
  IconCheck,
  IconX,
  INS_STYLE,
} from "./hero-surface";

import "./suggestions-showcase.css";

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

type AvatarKind = "human" | "agent" | "away";

/**
 * A framed "field" surface used to host suggestion diffs and review actions.
 * @param {{ children: ReactNode }} props Surface content.
 * @returns {JSX.Element} Field surface.
 */
function FieldSurface({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--line, #e7e2d9)",
        borderRadius: 12,
        background: "var(--bg, #fff)",
        padding: 14,
        display: "grid",
        gap: 8,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Old-value to proposed-value diff, struck-through original then accent target.
 * @param {{ from: ReactNode; to: ReactNode }} props Before and after values.
 * @returns {JSX.Element} Inline diff.
 */
function Diff({ from, to }: { from: ReactNode; to: ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13 }}>
      <span style={{ textDecoration: "line-through", opacity: 0.5 }}>{from}</span>
      <ProvArrow />
      <span style={{ fontWeight: 700, color: "var(--brand, #ff4f00)" }}>{to}</span>
    </span>
  );
}

/**
 * Pending suggestion card: author, target, diff, optional rationale, and either
 * accept/reject actions or a resolved outcome chip.
 * @param {{ author: { initials: string; kind?: AvatarKind; name?: string }; target: string; from: ReactNode; to: ReactNode; rationale?: string; decided?: "accepted" | "rejected"; rejectReason?: string }} props Suggestion data.
 * @returns {JSX.Element} Suggestion card.
 */
function SuggestionCard({
  author,
  target,
  from,
  to,
  rationale,
  decided,
  rejectReason,
}: {
  author: { initials: string; kind?: AvatarKind; name?: string };
  target: string;
  from: ReactNode;
  to: ReactNode;
  rationale?: string;
  decided?: "accepted" | "rejected";
  rejectReason?: string;
}) {
  return (
    <FieldSurface>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <AvatarStack users={[author]} />
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink, #0b353b)" }}>
          {author.name}
        </span>
        <Chip kind="pending">suggestion</Chip>
      </div>
      <p style={{ margin: 0, fontSize: 12, opacity: 0.65 }}>{target}</p>
      <Diff from={from} to={to} />
      {rationale ? <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>{rationale}</p> : null}
      {decided ? (
        <Chip kind={decided === "accepted" ? "approved" : "rejected"}>{decided}</Chip>
      ) : (
        <div style={{ display: "flex", gap: 6 }}>
          <Chip kind="approved">Accept</Chip>
          <Chip kind="rejected">Reject</Chip>
        </div>
      )}
      {rejectReason ? (
        <p style={{ margin: 0, fontSize: 11.5, opacity: 0.6 }}>reason: {rejectReason}</p>
      ) : null}
    </FieldSurface>
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

/** @returns {JSX.Element} Funnel glyph for the suggestion-queries header. */
function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 5h18l-7 8v6l-4-2v-4z" />
    </svg>
  );
}

export const SUGGESTIONS_DEMOS: Record<string, ReactNode> = {
  "suggestions/hero/editor": (
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

      <p className="cmh-doc">
        The Provider shall deliver the project within{" "}
        <span className="cmh-mark">
          <del style={DEL_STYLE}>30 calendar days</del>{" "}
          <ins style={INS_STYLE}>14 business days</ins>
        </span>{" "}
        of the signed order.
      </p>

      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="SR" tone="a3" img={FACE.sarah} />
          Sarah
          <span className="cmh-role">· Legal</span>
          <span className="cmh-when">just now</span>
        </div>
        <p className="cmh-suggest">
          <span className="lbl">Suggested edit</span>
          <span className="body">
            <del style={DEL_STYLE}>30 calendar days</del>
            {" "}<span style={{ color: "var(--vlp-color-text-subtle)" }}>→</span>{" "}
            <ins style={INS_STYLE}>14 business days</ins>
          </span>
        </p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Accept</button>
          <button type="button" className="cmh-btn reject"><IconX />Reject</button>
        </div>
      </div>

      <Composer placeholder="Reply to Sarah…" you={FACE.you} />
    </Frame>
  ),

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
        <p style={{ margin: 0, fontSize: 11.5, color: "var(--vlp-color-text-muted)" }}>Matches the contracted unit cap — Maya</p>
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
        <p style={{ margin: 0, fontSize: 11.5, color: "var(--vlp-color-text-muted)" }}>Ready for controller sign-off — Maya</p>
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
      app="RC"
      crumb={<><b>rates.csv</b> <span className="sep">/</span> row 14</>}
      users={[
        { initials: "RN", tone: "a1", img: FACE.roman },
        { initials: "RA", agent: true },
      ]}
    >
      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="RA" agent />
          Rate Checker Agent
          <span className="cmh-when">now</span>
        </div>
        <p className="fb">
          Vendor rate on row 14 is 12% above the contracted cap. Proposing a corrected value.
        </p>
        <p className="cmh-suggest">
          <span className="body">
            <del style={DEL_STYLE}>8.25%</del>
            {" "}<span style={{ color: "var(--vlp-color-text-subtle)" }}>→</span>{" "}
            <ins style={INS_STYLE}>7.35%</ins>
          </span>
        </p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Accept</button>
          <button type="button" className="cmh-btn reject"><IconX />Reject</button>
        </div>
      </div>

      <Composer placeholder="Reply or override…" you={FACE.you} />
    </Frame>
  ),

  "suggestions/what-it-is/scene": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <p className="code-microcopy">Pricing table · Rate cell mid-review</p>
      <SuggestionCard
        author={{ initials: "RC", kind: "agent", name: "Rate Checker" }}
        target="Rate"
        from="12.0"
        to="10.5"
        rationale="Vendor rate is 12% over the contracted cap"
        decided="accepted"
      />
      <SuggestionCard
        author={{ initials: "AN", kind: "human", name: "Analyst" }}
        target="Rate"
        from="12.0"
        to="11.4"
        decided="rejected"
        rejectReason="Use the agent's contracted figure"
      />
      <Precedent
        heading="applied value · Rate"
        body="10.5 · accepted from Rate Checker · your code wrote the change"
        meta="one primitive, both actors, consent visible"
      />
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
            <span>Velt never mutates your data — your code writes the change</span>
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

  "suggestions/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>comment dialog wireframes + primitives</ProvRow>
      <ProvRow>restyle the accept / reject surface</ProvRow>
      <ProvRow>your own badges · counts · review panels</ProvRow>
    </div>
  ),

  "suggestions/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>custom summary · metadata per suggestion</ProvRow>
      <ProvRow>gate commit behind your validation</ProvRow>
      <ProvRow>custom apply logic · reject reasons</ProvRow>
    </div>
  ),

  "suggestions/in-production/sales": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <SuggestionCard
        author={{ initials: "BR", kind: "human", name: "Brand" }}
        target="Subject line"
        from="Q3 savings inside"
        to="Lock in Q3 savings"
        rationale="On-brand phrasing"
      />
      <p className="code-microcopy">the redline happens in the asset, not a forwarded Word doc</p>
    </div>
  ),

  "suggestions/in-production/fintech": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <SuggestionCard
        author={{ initials: "AN", kind: "human", name: "Analyst" }}
        target="Q3 cell"
        from="4.20"
        to="4.05"
      />
      <p className="code-microcopy">stays pending until the controller accepts</p>
    </div>
  ),

  "suggestions/in-production/ops": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <SuggestionCard
        author={{ initials: "CP", kind: "human", name: "Counterparty" }}
        target="Order line · Qty"
        from="500"
        to="450"
        decided="rejected"
        rejectReason="Confirm against the signed PO"
      />
      <p className="code-microcopy">cross-org edits become proposals, not surprises</p>
    </div>
  ),

  "suggestions/in-production/ai": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <SuggestionCard
        author={{ initials: "FX", kind: "agent", name: "Fix Agent" }}
        target="Tax rate"
        from="8.25%"
        to="8.875%"
        rationale="Region updated; agent proposes and waits"
      />
      <p className="code-microcopy">accept applies through your code · reject logs the reason</p>
    </div>
  ),

  "suggestions/related/comments": (
    <div className="pv">
      <ProvRow>
        suggestion <ProvArrow /> a comment of type suggestion
      </ProvRow>
    </div>
  ),

  "suggestions/related/review-agents": (
    <div className="pv">
      <ProvRow>
        finding <ProvArrow /> proposed fix a human accepts
      </ProvRow>
    </div>
  ),

  "suggestions/related/audit-trail": (
    <div className="pv">
      <ProvRow>
        accept / reject <ProvArrow /> on the record
      </ProvRow>
    </div>
  ),
};
