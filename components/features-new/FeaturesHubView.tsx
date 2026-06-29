// Reskin of the /features hub into the new editorial ".vintg" theme, matching
// the already-shipped /integrations and /libraries hubs. Server component (no
// "use client"). Reuses the shipped homepage chrome (.vlp Nav + Footer) and the
// shared .vintg section system, then layers the feature-card styles in
// ./styles.css. Tokens come from components/home-new/styles.css.
import "@/components/home-new/styles.css";
import "@/components/feature-new/styles.css";
import "@/components/libraries-new/styles.css";
import "./styles.css";

import Link from "next/link";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import Enterprise from "@/components/home-new/Enterprise";
import FinalCta from "@/components/feature-new/FinalCta";
import { CtaRow, FaqList, SectionHead } from "@/components/libraries-new/sections";
import type { FaqEntry } from "@/components/libraries-new/content";
import { sanitySlugToUrl } from "@/lib/feature-slugs";

export type FeatureListItem = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  tagline?: string;
  logo?: string;
};

type FeaturesHubViewProps = {
  items: FeatureListItem[];
  faq: FaqEntry[];
};

/** Hero copy CTAs and microcopy, kept in sync with the other hub pages. */
const PRIMARY_CTA = {
  label: "Get Free API Key",
  href: "https://console.velt.dev/",
  newTab: true,
} as const;
const SECONDARY_CTA = { label: "Book Demo", href: "/book-demo" } as const;
const HERO_MICROCOPY = "Free tier. No credit card. First comment in 5 minutes.";

/** How many feature chips to surface in the hero visual cluster. */
const HERO_CHIP_COUNT = 6;

/** A category group: a label plus the features that belong to it, order kept. */
type FeatureGroup = { label: string; items: FeatureListItem[] };

const UNCATEGORIZED_LABEL = "More features";

/**
 * Group features by their `category`, preserving the CMS sort order (the query
 * already orders by category then title). Features without a category fall into
 * a trailing "More features" group.
 * @param {FeatureListItem[]} items The flat feature list.
 * @returns {FeatureGroup[]} Ordered groups; empty when there are no items.
 */
function groupByCategory(items: FeatureListItem[]): FeatureGroup[] {
  try {
    const order: string[] = [];
    const byLabel = new Map<string, FeatureGroup>();
    for (const item of items ?? []) {
      const label = item?.category?.trim() || UNCATEGORIZED_LABEL;
      let group = byLabel.get(label);
      if (!group) {
        group = { label, items: [] };
        byLabel.set(label, group);
        order.push(label);
      }
      group.items.push(item);
    }
    return order.map((label) => byLabel.get(label)!);
  } catch (error) {
    console.error("groupByCategory failed", error);
    return [];
  }
}

/**
 * A single feature card: optional product logo, title, tagline, and the mono
 * category eyebrow. The whole card links to the feature's page.
 * @param {{ item: FeatureListItem; showCategory: boolean }} props Card data.
 * @returns {JSX.Element} The feature card link.
 */
function FeatureCard({
  item,
  showCategory,
}: {
  item: FeatureListItem;
  showCategory: boolean;
}) {
  return (
    <Link className="vintg-card vfeat-card" href={`/${sanitySlugToUrl(item.slug)}`}>
      {item?.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="vfeat-logo" src={item.logo} alt={item.title} />
      ) : null}
      <h4>{item.title}</h4>
      {item?.tagline ? <p>{item.tagline}</p> : null}
      {showCategory && item?.category ? (
        <span className="vfeat-cat">{item.category}</span>
      ) : null}
    </Link>
  );
}

/**
 * Full-page hub view for /features reskinned in the new editorial .vintg theme.
 * Shares chrome (Nav, Footer, Enterprise, FinalCta) and design primitives
 * (CtaRow, SectionHead, FaqList, .vintg-* classes) with the integrations and
 * libraries hubs.
 * @param {FeaturesHubViewProps} props The feature roster and FAQ entries.
 * @returns {JSX.Element} The composed features hub page.
 */
export default function FeaturesHubView({ items, faq }: FeaturesHubViewProps) {
  const safeItems = items ?? [];
  const groups = groupByCategory(safeItems);
  const heroItems = safeItems.slice(0, HERO_CHIP_COUNT);
  // Only show the per-card category eyebrow when the grid is flat (a single
  // group) — when grouped, the group label already names the category.
  const showCardCategory = groups.length <= 1;

  return (
    <div className="vlp">
      <a id="top" />
      <Nav />
      <div className="vfp">
        <main className="vintg">
          {/* ---- 1. Hero ---- */}
          <section className="vintg-wrap">
            <div className="vintg-hero">
              <div>
                <p className="vintg-eyebrow">Features</p>
                <h1>Built for modern collaboration</h1>
                <p className="vintg-lead">
                  Drop-in collaboration primitives: comments, presence, cursors,
                  huddles, and more. Pick a building block and ship in days, not months.
                </p>
                <CtaRow
                  primaryCta={PRIMARY_CTA}
                  secondaryCta={SECONDARY_CTA}
                  microcopy={HERO_MICROCOPY}
                />
              </div>
              <div className="vintg-hero-visual">
                {heroItems.length > 0 ? (
                  <div className="vintg-hero-grid">
                    {heroItems.map((item) => (
                      <Link
                        key={item._id}
                        className="vintg-chip"
                        href={`/${sanitySlugToUrl(item.slug)}`}
                      >
                        {item?.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="vintg-chip-logo"
                            src={item.logo}
                            alt=""
                            aria-hidden="true"
                          />
                        ) : null}
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          {/* ---- 2. Feature grid ---- */}
          <section className="vintg-section">
            <div className="vintg-wrap">
              <SectionHead
                eyebrow="The features"
                heading="Explore Velt features"
                support="Each ships as a React, Next.js, or Angular component plus a typed SDK."
              />
              {safeItems.length === 0 ? (
                <p className="vfeat-empty">
                  No feature pages yet. Add one in{" "}
                  <Link href="/studio">Sanity Studio</Link>.
                </p>
              ) : groups.length > 1 ? (
                groups.map((group) => (
                  <div className="vfeat-group" key={group.label}>
                    <p className="vfeat-group-label">{group.label}</p>
                    <div className="vintg-cards">
                      {group.items.map((item) => (
                        <FeatureCard key={item._id} item={item} showCategory={false} />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="vintg-cards">
                  {safeItems.map((item) => (
                    <FeatureCard key={item._id} item={item} showCategory={showCardCategory} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ---- 3. Enterprise (dark pillar cards, shared with homepage) ---- */}
          <Enterprise
            eyebrow="Enterprise"
            heading="Enterprise-grade security and data control"
            description="The controls your buyers' security reviews ask for, in writing. Your data stays on your infrastructure with per-feature data providers; SOC 2 Type II, HIPAA with a BAA, and EU data residency."
            primaryCta={{ label: "View Trust Center", href: "https://trust.velt.dev/" }}
            secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
          />

          {/* ---- 4. FAQ ---- */}
          {faq?.length > 0 ? (
            <section className="vintg-section">
              <div className="vintg-wrap">
                <SectionHead eyebrow="FAQ" heading="Frequently asked questions" />
                <FaqList items={faq} />
              </div>
            </section>
          ) : null}

          {/* ---- 5. Final CTA — shared dark band, matching the other hubs ---- */}
          <FinalCta
            content={{
              title: "Built for modern collaboration",
              primaryCta: PRIMARY_CTA,
              secondaryCta: SECONDARY_CTA,
              microcopies: [HERO_MICROCOPY],
            }}
          />
        </main>
      </div>
      <div className="vfp-footer">
        <Footer />
      </div>
    </div>
  );
}
