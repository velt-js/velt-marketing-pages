// /llms.txt — curated index of the velt.dev marketing site for LLMs.
// Follows the llmstxt.org convention: a hand-authored, opinionated table of
// contents pointing at the most useful pages and their .md siblings. Bots
// that fetch /llms.txt get a quick map; from there they fetch /llms-full.txt
// or individual /:slug.md endpoints. Mintlify already serves /docs/llms.txt
// and /docs/llms-full.txt for docs content — this file covers everything
// outside /docs/*.

const BODY = `# Velt

> Velt is the review and approval infrastructure layer for AI-generated work. Embeddable SDK for comments, presence, annotations, notifications, recordings, and approval workflows. Used by Stensul, trumpet, Privado, Cofactr, OpenEnvoy, and others.

## Core pages

- [Home](https://velt.dev): Product overview and positioning
- [Pricing](https://velt.dev/pricing): Plans and pricing model
- [Features](https://velt.dev/features): Full feature list
- [Enterprise](https://velt.dev/enterprise): Enterprise capabilities, security, self-hosting
- [Comparison](https://velt.dev/comparison): How Velt compares to alternatives
- [Customers](https://velt.dev/customers): Customer stories and case studies
- [Book a demo](https://velt.dev/book-demo): Schedule a call

## Documentation

- [Docs (full)](https://velt.dev/docs/llms-full.txt): Complete docs content as a single file
- [Docs index](https://velt.dev/docs/llms.txt): Index of all doc pages
- [Quickstart](https://velt.dev/docs/get-started/overview): Get started in minutes
- [API Reference](https://velt.dev/docs/api-reference): REST API documentation
- [Components](https://velt.dev/docs/components): React, Next.js, Angular SDK components

## Use cases

- [Notion-like comments](https://velt.dev/notion-like-comments)
- [Google Sheets-like comments](https://velt.dev/google-spreadsheets-like-comments)
- [Tiptap editor comments](https://velt.dev/tiptap-editor-comments)
- [Knock-like notifications](https://velt.dev/knock-like-notifications)

## Migration guides

- [Migrate from Liveblocks](https://velt.dev/migrate-from-liveblocks-to-velt)
- [Migrate from Cord](https://velt.dev/migrate-from-cord-to-velt)
- [Liveblocks alternative](https://velt.dev/liveblocks-alternative)

## Optional

- [Blog](https://velt.dev/blog): Articles and announcements
- [Demos](https://velt.dev/demos): Live demo gallery
- [Libraries](https://velt.dev/libraries): Supported libraries and frameworks
- [Integrations](https://velt.dev/integrations): Third-party integrations
- [Careers](https://velt.dev/careers): Open roles
`;

// 24h revalidate — the curated list rarely changes. Cache-Control mirrors
// the revalidate window with a longer stale-while-revalidate so the CDN
// keeps serving while a background refresh lands.
export const revalidate = 86400;

export async function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
