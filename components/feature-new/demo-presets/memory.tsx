import type { CSSProperties, ReactNode } from "react";

import { Precedent } from "../demos";
import { AiNativeBoard } from "./ai-board";
import { CrmPipelineBoard } from "./crm-board";
import { FintechBoard } from "./fintech-board";
import { OperationsBoard } from "./ops-board";
import {
  Av,
  Composer,
  FACES,
  Frame,
  IconAgentMark,
  IconArrowRight,
  IconCheck,
  IconSearch,
  IconX,
} from "./hero-surface";

import "./memory-showcase.css";

// Simulated-UI demo nodes for the /new-features/memory page. Keys match
// components/feature-new/demo-keys.ts; resolved by demo-registry.tsx.

// Memory-page personas mapped to shared headshots.
const MEM_FACE = {
  maya: FACES.fenne,
  sarah: FACES.hope,
  dev: FACES.ethan,
  roman: FACES.roman,
} as const;

/**
 * A compact list of "precedent" chips (who / when / decision).
 * @param {{ items: { who: string; when: string; kind: "human" | "agent" }[] }} props Chip rows.
 * @returns {JSX.Element} Chip list.
 */
function PrecedentChips({ items }: { items: { who: string; when: string; kind: "human" | "agent" }[] }) {
  return (
    <div className="int-chips">
      {items.map((item, index) => (
        <span className="int-chip" key={`${item.who}-${index}`}>
          <i style={{ background: item.kind === "agent" ? "var(--vlp-color-accent)" : undefined }} />
          {item.who} · {item.when}
        </span>
      ))}
    </div>
  );
}

/**
 * A single line in the grounding context stack — shows a prior decision or
 * reference item the agent is pulling into scope before acting.
 * @param {{ label: string; meta: string; initials: string; tone?: string; img?: string; agent?: boolean }} props Row content.
 * @returns {JSX.Element} Context row.
 */
function ContextRow({
  label,
  meta,
  initials,
  tone,
  img,
  agent,
}: {
  label: string;
  meta: string;
  initials: string;
  tone?: string;
  img?: string;
  agent?: boolean;
}) {
  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "8px 10px",
    border: "1px solid var(--vlp-border-subtle)",
    borderRadius: 9,
    background: "var(--vlp-bg-wash)",
  };
  const labelStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    fontSize: 12,
    color: "var(--vlp-color-ink-soft)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };
  const metaStyle: CSSProperties = {
    fontSize: 10.5,
    fontFamily: "var(--vlp-font-mono)",
    color: "var(--vlp-color-text-subtle)",
    flexShrink: 0,
  };
  return (
    <div style={rowStyle}>
      <Av initials={initials} tone={tone} img={img} agent={agent} />
      <span style={labelStyle}>{label}</span>
      <span style={metaStyle}>{meta}</span>
    </div>
  );
}

/** @returns {JSX.Element} Open-book glyph for citation / knowledge marks. */
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6c-2-1.4-4.5-1.5-7-1v12c2.5-.5 5-.4 7 1 2-1.4 4.5-1.5 7-1V5c-2.5-.5-5-.4-7 1z" />
      <path d="M12 6v12" />
    </svg>
  );
}

/** @returns {JSX.Element} Clock-with-arrow (history) glyph for the precedent header. */
function IconHistory() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.05 11a9 9 0 1 1 .5 4" />
      <path d="M3 4v5h5" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

/** @returns {JSX.Element} Document glyph for source files (PDF chip / library). */
function IconFile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

/** @returns {JSX.Element} Table / grid glyph for spreadsheet (CSV / XLSX) sources. */
function IconSheet() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16M4 15h16M10 4v16" />
    </svg>
  );
}

/** @returns {JSX.Element} List-with-checks glyph for the checklist source / header. */
function IconChecklist() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6.5 5.5 8 8 5M4 12.5 5.5 14 8 11M4 18.5 5.5 20 8 17" />
      <path d="M12 6h8M12 12h8M12 18h8" />
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

/** @returns {JSX.Element} Alert-triangle glyph for the drift / standards header. */
function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4 2.5 20h19L12 4z" />
      <path d="M12 10v4M12 17.5v.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Lock glyph for declared (override) rules. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Person glyph for the reviewer-profile header / human step. */
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

/** @returns {JSX.Element} Chat-with-question glyph for the natural-language ask. */
function IconAsk() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4.1A7.5 7.5 0 1 1 20 11.5z" />
      <path d="M9.8 9.3a2.2 2.2 0 0 1 4.2.8c0 1.5-2 1.8-2 3" />
      <path d="M12 15.6v.05" />
    </svg>
  );
}

/**
 * One labeled showcase card: the shared `.apf-card` shell with a tinted
 * `.cmh-cc-head` bar (a stroke icon or the agent mark, a title, and a pill)
 * over a `.cmh-cc-body`. Wide cards omit `narrow`; narrow tiles set it.
 * @param {{ tone: string; icon?: ReactNode; mark?: boolean; title: ReactNode; pill: ReactNode; narrow?: boolean; children: ReactNode }} props Card content.
 * @returns {JSX.Element} Showcase card.
 */
function ShowcaseCard({
  tone,
  icon,
  mark,
  title,
  pill,
  narrow,
  children,
}: {
  tone: string;
  icon?: ReactNode;
  mark?: boolean;
  title: ReactNode;
  pill: ReactNode;
  narrow?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="pv">
      <div className={`apf-card${narrow ? " apf-card--narrow" : ""}`}>
        <div className={`cmh-cc-head ${tone}`}>
          {mark ? <span className="cmh-cc-mark"><IconAgentMark /></span> : icon}
          {title}
          <span className="cmh-cc-pill">{pill}</span>
        </div>
        <div className="cmh-cc-body">{children}</div>
      </div>
    </div>
  );
}

/**
 * A precedent / decision row: an avatar, a name + mono meta line, and a chip.
 * @param {{ initials: string; tone?: string; img?: string; agent?: boolean; name: ReactNode; meta: ReactNode; chipKind: string; chipLabel: string }} props Row content.
 * @returns {JSX.Element} Decision row.
 */
function MemRow({
  initials,
  tone,
  img,
  agent,
  name,
  meta,
  chipKind,
  chipLabel,
}: {
  initials: string;
  tone?: string;
  img?: string;
  agent?: boolean;
  name: ReactNode;
  meta: ReactNode;
  chipKind: string;
  chipLabel: string;
}) {
  return (
    <div className="mem-row">
      <Av initials={initials} tone={tone} img={img} agent={agent} />
      <span className="mem-row-main">
        <span className="mem-row-name">{name}</span>
        <span className="mem-row-meta">{meta}</span>
      </span>
      <span className={`chip chip-${chipKind}`}>{chipLabel}</span>
    </div>
  );
}

/**
 * A source-file row: a tinted file icon, a name + mono meta line, and a chip.
 * @param {{ icon: ReactNode; tint: string; name: ReactNode; meta: ReactNode; chipKind: string; chipLabel: string }} props Row content.
 * @returns {JSX.Element} Source row.
 */
function MemSource({
  icon,
  tint,
  name,
  meta,
  chipKind,
  chipLabel,
}: {
  icon: ReactNode;
  tint: string;
  name: ReactNode;
  meta: ReactNode;
  chipKind: string;
  chipLabel: string;
}) {
  return (
    <div className="mem-row">
      <span className={`mem-src-ic mem-src-ic--${tint}`}>{icon}</span>
      <span className="mem-row-main">
        <span className="mem-row-name">{name}</span>
        <span className="mem-row-meta">{meta}</span>
      </span>
      <span className={`chip chip-${chipKind}`}>{chipLabel}</span>
    </div>
  );
}

/**
 * One agent-grounding step: a tinted icon tile, a description, and a chip.
 * @param {{ variant: string; icon: ReactNode; text: ReactNode; chipKind: string; chipLabel: string }} props Step content.
 * @returns {JSX.Element} Grounding step row.
 */
function MemStep({
  variant,
  icon,
  text,
  chipKind,
  chipLabel,
}: {
  variant: string;
  icon: ReactNode;
  text: ReactNode;
  chipKind: string;
  chipLabel: string;
}) {
  return (
    <div className="mem-step">
      <span className={`mem-step-ic mem-step-ic--${variant}`}>{icon}</span>
      <span className="mem-step-main">{text}</span>
      <span className={`chip chip-${chipKind}`}>{chipLabel}</span>
    </div>
  );
}

/**
 * A decorative row of embedding-vector cells (some highlighted) for the
 * semantic-search spaces.
 * @param {{ pattern: number[] }} props One value per cell; non-zero cells light up.
 * @returns {JSX.Element} Vector cell row.
 */
function VectorCells({ pattern }: { pattern: number[] }) {
  return (
    <span className="mem-cells" aria-hidden="true">
      {pattern.map((cell, index) => (
        <i key={index} className={cell ? "on" : undefined} />
      ))}
    </span>
  );
}

export const MEMORY_DEMOS: Record<string, ReactNode> = {
  "memory/hero/precedent": (
    <Frame
      app="MA"
      crumb={<><b>contract-v3.pdf</b> <span className="sep">/</span> clause 12</>}
      users={[
        { initials: "MA", agent: true },
        { initials: "MY", tone: "a2", img: MEM_FACE.maya },
      ]}
    >
      {/* Agent message surfacing prior decision before re-flagging */}
      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="MA" agent />
          Memory Agent
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">now</span>
        </div>
        <p className="fb">
          I found a prior decision on this clause — indemnity cap was reviewed and approved in March. Not re-flagging.
        </p>
      </div>

      {/* Precedent card: who approved, when, real face */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <Av initials="MY" tone="a2" img={MEM_FACE.maya} />
        <Precedent
          style={{ flex: 1, minWidth: 0 }}
          heading="precedent · clause 12 indemnity"
          body="Approved by Maya (Legal) · 14 Mar 2026 · cap set at 2× annual fees; no further liability."
          meta="source: contract-v1.pdf · thread #2281"
        />
      </div>

      <Composer placeholder="Add context or override…" you={MEM_FACE.sarah} />
    </Frame>
  ),

  "memory/hero/grounding": (
    <Frame
      app="RA"
      crumb={<><b>Agent run #4471</b> <span className="sep">/</span> grounding</>}
      users={[
        { initials: "RA", agent: true },
        { initials: "RO", tone: "a1", img: MEM_FACE.roman },
      ]}
    >
      {/* Context stack — prior threads the agent read before acting */}
      <div style={{ display: "grid", gap: 6 }}>
        <p
          style={{
            margin: 0,
            fontSize: 10.5,
            fontFamily: "var(--vlp-font-mono)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--vlp-color-text-subtle)",
          }}
        >
          context loaded · 3 items
        </p>
        <ContextRow
          initials="MY"
          tone="a2"
          img={MEM_FACE.maya}
          label="Clause 7 indemnity — approved with liability cap"
          meta="Mar 14"
        />
        <ContextRow
          initials="DV"
          tone="a1"
          img={MEM_FACE.dev}
          label="Pricing claim on slide 4 — rejected, re-written"
          meta="Apr 02"
        />
        <ContextRow
          initials="RA"
          agent
          label="Brand guide §3.1: headers in sentence case"
          meta="ingested"
        />
      </div>

      {/* Agent grounded finding — minimal, confident */}
      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="RA" agent />
          Review Agent
          <span className="chip chip-agent">grounded</span>
        </div>
        <p className="fb">
          Indemnity clause matches the Mar 14 approval — skipping. New pricing claim on slide 6 has no precedent.
        </p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve">
            <IconCheck />Approve
          </button>
          <button type="button" className="cmh-btn reject">
            <IconX />Reject
          </button>
        </div>
      </div>
    </Frame>
  ),

  "memory/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <PrecedentChips
        items={[
          { who: "Maya approved identical indemnity", when: "Mar 12", kind: "human" },
          { who: "Prior agent finding accepted", when: "same clause", kind: "agent" },
        ]}
      />
      <Precedent
        heading="AI suggestion"
        body="Recommend approve · Confidence 91% · based on 47 similar judgments"
        meta="every entry shows who decided, when, and why"
      />
      <p className="code-microcopy">both actor types feed the precedent; the human makes the call</p>
    </div>
  ),

  // Precedent surfacing (wide tile): prior decisions on the same matter — who
  // decided, when, and the outcome — surfaced before a new review opens.
  "memory/showcase/precedent": (
    <ShowcaseCard tone="apf-head--navy" icon={<IconHistory />} title="Precedent" pill="before review">
      <div className="mem-list">
        <MemRow
          img={MEM_FACE.maya}
          initials="MY"
          tone="a2"
          name="Indemnity cap · clause 12"
          meta="Maya · Legal · Mar 14"
          chipKind="approved"
          chipLabel="approved"
        />
        <MemRow
          img={MEM_FACE.dev}
          initials="DV"
          tone="a1"
          name="Pricing claim · slide 4"
          meta="Dev · Mar 28"
          chipKind="rejected"
          chipLabel="rejected"
        />
        <MemRow
          img={MEM_FACE.roman}
          initials="RO"
          tone="a1"
          name="Liability terms · §7"
          meta="Roman · Apr 02"
          chipKind="approved"
          chipLabel="approved"
        />
      </div>
      <div className="apf-note apf-note--ok">
        <span className="chip chip-approved">3 precedents</span>
        <span>The tenth review starts where the first nine ended</span>
      </div>
    </ShowcaseCard>
  ),

  // Inline suggestions (narrow tile): a grounded recommendation with a
  // confidence meter and the source records it was drawn from.
  "memory/showcase/suggestions": (
    <ShowcaseCard tone="apf-head--purple" mark title="Suggestion" pill="94%" narrow>
      <div className="mem-suggest">
        <div className="mem-suggest-rec">
          <span className="mem-suggest-ic"><IconCheck /></span>
          <span className="mem-suggest-main">
            <span className="mem-suggest-verdict">Recommend approve</span>
            <span className="mem-suggest-sub">matches 200 prior judgments</span>
          </span>
        </div>
        <div className="mem-meter">
          <div className="mem-meter-track"><span className="mem-meter-fill" style={{ width: "94%" }} /></div>
          <div className="mem-meter-scale">
            <span>confidence</span>
            <span>94%</span>
          </div>
        </div>
        <div className="mem-cites">
          <span className="mem-cite"><IconBook />47 contracts</span>
          <span className="mem-cite"><IconBook />153 filings</span>
        </div>
      </div>
    </ShowcaseCard>
  ),

  // Semantic search (narrow tile): decisions and reviewed content embedded into
  // two vector spaces, returning the closest prior decision by similarity.
  "memory/showcase/search": (
    <ShowcaseCard tone="apf-head--teal" icon={<IconSearch />} title="Semantic search" pill="vectors" narrow>
      <div className="mem-search">
        <span className="mem-search-bar"><IconSearch />find similar decisions</span>
        <div className="mem-space">
          <span className="mem-space-label">Decision + reasoning</span>
          <VectorCells pattern={[1, 0, 1, 1, 0, 1, 0, 1]} />
          <span className="mem-space-tag">space A</span>
        </div>
        <div className="mem-space">
          <span className="mem-space-label">Reviewed content</span>
          <VectorCells pattern={[0, 1, 1, 0, 1, 0, 1, 1]} />
          <span className="mem-space-tag">space B</span>
        </div>
        <div className="mem-match">
          <Av initials="MY" tone="a2" img={MEM_FACE.maya} />
          <span className="mem-match-main">Indemnity cap · clause 12</span>
          <span className="mem-match-score">0.94</span>
        </div>
      </div>
    </ShowcaseCard>
  ),

  // Natural-language queries (wide tile): a plain-English question answered with
  // a grounded, cited response and a confidence score — the /ask API as UI.
  "memory/showcase/nl-queries": (
    <ShowcaseCard tone="apf-head--ink" icon={<IconAsk />} title="Ask Memory" pill="/v2/memory/ask">
      <div className="mem-ask">
        <div className="mem-ask-q">
          <span className="mem-ask-ic"><IconAsk /></span>
          <span className="mem-ask-text">All rejections of financial projections in Q3</span>
        </div>
        <div className="mem-down"><IconArrowDown /></div>
        <div className="mem-ask-answer">
          <div className="mem-ask-head">
            <span className="cmh-cc-mark"><IconAgentMark /></span>
            grounded answer
            <span className="chip chip-approved">confidence 0.92</span>
          </div>
          <p className="mem-ask-body">
            7 projections were rejected in Q3 — each for variance over the declared 15% threshold.
          </p>
          <div className="mem-cites">
            <span className="mem-cite"><IconBook />filing-2231</span>
            <span className="mem-cite"><IconBook />filing-2318</span>
            <span className="mem-cite"><IconBook />+5 records</span>
          </div>
        </div>
      </div>
    </ShowcaseCard>
  ),

  // Org knowledge (wide tile): uploaded documents chunked and indexed into
  // searchable, citeable memory the moment they land.
  "memory/showcase/knowledge": (
    <ShowcaseCard tone="apf-head--navy" icon={<IconFile />} title="Org knowledge" pill="ingested">
      <div className="mem-list">
        <MemSource
          icon={<IconFile />}
          tint="pdf"
          name="brand-guide.pdf"
          meta="50 pages · chunked"
          chipKind="approved"
          chipLabel="ingested"
        />
        <MemSource
          icon={<IconSheet />}
          tint="csv"
          name="pricing.csv"
          meta="rules extracted"
          chipKind="approved"
          chipLabel="ingested"
        />
        <MemSource
          icon={<IconSheet />}
          tint="xlsx"
          name="policy.xlsx"
          meta="searchable"
          chipKind="approved"
          chipLabel="ingested"
        />
      </div>
    </ShowcaseCard>
  ),

  // Living checklists (narrow tile): an imported checklist becomes versioned,
  // citeable rules — each update producing a diff that retires dead rules.
  "memory/showcase/checklists": (
    <ShowcaseCard tone="apf-head--plum" icon={<IconChecklist />} title="Living checklist" pill="v4" narrow>
      <MemSource
        icon={<IconChecklist />}
        tint="list"
        name="qa-checklist.csv"
        meta="300 items · normalized"
        chipKind="agent"
        chipLabel="versioned"
      />
      <div className="mem-down"><IconArrowDown /></div>
      <div className="mem-diff">
        <span className="mem-diff-row mem-diff-row--add">
          <span className="mem-diff-sign">+</span>
          12 new rules
          <span className="chip chip-approved">v4</span>
        </span>
        <span className="mem-diff-row mem-diff-row--del">
          <span className="mem-diff-sign">−</span>
          3 dead rules
          <span className="chip chip-pending">cleanup</span>
        </span>
      </div>
      <div className="apf-note">
        <span>Every update produces a citeable diff</span>
      </div>
    </ShowcaseCard>
  ),

  // Agent grounding (narrow tile): an agent reads decision history before
  // acting — skips settled items, leaves the call to a human.
  "memory/showcase/agents": (
    <ShowcaseCard tone="apf-head--purple" mark title="Agent grounding" pill="grounded" narrow>
      <div className="mem-steps">
        <MemStep
          variant="agent"
          icon={<IconBook />}
          text={<>Agent <strong>queried</strong> past judgments</>}
          chipKind="agent"
          chipLabel="grounded"
        />
        <MemStep
          variant="skip"
          icon={<IconCheck />}
          text={<>Settled item <strong>not re-flagged</strong></>}
          chipKind="approved"
          chipLabel="skipped"
        />
        <MemStep
          variant="human"
          icon={<IconUser />}
          text={<>Human <strong>decides</strong> the finding</>}
          chipKind="pending"
          chipLabel="human"
        />
      </div>
    </ShowcaseCard>
  ),

  // Drift detection (wide tile): the declared standard vs what approvals
  // actually do, with the gap quantified before a client or auditor finds it.
  "memory/showcase/drift": (
    <ShowcaseCard tone="apf-head--plum" icon={<IconAlert />} title="Drift detection" pill="alert">
      <div className="mem-drift">
        <div className="mem-drift-row">
          <span className="mem-drift-label">declared standard</span>
          <span className="mem-drift-val">sentence case</span>
        </div>
        <div className="mem-drift-row">
          <span className="mem-drift-label">observed in approvals</span>
          <span className="mem-drift-val mem-drift-val--warn">60% title case</span>
        </div>
        <div className="mem-meter">
          <div className="mem-meter-track"><span className="mem-meter-fill mem-meter-fill--warn" style={{ width: "60%" }} /></div>
          <div className="mem-meter-scale">
            <span>drift</span>
            <span>60%</span>
          </div>
        </div>
        <div className="mem-alert">
          <IconAlert />
          <span>Surfaces before the client or auditor finds it</span>
        </div>
      </div>
    </ShowcaseCard>
  ),

  // Declared decisions (wide tile): an explicit, declared rule taking
  // precedence over an inferred pattern — some calls always reach a human.
  "memory/showcase/declared": (
    <ShowcaseCard tone="apf-head--ink" icon={<IconLock />} title="Declared rules" pill="override">
      <div className="mem-rules">
        <div className="mem-rule">
          <span className="mem-rule-pin"><IconLock /></span>
          <span className="mem-rule-declared">Declared rule</span>
          <span className="mem-rule-arrow"><IconArrowRight /></span>
          <span className="mem-rule-inferred">overrides the inferred pattern</span>
        </div>
        <div className="mem-rule mem-rule--code">
          <code className="mem-rule-expr">projections &gt; 15% variance</code>
          <span className="mem-rule-arrow"><IconArrowRight /></span>
          <span className="chip chip-pending">always human read</span>
        </div>
      </div>
    </ShowcaseCard>
  ),

  // Entity profiles (narrow tile): an accumulated reviewer profile — rates and
  // specialties — so work routes to whoever actually clears it.
  "memory/showcase/profiles": (
    <ShowcaseCard tone="apf-head--slate" icon={<IconUser />} title="Reviewer profile" pill="Maya" narrow>
      <div className="mem-profile">
        <div className="mem-profile-head">
          <Av initials="MY" tone="a2" img={MEM_FACE.maya} />
          <span className="mem-profile-id">
            <span className="mem-profile-name">Maya</span>
            <span className="mem-profile-role">Legal · contracts</span>
          </span>
        </div>
        <div className="apf-gov-body">
          <div className="apf-gov-row">
            <span className="apf-gov-key">approval rate</span>
            <span className="apf-gov-val">82%</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">avg review</span>
            <span className="apf-gov-val">6m</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">top flag</span>
            <span className="apf-gov-val">indemnity</span>
          </div>
        </div>
        <div className="apf-note">
          <span>Route contracts to who actually clears contracts</span>
        </div>
      </div>
    </ShowcaseCard>
  ),

  "memory/make-it-yours/look": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head mem-look-head">
          <span className="mem-look-mark"><IconHistory /></span>
          <span className="mem-look-brand">Acme · Precedent</span>
          <span className="cmh-cc-pill">your theme</span>
        </div>
        <div className="cmh-cc-body">
          <div className="mem-list">
            <div className="mem-look-row">
              <div className="mem-look-top">
                <span className="mem-look-dec">Indemnity cap · clause 12</span>
                <span className="chip chip-approved">approved</span>
              </div>
              <div className="mem-cites">
                <span className="mem-cite"><IconBook />47 contracts</span>
                <span className="mem-cite"><IconBook />Maya · Legal</span>
              </div>
            </div>
            <div className="mem-look-row">
              <div className="mem-look-top">
                <span className="mem-look-dec">Pricing claim · slide 4</span>
                <span className="chip chip-rejected">rejected</span>
              </div>
              <div className="mem-cites">
                <span className="mem-cite"><IconBook />precedent #228</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "memory/make-it-yours/behavior": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--ink">
          <span className="cmh-cc-mark"><IconAgentMark /></span>
          Grounding config
          <span className="cmh-cc-pill">your rules</span>
        </div>
        <div className="cmh-cc-body mem-cfg">
          <div className="mem-cfg-row">
            <span className="mem-cfg-key">grounding</span>
            <span className="mem-cfg-val"><span className="chip chip-approved">required</span></span>
          </div>
          <div className="mem-cfg-row">
            <span className="mem-cfg-key">sources</span>
            <span className="mem-cfg-val mem-cfg-srcs">
              <span className="mem-src-ic mem-src-ic--pdf"><IconFile /></span>
              <span className="mem-src-ic mem-src-ic--csv"><IconSheet /></span>
              <span className="mem-src-ic mem-src-ic--list"><IconChecklist /></span>
            </span>
          </div>
          <div className="mem-cfg-row">
            <span className="mem-cfg-key">min confidence</span>
            <span className="mem-cfg-val">
              <span className="mem-cfg-meter"><span className="mem-meter-fill" style={{ width: "85%" }} /></span>
              <span className="mem-cfg-num">0.85</span>
            </span>
          </div>
          <div className="mem-cfg-row">
            <span className="mem-cfg-key">scope</span>
            <span className="mem-cfg-val"><span className="chip chip-pending">per-org</span></span>
          </div>
        </div>
      </div>
    </div>
  ),

  "memory/in-production/sales": <CrmPipelineBoard />,

  "memory/in-production/fintech": <FintechBoard />,

  "memory/in-production/ops": <OperationsBoard />,

  "memory/in-production/ai": <AiNativeBoard />,

  "memory/related/review-agents": (
    <div className="pv">
      <div className="mem-rel">
        <div className="mem-rel-find">
          <Av initials="RA" agent />
          <div className="mem-rel-find-main">
            <div className="mem-rel-find-head">
              <span className="mem-rel-find-name">Review Agent</span>
              <span className="chip chip-agent">grounded</span>
            </div>
            <p className="mem-rel-find-body">Reads org standards before flagging, so findings land accurate.</p>
          </div>
        </div>
      </div>
    </div>
  ),

  "memory/related/audit-trail": (
    <div className="pv">
      <div className="mem-rel">
        <div className="apf-gov-row">
          <span className="apf-gov-key">records</span>
          <span className="mem-rel-sig"><IconLock />immutable</span>
        </div>
        <div className="apf-gov-row">
          <span className="apf-gov-key">memory</span>
          <span className="apf-gov-val">indexed · learned from</span>
        </div>
      </div>
    </div>
  ),

  "memory/related/approval-flows": (
    <div className="pv">
      <div className="mem-rel mem-rel-route">
        <div className="mem-rel-step">
          <Av initials="MY" tone="a2" img={MEM_FACE.maya} />
          <span className="mem-rel-step-main">
            <span className="mem-rel-step-name">Maya · Legal</span>
            <span className="mem-rel-step-sub">clears contracts · 82%</span>
          </span>
          <span className="chip chip-approved">routed</span>
        </div>
        <div className="mem-rel-step">
          <Av initials="RO" tone="a1" img={MEM_FACE.roman} />
          <span className="mem-rel-step-main">
            <span className="mem-rel-step-name">Roman · Finance</span>
            <span className="mem-rel-step-sub">no match · skipped</span>
          </span>
          <span className="chip chip-pending">held</span>
        </div>
      </div>
    </div>
  ),
};
