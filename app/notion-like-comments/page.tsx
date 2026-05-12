// /notion-like-comments — SEO landing for Notion-style commenting inside
// docs, wikis, and note-taking products.
//
// Live velt.dev/notion-like-comments pitches "Notion-Style Comments in
// Your Product" — a conversion landing for SaaS teams building doc/wiki/
// note products that want Notion-grade commenting: block-anchored inline
// comments on database entries, page-level stream comments, and native
// notifications wired in by default. Composition mirrors the live page:
// dark hero with grid -> trusted logos -> three feature blocks each with
// an auto-playing video -> customer carousel -> FAQ -> get started ->
// footer.

import { Footer } from "@/components/home/Footer";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import {
  FeatureVideoBlock,
  type FeatureVideoBlockProps,
} from "@/components/feature/FeatureVideoBlock";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const PAGE_DESCRIPTION =
  "Add Notion-style commenting to your docs, wikis, and note-taking product. Velt's SDK ships block-anchored inline comments, page-level stream comments, @mentions, and native notifications so users can collaborate directly inside your pages.";

const BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  {
    name: "Notion-Like Comments",
    url: `${SITE_URL}/notion-like-comments`,
  },
]);

const WEBPAGE = buildWebPageSchema({
  name: "Notion-like comments | Velt",
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}/notion-like-comments`,
  breadcrumb: BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Notion-like comments",
  description: PAGE_DESCRIPTION,
  path: "/notion-like-comments",
  ogImage: "/og/notion-like-comments.png",
});

// Three feature blocks the live page emphasises. Each block has an
// auto-playing muted video sourced from velt.dev/notion-like-comments,
// downloaded into public/videos/notion-like-comments/. Live layout
// alternates text-left / video-right and text-right / video-left.
type FeatureBlock = FeatureVideoBlockProps;

const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    title:
      "Implement comments like you see in Notion Database entries by using our inline comments component",
    body: "Anchor threaded comments to any row, field, or block inside your database views. Comments stay pinned as users edit, sort, and reorder — exactly like Notion.",
    videoSrc: "/videos/notion-like-comments/inline-comments.mp4",
    videoPoster: "/images/notion-like-comments/inline-comments-poster.jpg",
  },
  {
    title: "Stream Comments like you see on Notion Pages",
    body: "Drop a stream comment composer into any doc or page. Users leave threaded comments, replies, and reactions on the right rail without leaving your product.",
    videoSrc: "/videos/notion-like-comments/stream-comments.mp4",
    videoPoster: "/images/notion-like-comments/stream-comments-poster.jpg",
    reverse: true,
  },
  {
    title: "Velt comments come with native notifications support",
    body: "Velt Comments and Notifications work together to bring users back to your platform — in-app, email, and Slack notifications fire instantly whenever a teammate replies or @mentions them.",
    videoSrc: "/videos/notion-like-comments/notifications.mp4",
    videoPoster: "/images/notion-like-comments/notifications-poster.jpg",
  },
];

// Page-specific FAQ items prepended to the shared FAQ. The shared list
// covers billing and implementation time — these answer the doc/wiki-
// flavoured questions a prospect lands on this page with.
const notionFAQ: FaqEntry[] = [
  {
    question: "Does it work with my doc or wiki editor?",
    answer:
      "Yes. Velt anchors comments to any DOM element or document range, so it works with custom block-based editors, Tiptap, BlockNote, Lexical, CodeMirror, SlateJS, and any HTML-based document UI you've built in-house. Comments stay attached to the right block even after edits, formatting changes, or reflows.",
  },
  {
    question: "Is it real-time across multiple users?",
    answer:
      "Yes. Comments, replies, reactions, and presence sync live across every connected user. Multiple editors can comment on the same block or page simultaneously without conflicts, and notifications fire instantly.",
  },
  {
    question: "How customisable is the commenting UI?",
    answer:
      "Fully. The drop-in components match your design system via tokens, or you can swap to headless mode and render your own UI on top of our APIs. Sidebars, popovers, comment composers, and reaction pickers are all themeable and replaceable.",
  },
  ...sharedFAQ,
];

export default function NotionLikeCommentsPage() {
  return (
    <>
      <JsonLd id="ld-notion-webpage" data={WEBPAGE} />
      <JsonLd id="ld-notion-breadcrumb" data={BREADCRUMB} />
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated
          heading="Notion-Style Comments in Your Product"
          subheading="Empower your users to collaborate in-app! Drop-in components for block-anchored inline comments, page-level stream comments, @mentions, and native notifications inside your docs, wikis, and note products."
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <TrustedLogos />

        <section
          className="bg-white full-bleed-bg px-6 lg:px-20"
          style={{
            paddingTop: "clamp(80px, 12vw, 120px)",
            paddingBottom: "clamp(60px, 9vw, 100px)",
          }}
        >
          <div className="flex flex-col items-center w-full max-w-[1120px] mx-auto gap-12 lg:gap-16">
            <div className="flex flex-col items-center text-center gap-4 max-w-[820px]">
              <h2
                className="font-urbanist font-bold"
                style={{
                  color: "#111",
                  fontSize: "clamp(28px, 4.2vw, 52px)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                }}
              >
                Supercharged commenting for docs and wikis
              </h2>
              <p
                className="font-urbanist"
                style={{
                  color: "#000",
                  fontSize: "clamp(16px, 1.5vw, 20px)",
                  lineHeight: 1.3,
                }}
              >
                Three building blocks that turn a single SDK install into
                a Notion-grade commenting experience inside your product.
              </p>
            </div>

            <div className="flex flex-col w-full gap-16 lg:gap-24">
              {FEATURE_BLOCKS.map((block) => (
                <FeatureVideoBlock key={block.title} {...block} />
              ))}
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              <a
                href="https://docs.velt.dev/"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center rounded-lg font-urbanist font-semibold"
                style={{
                  height: 44,
                  padding: "8px 16px",
                  border: "2px solid #625df5",
                  color: "#000",
                  fontSize: 16,
                  letterSpacing: "-0.03em",
                  textDecoration: "none",
                }}
              >
                View Docs
              </a>
              <a
                href="https://console.velt.dev/"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center rounded-lg font-urbanist font-semibold"
                style={{
                  height: 44,
                  padding: "8px 16px",
                  background: "#625df5",
                  color: "#fff",
                  fontSize: 16,
                  letterSpacing: "-0.03em",
                  textDecoration: "none",
                }}
              >
                Get Free API Key
              </a>
            </div>
          </div>
        </section>

        <FeatureCustomerCarousel />

        <LibraryFAQ items={notionFAQ} />

        <GetStartedSteps step1PackageName="@veltdev/react" />

        <Footer />
      </div>
    </>
  );
}
