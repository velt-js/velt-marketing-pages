import "./Nav.css";

export default function Nav() {
  return (
      <header className="nav-header">
        <div className="nav-inner">
          <a href="#top" className="nav-logo">
            <span className="nav-logo-box"><span className="nav-logo-box-inner"></span></span>
            <span className="nav-logo-wordmark">velt</span>
          </a>
          <nav className="nav-links">
            <a href="#primitives" className="nav-link hl">Products</a>
            <a href="#verticals" className="nav-link hl">Solutions</a>
            <a href="#how" className="nav-link hl">Pricing</a>
            <a href="#faq" className="nav-link hl">Compare</a>
            <a href="#proof" className="nav-link hl">Customers</a>
            <a href="#how" className="nav-link hl">Docs</a>
          </nav>
          <div className="nav-right">
            <a href="#" className="nav-signin hl">Sign in</a>
            <a href="#cta" className="nav-cta hdark">Get Free API Key <span className="nav-cta-arrow">→</span></a>
          </div>
        </div>
      </header>
  );
}
