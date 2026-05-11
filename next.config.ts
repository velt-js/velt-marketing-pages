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
      {
        source: "/add-comments-quick",
        destination: "/features/comments",
        permanent: true,
      },
      {
        source: "/add-notifications-quick",
        destination: "/features/notifications",
        permanent: true,
      },
      {
        source: "/add-recording-quick",
        destination: "/features/recordings",
        permanent: true,
      },
      {
        source: "/security",
        destination: "https://trust.velt.dev/",
        permanent: true,
      },
      {
        source: "/platform",
        destination: "/features/admin-console",
        permanent: true,
      },
      // Flat feature URLs (legacy velt.dev structure) → nested /features/[slug].
      // /activity-logs and /webhooks-and-api already match their feature slugs
      // exactly, so they need no redirect.
      {
        source: "/comments",
        destination: "/features/comments",
        permanent: true,
      },
      {
        source: "/recording",
        destination: "/features/recordings",
        permanent: true,
      },
      {
        source: "/devtools",
        destination: "/features/dev-tools",
        permanent: true,
      },
      {
        source: "/multiplayer-editing",
        destination: "/features/multiplayer",
        permanent: true,
      },
      // Legacy comments/notifications SEO landing pages → feature pages.
      {
        source: "/notion-like-comments",
        destination: "/features/comments",
        permanent: true,
      },
      {
        source: "/google-spreadsheets-like-comments",
        destination: "/features/comments",
        permanent: true,
      },
      {
        source: "/tiptap-editor-comments",
        destination: "/features/comments",
        permanent: true,
      },
      {
        source: "/knock-like-notifications",
        destination: "/features/notifications",
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
