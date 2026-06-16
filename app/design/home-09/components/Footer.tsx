export default function Footer() {
  return (
      <footer style={{ background: "#ffffff", borderTop: "1px solid #d9d5cf" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "64px 32px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "32px" }}>
            <div>
              <a href="#top" style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "16px", marginBottom: "14px" }}><span style={{ width: "22px", height: "22px", background: "#26251e", position: "relative", display: "inline-block", borderRadius: "3px" }}><span style={{ position: "absolute", inset: "6px", background: "#ffffff" }}></span></span><span style={{ fontWeight: "500" }}>velt</span></a>
              <p style={{ fontSize: "13.5px", lineHeight: "1.55", color: "#7a7974", maxWidth: "34ch" }}>Embeddable review and approval for AI-native apps. Agents do the work, humans decide.</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#7a7974", border: "1px solid #d9d5cf", padding: "4px 9px", borderRadius: "4px" }}>SOC 2 Type II</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#7a7974", border: "1px solid #d9d5cf", padding: "4px 9px", borderRadius: "4px" }}>HIPAA</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#7a7974", border: "1px solid #d9d5cf", padding: "4px 9px", borderRadius: "4px" }}>YC</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.06em", color: "#a1a19f", marginBottom: "14px" }}>PRIMITIVES</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px", color: "#7a7974" }}>
                <a href="#primitives" className="hl">Comments</a><a href="#primitives" className="hl">Approval flows</a><a href="#primitives" className="hl">Review agents</a><a href="#primitives" className="hl">Suggestions</a><a href="#primitives" className="hl">Audit trail</a><a href="#primitives" className="hl">Memory</a><a href="#primitives" className="hl">Notifications</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.06em", color: "#a1a19f", marginBottom: "14px" }}>COLLABORATION</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px", color: "#7a7974" }}>
                <a href="#" className="hl">Presence</a><a href="#" className="hl">Live cursors</a><a href="#" className="hl">Multiplayer editing</a><a href="#" className="hl">Single editor mode</a><a href="#" className="hl">Recording</a><a href="#" className="hl">Huddle</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.06em", color: "#a1a19f", marginBottom: "14px" }}>VERTICALS</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px", color: "#7a7974" }}>
                <a href="#verticals" className="hl">Sales enablement</a><a href="#verticals" className="hl">Fintech &amp; FP&amp;A</a><a href="#verticals" className="hl">Operations</a><a href="#verticals" className="hl">AI-native SaaS</a><a href="#" className="hl">Governance</a><a href="#" className="hl">Self-hosting</a>
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.06em", color: "#a1a19f", marginBottom: "14px" }}>RESOURCES</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "13.5px", color: "#7a7974" }}>
                <a href="#how" className="hl">Docs</a><a href="#how" className="hl">Pricing</a><a href="#proof" className="hl">Customers</a><a href="#faq" className="hl">vs Liveblocks</a><a href="#" className="hl">Status</a>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid #d9d5cf", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#a1a19f", letterSpacing: "0.03em" }}>
            <span>© 2026 Velt, Inc.</span><span>BUILT IN SF · BACKED BY YC</span><span>velt.dev</span>
          </div>
        </div>
      </footer>
  );
}
