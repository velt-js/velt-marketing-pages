import type { ReactNode } from "react";

// The /privacy route was repointed to the new-theme LegalPageView, which brings
// its own .vlp chrome (Nav + Footer). The old FixedNavLayout (home/* old theme)
// is intentionally no longer used here; this pass-through keeps the route
// segment without a second, old-theme nav.

/**
 * Pass-through layout for /privacy.
 * @param {{ children: ReactNode }} props The route children.
 * @returns {ReactNode} The children, unwrapped.
 */
export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
