// /liveblocks-alternative — competitor-specific landing page that mirrors
// /comparison structure 1:1. Same component tree (PageHero → TrustedLogos
// → SixReasonsHeader → SixReasonsSection wrapping the six reasons +
// ComparePricingCTA → FeatureCustomerCarousel → GetStartedSteps → Footer),
// with text content swapped to call out Liveblocks by name via optional
// override props on each reason component. The generic /comparison page
// is unchanged because every new prop carries a default that preserves
// the original copy.

import { Footer } from "@/components/home/Footer";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";

import { SixReasonsHeader } from "@/components/comparison/SixReasonsHeader";
import { SixReasonsSection } from "@/components/comparison/SixReasonsSection";
import { ComparePricingCTA } from "@/components/comparison/ComparePricingCTA";
import { ProductMaturity } from "@/components/comparison/reasons/ProductMaturity";
import { ImplementationCost } from "@/components/comparison/reasons/ImplementationCost";
import { Scalability } from "@/components/comparison/reasons/Scalability";
import { UserExperience } from "@/components/comparison/reasons/UserExperience";
import { Security } from "@/components/comparison/reasons/Security";
import { Support } from "@/components/comparison/reasons/Support";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const COMPETITOR_LABEL = "LIVEBLOCKS";

const LIVEBLOCKS_ALT_DESCRIPTION =
  "Velt is the #1 alternative to Liveblocks. Velt is used by popular SaaS products on their flagship products. On the other hand, Liveblocks is used on experimental projects or conference websites.";

const LIVEBLOCKS_ALT_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Liveblocks Alternative", url: `${SITE_URL}/liveblocks-alternative` },
]);

const LIVEBLOCKS_ALT_WEBPAGE = buildWebPageSchema({
  name: "Velt: Alternative to Liveblocks",
  description: LIVEBLOCKS_ALT_DESCRIPTION,
  url: `${SITE_URL}/liveblocks-alternative`,
  breadcrumb: LIVEBLOCKS_ALT_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Velt: Alternative to Liveblocks",
  description: LIVEBLOCKS_ALT_DESCRIPTION,
  path: "/liveblocks-alternative",
  ogImage: "/og/liveblocks-alternative.png",
});

export default function LiveblocksAlternativePage() {
  return (
    <>
      <JsonLd id="ld-liveblocks-alt-webpage" data={LIVEBLOCKS_ALT_WEBPAGE} />
      <JsonLd id="ld-liveblocks-alt-breadcrumb" data={LIVEBLOCKS_ALT_BREADCRUMB} />
      <div
        className="relative bg-black text-white font-urbanist w-full overflow-x-hidden"
      >
        <PageHero
          decorated
          heading="Forget Liveblocks. Get Velt."
          subheading="The best way to build collaborative features and boost your engagement"
          primaryCta={{
            label: "Get Started",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{
            label: "Request Demo",
            href: "/book-demo",
          }}
        />

        <TrustedLogos />

        <SixReasonsHeader competitor="Liveblocks" />

        <SixReasonsSection>
          <ProductMaturity
            competitorLabel={COMPETITOR_LABEL}
            competitorBareBonesSubtitle="Bare-bones functionality created over only the past year"
            competitorJustReactSubtitle="Liveblocks only provides simple React UI templates with no behavioral logic"
          />
          <ImplementationCost competitorLabel={COMPETITOR_LABEL} />
          <Scalability competitorLabel={COMPETITOR_LABEL} />
          <UserExperience
            competitorLabel={COMPETITOR_LABEL}
            competitorSubtitle="Default Liveblocks SDK components that lack polish and functionality"
          />
          <Security competitorLabel={COMPETITOR_LABEL} />
          <Support competitorLabel={COMPETITOR_LABEL} />
          <ComparePricingCTA
            competitorLabel="Liveblocks"
            subheading="Velt charges for real collaboration usage. Liveblocks charges for active documents, including ones with no collaboration."
          />
        </SixReasonsSection>

        <FeatureCustomerCarousel />

        <GetStartedSteps />

        <Footer />
      </div>
    </>
  );
}
