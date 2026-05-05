"use client";

// ScaleWrapper — locks children to a 1440 px design width and scales them
// proportionally to fit smaller viewports. Matches the Framer canvas
// behaviour: the whole page shrinks uniformly instead of reflowing.
// Above 1440 the children sit centered at their natural size (the
// surrounding body background fills the letterboxing).
//
// We measure the child's natural height once on mount + on resize, then
// set an explicit `height` on the outer container = naturalHeight * scale
// so there's no empty space below the scaled page.

import { useEffect, useRef, useState } from "react";

const DESIGN_WIDTH = 1440;

export function ScaleWrapper({ children }: { children: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!inner.current) return;

    const update = () => {
      const vw = window.innerWidth;
      const nextScale = vw < DESIGN_WIDTH ? vw / DESIGN_WIDTH : 1;
      setScale(nextScale);
      // scrollHeight is reliable once images/fonts settled; for initial
      // paint we still set a best-guess via getBoundingClientRect below
      setInnerHeight(inner.current?.scrollHeight ?? null);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(inner.current);
    window.addEventListener("resize", update);
    // re-measure after fonts finish loading (heights shift once Urbanist arrives)
    document.fonts?.ready.then(update).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const outerHeight = innerHeight != null ? innerHeight * scale : undefined;

  // `overflow: hidden` establishes a scroll-containing block — that
  // breaks `position: sticky` on every descendant. At full design width
  // (scale === 1) the inner content fits the outer's height exactly so
  // there is nothing to clip — drop the clipping in that case so sticky
  // headers in /pricing's comparison table actually pin. At smaller
  // viewports we still need the clip because the inner's layout box is
  // 1440px regardless of the transform.
  const needsClip = scale < 1;
  return (
    <div
      style={{
        width: "100%",
        height: outerHeight,
        overflow: needsClip ? "hidden" : "visible",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        ref={inner}
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
