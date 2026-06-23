// /libraries hub (v2). Driven by the Sanity `librariesHubPage` singleton plus
// the `libraryPageV2` roster (the grid bands + capability matrix derive from
// the roster). Rendered by the shared HubView. The per-library detail pages
// live at /libraries/{slug} (v2-first, with the legacy libraryPage as v1
// fallback). See app/libraries/[slug]/page.tsx.

import type { Metadata } from "next";

import HubView from "@/components/integrations-new/HubView";
import { toHubContent } from "@/lib/integrations-v2/to-hub-content";
import type { RosterRow } from "@/lib/integrations-v2/to-spoke-content";
import { getAllLibrariesV2, getLibrariesHubPage } from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildItemListSchema,
  buildWebPageSchema,
} from "@/app/_seo/schema";

export const revalidate = 60;

const DEFAULT_TITLE = "Libraries | Add Velt to any editor, grid, or canvas | Velt";
const DEFAULT_DESCRIPTION =
  "Add comments, co-editing, presence, and agent review to Tiptap, Lexical, Monaco, CodeMirror, AG Grid, React Flow, PDFs, charts, and more, for your users and your AI agents, or bring your own surface.";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const hub = await getLibrariesHubPage();
    const title = hub?.metaTitle ?? DEFAULT_TITLE;
    const description = hub?.metaDescription ?? DEFAULT_DESCRIPTION;
    return buildPageMetadata({ title, description, path: "/libraries" });
  } catch (error) {
    console.error("libraries hub generateMetadata failed", error);
    return buildPageMetadata({
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      path: "/libraries",
    });
  }
}

export default async function LibrariesHubPage() {
  const [hubDoc, roster] = await Promise.all([
    getLibrariesHubPage(),
    getAllLibrariesV2() as Promise<RosterRow[]>,
  ]);

  const content = toHubContent(hubDoc, roster ?? []);

  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Libraries", url: `${SITE_URL}/libraries` },
  ]);
  const webpage = buildWebPageSchema({
    name: content.metaTitle ?? DEFAULT_TITLE,
    description: content.metaDescription ?? DEFAULT_DESCRIPTION,
    url: `${SITE_URL}/libraries`,
    breadcrumb,
  });
  const itemList = buildItemListSchema({
    name: "Velt libraries",
    items: (roster ?? []).map((row) => ({
      name: row?.name ?? "",
      url: `${SITE_URL}/libraries/${row?.slug ?? ""}`,
    })),
  });
  const faqSchema = buildFaqPageSchemaFromEntries(content.faq);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id="ld-libraries-webpage" data={webpage} />
      <JsonLd id="ld-libraries-breadcrumb" data={breadcrumb} />
      <JsonLd id="ld-libraries-itemlist" data={itemList} />
      <JsonLd id="ld-libraries-faq" data={faqSchema} />

      <HubView content={content} />
    </>
  );
}
