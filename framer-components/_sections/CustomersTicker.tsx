"use client";

// Thin typed wrapper for the "Our Customers Trust Us" scrolling
// testimonial ticker. Uses the Unframer-exported component which has the
// framer-motion marquee animation baked in.

import Raw from "../testimonial-ticker";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function CustomersTicker({ className, style }: Props) {
  return (
    <Raw.Responsive
      className={className}
      style={{ width: "100%", ...style }}
    />
  );
}
