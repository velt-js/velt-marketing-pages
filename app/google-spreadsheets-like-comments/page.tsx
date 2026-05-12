// /google-spreadsheets-like-comments — SEO landing for Google Sheets-style
// commenting inside spreadsheet and table UIs.
//
// Live velt.dev/google-spreadsheets-like-comments pitches "Let users
// communicate natively in your app on sheets" — a conversion landing for
// teams building data grids, analytics tools, and spreadsheet products
// who need Google Sheets-grade commenting (cell, area, threaded replies,
// @mentions, notifications). Composition mirrors /add-comments-quick:
// dark hero with grid -> trusted logos -> light feature card grid ->
// customer carousel -> FAQ -> get started -> footer.

import { Footer } from "@/components/home/Footer";
import { Security, type SecurityCardData } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const PAGE_DESCRIPTION =
  "Add Google Sheets-style commenting to your spreadsheet, table, or data grid UI. Velt's SDK ships cell comments, area comments, threaded replies, @mentions, and native notifications so users can collaborate directly on your sheets.";

const BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  {
    name: "Google Spreadsheets-Like Comments",
    url: `${SITE_URL}/google-spreadsheets-like-comments`,
  },
]);

const WEBPAGE = buildWebPageSchema({
  name: "Google Spreadsheets-like comments | Velt",
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}/google-spreadsheets-like-comments`,
  breadcrumb: BREADCRUMB,
});

export const metadata = {
  title: "Google Spreadsheets-like comments",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/google-spreadsheets-like-comments",
  },
  openGraph: {
    url: "https://velt.dev/google-spreadsheets-like-comments",
    title: "Google Spreadsheets-like comments | Velt",
    description: PAGE_DESCRIPTION,
  },
};

// Four "what you get" cards rendered through the Security component's
// 2x2 grid (hideShield removes the security-themed glyph). Each card
// targets a spreadsheet-commenting feature the live page emphasises: cell
// anchoring, threaded replies, @mentions, and native notifications.
// Visuals reuse the spreadsheet-relevant repo assets shipped with the
// /comments page so we keep a single source of truth for these mocks.
const FEATURE_CARDS: SecurityCardData[] = [
  {
    title: "Cell comments",
    subtitle:
      "Anchor a thread to any cell. Comments stay pinned even as rows are reordered, sorted, or filtered.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/features/comments/little-big-details/Cell.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
      />
    ),
  },
  {
    title: "Threaded replies",
    subtitle:
      "Native threaded conversations with reactions, statuses, and assignees keep every discussion scoped to the right cell.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/features/comments/little-big-details/Thread.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
      />
    ),
  },
  {
    title: "@mentions",
    subtitle:
      "Tag teammates inside any cell comment to pull the right people into the right thread automatically.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/features/comments/little-big-details/@mention.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
      />
    ),
  },
  {
    title: "Native notifications",
    subtitle:
      "In-app, email, and Slack notifications bring users back to the right cell — comments and notifications work together out of the box.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/home/feature-grid/Notifications.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
      />
    ),
  },
];

// Page-specific FAQ items prepended to the shared FAQ. The shared list
// already covers billing and implementation time — these answer the
// spreadsheet-flavored questions a prospect lands on this page with.
const spreadsheetFAQ: FaqEntry[] = [
  {
    question: "Does it work with my spreadsheet or data grid?",
    answer:
      "Yes. Velt anchors comments to any DOM element or coordinate, so it works with custom spreadsheets, AG Grid, Handsontable, TanStack Table, Material React Table, and any HTML-based grid you've built in-house. We also ship integrations for chart libraries like Chart.js, nivo, and HighCharts if your sheets render data visualisations.",
  },
  {
    question: "Is it real-time across multiple users?",
    answer:
      "Yes. Comments, replies, reactions, and presence sync live across every connected user. Multiple editors can comment on the same cell or range simultaneously without conflicts, and notifications fire instantly.",
  },
  {
    question: "How customisable is the commenting UI?",
    answer:
      "Fully. The drop-in components match your design system via tokens, or you can swap to headless mode and render your own UI on top of our APIs. Sidebars, popovers, comment composers, and reaction pickers are all themeable and replaceable.",
  },
  ...sharedFAQ,
];

export default function GoogleSpreadsheetsLikeCommentsPage() {
  return (
    <>
      <JsonLd id="ld-sheets-webpage" data={WEBPAGE} />
      <JsonLd id="ld-sheets-breadcrumb" data={BREADCRUMB} />
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated
          eyebrow={{ label: "Spreadsheets" }}
          heading="Let users communicate natively in your app on sheets"
          subheading="Velt's SDK lets you build Google Sheets-style commenting into spreadsheets, tables, and data grids in your SaaS — cell comments, threaded replies, mentions, and notifications."
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <TrustedLogos />

        <Security
          hideShield
          heading="Supercharged commenting for sheets"
          subheading="Four building blocks that turn a single SDK install into a Google Sheets-grade commenting experience inside your product."
          primaryCta={{ label: "View Docs", href: "https://docs.velt.dev/" }}
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

        <FeatureCustomerCarousel />

        <LibraryFAQ items={spreadsheetFAQ} />

        <GetStartedSteps step1PackageName="@veltdev/react" />

        <Footer />
      </div>
    </>
  );
}
