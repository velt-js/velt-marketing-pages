import type { ReactNode } from "react";

import "./HowItWorks.css";

/** One installation step shown as a numbered node + editor card. */
export type InstallStep = {
  /** Step number badge, e.g. "01". */
  num: string;
  /** Short uppercase label shown in the node pill. */
  label: string;
  /** Editor tab / filename shown in the window chrome. */
  tab: string;
  /** Code body (string or syntax-highlighted ReactNode). */
  code: ReactNode;
};

type InstallTimelineProps = {
  steps: InstallStep[];
  /** Optional mono footnote rendered under the track. */
  footnote?: ReactNode;
  /** Show the macOS traffic-light dots in the editor chrome. Defaults to true. */
  chromeDots?: boolean;
};

/**
 * Reusable install-steps timeline: a marching-ants spine connecting numbered
 * nodes, each dropping into a dark editor card. Shared by the homepage
 * "How it works" section and the feature pages so the install visual stays
 * identical across the site.
 * @param {InstallTimelineProps} props Steps and optional footnote.
 * @returns {JSX.Element} The install timeline.
 */
export default function InstallTimeline({ steps, footnote, chromeDots = true }: InstallTimelineProps) {
  return (
    <div className="how-timeline">
      <div className="how-tl-track">
        {steps.map((step) => (
          <div key={step.num} className="how-tl-item">
            <div className="how-tl-head">
              <span className="how-tl-node">{step.num}</span>
              <span className="how-tl-label">{step.label}</span>
            </div>
            <span className="how-tl-drop" aria-hidden="true"></span>
            <div className="how-editor">
              <div className="how-editor-chrome">
                {chromeDots ? (
                  <>
                    <span className="how-editor-dot how-editor-dot-red" aria-hidden="true"></span>
                    <span className="how-editor-dot how-editor-dot-amber" aria-hidden="true"></span>
                    <span className="how-editor-dot how-editor-dot-green" aria-hidden="true"></span>
                  </>
                ) : null}
                <span className="how-editor-tab">{step.tab}</span>
              </div>
              <pre className="how-pre"><code>{step.code}</code></pre>
            </div>
          </div>
        ))}
      </div>
      {footnote ? <p className="how-footnote">{footnote}</p> : null}
    </div>
  );
}
