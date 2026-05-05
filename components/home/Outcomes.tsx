"use client";

// Outcomes — Figma node 8506:97016 + tab variants 8576:6259 / 8576:6298 /
// 8576:6337 / 8576:6376 / 8576:6415. Purple rounded-top band with a 5-tab
// rail, a big gradient-word headline, and a side-by-side visual + testimonial
// card that both swap per-tab.

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
    quote: "Engagement at Trumpet grew by 10%\u201D after adding collaborative features from Velt",
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
    quote: "With Velt\u2019s collaborative features we boosted our app\u2019s weekly active users by 26%",
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

export function Outcomes() {
  const [activeId, setActiveId] = useState<TabId>("engagement");
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

  return (
    <section
      data-outcomes
      className="flex flex-col items-start w-full relative full-bleed-bg"
      style={{
        background: "#625df5",
        padding: "48px 80px 220px",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
    >
      <div className="flex flex-col w-full" style={{ gap: 45, maxWidth: 1200, margin: "0 auto" }}>
        {/* Tab rail */}
        <div
          className="flex items-center w-full"
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

        {/* Headline + sub */}
        <div className="flex flex-col items-start w-full" style={{ gap: 16 }}>
          <h2
            className="font-urbanist font-bold text-white"
            style={{
              fontSize: 52,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              width: 1280,
            }}
          >
            {active.headlineBefore}
            <span
              style={{
                background: "linear-gradient(to right, #5cffce, #dadaff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {active.gradientText}
            </span>
            {active.headlineAfter}
          </h2>
          <p
            className="font-urbanist font-semibold text-white"
            style={{
              fontSize: 24,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              opacity: 0.75,
              width: 1280,
            }}
          >
            {active.subtitle}
          </p>
        </div>

        {/* Visual + testimonial card */}
        <div className="flex items-center w-full" style={{ gap: 12 }}>
          <div className="flex-1 relative" style={{ height: 513 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={active.id}
              src={active.visual}
              alt={`${active.label} visual`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ borderRadius: 32 }}
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
            className="flex flex-col justify-between shrink-0"
            style={{
              width: 400,
              height: 513,
              background: "rgba(0,0,0,0.6)",
              borderRadius: 32,
              padding: "36px 36px 43px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.logo.src}
              alt={active.person.title}
              width={active.logo.width}
              height={active.logo.height}
              style={{ width: active.logo.width, height: active.logo.height, objectFit: "contain" }}
            />

            <div className="flex flex-col w-full" style={{ gap: 32 }}>
              <p
                className="font-urbanist font-bold text-white"
                style={{ fontSize: 32, lineHeight: 1.2 }}
              >
                {active.quote}
              </p>
              <div className="flex items-center w-full" style={{ gap: 16 }}>
                <div
                  className="shrink-0 relative overflow-hidden"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: `1.887px solid ${active.person.avatarBorder}`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={active.person.avatar}
                    alt={active.person.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col text-white" style={{ gap: 4 }}>
                  <p className="font-urbanist font-bold" style={{ fontSize: 16, lineHeight: 1.2 }}>
                    {active.person.name}
                  </p>
                  <p className="font-urbanist" style={{ fontSize: 16, lineHeight: 1.2 }}>
                    {active.person.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
