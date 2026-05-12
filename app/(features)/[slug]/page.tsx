// Dynamic per-feature page driven by Sanity. One featurePage document per
// route. The body is rendered by the shared FeaturePageBody component
// (also used by SEO duplicates like /add-notifications-quick).
//
// Routes live at the root (e.g. /comments, /recordings) via the (features)
// route group. Next.js prioritizes static routes over this dynamic [slug],
// so existing routes like /blog or /pricing are unaffected. A Sanity slug
// that collides with a static route name will silently 404 — pick slugs
// that don't shadow existing folders under app/.

import {
  FeaturePageBody,
  type FeaturePageDoc,
} from "@/components/feature/FeaturePageBody";
import {
  getAllFeatureSlugs,
  getFeaturePageBySlug,
} from "@/sanity/queries";
import { sanitySlugToUrl, urlSlugToSanity } from "@/lib/feature-slugs";

export const revalidate = 60;

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
  const cleanMetaTitle = doc.metaTitle?.replace(/\s+[—|]\s+Velt\s*$/i, "");
  const title = cleanMetaTitle ?? doc.hero.heading;
  const description = doc.metaDescription ?? doc.hero.subheading;
  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      url: `https://velt.dev/${slug}`,
      title: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
      description,
      ...(doc.ogImage ? { images: [{ url: doc.ogImage }] } : {}),
    },
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <FeaturePageBody sanitySlug={urlSlugToSanity(slug)} pageUrlPath={slug} />;
}
