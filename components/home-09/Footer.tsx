import "./Footer.css";

export default function Footer() {
  return (
      <footer className="footer-root">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <a href="#top" className="footer-brand-link"><span className="footer-logomark"><span className="footer-logomark-inset"></span></span><span className="footer-brand-name">velt</span></a>
              <p className="footer-tagline">Embeddable review and approval for AI-native apps. Agents do the work, humans decide.</p>
              <div className="footer-badges">
                <span className="footer-badge">SOC 2 Type II</span>
                <span className="footer-badge">HIPAA</span>
                <span className="footer-badge">YC</span>
              </div>
            </div>
            <div>
              <h4 className="footer-col-heading">PRIMITIVES</h4>
              <div className="footer-col-links">
                <a href="#primitives" className="hl">Comments</a><a href="#primitives" className="hl">Approval flows</a><a href="#primitives" className="hl">Review agents</a><a href="#primitives" className="hl">Suggestions</a><a href="#primitives" className="hl">Audit trail</a><a href="#primitives" className="hl">Memory</a><a href="#primitives" className="hl">Notifications</a>
              </div>
            </div>
            <div>
              <h4 className="footer-col-heading">COLLABORATION</h4>
              <div className="footer-col-links">
                <a href="#" className="hl">Presence</a><a href="#" className="hl">Live cursors</a><a href="#" className="hl">Multiplayer editing</a><a href="#" className="hl">Single editor mode</a><a href="#" className="hl">Recording</a><a href="#" className="hl">Huddle</a>
              </div>
            </div>
            <div>
              <h4 className="footer-col-heading">VERTICALS</h4>
              <div className="footer-col-links">
                <a href="#verticals" className="hl">Sales enablement</a><a href="#verticals" className="hl">Fintech &amp; FP&amp;A</a><a href="#verticals" className="hl">Operations</a><a href="#verticals" className="hl">AI-native SaaS</a><a href="#" className="hl">Governance</a><a href="#" className="hl">Self-hosting</a>
              </div>
            </div>
            <div>
              <h4 className="footer-col-heading">RESOURCES</h4>
              <div className="footer-col-links">
                <a href="#how" className="hl">Docs</a><a href="#how" className="hl">Pricing</a><a href="#proof" className="hl">Customers</a><a href="#faq" className="hl">vs Liveblocks</a><a href="#" className="hl">Status</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Velt, Inc.</span><span>BUILT IN SF · BACKED BY YC</span><span>velt.dev</span>
          </div>
        </div>
      </footer>
  );
}
