import type { CSSProperties, ReactNode } from "react";

import { AuditLog, DarkPanel, NotifItem } from "../demos";
import { AiNativeBoard } from "./ai-board";
import { CrmPipelineBoard } from "./crm-board";
import { FintechBoard } from "./fintech-board";
import { OperationsBoard } from "./ops-board";

// Simulated-UI demo nodes for the static /webhooks-and-api feature page. These
// are referenced directly by app/webhooks-and-api/content.tsx (a local content
// module, not Sanity) so the page renders fully client-side with no CMS
// dependency. Visuals are simulated REST / webhook surfaces, not live captures.

const PANEL: CSSProperties = {
  border: "1px solid var(--vlp-border-default)",
  borderRadius: "var(--vlp-radius-xl)",
  background: "var(--vlp-bg-page)",
  boxShadow: "var(--vlp-shadow-sm)",
  overflow: "hidden",
  fontSize: 12,
};
const PANEL_HEAD: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 14px",
  background: "var(--vlp-bg-section-alt)",
  borderBottom: "1px solid var(--vlp-border-subtle)",
  fontSize: 11.5,
  fontWeight: 500,
  color: "var(--vlp-color-text-muted)",
};
const MONO: CSSProperties = {
  fontFamily: "var(--vlp-font-mono)",
  fontSize: 10.5,
  color: "var(--vlp-color-accent)",
};

/**
 * A labelled console panel chrome (header + body) used across the demos.
 * @param {{ title: ReactNode; right?: ReactNode; children: ReactNode; style?: CSSProperties }} props Panel content.
 * @returns {JSX.Element} The console panel.
 */
function Panel({
  title,
  right,
  children,
  style,
}: {
  title: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...PANEL, ...style }}>
      <div style={PANEL_HEAD}>
        <span>{title}</span>
        {right ? <span style={MONO}>{right}</span> : null}
      </div>
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  );
}

/**
 * Key-value rows used by the config / endpoint demos.
 * @param {{ rows: { k: string; v: ReactNode }[] }} props Config rows.
 * @returns {JSX.Element} The rows list.
 */
function Rows({ rows }: { rows: { k: string; v: ReactNode }[] }) {
  return (
    <div style={{ display: "grid", gap: 0 }}>
      {rows.map((row, index) => (
        <div
          key={row.k}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "9px 2px",
            borderTop: index ? "1px solid var(--vlp-border-subtle)" : "none",
            fontSize: 12,
          }}
        >
          <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 11, color: "var(--vlp-color-ink-soft)" }}>{row.k}</span>
          <span style={{ color: "var(--vlp-color-text-muted)" }}>{row.v}</span>
        </div>
      ))}
    </div>
  );
}

const REST_CREATE = `POST /v2/organizations/add
Authorization: Bearer sk_live_***

{
  "organizationId": "acme",
  "name": "Acme Corp"
}`;

const WEBHOOK_PAYLOAD = `POST https://api.acme.com/velt-hooks
x-velt-signature: t=1718,v1=9f2c...

{
  "event": "comment.added",
  "user": { "type": "agent", "name": "Brand Agent" },
  "documentId": "filing-q3"
}`;

const TRANSFORM = `// transform the payload before delivery
webhook.transform = (event) => ({
  type: event.event,
  doc: event.documentId,
  actor: redact(event.user)
})`;

/** A REST + webhook scene reused by the hero and the what-it-is sections. */
const FLOW_SCENE: ReactNode = (
  <Panel title="Event delivery · filing-q3" right="signed ↓">
    <AuditLog
      style={{ boxShadow: "none", width: "100%", border: "none" }}
      rows={[
        { ts: "09:02", ev: <><strong>comment.added</strong> fired</>, chip: { label: "agent", kind: "agent" } },
        { ts: "09:02", ev: <><strong>Webhook</strong> delivered to api.acme.com</>, chip: { label: "200", kind: "approved" } },
        { ts: "09:14", ev: <><strong>review.approved</strong> fired</>, chip: { label: "human", kind: "pending" } },
        { ts: "09:14", ev: <><strong>Retry</strong> 1 succeeded after timeout</>, chip: { label: "200", kind: "approved" } },
      ]}
    />
  </Panel>
);

/** Keyed lookup the content module reads from. Keys are local to this page. */
export const WEBHOOKS_DEMOS: Record<string, ReactNode> = {
  "hero/rest": <DarkPanel footer="bearer auth · CRUD on every feature">{REST_CREATE}</DarkPanel>,
  "hero/webhooks": <DarkPanel footer="signed · retried · 200 OK">{WEBHOOK_PAYLOAD}</DarkPanel>,
  "hero/transform": <DarkPanel footer="transform + encrypt before delivery">{TRANSFORM}</DarkPanel>,
  "hero/flow": FLOW_SCENE,

  "what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      {FLOW_SCENE}
      <p className="code-microcopy">one event surface for humans and agents: fire, sign, retry, prove</p>
    </div>
  ),

  "showcase/rest-api": (
    <div className="pv">
      <DarkPanel footer="every Velt feature, server-side">{"GET /v2/comments?documentId=filing-q3\n→ 142 records"}</DarkPanel>
    </div>
  ),
  "showcase/webhooks": (
    <div className="pv">
      <DarkPanel footer="HMAC SHA-256 · x-velt-signature">{"event: comment.added → 200 OK\nevent: review.approved → 200 OK"}</DarkPanel>
    </div>
  ),
  "showcase/slack-sync": (
    <div className="pv">
      <NotifItem
        avatar={{ initials: "SL", kind: "human" }}
        title={<><strong>#filing-q3</strong> · new comment synced to Slack</>}
        meta="two-way sync · reply from Slack"
        chip={{ label: "synced", kind: "approved" }}
      />
    </div>
  ),
  "showcase/transforms": (
    <div className="pv">
      <DarkPanel>{TRANSFORM}</DarkPanel>
    </div>
  ),
  "showcase/encryption": (
    <div className="pv">
      <Panel title="Webhook config" right="byok">
        <Rows
          rows={[
            { k: "encryption", v: "cmek://acme" },
            { k: "signature", v: "HMAC SHA-256" },
            { k: "headers", v: "custom" },
          ]}
        />
      </Panel>
    </div>
  ),
  "showcase/recovery": (
    <div className="pv">
      <DarkPanel footer="retries · rate limiting · failure recovery">{"delivery failed → retry 1 (2s)\nretry 1 failed → retry 2 (8s)\nretry 2 → 200 OK"}</DarkPanel>
    </div>
  ),

  "make-it-yours/look": (
    <div className="pv">
      <Panel title="Your pipeline" right="via REST">
        <Rows
          rows={[
            { k: "GET /v2/comments", v: "→ your warehouse" },
            { k: "GET /v2/users", v: "→ your CRM" },
          ]}
        />
      </Panel>
    </div>
  ),
  "make-it-yours/behavior": (
    <div className="pv">
      <DarkPanel>{"webhook.transform = (e) => redact(e)\nwebhook.encryption.key = cmek://acme\nwebhook.headers = { 'x-tenant': id }"}</DarkPanel>
    </div>
  ),

  "in-production/operations": <OperationsBoard />,
  "in-production/fintech": <FintechBoard />,
  "in-production/ai": <AiNativeBoard />,
  "in-production/sales": <CrmPipelineBoard />,

  "related/platform": (
    <div className="pv">
      <Panel title="Admin console" right="config">
        <Rows rows={[{ k: "webhooks", v: "3 endpoints" }, { k: "apiKeys", v: "live + test" }]} />
      </Panel>
    </div>
  ),
  "related/audit-trail": (
    <div className="pv">
      <NotifItem title={<><strong>review.approved</strong> recorded</>} meta="immutable record" chip={{ label: "log", kind: "approved" }} />
    </div>
  ),
  "related/notifications": (
    <div className="pv">
      <NotifItem avatar={{ initials: "SA", kind: "human" }} title="Sarah approved your change" meta="2m ago" chip={{ label: "sent", kind: "approved" }} />
    </div>
  ),
  "related/comments": (
    <div className="pv">
      <NotifItem avatar={{ initials: "MA", kind: "agent" }} title={<><strong>Brand Agent</strong> flagged a pricing claim</>} meta="comment.added" chip={{ label: "agent", kind: "agent" }} />
    </div>
  ),
};
