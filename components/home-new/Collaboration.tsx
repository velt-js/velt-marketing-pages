import "./Collaboration.css";

const CURSOR_POINTER_PURPLE = "/images/home/features/cursor-pointer-purple.svg";
const CURSOR_POINTER_ORANGE = "/images/home/features/cursor-pointer-orange.svg";

export default function Collaboration() {
  return (
    <section className="collab-section">
      <div className="collab-header">
        <div className="collab-eyebrow"><span className="collab-eyebrow-dot"></span>The collaboration layer</div>
        <h2 className="collab-title">Everything else your users expect.</h2>
        <p className="collab-desc">The multiplayer layer, included. Same SDK, no second vendor, no second contract.</p>
      </div>

      <div className="collab-grid">
        {/* Presence */}
        <div className="collab-card">
          <div className="collab-stage presence-stage">
            <div className="pr-facepile">
              <span className="pr-ava pr-ava-green">A<i className="pr-dot"></i></span>
              <span className="pr-ava pr-ava-gold">M<i className="pr-dot"></i></span>
              <span className="pr-ava pr-ava-pink">S</span>
              <span className="pr-ava pr-ava-ai">AI</span>
            </div>
          </div>
          <h4 className="collab-card-h4">Presence</h4>
          <p className="collab-card-p">See who is viewing and editing, live. Humans and agents.</p>
          <div className="collab-chip">&lt;VeltPresence agents /&gt;</div>
        </div>

        {/* Live Cursors */}
        <div className="collab-card">
          <div className="collab-stage cursor-stage">
            <div className="cs-selection">
              <span className="cs-handle cs-h-tl"></span>
              <span className="cs-handle cs-h-tr"></span>
              <span className="cs-handle cs-h-bl"></span>
              <span className="cs-handle cs-h-br"></span>
            </div>
            <div className="cs-anna">
              <span className="cs-ava" aria-hidden="true">A</span>
              <img
                src={CURSOR_POINTER_PURPLE}
                alt=""
                className="cs-pointer cs-pointer-flip"
                aria-hidden="true"
              />
            </div>
            <div className="cs-emma">
              <img
                src={CURSOR_POINTER_ORANGE}
                alt=""
                className="cs-pointer"
                aria-hidden="true"
              />
              <span className="cs-name">Emma</span>
            </div>
          </div>
          <h4 className="collab-card-h4">Live Cursors</h4>
          <p className="collab-card-p">Each other's cursors and selections, with names.</p>
          <div className="collab-chip">&lt;VeltCursor /&gt;</div>
        </div>

        {/* Multiplayer Editing */}
        <div className="collab-card">
          <div className="collab-stage multi-stage">
            <div className="ml-line"><span className="ml-fill ml-fill-pink" style={{ width: "46%" }}></span><span className="ml-flag ml-flag-pink">Bob</span></div>
            <div className="ml-line"><span className="ml-fill" style={{ width: "82%" }}></span></div>
            <div className="ml-line"><span className="ml-fill" style={{ width: "64%" }}></span></div>
            <div className="ml-line"><span className="ml-fill ml-fill-green" style={{ width: "70%" }}></span><span className="ml-flag ml-flag-green">Linda</span></div>
            <div className="ml-line"><span className="ml-fill" style={{ width: "88%" }}></span></div>
          </div>
          <h4 className="collab-card-h4">Multiplayer Editing</h4>
          <p className="collab-card-p">Edit together without conflicts. CRDT under the hood.</p>
          <div className="collab-chip">VeltCrdt.tiptap(&#123; documentId: id &#125;)</div>
        </div>

        {/* Single Editor Mode */}
        <div className="collab-card">
          <div className="collab-stage single-stage">
            <div className="se-window">
              <div className="se-bar">
                <span className="se-bar-ava">
                  <svg className="collab-svg-on-dark" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="9" cy="11" r="1.1" fill="currentColor" />
                    <circle cx="15" cy="11" r="1.1" fill="currentColor" />
                    <path d="M9 15c1 1 5 1 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="se-bar-txt">Yoen is editing</span>
              </div>
              <div className="se-body">
                <div className="se-label">
                  <svg className="collab-svg-ink" width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  Email template
                </div>
                <div className="se-doc">
                  <span className="se-doc-line" style={{ width: "40%" }}></span>
                  <span className="se-doc-line" style={{ width: "72%" }}></span>
                  <span className="se-doc-line" style={{ width: "58%" }}></span>
                </div>
              </div>
            </div>
          </div>
          <h4 className="collab-card-h4">Single Editor Mode</h4>
          <p className="collab-card-p">Lock editing to one person for a clean handoff.</p>
          <div className="collab-chip">&lt;VeltSingleEditorMode /&gt;</div>
        </div>

        {/* Recording */}
        <div className="collab-card">
          <div className="collab-stage rec-stage">
            <div className="rc-control">
              <span className="rc-screen">
                <svg className="collab-svg-on-dark" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span className="rc-time">00:42</span>
              <span className="rc-pause"><i></i><i></i></span>
              <span className="rc-stop"></span>
              <span className="rc-close">
                <svg className="collab-svg-muted" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>
            <div className="rc-cam">
              <span className="rc-ava">D</span>
              <span className="rc-cam-ctrl">
                <svg className="collab-svg-ink" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M6 11a6 6 0 0 0 12 0M12 17v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <svg className="collab-svg-ink" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="7" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M15 11l5-3v8l-5-3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
          <h4 className="collab-card-h4">Recording</h4>
          <p className="collab-card-p">Capture voice, video, or screen, pinned to the work.</p>
          <div className="collab-chip">&lt;VeltRecorderControl type="all" /&gt;</div>
        </div>

        {/* Huddle */}
        <div className="collab-card">
          <div className="collab-stage huddle-stage">
            <div className="hd-panel">
              <div className="hd-head">
                <span className="hd-head-ico">
                  <svg className="collab-svg-green" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                    <rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
                <span className="hd-head-txt">2 people in Huddle</span>
                <span className="hd-kebab"><i></i><i></i><i></i></span>
              </div>
              <div className="hd-row">
                <span className="hd-ava hd-ava-you">Y</span>
                <span className="hd-name">You</span>
                <span className="hd-muted">
                  <svg className="collab-svg-kebab" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M5 5l14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="hd-row">
                <span className="hd-ava hd-ava-linda">L</span>
                <span className="hd-name">Linda</span>
                <span className="hd-bars hd-bars-gold"><i></i><i></i><i></i></span>
              </div>
              <button className="hd-leave">Leave</button>
            </div>
          </div>
          <h4 className="collab-card-h4">Huddle</h4>
          <p className="collab-card-p">Live audio and video, right inside the document.</p>
          <div className="collab-chip">&lt;VeltHuddle /&gt;</div>
        </div>
      </div>

      <a href="https://velt.dev/docs/realtime-collaboration" target="_blank" rel="noopener" className="collab-link">See the full collaboration layer</a>
    </section>
  );
}
