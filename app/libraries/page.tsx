// Main /libraries landing page — Figma node 1:1118. Composition order
// matches the HTML reference: dark hero + demo + tabs sit on the black
// block; the white content block carries the tabs row, All Libraries
// grid, testimonial, Enterprise Security, and another testimonial; the
// black tail carries FAQ, Get Started, and a closing testimonial strip.

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TestimonialStrip } from "@/components/home/TestimonialStrip";
import { PageHero } from "@/components/library/PageHero";
import { DemoPlayer } from "@/components/library/DemoPlayer";
import { LibraryTabs } from "@/components/library/LibraryTabs";
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
  return (
    <section
      className="flex justify-center w-full bg-white"
      style={{ padding: "0 80px 52px" }}
    >
      <div
        className="overflow-hidden"
        style={{ width: 1280, background: "#111", borderRadius: 24 }}
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
          eyebrow={{ label: "Deep Library Integrations" }}
          heading="Deep Integrations with Popular Libraries"
          subheading="Velt has deep integrations with popular libraries"
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <DemoPlayer label="All Libraries Demo" />

        <LibraryTabs tabs={libraryTabs} />

        <AllLibraries items={allLibraryCards} />

        <InlineTestimonial />

        <Security />

        <InlineTestimonial />

        <LibraryFAQ items={sharedFAQ} />

        <GetStartedSteps />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
