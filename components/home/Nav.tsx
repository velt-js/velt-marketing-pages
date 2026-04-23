"use client";

// Nav — labels and hrefs extracted from the Framer HTML export
// (/Users/yoenzhang/Downloads/79f9d44e-aee0-4640-93c0-37f7eddaf158/page.html,
// nav element at lines 1696 + 1702). Product dropdown mirrors Figma node
// 1:21692 "Nav". Hover animation approximates Framer Motion's
// `{ type: "spring", duration: 0.4, bounce: 0.2 }` with a cubic-bezier that
// overshoots slightly on enter and settles on exit.
//
// Scroll behavior: over dark sections (Hero, TrustedLogos) the bar is
// transparent with white text; over the white content block it flips to
// white-on-dark. Driven by an IntersectionObserver on the Outcomes and
// GetStartedSteps markers.

import { useEffect, useRef, useState, type ReactNode } from "react";

type DropdownId = "product" | "useCases" | "enterprise" | "resources";

type TopLink =
  | { label: string; href: string }
  | { label: string; dropdown: DropdownId };

const topLinks: TopLink[] = [
  { label: "Product", dropdown: "product" },
  { label: "Use Cases", dropdown: "useCases" },
  { label: "Enterprise", dropdown: "enterprise" },
  { label: "Resources", dropdown: "resources" },
  { label: "Pricing", href: "/pricing" },
];

// ---------- Product dropdown data — matches Figma 1:21692 ----------

type DropdownItem = {
  label: string;
  href: string;
  icon: ReactNode;
  /** optional tint applied to the icon container for monochrome Tabler glyphs */
  tint?: string;
};

type DropdownColumn = { heading: string; width: number; items: DropdownItem[] };

// Tabler icon strokes (MIT). viewBox 0 0 24 24, stroke-width 1.6, stroke-linecap round.
function I({ d, children }: { d?: string; children?: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {d ? <path d={d} /> : children}
    </svg>
  );
}

const icons = {
  // Comments — custom speech-bubble shape per Figma 1:21698:
  // 10.667×10.667 box, 1.333 stroke, corners TL/TR/BR=8, BL=1.333 (tail stub).
  comments: (
    <span
      aria-hidden
      style={{
        display: "block",
        width: 10.67,
        height: 10.67,
        border: "1.333px solid currentColor",
        borderRadius: "8px 8px 8px 1.333px",
        boxSizing: "border-box",
      }}
    />
  ),
  bell: (
    <I>
      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </I>
  ),
  video: (
    <I>
      <path d="M15 10l4.553 -2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1 -1.447 .894L15 14" />
      <rect x="3" y="6" width="12" height="12" rx="2" />
    </I>
  ),
  movie: (
    <I>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 4v16 M16 4v16 M4 8h4 M4 16h4 M4 12h16 M16 8h4 M16 16h4" />
    </I>
  ),
  moodSmile: (
    <I>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01 M15 10h.01 M9.5 15a3.5 3.5 0 0 0 5 0" />
    </I>
  ),
  eye: (
    <I>
      <circle cx="12" cy="12" r="2" />
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </I>
  ),
  // Y.js mark for Multiplayer Editing
  yjs: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 3 L8 9 L13 3 M8 9 L8 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  pencilStar: (
    <I>
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </I>
  ),
  refresh: (
    <I>
      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
    </I>
  ),
  click: (
    <I>
      <path d="M3 12h3 M12 3v3 M7.8 7.8l-2.2 -2.2 M16.2 7.8l2.2 -2.2 M7.8 16.2l-2.2 2.2" />
      <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
    </I>
  ),
  headphones: (
    <I>
      <rect x="4" y="13" width="5" height="7" rx="2" />
      <rect x="15" y="13" width="5" height="7" rx="2" />
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
    </I>
  ),
  usersGroup: (
    <I>
      <circle cx="12" cy="15" r="2" />
      <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
      <circle cx="17" cy="7" r="2" />
      <path d="M17 10h2a2 2 0 0 1 2 2v1" />
      <circle cx="7" cy="7" r="2" />
      <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
    </I>
  ),
  pointer: (
    <I d="M7.904 17.563a1.2 1.2 0 0 0 2.228 .308l2.09 -3.093l4.907 4.907a1.067 1.067 0 0 0 1.509 0l1.047 -1.047a1.067 1.067 0 0 0 0 -1.509l-4.907 -4.907l3.113 -2.09a1.2 1.2 0 0 0 -.309 -2.228l-12.358 -3.486l-.1 -.011a1.2 1.2 0 0 0 -1.1 1.611z" />
  ),
  hexagon: (
    <I d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98" />
  ),
  circle: <I d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" />,
  server: (
    <I>
      <rect x="3" y="4" width="18" height="8" rx="3" />
      <rect x="3" y="12" width="18" height="8" rx="3" />
      <path d="M7 8h.01 M7 16h.01" />
    </I>
  ),
  cloud: (
    <I d="M6.657 18a4.5 4.5 0 0 1 0 -9a5.5 5.5 0 0 1 10.9 -1a4 4 0 0 1 2.443 7h-13.343" />
  ),
  plug: (
    <I>
      <path d="M9.785 6l8.215 8.215l-2.054 2.054a5.81 5.81 0 1 1 -8.215 -8.215l2.054 -2.054z" />
      <path d="M4 20l3.5 -3.5 M15 4l-3.5 3.5 M20 9l-3.5 3.5" />
    </I>
  ),
};

const productAsync: DropdownItem[] = [
  { label: "Comments", href: "/comments", icon: icons.comments, tint: "#ffa3fa" },
  { label: "Notifications", href: "/add-notifications-quick", icon: icons.bell, tint: "#f5d14a" },
  { label: "Recording", href: "/recording", icon: icons.video, tint: "#f47474" },
  { label: "Video Editor", href: "/try-features", icon: icons.movie, tint: "#5ca3ff" },
  { label: "View Analytics", href: "/try-features", icon: icons.moodSmile, tint: "#b387f7" },
  { label: "Reaction", href: "/try-features", icon: icons.eye, tint: "#f5a15e" },
];

const productRealtime: DropdownItem[] = [
  { label: "Multiplayer Editing", href: "/multiplayer-editing", icon: icons.yjs, tint: "#48cfad" },
  { label: "Single Editor Mode", href: "/multiplayer-editing", icon: icons.pencilStar, tint: "#5ca3ff" },
  { label: "Live State Sync", href: "/try-features", icon: icons.refresh, tint: "#48cfad" },
  { label: "Live Selection", href: "/try-features", icon: icons.click, tint: "#b387f7" },
  { label: "Huddle", href: "/try-features", icon: icons.headphones, tint: "#a4bd52" },
  { label: "Presence", href: "/try-features", icon: icons.usersGroup, tint: "#97e07f" },
  { label: "Multi Cursor", href: "/try-features", icon: icons.pointer, tint: "#f5a15e" },
  { label: "Flock Mode", href: "/try-features", icon: icons.pointer, tint: "#5eda7a" },
];

const productPlatform: DropdownItem[] = [
  { label: "Admin Console", href: "/enterprise", icon: icons.hexagon, tint: "#b387f7" },
  { label: "Dev Tools", href: "/devtools", icon: icons.circle, tint: "#f5d14a" },
  { label: "MCP", href: "/platform", icon: icons.server, tint: "#ffa3fa" },
  { label: "Webhooks & API", href: "/webhooks-and-api", icon: icons.cloud, tint: "#5eda7a" },
  { label: "Integrations", href: "/integrations", icon: icons.plug, tint: "#ffa3fa" },
];

const productColumns: DropdownColumn[] = [
  { heading: "ASYNC", width: 171, items: productAsync },
  { heading: "REALTIME", width: 201, items: productRealtime },
  { heading: "PLATFORM", width: 157, items: productPlatform },
];

// ---------- Component ----------

export function Nav() {
  const [overPurple, setOverPurple] = useState(false);
  const [open, setOpen] = useState<DropdownId | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const NAV_STRIP = 80;
    const check = () => {
      const outcomes = document.querySelector<HTMLElement>("[data-outcomes]");
      const getStarted = document.querySelector<HTMLElement>("[data-getstarted]");
      if (!outcomes) return;
      const outcomesTop = outcomes.getBoundingClientRect().top;
      const getStartedTop = getStarted?.getBoundingClientRect().top ?? Infinity;
      setOverPurple(outcomesTop <= NAV_STRIP && getStartedTop > NAV_STRIP);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Defer the close so the cursor can cross the gap between trigger and panel.
  const requestOpen = (id: DropdownId) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(id);
  };
  const requestClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  const textColor = overPurple ? "#0f0f11" : "#fff";
  const textOpacity = overPurple ? 0.9 : 0.75;
  const iconFilter = overPurple ? "invert(1) brightness(0.2)" : "none";
  // Framer nav uses a dark-to-transparent gradient (linear-gradient 180deg,
  // rgba(0,0,0,0.52) → transparent). Over white content we flip to a solid
  // translucent-white panel.
  const bg = overPurple
    ? "rgba(255,255,255,0.92)"
    : "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0) 100%)";

  return (
    <nav
      className="relative w-full"
      style={{
        background: bg,
        transition: "background 180ms ease",
      }}
      onMouseLeave={requestClose}
    >
    <div
      className="flex items-center gap-6 relative"
      style={{
        padding: "12px 80px",
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      <div className="flex-1 flex items-center" style={{ gap: 16 }}>
        <a href="/" aria-label="Velt home" className="flex items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/velt-logo.svg"
            alt="Velt"
            width={24}
            height={24}
            style={{ filter: iconFilter, transition: "filter 180ms ease" }}
          />
        </a>
        <ul className="flex items-start" style={{ gap: 12 }}>
          {topLinks.map((link) => {
            const isDropdown = "dropdown" in link;
            const isOpen = isDropdown && open === link.dropdown;
            return (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={isDropdown ? () => requestOpen(link.dropdown) : undefined}
              >
                {isDropdown ? (
                  <button
                    type="button"
                    className="flex items-center rounded-[4px]"
                    style={{
                      padding: "4px 8px",
                      gap: 4,
                      background: "transparent",
                      border: 0,
                    }}
                  >
                    <NavLabel color={textColor} opacity={textOpacity}>
                      {link.label}
                    </NavLabel>
                    <Caret open={isOpen} filter={iconFilter} />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    className="flex items-center rounded-[4px]"
                    style={{ padding: "4px 8px" }}
                  >
                    <NavLabel color={textColor} opacity={textOpacity}>
                      {link.label}
                    </NavLabel>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center" style={{ gap: 8 }}>
        <a
          href="https://console.velt.dev/"
          className="flex items-center rounded-lg"
          style={{ padding: "8px 12px 8px 8px", gap: 6 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/icon-login.svg"
            alt=""
            width={16}
            height={16}
            style={{ filter: iconFilter, transition: "filter 180ms ease" }}
          />
          <NavLabel color={textColor} opacity={textOpacity}>Sign In</NavLabel>
        </a>
        <a
          href="https://docs.velt.dev/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center rounded-lg"
          style={{ padding: "8px 12px 8px 8px", gap: 6 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/icon-book-nav.svg"
            alt=""
            width={16}
            height={16}
            style={{ filter: iconFilter, transition: "filter 180ms ease" }}
          />
          <NavLabel color={textColor} opacity={textOpacity}>Read Docs</NavLabel>
        </a>
        <a
          href="/book-demo"
          className="rounded-lg"
          style={{ padding: "8px 12px", background: "#625df5" }}
        >
          <span
            className="font-urbanist font-semibold text-white whitespace-nowrap"
            style={{ fontSize: 14, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Book Demo
          </span>
        </a>
      </div>

      {/* Product mega-menu — Figma 1:21692. Use Cases / Resources reuse the
          same shell with placeholder content until their Figma nodes are
          built out — this keeps caret-rotation + hover transition consistent
          across all three triggers. */}
      <DropdownPanel
        isOpen={open === "product"}
        onEnter={() => requestOpen("product")}
        onLeave={requestClose}
      >
        <ProductDropdown />
      </DropdownPanel>
      <DropdownPanel
        isOpen={open === "useCases"}
        onEnter={() => requestOpen("useCases")}
        onLeave={requestClose}
      >
        <PlaceholderDropdown label="Use Cases" />
      </DropdownPanel>
      <DropdownPanel
        isOpen={open === "enterprise"}
        onEnter={() => requestOpen("enterprise")}
        onLeave={requestClose}
      >
        <PlaceholderDropdown label="Enterprise" />
      </DropdownPanel>
      <DropdownPanel
        isOpen={open === "resources"}
        onEnter={() => requestOpen("resources")}
        onLeave={requestClose}
      >
        <PlaceholderDropdown label="Resources" />
      </DropdownPanel>
    </div>
    </nav>
  );
}

function NavLabel({
  color,
  opacity,
  children,
}: {
  color: string;
  opacity: number;
  children: ReactNode;
}) {
  return (
    <span
      className="font-urbanist font-medium whitespace-nowrap capitalize"
      style={{
        color,
        opacity,
        fontSize: 14,
        lineHeight: 1.2,
        letterSpacing: "-0.03em",
        transition: "color 180ms ease",
      }}
    >
      {children}
    </span>
  );
}

function Caret({ open, filter }: { open: boolean; filter: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/home/icon-chevron-down.svg"
      alt=""
      width={14}
      height={14}
      style={{
        filter,
        transition: "filter 180ms ease, transform 180ms ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    />
  );
}

// ---------- Dropdown shell ----------

function DropdownPanel({
  isOpen,
  onEnter,
  onLeave,
  children,
}: {
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  children: ReactNode;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute",
        top: "100%",
        left: 80,
        paddingTop: 8,
        pointerEvents: isOpen ? "auto" : "none",
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "scale(1) translateY(0)" : "scale(0.98) translateY(-4px)",
        // easeOutBack on enter gives a gentle spring overshoot; easeOut on exit
        transition: isOpen
          ? "opacity 220ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "opacity 140ms ease-out, transform 160ms ease-out",
        transformOrigin: "top left",
        zIndex: 100,
      }}
    >
      {children}
    </div>
  );
}

// ---------- Product dropdown content ----------

function ProductDropdown() {
  return (
    <div
      className="flex items-start"
      style={{
        background: "#0c0c0d",
        border: "1px solid #171617",
        borderRadius: 22,
        padding: 4,
        gap: 5,
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
      }}
    >
      {productColumns.map((col) => (
        <LinkGroup key={col.heading} column={col} />
      ))}
      <PreviewCard />
    </div>
  );
}

function LinkGroup({ column }: { column: DropdownColumn }) {
  return (
    <div
      className="flex flex-col items-start"
      style={{
        background: "#0c0c0d",
        borderRadius: 16,
        padding: 4,
        gap: 4,
        width: column.width,
      }}
    >
      <div
        className="flex items-end w-full"
        style={{ padding: 10, borderRadius: 12 }}
      >
        <span
          className="font-mono text-white whitespace-nowrap"
          style={{
            fontSize: 10,
            opacity: 0.32,
            fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
            fontWeight: 500,
          }}
        >
          {column.heading}
        </span>
      </div>
      {column.items.map((item) => (
        <DropdownLink key={item.label} item={item} compact={column.heading !== "ASYNC"} />
      ))}
    </div>
  );
}

function DropdownLink({ item, compact }: { item: DropdownItem; compact: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={item.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center w-full"
      style={{
        padding: 10,
        borderRadius: 12,
        gap: 12,
        color: "#fff",
        background: hover ? "#1b1a1a" : "transparent",
        transition: "background 140ms ease",
      }}
    >
      <span
        className="shrink-0 flex items-center justify-center"
        style={{ width: 16, height: 16, color: item.tint ?? "#fff" }}
      >
        {item.icon}
      </span>
      <span
        className="font-urbanist font-medium whitespace-nowrap"
        style={{
          fontSize: compact ? 11.2 : 14,
          lineHeight: 1.2,
          letterSpacing: compact ? "0" : "-0.42px",
          color: "#fff",
        }}
      >
        {item.label}
      </span>
    </a>
  );
}

function PreviewCard() {
  // Figma 1:21794 "Link Card" — 250 wide, fills card-group height. Card Image
  // (1:21798) is 250×250 pinned top-right, card text pinned bottom-left.
  return (
    <div
      className="flex items-center self-stretch overflow-hidden"
      style={{ padding: 4 }}
    >
      <div
        className="relative overflow-hidden shrink-0"
        style={{
          width: 250,
          alignSelf: "stretch",
          background: "#1b1a1a",
          borderRadius: 16,
        }}
      >
        <div
          className="absolute"
          style={{ right: 0, top: 0, width: 250, height: 250 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/nav-preview-advance-ui.png"
            alt=""
            width={250}
            height={250}
            className="pointer-events-none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              maxWidth: "none",
            }}
          />
        </div>
        <div
          className="absolute flex flex-col items-start text-white"
          style={{ left: 16, bottom: 16, width: 218, gap: 8 }}
        >
          <p
            className="font-urbanist font-semibold"
            style={{ fontSize: 16, lineHeight: "normal" }}
          >
            Advance UI Customization
          </p>
          <p
            className="font-urbanist"
            style={{ fontSize: 12, lineHeight: "normal", opacity: 0.52 }}
          >
            Personalize your collaboration experience
          </p>
        </div>
      </div>
    </div>
  );
}

function PlaceholderDropdown({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        background: "#0c0c0d",
        border: "1px solid #171617",
        borderRadius: 22,
        padding: "24px 32px",
        minWidth: 280,
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
      }}
    >
      <span
        className="font-urbanist"
        style={{ color: "rgba(255,255,255,0.52)", fontSize: 13 }}
      >
        {label} menu · coming soon
      </span>
    </div>
  );
}
