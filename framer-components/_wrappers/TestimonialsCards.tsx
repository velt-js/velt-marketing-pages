"use client";
// @ts-expect-error generated unframer JSX, no types
import Raw from "../2025/testimonials-cards";

type Props = {
  foregroundColor?: string;
  backgroundColor?: string;
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function TestimonialsCards({
  foregroundColor = "rgb(255, 255, 255)",
  backgroundColor = "rgba(255, 255, 255, 0.04)",
  gap = 0,
  className,
  style,
}: Props) {
  return (
    <Raw.Responsive
      RAX24yANy={foregroundColor}
      ThVWmROxr={backgroundColor}
      yAiPhbYbu={gap}
      className={className}
      style={{ width: "100%", ...style }}
    />
  );
}
