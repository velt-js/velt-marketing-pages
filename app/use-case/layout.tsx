import type { ReactNode } from "react";

// The Use Case pages are reskinned to the new theme and render the homepage
// Nav inside their own .vlp scope (see components/use-case-new/*View). The old
// FixedNavLayout (fixed legacy Nav) is intentionally removed so it does not
// double up with the new Nav.

/**
 * Pass-through layout for the /use-case route segment.
 * @param {{ children: ReactNode }} props The nested route content.
 * @returns {ReactNode} The children, unwrapped.
 */
export default function UseCaseLayout({ children }: { children: ReactNode }) {
  return children;
}
