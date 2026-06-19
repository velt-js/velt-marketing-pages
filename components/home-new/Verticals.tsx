import "./Verticals.css";

export default function Verticals() {
  return (
      <section id="verticals" className="vert-section">
        <div className="vert-eyebrow"><span className="vert-eyebrow-dot"></span>Is this for me</div>
        <h2 className="vert-heading">Built for work that can't ship unapproved.</h2>
        <div className="vert-grid">
          <a href="/for/sales-enablement" className="vert-card hcard">
            <div className="vert-card-label">VERTICAL 01</div>
            <div className="vert-card-title">Sales enablement and content production</div>
            <p className="vert-card-desc">Brand, legal, and client approval on every asset, inside your product.</p>
            <div className="vert-card-explore">Explore</div>
          </a>
          <a href="/for/fintech" className="vert-card hcard">
            <div className="vert-card-label">VERTICAL 02</div>
            <div className="vert-card-title">Fintech, FP&amp;A, and compliance</div>
            <p className="vert-card-desc">Numbers ship with names attached: staged sign-off and immutable records.</p>
            <div className="vert-card-explore">Explore</div>
          </a>
          <a href="/for/operations" className="vert-card hcard">
            <div className="vert-card-label">VERTICAL 03</div>
            <div className="vert-card-title">Physical-world operations</div>
            <p className="vert-card-desc">Human sign-off on operational decisions, often across organizations.</p>
            <div className="vert-card-explore">Explore</div>
          </a>
          <a href="/for/ai-native-saas" className="vert-card hcard">
            <div className="vert-card-label">VERTICAL 04</div>
            <div className="vert-card-title">AI-native SaaS</div>
            <p className="vert-card-desc">Agents propose, humans approve. The loop that makes generated work shippable.</p>
            <div className="vert-card-explore">Explore</div>
          </a>
        </div>
      </section>
  );
}
