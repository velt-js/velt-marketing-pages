// Reskinned per-integration detail page at /integrations/{slug} (e.g.
// /integrations/slack), driven by the EXISTING `integrationPage` Sanity
// collection and rendered in the new editorial .vfp theme by the shared
// IntegrationDetailView. Same content as before (hero + connect/payload/unified
// narrative + get-started snippet + FAQ), new skin. Adding a new integration is
// still a matter of seeding an integrationPage doc — no new code required.

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import IntegrationDetailView from "@/components/integrations-new/IntegrationDetailView";
import type {
  IntegrationDetailContent,
  IntegrationRelated,
} from "@/components/integrations-new/content";
import { allIntegrationCards } from "@/components/integration/shared-content";
import {
  getAllIntegrationSlugs,
  getIntegrationPageBySlug,
} from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { sharedFAQ } from "@/components/library/shared-content";

export const revalidate = 60;

const MAX_RELATED = 8;

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
  try {
    const slugs = await getAllIntegrationSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("integrations generateStaticParams failed", error);
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
    const doc = (await getIntegrationPageBySlug(slug)) as IntegrationPageDoc | null;
    if (!doc) return {};
    const title = doc.heroTitle ?? `Integrate Velt in ${doc.name}`;
    const description = doc.description ?? doc.tagline ?? "";
    return buildPageMetadata({
      title,
      description,
      path: `/integrations/${slug}`,
    });
  } catch (error) {
    console.error("integrations generateMetadata failed", error);
    return {};
  }
}

/**
 * Build the category-filtered "related integrations" list for a tool.
 * @param {string} slug The current integration slug.
 * @param {string} [category] The current integration category.
 * @returns {IntegrationRelated[]} Related cards (same category first).
 */
function buildRelated(slug: string, category?: string): IntegrationRelated[] {
  try {
    const ownPath = `/integrations/${slug}`;
    const others = allIntegrationCards.filter(
      (card) => card.learnMoreHref !== ownPath,
    );
    const sameCategory = others.filter((card) => card.category === category);
    const pool = sameCategory.length > 0 ? sameCategory : others;
    return pool.slice(0, MAX_RELATED).map((card) => ({
      name: card.name,
      slug: (card.learnMoreHref ?? "").replace(/^\/integrations\//, ""),
      logoSrc: card.logoSrc,
      category: card.category,
    }));
  } catch (error) {
    console.error("buildRelated failed", error);
    return [];
  }
}

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getIntegrationPageBySlug(slug)) as IntegrationPageDoc | null;

  if (!doc) {
    notFound();
  }

  const content: IntegrationDetailContent = {
    name: doc.name,
    slug,
    category: doc.category,
    heroTitle: doc.heroTitle,
    tagline: doc.tagline,
    description: doc.description,
    logo: doc.logo,
    demoUrl: doc.demoUrl,
    githubUrl: doc.githubUrl,
    docsUrl: doc.docsUrl,
    codeSnippet: doc.codeSnippet,
    connectBody: doc.connectBody,
    payloadBody: doc.payloadBody,
    payloadImage: doc.payloadImage,
    unifiedBody: doc.unifiedBody,
    unifiedImage: doc.unifiedImage,
    related: buildRelated(slug, doc.category),
  };

  const heroTitle = doc.heroTitle ?? `Integrate Velt in ${doc.name}`;
  const description = doc.description ?? doc.tagline;
  const pageUrl = `${SITE_URL}/integrations/${slug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Integrations", url: `${SITE_URL}/integrations` },
    { name: doc.name, url: pageUrl },
  ]);
  const webpage = buildWebPageSchema({
    name: `${heroTitle} | Velt`,
    description,
    url: pageUrl,
    breadcrumb,
  });
  const faqSchema = buildFaqPageSchemaFromEntries(sharedFAQ);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id={`ld-integration-${slug}-webpage`} data={webpage} />
      <JsonLd id={`ld-integration-${slug}-breadcrumb`} data={breadcrumb} />
      <JsonLd id={`ld-integration-${slug}-faq`} data={faqSchema} />

      <IntegrationDetailView content={content} />
    </>
  );
}
