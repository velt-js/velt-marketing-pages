import type { ReactNode } from "react";

import { AvatarStack, Chip, ProvRow, ProvArrow, DarkPanel, Precedent } from "../demos";

// Simulated-UI demo nodes for the /new-features/suggestions page. Keys match
// components/feature-new/demo-presets/suggestions.keys.ts and are merged into
// the registry by demo-registry.tsx. Visuals are simulated, not live SDK.

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

export const SUGGESTIONS_DEMOS: Record<string, ReactNode> = {
  "suggestions/hero/editor": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <p className="code-microcopy">Contract · Clause 4 · suggesting mode on</p>
      <FieldSurface>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
          The Provider shall deliver within{" "}
          <span style={{ textDecoration: "line-through", opacity: 0.5 }}>30</span>{" "}
          <span style={{ fontWeight: 700, color: "var(--brand, #ff4f00)" }}>14</span> days.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <AvatarStack users={[{ initials: "SR", kind: "human", name: "Sarah" }]} />
          <Chip kind="approved">Accept</Chip>
          <Chip kind="rejected">Reject</Chip>
        </div>
      </FieldSurface>
    </div>
  ),

  "suggestions/hero/custom": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <p className="code-microcopy">Invoice #INV-2043 · line 3 · Qty field</p>
      <SuggestionCard
        author={{ initials: "MA", kind: "human", name: "Maya" }}
        target="Qty"
        from="12.0"
        to="10.5"
        rationale="Matches the contracted cap"
      />
    </div>
  ),

  "suggestions/hero/agent": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <p className="code-microcopy">Invoice #INV-2043 · line 3 · agent proposal</p>
      <SuggestionCard
        author={{ initials: "RC", kind: "agent", name: "Rate Checker" }}
        target="Qty"
        from="12.0"
        to="10.5"
        rationale="Vendor rate is 12% over the contracted cap"
      />
    </div>
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
      <ProvRow>
        data-velt-suggestion-target <ProvArrow /> input · cell · field
      </ProvRow>
      <ProvRow>edits become proposed changes, not just the doc body</ProvRow>
    </div>
  ),

  "suggestions/showcase/diff": (
    <div className="pv">
      <SuggestionCard
        author={{ initials: "SR", kind: "human", name: "Sarah" }}
        target="Rate"
        from="12.0"
        to="10.5"
      />
    </div>
  ),

  "suggestions/showcase/agents": (
    <div className="pv">
      <SuggestionCard
        author={{ initials: "RC", kind: "agent", name: "Rate Checker" }}
        target="Qty"
        from="12.0"
        to="10.5"
        rationale="agent proposes · never writes"
      />
    </div>
  ),

  "suggestions/showcase/intent": (
    <div className="pv">
      <ProvRow>
        edit starts <ProvArrow /> value snapshot
      </ProvRow>
      <ProvRow>
        commit <ProvArrow /> diff · no-op edits create nothing
      </ProvRow>
    </div>
  ),

  "suggestions/showcase/apply": (
    <div className="pv">
      <DarkPanel>
        {"onSuggestionAccepted(({ oldValue, newValue }) =>\n  applyToBackend(newValue))"}
      </DarkPanel>
    </div>
  ),

  "suggestions/showcase/multi-control": (
    <div className="pv">
      <ProvRow>
        registerTarget(getter) <ProvArrow /> qty + price as one object
      </ProvRow>
      <ProvRow>propose the line item, not two disconnected edits</ProvRow>
    </div>
  ),

  "suggestions/showcase/stale": (
    <div className="pv">
      <ProvRow>
        target gone at accept <ProvArrow /> <Chip kind="rejected">stale</Chip>
      </ProvRow>
      <ProvRow>
        live value moved <ProvArrow /> <Chip kind="pending">drift</Chip>
      </ProvRow>
    </div>
  ),

  "suggestions/showcase/queries": (
    <div className="pv">
      <DarkPanel>{"useSuggestions({ status: \"pending\" })\n// → badge · count · review panel"}</DarkPanel>
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
