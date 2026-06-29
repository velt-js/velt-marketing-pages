import LegalPageView from "@/components/legal-new/LegalPageView";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

const TERMS_DESCRIPTION =
  "Read the Terms of Service governing your use of Velt's collaboration SDK, APIs, and website, including your rights, responsibilities, and acceptable use.";

// Concise hero line (the full sentence above stays the meta description).
const TERMS_SUBTITLE =
  "The terms governing your use of Velt's collaboration SDK, APIs, and website.";

// Termly-hosted policy document embedded in the reading card.
const TERMS_DOCUMENT_SRC =
  "https://app.termly.io/document/terms-of-service/12eba4c6-ddd6-47bf-8244-d0e34fa06ffa";

const TERMS_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Terms of Service", url: `${SITE_URL}/terms` },
]);

const TERMS_WEBPAGE = buildWebPageSchema({
  name: "Terms of Service: Velt",
  description: TERMS_DESCRIPTION,
  url: `${SITE_URL}/terms`,
  breadcrumb: TERMS_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Terms of Service for the Velt Collaboration Platform",
  description: TERMS_DESCRIPTION,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPageView
      title="Terms of service"
      subtitle={TERMS_SUBTITLE}
      documentSrc={TERMS_DOCUMENT_SRC}
      documentTitle="Terms of Service"
    >
      <JsonLd id="ld-terms-webpage" data={TERMS_WEBPAGE} />
      <JsonLd id="ld-terms-breadcrumb" data={TERMS_BREADCRUMB} />
    </LegalPageView>
  );
}
