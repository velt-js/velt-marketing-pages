export default function Nav() {
  return (
      <header style={{ position: "sticky", top: "0", zIndex: "50", background: "rgba(255,255,255,0.82)", backdropFilter: "saturate(180%) blur(12px)", borderBottom: "1px solid #d9d5cf" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", gap: "36px" }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "16px", letterSpacing: "0.01em" }}>
            <span style={{ width: "22px", height: "22px", background: "#26251e", position: "relative", display: "inline-block", borderRadius: "3px" }}><span style={{ position: "absolute", inset: "6px", background: "#ffffff" }}></span></span>
            <span style={{ fontWeight: "500" }}>velt</span>
          </a>
          <nav style={{ display: "flex", gap: "22px", fontSize: "14px", color: "#7a7974" }}>
            <a href="#primitives" style={{ transition: "color .15s" }} className="hl">Products</a>
            <a href="#verticals" style={{ transition: "color .15s" }} className="hl">Solutions</a>
            <a href="#how" style={{ transition: "color .15s" }} className="hl">Pricing</a>
            <a href="#faq" style={{ transition: "color .15s" }} className="hl">Compare</a>
            <a href="#proof" style={{ transition: "color .15s" }} className="hl">Customers</a>
            <a href="#how" style={{ transition: "color .15s" }} className="hl">Docs</a>
          </nav>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "14px" }}>
            <a href="#" style={{ fontSize: "14px", color: "#26251e", transition: "color .15s" }} className="hl">Sign in</a>
            <a href="#cta" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "14px", whiteSpace: "nowrap", background: "#26251e", color: "#f7f7f4", padding: "9px 18px", borderRadius: "9999px", transition: "background .15s" }} className="hdark">Get Free API Key <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>→</span></a>
          </div>
        </div>
      </header>
  );
}
