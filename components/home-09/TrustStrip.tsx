import "./TrustStrip.css";

// `w` is the display width (px) at 22px tall, matching each SVG's viewBox
// ratio. These brand SVGs use preserveAspectRatio="none", so they stretch
// to fill their box — pinning the width keeps the box at the right ratio.
// PNGs (no `w`) size from their natural aspect via CSS width: auto.
const LOGOS: { src: string; alt: string; w?: number }[] = [
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

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="trust-set" aria-hidden={hidden || undefined}>
      {LOGOS.map((logo) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={logo.alt}
          className="trust-logo"
          src={logo.src}
          alt={hidden ? "" : logo.alt}
          style={logo.w ? { width: `${logo.w}px` } : undefined}
        />
      ))}
    </div>
  );
}

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
      <div className="trust-marquee">
        <div className="trust-track">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  );
}
