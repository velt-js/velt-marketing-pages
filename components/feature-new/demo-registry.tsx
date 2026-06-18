import type { ReactNode } from "react";

import { AuditLog, Precedent, DarkPanel, ProvRow, ProvArrow } from "./demos";
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

const HERO_EXPORT = `GET /v2/activities?document=filing-q3

[{
  "event": "approval.changed",
  "changedBy": "sarah@acme.com",
  "note": "Cleared with legal"
}]`;

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

  "audit-trail/showcase/capture": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "live", ev: <><strong>comment.added</strong> · recorded</>, chip: { label: "auto", kind: "approved" } },
          { ts: "live", ev: <><strong>edit.merged</strong> · recorded</>, chip: { label: "auto", kind: "approved" } },
          { ts: "live", ev: <><strong>approval.changed</strong> · recorded</>, chip: { label: "auto", kind: "approved" } },
        ]}
      />
    </div>
  ),

  "audit-trail/showcase/attribution": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="statusHistory"
        body={"Approved · Sarah · Tue 09:21 · “Cleared with legal.”"}
      />
    </div>
  ),

  "audit-trail/showcase/judgment": (
    <div className="pv">
      <div className="int-chips">
        <span className="int-chip"><i />reasoning</span>
        <span className="int-chip"><i />confidence</span>
        <span className="int-chip"><i />judgeType</span>
        <span className="int-chip"><i />authority</span>
        <span className="int-chip"><i />priorJudgments</span>
        <span className="int-chip"><i />contentContext</span>
      </div>
    </div>
  ),

  "audit-trail/showcase/agents": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "09:02", ev: <><strong>Brand Agent</strong> flagged claim</>, chip: { label: "agent", kind: "agent" } },
          { ts: "09:21", ev: <><strong>Sarah</strong> accepted finding</>, chip: { label: "human", kind: "approved" } },
        ]}
      />
    </div>
  ),

  "audit-trail/showcase/recording": (
    <div className="pv">
      <ProvRow>pipeline <ProvArrow /> recording from day one</ProvRow>
      <ProvRow>feed UI <ProvArrow /> opt-in, whenever you ship it</ProvRow>
    </div>
  ),

  "audit-trail/showcase/query": (
    <div className="pv">
      <DarkPanel>{"GET /v2/activities\n  ?document=filing-q3\n  &user=sarah&from=2026-01-01"}</DarkPanel>
    </div>
  ),

  "audit-trail/showcase/decisions": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "1", ev: <>comment → <strong>flagged</strong></>, chip: { label: "chain", kind: "agent" } },
          { ts: "2", ev: <>revision → <strong>corrected</strong></>, chip: { label: "chain", kind: "pending" } },
          { ts: "3", ev: <>approval → <strong>signed off</strong></>, chip: { label: "chain", kind: "approved" } },
        ]}
      />
    </div>
  ),

  "audit-trail/showcase/immutable": (
    <div className="pv">
      <ProvRow>edit <ProvArrow /> new linked record</ProvRow>
      <ProvRow>content deleted <ProvArrow /> record stands</ProvRow>
    </div>
  ),

  "audit-trail/showcase/exports": (
    <div className="pv">
      <DarkPanel>{"GET /v2/activities → JSON (shipped)\nPDF · CSV · hash chains (coming soon)"}</DarkPanel>
    </div>
  ),

  "audit-trail/showcase/custom-events": (
    <div className="pv">
      <AuditLog
        style={{ boxShadow: "none", width: "100%" }}
        rows={[
          { ts: "11:40", ev: <><strong>deploy</strong> · v2.14 to production</>, chip: { label: "custom", kind: "pending" } },
          { ts: "11:52", ev: <><strong>export</strong> · quarterly package</>, chip: { label: "custom", kind: "pending" } },
        ]}
      />
    </div>
  ),

  "audit-trail/make-it-yours/look": (
    <div className="theme-row">
      <div>
        <p className="theme-label">Prebuilt</p>
        <div className="thread">
          <div className="thread-head">
            <span className="av-c a1">SR</span>
            <span className="who">Sarah</span>
            <span className="when">09:21</span>
          </div>
          <p className="fb">approved</p>
        </div>
      </div>
      <div>
        <p className="theme-label">Your timeline</p>
        <div className="thread themed">
          <div className="thread-head">
            <span className="av-c av-agent">SR</span>
            <span className="who">Sarah approved</span>
            <span className="when">09:21</span>
          </div>
          <p className="fb">recorded</p>
        </div>
      </div>
    </div>
  ),

  "audit-trail/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>metadata only</ProvRow>
      <ProvRow>summary</ProvRow>
      <ProvRow>full content</ProvRow>
    </div>
  ),

  "audit-trail/in-production/sales": (
    <AuditLog
      head={{ left: "Deal · Acme Corp — $48k", right: "Quote #Q-1043" }}
      rows={[
        { ts: "09:12", ev: "Rep submitted quote", chip: { label: "pending", kind: "pending" } },
        { ts: "09:31", ev: "Discount > 20% flagged", chip: { label: "pending", kind: "pending" } },
        { ts: "10:04", ev: "VP Sales approved", chip: { label: "approved", kind: "approved" } },
        { ts: "10:05", ev: "Quote sent to customer", chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "audit-trail/in-production/fintech": (
    <AuditLog
      head={{ left: "Transaction · wire $250,000", right: "maker-checker" }}
      rows={[
        { ts: "14:02", ev: "Maker initiated wire", chip: { label: "pending", kind: "pending" } },
        { ts: "14:09", ev: "Checker 1 verified", chip: { label: "approved", kind: "approved" } },
        { ts: "14:18", ev: "Limit breach escalated", chip: { label: "pending", kind: "pending" } },
        { ts: "14:33", ev: "Checker 2 signed off", chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "audit-trail/in-production/operations": (
    <AuditLog
      head={{ left: "Change · prod config update", right: "CHG-2271" }}
      rows={[
        { ts: "Mon", ev: "Engineer opened change", chip: { label: "pending", kind: "pending" } },
        { ts: "Mon", ev: "Peer review requested", chip: { label: "pending", kind: "pending" } },
        { ts: "Tue", ev: "Change rejected — rollback plan", chip: { label: "rejected", kind: "rejected" } },
        { ts: "Wed", ev: "Ops lead approved", chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "audit-trail/in-production/ai": (
    <AuditLog
      head={{ left: "Agent · refund assistant", right: "run #8842" }}
      rows={[
        { ts: "00:00", ev: "Agent proposed refund $120", chip: { label: "agent", kind: "agent" } },
        { ts: "00:01", ev: "Policy check passed", chip: { label: "agent", kind: "agent" } },
        { ts: "00:02", ev: "Human review required", chip: { label: "pending", kind: "pending" } },
        { ts: "00:14", ev: "Reviewer approved action", chip: { label: "approved", kind: "approved" } },
      ]}
    />
  ),

  "audit-trail/related/approval-flows": (
    <div className="pv">
      <AuditLog
        rows={[
          {
            ts: "09:21",
            ev: <><strong>step 2</strong> approved</>,
            chip: { label: "recorded", kind: "approved" },
          },
        ]}
      />
    </div>
  ),

  "audit-trail/related/review-agents": (
    <div className="pv">
      <AuditLog
        rows={[
          {
            ts: "AI",
            ev: <><strong>Brand Agent</strong> · Recorded with confidence 0.88.</>,
            chip: { label: "agent", kind: "agent" },
          },
        ]}
      />
    </div>
  ),

  "audit-trail/related/self-hosting": (
    <div className="pv">
      <ProvRow>log content <ProvArrow /> your database</ProvRow>
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
