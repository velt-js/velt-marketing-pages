import type { ReactNode } from "react";

import type { ShowcaseCard as ShowcaseCardData } from "@/components/feature-new/content";
import type { InstallStep } from "@/components/home-new/InstallTimeline";

// Typed content contracts for the redesigned integrations hub + spoke pages.
// Mappers in lib/integrations-v2/* turn Sanity docs (integrationLibrary,
// integrationsHubPage) into these shapes; HubView / SpokeView render them.
// Mirrors the feature-new/content.ts approach (CMS-driven, byte-stable).

export type CtaLink = { label: string; href: string; newTab?: boolean };
export type FaqEntry = { question: string; answer: string };
export type FeatureCard = { title: string; body?: string; featureHref?: string };

export type Capabilities = {
  comments?: string;
  coEditing?: string;
  suggestions?: string;
  presence?: string;
  agents?: string;
};

export type RelatedSpoke = {
  name: string;
  slug: string;
  category: string;
  beta?: boolean;
};

export type GridItem = {
  name: string;
  slug: string;
  beta?: boolean;
  logo?: string;
};

export type GridCategory = { key: string; label: string; items: GridItem[] };

export type MatrixRow = {
  name: string;
  slug: string;
  beta?: boolean;
  capabilities: Capabilities;
};

export type SpokeKind = "surface" | "plugin" | "agent";

export type SpokeContent = {
  name: string;
  slug: string;
  kind: SpokeKind;
  category: string;
  beta?: boolean;
  heroTitle: string;
  heroSecondary?: string;
  heroVisual: ReactNode;
  // Surface kind
  capabilities?: Capabilities;
  problemHeader?: string;
  problemBody?: string;
  builtForLine?: string;
  featureCards?: FeatureCard[];
  featureShowcaseCards?: ShowcaseCardData[];
  agentsCardBody?: string;
  setupPackages?: string;
  setupSteps?: InstallStep[];
  migrateLine?: string;
  // Plugin / agent kind
  valueProps?: string[];
  setupNote?: string;
  // Shared
  faq: FaqEntry[];
  related: RelatedSpoke[];
  metaTitle?: string;
  metaDescription?: string;
};

export type HubContent = {
  hero: {
    kicker?: string;
    title: string;
    secondary?: string;
    microcopy?: string;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
  };
  heroVisual: ReactNode;
  logoStripLabel?: string;
  whatItIs: { header?: string; body?: string; cards: FeatureCard[] };
  howItWorks: {
    header?: string;
    steps: { title: string; body?: string; code?: string }[];
    installSteps: InstallStep[];
    mcpBanner?: string;
    buildVsBuy?: string;
  };
  grid: {
    header?: string;
    supportLine?: string;
    surfacesSubheader?: string;
    matrixSubheader?: string;
    matrixCaption?: string;
    buildWithIntro?: string;
    agentsInsideIntro?: string;
    stackLabel?: string;
    stackLinks: { label: string; group?: string; href?: string }[];
    surfaceCategories: GridCategory[];
    matrixRows: MatrixRow[];
    buildWithItems: GridItem[];
    agentsInsideItems: GridItem[];
  };
  byos: { header?: string; body?: string };
  verticals: {
    header?: string;
    items: { label: string; body?: string; forHref?: string }[];
  };
  related: { header?: string; items: FeatureCard[] };
  enterpriseLine?: string;
  faq: FaqEntry[];
  finalCta: {
    title?: string;
    secondary?: string;
    microcopy?: string;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
  };
  metaTitle?: string;
  metaDescription?: string;
};

// Display labels + order for the grid bands and the capability matrix. Maps the
// raw `category` enum on each integrationLibrary doc to a human grid heading.
export const SURFACE_CATEGORY_ORDER: { key: string; label: string }[] = [
  { key: "text-code-editors", label: "Text and code editors" },
  { key: "documents-pdf", label: "Documents, PDF and office" },
  { key: "grids-tables", label: "Spreadsheets, grids and tables" },
  { key: "canvas-diagram", label: "Diagrams and canvas" },
  { key: "charts-dataviz", label: "Charts and data viz" },
];

// The five capability matrix columns, in render order.
export const MATRIX_COLUMNS: { key: keyof Capabilities; label: string }[] = [
  { key: "comments", label: "Comments" },
  { key: "coEditing", label: "Co-editing" },
  { key: "suggestions", label: "Suggestions" },
  { key: "presence", label: "Presence" },
  { key: "agents", label: "Agents" },
];
