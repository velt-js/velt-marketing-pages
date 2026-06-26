import type { CSSProperties, ReactNode } from "react";

import { AuditLog, DarkPanel, NotifItem } from "../demos";
import { CrmPipelineBoard } from "./crm-board";

// Simulated-UI demo nodes for the static /platform (Admin Console) page. These
// are referenced directly by app/platform/content.tsx (a local content module,
// not Sanity) so the page renders fully client-side with no CMS dependency.
// Visuals are simulated console surfaces, not live product screenshots.

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
 * A labelled console panel chrome (header + body) used across the console demos.
 * @param {{ title: ReactNode; right?: ReactNode; children: ReactNode; style?: CSSProperties }} props Panel content.
 * @returns {JSX.Element} The console panel.
 */
function ConsolePanel({
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

type Bar = { label: string; value: number; agent?: boolean };

/**
 * Weekly usage bar chart. One series can be flagged `agent` to render the
 * accent color, so the both-actors rule reads in the analytics view.
 * @param {{ bars: Bar[]; unit?: string }} props Chart data.
 * @returns {JSX.Element} The bar chart.
 */
function UsageChart({ bars, unit }: { bars: Bar[]; unit?: string }) {
  const max = Math.max(...bars.map((bar) => bar.value), 1);
  return (
    <div style={{ display: "grid", gap: 9 }}>
      {bars.map((bar) => (
        <div key={bar.label} style={{ display: "grid", gridTemplateColumns: "70px 1fr 42px", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--vlp-color-text-muted)" }}>{bar.label}</span>
          <span style={{ height: 9, borderRadius: 5, background: "var(--vlp-bg-section-alt)", overflow: "hidden" }}>
            <span
              style={{
                display: "block",
                height: "100%",
                width: `${Math.round((bar.value / max) * 100)}%`,
                background: bar.agent ? "var(--vlp-color-accent)" : "var(--vlp-color-ink)",
                borderRadius: 5,
              }}
            />
          </span>
          <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10.5, color: "var(--vlp-color-ink-soft)", textAlign: "right" }}>
            {bar.value}
            {unit ? <span style={{ color: "var(--vlp-color-text-subtle)" }}>{unit}</span> : null}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * A small chat exchange used by the AI-chat console demo.
 * @param {{ rows: { who: "you" | "velt"; text: ReactNode }[] }} props Chat rows.
 * @returns {JSX.Element} The chat thread.
 */
function ChatThread({ rows }: { rows: { who: "you" | "velt"; text: ReactNode }[] }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {rows.map((row, index) => (
        <div
          key={index}
          style={{
            justifySelf: row.who === "you" ? "end" : "start",
            maxWidth: "86%",
            fontSize: 12,
            lineHeight: 1.45,
            padding: "8px 11px",
            borderRadius: 10,
            color: row.who === "you" ? "#fff" : "var(--vlp-color-ink-soft)",
            background: row.who === "you" ? "var(--vlp-color-ink)" : "var(--vlp-bg-section-alt)",
            border: row.who === "you" ? "none" : "1px solid var(--vlp-border-subtle)",
          }}
        >
          {row.text}
        </div>
      ))}
    </div>
  );
}

/**
 * Key-value config rows used by the feature-configuration and debugger demos.
 * @param {{ rows: { k: string; v: ReactNode; on?: boolean }[] }} props Config rows.
 * @returns {JSX.Element} The config list.
 */
function ConfigRows({ rows }: { rows: { k: string; v: ReactNode; on?: boolean }[] }) {
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
          {typeof row.on === "boolean" ? (
            <span
              style={{
                width: 30,
                height: 17,
                borderRadius: 999,
                background: row.on ? "var(--vlp-color-accent)" : "var(--vlp-border-default)",
                position: "relative",
                flex: "none",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: row.on ? 15 : 2,
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: "#fff",
                }}
              />
            </span>
          ) : (
            <span style={{ color: "var(--vlp-color-text-muted)" }}>{row.v}</span>
          )}
        </div>
      ))}
    </div>
  );
}

const REST_PROVISION = `POST /v2/workspace/apikey/create
Authorization: Bearer sk_live_***

{ "name": "tenant-acme", "environment": "production" }`;

const WEBHOOK_PAYLOAD = `POST https://api.acme.com/velt-hooks
x-velt-signature: t=1718,v1=9f2c...

{
  "event": "comment.added",
  "user": { "type": "agent", "name": "Brand Agent" },
  "documentId": "filing-q3"
}`;

/** The console Data tab: a mixed human + agent activity list with consent. */
const DATA_SCENE: ReactNode = (
  <ConsolePanel title="Data · filing-q3 · activity" right="export ↓">
    <AuditLog
      style={{ boxShadow: "none", width: "100%", border: "none" }}
      rows={[
        { ts: "09:02", ev: <><strong>Brand Agent</strong> flagged a pricing claim</>, chip: { label: "agent", kind: "agent" } },
        { ts: "09:14", ev: <><strong>Maya</strong> replied with a source</>, chip: { label: "human", kind: "pending" } },
        { ts: "09:21", ev: <><strong>Sarah</strong> approved the change</>, chip: { label: "approved", kind: "approved" } },
        { ts: "09:21", ev: <><strong>Webhook</strong> review.approved delivered</>, chip: { label: "200", kind: "approved" } },
      ]}
    />
  </ConsolePanel>
);

// Keyed lookup the content module reads from. Keys are local to this page.
export const PLATFORM_DEMOS: Record<string, ReactNode> = {
  "hero/analytics": (
    <ConsolePanel title="Adoption · last 6 weeks" right="active collaborators">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/t1COey189fyBfnbEbl5sk6zweU.png"
        alt="Adoption analytics: 200 hours of engagement, 4,255 active collaborators, 55.4k comments added, 87.3k notifications added"
        style={{ display: "block", width: "100%", height: "auto", borderRadius: "var(--vlp-radius-card)" }}
      />
      <p className="code-microcopy" style={{ marginTop: 12 }}>engagement climbing, agents counted as users, type agent</p>
    </ConsolePanel>
  ),
  "hero/ai-chat": (
    <ConsolePanel title="AI chat · ask your console" right="beta">
      <ChatThread
        rows={[
          { who: "you", text: "Which documents had the most review activity last week?" },
          { who: "velt", text: <>Top 3: filing-q3 (142 events), proposal-acme (98), launch-brief (61). Want a CSV?</> },
        ]}
      />
    </ConsolePanel>
  ),
  "hero/debugger": (
    <ConsolePanel title="Live debugger · state" right="streaming">
      <ConfigRows
        rows={[
          { k: "veltClient", v: "ready" },
          { k: "document", v: "filing-q3" },
          { k: "users.online", v: "4 (1 agent)" },
          { k: "lastEvent", v: "comment.added" },
        ]}
      />
    </ConsolePanel>
  ),
  "hero/data": DATA_SCENE,
  "hero/webhooks": <DarkPanel footer="signed · retried · transform + encryption">{WEBHOOK_PAYLOAD}</DarkPanel>,

  "what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      {DATA_SCENE}
      <p className="code-microcopy">run it, watch it, prove it: humans and agents in one console</p>
    </div>
  ),

  "showcase/adoption-analytics": (
    <div className="pv">
      <UsageChart
        unit="h"
        bars={[
          { label: "Engaged", value: 96 },
          { label: "Comments", value: 142 },
          { label: "Agents", value: 38, agent: true },
        ]}
      />
    </div>
  ),
  "showcase/ai-chat": (
    <div className="pv">
      <ChatThread
        rows={[
          { who: "you", text: "How many monthly active documents this cycle?" },
          { who: "velt", text: "1,284, up 12% week over week." },
        ]}
      />
    </div>
  ),
  "showcase/live-debugger": (
    <div className="pv">
      <ConfigRows
        rows={[
          { k: "event", v: "comment.added" },
          { k: "component", v: "VeltComments" },
          { k: "status", v: "delivered" },
        ]}
      />
    </div>
  ),
  "showcase/devtools": (
    <div className="pv">
      <ConsolePanel title="DevTools · Events" right="search">
        <AuditLog
          style={{ boxShadow: "none", width: "100%", border: "none" }}
          rows={[
            { ts: "live", ev: <><strong>Document is Set</strong></>, chip: { label: "evt", kind: "approved" } },
            { ts: "live", ev: <><strong>Comment is Added</strong></>, chip: { label: "agent", kind: "agent" } },
          ]}
        />
      </ConsolePanel>
    </div>
  ),
  "showcase/data-explorer": (
    <div className="pv">
      <DarkPanel footer="JSON · CSV">{"GET /v2/comments?document=filing-q3\n→ 142 records · export ready"}</DarkPanel>
    </div>
  ),
  "showcase/feature-configs": (
    <div className="pv">
      <ConfigRows
        rows={[
          { k: "comments", v: "", on: true },
          { k: "recorder", v: "", on: true },
          { k: "minimap", v: "", on: false },
        ]}
      />
    </div>
  ),
  "showcase/rest-apis": (
    <div className="pv">
      <DarkPanel>{REST_PROVISION}</DarkPanel>
    </div>
  ),
  "showcase/webhooks": (
    <div className="pv">
      <DarkPanel footer="retries · rate limiting · 2-way Slack sync">{"event: comment.added → 200 OK\nevent: review.approved → 200 OK"}</DarkPanel>
    </div>
  ),

  "make-it-yours/look": (
    <div className="pv">
      <ConsolePanel title="Your dashboard" right="via REST">
        <UsageChart bars={[{ label: "Acme", value: 88 }, { label: "Globex", value: 61 }]} />
      </ConsolePanel>
    </div>
  ),
  "make-it-yours/behavior": (
    <div className="pv">
      <DarkPanel>{"webhook.transform = (e) => redact(e)\nencryption.key = cmek://acme"}</DarkPanel>
    </div>
  ),

  "in-production/sales": <CrmPipelineBoard />,
  "in-production/fintech": (
    <AuditLog
      head={{ left: "Compliance · monthly active docs", right: "examiner export" }}
      rows={[
        { ts: "Mon", ev: "1,284 monthly active documents", chip: { label: "metric", kind: "pending" } },
        { ts: "Tue", ev: "Immutable record exported", chip: { label: "json", kind: "approved" } },
      ]}
    />
  ),
  "in-production/operations": (
    <AuditLog
      head={{ left: "Ops · integration health", right: "live debugger" }}
      rows={[
        { ts: "09:00", ev: "Webhook delivery retried", chip: { label: "retry", kind: "pending" } },
        { ts: "09:01", ev: "Event routed to ops stack", chip: { label: "200", kind: "approved" } },
      ]}
    />
  ),
  "in-production/ai": (
    <AuditLog
      head={{ left: "AI-native · agent oversight", right: "analytics" }}
      rows={[
        { ts: "00:01", ev: <><strong>Agent</strong> proposed change</>, chip: { label: "agent", kind: "agent" } },
        { ts: "00:14", ev: "Human approved, webhook fired", chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "related/audit-trail": (
    <div className="pv">
      <NotifItem title={<><strong>review.approved</strong> recorded</>} meta="immutable record" chip={{ label: "log", kind: "approved" }} />
    </div>
  ),
  "related/webhooks": (
    <div className="pv">
      <DarkPanel>{"event → your endpoint\n200 OK"}</DarkPanel>
    </div>
  ),
  "related/self-hosting": (
    <div className="pv">
      <ConfigRows rows={[{ k: "dataProvider", v: "your-db" }, { k: "PII", v: "on your infra" }]} />
    </div>
  ),
  "related/notifications": (
    <div className="pv">
      <NotifItem avatar={{ initials: "SA", kind: "human" }} title="Sarah approved your change" meta="2m ago" chip={{ label: "sent", kind: "approved" }} />
    </div>
  ),
};
