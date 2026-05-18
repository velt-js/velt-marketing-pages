// /llms-full.txt — the entire marketing site as one plain-text file. Bots
// that want full context (vs. the curated /llms.txt) fetch this and ingest
// everything in one round trip. Excludes /docs/* (Mintlify serves its own
// /docs/llms-full.txt) and a handful of low-content/transactional pages
// (privacy, terms, careers, book-demo, consult, yc).
//
// Each page block is:
//
//   # <Title>
//   <URL>
//
//   <markdown body>
//
//   ---
//
// Sanity fetches are wrapped — a single failing doc doesn't kill the file.

import { getAllPageMarkdowns } from "@/lib/markdown";

export const revalidate = 3600;

const SEPARATOR = "\n\n---\n\n";
const HEADER = `# Velt — Full Marketing Site

> Plain-text concatenation of every public marketing page on velt.dev (excluding /docs/*, which Mintlify serves at velt.dev/docs/llms-full.txt). Pages are separated by "---" and ordered roughly by importance.

`;

function serialize(pages: Awaited<ReturnType<typeof getAllPageMarkdowns>>): string {
  const blocks = pages.map((p) => {
    const lines = [`# ${p.title}`, p.url, "", p.markdown.trim()];
    return lines.join("\n");
  });
  return HEADER + blocks.join(SEPARATOR);
}

export async function GET() {
  let body: string;
  try {
    const pages = await getAllPageMarkdowns();
    body = serialize(pages);
  } catch {
    // Sanity outage or unexpected failure: still emit the curated index
    // pointer so crawlers have something to chew on.
    body =
      HEADER +
      "Content temporarily unavailable. See https://velt.dev/llms.txt for the curated index.\n";
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
