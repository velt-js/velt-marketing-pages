"use client";
// @ts-expect-error generated unframer JSX, no types
import Raw from "../logo-grid";

type Props = {
  headlineLine1?: string;
  headlineLine2?: string;
  blueVariant?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function LogoGrid({
  headlineLine1 = "Used by modern SaaS teams ",
  headlineLine2 = "building collaborative editors",
  blueVariant = false,
  className,
  style,
}: Props) {
  return (
    <Raw.Responsive
      KSKiPeMPv={headlineLine1}
      OHwHRi409={headlineLine2}
      bichhTuKh={blueVariant}
      className={className}
      style={{ width: "100%", ...style }}
    />
  );
}
