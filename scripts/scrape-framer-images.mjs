// Parse a Framer-rendered use-case page from velt.dev and pair each
// benefit row's heading with its screenshot image.
//
// Approach:
//   1. Locate the "benefit rows" zone — between the first benefit
//      heading and the next site-wide section heading after it.
//   2. Within that zone, collect unique big-width (>= 600px) framer
//      images in source order; collect benefit headings in source
//      order.
//   3. Pair images and headings by index. Framer always emits rows in
//      document order even when the rendered row alternates image-left
//      vs image-right.
//
// Usage:
//   node --env-file=.env.local scripts/scrape-framer-images.mjs <slug>
// Outputs JSON {benefits:[{title,image}]} on stdout.

import { createClient } from "@sanity/client";

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/scrape-framer-images.mjs <slug>");
  process.exit(1);
}

const res = await fetch(`https://velt.dev/use-case/${slug}`, {
  headers: { "user-agent": "Mozilla/5.0" },
});
if (!res.ok) {
  console.error(`HTTP ${res.status} for /use-case/${slug}`);
  process.exit(1);
}
const html = await res.text();

const client = createClient({
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
const doc = await client.fetch(
  `*[_type == "useCasePage" && slug.current == $slug][0]{ benefits[]{ _key, title } }`,
  { slug },
);
if (!doc) {
  console.error(`No useCasePage with slug "${slug}" in Sanity.`);
  process.exit(1);
}

const cmsHeadings = (doc.benefits ?? []).map((b) => b.title);

// Build positions: where each benefit heading appears (first occurrence).
const headingPositions = cmsHeadings.map((title) => {
  // Framer escapes & as &amp;
  const needle = title.replace(/&/g, "&amp;");
  const pos = html.indexOf(needle);
  return { title, pos };
});

const presentHeadings = headingPositions.filter((h) => h.pos !== -1);
if (presentHeadings.length === 0) {
  console.error("No CMS benefit headings found on the live page.");
  process.exit(2);
}

const zoneStart = Math.min(...presentHeadings.map((h) => h.pos));
// Zone end = the next major heading after the last benefit row. We use
// a generous lookahead (~50KB) which comfortably covers the row block.
const zoneEnd = Math.max(...presentHeadings.map((h) => h.pos)) + 50000;

const imgRe =
  /https:\/\/framerusercontent\.com\/images\/([A-Za-z0-9]+)\.(?:png|jpg|jpeg|webp)\?[^\s"&]*?width=(\d+)[^\s"]*/g;
const MIN_W = 600;
const seenIds = new Set();
const orderedImages = [];
for (const m of html.slice(zoneStart, zoneEnd).matchAll(imgRe)) {
  const id = m[1];
  const w = Number(m[2]);
  if (w < MIN_W || seenIds.has(id)) continue;
  seenIds.add(id);
  orderedImages.push(m[0].replace(/&amp;/g, "&"));
}

// Pair each *present* heading with the next un-consumed image. Indexing
// by the full-positions index would mis-pair when an absent heading
// sits in the middle of the list (the live-page-present headings would
// slip out of sync with orderedImages).
const out = { slug, benefits: [] };
let imgIdx = 0;
for (let i = 0; i < cmsHeadings.length; i++) {
  const found = headingPositions[i].pos !== -1;
  out.benefits.push({
    title: cmsHeadings[i],
    image: found ? (orderedImages[imgIdx++] ?? null) : null,
    onLivePage: found,
  });
}

console.log(JSON.stringify(out, null, 2));
