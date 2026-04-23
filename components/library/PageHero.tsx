// Library page hero — mirrors homepage Hero's TitleBlock typography
// (components/home/Hero.tsx:72) so library pages feel like one coherent
// site. Rendered at 1440 design-width inside a ScaleWrapper.

import type { CtaLink } from "./types";

export type PageHeroProps = {
  eyebrow?: { label: string; dotColor?: string };
  heading: string;
  subheading?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
};

export function PageHero({
  eyebrow,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section
      className="relative w-full bg-black overflow-hidden"
      style={{ paddingTop: 140, paddingBottom: 100 }}
    >
      {/* Soft radial purple glow centered at top, matches homepage hero mood */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 420px at 50% 0%, rgba(98,93,245,0.22) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative flex flex-col items-center"
        style={{ gap: 40, width: 851, margin: "0 auto" }}
      >
        <div className="flex flex-col items-center" style={{ gap: 20 }}>
          {eyebrow && (
            <span
              className="inline-flex items-center font-urbanist font-semibold text-white"
              style={{
                gap: 8,
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid rgba(98,93,245,0.4)",
                background: "rgba(98,93,245,0.12)",
                fontSize: 14,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              <span
                aria-hidden
                className="inline-block"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: eyebrow.dotColor ?? "#86efac",
                }}
              />
              {eyebrow.label}
            </span>
          )}

          <h1
            className="font-urbanist font-bold text-white text-center"
            style={{ fontSize: 72, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            {heading}
          </h1>

          {subheading && (
            <p
              className="font-urbanist font-medium text-center"
              style={{
                fontSize: 24,
                lineHeight: 1.1,
                color: "rgba(255,255,255,0.8)",
                maxWidth: 651,
              }}
            >
              {subheading}
            </p>
          )}
        </div>

        {(primaryCta?.label || secondaryCta?.label) && (
          <div className="flex items-start" style={{ gap: 12 }}>
            {secondaryCta?.label && secondaryCta.href && (
              <a
                href={secondaryCta.href}
                target={secondaryCta.newTab ? "_blank" : undefined}
                rel={secondaryCta.newTab ? "noopener" : undefined}
                className="flex items-center justify-center rounded-lg font-urbanist font-bold text-white"
                style={{
                  minWidth: 150,
                  padding: "12px 16px",
                  border: "1.002px solid #625df5",
                  fontSize: 16,
                  letterSpacing: "-0.03em",
                  mixBlendMode: "exclusion",
                }}
              >
                {secondaryCta.label}
              </a>
            )}
            {primaryCta?.label && primaryCta.href && (
              <a
                href={primaryCta.href}
                target={primaryCta.newTab ? "_blank" : undefined}
                rel={primaryCta.newTab ? "noopener" : undefined}
                className="flex items-center justify-center rounded-lg font-urbanist font-bold text-white"
                style={{
                  minWidth: 150,
                  padding: "12px 16px",
                  background: "#625df5",
                  fontSize: 16,
                  letterSpacing: "-0.03em",
                }}
              >
                {primaryCta.label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
