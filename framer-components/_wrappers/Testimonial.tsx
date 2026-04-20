"use client";
// @ts-expect-error generated unframer JSX, no types
import Raw from "../2025/testimonial";

type Props = {
  name: string;
  title: string;
  quote: string;
  paddingV?: string;
  paddingH?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Testimonial({
  name,
  title,
  quote,
  paddingV = "24px",
  paddingH = "32px",
  className,
  style,
}: Props) {
  return (
    <Raw.Responsive
      i_teJhZkv={name}
      xIRwUNeNp={title}
      TYxU1hJzn={quote}
      tOog67OOf={paddingV}
      HqL9mij6w={paddingH}
      className={className}
      style={{ width: "100%", ...style }}
    />
  );
}
