"use client";

// Thin typed wrapper for the "Steal Features from Popular Products"
// scrolling ticker. Uses the Unframer-exported component which has the
// framer-motion marquee animation baked in (speed + direction from the
// Framer source). No hand-rolled animation needed — matches the live
// homepage exactly when hydrated.

import Raw from "../examples-ticker";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function StealFeaturesTicker({ className, style }: Props) {
  return (
    <Raw.Responsive
      className={className}
      style={{ width: "100%", ...style }}
    />
  );
}
