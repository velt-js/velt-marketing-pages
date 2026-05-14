"use client";

// Two-tab card grid for /launch-kit. "Off App" → 4 marketing-asset cards
// (Email / Social / Website / Sticker Sheet) in a 2×2 grid. "In App" → 5
// in-product UX-pattern cards in a 2×3 grid (5th card sits alone on the
// last row). Each card has an image preview, title, blurb, and a black
// pill "Get Figma File" CTA that opens the shared Figma community file.

import { useState } from "react";

import { ExternalLinkIcon } from "@/components/feature/uis/icons";

type CardDef = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type TabId = "off-app" | "in-app";

type LaunchKitTabsProps = {
  figmaUrl: string;
};

const OFF_APP_CARDS: CardDef[] = [
  {
    title: "Email Template",
    description:
      "Our professionally designed email template clearly communicates the value of your new features",
    imageSrc: "/images/launch-kit/email-template.png",
    imageAlt: "Velt launch email template",
  },
  {
    title: "Social Media Template",
    description: "Easy ready-to-post assets for your social media accounts",
    imageSrc: "/images/launch-kit/social-media-template.png",
    imageAlt: "Velt launch social media template",
  },
  {
    title: "Website Template",
    description: "Don't fret on your launch site, just follow our template",
    imageSrc: "/images/launch-kit/website-template.png",
    imageAlt: "Velt launch website template",
  },
  {
    title: "DIY Sticker Sheet",
    description:
      "Build your own launch graphics with our pre-built Figma components",
    imageSrc: "/images/launch-kit/sticker-sheet.png",
    imageAlt: "Velt launch DIY sticker sheet",
  },
];

const IN_APP_CARDS: CardDef[] = [
  {
    title: "Indicator",
    description: "Subtly bring attention to your new power features",
    imageSrc: "/images/launch-kit/indicator.png",
    imageAlt: "Velt in-app indicator pattern",
  },
  {
    title: "Tour Guide",
    description:
      "Guide users through the new collaboration experience in your product",
    imageSrc: "/images/launch-kit/tour-guide.png",
    imageAlt: "Velt in-app tour guide pattern",
  },
  {
    title: "User Action Checklist",
    description: "Give users a list of actions to try out",
    imageSrc: "/images/launch-kit/user-action-checklist.png",
    imageAlt: "Velt in-app user action checklist pattern",
  },
  {
    title: "Nudges",
    description: "Guide users to collaborate in all the right places",
    imageSrc: "/images/launch-kit/nudges.png",
    imageAlt: "Velt in-app nudges pattern",
  },
  {
    title: "Announcement Notifications",
    description:
      "Notify your users about new features through your notifications inbox",
    imageSrc: "/images/launch-kit/announcement-notifications.png",
    imageAlt: "Velt in-app announcement notifications pattern",
  },
];

export function LaunchKitTabs({ figmaUrl }: LaunchKitTabsProps) {
  const [active, setActive] = useState<TabId>("off-app");
  const cards = active === "off-app" ? OFF_APP_CARDS : IN_APP_CARDS;

  return (
    <section
      className="flex flex-col items-center bg-black full-bleed-bg px-6 lg:px-20 py-20 lg:py-[120px]"
    >
      <div className="flex flex-col items-center w-full max-w-[1280px]" style={{ gap: 48 }}>
        <TabRail active={active} onChange={setActive} />
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: 32,
          }}
        >
          {cards.map((card) => (
            <LaunchKitCard key={card.title} card={card} figmaUrl={figmaUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TabRail({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Launch kit asset types"
      className="flex items-center justify-center"
      style={{ gap: 40 }}
    >
      <TabButton id="off-app" label="Off App" active={active} onChange={onChange} />
      <TabButton id="in-app" label="In App" active={active} onChange={onChange} />
    </div>
  );
}

function TabButton({
  id,
  label,
  active,
  onChange,
}: {
  id: TabId;
  label: string;
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  const isActive = active === id;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => onChange(id)}
      className="font-urbanist font-semibold"
      style={{
        position: "relative",
        background: "transparent",
        border: 0,
        padding: "12px 4px",
        color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
        fontSize: 18,
        lineHeight: 1.2,
        cursor: "pointer",
        transition: "color 200ms ease",
      }}
    >
      {label}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 2,
          background: "#FFCD2E",
          borderRadius: 2,
          opacity: isActive ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
      />
    </button>
  );
}

function LaunchKitCard({
  card,
  figmaUrl,
}: {
  card: CardDef;
  figmaUrl: string;
}) {
  return (
    <article
      className="flex flex-col"
      style={{
        background: "#fff",
        borderRadius: 32,
        overflow: "hidden",
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #f1f1f3 0%, #ffffff 100%)",
          aspectRatio: "16 / 9",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.imageSrc}
          alt={card.imageAlt}
          className="pointer-events-none select-none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
            padding: 28,
          }}
        />
      </div>
      <div
        className="flex flex-col"
        style={{ padding: "32px 36px 36px", gap: 16 }}
      >
        <h3
          className="font-urbanist font-bold"
          style={{
            color: "#111",
            fontSize: "clamp(22px, 2.2vw, 28px)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {card.title}
        </h3>
        <p
          className="font-urbanist"
          style={{
            color: "#6b6b73",
            fontSize: 16,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {card.description}
        </p>
        <div style={{ marginTop: 8 }}>
          <a
            href={figmaUrl}
            target="_blank"
            rel="noopener"
            className="font-urbanist font-semibold"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#000",
              color: "#fff",
              fontSize: 15,
              lineHeight: 1,
              height: 44,
              padding: "0 22px",
              borderRadius: 999,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Get Figma File
            <ExternalLinkIcon size={16} stroke="#fff" strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </article>
  );
}
