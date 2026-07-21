import "./TrustStrip.css";
import LogoCarousel, { type LogoCarouselItem } from "./LogoCarousel";

// Logos exported from the Figma "logos" frame (file HqWIZdR6ISJmaG2n4o3gr8,
// node 866:2844). Each asset is a 2× export of a Figma cell that is a uniform
// 72px tall with a consistent 24px horizontal pad; the cell width hugs the
// mark, so the designer has already balanced every logo's optical size. We
// render them all at the same height, so `ratio` (width / height, measured from
// the exported PNG) is what gives each its correct width.
const LOGO_DIR = "/images/logos/grid";

export const LOGOS: LogoCarouselItem[] = [
  { src: `${LOGO_DIR}/google.png`, alt: "Google", ratio: 1.944 },
  { src: `${LOGO_DIR}/openenvoy.png`, alt: "OpenEnvoy", ratio: 2.556 },
  { src: `${LOGO_DIR}/varonis.png`, alt: "Varonis", ratio: 2.472 },
  { src: `${LOGO_DIR}/pendo.png`, alt: "Pendo", ratio: 1.993 },
  { src: `${LOGO_DIR}/bigtincan.png`, alt: "Bigtincan", ratio: 2.076 },
  { src: `${LOGO_DIR}/heygen.png`, alt: "HeyGen", ratio: 1.944 },
  { src: `${LOGO_DIR}/flyr.png`, alt: "FLYR", ratio: 2.056 },
  { src: `${LOGO_DIR}/runway.png`, alt: "Runway", ratio: 1.729 },
  { src: `${LOGO_DIR}/lambdatest.png`, alt: "LambdaTest", ratio: 2.347 },
  { src: `${LOGO_DIR}/datarails.png`, alt: "Datarails", ratio: 1.847 },
  { src: `${LOGO_DIR}/firehydrant.png`, alt: "FireHydrant", ratio: 2.417 },
  { src: `${LOGO_DIR}/leadpages.png`, alt: "Leadpages", ratio: 2.639 },
  { src: `${LOGO_DIR}/vellum.png`, alt: "Vellum", ratio: 1.917 },
  { src: `${LOGO_DIR}/safetykit.png`, alt: "SafetyKit", ratio: 2.222 },
  { src: `${LOGO_DIR}/qloo.png`, alt: "Qloo", ratio: 1.472 },
  { src: `${LOGO_DIR}/lacoustics.png`, alt: "L-Acoustics", ratio: 2.458 },
  { src: `${LOGO_DIR}/cloudfactory.png`, alt: "CloudFactory", ratio: 2.361 },
  { src: `${LOGO_DIR}/trumpet.png`, alt: "Trumpet", ratio: 2.306 },
  { src: `${LOGO_DIR}/cofactr.png`, alt: "Cofactr", ratio: 2.306 },
  { src: `${LOGO_DIR}/butter.png`, alt: "Butter", ratio: 2.243 },
  { src: `${LOGO_DIR}/colossyan.png`, alt: "Colossyan", ratio: 2.306 },
  { src: `${LOGO_DIR}/classwallet.png`, alt: "ClassWallet", ratio: 2.694 },
  // Logos from the refreshed Figma "logos" frame (node 965:3418).
  { src: `${LOGO_DIR}/freshworks.png`, alt: "Freshworks", ratio: 2.924 },
  { src: `${LOGO_DIR}/coast.png`, alt: "Coast", ratio: 2.354 },
  { src: `${LOGO_DIR}/reptrak.png`, alt: "RepTrak", ratio: 2.797 },
  { src: `${LOGO_DIR}/hcltech.png`, alt: "HCLTech", ratio: 2.368 },
  { src: `${LOGO_DIR}/privado.png`, alt: "Privado AI", ratio: 2.438 },
  { src: `${LOGO_DIR}/reejig.png`, alt: "Reejig", ratio: 1.806 },
  { src: `${LOGO_DIR}/dock.png`, alt: "Dock", ratio: 1.993 },
];

// The homepage shows two marquees (TrustStrip near the top, Proof near the
// bottom). Splitting the set across them — even indices here, odd indices in
// PROOF_LOGOS — means no brand appears twice on the same page, while both
// strips still get a varied, full-width mix.
export const TRUST_LOGOS: LogoCarouselItem[] = LOGOS.filter((_, index) => index % 2 === 0);
export const PROOF_LOGOS: LogoCarouselItem[] = LOGOS.filter((_, index) => index % 2 === 1);

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

        <LogoCarousel logos={TRUST_LOGOS} monochrome className="trust-logos" />
    </section>
  );
}
