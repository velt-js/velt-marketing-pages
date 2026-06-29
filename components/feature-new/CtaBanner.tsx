import type { CSSProperties } from "react";

import type { CtaBannerContent } from "./content";

import "./CtaBanner.css";

type CtaBannerProps = {
  banner: CtaBannerContent;
  style?: CSSProperties;
};

/**
 * Inline CTA banner (headline + microcopy + single action) used between
 * feature-page sections.
 * @param {CtaBannerProps} props Banner content and optional style.
 * @returns {JSX.Element} The CTA banner.
 */
export default function CtaBanner({ banner, style }: CtaBannerProps) {
  const buttonClass = banner.variant === "secondary" ? "btn btn-secondary" : "btn btn-primary";
  return (
    <div className="cta-banner" style={style}>
      <div>
        <p className="t">{banner.title}</p>
        <p className="m">{banner.microcopy}</p>
      </div>
      <a className={buttonClass} href={banner.cta.href} target={banner.cta.newTab ? "_blank" : undefined} rel={banner.cta.newTab ? "noreferrer" : undefined}>
        {banner.cta.label}
      </a>
    </div>
  );
}
