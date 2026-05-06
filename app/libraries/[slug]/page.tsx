// Dynamic per-library page driven by Sanity. One libraryPage document per
// route, composed of the same generic library components used everywhere
// else on this site. Adding a new library is therefore a matter of running
// scripts/seed-library-<slug>.mjs — no new code required.

import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
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
import {
  getAllLibrarySlugs,
  getLibraryPageBySlug,
} from "@/sanity/queries";

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
    accentFragment?: string;
    accentColor?: string;
    avatarSrc?: string;
  };
  securityTestimonial?: {
    name?: string;
    role?: string;
    quote?: string;
    accentFragment?: string;
    accentColor?: string;
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

// LibraryBento expects strict {label, href, newTab?} for its CTAs while
// the CMS-typed CtaLink has all fields optional. Drop CTAs that don't
// have both halves populated.
function toBentoCta(cta?: CtaLink): LibraryBentoCta | undefined {
  if (!cta?.label || !cta?.href) return undefined;
  return { label: cta.label, href: cta.href, newTab: cta.newTab };
}

export async function generateStaticParams() {
  const slugs = await getAllLibrarySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getLibraryPageBySlug(slug)) as LibraryPageDoc | null;
  if (!doc) return {};
  return {
    title: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
    description: doc.metaDescription ?? doc.hero.subheading,
    openGraph: doc.ogImage ? { images: [{ url: doc.ogImage }] } : undefined,
  };
}

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
    (card) => card.learnMoreHref !== ownPath
  );

  const faqItems: FaqEntry[] = [
    ...(doc.faq?.items ?? []),
    ...sharedFAQ,
  ];

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

        <section
          className="flex justify-center w-full bg-black full-bleed-bg"
          style={{ padding: "0 80px" }}
        >
          <LibraryDemoStage
            demoUrl={doc.demoStage.demoUrl}
            githubUrl={doc.demoStage.githubUrl}
            previewSrc={doc.demoStage.previewSrc}
            label={doc.demoStage.label}
            iconSrc={`/images/home/libraries/icons/${
              ({ reactflow: "react-flow" } as Record<string, string>)[slug] ?? slug
            }.png`}
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

        <GetStartedSteps
          step1PackageName={doc.getStartedSteps.step1PackageName}
        />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
