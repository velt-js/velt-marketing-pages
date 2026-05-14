// Velt Launch Kit landing page.
//
// Composition:
//   Dark hero (PageHero, decorated)
//     → LaunchKitTabs — dark section with "Off App" / "In App" tab rail
//       and a 2-col grid of white cards. Off App = 4 marketing-asset
//       templates (email / social / website / sticker sheet). In App = 5
//       in-product UX patterns (indicator / tour guide / user action
//       checklist / nudges / announcement notifications).
//     → Customer launches marquee band
//     → FAQ → GetStartedSteps → Footer
//
// Every card CTA points to the same Figma community file; the hero
// secondary CTA mirrors the live page's "Get Free API Key" → console.

import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { Footer } from "@/components/home/Footer";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { PageHero } from "@/components/library/PageHero";
import { CustomerLaunches } from "@/components/launch-kit/CustomerLaunches";
import { LaunchKitTabs } from "@/components/launch-kit/LaunchKitTabs";
import { LibraryFAQ } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
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

const LAUNCH_KIT_FAQ_SCHEMA = buildFaqPageSchemaFromEntries(sharedFAQ);

export const metadata = buildPageMetadata({
  title: "Launch Kit",
  description: LAUNCH_KIT_DESCRIPTION,
  path: "/launch-kit",
  ogImage: "/og/launch-kit.png",
});

export default function LaunchKitPage() {
  return (
    <>
      <JsonLd id="ld-launch-kit-webpage" data={LAUNCH_KIT_WEBPAGE} />
      <JsonLd id="ld-launch-kit-breadcrumb" data={LAUNCH_KIT_BREADCRUMB} />
      <JsonLd id="ld-launch-kit-faq" data={LAUNCH_KIT_FAQ_SCHEMA} />
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

        <LaunchKitTabs figmaUrl={FIGMA_KIT_URL} />

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
