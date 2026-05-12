#!/usr/bin/env node
/**
 * Seed all 17 integrationPage documents in Sanity from the scraped content
 * in scripts/integration-content.json.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-integrations.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-integrations.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-integrations.mjs
 *   # one integration only: ONLY=slack node scripts/seed-integrations.mjs
 *
 * Logos are fetched from the velt.dev Sanity CDN URLs already referenced in
 * `components/integration/shared-content.ts` and re-uploaded (Sanity dedupes
 * by SHA-256 so this is idempotent — same bytes always resolve to the same
 * asset _id). Section images (connect / payload / unified) are optional —
 * if `scripts/integration-asset-urls.json` exists, those URLs are fetched
 * and uploaded too. Without it, the section image fields are left null and
 * the page renders placeholder rectangles.
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";

const DRY_RUN = process.env.DRY_RUN === "1";
const ONLY = process.env.ONLY?.trim() || null;
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN env var, or DRY_RUN=1 to preview without writing.");
  process.exit(1);
}

const PROJECT_ROOT = resolve(import.meta.dirname, "..");
const CONTENT_PATH = resolve(PROJECT_ROOT, "scripts/integration-content.json");
const ASSET_URLS_PATH = resolve(PROJECT_ROOT, "scripts/integration-asset-urls.json");

const client = DRY_RUN
  ? null
  : createClient({
      projectId: "fk9mezqa",
      dataset: "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

// Logo URLs lifted from components/integration/shared-content.ts. Keeping
// them inline so this script doesn't need to import a TypeScript module at
// runtime — these are stable, content-addressed Sanity URLs.
const LOGO_URLS = {
  slack: "https://cdn.sanity.io/images/fk9mezqa/production/0a711e8c173b2316b1ed42bd8b99fec518a49a86-600x216.png",
  discord: "https://cdn.sanity.io/images/fk9mezqa/production/9eeea30b4f413c5b1eafe6ff453245fb2bfab19e-301x84.png",
  "microsoft-teams": "https://cdn.sanity.io/images/fk9mezqa/production/67a0d833257cf0649f6cd15713ee036f43cfb129-860x206.png",
  "aws-s3": "https://cdn.sanity.io/images/fk9mezqa/production/8b56ea8b61803c017848224aa3fdd692d7a19ab9-268x122.png",
  "google-cloud-storage": "https://cdn.sanity.io/images/fk9mezqa/production/c651a0a8a2884e71edb814825ee637996363d3cb-366x82.png",
  "microsoft-azure": "https://cdn.sanity.io/images/fk9mezqa/production/5c196264980ebee844591b3f45ebdeecca14fc4e-342x100.png",
  hubspot: "https://cdn.sanity.io/images/fk9mezqa/production/4ab38652e7c4c107029746fd3124769831b4e5ab-264x76.png",
  "close-crm": "https://cdn.sanity.io/images/fk9mezqa/production/fa282b5c353b6596c83879dd1d1d3198d26d9aba-267x73.png",
  segment: "https://cdn.sanity.io/images/fk9mezqa/production/46a134a59c7b1b6db65c2f71aa7fd9219f53cf36-105x108.png",
  opentelemetry: "https://cdn.sanity.io/images/fk9mezqa/production/efaf0039197a4ecd90f99687d26e34b441137874-290x110.png",
  zapier: "https://cdn.sanity.io/images/fk9mezqa/production/3f2d402b9a830e580c13fbfdd470daf3d3d3dee3-280x76.png",
  inngest: "https://cdn.sanity.io/images/fk9mezqa/production/067a89a77c2a18ab1463b3463831e053e0cc69c4-121x120.png",
  windmill: "https://cdn.sanity.io/images/fk9mezqa/production/9a5ccfd5741ac7b42980ed19b2679603097bfc6f-132x130.png",
  sendgrid: "https://cdn.sanity.io/images/fk9mezqa/production/d204845370a87c369934f9ebd74bf125e688114a-301x76.png",
  loops: "https://cdn.sanity.io/images/fk9mezqa/production/e54a233fa2380e456c8ffd1484b92c7447c80251-200x45.png",
  "customer-io": "https://cdn.sanity.io/images/fk9mezqa/production/3822ef5406b2846fa829bd29a7073051b8a00943-284x40.png",
  resend: "https://cdn.sanity.io/images/fk9mezqa/production/39456c32167fa98f88c31f63f0e6930ecfd67c90-186x40.png",
};

async function fetchAndUpload(url) {
  if (!url) return null;
  if (DRY_RUN) return { _type: "image", asset: { _ref: `dry-run-${basename(url)}` } };
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ⚠ failed to fetch ${url}: ${res.status}`);
    return null;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, {
    filename: basename(new URL(url).pathname),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

function buildDoc(entry, assets) {
  const { slug, name, category, heroTitle, tagline, description, connectBody, payloadBody, unifiedBody } = entry;
  return {
    _id: `integrationPage-${slug}`,
    _type: "integrationPage",
    name,
    slug: { _type: "slug", current: slug },
    category,
    heroTitle,
    tagline,
    description,
    ...(assets.logo ? { logo: assets.logo } : {}),
    demoUrl: "https://console.velt.dev/",
    docsUrl: "https://docs.velt.dev/",
    connectBody,
    ...(assets.connectImage ? { connectImage: assets.connectImage } : {}),
    payloadBody,
    ...(assets.payloadImage ? { payloadImage: assets.payloadImage } : {}),
    unifiedBody,
    ...(assets.unifiedImage ? { unifiedImage: assets.unifiedImage } : {}),
  };
}

async function main() {
  const content = JSON.parse(readFileSync(CONTENT_PATH, "utf8"));
  const assetUrls = existsSync(ASSET_URLS_PATH)
    ? JSON.parse(readFileSync(ASSET_URLS_PATH, "utf8"))
    : {};

  const targets = ONLY ? content.filter((c) => c.slug === ONLY) : content;
  if (ONLY && targets.length === 0) {
    console.error(`No entry matching slug "${ONLY}" in integration-content.json`);
    process.exit(1);
  }

  console.log(`${DRY_RUN ? "[DRY RUN] " : ""}Seeding ${targets.length} integration(s)...`);

  for (const entry of targets) {
    console.log(`\n• ${entry.name} (${entry.slug})`);
    const logoUrl = LOGO_URLS[entry.slug];
    const perSlugAssets = assetUrls[entry.slug] || {};

    const logo = await fetchAndUpload(logoUrl);
    const connectImage = await fetchAndUpload(perSlugAssets.sectionImages?.[0]);
    const payloadImage = await fetchAndUpload(perSlugAssets.sectionImages?.[1]);
    const unifiedImage = await fetchAndUpload(perSlugAssets.sectionImages?.[2]);

    const doc = buildDoc(entry, { logo, connectImage, payloadImage, unifiedImage });

    if (DRY_RUN) {
      console.log(`  [dry-run] would createOrReplace ${doc._id}`);
      continue;
    }
    await client.createOrReplace(doc);
    console.log(`  ✓ wrote ${doc._id}`);
  }

  console.log(`\nDone.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
