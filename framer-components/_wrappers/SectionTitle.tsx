"use client";
// @ts-expect-error generated unframer JSX, no types
import Raw from "../2025/general/section-title";

type Props = {
  title: string;
  subtitle?: string;
  /** Primary CTA label (right button) */
  primaryLabel?: string;
  primaryHref?: string;
  /** Secondary CTA label (left button); set to "" to hide */
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Text color — "rgb(0, 0, 0)" on light sections, "rgb(255, 255, 255)" on dark */
  textColor?: string;
  /** Show the "No Custom Logic Required" sublabel */
  showSublabel?: boolean;
  sublabel?: string;
  /** Force hide the secondary CTA entirely */
  hideSecondary?: boolean;
  /** Show primary CTA */
  showPrimary?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function SectionTitle({
  title,
  subtitle = "",
  primaryLabel = "Book Demo",
  primaryHref = "/book-demo",
  secondaryLabel = "View Docs",
  secondaryHref = "https://docs.velt.dev/",
  textColor = "rgb(0, 0, 0)",
  showSublabel = false,
  sublabel = "No Custom Logic Required",
  hideSecondary = false,
  showPrimary = true,
  className,
  style,
}: Props) {
  return (
    <Raw.Responsive
      variant="Wq7D2rYH_"
      CXbn7aqnI={title}
      p7PozJbBs={subtitle}
      LKxFYZaG4={textColor}
      CJTaPUbRm={primaryLabel}
      gUXv1ekzb={primaryHref}
      bxNjVdFOo={hideSecondary ? "" : secondaryLabel}
      GAnWJFnua={secondaryHref}
      NMVu0Lc6U={!hideSecondary}
      WVYAKu6in={showSublabel}
      fOCGygIf8={sublabel}
      zoJ4N26Ce={showPrimary}
      QpDXkrckv={!hideSecondary}
      IwIb9r037={false}
      className={className}
      style={{ width: "100%", ...style }}
    />
  );
}
