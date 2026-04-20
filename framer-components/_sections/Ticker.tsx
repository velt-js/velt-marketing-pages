"use client";

// Placeholder for Framer's built-in <Ticker> primitive. The XML surfaces two
// Tickers on the homepage:
//   1. Inside "Steal Features from Popular Products" (speed=100, height=476px) —
//      horizontal scrolling feature cards.
//   2. Inside "Our Customers Trust Us" (speed=50, height=531px) —
//      horizontal scrolling testimonial cards.
// Framer renders the actual scrolling content via its runtime; we render an
// empty block of the right height so surrounding layout stays correct until
// real content is wired in via unframer output (examples-ticker.jsx,
// testimonial-ticker.jsx) or a motion-based rewrite.

type Props = {
  speed?: number | string;
  direction?: "left" | "right" | "up" | "down";
  alignment?: "start" | "center" | "end";
  gap?: number | string;
  hoverFactor?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  className?: string;
};

export function Ticker({ height = 476, style, className }: Props) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(0,0,0,0.32)",
        fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
        fontSize: 14,
        ...style,
      }}
    >
      {/* Visual placeholder — actual scrolling content TBD */}
    </div>
  );
}
