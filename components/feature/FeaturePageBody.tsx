// Shared renderer for feature pages backed by a Sanity `featurePage`
// document. Used by:
//   - app/(features)/[slug]/page.tsx — canonical per-slug routes
//   - app/add-notifications-quick/page.tsx — SEO landing that mirrors
//     /notifications 1:1
// To create another SEO duplicate that shadows an existing feature page,
// render <FeaturePageBody sanitySlug="..." pageUrlPath="..." /> from a
// new route. Keep slug-specific composition rules (NotificationsDemoSidebar,
// AdminConsoleHighlights, etc.) here so duplicates inherit them.
//
// Only legacy v1 pages with no v2 equivalent flow through here now
// (/platform, /devtools, /webhooks-and-api) plus the notifications SEO
// landings. The 12 current feature pages are served from Sanity featurePageV2
// at the site root by app/(features)/[slug]/page.tsx.

import { notFound } from "next/navigation";

import { FixedNavLayout } from "@/components/home/FixedNavLayout";
import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { CustomerUI } from "@/components/home/CustomerUI";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import {
  FeatureSections,
  type FeatureSectionDoc,
} from "@/components/feature/FeatureSections";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { NotificationsDemoSidebar } from "@/components/feature/NotificationsDemoSidebar";
import { NotificationsHighlights } from "@/components/feature/NotificationsHighlights";
import { AdminConsoleAnalyticsPanel } from "@/components/feature/AdminConsoleAnalyticsPanel";
import { AdminConsoleHighlights } from "@/components/feature/AdminConsoleHighlights";
import { WebhooksAndApiDemoSidebar } from "@/components/feature/WebhooksAndApiDemoSidebar";
import { WebhooksAndApiHighlights } from "@/components/feature/WebhooksAndApiHighlights";
import { getFeaturePageBySlug } from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import { BESPOKE_FEATURE_SCHEMAS_BY_SLUG } from "@/lib/bespoke-jsonld";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
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
  const faqSchema = buildFaqPageSchemaFromEntries(faqItems);

  return (
    <FixedNavLayout>
      <JsonLd id="ld-feature-webpage" data={webpage} />
      <JsonLd id="ld-feature-breadcrumb" data={breadcrumb} />
      <JsonLd id="ld-feature-faq" data={faqSchema} />
      {/* Framer-ported bespoke per-slug schemas. /recording emits the
          rich SoftwareApplication featureList + screenshot block
          (Script 16); other feature slugs use only the generic webpage
          schema above. Add new entries to BESPOKE_FEATURE_SCHEMAS_BY_SLUG
          as more Framer-style per-page schemas come over. */}
      {pageUrlPath && BESPOKE_FEATURE_SCHEMAS_BY_SLUG[pageUrlPath] ? (
        <JsonLd
          id={`ld-feature-framer-${pageUrlPath}`}
          data={BESPOKE_FEATURE_SCHEMAS_BY_SLUG[pageUrlPath]}
        />
      ) : null}
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

        {sanitySlug === "notifications" ? <NotificationsDemoSidebar /> : null}

        {showTrustedLogos ? <TrustedLogos /> : null}

        {sanitySlug === "admin-console" ? <AdminConsoleAnalyticsPanel /> : null}
        {sanitySlug === "webhooks-and-api" ? <WebhooksAndApiDemoSidebar /> : null}

        {sanitySlug === "admin-console" || sanitySlug === "webhooks-and-api" ? (
          <div style={{ marginTop: -120, position: "relative", zIndex: 1, borderTopLeftRadius: 48, borderTopRightRadius: 48, overflow: "hidden" }}>
            <FeatureSections sections={doc.sections} disableFirstAccent />
          </div>
        ) : (
          <FeatureSections sections={doc.sections} />
        )}

        {sanitySlug === "notifications" ? <NotificationsHighlights /> : null}
        {sanitySlug === "admin-console" ? <AdminConsoleHighlights /> : null}
        {sanitySlug === "webhooks-and-api" ? <WebhooksAndApiHighlights /> : null}

        {showCustomerStories ? <CustomerUI /> : null}

        {showSecurity ? <Security /> : null}

        <FeatureCustomerCarousel />

        <LibraryFAQ items={faqItems} />

        <GetStartedSteps step1PackageName={doc.getStartedSteps.step1PackageName} />

        <Footer />
      </div>
    </FixedNavLayout>
  );
}
