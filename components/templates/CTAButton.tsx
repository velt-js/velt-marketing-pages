// Hand-written React template — extracted from the live Framer design
// (framer-components/2025/button.jsx + /tmp/homepage.xml). No @ts-nocheck,
// no opaque IDs; readable, typed, reusable across pages.

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Variant = "primary" | "secondary";

export type CTAButtonProps = {
  label: string;
  href: string;
  variant?: Variant;
  /** Right-side trailing icon (e.g. arrow). Defaults to none. */
  trailingIcon?: ReactNode;
  /** Open in new tab. */
  newTab?: boolean;
  className?: string;
  style?: CSSProperties;
};

// Tokens sourced from the Framer design:
// - primary bg: rgb(38, 34, 145) (indigo), white text
// - secondary: transparent bg, 1.5px border rgb(38,34,145), white text on dark sections
// - padding: 12px 16px, radius 6px, Urbanist 600 16px
const BRAND = "rgb(38, 34, 145)";
const WHITE = "rgb(255, 255, 255)";

export function CTAButton({
  label,
  href,
  variant = "primary",
  trailingIcon,
  newTab = false,
  className,
  style,
}: CTAButtonProps) {
  const isPrimary = variant === "primary";
  const common: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "12px 16px",
    borderRadius: 6,
    fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: "120%",
    letterSpacing: "-0.03em",
    color: WHITE,
    textDecoration: "none",
    background: isPrimary ? BRAND : "transparent",
    border: `1.5px solid ${BRAND}`,
    cursor: "pointer",
    transition: "background-color 120ms ease, opacity 120ms ease",
    ...style,
  };

  const externalProps = newTab ? { target: "_blank", rel: "noopener" } : {};

  // Use Next.js Link for internal routes; plain <a> for external/new-tab.
  const isExternal = /^(https?:)?\/\//.test(href);
  if (isExternal || newTab) {
    return (
      <a href={href} className={className} style={common} {...externalProps}>
        {label}
        {trailingIcon}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={common}>
      {label}
      {trailingIcon}
    </Link>
  );
}
