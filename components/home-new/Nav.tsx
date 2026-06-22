"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import "./Nav.css";

type NavSubEntry = {
  label: string;
  href: string;
};

type NavEntry = {
  label: string;
  href: string;
  badge?: string;
  /** Opens in a new tab with rel="noopener" (used for off-site links). */
  external?: boolean;
  /** Folded features rendered as small anchored sub-links under the parent. */
  children?: NavSubEntry[];
};

/** Console / docs destinations reused across the bar and the drawer. */
const CONSOLE_URL = "https://console.velt.dev/";
const DOCS_URL = "https://velt.dev/docs/";

type NavGroup = {
  label: string;
  columns: { label: string; items: NavEntry[] }[];
  wide?: boolean;
};

/** Product links — primitives column. */
const PRODUCT_PRIMITIVES: NavEntry[] = [
  { label: "Comments", href: "/comments" },
  { label: "Approval flows", href: "/approval-flows", badge: "Beta" },
  { label: "Review agents", href: "/review-agents" },
  { label: "Suggestions", href: "/suggestions", badge: "Beta" },
  { label: "Audit trail", href: "/audit-trail" },
  { label: "Memory", href: "/memory", badge: "Beta" },
  { label: "Notifications", href: "/notifications" },
];

/** Product links — collaboration column. Folded features render as anchored sub-links. */
const PRODUCT_COLLABORATION: NavEntry[] = [
  {
    label: "Presence",
    href: "/presence",
    children: [
      { label: "Live cursors", href: "/presence#cursors" },
      { label: "Live selection", href: "/presence#selection" },
      { label: "Follow mode", href: "/presence#follow" },
    ],
  },
  {
    label: "Multiplayer editing",
    href: "/multiplayer-editing",
    children: [
      { label: "Single editor mode", href: "/multiplayer-editing#single-editor" },
      { label: "Live state sync", href: "/multiplayer-editing#state-sync" },
    ],
  },
  {
    label: "Recording",
    href: "/recording",
    children: [{ label: "Video editor", href: "/recording#video-editor" }],
  },
  { label: "Huddle", href: "/huddle" },
];

/** Product links — platform column. */
const PRODUCT_PLATFORM: NavEntry[] = [{ label: "Self-hosting", href: "/self-hosting" }];

/** Solutions links — by industry. */
const SOLUTIONS: NavEntry[] = [
  { label: "Sales enablement", href: "/for/sales-enablement" },
  { label: "Fintech & FP&A", href: "/for/fintech" },
  { label: "Operations", href: "/for/operations" },
  { label: "AI-native SaaS", href: "/for/ai-native-saas" },
  { label: "Compliance", href: "/for/compliance" },
  { label: "Legal", href: "/for/legal" },
];

/** Inline (single) nav links. */
const INLINE_LINKS: NavEntry[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Compare", href: "/comparison" },
  { label: "Customers", href: "/customers" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: DOCS_URL, external: true },
];

/** Grouped dropdowns, shared by the desktop bar and the mobile drawer. */
const NAV_GROUPS: NavGroup[] = [
  {
    label: "Products",
    wide: true,
    columns: [
      { label: "Primitives", items: PRODUCT_PRIMITIVES },
      { label: "Collaboration", items: PRODUCT_COLLABORATION },
      { label: "Platform", items: PRODUCT_PLATFORM },
    ],
  },
  {
    label: "Solutions",
    columns: [{ label: "By industry", items: SOLUTIONS }],
  },
];

const MOBILE_DRAWER_ID = "nav-mobile-drawer";

/**
 * Renders a single nav entry link, optionally with a "Beta" style badge and a
 * nested list of folded-feature sub-links rendered as small secondary anchors.
 * @param entry The link data.
 * @param className The anchor class name.
 * @param subClassName Class name for any folded-feature sub-links.
 * @param onClick Optional click handler (used to close the mobile drawer).
 * @returns The anchor element, wrapped with its sub-links when present.
 */
function NavEntryLink({
  entry,
  className,
  subClassName,
  onClick,
}: {
  entry: NavEntry;
  className: string;
  subClassName: string;
  onClick?: () => void;
}) {
  const link = (
    <a
      href={entry.href}
      className={className}
      role="menuitem"
      onClick={onClick}
      target={entry.external ? "_blank" : undefined}
      rel={entry.external ? "noopener" : undefined}
    >
      {entry.label}
      {entry.badge ? <span className="nav-badge">{entry.badge}</span> : null}
    </a>
  );

  const children = entry.children;
  if (!children?.length) {
    return link;
  }

  return (
    <div className="nav-entry-group">
      {link}
      <div className="nav-sublinks">
        {children.map((child) => (
          <a
            key={child.href + child.label}
            href={child.href}
            className={subClassName}
            role="menuitem"
            onClick={onClick}
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/**
 * Site navigation header with a desktop bar and a mobile slide-in drawer.
 * @returns The navigation header.
 */
/** Scroll distance (px) past which the nav gains its blurred state. */
const SCROLL_THRESHOLD = 8;

export default function Nav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /** Closes the mobile drawer. */
  const closeDrawer = useCallback(() => {
    try {
      setIsDrawerOpen(false);
    } catch {
      // no-op: state setter is always safe, guard satisfies strict error policy
    }
  }, []);

  /** Toggles the mobile drawer open/closed. */
  const toggleDrawer = useCallback(() => {
    try {
      setIsDrawerOpen((open) => !open);
    } catch {
      // no-op
    }
  }, []);

  useEffect(() => {
    try {
      if (!isDrawerOpen) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event?.key === "Escape") {
          closeDrawer();
        }
      };

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        try {
          document.body.style.overflow = previousOverflow;
          window.removeEventListener("keydown", handleKeyDown);
        } catch {
          // no-op
        }
      };
    } catch {
      return undefined;
    }
  }, [isDrawerOpen, closeDrawer]);

  useEffect(() => {
    try {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
      };

      // Sync immediately in case the page loads already scrolled.
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        try {
          window.removeEventListener("scroll", handleScroll);
        } catch {
          // no-op
        }
      };
    } catch {
      return undefined;
    }
  }, []);

  return (
    <header className={isScrolled ? "nav-header is-scrolled" : "nav-header"}>
      <div className="nav-inner">
        <a href="/" className="nav-logo" aria-label="Velt home">
          <Image
            src="/velt-logo.svg"
            alt=""
            className="nav-logo-img"
            width={59}
            height={22}
            unoptimized
          />
        </a>

        <nav className="nav-links">
          {NAV_GROUPS.map((group) => (
            <div className="nav-item" key={group.label}>
              <button type="button" className="nav-link hl nav-trigger" aria-haspopup="true">
                {group.label}
                <span className="nav-caret" aria-hidden="true">▾</span>
              </button>
              <div className={group.wide ? "nav-menu nav-menu-wide" : "nav-menu"} role="menu">
                {group.columns.map((column) => (
                  <div className="nav-menu-col" key={column.label}>
                    <p className="nav-menu-label">{column.label}</p>
                    {column.items.map((entry) => (
                      <NavEntryLink
                        key={entry.href + entry.label}
                        entry={entry}
                        className="nav-menu-link"
                        subClassName="nav-menu-sublink"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {INLINE_LINKS.map((entry) => (
            <a
              href={entry.href}
              className="nav-link hl"
              key={entry.label + entry.href}
              target={entry.external ? "_blank" : undefined}
              rel={entry.external ? "noopener" : undefined}
            >
              {entry.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <a href={CONSOLE_URL} target="_blank" rel="noopener" className="nav-signin houtline">Sign in</a>
          <a href={CONSOLE_URL} target="_blank" rel="noopener" className="nav-cta hdark">Get Free API Key</a>
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={isDrawerOpen}
          aria-controls={MOBILE_DRAWER_ID}
          onClick={toggleDrawer}
        >
          <span className={isDrawerOpen ? "nav-burger-bars is-open" : "nav-burger-bars"} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        className={isDrawerOpen ? "nav-backdrop is-open" : "nav-backdrop"}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div
        id={MOBILE_DRAWER_ID}
        className={isDrawerOpen ? "nav-drawer is-open" : "nav-drawer"}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="nav-drawer-scroll">
          {NAV_GROUPS.map((group) => (
            <div className="nav-drawer-group" key={group.label}>
              <p className="nav-drawer-group-title">{group.label}</p>
              {group.columns.map((column) => (
                <div className="nav-drawer-col" key={column.label}>
                  <p className="nav-drawer-col-label">{column.label}</p>
                  {column.items.map((entry) => (
                    <NavEntryLink
                      key={entry.href + entry.label}
                      entry={entry}
                      className="nav-drawer-link"
                      subClassName="nav-drawer-sublink"
                      onClick={closeDrawer}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}

          <div className="nav-drawer-group">
            <p className="nav-drawer-group-title">More</p>
            {INLINE_LINKS.map((entry) => (
              <a
                href={entry.href}
                className="nav-drawer-link"
                key={entry.label + entry.href}
                onClick={closeDrawer}
                target={entry.external ? "_blank" : undefined}
                rel={entry.external ? "noopener" : undefined}
              >
                {entry.label}
              </a>
            ))}
          </div>

          <div className="nav-drawer-actions">
            <a href={CONSOLE_URL} target="_blank" rel="noopener" className="nav-signin houtline" onClick={closeDrawer}>Sign in</a>
            <a href={CONSOLE_URL} target="_blank" rel="noopener" className="nav-cta hdark" onClick={closeDrawer}>Get Free API Key</a>
          </div>
        </div>
      </div>
    </header>
  );
}
