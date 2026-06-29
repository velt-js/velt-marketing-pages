import LegalPageView from "@/components/legal-new/LegalPageView";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

const PRIVACY_DESCRIPTION =
  "Learn how Velt collects, uses, and protects your personal information when you use our collaboration SDK and marketing website.";

// Concise hero line (the full sentence above stays the meta description).
const PRIVACY_SUBTITLE =
  "How Velt collects, uses, and protects your information across our SDK and website.";

// Termly-hosted policy document embedded in the reading card.
const PRIVACY_DOCUMENT_SRC =
  "https://app.termly.io/document/privacy-policy/09251705-1e42-4568-ac53-c21a494c19ac";

const PRIVACY_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
]);

const PRIVACY_WEBPAGE = buildWebPageSchema({
  name: "Privacy Policy: Velt",
  description: PRIVACY_DESCRIPTION,
  url: `${SITE_URL}/privacy`,
  breadcrumb: PRIVACY_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: PRIVACY_DESCRIPTION,
  path: "/privacy",
  ogImage: "/og/privacy.png",
});

export default function PrivacyPage() {
  return (
    <LegalPageView
      title="Privacy policy"
      subtitle={PRIVACY_SUBTITLE}
      documentSrc={PRIVACY_DOCUMENT_SRC}
      documentTitle="Privacy Policy"
    >
      <JsonLd id="ld-privacy-webpage" data={PRIVACY_WEBPAGE} />
      <JsonLd id="ld-privacy-breadcrumb" data={PRIVACY_BREADCRUMB} />
    </LegalPageView>
  );
}

