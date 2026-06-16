export default function Problem() {
  return (
      <section style={{ background: "#f7f7f4", borderTop: "1px solid #d9d5cf", borderBottom: "1px solid #d9d5cf" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#7a7974", marginBottom: "22px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#26251e" }}></span>The problem</div>
          <h2 style={{ fontSize: "34px", lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "400", maxWidth: "24ch", margin: "0 auto" }}>Your users need to review and approve what your product generates. Building that takes two quarters.</h2>
          <p style={{ fontSize: "14px", color: "#7a7974", marginTop: "16px" }}>Check all that apply.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "28px", textAlign: "left", maxWidth: "620px", marginLeft: "auto", marginRight: "auto" }}>
            <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "14px 16px", cursor: "pointer", fontSize: "15px", lineHeight: "1.45" }}><input type="checkbox" style={{ marginTop: "3px", accentColor: "#f54e00", width: "15px", height: "15px" }} /><span>Buyers ask "do you support approval workflows?" and the honest answer costs a quarter.</span></label>
            <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "14px 16px", cursor: "pointer", fontSize: "15px", lineHeight: "1.45" }}><input type="checkbox" style={{ marginTop: "3px", accentColor: "#f54e00", width: "15px", height: "15px" }} /><span>Your agents need write access to be useful, and security says no.</span></label>
            <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "14px 16px", cursor: "pointer", fontSize: "15px", lineHeight: "1.45" }}><input type="checkbox" style={{ marginTop: "3px", accentColor: "#f54e00", width: "15px", height: "15px" }} /><span>Feedback about work in your product happens in Slack screenshots.</span></label>
            <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "14px 16px", cursor: "pointer", fontSize: "15px", lineHeight: "1.45" }}><input type="checkbox" style={{ marginTop: "3px", accentColor: "#f54e00", width: "15px", height: "15px" }} /><span>A regulated deal stalled on "who approved this?"</span></label>
            <label style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "#ffffff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "14px 16px", cursor: "pointer", fontSize: "15px", lineHeight: "1.45" }}><input type="checkbox" style={{ marginTop: "3px", accentColor: "#f54e00", width: "15px", height: "15px" }} /><span>Users turned off your AI the first time it changed something it shouldn't.</span></label>
          </div>
          <div style={{ marginTop: "36px", paddingTop: "32px", borderTop: "1px solid #d9d5cf" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginBottom: "12px" }}>// the qualifier</div>
            <p style={{ fontFamily: "'EB Garamond',serif", fontSize: "21px", fontStyle: "italic", lineHeight: "1.4", color: "#26251e", maxWidth: "52ch", margin: "0 auto" }}>If your product has work that more than one of your users reviews or approves, this is for you. If it doesn't, it isn't.</p>
          </div>
        </div>
      </section>
  );
}
