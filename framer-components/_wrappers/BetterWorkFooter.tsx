"use client";
// @ts-expect-error generated unframer JSX, no types
import Raw from "../2025/better-work-footer";

type Props = {
  backgroundColor?: string;
  blueVariant?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function BetterWorkFooter({
  backgroundColor = "rgba(255, 255, 255, 0)",
  blueVariant = false,
  className,
  style,
}: Props) {
  return (
    <Raw.Responsive
      BLFfhcK3U={backgroundColor}
      ex5LyBkh4={blueVariant}
      className={className}
      style={{ width: "100%", ...style }}
    />
  );
}
