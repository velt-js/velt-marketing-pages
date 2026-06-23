// Reuse the shipped homepage chrome (.vlp scoped) for nav + footer, then render
// the use-case sections inside a .vfp scope so they share the feature-page
// design system (tokens, bands, kickers, buttons). The bespoke use-case
// sections (.vuc) sit inside .vfp.
import "@/components/home-new/styles.css";
import "@/components/feature-new/styles.css";
import "./styles.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import LogoStrip from "@/components/feature-new/LogoStrip";
import EnterpriseStrip from "@/components/feature-new/EnterpriseStrip";
import Faq from "@/components/feature-new/Faq";
import FinalCta from "@/components/feature-new/FinalCta";

import UseCaseHero from "./UseCaseHero";
import UseCaseGrid from "./UseCaseGrid";
import type { UseCaseHubContent } from "./content";

type UseCaseHubViewProps = {
  content: UseCaseHubContent;
};

/**
 * Renders the new-theme /use-case index page from a typed content object.
 * Reuses the homepage Nav/Footer and the feature-page logo strip, enterprise
 * strip, FAQ, and final CTA; the hero and card grid are use-case-specific.
 * @param {UseCaseHubViewProps} props The page content.
 * @returns {JSX.Element} The composed use-case hub page.
 */
export default function UseCaseHubView({ content }: UseCaseHubViewProps) {
  return (
    <div className="vlp">
      <a id="top" />
      <Nav />
      <div className="vfp">
        <main className="vuc">
          <UseCaseHero hero={content.hero} />
          <LogoStrip content={content.logoStrip} />
          <UseCaseGrid content={content.grid} />
          <EnterpriseStrip content={content.enterprise} />
          {(content.faq?.items?.length ?? 0) > 0 ? <Faq content={content.faq} /> : null}
          <FinalCta content={content.finalCta} />
        </main>
      </div>
      <div className="vfp-footer">
        <Footer />
      </div>
    </div>
  );
}
