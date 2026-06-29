// Reuse the shipped homepage chrome (.vlp scoped) for nav + footer, then render
// the use-case detail sections inside a .vfp scope. Toggleable chrome sections
// (libraries, testimonials, enterprise) are gated on the mapped content so the
// Sanity show* flags carry over from the old page.
import "@/components/home-new/styles.css";
import "@/components/feature-new/styles.css";
import "./styles.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import LogoStrip from "@/components/feature-new/LogoStrip";
import EnterpriseStrip from "@/components/feature-new/EnterpriseStrip";
import TestimonialWall from "@/components/feature-new/TestimonialWall";
import Faq from "@/components/feature-new/Faq";
import FinalCta from "@/components/feature-new/FinalCta";

import UseCaseHero from "./UseCaseHero";
import UseCaseRows from "./UseCaseRows";
import Libraries from "./Libraries";
import type { UseCaseSpokeContent } from "./content";

type UseCaseSpokeViewProps = {
  content: UseCaseSpokeContent;
};

/**
 * Renders a new-theme /use-case/[slug] detail page from a typed content object
 * (mapped from Sanity). Reuses the homepage Nav/Footer and the feature-page
 * logo strip, enterprise strip, testimonial wall, FAQ, and final CTA; the hero,
 * feature rows, and libraries band are use-case-specific. Optional sections are
 * rendered only when present in the mapped content.
 * @param {UseCaseSpokeViewProps} props The page content.
 * @returns {JSX.Element} The composed use-case detail page.
 */
export default function UseCaseSpokeView({ content }: UseCaseSpokeViewProps) {
  return (
    <div className="vlp">
      <a id="top" />
      <Nav />
      <div className="vfp">
        <main className="vuc">
          <UseCaseHero hero={content.hero} />
          <LogoStrip content={content.logoStrip} />
          <UseCaseRows content={content.rows} />
          {content.libraries ? <Libraries content={content.libraries} /> : null}
          {content.testimonials ? <TestimonialWall content={content.testimonials} /> : null}
          {content.enterprise ? <EnterpriseStrip content={content.enterprise} /> : null}
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
