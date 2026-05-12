// /tiptap-editor-comments — SEO landing for Tiptap-style commenting
// inside rich-text editors.
//
// Live velt.dev/tiptap-editor-comments pitches "Add Commenting to
// Tiptap Editor" — a conversion landing for SaaS teams building
// Tiptap-based editors that want inline text-anchored comments,
// threaded replies, and notifications wired in by default.
// Composition mirrors the live page: dark hero with grid -> trusted
// logos -> three feature blocks each with an auto-playing video ->
// customer carousel -> FAQ -> get started -> footer.

import { Footer } from "@/components/home/Footer";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { sharedFAQ, tiptapFAQ } from "@/components/library/shared-content";
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
  "Add Tiptap-style commenting to your rich-text editor product. Velt's SDK ships inline text-anchored comments, threaded replies, @mentions, and native notifications so users can collaborate directly inside your Tiptap editor.";

const BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  {
    name: "Tiptap Editor Comments",
    url: `${SITE_URL}/tiptap-editor-comments`,
  },
]);

const WEBPAGE = buildWebPageSchema({
  name: "Tiptap editor comments | Velt",
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}/tiptap-editor-comments`,
  breadcrumb: BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Tiptap editor comments",
  description: PAGE_DESCRIPTION,
  path: "/tiptap-editor-comments",
  ogImage: "/og/tiptap-editor-comments.png",
});

// Three feature blocks the live page emphasises. Each block has an
// auto-playing muted video sourced from velt.dev/tiptap-editor-comments,
// downloaded into public/videos/tiptap-editor-comments/. Live layout
// alternates text-left / video-right and text-right / video-left.
type FeatureBlock = FeatureVideoBlockProps;

const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    title:
      "Quickly add commenting to any product that uses Tiptap Editor",
    body: "Drop in Velt's Tiptap extension and let your users leave inline, text-anchored comments inside any Tiptap-powered editor — no custom plumbing required.",
    videoSrc: "/videos/tiptap-editor-comments/quickly-add-commenting.mp4",
    videoPoster:
      "/images/tiptap-editor-comments/quickly-add-commenting-poster.jpg",
  },
  {
    title:
      "Velt comments are intelligent and stay in the right place, even when surrounding text is changed",
    body: "Velt anchors each comment to a range in the Tiptap document and rebases that anchor as the surrounding content is edited. Comments stay attached to the right text even after multi-user edits, formatting changes, or block reflows.",
    videoSrc: "/videos/tiptap-editor-comments/intelligent-comments.mp4",
    videoPoster:
      "/images/tiptap-editor-comments/intelligent-comments-poster.jpg",
    reverse: true,
  },
  {
    title:
      "Supercharged commenting with features like assignment, file attachments, recordings, emoji reactions, and shareable links",
    body: "Every Velt comment ships with the power tools your users expect — assign threads to teammates, attach files, drop in screen recordings, react with emoji, and share a deep link to any comment.",
    videoSrc: "/videos/tiptap-editor-comments/supercharged-features.mp4",
    videoPoster:
      "/images/tiptap-editor-comments/supercharged-features-poster.jpg",
  },
];

// Page-specific FAQ items prepended to the shared FAQ. Reuses the
// existing tiptap-specific Q+As from shared-content.ts (works across
// Tiptap extensions, anchored to text ranges) and adds a real-time
// answer that's relevant to anyone landing on a Tiptap commenting page.
const tiptapPageFAQ: FaqEntry[] = [
  ...tiptapFAQ,
  {
    question: "Is it real-time across multiple users?",
    answer:
      "Yes. Comments, replies, reactions, and presence sync live across every connected user. Multiple editors can comment on the same passage simultaneously without conflicts, and notifications fire instantly.",
  },
  {
    question: "How customisable is the commenting UI?",
    answer:
      "Fully. The drop-in components match your design system via tokens, or you can swap to headless mode and render your own UI on top of our APIs. Sidebars, popovers, comment composers, and reaction pickers are all themeable and replaceable.",
  },
  ...sharedFAQ,
];

export default function TiptapEditorCommentsPage() {
  return (
    <>
      <JsonLd id="ld-tiptap-webpage" data={WEBPAGE} />
      <JsonLd id="ld-tiptap-breadcrumb" data={BREADCRUMB} />
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated
          heading="Add Commenting to Tiptap Editor"
          subheading="Make text editing collaborative, with comments. Velt's SDK ships inline text-anchored comments, threaded replies, @mentions, and native notifications so users can collaborate directly inside your Tiptap editor."
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
                Supercharged commenting for Tiptap
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
                a production-grade commenting experience inside your
                Tiptap editor.
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

        <LibraryFAQ items={tiptapPageFAQ} />

        <GetStartedSteps step1PackageName="@veltdev/react" />

        <Footer />
      </div>
    </>
  );
}
