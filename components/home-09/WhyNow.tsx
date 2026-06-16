import "./WhyNow.css";

export default function WhyNow() {
  return (
      <section className="why-section">
        <div className="why-intro">
          <div className="why-eyebrow"><span className="why-eyebrow-dot"></span>Why now</div>
          <h2 className="why-heading">Let agents propose, not touch.</h2>
          <p className="why-desc">Every agent suggestion becomes a comment a human approves. On approve, the change is applied through your webhook, with a permanent record of who allowed what.</p>
          <div className="why-comment">// Stop giving agents write access just to offer agentic features.</div>
        </div>

        <div className="why-grid">

          {/* 01 — agent proposes */}
          <div className="why-card-light">
            <div className="why-step-label">1 · Agent proposes</div>
            <div className="why-agent-row">
              <span className="why-avatar-ai">AI</span>
              <span className="why-agent-name">Invoice Agent</span>
              <span className="why-confidence">0.92</span>
            </div>
            <p className="why-card-text">Vendor rate is 12% over contract. Suggest correcting line 7.</p>
            <p className="why-card-sub">Rationale: contract C-2209 caps the rate at $140/hr. Line 7 bills $157/hr.</p>
          </div>

          {/* 02 — human decides */}
          <div className="why-card-light">
            <div className="why-step-label">2 · Human decides</div>
            <div className="why-agent-row">
              <span className="why-avatar-mk">MK</span>
              <span className="why-agent-name">Maya K.</span>
              <span className="why-approver-badge">approver</span>
            </div>
            <p className="why-card-text">Checked against C-2209. Good catch.</p>
            <div className="why-btn-row">
              <button className="why-btn-approve">Approve</button>
              <button className="why-btn-reject">Reject</button>
            </div>
          </div>

          {/* 03 — applied via your webhook */}
          <div className="why-card-dark">
            <div className="why-step-label-dark">3 · Applied via your webhook</div>
            <div className="why-code-block">
              <div className="why-code-post">POST <span className="why-code-route">/webhooks/velt</span></div>
              <div className="why-code-brace">&#123;</div>
              <div className="why-code-line">"event": <span className="why-code-string">"change.applied"</span>,</div>
              <div className="why-code-line">"target": <span className="why-code-string">"line_7"</span>,</div>
              <div className="why-code-line">"allowedBy": <span className="why-code-string">"maya.k"</span></div>
              <div className="why-code-brace">&#125;</div>
            </div>
            <p className="why-code-footer">Recorded: who allowed what, when.</p>
          </div>
        </div>
      </section>
  );
}
