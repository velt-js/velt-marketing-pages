export default function FinalCta() {
  return (
      <section id="cta" style={{ background: "#26251e", color: "#f7f7f4" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto", padding: "96px 32px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#f54e00", marginBottom: "24px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f54e00" }}></span>Ship it</div>
          <h2 style={{ fontSize: "54px", lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "400", maxWidth: "18ch", margin: "0 auto" }}>Add comments and approvals to your product this weekend.</h2>
          <p style={{ fontSize: "17px", lineHeight: "1.5", color: "#a1a19f", marginTop: "24px" }}>Free tier. No credit card. First comment in 5 minutes.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", background: "#ffffff", color: "#26251e", padding: "12px 24px", borderRadius: "9999px", transition: "opacity .15s" }} className="hfade">Get Free API Key <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>→</span></a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "#f7f7f4", padding: "12px 24px", borderRadius: "9999px", border: "1px solid #3a3934", transition: "border-color .15s" }} className="houtline">Book Demo</a>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.04em", color: "#8f8e89", marginTop: "24px" }}>DEMOS ARE 30 MINUTES, WITH AN ENGINEER, NOT A SALES DECK</div>
          <div style={{ marginTop: "18px", fontSize: "14px", color: "#a1a19f" }}>Or <a href="#" style={{ color: "#f54e00" }}>talk to Rakesh, the founder →</a></div>
        </div>
      </section>
  );
}
