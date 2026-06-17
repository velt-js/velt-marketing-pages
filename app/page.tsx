import type { Metadata } from "next";
import "@/components/home-new/styles.css";

import { JsonLd } from "./_seo/JsonLd";
import { ORG_ID, ORG_OG_IMAGE, SITE_URL } from "./_seo/schema";
import {
  HOMEPAGE_PRODUCT_SCHEMA,
  HOMEPAGE_SOFTWARE_APPLICATION_SCHEMA,
} from "@/lib/bespoke-jsonld";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

import Nav from "@/components/home-new/Nav";
import Hero from "@/components/home-new/Hero";
import TrustStrip from "@/components/home-new/TrustStrip";
import Problem from "@/components/home-new/Problem";
import WhyNow from "@/components/home-new/WhyNow";
import Primitives from "@/components/home-new/Primitives";
import Collaboration from "@/components/home-new/Collaboration";
import HowItWorks from "@/components/home-new/HowItWorks";
import Integrations from "@/components/home-new/Integrations";
import Enterprise from "@/components/home-new/Enterprise";
import Verticals from "@/components/home-new/Verticals";
import Faq from "@/components/home-new/Faq";
import Proof from "@/components/home-new/Proof";
import FinalCta from "@/components/home-new/FinalCta";
import Footer from "@/components/home-new/Footer";

// Homepage meta follows the website spec (Part 3.1): the title leads with
// "Velt |" (a deliberate prefix, unlike the site-wide "{title} | Velt"
// suffix), so it is set as an absolute title to bypass the layout template.
export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Add a pull request to your product",
    description:
      "Embeddable review and approval for AI-native apps. Comments, approval flows, review agents, memory, and audit trails in one SDK.",
    path: "/",
    socialTitle: "Velt | Add a pull request to your product",
  }),
  title: { absolute: "Velt | Add a pull request to your product" },
};

// SoftwareApplication schema for the homepage. `applicationCategory:
// DeveloperApplication` signals this is a developer tool (vs SaaS app),
// and `offers` points at the public pricing page so Google can surface
// the free tier in result snippets.
const HOME_SOFTWARE_APPLICATION = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Velt",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Velt is embeddable review and approval for AI-native apps: comments, approval flows, review agents, suggestions, audit trails, memory, and notifications in one SDK. Agents do the work, humans decide.",
  image: ORG_OG_IMAGE,
  publisher: { "@id": ORG_ID },
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/pricing`,
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Free tier for development and early production",
  },
};

export default function Home() {
  return (
    <div className="vlp">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1&family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id="ld-home-software" data={HOME_SOFTWARE_APPLICATION} />
      {/* Framer-ported bespoke SoftwareApplication (Script 20) — adds
          aggregateRating, named Review entities, Offer tiers, full
          featureList, and social `sameAs` links. The reviews are what
          light up rich snippets in SERPs. */}
      <JsonLd
        id="ld-home-software-framer"
        data={HOMEPAGE_SOFTWARE_APPLICATION_SCHEMA}
      />
      {/* Framer-ported Product schema (Script 22) — sits alongside the
          SoftwareApplication entities above. */}
      <JsonLd id="ld-home-product-framer" data={HOMEPAGE_PRODUCT_SCHEMA} />

      <Nav />
      <div className="vlp-page">
        <a id="top" />
        <Hero />
        <TrustStrip />
        <Problem />
        <WhyNow />
        <Primitives />
        <Collaboration />
        <HowItWorks />
        <Integrations />
        <Enterprise />
        <Verticals />
        <Faq />
        <Proof />
        <FinalCta />
        <Footer />
      </div>
    </div>
  );
}
