export default function Verticals() {
  return (
      <section id="verticals" style={{ maxWidth: "1180px", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#7a7974", marginBottom: "20px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#26251e" }}></span>Is this for me</div>
        <h2 style={{ fontSize: "36px", lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "400", maxWidth: "26ch" }}>Built for work that can't ship unapproved.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginTop: "40px" }}>
          <a href="#" style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "22px", display: "block", transition: "border-color .15s,transform .15s" }} className="hcard">
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#a1a19f", letterSpacing: "0.05em", marginBottom: "14px" }}>VERTICAL 01</div>
            <div style={{ fontSize: "17px", lineHeight: "1.25", letterSpacing: "-0.01em", marginBottom: "10px" }}>Sales enablement and content production</div>
            <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#7a7974" }}>Brand, legal, and client approval on every asset, inside your product.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "16px" }}>Explore →</div>
          </a>
          <a href="#" style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "22px", display: "block", transition: "border-color .15s,transform .15s" }} className="hcard">
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#a1a19f", letterSpacing: "0.05em", marginBottom: "14px" }}>VERTICAL 02</div>
            <div style={{ fontSize: "17px", lineHeight: "1.25", letterSpacing: "-0.01em", marginBottom: "10px" }}>Fintech, FP&amp;A, and compliance</div>
            <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#7a7974" }}>Numbers ship with names attached: staged sign-off and immutable records.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "16px" }}>Explore →</div>
          </a>
          <a href="#" style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "22px", display: "block", transition: "border-color .15s,transform .15s" }} className="hcard">
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#a1a19f", letterSpacing: "0.05em", marginBottom: "14px" }}>VERTICAL 03</div>
            <div style={{ fontSize: "17px", lineHeight: "1.25", letterSpacing: "-0.01em", marginBottom: "10px" }}>Physical-world operations</div>
            <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#7a7974" }}>Human sign-off on operational decisions, often across organizations.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "16px" }}>Explore →</div>
          </a>
          <a href="#" style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "22px", display: "block", transition: "border-color .15s,transform .15s" }} className="hcard">
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#a1a19f", letterSpacing: "0.05em", marginBottom: "14px" }}>VERTICAL 04</div>
            <div style={{ fontSize: "17px", lineHeight: "1.25", letterSpacing: "-0.01em", marginBottom: "10px" }}>AI-native SaaS</div>
            <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#7a7974" }}>Agents propose, humans approve. The loop that makes generated work shippable.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "16px" }}>Explore →</div>
          </a>
        </div>
      </section>
  );
}
