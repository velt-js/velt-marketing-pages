// The white full-bleed wrapper that contains all 6 reason cards plus
// ComparePricingCTA. Holds `data-outcomes` so the Nav flips white the
// moment this section reaches the nav strip.

import type { ReactNode } from "react";

export function SixReasonsSection({ children }: { children: ReactNode }) {
  return (
    <section
      data-outcomes
      className="relative flex flex-col items-center full-bleed-bg pt-16 pb-16 lg:pt-[100px] lg:pb-[120px] px-4 lg:px-10"
      style={{
        background: "#FFFFFF",
        gap: 100,
        borderRadius: 52,
      }}
    >
      <div
        className="flex flex-col items-stretch w-full max-w-[1200px]"
        style={{ gap: 60 }}
      >
        {children}
      </div>
    </section>
  );
}
