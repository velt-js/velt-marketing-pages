// /pricing — Figma node 217:5662 in HqWIZdR6ISJmaG2n4o3gr8.
// Static page (no Sanity); composition mirrors the live velt.dev/pricing
// page. Tier copy + comparison-table content live in
// components/pricing/pricing-data.ts.

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ } from "@/components/library/LibraryFAQ";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { PricingYCCallout } from "@/components/pricing/PricingYCCallout";
import { PricingComparisonTable } from "@/components/pricing/PricingComparisonTable";
import { pricingFAQ } from "@/components/pricing/pricing-faq";

export const revalidate = 60;

export const metadata = {
  title: "Velt Pricing: Collaboration SDK Plans | Velt",
  description:
    "Pay only for meaningful collaboration usage. Hacker (free), Growth, and Enterprise plans for Velt's collaboration SDK.",
};

export default function PricingPage() {
  return (
    <ScaleWrapper>
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated
          heading="Choose your plan"
          subheading="Pay only for meaningful collaboration usage."
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <PricingTiers />

        <PricingYCCallout />

        <TrustedLogos />

        <PricingComparisonTable />

        <FeatureCustomerCarousel />

        <LibraryFAQ items={pricingFAQ} />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
