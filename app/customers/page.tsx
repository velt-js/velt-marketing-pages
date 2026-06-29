// /customers — recreated on the editorial home-new theme (scoped under
// `.vlp`, canonical `--vlp-*` tokens; see design-guides/DESIGN.md). Mirrors
// the /pricing + /blog + /comparison redesign: hero + stat row → logo wall →
// testimonial grid → final CTA. Customer logo data still lives in
// components/customers/customer-logos.ts; testimonial copy is ported into
// components/customers-new/CustomersStories.tsx. All SEO/JSON-LD preserved.

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import CustomersHero from "@/components/customers-new/CustomersHero";
import CustomersLogos from "@/components/customers-new/CustomersLogos";
import CustomersStories from "@/components/customers-new/CustomersStories";
import CustomersCta from "@/components/customers-new/CustomersCta";
import "@/components/home-new/styles.css";

import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { CUSTOMERS_WEBPAGE_SCHEMA } from "@/lib/bespoke-jsonld";

const CUSTOMERS_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Customers", url: `${SITE_URL}/customers` },
]);

const CUSTOMERS_WEBPAGE = buildWebPageSchema({
  name: "Velt Customers: Trusted by Google, Pendo & More",
  description:
    "See how Google, Pendo, Runway, and 50+ companies use Velt to add collaboration features. Increased engagement by 26%, saved 3 FTEs, and shipped 5x faster.",
  url: `${SITE_URL}/customers`,
  breadcrumb: CUSTOMERS_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Velt Customers: Trusted by Google, Pendo & More",
  description:
    "See how Google, Pendo, Runway, and 50+ companies use Velt to add collaboration features. Increased engagement by 26%, saved 3 FTEs, and shipped 5x faster.",
  path: "/customers",
});

export default function CustomersPage() {
  return (
    <div className="vlp">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id="ld-customers-webpage" data={CUSTOMERS_WEBPAGE} />
      <JsonLd id="ld-customers-breadcrumb" data={CUSTOMERS_BREADCRUMB} />
      {/* Framer-ported bespoke schema (Script 14): adds the
          SoftwareApplication mainEntity, customer Organization mentions, and
          Review entities with ratingValue 5 — the ratings are the most
          SEO-valuable piece. */}
      <JsonLd id="ld-customers-framer" data={CUSTOMERS_WEBPAGE_SCHEMA} />

      <Nav />
      <div className="vlp-page">
        <a id="top" />
        <CustomersHero />
        <CustomersLogos />
        <CustomersStories />
        <CustomersCta />
        <Footer />
      </div>
    </div>
  );
}
