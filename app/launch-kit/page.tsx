// /launch-kit — Velt Launch Kit landing page, restyled onto the new editorial
// .vlp design system. Composition: light hero, a tabbed card grid (Off App /
// In App) of pre-built launch assets, a trusted-by logo marquee, an FAQ
// accordion, and a dark conversion CTA banner, inside the shared Nav/Footer.

import LandingShell from "@/components/landing-new/LandingShell";
import LandingHero from "@/components/landing-new/LandingHero";
import LaunchKitTabs from "@/components/landing-new/LaunchKitTabs";
import LogoStripBand from "@/components/landing-new/LogoStripBand";
import LandingFaq from "@/components/landing-new/LandingFaq";
import CtaBanner from "@/components/home-new/CtaBanner";
import { sharedFAQ } from "@/components/library/shared-content";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const FIGMA_KIT_URL = "https://www.figma.com/community/file/1402312407969730816";
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

/**
 * The Velt Launch Kit landing page.
 * @returns {JSX.Element} The rendered page.
 */
export default function LaunchKitPage() {
  return (
    <>
      <JsonLd id="ld-launch-kit-webpage" data={LAUNCH_KIT_WEBPAGE} />
      <JsonLd id="ld-launch-kit-breadcrumb" data={LAUNCH_KIT_BREADCRUMB} />
      <JsonLd id="ld-launch-kit-faq" data={LAUNCH_KIT_FAQ_SCHEMA} />

      <LandingShell>
        <LandingHero
          eyebrow="Launch kit"
          heading="Velt Launch Kit"
          subheading="Get a head start on your launch of collaborative features with pre-built assets."
          primaryCta={{ label: "View all assets", href: FIGMA_KIT_URL, newTab: true }}
          secondaryCta={{ label: "Get free API key", href: CONSOLE_URL, newTab: true }}
        />

        <LaunchKitTabs figmaUrl={FIGMA_KIT_URL} />

        <LogoStripBand alt label="Teams that launched collaboration with Velt" />

        <LandingFaq heading="Launch kit questions" items={sharedFAQ} />

        <CtaBanner
          dark
          kicker="Ship your launch"
          heading="Grab the full launch kit and ship your collaboration features."
          ctaLabel="View all assets"
          ctaHref={FIGMA_KIT_URL}
          ctaExternal
          microcopy="Free Figma community file."
        />
      </LandingShell>
    </>
  );
}
