import type { ReactNode } from "react";

import { AuditLog, NotifItem, Precedent, DarkPanel, ProvRow, ProvArrow, AvatarStack, CursorTag } from "../demos";

// Simulated-UI demo nodes for the /solutions/ai-native-saas page. Keys are
// listed (pure-data) in ./solutions-ai-native-saas.keys.ts and merged into the
// shared registry by ../demo-registry.tsx. Visuals are simulated, not live SDK
// instances. Voice is AI-native SaaS: the generated draft, the agent's output,
// the model-produced change, the run, the user's data. Agents propose through
// the customer's own API; humans approve; the webhook applies the change.

/**
 * Compact framed "artifact" panel (a generated draft awaiting approval) with a
 * label header. Keeps the AI-native artifact visible across hero and the loop.
 * @param {{ label: string; children: ReactNode }} props Panel label + body.
 * @returns {JSX.Element} The artifact panel.
 */
function Artifact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden", background: "var(--bg)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "9px 13px",
          borderBottom: "1px solid var(--line-soft)",
          fontFamily: "var(--mono)",
          fontSize: 11.5,
          color: "var(--muted)",
        }}
      >
        <span>{label}</span>
        <span className="chip chip-pending">awaiting approval</span>
      </div>
      <div style={{ padding: 14, display: "grid", gap: 10 }}>{children}</div>
    </div>
  );
}

export const SOLUTIONS_AI_NATIVE_SAAS_DEMOS: Record<string, ReactNode> = {
  "solutions/ai-native-saas/hero": (
    <Artifact label="Renewal email · generated draft">
      <div
        style={{
          height: 64,
          borderRadius: 8,
          background: "linear-gradient(120deg, var(--brand-soft), var(--bg-wash))",
          display: "grid",
          placeItems: "center",
          fontFamily: "var(--heading)",
          fontWeight: 700,
          color: "var(--brand-ink)",
        }}
      >
        Renewal price updated to $4,800/yr
      </div>
      <NotifItem
        avatar={{ initials: "PA", kind: "agent", name: "Pricing Agent" }}
        title={
          <>
            <strong>Pricing Agent</strong> · Updated the renewal price to match the new plan table. Payload attached.
          </>
        }
        meta="anchored to the price field · proposed, not applied"
        chip={{ label: "agent", kind: "agent" }}
        actions
      />
      <NotifItem
        avatar={{ initials: "DV", kind: "human", name: "Dana · Account owner" }}
        title={
          <>
            <strong>Dana</strong> · Approved. Fire the webhook for this account.
          </>
        }
        meta="human approver"
        chip={{ label: "human", kind: "pending" }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span className="chip chip-approved">webhook 200 · change applied</span>
      </div>
    </Artifact>
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
