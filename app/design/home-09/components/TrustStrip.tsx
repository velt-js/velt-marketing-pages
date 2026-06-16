export default function TrustStrip() {
  return (
      <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "24px 32px 64px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textAlign: "center", marginBottom: "28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "14px", color: "#26251e" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f54e00" }}></span>
            <span><strong style={{ color: "#f54e00", fontWeight: "500" }}>500k+ reviews</strong> running in production at OpenEnvoy</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.04em", color: "#a1a19f" }}>// 2M+ review decisions across 33 products</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "14px 40px", opacity: "0.55", fontSize: "17px", letterSpacing: "-0.01em", color: "#26251e" }}>
          <span>OpenEnvoy</span><span>Bigtincan</span><span style={{ fontStyle: "italic" }}>trumpet</span><span>Datarails</span><span>Privado</span><span>Cofactr</span><span>Runway</span><span>HeyGen</span><span>CloudFactory</span><span>Leadpages</span><span style={{ fontWeight: "500" }}>PERSUIT</span>
        </div>
      </section>
  );
}
