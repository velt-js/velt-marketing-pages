// /robots.txt — emitted as a plain-text route handler (rather than
// app/robots.ts + MetadataRoute.Robots) so we can include comment lines
// pointing at the LLM-friendly endpoints. Comments are part of the
// robots.txt spec and are ignored by spec-compliant crawlers, but several
// AI agents pick them up as hints.

const BODY = `# velt.dev robots.txt
# AI crawlers are explicitly welcome. Velt wants to be in answers.

User-agent: *
Allow: /
Disallow: /studio/
Disallow: /api/
Disallow: /draft/
Disallow: /*?preview=

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://velt.dev/sitemap.xml
Host: https://velt.dev

# LLM-friendly endpoints
# llms.txt: https://velt.dev/llms.txt
# Full content: https://velt.dev/llms-full.txt
`;

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
