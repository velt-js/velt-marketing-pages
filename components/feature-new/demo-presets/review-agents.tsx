import type { ReactNode } from "react";

import { Precedent, AvatarStack, NotifItem, Chip } from "../demos";
import { AiNativeBoard } from "./ai-board";
import { CrmPipelineBoard } from "./crm-board";
import { FintechBoard } from "./fintech-board";
import { OperationsBoard } from "./ops-board";
import {
  AgentFindingCard,
  Av,
  DEL_STYLE,
  FACES,
  Frame,
  IconAgentMark,
  IconCheck,
  INS_STYLE,
  IconReply,
  IconX,
} from "./hero-surface";

import "./review-agents-showcase.css";

// Simulated-UI demo nodes for the /new-features/review-agents page. Keys match
// components/feature-new/demo-presets/review-agents.keys.ts; resolved by
// demo-registry.tsx. Visuals are simulated, not live SDK instances.

// Review-agents personas mapped to shared headshots.
const FACE = {
  sarah: FACES.hope,
  alex: FACES.ethan,
} as const;

const INK = "var(--ink, #0b353b)";
const LINE = "var(--line, #e7e2d9)";
const BG = "var(--bg, #fff)";

/**
 * Minimal agent finding card matching the .cmh-finding / .finding gold standard
 * from comments.tsx: blue agent Av, one-line body, optional inline DEL -> INS
 * suggested fix, then Approve (accent) + ghost Reject actions. When `approved`
 * is true, renders a chip-approved badge + mono audit line instead.
 * @param {{ agentName: string; agentInitials?: string; body: ReactNode; delText?: string; insText?: string; approved?: boolean }} props Finding content.
 * @returns {JSX.Element} Finding card.
 */
function HeroFinding({
  agentName,
  agentInitials = "RA",
  body,
  delText,
  insText,
  approved,
}: {
  agentName: string;
  agentInitials?: string;
  body: ReactNode;
  delText?: string;
  insText?: string;
  approved?: boolean;
}) {
  return (
    <div className="finding cmh-finding">
      <div className="fh">
        <Av initials={agentInitials} agent />
        {agentName}
        <span className="cmh-when">just now</span>
      </div>
      <p className="fb">{body}</p>
      {delText && insText ? (
        <p className="cmh-suggest">
          <span className="lbl">Suggested fix</span>
          <span className="body">
            <del style={DEL_STYLE}>{delText}</del>
            {" "}
            <span style={{ color: "var(--vlp-color-text-subtle)" }}>{"→"}</span>
            {" "}
            <ins style={INS_STYLE}>{insText}</ins>
          </span>
        </p>
      ) : null}
      {approved ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="chip chip-approved" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <IconCheck />
            Approved
          </span>
          <span
            style={{
              fontFamily: "var(--vlp-font-mono)",
              fontSize: 10,
              color: "var(--vlp-color-text-subtle)",
              letterSpacing: "0.04em",
            }}
          >
            applied via webhook
          </span>
        </div>
      ) : (
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Approve</button>
          <button type="button" className="cmh-btn reject"><IconX />Reject</button>
        </div>
      )}
    </div>
  );
}

/**
 * A labelled key-value row for the DEFINE config card.
 * @param {{ label: string; value: ReactNode }} props Row label and value.
 * @returns {JSX.Element} Config row.
 */
function ConfigRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        padding: "8px 0",
        borderBottom: "1px solid var(--vlp-border-subtle)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--vlp-font-mono)",
          fontSize: 10.5,
          color: "var(--vlp-color-text-muted)",
          letterSpacing: "0.04em",
          flexShrink: 0,
          paddingTop: 1,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 12.5, color: "var(--vlp-color-ink)", textAlign: "right" }}>{value}</span>
    </div>
  );
}

/**
 * A skeleton scanning line for the RUN tab skeleton state.
 * @param {{ width: string; dim?: boolean }} props CSS width and optional dim flag.
 * @returns {JSX.Element} Skeleton div.
 */
function SkLine({ width, dim }: { width: string; dim?: boolean }) {
  return <div className={dim ? "sk d" : "sk"} style={{ width }} />;
}

/**
 * Agent finding card: AI-badged avatar, the finding body, optional confidence,
 * a knowledge citation, a suggested fix, and Approve/Reject consent buttons.
 * Renders a resolved state instead of the buttons when `resolved` is set.
 * @param {{ agent: string; initials?: string; confidence?: string; body: ReactNode; citation?: string; fix?: string; resolved?: boolean }} props Finding content.
 * @returns {JSX.Element} Finding card.
 */
function FindingCard({
  agent,
  initials = "BA",
  confidence,
  body,
  citation,
  fix,
  resolved,
}: {
  agent: string;
  initials?: string;
  confidence?: string;
  body: ReactNode;
  citation?: string;
  fix?: string;
  resolved?: boolean;
}) {
  return (
    <div
      style={{
        border: `1px solid ${LINE}`,
        borderRadius: 12,
        background: BG,
        padding: 14,
        display: "grid",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <AvatarStack users={[{ initials, kind: "agent", name: agent }]} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: INK }}>{agent}</p>
          {confidence ? (
            <p style={{ margin: "2px 0 0", fontSize: 11.5, opacity: 0.6 }}>Confidence {confidence}</p>
          ) : null}
        </div>
        {resolved ? <Chip kind="approved">resolved</Chip> : <Chip kind="agent">AI</Chip>}
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.45, color: INK }}>{body}</p>
      {citation ? <p style={{ margin: 0, fontSize: 11.5, opacity: 0.6 }}>{citation}</p> : null}
      {fix ? <p className="code-microcopy">Suggested fix: {fix}</p> : null}
      {resolved ? null : (
        <div style={{ display: "flex", gap: 6 }}>
          <span className="chip chip-approved">Approve</span>
          <span className="chip chip-rejected">Reject</span>
        </div>
      )}
    </div>
  );
}

/** @returns {JSX.Element} Stacked-layers glyph for the built-in agents header. */
function IconStack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3z" />
      <path d="M3 12l9 4.5L21 12" />
      <path d="M3 16.5 12 21l9-4.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Sliders glyph for the enforcement-modes header. */
function IconSliders() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="14" cy="18" r="2" />
    </svg>
  );
}

/** @returns {JSX.Element} Open-book glyph for the knowledge / citation marks. */
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6c-2-1.4-4.5-1.5-7-1v12c2.5-.5 5-.4 7 1 2-1.4 4.5-1.5 7-1V5c-2.5-.5-5-.4-7 1z" />
      <path d="M12 6v12" />
    </svg>
  );
}

/** @returns {JSX.Element} Refresh-loop glyph for reruns + the verify note. */
function IconLoop() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 11a8 8 0 0 1 14-5l2 2M20 13a8 8 0 0 1-14 5l-2-2" />
      <path d="M18 3v5h-5M6 21v-5h5" />
    </svg>
  );
}

/** @returns {JSX.Element} Sitemap glyph for the approval-pipeline header. */
function IconSitemap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="3" width="6" height="5" rx="1.5" />
      <rect x="3" y="16" width="6" height="5" rx="1.5" />
      <rect x="15" y="16" width="6" height="5" rx="1.5" />
      <path d="M12 8v4M6 16v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

/** @returns {JSX.Element} List-with-checks glyph for the checklist-import header. */
function IconChecklist() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6.5 5.5 8 8 5M4 12.5 5.5 14 8 11M4 18.5 5.5 20 8 17" />
      <path d="M12 6h8M12 12h8M12 18h8" />
    </svg>
  );
}

/** @returns {JSX.Element} Document glyph for source files (PDF / CSV chips). */
function IconFile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

/** @returns {JSX.Element} Bell glyph for the newly-surfaced rerun finding. */
function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

/** @returns {JSX.Element} Lock glyph for the blocking enforcement mode. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Alert-triangle glyph for the advisory enforcement mode. */
function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4 2.5 20h19L12 4z" />
      <path d="M12 10v4M12 17.5v.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Palette glyph for the themed / white-label look card. */
function IconPalette() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 2-2 2 2 0 0 1 2-2h1.6A3.4 3.4 0 0 0 21 11.6C21 6.85 16.97 3 12 3z" />
      <circle cx="7.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** @returns {JSX.Element} Down-arrow glyph for vertical flow connectors. */
function IconArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

/**
 * One built-in agent row with a name and an on/off toggle, used in the
 * built-ins showcase grid.
 * @param {{ name: string; off?: boolean; full?: boolean }} props Agent name, off state, and full-width flag.
 * @returns {JSX.Element} Toggle row.
 */
function ToggleRow({ name, off, full }: { name: string; off?: boolean; full?: boolean }) {
  return (
    <div className={`rav-toggle${off ? " rav-toggle--off" : ""}${full ? " rav-toggle--full" : ""}`}>
      <span className="rav-toggle-name">
        <span className="rav-toggle-dot" />
        {name}
      </span>
      <span className={`rav-switch${off ? "" : " rav-switch--on"}`} />
    </div>
  );
}

export const REVIEW_AGENTS_DEMOS: Record<string, ReactNode> = {
  "review-agents/hero/define": (
    <Frame
      app="BA"
      crumb={<><b>Brand Agent</b> <span className="sep">/</span> configure</>}
      users={[{ initials: "BA", agent: true }, { initials: "AX", tone: "a1", img: FACE.alex }]}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingBottom: 12,
          borderBottom: "1px solid var(--vlp-border-subtle)",
        }}
      >
        <Av initials="BA" agent />
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "var(--vlp-color-ink)" }}>Brand Agent</p>
          <p style={{ margin: 0, fontSize: 11, color: "var(--vlp-color-text-muted)" }}>advisory · auto-runs on publish</p>
        </div>
        <span className="chip chip-agent" style={{ marginLeft: "auto" }}>advisory</span>
      </div>
      <ConfigRow label="CHECKS" value="headline case · pricing citations" />
      <ConfigRow label="TRIGGER" value="on publish + manual" />
      <ConfigRow
        label="INSTRUCTION"
        value={
          <span style={{ fontStyle: "italic", color: "var(--vlp-color-ink-soft)", fontSize: 12 }}>
            Flag any headline not in sentence case, and any pricing claim without a cited source.
          </span>
        }
      />
      <ConfigRow label="KNOWLEDGE" value="brand-guidelines.pdf · §3.1" />
    </Frame>
  ),

  "review-agents/hero/run": (
    <Frame
      app="EM"
      crumb={<><b>marketing-email.md</b> <span className="sep">/</span> review run</>}
      users={[{ initials: "BA", agent: true }]}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "8px 10px",
          borderRadius: 8,
          background: "var(--vlp-color-accent-soft)",
          border: "1px solid var(--vlp-color-accent-wash)",
          marginBottom: 4,
        }}
      >
        <Av initials="BA" agent />
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--vlp-color-accent-ink)", flex: 1 }}>
          Brand Agent · scanning…
        </span>
        <span className="cmh-live">
          <i />
          live
        </span>
      </div>
      <div style={{ display: "grid", gap: 8, padding: "4px 0" }}>
        <SkLine width="88%" />
        <SkLine width="72%" />
        <SkLine width="94%" dim />
        <SkLine width="58%" dim />
        <SkLine width="80%" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
        <span
          style={{
            fontFamily: "var(--vlp-font-mono)",
            fontSize: 10.5,
            color: "var(--vlp-color-text-subtle)",
          }}
        >
          checking headline case · §3.1
        </span>
        <span className="chip chip-pending" style={{ marginLeft: "auto" }}>running</span>
      </div>
    </Frame>
  ),

  "review-agents/hero/findings": (
    <Frame
      app="EM"
      crumb={<><b>marketing-email.md</b> <span className="sep">/</span> findings</>}
      users={[{ initials: "BA", agent: true }, { initials: "SR", tone: "a3", img: FACE.sarah }]}
    >
      <HeroFinding
        agentName="Brand Agent"
        agentInitials="BA"
        body="Headline uses title case. Brand guidelines §3.1 require sentence case."
        delText="Launch Your Review Agents"
        insText="Launch your review agents"
      />
      <HeroFinding
        agentName="Brand Agent"
        agentInitials="BA"
        body="Pricing claim on line 4 has no cited source. Add a reference or remove the figure."
        delText="$49/seat"
        insText="$49/seat [1]"
      />
    </Frame>
  ),

  "review-agents/hero/accept": (
    <Frame
      app="EM"
      crumb={<><b>marketing-email.md</b> <span className="sep">/</span> review</>}
      users={[{ initials: "SR", tone: "a3", img: FACE.sarah }, { initials: "BA", agent: true }]}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 2,
        }}
      >
        <Av initials="SR" tone="a3" img={FACE.sarah} />
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--vlp-color-ink)" }}>Sarah</span>
        <span className="cmh-when" style={{ marginLeft: "auto" }}>just now</span>
      </div>
      <HeroFinding
        agentName="Brand Agent"
        agentInitials="BA"
        body="Headline uses title case. Brand guidelines §3.1 require sentence case."
        delText="Launch Your Review Agents"
        insText="Launch your review agents"
        approved
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 10px",
          borderRadius: 8,
          background: "var(--vlp-bg-section-alt)",
          border: "1px solid var(--vlp-border-subtle)",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--vlp-color-connector-green)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--vlp-font-mono)",
            fontSize: 10.5,
            color: "var(--vlp-color-text-subtle)",
          }}
        >
          review.approved fired · content updated
        </span>
      </div>
    </Frame>
  ),

  "review-agents/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <p className="code-microcopy">Marketing email mid-review · one thread, both actors</p>
      <FindingCard
        agent="Brand Agent"
        initials="BA"
        confidence="91%"
        body={<>Headline uses title case. Brand guidelines (section 3.1) require sentence case.</>}
        citation="cites brand-guidelines · §3.1"
        fix="sentence case headline"
      />
      <NotifItem
        avatar={{ initials: "SA", kind: "human" }}
        title={<><strong>Sarah</strong>: &ldquo;Good catch, also watch the subject line.&rdquo;</>}
      />
      <Precedent
        heading="resolved"
        body="Creator accepted the fix · content updated · agent reran and verified"
        meta="consent visible on every finding"
      />
    </div>
  ),

  "review-agents/showcase/built-ins": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconStack />
          Built-in agents
          <span className="cmh-cc-pill">7 included</span>
        </div>
        <div className="cmh-cc-body">
          <div className="rav-builtins">
            <ToggleRow name="Spell Check" off />
            <ToggleRow name="Grammar Check" />
            <ToggleRow name="Broken Links" />
            <ToggleRow name="PII Detection" />
            <ToggleRow name="Profanity Filter" />
            <ToggleRow name="Sensitive Data" />
            <ToggleRow name="Consistency Check" full />
          </div>
        </div>
      </div>
    </div>
  ),

  "review-agents/showcase/custom": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--purple">
          <span className="cmh-cc-mark"><IconAgentMark /></span>
          Setup assistant
          <span className="cmh-cc-pill">no code</span>
        </div>
        <div className="cmh-cc-body">
          <div className="rav-custom">
            <div>
              <span className="rav-step-label">You type</span>
              <p className="rav-prompt"><em>&ldquo;flag any competitor mention&rdquo;</em></p>
            </div>
            <div className="rav-refine">
              <span className="cmh-cc-mark"><IconAgentMark /></span>
              <span className="rav-refine-text">Sharpened to match named competitors and product aliases, case-insensitive.</span>
            </div>
            <div className="rav-samples">
              <span className="rav-step-label">Proven on samples</span>
              <span className="rav-sample"><span className="rav-tick"><IconCheck /></span>&ldquo;cheaper than Acme&rdquo; — caught</span>
              <span className="rav-sample"><span className="rav-tick"><IconCheck /></span>&ldquo;our own roadmap&rdquo; — skipped</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "review-agents/showcase/findings": (
    <div className="pv">
      <div className="cmh-afc-fill">
        <AgentFindingCard
          name="Brand Agent"
          time="now"
          body="Pricing claim on line 4 has no cited source — anchored here, threaded, AI-badged."
          replies={2}
        />
      </div>
    </div>
  ),

  "review-agents/showcase/modes": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--slate">
          <IconSliders />
          Enforcement
          <span className="cmh-cc-pill">per agent</span>
        </div>
        <div className="cmh-cc-body">
          <div className="rav-modes">
            <div className="rav-mode">
              <span className="rav-mode-ic rav-mode-ic--block"><IconLock /></span>
              <span className="rav-mode-main">
                <span className="rav-mode-name">PII Detection</span>
                <span className="rav-mode-sub">Gates the content until every finding is resolved</span>
              </span>
              <span className="chip chip-rejected">blocking</span>
            </div>
            <div className="rav-mode">
              <span className="rav-mode-ic rav-mode-ic--advisory"><IconAlert /></span>
              <span className="rav-mode-main">
                <span className="rav-mode-name">Brand voice</span>
                <span className="rav-mode-sub">Warns and records the override, never blocks</span>
              </span>
              <span className="chip chip-pending">advisory</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "review-agents/showcase/knowledge": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--teal">
          <IconBook />
          Memory
          <span className="cmh-cc-pill">cited</span>
        </div>
        <div className="cmh-cc-body">
          <div className="rav-know">
            <div className="rav-source">
              <span className="rav-source-ic"><IconFile /></span>
              <span className="rav-source-main">
                <span className="rav-source-name">brand-guidelines.pdf</span>
                <span className="rav-source-meta">in Memory · §3.1</span>
              </span>
              <span className="chip chip-agent">knowledge</span>
            </div>
            <div className="rav-down"><IconArrowDown /></div>
            <div className="rav-finding">
              <div className="cmh-cmt cmh-cmt--plain">
                <Av initials="BA" agent />
                <div className="cmh-cmt-main">
                  <div className="cmh-cmt-head">
                    <span className="cmh-cmt-name">Brand Agent</span>
                    <span className="cmh-cmt-time">now</span>
                  </div>
                  <p className="cmh-cmt-body">Headline uses title case. Brand guidelines require sentence case.</p>
                  <span className="rav-cite"><IconBook />cites §3.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "review-agents/showcase/fixes": (
    <div className="pv">
      <div className="cmh-afc-fill">
        <AgentFindingCard
          name="Brand Agent"
          time="now"
          body="Headline should be sentence case per §3.1. Proposed redline below."
          delText="Title Case"
          insText="sentence case"
          replies={1}
        />
      </div>
      <div className="rav-verify"><IconLoop />One tap accepts · content updates · agent reran to verify</div>
    </div>
  ),

  "review-agents/showcase/reruns": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--ink">
          <IconLoop />
          Resubmit
          <span className="cmh-cc-pill">v2</span>
        </div>
        <div className="cmh-cc-body">
          <div className="rav-states">
            <div className="rav-state">
              <span className="rav-state-ic rav-state-ic--fixed"><IconCheck /></span>
              <span className="rav-state-main">Fixed findings <strong>resolve</strong></span>
              <span className="chip chip-approved">resolved</span>
            </div>
            <div className="rav-state">
              <span className="rav-state-ic rav-state-ic--open"><IconReply /></span>
              <span className="rav-state-main">Open findings <strong>persist</strong> with threads</span>
              <span className="chip chip-pending">kept</span>
            </div>
            <div className="rav-state">
              <span className="rav-state-ic rav-state-ic--new"><IconBell /></span>
              <span className="rav-state-main">New issues <strong>notify</strong></span>
              <span className="chip chip-agent">new</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "review-agents/showcase/workflows": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconSitemap />
          Approval pipeline
          <span className="cmh-cc-pill">agent step</span>
        </div>
        <div className="cmh-cc-body">
          <div className="rav-pipe">
            <span className="rav-pipe-node">
              <Av initials="BA" agent />
              <span className="rav-pipe-name">
                <b>Brand Agent</b>
                <span>first-pass review</span>
              </span>
            </span>
            <div className="apf-route-fan" aria-hidden="true">
              <span className="cmh-flow-stem" />
              <span className="cmh-flow-bar" />
              <span className="cmh-flow-arm cmh-flow-arm--left" />
              <span className="cmh-flow-arm cmh-flow-arm--right" />
            </div>
            <div className="apf-route-row">
              <span className="apf-route-branch">
                <span className="apf-route-edge rav-edge--pass">pass</span>
                <span className="apf-route-dest">
                  <span className="rav-dest-ic"><IconCheck /></span>
                  Advances the deck
                </span>
              </span>
              <span className="apf-route-branch">
                <span className="apf-route-edge rav-edge--fail">fail</span>
                <span className="apf-route-dest apf-route-dest--hot">
                  <Av initials="SR" img={FACE.sarah} />
                  Routes to specialist
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "review-agents/showcase/checklist": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--plum">
          <IconChecklist />
          Checklist import
          <span className="cmh-cc-pill">300 items</span>
        </div>
        <div className="cmh-cc-body">
          <div className="rav-checklist">
            <div className="rav-source">
              <span className="rav-source-ic"><IconFile /></span>
              <span className="rav-source-main">
                <span className="rav-source-name">qa-300.csv</span>
                <span className="rav-source-meta">normalized in Memory</span>
              </span>
              <span className="chip chip-agent">converting</span>
            </div>
            <div className="rav-down"><IconArrowDown /></div>
            <div className="rav-agent-chips">
              <span className="int-chip"><i />Spacing</span>
              <span className="int-chip"><i />Alt text</span>
              <span className="int-chip"><i />Link rules</span>
              <span className="int-chip"><i />Tone</span>
              <span className="int-chip"><i />Legal terms</span>
              <span className="int-chip"><i />+ 8 more</span>
            </div>
            <div className="apf-note">
              <span className="chip chip-approved">deduplicated</span>
              <span>Findings cite the item enforced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "review-agents/showcase/confidence": (
    <div className="pv">
      <div className="rav-conf">
        <div className="rav-conf-head">
          <Av initials="BA" agent />
          <span className="rav-conf-name">Brand Agent</span>
          <span className="rav-conf-pill">91%</span>
        </div>
        <p className="rav-conf-body">Headline uses title case. Brand guidelines require sentence case.</p>
        <div className="rav-conf-meter">
          <div className="rav-conf-track"><span className="rav-conf-fill" style={{ width: "91%" }} /></div>
          <div className="rav-conf-scale">
            <span>confidence</span>
            <span>91%</span>
          </div>
        </div>
        <div className="rav-checks">
          <span className="rav-check"><span className="rav-check-ic rav-check-ic--yes"><IconCheck /></span>Checked: body text · headings</span>
          <span className="rav-check"><span className="rav-check-ic rav-check-ic--no"><IconX /></span>Not checked: images · embedded charts</span>
        </div>
        <span className="rav-source-meta">from instruction · brand-guidelines §3.1</span>
      </div>
    </div>
  ),

  // Look: the actual finding component, themed — a white-label AI badge that
  // carries the agent's own name, a configurable confidence display, and theme
  // controls underneath.
  "review-agents/make-it-yours/look": (
    <div className="pv">
      <div className="rav-look">
        <div className="cmh-afc-fill">
          <AgentFindingCard
            name="Brand Agent"
            time="now"
            body="Headline uses title case. Brand guidelines §3.1 require sentence case."
            delText="Title Case"
            insText="sentence case"
          />
        </div>
        <div className="rav-look-controls">
          <div className="rav-look-row">
            <span className="rav-look-key">AI badge</span>
            <span className="rav-look-badges">
              <span className="rav-look-badge"><IconAgentMark />Brand Agent</span>
              <span className="rav-look-swatch rav-look-swatch--a" />
              <span className="rav-look-swatch rav-look-swatch--b" />
            </span>
          </div>
          <div className="rav-look-row">
            <span className="rav-look-key">confidence</span>
            <span className="rav-look-seg">
              <span className="rav-look-seg-opt rav-look-seg-opt--on">percent</span>
              <span className="rav-look-seg-opt">bar</span>
              <span className="rav-look-seg-opt">hidden</span>
            </span>
          </div>
          <div className="rav-look-row">
            <span className="rav-look-key">theme</span>
            <span className="rav-look-tags">
              <span className="chip chip-agent">white-label</span>
              <span className="chip chip-pending">dark mode</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Behavior: the per-agent config surface — enforcement mode, triggers, custom
  // checks, the event that fires on every finding, and the scope it runs at.
  "review-agents/make-it-yours/behavior": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--slate">
          <IconSliders />
          Agent config
          <span className="cmh-cc-pill">per agent</span>
        </div>
        <div className="cmh-cc-body">
          <div className="rav-cfg">
            <div className="rav-cfg-row">
              <span className="rav-cfg-key">enforcement</span>
              <span className="rav-cfg-seg">
                <span className="rav-cfg-seg-opt rav-cfg-seg-opt--block">blocking</span>
                <span className="rav-cfg-seg-opt rav-cfg-seg-opt--advisory rav-cfg-seg-opt--on">advisory</span>
              </span>
            </div>
            <div className="rav-cfg-row">
              <span className="rav-cfg-key">trigger</span>
              <span className="rav-cfg-val">
                <span className="chip chip-agent">on publish</span>
                <span className="chip chip-pending">manual</span>
              </span>
            </div>
            <div className="rav-cfg-row rav-cfg-row--col">
              <span className="rav-cfg-key">custom checks</span>
              <span className="rav-cfg-val">
                <span className="int-chip"><i />headline case</span>
                <span className="int-chip"><i />pricing citations</span>
              </span>
            </div>
            <div className="rav-cfg-row">
              <span className="rav-cfg-key">events</span>
              <span className="rav-cfg-sig"><IconCheck />finding.created</span>
            </div>
            <div className="rav-cfg-row">
              <span className="rav-cfg-key">scope</span>
              <span className="rav-scope">
                <span className="rav-scope-seg rav-scope-seg--on">workspace</span>
                <span className="rav-scope-seg">org</span>
                <span className="rav-scope-seg">document</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "review-agents/in-production/sales": <CrmPipelineBoard />,

  "review-agents/in-production/fintech": <FintechBoard />,

  "review-agents/in-production/ops": <OperationsBoard />,

  "review-agents/in-production/ai": <AiNativeBoard />,

  "review-agents/related/comments": (
    <div className="pv">
      <div className="cmh-cmt cmh-cmt--plain">
        <Av initials="SR" tone="a3" img={FACE.sarah} />
        <div className="cmh-cmt-main">
          <div className="cmh-cmt-head">
            <span className="cmh-cmt-name">Sarah</span>
            <span className="cmh-cmt-time">2m</span>
          </div>
          <p className="cmh-cmt-body">Findings are comments — the same threads your users know.</p>
          <span className="cmh-cmt-replies"><IconReply />3 Replies</span>
        </div>
      </div>
    </div>
  ),

  "review-agents/related/memory": (
    <div className="pv">
      <div className="rav-source">
        <span className="rav-source-ic"><IconFile /></span>
        <span className="rav-source-main">
          <span className="rav-source-name">brand-guidelines.pdf</span>
          <span className="rav-source-meta">precedent · §3.1</span>
        </span>
        <span className="rav-cite"><IconBook />cited</span>
      </div>
      <p className="code-microcopy">knowledge sources · the precedent agents read before flagging</p>
    </div>
  ),

  "review-agents/related/approval-flows": (
    <div className="pv">
      <div className="rav-pipe">
        <span className="rav-pipe-node">
          <Av initials="RA" agent />
          <span className="rav-pipe-name">
            <b>Review Agent</b>
            <span>workflow node</span>
          </span>
        </span>
        <div className="apf-route-fan" aria-hidden="true">
          <span className="cmh-flow-stem" />
          <span className="cmh-flow-bar" />
          <span className="cmh-flow-arm cmh-flow-arm--left" />
          <span className="cmh-flow-arm cmh-flow-arm--right" />
        </div>
        <div className="apf-route-row">
          <span className="apf-route-branch">
            <span className="apf-route-edge rav-edge--pass">pass</span>
            <span className="apf-route-dest">
              <span className="rav-dest-ic"><IconCheck /></span>
              Advances
            </span>
          </span>
          <span className="apf-route-branch">
            <span className="apf-route-edge rav-edge--fail">fail</span>
            <span className="apf-route-dest apf-route-dest--hot">
              <span className="rav-dest-ic rav-dest-ic--fail"><IconX /></span>
              Routes back
            </span>
          </span>
        </div>
      </div>
    </div>
  ),
};
