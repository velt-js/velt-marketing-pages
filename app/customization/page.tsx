// New-theme /customization page.
//
// Rendered fully locally from app/customization/content.tsx — no Sanity document
// is read or written. This replaces the previous old-theme static page; the old
// components under components/customization/* are left in place (unused). The
// page reuses the standard feature-new sections plus two bespoke sections (the
// presentation Spectrum and the examples Gallery) via CustomizationView.

import type { Metadata } from "next";

import StaticFeaturePage from "@/app/_seo/StaticFeaturePage";
import CustomizationView from "@/components/feature-new/CustomizationView";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

import { customizationContent, spectrumContent, galleryContent } from "./content";

export const metadata: Metadata = buildPageMetadata({
  title: "Velt Customization: themes, components, APIs",
  description:
    "Make Velt's collaboration UI match your product: CSS theming, wireframes, primitives in your own UI library, headless hooks, and behavior APIs.",
  path: "/customization",
  ogImage: "/og/customization.png",
});

/**
 * The Customization marketing page.
 * @returns {JSX.Element} The rendered page.
 */
export default function CustomizationPage() {
  return (
    <StaticFeaturePage
      content={customizationContent}
      pageTitle="Customization"
      description={customizationContent.hero.secondary}
    >
      <CustomizationView
        content={customizationContent}
        spectrum={spectrumContent}
        gallery={galleryContent}
      />
    </StaticFeaturePage>
  );
}
