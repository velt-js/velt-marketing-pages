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
      role: "Sr. PM @Leadpages",
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
      className="full-bleed-bg relative"
      style={{
        background: "#625df5",
        padding: "80px 80px 120px",
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
        {/* Tab rail */}
        <div
          className="flex items-stretch w-full"
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

        {/* Header row — heading + Learn More */}
        <div
          className="flex items-start justify-between w-full"
          style={{ gap: 32 }}
        >
          <div className="flex flex-col" style={{ gap: 16, maxWidth: 900 }}>
            <h2
              className="font-urbanist font-bold"
              style={{
                fontSize: 60,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#fff",
                margin: 0,
              }}
            >
              <span style={{ color: MINT }}>{active.headingMint}</span>
              <span>{active.headingWhite}</span>
            </h2>
            <p
              className="font-urbanist"
              style={{
                fontSize: 20,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.85)",
                margin: 0,
              }}
            >
              {active.subheading}
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

        {/* Image card + testimonial card */}
        <div className="flex items-stretch w-full" style={{ gap: 24 }}>
          <div
            className="flex items-center justify-center relative"
            style={{
              flex: 2,
              minWidth: 0,
              background: "#fff",
              borderRadius: 28,
              padding: 32,
              minHeight: 460,
              overflow: "hidden",
            }}
          >
            {/* next/image with fill keeps the JPG illustrations sharp at
             *  whatever width the flex slot resolves to (~720px at 1200
             *  content width). */}
            <div
              className="relative w-full h-full"
              style={{ minHeight: 396 }}
            >
              <Image
                key={active.id}
                src={active.imageSrc}
                alt={active.imageAlt}
                fill
                sizes="(min-width: 1200px) 720px, 100vw"
                style={{ objectFit: "contain" }}
                priority={active.id === "self-hosting"}
              />
            </div>
          </div>

          <div
            className="flex flex-col shrink-0"
            style={{
              flex: 1,
              minWidth: 320,
              background: "#1f1e4f",
              borderRadius: 28,
              padding: "36px 36px 40px",
              gap: 24,
              justifyContent: "space-between",
            }}
          >
            {active.testimonial.brandLogoSrc ? (
              // Brand logo uses a plain img so we can render SVG and PNG
              // without juggling next/image static dimensions for each
              // tab. Fixed pixel sizing per testimonial keeps aspect.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.testimonial.brandLogoSrc}
                alt={active.testimonial.brandLogoAlt ?? ""}
                width={active.testimonial.brandLogoWidth ?? 120}
                height={active.testimonial.brandLogoHeight ?? 28}
                style={{
                  width: active.testimonial.brandLogoWidth ?? 120,
                  height: active.testimonial.brandLogoHeight ?? 28,
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
                  fontSize: 28,
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {active.testimonial.quote}
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
                    src={active.testimonial.avatarSrc}
                    alt={`${active.testimonial.name} profile photo`}
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
                    {active.testimonial.name}
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
                    {active.testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

