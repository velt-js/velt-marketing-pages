// Editorial (home-new skin) renderer for the Sanity-backed migration pages.
// Reskins the legacy black-themed MigrationPageBody onto the warm `.vlp`
// design system: shared home-new Nav/TrustStrip/CustomerShowcase/CtaBanner/
// Footer plus migration-specific sections (hero, 3-step plan, feature parity,
// FAQ). All SEO/JSON-LD (WebPage + breadcrumb + gated FAQPage) is preserved
// from the original so search ranking and the `.md` mirror are unaffected.
//
// Data-driven by `sanitySlug`, so it serves both legacy SEO landings:
//   - app/migrate-from-cord-to-velt/page.tsx
//   - app/migrate-from-liveblocks-to-velt/page.tsx (sibling)

import { notFound } from "next/navigation";

import "@/components/home-new/styles.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import TrustStrip from "@/components/home-new/TrustStrip";
import CustomerShowcase from "@/components/home-new/CustomerShowcase";
import CtaBanner from "@/components/home-new/CtaBanner";

import MigrationHero from "./MigrationHero";
import MigrationSteps from "./MigrationSteps";
import MigrationFeatures from "./MigrationFeatures";
import MigrationFaq from "./MigrationFaq";
import { FeatureExtensiveVisual } from "@/components/migrate/FeatureExtensiveVisual";

import { getMigrationPageBySlug } from "@/sanity/queries";
import type { MigrationPageDoc } from "@/components/migrate/MigrationPageBody";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildWebPageSchema,
} from "@/app/_seo/schema";

/** Public signup / console URL reused by the closing CTA banner. */
const CONSOLE_URL = "https://console.velt.dev/";
/** Sanity `_key` of the feature row that swaps in the hand-built visual. */
const EXTENSIVE_FEATURES_KEY = "row-extensive-features";

/** Props for the editorial migration body. */
export type MigrationNewBodyProps = {
  /** Sanity slug to fetch (e.g. "cord", "liveblocks"). */
  sanitySlug: string;
  /**
   * URL path under SITE_URL used for canonical/breadcrumb/JSON-LD. Defaults
   * to `/migrate/${sanitySlug}` — pass an override when a duplicate route
   * renders the same content at a different URL (e.g.
   * "migrate-from-cord-to-velt").
   */
  pageUrlPath?: string;
};

/**
 * Server component that fetches a `migrationPage` document and renders it on
 * the home-new editorial skin (scoped under `.vlp`).
 * @param {MigrationNewBodyProps} props The slug + canonical path overrides.
 * @returns {Promise<JSX.Element>} The fully composed, skinned migration page.
 */
export async function MigrationNewBody({
  sanitySlug,
  pageUrlPath,
}: MigrationNewBodyProps) {
  const doc = (await getMigrationPageBySlug(
    sanitySlug,
  )) as MigrationPageDoc | null;

  if (!doc?.hero?.heading) notFound();

  const showTrustedLogos = doc.showTrustedLogos !== false;
  const showCustomerCarousel = doc.showCustomerCarousel !== false;
  const showFaq = doc.showFaq !== false;

  const pageUrl = `${SITE_URL}/${pageUrlPath ?? `migrate/${sanitySlug}`}`;
  // Two-level breadcrumb: Home → {vendor}. Kept identical to the legacy body
  // so structured data does not regress (no "/migrate" parent — that route
  // was removed and pointing at a 404 trips Google's breadcrumb validator).
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: doc.title ?? doc.hero.heading, url: pageUrl },
  ]);
  const webpage = buildWebPageSchema({
    name: doc.metaTitle ?? `${doc.hero.heading} | Velt`,
    description: doc.metaDescription ?? doc.hero.subheading,
    url: pageUrl,
    breadcrumb,
  });
  // Gate the FAQPage JSON-LD on the same `showFaq` flag that controls visual
  // rendering — Google requires the schema to reflect visible content.
  const faqSchema = showFaq
    ? buildFaqPageSchemaFromEntries(doc.faq?.items ?? [])
    : null;

  const competitorName = doc.title;
  const competitorLogoSrc = doc.competitorLogo;

  return (
    <div className="vlp">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id="ld-migrate-webpage" data={webpage} />
      <JsonLd id="ld-migrate-breadcrumb" data={breadcrumb} />
      {faqSchema ? <JsonLd id="ld-migrate-faq" data={faqSchema} /> : null}

      <Nav />
      <div className="vlp-page">
        <a id="top" />

        <MigrationHero
          eyebrow={doc.hero.eyebrow}
          heading={doc.hero.heading}
          subheading={doc.hero.subheading}
          primaryCta={doc.hero.primaryCta}
          secondaryCta={doc.hero.secondaryCta}
          competitorName={competitorName}
          competitorLogoSrc={competitorLogoSrc}
        />

        {showTrustedLogos ? <TrustStrip /> : null}

        {doc.migrationSteps ? (
          <MigrationSteps
            {...doc.migrationSteps}
            competitorName={competitorName}
            competitorLogoSrc={competitorLogoSrc}
          />
        ) : null}

        {doc.featureRows && doc.featureRows.length > 0 ? (
          <MigrationFeatures
            rows={doc.featureRows.map((row) => ({
              ...row,
              customVisual:
                row._key === EXTENSIVE_FEATURES_KEY ? (
                  <FeatureExtensiveVisual />
                ) : undefined,
            }))}
          />
        ) : null}

        {showCustomerCarousel ? <CustomerShowcase /> : null}

        {showFaq ? <MigrationFaq items={doc.faq?.items ?? []} /> : null}

        <CtaBanner
          dark
          kicker="Start free"
          heading={
            competitorName
              ? `Move off ${competitorName} in days, not quarters.`
              : "Move to Velt in days, not quarters."
          }
          ctaLabel="Get Free API Key"
          ctaHref={CONSOLE_URL}
          ctaExternal
          microcopy="Free migration plan included."
        />

        <Footer />
      </div>
    </div>
  );
}
