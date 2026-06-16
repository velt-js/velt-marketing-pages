export default function Collaboration() {
  return (
      <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ maxWidth: "640px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#7a7974", marginBottom: "20px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#26251e" }}></span>The collaboration layer</div>
          <h2 style={{ fontSize: "36px", lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "400" }}>Everything else your users expect.</h2>
          <p style={{ fontSize: "16px", lineHeight: "1.55", color: "#7a7974", marginTop: "16px" }}>The multiplayer layer, included. Same SDK, no second vendor, no second contract.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginTop: "40px" }}>
          <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}><span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#34785c", color: "#fff", fontSize: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>A</span><span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#c08532", color: "#fff", fontSize: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center", marginLeft: "-8px" }}>M</span><span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#26251e", color: "#f7f7f4", fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", display: "inline-flex", alignItems: "center", justifyContent: "center", marginLeft: "-8px" }}>AI</span><span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#7a7974" }}>3 viewing · 1 agent</span></div>
            <h4 style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "-0.01em" }}>Presence</h4>
            <p style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#7a7974", marginTop: "6px" }}>See who is viewing and editing, live. Humans and agents.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#26251e", background: "#f7f7f4", padding: "6px 10px", borderRadius: "4px", marginTop: "12px" }}>&lt;VeltPresence agents /&gt;</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "20px" }}>
            <div style={{ display: "flex", gap: "14px", marginBottom: "12px", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px" }}><span style={{ color: "#34785c" }}>▸ anna</span><span style={{ color: "#c08532" }}>▸ marcus</span><span style={{ color: "#f54e00" }}>▸ agent</span></div>
            <h4 style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "-0.01em" }}>Live Cursors</h4>
            <p style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#7a7974", marginTop: "6px" }}>Each other's cursors and selections, with names.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#26251e", background: "#f7f7f4", padding: "6px 10px", borderRadius: "4px", marginTop: "12px" }}>&lt;VeltCursor /&gt;</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontSize: "12.5px", color: "#26251e", marginBottom: "6px" }}>Net 30 from receipt of invoice</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#34785c", marginBottom: "12px" }}>yjs · synced · offline merges</div>
            <h4 style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "-0.01em" }}>Multiplayer Editing</h4>
            <p style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#7a7974", marginTop: "6px" }}>Edit together without conflicts. CRDT under the hood.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#26251e", background: "#f7f7f4", padding: "6px 10px", borderRadius: "4px", marginTop: "12px" }}>VeltCrdt.tiptap(&#123; documentId: id &#125;)</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontSize: "12.5px", color: "#26251e", marginBottom: "4px" }}>🔒 anna holds the pen</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#7a7974", marginBottom: "12px" }}>2 watching live</div>
            <h4 style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "-0.01em" }}>Single Editor Mode</h4>
            <p style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#7a7974", marginTop: "6px" }}>Lock editing to one person for a clean handoff.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#26251e", background: "#f7f7f4", padding: "6px 10px", borderRadius: "4px", marginTop: "12px" }}>&lt;VeltSingleEditorMode /&gt;</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#7a7974", marginBottom: "12px" }}>0:34 / 1:28 · pinned to row 7</div>
            <h4 style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "-0.01em" }}>Recording</h4>
            <p style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#7a7974", marginTop: "6px" }}>Capture voice, video, or screen, pinned to the work.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#26251e", background: "#f7f7f4", padding: "6px 10px", borderRadius: "4px", marginTop: "12px" }}>&lt;VeltRecorderControl type="all" /&gt;</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}><span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#34785c", color: "#fff", fontSize: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>A</span><span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#c08532", color: "#fff", fontSize: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center", marginLeft: "-8px" }}>M</span><span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: "10px", color: "#f54e00" }}>● live · 2 in</span></div>
            <h4 style={{ fontSize: "16px", fontWeight: "500", letterSpacing: "-0.01em" }}>Huddle</h4>
            <p style={{ fontSize: "13.5px", lineHeight: "1.5", color: "#7a7974", marginTop: "6px" }}>Live audio and video, right inside the document.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#26251e", background: "#f7f7f4", padding: "6px 10px", borderRadius: "4px", marginTop: "12px" }}>&lt;VeltHuddle /&gt;</div>
          </div>
        </div>
        <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "28px" }}>See the full collaboration layer <span>→</span></a>
      </section>
  );
}
