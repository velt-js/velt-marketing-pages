import type { ReactNode } from "react";

import { AuditLog, ProvRow, ProvArrow, NotifItem } from "../demos";
import {
  AgentFindingCard,
  Av,
  FACES,
  Frame,
  IconArrowRight,
  IconCheck,
  IconX,
  IconSearch,
} from "./hero-surface";

import "./notifications-showcase.css";

// Simulated-UI demo nodes for the /new-features/notifications page. Keys match
// components/feature-new/demo-keys.ts; resolved by demo-registry.tsx.

// Notifications-page personas mapped to shared headshots.
const FACE = {
  maya: FACES.fenne,
  sarah: FACES.hope,
  ethan: FACES.ethan,
} as const;

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

/**
 * A single toggle row in the notification preferences panel.
 * @param {{ channelClass: string; channelLabel: string; channelGlyph: string; value: "ALL" | "MINE" | "NONE" }} props Channel icon, label, and current setting.
 * @returns {JSX.Element} Preference row.
 */
function PrefRow({
  channelClass,
  channelLabel,
  channelGlyph,
  value,
}: {
  channelClass: string;
  channelLabel: string;
  channelGlyph: string;
  value: "ALL" | "MINE" | "NONE";
}) {
  const pillStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 700,
    fontFamily: "var(--vlp-font-mono)",
    letterSpacing: "0.05em",
    padding: "2px 8px",
    borderRadius: 999,
    background: active ? "var(--vlp-color-ink)" : "transparent",
    color: active ? "#fff" : "var(--vlp-color-text-muted)",
    border: active ? "1px solid transparent" : "1px solid var(--vlp-border-default)",
    cursor: "pointer",
    transition: "background 0.12s ease, color 0.12s ease",
  });

  return (
    <div className="notif-chan">
      <span className={`ci ${channelClass}`}>{channelGlyph}</span>
      <span style={{ flex: 1, fontSize: 12.5, fontWeight: 550, color: "var(--vlp-color-ink)" }}>{channelLabel}</span>
      <div style={{ display: "flex", gap: 4 }}>
        <span style={pillStyle(value === "ALL")}>ALL</span>
        <span style={pillStyle(value === "MINE")}>MINE</span>
        <span style={pillStyle(value === "NONE")}>NONE</span>
      </div>
    </div>
  );
}

/**
 * A polished email-digest card surface used in the email hero tab.
 * @param {{ subject: string; from: string; preview: ReactNode; cta?: string }} props Email fields.
 * @returns {JSX.Element} Email card.
 */
function EmailCard({
  subject,
  from,
  preview,
  cta = "Open in app",
}: {
  subject: string;
  from: string;
  preview: ReactNode;
  cta?: string;
}) {
  return (
    <div
      style={{
        border: "1px solid var(--vlp-border-default)",
        borderRadius: 12,
        background: "var(--vlp-bg-page)",
        overflow: "hidden",
        boxShadow: "var(--vlp-shadow-sm)",
      }}
    >
      {/* Email header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          borderBottom: "1px solid var(--vlp-border-subtle)",
          background: "var(--vlp-bg-section-alt)",
        }}
      >
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 50,
            background: "#fc5855",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 50,
            background: "#fdbc2c",
            display: "inline-block",
          }}
        />
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 50,
            background: "#27c840",
            display: "inline-block",
          }}
        />
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "var(--vlp-font-mono)",
            fontSize: 10.5,
            color: "var(--vlp-color-text-subtle)",
          }}
        >
          Mail
        </span>
      </div>

      {/* Email meta */}
      <div style={{ padding: "12px 16px 0" }}>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "var(--vlp-color-text-muted)",
            fontFamily: "var(--vlp-font-mono)",
          }}
        >
          From: {from}
        </p>
        <p
          style={{
            margin: "4px 0 10px",
            fontSize: 13.5,
            fontWeight: 700,
            color: "var(--vlp-color-ink)",
          }}
        >
          {subject}
        </p>
        <div
          style={{
            borderTop: "1px solid var(--vlp-border-subtle)",
            paddingTop: 10,
            fontSize: 12.5,
            color: "var(--vlp-color-ink-soft)",
            lineHeight: 1.6,
          }}
        >
          {preview}
        </div>
      </div>

      {/* CTA button */}
      <div style={{ padding: "10px 16px 14px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "var(--vlp-color-accent)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "var(--vlp-font-heading)",
            borderRadius: 8,
            padding: "6px 14px",
          }}
        >
          {cta}
        </span>
      </div>
    </div>
  );
}

/**
 * A Slack-style message card: workspace bar, channel, avatar + message body.
 * @param {{ channel: string; author: string; authorImg?: string; authorInitials: string; authorTone?: string; agent?: boolean; body: ReactNode; meta?: string }} props Slack message fields.
 * @returns {JSX.Element} Slack card.
 */
function SlackCard({
  channel,
  author,
  authorImg,
  authorInitials,
  authorTone,
  agent,
  body,
  meta = "just now",
}: {
  channel: string;
  author: string;
  authorImg?: string;
  authorInitials: string;
  authorTone?: string;
  agent?: boolean;
  body: ReactNode;
  meta?: string;
}) {
  return (
    <div
      style={{
        border: "1px solid var(--vlp-border-default)",
        borderRadius: 12,
        background: "var(--vlp-bg-page)",
        overflow: "hidden",
        boxShadow: "var(--vlp-shadow-sm)",
      }}
    >
      {/* Slack sidebar strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderBottom: "1px solid var(--vlp-border-subtle)",
          background: "oklch(0.26 0.04 291)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--vlp-font-mono)",
            fontSize: 10.5,
            fontWeight: 700,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          # {channel}
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--vlp-font-mono)",
            fontSize: 9.5,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Slack
        </span>
      </div>

      {/* Message row */}
      <div style={{ display: "flex", gap: 10, padding: "12px 14px", alignItems: "flex-start" }}>
        <Av initials={authorInitials} tone={authorTone} agent={agent} img={authorImg} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--vlp-color-ink)" }}>{author}</span>
            {agent ? (
              <span
                style={{
                  fontFamily: "var(--vlp-font-mono)",
                  fontSize: 9.5,
                  letterSpacing: "0.06em",
                  color: "var(--vlp-color-accent-ink)",
                  background: "var(--vlp-color-accent-soft)",
                  borderRadius: 4,
                  padding: "1px 5px",
                }}
              >
                APP
              </span>
            ) : null}
            <span style={{ fontSize: 11, color: "var(--vlp-color-text-subtle)", fontFamily: "var(--vlp-font-mono)" }}>
              {meta}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: "var(--vlp-color-ink-soft)", lineHeight: 1.5 }}>{body}</p>
        </div>
      </div>
    </div>
  );
}

/** @returns {JSX.Element} Bell glyph for inbox / agent-activity headers. */
function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

/** @returns {JSX.Element} Envelope glyph for the email header + custom inbox row. */
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

/** @returns {JSX.Element} Funnel glyph for the batching / digest header + pipe. */
function IconFunnel() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5h16l-6 8v5l-4 2v-7z" />
    </svg>
  );
}

/** @returns {JSX.Element} Stacked-layers glyph for the digest summary mark. */
function IconStack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3z" />
      <path d="M3 12l9 4.5L21 12" />
      <path d="M3 16.5 12 21l9-4.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Sliders glyph for the per-user preferences header. */
function IconSliders() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="14" cy="18" r="2" />
    </svg>
  );
}

/** @returns {JSX.Element} Lightning glyph for the REST / custom-events header. */
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z" />
    </svg>
  );
}

/** @returns {JSX.Element} Webhook / connected-nodes glyph for the webhooks header. */
function IconWebhook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="8" r="2.5" />
      <circle cx="9" cy="18" r="2.5" />
      <path d="M7.6 7.8 11 13M16 10l-4.5 6M8.5 16.5 16 16" />
    </svg>
  );
}

/** @returns {JSX.Element} Lock glyph for the permission-scoped feeds header. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Server-stack glyph for the self-host header + your-servers column. */
function IconServer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  );
}

/** @returns {JSX.Element} Down arrow glyph for the batching funnel connector. */
function IconArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

/** @returns {JSX.Element} Eye glyph for the counterparty (sees their thread) lane. */
function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** @returns {JSX.Element} Eye-off glyph for the internal-deliberation (never reaches) lane. */
function IconEyeOff() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.6 6.2A9.7 9.7 0 0 1 12 6c6.5 0 10 6 10 6a16 16 0 0 1-3 3.6M6.2 7.4A16 16 0 0 0 2 12s3.5 6 10 6a9.6 9.6 0 0 0 4-.9" />
      <path d="M9.5 9.7a3 3 0 0 0 4.3 4.2" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

/**
 * One per-channel preference row: a colored channel icon, label + scope, and an
 * ALL / MINE / NONE segmented control with one option active.
 * @param {{ channelClass: string; glyph: ReactNode; label: string; scope: string; value: "ALL" | "MINE" | "NONE" }} props Channel icon class, glyph, label, scope copy, and active value.
 * @returns {JSX.Element} Preference row.
 */
function ChannelPref({
  channelClass,
  glyph,
  label,
  scope,
  value,
}: {
  channelClass: string;
  glyph: ReactNode;
  label: string;
  scope: string;
  value: "ALL" | "MINE" | "NONE";
}) {
  const options: Array<"ALL" | "MINE" | "NONE"> = ["ALL", "MINE", "NONE"];
  return (
    <div className="ntf-pref">
      <span className={`ntf-pref-ic ${channelClass}`}>{glyph}</span>
      <span className="ntf-pref-name">
        <span className="ntf-pref-label">{label}</span>
        <span className="ntf-pref-scope">{scope}</span>
      </span>
      <span className="ntf-seg">
        {options.map((option) => (
          <span key={option} className={`ntf-seg-opt${option === value ? " ntf-seg-opt--on" : ""}`}>
            {option}
          </span>
        ))}
      </span>
    </div>
  );
}

export const NOTIFICATIONS_DEMOS: Record<string, ReactNode> = {
  "notifications/hero/inbox": (
    <Frame
      app="VC"
      crumb={<><b>Notifications</b> <span className="sep">/</span> inbox</>}
      right={<span className="cmh-search"><IconSearch />Search</span>}
    >
      <div className="cmh-filters">
        <span className="cmh-ft on">For You</span>
        <span className="cmh-ft">Document</span>
        <span className="cmh-ft">All</span>
      </div>

      <div className="cmh-group">Now</div>

      <div className="cmh-inrow">
        <span className="cmh-unread" />
        <Av initials="RA" agent />
        <div className="cmh-inmain">
          <p className="t">
            <b>Review Agent</b> flagged 3 pricing claims on Q3 deck
            <span className="chip chip-agent" style={{ marginLeft: 6 }}>agent</span>
          </p>
          <p className="m"><span className="quote">&ldquo;conflicts with the rate table on slide 4&rdquo;</span></p>
        </div>
        <span className="cmh-when">2m</span>
      </div>

      <div className="cmh-inrow">
        <span className="cmh-unread" />
        <Av initials="MA" tone="a2" img={FACE.maya} />
        <div className="cmh-inmain">
          <p className="t">
            <b>Maya</b> assigned you the contract sign-off
            <span className="chip chip-pending" style={{ marginLeft: 6 }}>assigned</span>
          </p>
          <p className="m">contract.pdf · due Friday</p>
        </div>
        <span className="cmh-when">8m</span>
      </div>

      <div className="cmh-group">Earlier</div>

      <div className="cmh-inrow">
        <span className="cmh-unread read" />
        <Av initials="SR" tone="a3" img={FACE.sarah} />
        <div className="cmh-inmain">
          <p className="t">
            <b>Sarah</b> resolved the Q3 forecast thread
            <span className="chip chip-approved" style={{ marginLeft: 6 }}>resolved</span>
          </p>
          <p className="m">forecast.xlsx · 12 updates batched</p>
        </div>
        <span className="cmh-when">1h</span>
      </div>
    </Frame>
  ),

  "notifications/hero/email": (
    <Frame
      app="EM"
      crumb={<><b>Email digest</b> <span className="sep">/</span> sign-off requested</>}
      users={[{ initials: "ET", tone: "a1", img: FACE.ethan }]}
    >
      <EmailCard
        from="notifications@velt.dev"
        subject="Sign-off requested — Q3 forecast"
        preview={
          <>
            <p style={{ margin: "0 0 6px" }}>
              <Av initials="MA" tone="a2" img={FACE.maya} />
            </p>
            <p style={{ margin: "0 0 6px" }}>
              <b>Maya</b> mentioned you on <b>Q3 forecast</b>
            </p>
            <p style={{ margin: "0 0 8px", fontStyle: "italic", color: "var(--vlp-color-text-muted)" }}>
              &ldquo;Can you approve the revised projections before Friday close?&rdquo;
            </p>
            <p style={{ margin: 0, fontSize: 11, color: "var(--vlp-color-text-subtle)", fontFamily: "var(--vlp-font-mono)" }}>
              forecast.xlsx · cell B12 · Q3
            </p>
          </>
        }
        cta="Open in app →"
      />
    </Frame>
  ),

  "notifications/hero/slack": (
    <Frame
      app="SL"
      crumb={<><b>Slack</b> <span className="sep">/</span> #reviews</>}
      users={[{ initials: "ET", tone: "a1", img: FACE.ethan }, { initials: "SR", tone: "a3", img: FACE.sarah }]}
    >
      <SlackCard
        channel="reviews"
        author="Velt"
        authorInitials="VL"
        agent
        body={
          <>
            <b>Maya</b> mentioned <b>@Ethan</b> on <b>Q3 forecast</b>
            <br />
            <span style={{ color: "var(--vlp-color-text-muted)" }}>
              &ldquo;Can you approve the revised projections before Friday close?&rdquo;
            </span>
            <br />
            <span
              style={{
                display: "inline-block",
                marginTop: 6,
                fontSize: 11.5,
                fontWeight: 600,
                color: "var(--vlp-color-accent-ink)",
                textDecoration: "underline",
              }}
            >
              app.acme.com/forecast
            </span>
          </>
        }
        meta="2:41 PM"
      />

      <div className="finding cmh-finding" style={{ marginTop: 2 }}>
        <div className="fh">
          <Av initials="RA" agent />
          Review Agent
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">2:39 PM</span>
        </div>
        <p className="fb">3 pricing claims flagged on Q3 deck — opens to approve-or-reject queue.</p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Approve all</button>
          <button type="button" className="cmh-btn reject"><IconX />Dismiss</button>
        </div>
      </div>
    </Frame>
  ),

  "notifications/hero/preferences": (
    <Frame
      app="VC"
      crumb={<><b>Preferences</b> <span className="sep">/</span> notifications</>}
      users={[{ initials: "ET", tone: "a1", img: FACE.ethan }]}
    >
      <p
        style={{
          margin: 0,
          fontSize: 11.5,
          color: "var(--vlp-color-text-muted)",
          fontFamily: "var(--vlp-font-mono)",
          letterSpacing: "0.02em",
        }}
      >
        ethan@acme.com · per-document or org-wide
      </p>

      <div className="notif-chans">
        <PrefRow channelClass="ci-app" channelLabel="In-app" channelGlyph="⬛" value="ALL" />
        <PrefRow channelClass="ci-mail" channelLabel="Email" channelGlyph="✉" value="MINE" />
        <PrefRow channelClass="ci-slack" channelLabel="Slack" channelGlyph="⚡" value="MINE" />
        <PrefRow channelClass="ci-teams" channelLabel="Teams" channelGlyph="T" value="NONE" />
      </div>

      <p
        style={{
          margin: 0,
          fontSize: 11,
          color: "var(--vlp-color-text-subtle)",
          fontFamily: "var(--vlp-font-mono)",
        }}
      >
        ALL = every event · MINE = mentions &amp; assignments · NONE = silent
      </p>
    </Frame>
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
      <p className="code-microcopy">one feed, both actor types, consent where the agent&rsquo;s work lands</p>
    </div>
  ),

  // In-app inbox (wide tile): the prebuilt tool + panel — For You / Document /
  // All tabs over one feed carrying a mention, a reply, and a sign-off request.
  "notifications/showcase/inbox": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconBell />
          Notifications
          <span className="cmh-cc-pill">For You</span>
        </div>
        <div className="cmh-cc-body">
          <div className="cmh-filters">
            <span className="cmh-ft on">For You</span>
            <span className="cmh-ft">Document</span>
            <span className="cmh-ft">All</span>
          </div>

          <div className="cmh-group">Now</div>
          <div className="cmh-inrow">
            <span className="cmh-unread" />
            <Av initials="MA" tone="a2" img={FACE.maya} />
            <div className="cmh-inmain">
              <p className="t">
                <b>Maya</b> mentioned you on Q3 forecast
                <span className="chip chip-pending" style={{ marginLeft: 6 }}>mention</span>
              </p>
              <p className="m"><span className="quote">&ldquo;@you can you review before Friday?&rdquo;</span></p>
            </div>
            <span className="cmh-when">2m</span>
          </div>

          <div className="cmh-inrow">
            <span className="cmh-unread" />
            <Av initials="SR" tone="a3" img={FACE.sarah} />
            <div className="cmh-inmain">
              <p className="t">
                <b>Sarah</b> replied on the Q3 thread
                <span className="chip chip-approved" style={{ marginLeft: 6 }}>reply</span>
              </p>
              <p className="m">forecast.xlsx · cell B12</p>
            </div>
            <span className="cmh-when">9m</span>
          </div>

          <div className="cmh-inrow">
            <span className="cmh-unread read" />
            <Av initials="ET" tone="a1" img={FACE.ethan} />
            <div className="cmh-inmain">
              <p className="t">
                <b>Ethan</b> requested your sign-off
                <span className="chip chip-pending" style={{ marginLeft: 6 }}>sign-off</span>
              </p>
              <p className="m">contract.pdf · due today</p>
            </div>
            <span className="cmh-when">1h</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Email notifications (narrow tile): a mention fired off as an email through
  // SendGrid so a reviewer who hasn't opened the app still gets the request.
  "notifications/showcase/email": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--plum">
          <IconMail />
          Email
          <span className="cmh-cc-pill">SendGrid</span>
        </div>
        <div className="cmh-cc-body">
          <div className="ntf-mail">
            <div className="ntf-mail-card">
              <div className="ntf-mail-bar">
                <span className="ntf-mail-ic"><IconMail /></span>
                <span className="ntf-mail-from">
                  <span className="ntf-mail-addr">notifications@velt.dev</span>
                  <span className="ntf-mail-to">to ethan@acme.com</span>
                </span>
              </div>
              <div className="ntf-mail-body">
                <span className="ntf-mail-subj">Sign-off requested — Q3 forecast</span>
                <span className="ntf-mail-prev">
                  <span className="ntf-mention">@Ethan</span> mentioned on Q3 forecast — &ldquo;approve before Friday close?&rdquo;
                </span>
              </div>
            </div>
            <div className="ntf-mail-foot">
              <span className="ntf-deliver"><span className="ntf-deliver-dot" />delivered · hasn&rsquo;t opened the app</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Batching and digests (narrow tile): a burst of pings (some already seen)
  // funnels through delay-and-batch into a single digest.
  "notifications/showcase/batching": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--purple">
          <IconFunnel />
          Digest
          <span className="cmh-cc-pill">1 / day</span>
        </div>
        <div className="cmh-cc-body">
          <div className="ntf-batch">
            <div className="ntf-batch-pings" aria-hidden="true">
              {Array.from({ length: 40 }).map((_unused, index) => (
                <span key={index} className={`ntf-batch-ping${index % 3 === 0 ? " ntf-batch-ping--seen" : ""}`} />
              ))}
            </div>
            <span className="ntf-batch-count">40 events · 13 already seen</span>
            <span className="ntf-batch-funnel"><IconArrowDown /></span>
            <div className="ntf-batch-digest">
              <span className="ntf-batch-digest-ic"><IconStack /></span>
              <span className="ntf-batch-digest-main">
                <span className="ntf-batch-digest-title">Q3 forecast · daily digest</span>
                <span className="ntf-batch-digest-sub">27 new updates, batched into one</span>
              </span>
            </div>
            <div className="apf-note">
              <span className="chip chip-approved">deduplicated</span>
              <span>Already-seen suppressed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Per-user preferences (wide tile): each channel set to ALL / MINE / NONE,
  // tunable per document or org-wide.
  "notifications/showcase/preferences": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--slate">
          <IconSliders />
          Preferences
          <span className="cmh-cc-pill">per channel</span>
        </div>
        <div className="cmh-cc-body">
          <div className="ntf-prefs">
            <ChannelPref channelClass="ci-app" glyph={<IconBell />} label="In-app" scope="every event" value="ALL" />
            <ChannelPref channelClass="ci-mail" glyph={<IconMail />} label="Email" scope="mentions & assignments" value="MINE" />
            <ChannelPref channelClass="ci-slack" glyph={<IconBolt />} label="Slack" scope="silenced" value="NONE" />
          </div>
          <div className="apf-note">
            <span className="chip chip-agent">settings UI · REST</span>
            <span>Per document or org-wide</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Custom notifications via REST (wide tile): the app POSTs its own event and
  // it lands as one item in the same inbox.
  "notifications/showcase/custom": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--ink">
          <IconBolt />
          REST API
          <span className="cmh-cc-pill">POST</span>
        </div>
        <div className="cmh-cc-body">
          <div className="ntf-cust">
            <div className="ntf-rest">
              <span className="ntf-rest-line">
                <span className="ntf-rest-verb">POST</span>
                /v2/notifications
              </span>
              <span className="ntf-rest-line">{"{ type, to: userId, body }"}</span>
              <div className="ntf-rest-types">
                <span className="ntf-rest-type">deadline</span>
                <span className="ntf-rest-type">counterparty</span>
                <span className="ntf-rest-type">workflow step</span>
              </div>
            </div>
            <span className="ntf-cust-arrow"><IconArrowRight /></span>
            <div className="ntf-cust-inbox">
              <span className="ntf-cust-inbox-ic"><IconMail /></span>
              <span className="ntf-cust-inbox-main">
                <span className="ntf-cust-inbox-title">
                  <strong>Deadline</strong> · sign-off due 5pm
                </span>
                <span className="ntf-deliver"><span className="ntf-deliver-dot" />in the same inbox</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Webhooks to your channels (narrow tile): comment + review events fire to your
  // endpoint with full payloads, routed onward to Slack or any channel.
  "notifications/showcase/webhooks": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--teal">
          <IconWebhook />
          Webhooks
          <span className="cmh-cc-pill">comment.*</span>
        </div>
        <div className="cmh-cc-body apf-evt-body">
          <div className="apf-evt-row">
            <span className="apf-evt-name">comment.added</span>
            <span className="apf-evt-sig"><IconCheck />payload</span>
            <span className="chip chip-approved">sent</span>
          </div>
          <div className="apf-evt-row">
            <span className="apf-evt-name">review.approved</span>
            <span className="apf-evt-sig"><IconCheck />payload</span>
            <span className="chip chip-approved">sent</span>
          </div>
          <div className="apf-note">
            <span className="ntf-chan"><span className="ntf-chan-dot" />Slack</span>
            <span>Your endpoint, your rules</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Agent activity (narrow tile): an agent is a user — its overnight findings
  // notify the assigned reviewer, who opens an approve-or-reject queue at 9am.
  "notifications/showcase/agents": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--navy">
          <IconBell />
          Agent activity
          <span className="cmh-cc-pill">overnight</span>
        </div>
        <div className="cmh-cc-body">
          <AgentFindingCard
            name="Review Agent"
            time="9:00 AM"
            body="Finished overnight — 3 findings ready as an approve-or-reject queue."
            replies={3}
          />
          <div className="apf-note">
            <span className="chip chip-pending">notified</span>
            <span>Ran 02:14 · surfaced at sign-in</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Permission-scoped feeds (wide tile): notifications generate only for docs a
  // user can access — the counterparty sees their thread, internal stays internal.
  "notifications/showcase/permissions": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--plum">
          <IconLock />
          Scoped feeds
          <span className="cmh-cc-pill">by access</span>
        </div>
        <div className="cmh-cc-body">
          <div className="ntf-scope">
            <div className="ntf-lane">
              <div className="ntf-lane-head">
                <span className="ntf-lane-ic"><IconEye /></span>
                <span className="ntf-lane-title">Counterparty</span>
              </div>
              <div className="ntf-lane-row">
                <Av initials="CP" tone="a3" />
                <span className="ntf-lane-row-main">Their shared thread moved — reply added</span>
              </div>
              <div className="ntf-lane-foot">
                <span className="ntf-lane-mark ntf-lane-mark--ok"><IconCheck /></span>
                Reaches their inbox
              </div>
            </div>

            <div className="ntf-lane ntf-lane--blocked">
              <div className="ntf-lane-head">
                <span className="ntf-lane-ic"><IconEyeOff /></span>
                <span className="ntf-lane-title">Internal</span>
              </div>
              <div className="ntf-lane-row">
                <Av initials="TM" tone="a4" />
                <span className="ntf-lane-row-main">Team deliberation on the counter-offer</span>
              </div>
              <div className="ntf-lane-foot">
                <span className="ntf-lane-mark ntf-lane-mark--no"><IconX /></span>
                Never reaches them
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Self-host (wide tile): the data provider keeps notification content on your
  // servers; Velt stores only minimal identifiers.
  "notifications/showcase/self-host": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--ink">
          <IconServer />
          Self-host
          <span className="cmh-cc-pill">data provider</span>
        </div>
        <div className="cmh-cc-body">
          <div className="ntf-host">
            <div className="ntf-host-col ntf-host-col--yours">
              <span className="ntf-host-cap">
                <span className="ntf-host-cap-ic"><IconServer /></span>
                Your servers
              </span>
              <p className="ntf-host-content">
                <strong>Maya</strong> mentioned you — &ldquo;approve the revised Q3 projections?&rdquo;
              </p>
              <span className="chip chip-approved ntf-host-tag">full content</span>
            </div>

            <span className="ntf-host-divider"><IconArrowRight /></span>

            <div className="ntf-host-col ntf-host-col--velt">
              <span className="ntf-host-cap">
                <span className="ntf-host-cap-ic"><IconLock /></span>
                Velt stores
              </span>
              <div className="ntf-host-ids">
                <span className="ntf-host-id">userId: usr_8f21</span>
                <span className="ntf-host-id">docId: doc_q3</span>
                <span className="ntf-host-id">type: mention</span>
              </div>
              <span className="chip chip-pending ntf-host-tag">minimal ids</span>
            </div>
          </div>
        </div>
      </div>
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
