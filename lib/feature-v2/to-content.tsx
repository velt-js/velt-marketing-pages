import type { ReactNode } from "react";

import { resolveDemo, resolveIcon } from "@/components/feature-new/demo-registry";
import type {
  CtaLink,
  FeaturePageContent,
  IntegrationChip,
} from "@/components/feature-new/content";

// Maps a Sanity `featurePageV2` document (see sanity/queries.ts
// getFeaturePageV2BySlug) into the typed FeaturePageContent the shared
// FeaturePageView renders. Demo-preset keys resolve to ReactNodes via the demo
// registry; code stays a raw string (the section components highlight it); the
// In-Production tab visual prefers an uploaded screenshot, else the demo
// preset. This keeps a CMS-driven page byte-for-byte with its static reference.

const FALLBACK_CTA: CtaLink = { label: "", href: "#" };

// Canonical destinations used by the href normalizer below. Authored Sanity
// content (seeded from scripts/seed-feature-v2-*.mjs) still uses several stale
// URL conventions that 404 on the live site — e.g. bare feature slugs missing
// the `/new-features/` prefix, `/compare/*` and `/vs/*` (real route is
// `/comparison`), `/governance` (no such route), and `docs.velt.dev/quickstart/*`
// (moved to `/get-started/quickstart`). Normalizing here — the single point all
// feature-page links flow through — corrects every page at once without a
// destructive Sanity re-seed.
const FEATURE_BASE = "/new-features";
const COMPARISON_PATH = "/comparison";
const ENTERPRISE_PATH = "/enterprise";
const DOCS_QUICKSTART_URL = "https://docs.velt.dev/get-started/quickstart";
const DOCS_API_REFERENCE_URL = "https://docs.velt.dev/api-reference";

// The twelve v2 feature slugs. A bare `/<slug>` link (e.g. `/huddle`) is a stale
// reference that must carry the `/new-features/` prefix to resolve.
const FEATURE_SLUGS = new Set([
  "comments",
  "presence",
  "multiplayer-editing",
  "huddle",
  "recording",
  "suggestions",
  "approval-flows",
  "review-agents",
  "audit-trail",
  "notifications",
  "memory",
  "self-hosting",
]);

/**
 * Rewrite a stale authored href to its canonical, resolvable destination.
 * Deterministic and idempotent: hrefs that are already correct (or unrelated)
 * pass through unchanged.
 * @param {Nullable<string>} href The raw href from Sanity content.
 * @returns {string} The normalized href.
 */
function normalizeHref(href: Nullable<string>): string {
  try {
    if (!href || href === "#") return href ?? "#";

    // `/compare/<slug>` and `/vs/<slug>` -> the real comparison page.
    if (/^\/(compare|vs)\/[^/?#]+\/?$/.test(href)) return COMPARISON_PATH;

    // `/governance` has no route; point at the enterprise page.
    if (href === "/governance") return ENTERPRISE_PATH;

    // Bare feature slug missing the `/new-features/` prefix.
    const bareSlugMatch = href.match(/^\/([^/?#]+)\/?$/);
    if (bareSlugMatch && FEATURE_SLUGS.has(bareSlugMatch[1])) {
      return `${FEATURE_BASE}/${bareSlugMatch[1]}`;
    }

    // Relocated docs quickstart (any per-framework subpath, either docs domain).
    if (/^https?:\/\/(docs\.velt\.dev|velt\.dev\/docs)\/quickstart(\/|$)/.test(href)) {
      return DOCS_QUICKSTART_URL;
    }

    // `api-reference/webhooks(/advanced)` 404s; fall back to the api-reference root.
    if (/^https?:\/\/docs\.velt\.dev\/api-reference\/webhooks(\/.*)?$/.test(href)) {
      return DOCS_API_REFERENCE_URL;
    }

    return href;
  } catch (error) {
    console.error("normalizeHref failed", error);
    return href ?? "#";
  }
}

type Nullable<T> = T | null | undefined;

interface RawCta {
  label?: string | null;
  href?: string | null;
  newTab?: boolean | null;
}
interface RawChip extends RawCta {
  icon?: string | null;
}
interface RawInterstitial {
  quote?: string | null;
  who?: string | null;
}
interface RawCtaBanner {
  title?: string | null;
  microcopy?: string | null;
  cta?: RawCta | null;
  variant?: "primary" | "secondary" | null;
}
interface RawHeroTab {
  id?: string | null;
  label?: string | null;
  demoPreset?: string | null;
}
interface RawHero {
  kicker?: string | null;
  title?: string | null;
  secondary?: string | null;
  accent?: string | null;
  microcopy?: string | null;
  primaryCta?: RawCta | null;
  secondaryCta?: RawCta | null;
  buildChip?: RawCta | null;
  demoTabs?: RawHeroTab[] | null;
}
interface RawLogoStrip {
  label?: string | null;
  migration?: { label?: string | null; links?: RawCta[] | null } | null;
}
interface RawWhatItIs {
  kicker?: string | null;
  heading?: string | null;
  body?: string | null;
  docLinks?: RawCta[] | null;
  scene?: string | null;
}
interface RawStep {
  kicker?: string | null;
  title?: string | null;
  filename?: string | null;
  code?: string | null;
  copyText?: string | null;
}
interface RawMcpTab {
  id?: string | null;
  label?: string | null;
  command?: string | null;
}
interface RawIntegrationGroup {
  label?: string | null;
  chips?: RawChip[] | null;
}
interface RawHowItWorks {
  kicker?: string | null;
  heading?: string | null;
  support?: string | null;
  steps?: RawStep[] | null;
  mechanics?: { heading?: string | null; body?: string | null; microcopy?: string | null } | null;
  buildVsBuy?: { heading?: string | null; items?: string[] | null; close?: string | null } | null;
  mcp?: { heading?: string | null; sub?: string | null; tabs?: RawMcpTab[] | null } | null;
  integrations?: RawIntegrationGroup[] | null;
  ctaBanner?: RawCtaBanner | null;
}
interface RawShowcaseCard {
  num?: string | null;
  name?: string | null;
  codeKicker?: string | null;
  headline?: string | null;
  preview?: string | null;
  code?: string | null;
  copyText?: string | null;
}
interface RawShowcase {
  kicker?: string | null;
  heading?: string | null;
  support?: string | null;
  cards?: RawShowcaseCard[] | null;
  docLinks?: RawCta[] | null;
  interstitial?: RawInterstitial | null;
}
interface RawDetailItem {
  label?: string | null;
  soon?: boolean | null;
}
interface RawDetails {
  kicker?: string | null;
  heading?: string | null;
  support?: string | null;
  visibleCount?: number | null;
  items?: RawDetailItem[] | null;
}
interface RawMakeCard {
  iconKey?: string | null;
  title?: string | null;
  body?: string | null;
  preview?: string | null;
  code?: string | null;
  copyText?: string | null;
}
interface RawMakeItYours {
  kicker?: string | null;
  heading?: string | null;
  support?: string | null;
  cards?: RawMakeCard[] | null;
  interstitial?: RawInterstitial | null;
}
interface RawProdTab {
  id?: string | null;
  label?: string | null;
  demoPreset?: string | null;
  screenshotUrl?: string | null;
  caption?: string | null;
  link?: RawCta | null;
}
interface RawInProduction {
  kicker?: string | null;
  heading?: string | null;
  support?: string | null;
  tabs?: RawProdTab[] | null;
  whereItFits?: { label?: string | null; links?: RawCta[] | null } | null;
  ctaBanner?: RawCtaBanner | null;
}
interface RawRelatedCard {
  iconKey?: string | null;
  title?: string | null;
  body?: string | null;
  visual?: string | null;
  link?: RawCta | null;
}
interface RawRelated {
  kicker?: string | null;
  heading?: string | null;
  support?: string | null;
  cards?: RawRelatedCard[] | null;
}
interface RawEnterprise {
  badges?: string[] | null;
  line?: string | null;
  links?: RawCta[] | null;
  cta?: RawCta | null;
}
interface RawTestimonialCard {
  metric?: string | null;
  quote?: string | null;
  who?: string | null;
}
interface RawTestimonials {
  kicker?: string | null;
  heading?: string | null;
  support?: string | null;
  cards?: RawTestimonialCard[] | null;
}
interface RawFaqItem {
  question?: string | null;
  answer?: string | null;
}
interface RawFaq {
  kicker?: string | null;
  heading?: string | null;
  items?: RawFaqItem[] | null;
}
interface RawFinalCta {
  title?: string | null;
  primaryCta?: RawCta | null;
  secondaryCta?: RawCta | null;
  microcopies?: string[] | null;
}

export interface FeaturePageV2Doc {
  slug?: string | null;
  title?: string | null;
  beta?: boolean | null;
  breadcrumbLabel?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  hero?: RawHero | null;
  logoStrip?: RawLogoStrip | null;
  whatItIs?: RawWhatItIs | null;
  howItWorks?: RawHowItWorks | null;
  showcase?: RawShowcase | null;
  details?: RawDetails | null;
  makeItYours?: RawMakeItYours | null;
  inProduction?: RawInProduction | null;
  related?: RawRelated | null;
  enterprise?: RawEnterprise | null;
  testimonials?: RawTestimonials | null;
  faq?: RawFaq | null;
  finalCta?: RawFinalCta | null;
}

/**
 * Map a raw Sanity ctaLink to a CtaLink, tolerating missing values.
 * @param {Nullable<RawCta>} raw The raw cta object.
 * @returns {CtaLink} A safe CtaLink.
 */
function mapCta(raw: Nullable<RawCta>): CtaLink {
  try {
    if (!raw) return FALLBACK_CTA;
    return {
      label: raw.label ?? "",
      href: normalizeHref(raw.href),
      newTab: raw.newTab ?? undefined,
    };
  } catch (error) {
    console.error("mapCta failed", error);
    return FALLBACK_CTA;
  }
}

/**
 * Map an array of raw ctaLinks to CtaLinks.
 * @param {Nullable<RawCta[]>} raw The raw cta list.
 * @returns {CtaLink[]} Mapped links.
 */
function mapCtas(raw: Nullable<RawCta[]>): CtaLink[] {
  try {
    return Array.isArray(raw) ? raw.map(mapCta) : [];
  } catch (error) {
    console.error("mapCtas failed", error);
    return [];
  }
}

/**
 * Build the enterprise trust line: the body text followed by any inline links
 * rendered as "See a and b.".
 * @param {string} line The trust-line body.
 * @param {CtaLink[]} links The inline links.
 * @returns {ReactNode} The composed line node.
 */
function buildEnterpriseLine(line: string, links: CtaLink[]): ReactNode {
  try {
    return (
      <>
        {line}
        {links.length > 0 ? (
          <>
            {" "}
            See{" "}
            {links.map((link, index) => (
              <span key={link.href} style={{ display: "contents" }}>
                {index > 0 ? (index === links.length - 1 ? " and " : ", ") : ""}
                <a
                  href={link.href}
                  target={link.newTab ? "_blank" : undefined}
                  rel={link.newTab ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              </span>
            ))}
            .
          </>
        ) : null}
      </>
    );
  } catch (error) {
    console.error("buildEnterpriseLine failed", error);
    return line;
  }
}

/**
 * Map a raw interstitial to the content shape, or undefined when absent.
 * @param {Nullable<RawInterstitial>} raw The raw interstitial.
 * @returns {{ quote: string; who: string } | undefined} The interstitial.
 */
function mapInterstitial(raw: Nullable<RawInterstitial>) {
  if (!raw) return undefined;
  return { quote: raw.quote ?? "", who: raw.who ?? "" };
}

/**
 * Map a raw CTA banner to the content shape.
 * @param {Nullable<RawCtaBanner>} raw The raw banner.
 * @returns {FeaturePageContent["howItWorks"]["ctaBanner"]} The banner.
 */
function mapBanner(raw: Nullable<RawCtaBanner>) {
  return {
    title: raw?.title ?? "",
    microcopy: raw?.microcopy ?? "",
    cta: mapCta(raw?.cta),
    variant: raw?.variant ?? undefined,
  };
}

/**
 * Convert a Sanity featurePageV2 document into FeaturePageContent.
 * @param {FeaturePageV2Doc} doc The GROQ result for one feature page.
 * @returns {FeaturePageContent} The typed content for FeaturePageView.
 */
export function toFeaturePageContent(doc: FeaturePageV2Doc): FeaturePageContent {
  const hero = doc.hero ?? {};
  const logoStrip = doc.logoStrip ?? {};
  const whatItIs = doc.whatItIs ?? {};
  const howItWorks = doc.howItWorks ?? {};
  const showcase = doc.showcase ?? {};
  const details = doc.details ?? {};
  const makeItYours = doc.makeItYours ?? {};
  const inProduction = doc.inProduction ?? {};
  const related = doc.related ?? {};
  const enterprise = doc.enterprise ?? {};
  const testimonials = doc.testimonials ?? {};
  const faq = doc.faq ?? {};
  const finalCta = doc.finalCta ?? {};

  return {
    slug: doc.slug ?? "",

    hero: {
      kicker: hero.kicker ?? "",
      beta: doc.beta ?? false,
      title: hero.title ?? "",
      secondary: hero.secondary ?? "",
      accent: hero.accent ?? "",
      primaryCta: mapCta(hero.primaryCta),
      secondaryCta: mapCta(hero.secondaryCta),
      microcopy: hero.microcopy ?? "",
      buildChip: mapCta(hero.buildChip),
      demoTabs: (hero.demoTabs ?? []).map((tab) => ({
        id: tab.id ?? "",
        label: tab.label ?? "",
        content: resolveDemo(tab.demoPreset),
      })),
    },

    logoStrip: {
      label: logoStrip.label ?? "",
      migration: {
        label: logoStrip.migration?.label ?? "",
        links: mapCtas(logoStrip.migration?.links),
      },
    },

    whatItIs: {
      kicker: whatItIs.kicker ?? "",
      heading: whatItIs.heading ?? "",
      body: whatItIs.body ?? "",
      docLinks: mapCtas(whatItIs.docLinks),
      scene: resolveDemo(whatItIs.scene),
    },

    howItWorks: {
      kicker: howItWorks.kicker ?? "",
      heading: howItWorks.heading ?? "",
      support: howItWorks.support ?? "",
      steps: (howItWorks.steps ?? []).map((step) => ({
        kicker: step.kicker ?? "",
        title: step.title ?? "",
        filename: step.filename ?? "",
        code: step.code ?? "",
        copyText: step.copyText ?? step.code ?? "",
      })),
      mechanics: {
        heading: howItWorks.mechanics?.heading ?? "",
        body: howItWorks.mechanics?.body ?? "",
        microcopy: howItWorks.mechanics?.microcopy ?? undefined,
      },
      buildVsBuy: {
        heading: howItWorks.buildVsBuy?.heading ?? "",
        items: howItWorks.buildVsBuy?.items ?? [],
        close: howItWorks.buildVsBuy?.close ?? "",
      },
      mcp: {
        heading: howItWorks.mcp?.heading ?? "",
        sub: howItWorks.mcp?.sub ?? "",
        tabs: (howItWorks.mcp?.tabs ?? []).map((tab) => ({
          id: tab.id ?? "",
          label: tab.label ?? "",
          command: tab.command ?? "",
        })),
      },
      integrations: (howItWorks.integrations ?? []).map((group) => ({
        label: group.label ?? "",
        chips: (group.chips ?? []).map(
          (chip): IntegrationChip => ({
            ...mapCta(chip),
            icon: chip?.icon ?? undefined,
          }),
        ),
      })),
      ctaBanner: mapBanner(howItWorks.ctaBanner),
    },

    showcase: {
      kicker: showcase.kicker ?? "",
      heading: showcase.heading ?? "",
      support: showcase.support ?? "",
      cards: (showcase.cards ?? []).map((card) => ({
        num: card.num ?? "",
        name: card.name ?? "",
        codeKicker: card.codeKicker ?? "",
        headline: card.headline ?? "",
        preview: resolveDemo(card.preview),
        code: card.code ?? "",
        copyText: card.copyText ?? card.code ?? "",
      })),
      docLinks: mapCtas(showcase.docLinks),
      interstitial: mapInterstitial(showcase.interstitial),
    },

    details: {
      kicker: details.kicker ?? "",
      heading: details.heading ?? "",
      support: details.support ?? "",
      items: (details.items ?? []).map((item) => ({
        label: item.label ?? "",
        soon: item.soon ?? undefined,
      })),
      visibleCount: details.visibleCount ?? 12,
    },

    makeItYours: {
      kicker: makeItYours.kicker ?? "",
      heading: makeItYours.heading ?? "",
      support: makeItYours.support ?? "",
      cards: (makeItYours.cards ?? []).map((card) => ({
        icon: resolveIcon(card.iconKey),
        title: card.title ?? "",
        body: card.body ?? "",
        preview: resolveDemo(card.preview),
        code: card.code ?? "",
        copyText: card.copyText ?? card.code ?? "",
      })),
      interstitial: mapInterstitial(makeItYours.interstitial),
    },

    inProduction: {
      kicker: inProduction.kicker ?? "",
      heading: inProduction.heading ?? "",
      support: inProduction.support ?? "",
      tabs: (inProduction.tabs ?? []).map((tab) => ({
        id: tab.id ?? "",
        label: tab.label ?? "",
        visual: tab.screenshotUrl ? (
          <img src={tab.screenshotUrl} alt={tab.label ?? ""} style={{ width: "100%", display: "block" }} />
        ) : (
          resolveDemo(tab.demoPreset)
        ),
        caption: tab.caption ?? "",
        link: mapCta(tab.link),
      })),
      whereItFits: {
        label: inProduction.whereItFits?.label ?? "",
        links: mapCtas(inProduction.whereItFits?.links),
      },
      ctaBanner: mapBanner(inProduction.ctaBanner),
    },

    related: {
      kicker: related.kicker ?? "",
      heading: related.heading ?? "",
      support: related.support ?? "",
      cards: (related.cards ?? []).map((card) => ({
        icon: resolveIcon(card.iconKey),
        title: card.title ?? "",
        body: card.body ?? "",
        visual: resolveDemo(card.visual),
        link: mapCta(card.link),
      })),
    },

    enterprise: {
      badges: enterprise.badges ?? [],
      line: buildEnterpriseLine(enterprise.line ?? "", mapCtas(enterprise.links)),
      cta: mapCta(enterprise.cta),
    },

    testimonials: {
      kicker: testimonials.kicker ?? "",
      heading: testimonials.heading ?? "",
      support: testimonials.support ?? "",
      cards: (testimonials.cards ?? []).map((card) => ({
        metric: card.metric ?? "",
        quote: card.quote ?? "",
        who: card.who ?? "",
      })),
    },

    faq: {
      kicker: faq.kicker ?? "",
      heading: faq.heading ?? "",
      items: (faq.items ?? []).map((item) => ({
        q: item.question ?? "",
        a: item.answer ?? "",
      })),
    },

    finalCta: {
      title: finalCta.title ?? "",
      primaryCta: mapCta(finalCta.primaryCta),
      secondaryCta: mapCta(finalCta.secondaryCta),
      microcopies: finalCta.microcopies ?? [],
    },
  };
}
