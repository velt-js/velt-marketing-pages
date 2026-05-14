// /customers — single index page (no [slug]). Composition mirrors the
// Figma 2026 template (HqWIZdR6ISJmaG2n4o3gr8 node 534:3821):
//   1. Hero (PageHero, decorated)
//   2. CustomerUI ("How [Pendo] Integrates Velt" — defaults match Figma)
//   3. CustomersLogoGrid (3 × 9 grid of B&W customer logos)
//   4. FeatureCustomerCarousel ("Our Customers Trust Us")
//   5. GetStartedSteps + Footer

import { Footer } from "@/components/home/Footer";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { CustomerUI } from "@/components/home/CustomerUI";
import { PageHero } from "@/components/library/PageHero";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";

import { CustomersLogoGrid } from "@/components/customers/CustomersLogoGrid";
import { customerLogos } from "@/components/customers/customer-logos";
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
    <>
      <JsonLd id="ld-customers-webpage" data={CUSTOMERS_WEBPAGE} />
      <JsonLd id="ld-customers-breadcrumb" data={CUSTOMERS_BREADCRUMB} />
      {/* Framer-ported bespoke schema (Script 14): adds the
          SoftwareApplication mainEntity, 37 customer Organization
          mentions, and 5 Review entities with ratingValue 5 — the
          ratings are the most SEO-valuable piece. */}
      <JsonLd id="ld-customers-framer" data={CUSTOMERS_WEBPAGE_SCHEMA} />
      <div
        className="relative bg-black text-white font-urbanist w-full overflow-x-hidden"
      >
        <PageHero
          decorated
          heading="Products using Velt to boost engagement and growth"
          subheading="Explore 15+ customers interfaces featuring Velt"
          primaryCta={{
            label: "Start Free Trial",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{
            label: "View Docs",
            href: "https://docs.velt.dev/",
            newTab: true,
          }}
        />

        {/* Wrap CustomerUI in a full-bleed white panel with rounded top
         *  corners so the dark PageHero above shows through the curve.
         *  Pairs with CustomersLogoGrid's rounded BOTTOM corners — together
         *  the white block (CustomerUI + logo grid) reads as one rounded
         *  panel sandwiched between the dark hero above and the dark
         *  customer carousel below. */}
        <div
          className="full-bleed-bg"
          style={{
            background: "#FFFFFF",
            borderTopLeftRadius: 52,
            borderTopRightRadius: 52,
            overflow: "hidden",
          }}
        >
          <CustomerUI />
        </div>

        <CustomersLogoGrid entries={customerLogos} />

        <FeatureCustomerCarousel />

        <section data-getstarted>
          <GetStartedSteps />
          <Footer />
        </section>
      </div>
    </>
  );
}
