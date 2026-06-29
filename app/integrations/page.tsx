// Reskinned /integrations hub (new editorial .vfp theme). Renders the EXISTING
// tool-connection roster (Slack, Discord, S3, HubSpot, Zapier, SendGrid, ...)
// from the static integration card list, grouped by category, via the shared
// IntegrationsHubView. Same content as before, new skin. Per-tool detail pages
// live at /integrations/{slug} (see [slug]/page.tsx).

import type { Metadata } from "next";

import IntegrationsHubView from "@/components/integrations-new/IntegrationsHubView";
import type {
  IntegrationCard,
  IntegrationsHubContent,
} from "@/components/integrations-new/content";
import {
  allIntegrationCards,
  integrationTabs,
} from "@/components/integration/shared-content";
import { sharedFAQ } from "@/components/library/shared-content";
import { JsonLd } from "@/app/_seo/JsonLd";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildItemListSchema,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const TITLE = "Integrations: Slack, Teams, HubSpot, Zapier & More";
const DESCRIPTION =
  "Connect Velt with the tools your team already uses: Slack, Discord, Microsoft Teams, HubSpot, Zapier, Sendgrid, Resend, Segment and more.";

export const metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/integrations",
});

/**
 * Derive the slug for a card from its learn-more href (/integrations/{slug}).
 * @param {string} [href] The card's learnMoreHref.
 * @returns {string} The slug, or "" when not derivable.
 */
function slugFromHref(href?: string): string {
  try {
    return href ? href.replace(/^\/integrations\//, "") : "";
  } catch (error) {
    console.error("slugFromHref failed", error);
    return "";
  }
}

// A logo wider than this aspect ratio (width / height) is treated as a
// wordmark — the brand name is already in the image, so the chip drops the
// redundant text label and renders the logo wide instead. Square-ish icon
// logos (Segment, Inngest, Windmill) stay icon + text.
const WORDMARK_ASPECT = 1.8;

/**
 * Decide whether a card's logo is a wordmark from its intrinsic dimensions.
 * @param {number} [width] Logo intrinsic width.
 * @param {number} [height] Logo intrinsic height.
 * @returns {boolean} True when the logo already contains the brand name.
 */
function isWordmark(width?: number, height?: number): boolean {
  try {
    if (!width || !height) return false;
    return width / height > WORDMARK_ASPECT;
  } catch (error) {
    console.error("isWordmark failed", error);
    return false;
  }
}

/**
 * Group the static integration cards into categories, ordered by the tab list.
 * @returns {IntegrationsHubContent} The hub content.
 */
function buildHubContent(): IntegrationsHubContent {
  const order = integrationTabs
    .map((tab) => tab.label)
    .filter((label) => label !== "All");
  const byCategory = new Map<string, IntegrationCard[]>();
  for (const card of allIntegrationCards) {
    const list = byCategory.get(card.category) ?? [];
    list.push({
      name: card.name,
      slug: slugFromHref(card.learnMoreHref),
      logoSrc: card.logoSrc,
      logoAlt: card.logoAlt ?? card.name,
      category: card.category,
      nameInLogo: isWordmark(card.logoWidth, card.logoHeight),
    });
    byCategory.set(card.category, list);
  }
  const categories = order
    .filter((label) => (byCategory.get(label)?.length ?? 0) > 0)
    .map((label) => ({ label, items: byCategory.get(label) ?? [] }));
  return { categories };
}

export default function IntegrationsHubPage() {
  const content = buildHubContent();

  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Integrations", url: `${SITE_URL}/integrations` },
  ]);
  const webpage = buildWebPageSchema({
    name: `${TITLE} | Velt`,
    description: DESCRIPTION,
    url: `${SITE_URL}/integrations`,
    breadcrumb,
  });
  const itemList = buildItemListSchema({
    name: "Velt integrations",
    items: content.categories.flatMap((category) =>
      category.items.map((item) => ({
        name: item.name,
        url: `${SITE_URL}/integrations/${item.slug}`,
      })),
    ),
  });
  const faqSchema = buildFaqPageSchemaFromEntries(sharedFAQ);

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

      <IntegrationsHubView content={content} />
    </>
  );
}
