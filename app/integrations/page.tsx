// Main /integrations landing page. Mirrors the /libraries page composition
// (PageHero → TrustedLogos → AllLibraries grid → Security → testimonials →
// FAQ → GetStartedSteps → Footer). Reuses the AllLibraries grid with
// `hideLearnMore` since integration cards only link to docs.

import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { AllLibraries } from "@/components/library/AllLibraries";
import { LibraryFAQ } from "@/components/library/LibraryFAQ";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { sharedFAQ } from "@/components/library/shared-content";
import {
  allIntegrationCards,
  integrationTabs,
} from "@/components/integration/shared-content";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

const INTEGRATIONS_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Integrations", url: `${SITE_URL}/integrations` },
]);

const INTEGRATIONS_WEBPAGE = buildWebPageSchema({
  name: "Integrations | Velt",
  description:
    "Connect Velt with the tools your team already uses — Slack, Discord, Microsoft Teams, HubSpot, Zapier, Sendgrid, Resend, Segment and more.",
  url: `${SITE_URL}/integrations`,
  breadcrumb: INTEGRATIONS_BREADCRUMB,
});

const INTEGRATIONS_FAQ_SCHEMA = buildFaqPageSchemaFromEntries(sharedFAQ);

export const metadata = buildPageMetadata({
  title: "Integrations",
  description:
    "Connect Velt with the tools your team already uses — Slack, Discord, Microsoft Teams, HubSpot, Zapier, Sendgrid, Resend, Segment and more.",
  path: "/integrations",
});

export default function IntegrationsLandingPage() {
  return (
    <>
      <JsonLd id="ld-integrations-webpage" data={INTEGRATIONS_WEBPAGE} />
      <JsonLd id="ld-integrations-breadcrumb" data={INTEGRATIONS_BREADCRUMB} />
      <JsonLd id="ld-integrations-faq" data={INTEGRATIONS_FAQ_SCHEMA} />
      <div
        className="relative bg-black text-white font-urbanist w-full overflow-x-hidden"
      >
        <PageHero
          decorated
          heading="Integrations with the tools you already use"
          subheading="Plug Velt into your messaging, storage, CRM, analytics, workflow and email stack."
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <div style={{ marginTop: 80 }}>
          <TrustedLogos />
        </div>

        <AllLibraries
          heading="All Integrations"
          subheading="One integration unlocks notifications, payload transforms, and a unified customer experience."
          items={allIntegrationCards}
          tabs={integrationTabs}
          topAccent
        />

        <Security />

        <FeatureCustomerCarousel />

        <LibraryFAQ items={sharedFAQ} />

        <GetStartedSteps />

        <Footer />
      </div>
    </>
  );
}
