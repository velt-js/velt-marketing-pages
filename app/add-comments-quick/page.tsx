// /add-comments-quick — quick-start landing page for adding commenting fast.
//
// Live velt.dev/add-comments-quick pitches "Add Commenting Before Standup"
// — a conversion landing for the Comments SDK. Composition mirrors
// /consult: dark hero with grid -> trusted logos -> light "what you get"
// card grid -> code snippet install -> customer carousel -> FAQ -> get
// started -> footer.

import { Footer } from "@/components/home/Footer";
import { Security, type SecurityCardData } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { LibraryGetStartedCallout } from "@/components/library/LibraryGetStartedCallout";
import { sharedFAQ } from "@/components/library/shared-content";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const PAGE_DESCRIPTION =
  "Add commenting features to your app in days, not months. Velt's AI-powered Comments SDK ships drop-in components for text, area, video, and inline comments — like Google Docs, Figma, and Frame.io.";

const ADD_COMMENTS_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Add Comments Quick", url: `${SITE_URL}/add-comments-quick` },
]);

const ADD_COMMENTS_WEBPAGE = buildWebPageSchema({
  name: "Add comments quickly | Velt",
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}/add-comments-quick`,
  breadcrumb: ADD_COMMENTS_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Add comments quickly",
  description: PAGE_DESCRIPTION,
  path: "/add-comments-quick",
  ogImage: "/og/add-comments-quick.png",
});

// Four "what you get" cards rendered through the Security component's
// 2x2 grid. Mirrors the live velt.dev/add-comments-quick value props:
// @mentions, Recordings, Task Management, Reactions. Each visual reuses
// an existing feature mockup shipped with the /comments page rather
// than downloading or compositing one — keeps a single source of truth
// for these feature thumbnails.
const FEATURE_CARDS: SecurityCardData[] = [
  {
    title: "@mentions",
    subtitle:
      "Users tag teammates in conversations, assign work, and pull people into the right thread automatically.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/home/feature-grid/Comment.png"
        alt=""
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    ),
  },
  {
    title: "Recordings",
    subtitle:
      "Add audio, video, or screen recordings to any comment — with transcripts and summaries generated for you.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/home/feature-grid/Recording.png"
        alt=""
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    ),
  },
  {
    title: "Task management",
    subtitle:
      "Triage every comment with status, priority, and assignees. Ship one workflow instead of bolting on a tracker.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/features/comments/little-big-details/Pirority.png"
        alt=""
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    ),
  },
  {
    title: "Reactions",
    subtitle:
      "Let users react with emoji, signal agreement quickly, and keep threads readable without piling on replies.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/features/comments/little-big-details/Reactions.png"
        alt=""
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    ),
  },
];

// Page-specific FAQ items prepended to the shared FAQ. The shared list
// already covers billing and implementation time — these answer the
// commenting-flavored questions a prospect lands on this page with.
const addCommentsFAQ: FaqEntry[] = [
  {
    question: "How quickly can I ship commenting?",
    answer:
      "Most teams have a working commenting experience in under a day. Install @veltdev/react, drop in <VeltComments />, and you have threaded comments, mentions, and notifications working end-to-end. Customisation typically lands within the week.",
  },
  {
    question: "Does it work with my editor or canvas?",
    answer:
      "Yes. Velt ships first-class integrations for Tiptap, Lexical, BlockNote, Slate, CodeMirror, React Flow, and major charting libraries (Chart.js, nivo, HighCharts). For everything else — custom canvases, video players, dashboards — we have generic anchoring APIs that bind comments to any DOM element or coordinate.",
  },
  {
    question: "What types of comments are supported?",
    answer:
      "Text, area, popover, inline, stream, page, chart, video, Lottie, and TipTap-style text-anchored comments. Each comment supports threaded replies, @mentions, reactions, attachments, audio/video/screen recordings, statuses, priorities, and assignees out of the box.",
  },
  ...sharedFAQ,
];

// Code snippet rendered inside LibraryGetStartedCallout. Syntax-highlighted
// at SSR via shiki (atom-one-light theme to match the rest of the site).
const INSTALL_SNIPPET = `// 1. Install
// npm install @veltdev/react

import {
  VeltProvider,
  VeltComments,
} from "@veltdev/react";

export default function App() {
  return (
    <VeltProvider apiKey={process.env.NEXT_PUBLIC_VELT_API_KEY}>
      <VeltComments />
      <YourApp />
    </VeltProvider>
  );
}`;

export default function AddCommentsQuickPage() {
  return (
    <>
      <JsonLd id="ld-acq-webpage" data={ADD_COMMENTS_WEBPAGE} />
      <JsonLd id="ld-acq-breadcrumb" data={ADD_COMMENTS_BREADCRUMB} />
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated
          eyebrow={{ label: "Comments SDK" }}
          heading="Add comments to your app in days, not months."
          subheading="Drop in production-ready commenting — threaded replies, @mentions, reactions, recordings, and task management — with one component."
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <TrustedLogos />

        <Security
          heading="Everything commenting should be"
          subheading="Four building blocks that turn a single SDK install into a Figma-grade commenting experience."
          primaryCta={{ label: "View Docs", href: "https://velt.dev/docs/" }}
          secondaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
          }}
          cards={FEATURE_CARDS}
          certification={null}
          testimonial={null}
          paddingTop={120}
          paddingBottom={80}
        />

        <LibraryGetStartedCallout
          heading="Production-ready in five lines of code"
          body="Install the SDK, wrap your app in VeltProvider, and drop in VeltComments. That's it — comments, mentions, notifications, and recordings light up across your product."
          viewDocsHref="https://velt.dev/docs/async-collaboration/comments/setup"
          getApiKeyHref="https://console.velt.dev/"
          codeSnippet={{ code: INSTALL_SNIPPET, language: "tsx" }}
        />

        <FeatureCustomerCarousel />

        <LibraryFAQ items={addCommentsFAQ} />

        <GetStartedSteps step1PackageName="@veltdev/react" />

        <Footer />
      </div>
    </>
  );
}
