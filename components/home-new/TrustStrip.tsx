import "./TrustStrip.css";
import LogoCarousel, { type LogoCarouselItem } from "./LogoCarousel";

// `w` is the display width (px) at 22px tall, matching each SVG's viewBox
// ratio. These brand SVGs use preserveAspectRatio="none", so they stretch
// to fill their box — pinning the width keeps the box at the right ratio.
// PNGs (no `w`) size from their natural aspect via CSS width: auto.
// Full trusted-by set, ported from the legacy TrustedLogos grid
// (components/home/TrustedLogos.tsx `defaultTiles`). `w` is the display
// width (px) at 22px tall, matching each SVG's viewBox ratio — required
// because these brand SVGs use preserveAspectRatio="none" and would
// otherwise stretch to fill their box. PNGs omit `w` and size from their
// natural aspect via CSS width: auto.
export const LOGOS: LogoCarouselItem[] = [
  { src: "/images/logos/google.svg", alt: "Google", w: 75 },
  { src: "/images/logos/openenvoy.svg", alt: "OpenEnvoy", w: 93 },
  { src: "/images/logos/varonis.svg", alt: "Varonis", w: 131 },
  { src: "/images/logos/pendo.svg", alt: "Pendo", w: 95 },
  { src: "/images/logos/bigtincan.svg", alt: "Bigtincan", w: 75 },
  { src: "/images/logos/heygen.svg", alt: "HeyGen", w: 79 },
  { src: "/images/logos/flyr.svg", alt: "FLYR", w: 125 },
  { src: "/images/logos/runway.svg", alt: "Runway", w: 110 },
  { src: "/images/logos/lambdatest.svg", alt: "LambdaTest", w: 93 },
  { src: "/images/logos/datarails.svg", alt: "Datarails", w: 98 },
  { src: "/images/logos/firehydrant.svg", alt: "FireHydrant", w: 82 },
  { src: "/images/logos/leadpages.png", alt: "Leadpages" },
  { src: "/images/logos/vellum.svg", alt: "Vellum", w: 79 },
  { src: "/images/logos/safetykit.png", alt: "SafetyKit" },
  { src: "/images/logos/qloo.png", alt: "Qloo" },
  { src: "/images/logos/lacoustics.png", alt: "L-Acoustics" },
  { src: "/images/logos/cloudfactory.svg", alt: "CloudFactory", w: 136 },
  { src: "/images/logos/trumpet.svg", alt: "Trumpet", w: 106 },
  { src: "/images/logos/cofactr.png", alt: "Cofactr" },
  { src: "/images/logos/butter.svg", alt: "Butter", w: 60 },
  { src: "/images/logos/colossyan.svg", alt: "Colossyan", w: 108 },
  { src: "/images/logos/classwallet.png", alt: "ClassWallet" },
];

// The first four lead the section as larger static cards; the full set scrolls
// in the marquee below.
const FEATURED = LOGOS.slice(0, 4);

// The `w` widths are calibrated at this tall; scale both dimensions together so
// the preserveAspectRatio="none" SVGs don't distort at a different height.
const RATIO_BASE_HEIGHT = 22;
const FEATURED_LOGO_HEIGHT = 30;

export default function TrustStrip() {
  return (
    <section className="trust-section">
      <div className="trust-header">
        <div className="trust-stat-row">
          <span className="trust-dot"></span>
          <span><strong className="trust-highlight">500k+ reviews</strong> running in production at OpenEnvoy</span>
        </div>
        <div className="trust-sub">// 2M+ review decisions</div>
      </div>

        <LogoCarousel logos={LOGOS} card className="trust-logos" />
    </section>
  );
}
