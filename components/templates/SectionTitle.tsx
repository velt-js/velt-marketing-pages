// Hand-written React template — extracted from the live Framer design
// (DOM fingerprint captured from /preview's rendered SectionTitle). Each
// instance is ~10 lines of typed JSX with zero runtime Framer dependency.

import type { CSSProperties } from "react";
import { CTAButton } from "./CTAButton";

export type SectionTitleProps = {
  title: string;
  subtitle?: string;
  primary?: { label: string; href: string; newTab?: boolean };
  secondary?: { label: string; href: string; newTab?: boolean };
  /** "rgb(0,0,0)" on light bg, "rgb(255,255,255)" on dark bg. */
  textColor?: string;
  /** Small pill under the CTAs, e.g. "No Custom Logic Required". */
  sublabel?: string;
  align?: "center" | "start";
  className?: string;
  style?: CSSProperties;
};

export function SectionTitle({
  title,
  subtitle,
  primary,
  secondary,
  textColor = "rgb(0, 0, 0)",
  sublabel,
  align = "center",
  className,
  style,
}: SectionTitleProps) {
  const alignItems = align === "center" ? "center" : "flex-start";
  const textAlign = align === "center" ? "center" : "left";
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems,
        gap: 24,
        width: "100%",
        maxWidth: 820,
        margin: "0 auto",
        color: textColor,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          alignItems,
        }}
      >
        <h2
          style={{
            fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
            fontWeight: 700,
            fontSize: 52,
            letterSpacing: "-0.03em",
            lineHeight: "120%",
            textAlign,
            margin: 0,
            color: textColor,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
              fontWeight: 400,
              fontSize: 20,
              lineHeight: "140%",
              textAlign,
              margin: 0,
              color: textColor,
              opacity: 0.72,
              maxWidth: 820,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {(primary || secondary) && (
        <div style={{ display: "flex", flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
          {secondary && (
            <CTAButton
              label={secondary.label}
              href={secondary.href}
              variant="secondary"
              newTab={secondary.newTab}
            />
          )}
          {primary && (
            <CTAButton
              label={primary.label}
              href={primary.href}
              variant="primary"
              newTab={primary.newTab}
            />
          )}
        </div>
      )}

      {sublabel && (
        <p
          style={{
            fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "140%",
            margin: 0,
            color: textColor,
            opacity: 0.5,
          }}
        >
          {sublabel}
        </p>
      )}
    </div>
  );
}
