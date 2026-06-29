import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, ProvRow, ProvArrow } from "../demos";
import {
  Av,
  FACES,
  IconAgentMark,
  IconArrowRight,
  IconCheck,
  IconX,
} from "./hero-surface";
import { AiNativeBoard } from "./ai-board";

import "./solutions-ai-native-saas-showcase.css";

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

/** @returns {JSX.Element} Open-book glyph for the precedent citation pill. */
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6c-2-1.4-4.5-1.5-7-1v12c2.5-.5 5-.4 7 1 2-1.4 4.5-1.5 7-1V5c-2.5-.5-5-.4-7 1z" />
      <path d="M12 6v12" />
    </svg>
  );
}

export const SOLUTIONS_AI_NATIVE_SAAS_DEMOS: Record<string, ReactNode> = {
  // Hero artifact: the light-mode AI app-builder board, rendered wide so it
  // bleeds off the right edge of the hero (same treatment as the other solution
  // heroes). Light + bleed CSS lives alongside the .ai-board base in ../styles.css.
  "solutions/ai-native-saas/hero": <AiNativeBoard light />,

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
        heading="Audit entry"
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
      <div className="sai-card">
        <div className="sai-cmt-head">
          <Av initials="PA" agent />
          <span className="sai-cmt-name">Pricing Agent</span>
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">2m</span>
        </div>
        <p className="sai-cmt-body">
          Anchored to the exact <strong>cell</strong> it proposes to change, with Approve and Reject.
        </p>
        <div className="sai-acts">
          <span className="chip chip-approved">Approve</span>
          <span className="chip chip-rejected">Reject</span>
        </div>
        <p className="sai-foot">An agent is just a user with type agent.</p>
      </div>
    </div>
  ),

  "solutions/ai-native-saas/fm/suggestions": (
    <div className="pv">
      <div className="sai-card">
        <span className="sai-cap">model-produced change</span>
        <div className="sai-diff">
          <span className="sai-del">renews at $3,900</span>
          <span className="sai-arrow"><IconArrowRight /></span>
          <span className="sai-ins">renews at $4,800</span>
        </div>
        <p className="sai-foot">Accept fires your webhook; reject leaves the data untouched.</p>
      </div>
    </div>
  ),

  "solutions/ai-native-saas/fm/approval-flows": (
    <div className="pv">
      <div className="sai-card sai-chain">
        <div className="sai-step">
          <span className="sai-step-ic sai-step-ic--ok"><IconCheck /></span>
          <span className="sai-step-name">owner</span>
          <span className="chip chip-approved">passed</span>
        </div>
        <div className="sai-step">
          <span className="sai-step-ic sai-step-ic--ok"><IconCheck /></span>
          <span className="sai-step-name">team quorum</span>
          <span className="chip chip-approved">passed</span>
        </div>
        <div className="sai-step">
          <span className="sai-step-ic sai-step-ic--wait"><IconX /></span>
          <span className="sai-step-name">type-the-name confirm</span>
          <span className="chip chip-pending">pending</span>
        </div>
      </div>
    </div>
  ),

  "solutions/ai-native-saas/fm/audit-trail": (
    <div className="pv">
      <div className="sai-card">
        <div className="sai-cap-row">
          <span className="sai-cap">activity · recorded</span>
          <span className="chip chip-approved">signed</span>
        </div>
        <div className="sai-kv">
          <div className="sai-kv-row">
            <span className="sai-kv-key">event</span>
            <span className="sai-kv-val">activities.get</span>
          </div>
          <div className="sai-kv-row">
            <span className="sai-kv-key">documentId</span>
            <span className="sai-kv-val">renewal-email</span>
          </div>
          <div className="sai-kv-row">
            <span className="sai-kv-key">userId</span>
            <span className="sai-kv-val">pricing-agent</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "solutions/ai-native-saas/fm/memory": (
    <div className="pv">
      <div className="sai-card">
        <div className="sai-cap-row">
          <span className="sai-cap">precedent</span>
          <span className="sai-cite"><IconBook />net-30 terms</span>
        </div>
        <div className="sai-mrow">
          <Av initials="DV" tone="a2" img={FACE.dana} />
          <span className="sai-mrow-main">
            <span className="sai-mrow-name">Enterprise net-30 approved</span>
            <span className="sai-mrow-meta">last quarter · cited</span>
          </span>
          <span className="chip chip-approved">approved</span>
        </div>
        <p className="sai-foot">Surfaced so review stays consistent.</p>
      </div>
    </div>
  ),

  "solutions/ai-native-saas/fm/presence": (
    <div className="pv">
      <div className="sai-card">
        <div className="sai-cap-row">
          <span className="sai-cap">on this doc</span>
          <span className="sai-stack" aria-hidden="true">
            <Av initials="PA" agent />
            <Av initials="DV" tone="a2" img={FACE.dana} />
          </span>
        </div>
        <div className="sai-roster">
          <div className="sai-prow">
            <span className="sai-ava">
              <Av initials="PA" agent />
              <span className="sai-dot" />
            </span>
            <span className="sai-prow-name">Pricing Agent</span>
            <span className="apf-tag apf-tag--agent"><IconAgentMark />agent</span>
          </div>
          <div className="sai-prow">
            <span className="sai-ava">
              <Av initials="DV" tone="a2" img={FACE.dana} />
              <span className="sai-dot" />
            </span>
            <span className="sai-prow-name">Dana</span>
            <span className="apf-tag apf-tag--human">human</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
