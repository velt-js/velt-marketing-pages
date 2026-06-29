import Image from "next/image";
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

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/velt-js",
    /** @type {JSX.Element} */
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .269.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/veltjs",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/veltjs",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

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
      { label: "Self-hosting", href: "/self-hosting" },
      { label: "Live cursors", href: "/presence#cursors" },
      { label: "Single editor mode", href: "/multiplayer-editing#single-editor" },
      { label: "Video editor", href: "/recording#showcase" },
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
              <Image src="/velt-logo.svg" alt="Velt" className="footer-brand-logo" width={59} height={22} unoptimized />
            </a>
            <p className="footer-tagline">Embeddable review and approval for AI-native apps. Agents do the work, humans decide.</p>
            <div className="footer-badges">
              <Image
                src="/images/security/badge-soc2-footer.png"
                alt="AICPA SOC 2"
                className="footer-badge-logo"
                width={52}
                height={52}
              />
              <Image
                src="/images/security/badge-hipaa-footer.svg"
                alt="HIPAA"
                className="footer-badge-logo footer-badge-logo--hipaa"
                width={52}
                height={52}
                unoptimized
              />
              <a
                href="https://www.ycombinator.com/companies/velt"
                target="_blank"
                rel="noopener"
                className="footer-badge"
                aria-label="Y Combinator"
              >
                <Image
                  src="/images/home/yc-logo-square.svg"
                  alt="Y Combinator"
                  className="footer-badge-yc-logo"
                  width={48}
                  height={48}
                  unoptimized
                />
              </a>
            </div>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="footer-col-heading">{column.heading}</h3>
              <div className="footer-col-links">
                {column.links.map((link) => (
                  <FooterLinkItem key={link.label} link={link} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Velt, Inc.</span>
          <span className="footer-legal">
            {LEGAL_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="hl">
                {link.label}
              </a>
            ))}
          </span>
          <span className="footer-socials">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener"
                className="footer-social-link hl"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
