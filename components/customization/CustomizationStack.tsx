// White full-bleed wrapper that contains the 6 deep-dive cards plus the
// "Build your own UI with our APIs" CTA banner. Holds `data-outcomes`
// so the Nav flips white the moment this section reaches the strip.
//
// Rounded TOP only (matches the webhooks/highlights pattern in
// components/feature/WebhooksAndApiHighlights.tsx) so the white→dark
// transition into CustomerUI below is a clean horizontal line —
// rounding both corners pinched the panel inward and exposed the
// dark page bg through the bottom curves.

import type { ReactNode } from "react";

export function CustomizationStack({ children }: { children: ReactNode }) {
  return (
    <section
      data-outcomes
      className="relative flex flex-col items-center full-bleed-bg pt-16 pb-20 lg:pt-[100px] lg:pb-[120px] px-4 lg:px-10 gap-16 lg:gap-[100px] rounded-t-[28px] lg:rounded-t-[52px]"
      style={{
        background: "#FFFFFF",
      }}
    >
      <div
        className="flex flex-col items-stretch w-full max-w-[1198px]"
        style={{ gap: 20 }}
      >
        {children}
      </div>
    </section>
  );
}
