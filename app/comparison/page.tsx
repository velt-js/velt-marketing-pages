// /comparison — Figma node 180:72203 in HqWIZdR6ISJmaG2n4o3gr8.
// Static page; copy and assets pulled from Figma. Sections from top:
// PageHero (decorated) → TrustedLogos → SixReasonsHeader (dark anchors)
// → SixReasonsSection (peach card holding the 6 reasons + ComparePricingCTA)
// → FeatureCustomerCarousel → GetStartedSteps → Footer.
//
// Nav theme switch: data-outcomes on SixReasonsSection (flips Nav white when
// the peach card hits the strip); FeatureCustomerCarousel already carries
// data-getstarted (flips Nav back to dark).

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
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

export const metadata = {
  title: "Velt vs Competitors: 6 Reasons Velt Outperforms | Velt",
  description:
    "100% better experience with 90% less code. See why teams choose Velt over alternatives — product maturity, implementation cost, scalability, UX, security, and support.",
};

export default function ComparisonPage() {
  return (
    <ScaleWrapper>
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated
          heading="100% better Experience with 90% less Code"
          subheading="Your developers will do less and your customers will get more!"
          primaryCta={{
            label: "Start Free Trial",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "View Docs", href: "https://docs.velt.dev/", newTab: true }}
        />

        <TrustedLogos />

        <SixReasonsHeader />

        <SixReasonsSection>
          <ProductMaturity />
          <ImplementationCost />
          <Scalability />
          <UserExperience />
          <Security />
          <Support />
          <ComparePricingCTA />
        </SixReasonsSection>

        <FeatureCustomerCarousel />

        <GetStartedSteps />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
