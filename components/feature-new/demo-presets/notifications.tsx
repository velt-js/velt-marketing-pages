import type { ReactNode } from "react";

import { AuditLog, DarkPanel, ProvRow, ProvArrow, NotifItem } from "../demos";
import {
  Av,
  FACES,
  Frame,
  IconCheck,
  IconX,
  IconSearch,
} from "./hero-surface";

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
