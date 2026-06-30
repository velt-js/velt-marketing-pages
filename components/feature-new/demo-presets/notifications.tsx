import type { ReactNode } from "react";

import { AiNativeBoard } from "./ai-board";
import { ComplianceBoard } from "./compliance-board";
import { DigitalSalesRoom } from "./digital-sales-room";
import { FintechBoard } from "./fintech-board";
import { LegalBoard } from "./legal-board";
import { OperationsBoard } from "./ops-board";
import {
  AgentFindingCard,
  Av,
  FACES,
  Frame,
  IconArrowRight,
  IconCheck,
  IconX,
  IconSearch,
  IconReply,
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

// The mention copy reused verbatim across the email + Slack hero relays, so the
// notification narrative reads identically on every channel.
const HERO_MENTION_QUOTE = "\u201CCan you approve the revised projections before Friday close?\u201D";

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

/** @returns {JSX.Element} Filled star glyph for the email-client toolbar. */
function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3.2l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.9l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85z" />
    </svg>
  );
}

/** @returns {JSX.Element} Archive-box glyph for the email-client toolbar. */
function IconArchive() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="4" rx="1.5" />
      <path d="M5 8v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
      <path d="M10 12h4" />
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

/** @returns {JSX.Element} People glyph for the Teams channel preference row. */
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6" />
      <path d="M17.5 13.6a5.5 5.5 0 0 1 3 5.4" />
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

/**
 * Compact "related feature" teaser tile: a mini echo of the linked primitive
 * over a connector caption naming the hand-off into the notifications feed.
 * @param {{ children: ReactNode; from: string; to: string }} props Echo visual plus the from/to connector phrases.
 * @returns {JSX.Element} Related teaser tile.
 */
function RelTile({ children, from, to }: { children: ReactNode; from: string; to: string }) {
  return (
    <div className="pv">
      <div className="ntf-rel">
        {children}
        <p className="ntf-rel-cap">
          <span>{from}</span>
          <span className="ntf-rel-arrow"><IconArrowRight /></span>
          <strong>{to}</strong>
        </p>
      </div>
    </div>
  );
}

export const NOTIFICATIONS_DEMOS: Record<string, ReactNode> = {
  "notifications/hero/inbox": (
    <Frame
      app="VC"
      crumb={<><b>Sales deck</b> <span className="sep">/</span> Q3 review</>}
      right={
        <span className="ntf-hero-bell" role="img" aria-label="3 unread notifications">
          <IconBell />
          <span className="ntf-hero-bell-badge">3</span>
        </span>
      }
    >
      <div className="ntf-hero-stage">
        {/* Faint product backdrop so the panel reads as a real in-app dropdown. */}
        <div className="ntf-hero-backdrop" aria-hidden="true">
          <span className="ntf-bd-title" />
          <span className="ntf-bd-line" style={{ width: "82%" }} />
          <span className="ntf-bd-line" style={{ width: "64%" }} />
          <span className="ntf-bd-line" style={{ width: "73%" }} />
          <div className="ntf-bd-chart">
            <span style={{ height: "46%" }} />
            <span style={{ height: "68%" }} />
            <span style={{ height: "38%" }} />
            <span className="ntf-bd-chart-hot" style={{ height: "84%" }} />
          </div>
        </div>

        {/* Notification panel anchored under the header bell. */}
        <div className="ntf-hero-panel">
          <span className="ntf-hero-panel-caret" aria-hidden="true" />
          <div className="ntf-hero-panel-head">
            <span className="ntf-hero-panel-title">
              <IconBell />
              Notifications
              <span className="ntf-hero-panel-new">3 new</span>
            </span>
            <span className="cmh-search"><IconSearch />Search</span>
          </div>

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
              </p>
              <p className="m">forecast.xlsx · 12 updates batched</p>
            </div>
            <span className="cmh-when">1h</span>
          </div>
        </div>
      </div>
    </Frame>
  ),

  "notifications/hero/email": (
    <Frame
      app="EM"
      crumb={<><b>Mail</b> <span className="sep">/</span> Inbox</>}
      right={<span className="ntf-mailc-unread">1 unread</span>}
    >
      <div className="ntf-mailc">
        {/* Inbox list pane. */}
        <div className="ntf-mailc-list">
          <div className="ntf-mailc-li ntf-mailc-li--on">
            <span className="ntf-mailc-li-top">
              <span className="ntf-mailc-li-from">Velt</span>
              <span className="ntf-mailc-li-time">9:02</span>
            </span>
            <span className="ntf-mailc-li-subj">Sign-off requested: Q3 forecast</span>
          </div>
          <div className="ntf-mailc-li">
            <span className="ntf-mailc-li-top">
              <span className="ntf-mailc-li-from">Sarah Lin</span>
              <span className="ntf-mailc-li-time">8:40</span>
            </span>
            <span className="ntf-mailc-li-subj">Re: forecast figures</span>
          </div>
          <div className="ntf-mailc-li">
            <span className="ntf-mailc-li-top">
              <span className="ntf-mailc-li-from">Acme Billing</span>
              <span className="ntf-mailc-li-time">Mon</span>
            </span>
            <span className="ntf-mailc-li-subj">Your July invoice is ready</span>
          </div>
        </div>

        {/* Reading pane: the opened Velt notification email. */}
        <div className="ntf-mailc-read">
          <div className="ntf-mailc-tools">
            <span className="ntf-mailc-tool"><IconArchive /></span>
            <span className="ntf-mailc-tool"><IconReply /></span>
            <span className="ntf-mailc-tool ntf-mailc-tool--star"><IconStar /></span>
          </div>

          <div className="ntf-mail-card">
            <div className="ntf-mail-bar">
              <span className="ntf-mail-ic"><IconMail /></span>
              <span className="ntf-mail-from">
                <span className="ntf-mail-addr">notifications@velt.dev</span>
                <span className="ntf-mail-to">to ethan@acme.com</span>
              </span>
              <span className="ntf-hmail-time">9:02 AM</span>
            </div>
            <div className="ntf-mail-body">
              <span className="ntf-mail-subj">Sign-off requested: Q3 forecast</span>
              <span className="ntf-hmail-sender">
                <Av initials="MA" tone="a2" img={FACE.maya} />
                <span className="ntf-hmail-sender-txt"><b>Maya</b> mentioned you on <b>Q3 forecast</b></span>
              </span>
              <p className="ntf-quote">{HERO_MENTION_QUOTE}</p>
              <span className="ntf-hmail-meta">forecast.xlsx · cell B12 · Q3</span>
              <span className="ntf-hmail-cta">Open in app<IconArrowRight /></span>
            </div>
          </div>

          <div className="ntf-mail-foot">
            <span className="ntf-deliver"><span className="ntf-deliver-dot" />delivered · hasn&rsquo;t opened the app</span>
          </div>
        </div>
      </div>
    </Frame>
  ),

  "notifications/hero/slack": (
    <Frame
      app="SL"
      crumb={<><b>Acme HQ</b> <span className="sep">/</span> #reviews</>}
      users={[{ initials: "ET", tone: "a1", img: FACE.ethan }, { initials: "SR", tone: "a3", img: FACE.sarah }]}
    >
      <div className="ntf-slack">
        {/* Workspace + channel rail, so the relay reads as a real Slack window. */}
        <div className="ntf-slack-side" aria-hidden="true">
          <span className="ntf-slack-ws">A</span>
          <span className="ntf-slack-ch">#general</span>
          <span className="ntf-slack-ch ntf-slack-ch--on">#reviews</span>
          <span className="ntf-slack-ch">#design</span>
          <span className="ntf-slack-ch ntf-slack-ch--dm"><span className="ntf-slack-presence" />Maya</span>
        </div>

        <div className="ntf-slack-main">
          <div className="ntf-slack-head">
            <span className="ntf-slack-head-ch">#reviews</span>
            <span className="ntf-slack-head-meta">8 members</span>
          </div>

          <div className="ntf-slack-feed">
            <div className="cmh-cmt cmh-cmt--plain">
              <Av initials="VL" tone="a4" />
              <div className="cmh-cmt-main">
                <div className="cmh-cmt-head">
                  <span className="cmh-cmt-name">Velt</span>
                  <span className="chip chip-agent">app</span>
                  <span className="cmh-cmt-time">2:41 PM</span>
                </div>
                <p className="cmh-cmt-body"><b>Maya</b> mentioned <b>@Ethan</b> on <b>Q3 forecast</b></p>
                <p className="ntf-quote">{HERO_MENTION_QUOTE}</p>
                <span className="ntf-link">app.acme.com/forecast</span>
              </div>
            </div>

            <div className="finding cmh-finding">
              <div className="fh">
                <Av initials="RA" agent />
                Review Agent
                <span className="chip chip-agent">agent</span>
                <span className="cmh-when">2:39 PM</span>
              </div>
              <p className="fb">3 pricing claims flagged on Q3 deck: opens to approve-or-reject queue.</p>
              <div className="cmh-acts">
                <button type="button" className="cmh-btn approve"><IconCheck />Approve all</button>
                <button type="button" className="cmh-btn reject"><IconX />Dismiss</button>
              </div>
              <span className="ntf-slack-thread"><IconReply />2 replies · last 1m ago</span>
            </div>
          </div>

          <div className="ntf-slack-composer">
            <span className="ntf-slack-composer-ph">Message #reviews</span>
            <span className="ntf-slack-send"><IconArrowRight /></span>
          </div>
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
      <p className="ntf-hpref-head">ethan@acme.com · per-document or org-wide</p>

      <div className="ntf-prefs">
        <ChannelPref channelClass="ci-app" glyph={<IconBell />} label="In-app" scope="every event" value="ALL" />
        <ChannelPref channelClass="ci-mail" glyph={<IconMail />} label="Email" scope="mentions & assignments" value="MINE" />
        <ChannelPref channelClass="ci-slack" glyph={<IconBolt />} label="Slack" scope="mentions & assignments" value="MINE" />
        <ChannelPref channelClass="ci-teams" glyph={<IconUsers />} label="Teams" scope="silenced" value="NONE" />
      </div>

      <p className="ntf-hpref-legend">ALL = every event · MINE = mentions &amp; assignments · NONE = silent</p>
    </Frame>
  ),

  "notifications/what-it-is/scene": (
    <Frame
      app="VN"
      crumb={<><b>Notifications</b> <span className="sep">/</span> Inbox</>}
      right={
        <div className="cmh-present">
          <div className="stack">
            <Av initials="MR" agent />
            <Av initials="MA" tone="a2" img={FACE.maya} />
          </div>
          <span className="ntf-wii-actors">both actor types</span>
        </div>
      }
    >
      <div className="cmh-filters">
        <span className="cmh-ft on">For You</span>
        <span className="cmh-ft">Document</span>
        <span className="cmh-ft">All</span>
      </div>

      <div className="cmh-group">Inbox</div>

      <div className="cmh-inrow">
        <span className="cmh-unread" />
        <Av initials="MR" agent />
        <div className="cmh-inmain">
          <p className="t">
            <b>Margin Review Agent</b> flagged 3 pricing claims on the Q3 deck
            <span className="chip chip-agent" style={{ marginLeft: 6 }}>agent</span>
          </p>
          <p className="m">opens to findings</p>
          <div className="cmh-acts ntf-wii-acts">
            <button type="button" className="cmh-btn approve">Approve</button>
            <button type="button" className="cmh-btn reject">Reject</button>
          </div>
        </div>
        <span className="cmh-when">2m</span>
      </div>

      <div className="cmh-inrow">
        <span className="cmh-unread" />
        <Av initials="MA" tone="a2" img={FACE.maya} />
        <div className="cmh-inmain">
          <p className="t">
            <b>Maya</b> assigned you the contract sign-off, due Friday
            <span className="chip chip-pending" style={{ marginLeft: 6 }}>human</span>
          </p>
        </div>
        <span className="cmh-when">8m</span>
      </div>

      <div className="cmh-inrow">
        <span className="cmh-unread read" />
        <span className="ntf-wii-digest" role="img" aria-label="Batched digest"><IconStack /></span>
        <div className="cmh-inmain">
          <p className="t">
            12 updates on the Acme renewal, batched
            <span className="chip chip-approved" style={{ marginLeft: 6 }}>digest</span>
          </p>
        </div>
        <span className="cmh-when">1h</span>
      </div>

      <p className="ntf-wii-foot">
        <span className="ntf-wii-foot-dot" />
        one feed, both actor types, consent where the agent&rsquo;s work lands
      </p>
    </Frame>
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
                <span className="ntf-mail-subj">Sign-off requested: Q3 forecast</span>
                <span className="ntf-mail-prev">
                  <span className="ntf-mention">@Ethan</span> mentioned on Q3 forecast: &ldquo;approve before Friday close?&rdquo;
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
            body="Finished overnight: 3 findings ready as an approve-or-reject queue."
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
                <span className="ntf-lane-row-main">Their shared thread moved: reply added</span>
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
                <strong>Maya</strong> mentioned you: &ldquo;approve the revised Q3 projections?&rdquo;
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
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head ntf-look-head">
          <span className="ntf-look-mark"><IconBell /></span>
          <span className="ntf-look-brand">Acme · Inbox</span>
          <span className="cmh-cc-pill">your theme</span>
        </div>
        <div className="cmh-cc-body">
          <div className="cmh-inrow">
            <span className="cmh-unread ntf-look-unread" />
            <Av initials="MA" tone="a2" img={FACE.maya} />
            <div className="cmh-inmain">
              <p className="t"><b>Maya</b> mentioned you on Q3 forecast</p>
              <p className="m"><span className="quote">&ldquo;@you review before Friday?&rdquo;</span></p>
            </div>
            <span className="cmh-when">2m</span>
          </div>
          <div className="cmh-inrow">
            <span className="cmh-unread ntf-look-unread" />
            <Av initials="SR" tone="a3" img={FACE.sarah} />
            <div className="cmh-inmain">
              <p className="t"><b>Sarah</b> requested your sign-off</p>
              <p className="m">contract.pdf · due today</p>
            </div>
            <span className="cmh-when">9m</span>
          </div>
          <div className="ntf-look-chans">
            <span className="ntf-chan"><span className="ntf-chan-dot" />In-app</span>
            <span className="ntf-chan"><IconMail />Email</span>
            <span className="ntf-chan"><IconBolt />Slack</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "notifications/make-it-yours/behavior": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--ink">
          <IconSliders />
          Delivery config
          <span className="cmh-cc-pill">your rules</span>
        </div>
        <div className="cmh-cc-body ntf-cfg">
          <div className="ntf-cfg-chans">
            <span className="ntf-chan"><span className="ntf-chan-dot" />in-app</span>
            <span className="ntf-chan"><IconMail />email</span>
            <span className="ntf-chan"><IconBolt />Slack</span>
            <span className="ntf-chan"><IconWebhook />webhook</span>
          </div>
          <div className="ntf-cfg-row">
            <span className="ntf-cfg-key">digest</span>
            <span className="ntf-cfg-val"><span className="chip chip-approved">batched · 1 / day</span></span>
          </div>
          <div className="ntf-cfg-row">
            <span className="ntf-cfg-key">per-user prefs</span>
            <span className="ntf-cfg-val">
              <span className="ntf-seg">
                <span className="ntf-seg-opt ntf-seg-opt--on">ALL</span>
                <span className="ntf-seg-opt">MINE</span>
                <span className="ntf-seg-opt">NONE</span>
              </span>
            </span>
          </div>
          <div className="ntf-cfg-row">
            <span className="ntf-cfg-key">customEvents</span>
            <span className="ntf-cfg-val ntf-cfg-rest"><span className="ntf-rest-verb">POST</span>/notifications</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "notifications/in-production/sales": <DigitalSalesRoom />,

  "notifications/in-production/fintech": <FintechBoard />,

  "notifications/in-production/ops": <OperationsBoard />,

  "notifications/in-production/compliance": <ComplianceBoard />,

  "notifications/in-production/legal": <LegalBoard />,

  "notifications/in-production/ai": <AiNativeBoard />,

  "notifications/related/comments": (
    <RelTile from="every thread event" to="the inbox">
      <div className="cmh-cmt cmh-cmt--plain">
        <Av initials="MA" tone="a2" img={FACE.maya} />
        <div className="cmh-cmt-main">
          <div className="cmh-cmt-head">
            <span className="cmh-cmt-name">Maya</span>
            <span className="cmh-cmt-time">2m</span>
          </div>
          <p className="cmh-cmt-body">Replied to your thread on the Q3 forecast</p>
        </div>
      </div>
    </RelTile>
  ),

  "notifications/related/approval-flows": (
    <RelTile from="reviewers see their turn" to="the pipeline completes">
      <div className="ntf-rel-chain">
        <span className="ntf-rel-step">
          <Av initials="ET" tone="a1" img={FACE.ethan} />
          <span className="ntf-rel-step-name">FP&amp;A Lead</span>
          <span className="chip chip-approved">approved</span>
        </span>
        <span className="ntf-rel-step">
          <Av initials="SR" tone="a3" img={FACE.sarah} />
          <span className="ntf-rel-step-name">CFO</span>
          <span className="chip chip-pending">your turn</span>
        </span>
      </div>
    </RelTile>
  ),

  "notifications/related/review-agents": (
    <RelTile from="agent findings" to="reach a human via the feed">
      <div className="cmh-cmt cmh-cmt--plain">
        <Av initials="RA" agent />
        <div className="cmh-cmt-main">
          <div className="cmh-cmt-head">
            <span className="cmh-cmt-name">Review Agent</span>
            <span className="chip chip-agent">agent</span>
            <span className="cmh-cmt-time">2m</span>
          </div>
          <p className="cmh-cmt-body">Flagged 3 pricing claims on the Q3 deck</p>
        </div>
      </div>
    </RelTile>
  ),
};
