import "./Nav.css";

export default function Nav() {
  return (
      <header className="nav-header">
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label="Velt home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/velt-logo.svg"
              alt=""
              className="nav-logo-img"
              width={59}
              height={22}
            />
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
            <a href="#" className="nav-signin houtline">Sign in</a>
            <a href="#cta" className="nav-cta hdark">Get Free API Key</a>
          </div>
        </div>
      </header>
  );
}
