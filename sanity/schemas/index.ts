import { author } from "./author";
import { blogPost } from "./blogPost";
import { marketingPage } from "./marketingPage";
import { customer } from "./customer";
import { integrationPage } from "./integrationPage";
import { libraryPage, ctaLink, bentoCard } from "./libraryPage";
import { sectionFeatureGrid } from "./sections/featureGrid";
import { sectionDemo } from "./sections/demo";
import { sectionCodeBlock } from "./sections/codeBlock";
import { sectionFaq } from "./sections/faq";
import { sectionCta } from "./sections/cta";

export const schemaTypes = [
  author,
  blogPost,
  marketingPage,
  customer,
  integrationPage,
  libraryPage,
  // Inline objects used by libraryPage
  ctaLink,
  bentoCard,
  // Generic section blocks (still available to other doc types).
  sectionFeatureGrid,
  sectionDemo,
  sectionCodeBlock,
  sectionFaq,
  sectionCta,
];
