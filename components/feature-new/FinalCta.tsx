import type { FinalCtaContent } from "./content";

// Reuse the homepage CTA button styles (.cta-btn-light / .cta-btn-outline) so
// the actions match the shipped homepage exactly. Safe to import: its other
// rules target homepage-only class names (.cta-section, .cta-inner, ...).
import "@/components/home-new/FinalCta.css";
import "./FinalCta.css";

type FinalCtaProps = {
  content: FinalCtaContent;
};

/**
 * Final CTA: restates the feature title with both actions and both microcopy
 * lines, on a dark band immediately after the FAQ.
 * @param {FinalCtaProps} props Section content.
 * @returns {JSX.Element} The final CTA section.
 */
export default function FinalCta({ content }: FinalCtaProps) {
  return (
    <section className="final-cta" id="final-cta" data-section="final-cta">
      <div className="wrap">
        <h2>{content.title}</h2>
        <div className="cta-row" style={{ justifyContent: "center" }}>
          <a className="cta-btn-light hfade" href={content.primaryCta.href} target={content.primaryCta.newTab ? "_blank" : undefined} rel={content.primaryCta.newTab ? "noreferrer" : undefined}>
            {content.primaryCta.label}
          </a>
          <a className="cta-btn-outline houtline" href={content.secondaryCta.href} target={content.secondaryCta.newTab ? "_blank" : undefined} rel={content.secondaryCta.newTab ? "noreferrer" : undefined}>
            {content.secondaryCta.label}
          </a>
        </div>
        <div className="micro-row">
          {content.microcopies.map((line) => (
            <p className="microcopy" key={line}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
