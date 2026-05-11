// Main /libraries landing page — Figma node 1:1118.
// Dark block: PageHero → LibraryDemo → TrustedLogos.
// White block: Explore Other Libraries (heading + tabs + grid in one section)
//   → Enterprise Security (2×2 + cert + Yuri testimonial).
// Dark tail: FAQ → GetStartedSteps (closes with Hope testimonial) → Footer.

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryDemo } from "@/components/library/LibraryDemo";
import { AllLibraries } from "@/components/library/AllLibraries";
import { LibraryFAQ } from "@/components/library/LibraryFAQ";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import {
  allLibraryCards,
  libraryTabs,
  sharedFAQ,
} from "@/components/library/shared-content";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const LIBRARIES_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Libraries", url: `${SITE_URL}/libraries` },
]);

const LIBRARIES_WEBPAGE = buildWebPageSchema({
  name: "Libraries | Velt",
  description:
    "Deep integrations with popular libraries — drop-in collaboration for Tiptap, Lexical, BlockNote, CodeMirror, SlateJS and more.",
  url: `${SITE_URL}/libraries`,
  breadcrumb: LIBRARIES_BREADCRUMB,
});

export const metadata = {
  title: "Libraries | Velt",
  description:
    "Deep integrations with popular libraries — drop-in collaboration for Tiptap, Lexical, BlockNote, CodeMirror, SlateJS and more.",
  alternates: {
    canonical: "/libraries",
  },
  openGraph: {
    url: "https://velt.dev/libraries",
    title: "Libraries | Velt",
    description:
      "Deep integrations with popular libraries — drop-in collaboration for Tiptap, Lexical, BlockNote, CodeMirror, SlateJS and more.",
  },
};

export default function LibrariesLandingPage() {
  return (
    <ScaleWrapper>
      <JsonLd id="ld-libraries-webpage" data={LIBRARIES_WEBPAGE} />
      <JsonLd id="ld-libraries-breadcrumb" data={LIBRARIES_BREADCRUMB} />
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated
          heading="Deep Integrations with Popular Libraries"
          subheading="Velt has 6+ deep integrations with popular libraries"
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <LibraryDemo />

        <div style={{ marginTop: 80 }}>
          <TrustedLogos />
        </div>

        <AllLibraries items={allLibraryCards} tabs={libraryTabs} topAccent />

        <Security />

        <FeatureCustomerCarousel />

        <LibraryFAQ items={sharedFAQ} />

        <GetStartedSteps />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
