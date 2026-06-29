import type { CSSProperties } from "react";
import "./LogoCarousel.css";

/** A single brand logo. `ratio` is the logo's intrinsic aspect ratio
 *  (width / height) — used to contain every logo inside one uniform box so
 *  optical sizes stay balanced regardless of how wide a wordmark is. These
 *  brand SVGs use preserveAspectRatio="none", so we size the <img> box to the
 *  ratio rather than relying on object-fit. */
export interface LogoCarouselItem {
  src: string;
  alt: string;
  ratio: number;
}

interface LogoCarouselProps {
  logos: LogoCarouselItem[];
  /** Horizontal space between logos in px (also the seam spacing). */
  gap?: number;
  /** Duration of one full loop in seconds (lower = faster). */
  durationSeconds?: number;
  /** Target logo height in px (the box height each logo is contained into). */
  logoHeight?: number;
  /** Max logo width in px — caps ultra-wide wordmarks so they don't dominate. */
  maxLogoWidth?: number;
  /** Render logos as muted gray silhouettes (for light backgrounds). */
  monochrome?: boolean;
  /** Break the marquee out to full viewport width (parent must be centered). */
  fullBleed?: boolean;
  /** Wrap each logo in a bordered, rounded card chip. */
  card?: boolean;
  /** Extra class on the root for one-off overrides. */
  className?: string;
}

const DEFAULT_GAP = 16;
const DEFAULT_DURATION = 45;
// Logos ship as uniform pre-padded cells, so the box height can be generous —
// the designer's internal padding keeps the actual marks at a consistent size.
const DEFAULT_LOGO_HEIGHT = 60;
const DEFAULT_MAX_LOGO_WIDTH = 240;

/**
 * Contain a logo inside a uniform box, preserving its aspect ratio. The logo
 * fills the box height unless that would exceed the max width, in which case it
 * is clamped to the max width and its height shrinks to keep the ratio. This
 * keeps every brand at a balanced optical size.
 * @param ratio - the logo's intrinsic width / height
 * @param boxHeight - the target box height in px
 * @param maxWidth - the maximum allowed width in px
 * @returns the rounded display width and height in px
 */
function fitLogo(ratio: number, boxHeight: number, maxWidth: number): { width: number; height: number } {
  try {
    const safeRatio = ratio > 0 ? ratio : 4;
    let height = boxHeight;
    let width = height * safeRatio;
    if (width > maxWidth) {
      width = maxWidth;
      height = maxWidth / safeRatio;
    }
    return { width: Math.round(width), height: Math.round(height) };
  } catch (error) {
    console.error("fitLogo failed", error);
    return { width: maxWidth, height: boxHeight };
  }
}

/**
 * Render one set of logos. Two identical sets sit back-to-back in the track so
 * a translateX(-50%) loop is seamless; the duplicate is hidden from a11y.
 * @param logos - the logos to render
 * @param hidden - when true, the set is decorative (aria-hidden, empty alts)
 * @param card - when true, wrap each logo in a bordered card chip
 * @returns the set element, or null when no logos were provided
 */
function LogoSet({
  logos,
  hidden = false,
  card = false,
  boxHeight,
  maxWidth,
}: {
  logos: LogoCarouselItem[];
  hidden?: boolean;
  card?: boolean;
  boxHeight: number;
  maxWidth: number;
}) {
  try {
    if (!logos?.length) {
      return null;
    }
    return (
      <div className={hidden ? "lc-set lc-set--dup" : "lc-set"} aria-hidden={hidden || undefined}>
        {logos.map((logo) => {
          const { width, height } = fitLogo(logo.ratio, boxHeight, maxWidth);
          // eslint-disable-next-line @next/next/no-img-element
          const image = (
            <img
              className="lc-logo"
              src={logo.src}
              alt={hidden ? "" : logo.alt}
              style={{ width: `${width}px`, height: `${height}px` }}
            />
          );
          if (card) {
            return <span key={logo.alt} className="lc-card">{image}</span>;
          }
          return <span key={logo.alt} className="lc-slot">{image}</span>;
        })}
      </div>
    );
  } catch (error) {
    console.error("LogoSet render failed", error);
    return null;
  }
}

/**
 * Compose the root className and CSS-variable style object from the props.
 * @returns the viewport root's className and inline style
 */
function buildRootProps(
  durationSeconds: number,
  monochrome: boolean,
  fullBleed: boolean,
  className?: string,
): { rootClass: string; styleVars: CSSProperties } {
  try {
    const rootClass = ["lc-viewport", fullBleed ? "lc-viewport--bleed" : "", monochrome ? "lc-viewport--mono" : "", className ?? ""]
      .filter(Boolean)
      .join(" ");
    const styleVars = {
      "--lc-duration": `${durationSeconds}s`,
    } as CSSProperties;
    return { rootClass, styleVars };
  } catch (error) {
    console.error("buildRootProps failed", error);
    return { rootClass: "lc-viewport", styleVars: {} };
  }
}

/**
 * Reusable infinite logo marquee. Scrolls a row of brand logos, loops
 * seamlessly by duplicating the set, pauses on hover, and respects
 * prefers-reduced-motion. All visual tuning is configurable via props.
 * @param props - carousel configuration
 * @returns the marquee viewport
 */
export default function LogoCarousel({
  logos,
  gap = DEFAULT_GAP,
  durationSeconds = DEFAULT_DURATION,
  logoHeight = DEFAULT_LOGO_HEIGHT,
  maxLogoWidth = DEFAULT_MAX_LOGO_WIDTH,
  monochrome = true,
  fullBleed = false,
  card = false,
  className,
}: LogoCarouselProps) {
  const { rootClass, styleVars } = buildRootProps(durationSeconds, monochrome, fullBleed, className);
  const trackStyle = { ...styleVars, "--lc-gap": `${gap}px`, "--lc-slot-height": `${logoHeight}px` } as CSSProperties;

  return (
    <div className={rootClass} style={trackStyle}>
      <div className="lc-track">
        <LogoSet logos={logos} card={card} boxHeight={logoHeight} maxWidth={maxLogoWidth} />
        <LogoSet logos={logos} card={card} boxHeight={logoHeight} maxWidth={maxLogoWidth} hidden />
      </div>
    </div>
  );
}
