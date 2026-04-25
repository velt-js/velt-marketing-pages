// Main /libraries landing page — Figma node 1:1118.
// Dark block: PageHero → LibraryDemo → TrustedLogos.
// White block: Explore Other Libraries (heading + tabs + grid in one section)
//   → inline testimonial → Enterprise Security (2×2 + cert).
// Dark tail: FAQ → GetStartedSteps (closes with its own testimonial strip) → Footer.

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TestimonialStrip } from "@/components/home/TestimonialStrip";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryDemo } from "@/components/library/LibraryDemo";
import { AllLibraries } from "@/components/library/AllLibraries";
import { LibraryFAQ } from "@/components/library/LibraryFAQ";
import {
  allLibraryCards,
  libraryTabs,
  sharedFAQ,
} from "@/components/library/shared-content";

export const metadata = {
  title: "Libraries | Velt",
  description:
    "Deep integrations with popular libraries — drop-in collaboration for Tiptap, Lexical, BlockNote, CodeMirror, SlateJS and more.",
};

function InlineTestimonial() {
  // Figma node 1:1203 — 824×132 card centered on the white block.
  // `full-bleed-bg` stretches the white strip to 100vw on viewports ≥1440
  // so it aligns edge-to-edge with the surrounding white sections.
  return (
    <section
      className="flex justify-center w-full bg-white full-bleed-bg"
      style={{ padding: "0 80px 52px" }}
    >
      <div
        className="overflow-hidden"
        style={{ width: 824, background: "#111", borderRadius: 24 }}
      >
        <TestimonialStrip />
      </div>
    </section>
  );
}

export default function LibrariesLandingPage() {
  return (
    <ScaleWrapper>
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated
          heading="Deep Integrations with Popular Libraries"
          subheading="Velt has 6+ deep integrations with popular libraries"
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <LibraryDemo />

        <TrustedLogos />

        <AllLibraries items={allLibraryCards} tabs={libraryTabs} topAccent />

        <InlineTestimonial />

        <Security />

        <LibraryFAQ items={sharedFAQ} />

        <GetStartedSteps />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
