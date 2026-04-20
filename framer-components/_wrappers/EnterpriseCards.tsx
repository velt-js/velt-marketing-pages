"use client";
// @ts-expect-error generated unframer JSX, no types
import Raw from "../2025/enterprise-cards";

type Props = {
  dfaVMmU1v?: boolean;
  fss1jGx2V?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function EnterpriseCards({
  dfaVMmU1v = false,
  fss1jGx2V = true,
  className,
  style,
}: Props) {
  return (
    <Raw.Responsive
      dfaVMmU1v={dfaVMmU1v}
      fss1jGx2V={fss1jGx2V}
      className={className}
      style={{ width: "100%", ...style }}
    />
  );
}
