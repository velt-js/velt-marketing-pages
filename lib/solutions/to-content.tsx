import type { ReactNode } from "react";

import { resolveDemo } from "@/components/feature-new/demo-registry";
import type { CtaLink } from "@/components/feature-new/content";
import type { SolutionPageContent } from "@/components/solutions-new/content";

// Maps a Sanity `solutionPageV1` document (see sanity/queries.ts
// getSolutionPageBySlug) into the typed SolutionPageContent the shared
// SolutionPageView renders. Demo-preset keys resolve to ReactNodes via the
// shared demo registry; code stays a raw string (the feature-map card
// highlights it); the In-Production visual prefers an uploaded screenshot, else
// the demo preset.

const FALLBACK_CTA: CtaLink = { label: "", href: "#" };

type Nullable<T> = T | null | undefined;

interface RawCta {
  label?: string | null;
  href?: string | null;
  newTab?: boolean | null;
}
interface RawCtaBanner {
  title?: string | null;
  microcopy?: string | null;
  cta?: RawCta | null;
  variant?: "primary" | "secondary" | null;
}
interface RawHero {
  kicker?: string | null;
  title?: string | null;
  secondary?: string | null;
  microcopy?: string | null;
  primaryCta?: RawCta | null;
  secondaryCta?: RawCta | null;
  buildChip?: RawCta | null;
  visual?: string | null;
}
interface RawLogoStrip {
  label?: string | null;
  migration?: { label?: string | null; links?: RawCta[] | null } | null;
}
interface RawReviewReality {
  kicker?: string | null;
  heading?: string | null;
  items?: string[] | null;
  close?: string | null;
}
interface RawLoopBeat {
  num?: string | null;
  title?: string | null;
  body?: string | null;
  visual?: string | null;
  beta?: boolean | null;
  links?: RawCta[] | null;
}
interface RawTheLoop {
  kicker?: string | null;
  heading?: string | null;
  body?: string | null;
  beats?: RawLoopBeat[] | null;
  caption?: string | null;
}
interface RawFeatureCard {
  num?: string | null;
  name?: string | null;
  oneLiner?: string | null;
  link?: RawCta | null;
  code?: string | null;
  preview?: string | null;
  beta?: boolean | null;
}
interface RawFeatureMap {
  kicker?: string | null;
  heading?: string | null;
  support?: string | null;
  cards?: RawFeatureCard[] | null;
}
interface RawAgentLayer {
  kicker?: string | null;
  heading?: string | null;
  body?: string | null;
  visual?: string | null;
}
interface RawInProduction {
  kicker?: string | null;
  heading?: string | null;
  body?: string | null;
  metric?: string | null;
  quote?: string | null;
  who?: string | null;
  screenshotUrl?: string | null;
  visual?: string | null;
  ctaBanner?: RawCtaBanner | null;
}
interface RawComplianceItem {
  title?: string | null;
  body?: string | null;
  link?: RawCta | null;
}
interface RawCompliance {
  kicker?: string | null;
  heading?: string | null;
  lead?: string | null;
  items?: RawComplianceItem[] | null;
  note?: string | null;
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

export interface SolutionPageV1Doc {
  slug?: string | null;
  title?: string | null;
  breadcrumbLabel?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  hero?: RawHero | null;
  logoStrip?: RawLogoStrip | null;
  reviewReality?: RawReviewReality | null;
  theLoop?: RawTheLoop | null;
  featureMap?: RawFeatureMap | null;
  agentLayer?: RawAgentLayer | null;
  inProduction?: RawInProduction | null;
  compliance?: RawCompliance | null;
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
      href: raw.href ?? "#",
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
 * Map a raw CTA banner to the content shape.
 * @param {Nullable<RawCtaBanner>} raw The raw banner.
 * @returns {SolutionPageContent["inProduction"]["ctaBanner"]} The banner.
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
 * Convert a Sanity solutionPageV1 document into SolutionPageContent.
 * @param {SolutionPageV1Doc} doc The GROQ result for one solutions page.
 * @returns {SolutionPageContent} The typed content for SolutionPageView.
 */
export function toSolutionPageContent(doc: SolutionPageV1Doc): SolutionPageContent {
  const hero = doc.hero ?? {};
  const logoStrip = doc.logoStrip ?? {};
  const reviewReality = doc.reviewReality ?? {};
  const theLoop = doc.theLoop ?? {};
  const featureMap = doc.featureMap ?? {};
  const agentLayer = doc.agentLayer ?? {};
  const inProduction = doc.inProduction ?? {};
  const compliance = doc.compliance ?? {};
  const faq = doc.faq ?? {};
  const finalCta = doc.finalCta ?? {};

  const prodVisual: ReactNode = inProduction.screenshotUrl ? (
    <img
      src={inProduction.screenshotUrl}
      alt={inProduction.heading ?? ""}
      style={{ width: "100%", display: "block" }}
    />
  ) : (
    resolveDemo(inProduction.visual)
  );

  return {
    slug: doc.slug ?? "",

    hero: {
      kicker: hero.kicker ?? "",
      title: hero.title ?? "",
      secondary: hero.secondary ?? "",
      microcopy: hero.microcopy ?? "",
      primaryCta: mapCta(hero.primaryCta),
      secondaryCta: mapCta(hero.secondaryCta),
      buildChip: hero.buildChip ? mapCta(hero.buildChip) : undefined,
      visual: resolveDemo(hero.visual),
    },

    logoStrip: {
      label: logoStrip.label ?? "",
      migration: {
        label: logoStrip.migration?.label ?? "",
        links: mapCtas(logoStrip.migration?.links),
      },
    },

    reviewReality: {
      kicker: reviewReality.kicker ?? "",
      heading: reviewReality.heading ?? "",
      items: (reviewReality.items ?? []).filter((item): item is string => Boolean(item)),
      close: reviewReality.close ?? "",
    },

    theLoop: {
      kicker: theLoop.kicker ?? "",
      heading: theLoop.heading ?? "",
      body: theLoop.body ?? "",
      beats: (theLoop.beats ?? []).map((beat, index) => ({
        num: beat.num ?? String(index + 1),
        title: beat.title ?? "",
        body: beat.body ?? "",
        visual: resolveDemo(beat.visual),
        beta: beat.beta ?? undefined,
        links: mapCtas(beat.links),
      })),
      caption: theLoop.caption ?? undefined,
    },

    featureMap: {
      kicker: featureMap.kicker ?? "",
      heading: featureMap.heading ?? "",
      support: featureMap.support ?? "",
      cards: (featureMap.cards ?? []).map((card, index) => ({
        num: card.num ?? String(index + 1).padStart(2, "0"),
        name: card.name ?? "",
        oneLiner: card.oneLiner ?? "",
        link: mapCta(card.link),
        code: card.code ?? "",
        preview: resolveDemo(card.preview),
        beta: card.beta ?? undefined,
      })),
    },

    agentLayer: {
      kicker: agentLayer.kicker ?? "",
      heading: agentLayer.heading ?? "",
      body: agentLayer.body ?? "",
      visual: resolveDemo(agentLayer.visual),
    },

    inProduction: {
      kicker: inProduction.kicker ?? "",
      heading: inProduction.heading ?? "",
      body: inProduction.body ?? "",
      metric: inProduction.metric ?? undefined,
      quote: inProduction.quote ?? undefined,
      who: inProduction.who ?? undefined,
      visual: prodVisual,
      ctaBanner: mapBanner(inProduction.ctaBanner),
    },

    compliance: {
      kicker: compliance.kicker ?? "",
      heading: compliance.heading ?? "",
      lead: compliance.lead ?? "",
      items: (compliance.items ?? []).map((item) => ({
        title: item.title ?? "",
        body: item.body ?? "",
        link: item.link ? mapCta(item.link) : undefined,
      })),
      note: compliance.note ?? undefined,
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
