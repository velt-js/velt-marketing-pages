// Redesigned per-integration spoke at /integrations/{slug}, driven by the
// Sanity `integrationLibrary` collection and rendered by the shared SpokeView.
// Adding a new integration is a matter of seeding a doc
// (scripts/seed-integration-libraries.mjs) — no new code required. The legacy
// tool-connection detail pages now live at /integrations-old/{slug}.

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SpokeView from "@/components/integrations-new/SpokeView";
import { toSpokeContent } from "@/lib/integrations-v2/to-spoke-content";
import type {
  RawSpoke,
  RosterRow,
} from "@/lib/integrations-v2/to-spoke-content";
import {
  getAllIntegrationLibraries,
  getAllIntegrationLibrarySlugs,
  getIntegrationLibraryBySlug,
} from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildHowToSchema,
  buildWebPageSchema,
} from "@/app/_seo/schema";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getAllIntegrationLibrarySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("integrations generateStaticParams failed", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const doc = (await getIntegrationLibraryBySlug(slug)) as RawSpoke | null;
    if (!doc) return {};
    const title = doc.metaTitle ?? `${doc.heroTitle ?? doc.name} | Velt`;
    const description = doc.metaDescription ?? doc.heroSecondary ?? undefined;
    return buildPageMetadata({
      title,
      description: description ?? "",
      path: `/integrations/${slug}`,
    });
  } catch (error) {
    console.error("integrations spoke generateMetadata failed", error);
    return {};
  }
}

export default async function IntegrationSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [doc, roster] = await Promise.all([
    getIntegrationLibraryBySlug(slug) as Promise<RawSpoke | null>,
    getAllIntegrationLibraries() as Promise<RosterRow[]>,
  ]);

  if (!doc) {
    notFound();
  }

  const content = toSpokeContent(doc, roster ?? []);

  const pageUrl = `${SITE_URL}/integrations/${slug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Integrations", url: `${SITE_URL}/integrations` },
    { name: content.name, url: pageUrl },
  ]);
  const webpage = buildWebPageSchema({
    name: content.metaTitle ?? `${content.heroTitle} | Velt`,
    description: content.metaDescription ?? content.heroSecondary,
    url: pageUrl,
    breadcrumb,
  });
  const faqSchema = buildFaqPageSchemaFromEntries(content.faq);
  const howTo =
    content.kind === "surface"
      ? buildHowToSchema({
          name: `Add Velt to ${content.name}`,
          steps: [
            `Install the SDK and the surface adapter: npm install ${content.setupPackages ?? "@veltdev/react"}`,
            "Wrap your app in VeltProvider with your API key and set the document.",
            `Mount the Velt primitive on ${content.name}, and the CRDT adapter for co-editing.`,
          ],
        })
      : null;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id={`ld-integration-${slug}-webpage`} data={webpage} />
      <JsonLd id={`ld-integration-${slug}-breadcrumb`} data={breadcrumb} />
      <JsonLd id={`ld-integration-${slug}-faq`} data={faqSchema} />
      {howTo ? (
        <JsonLd id={`ld-integration-${slug}-howto`} data={howTo} />
      ) : null}

      <SpokeView content={content} />
    </>
  );
}
