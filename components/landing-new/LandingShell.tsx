import type { ReactNode } from "react";

// Reuse the shipped homepage chrome (.vlp scoped) so nav + footer stay in sync
// across the site, then render the page body inside the same .vlp scope.
import "@/components/home-new/styles.css";
import "./landing.css";

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";

type LandingShellProps = {
  children: ReactNode;
};

/**
 * Shared shell for the new-theme marketing landing pages. Renders the homepage
 * Nav and Footer in the .vlp scope and loads the Geist Mono webfont (Urbanist
 * and Inter Tight are already loaded globally in the root layout) so mono
 * eyebrow labels render correctly.
 * @param {LandingShellProps} props The page body.
 * @returns {JSX.Element} The composed shell.
 */
export default function LandingShell({ children }: LandingShellProps) {
  return (
    <div className="vlp">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <a id="top" />
      <Nav />
      <div className="vlp-page">{children}</div>
      <Footer />
    </div>
  );
}
