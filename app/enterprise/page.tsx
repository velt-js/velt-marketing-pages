// /enterprise — the enterprise landing page, restyled onto the new editorial
// .vlp design system. Composition: light hero, trusted-by logo marquee, the
// four enterprise pillars in a tabbed band, a Support bento, a Security bento
// with the SOC 2 / HIPAA certification pill, the interactive customer
// showcase, and a dark conversion CTA banner, inside the shared Nav/Footer.
//
// Pillar anchor ids (#self-hosting, #compliance-tools, #advanced-encryption,
// #access-controls) live inside EnterprisePillars; #support and #security land
// on the two bento sections below.

import LandingShell from "@/components/landing-new/LandingShell";
import LandingHero from "@/components/landing-new/LandingHero";
import SectionHead from "@/components/landing-new/SectionHead";
import LogoStripBand from "@/components/landing-new/LogoStripBand";
import EnterprisePillars from "@/components/landing-new/EnterprisePillars";
import CustomerShowcase from "@/components/home-new/CustomerShowcase";
import CtaBanner from "@/components/home-new/CtaBanner";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const CONSOLE_URL = "https://console.velt.dev/";

const ENTERPRISE_DESCRIPTION =
  "Access self-hosting, custom encryption, dedicated support, and full data control with 99.999% uptime. SOC 2 Type II, HIPAA BAA, and enterprise-grade SLAs.";

const ENTERPRISE_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Enterprise", url: `${SITE_URL}/enterprise` },
]);

const ENTERPRISE_WEBPAGE = buildWebPageSchema({
  name: "Velt for Enterprise — Self-hosting, Compliance & Dedicated Support",
  description: ENTERPRISE_DESCRIPTION,
  url: `${SITE_URL}/enterprise`,
  breadcrumb: ENTERPRISE_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Velt for Enterprise — Self-hosting, Compliance & Dedicated Support",
  description: ENTERPRISE_DESCRIPTION,
  path: "/enterprise",
  ogImage: "/og/enterprise.png",
});

// Support bento: two cards on top + one wide card on the bottom.
const SUPPORT_CARDS: Array<{ title: string; body: string; image: string }> = [
  {
    title: "Complimentary design and implementation support",
    body: "We help you design and ship your collaboration layer, from onboarding through deployment.",
    image: "/images/enterprise/support/design-support.jpg",
  },
  {
    title: "Dedicated CSM",
    body: "A dedicated customer success manager embedded in your workflow via a shared Slack channel.",
    image: "/images/enterprise/support/dedicated-csm.jpg",
  },
];

// Security bento: two cards on top + the certification pill on the bottom.
const SECURITY_CARDS: Array<{ title: string; body: string; image: string }> = [
  {
    title: "Multi region hosting",
    body: "Host your data where you need it, with multi-region deployment options.",
    image: "/images/security/Mutli%20Region%20Hosting.png",
  },
  {
    title: "Isolated servers and data storage",
    body: "Your customer data is logically isolated and never co-mingled with other tenants.",
    image: "/images/security/Isolated%20Data.png",
  },
];

/**
 * The Velt for Enterprise landing page.
 * @returns {JSX.Element} The rendered page.
 */
export default function EnterprisePage() {
  return (
    <>
      <JsonLd id="ld-enterprise-webpage" data={ENTERPRISE_WEBPAGE} />
      <JsonLd id="ld-enterprise-breadcrumb" data={ENTERPRISE_BREADCRUMB} />

      <LandingShell>
        <LandingHero
          eyebrow="Enterprise"
          heading="The collaboration stack for enterprise"
          subheading="Access self-hosting, custom encryption, dedicated support, and full data control with 99.999% uptime."
          primaryCta={{ label: "Book Demo", href: "/book-demo" }}
          secondaryCta={{ label: "Get Free API Key", href: CONSOLE_URL, newTab: true }}
        />

        <LogoStripBand alt />

        <EnterprisePillars />

        {/* Support — two cards on top, priority SLAs as the wide bottom card. */}
        <section id="support" className="lp-section lp-section--alt" style={{ scrollMarginTop: 100 }}>
          <div className="lp-wrap">
            <SectionHead
              eyebrow="Support"
              heading="Support so seamless, it feels in-house"
              subheading="Expert support embedded in your workflow, from onboarding to deployment."
            />
            <div className="lp-cta-row" style={{ marginBottom: 32 }}>
              <a className="lp-btn-primary hdark" href="https://velt.dev/docs/" target="_blank" rel="noopener">
                View Docs
              </a>
              <a className="lp-btn-secondary houtline" href="/book-demo">
                Request Demo
              </a>
            </div>
            <div className="lp-bento lp-bento--2col">
              {SUPPORT_CARDS.map((card) => (
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
              <article className="lp-card lp-card--wide">
                <div className="lp-card-body">
                  <h3>Priority support SLAs</h3>
                  <p>Guaranteed response times so your team is never blocked.</p>
                </div>
                <div className="lp-wide-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/enterprise/support/slas.jpg" alt="" aria-hidden="true" />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Security — two cards on top, SOC 2 / HIPAA certification pill below. */}
        <section id="security" className="lp-section" style={{ scrollMarginTop: 100 }}>
          <div className="lp-wrap">
            <SectionHead
              eyebrow="Security"
              heading="Everything you need to keep your data safe and secure"
              subheading="All components come with different modes and setups to fit your app perfectly."
            />
            <div className="lp-cta-row" style={{ marginBottom: 32 }}>
              <a className="lp-btn-primary hdark" href="https://trust.velt.dev/" target="_blank" rel="noopener">
                Visit Trust Centre
              </a>
              <a className="lp-btn-secondary houtline" href="/book-demo">
                Request Demo
              </a>
            </div>
            <div className="lp-bento lp-bento--2col">
              {SECURITY_CARDS.map((card) => (
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
              <div className="lp-cert">
                <div className="lp-card-body" style={{ padding: 0 }}>
                  <h3>Security certification</h3>
                  <p>SOC 2 Type II, HIPAA with BAA.</p>
                </div>
                <div className="lp-cert-badges">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/security/badge-soc2.png" alt="AICPA SOC 2" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/security/badge-hipaa.png" alt="HIPAA" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <CustomerShowcase />

        <CtaBanner
          dark
          kicker="See it live"
          heading="Watch Velt run on your own product."
          ctaLabel="Book Demo"
          ctaHref="/book-demo"
          microcopy="30 minutes, with an engineer, not a sales deck."
        />
      </LandingShell>
    </>
  );
}
