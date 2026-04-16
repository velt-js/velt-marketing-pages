import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Homepage
        {
          source: "/",
          destination: "/pages-html/index.html",
        },
      ],
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
