import type { ReactNode } from "react";

import { AuditLog, DarkPanel, ProvRow, ProvArrow, NotifItem } from "../demos";

// Simulated-UI demo nodes for the /new-features/notifications page. Keys match
// components/feature-new/demo-keys.ts; resolved by demo-registry.tsx.

/**
 * A simulated notifications inbox panel with a tab row and notification items.
 * @param {{ tab?: string; children: ReactNode }} props Panel content.
 * @returns {JSX.Element} Inbox panel.
 */
function Inbox({ tab = "For You", children }: { tab?: string; children: ReactNode }) {
  const tabs = ["For You", "Document", "All"];
  return (
    <div className="audit" style={{ padding: 0, overflow: "hidden" }}>
      <div className="audit-head" style={{ display: "flex", gap: 14 }}>
        {tabs.map((label) => (
          <span key={label} style={{ fontWeight: label === tab ? 700 : 400, opacity: label === tab ? 1 : 0.5 }}>
            {label}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}

export const NOTIFICATIONS_DEMOS: Record<string, ReactNode> = {
  "notifications/hero/inbox": (
    <Inbox>
      <NotifItem
        avatar={{ initials: "MR", kind: "agent" }}
        title={<><strong>Margin Review Agent</strong> flagged 3 pricing claims on the Q3 deck</>}
        meta="2m ago · opens to findings"
        actions
      />
      <NotifItem
        avatar={{ initials: "MA", kind: "human" }}
        title={<><strong>Maya</strong> assigned you the contract sign-off</>}
        meta="due Friday"
        chip={{ label: "assigned", kind: "pending" }}
      />
      <NotifItem
        avatar={{ initials: "12", kind: "human" }}
        title={<>12 updates on the Acme renewal, batched</>}
        meta="digest"
        chip={{ label: "digest", kind: "approved" }}
      />
    </Inbox>
  ),

  "notifications/hero/email": (
    <DarkPanel footer="delivered via your SendGrid account or any service via webhooks">
      {"To: reviewer@acme.com\nSubject: Sign-off requested — Q3 forecast\n\nMaya mentioned you on \"Q3 forecast\"\n> Can you approve the revised projections?\n\n[ Open in app ]"}
    </DarkPanel>
  ),

  "notifications/hero/slack": (
    <DarkPanel footer="comment + review events fire to your endpoint; route to any channel">
      {"POST https://hooks.slack.com/...\n{\n  \"event\": \"comment.mention\",\n  \"text\": \"Maya needs sign-off on Q3\",\n  \"link\": \"app.acme.com/forecast\"\n}"}
    </DarkPanel>
  ),

  "notifications/hero/preferences": (
    <div style={{ display: "grid", gap: 10, padding: 18 }}>
      <div className="int-chips">
        <span className="int-chip"><i />In-app · ALL</span>
        <span className="int-chip"><i />Email · MINE</span>
        <span className="int-chip"><i />Slack · NONE</span>
      </div>
      <p className="code-microcopy">per channel · per document or org-wide</p>
    </div>
  ),

  "notifications/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <Inbox>
        <NotifItem
          avatar={{ initials: "MR", kind: "agent" }}
          title={<><strong>Margin Review Agent</strong> flagged 3 pricing claims on the Q3 deck</>}
          meta="opens to findings"
          actions
        />
        <NotifItem
          avatar={{ initials: "MA", kind: "human" }}
          title={<><strong>Maya</strong> assigned you the contract sign-off, due Friday</>}
          chip={{ label: "human", kind: "pending" }}
        />
        <NotifItem
          avatar={{ initials: "12", kind: "human" }}
          title={<>12 updates on the Acme renewal, batched</>}
          chip={{ label: "digest", kind: "approved" }}
        />
      </Inbox>
      <p className="code-microcopy">one feed, both actor types, consent where the agent's work lands</p>
    </div>
  ),

  "notifications/showcase/inbox": (
    <div className="pv">
      <Inbox>
        <NotifItem title={<>mention · “@you can you review?”</>} chip={{ label: "For You", kind: "pending" }} />
        <NotifItem title={<>reply on the Q3 thread</>} chip={{ label: "Document", kind: "approved" }} />
      </Inbox>
    </div>
  ),

  "notifications/showcase/email": (
    <div className="pv">
      <DarkPanel>{"mention → email via SendGrid\nfirstComment, latestComment,\nactionType, documentMetadata"}</DarkPanel>
    </div>
  ),

  "notifications/showcase/batching": (
    <div className="pv">
      <ProvRow>
        burst of 40 pings <ProvArrow /> 1 digest
      </ProvRow>
      <ProvRow>
        already-seen <ProvArrow /> suppressed
      </ProvRow>
    </div>
  ),

  "notifications/showcase/preferences": (
    <div className="pv">
      <div className="int-chips">
        <span className="int-chip"><i />ALL</span>
        <span className="int-chip"><i />MINE</span>
        <span className="int-chip"><i />NONE</span>
      </div>
    </div>
  ),

  "notifications/showcase/custom": (
    <div className="pv">
      <DarkPanel>{"POST /v2/notifications\n{ \"type\": \"deadline\",\n  \"to\": \"reviewer\",\n  \"body\": \"sign-off due 5pm\" }"}</DarkPanel>
    </div>
  ),

  "notifications/showcase/webhooks": (
    <div className="pv">
      <ProvRow>
        comment.added <ProvArrow /> your endpoint
      </ProvRow>
      <ProvRow>
        your endpoint <ProvArrow /> Slack / any channel
      </ProvRow>
    </div>
  ),

  "notifications/showcase/agents": (
    <div className="pv">
      <Inbox>
        <NotifItem
          avatar={{ initials: "AG", kind: "agent" }}
          title={<><strong>Agent</strong> finished overnight · approve-or-reject queue</>}
          meta="found at 9am"
          actions
        />
      </Inbox>
    </div>
  ),

  "notifications/showcase/permissions": (
    <div className="pv">
      <ProvRow>
        counterparty <ProvArrow /> sees their thread
      </ProvRow>
      <ProvRow>
        internal deliberation <ProvArrow /> never reaches them
      </ProvRow>
    </div>
  ),

  "notifications/showcase/self-host": (
    <div className="pv">
      <ProvRow>
        notification content <ProvArrow /> your servers
      </ProvRow>
      <ProvRow>
        Velt stores <ProvArrow /> minimal identifiers
      </ProvRow>
    </div>
  ),

  "notifications/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>Notifications Tool (bell)</ProvRow>
      <ProvRow>Notifications Panel (page)</ProvRow>
      <ProvRow>wireframes + primitives</ProvRow>
    </div>
  ),

  "notifications/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>custom events via REST</ProvRow>
      <ProvRow>config API · per doc / org</ProvRow>
      <ProvRow>batching + delay in console</ProvRow>
    </div>
  ),

  "notifications/in-production/sales": (
    <Inbox>
      <NotifItem title={<>Brand review request</>} meta="in-app, email, or their channel" chip={{ label: "sent", kind: "approved" }} />
      <NotifItem title={<>Approver saw their turn today, not Thursday</>} chip={{ label: "on time", kind: "approved" }} />
    </Inbox>
  ),

  "notifications/in-production/fintech": (
    <Inbox>
      <NotifItem title={<>Sign-off on Q3 forecast</>} meta="one digest, not a ping per cell" chip={{ label: "digest", kind: "approved" }} />
      <NotifItem title={<>Close calendar holds</>} chip={{ label: "no waits", kind: "approved" }} />
    </Inbox>
  ),

  "notifications/in-production/ops": (
    <Inbox>
      <NotifItem title={<>Shipment exception · your team in-app</>} chip={{ label: "team", kind: "pending" }} />
      <NotifItem title={<>Counterparty by email · each sees their side</>} chip={{ label: "scoped", kind: "approved" }} />
    </Inbox>
  ),

  "notifications/in-production/ai": (
    <Inbox>
      <NotifItem avatar={{ initials: "AG", kind: "agent" }} title={<>Agent findings land the moment the run completes</>} chip={{ label: "batched", kind: "agent" }} />
      <NotifItem title={<>Moves to a human decision</>} chip={{ label: "review", kind: "pending" }} />
    </Inbox>
  ),

  "notifications/related/comments": (
    <div className="pv">
      <ProvRow>
        every thread event <ProvArrow /> the inbox
      </ProvRow>
    </div>
  ),

  "notifications/related/approval-flows": (
    <div className="pv">
      <ProvRow>
        reviewers see their turn <ProvArrow /> pipeline completes
      </ProvRow>
    </div>
  ),

  "notifications/related/review-agents": (
    <div className="pv">
      <AuditLog
        rows={[{ ts: "AI", ev: <><strong>Agent</strong> findings reach a human via the feed</>, chip: { label: "agent", kind: "agent" } }]}
      />
    </div>
  ),
};
