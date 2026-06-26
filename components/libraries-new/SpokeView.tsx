// Shared chrome (.vlp) + .vfp scope + .vintg sections, matching HubView.
import "@/components/home-new/styles.css";
import "@/components/feature-new/styles.css";
// Reuse the homepage primitive-card chrome + feature showcase grid so the
// feature cards and install timeline match the rest of the site exactly.
import "@/components/home-new/Primitives.css";
import "@/components/feature-new/Showcase.css";
import "./styles.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import ShowcaseCard from "@/components/feature-new/ShowcaseCard";
import FinalCta from "@/components/feature-new/FinalCta";
import InstallTimeline from "@/components/home-new/InstallTimeline";
import { CtaRow, FaqList, SectionHead } from "./sections";
import { libraryLogo } from "./library-logos";
import type { CtaLink, SpokeContent } from "./content";
import type { CSSProperties } from "react";

type SpokeViewProps = { content: SpokeContent };

const PRIMARY_CTA: CtaLink = {
  label: "Get Free API Key",
  href: "https://console.velt.dev/",
  newTab: true,
};
const SECONDARY_CTA: CtaLink = { label: "Book Demo", href: "/book-demo" };
const DOCS_CTA: CtaLink = { label: "View Docs", href: "https://velt.dev/docs/" };

// Dark Velt mark (#111111) — reads on the light library hero, unlike the
// white homepage nav logo.
const VELT_MARK = "/images/comparison/pricing/velt-mark.svg";

// Inline token-based styles, matching the in-code artifact pattern
// (components/libraries-new/feature-artifacts.tsx, lib/libraries-v2/hero-visual.tsx).
const lockupStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 9,
  marginBottom: 18,
};
const lockupBrandStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};
const lockupVeltStyle: CSSProperties = {
  width: 20,
  height: 20,
  objectFit: "contain",
};
const lockupTextStyle: CSSProperties = {
  fontFamily: "var(--vlp-font-heading)",
  fontWeight: 700,
  fontSize: 15,
  letterSpacing: "-0.02em",
  color: "var(--vlp-color-text)",
};
const lockupXStyle: CSSProperties = {
  fontFamily: "var(--vlp-font-mono)",
  fontSize: 13,
  lineHeight: 1,
  color: "var(--vlp-color-text-subtle)",
};
const lockupLogoStyle: CSSProperties = {
  height: 19,
  width: "auto",
  maxWidth: 96,
  objectFit: "contain",
};

/**
 * "Velt × {library}" hero lockup, shown only when the library has a bundled
 * brand logo (plugin/agent spokes and logo-less surfaces fall back to nothing).
 * @param {{ slug: string; name: string }} props The library slug + display name.
 * @returns {JSX.Element | null} The lockup, or null when no logo exists.
 */
function HeroLockup({ slug, name }: { slug: string; name: string }) {
  try {
    const logo = libraryLogo(slug);
    if (!logo) return null;
    return (
      <div style={lockupStyle} aria-label={`Velt and ${name}`}>
        <span style={lockupBrandStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={VELT_MARK} alt="" aria-hidden="true" style={lockupVeltStyle} />
          <span style={lockupTextStyle}>Velt</span>
        </span>
        <span style={lockupXStyle} aria-hidden="true">
          &times;
        </span>
        <span style={lockupBrandStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" aria-hidden="true" style={lockupLogoStyle} />
          <span style={lockupTextStyle}>{name}</span>
        </span>
      </div>
    );
  } catch (error) {
    console.error("HeroLockup failed", error);
    return null;
  }
}

/**
 * Renders a single /integrations/{slug} spoke page (surface, plugin, or agent).
 * @param {SpokeViewProps} props The spoke content.
 * @returns {JSX.Element} The composed spoke page.
 */
export default function SpokeView({ content }: SpokeViewProps) {
  const isSurface = content.kind === "surface";

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
                <HeroLockup slug={content.slug} name={content.name} />
                <h1>
                  {content.heroTitle}
                  {content.beta ? <span className="vintg-beta">beta</span> : null}
                </h1>
                {content.heroSecondary ? (
                  <p className="vintg-lead">{content.heroSecondary}</p>
                ) : null}
                <CtaRow
                  primaryCta={isSurface ? DOCS_CTA : PRIMARY_CTA}
                  secondaryCta={isSurface ? PRIMARY_CTA : SECONDARY_CTA}
                  microcopy="Free tier. No credit card. First comment in 5 minutes."
                />
              </div>
              <div className="vintg-hero-visual">{content.heroVisual}</div>
            </div>
          </section>

          {/* Problem (surface only) */}
          {isSurface && content.problemBody ? (
            <section className="vintg-section">
              <div className="vintg-wrap">
                <SectionHead eyebrow="The problem" heading={content.problemHeader} />
                <p className="vintg-body" style={{ maxWidth: "72ch" }}>
                  {content.problemBody}
                </p>
              </div>
            </section>
          ) : null}

          {/* Built-for statement (surface only) */}
          {isSurface && content.builtForLine ? (
            <section className="vintg-section vintg-section--alt">
              <div className="vintg-wrap">
                <p className="vintg-statement">{content.builtForLine}</p>
              </div>
            </section>
          ) : null}

          {/* Feature cards (surface) or value props (plugin/agent) */}
          {isSurface ? (
            content.featureShowcaseCards &&
            content.featureShowcaseCards.length > 0 ? (
              <section className="vintg-section">
                <div className="vintg-wrap">
                  <SectionHead
                    eyebrow="Features"
                    heading={`Everything your team and your agents need on ${content.name}`}
                  />
                  <div className="sc-grid">
                    {content.featureShowcaseCards.map((card) => (
                      <ShowcaseCard key={card.num} card={card} />
                    ))}
                  </div>
                  {content.agentsCardBody ? (
                    <div className="vintg-agentcard">
                      <span className="vintg-agentcard-label">Agent</span>
                      <p>{content.agentsCardBody}</p>
                    </div>
                  ) : null}
                </div>
              </section>
            ) : null
          ) : content.valueProps && content.valueProps.length > 0 ? (
            <section className="vintg-section">
              <div className="vintg-wrap">
                <SectionHead eyebrow="Why it helps" heading="What you get" />
                <ul className="vintg-valueprops">
                  {content.valueProps.map((prop, index) => (
                    <li key={index}>{prop}</li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {/* Setup */}
          <section className="vintg-section vintg-section--alt">
            <div className="vintg-wrap">
              <SectionHead eyebrow="Setup" heading="Production-ready in minutes" />
              {isSurface && content.setupSteps && content.setupSteps.length > 0 ? (
                <InstallTimeline steps={content.setupSteps} />
              ) : content.setupNote ? (
                <p className="vintg-body" style={{ maxWidth: "72ch" }}>
                  {content.setupNote}
                </p>
              ) : null}
            </div>
          </section>

          {/* Differentiation / migrate (surface only) */}
          {isSurface && content.migrateLine ? (
            <section className="vintg-section">
              <div className="vintg-wrap">
                <SectionHead eyebrow="Why Velt" heading="The consent step Liveblocks does not have" />
                <p className="vintg-body" style={{ maxWidth: "72ch" }}>
                  {content.migrateLine}
                </p>
                <div className="vintg-ctas" style={{ marginTop: "var(--vlp-space-5)" }}>
                  <a className="vintg-btn vintg-btn--secondary" href="/comparison">
                    Compare
                  </a>
                  <a
                    className="vintg-btn vintg-btn--secondary"
                    href="/migrate-from-liveblocks-to-velt"
                  >
                    Migration guide
                  </a>
                </div>
              </div>
            </section>
          ) : null}

          {/* Enterprise (surface only) */}
          {isSurface ? (
            <section className="vintg-section vintg-section--alt">
              <div className="vintg-wrap">
                <SectionHead
                  eyebrow="Enterprise"
                  heading="Enterprise-grade security and data control"
                  support="The controls your buyers' security reviews ask for, in writing."
                />
                <div className="vintg-banner">
                  <p>
                    Adding Velt to {content.name} does not move that surface&apos;s content off
                    your stack. Per-feature data providers keep comment content, attachments, and
                    user PII on your own infrastructure; Velt stores only minimal identifiers.
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

          {/* Related libraries */}
          {content.related.length > 0 && (
            <section className="vintg-section vintg-section--alt">
              <div className="vintg-wrap">
                <SectionHead eyebrow="Related" heading="Explore other integrations" />
                <div className="vintg-chips">
                  {content.related.map((sibling) => {
                    const logo = libraryLogo(sibling.slug);
                    return (
                      <a
                        key={sibling.slug}
                        className="vintg-chip"
                        href={`/libraries/${sibling.slug}`}
                      >
                        {logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="vintg-chip-logo"
                            src={logo}
                            alt=""
                            aria-hidden="true"
                          />
                        ) : null}
                        {sibling.name}
                        {sibling.beta ? (
                          <span className="vintg-chip-beta">beta</span>
                        ) : null}
                      </a>
                    );
                  })}
                </div>
                <a className="vintg-backlink" href="/libraries">
                  See all libraries
                </a>
              </div>
            </section>
          )}

          {/* Final CTA — shared dark band (DESIGN.md §3), matching the
              feature pages instead of the old light hand-rolled block. */}
          <FinalCta
            content={{
              title: content.heroTitle,
              primaryCta: PRIMARY_CTA,
              secondaryCta: SECONDARY_CTA,
              microcopies: [
                "Free tier. No credit card.",
                "First comment in 5 minutes.",
              ],
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
