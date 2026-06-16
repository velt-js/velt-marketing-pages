import "./Primitives.css";
import PrimitiveCard from "./PrimitiveCard";

// Real customer testimonials (names, roles, avatars) reused from the
// "Our Customers Trust Us" set in components/feature/FeatureCustomerCarousel.
const TRUST_AVATARS = "/images/features/comments/trust-us";

// Testimonials are wired up but hidden for now. Flip to true to show them.
const SHOW_TESTIMONIALS = false;

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
            showTestimonial={SHOW_TESTIMONIALS}
            num="01"
            name="COMMENTS"
            headline="Contextual threads from humans or agents, on any element, doc, cell, or canvas."
            support="The feedback layer your users already expect."
            exploreLabel="Explore Comments"
            exploreHref="#"
            quote={{ text: "Full collaboration features shipped in under 1 week.", attribution: "Chris Bakke · Head of Product @X", avatar: `${TRUST_AVATARS}/avatar-chris-bakke.png` }}
            preview={
              <div className="prim-thread">
                <div className="prim-msg">
                  <div className="prim-msg-rail">
                    <span className="prim-msg-avatar prim-msg-avatar--green">J</span>
                    <span className="prim-msg-line"></span>
                  </div>
                  <div className="prim-msg-body">
                    <div className="prim-msg-head"><span className="prim-msg-name">Jordan</span><span className="prim-msg-time">1h</span></div>
                    <p className="prim-msg-text">This claim needs the updated benchmark. <span className="prim-mention">@maya</span> can you confirm the source?</p>
                  </div>
                </div>
                <div className="prim-msg">
                  <div className="prim-msg-rail">
                    <span className="prim-msg-avatar prim-msg-avatar--teal">A</span>
                  </div>
                  <div className="prim-msg-body">
                    <div className="prim-msg-head"><span className="prim-msg-name">Research Agent</span><span className="prim-msg-time">58m</span></div>
                    <p className="prim-msg-text">Source confirmed: 2026 industry report, table 4. Added the citation inline.</p>
                  </div>
                </div>
              </div>
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
            showTestimonial={SHOW_TESTIMONIALS}
            num="02"
            name="SUGGESTIONS"
            headline="Propose edits inline, accept or reject like a diff."
            support="In any editor, or your own custom components."
            exploreLabel="Explore Suggestions"
            exploreHref="#"
            quote={{ text: "We were able to launch 5x faster than building from scratch.", attribution: "Roman Sevast · CEO @Awesomic", avatar: `${TRUST_AVATARS}/avatar-roman.png` }}
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
            showTestimonial={SHOW_TESTIMONIALS}
            num="03"
            name="APPROVAL FLOWS"
            headline="Staged sign-off before anything ships."
            support="Routing, conditions, and a timestamped record."
            exploreLabel="Explore Approval flows"
            exploreHref="#"
            quote={{ text: "Saved 3 FTEs and will boost retention.", attribution: "Hope Callaway · Senior PM @Leadpages", avatar: `${TRUST_AVATARS}/avatar-hope.png` }}
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
            showTestimonial={SHOW_TESTIMONIALS}
            num="04"
            name="AUDIT TRAIL"
            headline="An immutable record of every action in your product."
            support="Audit-ready by default."
            exploreLabel="Explore Audit trail"
            exploreHref="#"
            quote={{ text: "With Velt we turned months of development into weeks of delivery.", attribution: "Gavin McIver · Senior PM @Bigtincan", avatar: `${TRUST_AVATARS}/avatar-gavin.png` }}
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
            showTestimonial={SHOW_TESTIMONIALS}
            num="05"
            name="NOTIFICATIONS"
            headline="Reach reviewers in-app, by email, in Slack and Teams, before the deadline slips."
            exploreLabel="Explore Notifications"
            exploreHref="#"
            quote={{ text: "Velt's commenting and notification features are bundled with a lot of magic.", attribution: "Yuri Kleban · Sr. Product Manager @Google", avatar: `${TRUST_AVATARS}/avatar-yuri.png` }}
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
            showTestimonial={SHOW_TESTIMONIALS}
            num="06"
            name="MEMORY"
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
            showTestimonial={SHOW_TESTIMONIALS}
            num="07"
            name="REVIEW AGENTS"
            isNew
            wide
            headline="AI flags issues and proposes fixes as comments, before a human looks."
            support="The first-pass reviewer that never gets tired."
            exploreLabel="Explore Review agents"
            exploreHref="#"
            quote={{ text: "Increased engagement by 10% and helped ship 5x faster.", attribution: "William Angel · Lead PM @Trumpet", avatar: `${TRUST_AVATARS}/avatar-william.png` }}
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
