import type { CSSProperties, ReactNode } from "react";

import { AuditLog, DarkPanel, NotifItem } from "../demos";

// Simulated-UI demo nodes for the static /devtools (Chrome extension) page.
// Referenced directly by app/devtools/content.tsx (a local content module,
// not Sanity) so the page renders fully client-side with no CMS dependency.
// Visuals are simulated extension panels, not live product screenshots.
// No em dashes, no en dashes: commas, colons, periods only.

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

const TAB_BAR: CSSProperties = {
  display: "flex",
  gap: 0,
  borderBottom: "1px solid var(--vlp-border-subtle)",
  background: "var(--vlp-bg-section-alt)",
};

/**
 * A labelled extension panel chrome (header + tab bar + body) used across devtools demos.
 * @param {{ title: ReactNode; right?: ReactNode; tabs?: string[]; activeTab?: string; children: ReactNode; style?: CSSProperties }} props Panel content.
 * @returns {JSX.Element} The extension panel.
 */
function ExtPanel({
  title,
  right,
  tabs,
  activeTab,
  children,
  style,
}: {
  title: ReactNode;
  right?: ReactNode;
  tabs?: string[];
  activeTab?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div style={{ ...PANEL, ...style }}>
      <div style={PANEL_HEAD}>
        <span>{title}</span>
        {right ? <span style={MONO}>{right}</span> : null}
      </div>
      {tabs ? (
        <div style={TAB_BAR}>
          {tabs.map((tab) => (
            <span
              key={tab}
              style={{
                padding: "7px 13px",
                fontSize: 11,
                fontWeight: tab === activeTab ? 600 : 400,
                color: tab === activeTab ? "var(--vlp-color-ink)" : "var(--vlp-color-text-muted)",
                borderBottom: tab === activeTab ? "2px solid var(--vlp-color-accent)" : "2px solid transparent",
                cursor: "default",
              }}
            >
              {tab}
            </span>
          ))}
        </div>
      ) : null}
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  );
}

/**
 * Key-value config rows used by the overview and component inspector demos.
 * @param {{ rows: { k: string; v: ReactNode }[] }} props Config rows.
 * @returns {JSX.Element} The config list.
 */
function KvRows({ rows }: { rows: { k: string; v: ReactNode }[] }) {
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
            padding: "8px 2px",
            borderTop: index ? "1px solid var(--vlp-border-subtle)" : "none",
            fontSize: 12,
          }}
        >
          <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 11, color: "var(--vlp-color-ink-soft)" }}>{row.k}</span>
          <span style={{ color: "var(--vlp-color-text-muted)", fontSize: 11 }}>{row.v}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * A live event stream list used in hero and showcase demos.
 * @param {{ rows: { ts: string; event: string; agent?: boolean }[] }} props Event rows.
 * @returns {JSX.Element} The event stream.
 */
function EventStream({ rows }: { rows: { ts: string; event: string; agent?: boolean }[] }) {
  return (
    <div style={{ display: "grid", gap: 0 }}>
      {rows.map((row, index) => (
        <div
          key={`${row.ts}-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 2px",
            borderTop: index ? "1px solid var(--vlp-border-subtle)" : "none",
            fontSize: 12,
          }}
        >
          <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10.5, color: "var(--vlp-color-text-subtle)", minWidth: 46 }}>{row.ts}</span>
          <span style={{ flex: 1, color: "var(--vlp-color-ink-soft)" }}>{row.event}</span>
          {row.agent ? (
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: 0.4,
                padding: "2px 6px",
                borderRadius: 4,
                background: "var(--vlp-color-accent)",
                color: "#fff",
                flex: "none",
              }}
            >
              AGENT
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/**
 * A version switcher row used in the SDK version switching demo.
 * @param {{ versions: { label: string; active?: boolean }[] }} props Version list.
 * @returns {JSX.Element} The version switcher.
 */
function VersionSwitcher({ versions }: { versions: { label: string; active?: boolean }[] }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {versions.map((ver) => (
        <div
          key={ver.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 10px",
            borderRadius: 6,
            border: ver.active ? "1px solid var(--vlp-color-accent)" : "1px solid var(--vlp-border-subtle)",
            background: ver.active ? "color-mix(in srgb, var(--vlp-color-accent) 8%, transparent)" : "transparent",
            fontSize: 12,
          }}
        >
          <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 11, color: ver.active ? "var(--vlp-color-accent)" : "var(--vlp-color-ink-soft)" }}>
            {ver.label}
          </span>
          {ver.active ? (
            <span style={{ fontSize: 10, color: "var(--vlp-color-accent)", fontWeight: 600 }}>active</span>
          ) : (
            <span style={{ fontSize: 10, color: "var(--vlp-color-text-subtle)" }}>switch</span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Reusable 5-tab chrome for the extension panel used in hero demos. */
const EXT_TABS = ["Overview", "Data", "Events", "Components", "Versions"];

/** The hero Events tab: a mixed human and agent live event stream. */
const HERO_EVENTS: ReactNode = (
  <ExtPanel title="Velt DevTools" right="v2.0.0" tabs={EXT_TABS} activeTab="Events">
    <div style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 11, color: "var(--vlp-color-text-muted)" }}>Live event stream</span>
      <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10, color: "var(--vlp-color-accent)" }}>streaming</span>
    </div>
    <EventStream
      rows={[
        { ts: "09:41:03", event: "Document is Set" },
        { ts: "09:41:08", event: "Comment is Added", agent: true },
        { ts: "09:41:12", event: "Multi Cursor Initiated" },
        { ts: "09:41:19", event: "User Authenticated" },
      ]}
    />
    <p className="code-microcopy" style={{ marginTop: 10 }}>one stream, human and agent events, live</p>
  </ExtPanel>
);

// Keyed lookup the content module reads from. Keys are local to this page.
export const DEVTOOLS_DEMOS: Record<string, ReactNode> = {
  "hero/overview": (
    <ExtPanel title="Velt DevTools" right="v2.0.0" tabs={EXT_TABS} activeTab="Overview">
      <KvRows
        rows={[
          { k: "apiKey", v: "pk_live_***acme" },
          { k: "environment", v: "production" },
          { k: "sdkVersion", v: "2.0.0" },
          { k: "mounted", v: "VeltComments, VeltPresence" },
          { k: "document", v: "proposal-acme" },
        ]}
      />
    </ExtPanel>
  ),

  "hero/data": (
    <ExtPanel title="Velt DevTools" right="v2.0.0" tabs={EXT_TABS} activeTab="Data">
      <KvRows
        rows={[
          { k: "comments", v: "14 threads" },
          { k: "users", v: "3 online" },
          { k: "document", v: "proposal-acme" },
          { k: "locations", v: "6 anchors" },
        ]}
      />
      <p className="code-microcopy" style={{ marginTop: 10 }}>the same data your users see</p>
    </ExtPanel>
  ),

  "hero/events": HERO_EVENTS,

  "hero/components": (
    <ExtPanel title="Velt DevTools" right="v2.0.0" tabs={EXT_TABS} activeTab="Components">
      <div style={{ display: "grid", gap: 8 }}>
        {[
          { name: "VeltComments", status: "mounted" },
          { name: "VeltPresence", status: "mounted" },
          { name: "VeltNotifications", status: "mounted" },
        ].map((comp) => (
          <div
            key={comp.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid var(--vlp-border-subtle)",
              fontSize: 12,
            }}
          >
            <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 11, color: "var(--vlp-color-ink-soft)" }}>{comp.name}</span>
            <span style={{ fontSize: 10, color: "var(--vlp-color-accent)", fontWeight: 600 }}>{comp.status}</span>
          </div>
        ))}
      </div>
    </ExtPanel>
  ),

  "hero/versions": (
    <ExtPanel title="Velt DevTools" right="v2.0.0" tabs={EXT_TABS} activeTab="Versions">
      <VersionSwitcher
        versions={[
          { label: "2.0.0", active: true },
          { label: "1.9.8" },
          { label: "1.9.5" },
        ]}
      />
      <p className="code-microcopy" style={{ marginTop: 10 }}>switch without changing your build</p>
    </ExtPanel>
  ),

  "what-it-is/scene": (
    <div style={{ display: "grid", gap: 14 }}>
      <ExtPanel title="Velt DevTools: Events" right="streaming" tabs={["Events", "Components"]} activeTab="Events">
        <EventStream
          rows={[
            { ts: "09:41:08", event: "Comment is Added" },
            { ts: "09:41:09", event: "Comment is Added", agent: true },
            { ts: "09:41:19", event: "User Authenticated" },
          ]}
        />
      </ExtPanel>
      <p className="code-microcopy">one event stream, human and agent activity, live</p>
    </div>
  ),

  "showcase/installation-overview": (
    <div className="pv">
      <KvRows
        rows={[
          { k: "apiKey", v: "pk_live_***acme" },
          { k: "environment", v: "production" },
          { k: "sdkVersion", v: "2.0.0" },
          { k: "mounted", v: "3 components" },
        ]}
      />
    </div>
  ),

  "showcase/data-inspector": (
    <div className="pv">
      <KvRows
        rows={[
          { k: "comments", v: "14 threads" },
          { k: "users", v: "3 online (1 agent)" },
          { k: "documents", v: "proposal-acme" },
          { k: "locations", v: "6 anchors" },
        ]}
      />
    </div>
  ),

  "showcase/live-event-stream": (
    <div className="pv">
      <EventStream
        rows={[
          { ts: "09:41:03", event: "Document is Set" },
          { ts: "09:41:08", event: "Comment is Added", agent: true },
          { ts: "09:41:12", event: "Multi Cursor Initiated" },
          { ts: "09:41:19", event: "User Authenticated" },
        ]}
      />
    </div>
  ),

  "showcase/component-inspector": (
    <div className="pv">
      <div style={{ display: "grid", gap: 7 }}>
        {[
          { name: "VeltComments", status: "mounted" },
          { name: "VeltPresence", status: "mounted" },
          { name: "VeltNotifications", status: "mounted" },
        ].map((comp) => (
          <div
            key={comp.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "7px 10px",
              borderRadius: 6,
              border: "1px solid var(--vlp-border-subtle)",
              fontSize: 12,
            }}
          >
            <span style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 11, color: "var(--vlp-color-ink-soft)" }}>{comp.name}</span>
            <span style={{ fontSize: 10, color: "var(--vlp-color-accent)", fontWeight: 600 }}>{comp.status}</span>
          </div>
        ))}
      </div>
    </div>
  ),

  "showcase/sdk-version-switching": (
    <div className="pv">
      <VersionSwitcher
        versions={[
          { label: "2.0.0", active: true },
          { label: "1.9.8" },
          { label: "1.9.5" },
        ]}
      />
    </div>
  ),

  "showcase/agent-activity": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%", border: "none" }}
        rows={[
          { ts: "09:41:08", ev: <><strong>Comment is Added</strong></>, chip: { label: "human", kind: "pending" } },
          { ts: "09:41:09", ev: <><strong>Comment is Added</strong></>, chip: { label: "agent", kind: "agent" } },
          { ts: "09:41:19", ev: <><strong>User Authenticated</strong></>, chip: { label: "human", kind: "approved" } },
        ]}
      />
    </div>
  ),

  "make-it-yours/sdk-events": (
    <div className="pv">
      <DarkPanel>{"client.on('commentAdded', (data) => {\n  console.log(data);\n});"}</DarkPanel>
    </div>
  ),

  "in-production/ai-native": (
    <AuditLog
      head={{ left: "AI-native SaaS: agent oversight", right: "live stream" }}
      rows={[
        { ts: "09:41", ev: <><strong>Agent</strong> Comment is Added</>, chip: { label: "agent", kind: "agent" } },
        { ts: "09:42", ev: "Agent event confirmed, fired as intended", chip: { label: "verified", kind: "approved" } },
      ]}
    />
  ),

  "in-production/fintech": (
    <AuditLog
      head={{ left: "Fintech: integration verification", right: "events" }}
      rows={[
        { ts: "10:01", ev: "Document is Set: correct documentId", chip: { label: "verified", kind: "approved" } },
        { ts: "10:02", ev: "Data: 14 comment threads flowing", chip: { label: "correct", kind: "approved" } },
      ]}
    />
  ),

  "related/admin-console": (
    <div className="pv">
      <NotifItem title={<><strong>console.velt.dev</strong> live</>} meta="analytics, data, webhooks" chip={{ label: "live", kind: "approved" }} />
    </div>
  ),

  "related/webhooks": (
    <div className="pv">
      <DarkPanel>{"event: comment.added\n  → your endpoint\n  200 OK"}</DarkPanel>
    </div>
  ),

  "related/mcp": (
    <div className="pv">
      <DarkPanel>{"npx @veltdev/mcp@latest\n# docs + setup for agents"}</DarkPanel>
    </div>
  ),

  "related/audit-trail": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%", border: "none" }}
        rows={[
          { ts: "09:41", ev: <><strong>review.approved</strong> recorded</>, chip: { label: "log", kind: "approved" } },
        ]}
      />
    </div>
  ),
};
