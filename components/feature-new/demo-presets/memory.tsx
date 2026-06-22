import type { CSSProperties, ReactNode } from "react";

import { AuditLog, Precedent, DarkPanel, ProvRow, ProvArrow } from "../demos";
import { Av, Composer, FACES, Frame, IconCheck, IconX } from "./hero-surface";

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

  "memory/showcase/precedent": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="Before review opens"
        body="3 similar filings approved last month · who decided, and why"
        meta="the tenth review starts where the first nine ended"
      />
    </div>
  ),

  "memory/showcase/suggestions": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="suggest()"
        body="Recommend approve · Confidence 94% · 200 judgments"
        meta="every suggestion carries its source records"
      />
    </div>
  ),

  "memory/showcase/search": (
    <div className="pv">
      <ProvRow>
        decision + reasoning <ProvArrow /> embedding space A
      </ProvRow>
      <ProvRow>
        reviewed content <ProvArrow /> embedding space B
      </ProvRow>
    </div>
  ),

  "memory/showcase/nl-queries": (
    <div className="pv">
      <DarkPanel footer="grounded answer · cited records · confidence score">
        {"POST /v2/memory/ask\n{ \"q\": \"all rejections of\n  financial projections in Q3\" }"}
      </DarkPanel>
    </div>
  ),

  "memory/showcase/knowledge": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "PDF", ev: <>brand-guide.pdf · 50 pages</>, chip: { label: "ingested", kind: "approved" } },
          { ts: "CSV", ev: <>pricing.csv · extracted rules</>, chip: { label: "ingested", kind: "approved" } },
          { ts: "XLSX", ev: <>policy.xlsx · searchable</>, chip: { label: "ingested", kind: "approved" } },
        ]}
      />
    </div>
  ),

  "memory/showcase/checklists": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="QA checklist · v4"
        body="300 items extracted into versioned, citeable rules"
        meta="updates produce a diff · dead rules surface for cleanup"
      />
    </div>
  ),

  "memory/showcase/agents": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "AI", ev: <><strong>Agent</strong> queried past judgments</>, chip: { label: "grounded", kind: "agent" } },
          { ts: "AI", ev: <>settled item not re-flagged</>, chip: { label: "skipped", kind: "approved" } },
          { ts: "you", ev: <>human decides finding</>, chip: { label: "human", kind: "pending" } },
        ]}
      />
    </div>
  ),

  "memory/showcase/drift": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="Standards drift alert"
        body="Brand guide says sentence case · 60% of approvals use title case"
        meta="surfaces before the client or auditor finds it"
      />
    </div>
  ),

  "memory/showcase/declared": (
    <div className="pv">
      <ProvRow>
        declared rule <ProvArrow /> overrides inferred pattern
      </ProvRow>
      <ProvRow>
        “projections &gt; 15% variance” <ProvArrow /> always human read
      </ProvRow>
    </div>
  ),

  "memory/showcase/profiles": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="Reviewer profile · Maya"
        body="approval rate 82% · avg review 6m · top flag: indemnity"
        meta="route contracts to who actually clears contracts"
      />
    </div>
  ),

  "memory/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>panel position: sidebar</ProvRow>
      <ProvRow>panel position: bottom</ProvRow>
      <ProvRow>panel position: modal</ProvRow>
    </div>
  ),

  "memory/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>search · ask · suggest</ProvRow>
      <ProvRow>knowledge lifecycle</ProvRow>
      <ProvRow>alert config · retention</ProvRow>
    </div>
  ),

  "memory/in-production/sales": (
    <Precedent
      heading="Content review · new deck"
      body="Client's banned claims surface as precedent on the next deck"
      meta="brand review stays consistent as the team doubles"
    />
  ),

  "memory/in-production/fintech": (
    <Precedent
      heading="Audit query"
      body="“Every Q3 projection rejection” → cited records in minutes"
      meta="past sign-offs become queryable precedent"
    />
  ),

  "memory/in-production/ops": (
    <Precedent
      heading="New coordinator"
      body="Reviews like a five-year veteran because the precedent reviews with them"
      meta="decisions accumulate into the org's standard"
    />
  ),

  "memory/in-production/ai": (
    <Precedent
      heading="Agent grounding"
      body="Agents read decision history before reviewing generated work"
      meta="every suggestion carries confidence and provenance"
    />
  ),

  "memory/related/review-agents": (
    <div className="pv">
      <AuditLog
        rows={[{ ts: "AI", ev: <><strong>Agent</strong> grounded on org standards</>, chip: { label: "accurate", kind: "agent" } }]}
      />
    </div>
  ),

  "memory/related/audit-trail": (
    <div className="pv">
      <ProvRow>
        immutable records <ProvArrow /> indexed and learned from
      </ProvRow>
    </div>
  ),

  "memory/related/approval-flows": (
    <div className="pv">
      <ProvRow>
        reviewer + content data <ProvArrow /> smarter routing
      </ProvRow>
    </div>
  ),
};
