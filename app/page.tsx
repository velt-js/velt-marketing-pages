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

export default function Home() {
  return (
    <ScaleWrapper>
      <div className="relative bg-black text-white font-urbanist" style={{ width: 1440 }}>
        {/* Nav is absolutely positioned so Hero's grid background spans full width under it */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
          <Nav />
        </div>

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
          className="bg-white relative"
          style={{
            marginTop: -72,
            borderRadius: 52,
            paddingTop: 100,
            paddingBottom: 100,
          }}
        >
          <StealFeatures />
          <FeaturesGrid />
          <CustomerUI />
          <Connectors />
          <LibrarySupport />
          <Security />
        </div>

        <div style={{ marginTop: 87 }}>
          <GetStartedSteps />
        </div>

        <div style={{ marginTop: 87 }}>
          <Footer />
        </div>
      </div>
    </ScaleWrapper>
  );
}
