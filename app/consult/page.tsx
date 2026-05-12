// /consult — free design consultation landing page.
//
// Live velt.dev/consult offers a free consultation with ex-Google/Netflix
// PMs and designers for product audits and custom collaboration mockups.
// Composition mirrors /features: dark hero with grid -> trusted logos ->
// light "what's covered" card grid -> customer carousel -> FAQ -> get
// started -> footer.

import Script from "next/script";

import { Footer } from "@/components/home/Footer";
import { Security, type SecurityCardData } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ, type FaqEntry } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

// Same Calendly slot as /book-demo. Keeping the URL identical so a
// rebrand of the embed (colors, hidden fields) only needs one edit.
const CALENDLY_URL =
  "https://calendly.com/goyalrakesh/30min?embed_domain=velt.dev&embed_type=Inline&hide_gdpr_banner=1&background_color=171717&text_color=ffffff&primary_color=ffffff&hide_event_type_details=1&hide_landing_page_details=1";

const CONSULT_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Consult", url: `${SITE_URL}/consult` },
]);

const CONSULT_WEBPAGE = buildWebPageSchema({
  name: "Consult | Velt",
  description:
    "Free design consultation with ex-Google and Netflix product managers and designers — product audits, custom mockups, and an implementation plan for your collaboration features.",
  url: `${SITE_URL}/consult`,
  breadcrumb: CONSULT_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Consult",
  description:
    "Free design consultation with ex-Google and Netflix product managers and designers — product audits, custom mockups, and an implementation plan for your collaboration features.",
  path: "/consult",
});

// Four "what's covered" cards rendered through the Security component's
// 2x2 grid. Reuses Security card chrome (#f7f7f7, 24px radius, 493 tall)
// so the consult page visually matches the rest of the marketing site.
// Imagery reuses the existing /images/security PNGs — there is no
// consult-specific artwork on velt.dev/consult to download.
const CONSULT_CARDS: SecurityCardData[] = [
  {
    title: "Product Audit",
    subtitle:
      "We review your product against patterns that ship in successful collaborative SaaS — and tell you what to keep, change, or cut.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/security/Isolated%20Data.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
      />
    ),
  },
  {
    title: "Custom Mockups",
    subtitle:
      "We design mocks of how Velt features will look inside your UI, so your team can align before a single line of code is written.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/security/Bring%20your%20own%20database.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
      />
    ),
  },
  {
    title: "Implementation Plan",
    subtitle:
      "A scoped, sequenced rollout plan — which components to ship first, where they fit, and how to integrate them with your existing stack.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/security/Mutli%20Region%20Hosting.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
      />
    ),
  },
  {
    title: "Architecture Review",
    subtitle:
      "Our engineers review your data model, auth, and document structure so your collaboration layer scales cleanly from day one.",
    visual: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/security/Custom%20Data%20Encryption.png"
        alt=""
        aria-hidden="true"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
      />
    ),
  },
];

// Consult-specific FAQ items prepended to the shared FAQ. The shared list
// already covers billing and implementation time — these answer the
// questions a prospect has before booking a call.
const consultFAQ: FaqEntry[] = [
  {
    question: "Is the consultation really free?",
    answer:
      "Yes. The consultation, product audit, and any mockups we create during the engagement are free. There's no commitment to use Velt afterwards.",
  },
  {
    question: "Who runs the consultation?",
    answer:
      "Ex-product managers and designers from Google, Netflix, and top product agencies — paired with a Velt engineer when the conversation moves to implementation details.",
  },
  {
    question: "What should I prepare before the call?",
    answer:
      "A short walkthrough of your product and the collaboration outcome you're chasing — for example, async commenting on a canvas, presence inside an editor, or notifications across surfaces. We'll take it from there.",
  },
  ...sharedFAQ,
];

// Three-step process for "How it works". Plain dark cards, no product UI
// mocks — this is the engagement flow, not the SDK flow, so reusing
// GetStartedSteps (which is SDK-centric) would be misleading.
const PROCESS_STEPS: Array<{ step: string; title: string; body: string }> = [
  {
    step: "01",
    title: "Book a slot",
    body: "Pick a time that works for you. We'll send a quick form so the team can review your product before the call.",
  },
  {
    step: "02",
    title: "Audit + mockups",
    body: "Our team audits your product and ships custom mockups showing where collaboration adds the most value.",
  },
  {
    step: "03",
    title: "Implementation plan",
    body: "You leave with a scoped plan, ranked priorities, and a Velt engineer ready to support the rollout if you choose to ship.",
  },
];

function ProcessSection() {
  return (
    <section
      className="flex flex-col items-center bg-white w-full px-6 lg:px-20"
      style={{
        paddingTop: "clamp(80px, 9vw, 100px)",
        paddingBottom: "clamp(80px, 9vw, 100px)",
        gap: 52,
      }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 16, maxWidth: 820 }}
      >
        <h2
          className="font-urbanist font-bold"
          style={{
            fontSize: "clamp(28px, 4.2vw, 52px)",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            color: "#000",
            margin: 0,
          }}
        >
          How it works
        </h2>
        <p
          className="font-urbanist"
          style={{
            fontSize: "clamp(16px, 1.5vw, 20px)",
            lineHeight: 1.3,
            color: "#000",
            opacity: 0.6,
            margin: 0,
          }}
        >
          From booking to a scoped implementation plan in three steps.
        </p>
      </div>

      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          maxWidth: 1200,
        }}
      >
        {PROCESS_STEPS.map((item) => (
          <div
            key={item.step}
            className="flex flex-col"
            style={{
              background: "#f7f7f7",
              borderRadius: 16,
              padding: 32,
              gap: 16,
              minHeight: 220,
            }}
          >
            <span
              className="font-urbanist font-semibold"
              style={{
                fontSize: 12,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--color-velt-purple)",
              }}
            >
              Step {item.step}
            </span>
            <h3
              className="font-urbanist font-bold"
              style={{
                fontSize: 24,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#000",
                margin: 0,
              }}
            >
              {item.title}
            </h3>
            <p
              className="font-urbanist"
              style={{
                fontSize: 16,
                lineHeight: 1.4,
                color: "#000",
                opacity: 0.6,
                margin: 0,
              }}
            >
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ConsultPage() {
  return (
    <>
      <JsonLd id="ld-consult-webpage" data={CONSULT_WEBPAGE} />
      <JsonLd id="ld-consult-breadcrumb" data={CONSULT_BREADCRUMB} />
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated
          eyebrow={{ label: "Free for early-stage teams" }}
          heading="Free design consultation"
          subheading="Our team of ex-product managers and designers from Google, Netflix, and premier design agencies will audit your product and ship custom collaboration mockups."
          primaryCta={{ label: "Book a slot", href: "#calendly" }}
          secondaryCta={{
            label: "Get free API key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
        />

        {/* Calendly inline embed — mirrors /book-demo. Renders immediately
            after the hero so the primary CTA scrolls to it without a route
            change, matching live velt.dev/consult. */}
        <section
          id="calendly"
          className="relative w-full bg-black px-6 lg:px-20"
          style={{ paddingBottom: 80 }}
        >
          <div
            className="flex flex-col items-center w-full"
            style={{ maxWidth: 1280, margin: "0 auto" }}
          >
            <div
              className="calendly-inline-widget"
              data-url={CALENDLY_URL}
              style={{
                width: "100%",
                minWidth: 320,
                height: 700,
                borderRadius: 16,
                overflow: "hidden",
              }}
            />
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-urbanist font-medium"
              style={{
                marginTop: 16,
                fontSize: 14,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "underline",
              }}
            >
              Not loading? Click here
            </a>
          </div>
        </section>

        <TrustedLogos />

        <Security
          heading="What you get"
          subheading="Every consultation includes a product audit, custom mockups, and an implementation plan tailored to your stack."
          primaryCta={{ label: "View Docs", href: "https://docs.velt.dev/" }}
          secondaryCta={{ label: "Book a slot", href: "#calendly" }}
          cards={CONSULT_CARDS}
          certification={null}
          testimonial={null}
          paddingTop={150}
          paddingBottom={80}
        />

        <ProcessSection />

        <FeatureCustomerCarousel />

        <LibraryFAQ items={consultFAQ} />

        <GetStartedSteps />

        <Footer />
      </div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
