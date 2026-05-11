import type { Metadata } from "next";
import { JsonLd } from "./_seo/JsonLd";
import {
  ORG_ID,
  ORG_OG_IMAGE,
  SITE_URL,
} from "./_seo/schema";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Outcomes } from "@/components/home/Outcomes";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { StealFeatures } from "@/components/home/StealFeatures";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { CustomerUI } from "@/components/home/CustomerUI";
import { Connectors } from "@/components/home/Connectors";
import { LibrarySupport } from "@/components/home/LibrarySupport";
import { Security } from "@/components/home/Security";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "The Collaboration Stack for B2B | Velt",
  },
  description:
    "Add powerful real-time and multiplayer features to your product with Velt's easy-to-use collaboration SDK. Integrate comments, live cursors, and more in minutes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://velt.dev/",
  },
};

// Section rhythm follows Figma's 1440 design but is now responsive —
// each section owns its own horizontal max-width (container-page) and
// vertical padding (section-pad-y). The marginTops below are interim
// gaps between sections; per-component refactors will replace them
// with section-pad-y once each section is converted.

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
    "Velt is a collaboration SDK that lets B2B SaaS teams add real-time multiplayer features — comments, live cursors, presence, notifications — to their product in minutes.",
  image: ORG_OG_IMAGE,
  publisher: { "@id": ORG_ID },
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/pricing`,
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description: "Free Hacker plan with 100 Monthly Active Documents",
  },
};

export default function Home() {
  return (
    <>
      {/* Fixed nav — viewport-relative; flips to white bg when Outcomes
          scrolls under it. */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
      >
        <Nav />
      </div>
      <JsonLd id="ld-home-software" data={HOME_SOFTWARE_APPLICATION} />

      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <Hero />

        <div className="mt-10 lg:mt-[77px]">
          <TrustedLogos />
        </div>

        <div className="mt-10 lg:mt-[77px]">
          <Outcomes />
        </div>

        {/* White rounded content container — overlaps Outcomes' bottom padding
            by 72 px so its top-rounded corners sit inside the purple band.
            Smaller radius/overlap on mobile to match the compressed rhythm. */}
        <div
          className="bg-white relative -mt-10 lg:-mt-[72px] rounded-t-[28px] lg:rounded-[52px] pt-12 lg:pt-[100px] pb-8 lg:pb-10"
        >
          <StealFeatures />
          <FeaturesGrid />
          <CustomerUI />
          <Connectors />
          <LibrarySupport />
          <Security />
        </div>

        <div className="mt-6 lg:mt-10">
          <GetStartedSteps />
        </div>

        <div className="mt-12 lg:mt-[87px]">
          <Footer />
        </div>
      </div>
    </>
  );
}
