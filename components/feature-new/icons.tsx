// Inline SVG icons used across the feature-page sections. Each returns a
// presentational <svg>; size/stroke match the reference markup.

import type { ReactNode } from "react";

/**
 * Chevron used by the FAQ accordion toggles.
 * @returns {JSX.Element} Chevron icon.
 */
export function ChevronIcon() {
  return (
    <svg className="chev" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6.5 L8 10.5 L12 6.5" />
    </svg>
  );
}

/**
 * Right-pointing arrow used on "Explore" primitive links.
 * @returns {JSX.Element} Arrow icon.
 */
export function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" />
    </svg>
  );
}

/**
 * Shield-check badge used in the enterprise readiness strip and footer.
 * @returns {JSX.Element} Shield icon.
 */
export function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 1 L10 2.6 V6 c0 2.6-1.8 4.3-4 5 -2.2-0.7-4-2.4-4-5 V2.6 Z" />
      <path d="M4.2 6 L5.5 7.3 L8 4.8" />
    </svg>
  );
}

/**
 * The Velt logomark wedge.
 * @param {{ size?: number; fill?: string }} props Optional size and fill.
 * @returns {JSX.Element} Logo SVG.
 */
export function VeltMark({ size = 22, fill = "var(--vlp-color-accent)" }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M2 3.5 L11 19.5 L20 3.5 H15.6 L11 12.2 L6.4 3.5 Z" fill={fill} />
    </svg>
  );
}

/**
 * Monochrome Tabler glyph wrapper, matched to the navbar's icon style (24x24
 * viewBox, currentColor stroke) so feature-page badges reuse the exact same
 * glyphs the product nav uses. Strokes inherit color from the surrounding
 * badge (e.g. the `.collab-ic` accent badge).
 * @param {{ size?: number; children: ReactNode }} props Glyph size and paths.
 * @returns {JSX.Element} The sized SVG wrapper.
 */
function NavGlyph({ size = 18, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/**
 * Tabler "list" glyph — the navbar's Audit trail icon (Products > Primitives).
 * @param {{ size?: number }} props Optional glyph size.
 * @returns {JSX.Element} List icon.
 */
export function ListIcon({ size }: { size?: number } = {}) {
  return (
    <NavGlyph size={size}>
      <path d="M13 5h8" />
      <path d="M13 9h5" />
      <path d="M13 15h8" />
      <path d="M13 19h5" />
      <path d="M3 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
      <path d="M3 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" />
    </NavGlyph>
  );
}

/**
 * Tabler "cloud" glyph — the navbar's Webhooks & API icon (Products > Platform).
 * @param {{ size?: number }} props Optional glyph size.
 * @returns {JSX.Element} Cloud icon.
 */
export function CloudIcon({ size }: { size?: number } = {}) {
  return (
    <NavGlyph size={size}>
      <path d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878" />
    </NavGlyph>
  );
}

/**
 * Tabler "server" glyph — the navbar's Self-hosting icon (Products > Platform).
 * @param {{ size?: number }} props Optional glyph size.
 * @returns {JSX.Element} Server icon.
 */
export function ServerIcon({ size }: { size?: number } = {}) {
  return (
    <NavGlyph size={size}>
      <path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3" />
      <path d="M3 15a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -2" />
      <path d="M7 8l0 .01" />
      <path d="M7 16l0 .01" />
    </NavGlyph>
  );
}

/**
 * Tabler "bell" glyph — the navbar's Notifications icon (Products > Primitives).
 * @param {{ size?: number }} props Optional glyph size.
 * @returns {JSX.Element} Bell icon.
 */
export function BellIcon({ size }: { size?: number } = {}) {
  return (
    <NavGlyph size={size}>
      <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </NavGlyph>
  );
}
