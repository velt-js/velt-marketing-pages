// "Now Velt integrates with X, Y, Z" — dark section with a horizontal logo
// strip below a heading + optional eyebrow + subheading. Each logo renders
// in a dark bordered card matching the cert-badge feel of the home page's
// Security block. Used inside feature pages between bentos and Security.

import type { CSSProperties } from "react";

export type FeatureIntegrationsLogo = {
  name: string;
  logoSrc: string;
  href?: string;
};

export type FeatureIntegrationsRowProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  logos: FeatureIntegrationsLogo[];
};

export function FeatureIntegrationsRow({
  eyebrow,
  heading,
  subheading,
  logos,
}: FeatureIntegrationsRowProps) {
  return (
    <section
      className="flex flex-col items-center bg-black full-bleed-bg"
      style={{ padding: "100px 80px", gap: 40 }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 16, maxWidth: 820 }}
      >
        {eyebrow ? (
          <span
            className="font-urbanist font-semibold text-velt-purple"
            style={{
              fontSize: 12,
              lineHeight: 1,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
        ) : null}
        <h2
          className="font-urbanist font-bold text-white"
          style={{
            fontSize: 52,
            lineHeight: "120%",
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {heading}
        </h2>
        {subheading ? (
          <p
            className="font-urbanist text-white"
            style={{
              fontSize: 18,
              lineHeight: 1.4,
              opacity: 0.6,
              margin: 0,
              maxWidth: 720,
            }}
          >
            {subheading}
          </p>
        ) : null}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${Math.min(logos.length, 4)}, 1fr)`,
          gap: 24,
          width: "100%",
          maxWidth: 1280,
        }}
      >
        {logos.map((logo) => (
          <LogoCard key={logo.name} logo={logo} />
        ))}
      </div>
    </section>
  );
}

const cardStyle: CSSProperties = {
  background: "#111",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  padding: 32,
  height: 140,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
};

function LogoCard({ logo }: { logo: FeatureIntegrationsLogo }) {
  const inner = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={logo.logoSrc}
      alt={logo.name}
      style={{
        maxWidth: "60%",
        maxHeight: 56,
        objectFit: "contain",
        display: "block",
      }}
    />
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener"
        style={cardStyle}
        aria-label={logo.name}
      >
        {inner}
      </a>
    );
  }
  return (
    <div style={cardStyle} role="img" aria-label={logo.name}>
      {inner}
    </div>
  );
}
