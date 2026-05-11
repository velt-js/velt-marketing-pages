// Dynamic per-use-case detail page driven by Sanity. One useCasePage
// document per route. Composition mirrors the Figma 2026 template —
// middle of the page is a stack of 2-column feature rows (Build /
// Review / Approve), followed by a fixed `AllLibraries` block (data
// from components/library/shared-content.ts, gated on
// `showLibrarySection`). Standard chrome (CustomerUI / Security /
// CustomerCarousel / FAQ / GetStartedSteps / Footer) lives outside
// the array as toggleable fixed blocks.

import { notFound } from "next/navigation";

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { CustomerUI } from "@/components/home/CustomerUI";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { AllLibraries } from "@/components/library/AllLibraries";
import {
  allLibraryCards,
  libraryTabs,
} from "@/components/library/shared-content";

import {
  UseCaseSections,
  type UseCaseSectionDoc,
} from "@/components/use-case/UseCaseSections";
import {
  getAllUseCaseSlugs,
  getUseCasePageBySlug,
} from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

export const revalidate = 60;

type CtaLink = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

type UseCasePageDoc = {
  title: string;
  slug: string;
  hero: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    decorated?: boolean;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
  };
  sections: UseCaseSectionDoc[];
  showLibrarySection?: boolean;
  showCustomerUI?: boolean;
  showSecurity?: boolean;
  showCustomerCarousel?: boolean;
  faq?: { items?: FaqEntry[] };
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

export async function generateStaticParams() {
  const slugs = await getAllUseCaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getUseCasePageBySlug(slug)) as UseCasePageDoc | null;
  if (!doc) return {};
  const title = doc.metaTitle ?? `${doc.hero.heading} | Velt`;
  const description = doc.metaDescription ?? doc.hero.subheading;
  return {
    title,
    description,
    alternates: { canonical: `/use-case/${slug}` },
    openGraph: {
      url: `https://velt.dev/use-case/${slug}`,
      title,
      description,
      ...(doc.ogImage ? { images: [{ url: doc.ogImage }] } : {}),
    },
  };
}

export default async function UseCaseSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getUseCasePageBySlug(slug)) as UseCasePageDoc | null;

  if (!doc?.hero?.heading) notFound();

  const showLibrarySection = doc.showLibrarySection !== false;
  const showCustomerUI = doc.showCustomerUI !== false;
  const showSecurity = doc.showSecurity !== false;
  const showCustomerCarousel = doc.showCustomerCarousel !== false;

  const pageUrl = `${SITE_URL}/use-case/${slug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Use Cases", url: `${SITE_URL}/use-case` },
    { name: doc.title ?? doc.hero.heading, url: pageUrl },
  ]);
  const webpage = buildWebPageSchema({
    name: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
    description: doc.metaDescription ?? doc.hero.subheading,
    url: pageUrl,
    breadcrumb,
  });

  return (
    <ScaleWrapper>
      <JsonLd id="ld-use-case-slug-webpage" data={webpage} />
      <JsonLd id="ld-use-case-slug-breadcrumb" data={breadcrumb} />
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated={doc.hero.decorated !== false}
          eyebrow={
            doc.hero.eyebrow ? { label: doc.hero.eyebrow } : undefined
          }
          heading={doc.hero.heading}
          subheading={doc.hero.subheading}
          primaryCta={doc.hero.primaryCta}
          secondaryCta={doc.hero.secondaryCta}
        />

        <TrustedLogos />

        <UseCaseSections sections={doc.sections ?? []} />

        {showCustomerUI ? <CustomerUI /> : null}

        {showLibrarySection ? (
          <AllLibraries
            heading="Works seamlessly with your libraries"
            subheading="Use 8+ purpose-built libraries — or integrate it yourself."
            items={allLibraryCards}
            tabs={libraryTabs}
          />
        ) : null}

        {showSecurity ? <Security /> : null}

        <section data-getstarted>
          {showCustomerCarousel ? <FeatureCustomerCarousel /> : null}
          <LibraryFAQ items={doc.faq?.items ?? []} />
          <GetStartedSteps />
          <Footer />
        </section>
      </div>
    </ScaleWrapper>
  );
}
