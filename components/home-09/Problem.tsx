"use client";

import { useEffect, useRef, useState } from "react";
import "./Problem.css";

/**
 * The Problem section — a two-column editorial block whose checklist items
 * fade in with a staggered reveal the first time the list scrolls into view.
 */
export default function Problem() {
  const checklistRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = checklistRef.current;
    if (!node) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setRevealed(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(node);
    } catch (error) {
      // IntersectionObserver unavailable (older browsers) — show immediately.
      console.error("Problem checklist reveal failed", error);
      setRevealed(true);
    }

    return () => observer?.disconnect();
  }, []);

  return (
      <section className="problem-section">
        <div className="problem-inner">
          <div className="problem-grid">
            <div className="problem-col-left">
              <div className="problem-eyebrow"><span className="problem-eyebrow-dot"></span>The problem</div>
              <h2 className="problem-heading">Your users need to review and approve what your product generates. Building that takes two quarters.</h2>
              <div className="problem-qualifier-wrapper">
                <div className="problem-qualifier-comment">// the qualifier</div>
                <p className="problem-qualifier-text">If your product has work that more than one of your users reviews or approves, this is for you. If it doesn't, it isn't.</p>
              </div>
            </div>
            <div className="problem-col-right">
              <p className="problem-subtext">Check all that apply.</p>
              <div className={revealed ? "problem-checklist is-visible" : "problem-checklist"} ref={checklistRef}>
                <label className="problem-label"><input type="checkbox" className="problem-checkbox" /><span><span className="problem-strike">Buyers ask "do you support approval workflows?" and the honest answer costs a quarter.</span></span></label>
                <label className="problem-label"><input type="checkbox" className="problem-checkbox" /><span><span className="problem-strike">Your agents need write access to be useful, and security says no.</span></span></label>
                <label className="problem-label"><input type="checkbox" className="problem-checkbox" /><span><span className="problem-strike">Feedback about work in your product happens in Slack screenshots.</span></span></label>
                <label className="problem-label"><input type="checkbox" className="problem-checkbox" /><span><span className="problem-strike">A regulated deal stalled on "who approved this?"</span></span></label>
                <label className="problem-label"><input type="checkbox" className="problem-checkbox" /><span><span className="problem-strike">Users turned off your AI the first time it changed something it shouldn't.</span></span></label>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
