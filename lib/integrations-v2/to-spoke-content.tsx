import { buildSpokeHeroVisual } from "./hero-visual";
import { toFeatureShowcaseCards } from "@/components/integrations-new/feature-artifacts";
import type { InstallStep } from "@/components/home-new/InstallTimeline";
import type {
  Capabilities,
  FaqEntry,
  FeatureCard,
  RelatedSpoke,
  SpokeContent,
  SpokeKind,
} from "@/components/integrations-new/content";

// Maps a Sanity `integrationLibrary` document (see sanity/queries.ts
// getIntegrationLibraryBySlug) plus the lightweight roster (getAllIntegration
// Libraries) into the typed SpokeContent that SpokeView renders. Related
// siblings are derived from the roster by shared category. The hero visual is
// resolved to a ReactNode here so the page component stays pure presentation.

type Nullable<T> = T | null | undefined;

export interface RawSpoke {
  name?: Nullable<string>;
  slug?: Nullable<string>;
  kind?: Nullable<string>;
  category?: Nullable<string>;
  beta?: Nullable<boolean>;
  heroTitle?: Nullable<string>;
  heroSecondary?: Nullable<string>;
  capabilities?: Nullable<Capabilities>;
  problemHeader?: Nullable<string>;
  problemBody?: Nullable<string>;
  builtForLine?: Nullable<string>;
  featureCards?: Nullable<FeatureCard[]>;
  agentsCardBody?: Nullable<string>;
  setupPackages?: Nullable<string>;
  migrateLine?: Nullable<string>;
  valueProps?: Nullable<string[]>;
  setupNote?: Nullable<string>;
  faq?: Nullable<FaqEntry[]>;
  metaTitle?: Nullable<string>;
  metaDescription?: Nullable<string>;
}

export interface RosterRow {
  name?: Nullable<string>;
  slug?: Nullable<string>;
  kind?: Nullable<string>;
  category?: Nullable<string>;
  beta?: Nullable<boolean>;
  order?: Nullable<number>;
  capabilities?: Nullable<Capabilities>;
}

const MAX_RELATED = 5;

/**
 * Normalize a spoke kind string to the SpokeKind union, defaulting to surface.
 * @param {Nullable<string>} kind The raw kind value.
 * @returns {SpokeKind} The normalized kind.
 */
function normalizeKind(kind: Nullable<string>): SpokeKind {
  try {
    if (kind === "plugin" || kind === "agent") return kind;
    return "surface";
  } catch (error) {
    console.error("normalizeKind failed", error);
    return "surface";
  }
}

/**
 * Build the category-filtered "related libraries" list for a spoke.
 * @param {RawSpoke} doc The current spoke.
 * @param {RosterRow[]} roster The full library roster.
 * @returns {RelatedSpoke[]} Siblings in the same category, current excluded.
 */
function buildRelated(doc: RawSpoke, roster: RosterRow[]): RelatedSpoke[] {
  try {
    return (roster ?? [])
      .filter(
        (row) =>
          row?.slug &&
          row.slug !== doc?.slug &&
          row.category === doc?.category,
      )
      .slice(0, MAX_RELATED)
      .map((row) => ({
        name: row.name ?? "",
        slug: row.slug ?? "",
        category: row.category ?? "",
        beta: row.beta ?? false,
      }));
  } catch (error) {
    console.error("buildRelated failed", error);
    return [];
  }
}

/**
 * Build the three-step install timeline (reusing the homepage InstallTimeline
 * shape) for a surface spoke, parameterized by its adapter package(s).
 * @param {string} name The surface name, e.g. "Tiptap".
 * @param {Nullable<string>} setupPackages The "@veltdev/react + adapter" string.
 * @returns {InstallStep[]} The install steps.
 */
function buildSetupSteps(
  name: string,
  setupPackages: Nullable<string>,
): InstallStep[] {
  try {
    const packages = (setupPackages ?? "@veltdev/react").replace(/\s*\+\s*/g, " ");
    return [
      {
        num: "01",
        label: "INSTALL",
        tab: "terminal",
        code: `npm install ${packages}`,
      },
      {
        num: "02",
        label: "PROVIDER",
        tab: "App.tsx",
        code: `import { VeltProvider } from "@veltdev/react";\n\n<VeltProvider apiKey={API_KEY}>\n  <App />\n</VeltProvider>`,
      },
      {
        num: "03",
        label: "MOUNT",
        tab: `${name || "Editor"}.tsx`,
        code: `// Mount Velt on ${name || "your surface"}\n<VeltComments />\n// + the CRDT adapter for co-editing`,
      },
    ];
  } catch (error) {
    console.error("buildSetupSteps failed", error);
    return [];
  }
}

/**
 * Map a Sanity integrationLibrary doc + roster into typed SpokeContent.
 * @param {RawSpoke} doc The fetched spoke document.
 * @param {RosterRow[]} roster The full roster for related-sibling derivation.
 * @returns {SpokeContent} The typed content for SpokeView.
 */
export function toSpokeContent(
  doc: RawSpoke,
  roster: RosterRow[],
): SpokeContent {
  const kind = normalizeKind(doc?.kind);
  const name = doc?.name ?? "";

  return {
    name,
    slug: doc?.slug ?? "",
    kind,
    category: doc?.category ?? "",
    beta: doc?.beta ?? false,
    heroTitle: doc?.heroTitle ?? `Built for ${name}`,
    heroSecondary: doc?.heroSecondary ?? undefined,
    heroVisual: buildSpokeHeroVisual(name, kind, doc?.category ?? ""),
    capabilities: doc?.capabilities ?? undefined,
    problemHeader: doc?.problemHeader ?? undefined,
    problemBody: doc?.problemBody ?? undefined,
    builtForLine: doc?.builtForLine ?? undefined,
    featureCards: doc?.featureCards ?? undefined,
    featureShowcaseCards:
      kind === "surface"
        ? toFeatureShowcaseCards(doc?.featureCards ?? undefined)
        : undefined,
    agentsCardBody: doc?.agentsCardBody ?? undefined,
    setupPackages: doc?.setupPackages ?? undefined,
    setupSteps:
      kind === "surface"
        ? buildSetupSteps(name, doc?.setupPackages)
        : undefined,
    migrateLine: doc?.migrateLine ?? undefined,
    valueProps: doc?.valueProps ?? undefined,
    setupNote: doc?.setupNote ?? undefined,
    faq: doc?.faq ?? [],
    related: buildRelated(doc, roster),
    metaTitle: doc?.metaTitle ?? undefined,
    metaDescription: doc?.metaDescription ?? undefined,
  };
}
