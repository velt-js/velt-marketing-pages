import type { MetadataRoute } from "next";
import {
  getAllBlogPosts,
  getAllDemoSlugs,
  getAllExampleSlugs,
  getAllFeatureSlugs,
  getAllLibrarySlugs,
  getAllMigrationSlugs,
  getAllUseCaseSlugs,
} from "@/sanity/queries";
import { sanitySlugToUrl } from "@/lib/feature-slugs";

const BASE = "https://velt.dev";

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
    { url: `${BASE}/yc`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/libraries`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/integrations`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/launch-kit`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/demos`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/examples`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/migrate`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [
    blogPosts,
    demoSlugs,
    exampleSlugs,
    featureSlugs,
    librarySlugs,
    migrationSlugs,
    useCaseSlugs,
  ] = await Promise.all([
    getAllBlogPosts().catch(() => []),
    getAllDemoSlugs().catch(() => []),
    getAllExampleSlugs().catch(() => []),
    getAllFeatureSlugs().catch(() => []),
    getAllLibrarySlugs().catch(() => []),
    getAllMigrationSlugs().catch(() => []),
    getAllUseCaseSlugs().catch(() => []),
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

  const exampleEntries: MetadataRoute.Sitemap = (exampleSlugs as string[]).map(
    (slug) => ({
      url: `${BASE}/examples/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  const featureEntries: MetadataRoute.Sitemap = (featureSlugs as string[]).map(
    (slug) => ({
      url: `${BASE}/${sanitySlugToUrl(slug)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  const libraryEntries: MetadataRoute.Sitemap = (librarySlugs as string[]).map(
    (slug) => ({
      url: `${BASE}/libraries/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  const migrationEntries: MetadataRoute.Sitemap = (migrationSlugs as string[]).map(
    (slug) => ({
      url: `${BASE}/migrate/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  const useCaseEntries: MetadataRoute.Sitemap = (useCaseSlugs as string[]).map(
    (slug) => ({
      url: `${BASE}/use-case/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  return [
    ...staticRoutes,
    ...blogEntries,
    ...demoEntries,
    ...exampleEntries,
    ...featureEntries,
    ...libraryEntries,
    ...migrationEntries,
    ...useCaseEntries,
  ];
}
