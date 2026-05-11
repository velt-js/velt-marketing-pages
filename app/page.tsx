import type { Metadata } from "next";
import { JsonLd } from "./_seo/JsonLd";
import {
  ORG_ID,
  ORG_OG_IMAGE,
  SITE_URL,
} from "./_seo/schema";
import { ScaleWrapper } from "@/components/home/ScaleWrapper";
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

// Figma y-positions for top-level sections (8506:97015, 1440×11703):
//   Nav          y=0    h=57    (floats over Hero top)
//   Hero         y=0    h=1174
//   TrustedLogos y=1251 h=216   → 77 gap from Hero end
//   Outcomes     y=1544 h=1032  → 77 gap from TrustedLogos end
//   Content     y=2504 h=7014  → starts BEFORE Outcomes ends (-72 overlap)
//   GetStarted   y=9604 h=811   → 87 gap from Content Container end
//   Footer       y=10502 h=1200 → 87 gap from GetStarted end
//
// Everything inside ScaleWrapper sits at a 1440 design width that scales
// proportionally below 1440 and centers above.

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
      {/* Fixed nav — lives OUTSIDE ScaleWrapper so its position is relative to
          the viewport, not the scale-transformed inner div. Flips to white bg
          when Outcomes scrolls under it. Nav handles its own full-width bg
          with a 1440-centered inner content row. */}
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

      <ScaleWrapper>
        <div className="relative bg-black text-white font-urbanist" style={{ width: 1440 }}>
          <Hero />

        <div style={{ marginTop: 77 }}>
          <TrustedLogos />
        </div>

        <div style={{ marginTop: 77 }}>
          <Outcomes />
        </div>

        {/* White rounded content container — overlaps Outcomes' bottom padding
            by 72 px so its top-rounded corners sit inside the purple band. */}
        <div
          className="bg-white relative full-bleed-bg"
          style={{
            marginTop: -72,
            borderRadius: 52,
            paddingTop: 100,
            paddingBottom: 40,
          }}
        >
          <StealFeatures />
          <FeaturesGrid />
          <CustomerUI />
          <Connectors />
          <LibrarySupport />
          <Security />
        </div>

        <div style={{ marginTop: 40 }}>
          <GetStartedSteps />
        </div>

          <div style={{ marginTop: 87 }}>
            <Footer />
          </div>
        </div>
      </ScaleWrapper>
    </>
  );
}
