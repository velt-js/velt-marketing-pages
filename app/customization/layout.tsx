import type { ReactNode } from "react";

// The /customization route was repointed to the new-theme page, which brings
// its own .vlp chrome (Nav + Footer) via CustomizationView. The old FixedNavLayout
// (home/* old theme) is intentionally no longer used here; this pass-through
// keeps the route segment without a second, old-theme nav. The old customization
// components under components/customization/* are left in place, unused.

/**
 * Pass-through layout for /customization.
 * @param {{ children: ReactNode }} props The route children.
 * @returns {ReactNode} The children, unwrapped.
 */
export default function CustomizationLayout({ children }: { children: ReactNode }) {
  return children;
}
