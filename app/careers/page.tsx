// /careers — Velt careers landing page.
//
// Composition mirrors /features and /customers: dark PageHero → trusted
// logos → light card sections (mission, open roles, perks) → get started
// → footer. The live velt.dev/careers URL 308-redirects to YC's
// workatastartup listing; this page surfaces the same roles directly on
// velt.dev so the careers nav link lands on a real, branded page.
//
// Role data is currently a static list of placeholders sourced from the
// YC company page. When Velt adopts a CMS for jobs (Sanity / Greenhouse
// feed / Ashby), replace OPEN_ROLES with the live feed.
// TODO: replace with live data once roles are in Sanity or a CMS feed.

import Link from "next/link";

import { Footer } from "@/components/home/Footer";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const CAREERS_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Careers", url: `${SITE_URL}/careers` },
]);

const CAREERS_WEBPAGE = buildWebPageSchema({
  name: "Careers | Velt",
  description:
    "Join Velt: building the collaboration layer of the internet. Open roles across engineering, support, and QA. Remote-first, ex-Google founders, YC W22.",
  url: `${SITE_URL}/careers`,
  breadcrumb: CAREERS_BREADCRUMB,
});

export const metadata = buildPageMetadata({
  title: "Careers",
  description:
    "Join Velt: building the collaboration layer of the internet. Open roles across engineering, support, and QA. Remote-first, ex-Google founders, YC W22.",
  path: "/careers",
  ogImage: "/og/careers.png",
});

type OpenRole = {
  title: string;
  location: string;
  employmentType: string;
  experience: string;
  applyUrl: string;
};

// Roles sourced from https://www.ycombinator.com/companies/velt/jobs.
// Each `applyUrl` is the YC workatastartup signup link; that's where the
// live careers redirect points today, so we preserve the same flow.
const OPEN_ROLES: OpenRole[] = [
  {
    title: "Founding Test Automation Engineer",
    location: "India / Remote",
    employmentType: "Full-time",
    experience: "3+ years",
    applyUrl:
      "https://account.ycombinator.com/authenticate?continue=https%3A%2F%2Fwww.workatastartup.com%2Fapplication%3Fsignup_job_id%3D76854",
  },
  {
    title: "Founding Support Engineer",
    location: "San Francisco, CA / Remote (US, CA)",
    employmentType: "Full-time",
    experience: "New grads ok",
    applyUrl:
      "https://account.ycombinator.com/authenticate?continue=https%3A%2F%2Fwww.workatastartup.com%2Fapplication%3Fsignup_job_id%3D76853",
  },
  {
    title: "Software Engineer (Backend leaning)",
    location: "India / Remote",
    employmentType: "Full-time",
    experience: "3+ years",
    applyUrl:
      "https://account.ycombinator.com/authenticate?continue=https%3A%2F%2Fwww.workatastartup.com%2Fapplication%3Fsignup_job_id%3D72126",
  },
  {
    title: "Software Engineer (Frontend leaning)",
    location: "India / Remote",
    employmentType: "Full-time",
    experience: "3+ years",
    applyUrl:
      "https://account.ycombinator.com/authenticate?continue=https%3A%2F%2Fwww.workatastartup.com%2Fapplication%3Fsignup_job_id%3D64525",
  },
];

type Perk = {
  title: string;
  description: string;
};

const PERKS: Perk[] = [
  {
    title: "Remote-first",
    description:
      "Work from anywhere on the planet. We hire across time zones and optimise for async communication.",
  },
  {
    title: "Meaningful equity",
    description:
      "Every full-time hire receives a meaningful equity grant. Build long-term value alongside the founding team.",
  },
  {
    title: "Health & wellness",
    description:
      "Comprehensive health coverage for you and your dependents, plus wellness stipends to keep you at your best.",
  },
  {
    title: "Learning budget",
    description:
      "Annual budget for books, conferences, and courses. We invest in your growth as you invest in ours.",
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd id="ld-careers-webpage" data={CAREERS_WEBPAGE} />
      <JsonLd id="ld-careers-breadcrumb" data={CAREERS_BREADCRUMB} />
      <div className="relative bg-black text-white font-urbanist w-full overflow-x-hidden">
        <PageHero
          decorated
          eyebrow={{ label: "We're hiring", dotColor: "#86efac" }}
          heading="Build the collaboration layer of the internet"
          subheading="Velt is on a mission to redefine how people work together online. Join a small, technical team of builders, backed by Y Combinator and trusted by Google, Pendo, Runway, and 50+ companies."
          primaryCta={{
            label: "View open roles",
            href: "#open-roles",
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <TrustedLogos />

        <MissionSection />

        <OpenRolesSection roles={OPEN_ROLES} />

        <PerksSection perks={PERKS} />

        <Footer />
      </div>
    </>
  );
}

// MissionSection — white card with rounded top corners that curves into
// the dark hero/logo strip above. Mirrors the "rounded white panel"
// pattern from /customers (app/customers/page.tsx:82).
function MissionSection() {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg px-6 lg:px-20"
      style={{
        paddingTop: "clamp(80px, 12vw, 120px)",
        paddingBottom: "clamp(60px, 9vw, 100px)",
        marginTop: 60,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
      }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 24, maxWidth: 820 }}
      >
        <span
          className="font-urbanist font-semibold uppercase"
          style={{
            color: "var(--color-velt-purple, #625df5)",
            fontSize: 12,
            letterSpacing: "0.6px",
          }}
        >
          Our mission
        </span>
        <h2
          className="font-urbanist font-bold"
          style={{
            color: "#111",
            fontSize: "clamp(28px, 4.2vw, 52px)",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Reduce coordination time by 90%
        </h2>
        <p
          className="font-urbanist"
          style={{
            color: "#000",
            opacity: 0.7,
            fontSize: "clamp(16px, 1.5vw, 20px)",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          We&apos;re building drop-in collaboration primitives (comments,
          presence, cursors, huddles, notifications) that ship in days, not
          months. Velt is the infrastructure powering the next generation of
          multiplayer SaaS, and we&apos;re looking for builders who want to
          shape it with us.
        </p>
      </div>
    </section>
  );
}

// OpenRolesSection — list of role cards. Each card links out to the YC
// workatastartup application flow. Layout is single-column for scan-
// ability; role rows are full-width with title + meta on the left and a
// chevron + Apply hint on the right.
function OpenRolesSection({ roles }: { roles: OpenRole[] }) {
  return (
    <section
      id="open-roles"
      className="flex flex-col items-center bg-white full-bleed-bg px-6 lg:px-20"
      style={{
        paddingTop: "clamp(40px, 6vw, 60px)",
        paddingBottom: "clamp(80px, 12vw, 120px)",
        scrollMarginTop: 100,
      }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 16, maxWidth: 820, marginBottom: 52 }}
      >
        <h2
          className="font-urbanist font-bold"
          style={{
            color: "#111",
            fontSize: "clamp(28px, 4.2vw, 52px)",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Open roles
        </h2>
        <p
          className="font-urbanist"
          style={{
            color: "#000",
            opacity: 0.6,
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          Don&apos;t see a fit? Email us at{" "}
          <a
            href="mailto:careers@velt.dev"
            style={{
              color: "var(--color-velt-purple, #625df5)",
              textDecoration: "underline",
            }}
          >
            careers@velt.dev
          </a>
          .
        </p>
      </div>

      <div
        className="flex flex-col w-full"
        style={{ maxWidth: 820, gap: 16 }}
      >
        {roles.map((role) => (
          <a
            key={role.title}
            href={role.applyUrl}
            target="_blank"
            rel="noopener"
            className="group flex flex-col lg:flex-row lg:items-center lg:justify-between"
            style={{
              background: "#f7f7f7",
              borderRadius: 16,
              padding: 32,
              gap: 16,
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.04)",
              transition: "background 200ms ease, transform 200ms ease",
            }}
          >
            <div className="flex flex-col" style={{ gap: 8 }}>
              <h3
                className="font-urbanist font-semibold"
                style={{
                  color: "#111",
                  fontSize: 24,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {role.title}
              </h3>
              <div
                className="flex flex-wrap items-center font-urbanist"
                style={{
                  color: "#000",
                  opacity: 0.6,
                  fontSize: 14,
                  lineHeight: 1.4,
                  gap: 12,
                }}
              >
                <span>{role.location}</span>
                <span aria-hidden style={{ opacity: 0.4 }}>
                  •
                </span>
                <span>{role.employmentType}</span>
                <span aria-hidden style={{ opacity: 0.4 }}>
                  •
                </span>
                <span>{role.experience}</span>
              </div>
            </div>

            <span
              className="inline-flex items-center justify-center rounded-lg font-urbanist font-semibold whitespace-nowrap"
              style={{
                background: "var(--color-velt-purple, #625df5)",
                color: "#fff",
                height: 40,
                padding: "8px 16px",
                fontSize: 14,
                letterSpacing: "-0.03em",
                alignSelf: "flex-start",
              }}
            >
              Apply
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

// PerksSection — 4-up grid of perk cards on a light grey panel.
// Visual chrome (F7F7F7 cards, 32px padding, 16px radius) follows
// DESIGN.md and the homepage Security cards pattern.
function PerksSection({ perks }: { perks: Perk[] }) {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg px-6 lg:px-20"
      style={{
        paddingTop: "clamp(40px, 6vw, 80px)",
        paddingBottom: "clamp(80px, 12vw, 120px)",
      }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 16, maxWidth: 820, marginBottom: 52 }}
      >
        <h2
          className="font-urbanist font-bold"
          style={{
            color: "#111",
            fontSize: "clamp(28px, 4.2vw, 52px)",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Working at Velt
        </h2>
        <p
          className="font-urbanist"
          style={{
            color: "#000",
            opacity: 0.6,
            fontSize: "clamp(16px, 1.5vw, 18px)",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          A small, technical team optimising for builders who want to own
          their craft.
        </p>
      </div>

      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          maxWidth: 1080,
        }}
      >
        {perks.map((perk) => (
          <article
            key={perk.title}
            style={{
              background: "#f7f7f7",
              borderRadius: 16,
              padding: 32,
              border: "1px solid rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              minHeight: 180,
            }}
          >
            <h3
              className="font-urbanist font-semibold"
              style={{
                color: "#111",
                fontSize: 24,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {perk.title}
            </h3>
            <p
              className="font-urbanist"
              style={{
                color: "#000",
                opacity: 0.6,
                fontSize: 16,
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {perk.description}
            </p>
          </article>
        ))}
      </div>

      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 24, marginTop: 64, maxWidth: 600 }}
      >
        <p
          className="font-urbanist"
          style={{
            color: "#000",
            opacity: 0.7,
            fontSize: 18,
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          Ready to build with us?
        </p>
        <div className="flex flex-wrap items-center justify-center" style={{ gap: 12 }}>
          <Link
            href="#open-roles"
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
            See open roles
          </Link>
          <a
            href="mailto:careers@velt.dev"
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
            careers@velt.dev
          </a>
        </div>
      </div>
    </section>
  );
}
