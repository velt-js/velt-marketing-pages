import type { ReactNode } from "react";

import { DarkPanel } from "../demos";
import { AiNativeBoard } from "./ai-board";
import { ComplianceBoard } from "./compliance-board";
import { DigitalSalesRoom } from "./digital-sales-room";
import { FintechBoard } from "./fintech-board";
import { LegalBoard } from "./legal-board";
import { OperationsBoard } from "./ops-board";
import {
  AgentFindingCard,
  Av,
  DEL_STYLE,
  FACES,
  Frame,
  IconAgentMark,
  IconArrowRight,
  IconBubble,
  IconReply,
  IconSearch,
  INS_STYLE,
} from "./hero-surface";

import "./comments-related.css";

// Comments-page personas mapped to shared headshots.
const FACE = {
  maya: FACES.fenne,
  sarah: FACES.hope,
  dev: FACES.ethan,
  you: FACES.jeff,
} as const;

// Simulated-UI demo nodes for the /new-features/comments page. Keys match
// components/feature-new/demo-presets/comments.keys.ts; resolved by
// demo-registry.tsx. Visuals are simulated, not live SDK instances.

export const COMMENTS_DEMOS: Record<string, ReactNode> = {
  "comments/hero/freestyle": (
    <Frame
      app="SD"
      crumb={<><b>Sales deck</b> <span className="sep">/</span> slide 4 · pricing</>}
      users={[{ initials: "SR", tone: "a3", img: FACE.sarah }, { initials: "MA", tone: "a2", img: FACE.maya }, { initials: "BA", agent: true }]}
    >
      <div className="cmh-freestyle">
        <div className="cmh-afc-float">
          <AgentFindingCard
            name="Brand Agent"
            time="2m"
            body="This pricing claim conflicts with the rate table on slide 4."
            replies={2}
            actions={false}
          />
        </div>

        <div className="cmh-chart">
          <div className="cmh-bars">
            <div className="bar" style={{ height: "48%" }} />
            <div className="bar" style={{ height: "38%" }} />
            <div className="bar hot" style={{ height: "82%" }}>
              <span className="cmh-pin"><IconBubble />2</span>
            </div>
            <div className="bar" style={{ height: "44%" }} />
          </div>
          <div className="cmh-xrow">
            <span>Q1</span>
            <span>Q2</span>
            <span>Q3</span>
            <span>Q4</span>
          </div>
        </div>
      </div>
    </Frame>
  ),

  "comments/hero/popover": (
    <Frame
      app="SH"
      crumb={<><b>Q3 Pricing</b> <span className="sep">/</span> forecast.xlsx</>}
      users={[{ initials: "SR", tone: "a3", img: FACE.sarah }, { initials: "MA", tone: "a2", img: FACE.maya }]}
    >
      <div className="cmh-sheet">
        <div className="cmh-grid">
          <span className="cmh-gh cmh-gh-corner" />
          <span className="cmh-gh">A</span>
          <span className="cmh-gh">B</span>
          <span className="cmh-gh">C</span>

          <span className="cmh-gr">1</span>
          <span className="cmh-gc cmh-gc-strong">Plan</span>
          <span className="cmh-gc cmh-gc-strong">Current</span>
          <span className="cmh-gc cmh-gc-strong">Proposed</span>

          <span className="cmh-gr">2</span>
          <span className="cmh-gc">Starter</span>
          <span className="cmh-gc">$29</span>
          <span className="cmh-gc">$35</span>

          <span className="cmh-gr">3</span>
          <span className="cmh-gc">Pro</span>
          <span className="cmh-gc">$79</span>
          <span className="cmh-gc cmh-gc-hl">$85<i className="cmh-gc-flag" /></span>
        </div>

        <div className="cmh-cmt cmh-cmt-end">
          <Av initials="BA" agent />
          <div className="cmh-cmt-main">
            <div className="cmh-cmt-head">
              <span className="cmh-cmt-name">Brand Agent</span>
              <span className="cmh-cmt-time">2m</span>
            </div>
            <p className="cmh-cmt-body">$85 doesn’t match the approved Q3 number.</p>
            <span className="cmh-cmt-replies"><IconReply />1 Reply</span>
          </div>
        </div>
      </div>
    </Frame>
  ),

  "comments/hero/text": (
    <Frame
      app="TT"
      crumb={<><b>contract.md</b> <span className="sep">/</span> Tiptap</>}
      users={[{ initials: "MA", tone: "a2", img: FACE.maya }, { initials: "SR", tone: "a3", img: FACE.sarah }]}
    >
      <div className="cmh-toolbar">
        <span className="tb" style={{ fontWeight: 800 }}>B</span>
        <span className="tb" style={{ fontStyle: "italic" }}>I</span>
        <span className="tb" style={{ textDecoration: "underline" }}>U</span>
        <span className="vbar" />
        <span className="tb">H1</span>
        <span className="tb">❝</span>
        <span className="vbar" />
        <span className="tb" style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10.5 }}>&lt;/&gt;</span>
      </div>

      <div className="cmh-td">
        <p className="cmh-td-doc">
          7.2 The Provider shall <span className="cmh-mark">indemnify and hold harmless</span> the Client against all claims arising from the Services, including but not limited to indirect and consequential losses.
        </p>

        <div className="cmh-td-comment">
          <div className="cmh-td-chead">
            <span className="cmh-td-status">
              <svg className="cmh-td-dot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>
              Open
              <svg className="cmh-td-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </span>
            <span className="cmh-td-flag">
              <svg className="cmh-td-flagico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
              <svg className="cmh-td-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </span>
            <span className="cmh-td-actions">
              <svg className="cmh-td-kebab" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
              <span className="cmh-td-resolve" aria-label="Resolve">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
              </span>
            </span>
          </div>
          <div className="cmh-td-msg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cmh-td-avatar" src={FACE.maya} alt="Maya" />
            <span className="cmh-td-name">Maya</span>
            <span className="cmh-td-time">14m</span>
            <svg className="cmh-td-read" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 13l4 4 8-9" /><path d="M11 16l1.5 1.5L21 8" /></svg>
          </div>
          <p className="cmh-td-text">This clause needs a liability cap before we send. <span className="cmh-td-mention">@Sarah</span> can you confirm scope?</p>
        </div>
      </div>
    </Frame>
  ),

  "comments/hero/inbox": (
    <Frame
      app="VC"
      crumb={<><b>Comments</b> <span className="sep">/</span> inbox</>}
      right={<span className="cmh-search"><IconSearch />Search threads</span>}
    >
      <div className="cmh-filters">
        <span className="cmh-ft on">All</span>
        <span className="cmh-ft">Unresolved</span>
        <span className="cmh-ft">Mentions</span>
        <span className="cmh-ft">Agents</span>
      </div>

      <div className="cmh-group">Today</div>
      <div className="cmh-inrow">
        <span className="cmh-unread" />
        <Av initials="BA" agent />
        <div className="cmh-inmain">
          <p className="t"><b>Brand Agent</b> flagged a pricing claim <span className="chip chip-agent" style={{ marginLeft: 4 }}>agent</span></p>
          <p className="m"><span className="quote">“conflicts with the rate table on slide 4”</span></p>
        </div>
        <span className="cmh-when">2m</span>
      </div>
      <div className="cmh-inrow">
        <span className="cmh-unread" />
        <Av initials="MA" tone="a2" img={FACE.maya} />
        <div className="cmh-inmain">
          <p className="t"><b>Maya</b> mentioned you on Clause 7 <span className="chip chip-pending" style={{ marginLeft: 4 }}>mention</span></p>
          <p className="m"><span className="quote">“needs a liability cap before we send”</span></p>
        </div>
        <span className="cmh-when">14m</span>
      </div>

      <div className="cmh-group">Earlier</div>
      <div className="cmh-inrow">
        <span className="cmh-unread read" />
        <Av initials="SR" tone="a3" img={FACE.sarah} />
        <div className="cmh-inmain">
          <p className="t"><b>Sarah</b> resolved the Q3 forecast thread <span className="chip chip-approved" style={{ marginLeft: 4 }}>resolved</span></p>
          <p className="m">forecast.xlsx · cell B12</p>
        </div>
        <span className="cmh-when">1h</span>
      </div>
    </Frame>
  ),

  "comments/what-it-is/scene": (
    <>
      <div className="scene-slide">
        <div className="cmh-scene-head">
          <span className="slide-tag">Sales deck · slide 4</span>
          <span className="cmh-scene-avs">
            <Av initials="BA" agent />
            <Av initials="DV" tone="a3" img={FACE.dev} />
            <Av initials="MA" tone="a2" img={FACE.maya} />
          </span>
        </div>
        <p className="cmh-scene-title">One thread, both actors</p>
      </div>

      <div className="scene-thread cmh-thread">
        <div className="cmh-cmt cmh-cmt--plain">
          <Av initials="BA" agent />
          <div className="cmh-cmt-main">
            <div className="cmh-cmt-head">
              <span className="cmh-cmt-name">Brand Agent</span>
              <span className="chip chip-agent">agent</span>
              <span className="cmh-cmt-time">2m</span>
            </div>
            <p className="cmh-cmt-body">This pricing claim conflicts with the rate table on slide 4. Suggested fix attached.</p>
            <div className="cmh-cmt-actions">
              <button type="button" className="cmh-btn approve">Approve</button>
              <button type="button" className="cmh-btn reject">Reject</button>
            </div>
          </div>
        </div>

        <div className="cmh-cmt cmh-cmt--plain">
          <Av initials="DV" tone="a3" img={FACE.dev} />
          <div className="cmh-cmt-main">
            <div className="cmh-cmt-head">
              <span className="cmh-cmt-name">Dev</span>
              <span className="cmh-cmt-time">1m</span>
            </div>
            <p className="cmh-cmt-body"><span className="cmh-cc-mention">@Maya</span> can you confirm the Q3 number?</p>
          </div>
        </div>

        <div className="cmh-cmt cmh-cmt--plain">
          <Av initials="MA" tone="a2" img={FACE.maya} />
          <div className="cmh-cmt-main">
            <div className="cmh-cmt-head">
              <span className="cmh-cmt-name">Maya</span>
              <span className="cmh-cmt-time">now</span>
              <span className="chip chip-approved cmh-cmt-chip">accepted</span>
            </div>
            <p className="cmh-cmt-body">Confirmed, accepting.</p>
          </div>
        </div>
      </div>

      <p className="webhook-line"><span className="pulse" />accepted · webhook review.approved fired · consent visible</p>
    </>
  ),

  "comments/showcase/anything": (
    <div className="pv cmh-any">
      <div className="cmh-any-scene">
        <svg className="cmh-any-donut" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="38" fill="none" stroke="#54a8f5" strokeWidth="16" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#f1502f" strokeWidth="16" strokeDasharray="43 196" strokeLinecap="butt" transform="rotate(-90 50 50)" />
        </svg>
        <div className="cmh-any-lines" aria-hidden="true">
          <span className="cmh-any-line cmh-any-line--hl" style={{ width: "58%" }} />
          <span className="cmh-any-line" style={{ width: "84%" }} />
          <span className="cmh-any-line" style={{ width: "70%" }} />
        </div>
      </div>

      <div className="cmh-afc-float cmh-any-cmt">
        <AgentFindingCard
          name="Brand Agent"
          time="2m"
          body="This pricing claim conflicts with the rate table on slide 4."
          replies={2}
          actions={false}
        />
      </div>
    </div>
  ),

  "comments/showcase/agents": (
    <div className="pv">
      <div className="cmh-afc-fill">
        <AgentFindingCard
          name="Review Agent"
          time="2m"
          body="Clause 7 omits a liability cap. Suggested fix attached."
          replies={1}
        />
      </div>
    </div>
  ),

  "comments/showcase/private": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--tight">
        <div className="cmh-cc-head cmh-cc-head--private">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          Only visible to
          <span className="cmh-cc-pill">your team
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </div>
        <div className="cmh-cc-body">
          <div className="cmh-cmt cmh-cmt--plain">
            <Av initials="M" tone="a2" />
            <div className="cmh-cmt-main">
              <div className="cmh-cmt-head">
                <span className="cmh-cmt-name">Maya</span>
                <span className="cmh-cmt-time">2m</span>
              </div>
              <p className="cmh-cmt-body">Hold the discount: let&apos;s counter at 12%.</p>
              <span className="cmh-cmt-replies"><IconReply />2 Replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "comments/showcase/mentions": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--wide">
        <div className="cmh-cc-head cmh-cc-head--assign">
          <span className="cmh-cc-mark"><IconAgentMark /></span>
          Assigned to
          <span className="cmh-cc-pill">Kim
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </div>
        <div className="cmh-cc-body">
          <div className="cmh-cmt cmh-cmt--plain">
            <Av initials="R" tone="a2" />
            <div className="cmh-cmt-main">
              <div className="cmh-cmt-head">
                <span className="cmh-cmt-name">Rogers</span>
                <span className="cmh-cmt-time">2m</span>
              </div>
              <p className="cmh-cmt-body"><span className="cmh-cc-mention">@Maya</span> pulled into the thread</p>
              <span className="cmh-cmt-replies"><IconReply />2 Replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "comments/showcase/status": (
    <div className="pv cmh-status">
      <div className="cmh-status-card">
        <div className="cmh-status-top">
          <span className="cmh-status-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>
            Open
            <svg className="cmh-status-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </span>
          <span className="cmh-status-views">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
            3 Views
          </span>
        </div>
        <span className="cmh-status-line" />
      </div>

      <div className="cmh-status-menu">
        <div className="cmh-status-opt cmh-status-opt--on">
          <svg className="cmh-status-ic cmh-status-ic--open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>
          Open
          <svg className="cmh-status-chk" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
        </div>
        <div className="cmh-status-opt">
          <svg className="cmh-status-ic cmh-status-ic--prog" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="3 3.4" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>
          In Progress
        </div>
        <div className="cmh-status-opt">
          <svg className="cmh-status-ic cmh-status-ic--done" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 13l4 4 8-9" /><path d="M11 16l1.5 1.5L21 8" /></svg>
          Resolved
        </div>
      </div>
    </div>
  ),

  "comments/showcase/attachments": (
    <div className="pv cmh-att">
      <div className="cmh-att-card">
        <div className="cmh-cmt cmh-cmt--plain">
          <Av initials="R" tone="a2" />
          <div className="cmh-cmt-main">
            <div className="cmh-cmt-head">
              <span className="cmh-cmt-name">Rogers</span>
              <span className="cmh-cmt-time">2m</span>
            </div>
            <p className="cmh-cmt-body"><span className="cmh-cc-mention">@Maya</span> Update text based on this</p>
            <div className="cmh-att-file">
              <span className="cmh-att-file-info">
                <svg className="cmh-att-pdf" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M5 12V5a2 2 0 0 1 2-2h7l5 5v4" />
                  <path d="M5 18h1.5a1.5 1.5 0 0 0 0-3H5v6" />
                  <path d="M17 18h2" />
                  <path d="M20 15h-3v6" />
                  <path d="M11 15v6h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z" />
                </svg>
                <span className="cmh-att-file-name">Brand Guideline.pdf</span>
              </span>
              <button type="button" className="cmh-att-file-x" aria-label="Remove attachment">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="cmh-att-lines" aria-hidden="true">
        <span className="cmh-att-line"><i className="cmh-att-hl" /></span>
        <span className="cmh-att-line" style={{ width: "68%" }} />
        <span className="cmh-att-line" style={{ width: "85%" }} />
      </div>
    </div>
  ),

  "comments/showcase/recordings": (
    <div className="pv">
      <div className="cmh-rec-card">
        <div className="cmh-cmt cmh-cmt--plain">
          <Av initials="K" tone="a4" />
          <div className="cmh-cmt-main">
            <div className="cmh-cmt-head">
              <span className="cmh-cmt-name">Kim</span>
              <span className="cmh-cmt-time">2m</span>
            </div>
            <p className="cmh-cmt-body">Please see the recording to update the slides</p>
          </div>
        </div>

        <div className="cmh-rec-media">
          <div className="cmh-rec-thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/features/comments/recording-thumb.jpg" alt="Kim's screen recording" />
            <span className="cmh-rec-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="cmh-rec-bar" aria-hidden="true" />
          </div>

          <div className="cmh-rec-foot">
            <span className="cmh-rec-file">
              <span className="cmh-rec-spin" aria-hidden="true">S</span>
              <span className="cmh-rec-fname">Kim&apos;s Recording-24Apr2024…</span>
            </span>
            <span className="cmh-rec-icons" aria-hidden="true">
              <svg className="cmh-rec-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="M10 9.8a1.7 1.7 0 0 0-3 0v4.4a1.7 1.7 0 0 0 3 0" />
                <path d="M17 9.8a1.7 1.7 0 0 0-3 0v4.4a1.7 1.7 0 0 0 3 0" />
              </svg>
              <svg className="cmh-rec-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                <path d="M9 13h6" />
                <path d="M9 17h6" />
              </svg>
              <svg className="cmh-rec-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="5" r="1.6" />
                <circle cx="12" cy="12" r="1.6" />
                <circle cx="12" cy="19" r="1.6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),

  "comments/showcase/webhooks": (
    <div className="pv">
      <DarkPanel footer="comment · reply · resolve · approval: full payload">
        {"POST /your-webhook\n{\n  \"event\": \"comment.added\",\n  \"documentId\": \"deck-q3\"\n}"}
      </DarkPanel>
    </div>
  ),

  "comments/make-it-yours/look": (
    <div className="pv cmh-look">
      <div className="cmh-look-wrap">
        <span className="cmh-look-pin" aria-hidden="true"><span className="cmh-look-pin-k">K</span></span>
        <div className="cmh-look-card">
          <div className="cmh-look-top">
            <span className="cmh-look-cluster" aria-hidden="true">
              <span className="cmh-look-av cmh-look-av--k">K</span>
              <span className="cmh-look-av cmh-look-av--m">M</span>
              <span className="cmh-look-av cmh-look-av--r">R</span>
            </span>
            <span className="cmh-look-time">2m</span>
          </div>
          <p className="cmh-look-who"><strong>Kim</strong> &amp; 3 others</p>
          <p className="cmh-cmt-body">We should be updating all the new assets with the new logo</p>
        </div>
      </div>
    </div>
  ),

  "comments/make-it-yours/behavior": (
    <div className="pv cmh-flow">
      <div className="cmh-flow-top">
        <span className="cmh-flow-pill cmh-flow-pill--trigger">
          <svg className="cmh-flow-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3.3 20.5 21 12 3.3 3.5a.6.6 0 0 0-.84.7L4.2 11l8.3 1-8.3 1-1.74 6.8a.6.6 0 0 0 .84.7z" />
          </svg>
          Comment Submit
        </span>
      </div>

      <div className="cmh-flow-fan" aria-hidden="true">
        <span className="cmh-flow-stem" />
        <span className="cmh-flow-bar" />
        <span className="cmh-flow-arm cmh-flow-arm--left" />
        <span className="cmh-flow-arm cmh-flow-arm--right" />
      </div>

      <div className="cmh-flow-row">
        <span className="cmh-flow-cell">
          <span className="cmh-flow-pill cmh-flow-pill--action">
            <svg className="cmh-flow-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z" />
            </svg>
            Trigger Webhook
          </span>
        </span>
        <span className="cmh-flow-cell">
          <span className="cmh-flow-pill cmh-flow-pill--action">
            <svg className="cmh-flow-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z" />
            </svg>
            REST API v2
          </span>
        </span>
      </div>
    </div>
  ),

  // Per-vertical "dummy app" surfaces for the In Production tabs: each renders a
  // believable in-product window (app chrome + an anchored Velt thread) for that
  // vertical, so the proof section reads as a real screenshot rather than a bare
  // comment card. Tabs mirror the Solutions nav (AI-native last). Sales is the
  // Figma "Digital Sales Room"; the rest reuse the shared vertical boards.
  "comments/in-production/sales": <DigitalSalesRoom />,

  "comments/in-production/fintech": <FintechBoard />,

  "comments/in-production/ops": <OperationsBoard />,

  "comments/in-production/compliance": <ComplianceBoard />,

  "comments/in-production/legal": <LegalBoard />,

  "comments/in-production/ai": <AiNativeBoard />,

  "comments/related/suggestions": (
    <div className="pv">
      <div className="cmh-cmt cmh-cmt--plain">
        <Av initials="MA" tone="a2" img={FACE.maya} />
        <div className="cmh-cmt-main">
          <div className="cmh-cmt-head">
            <span className="cmh-cmt-name">Maya</span>
            <span className="cmh-cmt-time">suggested a change</span>
          </div>
          <div className="afc-diff">
            <del style={DEL_STYLE}>30-day terms</del>
            <span className="afc-arrow"><IconArrowRight /></span>
            <ins style={INS_STYLE}>45-day terms</ins>
          </div>
        </div>
      </div>
    </div>
  ),

  "comments/related/review-agents": (
    <div className="pv">
      <div className="cmh-cmt cmh-cmt--plain">
        <Av initials="RA" agent />
        <div className="cmh-cmt-main">
          <div className="cmh-cmt-head">
            <span className="cmh-cmt-name">Review Agent</span>
            <span className="cmh-cmt-time">now</span>
          </div>
          <p className="cmh-cmt-body">Finding lands as a comment, anchored to the work.</p>
          <span className="cmh-cmt-replies"><IconReply />2 Replies</span>
        </div>
      </div>
    </div>
  ),

  "comments/related/notifications": (
    <div className="pv">
      <div className="cmh-inrow">
        <span className="cmh-unread" />
        <Av initials="MA" tone="a2" img={FACE.maya} />
        <div className="cmh-inmain">
          <p className="t"><b>Maya</b> replied to your thread</p>
          <p className="m">the pipeline that keeps threads alive</p>
          <div className="crl-chans">
            <span className="crl-chan">Inbox</span>
            <span className="crl-chan">Email</span>
            <span className="crl-chan">Slack</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
