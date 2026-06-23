// Dynamic per-integration page driven by Sanity. One integrationPage document
// per route, composed of generic marketing sections (PageHero, TrustedLogos,
// IntegrationConnectSection, Security, testimonial carousel, FAQ, Get Started)
// that mirror the live velt.dev/integrations/{slug} layout. Adding a new
// integration is a matter of running scripts/seed-integrations.mjs — no new
// code required.

import { notFound } from "next/navigation";

import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { AllLibraries } from "@/components/library/AllLibraries";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { sharedFAQ } from "@/components/library/shared-content";
import { IntegrationConnectSection } from "@/components/integration/IntegrationConnectSection";
import {
  allIntegrationCards,
  integrationTabs,
} from "@/components/integration/shared-content";
import {
  getAllIntegrationSlugs,
  getIntegrationPageBySlug,
} from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

export const revalidate = 60;

type IntegrationPageDoc = {
  name: string;
  slug: string;
  category?: string;
  heroTitle?: string;
  tagline?: string;
  description?: string;
  logo?: string;
  demoUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
  codeSnippet?: string;
  connectBody?: string;
  connectImage?: string;
  payloadBody?: string;
  payloadImage?: string;
  unifiedBody?: string;
  unifiedImage?: string;
};

export async function generateStaticParams() {
  const slugs = await getAllIntegrationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getIntegrationPageBySlug(
    slug,
  )) as IntegrationPageDoc | null;
  if (!doc) return {};
  const title = doc.heroTitle ?? `Integrate Velt in ${doc.name}`;
  const description = doc.description ?? doc.tagline;
  return {
    title,
    description,
    alternates: { canonical: `/integrations/${slug}` },
    openGraph: {
      url: `https://velt.dev/integrations/${slug}`,
      title: `${title} | Velt`,
      description,
    },
  };
}

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getIntegrationPageBySlug(
    slug,
  )) as IntegrationPageDoc | null;

  if (!doc) {
    notFound();
  }

  const ownPath = `/integrations/${slug}`;
  const otherIntegrations = allIntegrationCards.filter(
    (card) => card.learnMoreHref !== ownPath,
  );

  const faqItems: FaqEntry[] = sharedFAQ;

  const heroHeading = doc.heroTitle ?? `Integrate Velt in ${doc.name}`;
  const heroSubheading =
    doc.description ?? `Write 6 lines to integrate Velt in ${doc.name}`;

  const pageUrl = `${SITE_URL}/integrations/${slug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Integrations", url: `${SITE_URL}/integrations` },
    { name: doc.name, url: pageUrl },
  ]);
  const webpage = buildWebPageSchema({
    name: `${heroHeading} | Velt`,
    description: heroSubheading,
    url: pageUrl,
    breadcrumb,
  });

  return (
    <>
      <JsonLd id="ld-integration-webpage" data={webpage} />
      <JsonLd id="ld-integration-breadcrumb" data={breadcrumb} />
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated
          heading={heroHeading}
          subheading={heroSubheading}
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

        <IntegrationConnectSection
          name={doc.name}
          connectBody={doc.connectBody}
          connectImage={doc.connectImage}
          payloadBody={doc.payloadBody}
          payloadImage={doc.payloadImage}
          unifiedBody={doc.unifiedBody}
          unifiedImage={doc.unifiedImage}
        />

        <Security />

        <FeatureCustomerCarousel />

        <LibraryFAQ items={faqItems} />

        <GetStartedSteps />

        <AllLibraries
          heading="Explore Other Integrations"
          items={otherIntegrations}
          tabs={integrationTabs}
          hideLearnMore={false}
        />

        <Footer />
      </div>
    </>
  );
}
