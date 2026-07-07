// Reuse the shipped homepage chrome (.vlp scoped) so nav + footer stay in
// sync across the site, then render the feature sections inside a .vfp scope.
import "@/components/home-new/styles.css";
import "./styles.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import Integrations from "@/components/home-new/Integrations";
import Enterprise from "@/components/home-new/Enterprise";
import FeatureHero from "./FeatureHero";
import LogoStrip from "./LogoStrip";
import WhatItIs from "./WhatItIs";
import HowItWorks from "./HowItWorks";
import Showcase from "./Showcase";
import DetailsWall from "./DetailsWall";
import MakeItYours from "./MakeItYours";
import InProduction from "./InProduction";
import Related from "./Related";
import EnterpriseStrip from "./EnterpriseStrip";
import TestimonialWall from "./TestimonialWall";
import Faq from "./Faq";
import FinalCta from "./FinalCta";
import type { ReactNode } from "react";
import type { FeaturePageContent } from "./content";

type FeaturePageViewProps = {
  content: FeaturePageContent;
  /**
   * Optional override for the enterprise section. When provided, it replaces the
   * default compliance-badge EnterpriseStrip (e.g. /platform swaps in the
   * 4-pillar home-new Enterprise section). Takes precedence over the
   * CMS-driven `content.enterprisePillars` section.
   */
  enterpriseSection?: ReactNode;
  /**
   * Optional override for the "Little big details" section. When provided, it
   * replaces the default DetailsWall (e.g. /comments swaps in the DetailsShowcase
   * whose items are sourced from the legacy v1 featurePage document).
   */
  detailsSection?: ReactNode;
};

/**
 * Pick the enterprise section to render. An explicit `enterpriseSection`
 * override wins; otherwise a CMS-configured polished pillar section
 * (`content.enterprisePillars`) renders; otherwise the default compliance-badge
 * strip.
 * @param {FeaturePageContent} content The page content.
 * @param {ReactNode} [enterpriseSection] Optional explicit override.
 * @returns {ReactNode} The enterprise section to render.
 */
function resolveEnterpriseSection(
  content: FeaturePageContent,
  enterpriseSection?: ReactNode,
): ReactNode {
  try {
    if (enterpriseSection) return enterpriseSection;
    if (content.enterprisePillars) {
      return <Enterprise {...content.enterprisePillars} />;
    }
    return <EnterpriseStrip content={content.enterprise} />;
  } catch (error) {
    console.error("resolveEnterpriseSection failed", error);
    return <EnterpriseStrip content={content.enterprise} />;
  }
}

/**
 * Renders the full v10 feature page (all 15 sections) from a typed content
 * object. Used by the static Audit Trail route and, in Phase 2, by the
 * Sanity-backed dynamic route.
 * @param {FeaturePageViewProps} props The page content.
 * @returns {JSX.Element} The composed feature page.
 */
export default function FeaturePageView({ content, enterpriseSection, detailsSection }: FeaturePageViewProps) {
  return (
    <div className="vlp">
      <a id="top" />
      <Nav />
      <div className="vfp" data-page={content.slug}>
        <main>
          <FeatureHero hero={content.hero} />
          <LogoStrip content={content.logoStrip} />
          <WhatItIs content={content.whatItIs} />
          <HowItWorks content={content.howItWorks} />
          <Showcase content={content.showcase} />
          {detailsSection ?? <DetailsWall content={content.details} />}
          {/* The full home-new "Drops into the stack" integrations grid, scoped
              to the comments page per request. Self-styled (.vlp-scoped). */}
          {content.slug === "comments" ? <Integrations /> : null}
          {content.makeItYours ? <MakeItYours content={content.makeItYours} /> : null}
          {content.inProduction ? <InProduction content={content.inProduction} /> : null}
          {content.related ? <Related content={content.related} /> : null}
          {resolveEnterpriseSection(content, enterpriseSection)}
          <TestimonialWall content={content.testimonials} />
          <Faq content={content.faq} />
          <FinalCta content={content.finalCta} />
        </main>
      </div>
      <div className="vfp-footer">
        <Footer />
      </div>
    </div>
  );
}
