// New-theme /platform (Admin Console) page.
//
// Rendered fully locally from app/platform/content.tsx — no Sanity document is
// read or written, so nothing here touches the live CMS. This static route
// shadows the dynamic app/(features)/[slug] route for /platform (Next.js
// prioritises static routes), so locally /platform serves this new-theme page
// while the legacy v1 `admin-console` CMS doc is left untouched.

import type { Metadata } from "next";

import StaticFeaturePage from "@/app/_seo/StaticFeaturePage";
import FeaturePageView from "@/components/feature-new/FeaturePageView";
import Enterprise from "@/components/home-new/Enterprise";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

import { platformContent } from "./content";

export const metadata: Metadata = buildPageMetadata({
  title: "Velt Admin Console: run your review layer",
  description:
    "One console to measure adoption, debug live, explore and export data, configure features, and automate Velt through REST APIs and webhooks.",
  path: "/platform",
  ogImage: "/og/platform.png",
});

/**
 * The Admin Console marketing page.
 * @returns {JSX.Element} The rendered page.
 */
export default function PlatformPage() {
  return (
    <StaticFeaturePage
      content={platformContent}
      pageTitle="Admin Console"
      description={platformContent.hero.secondary}
    >
      <FeaturePageView content={platformContent} enterpriseSection={<Enterprise />} />
    </StaticFeaturePage>
  );
}
