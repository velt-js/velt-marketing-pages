// Hand-written React template — extracted from the live Framer design
// (framer-components/2025/button.jsx + /tmp/homepage.xml). No @ts-nocheck,
// no opaque IDs; readable, typed, reusable across pages.
//
// Tokens follow DESIGN.md §10:
// - primary: bg var(--color-velt-purple) (#625DF5), white text, radius 8px
// - secondary: transparent, 1px border, text+border color follows theme
//   (white on dark sections, black on light sections)
// - sizes: md = ~48px height (hero CTAs), sm = ~36px height (nav/cards)

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";
type Theme = "dark" | "light";

export type CTAButtonProps = {
  label: string;
  href: string;
  variant?: Variant;
  size?: Size;
  /** Surface the button sits on. Drives secondary border + text color. */
  theme?: Theme;
  /** Right-side trailing icon (e.g. arrow). Defaults to none. */
  trailingIcon?: ReactNode;
  /** Open in new tab. */
  newTab?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function CTAButton({
  label,
  href,
  variant = "primary",
  size = "md",
  theme = "dark",
  trailingIcon,
  newTab = false,
  className,
  style,
}: CTAButtonProps) {
  const isPrimary = variant === "primary";
  const onLight = theme === "light";

  // Sizing — md hits ~48px (hero), sm hits ~36px (nav/cards).
  const height = size === "md" ? 48 : 36;
  const paddingX = size === "md" ? 20 : 14;
  const fontSize = size === "md" ? 16 : 14;

  // Secondary surface color — DESIGN.md §10.
  const surfaceColor = onLight ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";

  const common: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height,
    padding: `0 ${paddingX}px`,
    borderRadius: "var(--radius-button)",
    fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
    fontWeight: 600,
    fontSize,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    color: isPrimary ? "rgb(255, 255, 255)" : surfaceColor,
    textDecoration: "none",
    background: isPrimary ? "var(--color-velt-purple)" : "transparent",
    border: isPrimary ? "1px solid transparent" : `1px solid ${surfaceColor}`,
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
