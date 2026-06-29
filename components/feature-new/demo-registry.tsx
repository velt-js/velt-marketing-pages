import type { ReactNode } from "react";

import "./audit-trail-showcase.css";
import { AuditLog, Precedent, DarkPanel } from "./demos";
import { Av, AgentFindingCard, FACES } from "./demo-presets/hero-surface";
import { ShieldIcon, VeltMark } from "./icons";
import type { FeatureNewDemoKey } from "./demo-keys";
import { MEMORY_DEMOS } from "./demo-presets/memory";
import { NOTIFICATIONS_DEMOS } from "./demo-presets/notifications";
import { PRESENCE_DEMOS } from "./demo-presets/presence";
import { MULTIPLAYER_EDITING_DEMOS } from "./demo-presets/multiplayer-editing";
import { RECORDING_DEMOS } from "./demo-presets/recording";
import { REVIEW_AGENTS_DEMOS } from "./demo-presets/review-agents";
import { APPROVAL_FLOWS_DEMOS } from "./demo-presets/approval-flows";
import { COMMENTS_DEMOS } from "./demo-presets/comments";
import { AiNativeBoard } from "./demo-presets/ai-board";
import { ComplianceBoard } from "./demo-presets/compliance-board";
import { DigitalSalesRoom } from "./demo-presets/digital-sales-room";
import { FintechBoard } from "./demo-presets/fintech-board";
import { LegalBoard } from "./demo-presets/legal-board";
import { OperationsBoard } from "./demo-presets/ops-board";
import { HUDDLE_DEMOS } from "./demo-presets/huddle";
import { SUGGESTIONS_DEMOS } from "./demo-presets/suggestions";
import { SELF_HOSTING_DEMOS } from "./demo-presets/self-hosting";
import { SOLUTIONS_SALES_ENABLEMENT_DEMOS } from "./demo-presets/solutions-sales-enablement";
import { SOLUTIONS_FINTECH_DEMOS } from "./demo-presets/solutions-fintech";
import { SOLUTIONS_OPERATIONS_DEMOS } from "./demo-presets/solutions-operations";
import { SOLUTIONS_AI_NATIVE_SAAS_DEMOS } from "./demo-presets/solutions-ai-native-saas";
import { SOLUTIONS_COMPLIANCE_DEMOS } from "./demo-presets/solutions-compliance";
import { SOLUTIONS_LEGAL_DEMOS } from "./demo-presets/solutions-legal";

// Canonical source for every v10 feature-page demo visual. Each entry maps a
// demo-preset key (see ./demo-keys.ts) to the simulated-UI ReactNode that
// renders it. Both the static page content modules (e.g. pages/audit-trail.tsx)
// and the Sanity content mapper (lib/feature-v2/to-content.tsx) resolve their
// visuals from here, so a CMS-driven page renders byte-for-byte like its
// static reference. Visuals are simulated, not live SDK instances.

const HERO_EXPORT = `POST /v2/activities/get
{ "data": { "documentId": "filing-q3" } }

[{
  "actionType": "approval.changed",
  "actionUser": "sarah@acme.com",
  "note": "Cleared with legal"
}]`;

// Audit-trail showcase personas mapped to the shared headshots.
const AUD_FACE = {
  sarah: FACES.hope,
  maya: FACES.fenne,
} as const;

/** @returns {JSX.Element} Activity / pulse glyph for the capture + recording cards. */
function IconPulse() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h4l2.5 7 5-14L17 12h4" />
    </svg>
  );
}

/** @returns {JSX.Element} Comment-bubble glyph for the comment.added event row. */
function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-11.9 7.6L3 21l1.9-6.1A8.4 8.4 0 1 1 21 11.5z" />
    </svg>
  );
}

/** @returns {JSX.Element} Pencil glyph for the edit.merged event row. */
function IconPencil() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20h4L18.5 9.5a2 2 0 0 0-2.8-2.8L5 17.5V20z" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

/** @returns {JSX.Element} Video glyph for the recording.shared event row. */
function IconVideo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="13" height="12" rx="2.5" />
      <path d="M16 10l5-3v10l-5-3" />
    </svg>
  );
}

/** @returns {JSX.Element} Badge-check glyph for the approval.changed event row. */
function IconBadgeCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l2.3 1.7 2.8-.2 1 2.7 2.4 1.5-.8 2.7.8 2.7-2.4 1.5-1 2.7-2.8-.2L12 21l-2.3-1.7-2.8.2-1-2.7L3.5 15l.8-2.7L3.5 9.6l2.4-1.5 1-2.7 2.8.2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/** @returns {JSX.Element} Small check glyph for record badges. */
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

/** @returns {JSX.Element} User-check glyph for the attribution header. */
function IconUserCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 12.5l1.8 1.8L21 11" />
    </svg>
  );
}

/** @returns {JSX.Element} Scale / judgment glyph for the judgment header. */
function IconScale() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v16M7 20h10" />
      <path d="M5 7h14l-2.5 5h-9z" />
      <path d="M5 7l-2.5 5h5z" />
      <path d="M19 7l2.5 5h-5z" />
    </svg>
  );
}

/** @returns {JSX.Element} Link glyph for the chain-of-custody header. */
function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Search glyph for the query header. */
function IconSearch2() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M16 16l5 5" />
    </svg>
  );
}

/** @returns {JSX.Element} Branch glyph for the decision-chain header. */
function IconRoute() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="19" r="2.4" />
      <circle cx="18" cy="5" r="2.4" />
      <path d="M8.4 19H13a4 4 0 0 0 4-4V7.4" />
    </svg>
  );
}

/** @returns {JSX.Element} Lock glyph for immutable records. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Layers glyph for the opt-in feed lane. */
function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  );
}

/** @returns {JSX.Element} Down-link arrow for immutable linked records. */
function IconArrowDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

/** @returns {JSX.Element} Download glyph for the exports header. */
function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M8 11l4 4 4-4" />
      <path d="M5 19h14" />
    </svg>
  );
}

/** @returns {JSX.Element} Braces glyph for the JSON export format. */
function IconBraces() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 4c-2 0-2.5 1-2.5 3v2c0 1.5-1 2-2 2 1 0 2 .5 2 2v2c0 2 .5 3 2.5 3" />
      <path d="M16 4c2 0 2.5 1 2.5 3v2c0 1.5 1 2 2 2-1 0-2 .5-2 2v2c0 2-.5 3-2.5 3" />
    </svg>
  );
}

/** @returns {JSX.Element} File glyph for the PDF / CSV / hash export formats. */
function IconFile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M18 21H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8l5 5v11a1 1 0 0 1-1 1z" />
    </svg>
  );
}

/** @returns {JSX.Element} Bolt glyph for the custom-events header. */
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z" />
    </svg>
  );
}

/** @returns {JSX.Element} Rocket glyph for the deploy custom event. */
function IconRocket() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
      <path d="M9 13c4-8 9-9 12-9 0 3-1 8-9 12l-3-3z" />
      <circle cx="15" cy="9" r="1.4" />
    </svg>
  );
}

/** @returns {JSX.Element} Key glyph for the permission-change custom event. */
function IconKey() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M17 3l3 3M15 5l2 2" />
    </svg>
  );
}

const AUDIT_TRAIL_DEMOS: Record<string, ReactNode> = {
  "audit-trail/hero/timeline": (
    <AuditLog
      head={{ left: "Quarterly filing · today", right: "filter: all features" }}
      rows={[
        {
          ts: "09:02:11",
          ev: (
            <>
              <strong>Brand Agent</strong> flagged a pricing claim
            </>
          ),
          chip: { label: "agent", kind: "agent" },
        },
        {
          ts: "09:14:40",
          ev: (
            <>
              <strong>Maya</strong> replied: “Second claim is sourced, see footnote 4”
            </>
          ),
          chip: { label: "human", kind: "pending" },
        },
        {
          ts: "09:21:03",
          ev: (
            <>
              <strong>Sarah</strong> approved: “Looks good”
            </>
          ),
          chip: { label: "approved", kind: "approved" },
        },
        {
          ts: "09:21:04",
          ev: (
            <>
              <strong>Webhook</strong> review.approved delivered
            </>
          ),
          chip: { label: "200", kind: "approved" },
        },
      ]}
    />
  ),

  "audit-trail/hero/export": (
    <DarkPanel footer="structured JSON · filterable · PDF & CSV (coming soon)">{HERO_EXPORT}</DarkPanel>
  ),

  "audit-trail/hero/history": (
    <AuditLog
      head={{ left: "statusHistory · filing-q3", right: "who · when · why" }}
      rows={[
        {
          ts: "Mon 14:01",
          ev: (
            <>
              <strong>Jordan</strong> submitted for review
            </>
          ),
          chip: { label: "submitted", kind: "pending" },
        },
        {
          ts: "Mon 14:03",
          ev: (
            <>
              <strong>Compliance Agent</strong> passed
            </>
          ),
          chip: { label: "agent", kind: "agent" },
        },
        {
          ts: "Tue 09:21",
          ev: (
            <>
              <strong>Sarah</strong> approved · “Cleared with legal”
            </>
          ),
          chip: { label: "approved", kind: "approved" },
        },
      ]}
    />
  ),

  "audit-trail/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <AuditLog
        head={{ left: "Quarterly filing · audit timeline" }}
        rows={[
          {
            ts: "09:02",
            ev: (
              <>
                <strong>Brand Agent</strong> flagged 2 claims · judge type AGENT · confidence 0.88
              </>
            ),
            chip: { label: "agent", kind: "agent" },
          },
          {
            ts: "09:14",
            ev: (
              <>
                <strong>Maya</strong> replied: “Second claim is sourced, see footnote 4” · judge type HUMAN
              </>
            ),
            chip: { label: "human", kind: "pending" },
          },
        ]}
      />
      <Precedent
        heading="statusHistory · expanded"
        body={"status: Approved · changedBy: Sarah · changedAt: 09:21:03 · note: “Cleared with legal.”"}
        meta="written synchronously with the status change"
      />
      <p className="code-microcopy">one trail, both actor types, the why attached to the decision</p>
    </div>
  ),

  // Everything is captured automatically (wide tile): a labeled activity-log
  // card where each product action lands as a record the moment it happens.
  "audit-trail/showcase/capture": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconPulse />
          Activity log
          <span className="cmh-cc-pill">auto-captured</span>
        </div>
        <div className="cmh-cc-body aud-evt">
          <div className="aud-evt-row">
            <span className="aud-evt-ic"><IconChat /></span>
            <span className="aud-evt-name">comment.added</span>
            <span className="aud-evt-meta">Sales deck · slide 4</span>
            <span className="aud-rec-badge"><IconCheck />recorded</span>
          </div>
          <div className="aud-evt-row">
            <span className="aud-evt-ic"><IconPencil /></span>
            <span className="aud-evt-name">edit.merged</span>
            <span className="aud-evt-meta">contract.md · clause 7</span>
            <span className="aud-rec-badge"><IconCheck />recorded</span>
          </div>
          <div className="aud-evt-row">
            <span className="aud-evt-ic"><IconVideo /></span>
            <span className="aud-evt-name">recording.shared</span>
            <span className="aud-evt-meta">walkthrough · 1:24</span>
            <span className="aud-rec-badge"><IconCheck />recorded</span>
          </div>
          <div className="aud-evt-row">
            <span className="aud-evt-ic"><IconBadgeCheck /></span>
            <span className="aud-evt-name">approval.changed</span>
            <span className="aud-evt-meta">filing-q3 · approved</span>
            <span className="aud-rec-badge"><IconCheck />recorded</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Attribution as a lookup (narrow tile): a statusHistory record rendered as
  // who / when / why key-value rows instead of a log investigation.
  "audit-trail/showcase/attribution": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--wide">
        <div className="cmh-cc-head apf-head--slate">
          <IconUserCheck />
          statusHistory
          <span className="cmh-cc-pill">who · when · why</span>
        </div>
        <div className="cmh-cc-body aud-kv">
          <div className="aud-kv-row">
            <span className="aud-kv-key">status</span>
            <span className="aud-kv-val"><span className="chip chip-approved">Approved</span></span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">changedBy</span>
            <span className="aud-kv-val aud-kv-user"><Av initials="SR" img={AUD_FACE.sarah} />Sarah</span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">changedAt</span>
            <span className="aud-kv-val">Tue 09:21</span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">note</span>
            <span className="aud-kv-val aud-kv-note">“Cleared with legal.”</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Evidence with context (narrow tile): a judgment record exposing judge type,
  // a confidence meter, the authority that required it, and the reasoning.
  "audit-trail/showcase/judgment": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--wide">
        <div className="cmh-cc-head apf-head--purple">
          <IconScale />
          Judgment record
          <span className="cmh-cc-pill">judge type</span>
        </div>
        <div className="cmh-cc-body aud-kv">
          <div className="aud-kv-row">
            <span className="aud-kv-key">judgeType</span>
            <span className="aud-kv-val"><span className="chip chip-agent">agent</span></span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">confidence</span>
            <span className="aud-kv-val">
              <span className="aud-meter"><span className="aud-meter-fill" style={{ width: "88%" }} /></span>
              0.88
            </span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">authority</span>
            <span className="aud-kv-val aud-kv-code">brand-policy-v4</span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">reasoning</span>
            <span className="aud-kv-val aud-kv-note">“Conflicts with the rate table.”</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Agents share the human trail (wide tile): an agent finding and a human
  // decision in one chain of custody, each tagged with its judge type.
  "audit-trail/showcase/agents": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconLink />
          Chain of custody
          <span className="cmh-cc-pill">agent + human</span>
        </div>
        <div className="cmh-cc-body aud-coc">
          <div className="aud-coc-item">
            <AgentFindingCard
              name="Brand Agent"
              time="09:02"
              body="This pricing claim conflicts with the rate table on slide 4."
              replies={2}
              actions={false}
            />
            <span className="aud-judge aud-judge--agent">judge type · agent</span>
          </div>
          <span className="aud-coc-tie">same trail</span>
          <div className="cmh-cmt cmh-cmt--plain">
            <Av initials="SR" img={AUD_FACE.sarah} />
            <div className="cmh-cmt-main">
              <div className="cmh-cmt-head">
                <span className="cmh-cmt-name">Sarah</span>
                <span className="cmh-cmt-time">09:21</span>
              </div>
              <p className="cmh-cmt-body">Accepted the finding: cleared with legal.</p>
              <span className="aud-judge aud-judge--human">judge type · human</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Recording without the UI cost (wide tile): two lanes — the capture pipeline
  // runs from day one while the feed UI stays an opt-in you ship whenever.
  "audit-trail/showcase/recording": (
    <div className="pv aud-lanes">
      <div className="aud-lane">
        <div className="aud-lane-head">
          <span className="aud-lane-ic"><IconPulse /></span>
          Recording pipeline
          <span className="aud-lane-tag aud-lane-tag--on">on · day one</span>
        </div>
        <div className="aud-lane-lines">
          <span className="aud-line"><i className="aud-line-dot" /><i className="aud-line-bar" style={{ width: "78%" }} /></span>
          <span className="aud-line"><i className="aud-line-dot" /><i className="aud-line-bar" style={{ width: "64%" }} /></span>
          <span className="aud-line"><i className="aud-line-dot" /><i className="aud-line-bar" style={{ width: "84%" }} /></span>
        </div>
        <p className="aud-lane-foot">Every action recorded silently</p>
      </div>
      <div className="aud-lane aud-lane--ghost">
        <div className="aud-lane-head">
          <span className="aud-lane-ic"><IconLayers /></span>
          Feed UI
          <span className="aud-lane-tag aud-lane-tag--opt">opt-in</span>
        </div>
        <div className="aud-lane-lines">
          <span className="aud-line"><i className="aud-line-dot" /><i className="aud-line-bar" style={{ width: "70%" }} /></span>
          <span className="aud-line"><i className="aud-line-dot" /><i className="aud-line-bar" style={{ width: "58%" }} /></span>
          <span className="aud-line"><i className="aud-line-dot" /><i className="aud-line-bar" style={{ width: "66%" }} /></span>
        </div>
        <p className="aud-lane-foot">Ship the timeline whenever</p>
      </div>
    </div>
  ),

  // Sampling is a query (narrow tile): the auditor's request rendered as a small
  // query card — filters as key-value rows, with the matched record count.
  "audit-trail/showcase/query": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--wide">
        <div className="cmh-cc-head apf-head--slate">
          <IconSearch2 />
          Query
          <span className="cmh-cc-pill">activities.get</span>
        </div>
        <div className="cmh-cc-body aud-kv">
          <div className="aud-kv-row">
            <span className="aud-kv-key">documentId</span>
            <span className="aud-kv-val aud-kv-code">filing-q3</span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">changedBy</span>
            <span className="aud-kv-val aud-kv-code">sarah</span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">feature</span>
            <span className="aud-kv-val aud-kv-code">approvals</span>
          </div>
          <div className="aud-query-result">
            <span className="aud-query-arrow">→</span>
            3 records matched
            <span className="chip chip-approved">200</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // The full story behind a sign-off (narrow tile): the comment, the revision,
  // and the approval as one ordered decision-chain timeline.
  "audit-trail/showcase/decisions": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--wide">
        <div className="cmh-cc-head apf-head--plum">
          <IconRoute />
          Decision chain
          <span className="cmh-cc-pill">in order</span>
        </div>
        <div className="cmh-cc-body aud-chain">
          <div className="aud-chain-step">
            <span className="aud-chain-node"><span className="aud-chain-dot" /></span>
            <div className="aud-chain-main">
              <p className="aud-chain-label"><strong>Comment</strong> flagged the claim</p>
              <span className="aud-chain-meta">Brand Agent · 09:02</span>
            </div>
            <span className="chip chip-agent">flagged</span>
          </div>
          <div className="aud-chain-step">
            <span className="aud-chain-node"><span className="aud-chain-dot" /></span>
            <div className="aud-chain-main">
              <p className="aud-chain-label"><strong>Revision</strong> corrected the copy</p>
              <span className="aud-chain-meta">Maya · 09:14</span>
            </div>
            <span className="chip chip-pending">revised</span>
          </div>
          <div className="aud-chain-step">
            <span className="aud-chain-node"><span className="aud-chain-dot" /></span>
            <div className="aud-chain-main">
              <p className="aud-chain-label"><strong>Approval</strong> signed off</p>
              <span className="aud-chain-meta">Sarah · 09:21</span>
            </div>
            <span className="chip chip-approved">approved</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Evidence stays evidence (wide tile): edits append a new linked record and
  // deletes leave the original standing — immutability on by default.
  "audit-trail/showcase/immutable": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--ink">
          <IconLock />
          Immutable records
          <span className="cmh-cc-pill">on by default</span>
        </div>
        <div className="cmh-cc-body aud-immut">
          <div className="aud-immut-case">
            <p className="aud-immut-cap">Edit a record</p>
            <span className="aud-rec aud-rec--locked"><IconLock />rec_118<span className="aud-rec-tag">original</span></span>
            <span className="aud-link"><IconArrowDown />new linked record</span>
            <span className="aud-rec"><IconCheck />rec_204<span className="aud-rec-tag">linked</span></span>
          </div>
          <div className="aud-immut-case">
            <p className="aud-immut-cap">Delete the content</p>
            <span className="aud-rec aud-rec--struck">content removed</span>
            <span className="aud-link"><IconLock />record stands</span>
            <span className="aud-rec aud-rec--locked"><IconLock />rec_118<span className="aud-rec-tag">preserved</span></span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Same chain, any format (wide tile): one record set assembled into JSON today
  // and PDF / CSV / hash-chain packages on the roadmap.
  "audit-trail/showcase/exports": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--teal">
          <IconDownload />
          Exports
          <span className="cmh-cc-pill">same chain</span>
        </div>
        <div className="cmh-cc-body aud-export">
          <div className="aud-export-set">
            <p className="aud-export-set-cap">Record set</p>
            <div className="aud-export-stack" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="aud-export-meta">filing-q3 · 142 records</p>
          </div>
          <div className="aud-fmt">
            <div className="aud-fmt-row">
              <span className="aud-fmt-ic"><IconBraces /></span>
              <span className="aud-fmt-name">JSON</span>
              <span className="aud-fmt-meta">REST API</span>
              <span className="chip chip-approved">shipped</span>
            </div>
            <div className="aud-fmt-row">
              <span className="aud-fmt-ic"><IconFile /></span>
              <span className="aud-fmt-name">PDF</span>
              <span className="aud-fmt-meta">package</span>
              <span className="aud-soon">soon</span>
            </div>
            <div className="aud-fmt-row">
              <span className="aud-fmt-ic"><IconFile /></span>
              <span className="aud-fmt-name">CSV</span>
              <span className="aud-fmt-meta">export</span>
              <span className="aud-soon">soon</span>
            </div>
            <div className="aud-fmt-row">
              <span className="aud-fmt-ic"><IconLock /></span>
              <span className="aud-fmt-name">Hash chains</span>
              <span className="aud-fmt-meta">tamper-evident</span>
              <span className="aud-soon">soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Your events in the same timeline (narrow tile): deploys, exports, and
  // permission changes recorded alongside the trail reviewers already generate.
  "audit-trail/showcase/custom-events": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--wide">
        <div className="cmh-cc-head apf-head--purple">
          <IconBolt />
          Custom events
          <span className="cmh-cc-pill">your types</span>
        </div>
        <div className="cmh-cc-body aud-evt">
          <div className="aud-evt-row">
            <span className="aud-evt-ic"><IconRocket /></span>
            <span className="aud-evt-name">deploy</span>
            <span className="aud-evt-meta">v2.14 → production</span>
            <span className="chip chip-pending">custom</span>
          </div>
          <div className="aud-evt-row">
            <span className="aud-evt-ic"><IconDownload /></span>
            <span className="aud-evt-name">export</span>
            <span className="aud-evt-meta">quarterly package</span>
            <span className="chip chip-pending">custom</span>
          </div>
          <div className="aud-evt-row">
            <span className="aud-evt-ic"><IconKey /></span>
            <span className="aud-evt-name">permission.changed</span>
            <span className="aud-evt-meta">role · editor → admin</span>
            <span className="chip chip-pending">custom</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "audit-trail/make-it-yours/look": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head aud-look-head">
          <span className="aud-look-mark"><ShieldIcon /></span>
          <span className="aud-look-brand">Acme · Audit</span>
          <span className="cmh-cc-pill">your theme</span>
        </div>
        <div className="cmh-cc-body aud-evt">
          <div className="aud-evt-row">
            <span className="aud-evt-ic aud-look-ic"><IconBadgeCheck /></span>
            <span className="aud-evt-name">approval.changed</span>
            <span className="aud-evt-meta">Sarah · 09:21</span>
            <span className="aud-rec-badge aud-look-sign"><IconLock />signed</span>
          </div>
          <div className="aud-evt-row">
            <span className="aud-evt-ic aud-look-ic"><IconPencil /></span>
            <span className="aud-evt-name">edit.merged</span>
            <span className="aud-evt-meta">Maya · 09:14</span>
            <span className="aud-rec-badge aud-look-sign"><IconLock />signed</span>
          </div>
          <div className="aud-evt-row">
            <span className="aud-evt-ic aud-look-ic"><IconChat /></span>
            <span className="aud-evt-name">comment.added</span>
            <span className="aud-evt-meta">Dev · 09:02</span>
            <span className="aud-rec-badge aud-look-sign"><IconLock />signed</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "audit-trail/make-it-yours/behavior": (
    <div className="pv">
      <div className="cmh-cc cmh-cc--wide">
        <div className="cmh-cc-head apf-head--ink">
          <IconBolt />
          Audit config
          <span className="cmh-cc-pill">your rules</span>
        </div>
        <div className="cmh-cc-body aud-kv">
          <div className="aud-kv-row">
            <span className="aud-kv-key">retention</span>
            <span className="aud-kv-val">7 years<span className="aud-rec-badge"><IconLock />immutable</span></span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">exports</span>
            <span className="aud-kv-val">
              <span className="aud-cfg-fmt">JSON</span>
              <span className="aud-cfg-fmt">CSV</span>
              <span className="aud-cfg-fmt">PDF</span>
            </span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">customEvents</span>
            <span className="aud-kv-val aud-kv-code">deploy.shipped</span>
          </div>
          <div className="aud-kv-row">
            <span className="aud-kv-key">scope</span>
            <span className="aud-kv-val"><span className="chip chip-pending">per-document</span></span>
          </div>
        </div>
      </div>
    </div>
  ),

  "audit-trail/in-production/sales": <DigitalSalesRoom />,

  "audit-trail/in-production/fintech": <FintechBoard />,

  "audit-trail/in-production/operations": <OperationsBoard />,

  "audit-trail/in-production/compliance": <ComplianceBoard />,

  "audit-trail/in-production/legal": <LegalBoard />,

  "audit-trail/in-production/ai": <AiNativeBoard />,

  "audit-trail/related/approval-flows": (
    <div className="pv">
      <div className="aud-rel aud-rel-chain">
        <div className="aud-rel-step">
          <Av initials="MA" tone="a2" img={AUD_FACE.maya} />
          <span className="aud-rel-step-name">Step 1 · Maya</span>
          <span className="chip chip-approved">approved</span>
        </div>
        <div className="aud-rel-step">
          <Av initials="SR" tone="a3" img={AUD_FACE.sarah} />
          <span className="aud-rel-step-name">Step 2 · Sarah</span>
          <span className="chip chip-approved">approved</span>
        </div>
        <div className="apf-note apf-note--ok">
          <span className="chip chip-approved">recorded</span>
          <span>Every transition on the record</span>
        </div>
      </div>
    </div>
  ),

  "audit-trail/related/review-agents": (
    <div className="pv">
      <div className="aud-rel">
        <div className="aud-rel-find">
          <Av initials="BA" agent />
          <div className="aud-rel-find-main">
            <div className="aud-rel-find-head">
              <span className="aud-rel-find-name">Brand Agent</span>
              <span className="chip chip-agent">0.88</span>
            </div>
            <p className="aud-rel-find-body">Findings recorded with confidence, on the same trail as human decisions.</p>
          </div>
        </div>
      </div>
    </div>
  ),

  "audit-trail/related/self-hosting": (
    <div className="pv">
      <div className="aud-rel">
        <div className="aud-rel-flow">
          <span className="aud-rel-node">
            <IconFile />
            Log content
          </span>
          <span className="aud-rel-conn" aria-hidden="true" />
          <span className="aud-rel-node aud-rel-node--db">
            <IconLock />
            Your database
          </span>
        </div>
        <p className="aud-rel-cap">log content → your database, in your region</p>
      </div>
    </div>
  ),
};

// Every page's demo nodes merged into one lookup. resolveDemo reads from here.
const DEMOS: Record<string, ReactNode> = {
  ...AUDIT_TRAIL_DEMOS,
  ...MEMORY_DEMOS,
  ...NOTIFICATIONS_DEMOS,
  ...PRESENCE_DEMOS,
  ...MULTIPLAYER_EDITING_DEMOS,
  ...RECORDING_DEMOS,
  ...REVIEW_AGENTS_DEMOS,
  ...APPROVAL_FLOWS_DEMOS,
  ...COMMENTS_DEMOS,
  ...HUDDLE_DEMOS,
  ...SUGGESTIONS_DEMOS,
  ...SELF_HOSTING_DEMOS,
  ...SOLUTIONS_SALES_ENABLEMENT_DEMOS,
  ...SOLUTIONS_FINTECH_DEMOS,
  ...SOLUTIONS_OPERATIONS_DEMOS,
  ...SOLUTIONS_AI_NATIVE_SAAS_DEMOS,
  ...SOLUTIONS_COMPLIANCE_DEMOS,
  ...SOLUTIONS_LEGAL_DEMOS,
};

/**
 * Resolve a demo-preset key to its ReactNode. Unknown keys render null so a
 * mistyped or not-yet-wired key fails soft instead of crashing the page.
 * @param {string | undefined | null} key The demo-preset key.
 * @returns {ReactNode} The demo node, or null when the key is unknown.
 */
export function resolveDemo(key: string | undefined | null): ReactNode {
  try {
    if (!key) return null;
    return DEMOS[key as FeatureNewDemoKey] ?? null;
  } catch (error) {
    console.error("resolveDemo failed", error);
    return null;
  }
}

/**
 * Resolve an icon-preset key to its ReactNode (for Make-it-yours / Related
 * card icons).
 * @param {string | undefined | null} key The icon-preset key.
 * @returns {ReactNode} The icon node, or null when the key is unknown.
 */
export function resolveIcon(key: string | undefined | null): ReactNode {
  try {
    if (key === "shield") return <ShieldIcon />;
    if (key === "velt") return <VeltMark size={18} fill="var(--vlp-color-accent)" />;
    return null;
  } catch (error) {
    console.error("resolveIcon failed", error);
    return null;
  }
}
