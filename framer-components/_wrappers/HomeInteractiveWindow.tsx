"use client";
// @ts-expect-error generated unframer JSX, no types
import Raw from "../home-interactive-window";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function HomeInteractiveWindow({ className, style }: Props) {
  return (
    <Raw.Responsive className={className} style={{ width: "100%", ...style }} />
  );
}
