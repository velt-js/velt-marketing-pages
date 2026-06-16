import "./TrustStrip.css";
import LogoCarousel, { type LogoCarouselItem } from "./LogoCarousel";

// `w` is the display width (px) at 22px tall, matching each SVG's viewBox
// ratio. These brand SVGs use preserveAspectRatio="none", so they stretch
// to fill their box — pinning the width keeps the box at the right ratio.
// PNGs (no `w`) size from their natural aspect via CSS width: auto.
const LOGOS: LogoCarouselItem[] = [
  { src: "/images/logos/openenvoy.svg", alt: "OpenEnvoy", w: 93 },
  { src: "/images/logos/bigtincan.svg", alt: "Bigtincan", w: 75 },
  { src: "/images/logos/trumpet.svg", alt: "Trumpet", w: 106 },
  { src: "/images/logos/datarails.svg", alt: "Datarails", w: 98 },
  { src: "/images/logos/cofactr.png", alt: "Cofactr" },
  { src: "/images/logos/runway.svg", alt: "Runway", w: 110 },
  { src: "/images/logos/heygen.svg", alt: "HeyGen", w: 79 },
  { src: "/images/logos/cloudfactory.svg", alt: "CloudFactory", w: 136 },
  { src: "/images/logos/leadpages.png", alt: "Leadpages" },
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
        <div className="trust-sub">// 2M+ review decisions across 33 products</div>
      </div>

      <div className="trust-featured">
        {FEATURED.map((logo) => (
          <div className="trust-card" key={logo.alt}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="trust-card-logo"
              src={logo.src}
              alt={logo.alt}
              style={{
                height: `${FEATURED_LOGO_HEIGHT}px`,
                ...(logo.w ? { width: `${(logo.w * FEATURED_LOGO_HEIGHT) / RATIO_BASE_HEIGHT}px` } : {}),
              }}
            />
          </div>
        ))}
      </div>

      <LogoCarousel logos={LOGOS} gap={16} card fullBleed />
    </section>
  );
}
