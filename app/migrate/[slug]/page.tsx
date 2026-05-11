// Dynamic per-migration detail page driven by Sanity. One migrationPage
// document per route, e.g. /migrate/liveblocks. Composition mirrors the
// Figma 2026 template (HqWIZdR6ISJmaG2n4o3gr8 node 217:1642):
//   1. Hero (PageHero, decorated)
//   2. TrustedLogos (chrome)
//   3. MigrationStepsPanel (the "Migrate in 3 Steps" dark panel)
//   4. UseCaseSections (3 alternating feature rows — chip-less)
//   5. FeatureCustomerCarousel (heading/subheading override; default cards)
//   6. LibraryFAQ
//   7. Footer

import { notFound } from "next/navigation";

import { Footer } from "@/components/home/Footer";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";

import { MigrationStepsPanel } from "@/components/migrate/MigrationStepsPanel";
import { FeatureExtensiveVisual } from "@/components/migrate/FeatureExtensiveVisual";
import {
  UseCaseSections,
  type UseCaseSectionDoc,
} from "@/components/use-case/UseCaseSections";
import {
  getAllMigrationSlugs,
  getMigrationPageBySlug,
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

type MigrationPageDoc = {
  title: string;
  slug: string;
  competitorLogo?: string;
  hero: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    decorated?: boolean;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
  };
  migrationSteps?: {
    headingPrefix: string;
    headingHighlight: string;
    subtitle?: string;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
    step1: { title: string; description: string };
    step2: { title: string; description: string };
    step3: { title: string; description: string };
    testimonial?: {
      name?: string;
      role?: string;
      avatar?: string;
      quotePrefix?: string;
      quoteHighlight?: string;
      quoteSuffix?: string;
    };
  };
  featureRows?: UseCaseSectionDoc[];
  carousel?: { heading?: string; subheading?: string };
  showTrustedLogos?: boolean;
  showCustomerCarousel?: boolean;
  showFaq?: boolean;
  faq?: { items?: FaqEntry[] };
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

export async function generateStaticParams() {
  const slugs = await getAllMigrationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getMigrationPageBySlug(slug)) as MigrationPageDoc | null;
  if (!doc) return {};
  const cleanMetaTitle = doc.metaTitle?.replace(/\s+[—|]\s+Velt\s*$/i, "");
  const title = cleanMetaTitle ?? doc.hero.heading;
  const description = doc.metaDescription ?? doc.hero.subheading;
  return {
    title,
    description,
    alternates: { canonical: `/migrate/${slug}` },
    openGraph: {
      url: `https://velt.dev/migrate/${slug}`,
      title: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
      description,
      ...(doc.ogImage ? { images: [{ url: doc.ogImage }] } : {}),
    },
  };
}

export default async function MigrateSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getMigrationPageBySlug(slug)) as MigrationPageDoc | null;

  if (!doc?.hero?.heading) notFound();

  const showTrustedLogos = doc.showTrustedLogos !== false;
  const showCustomerCarousel = doc.showCustomerCarousel !== false;
  const showFaq = doc.showFaq !== false;

  const pageUrl = `${SITE_URL}/migrate/${slug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Migrate", url: `${SITE_URL}/migrate` },
    { name: doc.title ?? doc.hero.heading, url: pageUrl },
  ]);
  const webpage = buildWebPageSchema({
    name: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
    description: doc.metaDescription ?? doc.hero.subheading,
    url: pageUrl,
    breadcrumb,
  });

  return (
    <>
      <JsonLd id="ld-migrate-webpage" data={webpage} />
      <JsonLd id="ld-migrate-breadcrumb" data={breadcrumb} />
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

        {showTrustedLogos ? <TrustedLogos /> : null}

        {doc.migrationSteps ? (
          <MigrationStepsPanel
            {...doc.migrationSteps}
            competitorLogoSrc={doc.competitorLogo}
            competitorName={doc.title}
          />
        ) : null}

        {doc.featureRows && doc.featureRows.length > 0 ? (
          <UseCaseSections
            sections={doc.featureRows.map((row) => ({
              ...row,
              columnHeight: 480,
              // The "Extensive Features" row's visual is a composed comment
              // mock with cursor name-tags — built as a React component
              // (see FeatureExtensiveVisual) instead of a flat PNG so the
              // transparent regions render correctly.
              customVisual:
                row._key === "row-extensive-features" ? (
                  <FeatureExtensiveVisual />
                ) : undefined,
            }))}
          />
        ) : null}

        {showCustomerCarousel ? (
          <FeatureCustomerCarousel
            heading={doc.carousel?.heading}
            subheading={doc.carousel?.subheading}
          />
        ) : null}

        <section data-getstarted>
          {showFaq ? <LibraryFAQ items={doc.faq?.items ?? []} /> : null}
          <GetStartedSteps />
          <Footer />
        </section>
      </div>
    </>
  );
}
