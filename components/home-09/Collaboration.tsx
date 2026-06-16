import "./Collaboration.css";

export default function Collaboration() {
  return (
      <section className="collab-section">
        <div className="collab-header">
          <div className="collab-eyebrow"><span className="collab-eyebrow-dot"></span>The collaboration layer</div>
          <h2 className="collab-title">Everything else your users expect.</h2>
          <p className="collab-desc">The multiplayer layer, included. Same SDK, no second vendor, no second contract.</p>
        </div>
        <div className="collab-grid">
          <div className="collab-card">
            <div className="collab-avatar-row"><span className="collab-avatar-green">A</span><span className="collab-avatar-gold">M</span><span className="collab-avatar-ai">AI</span><span className="collab-avatar-label">3 viewing · 1 agent</span></div>
            <h4 className="collab-card-h4">Presence</h4>
            <p className="collab-card-p">See who is viewing and editing, live. Humans and agents.</p>
            <div className="collab-chip">&lt;VeltPresence agents /&gt;</div>
          </div>
          <div className="collab-card">
            <div className="collab-cursor-row"><span className="collab-cursor-anna">▸ anna</span><span className="collab-cursor-marcus">▸ marcus</span><span className="collab-cursor-agent">▸ agent</span></div>
            <h4 className="collab-card-h4">Live Cursors</h4>
            <p className="collab-card-p">Each other's cursors and selections, with names.</p>
            <div className="collab-chip">&lt;VeltCursor /&gt;</div>
          </div>
          <div className="collab-card">
            <div className="collab-yjs-title">Net 30 from receipt of invoice</div>
            <div className="collab-yjs-sub">yjs · synced · offline merges</div>
            <h4 className="collab-card-h4">Multiplayer Editing</h4>
            <p className="collab-card-p">Edit together without conflicts. CRDT under the hood.</p>
            <div className="collab-chip">VeltCrdt.tiptap(&#123; documentId: id &#125;)</div>
          </div>
          <div className="collab-card">
            <div className="collab-lock-title">🔒 anna holds the pen</div>
            <div className="collab-lock-sub">2 watching live</div>
            <h4 className="collab-card-h4">Single Editor Mode</h4>
            <p className="collab-card-p">Lock editing to one person for a clean handoff.</p>
            <div className="collab-chip">&lt;VeltSingleEditorMode /&gt;</div>
          </div>
          <div className="collab-card">
            <div className="collab-rec-label">0:34 / 1:28 · pinned to row 7</div>
            <h4 className="collab-card-h4">Recording</h4>
            <p className="collab-card-p">Capture voice, video, or screen, pinned to the work.</p>
            <div className="collab-chip">&lt;VeltRecorderControl type="all" /&gt;</div>
          </div>
          <div className="collab-card">
            <div className="collab-avatar-row"><span className="collab-avatar-green">A</span><span className="collab-avatar-gold">M</span><span className="collab-huddle-live">● live · 2 in</span></div>
            <h4 className="collab-card-h4">Huddle</h4>
            <p className="collab-card-p">Live audio and video, right inside the document.</p>
            <div className="collab-chip">&lt;VeltHuddle /&gt;</div>
          </div>
        </div>
        <a href="#" className="collab-link">See the full collaboration layer <span>→</span></a>
      </section>
  );
}
