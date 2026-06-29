// /use-case index — reskinned to the new editorial theme (.vlp / .vfp). The
// page is static: the hero copy, the 10-card grid (components/use-case/
// use-case-cards.ts), and the FAQ (components/use-case/use-case-faq.ts) are
// in-repo, not Sanity. The shared chrome (Nav, logo strip, enterprise strip,
// FAQ, final CTA, footer) is reused from home-new / feature-new via
// UseCaseHubView. JSON-LD and metadata are preserved from the old page.

import { USE_CASE_CARDS } from "@/components/use-case/use-case-cards";
import { useCaseFaq } from "@/components/use-case/use-case-faq";
import UseCaseHubView from "@/components/use-case-new/UseCaseHubView";
import {
  CONSOLE_HREF,
  DEMO_HREF,
  USE_CASE_ENTERPRISE,
  USE_CASE_LOGO_STRIP,
  buildUseCaseFinalCta,
} from "@/components/use-case-new/content";
import type { UseCaseHubContent } from "@/components/use-case-new/content";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const PAGE_TITLE = "Velt Use Cases: Where Will You Integrate Velt?";
const PAGE_DESCRIPTION =
  "Explore 10+ use cases: Video Editor, Form Builder, Analytics, Task Manager, Sheets, Presentation, Documentation, Code IDE, No-code Tool, Session Replay.";

const USE_CASE_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Use Cases", url: `${SITE_URL}/use-case` },
]);

const USE_CASE_WEBPAGE = buildWebPageSchema({
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}/use-case`,
  breadcrumb: USE_CASE_BREADCRUMB,
});

const USE_CASE_FAQ_SCHEMA = buildFaqPageSchemaFromEntries(useCaseFaq);

export const metadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/use-case",
});

// Assemble the typed hub content from the in-repo static data. The card grid
// and FAQ reuse the same source the sitemap and JSON-LD read from.
const HUB_CONTENT: UseCaseHubContent = {
  hero: {
    kicker: "USE CASES",
    title: "Where will you integrate Velt?",
    secondary:
      "Explore 10+ use cases. Velt's SDK drops collaboration (comments, presence, notifications, and more) into whatever you're building.",
    primaryCta: { label: "Get Free API Key", href: CONSOLE_HREF, newTab: true },
    secondaryCta: { label: "Book Demo", href: DEMO_HREF },
    microcopy: "Free tier. No credit card.",
  },
  logoStrip: USE_CASE_LOGO_STRIP,
  grid: {
    kicker: "Find your use case",
    heading: "Built for the products your team ships",
    support: "Don't see your use case? Book a demo and we'll walk through it.",
    primaryCta: { label: "Book Demo", href: DEMO_HREF },
    secondaryCta: { label: "Get Free API Key", href: CONSOLE_HREF, newTab: true },
    cards: USE_CASE_CARDS.map((card) => ({
      title: card.title,
      href: card.href,
      imageSrc: card.media?.kind === "image" ? card.media.src : undefined,
      imageAlt: card.media?.kind === "image" ? card.media.alt : undefined,
    })),
  },
  enterprise: USE_CASE_ENTERPRISE,
  faq: {
    kicker: "FAQ",
    heading: "Frequently asked questions",
    items: useCaseFaq.map((entry) => ({ q: entry.question, a: entry.answer ?? "" })),
  },
  finalCta: buildUseCaseFinalCta("Add collaboration to your product today."),
};

/**
 * Static /use-case index page in the new theme.
 * @returns {JSX.Element} The rendered use-case hub.
 */
export default function UseCasePage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id="ld-use-case-webpage" data={USE_CASE_WEBPAGE} />
      <JsonLd id="ld-use-case-breadcrumb" data={USE_CASE_BREADCRUMB} />
      <JsonLd id="ld-use-case-faq" data={USE_CASE_FAQ_SCHEMA} />

      <UseCaseHubView content={HUB_CONTENT} />
    </>
  );
}
