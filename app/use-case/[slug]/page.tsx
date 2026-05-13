// Dynamic per-use-case detail page driven by Sanity. One useCasePage
// document per route. Composition mirrors the Figma 2026 template —
// middle of the page is a stack of 2-column feature rows (Build /
// Review / Approve), followed by a fixed `AllLibraries` block (data
// from components/library/shared-content.ts, gated on
// `showLibrarySection`). Standard chrome (CustomerUI / Security /
// CustomerCarousel / FAQ / GetStartedSteps / Footer) lives outside
// the array as toggleable fixed blocks.

import { notFound } from "next/navigation";

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
import { UseCaseProblemSection } from "@/components/use-case/UseCaseProblemSection";
import { UseCaseExampleSection } from "@/components/use-case/UseCaseExampleSection";
import { UseCaseBenefits } from "@/components/use-case/UseCaseBenefits";
import { UseCaseCodeSnippet } from "@/components/use-case/UseCaseCodeSnippet";
import { UseCaseTestimonial } from "@/components/use-case/UseCaseTestimonial";
import { UseCaseActionCallout } from "@/components/use-case/UseCaseActionCallout";
import {
  getAllUseCaseSlugs,
  getUseCasePageBySlug,
} from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

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
  problemSection?: {
    title1?: string | null;
    title2?: string | null;
    items?: Array<{ _key?: string; imageSrc?: string | null; text?: string | null }> | null;
  } | null;
  exampleSection?: {
    videoSrc?: string | null;
    imageSrc?: string | null;
    exampleUrl?: string | null;
    sandboxLink?: string | null;
    docsLink?: string | null;
    featureCountText?: string | null;
    features?: (string | null)[] | null;
  } | null;
  benefits?: Array<{
    _key?: string;
    tag?: string | null;
    title?: string | null;
    description?: string | null;
    imageSrc?: string | null;
    useCases?: Array<{
      _key?: string;
      imageSrc?: string | null;
      name?: string | null;
      link?: string | null;
    }> | null;
  }> | null;
  codeSnippet?: { code?: string | null; language?: string | null } | null;
  testimonial?: {
    quote?: string | null;
    name?: string | null;
    roleAndCompany?: string | null;
    logoSrc?: string | null;
  } | null;
  actionCallout?: {
    text1?: string | null;
    text2?: string | null;
    text3?: string | null;
  } | null;
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
  const description = doc.metaDescription ?? doc.hero.subheading ?? "";
  return buildPageMetadata({
    title,
    description,
    path: `/use-case/${slug}`,
    ogImage: doc.ogImage ?? undefined,
  });
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
  const faqSchema = buildFaqPageSchemaFromEntries(doc.faq?.items ?? []);

  return (
    <>
      <JsonLd id="ld-use-case-slug-webpage" data={webpage} />
      <JsonLd id="ld-use-case-slug-breadcrumb" data={breadcrumb} />
      <JsonLd id="ld-use-case-slug-faq" data={faqSchema} />
      <div
        className="relative bg-black text-white font-urbanist w-full overflow-x-hidden"
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

        {(() => {
          // Legacy sections[] is auto-populated with Build/Review/Approve
          // scaffolds (eyebrow only, no heading). Filter out scaffold-only
          // rows so we don't render empty cards for the ~13 newly-ported
          // pages that haven't filled in row-specific copy.
          const meaningfulSections = (doc.sections ?? []).filter(
            (s) => s?.heading && s?.description,
          );
          const hasLegacy = meaningfulSections.length > 0;
          const hasNewContent =
            !!doc.problemSection ||
            !!doc.exampleSection ||
            !!doc.benefits?.length ||
            !!doc.codeSnippet?.code ||
            !!doc.testimonial ||
            !!doc.actionCallout;

          return (
            <>
              {hasLegacy ? (
                <UseCaseSections sections={meaningfulSections} />
              ) : null}
              {hasNewContent ? (
                <section
                  data-outcomes={hasLegacy ? undefined : ""}
                  className="relative flex flex-col items-center full-bleed-bg w-full"
                  style={{
                    background: "#FFFFFF",
                    ...(hasLegacy
                      ? {}
                      : {
                          borderTopLeftRadius: 52,
                          borderTopRightRadius: 52,
                        }),
                  }}
                >
                  <UseCaseProblemSection {...(doc.problemSection ?? {})} />
                  <UseCaseBenefits benefits={doc.benefits} />
                  <UseCaseExampleSection {...(doc.exampleSection ?? {})} />
                  <UseCaseCodeSnippet {...(doc.codeSnippet ?? {})} />
                  <UseCaseTestimonial {...(doc.testimonial ?? {})} />
                  <UseCaseActionCallout {...(doc.actionCallout ?? {})} />
                </section>
              ) : null}
            </>
          );
        })()}

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
    </>
  );
}
