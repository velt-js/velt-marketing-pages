// /consult — free design consultation landing page, restyled onto the new
// editorial .vlp design system. Composition mirrors the live page: light hero
// with a primary "Book a slot" action that scrolls to the inline (light-themed)
// Calendly embed, a trusted-by logo marquee, a "what you get" card grid, a
// three-step process, an FAQ accordion, and a dark conversion CTA banner.

import LandingShell from "@/components/landing-new/LandingShell";
import LandingHero from "@/components/landing-new/LandingHero";
import SectionHead from "@/components/landing-new/SectionHead";
import CalendlyEmbed from "@/components/landing-new/CalendlyEmbed";
import LogoStripBand from "@/components/landing-new/LogoStripBand";
import CtaBanner from "@/components/home-new/CtaBanner";
import LandingFaq from "@/components/landing-new/LandingFaq";
import type { FaqEntry } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildFaqPageSchemaFromEntries,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const CONSOLE_URL = "https://console.velt.dev/";

const CONSULT_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Consult", url: `${SITE_URL}/consult` },
]);

const CONSULT_DESCRIPTION =
  "Free design consultation with ex-Google and Netflix product managers and designers — product audits, custom mockups, and an implementation plan for your collaboration features.";

const CONSULT_WEBPAGE = buildWebPageSchema({
  name: "Consult | Velt",
  description: CONSULT_DESCRIPTION,
  url: `${SITE_URL}/consult`,
  breadcrumb: CONSULT_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Consult",
  description: CONSULT_DESCRIPTION,
  path: "/consult",
});

// "What you get" cards. Imagery reuses the existing /images/security PNGs —
// there is no consult-specific artwork on the live page to download.
const CONSULT_CARDS: Array<{ title: string; body: string; image: string }> = [
  {
    title: "Product Audit",
    body: "We review your product against patterns that ship in successful collaborative SaaS, and tell you what to keep, change, or cut.",
    image: "/images/security/Isolated%20Data.png",
  },
  {
    title: "Custom Mockups",
    body: "We design mocks of how Velt features will look inside your UI, so your team can align before a single line of code is written.",
    image: "/images/security/Bring%20your%20own%20database.png",
  },
  {
    title: "Implementation Plan",
    body: "A scoped, sequenced rollout plan: which components to ship first, where they fit, and how to integrate them with your existing stack.",
    image: "/images/security/Mutli%20Region%20Hosting.png",
  },
  {
    title: "Architecture Review",
    body: "Our engineers review your data model, auth, and document structure so your collaboration layer scales cleanly from day one.",
    image: "/images/security/Custom%20Data%20Encryption.png",
  },
];

// Three-step engagement flow for "How it works".
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

// Consult-specific FAQ items prepended to the shared FAQ.
const CONSULT_FAQ: FaqEntry[] = [
  {
    question: "Is the consultation really free?",
    answer:
      "Yes. The consultation, product audit, and any mockups we create during the engagement are free. There's no commitment to use Velt afterwards.",
  },
  {
    question: "Who runs the consultation?",
    answer:
      "Ex-product managers and designers from Google, Netflix, and top product agencies, paired with a Velt engineer when the conversation moves to implementation details.",
  },
  {
    question: "What should I prepare before the call?",
    answer:
      "A short walkthrough of your product and the collaboration outcome you're chasing, for example async commenting on a canvas, presence inside an editor, or notifications across surfaces. We'll take it from there.",
  },
  ...sharedFAQ,
];

const CONSULT_FAQ_SCHEMA = buildFaqPageSchemaFromEntries(CONSULT_FAQ);

/**
 * The free design consultation landing page.
 * @returns {JSX.Element} The rendered page.
 */
export default function ConsultPage() {
  return (
    <>
      <JsonLd id="ld-consult-webpage" data={CONSULT_WEBPAGE} />
      <JsonLd id="ld-consult-breadcrumb" data={CONSULT_BREADCRUMB} />
      <JsonLd id="ld-consult-faq" data={CONSULT_FAQ_SCHEMA} />

      <LandingShell>
        <LandingHero
          eyebrow="Free for early-stage teams"
          heading="Free design consultation"
          subheading="Our team of ex-product managers and designers from Google, Netflix, and premier design agencies will audit your product and ship custom collaboration mockups."
          primaryCta={{ label: "Book a slot", href: "#calendly" }}
          secondaryCta={{
            label: "Get free API key",
            href: CONSOLE_URL,
            newTab: true,
          }}
        />

        <section id="calendly" className="lp-section" style={{ paddingTop: 0, scrollMarginTop: 96 }}>
          <div className="lp-wrap">
            <CalendlyEmbed />
          </div>
        </section>

        <LogoStripBand alt />

        <section className="lp-section">
          <div className="lp-wrap">
            <SectionHead
              eyebrow="What you get"
              heading="A product audit, custom mockups, and a plan"
              subheading="Every consultation is tailored to your stack and the collaboration outcome you're chasing."
            />
            <div className="lp-bento">
              {CONSULT_CARDS.map((card) => (
                <article className="lp-card hcard" key={card.title}>
                  <div className="lp-card-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.image} alt="" aria-hidden="true" />
                  </div>
                  <div className="lp-card-body">
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section--alt">
          <div className="lp-wrap">
            <SectionHead
              eyebrow="How it works"
              heading="From booking to a scoped plan in three steps"
            />
            <div className="lp-steps">
              {PROCESS_STEPS.map((item) => (
                <div className="lp-step" key={item.step}>
                  <span className="lp-step-num">Step {item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LandingFaq heading="Questions before you book" items={CONSULT_FAQ} />

        <CtaBanner
          dark
          kicker="Talk to the team"
          heading="Book a free consultation with our product and design team."
          ctaLabel="Book a slot"
          ctaHref="#calendly"
          microcopy="Free for early-stage teams."
        />
      </LandingShell>
    </>
  );
}
