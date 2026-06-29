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
import {
  FALLBACK_META_DESCRIPTION,
  buildPageMetadata,
  slugToTitle,
} from "@/app/_seo/page-metadata";

export const revalidate = 60;

const BASE_PATH = "/use-case";

// SEO meta-title overrides for use-case slugs whose CMS `metaTitle` is unset (it
// falls back to the short "Velt for <X> | Velt", ~20–32 chars) and is too short
// for search snippets. These curated titles land in the 50–60 char sweet spot
// and take precedence so the rendered <title> is deterministic regardless of
// CMS state. Keep each value between 50 and 60 characters (the " | Velt" suffix
// is included so buildPageMetadata renders it verbatim as an absolute title).
const USE_CASE_META_TITLE_OVERRIDES: Record<string, string> = {
  analytics: "Collaborative Analytics SDK: Comments & Co-editing | Velt",
  "coding-tool": "Collaborative Code IDE SDK: Comments & Co-editing | Velt",
  crm: "Collaborative CRM SDK: Comments, Sync & Notifications | Velt",
  "customer-support": "Collaborative Support SDK: Recording & Live Huddles | Velt",
  docs: "Collaborative Docs SDK: Comments & Real-time Editing | Velt",
  "email-marketing-tool": "Collaborative Email Marketing SDK: Comments & Video | Velt",
  "no-code-tool": "Collaborative No-Code SDK: Comments & Co-editing | Velt",
  presentation: "Collaborative Presentation SDK: Comments & Co-editing | Velt",
  "session-replay-tool": "Collaborative Session Replay SDK: Comments & Tasks | Velt",
  "task-manager": "Collaborative Task Manager SDK: Comments & Sync | Velt",
  sheets: "Collaborative Spreadsheet SDK: Comments & Co-editing | Velt",
  "video-editor": "Collaborative Video Editor SDK: Comments & Approvals | Velt",
};

// SEO meta-description overrides for use-case slugs whose CMS `metaDescription`
// runs past the ~160 char snippet limit (e.g. session-replay-tool at 169). These
// curated descriptions sit in the 120–160 char range and take precedence so the
// rendered <meta name="description"> stays within the search-snippet window.
const USE_CASE_META_DESCRIPTION_OVERRIDES: Record<string, string> = {
  "session-replay-tool":
    "Make your session replay tool collaborative. Add comments, voice notes, and task assignment so teams review and fix bugs faster with Velt SDK.",
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
    // No CMS document resolved for this slug. Rather than returning {} — which
    // drops the title and canonical entirely — emit a canonical and a sane
    // title/description (preferring any curated override). The page component
    // still calls notFound() independently, mirroring app/(features)/[slug].
    if (!doc) {
      return buildPageMetadata({
        title:
          USE_CASE_META_TITLE_OVERRIDES[slug] ?? `${slugToTitle(slug)} | Velt`,
        description:
          USE_CASE_META_DESCRIPTION_OVERRIDES[slug] ?? FALLBACK_META_DESCRIPTION,
        path: `${BASE_PATH}/${slug}`,
      });
    }
    const title =
      USE_CASE_META_TITLE_OVERRIDES[slug] ??
      doc.metaTitle ??
      `${doc.hero?.heading ?? ""} | Velt`;
    const description =
      USE_CASE_META_DESCRIPTION_OVERRIDES[slug] ??
      doc.metaDescription ??
      doc.hero?.subheading ??
      "";
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
