// Content contracts for the reskinned (new editorial .vfp theme) integrations
// pages. These render the EXISTING `integrationPage` collection (Slack,
// Discord, S3, HubSpot, Zapier, SendGrid, ...) in the new look — same content,
// new skin. The connect/payload/unified narrative is preserved on detail pages.
// Visual primitives (.vintg-* classes, CtaRow/SectionHead/FaqList) are reused
// from components/libraries-new so the two surfaces share one design language.

export type IntegrationRelated = {
  name: string;
  slug: string;
  logoSrc?: string;
  category?: string;
};

export type IntegrationDetailContent = {
  name: string;
  slug: string;
  category?: string;
  heroTitle?: string;
  tagline?: string;
  description?: string;
  logo?: string;
  demoUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
  codeSnippet?: string;
  connectBody?: string;
  payloadBody?: string;
  payloadImage?: string;
  unifiedBody?: string;
  unifiedImage?: string;
  related: IntegrationRelated[];
};

export type IntegrationCard = {
  name: string;
  slug: string;
  logoSrc?: string;
  logoAlt?: string;
  category: string;
  // True when the logo is a wordmark (the brand name is already in the image),
  // so the chip should render the logo wide and omit the redundant text label.
  nameInLogo?: boolean;
};

export type IntegrationsHubCategory = {
  label: string;
  items: IntegrationCard[];
};

export type IntegrationsHubContent = {
  categories: IntegrationsHubCategory[];
};
