import type { ReactNode } from "react";

// The /terms route was repointed to the new-theme LegalPageView, which brings
// its own .vlp chrome (Nav + Footer). The old FixedNavLayout (home/* old theme)
// is intentionally no longer used here; this pass-through keeps the route
// segment without a second, old-theme nav.

/**
 * Pass-through layout for /terms.
 * @param {{ children: ReactNode }} props The route children.
 * @returns {ReactNode} The children, unwrapped.
 */
export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
