import type { ReactNode } from "react";

import { AvatarStack, Chip, ProvRow, ProvArrow, DarkPanel, Precedent } from "../demos";
import {
  Av,
  Composer,
  DEL_STYLE,
  FACES,
  Frame,
  IconCheck,
  IconX,
  INS_STYLE,
} from "./hero-surface";

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
