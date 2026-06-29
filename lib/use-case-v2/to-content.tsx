import {
  CONSOLE_HREF,
  DEFAULT_ROW_EYEBROWS,
  DEMO_HREF,
  USE_CASE_ENTERPRISE,
  USE_CASE_LIBRARIES,
  USE_CASE_LOGO_STRIP,
  USE_CASE_TESTIMONIALS,
  buildUseCaseFinalCta,
} from "@/components/use-case-new/content";
import type {
  UseCaseHeroContent,
  UseCaseRow,
  UseCaseRowsContent,
  UseCaseSpokeContent,
} from "@/components/use-case-new/content";
import type { CtaLink, FaqContent } from "@/components/feature-new/content";

// Maps a Sanity `useCasePage` document into the typed UseCaseSpokeContent the
// new-theme UseCaseSpokeView renders. Preserves the old page's behaviour:
// benefits[] is preferred over the legacy sections[] scaffold, eyebrows fall
// back to Build/Review/Approve/Scale, image positions alternate, and the
// show* toggles gate the libraries / testimonials / enterprise sections.

const DEFAULT_PRIMARY_CTA: CtaLink = {
  label: "Get Free API Key",
  href: CONSOLE_HREF,
  newTab: true,
};
const DEFAULT_SECONDARY_CTA: CtaLink = { label: "Book Demo", href: DEMO_HREF };

const ROWS_KICKER = "Capabilities";
const ROWS_HEADING = "What you can build with Velt";
const FAQ_KICKER = "FAQ";
const FAQ_HEADING = "Frequently asked questions";
const FINAL_CTA_TITLE = "Add collaboration to your product today.";

type SanityCtaLink = {
  label?: string | null;
  href?: string | null;
  newTab?: boolean | null;
};

type SanityFeature = {
  _key?: string;
  name?: string | null;
  label?: string | null;
  link?: string | null;
  href?: string | null;
};

type SanitySection = {
  _key?: string;
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  features?: SanityFeature[] | null;
  image?: string | null;
  imagePosition?: "left" | "right" | null;
};

type SanityBenefit = {
  _key?: string;
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  imageSrc?: string | null;
  useCases?: SanityFeature[] | null;
};

export type UseCasePageDoc = {
  title?: string | null;
  slug?: string | null;
  hero: {
    eyebrow?: string | null;
    heading?: string | null;
    subheading?: string | null;
    primaryCta?: SanityCtaLink | null;
    secondaryCta?: SanityCtaLink | null;
  };
  sections?: SanitySection[] | null;
  benefits?: SanityBenefit[] | null;
  showLibrarySection?: boolean | null;
  showCustomerUI?: boolean | null;
  showSecurity?: boolean | null;
  showCustomerCarousel?: boolean | null;
  faq?: { items?: Array<{ question?: string | null; answer?: string | null }> | null } | null;
};

/**
 * Resolve a Sanity CTA link to the feature-new CtaLink shape, falling back to a
 * default when the document does not supply one.
 * @param {SanityCtaLink | null | undefined} cta The raw Sanity CTA.
 * @param {CtaLink} fallback The default CTA to use when fields are missing.
 * @returns {CtaLink} The resolved CTA link.
 */
function resolveCta(cta: SanityCtaLink | null | undefined, fallback: CtaLink): CtaLink {
  try {
    if (!cta?.label && !cta?.href) {
      return fallback;
    }
    return {
      label: cta?.label ?? fallback.label,
      href: cta?.href ?? fallback.href,
      newTab: cta?.newTab ?? fallback.newTab,
    };
  } catch (error) {
    console.error("resolveCta failed", error);
    return fallback;
  }
}

/**
 * Map a legacy `sections[]` entry to a feature row.
 * @param {SanitySection} section The Sanity section.
 * @param {number} index The section index (drives alternating media side).
 * @returns {UseCaseRow} The mapped row.
 */
function mapSectionToRow(section: SanitySection, index: number): UseCaseRow {
  try {
    return {
      key: section._key ?? `section-row-${index}`,
      eyebrow: section.eyebrow ?? DEFAULT_ROW_EYEBROWS[index] ?? "",
      heading: section.heading ?? "",
      description: section.description ?? "",
      chips: (section.features ?? [])
        .filter((feature) => Boolean(feature?.label ?? feature?.name))
        .map((feature) => ({
          label: (feature.label ?? feature.name) as string,
          href: feature.href ?? feature.link ?? null,
        })),
      imageSrc: section.image ?? null,
      imagePosition: section.imagePosition ?? (index % 2 === 0 ? "right" : "left"),
    };
  } catch (error) {
    console.error("mapSectionToRow failed", error);
    return {
      key: `section-row-${index}`,
      eyebrow: "",
      heading: "",
      description: "",
      chips: [],
      imageSrc: null,
      imagePosition: index % 2 === 0 ? "right" : "left",
    };
  }
}

/**
 * Map a `benefits[]` entry (the preferred per-page content) to a feature row.
 * @param {SanityBenefit} benefit The Sanity benefit.
 * @param {number} index The benefit index (drives eyebrow + media side).
 * @returns {UseCaseRow} The mapped row.
 */
function mapBenefitToRow(benefit: SanityBenefit, index: number): UseCaseRow {
  try {
    return {
      key: benefit._key ?? `benefit-row-${index}`,
      eyebrow: benefit.tag ?? DEFAULT_ROW_EYEBROWS[index] ?? "",
      heading: benefit.title ?? "",
      description: benefit.description ?? "",
      chips: (benefit.useCases ?? [])
        .filter((useCase) => Boolean(useCase?.name ?? useCase?.label))
        .map((useCase) => ({
          label: (useCase.name ?? useCase.label) as string,
          href: useCase.link ?? useCase.href ?? null,
        })),
      imageSrc: benefit.imageSrc ?? null,
      imagePosition: index % 2 === 0 ? "right" : "left",
    };
  } catch (error) {
    console.error("mapBenefitToRow failed", error);
    return {
      key: `benefit-row-${index}`,
      eyebrow: "",
      heading: "",
      description: "",
      chips: [],
      imageSrc: null,
      imagePosition: index % 2 === 0 ? "right" : "left",
    };
  }
}

/**
 * Build the feature-rows section, preferring benefits[] over the legacy
 * sections[] scaffold (mirrors the old page's resolution logic).
 * @param {UseCasePageDoc} doc The use-case document.
 * @returns {UseCaseRowsContent} The rows section content.
 */
function buildRows(doc: UseCasePageDoc): UseCaseRowsContent {
  try {
    const benefitRows = (doc.benefits ?? []).map(mapBenefitToRow);
    const rows =
      benefitRows.length > 0 ? benefitRows : (doc.sections ?? []).map(mapSectionToRow);
    return { kicker: ROWS_KICKER, heading: ROWS_HEADING, rows };
  } catch (error) {
    console.error("buildRows failed", error);
    return { kicker: ROWS_KICKER, heading: ROWS_HEADING, rows: [] };
  }
}

/**
 * Build the FAQ content from the document's faq.items.
 * @param {UseCasePageDoc} doc The use-case document.
 * @returns {FaqContent} The FAQ section content.
 */
function buildFaq(doc: UseCasePageDoc): FaqContent {
  try {
    const items = (doc.faq?.items ?? [])
      .filter((item) => Boolean(item?.question))
      .map((item) => ({ q: item.question as string, a: item.answer ?? "" }));
    return { kicker: FAQ_KICKER, heading: FAQ_HEADING, items };
  } catch (error) {
    console.error("buildFaq failed", error);
    return { kicker: FAQ_KICKER, heading: FAQ_HEADING, items: [] };
  }
}

/**
 * Map a Sanity useCasePage document into the typed content the new-theme
 * UseCaseSpokeView consumes.
 * @param {UseCasePageDoc} doc The use-case document.
 * @returns {UseCaseSpokeContent} The mapped page content.
 */
export function toUseCaseSpokeContent(doc: UseCasePageDoc): UseCaseSpokeContent {
  const hero: UseCaseHeroContent = {
    kicker: doc.hero?.eyebrow ?? undefined,
    title: doc.hero?.heading ?? "",
    secondary: doc.hero?.subheading ?? undefined,
    primaryCta: resolveCta(doc.hero?.primaryCta, DEFAULT_PRIMARY_CTA),
    secondaryCta: resolveCta(doc.hero?.secondaryCta, DEFAULT_SECONDARY_CTA),
  };

  const showLibrary = doc.showLibrarySection !== false;
  const showSecurity = doc.showSecurity !== false;
  const showProof = doc.showCustomerUI !== false || doc.showCustomerCarousel !== false;

  return {
    slug: doc.slug ?? "",
    hero,
    logoStrip: USE_CASE_LOGO_STRIP,
    rows: buildRows(doc),
    libraries: showLibrary ? USE_CASE_LIBRARIES : null,
    testimonials: showProof ? USE_CASE_TESTIMONIALS : null,
    enterprise: showSecurity ? USE_CASE_ENTERPRISE : null,
    faq: buildFaq(doc),
    finalCta: buildUseCaseFinalCta(FINAL_CTA_TITLE),
  };
}
