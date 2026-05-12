// Dynamic per-migration detail page driven by Sanity. One migrationPage
// document per route, e.g. /migrate/liveblocks. The body is rendered by
// the shared MigrationPageBody (also used by legacy SEO duplicates
// /migrate-from-liveblocks-to-velt and /migrate-from-cord-to-velt).

import {
  MigrationPageBody,
  type MigrationPageDoc,
} from "@/components/migrate/MigrationPageBody";
import {
  getAllMigrationSlugs,
  getMigrationPageBySlug,
} from "@/sanity/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllMigrationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getMigrationPageBySlug(slug)) as MigrationPageDoc | null;
  if (!doc) return {};
  const cleanMetaTitle = doc.metaTitle?.replace(/\s+[—|]\s+Velt\s*$/i, "");
  const title = cleanMetaTitle ?? doc.hero.heading;
  const description = doc.metaDescription ?? doc.hero.subheading;
  return {
    title,
    description,
    alternates: { canonical: `/migrate/${slug}` },
    openGraph: {
      url: `https://velt.dev/migrate/${slug}`,
      title: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
      description,
      ...(doc.ogImage ? { images: [{ url: doc.ogImage }] } : {}),
    },
  };
}

export default async function MigrateSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <MigrationPageBody sanitySlug={slug} />;
}
