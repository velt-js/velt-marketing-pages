export default function Enterprise() {
  return (
      <section style={{ background: "#26251e", color: "#f7f7f4" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "80px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "end" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#f54e00", marginBottom: "20px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f54e00" }}></span>Built for enterprise</div>
              <h2 style={{ fontSize: "36px", lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "400", maxWidth: "18ch" }}>Built for your customers' compliance.</h2>
            </div>
            <p style={{ fontSize: "15px", lineHeight: "1.6", color: "#a1a19f" }}>Per-feature data providers keep content and PII on your infrastructure. SOC 2 Type II audited, HIPAA workloads supported, data residency options including the EU.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginTop: "44px" }}>
            <div style={{ background: "#1e1d17", border: "1px solid #3a3934", borderRadius: "8px", padding: "20px" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10.5px", letterSpacing: "0.05em", color: "#8f8e89", marginBottom: "14px" }}>PILLAR 01 · DEPLOYMENT</div>
              <h4 style={{ fontSize: "18px", fontWeight: "400", letterSpacing: "-0.01em", marginBottom: "8px" }}>Your data stays yours.</h4>
              <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#a1a19f" }}>Velt stores minimal identifiers. Everything sensitive lives where you say it does.</p>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10.5px", lineHeight: "1.9", color: "#e6e5e0", marginTop: "14px" }}>▸ comments → your db<br />▸ recordings → your S3<br />▸ user PII → never leaves</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#f54e00", marginTop: "12px" }}>velt.dev/self-hosting</div>
            </div>
            <div style={{ background: "#1e1d17", border: "1px solid #3a3934", borderRadius: "8px", padding: "20px" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10.5px", letterSpacing: "0.05em", color: "#8f8e89", marginBottom: "14px" }}>PILLAR 02 · RELIABILITY</div>
              <h4 style={{ fontSize: "18px", fontWeight: "400", letterSpacing: "-0.01em", marginBottom: "8px" }}>99.999% SLA</h4>
              <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#a1a19f" }}>Reliability terms in writing for enterprise plans, with a public status page your team can watch.</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "14px" }}><span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#8f8e89" }}>trailing 90d</span><span style={{ fontSize: "18px", color: "#4ade80" }}>100.000%</span></div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#f54e00", marginTop: "12px" }}>status.velt.dev</div>
            </div>
            <div style={{ background: "#1e1d17", border: "1px solid #3a3934", borderRadius: "8px", padding: "20px" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10.5px", letterSpacing: "0.05em", color: "#8f8e89", marginBottom: "14px" }}>PILLAR 03 · GLOBAL</div>
              <h4 style={{ fontSize: "18px", fontWeight: "400", letterSpacing: "-0.01em", marginBottom: "8px" }}>42 regions</h4>
              <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#a1a19f" }}>Multi-region infrastructure with residency pinning, so review stays fast wherever your users work.</p>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10.5px", color: "#e6e5e0", marginTop: "14px" }}>us-east, eu-west,<br />ap-south, +39 more</div>
            </div>
            <div style={{ background: "#1e1d17", border: "1px solid #3a3934", borderRadius: "8px", padding: "20px" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10.5px", letterSpacing: "0.05em", color: "#8f8e89", marginBottom: "14px" }}>PILLAR 04 · COMPLIANCE</div>
              <h4 style={{ fontSize: "18px", fontWeight: "400", letterSpacing: "-0.01em", marginBottom: "8px" }}>SOC 2 Type II.</h4>
              <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#a1a19f" }}>The answers your buyer's security team asks for, ready before they ask.</p>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10.5px", lineHeight: "1.9", color: "#e6e5e0", marginTop: "14px" }}>SOC 2 report under NDA<br />HIPAA BAA available<br />PEN TESTS regular</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#f54e00", marginTop: "12px" }}>trust.velt.dev</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "14px", marginTop: "32px" }}>
            <a href="#proof" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", background: "#ffffff", color: "#26251e", padding: "11px 20px", borderRadius: "9999px", transition: "opacity .15s" }} className="hfade">Book Demo <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>→</span></a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#f7f7f4", padding: "11px 20px", borderRadius: "9999px", border: "1px solid #3a3934", transition: "border-color .15s" }} className="houtline">Governance</a>
          </div>
        </div>
      </section>
  );
}
