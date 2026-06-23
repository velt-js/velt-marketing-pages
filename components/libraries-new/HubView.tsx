// Reuse the shipped homepage chrome (.vlp) so nav + footer stay in sync, then
// render the integrations hub inside a .vfp scope (so feature-new demo-atom
// classes resolve) with our own .vintg section styles.
import "@/components/home-new/styles.css";
import "@/components/feature-new/styles.css";
import "./styles.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import InstallTimeline from "@/components/home-new/InstallTimeline";
import FinalCta from "@/components/feature-new/FinalCta";
import IntegrationGrid from "./IntegrationGrid";
import CapabilityMatrix from "./CapabilityMatrix";
import { CtaRow, FaqList, FeatureCards, SectionHead } from "./sections";
import type { CtaLink, HubContent } from "./content";

type HubViewProps = { content: HubContent };

const DEFAULT_PRIMARY_CTA: CtaLink = {
  label: "Get Free API Key",
  href: "https://console.velt.dev/",
  newTab: true,
};
const DEFAULT_SECONDARY_CTA: CtaLink = { label: "Book Demo", href: "/book-demo" };

/**
 * Renders the full /integrations hub page from a typed HubContent object.
 * @param {HubViewProps} props The hub content.
 * @returns {JSX.Element} The composed hub page.
 */
export default function HubView({ content }: HubViewProps) {
  const { hero, grid } = content;

  return (
    <div className="vlp">
      <a id="top" />
      <Nav />
      <div className="vfp">
        <main className="vintg">
          {/* Hero */}
          <section className="vintg-wrap">
            <div className="vintg-hero">
              <div>
                {hero.kicker ? <p className="vintg-eyebrow">{hero.kicker}</p> : null}
                <h1>{hero.title}</h1>
                {hero.secondary ? <p className="vintg-lead">{hero.secondary}</p> : null}
                <CtaRow
                  primaryCta={hero.primaryCta}
                  secondaryCta={hero.secondaryCta}
                  microcopy={hero.microcopy}
                />
              </div>
              <div className="vintg-hero-visual">{content.heroVisual}</div>
            </div>
          </section>

          {/* What it is */}
          {(content.whatItIs.header || content.whatItIs.cards.length > 0) && (
            <section className="vintg-section">
              <div className="vintg-wrap">
                <SectionHead
                  eyebrow="What it is"
                  heading={content.whatItIs.header}
                  support={content.whatItIs.body}
                />
                <FeatureCards cards={content.whatItIs.cards} />
              </div>
            </section>
          )}

          {/* How it works */}
          {content.howItWorks.steps.length > 0 && (
            <section className="vintg-section vintg-section--alt">
              <div className="vintg-wrap">
                <SectionHead eyebrow="How it works" heading={content.howItWorks.header} />
                <InstallTimeline steps={content.howItWorks.installSteps} />
                {content.howItWorks.mcpBanner ? (
                  <div className="vintg-banner">
                    <p>
                      <strong>{content.howItWorks.mcpBanner}</strong>
                    </p>
                  </div>
                ) : null}
                {content.howItWorks.buildVsBuy ? (
                  <div className="vintg-banner">
                    <p>{content.howItWorks.buildVsBuy}</p>
                  </div>
                ) : null}
              </div>
            </section>
          )}

          {/* Grid + capability matrix */}
          <section className="vintg-section">
            <div className="vintg-wrap">
              <SectionHead
                eyebrow="Integrations"
                heading={grid.header}
                support={grid.supportLine}
              />
              <IntegrationGrid
                surfacesSubheader={grid.surfacesSubheader}
                surfaceCategories={grid.surfaceCategories}
                buildWithIntro={grid.buildWithIntro}
                buildWithItems={grid.buildWithItems}
                agentsInsideIntro={grid.agentsInsideIntro}
                agentsInsideItems={grid.agentsInsideItems}
                stackLabel={grid.stackLabel}
                stackLinks={grid.stackLinks}
              />
              {grid.matrixRows.length > 0 ? (
                <div style={{ marginTop: "var(--vlp-space-12)" }}>
                  {grid.matrixSubheader ? (
                    <p className="vintg-band-label">{grid.matrixSubheader}</p>
                  ) : null}
                  <CapabilityMatrix rows={grid.matrixRows} caption={grid.matrixCaption} />
                </div>
              ) : null}
            </div>
          </section>

          {/* Bring your own surface */}
          {(content.byos.header || content.byos.body) && (
            <section className="vintg-section vintg-section--alt">
              <div className="vintg-wrap vintg-two">
                <h2 className="vintg-h2">{content.byos.header}</h2>
                <p className="vintg-body">{content.byos.body}</p>
              </div>
            </section>
          )}

          {/* Verticals */}
          {content.verticals.items.length > 0 && (
            <section className="vintg-section">
              <div className="vintg-wrap">
                <SectionHead eyebrow="In production" heading={content.verticals.header} />
                <div className="vintg-cards">
                  {content.verticals.items.map((vertical) => (
                    <div key={vertical.label} className="vintg-card">
                      <h4>{vertical.label}</h4>
                      {vertical.body ? <p>{vertical.body}</p> : null}
                      {vertical.forHref ? (
                        <a className="vintg-card-link" href={vertical.forHref}>
                          See the use case
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Related primitives */}
          {content.related.items.length > 0 && (
            <section className="vintg-section">
              <div className="vintg-wrap">
                <SectionHead eyebrow="Related" heading={content.related.header} />
                <FeatureCards cards={content.related.items} />
              </div>
            </section>
          )}

          {/* Enterprise */}
          {content.enterpriseLine ? (
            <section className="vintg-section vintg-section--alt">
              <div className="vintg-wrap">
                <SectionHead eyebrow="Enterprise" heading="Enterprise-grade security and data control" />
                <div className="vintg-banner">
                  <p>{content.enterpriseLine}</p>
                </div>
              </div>
            </section>
          ) : null}

          {/* FAQ */}
          {content.faq.length > 0 && (
            <section className="vintg-section">
              <div className="vintg-wrap">
                <SectionHead eyebrow="FAQ" heading="Frequently asked questions" />
                <FaqList items={content.faq} />
              </div>
            </section>
          )}

          {/* Final CTA — shared dark band (DESIGN.md §3), matching the
              feature pages instead of the old light hand-rolled block. */}
          <FinalCta
            content={{
              title: content.finalCta.title ?? hero.title,
              primaryCta:
                content.finalCta.primaryCta ??
                hero.primaryCta ??
                DEFAULT_PRIMARY_CTA,
              secondaryCta:
                content.finalCta.secondaryCta ??
                hero.secondaryCta ??
                DEFAULT_SECONDARY_CTA,
              microcopies: [
                content.finalCta.microcopy ?? hero.microcopy,
              ].filter((line): line is string => Boolean(line)),
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
