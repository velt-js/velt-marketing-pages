import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { Footer } from "@/components/home/Footer";
import { PageHero } from "@/components/library/PageHero";

const THANK_YOU_DESCRIPTION =
  "Our team will reach out within one business day to schedule your demo. In the meantime, take a tour of what Velt can do.";

export const metadata = buildPageMetadata({
  title: "Thank you",
  description: THANK_YOU_DESCRIPTION,
  path: "/thank-you",
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
      <div
        className="relative bg-black text-white font-urbanist w-full overflow-x-hidden"
      >
        <PageHero
          decorated={false}
          eyebrow={{ label: "Request received", dotColor: "#0D9A5D" }}
          heading="Thanks — we'll be in touch"
          subheading={THANK_YOU_DESCRIPTION}
          primaryCta={{
            label: "Read the Docs",
            href: "https://docs.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Back to home", href: "/" }}
        />

        <Footer />
      </div>
    </>
  );
}
