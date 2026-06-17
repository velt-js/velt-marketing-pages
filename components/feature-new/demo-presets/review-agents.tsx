import type { ReactNode } from "react";

import { AuditLog, Precedent, ProvRow, ProvArrow, AvatarStack, NotifItem, DarkPanel, Chip } from "../demos";

// Simulated-UI demo nodes for the /new-features/review-agents page. Keys match
// components/feature-new/demo-presets/review-agents.keys.ts; resolved by
// demo-registry.tsx. Visuals are simulated, not live SDK instances.

const INK = "var(--ink, #0b353b)";
const LINE = "var(--line, #e7e2d9)";
const BG = "var(--bg, #fff)";

/**
 * Agent finding card: AI-badged avatar, the finding body, optional confidence,
 * a knowledge citation, a suggested fix, and Approve/Reject consent buttons.
 * Renders a resolved state instead of the buttons when `resolved` is set.
 * @param {{ agent: string; initials?: string; confidence?: string; body: ReactNode; citation?: string; fix?: string; resolved?: boolean }} props Finding content.
 * @returns {JSX.Element | null} Finding card, or null on error.
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
  try {
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
  } catch (error) {
    console.error("FindingCard failed", error);
    return null;
  }
}

export const REVIEW_AGENTS_DEMOS: Record<string, ReactNode> = {
  "review-agents/hero/define": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <p className="code-microcopy">Custom agent · plain English instructions</p>
      <Precedent
        heading="Brand Agent · advisory"
        body={"“Flag any headline not in sentence case, and any pricing claim without a cited source.”"}
        meta="setup assistant sharpens the instruction and proves it on test samples"
      />
    </div>
  ),

  "review-agents/hero/run": (
    <AuditLog
      head={{ left: "Marketing email · review run", right: "7 agents · 6.2s" }}
      rows={[
        { ts: "0.0s", ev: <><strong>Brand Agent</strong> checking headline case</>, chip: { label: "running", kind: "pending" } },
        { ts: "1.4s", ev: <><strong>PII Detection</strong> scanned recipients</>, chip: { label: "pass", kind: "approved" } },
        { ts: "2.1s", ev: <><strong>Broken Links</strong> verified 12 links</>, chip: { label: "pass", kind: "approved" } },
        { ts: "6.2s", ev: <><strong>Brand Agent</strong> posted 1 finding</>, chip: { label: "agent", kind: "agent" } },
      ]}
    />
  ),

  "review-agents/hero/findings": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <p className="code-microcopy">Marketing email · headline</p>
      <FindingCard
        agent="Brand Agent"
        initials="BA"
        confidence="91%"
        body={<>Headline uses title case. Brand guidelines (section 3.1) require sentence case.</>}
        citation="cites brand-guidelines · §3.1"
        fix="“Launch your review agents this week”"
      />
      <NotifItem
        avatar={{ initials: "SA", kind: "human" }}
        title={<><strong>Sarah</strong>: “Good catch, also watch the subject line.”</>}
        meta="human reply"
      />
    </div>
  ),

  "review-agents/hero/accept": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <FindingCard
        agent="Brand Agent"
        initials="BA"
        body={<>Headline updated to sentence case. The agent reran and verified the fix.</>}
        resolved
      />
      <ProvRow>Approve <ProvArrow /> durable comment or webhook action</ProvRow>
      <ProvRow>Reject <ProvArrow /> override recorded, feeds tuning</ProvRow>
    </div>
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
        title={<><strong>Sarah</strong>: “Good catch, also watch the subject line.”</>}
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
      <DarkPanel>{"agent: “flag any competitor mention”\n→ setup assistant sharpens the instruction\n→ proves it on test samples"}</DarkPanel>
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
      <ProvRow>AI badge themeable · shows the agent's name</ProvRow>
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
