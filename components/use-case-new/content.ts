import type {
  CtaLink,
  EnterpriseContent,
  FaqContent,
  FinalCtaContent,
  LogoStripContent,
  TestimonialContent,
} from "@/components/feature-new/content";
import { allLibraryCards, libraryTabs } from "@/components/library/shared-content";
import { libraryLogo } from "@/components/libraries-new/library-logos";

// Typed content contract for the new-theme Use Case pages (hub index +
// per-use-case detail). Sections that match the feature-page system 1:1 reuse
// the feature-new types and components (logo strip, enterprise strip,
// testimonials, FAQ, final CTA); the use-case-specific sections (hero, card
// grid, alternating feature rows, libraries band) are defined here. The detail
// page is populated from Sanity via lib/use-case-v2/to-content.tsx; the hub is
// assembled from the existing static data in components/use-case/.

export type { CtaLink } from "@/components/feature-new/content";

// Shared destinations — repeated across hero, enterprise, and final CTA.
export const CONSOLE_HREF = "https://console.velt.dev/";
export const DEMO_HREF = "/book-demo";
export const TRUST_CENTER_HREF = "https://trust.velt.dev";

export type UseCaseHeroContent = {
  kicker?: string;
  title: string;
  secondary?: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  microcopy?: string;
};

export type UseCaseGridCard = {
  title: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type UseCaseGridContent = {
  kicker: string;
  heading: string;
  support?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  cards: UseCaseGridCard[];
};

export type UseCaseFeatureChip = { label: string; href?: string | null };

export type UseCaseRow = {
  key: string;
  eyebrow: string;
  heading: string;
  description: string;
  chips: UseCaseFeatureChip[];
  imageSrc?: string | null;
  imagePosition: "left" | "right";
};

export type UseCaseRowsContent = {
  kicker: string;
  heading: string;
  support?: string;
  rows: UseCaseRow[];
};

export type UseCaseLibraryCard = {
  name: string;
  logoSrc?: string;
  logoAlt?: string;
  category: string;
  docsHref: string;
  learnMoreHref?: string;
};

export type UseCaseLibrariesContent = {
  kicker: string;
  heading: string;
  support?: string;
  tabs: string[];
  cards: UseCaseLibraryCard[];
};

export type UseCaseHubContent = {
  hero: UseCaseHeroContent;
  logoStrip: LogoStripContent;
  grid: UseCaseGridContent;
  enterprise: EnterpriseContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
};

export type UseCaseSpokeContent = {
  slug: string;
  hero: UseCaseHeroContent;
  logoStrip: LogoStripContent;
  rows: UseCaseRowsContent;
  libraries?: UseCaseLibrariesContent | null;
  testimonials?: TestimonialContent | null;
  enterprise?: EnterpriseContent | null;
  faq: FaqContent;
  finalCta: FinalCtaContent;
};

// ---- Shared section defaults (reused by both the hub route and the spoke
// mapper so the two pages stay visually in sync) ----

export const USE_CASE_LOGO_STRIP: LogoStripContent = {
  label: "Trusted by top teams shipping collaboration to production.",
  migration: {
    label: "Moving off another vendor?",
    links: [
      { label: "Compare Velt", href: "/comparison" },
      { label: "Migration guide", href: "/migrate" },
    ],
  },
};

export const USE_CASE_ENTERPRISE: EnterpriseContent = {
  badges: ["SOC 2 Type II", "HIPAA with BAA", "Self-hosting", "Multi-region", "BYOK encryption"],
  line: "Per-feature data providers keep content and PII on your infrastructure, with SOC 2 Type II, HIPAA with a BAA, and bring-your-own-key encryption.",
  cta: { label: "View Trust Center", href: TRUST_CENTER_HREF, newTab: true },
};

// Metric-led social proof. Consolidates the two old customer sections
// (CustomerUI + FeatureCustomerCarousel) into the new TestimonialWall.
export const USE_CASE_TESTIMONIALS: TestimonialContent = {
  kicker: "Proof",
  heading: "Teams ship collaboration instead of building it.",
  support: "Real products, in production.",
  cards: [
    {
      metric: "< 1 week",
      quote:
        "We added comments, presence, and notifications to our editor in days, not the quarter we had scoped to build it ourselves.",
      who: "Engineering lead, AI-native SaaS",
    },
    {
      metric: "10+ surfaces",
      quote:
        "The same SDK powers collaboration across our docs, sheets, and canvas — one integration instead of three bespoke builds.",
      who: "Founder, productivity tool",
    },
    {
      metric: "0 infra owned",
      quote:
        "Realtime sync, presence, and storage are handled. Our team focuses on the product, not the collaboration plumbing.",
      who: "CTO, analytics platform",
    },
  ],
};

export const USE_CASE_LIBRARIES: UseCaseLibrariesContent = {
  kicker: "Libraries",
  heading: "Works seamlessly with your libraries",
  support: "Use 8+ purpose-built libraries — or integrate it yourself.",
  tabs: libraryTabs.map((tab) => tab.label),
  cards: allLibraryCards.map((card) => ({
    name: card.name,
    logoSrc: card.logoSrc,
    logoAlt: card.logoAlt ?? card.name,
    category: card.category,
    docsHref: card.docsHref,
    learnMoreHref: card.learnMoreHref,
  })),
};

// Friendly tab labels + order for the CMS-driven libraries grid, keyed by the
// libraryPageV2 `category` enum. Only surface libraries appear (plugins/agents
// are not "libraries"). Used by buildUseCaseLibrariesContent below.
const LIBRARY_TAB_LABELS: Record<string, string> = {
  "text-code-editors": "Text Editor",
  "documents-pdf": "Documents",
  "grids-tables": "Grids",
  "canvas-diagram": "Canvas",
  "charts-dataviz": "Charts",
};
const LIBRARY_TAB_ORDER = [
  "text-code-editors",
  "documents-pdf",
  "grids-tables",
  "canvas-diagram",
  "charts-dataviz",
];

const DOCS_URL = "https://velt.dev/docs/";

type LibraryRosterRow = {
  name?: string | null;
  slug?: string | null;
  kind?: string | null;
  category?: string | null;
};

/**
 * Build the "Works seamlessly with your libraries" grid from the live
 * libraryPageV2 roster (the same CMS collection that powers /libraries), so the
 * use-case grid always reflects every published surface library.
 * @param {LibraryRosterRow[]} roster The libraryPageV2 roster (getAllLibrariesV2).
 * @returns {UseCaseLibrariesContent} The CMS-driven libraries section content.
 */
export function buildUseCaseLibrariesContent(
  roster: LibraryRosterRow[],
): UseCaseLibrariesContent {
  try {
    const surfaces = (roster ?? []).filter(
      (row) => (row?.kind ?? "surface") === "surface" && row?.slug,
    );
    const cards: UseCaseLibraryCard[] = surfaces.map((row) => ({
      name: row.name ?? "",
      logoSrc: libraryLogo(row.slug ?? ""),
      logoAlt: row.name ?? "",
      category: LIBRARY_TAB_LABELS[row.category ?? ""] ?? "Other",
      docsHref: DOCS_URL,
      learnMoreHref: `/libraries/${row.slug}`,
    }));
    const presentTabs = LIBRARY_TAB_ORDER.filter((key) =>
      surfaces.some((row) => row.category === key),
    ).map((key) => LIBRARY_TAB_LABELS[key]);
    return {
      kicker: "Libraries",
      heading: "Works seamlessly with your libraries",
      support: `Use ${cards.length} purpose-built libraries or integrate them yourself.`,
      tabs: ["All", ...presentTabs],
      cards,
    };
  } catch (error) {
    console.error("buildUseCaseLibrariesContent failed", error);
    return USE_CASE_LIBRARIES;
  }
}

/**
 * Build the closing CTA shared by the hub and detail pages.
 * @param {string} title Headline restating the page's value.
 * @returns {FinalCtaContent} The final CTA content block.
 */
export function buildUseCaseFinalCta(title: string): FinalCtaContent {
  try {
    return {
      title,
      primaryCta: { label: "Get Free API Key", href: CONSOLE_HREF, newTab: true },
      secondaryCta: { label: "Book Demo", href: DEMO_HREF },
      microcopies: ["Free tier. No credit card.", "First integration in under a week."],
    };
  } catch (error) {
    console.error("buildUseCaseFinalCta failed", error);
    return {
      title,
      primaryCta: { label: "Get Free API Key", href: CONSOLE_HREF, newTab: true },
      secondaryCta: { label: "Book Demo", href: DEMO_HREF },
      microcopies: [],
    };
  }
}

// Eyebrow fallback for benefit rows with no explicit tag — mirrors the
// Build/Review/Approve pattern the old page used.
export const DEFAULT_ROW_EYEBROWS: string[] = ["Build", "Review", "Approve", "Scale"];
