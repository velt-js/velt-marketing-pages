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
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import {
  FeaturePageBody,
  type FeaturePageDoc,
} from "@/components/feature/FeaturePageBody";
import type { FeatureSidebarShowcaseSectionDoc } from "@/components/feature/FeatureSections";
import FeaturePageView from "@/components/feature-new/FeaturePageView";
import DetailsShowcase from "@/components/feature-new/DetailsShowcase";
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

// SEO meta-title overrides for feature slugs whose CMS `metaTitle` falls
// outside the 50–60 char search-snippet window. These curated titles take
// precedence so the rendered <title> is deterministic regardless of CMS
// state. Keep each value between 50 and 60 characters (the " | Velt" suffix
// is included so buildPageMetadata renders it verbatim as an absolute title).
const FEATURE_META_TITLE_OVERRIDES: Record<string, string> = {
  // CMS metaTitle "Presence | Agent or human presence, cursors, follow mode | Velt"
  // renders at 63 chars, past the 60-char limit.
  presence: "Presence SDK: Live Cursors, Avatars & Follow Mode | Velt",
};

// SEO meta-description overrides for feature slugs whose CMS `metaDescription`
// falls outside the 120–160 char snippet window. These curated descriptions
// take precedence so the rendered <meta name="description"> stays in range.
const FEATURE_META_DESCRIPTION_OVERRIDES: Record<string, string> = {
  // CMS metaDescription is 101 chars, below the 120-char floor.
  recording:
    "Add Loom-style recording to your product. Capture voice, video, and screen pinned to the exact spot in the work, with a built-in video editor.",
};

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
const COMMENTS_SLUG = "comments";

const SUPERSEDED_V1_SLUGS = new Set([
  COMMENTS_SLUG,
  "recordings",
  "multiplayer",
  "activity-logs",
  "admin-console",
  "dev-tools",
  "webhooks-and-api",
]);

/**
 * Builds the legacy "Little Big Details" sidebar showcase for the comments page.
 * The v2 comments document has no sidebar-showcase field, so the section is
 * sourced from the untouched v1 featurePage document and rendered in place of
 * the default DetailsWall. Returns undefined for any other slug, when the v1
 * section is absent, or on any failure — the caller then falls back to the
 * standard DetailsWall.
 * @param {string} slug The requested feature slug.
 * @returns {Promise<ReactNode>} The showcase element, or undefined.
 */
async function buildCommentsDetailsSection(slug: string): Promise<ReactNode> {
  try {
    if (slug !== COMMENTS_SLUG) {
      return undefined;
    }
    const legacyDoc = (await getFeaturePageBySlug(COMMENTS_SLUG)) as FeaturePageDoc | null;
    const showcase = legacyDoc?.sections?.find(
      (section): section is FeatureSidebarShowcaseSectionDoc =>
        section?._type === "featureSidebarShowcaseSection",
    );
    if (!showcase) {
      return undefined;
    }
    return (
      <DetailsShowcase
        kicker="Little big details"
        heading={showcase.heading}
        support={showcase.subheading}
        items={showcase.items}
        defaultScreenshotSrc={showcase.defaultScreenshotSrc}
      />
    );
  } catch (error) {
    console.error("buildCommentsDetailsSection failed", error);
    return undefined;
  }
}

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
      const title =
        FEATURE_META_TITLE_OVERRIDES[slug] ??
        v2.metaTitle ??
        `${v2.hero?.title ?? v2.title} | Velt`;
      const description =
        FEATURE_META_DESCRIPTION_OVERRIDES[slug] ??
        v2.metaDescription ??
        v2.hero?.secondary ??
        "";
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
        title:
          FEATURE_META_TITLE_OVERRIDES[slug] ?? `${slugToTitle(slug)} | Velt`,
        description:
          FEATURE_META_DESCRIPTION_OVERRIDES[slug] ?? FALLBACK_META_DESCRIPTION,
        path: `/${slug}`,
      });
    }
    const title =
      FEATURE_META_TITLE_OVERRIDES[slug] ?? doc.metaTitle ?? `${doc.hero.heading} | Velt`;
    const description =
      FEATURE_META_DESCRIPTION_OVERRIDES[slug] ??
      doc.metaDescription ??
      doc.hero.subheading ??
      "";
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
    const detailsSection = await buildCommentsDetailsSection(slug);

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

        <FeaturePageView content={content} detailsSection={detailsSection} />
      </>
    );
  }

  // v1 fallback for legacy pages with no v2 equivalent.
  return <FeaturePageBody sanitySlug={urlSlugToSanity(slug)} pageUrlPath={slug} />;
}
