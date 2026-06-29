// /features landing page — the "All features" index/hub. Lists every Velt
// feature from Sanity, reskinned into the new editorial theme (.vlp chrome +
// the shared .vintg hub system) to match the homepage and the /integrations and
// /libraries hubs. Content/data and the SEO graph (WebPage + Breadcrumb +
// FAQPage + ItemList JSON-LD, metadata) are preserved; only the skin changed.

import FeaturesHubView, {
  type FeatureListItem,
} from "@/components/features-new/FeaturesHubView";
import { sharedFAQ } from "@/components/library/shared-content";
import type { FaqEntry } from "@/components/libraries-new/content";
import { getAllFeaturePages } from "@/sanity/queries";
import { sanitySlugToUrl } from "@/lib/feature-slugs";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildItemListSchema,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

const FEATURES_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Features", url: `${SITE_URL}/features` },
]);

const FEATURES_WEBPAGE = buildWebPageSchema({
  name: "Features | Velt",
  description:
    "Velt's collaboration features: Commenting, Notifications, Presence, Cursors, Huddle, and more.",
  url: `${SITE_URL}/features`,
  breadcrumb: FEATURES_BREADCRUMB,
});

const FEATURES_FAQ_SCHEMA = buildFaqPageSchemaFromEntries(sharedFAQ);

export const revalidate = 60;

export const metadata = buildPageMetadata({
  title: "Features",
  description:
    "Velt's collaboration features: Commenting, Notifications, Presence, Cursors, Huddle, and more.",
  path: "/features",
});

export default async function FeaturesLandingPage() {
  const items = ((await getAllFeaturePages()) ?? []) as FeatureListItem[];

  const itemList = buildItemListSchema({
    name: "Velt features",
    items: items.map((item) => ({
      name: item?.title ?? "",
      url: `${SITE_URL}/${sanitySlugToUrl(item?.slug ?? "")}`,
    })),
  });

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id="ld-features-webpage" data={FEATURES_WEBPAGE} />
      <JsonLd id="ld-features-breadcrumb" data={FEATURES_BREADCRUMB} />
      <JsonLd id="ld-features-faq" data={FEATURES_FAQ_SCHEMA} />
      <JsonLd id="ld-features-itemlist" data={itemList} />

      <FeaturesHubView items={items} faq={sharedFAQ as FaqEntry[]} />
    </>
  );
}
