// /use-case — Figma node 178:58944 in HqWIZdR6ISJmaG2n4o3gr8.
// Static page; copy + assets from Figma. Sections from top:
// PageHero (decorated) → TrustedLogos → UseCaseGrid (white, 2×5
// cards + data-outcomes) → Security → LibraryFAQ → GetStartedSteps
// → Footer. Nav theme switches automatically: data-outcomes on
// UseCaseGrid flips white; FeatureCustomerCarousel's existing
// data-getstarted is absent here, so we add a wrapping
// section[data-getstarted] around the dark tail (FAQ + GetStarted +
// Footer) so the Nav flips back to dark at the FAQ.

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { Security } from "@/components/home/Security";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ } from "@/components/library/LibraryFAQ";

import { UseCaseGrid } from "@/components/use-case/UseCaseGrid";
import { useCaseFaq } from "@/components/use-case/use-case-faq";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const USE_CASE_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Use Cases", url: `${SITE_URL}/use-case` },
]);

const USE_CASE_WEBPAGE = buildWebPageSchema({
  name: "Velt Use Cases: Where Will You Integrate Velt?",
  description:
    "Explore 10+ use cases — Video Editor, Form Builder, Analytics, Task Manager, Sheets, Presentation, Documentation, Code IDE, No-code Tool, Session Replay.",
  url: `${SITE_URL}/use-case`,
  breadcrumb: USE_CASE_BREADCRUMB,
});

export const metadata = {
  title: "Velt Use Cases: Where Will You Integrate Velt? | Velt",
  description:
    "Explore 10+ use cases — Video Editor, Form Builder, Analytics, Task Manager, Sheets, Presentation, Documentation, Code IDE, No-code Tool, Session Replay.",
  alternates: {
    canonical: "/use-case",
  },
  openGraph: {
    url: "https://velt.dev/use-case",
    title: "Velt Use Cases: Where Will You Integrate Velt? | Velt",
    description:
      "Explore 10+ use cases — Video Editor, Form Builder, Analytics, Task Manager, Sheets, Presentation, Documentation, Code IDE, No-code Tool, Session Replay.",
  },
};

export default function UseCasePage() {
  return (
    <ScaleWrapper>
      <JsonLd id="ld-use-case-webpage" data={USE_CASE_WEBPAGE} />
      <JsonLd id="ld-use-case-breadcrumb" data={USE_CASE_BREADCRUMB} />
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated
          heading="Where will you integrate Velt?"
          subheading="Explore 10+ use cases"
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <TrustedLogos />

        <UseCaseGrid />

        <Security />

        <section data-getstarted>
          <LibraryFAQ items={useCaseFaq} />
          <GetStartedSteps />
          <Footer />
        </section>
      </div>
    </ScaleWrapper>
  );
}
