import type { ReactNode } from "react";
import "./Verticals.css";

/**
 * Monochrome Tabler glyph wrapper, mirroring the nav icon chrome so verticals
 * reuse the same icons as their Solutions nav entries.
 * @param {{ children: ReactNode }} props The inner <path> elements.
 * @returns {JSX.Element} The sized SVG wrapper.
 */
function VerticalIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

// Tabler glyphs reused from the Solutions nav entries (Nav.tsx NAV_ICONS),
// keyed to each vertical so the homepage and nav stay visually consistent.
const VERTICAL_ICONS = {
  salesEnablement: (
    <VerticalIcon>
      <path d="M3 17l6 -6l4 4l8 -8" />
      <path d="M14 7l7 0l0 7" />
    </VerticalIcon>
  ),
  fintech: (
    <VerticalIcon>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" />
      <path d="M12 7v10" />
    </VerticalIcon>
  ),
  operations: (
    <VerticalIcon>
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" />
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </VerticalIcon>
  ),
  aiNativeSaas: (
    <VerticalIcon>
      <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" />
    </VerticalIcon>
  ),
} as const;

export default function Verticals() {
  return (
      <section id="verticals" className="vert-section">
        <div className="vert-eyebrow"><span className="vert-eyebrow-dot"></span>Is this for me</div>
        <h2 className="vert-heading">Built for work that can't ship unapproved.</h2>
        <div className="vert-grid">
          <a href="/for/sales-enablement" className="vert-card hcard">
            <span className="vert-card-icon" aria-hidden="true">{VERTICAL_ICONS.salesEnablement}</span>
            <div className="vert-card-label">VERTICAL 01</div>
            <div className="vert-card-title">Sales enablement and content production</div>
            <p className="vert-card-desc">Brand, legal, and client approval on every asset, inside your product.</p>
            <div className="vert-card-explore">Explore</div>
          </a>
          <a href="/for/fintech" className="vert-card hcard">
            <span className="vert-card-icon" aria-hidden="true">{VERTICAL_ICONS.fintech}</span>
            <div className="vert-card-label">VERTICAL 02</div>
            <div className="vert-card-title">Fintech, FP&amp;A, and compliance</div>
            <p className="vert-card-desc">Numbers ship with names attached: staged sign-off and immutable records.</p>
            <div className="vert-card-explore">Explore</div>
          </a>
          <a href="/for/operations" className="vert-card hcard">
            <span className="vert-card-icon" aria-hidden="true">{VERTICAL_ICONS.operations}</span>
            <div className="vert-card-label">VERTICAL 03</div>
            <div className="vert-card-title">Physical-world operations</div>
            <p className="vert-card-desc">Human sign-off on operational decisions, often across organizations.</p>
            <div className="vert-card-explore">Explore</div>
          </a>
          <a href="/for/ai-native-saas" className="vert-card hcard">
            <span className="vert-card-icon" aria-hidden="true">{VERTICAL_ICONS.aiNativeSaas}</span>
            <div className="vert-card-label">VERTICAL 04</div>
            <div className="vert-card-title">AI-native SaaS</div>
            <p className="vert-card-desc">Agents propose, humans approve. The loop that makes generated work shippable.</p>
            <div className="vert-card-explore">Explore</div>
          </a>
        </div>
      </section>
  );
}
