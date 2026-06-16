import "./Primitives.css";
import PrimitiveCard from "./PrimitiveCard";

export default function Primitives() {
  return (
    <section id="primitives" className="prim-section">
      <div className="prim-inner">
        <div className="prim-intro">
          <div className="prim-eyebrow"><span className="prim-eyebrow-dot"></span>The primitives</div>
          <h2 className="prim-intro-h2">Seven primitives. Any review workflow.</h2>
          <p className="prim-intro-p">Each ships as a React, Next.js, or Angular component plus a typed SDK.</p>
        </div>

        <div className="prim-grid">
          <PrimitiveCard
            num="01"
            name="COMMENTS"
            note="// proven wedge"
            headline="Contextual threads from humans or agents, on any element, doc, cell, or canvas."
            support="The feedback layer your users already expect."
            exploreLabel="Explore Comments"
            exploreHref="#"
            quote={{ text: "We replaced our home-grown commenting in a week. Velt is now the review surface for half a million decisions.", attribution: "Engineering Lead · OpenEnvoy" }}
            preview={
              <>
                <div className="prim-skel">
                  <div className="prim-skel-line"></div>
                  <div className="prim-skel-line"></div>
                  <div className="prim-skel-line"></div>
                  <div className="prim-skel-line"></div>
                </div>
                <div className="prim-card">
                  <div className="prim-thread-row-top">
                    <span className="prim-avatar-jr">JR</span>
                    <div><div className="prim-thread-name">Jordan <span className="prim-thread-time">1h</span></div><p className="prim-thread-p">This claim needs the updated benchmark. <span className="prim-label-comment">@maya</span> can you confirm the source?</p></div>
                  </div>
                  <div className="prim-thread-row-bot">
                    <span className="prim-avatar-ai-26">AI</span>
                    <div><div className="prim-thread-name">Research Agent <span className="prim-thread-time">58m</span></div><p className="prim-thread-p">Source confirmed: 2026 industry report, table 4. Added the citation inline.</p></div>
                  </div>
                </div>
              </>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">Invoice.tsx<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `import { VeltComments } from <span style="color:#34785c;">"@veltdev/react"</span>;

    &lt;VeltComments
      documentId={id}
      mode=<span style="color:#34785c;">"sidebar"</span>
      attribution=<span style="color:#34785c;">"strict"</span>
    /&gt;` }} />
              </div>
            }
          />

          <PrimitiveCard
            num="02"
            name="SUGGESTIONS"
            note="// the consent step"
            headline="Propose edits inline, accept or reject like a diff."
            support="In any editor, or your own custom components."
            exploreLabel="Explore Suggestions"
            exploreHref="#"
            quote={{ text: "Suggestions cut our contract redline cycle from a week to a day.", attribution: "Legal Ops · PERSUIT" }}
            preview={
              <div className="prim-card">
                <p className="prim-sug-p">Renewal is due within <span className="prim-sug-del">30 days</span> <span className="prim-sug-ins">45 days</span> of the notice date, and either party may terminate with <span className="prim-sug-del">written consent</span> <span className="prim-sug-ins">30 days written notice</span>.</p>
                <div className="prim-sug-actions">
                  <span className="prim-sug-accept">Accept</span>
                  <span className="prim-sug-reject">Reject</span>
                  <span className="prim-sug-agent">Suggested by Contract Agent</span>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">Editor.tsx<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltSuggestions
      documentId={docId}
      editor=<span style="color:#34785c;">"tiptap"</span>
      requireReview={<span style="color:#c08532;">true</span>}
    /&gt;` }} />
              </div>
            }
          />

          <PrimitiveCard
            num="03"
            name="APPROVAL FLOWS"
            note="// the workflow engine"
            headline="Staged sign-off before anything ships."
            support="Routing, conditions, and a timestamped record."
            exploreLabel="Explore Approval flows"
            exploreHref="#"
            quote={{ text: "Approvals as a primitive saved us from building a router on top of comments.", attribution: "Product · Trumpet" }}
            preview={
              <div className="prim-card-col">
                <div className="prim-approval-row"><span className="prim-avatar-ai-22">AI</span>Review agent first pass<span className="prim-badge-done">done</span></div>
                <div className="prim-approval-row"><span className="prim-avatar-mk-22">MK</span>Legal<span className="prim-badge-done">approved</span></div>
                <div className="prim-approval-row"><span className="prim-avatar-jr-22">JR</span>Brand<span className="prim-badge-pending">pending</span></div>
                <div className="prim-approval-row-muted"><span className="prim-avatar-sp-22">SP</span>Exec sponsor<span className="prim-badge-waiting">waiting on quorum</span></div>
                <div className="prim-approval-footer">On reject: return to author</div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">approvals.ts<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `velt.approvals.<span style="color:#c08532;">define</span>({
      id: <span style="color:#34785c;">"invoice-signoff"</span>,
      steps: [
        { role: <span style="color:#34785c;">"reviewer"</span>, required: 2 },
        { role: <span style="color:#34785c;">"approver"</span> },
        { role: <span style="color:#34785c;">"compliance"</span>, final: <span style="color:#c08532;">true</span> }
      ],
      onSignoff: (e) =&gt; audit.export(e)
    });` }} />
              </div>
            }
          />

          <PrimitiveCard
            num="04"
            name="AUDIT TRAIL"
            note="// the evidence layer"
            headline="An immutable record of every action in your product."
            support="Audit-ready by default."
            exploreLabel="Explore Audit trail"
            exploreHref="#"
            quote={{ text: "Auditor walked through our SIEM dashboard and signed off in one meeting.", attribution: "CISO · OpenEnvoy" }}
            preview={
              <div className="prim-card-overflow">
                <div className="prim-audit-header">Q3 Pricing One-Pager · run #214<span className="prim-audit-export">Export CSV</span></div>
                <div className="prim-audit-log">
                  <div className="prim-audit-row"><span className="prim-audit-ts">14:02:11</span><span className="prim-audit-desc"><strong className="prim-audit-strong">Pricing Agent</strong> proposed change to cell C4</span><span className="prim-tag-agent">agent</span></div>
                  <div className="prim-audit-row"><span className="prim-audit-ts">14:06:40</span><span className="prim-audit-desc"><strong className="prim-audit-strong">Maya K.</strong> approved the change</span><span className="prim-tag-approved">approved</span></div>
                  <div className="prim-audit-row"><span className="prim-audit-ts">14:06:41</span><span className="prim-audit-desc">Webhook <strong className="prim-audit-strong">change.applied</strong> delivered</span><span className="prim-tag-approved">200</span></div>
                  <div className="prim-audit-row-last"><span className="prim-audit-ts">15:18:03</span><span className="prim-audit-desc"><strong className="prim-audit-strong">Sam P.</strong> rejected revision 7</span><span className="prim-tag-rejected">rejected</span></div>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">audit.ts<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltActivityLog
      documentId={id}
      exportTo=<span style="color:#34785c;">"splunk"</span>
      retentionDays={2555}
    /&gt;` }} />
              </div>
            }
          />

          <PrimitiveCard
            num="05"
            name="NOTIFICATIONS"
            note="// keeps reviews moving"
            headline="Reach reviewers in-app, by email, in Slack and Teams, before the deadline slips."
            exploreLabel="Explore Notifications"
            exploreHref="#"
            quote={{ text: "Shipped notifications in weeks instead of quarters.", attribution: "Head of Platform · Leadpages" }}
            preview={
              <div className="prim-card">
                <div className="prim-notif-row">
                  <span className="prim-notif-icon">●</span>
                  <div className="prim-notif-body"><p className="prim-notif-title">Your turn to review</p><p className="prim-notif-sub">Q3 Pricing One-Pager is waiting on you. Due tomorrow.</p></div>
                </div>
                <div className="prim-notif-chips">
                  <span className="prim-notif-chip">In-app inbox</span>
                  <span className="prim-notif-chip">Email digest</span>
                  <span className="prim-notif-chip">Slack</span>
                  <span className="prim-notif-chip">Teams</span>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">App.tsx<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltNotifications
      channels={[<span style="color:#34785c;">"inbox"</span>, <span style="color:#34785c;">"email"</span>, <span style="color:#34785c;">"slack"</span>]}
      routeBy=<span style="color:#34785c;">"mention"</span>
      slackWebhook={env.SLACK_URL}
    /&gt;` }} />
              </div>
            }
          />

          <PrimitiveCard
            num="06"
            name="MEMORY"
            note="// the moat"
            isNew
            headline="Past decisions surface as precedent, so reviews stay consistent as teams grow."
            exploreLabel="Explore Memory"
            exploreHref="#"
            preview={
              <div className="prim-card">
                <div className="prim-mem-precedent">PRECEDENT</div>
                <p className="prim-mem-p">Discounts above 20% were approved 3 times this quarter when the exec sponsor signed off first.</p>
                <p className="prim-mem-meta">Based on 12 prior reviews · org-scoped</p>
                <div className="prim-mem-thread">
                  <span className="prim-avatar-ai-24">AI</span>
                  <div><div className="prim-thread-name">Pricing Agent</div><p className="prim-mem-thread-p">Not re-flagging the 18% discount. Your org settled this pattern in May.</p></div>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">memory.ts<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `<span style="color:#c08532;">const</span> ctx = <span style="color:#c08532;">await</span> velt.memory.query({
      workflow: <span style="color:#34785c;">"launch-email"</span>,
      reviewer: user.id,
      window: <span style="color:#34785c;">"90d"</span>,
    });` }} />
              </div>
            }
          />

          <PrimitiveCard
            num="07"
            name="REVIEW AGENTS"
            note="// AI catches the obvious"
            isNew
            wide
            headline="AI flags issues and proposes fixes as comments, before a human looks."
            support="The first-pass reviewer that never gets tired."
            exploreLabel="Explore Review agents"
            exploreHref="#"
            quote={{ text: "80% of issues are flagged before a human ever opens the doc.", attribution: "Eng Lead · pilot customer" }}
            preview={
              <div className="prim-card">
                <div className="prim-thread-row-top">
                  <span className="prim-avatar-ai-26">AI</span>
                  <div className="prim-thread-body"><div className="prim-thread-name">Compliance Agent <span className="prim-findings-badge">2 findings</span></div><p className="prim-thread-p prim-thread-p--mt4">Slide 4 claims "guaranteed returns". Flagged: prohibited phrasing for FINRA audiences. Suggested fix attached.</p>
                  <div className="prim-agent-actions"><span className="prim-agent-accept">Accept fix</span><span className="prim-agent-dismiss">Dismiss</span></div></div>
                </div>
                <div className="prim-thread-row-bot">
                  <span className="prim-avatar-ai-26">AI</span>
                  <div><div className="prim-thread-name">Brand Agent</div><p className="prim-thread-p">Logo on the cover is the 2024 mark. Current asset: <span className="prim-brand-ref">brand/logo-2026.svg</span></p></div>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">agents.ts<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `velt.agents.<span style="color:#c08532;">define</span>({
      id: <span style="color:#34785c;">"launch-email"</span>,
      checks: [
        checks.disclaimer(<span style="color:#34785c;">"policy-2025-04"</span>),
        checks.noPII(),
        checks.toneVsBaseline(),
      ],
      memory: <span style="color:#c08532;">true</span>,
      onFinding: notify.reviewer,
    });` }} />
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
