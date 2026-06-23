import type { MetadataRoute } from "next";
import {
  getAllBlogPosts,
  getAllDemoSlugs,
  getAllFeatureSlugs,
  getAllFeatureV2Slugs,
  getAllIntegrationSlugs,
  getAllLibrarySlugs,
  getAllLibraryV2Slugs,
  getAllMigrationSlugs,
  getAllUseCaseSlugs,
} from "@/sanity/queries";
import { sanitySlugToUrl } from "@/lib/feature-slugs";

const BASE = "https://velt.dev";
const MINTLIFY_SITEMAP = "https://velt.mintlify.dev/docs/sitemap.xml";

/**
 * Fetches Mintlify's auto-generated docs sitemap. Mintlify already emits
 * URLs with the canonical hostname (https://velt.dev/docs/...) based on
 * the domain set in the Mintlify dashboard, so no rewriting is needed.
 * Cached for 1 hour via Next's fetch cache. Failures return [] so the rest
 * of the sitemap still emits.
 */
async function fetchDocsEntries(now: Date): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(MINTLIFY_SITEMAP, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    return urls.map((url) => ({
      url,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    return [];
  }
}

/**
 * Generates the XML sitemap for all public routes on velt.dev.
 * Static routes are always included. Dynamic Sanity-backed routes are fetched
 * at build time; any fetch failure falls back to an empty array so the static
 * portion is always emitted.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/features`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/book-demo`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/enterprise`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/customers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/comparison`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/liveblocks-alternative`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/customization`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/use-case`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/consult`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/add-comments-quick`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/add-notifications-quick`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/add-recording-quick`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/google-spreadsheets-like-comments`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/notion-like-comments`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/tiptap-editor-comments`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/yc`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/libraries`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/integrations`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/launch-kit`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/demos`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/migrate-from-liveblocks-to-velt`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/migrate-from-cord-to-velt`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/knock-like-notifications`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [
    blogPosts,
    demoSlugs,
    featureV2Slugs,
    featureSlugs,
    librarySlugs,
    libraryV2Slugs,
    migrationSlugs,
    useCaseSlugs,
    integrationSlugs,
    docsEntries,
  ] = await Promise.all([
    getAllBlogPosts().catch(() => []),
    getAllDemoSlugs().catch(() => []),
    getAllFeatureV2Slugs().catch(() => []),
    getAllFeatureSlugs().catch(() => []),
    getAllLibrarySlugs().catch(() => []),
    getAllLibraryV2Slugs().catch(() => []),
    getAllMigrationSlugs().catch(() => []),
    getAllUseCaseSlugs().catch(() => []),
    getAllIntegrationSlugs().catch(() => []),
    fetchDocsEntries(now),
  ]);

  const blogEntries: MetadataRoute.Sitemap = (blogPosts as Array<{ slug: string; publishedAt?: string }>).map(
    (post) => ({
      url: `${BASE}/blog/${post?.slug}`,
      lastModified: post?.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  const demoEntries: MetadataRoute.Sitemap = (demoSlugs as string[]).map(
    (slug) => ({
      url: `${BASE}/demos/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  // Feature pages live at the site root. v2 (featurePageV2) slugs are already
  // the canonical URL. The remaining v1 (featurePage) docs are the legacy
  // pages with no v2 equivalent (/platform, /devtools, /webhooks-and-api);
  // map them through sanitySlugToUrl and dedupe against the v2 set so a slug
  // owned by both generations (e.g. notifications) is only emitted once.
  //
  // These v1 docs still exist in the CMS but were superseded by v2 pages; their
  // URLs are now 301 redirects (see next.config.ts), so they must not appear in
  // the sitemap: comments/notifications -> served by v2 at the same URL,
  // recordings -> /recording, multiplayer -> /multiplayer-editing,
  // activity-logs -> /audit-trail.
  const SUPERSEDED_V1_SLUGS = new Set([
    "comments",
    "recordings",
    "multiplayer",
    "activity-logs",
  ]);
  const featureUrlPaths = new Set<string>(featureV2Slugs as string[]);
  for (const slug of featureSlugs as string[]) {
    if (SUPERSEDED_V1_SLUGS.has(slug)) continue;
    featureUrlPaths.add(sanitySlugToUrl(slug));
  }
  const featureEntries: MetadataRoute.Sitemap = [...featureUrlPaths].map(
    (urlPath) => ({
      url: `${BASE}/${urlPath}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  // /libraries serves v2-first with v1 fallback, so the sitemap is the union
  // of both slug sets (v2 surfaces/plugins/agents plus any v1-only libraries).
  const allLibrarySlugs = [
    ...new Set([
      ...(libraryV2Slugs as string[]),
      ...(librarySlugs as string[]),
    ]),
  ];
  const libraryEntries: MetadataRoute.Sitemap = allLibrarySlugs.map(
    (slug) => ({
      url: `${BASE}/libraries/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  // Migration pages: the canonical URL is the long descriptive slug
  // (/migrate-from-{vendor}-to-velt). The short /migrate/{slug} form 308s
  // to the long form for cord and liveblocks (see next.config.ts). Any
  // additional Sanity migration documents that don't have a corresponding
  // long-form route fall back to /migrate/{slug}.
  const LONG_FORM_VENDORS = new Set(["cord", "liveblocks"]);
  const migrationEntries: MetadataRoute.Sitemap = (migrationSlugs as string[])
    .filter((slug) => !LONG_FORM_VENDORS.has(slug))
    .map((slug) => ({
      url: `${BASE}/migrate/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const useCaseEntries: MetadataRoute.Sitemap = (useCaseSlugs as string[]).map(
    (slug) => ({
      url: `${BASE}/use-case/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  const integrationEntries: MetadataRoute.Sitemap = (
    integrationSlugs as string[]
  ).map((slug) => ({
    url: `${BASE}/integrations/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...blogEntries,
    ...demoEntries,
    ...featureEntries,
    ...libraryEntries,
    ...migrationEntries,
    ...useCaseEntries,
    ...integrationEntries,
    ...docsEntries,
  ];
}
