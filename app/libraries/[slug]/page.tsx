// Per-library page at /libraries/{slug}, serving two generations from one
// route (mirrors app/(features)/[slug]/page.tsx):
//   - libraryPageV2 (the v2 .vfp template) rendered by SpokeView. This is the
//     canonical home for the redesigned library pages.
//   - libraryPage (v1) — the legacy dark pages with no v2 equivalent (e.g. yjs,
//     nivo-charts) rendered by the original composition, wrapped in the legacy
//     FixedNavLayout.
// Lookup is v2-then-v1 so a v2 document always wins its slug.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FixedNavLayout } from "@/components/home/FixedNavLayout";
import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryDemoStage } from "@/components/library/LibraryDemoStage";
import {
  LibraryBento,
  type LibraryBentoCard,
  type LibraryBentoCta,
} from "@/components/library/LibraryBento";
import { LibraryGetStartedCallout } from "@/components/library/LibraryGetStartedCallout";
import { AllLibraries } from "@/components/library/AllLibraries";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import {
  allLibraryCards,
  libraryTabs,
  sharedFAQ,
} from "@/components/library/shared-content";
import { illustrationRegistry } from "@/components/library/illustrations/registry";
import type { IllustrationKey } from "@/components/library/illustrations/keys";
import SpokeView from "@/components/integrations-new/SpokeView";
import { toSpokeContent } from "@/lib/integrations-v2/to-spoke-content";
import type { RawSpoke, RosterRow } from "@/lib/integrations-v2/to-spoke-content";
import {
  getAllLibrarySlugs,
  getAllLibraryV2Slugs,
  getAllLibrariesV2,
  getLibraryPageBySlug,
  getLibraryPageV2BySlug,
} from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildHowToSchema,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

export const revalidate = 60;

type CtaLink = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

type LibraryPageDoc = {
  title: string;
  slug: string;
  hero: {
    heading: string;
    subheading?: string;
    decorated?: boolean;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
  };
  demoStage: {
    label: string;
    demoUrl: string;
    githubUrl: string;
    previewSrc: string;
  };
  bento: {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    viewDocsCta?: CtaLink;
    primaryCta?: CtaLink;
    rowHeights?: number[] | null;
    cards: Array<{
      title: string;
      description: string;
      illustrationKey?: IllustrationKey | null;
      imageSrc?: string | null;
    }>;
  };
  inlineTestimonial?: {
    name?: string;
    role?: string;
    quote?: string;
    avatarSrc?: string;
  };
  getStartedCallout: {
    heading: string;
    body: string;
    viewDocsHref: string;
    getApiKeyHref: string;
    codeImageAlt?: string;
    codeImage?: { url: string; width: number; height: number } | null;
    codeSnippet?: { code?: string; language?: string } | null;
  };
  getStartedSteps: { step1PackageName: string };
  faq?: { items?: FaqEntry[] };
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

function resolveIllustration(key?: IllustrationKey | null): ReactNode {
  if (!key) return null;
  const Component = illustrationRegistry[key];
  if (!Component) return null;
  return <Component />;
}

// LibraryBento wants strict {label, href, newTab?} CTAs; the CMS CtaLink has
// all fields optional. Drop CTAs missing either half.
function toBentoCta(cta?: CtaLink): LibraryBentoCta | undefined {
  if (!cta?.label || !cta?.href) return undefined;
  return { label: cta.label, href: cta.href, newTab: cta.newTab };
}

export async function generateStaticParams() {
  try {
    const [v2Slugs, v1Slugs] = await Promise.all([
      getAllLibraryV2Slugs(),
      getAllLibrarySlugs(),
    ]);
    const slugs = new Set<string>([...v2Slugs, ...v1Slugs]);
    return [...slugs].map((slug) => ({ slug }));
  } catch (error) {
    console.error("libraries generateStaticParams failed", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    // v2 first.
    const v2 = (await getLibraryPageV2BySlug(slug)) as RawSpoke | null;
    if (v2) {
      const title = v2.metaTitle ?? `${v2.heroTitle ?? v2.name} | Velt`;
      const description = v2.metaDescription ?? v2.heroSecondary ?? "";
      return buildPageMetadata({ title, description, path: `/libraries/${slug}` });
    }

    // v1 fallback.
    const doc = (await getLibraryPageBySlug(slug)) as LibraryPageDoc | null;
    if (!doc) return {};
    const title = doc.metaTitle ?? `${doc.hero.heading} | Velt`;
    const description = doc.metaDescription ?? doc.hero.subheading ?? "";
    return buildPageMetadata({
      title,
      description,
      path: `/libraries/${slug}`,
      ogImage: doc.ogImage ?? undefined,
    });
  } catch (error) {
    console.error("libraries generateMetadata failed", error);
    return {};
  }
}

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ---- v2 first ----
  const v2 = (await getLibraryPageV2BySlug(slug)) as RawSpoke | null;
  if (v2) {
    const roster = (await getAllLibrariesV2()) as RosterRow[];
    const content = toSpokeContent(v2, roster ?? []);

    const pageUrl = `${SITE_URL}/libraries/${slug}`;
    const breadcrumb = buildBreadcrumbList([
      { name: "Home", url: SITE_URL },
      { name: "Libraries", url: `${SITE_URL}/libraries` },
      { name: content.name, url: pageUrl },
    ]);
    const webpage = buildWebPageSchema({
      name: content.metaTitle ?? `${content.heroTitle} | Velt`,
      description: content.metaDescription ?? content.heroSecondary,
      url: pageUrl,
      breadcrumb,
    });
    const faqSchema = buildFaqPageSchemaFromEntries(content.faq);
    const howTo =
      content.kind === "surface"
        ? buildHowToSchema({
            name: `Add Velt to ${content.name}`,
            steps: [
              `Install the SDK and the surface adapter: npm install ${content.setupPackages ?? "@veltdev/react"}`,
              "Wrap your app in VeltProvider with your API key and set the document.",
              `Mount the Velt primitive on ${content.name}, and the CRDT adapter for co-editing.`,
            ],
          })
        : null;

    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <JsonLd id={`ld-library-${slug}-webpage`} data={webpage} />
        <JsonLd id={`ld-library-${slug}-breadcrumb`} data={breadcrumb} />
        <JsonLd id={`ld-library-${slug}-faq`} data={faqSchema} />
        {howTo ? <JsonLd id={`ld-library-${slug}-howto`} data={howTo} /> : null}

        <SpokeView content={content} />
      </>
    );
  }

  // ---- v1 fallback (legacy dark library page) ----
  const doc = (await getLibraryPageBySlug(slug)) as LibraryPageDoc | null;
  if (!doc) {
    notFound();
  }

  const bentoCards: LibraryBentoCard[] = doc.bento.cards.map((card) => ({
    title: card.title,
    description: card.description,
    illustration: resolveIllustration(card.illustrationKey),
    imageSrc: card.imageSrc ?? undefined,
  }));

  const ownPath = `/libraries/${slug}`;
  const otherLibraries = allLibraryCards.filter(
    (card) => card.learnMoreHref !== ownPath,
  );

  const faqItems: FaqEntry[] = [...(doc.faq?.items ?? []), ...sharedFAQ];

  const pageUrl = `${SITE_URL}/libraries/${slug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Libraries", url: `${SITE_URL}/libraries` },
    { name: doc.title ?? doc.hero.heading, url: pageUrl },
  ]);
  const webpage = buildWebPageSchema({
    name: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
    description: doc.metaDescription ?? doc.hero.subheading,
    url: pageUrl,
    breadcrumb,
  });
  const faqSchema = buildFaqPageSchemaFromEntries(faqItems);

  return (
    <FixedNavLayout>
      <JsonLd id="ld-library-webpage" data={webpage} />
      <JsonLd id="ld-library-breadcrumb" data={breadcrumb} />
      <JsonLd id="ld-library-faq" data={faqSchema} />
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated={doc.hero.decorated ?? true}
          heading={doc.hero.heading}
          subheading={doc.hero.subheading}
          primaryCta={doc.hero.primaryCta}
          secondaryCta={doc.hero.secondaryCta}
        />

        <section
          className="flex justify-center w-full bg-black full-bleed-bg"
          style={{ padding: "0 80px" }}
        >
          <LibraryDemoStage
            demoUrl={doc.demoStage.demoUrl}
            githubUrl={doc.demoStage.githubUrl}
            previewSrc={doc.demoStage.previewSrc}
            label={doc.demoStage.label}
            iconSrc={`/images/home/libraries/icons/${slug}.png`}
          />
        </section>

        <div style={{ marginTop: 80 }}>
          <TrustedLogos />
        </div>

        <LibraryBento
          topAccent
          heading={doc.bento.heading}
          subheading={doc.bento.subheading}
          eyebrow={doc.bento.eyebrow}
          viewDocsCta={toBentoCta(doc.bento.viewDocsCta)}
          primaryCta={toBentoCta(doc.bento.primaryCta)}
          cards={bentoCards}
          rowHeights={doc.bento.rowHeights ?? undefined}
          testimonial={
            doc.inlineTestimonial?.quote
              ? {
                  name: doc.inlineTestimonial.name,
                  role: doc.inlineTestimonial.role,
                  quote: doc.inlineTestimonial.quote,
                  avatarSrc: doc.inlineTestimonial.avatarSrc,
                }
              : undefined
          }
        />

        <LibraryGetStartedCallout
          heading={doc.getStartedCallout.heading}
          body={doc.getStartedCallout.body}
          viewDocsHref={doc.getStartedCallout.viewDocsHref}
          getApiKeyHref={doc.getStartedCallout.getApiKeyHref}
          codeImage={
            doc.getStartedCallout.codeImage
              ? {
                  src: doc.getStartedCallout.codeImage.url,
                  alt: doc.getStartedCallout.codeImageAlt ?? "Setup code",
                  width: doc.getStartedCallout.codeImage.width,
                  height: doc.getStartedCallout.codeImage.height,
                }
              : undefined
          }
          codeSnippet={
            doc.getStartedCallout.codeSnippet?.code
              ? {
                  code: doc.getStartedCallout.codeSnippet.code,
                  language: doc.getStartedCallout.codeSnippet.language,
                }
              : undefined
          }
        />

        <Security />

        <AllLibraries
          heading="Explore Other Libraries"
          items={otherLibraries}
          tabs={libraryTabs}
        />

        <FeatureCustomerCarousel />

        <LibraryFAQ items={faqItems} />

        <GetStartedSteps step1PackageName={doc.getStartedSteps.step1PackageName} />

        <Footer />
      </div>
    </FixedNavLayout>
  );
}
