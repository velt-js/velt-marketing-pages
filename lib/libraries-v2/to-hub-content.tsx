import { buildHubHeroVisual } from "./hero-visual";
import type { RosterRow } from "./to-spoke-content";
import type { InstallStep } from "@/components/home-new/InstallTimeline";
import {
  SURFACE_CATEGORY_ORDER,
  type CtaLink,
  type FaqEntry,
  type FeatureCard,
  type GridCategory,
  type GridItem,
  type HubContent,
  type MatrixRow,
} from "@/components/libraries-new/content";

// Maps the Sanity `integrationsHubPage` singleton (see getIntegrationsHubPage)
// plus the library roster into the typed HubContent that HubView renders. The
// grid bands and the capability matrix are DERIVED from the roster here so the
// hub and the spokes always agree.

type Nullable<T> = T | null | undefined;

interface RawHub {
  hero?: Nullable<{
    kicker?: Nullable<string>;
    title?: Nullable<string>;
    secondary?: Nullable<string>;
    microcopy?: Nullable<string>;
    primaryCta?: Nullable<CtaLink>;
    secondaryCta?: Nullable<CtaLink>;
  }>;
  logoStripLabel?: Nullable<string>;
  whatItIsHeader?: Nullable<string>;
  whatItIsBody?: Nullable<string>;
  whatItIsCards?: Nullable<FeatureCard[]>;
  howItWorksHeader?: Nullable<string>;
  howItWorksSteps?: Nullable<{ title?: string; body?: string; code?: string }[]>;
  mcpBanner?: Nullable<string>;
  buildVsBuy?: Nullable<string>;
  gridHeader?: Nullable<string>;
  gridSupportLine?: Nullable<string>;
  surfacesSubheader?: Nullable<string>;
  matrixSubheader?: Nullable<string>;
  matrixCaption?: Nullable<string>;
  buildWithIntro?: Nullable<string>;
  agentsInsideIntro?: Nullable<string>;
  stackLabel?: Nullable<string>;
  stackLinks?: Nullable<{ label?: string; group?: string; href?: string }[]>;
  byosHeader?: Nullable<string>;
  byosBody?: Nullable<string>;
  verticalsHeader?: Nullable<string>;
  verticals?: Nullable<{ label?: string; body?: string; forHref?: string }[]>;
  relatedHeader?: Nullable<string>;
  relatedPrimitives?: Nullable<FeatureCard[]>;
  enterpriseLine?: Nullable<string>;
  faq?: Nullable<FaqEntry[]>;
  finalCta?: Nullable<{
    title?: Nullable<string>;
    secondary?: Nullable<string>;
    microcopy?: Nullable<string>;
    primaryCta?: Nullable<CtaLink>;
    secondaryCta?: Nullable<CtaLink>;
  }>;
  metaTitle?: Nullable<string>;
  metaDescription?: Nullable<string>;
}

// Default install timeline (reused from the homepage shape) when the hub's
// authored steps lack code. Index-aligned labels/tabs keep the pills clean.
const HUB_STEP_LABELS = ["INSTALL", "PROVIDER", "MOUNT"];
const HUB_STEP_TABS = ["terminal", "App.tsx", "Editor.tsx"];
const HUB_STEP_FALLBACK_CODE = [
  `npm install @veltdev/react`,
  `import { VeltProvider } from "@veltdev/react";\n\n<VeltProvider apiKey={API_KEY}>\n  <App />\n</VeltProvider>`,
  `// Mount the Velt primitive on your surface\n<VeltComments />`,
];

/**
 * Build the hub install timeline from the authored how-it-works steps,
 * synthesizing code for steps that did not author a snippet.
 * @param {Array<{ title?: string; body?: string; code?: string }>} steps Authored steps.
 * @returns {InstallStep[]} Install steps for the homepage InstallTimeline.
 */
function buildHubInstallSteps(
  steps: Array<{ title?: string; body?: string; code?: string }>,
): InstallStep[] {
  try {
    const source = steps.length > 0 ? steps : [{}, {}, {}];
    return source.slice(0, 3).map((step, index) => ({
      num: String(index + 1).padStart(2, "0"),
      label: HUB_STEP_LABELS[index] ?? "STEP",
      tab: HUB_STEP_TABS[index] ?? "velt.tsx",
      code: step?.code?.trim()
        ? step.code
        : HUB_STEP_FALLBACK_CODE[index] ?? "",
    }));
  } catch (error) {
    console.error("buildHubInstallSteps failed", error);
    return [];
  }
}

/**
 * Project a roster row to a grid chip item.
 * @param {RosterRow} row A roster row.
 * @returns {GridItem} The grid item.
 */
function toGridItem(row: RosterRow): GridItem {
  return {
    name: row?.name ?? "",
    slug: row?.slug ?? "",
    beta: row?.beta ?? false,
  };
}

/**
 * Group surface-kind roster rows into the ordered grid categories.
 * @param {RosterRow[]} surfaces Surface-kind roster rows.
 * @returns {GridCategory[]} Non-empty grid categories in display order.
 */
function buildSurfaceCategories(surfaces: RosterRow[]): GridCategory[] {
  try {
    return SURFACE_CATEGORY_ORDER.map((cat) => ({
      key: cat.key,
      label: cat.label,
      items: surfaces
        .filter((row) => row?.category === cat.key)
        .map(toGridItem),
    })).filter((cat) => cat.items.length > 0);
  } catch (error) {
    console.error("buildSurfaceCategories failed", error);
    return [];
  }
}

/**
 * Map the hub singleton + roster into typed HubContent.
 * @param {RawHub} doc The fetched hub document (may be null/empty).
 * @param {RosterRow[]} roster The full library roster.
 * @returns {HubContent} The typed content for HubView.
 */
export function toHubContent(
  doc: Nullable<RawHub>,
  roster: RosterRow[],
): HubContent {
  const hub = doc ?? {};
  const rows = roster ?? [];
  const surfaces = rows.filter((row) => (row?.kind ?? "surface") === "surface");
  const buildWithItems = rows
    .filter((row) => row?.kind === "plugin")
    .map(toGridItem);
  const agentsInsideItems = rows
    .filter((row) => row?.kind === "agent")
    .map(toGridItem);
  const matrixRows: MatrixRow[] = surfaces.map((row) => ({
    name: row?.name ?? "",
    slug: row?.slug ?? "",
    beta: row?.beta ?? false,
    capabilities: row?.capabilities ?? {},
  }));

  return {
    hero: {
      kicker: hub.hero?.kicker ?? undefined,
      title: hub.hero?.title ?? "Integrations",
      secondary: hub.hero?.secondary ?? undefined,
      microcopy: hub.hero?.microcopy ?? undefined,
      primaryCta: hub.hero?.primaryCta ?? undefined,
      secondaryCta: hub.hero?.secondaryCta ?? undefined,
    },
    heroVisual: buildHubHeroVisual(),
    logoStripLabel: hub.logoStripLabel ?? undefined,
    whatItIs: {
      header: hub.whatItIsHeader ?? undefined,
      body: hub.whatItIsBody ?? undefined,
      cards: hub.whatItIsCards ?? [],
    },
    howItWorks: {
      header: hub.howItWorksHeader ?? undefined,
      steps: (hub.howItWorksSteps ?? []).map((step) => ({
        title: step?.title ?? "",
        body: step?.body ?? undefined,
        code: step?.code ?? undefined,
      })),
      installSteps: buildHubInstallSteps(hub.howItWorksSteps ?? []),
      mcpBanner: hub.mcpBanner ?? undefined,
      buildVsBuy: hub.buildVsBuy ?? undefined,
    },
    grid: {
      header: hub.gridHeader ?? undefined,
      supportLine: hub.gridSupportLine ?? undefined,
      surfacesSubheader: hub.surfacesSubheader ?? undefined,
      matrixSubheader: hub.matrixSubheader ?? undefined,
      matrixCaption: hub.matrixCaption ?? undefined,
      buildWithIntro: hub.buildWithIntro ?? undefined,
      agentsInsideIntro: hub.agentsInsideIntro ?? undefined,
      stackLabel: hub.stackLabel ?? undefined,
      stackLinks: (hub.stackLinks ?? []).map((link) => ({
        label: link?.label ?? "",
        group: link?.group ?? undefined,
        href: link?.href ?? undefined,
      })),
      surfaceCategories: buildSurfaceCategories(surfaces),
      matrixRows,
      buildWithItems,
      agentsInsideItems,
    },
    byos: {
      header: hub.byosHeader ?? undefined,
      body: hub.byosBody ?? undefined,
    },
    verticals: {
      header: hub.verticalsHeader ?? undefined,
      items: (hub.verticals ?? []).map((vertical) => ({
        label: vertical?.label ?? "",
        body: vertical?.body ?? undefined,
        forHref: vertical?.forHref ?? undefined,
      })),
    },
    related: {
      header: hub.relatedHeader ?? undefined,
      items: hub.relatedPrimitives ?? [],
    },
    enterpriseLine: hub.enterpriseLine ?? undefined,
    faq: hub.faq ?? [],
    finalCta: {
      title: hub.finalCta?.title ?? undefined,
      secondary: hub.finalCta?.secondary ?? undefined,
      microcopy: hub.finalCta?.microcopy ?? undefined,
      primaryCta: hub.finalCta?.primaryCta ?? undefined,
      secondaryCta: hub.finalCta?.secondaryCta ?? undefined,
    },
    metaTitle: hub.metaTitle ?? undefined,
    metaDescription: hub.metaDescription ?? undefined,
  };
}
