import "./Hero.css";

export default function Hero() {
  return (
      <section className="hero">
        <div>
          <div className="hero-badges">
            <span className="hero-badge">
              <svg className="hero-badge-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M12.3687 4C10.5228 4.09504 8.71652 3.37772 7.33257 2C5.94862 3.37772 4.14234 4.09504 2.29644 4C2.02769 5.02868 1.94546 6.10764 2.05463 7.17279C2.1638 8.23793 2.46214 9.26751 2.93193 10.2004C3.40173 11.1332 4.03338 11.9503 4.78935 12.603C5.54532 13.2557 6.4102 13.7308 7.33257 14C8.25495 13.7308 9.11982 13.2557 9.87579 12.603C10.6318 11.9503 11.2634 11.1332 11.7332 10.2004C12.203 9.26751 12.5013 8.23793 12.6105 7.17279C12.7197 6.10764 12.6375 5.02868 12.3687 4Z" fill="currentColor" />
              </svg>
              <span className="hero-badge-label">SOC II &ndash; Type 2</span>
            </span>
            <span className="hero-badge">
              <svg className="hero-badge-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2C9.5913 2 11.117 2.63259 12.2422 3.75781C13.3674 4.88303 14 6.4087 14 8C14 8.78791 13.8445 9.56796 13.543 10.2959C13.2414 11.0239 12.7993 11.685 12.2422 12.2422C11.685 12.7993 11.0239 13.2414 10.2959 13.543C9.56796 13.8445 8.78791 14 8 14C7.21209 14 6.43204 13.8445 5.7041 13.543C4.97615 13.2414 4.31496 12.7993 3.75781 12.2422C3.20066 11.685 2.75856 11.0239 2.45703 10.2959C2.15552 9.56796 2 8.78791 2 8C2 6.4087 2.63259 4.88303 3.75781 3.75781C4.88303 2.63259 6.4087 2 8 2ZM7.99707 4.66699C7.62903 4.66717 7.33105 4.9659 7.33105 5.33398V6.85156L5.99512 6.08887C5.67544 5.90619 5.26763 6.01724 5.08496 6.33691C4.90264 6.65645 5.01365 7.06343 5.33301 7.24609L6.65332 8L5.33301 8.75488C5.01341 8.93759 4.90231 9.3454 5.08496 9.66504C5.26766 9.98464 5.67547 10.0957 5.99512 9.91309L7.33105 9.14941V10.667C7.33105 11.0351 7.62903 11.3338 7.99707 11.334C8.36526 11.334 8.66406 11.0352 8.66406 10.667V9.14941L10 9.91309C10.3195 10.0956 10.7264 9.98437 10.9092 9.66504C11.0919 9.34536 10.9808 8.93756 10.6611 8.75488L9.34082 8L10.6611 7.24609C10.9808 7.06344 11.0918 6.65658 10.9092 6.33691C10.7265 6.01724 10.3197 5.90619 10 6.08887L8.66406 6.85156V5.33398C8.66406 4.96579 8.36526 4.66699 7.99707 4.66699Z" fill="currentColor" />
              </svg>
              <span className="hero-badge-label">HIPAA</span>
            </span>
            <span className="hero-badge">
              <svg className="hero-badge-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13.3311 11.5039C13.2942 11.5736 13.2715 11.652 13.2715 11.7363C13.2715 11.7192 13.275 11.7639 13.1934 11.8779C13.1174 11.9839 12.9957 12.111 12.8301 12.2461C12.4992 12.516 12.0466 12.7759 11.5947 12.9453C10.6656 13.2937 9.37172 13.5 7.99902 13.5C6.62649 13.5 5.3333 13.2936 4.4043 12.9453C3.9514 12.7755 3.4936 12.5148 3.1582 12.2441C2.99053 12.1088 2.86718 11.9821 2.79004 11.876C2.70697 11.7616 2.71091 11.7175 2.71094 11.7363C2.7109 11.6616 2.69352 11.5911 2.66406 11.5273V9.12598C3.06644 9.4266 3.56137 9.69757 4.05273 9.88184C5.12387 10.2835 6.54307 10.5 7.99902 10.5C9.45514 10.5 10.875 10.2836 11.9463 9.88184C12.439 9.69708 12.9316 9.42472 13.3311 9.12305V11.5039ZM13.3311 7.50391C13.2942 7.57357 13.2715 7.65204 13.2715 7.73633C13.2715 7.71922 13.275 7.7639 13.1934 7.87793C13.1174 7.98392 12.9957 8.11098 12.8301 8.24609C12.4992 8.516 12.0466 8.77587 11.5947 8.94531C10.6656 9.29366 9.37173 9.5 7.99902 9.5C6.62649 9.49995 5.3333 9.29363 4.4043 8.94531C3.9514 8.77548 3.4936 8.5148 3.1582 8.24414C2.99053 8.1088 2.86718 7.98213 2.79004 7.87598C2.70698 7.76164 2.7109 7.71748 2.71094 7.73633C2.7109 7.66157 2.69352 7.59105 2.66406 7.52734V5.12598C3.06644 5.4266 3.56137 5.69757 4.05273 5.88184C5.12387 6.28351 6.54307 6.49995 7.99902 6.5C9.45514 6.5 10.875 6.28356 11.9463 5.88184C12.439 5.69708 12.9316 5.42472 13.3311 5.12305V7.50391ZM7.99707 2C9.41155 2 10.7684 2.21087 11.7686 2.58594C12.5839 2.89168 13.1076 3.28626 13.2734 3.70898C13.2729 3.71806 13.2715 3.72713 13.2715 3.73633C13.2715 3.71922 13.275 3.76389 13.1934 3.87793C13.1174 3.98392 12.9957 4.11098 12.8301 4.24609C12.4992 4.516 12.0466 4.77587 11.5947 4.94531C10.6656 5.29366 9.37173 5.5 7.99902 5.5C6.62649 5.49995 5.3333 5.29363 4.4043 4.94531C3.9514 4.77548 3.4936 4.5148 3.1582 4.24414C2.99053 4.1088 2.86718 3.98213 2.79004 3.87598C2.70698 3.76163 2.7109 3.71845 2.71094 3.7373C2.86417 3.30391 3.39308 2.89849 4.22656 2.58594C5.22665 2.21096 6.58284 2.00003 7.99707 2Z" fill="currentColor" />
              </svg>
              <span className="hero-badge-label">EU data residency</span>
            </span>
          </div>
          <h1 className="hero-title">Add Review and Approvals to Your App</h1>
          <p className="hero-sub">Velt brings governance to your product. AI and humans review together and work only ships once a human approves.</p>
          <div className="hero-actions">
            <a href="https://console.velt.dev/" className="hero-btn-primary hdark">Get Free API Key</a>
            <a href="/book-demo" className="hero-btn-secondary hsoft">Book Demo</a>
          </div>
          <p className="hero-feature-strip">Comments · Approvals · Review agents · Memory · Audit trails</p>
        </div>


        <div className="hero-artifact">
          <div className="hero-art-stage">
            <div className="hero-art-table">
              <div className="hero-art-title">Q3 Pricing</div>
              <div className="hero-art-grid">
                <div className="hero-art-row">
                  <div className="hero-art-cell hero-art-cell--head">Plan</div>
                  <div className="hero-art-cell hero-art-cell--head">Current</div>
                  <div className="hero-art-cell hero-art-cell--head">Proposed</div>
                </div>
                <div className="hero-art-row">
                  <div className="hero-art-cell">Starter</div>
                  <div className="hero-art-cell">$29</div>
                  <div className="hero-art-cell">$35</div>
                </div>
                <div className="hero-art-row">
                  <div className="hero-art-cell">Pro</div>
                  <div className="hero-art-cell">$79</div>
                  <div className="hero-art-cell hero-art-cell--hl">$85</div>
                </div>
              </div>
            </div>

            <div className="hero-art-comment">
              <div className="hero-art-comment-head">
                <span className="hero-art-avatar-k">K</span>
                Approved by Kim
                <button type="button" className="hero-art-resolve" aria-label="Resolve">
                  <svg className="hero-art-resolve-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </button>
              </div>
              <div className="hero-art-comment-body">
                <div className="hero-art-agent">
                  <span className="hero-art-avatar-a">A</span>
                  <span className="hero-art-agent-name">Pricing Agent</span>
                  <span className="hero-art-agent-time">58m</span>
                </div>
                <p className="hero-art-agent-msg">Proposed Pro price was $92, above the approved Q3 band. I suggest $85, the band maximum.</p>
                <button type="button" className="hero-art-reply">
                  <svg className="hero-art-reply-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 14L4 9l5-5" />
                    <path d="M4 9h11a5 5 0 0 1 5 5v6" />
                  </svg>
                  Reply
                </button>
              </div>
            </div>

            <svg className="hero-art-connector" viewBox="0 0 220 96" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0 42 H168 a8 8 0 0 1 8 8 V96"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <div className="hero-art-webhook">
              <div className="hero-art-webhook-row">
                <span className="hero-art-post">POST</span>
                <span className="hero-art-webhook-url">/webhooks/velt</span>
              </div>
              <div className="hero-art-webhook-row">
                <svg className="hero-art-bolt" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 3v7h6l-8 11v-7H5l8-11z"></path></svg>
                <span className="hero-art-webhook-event">change.applied</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
