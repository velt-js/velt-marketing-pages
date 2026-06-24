type SectionHeadProps = {
  /** Mono all-caps eyebrow label, rendered with the orange dot motif. */
  eyebrow: string;
  heading: string;
  subheading?: string;
  /** Center the header block (default left-aligned per DESIGN.md §11). */
  center?: boolean;
};

/**
 * Standard section header: orange-dot mono eyebrow + heading + optional
 * supporting copy, following the DESIGN.md eyebrow motif (§6) and typography
 * scale (§1).
 * @param {SectionHeadProps} props Header content.
 * @returns {JSX.Element} The section header.
 */
export default function SectionHead({
  eyebrow,
  heading,
  subheading,
  center = false,
}: SectionHeadProps) {
  return (
    <div className={center ? "lp-head lp-head--center" : "lp-head"}>
      <div className="lp-eyebrow">
        <span className="lp-eyebrow-dot" />
        {eyebrow}
      </div>
      <h2>{heading}</h2>
      {subheading ? <p className="lp-head-sub">{subheading}</p> : null}
    </div>
  );
}
