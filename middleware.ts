// Edge middleware — the only thing this file does is intercept any URL
// ending in `.md` and rewrite it onto /api/md/<path>. That hands the
// request off to app/api/md/[[...slug]]/route.ts which produces the
// markdown response.
//
// Why middleware instead of app/[...slug].md/route.ts: Next.js App Router
// only parses three folder shapes — [name], [...name], [[...name]]. A
// folder named [...slug].md is not a valid segment, so we route via
// /api/md/* internally and use this middleware to keep the public URLs
// clean (e.g. velt.dev/pricing.md). This is also the pattern Vercel
// recommends (see Ben Gubler / Guillermo Rauch on Next.js rewrites).
//
// Excludes:
//   - /_next/*, /api/* (Next internals and API routes already handle .md
//     paths themselves if any)
//   - /studio/* (Sanity Studio routes — don't rewrite these)
//   - /docs/* (Mintlify serves its own per-page .md endpoints; we want
//     those requests to pass through to the docs subdomain)
//   - Static asset extensions (svg/png/etc.) so we don't accidentally
//     rewrite asset filenames that happen to look like docs.

import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.endsWith(".md")) return NextResponse.next();

  // Strip leading "/" and trailing ".md".
  const inner = pathname.slice(1, -3);
  if (!inner) return NextResponse.next();

  // Skip explicit pass-throughs — see the file-level comment for rationale.
  if (
    inner.startsWith("_next/") ||
    inner.startsWith("api/") ||
    inner.startsWith("studio/") ||
    inner.startsWith("docs/")
  ) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/api/md/${inner}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Match only paths ending in .md, skipping Next internals and static
  // image/font extensions. The matcher runs ahead of the function body so
  // it keeps middleware overhead off every non-.md request.
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf|css|js|map)$).*\\.md)",
  ],
};
