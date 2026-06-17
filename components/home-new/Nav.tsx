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
            <div className="nav-item">
              <button type="button" className="nav-link hl nav-trigger" aria-haspopup="true">
                Products
                <span className="nav-caret" aria-hidden="true">▾</span>
              </button>
              <div className="nav-menu nav-menu-wide" role="menu">
                <div className="nav-menu-col">
                  <p className="nav-menu-label">Collaboration</p>
                  <a href="/new-features/comments" className="nav-menu-link" role="menuitem">Comments</a>
                  <a href="/new-features/presence" className="nav-menu-link" role="menuitem">Presence</a>
                  <a href="/new-features/multiplayer-editing" className="nav-menu-link" role="menuitem">Multiplayer editing</a>
                  <a href="/new-features/huddle" className="nav-menu-link" role="menuitem">Huddle</a>
                  <a href="/new-features/recording" className="nav-menu-link" role="menuitem">Recording</a>
                  <a href="/new-features/suggestions" className="nav-menu-link" role="menuitem">
                    Suggestions
                    <span className="nav-badge">Beta</span>
                  </a>
                </div>
                <div className="nav-menu-col">
                  <p className="nav-menu-label">Review &amp; governance</p>
                  <a href="/new-features/approval-flows" className="nav-menu-link" role="menuitem">
                    Approval flows
                    <span className="nav-badge">Beta</span>
                  </a>
                  <a href="/new-features/review-agents" className="nav-menu-link" role="menuitem">Review agents</a>
                  <a href="/new-features/audit-trail" className="nav-menu-link" role="menuitem">Audit trail</a>
                  <a href="/new-features/notifications" className="nav-menu-link" role="menuitem">Notifications</a>
                  <a href="/new-features/memory" className="nav-menu-link" role="menuitem">
                    Memory
                    <span className="nav-badge">Beta</span>
                  </a>
                  <a href="/new-features/self-hosting" className="nav-menu-link" role="menuitem">Self-hosting</a>
                </div>
              </div>
            </div>
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
