import Script from "next/script";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { Footer } from "@/components/home/Footer";
import { PageHero } from "@/components/library/PageHero";

const THANK_YOU_DESCRIPTION =
  "Our team will reach out within one business day to schedule your demo. In the meantime, take a tour of what Velt can do.";

export const metadata = buildPageMetadata({
  title: "Thank you",
  description: THANK_YOU_DESCRIPTION,
  path: "/thank-you",
  ogImage: "/og/thank-you.png",
  noindex: true,
});

/**
 * /thank-you — post-form-submission confirmation page reached after a
 * visitor submits the Book Demo form. Intentionally minimal: nav + a
 * centered hero with two CTAs + footer. No testimonials, FAQ, or
 * feature grids belong here.
 */
export default function ThankYouPage() {
  return (
    <>
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated={false}
          eyebrow={{ label: "Request received", dotColor: "#0D9A5D" }}
          heading="Thanks, we'll be in touch"
          subheading={THANK_YOU_DESCRIPTION}
          primaryCta={{
            label: "Read the Docs",
            href: "https://velt.dev/docs/",
            newTab: true,
          }}
          secondaryCta={{ label: "Back to home", href: "/" }}
        />

        <Footer />
      </div>

      {/* Google Ads conversion event ported from the Framer thank-you
          page (Scripts 11 + 12). Fires once per render after the form
          submission completes. The local gtag shim pushes to
          window.dataLayer directly, so the event is captured even if
          the global gtag SDK from components/analytics/Analytics.tsx
          hasn't fully initialized by the time this script runs. */}
      <Script id="gtag-conversion-demo-booked" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('event', 'conversion', {
            send_to: 'AW-16764728482/VRiaCI6oveUZEKLphbo-',
            value: 1.0,
            currency: 'USD'
          });
        `}
      </Script>
    </>
  );
}
