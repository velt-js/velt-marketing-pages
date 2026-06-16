export default function Primitives() {
  return (
      <section id="primitives" style={{ background: "#f7f7f4", borderTop: "1px solid #d9d5cf" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "80px 32px 64px" }}>
          <div style={{ maxWidth: "640px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#7a7974", marginBottom: "20px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#26251e" }}></span>The primitives</div>
            <h2 style={{ fontSize: "36px", lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "400" }}>Seven primitives. Any review workflow.</h2>
            <p style={{ fontSize: "16px", lineHeight: "1.55", color: "#7a7974", marginTop: "16px" }}>Each ships as a React, Next.js, or Angular component plus a typed SDK.</p>
          </div>


          <div style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: "48px", alignItems: "center", padding: "56px 0", borderTop: "1px solid #d9d5cf", marginTop: "48px" }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.05em", color: "#7a7974", marginBottom: "14px" }}>01 · COMMENTS&nbsp;&nbsp;<span style={{ color: "#f54e00" }}>// proven wedge</span></div>
              <h3 style={{ fontSize: "24px", lineHeight: "1.2", letterSpacing: "-0.012em", fontWeight: "400" }}>Contextual threads from humans or agents, on any element, doc, cell, or canvas.</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.55", color: "#7a7974", marginTop: "14px" }}>The feedback layer your users already expect.</p>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "18px" }}>Explore Comments <span>→</span></a>
              <blockquote style={{ margin: "24px 0 0", paddingLeft: "14px", borderLeft: "2px solid #c08532", fontFamily: "'EB Garamond',serif", fontSize: "17px", fontStyle: "italic", lineHeight: "1.45", color: "#26251e" }}>We replaced our home-grown commenting in a week. Velt is now the review surface for half a million decisions.<span style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontStyle: "normal", fontSize: "11px", color: "#7a7974", marginTop: "8px" }}>Engineering Lead · OpenEnvoy</span></blockquote>
            </div>
            <div>
              <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", boxShadow: "rgba(0,0,0,0.06) 0px 14px 32px", padding: "18px" }}>
                <div style={{ display: "flex", gap: "10px", paddingBottom: "14px", borderBottom: "1px solid #e6e5e0" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#34785c", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", flexShrink: "0" }}>JR</span>
                  <div><div style={{ fontSize: "13px" }}>Jordan <span style={{ color: "#a1a19f", fontSize: "11px" }}>1h</span></div><p style={{ fontSize: "13px", lineHeight: "1.5", color: "#26251e", marginTop: "3px" }}>This claim needs the updated benchmark. <span style={{ color: "#f54e00" }}>@maya</span> can you confirm the source?</p></div>
                </div>
                <div style={{ display: "flex", gap: "10px", paddingTop: "14px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#26251e", color: "#f7f7f4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", flexShrink: "0" }}>AI</span>
                  <div><div style={{ fontSize: "13px" }}>Research Agent <span style={{ color: "#a1a19f", fontSize: "11px" }}>58m</span></div><p style={{ fontSize: "13px", lineHeight: "1.5", color: "#26251e", marginTop: "3px" }}>Source confirmed: 2026 industry report, table 4. Added the citation inline.</p></div>
                </div>
              </div>
              <div style={{ background: "#f7f7f4", border: "1px solid #d9d5cf", borderRadius: "8px", overflow: "hidden", marginTop: "14px" }}>
                <div style={{ display: "flex", padding: "8px 12px", borderBottom: "1px solid #d9d5cf", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#7a7974" }}>Invoice.tsx<span style={{ marginLeft: "auto", color: "#a1a19f" }}>copy</span></div>
                <pre style={{ margin: "0", padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", lineHeight: "1.65", color: "#26251e", overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: `import { VeltComments } from <span style="color:#34785c;">"@veltdev/react"</span>;

    &lt;VeltComments
      documentId={id}
      mode=<span style="color:#34785c;">"sidebar"</span>
      attribution=<span style="color:#34785c;">"strict"</span>
    /&gt;` }} />
              </div>
            </div>
          </div>


          <div style={{ display: "grid", gridTemplateColumns: "1.18fr 0.82fr", gap: "48px", alignItems: "center", padding: "56px 0", borderTop: "1px solid #d9d5cf" }}>
            <div>
              <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", boxShadow: "rgba(0,0,0,0.06) 0px 14px 32px", padding: "18px" }}>
                <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#26251e" }}>Renewal is due within <span style={{ background: "#fde8e0", color: "#b8400a", textDecoration: "line-through" }}>30 days</span> <span style={{ background: "#dff3e8", color: "#34785c" }}>45 days</span> of the notice date, and either party may terminate with <span style={{ background: "#fde8e0", color: "#b8400a", textDecoration: "line-through" }}>written consent</span> <span style={{ background: "#dff3e8", color: "#34785c" }}>30 days written notice</span>.</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #e6e5e0" }}>
                  <span style={{ fontSize: "12px", background: "#26251e", color: "#f7f7f4", padding: "6px 14px", borderRadius: "9999px" }}>Accept</span>
                  <span style={{ fontSize: "12px", background: "transparent", color: "#26251e", border: "1px solid #d9d5cf", padding: "6px 14px", borderRadius: "9999px" }}>Reject</span>
                  <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#7a7974" }}>Suggested by Contract Agent</span>
                </div>
              </div>
              <div style={{ background: "#f7f7f4", border: "1px solid #d9d5cf", borderRadius: "8px", overflow: "hidden", marginTop: "14px" }}>
                <div style={{ display: "flex", padding: "8px 12px", borderBottom: "1px solid #d9d5cf", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#7a7974" }}>Editor.tsx<span style={{ marginLeft: "auto", color: "#a1a19f" }}>copy</span></div>
                <pre style={{ margin: "0", padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", lineHeight: "1.65", color: "#26251e", overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: `&lt;VeltSuggestions
      documentId={docId}
      editor=<span style="color:#34785c;">"tiptap"</span>
      requireReview={<span style="color:#c08532;">true</span>}
    /&gt;` }} />
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.05em", color: "#7a7974", marginBottom: "14px" }}>02 · SUGGESTIONS&nbsp;&nbsp;<span style={{ color: "#f54e00" }}>// the consent step</span></div>
              <h3 style={{ fontSize: "24px", lineHeight: "1.2", letterSpacing: "-0.012em", fontWeight: "400" }}>Propose edits inline, accept or reject like a diff.</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.55", color: "#7a7974", marginTop: "14px" }}>In any editor, or your own custom components.</p>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "18px" }}>Explore Suggestions <span>→</span></a>
              <blockquote style={{ margin: "24px 0 0", paddingLeft: "14px", borderLeft: "2px solid #c08532", fontFamily: "'EB Garamond',serif", fontSize: "17px", fontStyle: "italic", lineHeight: "1.45", color: "#26251e" }}>Suggestions cut our contract redline cycle from a week to a day.<span style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontStyle: "normal", fontSize: "11px", color: "#7a7974", marginTop: "8px" }}>Legal Ops · PERSUIT</span></blockquote>
            </div>
          </div>


          <div style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: "48px", alignItems: "center", padding: "56px 0", borderTop: "1px solid #d9d5cf" }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.05em", color: "#7a7974", marginBottom: "14px" }}>03 · APPROVAL FLOWS&nbsp;&nbsp;<span style={{ color: "#f54e00" }}>// the workflow engine</span></div>
              <h3 style={{ fontSize: "24px", lineHeight: "1.2", letterSpacing: "-0.012em", fontWeight: "400" }}>Staged sign-off before anything ships.</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.55", color: "#7a7974", marginTop: "14px" }}>Routing, conditions, and a timestamped record.</p>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "18px" }}>Explore Approval flows <span>→</span></a>
              <blockquote style={{ margin: "24px 0 0", paddingLeft: "14px", borderLeft: "2px solid #c08532", fontFamily: "'EB Garamond',serif", fontSize: "17px", fontStyle: "italic", lineHeight: "1.45", color: "#26251e" }}>Approvals as a primitive saved us from building a router on top of comments.<span style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontStyle: "normal", fontSize: "11px", color: "#7a7974", marginTop: "8px" }}>Product · Trumpet</span></blockquote>
            </div>
            <div>
              <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", boxShadow: "rgba(0,0,0,0.06) 0px 14px 32px", padding: "18px", display: "flex", flexDirection: "column", gap: "11px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}><span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#26251e", color: "#f7f7f4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "9px" }}>AI</span>Review agent first pass<span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#34785c", border: "1px solid #4ade80", padding: "2px 8px", borderRadius: "4px" }}>done</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}><span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#c08532", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9px" }}>MK</span>Legal<span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#34785c", border: "1px solid #4ade80", padding: "2px 8px", borderRadius: "4px" }}>approved</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px" }}><span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#8f8e89", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9px" }}>JR</span>Brand<span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#7a7974", border: "1px solid #d9d5cf", padding: "2px 8px", borderRadius: "4px" }}>pending</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#7a7974" }}><span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#d9d5cf", color: "#7a7974", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9px" }}>SP</span>Exec sponsor<span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#a1a19f" }}>waiting on quorum</span></div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#a1a19f", paddingTop: "10px", borderTop: "1px solid #e6e5e0" }}>On reject: return to author</div>
              </div>
              <div style={{ background: "#f7f7f4", border: "1px solid #d9d5cf", borderRadius: "8px", overflow: "hidden", marginTop: "14px" }}>
                <div style={{ display: "flex", padding: "8px 12px", borderBottom: "1px solid #d9d5cf", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#7a7974" }}>approvals.ts<span style={{ marginLeft: "auto", color: "#a1a19f" }}>copy</span></div>
                <pre style={{ margin: "0", padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", lineHeight: "1.65", color: "#26251e", overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: `velt.approvals.<span style="color:#c08532;">define</span>({
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


          <div style={{ display: "grid", gridTemplateColumns: "1.18fr 0.82fr", gap: "48px", alignItems: "center", padding: "56px 0", borderTop: "1px solid #d9d5cf" }}>
            <div>
              <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", boxShadow: "rgba(0,0,0,0.06) 0px 14px 32px", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", padding: "11px 14px", borderBottom: "1px solid #e6e5e0", fontSize: "12px", color: "#7a7974" }}>Q3 Pricing One-Pager · run #214<span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#f54e00" }}>Export CSV</span></div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11.5px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #f0efea" }}><span style={{ color: "#a1a19f" }}>14:02:11</span><span style={{ flex: "1", color: "#26251e" }}><strong style={{ fontWeight: "500" }}>Pricing Agent</strong> proposed change to cell C4</span><span style={{ color: "#7a7974", border: "1px solid #d9d5cf", padding: "1px 7px", borderRadius: "4px" }}>agent</span></div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #f0efea" }}><span style={{ color: "#a1a19f" }}>14:06:40</span><span style={{ flex: "1", color: "#26251e" }}><strong style={{ fontWeight: "500" }}>Maya K.</strong> approved the change</span><span style={{ color: "#34785c", border: "1px solid #4ade80", padding: "1px 7px", borderRadius: "4px" }}>approved</span></div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderBottom: "1px solid #f0efea" }}><span style={{ color: "#a1a19f" }}>14:06:41</span><span style={{ flex: "1", color: "#26251e" }}>Webhook <strong style={{ fontWeight: "500" }}>change.applied</strong> delivered</span><span style={{ color: "#34785c", border: "1px solid #4ade80", padding: "1px 7px", borderRadius: "4px" }}>200</span></div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px" }}><span style={{ color: "#a1a19f" }}>15:18:03</span><span style={{ flex: "1", color: "#26251e" }}><strong style={{ fontWeight: "500" }}>Sam P.</strong> rejected revision 7</span><span style={{ color: "#b8400a", border: "1px solid #f0b89c", padding: "1px 7px", borderRadius: "4px" }}>rejected</span></div>
                </div>
              </div>
              <div style={{ background: "#f7f7f4", border: "1px solid #d9d5cf", borderRadius: "8px", overflow: "hidden", marginTop: "14px" }}>
                <div style={{ display: "flex", padding: "8px 12px", borderBottom: "1px solid #d9d5cf", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#7a7974" }}>audit.ts<span style={{ marginLeft: "auto", color: "#a1a19f" }}>copy</span></div>
                <pre style={{ margin: "0", padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", lineHeight: "1.65", color: "#26251e", overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: `&lt;VeltActivityLog
      documentId={id}
      exportTo=<span style="color:#34785c;">"splunk"</span>
      retentionDays={2555}
    /&gt;` }} />
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.05em", color: "#7a7974", marginBottom: "14px" }}>04 · AUDIT TRAIL&nbsp;&nbsp;<span style={{ color: "#f54e00" }}>// the evidence layer</span></div>
              <h3 style={{ fontSize: "24px", lineHeight: "1.2", letterSpacing: "-0.012em", fontWeight: "400" }}>An immutable record of every action in your product.</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.55", color: "#7a7974", marginTop: "14px" }}>Audit-ready by default.</p>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "18px" }}>Explore Audit trail <span>→</span></a>
              <blockquote style={{ margin: "24px 0 0", paddingLeft: "14px", borderLeft: "2px solid #c08532", fontFamily: "'EB Garamond',serif", fontSize: "17px", fontStyle: "italic", lineHeight: "1.45", color: "#26251e" }}>Auditor walked through our SIEM dashboard and signed off in one meeting.<span style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontStyle: "normal", fontSize: "11px", color: "#7a7974", marginTop: "8px" }}>CISO · OpenEnvoy</span></blockquote>
            </div>
          </div>


          <div style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: "48px", alignItems: "center", padding: "56px 0", borderTop: "1px solid #d9d5cf" }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.05em", color: "#7a7974", marginBottom: "14px" }}>05 · NOTIFICATIONS&nbsp;&nbsp;<span style={{ color: "#f54e00" }}>// keeps reviews moving</span></div>
              <h3 style={{ fontSize: "24px", lineHeight: "1.2", letterSpacing: "-0.012em", fontWeight: "400" }}>Reach reviewers in-app, by email, in Slack and Teams, before the deadline slips.</h3>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "18px" }}>Explore Notifications <span>→</span></a>
              <blockquote style={{ margin: "24px 0 0", paddingLeft: "14px", borderLeft: "2px solid #c08532", fontFamily: "'EB Garamond',serif", fontSize: "17px", fontStyle: "italic", lineHeight: "1.45", color: "#26251e" }}>Shipped notifications in weeks instead of quarters.<span style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontStyle: "normal", fontSize: "11px", color: "#7a7974", marginTop: "8px" }}>Head of Platform · Leadpages</span></blockquote>
            </div>
            <div>
              <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", boxShadow: "rgba(0,0,0,0.06) 0px 14px 32px", padding: "18px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#f54e00", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>●</span>
                  <div style={{ flex: "1" }}><p style={{ fontSize: "14px", fontWeight: "500" }}>Your turn to review</p><p style={{ fontSize: "13px", color: "#7a7974", marginTop: "3px", lineHeight: "1.5" }}>Q3 Pricing One-Pager is waiting on you. Due tomorrow.</p></div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid #e6e5e0" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#26251e", background: "#f7f7f4", padding: "5px 11px", borderRadius: "9999px" }}>In-app inbox</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#26251e", background: "#f7f7f4", padding: "5px 11px", borderRadius: "9999px" }}>Email digest</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#26251e", background: "#f7f7f4", padding: "5px 11px", borderRadius: "9999px" }}>Slack</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#26251e", background: "#f7f7f4", padding: "5px 11px", borderRadius: "9999px" }}>Teams</span>
                </div>
              </div>
              <div style={{ background: "#f7f7f4", border: "1px solid #d9d5cf", borderRadius: "8px", overflow: "hidden", marginTop: "14px" }}>
                <div style={{ display: "flex", padding: "8px 12px", borderBottom: "1px solid #d9d5cf", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#7a7974" }}>App.tsx<span style={{ marginLeft: "auto", color: "#a1a19f" }}>copy</span></div>
                <pre style={{ margin: "0", padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", lineHeight: "1.65", color: "#26251e", overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: `&lt;VeltNotifications
      channels={[<span style="color:#34785c;">"inbox"</span>, <span style="color:#34785c;">"email"</span>, <span style="color:#34785c;">"slack"</span>]}
      routeBy=<span style="color:#34785c;">"mention"</span>
      slackWebhook={env.SLACK_URL}
    /&gt;` }} />
              </div>
            </div>
          </div>


          <div style={{ display: "grid", gridTemplateColumns: "1.18fr 0.82fr", gap: "48px", alignItems: "center", padding: "56px 0", borderTop: "1px solid #d9d5cf" }}>
            <div>
              <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", boxShadow: "rgba(0,0,0,0.06) 0px 14px 32px", padding: "18px" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.05em", color: "#c08532", marginBottom: "8px" }}>PRECEDENT</div>
                <p style={{ fontSize: "14px", lineHeight: "1.55", color: "#26251e" }}>Discounts above 20% were approved 3 times this quarter when the exec sponsor signed off first.</p>
                <p style={{ fontSize: "11.5px", color: "#a1a19f", marginTop: "8px", fontFamily: "'JetBrains Mono',monospace" }}>Based on 12 prior reviews · org-scoped</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #e6e5e0" }}>
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#26251e", color: "#f7f7f4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", flexShrink: "0" }}>AI</span>
                  <div><div style={{ fontSize: "13px" }}>Pricing Agent</div><p style={{ fontSize: "13px", lineHeight: "1.5", color: "#7a7974", marginTop: "2px" }}>Not re-flagging the 18% discount. Your org settled this pattern in May.</p></div>
                </div>
              </div>
              <div style={{ background: "#f7f7f4", border: "1px solid #d9d5cf", borderRadius: "8px", overflow: "hidden", marginTop: "14px" }}>
                <div style={{ display: "flex", padding: "8px 12px", borderBottom: "1px solid #d9d5cf", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#7a7974" }}>memory.ts<span style={{ marginLeft: "auto", color: "#a1a19f" }}>copy</span></div>
                <pre style={{ margin: "0", padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", lineHeight: "1.65", color: "#26251e", overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: `<span style="color:#c08532;">const</span> ctx = <span style="color:#c08532;">await</span> velt.memory.query({
      workflow: <span style="color:#34785c;">"launch-email"</span>,
      reviewer: user.id,
      window: <span style="color:#34785c;">"90d"</span>,
    });` }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.05em", color: "#7a7974" }}>06 · MEMORY</span><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", letterSpacing: "0.06em", background: "#f54e00", color: "#fff", padding: "2px 7px", borderRadius: "4px" }}>NEW</span></div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginBottom: "12px" }}>// the moat</div>
              <h3 style={{ fontSize: "24px", lineHeight: "1.2", letterSpacing: "-0.012em", fontWeight: "400" }}>Past decisions surface as precedent, so reviews stay consistent as teams grow.</h3>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "18px" }}>Explore Memory <span>→</span></a>
            </div>
          </div>


          <div style={{ display: "grid", gridTemplateColumns: "0.82fr 1.18fr", gap: "48px", alignItems: "center", padding: "56px 0 8px", borderTop: "1px solid #d9d5cf" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.05em", color: "#7a7974" }}>07 · REVIEW AGENTS</span><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", letterSpacing: "0.06em", background: "#f54e00", color: "#fff", padding: "2px 7px", borderRadius: "4px" }}>NEW</span></div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginBottom: "12px" }}>// AI catches the obvious</div>
              <h3 style={{ fontSize: "24px", lineHeight: "1.2", letterSpacing: "-0.012em", fontWeight: "400" }}>AI flags issues and proposes fixes as comments, before a human looks.</h3>
              <p style={{ fontSize: "15px", lineHeight: "1.55", color: "#7a7974", marginTop: "14px" }}>The first-pass reviewer that never gets tired.</p>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "18px" }}>Explore Review agents <span>→</span></a>
              <blockquote style={{ margin: "24px 0 0", paddingLeft: "14px", borderLeft: "2px solid #c08532", fontFamily: "'EB Garamond',serif", fontSize: "17px", fontStyle: "italic", lineHeight: "1.45", color: "#26251e" }}>80% of issues are flagged before a human ever opens the doc.<span style={{ display: "block", fontFamily: "'JetBrains Mono',monospace", fontStyle: "normal", fontSize: "11px", color: "#7a7974", marginTop: "8px" }}>Eng Lead · pilot customer</span></blockquote>
            </div>
            <div>
              <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", boxShadow: "rgba(0,0,0,0.06) 0px 14px 32px", padding: "18px" }}>
                <div style={{ display: "flex", gap: "10px", paddingBottom: "14px", borderBottom: "1px solid #e6e5e0" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#26251e", color: "#f7f7f4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", flexShrink: "0" }}>AI</span>
                  <div style={{ flex: "1" }}><div style={{ fontSize: "13px" }}>Compliance Agent <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#b8400a", border: "1px solid #f0b89c", padding: "1px 6px", borderRadius: "4px", marginLeft: "4px" }}>2 findings</span></div><p style={{ fontSize: "13px", lineHeight: "1.5", color: "#26251e", marginTop: "4px" }}>Slide 4 claims "guaranteed returns". Flagged: prohibited phrasing for FINRA audiences. Suggested fix attached.</p>
                  <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}><span style={{ fontSize: "11.5px", background: "#26251e", color: "#f7f7f4", padding: "5px 12px", borderRadius: "9999px" }}>Accept fix</span><span style={{ fontSize: "11.5px", background: "transparent", color: "#7a7974", border: "1px solid #d9d5cf", padding: "5px 12px", borderRadius: "9999px" }}>Dismiss</span></div></div>
                </div>
                <div style={{ display: "flex", gap: "10px", paddingTop: "14px" }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#26251e", color: "#f7f7f4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", flexShrink: "0" }}>AI</span>
                  <div><div style={{ fontSize: "13px" }}>Brand Agent</div><p style={{ fontSize: "13px", lineHeight: "1.5", color: "#7a7974", marginTop: "3px" }}>Logo on the cover is the 2024 mark. Current asset: <span style={{ fontFamily: "'JetBrains Mono',monospace", color: "#f54e00" }}>brand/logo-2026.svg</span></p></div>
                </div>
              </div>
              <div style={{ background: "#f7f7f4", border: "1px solid #d9d5cf", borderRadius: "8px", overflow: "hidden", marginTop: "14px" }}>
                <div style={{ display: "flex", padding: "8px 12px", borderBottom: "1px solid #d9d5cf", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#7a7974" }}>agents.ts<span style={{ marginLeft: "auto", color: "#a1a19f" }}>copy</span></div>
                <pre style={{ margin: "0", padding: "12px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", lineHeight: "1.65", color: "#26251e", overflowX: "auto" }} dangerouslySetInnerHTML={{ __html: `velt.agents.<span style="color:#c08532;">define</span>({
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
