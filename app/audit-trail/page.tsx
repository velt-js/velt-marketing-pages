import type { Metadata } from "next";

import { JsonLd } from "@/app/_seo/JsonLd";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchema,
  buildWebPageSchema,
} from "@/app/_seo/schema";

import FeaturePageView from "@/components/feature-new/FeaturePageView";
import { auditTrailContent } from "@/components/feature-new/pages/audit-trail";

const PAGE_PATH = "/audit-trail";
const PAGE_TITLE = "Audit Trail";
const PAGE_DESCRIPTION =
  "An immutable record of every comment, revision, and approval — across your agents and your humans. Prove who approved what, and when. SOC 2 Type II and HIPAA ready.";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
});

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Features", url: `${SITE_URL}/features` },
  { name: PAGE_TITLE, url: PAGE_URL },
]);

const WEBPAGE_SCHEMA = buildWebPageSchema({
  name: `${PAGE_TITLE} | Velt`,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  breadcrumb: BREADCRUMB,
});

const FAQ_SCHEMA = buildFaqPageSchema(
  auditTrailContent.faq.items.map((item) => ({ question: item.q, answer: item.a })),
);

/**
 * Static Audit Trail feature page (v10 template). Renders the shared
 * FeaturePageView from the typed content module and emits WebPage,
 * BreadcrumbList, and FAQPage structured data.
 * @returns {JSX.Element} The Audit Trail page.
 */
export default function AuditTrailPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id="ld-audit-webpage" data={WEBPAGE_SCHEMA} />
      <JsonLd id="ld-audit-breadcrumb" data={BREADCRUMB} />
      <JsonLd id="ld-audit-faq" data={FAQ_SCHEMA} />

      <FeaturePageView content={auditTrailContent} />
    </>
  );
}
