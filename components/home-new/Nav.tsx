"use client";

import { useCallback, useEffect, useState } from "react";
import "./Nav.css";

type NavEntry = {
  label: string;
  href: string;
  badge?: string;
};

type NavGroup = {
  label: string;
  columns: { label: string; items: NavEntry[] }[];
  wide?: boolean;
};

/** Product links — collaboration column. */
const PRODUCT_COLLABORATION: NavEntry[] = [
  { label: "Comments", href: "/new-features/comments" },
  { label: "Presence", href: "/new-features/presence" },
  { label: "Multiplayer editing", href: "/new-features/multiplayer-editing" },
  { label: "Huddle", href: "/new-features/huddle" },
  { label: "Recording", href: "/new-features/recording" },
  { label: "Suggestions", href: "/new-features/suggestions", badge: "Beta" },
];

/** Product links — review & governance column. */
const PRODUCT_GOVERNANCE: NavEntry[] = [
  { label: "Approval flows", href: "/new-features/approval-flows", badge: "Beta" },
  { label: "Review agents", href: "/new-features/review-agents" },
  { label: "Audit trail", href: "/new-features/audit-trail" },
  { label: "Notifications", href: "/new-features/notifications" },
  { label: "Memory", href: "/new-features/memory", badge: "Beta" },
  { label: "Self-hosting", href: "/new-features/self-hosting" },
];

/** Solutions links — by industry. */
const SOLUTIONS: NavEntry[] = [
  { label: "Sales enablement", href: "/solutions/sales-enablement" },
  { label: "Fintech & FP&A", href: "/solutions/fintech" },
  { label: "Operations", href: "/solutions/operations" },
  { label: "AI-native SaaS", href: "/solutions/ai-native-saas" },
  { label: "Compliance", href: "/solutions/compliance" },
  { label: "Legal", href: "/solutions/legal" },
];

/** Inline (single) nav links. */
const INLINE_LINKS: NavEntry[] = [
  { label: "Pricing", href: "#how" },
  { label: "Compare", href: "#faq" },
  { label: "Customers", href: "#proof" },
  { label: "Docs", href: "#how" },
];

/** Grouped dropdowns, shared by the desktop bar and the mobile drawer. */
const NAV_GROUPS: NavGroup[] = [
  {
    label: "Products",
    wide: true,
    columns: [
      { label: "Collaboration", items: PRODUCT_COLLABORATION },
      { label: "Review & governance", items: PRODUCT_GOVERNANCE },
    ],
  },
  {
    label: "Solutions",
    columns: [{ label: "By industry", items: SOLUTIONS }],
  },
];

const MOBILE_DRAWER_ID = "nav-mobile-drawer";

/**
 * Renders a single nav entry link, optionally with a "Beta" style badge.
 * @param entry The link data.
 * @param className The anchor class name.
 * @param onClick Optional click handler (used to close the mobile drawer).
 * @returns The anchor element.
 */
function NavEntryLink({
  entry,
  className,
  onClick,
}: {
  entry: NavEntry;
  className: string;
  onClick?: () => void;
}) {
  return (
    <a href={entry.href} className={className} role="menuitem" onClick={onClick}>
      {entry.label}
      {entry.badge ? <span className="nav-badge">{entry.badge}</span> : null}
    </a>
  );
}

/**
 * Site navigation header with a desktop bar and a mobile slide-in drawer.
 * @returns The navigation header.
 */
export default function Nav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                      <NavEntryLink key={entry.href + entry.label} entry={entry} className="nav-menu-link" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {INLINE_LINKS.map((entry) => (
            <a href={entry.href} className="nav-link hl" key={entry.label + entry.href}>
              {entry.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <a href="#" className="nav-signin houtline">Sign in</a>
          <a href="#cta" className="nav-cta hdark">Get Free API Key</a>
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
              >
                {entry.label}
              </a>
            ))}
          </div>

          <div className="nav-drawer-actions">
            <a href="#" className="nav-signin houtline" onClick={closeDrawer}>Sign in</a>
            <a href="#cta" className="nav-cta hdark" onClick={closeDrawer}>Get Free API Key</a>
          </div>
        </div>
      </div>
    </header>
  );
}
