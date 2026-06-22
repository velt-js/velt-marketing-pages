import type { ReactNode } from "react";

import { AuditLog, Precedent, ProvRow, ProvArrow, AvatarStack, NotifItem, DarkPanel, Chip } from "../demos";
import {
  Av,
  DEL_STYLE,
  FACES,
  Frame,
  IconCheck,
  IconX,
} from "./hero-surface";

// Simulated-UI demo nodes for the /new-features/review-agents page. Keys match
// components/feature-new/demo-presets/review-agents.keys.ts; resolved by
// demo-registry.tsx. Visuals are simulated, not live SDK instances.

// Review-agents personas mapped to shared headshots.
const FACE = {
  sarah: FACES.hope,
  alex: FACES.ethan,
} as const;

/** Inline insertion style — approval green, matching hero-surface DEL_STYLE pair. */
const INS_LOCAL = { background: "var(--vlp-color-approve-soft)", color: "#0c6a41", borderRadius: 3, padding: "0 3px" } as const;

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
        <span className="chip chip-agent">agent</span>
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
            <ins style={INS_LOCAL}>{insText}</ins>
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
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <div className="int-chips">
          <span className="int-chip"><i />Spell Check</span>
          <span className="int-chip"><i />Grammar Check</span>
          <span className="int-chip"><i />Broken Links</span>
          <span className="int-chip"><i />PII Detection</span>
          <span className="int-chip"><i />Profanity Filter</span>
          <span className="int-chip"><i />Sensitive Data</span>
          <span className="int-chip"><i />Consistency Check</span>
        </div>
        <p className="code-microcopy">seven built-ins · each toggleable on its own</p>
      </div>
    </div>
  ),

  "review-agents/showcase/custom": (
    <div className="pv">
      <DarkPanel>{"agent: \"flag any competitor mention\"\n→ setup assistant sharpens the instruction\n→ proves it on test samples"}</DarkPanel>
    </div>
  ),

  "review-agents/showcase/findings": (
    <div className="pv">
      <FindingCard
        agent="Brand Agent"
        initials="BA"
        confidence="91%"
        body={<>Anchored to the clause · threaded · AI-badged, with Approve and Reject.</>}
      />
    </div>
  ),

  "review-agents/showcase/modes": (
    <div className="pv">
      <ProvRow>PII Detection <ProvArrow /> blocking · gates until resolved</ProvRow>
      <ProvRow>Brand voice <ProvArrow /> advisory · warns, records override</ProvRow>
    </div>
  ),

  "review-agents/showcase/knowledge": (
    <div className="pv">
      <ProvRow>brand-guidelines.pdf in Memory <ProvArrow /> finding cites §3.1</ProvRow>
      <ProvRow>the reviewer sees why, not just what</ProvRow>
    </div>
  ),

  "review-agents/showcase/fixes": (
    <div className="pv">
      <ProvRow>agent proposes the redline <ProvArrow /> one tap accepts</ProvRow>
      <ProvRow>content updates <ProvArrow /> agent reruns to verify</ProvRow>
    </div>
  ),

  "review-agents/showcase/reruns": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "v2", ev: <>fixed findings <strong>resolved</strong></>, chip: { label: "merged", kind: "approved" } },
          { ts: "v2", ev: <>open findings <strong>persist</strong> with threads</>, chip: { label: "kept", kind: "pending" } },
          { ts: "v2", ev: <>genuinely new issue <strong>notifies</strong></>, chip: { label: "new", kind: "agent" } },
        ]}
      />
    </div>
  ),

  "review-agents/showcase/workflows": (
    <div className="pv">
      <ProvRow>agent node passes <ProvArrow /> advances the deck or budget</ProvRow>
      <ProvRow>agent node fails <ProvArrow /> routes to a specialist</ProvRow>
    </div>
  ),

  "review-agents/showcase/checklist": (
    <div className="pv">
      <ProvRow>300-item QA checklist <ProvArrow /> focused agents</ProvRow>
      <ProvRow>deduplicated <ProvArrow /> findings cite the item enforced</ProvRow>
    </div>
  ),

  "review-agents/showcase/confidence": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="Finding · confidence 91%"
        body="Checked: text. Not checked: images."
        meta="the instruction or knowledge section behind every finding"
      />
    </div>
  ),

  "review-agents/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>AI badge themeable · shows the agent&rsquo;s name</ProvRow>
      <ProvRow>confidence: percent · bar · hidden</ProvRow>
      <ProvRow>white-label · wireframes · dark mode</ProvRow>
    </div>
  ),

  "review-agents/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>agent definition CRUD · execution API</ProvRow>
      <ProvRow>useAgentResults · useAgentConfig · useAgentAnalytics</ProvRow>
      <ProvRow>custom actions on accept · events on every finding</ProvRow>
    </div>
  ),

  "review-agents/in-production/sales": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <FindingCard
        agent="Brand Agent"
        initials="BA"
        confidence="94%"
        body={<>Deck pre-checked against the uploaded guidelines before the client sees it.</>}
      />
      <p className="code-microcopy">reviewers open queues that are mostly green</p>
    </div>
  ),

  "review-agents/in-production/fintech": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <FindingCard
        agent="PII Detection"
        initials="PI"
        body={<>Blocking gate on the filing · SSN detected in line 14, must resolve before review.</>}
      />
      <p className="code-microcopy">the numbers reach the approver clean, every check on the record</p>
    </div>
  ),

  "review-agents/in-production/ops": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <FindingCard
        agent="Consistency Check"
        initials="CC"
        body={<>Phone number differs between the contact page and the footer.</>}
        citation="cites the 3 pages where they differ"
      />
      <p className="code-microcopy">the counterparty never catches the mismatch your own site missed</p>
    </div>
  ),

  "review-agents/in-production/ai": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <FindingCard
        agent="Review Agent"
        initials="RA"
        confidence="88%"
        body={<>Reviewed the generated draft the moment it landed.</>}
      />
      <ProvRow>finding posts as a comment <ProvArrow /> Approve / Reject attached</ProvRow>
    </div>
  ),

  "review-agents/related/comments": (
    <div className="pv">
      <ProvRow>findings are comments <ProvArrow /> the same threads your users know</ProvRow>
    </div>
  ),

  "review-agents/related/memory": (
    <div className="pv">
      <ProvRow>knowledge sources <ProvArrow /> the precedent agents read before flagging</ProvRow>
    </div>
  ),

  "review-agents/related/approval-flows": (
    <div className="pv">
      <ProvRow>agents as workflow nodes <ProvArrow /> pass / fail routing</ProvRow>
    </div>
  ),
};
