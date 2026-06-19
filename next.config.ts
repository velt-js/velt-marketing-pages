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
      // docs.velt.dev/* → velt.dev/docs/*
      // Must be first so it fires before any other rule or rewrite.
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "docs.velt.dev",
          },
        ],
        destination: "https://velt.dev/docs/:path*",
        permanent: true,
      },
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
      // /examples and all nested example slugs point at the samples
      // dogfooding subdomain — we don't host examples on the marketing
      // site anymore. Both /examples and /examples/anything → samples.velt.dev.
      {
        source: "/examples",
        destination: "https://samples.velt.dev",
        permanent: true,
      },
      {
        source: "/examples/:slug*",
        destination: "https://samples.velt.dev",
        permanent: true,
      },
      // Canonical migration URLs are the long descriptive slugs
      // (/migrate-from-{vendor}-to-velt). The short /migrate/{slug} form
      // 308s to long form for the two vendors that have explicit landings.
      // Any other Sanity migration slugs (if added later) continue to render
      // at /migrate/{slug} via the [slug] route.
      {
        source: "/migrate/liveblocks",
        destination: "/migrate-from-liveblocks-to-velt",
        permanent: true,
      },
      {
        source: "/migrate/cord",
        destination: "/migrate-from-cord-to-velt",
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
      // Legacy /activity-logs URL (docs + agent deep links) folds onto the
      // canonical Audit Trail feature page.
      {
        source: "/activity-logs",
        destination: "/audit-trail",
        permanent: true,
      },
      // /notion-like-comments, /google-spreadsheets-like-comments and
      // /tiptap-editor-comments are standalone SEO landings (see
      // app/notion-like-comments/, app/google-spreadsheets-like-comments/
      // and app/tiptap-editor-comments/).
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
      {
        source: "/boost-engagement-with-velt",
        destination: "/",
        permanent: true,
      },
      // Cole's 404 list (Slack, May 2026): non-blog routes that 404'd
      // in Search Console. /use-cases and /implementation-comparison
      // have no app routes — sent to home per Cole. /notifications →
      // the quick-start landing. /blog/velt.dev was an invalid blog slug.
      {
        source: "/notifications",
        destination: "/add-notifications-quick",
        permanent: true,
      },
      {
        source: "/use-cases",
        destination: "/",
        permanent: true,
      },
      {
        source: "/implementation-comparison",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/velt.dev",
        destination: "/",
        permanent: true,
      },
      // Vertical "solutions" pages moved from /solutions/:slug to the
      // canonical /for/:slug route (see app/for/[slug]/page.tsx). Keep the
      // old URLs alive for SEO and any external links.
      {
        source: "/solutions/:slug",
        destination: "/for/:slug",
        permanent: true,
      },
      {
        source: "/solutions",
        destination: "/for",
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
