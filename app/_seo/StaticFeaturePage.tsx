import type { ReactNode } from "react";

import FeaturePageView from "@/components/feature-new/FeaturePageView";
import type { FeaturePageContent } from "@/components/feature-new/content";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchema,
  buildWebPageSchema,
} from "@/app/_seo/schema";

// Shared shell for the new-theme platform pages that are rendered locally from
// an in-repo FeaturePageContent module (not Sanity): /platform, /devtools, and
// /customization. It mirrors the chrome the Sanity-backed app/(features)/[slug]
// route emits — Google Fonts preconnect + stylesheet and the WebPage /
// BreadcrumbList / FAQPage JSON-LD graph — so a static page is
// indistinguishable from a CMS-driven one to crawlers, with zero CMS reads or
// writes. Pass `extra` to render bespoke sections (e.g. the customization view)
// instead of the default FeaturePageView.

type StaticFeaturePageProps = {
  content: FeaturePageContent;
  /** Page title used in WebPage + breadcrumb (defaults to the hero title). */
  pageTitle?: string;
  /** Meta description used in the WebPage node (defaults to hero secondary). */
  description?: string;
  /** Breadcrumb label for the final crumb (defaults to pageTitle). */
  breadcrumbLabel?: string;
  /** Optional custom body; when omitted, the default FeaturePageView renders. */
  children?: ReactNode;
};

/**
 * Render a locally-authored feature/platform page with the same fonts and
 * JSON-LD as the Sanity route.
 * @param {StaticFeaturePageProps} props The page content and SEO overrides.
 * @returns {JSX.Element} The composed page.
 */
export default function StaticFeaturePage({
  content,
  pageTitle,
  description,
  breadcrumbLabel,
  children,
}: StaticFeaturePageProps) {
  const slug = content.slug;
  const pageUrl = `${SITE_URL}/${slug}`;
  const desc = description ?? content.hero.secondary;
  // WebPage.name mirrors the page H1 (the hero title) so the structured data
  // matches the visible heading. The breadcrumb keeps the short label
  // (pageTitle) because breadcrumb crumbs read better short.
  const webPageName = content.hero.title;
  const crumb = breadcrumbLabel ?? pageTitle ?? content.hero.title;

  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Features", url: `${SITE_URL}/features` },
    { name: crumb, url: pageUrl },
  ]);

  const webPage = buildWebPageSchema({
    name: webPageName,
    description: desc,
    url: pageUrl,
    breadcrumb,
  });

  const faqSchema = buildFaqPageSchema(
    (content.faq.items ?? []).map((item) => ({ question: item.q, answer: item.a })),
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id={`ld-${slug}-webpage`} data={webPage} />
      <JsonLd id={`ld-${slug}-breadcrumb`} data={breadcrumb} />
      <JsonLd id={`ld-${slug}-faq`} data={faqSchema} />

      {children ?? <FeaturePageView content={content} />}
    </>
  );
}
