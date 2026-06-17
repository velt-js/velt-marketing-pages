import type { ReactNode } from "react";

import { AuditLog, Precedent, DarkPanel, ProvRow, ProvArrow } from "../demos";

// Simulated-UI demo nodes for the /new-features/memory page. Keys match
// components/feature-new/demo-keys.ts; resolved by demo-registry.tsx.

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
          <i style={{ background: item.kind === "agent" ? "var(--brand)" : undefined }} />
          {item.who} · {item.when}
        </span>
      ))}
    </div>
  );
}

export const MEMORY_DEMOS: Record<string, ReactNode> = {
  "memory/hero/precedent": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <Precedent
        heading="Context · marketing email under review"
        body="3 similar emails approved last month · Maya, Sarah, Dev"
        meta="brand guide §3.1: headers use sentence case"
      />
      <Precedent
        heading="AI suggestion"
        body="Recommend approve · Confidence 94% · based on 200 similar judgments"
        meta="source records one tap away"
      />
    </div>
  ),

  "memory/hero/grounding": (
    <AuditLog
      head={{ left: "Review agent · run #4471", right: "grounded on memory" }}
      rows={[
        {
          ts: "00:01",
          ev: (
            <>
              <strong>Indemnity clause</strong> · settled by precedent, not re-flagged
            </>
          ),
          chip: { label: "skipped", kind: "approved" },
        },
        {
          ts: "00:02",
          ev: (
            <>
              <strong>New pricing claim</strong> · no precedent found
            </>
          ),
          chip: { label: "review", kind: "pending" },
        },
        {
          ts: "00:02",
          ev: <>Human decides: Approve / Reject</>,
          chip: { label: "human", kind: "agent" },
        },
      ]}
    />
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
