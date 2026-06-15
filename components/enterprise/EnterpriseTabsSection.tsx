"use client";

// Purple full-bleed tabbed section for /enterprise.
//
// Mirrors velt.dev/enterprise (live): a single #625df5 section that swaps
// between 4 pillars (Self-Hosting, Compliance Tools, Advanced Encryption,
// Access Controls) via a top tab rail. Heavily inspired by
// components/home/Outcomes.tsx (same purple band + tab pattern).
//
// Anchor IDs land on the *outer wrapper*: tab clicks update window.location
// hash so /enterprise#compliance-tools etc. (the Nav dropdown's targets)
// auto-select the matching tab on mount. scrollMarginTop offsets the fixed
// nav (~100px).

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";

type TabId =
  | "self-hosting"
  | "compliance-tools"
  | "advanced-encryption"
  | "access-controls";

type TabDef = {
  id: TabId;
  label: string;
  icon: ReactNode;
  headingMint: string;
  headingWhite: string;
  subheading: string;
  imageSrc: string;
  imageAlt: string;
  testimonial: {
    name: string;
    role: string;
    quote: string;
    avatarSrc: string;
    brandLogoSrc?: string;
    brandLogoAlt?: string;
    brandLogoWidth?: number;
    brandLogoHeight?: number;
  };
};

// Tabler-style inline icons (matches Nav.tsx pattern — viewBox 0 0 24 24,
// stroke-width 1.6, currentColor). Kept inline since the project has no
// icon dependency (verified in package.json).
function TabIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const ServerIcon = (
  <TabIcon>
    <rect x="3" y="4" width="18" height="8" rx="3" />
    <rect x="3" y="12" width="18" height="8" rx="3" />
    <path d="M7 8h.01 M7 16h.01" />
  </TabIcon>
);

const FlagIcon = (
  <TabIcon>
    <path d="M5 21V4" />
    <path d="M5 4h12l-2 4 2 4H5" />
  </TabIcon>
);

const CodeIcon = (
  <TabIcon>
    <path d="M9 8l-4 4 4 4 M15 8l4 4 -4 4" />
  </TabIcon>
);

const SettingsIcon = (
  <TabIcon>
    <path d="M10.325 4.317a1.724 1.724 0 0 1 3.35 0 1.724 1.724 0 0 0 2.573 1.066 1.724 1.724 0 0 1 2.37 2.37 1.724 1.724 0 0 0 1.065 2.572 1.724 1.724 0 0 1 0 3.35 1.724 1.724 0 0 0 -1.066 2.573 1.724 1.724 0 0 1 -2.37 2.37 1.724 1.724 0 0 0 -2.572 1.065 1.724 1.724 0 0 1 -3.35 0 1.724 1.724 0 0 0 -2.573 -1.066 1.724 1.724 0 0 1 -2.37 -2.37 1.724 1.724 0 0 0 -1.065 -2.572 1.724 1.724 0 0 1 0 -3.35 1.724 1.724 0 0 0 1.066 -2.573 1.724 1.724 0 0 1 2.37 -2.37 1.724 1.724 0 0 0 2.572 -1.065z" />
    <circle cx="12" cy="12" r="3" />
  </TabIcon>
);

const TABS: TabDef[] = [
  {
    id: "self-hosting",
    label: "Self-Hosting",
    icon: ServerIcon,
    headingMint: "Own and control",
    headingWhite: " your customer data",
    subheading:
      "Enjoy the full Velt experience while keeping all sensitive data on your servers",
    imageSrc: "/images/enterprise/self-hosting.jpg",
    imageAlt: "Self-hosted database diagram",
    testimonial: {
      name: "William Angel",
      role: "Lead PM @Trumpet",
      quote:
        "Engagement at Trumpet grew by 10% after adding collaborative features from Velt",
      avatarSrc: "/images/features/comments/trust-us/avatar-william.png",
      brandLogoSrc: "/images/home/trumpet-logo.svg",
      brandLogoAlt: "Trumpet",
      brandLogoWidth: 133,
      brandLogoHeight: 23,
    },
  },
  {
    id: "compliance-tools",
    label: "Compliance Tools",
    icon: FlagIcon,
    headingMint: "Tools and certifications",
    headingWhite: " designed for the strictest standards",
    subheading:
      "Meet the strictest security standards with SOC 2 Type II and HIPAA-aligned tooling",
    imageSrc: "/images/enterprise/compliance-tools.jpg",
    imageAlt: "Compliance certifications illustration",
    testimonial: {
      name: "Ethan Veres",
      role: "CTO @eqtble",
      quote:
        "Commenting is something we wanted in our app, Velt made it possible",
      avatarSrc: "/images/features/comments/trust-us/avatar-ethan.png",
      brandLogoSrc: "/images/features/comments/trust-us/logo-eqtble.png",
      brandLogoAlt: "eqtble",
      brandLogoWidth: 110,
      brandLogoHeight: 26,
    },
  },
  {
    id: "advanced-encryption",
    label: "Advanced Encryption",
    icon: CodeIcon,
    headingMint: "Encrypt with your own keys",
    headingWhite: " so even we can't read your data",
    subheading:
      "Bring your own encryption keys for end-to-end control of your data",
    imageSrc: "/images/enterprise/advanced-encryption.jpg",
    imageAlt: "Customer-managed encryption keys illustration",
    testimonial: {
      name: "Yuri Kleban",
      role: "Senior PM @Google",
      quote:
        "Velt gave great 1 on 1 support, added features fast, and offered highly customizable components.",
      avatarSrc: "/images/features/comments/trust-us/avatar-yuri.png",
      brandLogoSrc: "/images/features/comments/trust-us/logo-google.png",
      brandLogoAlt: "Google",
      brandLogoWidth: 100,
      brandLogoHeight: 32,
    },
  },
  {
    id: "access-controls",
    label: "Access Controls",
    icon: SettingsIcon,
    headingMint: "Isolated server",
    headingWhite: " and data storage",
    subheading:
      "Your customer data is logically isolated and never co-mingled with other tenants",
    imageSrc: "/images/enterprise/access-controls.jpg",
    imageAlt: "Isolated server illustration",
    testimonial: {
      name: "Hope Callaway",
      role: "Senior PM @Leadpages",
      quote: "Saved 3 FTEs & will boost retention",
      avatarSrc: "/images/features/comments/trust-us/avatar-hope.png",
      brandLogoSrc: "/images/features/comments/trust-us/logo-leadpages.png",
      brandLogoAlt: "Leadpages",
      brandLogoWidth: 120,
      brandLogoHeight: 28,
    },
  },
];

const VALID_IDS = TABS.map((tab) => tab.id);
const MINT = "#8bf2e1";

function isValidTabId(value: string): value is TabId {
  return (VALID_IDS as string[]).includes(value);
}

function TabContent({
  tab,
  handleTabClick: _handleTabClick,
}: {
  tab: TabDef;
  handleTabClick: (id: TabId) => void;
}) {
  return (
    <div className="flex flex-col w-full gap-8">
      {/* Header row — heading + Learn More */}
      <div
        className="flex flex-col lg:flex-row items-start justify-between w-full"
        style={{ gap: 32 }}
      >
        <div className="flex flex-col" style={{ gap: 16, maxWidth: 900 }}>
          <h2
            className="font-urbanist font-bold"
            style={{
              fontSize: "clamp(28px, 4.2vw, 52px)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              color: "#fff",
              margin: 0,
            }}
          >
            <span style={{ color: MINT }}>{tab.headingMint}</span>
            <span>{tab.headingWhite}</span>
          </h2>
          <p
            className="font-urbanist"
            style={{
              fontSize: "clamp(16px, 1.5vw, 20px)",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.85)",
              margin: 0,
            }}
          >
            {tab.subheading}
          </p>
        </div>
        <a
          href="/book-demo"
          className="font-urbanist font-semibold inline-flex items-center shrink-0"
          style={{
            gap: 6,
            fontSize: 16,
            color: "#fff",
            textDecoration: "none",
            marginTop: 8,
            letterSpacing: "-0.02em",
          }}
        >
          Learn More
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M7 17L17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </a>
      </div>

      {/* Image card + testimonial card. The image card matches the source
          asset aspect (~1.7:1) so the diagram renders at its native scale
          on desktop; the testimonial card stretches to match height. */}
      <div className="flex flex-col lg:flex-row items-stretch w-full" style={{ gap: 24 }}>
        <div
          className="flex items-center justify-center relative"
          style={{
            flex: 2,
            minWidth: 0,
            background: "#fff",
            borderRadius: 28,
            minHeight: 432,
            overflow: "hidden",
          }}
        >
          <Image
            key={tab.id}
            src={tab.imageSrc}
            alt={tab.imageAlt}
            fill
            sizes="(min-width: 1200px) 800px, 100vw"
            style={{ objectFit: "cover" }}
            priority={tab.id === "self-hosting"}
          />
        </div>

        <div
          className="flex flex-col shrink-0"
          style={{
            flex: 1,
            minWidth: 0,
            background: "#1f1e4f",
            borderRadius: 28,
            padding: "36px 36px 40px",
            gap: 24,
            justifyContent: "space-between",
          }}
        >
          {tab.testimonial.brandLogoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tab.testimonial.brandLogoSrc}
              alt={tab.testimonial.brandLogoAlt ?? ""}
              width={tab.testimonial.brandLogoWidth ?? 120}
              height={tab.testimonial.brandLogoHeight ?? 28}
              style={{
                width: tab.testimonial.brandLogoWidth ?? 120,
                height: tab.testimonial.brandLogoHeight ?? 28,
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          ) : null}

          <div className="flex flex-col" style={{ gap: 24 }}>
            <p
              className="font-urbanist font-bold"
              style={{
                color: "#fff",
                fontSize: "clamp(20px, 2.4vw, 28px)",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {tab.testimonial.quote}
            </p>
            <div className="flex items-center" style={{ gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #B4B1FA",
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tab.testimonial.avatarSrc}
                  alt={`${tab.testimonial.name} profile photo`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-col" style={{ gap: 2 }}>
                <span
                  className="font-urbanist font-semibold"
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {tab.testimonial.name}
                </span>
                <span
                  className="font-urbanist"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 14,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {tab.testimonial.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EnterpriseTabsSection() {
  const [activeId, setActiveId] = useState<TabId>("self-hosting");

  // On mount + on hashchange, pick up the URL hash so deep links from the
  // Nav's Enterprise dropdown (/enterprise#compliance-tools etc.) auto-
  // select the right tab. Falls back to self-hosting for unknown hashes.
  useEffect(() => {
    function syncFromHash() {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && isValidTabId(hash)) {
        setActiveId(hash);
      }
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const handleTabClick = useCallback((id: TabId) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      // Update hash without forcing a scroll jump — history API only.
      const url = new URL(window.location.href);
      url.hash = id;
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0];

  return (
    <section
      data-outcomes
      data-enterprise-tabs
      className="full-bleed-bg relative py-16 lg:py-[64px] px-6 lg:px-20"
      style={{
        background: "#625df5",
        paddingBottom: 96,
      }}
    >
      {/* All 4 tab anchor targets land at the top of the band — each is a
       *  zero-height marker so the URL hash from the Nav dropdown lands
       *  cleanly under the fixed nav. Tab clicks update the URL hash to
       *  the active tab so back/forward navigation works. */}
      {TABS.map((tab) => (
        <span
          key={tab.id}
          id={tab.id}
          aria-hidden
          style={{
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            height: 1,
            width: 1,
            scrollMarginTop: 100,
          }}
        />
      ))}

      <div
        className="flex flex-col"
        style={{ maxWidth: 1200, margin: "0 auto", gap: 48 }}
      >
        {/* Desktop tab rail — hidden below lg, accordion takes over there. */}
        <div
          className="hidden lg:flex items-stretch w-full"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className="flex-1 flex items-center justify-center cursor-pointer"
                style={{
                  gap: 10,
                  padding: "16px 12px",
                  marginBottom: -1,
                  background: "transparent",
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderBottomWidth: 2,
                  borderBottomStyle: "solid",
                  borderBottomColor: isActive ? "#fff" : "transparent",
                  color: "#fff",
                  opacity: isActive ? 1 : 0.6,
                  transition: "opacity 0.15s, border-bottom-color 0.15s",
                }}
                aria-pressed={isActive}
              >
                <span style={{ display: "inline-flex" }}>{tab.icon}</span>
                <span
                  className="font-urbanist whitespace-nowrap"
                  style={{
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 18,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop content — single active tab. */}
        <div className="hidden lg:flex flex-col gap-8">
          <TabContent tab={active} handleTabClick={handleTabClick} />
        </div>

        {/* Mobile accordion — all four tabs as <details>. First one open
            so the section never starts collapsed (crawlers see the
            primary headline immediately in the static markup). */}
        <div className="lg:hidden flex flex-col w-full gap-3">
          {TABS.map((tab, idx) => (
            <details
              key={tab.id}
              open={idx === 0}
              className="group"
              style={{
                background: "rgba(0,0,0,0.18)",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <summary
                className="flex items-center justify-between cursor-pointer list-none"
                style={{ padding: "14px 18px", gap: 12 }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ display: "inline-flex", color: "#fff" }}>{tab.icon}</span>
                  <span
                    className="font-urbanist font-bold text-white"
                    style={{ fontSize: 16, lineHeight: 1.2, letterSpacing: "-0.02em" }}
                  >
                    {tab.label}
                  </span>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-200 group-open:rotate-180 shrink-0"
                >
                  <path d="M6 9l6 6l6 -6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </summary>
              <div style={{ padding: "8px 18px 20px" }}>
                <TabContent tab={tab} handleTabClick={handleTabClick} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

