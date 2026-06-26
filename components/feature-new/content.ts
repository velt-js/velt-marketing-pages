import type { ReactNode } from "react";

// Typed content contract for a v10 feature page. Phase 1 (the Audit Trail
// page) supplies this from a static module; Phase 2 populates the same
// shape from Sanity, mapping demo-preset enums to the ReactNode visuals.

export type CtaLink = { label: string; href: string; newTab?: boolean };

export type IntegrationChip = CtaLink & { icon?: string };

export type Interstitial = { quote: string; who: string };

export type CtaBannerContent = {
  title: string;
  microcopy: string;
  cta: CtaLink;
  variant?: "primary" | "secondary";
};

export type HeroDemoTab = { id: string; label: string; content: ReactNode };

export type FeatureHeroContent = {
  kicker: string;
  beta?: boolean;
  title: string;
  secondary: string;
  accent: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  microcopy: string;
  demoTabs: HeroDemoTab[];
  buildChip: CtaLink;
};

export type LogoStripContent = {
  label: string;
  migration: { label: string; links: CtaLink[] };
};

export type WhatItIsContent = {
  kicker: string;
  heading: string;
  body: string;
  docLinks: CtaLink[];
  scene: ReactNode;
};

export type HowItWorksStep = {
  kicker: string;
  title: string;
  filename: string;
  code: ReactNode;
  copyText: string;
};

export type HowItWorksContent = {
  kicker: string;
  heading: string;
  support: string;
  steps: HowItWorksStep[];
  mechanics: { heading: string; body: ReactNode; microcopy?: string };
  buildVsBuy: { heading: string; items: string[]; close: string };
  mcp: { heading: string; sub: string; tabs: { id: string; label: string; command: string }[] };
  integrations: { label: string; chips: IntegrationChip[] }[];
  ctaBanner: CtaBannerContent;
};

export type ShowcaseCard = {
  num: string;
  name: string;
  codeKicker: string;
  headline: string;
  preview: ReactNode;
  code: ReactNode;
  copyText: string;
};

export type ShowcaseContent = {
  kicker: string;
  heading: string;
  support: string;
  cards: ShowcaseCard[];
  docLinks: CtaLink[];
  interstitial?: Interstitial;
  /**
   * When true, the capability cards render the preview artifact only, dropping
   * the per-card Preview/Code toggle and code pane. Defaults to false (toggle
   * shown). Used by pages whose artifacts speak for themselves (e.g. platform,
   * devtools).
   */
  hideCodeTab?: boolean;
};

export type DetailItem = { label: string; soon?: boolean };

export type DetailsContent = {
  kicker: string;
  heading: string;
  support: string;
  items: DetailItem[];
  visibleCount: number;
};

export type MakeItYoursCard = {
  icon: ReactNode;
  title: string;
  body: string;
  preview: ReactNode;
  code: ReactNode;
  copyText: string;
};

export type MakeItYoursContent = {
  kicker: string;
  heading: string;
  support: string;
  cards: MakeItYoursCard[];
  interstitial?: Interstitial;
};

export type ProdTab = {
  id: string;
  label: string;
  visual: ReactNode;
  caption: string;
  link: CtaLink;
};

export type InProductionContent = {
  kicker: string;
  heading: string;
  support: string;
  tabs: ProdTab[];
  whereItFits: { label: string; links: CtaLink[] };
  ctaBanner: CtaBannerContent;
};

export type RelatedCard = {
  icon: ReactNode;
  title: string;
  body: string;
  visual: ReactNode;
  link: CtaLink;
};

export type RelatedContent = {
  kicker: string;
  heading: string;
  support: string;
  cards: RelatedCard[];
};

export type EnterpriseContent = {
  badges: string[];
  line: ReactNode;
  cta: CtaLink;
};

export type TestimonialCard = { metric: string; quote: string; who: string };

export type TestimonialContent = {
  kicker: string;
  heading: string;
  support: string;
  cards: TestimonialCard[];
};

export type FaqItem = { q: string; a: string };

export type FaqContent = { kicker: string; heading: string; items: FaqItem[] };

export type FinalCtaContent = {
  title: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  microcopies: string[];
};

export type FeaturePageContent = {
  slug: string;
  hero: FeatureHeroContent;
  logoStrip: LogoStripContent;
  whatItIs: WhatItIsContent;
  howItWorks: HowItWorksContent;
  showcase: ShowcaseContent;
  details: DetailsContent;
  makeItYours?: MakeItYoursContent;
  inProduction?: InProductionContent;
  related: RelatedContent;
  enterprise: EnterpriseContent;
  testimonials: TestimonialContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
};
