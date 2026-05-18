// /yc — Velt for Y Combinator companies.
//
// Live velt.dev/yc pitches: "Make Something People Want" → ship the
// collaborative features users expect from the best YC companies, get YC
// pricing ($499/mo for the first year for teams under $1M ARR), and
// implement in ~1 week instead of the 4-5 months an in-house build takes.
//
// Composition mirrors /consult: dark decorated PageHero → trusted logos →
// light "what's included" Security card grid → "How to claim" process
// section → customer carousel → FAQ → GetStartedSteps → footer. All
// chrome is reused from the homepage so this page feels native to the
// marketing site.

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

const YC_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "For YC", url: `${SITE_URL}/yc` },
]);

const YC_WEBPAGE = buildWebPageSchema({
  name: "For YC | Velt",
  description:
    "Y Combinator companies get $499/mo for the first year on Velt — ship comments, notifications, multiplayer editing, presence, and cursors in about a week instead of 4-5 months.",
  url: `${SITE_URL}/yc`,
  breadcrumb: YC_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "For YC",
  description:
    "Y Combinator companies get $499/mo for the first year on Velt — ship comments, notifications, multiplayer editing, presence, and cursors in about a week instead of 4-5 months.",
  path: "/yc",
  ogImage: "/og/yc.png",
});

// Four "what's included" cards rendered through the Security component's
// 2x2 grid. Copy is sourced from the live velt.dev/yc "features included
// with Velt" list. Imagery reuses existing /images/security PNGs — the
// live page does not expose unique YC-batch artwork.
const YC_CARDS: SecurityCardData[] = [
  {
    title: "Managed real-time infra",
    subtitle:
      "Skip months of WebSocket, presence, and CRDT plumbing. Velt runs the infrastructure so your engineers stay focused on your core product.",
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
    title: "Full feature suite",
    subtitle:
      "Comments, notifications, recordings, multiplayer editing, presence, cursors, huddles, and reactions — all in one SDK with one bill.",
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
    title: "Pre-built data models",
    subtitle:
      "Schemas, optimized data models, and cross-browser compatibility ship with the SDK. No reinventing the wheel for every collaboration primitive.",
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
    title: "Enterprise-grade encryption",
    subtitle:
      "SOC 2 Type II and HIPAA-ready encryption, audit logs, and granular access controls — the security posture your enterprise customers will ask for on day one.",
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

// YC-specific FAQ items prepended to the shared FAQ. Covers the
// questions a YC founder has before claiming the deal — eligibility,
// expiry, and what happens after the discounted year.
const ycFAQ: FaqEntry[] = [
  {
    question: "Who is eligible for the YC pricing?",
    answer:
      "Any Y Combinator company making less than $1M ARR. The discount applies for your first year on Velt, regardless of which batch you're in.",
  },
  {
    question: "How much does it cost?",
    answer:
      "$499/month for the first year, flat. After the first year you move onto standard Velt pricing — book a call and we'll walk through the numbers based on your usage.",
  },
  {
    question: "What's included in the YC plan?",
    answer:
      "The full Velt feature suite — Comments, Notifications, Recordings, Multiplayer Editing, Live State Sync, Live Selection, Huddle, Presence, Cursors, and Reactions — plus the managed infrastructure, pre-built schemas, and enterprise-grade encryption that ship with every Velt account.",
  },
  {
    question: "How do I claim it?",
    answer:
      "Get a free API key, then book a 30-minute call with the Velt team and mention you're a YC company. We'll verify your batch and apply the YC pricing to your account.",
  },
  ...sharedFAQ,
];

// Three-step "How to claim" process. Plain dark cards on a light grey
// panel — this is the engagement flow, not the SDK flow, so reusing
// GetStartedSteps would be misleading. Matches the ProcessSection
// pattern in app/consult/page.tsx.
const PROCESS_STEPS: Array<{ step: string; title: string; body: string }> = [
  {
    step: "01",
    title: "Get a free API key",
    body: "Sign up at console.velt.dev with your YC email so we can verify your batch. Start integrating immediately — no call required to start.",
  },
  {
    step: "02",
    title: "Book a 30-min call",
    body: "Pick a time that works. We'll review your use case, map Velt features onto your product, and answer any integration questions.",
  },
  {
    step: "03",
    title: "Ship in a week",
    body: "Most YC teams go live in under a week. We pair you with a Velt engineer in a private Slack channel so blockers clear fast.",
  },
];

function ProcessSection() {
  return (
    <section
      id="yc-deal"
      className="flex flex-col items-center bg-white w-full px-6 lg:px-20"
      style={{
        paddingTop: "clamp(80px, 9vw, 100px)",
        paddingBottom: "clamp(80px, 9vw, 100px)",
        gap: 52,
        scrollMarginTop: 100,
      }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 16, maxWidth: 820 }}
      >
        <span
          className="font-urbanist font-semibold uppercase"
          style={{
            color: "var(--color-velt-purple, #625df5)",
            fontSize: 12,
            letterSpacing: "0.6px",
          }}
        >
          The YC deal
        </span>
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
          $499/mo for your first year
        </h2>
        <p
          className="font-urbanist"
          style={{
            fontSize: "clamp(16px, 1.5vw, 20px)",
            lineHeight: 1.4,
            color: "#000",
            opacity: 0.6,
            margin: 0,
          }}
        >
          YC teams making less than $1M ARR get a year of special pricing.
          Three steps to claim.
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
                color: "var(--color-velt-purple, #625df5)",
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

      <div className="flex flex-wrap items-center justify-center" style={{ gap: 12 }}>
        <a
          href="https://console.velt.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg font-urbanist font-semibold whitespace-nowrap"
          style={{
            background: "var(--color-velt-purple, #625df5)",
            color: "#fff",
            height: 44,
            padding: "8px 16px",
            fontSize: 16,
            letterSpacing: "-0.03em",
            textDecoration: "none",
          }}
        >
          Get Free API Key
        </a>
        <a
          href="/book-demo"
          className="inline-flex items-center justify-center rounded-lg font-urbanist font-semibold whitespace-nowrap"
          style={{
            color: "#000",
            height: 44,
            padding: "8px 16px",
            border: "2px solid #625df5",
            fontSize: 16,
            letterSpacing: "-0.03em",
            textDecoration: "none",
          }}
        >
          Book a call
        </a>
      </div>
    </section>
  );
}

export default function YcPage() {
  return (
    <>
      <JsonLd id="ld-yc-webpage" data={YC_WEBPAGE} />
      <JsonLd id="ld-yc-breadcrumb" data={YC_BREADCRUMB} />
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated
          eyebrow={{ label: "$499/mo for YC teams under $1M ARR", dotColor: "#FFCD2E" }}
          heading="Make something people want"
          subheading="Ship the high-quality collaborative features users expect from the best YC companies — comments, notifications, multiplayer editing, presence, and cursors. Live in a week, not 4-5 months."
          primaryCta={{ label: "Book a call", href: "/book-demo" }}
          secondaryCta={{
            label: "Get free API key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
        />

        <TrustedLogos />

        <Security
          heading="What's included"
          subheading="Every YC account ships with the full Velt feature suite and the infrastructure to scale it."
          primaryCta={{ label: "View Docs", href: "https://velt.dev/docs/" }}
          secondaryCta={{ label: "Book a call", href: "/book-demo" }}
          cards={YC_CARDS}
          certification={null}
          testimonial={null}
          paddingTop={150}
          paddingBottom={80}
        />

        <ProcessSection />

        <FeatureCustomerCarousel
          heading="Trusted by YC teams"
          subheading="From new YC batches to companies acquired by Workday, founders use Velt to ship collaboration in days."
        />

        <LibraryFAQ items={ycFAQ} />

        <GetStartedSteps />

        <Footer />
      </div>
    </>
  );
}
