import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, DarkPanel, ProvRow, ProvArrow, AvatarStack, CursorTag } from "../demos";
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

// Simulated-UI demo nodes for the /for/ai-native-saas page. Keys are
// listed (pure-data) in ./solutions-ai-native-saas.keys.ts and merged into the
// shared registry by ../demo-registry.tsx. Visuals are simulated, not live SDK
// instances. Voice is AI-native SaaS: the generated draft, the agent's output,
// the model-produced change, the run, the user's data. Agents propose through
// the customer's own API; humans approve; the webhook applies the change.

// Solutions AI-native-saas hero personas mapped to shared headshots.
// Dana = the human operator reviewing generated output; RA = the blue Review Agent.
const FACE = {
  dana: FACES.hope,
} as const;

/**
 * A single doc field row inside the generated-draft surface: label on the left,
 * value on the right. Used to render the AI-generated refund record inline.
 * @param {{ label: string; value: ReactNode; highlight?: boolean }} props Row content and optional highlight flag.
 * @returns {JSX.Element} Doc field row.
 */
function DocField({ label, value, highlight }: { label: string; value: ReactNode; highlight?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 10,
        padding: "6px 0",
        borderBottom: highlight ? "1px solid transparent" : "1px solid var(--vlp-border-subtle)",
        background: highlight ? "var(--vlp-color-accent-soft)" : "transparent",
        borderRadius: highlight ? 7 : 0,
        boxShadow: highlight ? "inset 3px 0 0 var(--vlp-color-accent)" : "none",
        paddingLeft: highlight ? 9 : 0,
        paddingRight: highlight ? 9 : 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--vlp-font-mono)",
          fontSize: 10.5,
          color: "var(--vlp-color-text-muted)",
          letterSpacing: "0.03em",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 12.5, color: "var(--vlp-color-ink)", fontWeight: highlight ? 600 : 400 }}>
        {value}
      </span>
    </div>
  );
}

export const SOLUTIONS_AI_NATIVE_SAAS_DEMOS: Record<string, ReactNode> = {
  "solutions/ai-native-saas/hero": (
    <Frame
      app="RF"
      crumb={<><b>Generated draft</b> <span className="sep">/</span> run #8842</>}
      users={[{ initials: "DV", tone: "a1", img: FACE.dana }, { initials: "RA", agent: true }]}
    >
      <div className="cmh-doc" style={{ display: "grid", gap: 0 }}>
        <DocField label="CUSTOMER" value="Acme Corp" />
        <DocField label="REQUEST TYPE" value="Refund" />
        <DocField label="ORDER" value="ORD-20814 · $340.00" />
        <DocField label="AI REFUND AMOUNT" value={<><del style={DEL_STYLE}>$340.00</del> <ins style={INS_STYLE}>$300.00</ins></>} highlight />
        <DocField label="POLICY LIMIT" value="$300.00 / order" />
      </div>

      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="RA" agent />
          Review Agent
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">just now</span>
        </div>
        <p className="fb">Refund exceeds policy by $40 &mdash; recommend partial approval of $300.00.</p>
        <p className="cmh-suggest">
          <span className="lbl">Suggested fix</span>
          <span className="body">
            <del style={DEL_STYLE}>$340.00</del>{" "}
            <span style={{ color: "var(--vlp-color-text-subtle)" }}>{"→"}</span>{" "}
            <ins style={INS_STYLE}>$300.00</ins>
          </span>
        </p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Approve $300</button>
          <button type="button" className="cmh-btn reject"><IconX />Reject</button>
        </div>
      </div>

      <Composer placeholder="Add a note before approving&hellip;" you={FACE.dana} />
    </Frame>
  ),

  "solutions/ai-native-saas/loop": (
    <AuditLog
      head={{ left: "Generated draft · renewal email", right: "proposed → approved → applied" }}
      rows={[
        { ts: "1", ev: <><strong>Pricing Agent</strong> proposes the price change as a comment with rationale + payload</>, chip: { label: "agent", kind: "agent" } },
        { ts: "2", ev: <><strong>Dana</strong> asks the team: “@Priya ok to apply this to all 14 accounts?”</>, chip: { label: "comment", kind: "pending" } },
        { ts: "3", ev: <>High-stakes change routes into a staged approval chain</>, chip: { label: "chain", kind: "pending" } },
        { ts: "4", ev: <>POST fires to the customer&rsquo;s webhook · the user&rsquo;s data changes now</>, chip: { label: "200", kind: "approved" } },
        { ts: "5", ev: <>Audit records who proposed, who allowed, what changed, when</>, chip: { label: "recorded", kind: "approved" } },
      ]}
    />
  ),

  "solutions/ai-native-saas/loop/1": (
    <div className="thread">
      <div className="thread-head">
        <span className="av-c av-agent">AI</span>
        <span className="who">Pricing Agent</span>
        <span className="when">now</span>
      </div>
      <p className="thread-body">
        Updated renewal price to match the new plan table. Payload attached. <span className="agent-tag">AGENT</span>
      </p>
    </div>
  ),

  "solutions/ai-native-saas/loop/2": (
    <div className="thread">
      <div className="thread-head">
        <span className="av-c a2">PR</span>
        <span className="who">Priya</span>
        <span className="when">now</span>
      </div>
      <p className="thread-body">Yes for the 14 enterprise accounts; hold the rest.</p>
    </div>
  ),

  "solutions/ai-native-saas/loop/3": (
    <div className="sol-panel-body dark" style={{ borderRadius: "var(--vlp-radius-xl)", boxShadow: "none" }}>
      <pre>
        <span className="tk-kw">POST</span>{" /webhooks/velt\n{ "}
        <span className="tk-str">{'"event"'}</span>{": "}
        <span className="tk-str">{'"change.applied"'}</span>{",\n  "}
        <span className="tk-str">{'"by"'}</span>{": "}
        <span className="tk-str">{'"maya@acme.com"'}</span>{" }"}
      </pre>
    </div>
  ),

  "solutions/ai-native-saas/loop/4": (
    <div className="audit" style={{ boxShadow: "none" }}>
      <div className="audit-row">
        <span className="ts">10:21</span>
        <span className="ev"><strong>Maya</strong> allowed the change</span>
        <span className="chip chip-approved">human</span>
      </div>
      <div className="audit-row">
        <span className="ts">10:21</span>
        <span className="ev">agent proposal · 0.94</span>
        <span className="chip chip-agent">agent</span>
      </div>
    </div>
  ),

  "solutions/ai-native-saas/agent": (
    <div style={{ display: "grid", gap: 12 }}>
      <NotifItem
        avatar={{ initials: "PA", kind: "agent", name: "Pricing Agent" }}
        title={<><strong>Proposes</strong> · apply the new renewal price to this account</>}
        meta="rationale + payload attached · no write access"
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <ProvRow>human approves <ProvArrow /> change applies via webhook</ProvRow>
      <Precedent
        heading="audit line"
        body={"Approved · Dana · Tue 14:21 · price applied · agent never held write access"}
        meta="on reject, nothing touches the user's data and the rejection is logged"
      />
    </div>
  ),

  "solutions/ai-native-saas/in-production": (
    <AuditLog
      head={{ left: "Agent runs · this month", right: "proposed → approved → applied" }}
      rows={[
        { ts: "Mon", ev: "Renewal price change · owner approved", chip: { label: "approved", kind: "approved" } },
        { ts: "Tue", ev: "Generated summary edit · applied via webhook", chip: { label: "approved", kind: "approved" } },
        { ts: "Wed", ev: "Bulk field update · rejected, logged", chip: { label: "rejected", kind: "rejected" } },
        { ts: "Thu", ev: "Audit export delivered to security review", chip: { label: "export", kind: "pending" } },
      ]}
    />
  ),

  "solutions/ai-native-saas/fm/comments": (
    <div className="pv">
      <NotifItem
        avatar={{ initials: "PA", kind: "agent", name: "Pricing Agent" }}
        title={<>Anchored to the exact <strong>cell</strong> it proposes to change, with Approve and Reject</>}
        meta="an agent is just a user with type agent"
        chip={{ label: "agent", kind: "agent" }}
      />
    </div>
  ),

  "solutions/ai-native-saas/fm/suggestions": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="model-produced change"
        body={"“renews at $3,900” → “renews at $4,800”. Accept fires your webhook; reject leaves the data untouched."}
      />
    </div>
  ),

  "solutions/ai-native-saas/fm/approval-flows": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "1", ev: <>owner</>, chip: { label: "passed", kind: "approved" } },
          { ts: "2", ev: <>team quorum</>, chip: { label: "passed", kind: "approved" } },
          { ts: "3", ev: <>type-the-name confirm</>, chip: { label: "pending", kind: "pending" } },
        ]}
      />
    </div>
  ),

  "solutions/ai-native-saas/fm/audit-trail": (
    <div className="pv">
      <DarkPanel>{"GET /v2/activities\n  ?document=renewal-email\n  &actor=pricing-agent"}</DarkPanel>
    </div>
  ),

  "solutions/ai-native-saas/fm/memory": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="precedent"
        body={"This team approved net-30 terms for enterprise accounts last quarter. Surfaced so review stays consistent."}
      />
    </div>
  ),

  "solutions/ai-native-saas/fm/presence": (
    <div className="pv">
      <AvatarStack
        users={[
          { initials: "PA", kind: "agent", name: "Pricing Agent" },
          { initials: "DV", kind: "human", name: "Dana" },
        ]}
      />
      <CursorTag name="Pricing Agent" kind="agent" style={{ marginTop: 14 }} />
    </div>
  ),
};
