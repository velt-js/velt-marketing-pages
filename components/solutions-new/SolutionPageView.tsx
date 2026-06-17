// Reuse the shipped homepage chrome (.vlp scoped) for nav + footer, then render
// the solutions sections inside a .vfp scope so they share the feature-page
// design system (tokens, bands, kickers, buttons).
import "@/components/home-new/styles.css";
import "@/components/feature-new/styles.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import LogoStrip from "@/components/feature-new/LogoStrip";
import Faq from "@/components/feature-new/Faq";
import FinalCta from "@/components/feature-new/FinalCta";

import SolutionHero from "./SolutionHero";
import ReviewReality from "./ReviewReality";
import TheLoop from "./TheLoop";
import FeatureMap from "./FeatureMap";
import AgentLayer from "./AgentLayer";
import InProductionCase from "./InProductionCase";
import ComplianceStrip from "./ComplianceStrip";
import type { SolutionPageContent } from "./content";

type SolutionPageViewProps = {
  content: SolutionPageContent;
};

/**
 * Renders the full v1 Solutions (vertical) page from a typed content object.
 * Used by the Sanity-backed /solutions/[slug] route. Reuses the logo strip,
 * FAQ, and final CTA from the feature-page system; the vertical-specific
 * sections are solutions-new components.
 * @param {SolutionPageViewProps} props The page content.
 * @returns {JSX.Element} The composed solutions page.
 */
export default function SolutionPageView({ content }: SolutionPageViewProps) {
  return (
    <div className="vlp">
      <a id="top" />
      <Nav />
      <div className="vfp">
        <main>
          <SolutionHero hero={content.hero} />
          <LogoStrip content={content.logoStrip} />
          <ReviewReality content={content.reviewReality} />
          <TheLoop content={content.theLoop} />
          <FeatureMap content={content.featureMap} />
          <AgentLayer content={content.agentLayer} />
          <InProductionCase content={content.inProduction} />
          <ComplianceStrip content={content.compliance} />
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
