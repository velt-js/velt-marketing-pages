// Tiptap library page — Figma node 1:5488. Reference template for every
// per-library page. The page composes generic library components with
// Tiptap-specific copy and content. When the CMS migration lands, the
// hard-coded copy/data here moves to a Sanity document and this file
// becomes a dynamic [slug] route over the same component shape.

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TestimonialStrip } from "@/components/home/TestimonialStrip";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryDemoStage } from "@/components/library/LibraryDemoStage";
import {
  LibraryBento,
  type LibraryBentoCard,
} from "@/components/library/LibraryBento";
import {
  ContextualCommentsIllustration,
  CustomizableCursorsIllustration,
  MultiplayerEditingIllustration,
  NotificationIllustration,
  OfflineStorageIllustration,
  SingleEditorModeIllustration,
  UserMentionsIllustration,
  VersionHistoryIllustration,
} from "@/components/library/illustrations/tiptap";
import { LibraryGetStartedCallout } from "@/components/library/LibraryGetStartedCallout";
import { AllLibraries } from "@/components/library/AllLibraries";
import { LibraryFAQ } from "@/components/library/LibraryFAQ";
import {
  allLibraryCards,
  libraryTabs,
  sharedFAQ,
  tiptapFAQ,
} from "@/components/library/shared-content";

export const metadata = {
  title: "Collaboration Toolkit for Tiptap | Velt",
  description:
    "Add comments, notifications, cursors, and multiplayer editing to Tiptap in minutes. Velt's Tiptap integration ships as a single extension.",
};

// "Built for Tiptap" bento — 8 tiles in a 2×4 grid (Figma node 1:5594).
// Card order matches the Figma left-to-right, top-to-bottom reading order.
const tiptapBentoCards: LibraryBentoCard[] = [
  {
    title: "Multiplayer Editing",
    description: "Co-edit documents in real-time and see who is working with you",
    illustration: <MultiplayerEditingIllustration />,
  },
  {
    title: "Contextual Comments",
    description: "Enable rich conversations with replies, @mentions, and reactions",
    illustration: <ContextualCommentsIllustration />,
  },
  {
    title: "Customizable Cursors",
    description: "Decide how users appear with fully customizable name tags and cursors",
    illustration: <CustomizableCursorsIllustration />,
  },
  {
    title: "User Mentions",
    description: "Enable rich conversations with replies, @mentions, and reactions",
    illustration: <UserMentionsIllustration />,
  },
  {
    title: "Notification",
    description: "See what changes have been made to a shared document with timestamps",
    illustration: <NotificationIllustration />,
  },
  {
    title: "Version History",
    description: "See what changes have been made to a shared document with timestamps",
    illustration: <VersionHistoryIllustration />,
  },
  {
    title: "Single Editor Mode",
    description: "Limit editing control to one user in collaborative scenarios",
    illustration: <SingleEditorModeIllustration />,
  },
  {
    title: "Offline Storage",
    description: "Keep working when the connection drops. Data will sync when you reconnect",
    illustration: <OfflineStorageIllustration />,
  },
];

function InlineTestimonial() {
  return (
    <section
      className="flex justify-center w-full bg-white full-bleed-bg"
      style={{ padding: "0 80px 100px" }}
    >
      <div
        className="overflow-hidden"
        style={{ width: 824, background: "#111", borderRadius: 24 }}
      >
        <TestimonialStrip
          name="Ethan Veres"
          role="CTO @eqtble"
          quote="Commenting is something we wanted in our app, Velt made it possible"
          accentFragment="Velt made it possible"
          accentColor="#0085ff"
        />
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
          decorated
          heading="Collaboration Toolkit for Tiptap"
          subheading="Add comments, notifications, cursors, and multiplayer editing to Tiptap in minutes"
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <section
          className="flex justify-center w-full bg-black full-bleed-bg"
          style={{ padding: "0 80px 100px" }}
        >
          <LibraryDemoStage
            demoUrl="https://velt-tiptap-crdt-demo.vercel.app/"
            githubUrl="https://github.com/velt-js/velt-tiptap-crdt-demo"
            previewSrc="/images/home/libraries/demos/tiptap.png"
            label="Tiptap"
          />
        </section>

        <TrustedLogos />

        <LibraryBento
          topAccent
          heading="Built for Tiptap"
          subheading="Deeply embedded in Tiptap and works reliably through edits, reflows, and formatting changes"
          eyebrow="No Custom Logic Required"
          viewDocsCta={{
            label: "View Docs",
            href: "https://docs.velt.dev/async-collaboration/comments/setup/tiptap",
            newTab: true,
          }}
          primaryCta={{
            label: "View All Examples",
            href: "https://github.com/velt-js/velt-tiptap-crdt-demo",
            newTab: true,
          }}
          cards={tiptapBentoCards}
        />

        <InlineTestimonial />

        <LibraryGetStartedCallout
          heading="Production-Ready in Minutes"
          body="Install the Velt Tiptap extension. Test. Ship."
          viewDocsHref="https://docs.velt.dev/async-collaboration/comments/setup/tiptap"
          getApiKeyHref="https://console.velt.dev/"
          codeImage={{
            src: "/images/home/libraries/tiptap/setup-code.png",
            alt: "Tiptap setup snippet showing useVeltTiptapCrdtExtension and useEditor configuration",
            width: 800,
            height: 385,
          }}
        />

        <Security />

        <AllLibraries
          heading="Explore Other Libraries"
          items={allLibraryCards}
          tabs={libraryTabs}
        />

        <LibraryFAQ items={[...tiptapFAQ, ...sharedFAQ]} />

        <GetStartedSteps step1PackageName="@veltdev/tiptap-collab" />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
