import "./Problem.css";

export default function Problem() {
  return (
      <section className="problem-section">
        <div className="problem-inner">
          <div className="problem-grid">
            <div className="problem-col-left">
              <div className="problem-eyebrow"><span className="problem-eyebrow-dot"></span>The problem</div>
              <h2 className="problem-heading">Your users need to review and approve what your product generates. Building that takes two quarters.</h2>
              <div className="problem-qualifier-wrapper">
                <div className="problem-qualifier-comment">// the qualifier</div>
                <p className="problem-qualifier-text">If your product has work that more than one of your users reviews or approves, this is for you. If it doesn't, it isn't.</p>
              </div>
            </div>
            <div className="problem-col-right">
              <p className="problem-subtext">Check all that apply.</p>
              <div className="problem-checklist">
                <label className="problem-label"><input type="checkbox" className="problem-checkbox" /><span>Buyers ask "do you support approval workflows?" and the honest answer costs a quarter.</span></label>
                <label className="problem-label"><input type="checkbox" className="problem-checkbox" /><span>Your agents need write access to be useful, and security says no.</span></label>
                <label className="problem-label"><input type="checkbox" className="problem-checkbox" /><span>Feedback about work in your product happens in Slack screenshots.</span></label>
                <label className="problem-label"><input type="checkbox" className="problem-checkbox" /><span>A regulated deal stalled on "who approved this?"</span></label>
                <label className="problem-label"><input type="checkbox" className="problem-checkbox" /><span>Users turned off your AI the first time it changed something it shouldn't.</span></label>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
