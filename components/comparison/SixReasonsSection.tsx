// The white full-bleed wrapper that contains all 6 reason cards plus
// ComparePricingCTA. Holds `data-outcomes` so the Nav flips white the
// moment this section reaches the nav strip.

import type { ReactNode } from "react";

export function SixReasonsSection({ children }: { children: ReactNode }) {
  return (
    <section
      data-outcomes
      className="relative flex flex-col items-center full-bleed-bg"
      style={{
        background: "#FFFFFF",
        paddingTop: 100,
        paddingBottom: 120,
        gap: 100,
        borderRadius: 52,
      }}
    >
      <div
        className="flex flex-col items-stretch"
        style={{ width: 1200, gap: 100 }}
      >
        {children}
      </div>
    </section>
  );
}
