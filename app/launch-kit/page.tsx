// Velt Launch Kit landing page — replica of https://velt.dev/launch-kit using
// this repo's design system.
//
// Composition mirrors the /libraries and /integrations pattern:
//   Dark hero (PageHero, decorated)
//     → 4 × white FeatureImageCard sections (email / social / website /
//       sticker sheet templates) — each shows a screenshot and links out
//       to the shared Figma community file
//     → Customer launches band (FeatureImageCard with the YC-style "Check
//       out assets from our customer launches" SVG)
//     → FAQ → GetStartedSteps → Footer
//
// All four template CTAs point to the same Figma community file (the live
// site re-uses one Figma URL for every "Get Figma file" button). The hero
// secondary CTA mirrors the live page's "Get Free API Key" → console.

import type { Metadata } from "next";

import { Footer } from "@/components/home/Footer";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { PageHero } from "@/components/library/PageHero";
import { FeatureImageCard } from "@/components/feature/FeatureImageCard";
import { CustomerLaunches } from "@/components/launch-kit/CustomerLaunches";
import { LibraryFAQ } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const FIGMA_KIT_URL =
  "https://www.figma.com/community/file/1402312407969730816";
const CONSOLE_URL = "https://console.velt.dev/";

const LAUNCH_KIT_DESCRIPTION =
  "Get pre-built launch assets for your collaboration features. Includes email templates, social media graphics, website designs and more.";

const LAUNCH_KIT_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Launch Kit", url: `${SITE_URL}/launch-kit` },
]);

const LAUNCH_KIT_WEBPAGE = buildWebPageSchema({
  name: "Launch Kit | Velt",
  description: LAUNCH_KIT_DESCRIPTION,
  url: `${SITE_URL}/launch-kit`,
  breadcrumb: LAUNCH_KIT_BREADCRUMB,
});

export const metadata: Metadata = {
  title: "Launch Kit",
  description: LAUNCH_KIT_DESCRIPTION,
  alternates: {
    canonical: "/launch-kit",
  },
  openGraph: {
    url: "https://velt.dev/launch-kit",
    title: "Launch Kit | Velt",
    description: LAUNCH_KIT_DESCRIPTION,
  },
};

export default function LaunchKitPage() {
  return (
    <>
      <JsonLd id="ld-launch-kit-webpage" data={LAUNCH_KIT_WEBPAGE} />
      <JsonLd id="ld-launch-kit-breadcrumb" data={LAUNCH_KIT_BREADCRUMB} />
      <div
        className="relative bg-black text-white font-urbanist w-full overflow-x-hidden"
      >
        <PageHero
          decorated
          heading="Velt Launch Kit"
          subheading="Get a head start on your launch of collaborative features with pre-built assets"
          primaryCta={{
            label: "View all assets",
            href: FIGMA_KIT_URL,
            newTab: true,
          }}
          secondaryCta={{
            label: "Get free API key",
            href: CONSOLE_URL,
            newTab: true,
          }}
        />

        <FeatureImageCard
          topAccent
          heading="Email template"
          subheading="Our professionally designed email template clearly communicates the value of your new features"
          viewDocsCta={{
            label: "Get Figma file",
            href: FIGMA_KIT_URL,
            newTab: true,
          }}
          imageSrc="/images/launch-kit/email-template.png"
          imageAlt="Velt launch email template"
          imageWidth={1100}
          imageHeight={600}
        />

        <FeatureImageCard
          heading="Social media template"
          subheading="Easy ready-to-post assets for your social media accounts"
          viewDocsCta={{
            label: "Get Figma file",
            href: FIGMA_KIT_URL,
            newTab: true,
          }}
          imageSrc="/images/launch-kit/social-media-template.png"
          imageAlt="Velt launch social media template"
          imageWidth={1100}
          imageHeight={600}
        />

        <FeatureImageCard
          heading="Website template"
          subheading="Don't fret on your launch site, just follow our template"
          viewDocsCta={{
            label: "Get Figma file",
            href: FIGMA_KIT_URL,
            newTab: true,
          }}
          imageSrc="/images/launch-kit/website-template.png"
          imageAlt="Velt launch website template"
          imageWidth={1100}
          imageHeight={600}
        />

        <FeatureImageCard
          heading="DIY sticker sheet"
          subheading="Build your own launch graphics with our pre-built Figma components"
          viewDocsCta={{
            label: "Get Figma file",
            href: FIGMA_KIT_URL,
            newTab: true,
          }}
          imageSrc="/images/launch-kit/sticker-sheet.png"
          imageAlt="Velt launch DIY sticker sheet"
          imageWidth={1100}
          imageHeight={600}
        />

        <CustomerLaunches
          ctaLabel="View all assets"
          ctaHref={FIGMA_KIT_URL}
        />

        <LibraryFAQ items={sharedFAQ} />

        <GetStartedSteps />

        <Footer />
      </div>
    </>
  );
}
