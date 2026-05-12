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
import { buildPageMetadata } from "@/app/_seo/page-metadata";

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
  const title = doc.metaTitle ?? `${doc.hero.heading} | Velt`;
  const description = doc.metaDescription ?? doc.hero.subheading ?? "";
  return buildPageMetadata({
    title,
    description,
    path: `/migrate/${slug}`,
    ogImage: doc.ogImage ?? undefined,
  });
}

export default async function MigrateSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <MigrationPageBody sanitySlug={slug} />;
}
