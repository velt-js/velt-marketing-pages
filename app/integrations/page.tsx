// Main /integrations landing page. Mirrors the /libraries page composition
// (PageHero → TrustedLogos → AllLibraries grid → Security → testimonials →
// FAQ → GetStartedSteps → Footer). Reuses the AllLibraries grid with
// `hideLearnMore` since integration cards only link to docs.

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
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

export const metadata = {
  title: "Integrations | Velt",
  description:
    "Connect Velt with the tools your team already uses — Slack, Discord, Microsoft Teams, HubSpot, Zapier, Sendgrid, Resend, Segment and more.",
};

export default function IntegrationsLandingPage() {
  return (
    <ScaleWrapper>
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
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
          hideLearnMore
        />

        <Security />

        <FeatureCustomerCarousel />

        <LibraryFAQ items={sharedFAQ} />

        <GetStartedSteps />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
