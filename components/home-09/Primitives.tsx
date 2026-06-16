import "./Primitives.css";

export default function Primitives() {
  return (
      <section id="primitives" className="prim-section">
        <div className="prim-inner">
          <div className="prim-intro">
            <div className="prim-eyebrow"><span className="prim-eyebrow-dot"></span>The primitives</div>
            <h2 className="prim-intro-h2">Seven primitives. Any review workflow.</h2>
            <p className="prim-intro-p">Each ships as a React, Next.js, or Angular component plus a typed SDK.</p>
          </div>


          <div className="prim-rail-a">
            <div>
              <div className="prim-label">01 · COMMENTS&nbsp;&nbsp;<span className="prim-label-comment">// proven wedge</span></div>
              <h3 className="prim-h3">Contextual threads from humans or agents, on any element, doc, cell, or canvas.</h3>
              <p className="prim-body-p">The feedback layer your users already expect.</p>
              <a href="#" className="prim-explore">Explore Comments <span>→</span></a>
              <blockquote className="prim-blockquote">We replaced our home-grown commenting in a week. Velt is now the review surface for half a million decisions.<span className="prim-blockquote-attr">Engineering Lead · OpenEnvoy</span></blockquote>
            </div>
            <div>
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
              <div className="prim-code-card">
                <div className="prim-code-header">Invoice.tsx<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `import { VeltComments } from <span style="color:#34785c;">"@veltdev/react"</span>;

    &lt;VeltComments
      documentId={id}
      mode=<span style="color:#34785c;">"sidebar"</span>
      attribution=<span style="color:#34785c;">"strict"</span>
    /&gt;` }} />
              </div>
            </div>
          </div>


          <div className="prim-rail-c">
            <div>
              <div className="prim-card">
                <p className="prim-sug-p">Renewal is due within <span className="prim-sug-del">30 days</span> <span className="prim-sug-ins">45 days</span> of the notice date, and either party may terminate with <span className="prim-sug-del">written consent</span> <span className="prim-sug-ins">30 days written notice</span>.</p>
                <div className="prim-sug-actions">
                  <span className="prim-sug-accept">Accept</span>
                  <span className="prim-sug-reject">Reject</span>
                  <span className="prim-sug-agent">Suggested by Contract Agent</span>
                </div>
              </div>
              <div className="prim-code-card">
                <div className="prim-code-header">Editor.tsx<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltSuggestions
      documentId={docId}
      editor=<span style="color:#34785c;">"tiptap"</span>
      requireReview={<span style="color:#c08532;">true</span>}
    /&gt;` }} />
              </div>
            </div>
            <div>
              <div className="prim-label">02 · SUGGESTIONS&nbsp;&nbsp;<span className="prim-label-comment">// the consent step</span></div>
              <h3 className="prim-h3">Propose edits inline, accept or reject like a diff.</h3>
              <p className="prim-body-p">In any editor, or your own custom components.</p>
              <a href="#" className="prim-explore">Explore Suggestions <span>→</span></a>
              <blockquote className="prim-blockquote">Suggestions cut our contract redline cycle from a week to a day.<span className="prim-blockquote-attr">Legal Ops · PERSUIT</span></blockquote>
            </div>
          </div>


          <div className="prim-rail-b">
            <div>
              <div className="prim-label">03 · APPROVAL FLOWS&nbsp;&nbsp;<span className="prim-label-comment">// the workflow engine</span></div>
              <h3 className="prim-h3">Staged sign-off before anything ships.</h3>
              <p className="prim-body-p">Routing, conditions, and a timestamped record.</p>
              <a href="#" className="prim-explore">Explore Approval flows <span>→</span></a>
              <blockquote className="prim-blockquote">Approvals as a primitive saved us from building a router on top of comments.<span className="prim-blockquote-attr">Product · Trumpet</span></blockquote>
            </div>
            <div>
              <div className="prim-card-col">
                <div className="prim-approval-row"><span className="prim-avatar-ai-22">AI</span>Review agent first pass<span className="prim-badge-done">done</span></div>
                <div className="prim-approval-row"><span className="prim-avatar-mk-22">MK</span>Legal<span className="prim-badge-done">approved</span></div>
                <div className="prim-approval-row"><span className="prim-avatar-jr-22">JR</span>Brand<span className="prim-badge-pending">pending</span></div>
                <div className="prim-approval-row-muted"><span className="prim-avatar-sp-22">SP</span>Exec sponsor<span className="prim-badge-waiting">waiting on quorum</span></div>
                <div className="prim-approval-footer">On reject: return to author</div>
              </div>
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
            </div>
          </div>


          <div className="prim-rail-c">
            <div>
              <div className="prim-card-overflow">
                <div className="prim-audit-header">Q3 Pricing One-Pager · run #214<span className="prim-audit-export">Export CSV</span></div>
                <div className="prim-audit-log">
                  <div className="prim-audit-row"><span className="prim-audit-ts">14:02:11</span><span className="prim-audit-desc"><strong className="prim-audit-strong">Pricing Agent</strong> proposed change to cell C4</span><span className="prim-tag-agent">agent</span></div>
                  <div className="prim-audit-row"><span className="prim-audit-ts">14:06:40</span><span className="prim-audit-desc"><strong className="prim-audit-strong">Maya K.</strong> approved the change</span><span className="prim-tag-approved">approved</span></div>
                  <div className="prim-audit-row"><span className="prim-audit-ts">14:06:41</span><span className="prim-audit-desc">Webhook <strong className="prim-audit-strong">change.applied</strong> delivered</span><span className="prim-tag-approved">200</span></div>
                  <div className="prim-audit-row-last"><span className="prim-audit-ts">15:18:03</span><span className="prim-audit-desc"><strong className="prim-audit-strong">Sam P.</strong> rejected revision 7</span><span className="prim-tag-rejected">rejected</span></div>
                </div>
              </div>
              <div className="prim-code-card">
                <div className="prim-code-header">audit.ts<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltActivityLog
      documentId={id}
      exportTo=<span style="color:#34785c;">"splunk"</span>
      retentionDays={2555}
    /&gt;` }} />
              </div>
            </div>
            <div>
              <div className="prim-label">04 · AUDIT TRAIL&nbsp;&nbsp;<span className="prim-label-comment">// the evidence layer</span></div>
              <h3 className="prim-h3">An immutable record of every action in your product.</h3>
              <p className="prim-body-p">Audit-ready by default.</p>
              <a href="#" className="prim-explore">Explore Audit trail <span>→</span></a>
              <blockquote className="prim-blockquote">Auditor walked through our SIEM dashboard and signed off in one meeting.<span className="prim-blockquote-attr">CISO · OpenEnvoy</span></blockquote>
            </div>
          </div>


          <div className="prim-rail-b">
            <div>
              <div className="prim-label">05 · NOTIFICATIONS&nbsp;&nbsp;<span className="prim-label-comment">// keeps reviews moving</span></div>
              <h3 className="prim-h3">Reach reviewers in-app, by email, in Slack and Teams, before the deadline slips.</h3>
              <a href="#" className="prim-explore">Explore Notifications <span>→</span></a>
              <blockquote className="prim-blockquote">Shipped notifications in weeks instead of quarters.<span className="prim-blockquote-attr">Head of Platform · Leadpages</span></blockquote>
            </div>
            <div>
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
              <div className="prim-code-card">
                <div className="prim-code-header">App.tsx<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltNotifications
      channels={[<span style="color:#34785c;">"inbox"</span>, <span style="color:#34785c;">"email"</span>, <span style="color:#34785c;">"slack"</span>]}
      routeBy=<span style="color:#34785c;">"mention"</span>
      slackWebhook={env.SLACK_URL}
    /&gt;` }} />
              </div>
            </div>
          </div>


          <div className="prim-rail-c">
            <div>
              <div className="prim-card">
                <div className="prim-mem-precedent">PRECEDENT</div>
                <p className="prim-mem-p">Discounts above 20% were approved 3 times this quarter when the exec sponsor signed off first.</p>
                <p className="prim-mem-meta">Based on 12 prior reviews · org-scoped</p>
                <div className="prim-mem-thread">
                  <span className="prim-avatar-ai-24">AI</span>
                  <div><div className="prim-thread-name">Pricing Agent</div><p className="prim-mem-thread-p">Not re-flagging the 18% discount. Your org settled this pattern in May.</p></div>
                </div>
              </div>
              <div className="prim-code-card">
                <div className="prim-code-header">memory.ts<span className="prim-code-copy">copy</span></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `<span style="color:#c08532;">const</span> ctx = <span style="color:#c08532;">await</span> velt.memory.query({
      workflow: <span style="color:#34785c;">"launch-email"</span>,
      reviewer: user.id,
      window: <span style="color:#34785c;">"90d"</span>,
    });` }} />
              </div>
            </div>
            <div>
              <div className="prim-label-row"><span className="prim-label-text">06 · MEMORY</span><span className="prim-badge-new">NEW</span></div>
              <div className="prim-moat-line">// the moat</div>
              <h3 className="prim-h3">Past decisions surface as precedent, so reviews stay consistent as teams grow.</h3>
              <a href="#" className="prim-explore">Explore Memory <span>→</span></a>
            </div>
          </div>


          <div className="prim-rail-d">
            <div>
              <div className="prim-label-row-12"><span className="prim-label-text">07 · REVIEW AGENTS</span><span className="prim-badge-new">NEW</span></div>
              <div className="prim-moat-line">// AI catches the obvious</div>
              <h3 className="prim-h3">AI flags issues and proposes fixes as comments, before a human looks.</h3>
              <p className="prim-body-p">The first-pass reviewer that never gets tired.</p>
              <a href="#" className="prim-explore">Explore Review agents <span>→</span></a>
              <blockquote className="prim-blockquote">80% of issues are flagged before a human ever opens the doc.<span className="prim-blockquote-attr">Eng Lead · pilot customer</span></blockquote>
            </div>
            <div>
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
            </div>
          </div>
        </div>
      </section>
  );
}
