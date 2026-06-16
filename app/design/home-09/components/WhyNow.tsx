export default function WhyNow() {
  return (
      <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ maxWidth: "620px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#7a7974", marginBottom: "20px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#26251e" }}></span>Why now</div>
          <h2 style={{ fontSize: "36px", lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "400" }}>Let agents propose, not touch.</h2>
          <p style={{ fontSize: "16px", lineHeight: "1.55", color: "#7a7974", marginTop: "18px" }}>Every agent suggestion becomes a comment a human approves. On approve, the change is applied through your webhook, with a permanent record of who allowed what.</p>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "16px" }}>// Stop giving agents write access just to offer agentic features.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "18px", marginTop: "44px", alignItems: "stretch" }}>

          {/* 01 — agent proposes */}
          <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#a1a19f", marginBottom: "16px" }}>1 · Agent proposes</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#26251e", color: "#f7f7f4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", flexShrink: "0" }}>AI</span>
              <span style={{ fontSize: "15px", color: "#26251e" }}>Invoice Agent</span>
              <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", color: "#34785c" }}>0.92</span>
            </div>
            <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#26251e" }}>Vendor rate is 12% over contract. Suggest correcting line 7.</p>
            <p style={{ fontSize: "14px", lineHeight: "1.5", color: "#7a7974", marginTop: "14px" }}>Rationale: contract C-2209 caps the rate at $140/hr. Line 7 bills $157/hr.</p>
          </div>

          {/* 02 — human decides */}
          <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#a1a19f", marginBottom: "16px" }}>2 · Human decides</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#c08532", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9px", flexShrink: "0" }}>MK</span>
              <span style={{ fontSize: "15px", color: "#26251e" }}>Maya K.</span>
              <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#7a7974", border: "1px solid #d9d5cf", padding: "2px 8px", borderRadius: "4px" }}>approver</span>
            </div>
            <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#26251e" }}>Checked against C-2209. Good catch.</p>
            <div style={{ display: "flex", gap: "8px", marginTop: "auto", paddingTop: "20px" }}>
              <button style={{ fontSize: "12.5px", background: "#26251e", color: "#f7f7f4", border: "none", padding: "7px 16px", borderRadius: "9999px", cursor: "pointer" }}>Approve</button>
              <button style={{ fontSize: "12.5px", background: "transparent", color: "#26251e", border: "1px solid #d9d5cf", padding: "7px 16px", borderRadius: "9999px", cursor: "pointer" }}>Reject</button>
            </div>
          </div>

          {/* 03 — applied via your webhook */}
          <div style={{ background: "#26251e", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#8f8e89", marginBottom: "16px" }}>3 · Applied via your webhook</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", lineHeight: "1.85" }}>
              <div style={{ color: "#4ade80" }}>POST <span style={{ color: "#f7f7f4" }}>/webhooks/velt</span></div>
              <div style={{ color: "#a1a19f" }}>&#123;</div>
              <div style={{ paddingLeft: "18px", color: "#f7f7f4" }}>"event": <span style={{ color: "#e0913f" }}>"change.applied"</span>,</div>
              <div style={{ paddingLeft: "18px", color: "#f7f7f4" }}>"target": <span style={{ color: "#e0913f" }}>"line_7"</span>,</div>
              <div style={{ paddingLeft: "18px", color: "#f7f7f4" }}>"allowedBy": <span style={{ color: "#e0913f" }}>"maya.k"</span></div>
              <div style={{ color: "#a1a19f" }}>&#125;</div>
            </div>
            <p style={{ fontSize: "12px", color: "#8f8e89", marginTop: "auto", paddingTop: "16px" }}>Recorded: who allowed what, when.</p>
          </div>
        </div>
      </section>
  );
}
