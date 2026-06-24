// Resolves the per-page Open Graph image for slug-keyed dynamic routes.
//
// OG images are pre-rendered into /public/og/<slug>.png by the scripts under
// scripts/og/. A Sanity-supplied value always wins; otherwise we point at the
// bundled /og/<slug>.png when one exists, and fall back to undefined so
// buildPageMetadata drops in the site-wide default (/opengraph-image.png).

import fs from "node:fs";
import path from "node:path";

const OG_DIR = path.join(process.cwd(), "public", "og");
const OG_EXTENSION_RE = /\.(png|jpe?g|webp)$/i;

// Snapshot of which slug-keyed OG images are bundled in /public/og/, built once
// at module load. The directory is static (changes require a deploy), so
// re-reading on every request would be wasted I/O.
const AVAILABLE_OG_SLUGS: ReadonlySet<string> = (() => {
  try {
    return new Set(
      fs
        .readdirSync(OG_DIR)
        .filter((name) => OG_EXTENSION_RE.test(name))
        .map((name) => name.replace(OG_EXTENSION_RE, "")),
    );
  } catch {
    return new Set<string>();
  }
})();

/**
 * Whether a bundled /public/og/<slug>.png (or jpg/webp) exists for a slug.
 * @param {string} slug The route slug.
 * @returns {boolean} True when a bundled OG image is available.
 */
export function hasBundledOgImage(slug: string): boolean {
  try {
    return AVAILABLE_OG_SLUGS.has(slug);
  } catch {
    return false;
  }
}

/**
 * Resolve the best OG image path for a slug. An explicit Sanity value wins;
 * otherwise the bundled /og/<slug>.png when present; otherwise undefined.
 * @param {string} slug The route slug.
 * @param {string | null | undefined} [sanityOgImage] OG image set in the CMS.
 * @returns {string | undefined} The OG image path, or undefined for the default.
 */
export function resolveOgImage(
  slug: string,
  sanityOgImage?: string | null,
): string | undefined {
  try {
    return (
      sanityOgImage ??
      (AVAILABLE_OG_SLUGS.has(slug) ? `/og/${slug}.png` : undefined)
    );
  } catch {
    return sanityOgImage ?? undefined;
  }
}
