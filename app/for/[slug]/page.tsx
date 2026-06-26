// Dynamic v1 Solutions (vertical) page driven by Sanity (`solutionPageV1`).
// Rendered at /for/<slug> by the shared SolutionPageView. Answers "does
// Velt understand MY business" in the vertical's own artifact nouns.

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/app/_seo/JsonLd";
import {
  FALLBACK_META_DESCRIPTION,
  buildPageMetadata,
  slugToTitle,
} from "@/app/_seo/page-metadata";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchema,
  buildWebPageSchema,
} from "@/app/_seo/schema";

import SolutionPageView from "@/components/solutions-new/SolutionPageView";
import { toSolutionPageContent } from "@/lib/solutions/to-content";
import { getAllSolutionSlugs, getSolutionPageBySlug } from "@/sanity/queries";

export const revalidate = 60;

const BASE_PATH = "/for";

export async function generateStaticParams() {
  try {
    const slugs = await getAllSolutionSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("generateStaticParams failed", error);
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
    const doc = await getSolutionPageBySlug(slug);
    // Even when the Sanity document is missing, still emit a canonical and a
    // sane fallback title so the page never ships without core SEO tags. The
    // component below keeps its notFound() behavior independently.
    if (!doc) {
      return buildPageMetadata({
        title: `Velt for ${slugToTitle(slug)}`,
        description: FALLBACK_META_DESCRIPTION,
        path: `${BASE_PATH}/${slug}`,
      });
    }
    const title = doc.metaTitle ?? `${doc.hero?.title ?? doc.title} | Velt`;
    const description = doc.metaDescription ?? doc.hero?.secondary ?? "";
    return buildPageMetadata({
      title,
      description,
      path: `${BASE_PATH}/${slug}`,
      ogImage: doc.ogImage ?? undefined,
    });
  } catch (error) {
    console.error("generateMetadata failed", error);
    return {};
  }
}

/**
 * Dynamic v1 solutions page. Fetches the solutionPageV1 document, maps it to
 * SolutionPageContent, and renders SolutionPageView with WebPage,
 * BreadcrumbList, and FAQPage structured data.
 * @param {{ params: Promise<{ slug: string }> }} props Route params.
 * @returns {Promise<JSX.Element>} The rendered solutions page.
 */
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getSolutionPageBySlug(slug);
  if (!doc) notFound();

  const content = toSolutionPageContent(doc);

  const pageUrl = `${SITE_URL}${BASE_PATH}/${slug}`;
  const pageTitle = doc.breadcrumbLabel ?? doc.title ?? doc.hero?.title ?? "";
  const description = doc.metaDescription ?? doc.hero?.secondary ?? "";

  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Solutions", url: `${SITE_URL}/for` },
    { name: pageTitle, url: pageUrl },
  ]);

  const webPage = buildWebPageSchema({
    name: doc.metaTitle ?? pageTitle,
    description,
    url: pageUrl,
    breadcrumb,
  });

  const faqSchema = buildFaqPageSchema(
    (content.faq.items ?? []).map((item) => ({ question: item.q, answer: item.a })),
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id={`ld-solution-${slug}-webpage`} data={webPage} />
      <JsonLd id={`ld-solution-${slug}-breadcrumb`} data={breadcrumb} />
      <JsonLd id={`ld-solution-${slug}-faq`} data={faqSchema} />

      <SolutionPageView content={content} />
    </>
  );
}
