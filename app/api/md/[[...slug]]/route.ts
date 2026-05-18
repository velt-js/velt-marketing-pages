// Per-page markdown handler. Reached via middleware.ts which rewrites
// any /:path.md URL (any depth) onto /api/md/:path. Returns text/plain
// with a YAML-ish frontmatter block, the canonical URL on its own line,
// and the markdown body produced by lib/markdown.ts.
//
// The user-facing route shape is /pricing.md, /blog/some-post.md,
// /use-case/something.md, etc. Note that App Router doesn't support a
// literal `.md` suffix on a catch-all folder name like `[...slug].md`,
// so we use middleware to rewrite onto a regular catch-all route.

import { NextResponse } from "next/server";
import { getPageMarkdown } from "@/lib/markdown";

export const revalidate = 3600;

const CACHE_CONTROL = "public, s-maxage=3600, stale-while-revalidate=86400";

function notFound() {
  return new NextResponse("Not found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function escapeFrontmatter(value: string): string {
  // YAML-safe-ish: escape backslashes and double-quotes for double-quoted
  // string values, then wrap. Sufficient for titles/URLs we control.
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params;
  if (!slug || slug.length === 0) return notFound();

  // Reconstruct the canonical page path. The slug array is whatever the
  // middleware stripped `.md` from — e.g. ["blog", "some-post"] for
  // /blog/some-post.md.
  const path = "/" + slug.map((s) => decodeURIComponent(s)).join("/");

  let page;
  try {
    page = await getPageMarkdown(path);
  } catch {
    return notFound();
  }
  if (!page) return notFound();

  const frontmatter = [
    "---",
    `url: ${escapeFrontmatter(page.url)}`,
    `title: ${escapeFrontmatter(page.title)}`,
    "---",
    "",
  ].join("\n");

  const body = `${frontmatter}\n# ${page.title}\n\n${page.markdown.trim()}\n`;

  return new NextResponse(body, {
    headers: {
      // text/plain over text/markdown so the response renders in the
      // browser when poking around (Mintlify uses the same default).
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": CACHE_CONTROL,
      // Keep .md URLs out of search indexes — the canonical URL is the
      // HTML page, .md is a content-negotiated dual.
      "X-Robots-Tag": "noindex",
    },
  });
}
