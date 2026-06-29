import LogoCarousel from "@/components/home-new/LogoCarousel";
import { LOGOS } from "@/components/home-new/TrustStrip";

type LogoStripBandProps = {
  /** Mono all-caps label shown above the marquee. */
  label?: string;
  /** Render on the cream alt surface instead of white. */
  alt?: boolean;
};

/**
 * Trusted-by logo marquee band reusing the shared homepage LogoCarousel and
 * logo set, restyled for the .vlp landing pages. Replaces the legacy
 * FeatureCustomerCarousel / TrustedLogos sections.
 * @param {LogoStripBandProps} props Band content.
 * @returns {JSX.Element} The logo strip section.
 */
export default function LogoStripBand({
  label = "Trusted by teams shipping collaboration in production",
  alt = false,
}: LogoStripBandProps) {
  return (
    <section className={alt ? "lp-section lp-section--alt" : "lp-section"}>
      <div className="lp-wrap">
        <div className="lp-logos">
          {label ? <p className="lp-logos-label">{label}</p> : null}
          <LogoCarousel logos={LOGOS} monochrome className="lp-logos-marquee" />
        </div>
      </div>
    </section>
  );
}
