import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return {
      fallback: [
        // All other routes: try /pages-html/<path>/index.html
        {
          source: "/:path*",
          destination: "/pages-html/:path*/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
