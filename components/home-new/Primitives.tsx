import "./Primitives.css";
import PrimitiveCard from "./PrimitiveCard";
import CopyButton from "./CopyButton";

// Real customer testimonials (names, roles, avatars) reused from the
// "Our Customers Trust Us" set in components/feature/FeatureCustomerCarousel.
const TRUST_AVATARS = "/images/features/comments/trust-us";

// Testimonials are real customer quotes, verified against the canonical
// "Our Customers Trust Us" inventory in FeatureCustomerCarousel (TRUST_DEFAULTS):
// every name, role, company, avatar, and quote matches a real Velt customer.
// Per spec 2.6 truth gate, only verified quotes render; the Memory card has
// none and renders without one. Enabled.
const SHOW_TESTIMONIALS = true;

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
            exploreHref="/comments"
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
                <div className="prim-code-header">Invoice.tsx<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `import { VeltComments } from <span class="prim-code-str">"@veltdev/react"</span>;

    &lt;VeltComments
      documentId={id}
      mode=<span class="prim-code-str">"sidebar"</span>
      attribution=<span class="prim-code-str">"strict"</span>
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
            exploreHref="/suggestions"
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
                <div className="prim-code-header">Editor.tsx<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltSuggestions
      documentId={docId}
      editor=<span class="prim-code-str">"tiptap"</span>
      requireReview={<span class="prim-code-kw">true</span>}
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
            exploreHref="/approval-flows"
            quote={{ text: "Saved 3 FTEs and will boost retention.", attribution: "Hope Callaway · Senior PM @Leadpages", avatar: `${TRUST_AVATARS}/avatar-hope.png` }}
            preview={
              /* Workflow DAG (Altana demo): an Agent node fans out to two
                 PARALLEL human reviewers (Legal + Brand) that converge into an
                 exec sponsor, with a visible reject branch returning to the
                 author. The structure reads as a graph, not a linear list. */
              <div className="prim-dag" role="img" aria-label="Approval workflow: review agent feeds parallel Legal and Brand reviewers, converging into an exec sponsor, with a reject branch back to the author.">
                <div className="prim-dag-row prim-dag-row--source">
                  <div className="prim-dag-node">
                    <span className="prim-avatar-ai-22">AI</span>
                    <span className="prim-dag-node-label">Review agent</span>
                    <span className="prim-badge-done">done</span>
                  </div>
                </div>
                <div className="prim-dag-fan" aria-hidden="true">
                  <span className="prim-dag-fan-trunk" />
                  <span className="prim-dag-fan-split" />
                  <span className="prim-dag-fan-arm prim-dag-fan-arm--left" />
                  <span className="prim-dag-fan-arm prim-dag-fan-arm--right" />
                </div>
                <div className="prim-dag-row prim-dag-row--parallel">
                  <div className="prim-dag-node">
                    <span className="prim-avatar-mk-22">MK</span>
                    <span className="prim-dag-node-label">Legal</span>
                    <span className="prim-badge-done">approved</span>
                  </div>
                  <div className="prim-dag-node prim-dag-node--reject">
                    <span className="prim-avatar-jr-22">JR</span>
                    <span className="prim-dag-node-label">Brand</span>
                    <span className="prim-badge-pending">pending</span>
                  </div>
                </div>
                <div className="prim-dag-merge" aria-hidden="true">
                  <span className="prim-dag-merge-arm prim-dag-merge-arm--left" />
                  <span className="prim-dag-merge-arm prim-dag-merge-arm--right" />
                  <span className="prim-dag-merge-split" />
                  <span className="prim-dag-merge-trunk" />
                </div>
                <div className="prim-dag-row prim-dag-row--sink">
                  <div className="prim-dag-node prim-dag-node--muted">
                    <span className="prim-avatar-sp-22">SP</span>
                    <span className="prim-dag-node-label">Exec sponsor</span>
                    <span className="prim-badge-waiting">on quorum</span>
                  </div>
                </div>
                <div className="prim-dag-reject">
                  <span className="prim-dag-reject-branch" aria-hidden="true" />
                  <span className="prim-dag-reject-label">On reject: return to author</span>
                </div>
              </div>
            }
            code={
              <div className="prim-code-card">
                <div className="prim-code-header">approvals.ts<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `velt.approvals.<span class="prim-code-kw">define</span>({
      id: <span class="prim-code-str">"invoice-signoff"</span>,
      steps: [
        { role: <span class="prim-code-str">"reviewer"</span>, required: 2 },
        { role: <span class="prim-code-str">"approver"</span> },
        { role: <span class="prim-code-str">"compliance"</span>, final: <span class="prim-code-kw">true</span> }
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
            exploreHref="/audit-trail"
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
                <div className="prim-code-header">audit.ts<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltActivityLog
      documentId={id}
      exportTo=<span class="prim-code-str">"splunk"</span>
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
            exploreHref="/notifications"
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
                <div className="prim-code-header">App.tsx<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltNotificationsTool
      channels={[<span class="prim-code-str">"inbox"</span>, <span class="prim-code-str">"email"</span>, <span class="prim-code-str">"slack"</span>]}
      routeBy=<span class="prim-code-str">"mention"</span>
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
            exploreHref="/memory"
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
                <div className="prim-code-header">memory.ts<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `<span class="prim-code-kw">const</span> ctx = <span class="prim-code-kw">await</span> velt.memory.query({
      workflow: <span class="prim-code-str">"launch-email"</span>,
      reviewer: user.id,
      window: <span class="prim-code-str">"90d"</span>,
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
            exploreHref="/review-agents"
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
                <div className="prim-code-header">agents.ts<CopyButton /></div>
                <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `velt.agents.<span class="prim-code-kw">define</span>({
      id: <span class="prim-code-str">"launch-email"</span>,
      checks: [
        checks.disclaimer(<span class="prim-code-str">"policy-2025-04"</span>),
        checks.noPII(),
        checks.toneVsBaseline(),
      ],
      memory: <span class="prim-code-kw">true</span>,
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
