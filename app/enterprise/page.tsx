// /enterprise — composed entirely from feature-page template components.
// Hero matches /features/*; the four enterprise pillars live inside a single
// purple tabbed band (EnterpriseTabsSection), replacing the previous four
// stacked sections + hand-rolled illustration.
//
// Anchor IDs land as follows (Nav.tsx dropdown targets):
//   #self-hosting         — inside EnterpriseTabsSection, also default tab
//   #compliance-tools     — inside EnterpriseTabsSection
//   #advanced-encryption  — inside EnterpriseTabsSection
//   #access-controls      — inside EnterpriseTabsSection
//   #support              — on the Support Security-wrapper
//   #security             — on the Security Security-wrapper
//
// The Support and Security sections both reuse the <Security /> component
// (light bento, 2-on-top + 1-wide-on-bottom) with different props. Support
// renders the SLA timeline image as the wide bottom card and skips the
// certification pill; Security renders the cert pill as the wide bottom
// card placement. Card visuals are PNGs under public/images/enterprise/.

import { Footer } from "@/components/home/Footer";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { PageHero } from "@/components/library/PageHero";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { CustomerUI } from "@/components/home/CustomerUI";
import { Security, CardVisual } from "@/components/home/Security";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { EnterpriseTabsSection } from "@/components/enterprise/EnterpriseTabsSection";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const ENTERPRISE_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Enterprise", url: `${SITE_URL}/enterprise` },
]);

const ENTERPRISE_WEBPAGE = buildWebPageSchema({
  name: "Velt for Enterprise — Self-hosting, Compliance & Dedicated Support",
  description:
    "Access self-hosting, custom encryption, dedicated support, and full data control with 99.999% uptime. SOC 2 Type II, HIPAA BAA, and enterprise-grade SLAs.",
  url: `${SITE_URL}/enterprise`,
  breadcrumb: ENTERPRISE_BREADCRUMB,
});

export const metadata = {
  title: "Velt for Enterprise — Self-hosting, Compliance & Dedicated Support",
  description:
    "Access self-hosting, custom encryption, dedicated support, and full data control with 99.999% uptime. SOC 2 Type II, HIPAA BAA, and enterprise-grade SLAs.",
  alternates: {
    canonical: "/enterprise",
  },
  openGraph: {
    url: "https://velt.dev/enterprise",
    title: "Velt for Enterprise — Self-hosting, Compliance & Dedicated Support",
    description:
      "Access self-hosting, custom encryption, dedicated support, and full data control with 99.999% uptime. SOC 2 Type II, HIPAA BAA, and enterprise-grade SLAs.",
  },
};

export default function EnterprisePage() {
  return (
    <>
      <JsonLd id="ld-enterprise-webpage" data={ENTERPRISE_WEBPAGE} />
      <JsonLd id="ld-enterprise-breadcrumb" data={ENTERPRISE_BREADCRUMB} />
      <div
        className="relative bg-black text-white font-urbanist w-full overflow-x-hidden"
      >
        <PageHero
          decorated
          heading="The Collaboration Stack For Enterprise"
          subheading="Access self-hosting, custom encryption, dedicated support, and full data control with 99.999% uptime"
          primaryCta={{ label: "Book Demo", href: "/book-demo" }}
          secondaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
        />

        <TrustedLogos />

        <EnterpriseTabsSection />

        {/* Support — light bento. 2-on-top: Complimentary Design & Implementation
         *  Support (Velt Dev panel mock) and Dedicated CSM (Slack channel mock).
         *  1-wide-on-bottom: Priority Support SLAs (SLA timeline mock anchored
         *  to the right half). No cert pill, no testimonial. */}
        <div id="support" style={{ scrollMarginTop: 100 }}>
          <Security
            heading="Support So Seamless, It Feels In-House"
            subheading="Expert support embedded in your workflow, from onboarding to deployment"
            primaryCta={{ label: "View Docs", href: "https://docs.velt.dev/" }}
            secondaryCta={{ label: "Request Demo", href: "/book-demo" }}
            cards={[
              {
                title: "Complimentary Design & Implementation Support",
                subtitle: "Host your data where you need it",
                visual: <CardVisual src="/images/enterprise/support/design-support.png" />,
              },
              {
                title: "Dedicated CSM",
                subtitle:
                  "Enable Loom-style recording. Your users can record their screen, camera or audio",
                visual: <CardVisual src="/images/enterprise/support/dedicated-csm.png" />,
              },
            ]}
            wideBottomCard={{
              title: "Priority Support SLAs",
              subtitle:
                "Guaranteed response times so your team is never blocked",
              visual: (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/images/enterprise/support/slas.png"
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: "100%",
                    maxWidth: 540,
                    height: "auto",
                    display: "block",
                  }}
                />
              ),
            }}
            certification={null}
            testimonial={null}
          />
        </div>

        {/* Security — light bento. 2-on-top: Multi Region Hosting + Isolated
         *  Server and Data Storage (existing PNG visuals). Bottom: Security
         *  Certification pill with SOC2 + HIPAA badges (rendered by the
         *  Security component's built-in certification slot). */}
        <div id="security" style={{ scrollMarginTop: 100 }}>
          <Security
            paddingTop={80}
            paddingBottom={80}
            heading="Everything You Need to Keep Your Data Safe and Secure"
            subheading="All components come with different modes and setups to fit your app perfectly"
            primaryCta={{ label: "Visit Trust Centre", href: "https://trust.velt.dev/" }}
            secondaryCta={{ label: "Request Demo", href: "/book-demo" }}
            cards={[
              {
                title: "Multi Region Hosting",
                subtitle: "Host your data where you need it",
                visual: <CardVisual src="/images/security/Mutli%20Region%20Hosting.png" />,
              },
              {
                title: "Isolated Server and Data Storage",
                subtitle:
                  "Enable Loom-style recording. Your users can record their screen, camera or audio",
                visual: <CardVisual src="/images/security/Isolated%20Data.png" />,
              },
            ]}
            wideBottomCard={null}
            certification={{
              title: "Security Certification",
              subtitle: "SOC2 Type, HIPAA with BAA",
              badges: [
                {
                  src: "/images/security/badge-soc2.png",
                  alt: "AICPA SOC",
                  width: 90,
                  height: 90,
                },
                {
                  src: "/images/security/badge-hipaa.png",
                  alt: "HIPAA",
                  width: 90,
                  height: 90,
                },
              ],
            }}
            testimonial={null}
          />
        </div>

        <CustomerUI />

        <div
          className="full-bleed-bg"
          style={{ background: "#fff", height: 120 }}
          aria-hidden="true"
        />

        <FeatureCustomerCarousel />

        <section data-getstarted>
          <GetStartedSteps />
          <Footer />
        </section>
      </div>
    </>
  );
}
