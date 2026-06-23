// Redesigned /integrations hub. Driven by the Sanity `integrationsHubPage`
// singleton plus the `integrationLibrary` roster (the grid bands + capability
// matrix derive from the roster, so the hub and spokes never disagree). The
// legacy tool-connection hub now lives at /integrations-old.

import type { Metadata } from "next";

import HubView from "@/components/integrations-new/HubView";
import { toHubContent } from "@/lib/integrations-v2/to-hub-content";
import type { RosterRow } from "@/lib/integrations-v2/to-spoke-content";
import {
  getAllIntegrationLibraries,
  getIntegrationsHubPage,
} from "@/sanity/queries";
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

const DEFAULT_TITLE = "Integrations | Add Velt to any editor, grid, or canvas | Velt";
const DEFAULT_DESCRIPTION =
  "Add comments, co-editing, presence, and agent review to Tiptap, Lexical, Monaco, CodeMirror, AG Grid, React Flow, PDFs, charts, and more, for your users and your AI agents, or bring your own surface.";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const hub = await getIntegrationsHubPage();
    const title = hub?.metaTitle ?? DEFAULT_TITLE;
    const description = hub?.metaDescription ?? DEFAULT_DESCRIPTION;
    return buildPageMetadata({ title, description, path: "/integrations" });
  } catch (error) {
    console.error("integrations hub generateMetadata failed", error);
    return buildPageMetadata({
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      path: "/integrations",
    });
  }
}

export default async function IntegrationsHubPage() {
  const [hubDoc, roster] = await Promise.all([
    getIntegrationsHubPage(),
    getAllIntegrationLibraries() as Promise<RosterRow[]>,
  ]);

  const content = toHubContent(hubDoc, roster ?? []);

  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Integrations", url: `${SITE_URL}/integrations` },
  ]);
  const webpage = buildWebPageSchema({
    name: content.metaTitle ?? DEFAULT_TITLE,
    description: content.metaDescription ?? DEFAULT_DESCRIPTION,
    url: `${SITE_URL}/integrations`,
    breadcrumb,
  });
  const itemList = buildItemListSchema({
    name: "Velt integrations",
    items: (roster ?? []).map((row) => ({
      name: row?.name ?? "",
      url: `${SITE_URL}/integrations/${row?.slug ?? ""}`,
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

      <JsonLd id="ld-integrations-webpage" data={webpage} />
      <JsonLd id="ld-integrations-breadcrumb" data={breadcrumb} />
      <JsonLd id="ld-integrations-itemlist" data={itemList} />
      <JsonLd id="ld-integrations-faq" data={faqSchema} />

      <HubView content={content} />
    </>
  );
}
