"use client";

import { useEffect, useRef, useState } from "react";
import "./Problem.css";

/** Labels for each checklist item, used for analytics payloads. */
const CHECKLIST_ITEMS = [
  'Buyers ask "do you support approval workflows?" and the honest answer costs a quarter.',
  "Your agents need write access to be useful, and security says no.",
  "Feedback about work in your product happens in Slack screenshots.",
  'A regulated deal stalled on "who approved this?"',
  "Users turned off your AI the first time it changed something it shouldn't.",
];

/**
 * Fires a `checklist_item_checked` event on both Mixpanel and Amplitude,
 * guarded with optional chaining so the call is a no-op when either SDK
 * is absent (e.g. during development, ad-blocked, or before script load).
 *
 * @param {string} item - The human-readable label of the item that was checked.
 */
function trackItemChecked(item: string): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    win.mixpanel?.track("checklist_item_checked", { item });
    win.amplitude?.track("checklist_item_checked", { item });
  } catch (error) {
    console.error("Problem checklist analytics failed", error);
  }
}

/**
 * The Problem section — a two-column editorial block whose checklist items
 * fade in with a staggered reveal the first time the list scrolls into view.
 * Checking two or more items reveals a contextual "Sounds familiar?" line
 * with a Book Demo CTA.
 */
export default function Problem() {
  const checklistRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    CHECKLIST_ITEMS.map(() => false),
  );

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

  /**
   * Handles a checkbox toggle. Fires the analytics event only when an item
   * transitions to the checked state (not on uncheck).
   *
   * @param {number} index - Index of the toggled item in CHECKLIST_ITEMS.
   * @param {boolean} nextChecked - The new checked state after the toggle.
   */
  function handleCheckboxChange(index: number, nextChecked: boolean): void {
    try {
      setCheckedItems((prev) => {
        const next = [...prev];
        next[index] = nextChecked;
        return next;
      });
      if (nextChecked) {
        trackItemChecked(CHECKLIST_ITEMS[index]);
      }
    } catch (error) {
      console.error("Problem checklist change handler failed", error);
    }
  }

  const checkedCount = checkedItems.filter(Boolean).length;
  const showFamiliarLine = checkedCount >= 2;

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
                {CHECKLIST_ITEMS.map((itemText, index) => (
                  <label key={index} className="problem-label">
                    <input
                      type="checkbox"
                      className="problem-checkbox"
                      checked={checkedItems[index]}
                      onChange={(event) => handleCheckboxChange(index, event.target.checked)}
                    />
                    <span><span className="problem-strike">{itemText}</span></span>
                  </label>
                ))}
              </div>
              <div className={showFamiliarLine ? "problem-familiar is-visible" : "problem-familiar"} aria-live="polite">
                <span className="problem-familiar-text">Sounds familiar? See how teams fix this.</span>
                <a href="/book-demo" className="problem-familiar-cta">Book Demo</a>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
