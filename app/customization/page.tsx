// /customization — Figma node 294:19676 in HqWIZdR6ISJmaG2n4o3gr8.
// Static page; copy and assets pulled from Figma. Sections from top:
// PageHero (decorated) → TrustedLogos → WaysToCustomizeHeader (dark
// 3×2 anchor cards) → CustomizationStack (white wrapper holding 6
// deep-dive cards + the BuildYourOwnUICTA banner) → CustomerUI ("How
// Customers Use Velt", reused from homepage) → ExamplesCarousel →
// FeatureCustomerCarousel → GetStartedSteps → Footer.
//
// Nav theme switch: data-outcomes lives on CustomizationStack (flips
// nav white the moment the white panel hits the strip);
// FeatureCustomerCarousel already carries data-getstarted (flips back
// to dark).

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { CustomerUI } from "@/components/home/CustomerUI";

import { WaysToCustomizeHeader } from "@/components/customization/WaysToCustomizeHeader";
import { CustomizationStack } from "@/components/customization/CustomizationStack";
import { BuildYourOwnUICTA } from "@/components/customization/BuildYourOwnUICTA";
import { ExamplesCarousel } from "@/components/customization/ExamplesCarousel";
import { LayoutCustomization } from "@/components/customization/ways/LayoutCustomization";
import { CustomCSSStyling } from "@/components/customization/ways/CustomCSSStyling";
import { TemplateVariables } from "@/components/customization/ways/TemplateVariables";
import { ConditionalRendering } from "@/components/customization/ways/ConditionalRendering";
import { CustomFunctionality } from "@/components/customization/ways/CustomFunctionality";
import { ComponentVariants } from "@/components/customization/ways/ComponentVariants";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const CUSTOMIZATION_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Customization", url: `${SITE_URL}/customization` },
]);

const CUSTOMIZATION_WEBPAGE = buildWebPageSchema({
  name: "Velt Customization: Themes, Components, APIs",
  description:
    "Velt components can look and function the way you want — fully customizable layout, CSS, conditional rendering, and APIs.",
  url: `${SITE_URL}/customization`,
  breadcrumb: CUSTOMIZATION_BREADCRUMB,
});

export const metadata = {
  title: "Velt Customization: Themes, Components, APIs",
  description:
    "Velt components can look and function the way you want — fully customizable layout, CSS, conditional rendering, and APIs.",
  alternates: {
    canonical: "/customization",
  },
  openGraph: {
    url: "https://velt.dev/customization",
    title: "Velt Customization: Themes, Components, APIs | Velt",
    description:
      "Velt components can look and function the way you want — fully customizable layout, CSS, conditional rendering, and APIs.",
  },
};

export default function CustomizationPage() {
  return (
    <ScaleWrapper>
      <JsonLd id="ld-customization-webpage" data={CUSTOMIZATION_WEBPAGE} />
      <JsonLd id="ld-customization-breadcrumb" data={CUSTOMIZATION_BREADCRUMB} />
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated
          heading="Fully Customizable Collaboration Experiences"
          subheading="Velt components can look and function the way you want"
          primaryCta={{
            label: "View Docs",
            href: "https://docs.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{
            label: "Sneak Peek",
            href: "#way-1",
            leadingIcon: (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M8 5v14l11-7z"
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          }}
        />

        <TrustedLogos />

        <WaysToCustomizeHeader />

        <CustomizationStack>
          <LayoutCustomization />
          <CustomCSSStyling />
          <TemplateVariables />
          <ConditionalRendering />
          <CustomFunctionality />
          <ComponentVariants />
          <BuildYourOwnUICTA />
        </CustomizationStack>

        <CustomerUI />

        <ExamplesCarousel />

        <FeatureCustomerCarousel />

        <GetStartedSteps />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
