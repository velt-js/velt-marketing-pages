// /book-demo — Calendly scheduling page, restyled onto the new editorial .vlp
// design system. Layout: light hero + inline Calendly widget (light themed) +
// trusted-by logo marquee, all inside the shared homepage Nav/Footer chrome.

import LandingShell from "@/components/landing-new/LandingShell";
import LandingHero from "@/components/landing-new/LandingHero";
import CalendlyEmbed from "@/components/landing-new/CalendlyEmbed";
import LogoStripBand from "@/components/landing-new/LogoStripBand";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

export const metadata = buildPageMetadata({
  title: "Book a demo",
  description:
    "See how Velt can help you add powerful collaboration features to your app. 30 minutes, with an engineer, not a sales deck.",
  path: "/book-demo",
});

/**
 * The Book a Demo scheduling page.
 * @returns {JSX.Element} The rendered page.
 */
export default function BookDemoPage() {
  return (
    <LandingShell>
      <LandingHero
        center
        eyebrow="See it live"
        heading="Book a demo"
        subheading="See how Velt can help you add powerful collaboration features to your app."
        microcopy="30 minutes, with an engineer, not a sales deck."
      />

      <section className="lp-section" style={{ paddingTop: 0 }}>
        <div className="lp-wrap">
          <CalendlyEmbed />
        </div>
      </section>

      <LogoStripBand alt />
    </LandingShell>
  );
}
