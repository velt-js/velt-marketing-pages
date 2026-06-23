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
import {
  integrationLibrary,
  integrationCapabilities,
  integrationFeatureCard,
} from "./integrationLibrary";
import {
  integrationsHubPage,
  integrationsHubHero,
  integrationsHowItWorksStep,
  integrationsStackLink,
  integrationsVertical,
  integrationsFinalCta,
} from "./integrationsHubPage";
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
  useCaseFeatureRow,
  useCaseFeatureChip,
  useCasePreviewBanner,
  useCaseProblemSection,
  useCaseProblemItem,
  useCaseExampleSection,
  useCaseTestimonial,
  useCaseActionCallout,
  useCaseBenefit,
  useCaseBenefitSubCase,
} from "./useCasePage";
import {
  migrationPage,
  migrationStep,
  migrationStepsTestimonial,
  migrationStepsPanel,
  migrationCarouselSettings,
} from "./migrationPage";
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
  featurePageV2,
  vfpCtaBanner,
  vfpInterstitial,
} from "./featurePageV2";
import { solutionPageV1 } from "./solutionPageV1";
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
  integrationLibrary,
  integrationsHubPage,
  demoPage,
  examplePage,
  libraryPage,
  featurePage,
  featurePageV2,
  solutionPageV1,
  useCasePage,
  migrationPage,

  // Shared (cross-schema)
  inlineTestimonial,
  linkAnnotation,
  getStartedSteps,
  faqItem,

  // featurePageV2 sub-types
  vfpCtaBanner,
  vfpInterstitial,

  // Reusable building blocks
  ctaLink,
  bentoCard,

  // integrationLibrary + integrationsHubPage sub-types
  integrationCapabilities,
  integrationFeatureCard,
  integrationsHubHero,
  integrationsHowItWorksStep,
  integrationsStackLink,
  integrationsVertical,
  integrationsFinalCta,

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
  useCaseFeatureRow,
  useCaseFeatureChip,
  useCasePreviewBanner,
  useCaseProblemSection,
  useCaseProblemItem,
  useCaseExampleSection,
  useCaseTestimonial,
  useCaseActionCallout,
  useCaseBenefit,
  useCaseBenefitSubCase,

  // migrationPage sub-types
  migrationStep,
  migrationStepsTestimonial,
  migrationStepsPanel,
  migrationCarouselSettings,

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
