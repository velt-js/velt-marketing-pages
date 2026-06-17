// Dynamic v10-template feature page driven by Sanity (`featurePageV2`).
// Rendered at /new-features/<slug> by the shared FeaturePageView. Distinct
// from the legacy /(features)/[slug] route (v1 `featurePage`); the two never
// collide because v2 pages live under the /new-features/ prefix.

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/app/_seo/JsonLd";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchema,
  buildWebPageSchema,
} from "@/app/_seo/schema";

import FeaturePageView from "@/components/feature-new/FeaturePageView";
import { toFeaturePageContent } from "@/lib/feature-v2/to-content";
import { getAllFeatureV2Slugs, getFeaturePageV2BySlug } from "@/sanity/queries";

export const revalidate = 60;

const BASE_PATH = "/new-features";

export async function generateStaticParams() {
  try {
    const slugs = await getAllFeatureV2Slugs();
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
    const doc = await getFeaturePageV2BySlug(slug);
    if (!doc) return {};
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
 * Dynamic v10 feature page. Fetches the featurePageV2 document, maps it to
 * FeaturePageContent, and renders FeaturePageView with WebPage, BreadcrumbList,
 * and FAQPage structured data.
 * @param {{ params: Promise<{ slug: string }> }} props Route params.
 * @returns {Promise<JSX.Element>} The rendered feature page.
 */
export default async function NewFeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await getFeaturePageV2BySlug(slug);
  if (!doc) notFound();

  const content = toFeaturePageContent(doc);

  const pageUrl = `${SITE_URL}${BASE_PATH}/${slug}`;
  const pageTitle = doc.breadcrumbLabel ?? doc.title ?? doc.hero?.title ?? "";
  const description = doc.metaDescription ?? doc.hero?.secondary ?? "";

  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Features", url: `${SITE_URL}/features` },
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

      <JsonLd id={`ld-${slug}-webpage`} data={webPage} />
      <JsonLd id={`ld-${slug}-breadcrumb`} data={breadcrumb} />
      <JsonLd id={`ld-${slug}-faq`} data={faqSchema} />

      <FeaturePageView content={content} />
    </>
  );
}
