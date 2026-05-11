// Dynamic per-feature page driven by Sanity. One featurePage document per
// route. Composition mirrors /libraries/[slug] but the middle of the page
// is a polymorphic `sections[]` array (bentos, integrations rows, customer
// testimonial grids) that renders in document order via FeatureSections.

import { notFound } from "next/navigation";

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
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
import {
  getAllFeatureSlugs,
  getFeaturePageBySlug,
} from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

export const revalidate = 60;

type CtaLink = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

type FeaturePageDoc = {
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

export async function generateStaticParams() {
  const slugs = await getAllFeatureSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getFeaturePageBySlug(slug)) as FeaturePageDoc | null;
  if (!doc) return {};
  const title = doc.metaTitle ?? `${doc.hero.heading} | Velt`;
  const description = doc.metaDescription ?? doc.hero.subheading;
  return {
    title,
    description,
    alternates: { canonical: `/features/${slug}` },
    openGraph: {
      url: `https://velt.dev/features/${slug}`,
      title,
      description,
      ...(doc.ogImage ? { images: [{ url: doc.ogImage }] } : {}),
    },
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getFeaturePageBySlug(slug)) as FeaturePageDoc | null;

  // 404 on missing/incomplete docs. A featurePage with no hero is partial
  // draft state from an editor and should not render — keeps in-progress
  // docs from blocking the static build. Empty `sections` is OK: pages
  // like /features/notifications render their main highlight section as
  // a hardcoded slug-conditional component below FeatureSections.
  if (!doc || !doc.hero?.heading || !doc.sections) {
    notFound();
  }

  const showTrustedLogos = doc.showTrustedLogos ?? true;
  const showSecurity = doc.showSecurity ?? true;
  const showCustomerStories = doc.showCustomerStories ?? true;
  const faqItems: FaqEntry[] = [...(doc.faq?.items ?? []), ...sharedFAQ];

  const pageUrl = `${SITE_URL}/features/${slug}`;
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
    <ScaleWrapper>
      <JsonLd id="ld-feature-webpage" data={webpage} />
      <JsonLd id="ld-feature-breadcrumb" data={breadcrumb} />
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated={doc.hero.decorated ?? true}
          heading={doc.hero.heading}
          subheading={doc.hero.subheading}
          primaryCta={doc.hero.primaryCta}
          secondaryCta={doc.hero.secondaryCta}
        />

        {slug === "comments" ? <CommentsDemoSidebar /> : null}
        {slug === "recordings" ? <RecordingsDemoSidebar /> : null}
        {slug === "notifications" ? <NotificationsDemoSidebar /> : null}
        {slug === "multiplayer" ? <MultiplayerDemoSidebar /> : null}

        {showTrustedLogos ? <TrustedLogos /> : null}

        {slug === "admin-console" ? <AdminConsoleAnalyticsPanel /> : null}
        {slug === "webhooks-and-api" ? <WebhooksAndApiDemoSidebar /> : null}

        {slug === "multiplayer" ? (
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

        {slug === "multiplayer" ? (
          // Section ordering for /features/multiplayer:
          //   1. doc.sections[0]              — Collaborative Product bento
          //   2. <CustomerUI />               — "How [X] Leverages Velt"
          //   3. <MultiplayerYourDataSection /> — 816-wide hosting cards
          //   4. <LibrarySupport />           — homepage "Works seamlessly
          //                                     with your libraries" grid
          //   5. doc.sections[1..]            — Security image card
          // FeatureSections is called with disableFirstAccent so the
          // rounded-top transition only fires on the StealFeatures
          // wrapper that opens the light section above.
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
        ) : slug === "admin-console" || slug === "webhooks-and-api" ? (
          <div style={{ marginTop: -120, position: "relative", zIndex: 1, borderTopLeftRadius: 48, borderTopRightRadius: 48, overflow: "hidden" }}>
            <FeatureSections sections={doc.sections} disableFirstAccent />
          </div>
        ) : (
          <FeatureSections sections={doc.sections} />
        )}

        {slug === "notifications" ? <NotificationsHighlights /> : null}
        {slug === "activity-logs" ? <ActivityLogsHighlights /> : null}
        {slug === "admin-console" ? <AdminConsoleHighlights /> : null}
        {slug === "webhooks-and-api" ? <WebhooksAndApiHighlights /> : null}

        {showCustomerStories ? <CustomerUI /> : null}

        {showSecurity ? <Security /> : null}

        <FeatureCustomerCarousel />

        <LibraryFAQ items={faqItems} />

        <GetStartedSteps step1PackageName={doc.getStartedSteps.step1PackageName} />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}
