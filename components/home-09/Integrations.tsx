import "./Integrations.css";

export default function Integrations() {
  return (
      <section className="integ-section">
        <div className="integ-header">
          <div className="integ-eyebrow"><span className="integ-eyebrow-dot"></span>Integrations</div>
          <h2 className="integ-title">Drops into the stack you already have.</h2>
          <p className="integ-desc">15+ first-party integrations. SDK works in any framework via web components.</p>
        </div>
        <div className="integ-grid">
          <div className="integ-card">
            <div className="integ-cat-label">EDITORS</div>
            <div className="integ-tag-row">
              <span className="integ-tag">Lexical</span><span className="integ-tag">Tiptap</span><span className="integ-tag">BlockNote</span><span className="integ-tag">Slate</span><span className="integ-tag">CodeMirror</span><span className="integ-tag">ProseMirror</span><span className="integ-tag">Quill</span>
            </div>
          </div>
          <div className="integ-card">
            <div className="integ-cat-label">FRAMEWORKS</div>
            <div className="integ-tag-row">
              <span className="integ-tag">React</span><span className="integ-tag">Next.js</span><span className="integ-tag">Angular</span><span className="integ-tag">Vue</span>
            </div>
            <div className="integ-cat-label-margin">CANVAS &amp; DATA</div>
            <div className="integ-tag-row">
              <span className="integ-tag">React Flow</span><span className="integ-tag">Chart.js</span><span className="integ-tag">Highcharts</span><span className="integ-tag">Nivo</span>
            </div>
          </div>
          <div className="integ-card">
            <div className="integ-cat-label">NOTIFICATIONS OUT</div>
            <div className="integ-tag-row">
              <span className="integ-tag">Slack</span><span className="integ-tag">Teams</span><span className="integ-tag">Discord</span><span className="integ-tag">Resend</span><span className="integ-tag">Customer.io</span><span className="integ-tag">SendGrid</span>
            </div>
            <div className="integ-cat-label-margin">STORAGE &amp; AUTH · SYNC</div>
            <div className="integ-tag-row">
              <span className="integ-tag">Firebase</span><span className="integ-tag">Supabase</span><span className="integ-tag">Clerk</span><span className="integ-tag">Auth0</span><span className="integ-tag">YJS</span>
            </div>
          </div>
        </div>
      </section>
  );
}
