// Inline SVG icons used across the feature-page sections. Each returns a
// presentational <svg>; size/stroke match the reference markup.

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
