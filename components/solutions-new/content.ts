import type { ReactNode } from "react";

import type {
  CtaBannerContent,
  CtaLink,
  FaqContent,
  FinalCtaContent,
  LogoStripContent,
} from "@/components/feature-new/content";

// Typed content contract for a v1 Solutions (vertical) page. Mirrors the
// `solutionPageV1` Sanity schema 1:1. Where a section is identical to the
// feature-page system (logo strip, FAQ, final CTA) the feature-page type and
// component are reused; the vertical-specific sections (review reality, the
// loop, feature map, agent layer, in-production case, compliance strip) are
// defined here. Demo-preset keys resolve to ReactNode visuals via the shared
// demo registry, so a CMS-driven solutions page renders like its static spec.

export type { CtaLink } from "@/components/feature-new/content";

export type SolutionHeroContent = {
  kicker: string;
  title: string;
  secondary: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  microcopy: string;
  visual: ReactNode;
  buildChip?: CtaLink;
};

export type ReviewRealityContent = {
  kicker: string;
  heading: string;
  items: string[];
  close: string;
};

export type LoopBeat = {
  num: string;
  title: string;
  body: string;
  links: CtaLink[];
};

export type TheLoopContent = {
  kicker: string;
  heading: string;
  body: string;
  beats: LoopBeat[];
  visual: ReactNode;
};

export type FeatureMapCard = {
  num: string;
  name: string;
  oneLiner: string;
  link: CtaLink;
  code: string;
  preview: ReactNode;
  beta?: boolean;
};

export type FeatureMapContent = {
  kicker: string;
  heading: string;
  support: string;
  cards: FeatureMapCard[];
};

export type AgentLayerContent = {
  kicker: string;
  heading: string;
  body: string;
  visual: ReactNode;
};

export type InProductionCaseContent = {
  kicker: string;
  heading: string;
  body: string;
  metric?: string;
  quote?: string;
  who?: string;
  visual: ReactNode;
  ctaBanner: CtaBannerContent;
};

export type ComplianceItem = {
  title: string;
  body: string;
  link?: CtaLink;
};

export type ComplianceStripContent = {
  kicker: string;
  heading: string;
  lead: string;
  items: ComplianceItem[];
  note?: string;
};

export type SolutionPageContent = {
  slug: string;
  hero: SolutionHeroContent;
  logoStrip: LogoStripContent;
  reviewReality: ReviewRealityContent;
  theLoop: TheLoopContent;
  featureMap: FeatureMapContent;
  agentLayer: AgentLayerContent;
  inProduction: InProductionCaseContent;
  compliance: ComplianceStripContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
};
