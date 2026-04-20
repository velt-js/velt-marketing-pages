"use client";
// @ts-expect-error generated unframer JSX, no types
import Raw from "../2025/get-started-steps";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function GetStartedSteps({ className, style }: Props) {
  return (
    <Raw.Responsive className={className} style={{ width: "100%", ...style }} />
  );
}
