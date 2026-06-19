import "./Footer.css";

type FooterLink = {
  label: string;
  href: string;
  /** Opens in a new tab with rel="noopener" (off-site links). */
  external?: boolean;
};

type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

const DOCS_URL = "https://velt.dev/docs/";
const CONSOLE_URL = "https://console.velt.dev/";

// Link columns. Internal routes point at real app pages; off-site docs /
// status / trust links are flagged external so they open in a new tab.
const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "PRIMITIVES",
    links: [
      { label: "Comments", href: "/comments" },
      { label: "Approval flows", href: "/approval-flows" },
      { label: "Review agents", href: "/review-agents" },
      { label: "Suggestions", href: "/suggestions" },
      { label: "Audit trail", href: "/audit-trail" },
      { label: "Memory", href: "/memory" },
      { label: "Notifications", href: "/notifications" },
    ],
  },
  {
    heading: "COLLABORATION",
    links: [
      { label: "Presence", href: "/presence" },
      { label: "Multiplayer editing", href: "/multiplayer-editing" },
      { label: "Huddle", href: "/huddle" },
      { label: "Recording", href: "/recording" },
      {
        label: "Live cursors",
        href: "https://velt.dev/docs/realtime-collaboration/cursors/overview",
        external: true,
      },
      {
        label: "Single editor mode",
        href: "https://velt.dev/docs/realtime-collaboration/single-editor-mode/overview",
        external: true,
      },
    ],
  },
  {
    heading: "SOLUTIONS",
    links: [
      { label: "Sales enablement", href: "/for/sales-enablement" },
      { label: "Fintech & FP&A", href: "/for/fintech" },
      { label: "Operations", href: "/for/operations" },
      { label: "AI-native SaaS", href: "/for/ai-native-saas" },
      { label: "Compliance", href: "/for/compliance" },
      { label: "Legal", href: "/for/legal" },
    ],
  },
  {
    heading: "RESOURCES",
    links: [
      { label: "Docs", href: DOCS_URL, external: true },
      { label: "Pricing", href: "/pricing" },
      { label: "Customers", href: "/customers" },
      { label: "Blog", href: "/blog" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Comparison", href: "/comparison" },
      { label: "Status", href: "https://status.velt.dev/", external: true },
    ],
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/**
 * Renders a single footer link, opening external links in a new tab.
 * @param link The link descriptor.
 * @returns The anchor element.
 */
function FooterLinkItem({ link }: { link: FooterLink }) {
  return (
    <a
      href={link.href}
      className="hl"
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener" : undefined}
    >
      {link.label}
    </a>
  );
}

/**
 * Site footer for the editorial theme. All link destinations resolve to
 * real routes or off-site docs/status pages.
 * @returns The footer element.
 */
export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <a href="/" className="footer-brand-link" aria-label="Velt home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/velt-logo.svg" alt="Velt" className="footer-brand-logo" width={59} height={22} />
            </a>
            <p className="footer-tagline">Embeddable review and approval for AI-native apps. Agents do the work, humans decide.</p>
            <div className="footer-badges">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/security/badge-soc2-footer.png"
                alt="AICPA SOC 2"
                className="footer-badge-logo"
                width={52}
                height={52}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/security/badge-hipaa-footer.svg"
                alt="HIPAA"
                className="footer-badge-logo footer-badge-logo--hipaa"
                width={52}
                height={52}
              />
              <a
                href="https://www.ycombinator.com/companies/velt"
                target="_blank"
                rel="noopener"
                className="footer-badge"
                aria-label="Y Combinator"
              >
                YC
              </a>
            </div>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h4 className="footer-col-heading">{column.heading}</h4>
              <div className="footer-col-links">
                {column.links.map((link) => (
                  <FooterLinkItem key={link.label} link={link} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Velt, Inc.</span>
          <span className="footer-legal">
            {LEGAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="hl">
                {link.label}
              </a>
            ))}
          </span>
          <a
            href={CONSOLE_URL}
            target="_blank"
            rel="noopener"
            className="hl"
          >
            Get Free API Key
          </a>
        </div>
      </div>
    </footer>
  );
}
