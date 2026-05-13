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

type BenefitDoc = {
  _key?: string;
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  imageSrc?: string | null;
  useCases?: Array<{
    _key?: string;
    name?: string | null;
    link?: string | null;
    imageSrc?: string | null;
  }> | null;
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
  /** Framer-shaped per-page content. Each benefit becomes a feature
   *  row in the white middle section. See `mapBenefitsToSections`. */
  benefits?: BenefitDoc[] | null;
  showLibrarySection?: boolean;
  showCustomerUI?: boolean;
  showSecurity?: boolean;
  showCustomerCarousel?: boolean;
  faq?: { items?: FaqEntry[] };
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

// Eyebrow fallback when a benefit has no `tag` set — matches the
// Build/Review/Approve pattern the existing seed (Video Editor) used.
// 4th slot handles the upper bound of the schema array (max 4 benefits).
const DEFAULT_BENEFIT_EYEBROWS = ["Build", "Review", "Approve", "Scale"];

function mapBenefitsToSections(
  benefits?: BenefitDoc[] | null,
): UseCaseSectionDoc[] {
  if (!benefits || benefits.length === 0) return [];
  return benefits.map((b, i) => ({
    _key: b._key ?? `benefit-row-${i}`,
    eyebrow: b.tag ?? DEFAULT_BENEFIT_EYEBROWS[i] ?? "",
    heading: b.title ?? "",
    description: b.description ?? "",
    features: (b.useCases ?? [])
      .filter((uc): uc is { _key?: string; name?: string | null; link?: string | null } => Boolean(uc?.name))
      .map((uc, j) => ({
        _key: uc._key ?? `${b._key ?? `benefit-${i}`}-chip-${j}`,
        label: uc.name as string,
        href: uc.link ?? null,
      })),
    image: b.imageSrc ?? null,
    imagePosition: i % 2 === 0 ? "right" : "left",
  }));
}

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
          // Prefer per-page benefits[] (Nathan's manual port content)
          // over the legacy sections[] scaffold which is identical
          // across most of the 13 ported docs. Fall back to sections[]
          // when benefits[] is absent so the Video Editor seed and any
          // future legacy-only docs still render.
          const mappedBenefitRows = mapBenefitsToSections(doc.benefits);
          const rows = mappedBenefitRows.length > 0
            ? mappedBenefitRows
            : (doc.sections ?? []);
          return <UseCaseSections sections={rows} />;
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
