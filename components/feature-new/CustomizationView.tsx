// Bespoke composer for the /customization page. Mirrors FeaturePageView's
// .vlp/.vfp chrome and reuses every standard feature-new section, but inserts
// two bespoke sections from the customization spec: the presentation Spectrum
// (after What-it-is) and the examples Gallery (in place of the per-vertical In
// Production tabs). Kept separate from FeaturePageView so the 12 live feature
// pages are entirely unaffected.
import "@/components/home-new/styles.css";
import "./styles.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import FeatureHero from "./FeatureHero";
import LogoStrip from "./LogoStrip";
import WhatItIs from "./WhatItIs";
import Spectrum, { type SpectrumContent } from "./Spectrum";
import HowItWorks from "./HowItWorks";
import Showcase from "./Showcase";
import DetailsWall from "./DetailsWall";
import MakeItYours from "./MakeItYours";
import ExamplesGallery, { type GalleryContent } from "./ExamplesGallery";
import Related from "./Related";
import EnterpriseStrip from "./EnterpriseStrip";
import TestimonialWall from "./TestimonialWall";
import Faq from "./Faq";
import FinalCta from "./FinalCta";
import type { FeaturePageContent } from "./content";

type CustomizationViewProps = {
  content: FeaturePageContent;
  spectrum: SpectrumContent;
  gallery: GalleryContent;
};

/**
 * Render the customization page: the standard feature sections plus the bespoke
 * Spectrum and ExamplesGallery.
 * @param {CustomizationViewProps} props The page content and bespoke sections.
 * @returns {JSX.Element} The composed customization page.
 */
export default function CustomizationView({ content, spectrum, gallery }: CustomizationViewProps) {
  return (
    <div className="vlp">
      <a id="top" />
      <Nav />
      <div className="vfp">
        <main>
          <FeatureHero hero={content.hero} />
          <LogoStrip content={content.logoStrip} />
          <WhatItIs content={content.whatItIs} />
          <Spectrum content={spectrum} />
          <HowItWorks content={content.howItWorks} />
          <Showcase content={content.showcase} />
          <DetailsWall content={content.details} />
          {content.makeItYours ? <MakeItYours content={content.makeItYours} /> : null}
          <ExamplesGallery content={gallery} />
          <Related content={content.related} />
          <EnterpriseStrip content={content.enterprise} />
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
