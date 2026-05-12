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
      // Legacy migration URLs → new /migrate/[slug] template.
      {
        source: "/migrate-from-liveblocks-to-velt",
        destination: "/migrate/liveblocks",
        permanent: true,
      },
      {
        source: "/migrate-from-cord-to-velt",
        destination: "/migrate/cord",
        permanent: true,
      },
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
      {
        source: "/google-spreadsheets-like-comments",
        destination: "/comments",
        permanent: true,
      },
      {
        source: "/tiptap-editor-comments",
        destination: "/comments",
        permanent: true,
      },
      {
        source: "/knock-like-notifications",
        destination: "/notifications",
        permanent: true,
      },
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
