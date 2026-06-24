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

// Legacy product-capture videos restored from the old DevTools page. Each maps
// to a hero tab and its matching showcase card (Overview, Data, Events,
// Components, Versions).
const VIDEO_BASE = "/videos/features/dev-tools";

/**
 * Autoplaying, looping, muted product-capture video used for the hero tabs and
 * showcase previews. Restores the real DevTools footage from the legacy page.
 * @param {{ src: string; label: string }} props Video source and accessible label.
 * @returns {JSX.Element} The looping demo video.
 */
function DemoVideo({ src, label }: { src: string; label: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      style={{
        width: "100%",
        display: "block",
        borderRadius: "var(--vlp-radius-lg)",
        border: "1px solid var(--vlp-border-subtle)",
        background: "#000",
      }}
    />
  );
}

// Keyed lookup the content module reads from. Keys are local to this page.
export const DEVTOOLS_DEMOS: Record<string, ReactNode> = {
  "hero/overview": (
    <DemoVideo src={`${VIDEO_BASE}/get-the-overview.mp4`} label="Velt DevTools installation overview" />
  ),

  "hero/data": (
    <DemoVideo src={`${VIDEO_BASE}/access-data.mp4`} label="Velt DevTools data inspector" />
  ),

  "hero/events": (
    <DemoVideo src={`${VIDEO_BASE}/observe-event-stream.mp4`} label="Velt DevTools live event stream" />
  ),

  "hero/components": (
    <DemoVideo src={`${VIDEO_BASE}/inspect-components.mp4`} label="Velt DevTools component inspector" />
  ),

  "hero/versions": (
    <DemoVideo src={`${VIDEO_BASE}/test-with-any-sdk-version.mp4`} label="Velt DevTools SDK version switching" />
  ),

  "what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
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
    <DemoVideo src={`${VIDEO_BASE}/get-the-overview.mp4`} label="Velt DevTools installation overview" />
  ),

  "showcase/data-inspector": (
    <DemoVideo src={`${VIDEO_BASE}/access-data.mp4`} label="Velt DevTools data inspector" />
  ),

  "showcase/live-event-stream": (
    <DemoVideo src={`${VIDEO_BASE}/observe-event-stream.mp4`} label="Velt DevTools live event stream" />
  ),

  "showcase/component-inspector": (
    <DemoVideo src={`${VIDEO_BASE}/inspect-components.mp4`} label="Velt DevTools component inspector" />
  ),

  "showcase/sdk-version-switching": (
    <DemoVideo src={`${VIDEO_BASE}/test-with-any-sdk-version.mp4`} label="Velt DevTools SDK version switching" />
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
      <DarkPanel>{"npx -y @velt-js/mcp-installer\n# docs + setup for agents"}</DarkPanel>
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
