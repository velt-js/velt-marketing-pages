// /use-case/[slug] detail — reskinned to the new editorial theme (.vlp / .vfp).
// One Sanity `useCasePage` document per route. The document is mapped to the
// typed UseCaseSpokeContent (lib/use-case-v2/to-content.tsx) and rendered by
// UseCaseSpokeView, which reuses the homepage Nav/Footer and the feature-page
// logo strip, testimonial wall, enterprise strip, FAQ, and final CTA. The
// show* toggles carry over via the mapper. JSON-LD + metadata are preserved.

import { notFound } from "next/navigation";

import UseCaseSpokeView from "@/components/use-case-new/UseCaseSpokeView";
import {
  toUseCaseSpokeContent,
  type UseCasePageDoc,
} from "@/lib/use-case-v2/to-content";
import { buildUseCaseLibrariesContent } from "@/components/use-case-new/content";
import {
  getAllLibrariesV2,
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

const BASE_PATH = "/use-case";

// SEO meta-title overrides for use-case slugs whose CMS `metaTitle` is unset and
// whose derived "<heading> | Velt" fallback is too short for search snippets
// (~25 chars). These curated titles land in the 50–60 char sweet spot and take
// precedence so the rendered <title> is deterministic regardless of CMS state.
const USE_CASE_META_TITLE_OVERRIDES: Record<string, string> = {
  analytics: "Collaborative Analytics SDK: Comments & Co-editing | Velt",
  "task-manager": "Collaborative Task Manager SDK: Comments & Sync | Velt",
  sheets: "Collaborative Spreadsheet SDK: Comments & Co-editing | Velt",
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllUseCaseSlugs();
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
}) {
  try {
    const { slug } = await params;
    const doc = (await getUseCasePageBySlug(slug)) as
      | (UseCasePageDoc & { metaTitle?: string; metaDescription?: string; ogImage?: string })
      | null;
    if (!doc) return {};
    const title =
      USE_CASE_META_TITLE_OVERRIDES[slug] ??
      doc.metaTitle ??
      `${doc.hero?.heading ?? ""} | Velt`;
    const description = doc.metaDescription ?? doc.hero?.subheading ?? "";
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
 * Dynamic use-case detail page. Fetches the useCasePage document, maps it to
 * UseCaseSpokeContent, and renders the new-theme view with WebPage,
 * BreadcrumbList, and FAQPage structured data.
 * @param {{ params: Promise<{ slug: string }> }} props Route params.
 * @returns {Promise<JSX.Element>} The rendered use-case detail page.
 */
export default async function UseCaseSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getUseCasePageBySlug(slug)) as
    | (UseCasePageDoc & { metaTitle?: string; metaDescription?: string })
    | null;

  if (!doc?.hero?.heading) notFound();

  const content = toUseCaseSpokeContent(doc);

  // The libraries grid is CMS-driven from the libraryPageV2 collection (the
  // same roster that powers /libraries), so it always reflects every published
  // surface library instead of a static subset.
  if (content.libraries) {
    const libraryRoster = await getAllLibrariesV2();
    content.libraries = buildUseCaseLibrariesContent(libraryRoster);
  }

  const pageUrl = `${SITE_URL}${BASE_PATH}/${slug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Use Cases", url: `${SITE_URL}/use-case` },
    { name: doc.title ?? doc.hero.heading, url: pageUrl },
  ]);
  const webpage = buildWebPageSchema({
    name: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
    description: doc.metaDescription ?? doc.hero.subheading ?? undefined,
    url: pageUrl,
    breadcrumb,
  });
  const faqSchema = buildFaqPageSchemaFromEntries(
    (doc.faq?.items ?? []).map((item) => ({
      question: item?.question ?? "",
      answer: item?.answer ?? "",
    })),
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id="ld-use-case-slug-webpage" data={webpage} />
      <JsonLd id="ld-use-case-slug-breadcrumb" data={breadcrumb} />
      <JsonLd id="ld-use-case-slug-faq" data={faqSchema} />

      <UseCaseSpokeView content={content} />
    </>
  );
}
