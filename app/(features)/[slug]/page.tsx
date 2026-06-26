// Canonical per-feature route at the site root (e.g. /comments, /platform).
//
// This route serves two generations of feature pages from a single dynamic
// segment, v2 first:
//   - featurePageV2 (v10 template) — the 12 current feature pages. Rendered by
//     FeaturePageView. This is the canonical home for /comments, /notifications,
//     /audit-trail, etc. (migrated here from the old /new-features/<slug>).
//   - featurePage (v1) — the remaining legacy pages with no v2 equivalent
//     (/platform, /devtools, /webhooks-and-api). Rendered by FeaturePageBody.
//
// Lookup order is v2-then-v1 so a v2 document always wins its slug. Next.js
// prioritizes static routes over this dynamic [slug], so /blog, /pricing, etc.
// are unaffected. A Sanity slug that collides with a static folder under app/
// will silently 404 — pick slugs that don't shadow existing folders.

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  FeaturePageBody,
  type FeaturePageDoc,
} from "@/components/feature/FeaturePageBody";
import FeaturePageView from "@/components/feature-new/FeaturePageView";
import { toFeaturePageContent } from "@/lib/feature-v2/to-content";
import {
  getAllFeatureSlugs,
  getAllFeatureV2Slugs,
  getFeaturePageBySlug,
  getFeaturePageV2BySlug,
} from "@/sanity/queries";
import { sanitySlugToUrl, urlSlugToSanity } from "@/lib/feature-slugs";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  FALLBACK_META_DESCRIPTION,
  buildPageMetadata,
  slugToTitle,
} from "@/app/_seo/page-metadata";
import { resolveOgImage } from "@/app/_seo/og-images";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchema,
  buildWebPageSchema,
} from "@/app/_seo/schema";

export const revalidate = 60;

// Legacy v1 (featurePage) docs still live in the CMS but were superseded by v2
// pages; their old URLs now 301-redirect (see next.config.ts), so we skip them
// here instead of prerendering pages that never serve. comments/notifications
// resolve to v2 at the same URL; recordings/multiplayer/activity-logs redirect
// to /recording, /multiplayer-editing, /audit-trail respectively.
//
// admin-console, dev-tools, and webhooks-and-api are superseded by the
// new-theme STATIC routes app/platform, app/devtools, and app/webhooks-and-api
// (rendered locally from in-repo content, not the CMS). Excluding them here
// keeps generateStaticParams from emitting /platform, /devtools, and
// /webhooks-and-api, which would otherwise collide with those static folders.
// The v1 CMS docs are left untouched.
const SUPERSEDED_V1_SLUGS = new Set([
  "comments",
  "recordings",
  "multiplayer",
  "activity-logs",
  "admin-console",
  "dev-tools",
  "webhooks-and-api",
]);

export async function generateStaticParams() {
  try {
    const [v2Slugs, v1Slugs] = await Promise.all([
      getAllFeatureV2Slugs(),
      getAllFeatureSlugs(),
    ]);
    const slugs = new Set<string>([
      ...v2Slugs,
      ...v1Slugs
        .filter((slug) => !SUPERSEDED_V1_SLUGS.has(slug))
        .map((slug) => sanitySlugToUrl(slug)),
    ]);
    return [...slugs].map((slug) => ({ slug }));
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

    // v2 first — featurePageV2 owns its slug.
    const v2 = await getFeaturePageV2BySlug(slug);
    if (v2) {
      const title = v2.metaTitle ?? `${v2.hero?.title ?? v2.title} | Velt`;
      const description = v2.metaDescription ?? v2.hero?.secondary ?? "";
      return buildPageMetadata({
        title,
        description,
        path: `/${slug}`,
        ogImage: resolveOgImage(slug, v2.ogImage),
      });
    }

    // v1 fallback.
    const doc = (await getFeaturePageBySlug(
      urlSlugToSanity(slug)
    )) as FeaturePageDoc | null;
    // No v2 or v1 document resolved for this slug. Rather than returning {} —
    // which drops title and canonical entirely — emit a canonical and a sane
    // fallback title. The component still calls notFound() independently.
    if (!doc) {
      return buildPageMetadata({
        title: `${slugToTitle(slug)} | Velt`,
        description: FALLBACK_META_DESCRIPTION,
        path: `/${slug}`,
      });
    }
    const title = doc.metaTitle ?? `${doc.hero.heading} | Velt`;
    const description = doc.metaDescription ?? doc.hero.subheading ?? "";
    // Prefer Sanity-supplied OG image. Fall back to a bundled per-slug image
    // (/og/{slug}.png) only when one actually exists — otherwise leave
    // `ogImage` undefined so the helper drops in the site-wide default.
    return buildPageMetadata({
      title,
      description,
      path: `/${slug}`,
      ogImage: resolveOgImage(slug, doc.ogImage),
    });
  } catch (error) {
    console.error("generateMetadata failed", error);
    return {};
  }
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // v2 first — featurePageV2 owns its slug.
  const v2 = await getFeaturePageV2BySlug(slug);
  if (v2) {
    const content = toFeaturePageContent(v2);

    const pageUrl = `${SITE_URL}/${slug}`;
    const pageTitle = v2.breadcrumbLabel ?? v2.title ?? v2.hero?.title ?? "";
    const description = v2.metaDescription ?? v2.hero?.secondary ?? "";

    const breadcrumb = buildBreadcrumbList([
      { name: "Home", url: SITE_URL },
      { name: "Features", url: `${SITE_URL}/features` },
      { name: pageTitle, url: pageUrl },
    ]);

    const webPage = buildWebPageSchema({
      name: v2.metaTitle ?? pageTitle,
      description,
      url: pageUrl,
      breadcrumb,
    });

    const faqSchema = buildFaqPageSchema(
      (content.faq.items ?? []).map((item) => ({
        question: item.q,
        answer: item.a,
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

        <JsonLd id={`ld-${slug}-webpage`} data={webPage} />
        <JsonLd id={`ld-${slug}-breadcrumb`} data={breadcrumb} />
        <JsonLd id={`ld-${slug}-faq`} data={faqSchema} />

        <FeaturePageView content={content} />
      </>
    );
  }

  // v1 fallback for legacy pages with no v2 equivalent.
  return <FeaturePageBody sanitySlug={urlSlugToSanity(slug)} pageUrlPath={slug} />;
}
