import "./CustomersHero.css";

/**
 * Light editorial hero for /customers. Mirrors the pricing/comparison hero
 * rhythm (eyebrow + light-weight display title + muted subcopy + dual CTAs)
 * with a closing stat row that quantifies the customer proof.
 * @returns The customers hero section.
 */
export default function CustomersHero() {
  try {
    return (
      <section className="cuh-section">
        <div className="cuh-inner">
          <div className="cuh-eyebrow">
            <span className="cuh-eyebrow-dot" />
            Customers
          </div>
          <h1 className="cuh-title">
            Products using Velt to boost engagement and growth.
          </h1>
          <p className="cuh-sub">
            From Google and Pendo to fast-moving startups, teams ship Velt
            collaboration to millions of users. Explore the products that run on
            Velt.
          </p>
          <div className="cuh-actions">
            <a
              href="https://console.velt.dev/"
              target="_blank"
              rel="noopener"
              className="cuh-btn-primary hdark"
            >
              Get Free API Key
            </a>
            <a href="/book-demo" className="cuh-btn-secondary hsoft">
              Book Demo
            </a>
          </div>
          <div className="cuh-stats">
            <div className="cuh-stat">
              <div className="cuh-stat-num">50+</div>
              <div className="cuh-stat-label">Companies shipping Velt</div>
            </div>
            <div className="cuh-stat">
              <div className="cuh-stat-num">26%</div>
              <div className="cuh-stat-label">Weekly active users lift</div>
            </div>
            <div className="cuh-stat">
              <div className="cuh-stat-num">5x</div>
              <div className="cuh-stat-label">Faster than building in-house</div>
            </div>
            <div className="cuh-stat">
              <div className="cuh-stat-num">3 FTEs</div>
              <div className="cuh-stat-label">Engineering effort saved</div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
