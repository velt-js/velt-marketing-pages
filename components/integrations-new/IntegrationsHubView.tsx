// Reskin of the /integrations hub into the new editorial ".vfp" theme,
// matching the already-built library pages. Server component (no "use client").
import "@/components/home-new/styles.css";
import "@/components/feature-new/styles.css";
import "@/components/libraries-new/styles.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import { CtaRow, FaqList, SectionHead } from "@/components/libraries-new/sections";
import { sharedFAQ } from "@/components/library/shared-content";
import type { IntegrationsHubContent, IntegrationCard } from "@/components/integrations-new/content";
import type { FaqEntry } from "@/components/libraries-new/content";

/** Maximum number of hero logo chips shown in the right column. */
const HERO_CHIP_COUNT = 6;

/**
 * Collect the first N items across all categories for the hero visual.
 * @param {IntegrationsHubContent["categories"]} categories All hub categories.
 * @param {number} limit How many items to collect at most.
 * @returns {IntegrationCard[]} A flat array of the first `limit` items.
 */
function collectHeroItems(
  categories: IntegrationsHubContent["categories"],
  limit: number
): IntegrationCard[] {
  const items: IntegrationCard[] = [];
  for (const category of categories) {
    for (const item of category.items) {
      if (items.length >= limit) break;
      items.push(item);
    }
    if (items.length >= limit) break;
  }
  return items;
}

/**
 * Full-page hub view for /integrations reskinned in the new editorial .vfp
 * theme. Shares chrome (Nav, Footer) and design primitives (CtaRow, SectionHead,
 * FaqList, .vintg-* classes) with the libraries-new pages.
 *
 * @param {{ content: IntegrationsHubContent }} props Hub content object.
 * @returns {JSX.Element} The composed integrations hub page.
 */
export default function IntegrationsHubView({ content }: { content: IntegrationsHubContent }) {
  const heroItems = collectHeroItems(content?.categories ?? [], HERO_CHIP_COUNT);

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
                <p className="vintg-eyebrow">Integrations</p>
                <h1>Integrations with the tools you already use</h1>
                <p className="vintg-lead">
                  Plug Velt into the messaging, storage, CRM, analytics, workflow, and email tools
                  your team already runs on.
                </p>
                <CtaRow
                  primaryCta={{ label: "Get Free API Key", href: "https://console.velt.dev/", newTab: true }}
                  secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
                  microcopy="Free tier. No credit card. First comment in 5 minutes."
                />
              </div>
              <div className="vintg-hero-visual">
                {heroItems.length > 0 ? (
                  <div className="vintg-chips">
                    {heroItems.map((item) => (
                      <a
                        key={item.slug}
                        className="vintg-chip"
                        href={`/integrations/${item.slug}`}
                      >
                        {item.logoSrc ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className={
                              item.nameInLogo
                                ? "vintg-chip-logo vintg-chip-logo--wide"
                                : "vintg-chip-logo"
                            }
                            src={item.logoSrc}
                            alt={item.nameInLogo ? item.name : ""}
                            aria-hidden={item.nameInLogo ? undefined : "true"}
                          />
                        ) : null}
                        {item.nameInLogo && item.logoSrc ? null : item.name}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          {/* ---- 2. Categorized grid ---- */}
          <section className="vintg-section">
            <div className="vintg-wrap">
              <SectionHead
                eyebrow="Integrations"
                heading="Drops into the stack you already have"
                support="Every tool links to its setup guide."
              />
              <div className="vintg-gridwrap">
                <div className="vintg-surfgrid">
                  {content?.categories?.map((category) => (
                    <div key={category.label} className="vintg-bandcard">
                      <p className="vintg-catgroup-label">{category.label}</p>
                      <div className="vintg-chips">
                        {category.items.map((item) => (
                          <a
                            key={item.slug}
                            className="vintg-chip"
                            href={`/integrations/${item.slug}`}
                          >
                            {item.logoSrc ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                className={
                                  item.nameInLogo
                                    ? "vintg-chip-logo vintg-chip-logo--wide"
                                    : "vintg-chip-logo"
                                }
                                src={item.logoSrc}
                                alt={item.nameInLogo ? item.name : ""}
                                aria-hidden={item.nameInLogo ? undefined : "true"}
                              />
                            ) : null}
                            {item.nameInLogo && item.logoSrc ? null : item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ---- 3. Enterprise strip ---- */}
          <section className="vintg-section vintg-section--alt">
            <div className="vintg-wrap">
              <SectionHead
                eyebrow="Enterprise"
                heading="Enterprise-grade security and data control"
                support="The controls your buyers' security reviews ask for, in writing."
              />
              <div className="vintg-banner">
                <p>
                  Your data stays on your infrastructure with per-feature data providers; SOC 2
                  Type II, HIPAA with a BAA, and EU data residency.
                </p>
              </div>
              <div className="vintg-ctas" style={{ marginTop: "var(--vlp-space-5)" }}>
                <a className="vintg-btn vintg-btn--secondary" href="https://trust.velt.dev/">
                  View Trust Center
                </a>
                <a className="vintg-btn vintg-btn--secondary" href="/book-demo">
                  Book Demo
                </a>
              </div>
            </div>
          </section>

          {/* ---- 4. FAQ ---- */}
          <section className="vintg-section">
            <div className="vintg-wrap">
              <SectionHead eyebrow="FAQ" heading="Frequently asked questions" />
              <FaqList items={sharedFAQ as FaqEntry[]} />
            </div>
          </section>

          {/* ---- 5. Final CTA ---- */}
          <section className="vintg-section vintg-section--flush">
            <div className="vintg-wrap vintg-finalcta">
              <h2>Integrations with the tools you already use</h2>
              <CtaRow
                primaryCta={{ label: "Get Free API Key", href: "https://console.velt.dev/", newTab: true }}
                secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
                microcopy="Free tier. No credit card. First comment in 5 minutes."
              />
            </div>
          </section>

        </main>
      </div>
      <div className="vfp-footer">
        <Footer />
      </div>
    </div>
  );
}
