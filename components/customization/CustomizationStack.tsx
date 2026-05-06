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
      className="relative flex flex-col items-center full-bleed-bg"
      style={{
        background: "#FFFFFF",
        paddingTop: 100,
        paddingBottom: 120,
        gap: 100,
        borderTopLeftRadius: 52,
        borderTopRightRadius: 52,
      }}
    >
      <div
        className="flex flex-col items-stretch"
        style={{ width: 1198, gap: 20 }}
      >
        {children}
      </div>
    </section>
  );
}
