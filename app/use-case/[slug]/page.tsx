// Dynamic per-use-case detail page driven by Sanity. One useCasePage
// document per route. Composition mirrors /features/[slug] — the
// middle of the page is a polymorphic `sections[]` array (use-case
// bentos + library support) rendered in document order via
// UseCaseSections. Standard chrome (CustomerUI / Security /
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

import {
  UseCaseSections,
  type UseCaseSectionDoc,
} from "@/components/use-case/UseCaseSections";
import {
  getAllUseCaseSlugs,
  getUseCasePageBySlug,
} from "@/sanity/queries";

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
    heading: string;
    subheading?: string;
    decorated?: boolean;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
  };
  sections: UseCaseSectionDoc[];
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
  return {
    title: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
    description: doc.metaDescription ?? doc.hero.subheading,
    openGraph: doc.ogImage ? { images: [{ url: doc.ogImage }] } : undefined,
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

  const showCustomerUI = doc.showCustomerUI !== false;
  const showSecurity = doc.showSecurity !== false;
  const showCustomerCarousel = doc.showCustomerCarousel !== false;

  return (
    <ScaleWrapper>
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated={doc.hero.decorated !== false}
          heading={doc.hero.heading}
          subheading={doc.hero.subheading}
          primaryCta={doc.hero.primaryCta}
          secondaryCta={doc.hero.secondaryCta}
        />

        <TrustedLogos />

        <UseCaseSections sections={doc.sections ?? []} />

        {showCustomerUI ? <CustomerUI /> : null}
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
