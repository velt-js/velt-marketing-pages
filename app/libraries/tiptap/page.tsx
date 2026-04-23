// Tiptap library page — Figma node 1:5488. Reference template for every
// per-library page. Only the hero copy, LibraryFeatures cards, and the
// GetStartedSteps step1PackageName vary from library to library.

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
  LibraryFeatures,
  type LibraryFeatureCard,
} from "@/components/library/LibraryFeatures";
import {
  allLibraryCards,
  libraryTabs,
  sharedFAQ,
} from "@/components/library/shared-content";

export const metadata = {
  title: "Integrate Velt in Tiptap | Velt",
  description:
    "Build a truly collaborative Tiptap editor with Velt — multiplayer editing, customizable cursors, text comments, and version history.",
};

const tiptapFeatureCards: LibraryFeatureCard[] = [
  {
    title: "Multiplayer Editing",
    description:
      "Real-time co-editing with conflict-free updates powered by Velt's CRDT layer.",
  },
  {
    title: "Customizable Cursors",
    description:
      "Show each collaborator's cursor, name, and selection with full style control.",
  },
  {
    title: "Text Comments",
    description:
      "Inline comments anchored to ranges of text — threaded, resolvable, mentionable.",
  },
  {
    title: "Version History",
    description: "Browse, compare, and restore prior versions of a document at any point.",
  },
];

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

export default function LibraryTiptapPage() {
  return (
    <ScaleWrapper>
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          eyebrow={{ label: "Tiptap Integration" }}
          heading="Integrate Velt in Tiptap"
          subheading="Build a truly collaborative tool in Tiptap"
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <DemoPlayer label="Tiptap Demo" />

        <LibraryTabs tabs={libraryTabs} initial={1} />

        <LibraryFeatures
          heading="Make Tiptap truly collaborative"
          subheading="Enable multiplayer editing and commenting for your Tiptap-powered product in minutes."
          cards={tiptapFeatureCards}
        />

        <InlineTestimonial />

        <Security />

        <AllLibraries items={allLibraryCards} />

        <LibraryFAQ items={sharedFAQ} />

        <GetStartedSteps step1PackageName="@veltdev/tiptap-collab" />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
