import type { CSSProperties } from "react";
import "./LogoCarousel.css";

/** A single brand logo. `w` pins the display width (px) for SVGs that use
 *  preserveAspectRatio="none"; omit it for natural-ratio images (e.g. PNGs). */
export interface LogoCarouselItem {
  src: string;
  alt: string;
  w?: number;
}

interface LogoCarouselProps {
  logos: LogoCarouselItem[];
  /** Horizontal space between logos in px (also the seam spacing). */
  gap?: number;
  /** Duration of one full loop in seconds (lower = faster). */
  durationSeconds?: number;
  /** Logo render height in px. */
  logoHeight?: number;
  /** Render logos as muted gray silhouettes (for light backgrounds). */
  monochrome?: boolean;
  /** Break the marquee out to full viewport width (parent must be centered). */
  fullBleed?: boolean;
  /** Wrap each logo in a bordered, rounded card chip. */
  card?: boolean;
  /** Extra class on the root for one-off overrides. */
  className?: string;
}

const DEFAULT_GAP = 96;
const DEFAULT_DURATION = 45;
const DEFAULT_LOGO_HEIGHT = 22;

/**
 * Render one set of logos. Two identical sets sit back-to-back in the track so
 * a translateX(-50%) loop is seamless; the duplicate is hidden from a11y.
 * @param logos - the logos to render
 * @param hidden - when true, the set is decorative (aria-hidden, empty alts)
 * @param card - when true, wrap each logo in a bordered card chip
 * @returns the set element, or null when no logos were provided
 */
function LogoSet({ logos, hidden = false, card = false }: { logos: LogoCarouselItem[]; hidden?: boolean; card?: boolean }) {
  try {
    if (!logos?.length) {
      return null;
    }
    return (
      <div className={hidden ? "lc-set lc-set--dup" : "lc-set"} aria-hidden={hidden || undefined}>
        {logos.map((logo) => {
          // eslint-disable-next-line @next/next/no-img-element
          const image = (
            <img
              className="lc-logo"
              src={logo.src}
              alt={hidden ? "" : logo.alt}
              style={logo.w ? { width: `${logo.w}px` } : undefined}
            />
          );
          if (card) {
            return <span key={logo.alt} className="lc-card">{image}</span>;
          }
          // eslint-disable-next-line @next/next/no-img-element
          return (
            <img
              key={logo.alt}
              className="lc-logo"
              src={logo.src}
              alt={hidden ? "" : logo.alt}
              style={logo.w ? { width: `${logo.w}px` } : undefined}
            />
          );
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
  gap: number,
  durationSeconds: number,
  logoHeight: number,
  monochrome: boolean,
  fullBleed: boolean,
  className?: string,
): { rootClass: string; styleVars: CSSProperties } {
  try {
    const rootClass = ["lc-viewport", fullBleed ? "lc-viewport--bleed" : "", monochrome ? "lc-viewport--mono" : "", className ?? ""]
      .filter(Boolean)
      .join(" ");
    const styleVars = {
      "--lc-gap": `${gap}px`,
      "--lc-duration": `${durationSeconds}s`,
      "--lc-logo-height": `${logoHeight}px`,
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
  monochrome = true,
  fullBleed = false,
  card = false,
  className,
}: LogoCarouselProps) {
  const { rootClass, styleVars } = buildRootProps(gap, durationSeconds, logoHeight, monochrome, fullBleed, className);

  return (
    <div className={rootClass} style={styleVars}>
      <div className="lc-track">
        <LogoSet logos={logos} card={card} />
        <LogoSet logos={logos} card={card} hidden />
      </div>
    </div>
  );
}
