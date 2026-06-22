import path from "path";
import type { NextConfig } from "next";
import { buildBlogRedirectEntries } from "./lib/blog-redirects";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Report-only CSP: the site loads scripts from many third-party
          // origins (Mixpanel, Amplitude, gtag/Google, Reddit, Twitter,
          // Apollo, reb2b, Common Room, Intercom, Calendly, Sanity, Vercel,
          // Superflow CDN). An enforcing Content-Security-Policy would break
          // these integrations without an exhaustive allowlist audit.
          // Report-Only lets us observe violations without breaking anything.
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https: wss:",
              "frame-src 'self' https:",
              "media-src 'self' https: blob:",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
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
      // v2 feature pages moved from /new-features/:slug to the canonical root
      // URL (see app/(features)/[slug]/page.tsx). Fold the old prefixed URLs
      // and any external links onto the flat route.
      {
        source: "/new-features/:slug",
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
      // have no app routes — sent to home per Cole. /blog/velt.dev was an
      // invalid blog slug. (/notifications is now a real v2 feature page at
      // the root, so its former redirect to /add-notifications-quick was
      // removed; /add-notifications-quick remains a standalone landing.)
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
