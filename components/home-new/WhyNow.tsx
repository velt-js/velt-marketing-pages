"use client";

import { useState } from "react";
import "./WhyNow.css";

/** The two audit-trail threads linking a card's data to the permanent record
 *  in the webhook payload (the agent's target line, and the human approver). */
type TraceThread = "target" | "approver";

export default function WhyNow() {
  const [activeThread, setActiveThread] = useState<TraceThread | null>(null);

  /**
   * Compose the className for a traceable token, applying its thread color and
   * an `is-linked` emphasis when that thread is currently hovered.
   * @param thread - which audit-trail thread the token belongs to
   * @returns the composed className string
   */
  const traceClass = (thread: TraceThread): string => {
    try {
      const base = `why-trace why-trace--${thread}`;
      return activeThread === thread ? `${base} is-linked` : base;
    } catch (error) {
      console.error("traceClass failed", error);
      return "why-trace";
    }
  };

  /**
   * Activate a thread so both of its linked tokens highlight together.
   * @param thread - thread to highlight on pointer enter
   */
  const handleEnter = (thread: TraceThread): void => {
    try {
      setActiveThread(thread);
    } catch (error) {
      console.error("handleEnter failed", error);
    }
  };

  /**
   * Clear the active thread when the pointer leaves a traceable token.
   */
  const handleLeave = (): void => {
    try {
      setActiveThread(null);
    } catch (error) {
      console.error("handleLeave failed", error);
    }
  };

  return (
      <section className="why-section">
        <div className="why-intro">
          <div className="why-eyebrow"><span className="why-eyebrow-dot"></span>Why now</div>
          <h2 className="why-heading">Let agents propose, not touch.</h2>
          <p className="why-desc">Every agent suggestion becomes a comment a human approves. On approve, the change is applied through your webhook, with a permanent record of who allowed what.</p>
          <div className="why-comment">// Stop giving agents write access just to offer agentic features.</div>
        </div>

        <div className="why-timeline">
          <div className="why-tl-track">

            {/* 01 — agent proposes */}
            <div className="why-tl-item">
              <div className="why-tl-head">
                <span className="why-tl-node">01</span>
                <span className="why-tl-label">Agent proposes</span>
              </div>
              <span className="why-tl-drop" aria-hidden="true"></span>
              <div className="why-card-light">
                <div className="why-agent-row">
                  <span className="why-avatar-ai">AI</span>
                  <span className="why-agent-name">Invoice Agent</span>
                  <span className="why-confidence">0.92</span>
                </div>
                <p className="why-card-text">Vendor rate is 12% over contract. Suggest correcting <span className={traceClass("target")} onMouseEnter={() => handleEnter("target")} onMouseLeave={handleLeave}>line 7</span>.</p>
                <p className="why-card-sub">Rationale: contract C-2209 caps the rate at $140/hr. Line 7 bills $157/hr.</p>
              </div>
            </div>

            {/* 02 — human decides */}
            <div className="why-tl-item">
              <div className="why-tl-head">
                <span className="why-tl-node">02</span>
                <span className="why-tl-label">Human decides</span>
              </div>
              <span className="why-tl-drop" aria-hidden="true"></span>
              <div className="why-card-light">
                <div className="why-agent-row">
                  <span className="why-avatar-mk">MK</span>
                  <span className="why-agent-name"><span className={traceClass("approver")} onMouseEnter={() => handleEnter("approver")} onMouseLeave={handleLeave}>Maya K.</span></span>
                  <span className="why-approver-badge">approver</span>
                </div>
                <p className="why-card-text">Checked against C-2209. Good catch.</p>
                <div className="why-btn-row">
                  <button className="why-btn-approve">Approve</button>
                  <button className="why-btn-reject">Reject</button>
                </div>
              </div>
            </div>

            {/* 03 — applied via your webhook (the permanent record) */}
            <div className="why-tl-item">
              <div className="why-tl-head">
                <span className="why-tl-node">03</span>
                <span className="why-tl-label">Applied via your webhook</span>
              </div>
              <span className="why-tl-drop" aria-hidden="true"></span>
              <div className="why-card-dark">
                <div className="why-code-block">
                  <div className="why-code-post">POST <span className="why-code-route">/webhooks/velt</span></div>
                  <div className="why-code-brace">&#123;</div>
                  <div className="why-code-line">"event": <span className="why-code-string">"change.applied"</span>,</div>
                  <div className="why-code-line">"target": <span className={traceClass("target")} onMouseEnter={() => handleEnter("target")} onMouseLeave={handleLeave}>"line_7"</span>,</div>
                  <div className="why-code-line">"allowedBy": <span className={traceClass("approver")} onMouseEnter={() => handleEnter("approver")} onMouseLeave={handleLeave}>"maya.k"</span></div>
                  <div className="why-code-brace">&#125;</div>
                </div>
                <p className="why-code-footer">Recorded: who allowed what, when.</p>
              </div>
            </div>
          </div>

          <p className="why-tl-caption">// every value in the record traces back to who put it there — hover to follow the thread</p>
        </div>
      </section>
  );
}
