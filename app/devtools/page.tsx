// New-theme /devtools (Chrome Extension) page.
//
// Rendered fully locally from app/devtools/content.tsx — no Sanity document is
// read or written, so nothing here touches the live CMS. This static route
// shadows the dynamic app/(features)/[slug] route for /devtools (Next.js
// prioritises static routes), so locally /devtools serves this new-theme page
// while the legacy CMS doc is left untouched.

import type { Metadata } from "next";

import StaticFeaturePage from "@/app/_seo/StaticFeaturePage";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

import { devtoolsContent } from "./content";

export const metadata: Metadata = buildPageMetadata({
  title: "Velt DevTools: debug Velt in your browser",
  description:
    "A Chrome extension to debug your Velt integration: installation overview, data inspector, live event stream, component inspector, and SDK version switching.",
  path: "/devtools",
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
    />
  );
}
