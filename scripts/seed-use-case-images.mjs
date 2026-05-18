#!/usr/bin/env node
// For a given use-case slug (or all slugs), scrape the screenshot for
// each benefit row from the live velt.dev page, upload the file as a
// Sanity image asset, and patch the corresponding
// useCasePage.benefits[*].image reference.
//
// Idempotent: re-uploading a byte-identical file dedupes via Sanity's
// SHA-256 keying. We always overwrite the `image` field on the patch,
// so re-running with a newer scrape replaces older asset refs cleanly.
//
// Usage:
//   DRY_RUN=1 node --env-file=.env.local scripts/seed-use-case-images.mjs <slug>
//   node --env-file=.env.local scripts/seed-use-case-images.mjs <slug>
//   node --env-file=.env.local scripts/seed-use-case-images.mjs --all

import { createClient } from "@sanity/client";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN, or DRY_RUN=1 to preview.");
  process.exit(1);
}

const arg = process.argv[2];
if (!arg) {
  console.error(
    "Usage: node scripts/seed-use-case-images.mjs <slug>   (or --all)",
  );
  process.exit(1);
}

const client = createClient({
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ------- helpers ---------------------------------------------------------

async function scrapeBenefitImages(slug) {
  // The live velt.dev site lowercases its use-case slugs (e.g. CMS
  // `Presentation` lives at `/use-case/presentation`).
  const url = `https://velt.dev/use-case/${slug.toLowerCase()}`;
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const html = await res.text();

  const doc = await client.fetch(
    `*[_type == "useCasePage" && slug.current == $slug][0]{ _id, benefits[]{ _key, title } }`,
    { slug },
  );
  if (!doc) throw new Error(`No useCasePage in Sanity for slug "${slug}"`);

  const headings = (doc.benefits ?? []).map((b) => ({
    _key: b._key,
    title: b.title ?? "",
  }));
  const positions = headings.map((h) => ({
    ...h,
    pos: html.indexOf(h.title.replace(/&/g, "&amp;")),
  }));
  const present = positions.filter((h) => h.pos !== -1);
  if (present.length === 0) {
    return {
      docId: doc._id,
      slug,
      rows: positions.map((p) => ({ ...p, image: null, onLivePage: false })),
    };
  }
  const zoneStart = Math.min(...present.map((p) => p.pos));
  const zoneEnd = Math.max(...present.map((p) => p.pos)) + 50000;

  const re =
    /https:\/\/framerusercontent\.com\/images\/([A-Za-z0-9]+)\.(?:png|jpg|jpeg|webp)\?[^\s"&]*?width=(\d+)[^\s"]*/g;
  const seen = new Set();
  const orderedImages = [];
  for (const m of html.slice(zoneStart, zoneEnd).matchAll(re)) {
    if (Number(m[2]) < 600 || seen.has(m[1])) continue;
    seen.add(m[1]);
    orderedImages.push(m[0].replace(/&amp;/g, "&"));
  }

  // Walk CMS headings in order and pair each *present* heading with the
  // next un-consumed image. Using the full-positions index would mis-pair
  // when an absent heading sits in the middle of the list (the present
  // headings on the live page would slip out of sync with orderedImages).
  let imgIdx = 0;
  const rows = positions.map((p) => {
    const onLivePage = p.pos !== -1;
    const image = onLivePage ? (orderedImages[imgIdx++] ?? null) : null;
    return { _key: p._key, title: p.title, onLivePage, image };
  });
  return { docId: doc._id, slug, rows };
}

async function uploadFromUrl(imageUrl) {
  const res = await fetch(imageUrl);
  if (!res.ok)
    throw new Error(`Download failed: HTTP ${res.status} for ${imageUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const filename =
    imageUrl.match(/\/images\/([A-Za-z0-9]+\.(?:png|jpg|jpeg|webp))/)?.[1] ??
    "scrape.png";
  const asset = await client.assets.upload("image", buf, { filename });
  return asset._id;
}

async function applyToDoc({ docId, slug, rows }) {
  console.log(`\n=== ${slug} (${docId}) ===`);
  for (const r of rows) {
    if (!r.onLivePage) {
      console.log(`  [skip] ${r.title} — not on live page`);
      continue;
    }
    if (!r.image) {
      console.log(`  [skip] ${r.title} — no image scraped`);
      continue;
    }
    if (DRY_RUN) {
      console.log(`  [dry] ${r.title}`);
      console.log(`        ↳ ${r.image}`);
      continue;
    }
    process.stdout.write(`  uploading ${r.title.slice(0, 50)}… `);
    const assetId = await uploadFromUrl(r.image);
    await client
      .patch(docId)
      .set({
        [`benefits[_key=="${r._key}"].image`]: {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
        },
      })
      .commit();
    console.log(`ok (${assetId})`);
  }
}

// ------- main ------------------------------------------------------------

async function listSlugs() {
  return await client.fetch(
    `*[_type == "useCasePage" && defined(slug.current)].slug.current | order(@ asc)`,
  );
}

const slugs = arg === "--all" ? await listSlugs() : [arg];
for (const s of slugs) {
  try {
    const scraped = await scrapeBenefitImages(s);
    await applyToDoc(scraped);
  } catch (err) {
    console.error(`\nFAILED for ${s}: ${err.message}`);
  }
}
