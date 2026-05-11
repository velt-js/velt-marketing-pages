// "Migrate in 3 Steps" panel — section 3 of the /migrate/[slug] template.
// Spec: Figma HqWIZdR6ISJmaG2n4o3gr8 node 217:5190.
//
// Layout:
//   Outer:    Black full-bleed section, centered title block above a 1280-wide
//             dark rounded panel; bottom testimonial strip.
//   Title:    "<prefix> <highlight>" where the highlight uses the
//             #bcbaff→#625df5 gradient. 52px Urbanist Bold.
//   Panel:    1280×~600 — three equal columns separated by 2px gutters.
//             Each column 445px tall, #0d0d0d bg.
//   Step 1:   competitor-logo pill → ↓ → "{} Data.json" pill
//   Step 2:   "{} Data.json" pill → ↓ → "<velt> Velt DB" pill
//   Step 3:   centered Velt geosphere + Kim/Chris cursor name-tags
//   Footer:   #1a1a1a strip with avatar+name+role on the left,
//             quote (with highlighted phrase in #0085ff) on the right.

import type { CSSProperties, ReactNode } from "react";

type CtaLink = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

type Step = { title: string; description: string };

type Testimonial = {
  name?: string;
  role?: string;
  avatar?: string | null;
  quotePrefix?: string;
  quoteHighlight?: string;
  quoteSuffix?: string;
};

export type MigrationStepsPanelProps = {
  headingPrefix: string;
  headingHighlight: string;
  subtitle?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  step1: Step;
  step2: Step;
  step3: Step;
  testimonial?: Testimonial;
  /** Resolved Sanity image URL for the competitor's logo (used in step 1's pill). */
  competitorLogoSrc?: string | null;
  /** Used as alt text for the competitor logo. */
  competitorName?: string;
};

const PANEL_WIDTH = 1280;
const COLUMN_HEIGHT = 445;

export function MigrationStepsPanel({
  headingPrefix,
  headingHighlight,
  subtitle,
  primaryCta,
  secondaryCta,
  step1,
  step2,
  step3,
  testimonial,
  competitorLogoSrc,
  competitorName,
}: MigrationStepsPanelProps) {
  return (
    <section
      className="relative w-full bg-black full-bleed-bg flex flex-col items-center py-16 lg:py-[100px] gap-10 lg:gap-[50px] px-6 lg:px-20"
    >
      <div
        className="flex flex-col items-center text-center text-white gap-6 lg:gap-8"
      >
        <div className="flex flex-col items-center gap-3">
          <h2
            className="font-urbanist font-bold"
            style={{
              fontSize: "clamp(28px, 4.2vw, 52px)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {headingPrefix}{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #bcbaff 13.462%, #625df5 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {headingHighlight}
            </span>
          </h2>
          {subtitle ? (
            <p
              className="font-urbanist"
              style={{
                fontSize: 20,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        {(primaryCta?.label || secondaryCta?.label) && (
          <div className="flex items-start" style={{ gap: 12 }}>
            {secondaryCta?.label && secondaryCta.href ? (
              <a
                href={secondaryCta.href}
                target={secondaryCta.newTab ? "_blank" : undefined}
                rel={secondaryCta.newTab ? "noopener" : undefined}
                className="inline-flex items-center justify-center rounded-lg font-urbanist font-semibold no-underline"
                style={{
                  height: 44,
                  width: 156,
                  padding: "8px 16px",
                  border: "2px solid #625df5",
                  color: "#fff",
                  fontSize: 16,
                  letterSpacing: "-0.48px",
                  gap: 4,
                  mixBlendMode: "exclusion",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/migrate/tabler-icon-book-2.svg"
                  alt=""
                  width={18}
                  height={18}
                  style={{ display: "block" }}
                />
                {secondaryCta.label}
              </a>
            ) : null}
            {primaryCta?.label && primaryCta.href ? (
              <a
                href={primaryCta.href}
                target={primaryCta.newTab ? "_blank" : undefined}
                rel={primaryCta.newTab ? "noopener" : undefined}
                className="inline-flex items-center justify-center rounded-lg font-urbanist font-semibold text-white no-underline"
                style={{
                  height: 44,
                  width: 156,
                  padding: "8px 16px",
                  background: "#625df5",
                  fontSize: 16,
                  letterSpacing: "-0.48px",
                }}
              >
                {primaryCta.label}
              </a>
            ) : null}
          </div>
        )}
      </div>

      <div
        className="overflow-clip"
        style={{
          width: PANEL_WIDTH,
          background: "#111",
          border: "2px solid #1a1a1a",
          borderRadius: 24,
        }}
      >
        <div
          className="flex"
          style={{ background: "#111", padding: 2, gap: 2 }}
        >
          <StepColumn step={step1}>
            <PillChain
              top={
                <Pill>
                  {competitorLogoSrc ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={competitorLogoSrc}
                      alt={competitorName ?? "Competitor"}
                      style={{ height: 28, width: "auto", display: "block" }}
                    />
                  ) : (
                    <span
                      className="font-urbanist font-semibold"
                      style={{ fontSize: 20, color: "#fff" }}
                    >
                      {competitorName ?? "Competitor"}
                    </span>
                  )}
                </Pill>
              }
              bottom={<DataJsonPill />}
            />
          </StepColumn>
          <StepColumn step={step2}>
            <PillChain top={<DataJsonPill />} bottom={<VeltDbPill />} />
          </StepColumn>
          <StepColumn step={step3}>
            <Step3Visual />
          </StepColumn>
        </div>

        {testimonial?.name ? (
          <div
            className="flex items-center justify-between"
            style={{ background: "#1a1a1a", padding: 40 }}
          >
            <div className="flex items-center" style={{ gap: 16 }}>
              {testimonial.avatar ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={testimonial.avatar}
                  alt=""
                  width={52}
                  height={52}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : null}
              <div className="flex flex-col" style={{ gap: 4 }}>
                <span
                  className="font-urbanist font-semibold text-white"
                  style={{
                    fontSize: 18,
                    lineHeight: 1.2,
                    letterSpacing: "-0.54px",
                  }}
                >
                  {testimonial.name}
                </span>
                {testimonial.role ? (
                  <span
                    className="font-urbanist text-white"
                    style={{
                      fontSize: 16,
                      lineHeight: 1.2,
                      letterSpacing: "-0.48px",
                      opacity: 0.52,
                    }}
                  >
                    {testimonial.role}
                  </span>
                ) : null}
              </div>
            </div>
            <p
              className="font-urbanist font-semibold text-white"
              style={{
                fontSize: 24,
                lineHeight: 1.2,
                letterSpacing: "-0.72px",
                width: 421,
                margin: 0,
              }}
            >
              {testimonial.quotePrefix}
              {testimonial.quoteHighlight ? (
                <span style={{ color: "#0085ff" }}>
                  {testimonial.quoteHighlight}
                </span>
              ) : null}
              {testimonial.quoteSuffix}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

// ---- Sub-components ------------------------------------------------------

function StepColumn({
  step,
  children,
}: {
  step: Step;
  children: ReactNode;
}) {
  return (
    <div
      className="relative overflow-clip"
      style={{
        flex: 1,
        minWidth: 0,
        height: COLUMN_HEIGHT,
        background: "#0d0d0d",
      }}
    >
      <div
        className="absolute flex flex-col text-white"
        style={{ top: 30, left: 30, right: 30, gap: 12 }}
      >
        <p
          className="font-urbanist font-bold"
          style={{ fontSize: 20, lineHeight: 1.2, margin: 0 }}
        >
          {step.title}
        </p>
        <p
          className="font-urbanist"
          style={{ fontSize: 14, lineHeight: 1, opacity: 0.52, margin: 0 }}
        >
          {step.description}
        </p>
      </div>
      <div
        className="absolute flex items-center justify-center"
        style={{ left: 0, right: 0, top: 106, height: 339 }}
      >
        {children}
      </div>
    </div>
  );
}

function PillChain({ top, bottom }: { top: ReactNode; bottom: ReactNode }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: 24, width: 192 }}>
      {top}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/migrate/chevron-down-stack.svg"
        alt=""
        style={{ width: 28, height: 74, display: "block" }}
      />
      {bottom}
    </div>
  );
}

const PILL_BASE: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 52,
  height: 52,
  padding: "12px 24px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  whiteSpace: "nowrap",
};

function Pill({ children }: { children: ReactNode }) {
  return <div style={PILL_BASE}>{children}</div>;
}

function DataJsonPill() {
  return (
    <div style={PILL_BASE}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/migrate/tabler-icon-braces.svg"
        alt=""
        style={{ width: 24, height: 24, display: "block" }}
      />
      <span
        className="text-white"
        style={{
          fontFamily: "'Geist Mono', ui-monospace, monospace",
          fontSize: 24,
          lineHeight: 1,
        }}
      >
        Data.json
      </span>
    </div>
  );
}

function VeltDbPill() {
  return (
    <div style={PILL_BASE}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/migrate/velt-mark-small.svg"
        alt=""
        style={{ width: 33, height: 33, display: "block" }}
      />
      <span
        className="text-white"
        style={{
          fontFamily: "'Geist Mono', ui-monospace, monospace",
          fontSize: 24,
          lineHeight: 1,
        }}
      >
        Velt DB
      </span>
    </div>
  );
}

function Step3Visual() {
  return (
    <div className="relative" style={{ width: 339, height: 339 }}>
      {/* Velt geosphere — centered, slightly above middle to match Figma */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/migrate/velt-mark-large.svg"
        alt=""
        style={{
          position: "absolute",
          top: "calc(50% - 19.75px)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 132,
          height: 132,
          display: "block",
        }}
      />
      {/* Kim cursor — top-left of the geosphere */}
      <div
        style={{
          position: "absolute",
          top: 86,
          left: 11,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: 79,
        }}
      >
        <div style={{ width: 26, height: 26, transform: "scaleY(-1) rotate(180deg)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/migrate/cursor-pointer-blue.svg"
            alt=""
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
        <div style={{ paddingRight: 21 }}>
          <span
            className="font-urbanist font-bold"
            style={{
              display: "inline-block",
              background: "#046ded",
              color: "#fff",
              fontSize: 18,
              lineHeight: 1.55,
              letterSpacing: "0.18px",
              padding: "3px 13px",
              borderRadius: 30,
              boxShadow: "0px 1.6px 3.3px rgba(0,0,0,0.16)",
            }}
          >
            Kim
          </span>
        </div>
      </div>
      {/* Chris cursor — bottom-right of the geosphere */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: 84,
        }}
      >
        <div style={{ width: 25, height: 25 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/migrate/cursor-pointer-pink.svg"
            alt=""
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
        <div style={{ paddingLeft: 20 }}>
          <span
            className="font-urbanist font-bold"
            style={{
              display: "inline-block",
              background: "#ec055a",
              color: "#fff",
              fontSize: 17,
              lineHeight: 1.55,
              letterSpacing: "0.17px",
              padding: "3px 12px",
              borderRadius: 28,
              boxShadow: "0px 1.5px 3px rgba(0,0,0,0.16)",
            }}
          >
            Chris
          </span>
        </div>
      </div>
    </div>
  );
}
