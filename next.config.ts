import path from "path";
import type { NextConfig } from "next";
import { buildBlogRedirectEntries } from "./lib/blog-redirects";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      ...buildBlogRedirectEntries(),
      // /migrate-from-liveblocks-to-velt and /migrate-from-cord-to-velt
      // are standalone top-level routes (see app/migrate-from-*/) that
      // render the same Sanity-backed body as their /migrate/{slug}
      // counterparts via MigrationPageBody.
      // Legacy marketing landing pages → live destinations
      {
        source: "/try-features",
        destination: "https://samples.velt.dev",
        permanent: true,
      },
      // /add-comments-quick, /add-notifications-quick, /add-recording-quick
      // are standalone quick-start landing pages — see app/add-*-quick/.
      {
        source: "/security",
        destination: "https://trust.velt.dev/",
        permanent: true,
      },
      // Three feature pages keep the legacy velt.dev URLs (/platform,
      // /devtools, /multiplayer-editing). Their Sanity slugs differ
      // (admin-console, dev-tools, multiplayer) — the mapping lives in
      // lib/feature-slugs.ts. These redirects fold the slug-style URLs
      // back to the canonical legacy URLs so we don't ship two URLs for
      // the same page.
      {
        source: "/admin-console",
        destination: "/platform",
        permanent: true,
      },
      {
        source: "/dev-tools",
        destination: "/devtools",
        permanent: true,
      },
      {
        source: "/multiplayer",
        destination: "/multiplayer-editing",
        permanent: true,
      },
      // Nested /features/[slug] URLs from the previous structure also
      // redirect to the canonical legacy URL for the three above.
      {
        source: "/features/admin-console",
        destination: "/platform",
        permanent: true,
      },
      {
        source: "/features/dev-tools",
        destination: "/devtools",
        permanent: true,
      },
      {
        source: "/features/multiplayer",
        destination: "/multiplayer-editing",
        permanent: true,
      },
      {
        source: "/features/recordings",
        destination: "/recording",
        permanent: true,
      },
      // Everything else nested under /features goes to the flat URL.
      // /features (the index page) is unaffected.
      {
        source: "/features/:slug",
        destination: "/:slug",
        permanent: true,
      },
      // Sanity slug for the recordings feature is plural; canonical URL
      // is the singular /recording (matches legacy velt.dev).
      {
        source: "/recordings",
        destination: "/recording",
        permanent: true,
      },
      // Legacy comments/notifications SEO landing pages → feature pages.
      {
        source: "/notion-like-comments",
        destination: "/comments",
        permanent: true,
      },
      // /google-spreadsheets-like-comments — standalone SEO landing (see
      // app/google-spreadsheets-like-comments/).
      {
        source: "/tiptap-editor-comments",
        destination: "/comments",
        permanent: true,
      },
      // /knock-like-notifications — standalone SEO landing (see
      // app/knock-like-notifications/) that renders /notifications content
      // via the shared FeaturePageBody.
      // Collapse plural /liveblocks-alternatives onto the canonical
      // singular /liveblocks-alternative so search engines index a
      // single URL for the competitor landing page.
      {
        source: "/liveblocks-alternatives",
        destination: "/liveblocks-alternative",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "/pages-html/:path*/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
