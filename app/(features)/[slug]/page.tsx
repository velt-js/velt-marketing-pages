// Dynamic per-feature page driven by Sanity. One featurePage document per
// route. The body is rendered by the shared FeaturePageBody component
// (also used by SEO duplicates like /add-notifications-quick).
//
// Routes live at the root (e.g. /comments, /recordings) via the (features)
// route group. Next.js prioritizes static routes over this dynamic [slug],
// so existing routes like /blog or /pricing are unaffected. A Sanity slug
// that collides with a static route name will silently 404 — pick slugs
// that don't shadow existing folders under app/.

import fs from "node:fs";
import path from "node:path";

import {
  FeaturePageBody,
  type FeaturePageDoc,
} from "@/components/feature/FeaturePageBody";
import {
  getAllFeatureSlugs,
  getFeaturePageBySlug,
} from "@/sanity/queries";
import { sanitySlugToUrl, urlSlugToSanity } from "@/lib/feature-slugs";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

export const revalidate = 60;

// Snapshot of which slug-keyed OG images are bundled in /public/og/. Built
// once at module load — the directory is static (changes require a deploy)
// so re-reading on every request would be wasted I/O. Used by
// generateMetadata to decide whether to point at /og/{slug}.png or fall
// back to the site-wide default.
const OG_DIR = path.join(process.cwd(), "public", "og");
const AVAILABLE_OG_SLUGS: ReadonlySet<string> = (() => {
  try {
    return new Set(
      fs
        .readdirSync(OG_DIR)
        .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
        .map((name) => name.replace(/\.(png|jpe?g|webp)$/i, ""))
    );
  } catch {
    return new Set<string>();
  }
})();

export async function generateStaticParams() {
  const slugs = await getAllFeatureSlugs();
  return slugs.map((slug) => ({ slug: sanitySlugToUrl(slug) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getFeaturePageBySlug(urlSlugToSanity(slug))) as FeaturePageDoc | null;
  if (!doc) return {};
  const title = doc.metaTitle ?? `${doc.hero.heading} | Velt`;
  const description = doc.metaDescription ?? doc.hero.subheading ?? "";
  // Prefer Sanity-supplied OG image. Fall back to a bundled per-slug image
  // (/og/{slug}.png) only when one actually exists — otherwise leave
  // `ogImage` undefined so the helper drops in the site-wide default.
  // Without the existence check, slugs without a downloaded image would
  // emit a broken /og/{slug}.png URL.
  const ogImage =
    doc.ogImage ??
    (AVAILABLE_OG_SLUGS.has(slug) ? `/og/${slug}.png` : undefined);
  return buildPageMetadata({
    title,
    description,
    path: `/${slug}`,
    ogImage,
  });
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <FeaturePageBody sanitySlug={urlSlugToSanity(slug)} pageUrlPath={slug} />;
}
