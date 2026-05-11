// White rounded outer card that wraps each reason on /comparison.
// Mirrors Figma 180:79110 — pt 72, pb 76, px 133-134, radius 56,
// 1px solid #0e0d36 border. Header (colored 52px tabler icon, 40px bold
// heading, 24px subheading) sits at the top, body slot fills the rest.
//
// id="reason-{num}" + scroll-margin-top: 80px lets SixReasonsHeader's
// in-page anchor links land flush below the fixed Nav.

import type { ReactNode } from "react";

export type ReasonShellProps = {
  num: 1 | 2 | 3 | 4 | 5 | 6;
  iconSrc: string;
  heading: string;
  subheading?: string;
  children: ReactNode;
};

export function ReasonShell({
  num,
  iconSrc,
  heading,
  subheading,
  children,
}: ReasonShellProps) {
  return (
    <section
      id={`reason-${num}`}
      className="bg-white flex flex-col items-center py-10 px-5 lg:py-[72px] lg:px-[133px]"
      style={{
        scrollMarginTop: 80,
        border: "1px solid #0e0d36",
        borderRadius: 56,
        gap: 40,
        width: "100%",
      }}
    >
      <header
        className="flex flex-col items-center justify-center"
        style={{ gap: 24 }}
      >
        <img
          src={iconSrc}
          alt=""
          width={52}
          height={52}
          style={{ display: "block" }}
        />
        <div className="flex flex-col items-center text-center" style={{ gap: 12 }}>
          <h3
            className="font-urbanist font-bold"
            style={{
              fontSize: "clamp(20px, 2.4vw, 28px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "#111",
              margin: 0,
            }}
          >
            {heading}
          </h3>
          {subheading ? (
            <p
              className="font-urbanist"
              style={{
                fontSize: "clamp(16px, 1.5vw, 20px)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: "#111",
                opacity: 0.75,
                margin: 0,
              }}
            >
              {subheading}
            </p>
          ) : null}
        </div>
      </header>
      {children}
    </section>
  );
}
