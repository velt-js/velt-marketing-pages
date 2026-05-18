// /add-recording-quick — SEO/conversion landing page for the in-app
// screen + audio + video recording SDK.
//
// Content mirrors the legacy velt.dev/add-recording-quick (still in
// production at fetch time): hero "Add Recording Before Standup",
// four-card feature grid for the recording SDK, three-step Get Started
// (npm i @veltdev/client → <VeltRecorderTool /> → <CustomVeltRecorderTool />),
// Jeff Cunning testimonial, and the standard footer.
//
// Composition reuses the same chrome as /consult: PageHero (decorated dark)
// → TrustedLogos → Security card grid → FeatureCustomerCarousel → LibraryFAQ
// → GetStartedSteps → Footer. Buttons follow the site's rounded-lg / 44px /
// 8/16 padding spec — no pill (borderRadius 999) buttons.

import { Footer } from "@/components/home/Footer";
import { Security, type SecurityCardData } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const ADD_RECORDING_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Add recording quickly", url: `${SITE_URL}/add-recording-quick` },
]);

const ADD_RECORDING_WEBPAGE = buildWebPageSchema({
  name: "Add recording quickly | Velt",
  description:
    "Ship Loom-style in-app recording in days. Audio, video, and screen recording with AI transcripts, captions, and summaries — drop in one component with the Velt SDK.",
  url: `${SITE_URL}/add-recording-quick`,
  breadcrumb: ADD_RECORDING_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Add recording quickly",
  description:
    "Ship Loom-style in-app recording in days. Audio, video, and screen recording with AI transcripts, captions, and summaries — drop in one component with the Velt SDK.",
  path: "/add-recording-quick",
  ogImage: "/og/add-recording-quick.png",
});

// Four "what you get" cards rendered through the Security component's
// 2x2 grid. Reuses the existing /images/features/recordings/* assets
// (the only recording artwork in the repo) and the security PNGs for
// the AI-leaning cards where no recording-specific export exists.
const RECORDING_CARDS: SecurityCardData[] = [
  {
    title: "Audio, video & screen recording",
    subtitle:
      "Capture mic, camera, and screen with a single component. Compression and codecs handled out of the box.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/add-recording-quick/recording-types.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
      />
    ),
  },
  {
    title: "Works in every browser",
    subtitle:
      "Chrome, Safari, Firefox, Edge. Recording works on macOS, Windows, and Linux without a desktop app or extension.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/add-recording-quick/browsers.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
      />
    ),
  },
  {
    title: "AI transcripts & captions",
    subtitle:
      "Every recording is transcribed automatically. Captions overlay during playback so viewers never miss a word.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/add-recording-quick/transcript.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
      />
    ),
  },
  {
    title: "AI summaries",
    subtitle:
      "Long recordings get auto-summarized into a few lines, so teammates skim the takeaway before pressing play.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/add-recording-quick/summary.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
      />
    ),
  },
];

// Recording-specific FAQ items prepended to the shared FAQ. Shared list
// covers billing and 30-min implementation time — these answer the
// questions a prospect has before installing the SDK.
const recordingFAQ: FaqEntry[] = [
  {
    question: "How fast can we ship in-app recording?",
    answer:
      "Most teams have audio, video, or screen recording running inside their app in under a day. The default <VeltRecorderTool /> component is a one-line drop-in; teams that need a custom UI typically ship in under a week using <CustomVeltRecorderTool /> and the recording hooks.",
  },
  {
    question: "Where are recordings stored?",
    answer:
      "By default, recordings are hosted on Velt's storage with secure signed URLs. Enterprise customers can bring their own S3/GCS bucket or self-host the storage layer so the media never leaves their infrastructure.",
  },
  {
    question: "Can we fully customize the recorder UI?",
    answer:
      "Yes. Use <CustomVeltRecorderTool /> to build your own start, stop, and review surface against the same APIs the default component uses. Theme tokens (CSS variables) cover the simpler cases without writing custom UI.",
  },
  ...sharedFAQ,
];

export default function AddRecordingQuickPage() {
  return (
    <>
      <JsonLd id="ld-add-recording-quick-webpage" data={ADD_RECORDING_WEBPAGE} />
      <JsonLd id="ld-add-recording-quick-breadcrumb" data={ADD_RECORDING_BREADCRUMB} />
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated
          eyebrow={{ label: "Recording SDK" }}
          heading="Add recording before standup"
          subheading="Loom-style audio, video, and screen recording — built into your app in days, not quarters. AI transcripts, captions, and summaries included."
          primaryCta={{
            label: "Get free API key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{
            label: "Book demo",
            href: "/book-demo",
          }}
        />

        <TrustedLogos />

        <Security
          heading="Why teams pick Velt for recording"
          subheading="Full-stack recording components with capture, storage, playback, and AI features included — drop one tag in and ship."
          primaryCta={{ label: "View Docs", href: "https://velt.dev/docs/" }}
          secondaryCta={{ label: "Book demo", href: "/book-demo" }}
          cards={RECORDING_CARDS}
          certification={null}
          testimonial={null}
          paddingTop={150}
          paddingBottom={80}
          hideShield
        />

        <FeatureCustomerCarousel />

        <LibraryFAQ items={recordingFAQ} />

        <GetStartedSteps step1PackageName="@veltdev/client" />

        <Footer />
      </div>
    </>
  );
}
