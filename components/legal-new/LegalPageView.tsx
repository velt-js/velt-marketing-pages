import type { ReactNode } from "react";

// Reuse the shipped homepage chrome (.vlp scoped) so nav + footer stay in sync
// across the site, then render the legal document inside the same scope.
import "@/components/home-new/styles.css";
import "./LegalPageView.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";

type LegalPageViewProps = {
  /** Mono eyebrow label above the title. */
  eyebrow?: string;
  /** Page title, sentence case (e.g. "Privacy policy"). */
  title: string;
  /** Short editorial line under the title. */
  subtitle?: string;
  /** Embed URL for the third-party policy document (Termly). */
  documentSrc: string;
  /** Accessible title for the embedded document iframe. */
  documentTitle: string;
  /** Structured-data nodes rendered inside the .vlp scope. */
  children?: ReactNode;
};

/** Default eyebrow shared by every legal page. */
const DEFAULT_EYEBROW = "Legal";

/**
 * Shared shell for the legal pages (privacy, terms) in the new editorial
 * theme. Mirrors the homepage chrome — sticky Nav, light hero with the orange
 * dot + mono eyebrow, and the shared Footer — wrapping the embedded policy
 * document in a white reading card on a cream band.
 * @param {LegalPageViewProps} props Page content and embed source.
 * @returns {JSX.Element} The composed legal page.
 */
export default function LegalPageView({
  eyebrow = DEFAULT_EYEBROW,
  title,
  subtitle,
  documentSrc,
  documentTitle,
  children,
}: LegalPageViewProps) {
  return (
    <>
      {/* Match the font loading used by every other new-theme route so the
          mono eyebrow renders in Geist Mono and headings in Urbanist. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div className="vlp">
        {children}
        <a id="top" />
        <Nav />
        <div className="vlp-page">
          <main className="legal">
            <section className="legal-hero">
              <div className="legal-wrap">
                <p className="legal-eyebrow">
                  <span className="legal-eyebrow-dot" aria-hidden="true" />
                  {eyebrow}
                </p>
                <h1 className="legal-title">{title}</h1>
                {subtitle ? <p className="legal-sub">{subtitle}</p> : null}
              </div>
            </section>

            <section className="legal-body">
              <div className="legal-wrap">
                <div className="legal-doc">
                  <iframe
                    className="legal-frame"
                    src={documentSrc}
                    title={documentTitle}
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
