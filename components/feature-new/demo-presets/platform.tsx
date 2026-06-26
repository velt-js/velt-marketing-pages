import type { CSSProperties, ReactNode } from "react";

import { AuditLog, DarkPanel } from "../demos";
import { AiNativeBoard } from "./ai-board";
import { CrmPipelineBoard } from "./crm-board";
import { FintechBoard } from "./fintech-board";
import { OperationsBoard } from "./ops-board";
import { Av, Composer, FACES, IconCheck, Presence } from "./hero-surface";

import "./platform-showcase.css";

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

// ── Showcase console surfaces ─────────────────────────────────────────────
// The eight Showcase artifacts adopt the comments-page "simulated product UI"
// language (a framed product window with a mono breadcrumb, live presence, and
// status pills) adapted to an admin-console context. Styling lives in
// platform-showcase.css (.pcs-* classes). Personas reuse the shared headshots.

const CONSOLE_APP = "VC";
const WEBHOOK_ENDPOINT = "api.acme.com/velt-hooks";
const REST_REQUEST_BODY = `{ "name": "tenant-acme", "environment": "production" }`;
const REST_RESPONSE_BODY = `{ "apiKey": "ak_live_***", "tenant": "tenant-acme" }`;

const SHOWCASE_FACE = {
  maya: FACES.fenne,
  sarah: FACES.hope,
  kim: FACES.ethan,
} as const;

type AdoptionWeek = { label: string; height: number; accent?: boolean; pin?: boolean };

// Weekly engagement bars: climbing week over week, with the latest week in the
// accent color and a relative-growth pin (agents counted as users throughout).
const ADOPTION_WEEKS: AdoptionWeek[] = [
  { label: "W1", height: 38 },
  { label: "W2", height: 46 },
  { label: "W3", height: 43 },
  { label: "W4", height: 61 },
  { label: "W5", height: 74 },
  { label: "W6", height: 92, accent: true, pin: true },
];

/**
 * Console product-window chrome: the /platform analog of the comments `Frame`.
 * An app glyph plus a mono breadcrumb on the left and an optional right-slot
 * node (live presence, a status pill, an SDK switcher) over a padded body.
 * @param {{ crumb: ReactNode; right?: ReactNode; children: ReactNode }} props Window content.
 * @returns {JSX.Element} The framed console window.
 */
function ConsoleWindow({ crumb, right, children }: { crumb: ReactNode; right?: ReactNode; children: ReactNode }) {
  return (
    <div className="pcs-win">
      <div className="pcs-bar">
        <div className="pcs-crumb">
          <span className="pcs-app">{CONSOLE_APP}</span>
          <span className="file">{crumb}</span>
        </div>
        {right ?? null}
      </div>
      <div className="pcs-body">{children}</div>
    </div>
  );
}

/**
 * A small pulsing "live" status indicator for streaming console surfaces.
 * @param {{ label: string }} props The status label (e.g. "streaming").
 * @returns {JSX.Element} The live indicator.
 */
function LivePill({ label }: { label: string }) {
  return (
    <span className="pcs-live">
      <i />
      {label}
    </span>
  );
}

/** @returns {JSX.Element} Downward-tray glyph for download / export affordances. */
function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
    </svg>
  );
}

/** @returns {JSX.Element} Closed-padlock glyph signalling a signed payload. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/** @returns {JSX.Element} Chevron-down glyph for dropdown / switcher affordances. */
function IconChevronDown() {
  return (
    <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

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

const WEBHOOK_PAYLOAD = `{
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
    <ConsoleWindow
      crumb={<><b>Adoption</b> <span className="sep">/</span> last 6 weeks</>}
      right={
        <Presence
          users={[
            { initials: "SR", tone: "a3", img: SHOWCASE_FACE.sarah },
            { initials: "MA", tone: "a2", img: SHOWCASE_FACE.maya },
            { initials: "BA", agent: true },
          ]}
        />
      }
    >
      <div className="pcs-chart">
        <div className="pcs-bars pcs-bars--lg">
          {ADOPTION_WEEKS.map((week) => (
            <div className="pcs-col" key={week.label}>
              <span
                className={week.accent ? "pcs-col-fill pcs-col-fill--accent" : "pcs-col-fill"}
                style={{ height: `${week.height}%` }}
              >
                {week.pin ? <span className="pcs-pin">+12% wow</span> : null}
              </span>
              <span className="pcs-col-x">{week.label}</span>
            </div>
          ))}
        </div>
        <div className="pcs-stats">
          <div className="pcs-stat"><span className="pcs-stat-n">200h</span><span className="pcs-stat-l">engagement</span></div>
          <div className="pcs-stat"><span className="pcs-stat-n">4,255</span><span className="pcs-stat-l">collaborators</span></div>
          <div className="pcs-stat"><span className="pcs-stat-n">55.4k</span><span className="pcs-stat-l">comments</span></div>
          <div className="pcs-stat"><span className="pcs-stat-n">87.3k</span><span className="pcs-stat-l">notifications</span></div>
        </div>
        <p className="code-microcopy">engagement climbing, agents counted as users</p>
      </div>
    </ConsoleWindow>
  ),
  "hero/ai-chat": (
    <ConsoleWindow crumb={<><b>AI chat</b> <span className="sep">/</span> ask your console</>} right={<span className="pcs-chip">beta</span>}>
      <div className="pcs-chat">
        <p className="pcs-ask">Which documents had the most review activity last week?</p>
        <div className="pcs-ans">
          <Av initials="AI" agent />
          <div className="pcs-ans-main">
            <div className="pcs-ans-head">
              <span className="pcs-ans-name">Console AI</span>
              <span className="pcs-ans-time">now</span>
            </div>
            <p className="pcs-ans-body">Top 3 documents by review events last week:</p>
            <div className="pcs-result">
              <span className="pcs-result-chip">filing-q3 <b>142</b></span>
              <span className="pcs-result-chip">proposal-acme <b>98</b></span>
              <span className="pcs-result-chip">launch-brief <b>61</b></span>
            </div>
            <p className="pcs-ans-body">Want a CSV?</p>
          </div>
        </div>
      </div>
      <Composer placeholder="Ask about your console…" />
    </ConsoleWindow>
  ),
  "hero/debugger": (
    <ConsoleWindow crumb={<><b>Live debugger</b> <span className="sep">/</span> state</>} right={<LivePill label="streaming" />}>
      <div className="pcs-state">
        <div className="pcs-state-row">
          <span className="pcs-state-k">veltClient</span>
          <span className="pcs-state-v"><i className="pcs-dot" />ready</span>
        </div>
        <div className="pcs-state-row">
          <span className="pcs-state-k">document</span>
          <span className="pcs-state-v">filing-q3</span>
        </div>
        <div className="pcs-state-row">
          <span className="pcs-state-k">component</span>
          <span className="pcs-state-v">VeltComments</span>
        </div>
        <div className="pcs-state-row">
          <span className="pcs-state-k">users.online</span>
          <span className="pcs-state-v">4 · 1 agent</span>
        </div>
        <div className="pcs-state-row pcs-state-row--hot">
          <span className="pcs-state-k">lastEvent</span>
          <span className="pcs-state-v"><i className="pcs-dot pcs-dot--hot" />comment.added</span>
        </div>
      </div>
    </ConsoleWindow>
  ),
  "hero/data": (
    <ConsoleWindow
      crumb={<><b>Data</b> <span className="sep">/</span> filing-q3 <span className="sep">/</span> activity</>}
      right={
        <span className="pcs-tags">
          <span className="pcs-chip"><IconDownload />JSON</span>
          <span className="pcs-chip"><IconDownload />CSV</span>
        </span>
      }
    >
      <div className="pcs-table pcs-table--activity">
        <div className="pcs-tr pcs-tr--head"><span>Actor</span><span>Event</span><span>Status</span></div>
        <div className="pcs-tr">
          <span className="pcs-td-actor"><Av initials="BA" agent /><span>Brand Agent</span></span>
          <span className="pcs-td-ev">flagged a pricing claim</span>
          <span className="chip chip-agent">agent</span>
        </div>
        <div className="pcs-tr">
          <span className="pcs-td-actor"><Av initials="MA" tone="a2" img={SHOWCASE_FACE.maya} /><span>Maya</span></span>
          <span className="pcs-td-ev">replied with a source</span>
          <span className="chip chip-pending">human</span>
        </div>
        <div className="pcs-tr">
          <span className="pcs-td-actor"><Av initials="SR" tone="a3" img={SHOWCASE_FACE.sarah} /><span>Sarah</span></span>
          <span className="pcs-td-ev">approved the change</span>
          <span className="chip chip-approved">approved</span>
        </div>
        <div className="pcs-tr">
          <span className="pcs-td-actor"><Av initials="WH" tone="a1" /><span>Webhook</span></span>
          <span className="pcs-td-ev">review.approved delivered</span>
          <span className="chip chip-approved">200</span>
        </div>
      </div>
      <p className="code-microcopy">142 records · agents counted as users · export ready</p>
    </ConsoleWindow>
  ),
  "hero/webhooks": (
    <ConsoleWindow crumb={<><b>Webhooks</b> <span className="sep">/</span> deliveries</>} right={<LivePill label="delivering" />}>
      <div className="pcs-deliv">
        <div className="pcs-deliv-row">
          <span className="pcs-deliv-evt">comment.added</span>
          <span className="pcs-deliv-arrow">→</span>
          <span className="pcs-deliv-ep">{WEBHOOK_ENDPOINT}</span>
          <span className="pcs-deliv-meta"><span className="pcs-signed"><IconLock />signed</span><span className="chip chip-approved">200</span></span>
        </div>
        <div className="pcs-deliv-row">
          <span className="pcs-deliv-evt">review.approved</span>
          <span className="pcs-deliv-arrow">→</span>
          <span className="pcs-deliv-ep">{WEBHOOK_ENDPOINT}</span>
          <span className="pcs-deliv-meta"><span className="pcs-signed"><IconLock />signed</span><span className="chip chip-approved">200</span></span>
        </div>
      </div>
      <pre className="pcs-code">{WEBHOOK_PAYLOAD}</pre>
      <div className="pcs-tags">
        <span className="pcs-tag">signed</span>
        <span className="pcs-tag">retried</span>
        <span className="pcs-tag">transform</span>
        <span className="pcs-tag">encryption</span>
      </div>
    </ConsoleWindow>
  ),

  "what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      {DATA_SCENE}
      <p className="code-microcopy">run it, watch it, prove it: humans and agents in one console</p>
    </div>
  ),

  "showcase/adoption-analytics": (
    <div className="pv">
      <ConsoleWindow
        crumb={<><b>Adoption</b> <span className="sep">/</span> last 6 weeks</>}
        right={
          <Presence
            users={[
              { initials: "SR", tone: "a3", img: SHOWCASE_FACE.sarah },
              { initials: "MA", tone: "a2", img: SHOWCASE_FACE.maya },
              { initials: "BA", agent: true },
            ]}
          />
        }
      >
        <div className="pcs-chart">
          <div className="pcs-bars">
            {ADOPTION_WEEKS.map((week) => (
              <div className="pcs-col" key={week.label}>
                <span
                  className={week.accent ? "pcs-col-fill pcs-col-fill--accent" : "pcs-col-fill"}
                  style={{ height: `${week.height}%` }}
                >
                  {week.pin ? <span className="pcs-pin">+12% wow</span> : null}
                </span>
                <span className="pcs-col-x">{week.label}</span>
              </div>
            ))}
          </div>
          <div className="pcs-stats">
            <div className="pcs-stat"><span className="pcs-stat-n">200h</span><span className="pcs-stat-l">engagement</span></div>
            <div className="pcs-stat"><span className="pcs-stat-n">4,255</span><span className="pcs-stat-l">collaborators</span></div>
            <div className="pcs-stat"><span className="pcs-stat-n">87.3k</span><span className="pcs-stat-l">notifications</span></div>
          </div>
        </div>
      </ConsoleWindow>
    </div>
  ),
  "showcase/ai-chat": (
    <div className="pv">
      <ConsoleWindow crumb={<><b>AI chat</b> <span className="sep">/</span> ask your console</>} right={<span className="pcs-chip">beta</span>}>
        <div className="pcs-chat">
          <p className="pcs-ask">Which documents had the most review activity last week?</p>
          <div className="pcs-ans">
            <Av initials="AI" agent />
            <div className="pcs-ans-main">
              <div className="pcs-ans-head">
                <span className="pcs-ans-name">Console AI</span>
                <span className="pcs-ans-time">now</span>
              </div>
              <p className="pcs-ans-body">Top documents by review events last week:</p>
              <div className="pcs-result">
                <span className="pcs-result-chip">filing-q3 <b>142</b></span>
                <span className="pcs-result-chip">proposal-acme <b>98</b></span>
                <span className="pcs-result-chip">launch-brief <b>61</b></span>
              </div>
            </div>
          </div>
        </div>
        <Composer placeholder="Ask about your console…" />
      </ConsoleWindow>
    </div>
  ),
  "showcase/live-debugger": (
    <div className="pv">
      <ConsoleWindow crumb={<><b>Live debugger</b> <span className="sep">/</span> state</>} right={<LivePill label="streaming" />}>
        <div className="pcs-state">
          <div className="pcs-state-row">
            <span className="pcs-state-k">veltClient</span>
            <span className="pcs-state-v"><i className="pcs-dot" />ready</span>
          </div>
          <div className="pcs-state-row">
            <span className="pcs-state-k">document</span>
            <span className="pcs-state-v">filing-q3</span>
          </div>
          <div className="pcs-state-row">
            <span className="pcs-state-k">users.online</span>
            <span className="pcs-state-v">4 · 1 agent</span>
          </div>
          <div className="pcs-state-row pcs-state-row--hot">
            <span className="pcs-state-k">lastEvent</span>
            <span className="pcs-state-v"><i className="pcs-dot pcs-dot--hot" />comment.added</span>
          </div>
        </div>
      </ConsoleWindow>
    </div>
  ),
  "showcase/devtools": (
    <div className="pv">
      <ConsoleWindow crumb={<><b>Velt DevTools</b> <span className="sep">/</span> Chrome</>} right={<span className="pcs-chip">SDK 4.5.2 <IconChevronDown /></span>}>
        <div className="pcs-devtabs">
          <span className="pcs-devtab">Overview</span>
          <span className="pcs-devtab">Data</span>
          <span className="pcs-devtab on">Events</span>
          <span className="pcs-devtab">Components</span>
        </div>
        <div className="pcs-evt">
          <div className="pcs-evt-row">
            <span className="pcs-evt-ts">09:21</span>
            <span className="pcs-evt-name"><b>Document</b>.isSet</span>
            <span className="chip chip-approved">evt</span>
          </div>
          <div className="pcs-evt-row">
            <span className="pcs-evt-ts">09:21</span>
            <span className="pcs-evt-name"><b>Comment</b>.isAdded</span>
            <span className="chip chip-agent">agent</span>
          </div>
          <div className="pcs-evt-row">
            <span className="pcs-evt-ts">09:22</span>
            <span className="pcs-evt-name"><b>Notification</b>.sent</span>
            <span className="chip chip-approved">evt</span>
          </div>
        </div>
      </ConsoleWindow>
    </div>
  ),
  "showcase/data-explorer": (
    <div className="pv">
      <ConsoleWindow
        crumb={<><b>Data</b> <span className="sep">/</span> filing-q3</>}
        right={
          <span className="pcs-tags">
            <span className="pcs-chip"><IconDownload />JSON</span>
            <span className="pcs-chip"><IconDownload />CSV</span>
          </span>
        }
      >
        <div className="pcs-table">
          <div className="pcs-tr pcs-tr--head"><span>Type</span><span>Actor</span><span>When</span></div>
          <div className="pcs-tr">
            <span className="pcs-td-type">Comment</span>
            <span className="pcs-td-actor"><Av initials="BA" agent /><span>Brand Agent</span></span>
            <span className="pcs-td-when">09:02</span>
          </div>
          <div className="pcs-tr">
            <span className="pcs-td-type">Reply</span>
            <span className="pcs-td-actor"><Av initials="MA" tone="a2" img={SHOWCASE_FACE.maya} /><span>Maya</span></span>
            <span className="pcs-td-when">09:14</span>
          </div>
          <div className="pcs-tr">
            <span className="pcs-td-type">Recording</span>
            <span className="pcs-td-actor"><Av initials="KI" tone="a4" img={SHOWCASE_FACE.kim} /><span>Kim</span></span>
            <span className="pcs-td-when">08:50</span>
          </div>
        </div>
        <p className="code-microcopy">142 records · export to JSON or CSV</p>
      </ConsoleWindow>
    </div>
  ),
  "showcase/feature-configs": (
    <div className="pv">
      <ConsoleWindow crumb={<><b>Feature configs</b></>} right={<span className="pcs-chip">production <IconChevronDown /></span>}>
        <div className="pcs-cfg">
          <div className="pcs-cfg-row">
            <div className="pcs-cfg-main"><p className="pcs-cfg-name">Comments</p><p className="pcs-cfg-sub">Inline threads and mentions</p></div>
            <span className="pcs-toggle on"><i /></span>
          </div>
          <div className="pcs-cfg-row">
            <div className="pcs-cfg-main"><p className="pcs-cfg-name">Recorder</p><p className="pcs-cfg-sub">Async screen and voice notes</p></div>
            <span className="pcs-toggle on"><i /></span>
          </div>
          <div className="pcs-cfg-row">
            <div className="pcs-cfg-main"><p className="pcs-cfg-name">Minimap</p><p className="pcs-cfg-sub">Comment density overview</p></div>
            <span className="pcs-toggle"><i /></span>
          </div>
        </div>
        <p className="code-microcopy">change behavior without a deploy</p>
      </ConsoleWindow>
    </div>
  ),
  "showcase/rest-apis": (
    <div className="pv">
      <ConsoleWindow crumb={<><b>REST</b> <span className="sep">/</span> provisioning</>} right={<span className="pcs-chip">Bearer sk_live_***</span>}>
        <div className="pcs-api">
          <div className="pcs-req-line">
            <span className="pcs-method">POST</span>
            <span className="pcs-path">/v2/workspace/apikey/create</span>
          </div>
          <pre className="pcs-code">{REST_REQUEST_BODY}</pre>
          <div className="pcs-res-head">
            <span className="pcs-res-label">201 response</span>
            <span className="pcs-status"><IconCheck />created</span>
          </div>
          <pre className="pcs-code">{REST_RESPONSE_BODY}</pre>
        </div>
      </ConsoleWindow>
    </div>
  ),
  "showcase/webhooks": (
    <div className="pv">
      <ConsoleWindow crumb={<><b>Webhooks</b> <span className="sep">/</span> deliveries</>} right={<LivePill label="delivering" />}>
        <div className="pcs-deliv">
          <div className="pcs-deliv-row">
            <span className="pcs-deliv-evt">comment.added</span>
            <span className="pcs-deliv-arrow">→</span>
            <span className="pcs-deliv-ep">{WEBHOOK_ENDPOINT}</span>
            <span className="pcs-deliv-meta"><span className="pcs-signed"><IconLock />signed</span><span className="chip chip-approved">200</span></span>
          </div>
          <div className="pcs-deliv-row">
            <span className="pcs-deliv-evt">review.approved</span>
            <span className="pcs-deliv-arrow">→</span>
            <span className="pcs-deliv-ep">{WEBHOOK_ENDPOINT}</span>
            <span className="pcs-deliv-meta"><span className="pcs-signed"><IconLock />signed</span><span className="chip chip-approved">200</span></span>
          </div>
          <div className="pcs-deliv-row">
            <span className="pcs-deliv-evt">comment.resolved</span>
            <span className="pcs-deliv-arrow">→</span>
            <span className="pcs-deliv-ep">{WEBHOOK_ENDPOINT}</span>
            <span className="pcs-deliv-meta"><span className="pcs-tag">retry 1/3</span><span className="chip chip-approved">200</span></span>
          </div>
        </div>
        <div className="pcs-tags">
          <span className="pcs-tag">retries</span>
          <span className="pcs-tag">transform</span>
          <span className="pcs-tag">encryption</span>
          <span className="pcs-tag">2-way Slack</span>
        </div>
      </ConsoleWindow>
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
  "in-production/fintech": <FintechBoard />,
  "in-production/operations": <OperationsBoard />,
  "in-production/ai": <AiNativeBoard />,

  "related/audit-trail": (
    <div className="pv">
      <ConsoleWindow crumb={<><b>Audit trail</b></>} right={<span className="pcs-chip"><IconLock />append-only</span>}>
        <div className="pcs-deliv">
          <div className="pcs-deliv-row">
            <span className="pcs-deliv-evt">review.approved</span>
            <span className="pcs-deliv-arrow">→</span>
            <span className="pcs-deliv-ep">recorded · immutable</span>
            <span className="pcs-deliv-meta"><span className="chip chip-approved">log</span></span>
          </div>
        </div>
      </ConsoleWindow>
    </div>
  ),
  "related/webhooks": (
    <div className="pv">
      <ConsoleWindow crumb={<><b>Webhooks</b></>} right={<LivePill label="delivering" />}>
        <div className="pcs-deliv">
          <div className="pcs-deliv-row">
            <span className="pcs-deliv-evt">comment.added</span>
            <span className="pcs-deliv-arrow">→</span>
            <span className="pcs-deliv-ep">your endpoint</span>
            <span className="pcs-deliv-meta"><span className="chip chip-approved">200</span></span>
          </div>
        </div>
        <div className="pcs-tags">
          <span className="pcs-tag">signed</span>
          <span className="pcs-tag">retried</span>
        </div>
      </ConsoleWindow>
    </div>
  ),
  "related/self-hosting": (
    <div className="pv">
      <ConsoleWindow crumb={<><b>Self-hosting</b></>} right={<span className="pcs-chip">your infra</span>}>
        <div className="pcs-state">
          <div className="pcs-state-row">
            <span className="pcs-state-k">dataProvider</span>
            <span className="pcs-state-v">your-db</span>
          </div>
          <div className="pcs-state-row">
            <span className="pcs-state-k">PII</span>
            <span className="pcs-state-v"><i className="pcs-dot" />on your infra</span>
          </div>
        </div>
      </ConsoleWindow>
    </div>
  ),
  "related/notifications": (
    <div className="pv">
      <ConsoleWindow crumb={<><b>Notifications</b></>} right={<span className="pcs-chip">sent</span>}>
        <div className="pcs-notif">
          <Av initials="SR" tone="a3" img={SHOWCASE_FACE.sarah} />
          <div className="pcs-notif-main">
            <p className="pcs-notif-text"><strong>Sarah</strong> approved your change</p>
            <div className="pcs-tags">
              <span className="pcs-tag">Inbox</span>
              <span className="pcs-tag">Email</span>
              <span className="pcs-tag">Slack</span>
            </div>
          </div>
          <span className="pcs-notif-time">2m</span>
        </div>
      </ConsoleWindow>
    </div>
  ),
};
