"use client";

import { useState } from "react";

import SectionHead from "./SectionHead";

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
    title: "Design System",
    description:
      "Kickstart your launch with our ready-to-use design system components.",
    imageSrc: "/images/launch-kit/design-system.png",
    imageAlt: "Velt launch design system",
  },
  {
    title: "Email Template",
    description:
      "Our professionally designed email template clearly communicates the value of your new features.",
    imageSrc: "/images/launch-kit/email-template.png",
    imageAlt: "Velt launch email template",
  },
  {
    title: "Social Media Template",
    description: "Easy ready-to-post assets for your social media accounts.",
    imageSrc: "/images/launch-kit/social-media-template.png",
    imageAlt: "Velt launch social media template",
  },
  {
    title: "Website Template",
    description: "Don't fret on your launch site; just follow our template.",
    imageSrc: "/images/launch-kit/website-template.png",
    imageAlt: "Velt launch website template",
  },
  {
    title: "DIY Sticker Sheet",
    description: "Build your own launch graphics with our pre-built Figma components.",
    imageSrc: "/images/launch-kit/sticker-sheet.png",
    imageAlt: "Velt launch DIY sticker sheet",
  },
];

const IN_APP_CARDS: CardDef[] = [
  {
    title: "Indicator",
    description: "Subtly bring attention to your new power features.",
    imageSrc: "/images/launch-kit/indicator.png",
    imageAlt: "Velt in-app indicator pattern",
  },
  {
    title: "Tour Guide",
    description: "Guide users through the new collaboration experience in your product.",
    imageSrc: "/images/launch-kit/tour-guide.png",
    imageAlt: "Velt in-app tour guide pattern",
  },
  {
    title: "User Action Checklist",
    description: "Give users a list of actions to try out.",
    imageSrc: "/images/launch-kit/user-action-checklist.png",
    imageAlt: "Velt in-app user action checklist pattern",
  },
  {
    title: "Nudges",
    description: "Guide users to collaborate in all the right places.",
    imageSrc: "/images/launch-kit/nudges.png",
    imageAlt: "Velt in-app nudges pattern",
  },
  {
    title: "Announcement Notifications",
    description: "Notify your users about new features through your notifications inbox.",
    imageSrc: "/images/launch-kit/announcement-notifications.png",
    imageAlt: "Velt in-app announcement notifications pattern",
  },
];

/** External-link glyph for the per-card Figma CTA. */
function ExternalLinkIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
      <path d="M11 13l9 -9" />
      <path d="M15 4h5v5" />
    </svg>
  );
}

/**
 * Two-tab card grid for /launch-kit, restyled onto the .vlp design system.
 * "Off App" lists the four marketing-asset templates, "In App" lists the five
 * in-product UX patterns. Each card links to the shared Figma community file.
 * @param {LaunchKitTabsProps} props The Figma file URL.
 * @returns {JSX.Element} The launch kit tabs section.
 */
export default function LaunchKitTabs({ figmaUrl }: LaunchKitTabsProps) {
  const [active, setActive] = useState<TabId>("off-app");
  const cards = active === "off-app" ? OFF_APP_CARDS : IN_APP_CARDS;

  return (
    <section className="lp-section">
      <div className="lp-wrap">
        <SectionHead
          eyebrow="Launch assets"
          heading="Everything you need to launch your new features"
          subheading="Pre-built marketing assets for off-app promotion and in-product UX patterns that drive adoption."
        />

        <div className="lp-tabs" role="tablist" aria-label="Launch kit asset types">
          <button
            type="button"
            role="tab"
            className="lp-tab"
            aria-selected={active === "off-app"}
            onClick={() => setActive("off-app")}
          >
            Off app
          </button>
          <button
            type="button"
            role="tab"
            className="lp-tab"
            aria-selected={active === "in-app"}
            onClick={() => setActive("in-app")}
          >
            In app
          </button>
        </div>

        <div className="lp-bento">
          {cards.map((card) => (
            <article className="lp-card hcard" key={card.title}>
              <div className="lp-card-media lp-card-media--contain">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.imageSrc} alt={card.imageAlt} />
              </div>
              <div className="lp-card-body">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="lp-card-cta">
                  <a
                    className="lp-card-link hl"
                    href={figmaUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    Get Figma file
                    <ExternalLinkIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
