// Dynamic per-feature page driven by Sanity. One featurePage document per
// route. Composition mirrors /libraries/[slug] but the middle of the page
// is a polymorphic `sections[]` array (bentos, integrations rows, customer
// testimonial grids) that renders in document order via FeatureSections.

import { notFound } from "next/navigation";

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { CustomerUI } from "@/components/home/CustomerUI";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import {
  FeatureSections,
  type FeatureSectionDoc,
} from "@/components/feature/FeatureSections";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { CommentsDemoSidebar } from "@/components/feature/CommentsDemoSidebar";
import {
  getAllFeatureSlugs,
  getFeaturePageBySlug,
} from "@/sanity/queries";

export const revalidate = 60;

type CtaLink = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

type FeaturePageDoc = {
  title: string;
  slug: string;
  hero: {
    heading: string;
    subheading?: string;
    decorated?: boolean;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
  };
  sections: FeatureSectionDoc[];
  showSecurity?: boolean;
  showTrustedLogos?: boolean;
  showCustomerStories?: boolean;
  getStartedSteps: { step1PackageName: string };
  faq?: { items?: FaqEntry[] };
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

export async function generateStaticParams() {
  const slugs = await getAllFeatureSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getFeaturePageBySlug(slug)) as FeaturePageDoc | null;
  if (!doc) return {};
  return {
    title: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
    description: doc.metaDescription ?? doc.hero.subheading,
    openGraph: doc.ogImage ? { images: [{ url: doc.ogImage }] } : undefined,
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getFeaturePageBySlug(slug)) as FeaturePageDoc | null;

  // 404 on missing/incomplete docs. A featurePage with no hero or no sections
  // is partial draft state from an editor and should not render — keeps
  // pre-existing/in-progress docs from blocking the static build.
  if (!doc || !doc.hero?.heading || !doc.sections || doc.sections.length === 0) {
    notFound();
  }

  const showTrustedLogos = doc.showTrustedLogos ?? true;
  const showSecurity = doc.showSecurity ?? true;
  const showCustomerStories = doc.showCustomerStories ?? true;
  const faqItems: FaqEntry[] = [...(doc.faq?.items ?? []), ...sharedFAQ];

  return (
    <ScaleWrapper>
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated={doc.hero.decorated ?? true}
          heading={doc.hero.heading}
          subheading={doc.hero.subheading}
          primaryCta={doc.hero.primaryCta}
          secondaryCta={doc.hero.secondaryCta}
        />

        {slug === "comments" ? <CommentsDemoSidebar /> : null}

        {showTrustedLogos ? <TrustedLogos /> : null}

        <FeatureSections sections={doc.sections} />

        {showCustomerStories ? <CustomerUI /> : null}

        {showSecurity ? <Security /> : null}

        <FeatureCustomerCarousel />

        <LibraryFAQ items={faqItems} />

        <GetStartedSteps step1PackageName={doc.getStartedSteps.step1PackageName} />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
