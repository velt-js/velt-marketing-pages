import type { Metadata } from "next";
import "@/components/home-new/styles.css";

import { JsonLd } from "./_seo/JsonLd";
import {
  ORG_ID,
  ORG_OG_IMAGE,
  SITE_URL,
  buildFaqPageSchema,
} from "./_seo/schema";
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
import CtaBanner from "@/components/home-new/CtaBanner";
import Integrations from "@/components/home-new/Integrations";
import Enterprise from "@/components/home-new/Enterprise";
import Verticals from "@/components/home-new/Verticals";
import Faq from "@/components/home-new/Faq";
import { FAQS } from "@/components/home-new/faq-data";
import Proof from "@/components/home-new/Proof";
import CustomerShowcase from "@/components/home-new/CustomerShowcase";
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

// FAQPage schema built from the SAME source the on-page accordion
// renders (the exported `FAQS`), so the rendered text and the JSON-LD
// mirror each other exactly (spec Part 3.5 + Part 5.7 gate 6). All
// rendered questions are emitted, not just the spec's minimum set.
const HOME_FAQ_SCHEMA = buildFaqPageSchema(
  FAQS.map((item) => ({ question: item.q, answer: item.a })),
);

// Public signup / console URL. Mirrors FinalCta's CONSOLE_URL so every
// "Get Free API Key" action across the page points at the same destination.
const CONSOLE_URL = "https://console.velt.dev/";

// Framework logos for CTA banner #1. Logos reused from the Integrations
// nav-icons set; HTML has no brand asset, so it renders as a text label.
const CTA_FRAMEWORKS = [
  { name: "React", logoSrc: "/images/home/nav-icons/react.svg" },
  { name: "Next.js", logoSrc: "/images/home/nav-icons/nextdotjs.svg" },
  { name: "Vue", logoSrc: "/images/home/nav-icons/vuedotjs.svg" },
  { name: "Angular", logoSrc: "/images/home/nav-icons/angular.svg" },
  { name: "HTML" },
];

export default function Home() {
  return (
    <div className="vlp">
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
      {/* FAQPage mirroring the rendered FAQ accordion exactly. Built from
          the same `FAQS` source the <Faq /> section renders, so the two
          can never drift (spec Part 5.7 gate 6). */}
      <JsonLd id="ld-home-faq" data={HOME_FAQ_SCHEMA} />

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
        <CtaBanner
          kicker="Start free"
          heading="Get your API key and ship the first review surface today."
          ctaLabel="Get Free API Key"
          ctaHref={CONSOLE_URL}
          ctaExternal
          microcopy="No credit card."
          frameworks={CTA_FRAMEWORKS}
        />
        <Integrations />
        <Enterprise />
        <Verticals />
        <Faq />
        <Proof />
        <CustomerShowcase />
        <CtaBanner
          dark
          kicker="See it live"
          heading="Watch Velt run on your own product."
          ctaLabel="Book Demo"
          ctaHref="/book-demo"
          microcopy="30 minutes, with an engineer, not a sales deck."
        />
        <FinalCta />
        <Footer />
      </div>
    </div>
  );
}
