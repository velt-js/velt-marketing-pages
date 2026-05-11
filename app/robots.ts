import type { MetadataRoute } from "next";

/**
 * Generates the robots.txt configuration for the site.
 * Allows all crawlers on all public routes while blocking CMS and API paths.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: "https://velt.dev/sitemap.xml",
    host: "https://velt.dev",
  };
}
