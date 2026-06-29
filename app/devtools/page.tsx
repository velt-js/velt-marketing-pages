// New-theme /devtools (Chrome Extension) page.
//
// Rendered fully locally from app/devtools/content.tsx — no Sanity document is
// read or written, so nothing here touches the live CMS. This static route
// shadows the dynamic app/(features)/[slug] route for /devtools (Next.js
// prioritises static routes), so locally /devtools serves this new-theme page
// while the legacy CMS doc is left untouched.

import type { Metadata } from "next";

import StaticFeaturePage from "@/app/_seo/StaticFeaturePage";
import FeaturePageView from "@/components/feature-new/FeaturePageView";
import Enterprise from "@/components/home-new/Enterprise";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

import { devtoolsContent } from "./content";

export const metadata: Metadata = buildPageMetadata({
  title: "Velt DevTools: Debug Your Integration in the Browser",
  description:
    "A Chrome extension to debug your Velt integration: installation overview, data inspector, live event stream, component inspector, and SDK version switching.",
  path: "/devtools",
  ogImage: "/og/devtools.png",
});

/**
 * The DevTools Chrome Extension marketing page.
 * @returns {JSX.Element} The rendered page.
 */
export default function DevtoolsPage() {
  return (
    <StaticFeaturePage
      content={devtoolsContent}
      pageTitle="DevTools"
      description={devtoolsContent.hero.secondary}
    >
      <FeaturePageView content={devtoolsContent} enterpriseSection={<Enterprise />} />
    </StaticFeaturePage>
  );
}
