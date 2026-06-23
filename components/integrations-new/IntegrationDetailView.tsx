// Reskin of the integration detail page (e.g. /integrations/slack) into the
// new editorial .vfp theme, matching the look of the library spoke pages.
// Same content, new skin. Server component only -- no "use client".
import "@/components/home-new/styles.css";
import "@/components/feature-new/styles.css";
import "@/components/libraries-new/styles.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import { CtaRow, FaqList, SectionHead } from "@/components/libraries-new/sections";
import { sharedFAQ } from "@/components/library/shared-content";
import type { FaqEntry } from "@/components/libraries-new/content";
import type { IntegrationDetailContent } from "@/components/integrations-new/content";

// Cast sharedFAQ to the libraries-new FaqEntry shape. Both types share
// { question: string; answer: string } at runtime; the extra `paragraphs?`
// field on the library type is never present in sharedFAQ entries.
const DETAIL_FAQ = sharedFAQ as unknown as FaqEntry[];

// ---- Sub-components --------------------------------------------------------

/**
 * A bespoke endpoint mock card rendered in the first narrative row.
 * Uses inline styles with CSS custom properties from the .vlp token set.
 * @param {{ name: string }} props The integration name for the endpoint label.
 * @returns {JSX.Element} The endpoint mock card.
 */
function EndpointMock({ name }: { name: string }) {
  return (
    <div
      style={{
        background: "var(--vlp-bg-card-dark)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "var(--vlp-radius-card)",
        padding: "28px 40px",
        color: "var(--vlp-color-text-on-dark)",
        fontFamily: "var(--vlp-font-mono)",
      }}
    >
      <p
        style={{
          fontSize: "var(--vlp-text-tag)",
          letterSpacing: "var(--vlp-tracking-eyebrow)",
          textTransform: "uppercase",
          color: "var(--vlp-color-text-on-dark-muted)",
          margin: "0 0 var(--vlp-space-5)",
        }}
      >
        Endpoints &rsaquo; New Endpoint
      </p>
      <p
        style={{
          fontSize: "var(--vlp-text-body-sm)",
          color: "var(--vlp-color-text-on-dark-muted)",
          margin: "0 0 var(--vlp-space-2)",
          textTransform: "uppercase",
          letterSpacing: "var(--vlp-tracking-eyebrow)",
        }}
      >
        Endpoint URL
      </p>
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "var(--vlp-radius-md)",
          padding: "var(--vlp-space-3) var(--vlp-space-4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--vlp-color-text-on-dark)",
          fontSize: "var(--vlp-text-body)",
        }}
      >
        <span>Connect to {name}</span>
        <span aria-hidden="true" style={{ opacity: 0.6, fontSize: "0.75em" }}>
          &#8964;
        </span>
      </div>
    </div>
  );
}

/**
 * A single alternating editorial row: heading, body copy, Open Console CTA,
 * and a visual panel. The `reverse` flag swaps text/visual column order.
 * @param {{ title: string; body: string; visual: React.ReactNode; reverse?: boolean }} props Row content.
 * @returns {JSX.Element} The two-column editorial row.
 */
function IntegrationRow({
  title,
  body,
  visual,
  reverse,
}: {
  title: string;
  body: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  const textCol = (
    <div>
      <h2 className="vintg-h2">{title}</h2>
      <p className="vintg-body" style={{ maxWidth: "52ch", marginTop: "var(--vlp-space-4)" }}>
        {body}
      </p>
      <div className="vintg-ctas" style={{ marginTop: "var(--vlp-space-6)" }}>
        <a
          className="vintg-btn vintg-btn--secondary"
          href="https://console.velt.dev/"
          target="_blank"
          rel="noreferrer"
        >
          Open Console
        </a>
      </div>
    </div>
  );

  const visualCol = <div>{visual}</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--vlp-space-16)",
        alignItems: "center",
      }}
    >
      {reverse ? (
        <>
          <div style={{ order: 0 }}>{visualCol}</div>
          <div style={{ order: 1 }}>{textCol}</div>
        </>
      ) : (
        <>
          {textCol}
          {visualCol}
        </>
      )}
    </div>
  );
}

// ---- Main export -----------------------------------------------------------

/**
 * Full-page reskin of an integration detail view in the new .vfp editorial theme.
 * Renders hero, connect/payload/unified narrative rows, optional code snippet,
 * enterprise strip, related chips, FAQ, and final CTA.
 * @param {{ content: IntegrationDetailContent }} props The typed integration detail content.
 * @returns {JSX.Element} The composed detail page.
 */
export default function IntegrationDetailView({
  content,
}: {
  content: IntegrationDetailContent;
}) {
  const heroTitle = content?.heroTitle ?? `Integrate Velt in ${content?.name}`;
  const heroDesc = content?.description ?? content?.tagline;

  return (
    <div className="vlp">
      <a id="top" />
      <Nav />
      <div className="vfp">
        <main className="vintg">

          {/* 1. Hero */}
          <section className="vintg-wrap">
            <div className="vintg-hero">
              <div>
                <p className="vintg-eyebrow">{content?.category ?? "Integration"}</p>
                <h1>{heroTitle}</h1>
                {heroDesc ? <p className="vintg-lead">{heroDesc}</p> : null}
                <CtaRow
                  primaryCta={{
                    label: "View Docs",
                    href: content?.docsUrl ?? "https://velt.dev/docs/",
                    newTab: true,
                  }}
                  secondaryCta={{
                    label: "Get Free API Key",
                    href: "https://console.velt.dev/",
                    newTab: true,
                  }}
                  microcopy="Free tier. No credit card. First comment in 5 minutes."
                />
              </div>

              <div className="vintg-hero-visual">
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--vlp-border-card)",
                    borderRadius: "var(--vlp-radius-card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "240px",
                    padding: "var(--vlp-space-10)",
                  }}
                >
                  {content?.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={content.logo}
                      alt={`${content.name} logo`}
                      style={{ maxWidth: "160px", maxHeight: "80px", objectFit: "contain" }}
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--vlp-font-heading)",
                        fontSize: "var(--vlp-text-section)",
                        fontWeight: "var(--vlp-weight-semibold)",
                        color: "var(--vlp-color-text)",
                        letterSpacing: "var(--vlp-tracking-snug)",
                      }}
                    >
                      {content?.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 2a. Connect row (always rendered) */}
          <section className="vintg-section">
            <div className="vintg-wrap">
              <IntegrationRow
                title={`Connect ${content?.name} with Velt Console`}
                body={content?.connectBody ?? `Link your ${content?.name} account through the Velt Console in a few clicks. No custom server code required -- the Console handles authentication, credential storage, and token rotation so your team can stay focused on building.`}
                visual={<EndpointMock name={content?.name} />}
                reverse={false}
              />
            </div>
          </section>

          {/* 2b. Payload transformation row (only if body provided) */}
          {content?.payloadBody ? (
            <section className="vintg-section vintg-section--alt">
              <div className="vintg-wrap">
                <IntegrationRow
                  title="Built-in payload transformation"
                  body={content.payloadBody}
                  visual={
                    content?.payloadImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={content.payloadImage}
                        alt=""
                        aria-hidden="true"
                        style={{
                          width: "100%",
                          border: "1px solid var(--vlp-border-card)",
                          borderRadius: "var(--vlp-radius-card)",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          aspectRatio: "16 / 10",
                          background: "var(--vlp-bg-section-alt)",
                          border: "1px solid var(--vlp-border-card)",
                          borderRadius: "var(--vlp-radius-card)",
                        }}
                      />
                    )
                  }
                  reverse={true}
                />
              </div>
            </section>
          ) : null}

          {/* 2c. Unified experience row (only if body provided) */}
          {content?.unifiedBody ? (
            <section className="vintg-section">
              <div className="vintg-wrap">
                <IntegrationRow
                  title="Provide a unified customer experience"
                  body={content.unifiedBody}
                  visual={
                    content?.unifiedImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={content.unifiedImage}
                        alt=""
                        aria-hidden="true"
                        style={{
                          width: "100%",
                          border: "1px solid var(--vlp-border-card)",
                          borderRadius: "var(--vlp-radius-card)",
                          display: "block",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          aspectRatio: "16 / 10",
                          background: "var(--vlp-bg-section-alt)",
                          border: "1px solid var(--vlp-border-card)",
                          borderRadius: "var(--vlp-radius-card)",
                        }}
                      />
                    )
                  }
                  reverse={false}
                />
              </div>
            </section>
          ) : null}

          {/* 3. Get started (only if codeSnippet provided) */}
          {content?.codeSnippet ? (
            <section className="vintg-section vintg-section--alt">
              <div className="vintg-wrap">
                <SectionHead eyebrow="Get started" heading={`Add Velt to ${content.name}`} />
                <pre
                  style={{
                    background: "var(--vlp-color-dark-2)",
                    color: "var(--vlp-color-text-on-dark)",
                    fontFamily: "var(--vlp-font-mono)",
                    borderRadius: "var(--vlp-radius-card)",
                    padding: "var(--vlp-space-6)",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    margin: 0,
                  }}
                >
                  {content.codeSnippet}
                </pre>
              </div>
            </section>
          ) : null}

          {/* 4. Enterprise strip */}
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

          {/* 5. Related integrations (only if related list is non-empty) */}
          {content?.related?.length > 0 ? (
            <section className="vintg-section">
              <div className="vintg-wrap">
                <SectionHead eyebrow="Related" heading="Explore other integrations" />
                <div className="vintg-chips">
                  {content.related.map((related) => (
                    <a
                      key={related.slug}
                      className="vintg-chip"
                      href={`/integrations/${related.slug}`}
                    >
                      {related?.logoSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          className="vintg-chip-logo"
                          src={related.logoSrc}
                          alt=""
                          aria-hidden="true"
                        />
                      ) : null}
                      {related.name}
                    </a>
                  ))}
                </div>
                <a className="vintg-backlink" href="/integrations">
                  See all integrations
                </a>
              </div>
            </section>
          ) : null}

          {/* 6. FAQ */}
          <section className="vintg-section">
            <div className="vintg-wrap">
              <SectionHead eyebrow="FAQ" heading="Frequently asked questions" />
              <FaqList items={DETAIL_FAQ} />
            </div>
          </section>

          {/* 7. Final CTA */}
          <section className="vintg-section vintg-section--flush">
            <div className="vintg-wrap vintg-finalcta">
              <h2>{heroTitle}</h2>
              <CtaRow
                primaryCta={{
                  label: "Get Free API Key",
                  href: "https://console.velt.dev/",
                  newTab: true,
                }}
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
