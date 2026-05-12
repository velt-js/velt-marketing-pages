// Shared renderer for feature pages backed by a Sanity `featurePage`
// document. Used by:
//   - app/(features)/[slug]/page.tsx — canonical per-slug routes
//   - app/add-notifications-quick/page.tsx — SEO landing that mirrors
//     /notifications 1:1
// To create another SEO duplicate that shadows an existing feature page,
// render <FeaturePageBody sanitySlug="..." pageUrlPath="..." /> from a
// new route. Keep slug-specific composition rules (NotificationsDemoSidebar,
// MultiplayerYourDataSection, etc.) here so duplicates inherit them.

import { notFound } from "next/navigation";

import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { CustomerUI } from "@/components/home/CustomerUI";
import { StealFeatures } from "@/components/home/StealFeatures";
import { LibrarySupport } from "@/components/home/LibrarySupport";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import {
  FeatureSections,
  type FeatureSectionDoc,
} from "@/components/feature/FeatureSections";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { CommentsDemoSidebar } from "@/components/feature/CommentsDemoSidebar";
import { RecordingsDemoSidebar } from "@/components/feature/RecordingsDemoSidebar";
import { NotificationsDemoSidebar } from "@/components/feature/NotificationsDemoSidebar";
import { MultiplayerDemoSidebar } from "@/components/feature/MultiplayerDemoSidebar";
import { MultiplayerYourDataSection } from "@/components/feature/MultiplayerYourDataSection";
import { NotificationsHighlights } from "@/components/feature/NotificationsHighlights";
import { ActivityLogsHighlights } from "@/components/feature/ActivityLogsHighlights";
import { AdminConsoleAnalyticsPanel } from "@/components/feature/AdminConsoleAnalyticsPanel";
import { AdminConsoleHighlights } from "@/components/feature/AdminConsoleHighlights";
import { WebhooksAndApiDemoSidebar } from "@/components/feature/WebhooksAndApiDemoSidebar";
import { WebhooksAndApiHighlights } from "@/components/feature/WebhooksAndApiHighlights";
import { getFeaturePageBySlug } from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

type CtaLink = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

export type FeaturePageDoc = {
  title: string;
  slug: string;
  hero: {
    heading: string;
    subheading?: string;
    decorated?: boolean;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
  };
  sections: FeatureSectionDoc[];
  showSecurity?: boolean;
  showTrustedLogos?: boolean;
  showCustomerStories?: boolean;
  getStartedSteps: { step1PackageName: string };
  faq?: { items?: FaqEntry[] };
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
};

export type FeaturePageBodyProps = {
  /** Sanity slug to fetch (e.g. "notifications", "comments"). */
  sanitySlug: string;
  /**
   * URL path under SITE_URL used for canonical/breadcrumb/JSON-LD. Defaults
   * to `/${sanitySlug}` — pass an override when a duplicate route renders
   * the same content at a different URL (e.g. "add-notifications-quick").
   */
  pageUrlPath?: string;
  /**
   * Override the hero heading and/or subheading. Use when a duplicate route
   * needs differentiated H1 copy for keyword targeting (e.g. /knock-like-
   * notifications targets "Knock alternative" so its H1 reads "Build
   * Notifications Quickly", not the canonical "Add Notifications Before
   * Standup" served by /notifications).
   */
  heroOverride?: {
    heading?: string;
    subheading?: string;
  };
};

export async function FeaturePageBody({
  sanitySlug,
  pageUrlPath,
  heroOverride,
}: FeaturePageBodyProps) {
  const doc = (await getFeaturePageBySlug(sanitySlug)) as FeaturePageDoc | null;

  // 404 on missing/incomplete docs. A featurePage with no hero is partial
  // draft state from an editor and should not render — keeps in-progress
  // docs from blocking the static build. Empty `sections` is OK: pages
  // like /notifications render their main highlight section as a
  // hardcoded slug-conditional component below FeatureSections.
  if (!doc || !doc.hero?.heading || !doc.sections) {
    notFound();
  }

  const showTrustedLogos = doc.showTrustedLogos ?? true;
  const showSecurity = doc.showSecurity ?? true;
  const showCustomerStories = doc.showCustomerStories ?? true;
  const faqItems: FaqEntry[] = [...(doc.faq?.items ?? []), ...sharedFAQ];

  const pageUrl = `${SITE_URL}/${pageUrlPath ?? sanitySlug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Features", url: `${SITE_URL}/features` },
    { name: doc.title ?? doc.hero.heading, url: pageUrl },
  ]);
  const webpage = buildWebPageSchema({
    name: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
    description: doc.metaDescription ?? doc.hero.subheading,
    url: pageUrl,
    breadcrumb,
  });

  return (
    <>
      <JsonLd id="ld-feature-webpage" data={webpage} />
      <JsonLd id="ld-feature-breadcrumb" data={breadcrumb} />
      <div
        className="relative bg-black text-white font-urbanist w-full overflow-x-hidden"
      >
        <PageHero
          decorated={doc.hero.decorated ?? true}
          heading={heroOverride?.heading ?? doc.hero.heading}
          subheading={heroOverride?.subheading ?? doc.hero.subheading}
          primaryCta={doc.hero.primaryCta}
          secondaryCta={doc.hero.secondaryCta}
        />

        {sanitySlug === "comments" ? <CommentsDemoSidebar /> : null}
        {sanitySlug === "recordings" ? <RecordingsDemoSidebar /> : null}
        {sanitySlug === "notifications" ? <NotificationsDemoSidebar /> : null}
        {sanitySlug === "multiplayer" ? <MultiplayerDemoSidebar /> : null}

        {showTrustedLogos ? <TrustedLogos /> : null}

        {sanitySlug === "admin-console" ? <AdminConsoleAnalyticsPanel /> : null}
        {sanitySlug === "webhooks-and-api" ? <WebhooksAndApiDemoSidebar /> : null}

        {sanitySlug === "multiplayer" ? (
          // Reuses the homepage's "Steal Features" marquee (Figma node
          // 32:2588). Wrapped in a topAccent shell that mirrors
          // FeatureSectionShell's first-light treatment (80px margin,
          // 48px rounded top, full-bleed white) so it sits cleanly under
          // the dark hero/trusted-logos strip. `disableFirstAccent` on
          // FeatureSections below stops the next light card from also
          // applying the transition.
          <section
            data-outcomes
            className="bg-white full-bleed-bg"
            style={{
              padding: "100px 80px",
              marginTop: 80,
              borderTopLeftRadius: 48,
              borderTopRightRadius: 48,
            }}
          >
            <StealFeatures />
          </section>
        ) : null}

        {sanitySlug === "multiplayer" ? (
          <>
            <FeatureSections
              sections={doc.sections.slice(0, 1)}
              disableFirstAccent
            />
            <CustomerUI />
            <MultiplayerYourDataSection />
            <LibrarySupport />
            <FeatureSections
              sections={doc.sections.slice(1)}
              disableFirstAccent
            />
          </>
        ) : sanitySlug === "admin-console" || sanitySlug === "webhooks-and-api" ? (
          <div style={{ marginTop: -120, position: "relative", zIndex: 1, borderTopLeftRadius: 48, borderTopRightRadius: 48, overflow: "hidden" }}>
            <FeatureSections sections={doc.sections} disableFirstAccent />
          </div>
        ) : (
          <FeatureSections sections={doc.sections} />
        )}

        {sanitySlug === "notifications" ? <NotificationsHighlights /> : null}
        {sanitySlug === "activity-logs" ? <ActivityLogsHighlights /> : null}
        {sanitySlug === "admin-console" ? <AdminConsoleHighlights /> : null}
        {sanitySlug === "webhooks-and-api" ? <WebhooksAndApiHighlights /> : null}

        {showCustomerStories ? <CustomerUI /> : null}

        {showSecurity ? <Security /> : null}

        <FeatureCustomerCarousel />

        <LibraryFAQ items={faqItems} />

        <GetStartedSteps step1PackageName={doc.getStartedSteps.step1PackageName} />

        <Footer />
      </div>
    </>
  );
}
