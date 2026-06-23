import type { ReactNode } from "react";

import SectionSplitHeader from "./SectionSplitHeader";
import CtaBanner from "./CtaBanner";
import type { CtaLink, CtaBannerContent } from "./content";

// Bespoke section for the /customization page: the "looks like the tools your
// users already know" examples gallery. Replaces the per-vertical In Production
// tabs (customization is horizontal). Each card is a one-to-one analogy caption
// over a small simulated visual, plus the full /for + /use-case link row and a
// CTA banner beneath, per the customization content spec section 9.

export type GalleryItem = {
  label: string;
  analogy: string;
  visual?: ReactNode;
};

export type GalleryContent = {
  kicker: string;
  heading: string;
  support: string;
  items: GalleryItem[];
  whereItFits: { label: string; links: CtaLink[] };
  ctaBanner: CtaBannerContent;
};

type ExamplesGalleryProps = {
  content: GalleryContent;
};

/**
 * The examples gallery for the customization page.
 * @param {ExamplesGalleryProps} props The gallery content.
 * @returns {JSX.Element} The gallery section.
 */
export default function ExamplesGallery({ content }: ExamplesGalleryProps) {
  return (
    <section className="band band-soft eg" id="examples" data-section="examples">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.support} />

        <ul className="eg-grid">
          {content.items.map((item) => (
            <li className="eg-card" key={item.label}>
              <div className="eg-visual">{item.visual}</div>
              <div className="eg-caption">
                <span className="eg-label">{item.label}</span>
                <span className="eg-analogy">{item.analogy}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="eg-where">
          <span className="eg-where-label">{content.whereItFits.label}</span>
          <div className="eg-where-links">
            {content.whereItFits.links.map((link) => (
              <a
                key={link.href}
                className="eg-where-link"
                href={link.href}
                target={link.newTab ? "_blank" : undefined}
                rel={link.newTab ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <CtaBanner banner={content.ctaBanner} />
      </div>
    </section>
  );
}
