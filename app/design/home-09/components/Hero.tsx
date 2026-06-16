export default function Hero() {
  return (
      <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "72px 32px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.02em", color: "#7a7974", marginBottom: "22px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#34785c" }}></span>SOC 2 Type II · HIPAA · EU data residency
          </div>
          <h1 style={{ fontSize: "62px", lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "400", maxWidth: "11ch" }}>Add a pull request to your product.</h1>
          <p style={{ fontSize: "18px", lineHeight: "1.5", color: "#7a7974", maxWidth: "46ch", marginTop: "24px" }}>Embeddable review and approval for AI-native apps. Add governance to the work that can't ship unapproved.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "32px" }}>
            <a href="#cta" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", background: "#26251e", color: "#f7f7f4", padding: "12px 22px", borderRadius: "9999px", transition: "background .15s" }} className="hdark">Get Free API Key <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>→</span></a>
            <a href="#proof" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", background: "transparent", color: "#26251e", padding: "12px 22px", borderRadius: "9999px", border: "1px solid #26251e", transition: "background .15s" }} className="hsoft">Book Demo</a>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11.5px", letterSpacing: "0.04em", color: "#a1a19f", marginTop: "24px" }}>FREE TIER · NO CREDIT CARD · FIRST COMMENT IN 5 MINUTES</div>
        </div>


        <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "rgba(0,0,0,0.14) 0px 28px 70px 0px, rgba(0,0,0,0.1) 0px 14px 32px 0px, rgba(38,37,30,0.1) 0px 0px 0px 1px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 14px", borderBottom: "1px solid #e6e5e0", background: "#f7f7f4" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#7a7974" strokeWidth="1.3"><path d="M8 1.5H3.5v11H10.5V4z"></path><path d="M8 1.5V4h2.5"></path></svg>
            <span style={{ fontSize: "13px" }}>Q3 Pricing One-Pager</span>
            <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", letterSpacing: "0.04em", color: "#34785c", border: "1px solid #4ade80", padding: "3px 7px", borderRadius: "4px" }}>APPROVED</span>
          </div>
          <div style={{ padding: "18px" }}>
            <div style={{ display: "flex", gap: "24px", paddingBottom: "14px", borderBottom: "1px dashed #d9d5cf", fontSize: "12.5px", color: "#7a7974" }}>
              <div><div style={{ color: "#a1a19f", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", marginBottom: "4px" }}>PLAN</div>Pro</div>
              <div><div style={{ color: "#a1a19f", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", marginBottom: "4px" }}>CURRENT</div>$79</div>
              <div><div style={{ color: "#a1a19f", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", marginBottom: "4px" }}>PROPOSED</div><span style={{ color: "#26251e" }}>$85</span></div>
            </div>
            <div style={{ marginTop: "16px", padding: "14px", background: "#ffffff", border: "1px solid #e6e5e0", borderRadius: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#26251e", color: "#f7f7f4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "9px" }}>AI</span>
                <span style={{ fontSize: "13px" }}>Pricing Agent</span>
                <span style={{ marginLeft: "auto", fontSize: "11px", color: "#a1a19f" }}>just now</span>
              </div>
              <p style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#26251e" }}>Proposed Pro price was $92, above the approved Q3 band. I suggest $85, the band maximum.</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button style={{ fontSize: "12.5px", background: "#26251e", color: "#f7f7f4", border: "none", padding: "7px 16px", borderRadius: "9999px", cursor: "pointer" }}>Approve</button>
                <button style={{ fontSize: "12.5px", background: "transparent", color: "#26251e", border: "1px solid #d9d5cf", padding: "7px 16px", borderRadius: "9999px", cursor: "pointer" }}>Reject</button>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", fontSize: "12.5px", color: "#7a7974" }}>
              <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#c08532", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9px" }}>MK</span>
              Maya approved this change
            </div>
            <div style={{ marginTop: "14px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#f7f7f4", background: "#26251e", padding: "9px 12px", borderRadius: "4px" }}>POST /webhooks/velt · <span style={{ color: "#4ade80" }}>change.applied</span></div>
          </div>
        </div>
      </section>
  );
}
