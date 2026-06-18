// /comparison — recreated on the editorial home-new theme (scoped under
// `.vlp`, canonical `--vlp-*` tokens; see design-guides/DESIGN.md). Mirrors
// the /pricing + /blog redesign: hero → trust marquee → six-reason head-to-
// head cards + pricing-model compare → final CTA. Reason copy lives in
// components/comparison-new/comparison-data.ts. All SEO/JSON-LD preserved.

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import TrustStrip from "@/components/home-new/TrustStrip";
import ComparisonHero from "@/components/comparison-new/ComparisonHero";
import ComparisonReasons from "@/components/comparison-new/ComparisonReasons";
import ComparisonCta from "@/components/comparison-new/ComparisonCta";
import "@/components/home-new/styles.css";

import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { COMPARISON_WEBPAGE_SCHEMA } from "@/lib/bespoke-jsonld";

const COMPARISON_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Comparison", url: `${SITE_URL}/comparison` },
]);

const COMPARISON_WEBPAGE = buildWebPageSchema({
  name: "Velt vs Competitors: 6 Reasons Velt Outperforms",
  description:
    "100% better experience with 90% less code. See why teams choose Velt over alternatives — product maturity, implementation cost, scalability, UX, security, and support.",
  url: `${SITE_URL}/comparison`,
  breadcrumb: COMPARISON_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Velt vs Competitors: 6 Reasons Velt Outperforms",
  description:
    "100% better experience with 90% less code. See why teams choose Velt over alternatives — product maturity, implementation cost, scalability, UX, security, and support.",
  path: "/comparison",
  ogImage: "/og/comparison.png",
});

export default function ComparisonPage() {
  return (
    <div className="vlp">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id="ld-comparison-webpage" data={COMPARISON_WEBPAGE} />
      <JsonLd id="ld-comparison-breadcrumb" data={COMPARISON_BREADCRUMB} />
      {/* Framer-ported bespoke schema (Script 15): adds SDK keywords,
          about SoftwareApplication featureList, and competitor-comparison
          customer mentions. */}
      <JsonLd id="ld-comparison-framer" data={COMPARISON_WEBPAGE_SCHEMA} />

      <Nav />
      <div className="vlp-page">
        <a id="top" />
        <ComparisonHero />
        <TrustStrip />
        <ComparisonReasons />
        <ComparisonCta />
        <Footer />
      </div>
    </div>
  );
}
