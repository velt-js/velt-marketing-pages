import type { ReactNode } from "react";

import type { CtaLink } from "./content";

type SectionSplitHeaderProps = {
  kicker: string;
  heading: string;
  support?: ReactNode;
  docLinks?: CtaLink[];
};

/**
 * Split section header: eyebrow + heading on the left, support copy (and
 * optional doc links) on the right. Used across most feature-page sections.
 * @param {SectionSplitHeaderProps} props Header content.
 * @returns {JSX.Element} The split header.
 */
export default function SectionSplitHeader({ kicker, heading, support, docLinks }: SectionSplitHeaderProps) {
  return (
    <div className="sec-split">
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{heading}</h2>
      </div>
      <div className="sec-split-right">
        {support ? <p>{support}</p> : null}
        {docLinks && docLinks.length > 0 ? (
          <div className="doc-links">
            {docLinks.map((link) => (
              <a key={link.href} href={link.href} target={link.newTab ? "_blank" : undefined} rel={link.newTab ? "noreferrer" : undefined}>
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
