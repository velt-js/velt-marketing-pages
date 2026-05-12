// Shared renderer for migration pages backed by a Sanity `migrationPage`
// document. Used by:
//   - app/migrate/[slug]/page.tsx — canonical /migrate/{slug} routes
//   - app/migrate-from-liveblocks-to-velt/page.tsx — legacy SEO landing
//   - app/migrate-from-cord-to-velt/page.tsx — legacy SEO landing
// To shadow another migration page at a different URL, render
// <MigrationPageBody sanitySlug="..." pageUrlPath="..." /> from a new route.

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
import { getMigrationPageBySlug } from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

type CtaLink = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

export type MigrationPageDoc = {
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

export type MigrationPageBodyProps = {
  /** Sanity slug to fetch (e.g. "liveblocks", "cord"). */
  sanitySlug: string;
  /**
   * URL path under SITE_URL used for canonical/breadcrumb/JSON-LD. Defaults
   * to `/migrate/${sanitySlug}` — pass an override when a duplicate route
   * renders the same content at a different URL (e.g.
   * "migrate-from-liveblocks-to-velt").
   */
  pageUrlPath?: string;
};

export async function MigrationPageBody({
  sanitySlug,
  pageUrlPath,
}: MigrationPageBodyProps) {
  const doc = (await getMigrationPageBySlug(sanitySlug)) as MigrationPageDoc | null;

  if (!doc?.hero?.heading) notFound();

  const showTrustedLogos = doc.showTrustedLogos !== false;
  const showCustomerCarousel = doc.showCustomerCarousel !== false;
  const showFaq = doc.showFaq !== false;

  const pageUrl = `${SITE_URL}/${pageUrlPath ?? `migrate/${sanitySlug}`}`;
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
