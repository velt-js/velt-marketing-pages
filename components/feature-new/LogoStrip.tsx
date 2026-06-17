import LogoCarousel from "@/components/home-new/LogoCarousel";
import { LOGOS } from "@/components/home-new/TrustStrip";
import type { LogoStripContent } from "./content";

import "./LogoStrip.css";

type LogoStripProps = {
  content: LogoStripContent;
};

/**
 * Logo strip with a trusted-by label, the shared homepage logo marquee, and a
 * migration sub-strip (Compare / Migration guide).
 * @param {LogoStripProps} props Logo strip content.
 * @returns {JSX.Element} The logo strip section.
 */
export default function LogoStrip({ content }: LogoStripProps) {
  return (
    <section className="logos" id="logo-strip" data-section="logo-strip">
      <div className="wrap">
        <p className="logos-label">{content.label}</p>
        <LogoCarousel logos={LOGOS} card className="logos-marquee" />
        <div className="mig-strip">
          <span>{content.migration.label}</span>
          {content.migration.links.map((link, index) => (
            <span key={link.href} style={{ display: "contents" }}>
              {index > 0 ? <span className="sep">·</span> : null}
              <a href={link.href}>{link.label}</a>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
