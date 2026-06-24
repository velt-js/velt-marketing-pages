"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

import SectionHead from "./SectionHead";

type TabId =
  | "self-hosting"
  | "compliance-tools"
  | "advanced-encryption"
  | "access-controls";

type Pillar = {
  id: TabId;
  label: string;
  icon: ReactNode;
  headingAccent: string;
  headingRest: string;
  subheading: string;
  imageSrc: string;
  imageAlt: string;
  testimonial: {
    name: string;
    role: string;
    quote: string;
    avatarSrc: string;
  };
};

/** Tabler-style inline icon wrapper (viewBox 0 0 24 24, currentColor). */
function TabIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const PILLARS: Pillar[] = [
  {
    id: "self-hosting",
    label: "Self-hosting",
    icon: (
      <TabIcon>
        <rect x="3" y="4" width="18" height="8" rx="3" />
        <rect x="3" y="12" width="18" height="8" rx="3" />
        <path d="M7 8h.01 M7 16h.01" />
      </TabIcon>
    ),
    headingAccent: "Own and control",
    headingRest: " your customer data",
    subheading:
      "Enjoy the full Velt experience while keeping all sensitive data on your servers.",
    imageSrc: "/images/enterprise/self-hosting.jpg",
    imageAlt: "Self-hosted database diagram",
    testimonial: {
      name: "William Angel",
      role: "Lead PM @ Trumpet",
      quote:
        "Engagement at Trumpet grew by 10% after adding collaborative features from Velt.",
      avatarSrc: "/images/features/comments/trust-us/avatar-william.png",
    },
  },
  {
    id: "compliance-tools",
    label: "Compliance tools",
    icon: (
      <TabIcon>
        <path d="M5 21V4" />
        <path d="M5 4h12l-2 4 2 4H5" />
      </TabIcon>
    ),
    headingAccent: "Tools and certifications",
    headingRest: " designed for the strictest standards",
    subheading:
      "Meet the strictest security standards with SOC 2 Type II and HIPAA-aligned tooling.",
    imageSrc: "/images/enterprise/compliance-tools.jpg",
    imageAlt: "Compliance certifications illustration",
    testimonial: {
      name: "Ethan Veres",
      role: "CTO @ eqtble",
      quote:
        "Commenting is something we wanted in our app, Velt made it possible.",
      avatarSrc: "/images/features/comments/trust-us/avatar-ethan.png",
    },
  },
  {
    id: "advanced-encryption",
    label: "Advanced encryption",
    icon: (
      <TabIcon>
        <path d="M9 8l-4 4 4 4 M15 8l4 4 -4 4" />
      </TabIcon>
    ),
    headingAccent: "Encrypt with your own keys",
    headingRest: " so even we can't read your data",
    subheading:
      "Bring your own encryption keys for end-to-end control of your data.",
    imageSrc: "/images/enterprise/advanced-encryption.jpg",
    imageAlt: "Customer-managed encryption keys illustration",
    testimonial: {
      name: "Yuri Kleban",
      role: "Senior PM @ Google",
      quote:
        "Velt gave great 1 on 1 support, added features fast, and offered highly customizable components.",
      avatarSrc: "/images/features/comments/trust-us/avatar-yuri.png",
    },
  },
  {
    id: "access-controls",
    label: "Access controls",
    icon: (
      <TabIcon>
        <path d="M10.325 4.317a1.724 1.724 0 0 1 3.35 0 1.724 1.724 0 0 0 2.573 1.066 1.724 1.724 0 0 1 2.37 2.37 1.724 1.724 0 0 0 1.065 2.572 1.724 1.724 0 0 1 0 3.35 1.724 1.724 0 0 0 -1.066 2.573 1.724 1.724 0 0 1 -2.37 2.37 1.724 1.724 0 0 0 -2.572 1.065 1.724 1.724 0 0 1 -3.35 0 1.724 1.724 0 0 0 -2.573 -1.066 1.724 1.724 0 0 1 -2.37 -2.37 1.724 1.724 0 0 0 -1.065 -2.572 1.724 1.724 0 0 1 0 -3.35 1.724 1.724 0 0 0 1.066 -2.573 1.724 1.724 0 0 1 2.37 -2.37 1.724 1.724 0 0 0 2.572 -1.065z" />
        <circle cx="12" cy="12" r="3" />
      </TabIcon>
    ),
    headingAccent: "Isolated server",
    headingRest: " and data storage",
    subheading:
      "Your customer data is logically isolated and never co-mingled with other tenants.",
    imageSrc: "/images/enterprise/access-controls.jpg",
    imageAlt: "Isolated server illustration",
    testimonial: {
      name: "Hope Callaway",
      role: "Senior PM @ Leadpages",
      quote: "Saved 3 FTEs and will boost retention.",
      avatarSrc: "/images/features/comments/trust-us/avatar-hope.png",
    },
  },
];

const VALID_IDS = PILLARS.map((pillar) => pillar.id);

/**
 * Narrows an arbitrary string to a known pillar tab id.
 * @param {string} value The candidate id (e.g. from the URL hash).
 * @returns {boolean} True when the value is a valid pillar id.
 */
function isValidTabId(value: string): value is TabId {
  return (VALID_IDS as string[]).includes(value);
}

/**
 * Enterprise pillars tab section, restyled onto the .vlp design system. Swaps
 * between the four enterprise pillars via a mono tab rail; tab clicks sync to
 * the URL hash so deep links (e.g. /enterprise#compliance-tools) auto-select
 * the matching pillar on mount.
 * @returns {JSX.Element} The enterprise pillars section.
 */
export default function EnterprisePillars() {
  const [activeId, setActiveId] = useState<TabId>("self-hosting");

  useEffect(() => {
    /** Selects the pillar whose id matches the current location hash. */
    const syncFromHash = () => {
      try {
        const hash = window?.location?.hash?.replace(/^#/, "") ?? "";
        if (hash && isValidTabId(hash)) {
          setActiveId(hash);
        }
      } catch (error) {
        console.error("EnterprisePillars hash sync failed", error);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const handleTabClick = useCallback((id: TabId) => {
    try {
      setActiveId(id);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.replaceState(null, "", url.toString());
      }
    } catch (error) {
      console.error("EnterprisePillars tab click failed", error);
    }
  }, []);

  const active = PILLARS.find((pillar) => pillar.id === activeId) ?? PILLARS[0];

  return (
    <section className="lp-section">
      <div className="lp-wrap">
        {/* Zero-height anchor markers so Nav deep links land cleanly. */}
        {PILLARS.map((pillar) => (
          <span key={pillar.id} id={pillar.id} className="lp-anchor" aria-hidden="true" />
        ))}

        <SectionHead
          eyebrow="Enterprise"
          heading="The collaboration stack, built for enterprise"
          subheading="Self-hosting, compliance tooling, customer-managed encryption, and isolated storage, with 99.999% uptime."
        />

        <div className="lp-tabs" role="tablist" aria-label="Enterprise pillars">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              role="tab"
              className="lp-tab"
              aria-selected={pillar.id === activeId}
              onClick={() => handleTabClick(pillar.id)}
            >
              {pillar.icon}
              {pillar.label}
            </button>
          ))}
        </div>

        <div className="lp-pillar">
          <div className="lp-pillar-head">
            <h3>
              <span className="lp-pillar-accent">{active.headingAccent}</span>
              {active.headingRest}
            </h3>
            <p>{active.subheading}</p>
          </div>

          <div className="lp-pillar-grid">
            <div className="lp-pillar-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.imageSrc} alt={active.imageAlt} />
            </div>

            <figure className="lp-pillar-quote">
              <blockquote>{active.testimonial.quote}</blockquote>
              <figcaption>
                <span className="lp-pillar-avatar">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={active.testimonial.avatarSrc}
                    alt={`${active.testimonial.name} profile photo`}
                  />
                </span>
                <span className="lp-pillar-meta">
                  <span className="lp-pillar-name">{active.testimonial.name}</span>
                  <span className="lp-pillar-role">{active.testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
