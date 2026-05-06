import { author } from "./author";
import { blogPost, blogBodyImage } from "./blogPost";
import {
  marketingPage,
  marketingHero,
  marketingHeroCta,
  marketingFeature,
  marketingTestimonial,
  marketingPricingTier,
} from "./marketingPage";
import { customer } from "./customer";
import { integrationPage } from "./integrationPage";
import { demoPage } from "./demoPage";
import { examplePage } from "./examplePage";
import {
  libraryPage,
  ctaLink,
  bentoCard,
  libraryHero,
  libraryDemoStage,
  libraryBento,
  libraryCodeSnippet,
  libraryGetStartedCallout,
  libraryFaq,
} from "./libraryPage";
import {
  useCasePage,
  useCaseHero,
  useCaseFaq,
  useCaseBentoSection,
  useCaseBentoCard,
  librarySupportSection,
  librarySupportLogo,
} from "./useCasePage";
import {
  featurePage,
  featureHero,
  featureFaq,
  featureBentoCard,
  featureBentoSection,
  featurePowerfulBentoSection,
  featurePowerfulCard,
  featureSidebarShowcaseSection,
  featureSidebarItem,
  featureCardRowSection,
  featureCardRowCard,
  featureImageCardSection,
  featureCustomizerSection,
  featureCustomizerPlayground,
  featureCustomizerExample,
  featureCustomizerControls,
  featureFlowDiagramSection,
  featureFlowStage,
  featureFlowCarouselLogo,
  featureIntegrationsSection,
  featureIntegrationLogo,
  featureCustomerCarouselSection,
  featureCustomerCard,
} from "./featurePage";
import {
  sectionFeatureGrid,
  featureItem,
} from "./sections/featureGrid";
import { sectionDemo } from "./sections/demo";
import { sectionCodeBlock, codeTab } from "./sections/codeBlock";
import { sectionFaq, sectionFaqItem } from "./sections/faq";
import { sectionCta } from "./sections/cta";
import { inlineTestimonial } from "./shared/inlineTestimonial";
import { linkAnnotation } from "./shared/linkAnnotation";
import { getStartedSteps } from "./shared/getStartedSteps";
import { faqItem } from "./shared/faqItem";

export const schemaTypes = [
  // Documents
  author,
  blogPost,
  marketingPage,
  customer,
  integrationPage,
  demoPage,
  examplePage,
  libraryPage,
  featurePage,
  useCasePage,

  // Shared (cross-schema)
  inlineTestimonial,
  linkAnnotation,
  getStartedSteps,
  faqItem,

  // Reusable building blocks
  ctaLink,
  bentoCard,

  // blogPost sub-types
  blogBodyImage,

  // marketingPage sub-types
  marketingHero,
  marketingHeroCta,
  marketingFeature,
  marketingTestimonial,
  marketingPricingTier,

  // libraryPage sub-types
  libraryHero,
  libraryDemoStage,
  libraryBento,
  libraryCodeSnippet,
  libraryGetStartedCallout,
  libraryFaq,

  // featurePage sub-types
  featureHero,
  featureFaq,
  featureBentoCard,
  featureBentoSection,
  featurePowerfulBentoSection,
  featurePowerfulCard,
  featureSidebarShowcaseSection,
  featureSidebarItem,
  featureCardRowSection,
  featureCardRowCard,
  featureImageCardSection,
  featureCustomizerSection,
  featureCustomizerPlayground,
  featureCustomizerExample,
  featureCustomizerControls,
  featureFlowDiagramSection,
  featureFlowStage,
  featureFlowCarouselLogo,
  featureIntegrationsSection,
  featureIntegrationLogo,
  featureCustomerCarouselSection,
  featureCustomerCard,

  // useCasePage sub-types
  useCaseHero,
  useCaseFaq,
  useCaseBentoSection,
  useCaseBentoCard,
  librarySupportSection,
  librarySupportLogo,

  // Generic section blocks
  sectionFeatureGrid,
  featureItem,
  sectionDemo,
  sectionCodeBlock,
  codeTab,
  sectionFaq,
  sectionFaqItem,
  sectionCta,
];
