import type { NextConfig } from "next";
import { buildBlogRedirectEntries } from "./lib/blog-redirects";

const nextConfig: NextConfig = {
  reactStrictMode: false,
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
