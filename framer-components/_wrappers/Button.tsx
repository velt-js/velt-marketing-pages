"use client";
// @ts-expect-error generated unframer JSX, no types
import Raw from "../2025/button";

type Variant = "primary" | "secondary";

type Props = {
  label: string;
  href: string;
  variant?: Variant;
  /** when true, adds a right-side icon (e.g. arrow) — maps to Framer's sgfg8QxyX */
  withIcon?: boolean;
  newTab?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

// Framer variant IDs (from homepage XML):
// - "RACk7NElR" → secondary/outlined (used for Book Demo)
// - "I7383:18500;5290:13367" → primary/filled (used for Get Free API Key)
const VARIANT_ID: Record<Variant, string> = {
  secondary: "RACk7NElR",
  primary: "I7383:18500;5290:13367",
};

export function Button({
  label,
  href,
  variant = "primary",
  withIcon = false,
  newTab,
  className,
  style,
}: Props) {
  return (
    <Raw.Responsive
      variant={VARIANT_ID[variant]}
      Gk_gcBMzs="12px 16px 12px 16px"
      xIH603gfk={label}
      deZhU2bpz={href}
      sgfg8QxyX={withIcon}
      cHNY9J5mg="rgb(63, 17, 160)"
      K3p0DSuek="rgb(255, 255, 255)"
      Znbjz0gck="rgb(76, 71, 204)"
      J6ln5Jfqb="rgb(255, 255, 255)"
      aZRH5ywKc="rgb(255, 255, 255)"
      G0DOYlrWe={false}
      jUEEY5ctg={16}
      className={className}
      style={{ width: "100%", ...style }}
      {...(newTab ? { target: "_blank", rel: "noopener" } : {})}
    />
  );
}
