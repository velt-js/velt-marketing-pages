"use client";

// Outcomes — purple-band section. Responsive rewrite:
//
//  • lg+: tab rail across the top, single active tab's content below
//    (headline + visual on the left, testimonial card on the right).
//  • <lg: tab rail hidden; each tab renders as a `<details>` accordion
//    with its full content inline. Mobile-first indexing means all five
//    tabs end up in the crawled DOM, which is the SEO reason we picked
//    accordion over a horizontal swipe carousel.
//
// All content (headline, visual, testimonial) is rendered through a
// single <TabContent> component so the desktop and mobile paths share
// markup; only the wrapper changes.

import { useState } from "react";

type TabId = "engagement" | "growth" | "differentiate" | "savecost" | "shipfast";

type TabDef = {
  id: TabId;
  label: string;
  icon: string;
  headlineBefore: string;
  gradientText: string;
  headlineAfter: string;
  subtitle: string;
  visual: string;
  logo: { src: string; width: number; height: number };
  quote: string;
  person: { name: string; title: string; avatar: string; avatarBorder: string };
};

const TABS: TabDef[] = [
  {
    id: "engagement",
    label: "Boost Engagement",
    icon: "/images/home/icon-broadcast.svg",
    headlineBefore: "Drive double-digit ",
    gradientText: "engagement",
    headlineAfter: " in your product",
    subtitle: "Users spend 10+ hours a week communicating on other platforms. Bring those conversations into your product!",
    visual: "/images/home/outcomes-visual.png",
    logo: { src: "/images/home/trumpet-logo.svg", width: 133, height: 23 },
    quote: "Engagement at Trumpet grew by 10%” after adding collaborative features from Velt",
    person: {
      name: "William Angle",
      title: "Lead PM, Trumpet",
      avatar: "/images/home/william-angle.png",
      avatarBorder: "#fcca44",
    },
  },
  {
    id: "growth",
    label: "Boost Growth",
    icon: "/images/home/icon-chart-line.svg",
    headlineBefore: "Go from single player to ",
    gradientText: "multiplayer",
    headlineAfter: "",
    subtitle: "Transform your product into a multiplayer experience that drives organic adoption.",
    visual: "/images/home/outcomes/growth-visual.png",
    logo: { src: "/images/home/outcomes/growth-logo.png", width: 133, height: 18 },
    quote: "With Velt’s collaborative features we boosted our app’s weekly active users by 26%",
    person: {
      name: "Jeff Cunning",
      title: "CPO @MetaImpact",
      avatar: "/images/home/outcomes/growth-profile.png",
      avatarBorder: "#fcca44",
    },
  },
  {
    id: "differentiate",
    label: "Differentiate",
    icon: "/images/home/icon-versions.svg",
    headlineBefore: "Give your product its ",
    gradientText: "Figma moment",
    headlineAfter: "",
    subtitle: "Collaborative features helped products like Google Docs and Figma become iconic.",
    visual: "/images/home/outcomes/differentiate-visual.png",
    logo: { src: "/images/home/outcomes/differentiate-logo.png", width: 140, height: 25 },
    quote: "The Velt Commenting features allow our users to communicate and collaborate in-tool to achieve fast feedback loops",
    person: {
      name: "Fenne Buitenrust",
      title: "Product Lead @CloudFactory",
      avatar: "/images/home/outcomes/differentiate-profile.png",
      avatarBorder: "#fcca44",
    },
  },
  {
    id: "savecost",
    label: "Save Cost",
    icon: "/images/home/icon-dollar.svg",
    headlineBefore: "Unlock $750,000 in ",
    gradientText: "yearly savings",
    headlineAfter: "",
    subtitle: "It takes PMs, Frontend Developer, Backend Developers, Designers, Testers and more to make collaborative features.",
    visual: "/images/home/outcomes/savecost-visual.png",
    logo: { src: "/images/home/outcomes/savecost-logo.png", width: 143, height: 33 },
    quote: "Instead of quarters of work for 3 FTEs, it only took a few weeks with Velt",
    person: {
      name: "Hope Callaway",
      title: "Sr. Product Manager @Leadpages",
      avatar: "/images/home/outcomes/savecost-profile.png",
      avatarBorder: "#fcca44",
    },
  },
  {
    id: "shipfast",
    label: "Ship Fast",
    icon: "/images/home/icon-clock.svg",
    headlineBefore: "Ship collaboration features ",
    gradientText: "extremely fast",
    headlineAfter: "",
    subtitle: "Building collaborative features from scratch takes months. Building with Velt takes a fraction of the time.",
    visual: "/images/home/outcomes/shipfast-visual.png",
    logo: { src: "/images/home/outcomes/shipfast-logo.png", width: 125, height: 35 },
    quote: "With Velt, a single engineer was able to integrate commenting functionality in just a few minutes",
    person: {
      name: "Weller Miranda",
      title: "Sr. Software Engineer @marco",
      avatar: "/images/home/outcomes/shipfast-profile.png",
      avatarBorder: "#fcca44",
    },
  },
];

function TabContent({ tab }: { tab: TabDef }) {
  return (
    <div className="flex flex-col w-full gap-8 lg:gap-11">
      <div className="flex flex-col items-start w-full gap-4">
        <h2
          className="font-urbanist font-bold text-white w-full"
          style={{
            fontSize: "clamp(28px, 4.2vw, 52px)",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
          }}
        >
          {tab.headlineBefore}
          <span
            style={{
              background: "linear-gradient(to right, #5cffce, #dadaff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {tab.gradientText}
          </span>
          {tab.headlineAfter}
        </h2>
        <p
          className="font-urbanist font-semibold text-white w-full"
          style={{
            fontSize: "clamp(16px, 1.7vw, 24px)",
            lineHeight: 1.3,
            letterSpacing: "-0.03em",
            opacity: 0.75,
          }}
        >
          {tab.subtitle}
        </p>
      </div>

      {/* Visual + testimonial: side-by-side at lg, stacked below. */}
      <div className="flex flex-col lg:flex-row items-stretch w-full gap-3">
        <div
          className="flex-1 relative overflow-hidden"
          style={{ aspectRatio: "766 / 513", borderRadius: 32 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tab.visual}
            alt={`${tab.label} visual`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: 32,
              boxShadow:
                "inset -8px -8px 32px 0px rgba(99,132,235,0.32), inset 0px 0px 32px 0px rgba(99,132,235,0.52)",
            }}
          />
        </div>

        <div
          className="flex flex-col justify-between shrink-0 w-full lg:w-[400px]"
          style={{
            background: "rgba(0,0,0,0.6)",
            borderRadius: 32,
            padding: "36px 36px 43px",
            gap: 32,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tab.logo.src}
            alt={tab.person.title}
            width={tab.logo.width}
            height={tab.logo.height}
            style={{ width: tab.logo.width, height: tab.logo.height, objectFit: "contain" }}
          />

          <div className="flex flex-col w-full gap-8">
            <p
              className="font-urbanist font-bold text-white"
              style={{ fontSize: "clamp(20px, 2.3vw, 32px)", lineHeight: 1.2 }}
            >
              {tab.quote}
            </p>
            <div className="flex items-center w-full gap-4">
              <div
                className="shrink-0 relative overflow-hidden"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  border: `1.887px solid ${tab.person.avatarBorder}`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tab.person.avatar}
                  alt={tab.person.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col text-white gap-1">
                <p className="font-urbanist font-bold" style={{ fontSize: 16, lineHeight: 1.2 }}>
                  {tab.person.name}
                </p>
                <p className="font-urbanist" style={{ fontSize: 16, lineHeight: 1.2 }}>
                  {tab.person.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Outcomes() {
  const [activeId, setActiveId] = useState<TabId>("engagement");
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

  return (
    <section
      data-outcomes
      className="flex flex-col items-start w-full relative full-bleed-bg"
      style={{
        background: "#625df5",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
    >
      <div className="container-page flex flex-col w-full gap-8 lg:gap-11 pt-10 lg:pt-12 pb-32 lg:pb-56">
        {/* Desktop tab rail — hidden below lg, accordion takes over there. */}
        <div
          className="hidden lg:flex items-center w-full"
          style={{ gap: 2, borderBottom: "2px solid rgba(255,255,255,0.12)" }}
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveId(tab.id)}
                className="flex-1 flex items-center justify-center gap-3 relative cursor-pointer"
                style={{
                  padding: "16px 20px",
                  marginBottom: -2,
                  background: "transparent",
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderBottomWidth: 2,
                  borderBottomStyle: "solid",
                  borderBottomColor: isActive ? "#fff" : "transparent",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tab.icon} alt="" width={20} height={20} style={{ opacity: isActive ? 1 : 0.52 }} />
                <span
                  className={`font-urbanist ${isActive ? "font-bold" : "font-medium"} whitespace-nowrap`}
                  style={{
                    fontSize: 18,
                    lineHeight: 1.2,
                    letterSpacing: "-0.03em",
                    color: "#fff",
                    opacity: isActive ? 1 : 0.52,
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop content — single active tab. */}
        <div className="hidden lg:block">
          <TabContent tab={active} />
        </div>

        {/* Mobile accordion — all five tabs as <details>. First one open
            so the section never starts collapsed (and crawlers see the
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tab.icon} alt="" width={20} height={20} />
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
                <TabContent tab={tab} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
