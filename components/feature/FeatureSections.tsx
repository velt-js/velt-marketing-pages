// Dispatcher for the polymorphic `sections[]` array on a featurePage doc.
// Each block carries a `_type` discriminator and dispatches to the matching
// component. Only the FIRST bento section gets `topAccent` so the dark→light
// transition curve renders once.

import type { ReactNode } from "react";

import {
  LibraryBento,
  type LibraryBentoCard,
  type LibraryBentoCta,
} from "@/components/library/LibraryBento";
import { illustrationRegistry } from "@/components/library/illustrations/registry";
import type { IllustrationKey } from "@/components/library/illustrations/keys";

import { featureUiRegistry } from "./uis/registry";
import type { FeatureUiKey } from "./uis/keys";
import {
  FeatureIntegrationsRow,
  type FeatureIntegrationsLogo,
} from "./FeatureIntegrationsRow";
import {
  FeatureCustomerCarousel,
  type FeatureCustomerCarouselCard,
} from "./FeatureCustomerCarousel";
import {
  FeatureSidebarShowcase,
  type FeatureSidebarShowcaseItem,
} from "./FeatureSidebarShowcase";
import { FeatureCardRow, type FeatureCardRowCard } from "./FeatureCardRow";
import { FeatureImageCard } from "./FeatureImageCard";
import { FeaturePowerfulBento } from "./FeaturePowerfulBento";
import {
  FeatureCustomizer,
  type FeatureCustomizerExample,
} from "./FeatureCustomizer";
import {
  FeatureFlowDiagram,
  type FeatureFlowStage,
} from "./FeatureFlowDiagram";

type CtaLink = {
  label?: string;
  href?: string;
  newTab?: boolean;
};

type InlineTestimonialDoc =
  | {
      name?: string;
      role?: string;
      quote?: string;
      accentFragment?: string;
      accentColor?: string;
      avatarSrc?: string;
    }
  | null
  | undefined;

export type FeatureBentoSectionDoc = {
  _type: "featureBentoSection";
  _key?: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: CtaLink;
  primaryCta?: CtaLink;
  rowHeights?: number[] | null;
  cards: Array<{
    title: string;
    description: string;
    /** Either a feature UI registry key OR a library illustration key. */
    uiComponentKey?: FeatureUiKey | null;
    illustrationKey?: IllustrationKey | null;
    imageSrc?: string | null;
  }>;
  inlineTestimonial?: InlineTestimonialDoc;
};

type PowerfulCardCopy = { title: string; description: string };

export type FeaturePowerfulBentoSectionDoc = {
  _type: "featurePowerfulBentoSection";
  _key?: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: CtaLink;
  primaryCta?: CtaLink;
  mentionsCard?: PowerfulCardCopy | null;
  tasksCard?: PowerfulCardCopy | null;
  recordingsCard?: PowerfulCardCopy | null;
  reactionsCard?: PowerfulCardCopy | null;
  inlineTestimonial?: InlineTestimonialDoc;
};

export type FeatureSidebarShowcaseSectionDoc = {
  _type: "featureSidebarShowcaseSection";
  _key?: string;
  eyebrowIconSrc?: string;
  heading: string;
  subheading?: string;
  items: FeatureSidebarShowcaseItem[];
  defaultScreenshotSrc?: string;
  inlineTestimonial?: InlineTestimonialDoc;
};

export type FeatureCardRowSectionDoc = {
  _type: "featureCardRowSection";
  _key?: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: CtaLink;
  primaryCta?: CtaLink;
  cards: Array<{
    title: string;
    iconImageSrc?: string;
    uiComponentKey?: FeatureUiKey | null;
    viewDocsHref?: string;
  }>;
  inlineTestimonial?: InlineTestimonialDoc;
};

export type FeatureImageCardSectionDoc = {
  _type: "featureImageCardSection";
  _key?: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: CtaLink;
  primaryCta?: CtaLink;
  imageSrc: string;
  imageAlt?: string;
  imageWidth: number;
  imageHeight: number;
  imageBottomOffset?: number;
  inlineTestimonial?: InlineTestimonialDoc;
};

export type FeatureCustomizerSectionDoc = {
  _type: "featureCustomizerSection";
  _key?: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: CtaLink;
  primaryCta?: CtaLink;
  playground?: FeatureCustomizerExample;
  examples?: FeatureCustomizerExample[];
  controls?: {
    colors?: string[];
    onTheEdgeValue?: string;
    loggedInToggleLabel?: string;
    parentDefaultLabel?: string;
  };
};

export type FeatureFlowDiagramSectionDoc = {
  _type: "featureFlowDiagramSection";
  _key?: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: CtaLink;
  primaryCta?: CtaLink;
  stages: FeatureFlowStage[];
  inlineTestimonial?: InlineTestimonialDoc;
};

export type FeatureIntegrationsSectionDoc = {
  _type: "featureIntegrationsSection";
  _key?: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  logos: FeatureIntegrationsLogo[];
};

export type FeatureCustomerCarouselSectionDoc = {
  _type: "featureCustomerCarouselSection";
  _key?: string;
  heading: string;
  subheading?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  cards: FeatureCustomerCarouselCard[];
};

export type FeatureSectionDoc =
  | FeatureBentoSectionDoc
  | FeaturePowerfulBentoSectionDoc
  | FeatureSidebarShowcaseSectionDoc
  | FeatureCardRowSectionDoc
  | FeatureImageCardSectionDoc
  | FeatureCustomizerSectionDoc
  | FeatureFlowDiagramSectionDoc
  | FeatureIntegrationsSectionDoc
  | FeatureCustomerCarouselSectionDoc;

function resolveIllustration(key?: IllustrationKey | null): ReactNode {
  if (!key) return null;
  const Component = illustrationRegistry[key];
  if (!Component) return null;
  return <Component />;
}

function resolveFeatureUi(key?: FeatureUiKey | null): ReactNode {
  if (!key) return null;
  const Component = featureUiRegistry[key];
  if (!Component) return null;
  return <Component />;
}

function toTestimonial(t: InlineTestimonialDoc) {
  if (!t?.quote) return undefined;
  return {
    name: t.name,
    role: t.role,
    quote: t.quote,
    accentFragment: t.accentFragment,
    accentColor: t.accentColor,
    avatarSrc: t.avatarSrc,
  };
}

function toBentoCta(cta?: CtaLink): LibraryBentoCta | undefined {
  if (!cta?.label || !cta?.href) return undefined;
  return { label: cta.label, href: cta.href, newTab: cta.newTab };
}

export function FeatureSections({ sections }: { sections: FeatureSectionDoc[] }) {
  // The first light-bg section on the page sits directly under the dark
  // hero/trusted-logos strip and needs the rounded top + 80px gap.
  // Subsequent sections share the same continuous light surface and skip
  // the accent. Card row + image card mirror the bento topAccent treatment
  // so any of them can lead the page (e.g. /features/recordings starts
  // with image cards, no bento).
  let firstLightIndex = -1;
  sections.forEach((section, i) => {
    const isLight =
      section._type === "featureBentoSection" ||
      section._type === "featurePowerfulBentoSection" ||
      section._type === "featureCardRowSection" ||
      section._type === "featureImageCardSection";
    if (isLight && firstLightIndex === -1) {
      firstLightIndex = i;
    }
  });

  return (
    <>
      {sections.map((section, i) => {
        const key = section._key ?? `section-${i}`;
        if (section._type === "featureBentoSection") {
          const bentoCards: LibraryBentoCard[] = section.cards.map((card) => ({
            title: card.title,
            description: card.description,
            // uiComponentKey (feature UI) takes precedence over the library
            // illustrationKey if both somehow ended up set.
            illustration:
              resolveFeatureUi(card.uiComponentKey) ??
              resolveIllustration(card.illustrationKey),
            imageSrc: card.imageSrc ?? undefined,
          }));
          return (
            <LibraryBento
              key={key}
              topAccent={i === firstLightIndex}
              heading={section.heading}
              subheading={section.subheading}
              eyebrow={section.eyebrow}
              viewDocsCta={toBentoCta(section.viewDocsCta)}
              primaryCta={toBentoCta(section.primaryCta)}
              cards={bentoCards}
              rowHeights={section.rowHeights ?? undefined}
              testimonial={toTestimonial(section.inlineTestimonial)}
            />
          );
        }
        if (section._type === "featurePowerfulBentoSection") {
          return (
            <FeaturePowerfulBento
              key={key}
              topAccent={i === firstLightIndex}
              eyebrow={section.eyebrow}
              heading={section.heading}
              subheading={section.subheading}
              viewDocsCta={section.viewDocsCta}
              primaryCta={section.primaryCta}
              mentionsCard={section.mentionsCard ?? undefined}
              tasksCard={section.tasksCard ?? undefined}
              recordingsCard={section.recordingsCard ?? undefined}
              reactionsCard={section.reactionsCard ?? undefined}
              testimonial={toTestimonial(section.inlineTestimonial)}
            />
          );
        }
        if (section._type === "featureSidebarShowcaseSection") {
          return (
            <FeatureSidebarShowcase
              key={key}
              eyebrowIconSrc={section.eyebrowIconSrc}
              heading={section.heading}
              subheading={section.subheading}
              items={section.items}
              defaultScreenshotSrc={section.defaultScreenshotSrc}
              testimonial={toTestimonial(section.inlineTestimonial)}
            />
          );
        }
        if (section._type === "featureCardRowSection") {
          const rowCards: FeatureCardRowCard[] = section.cards.map((card) => ({
            title: card.title,
            iconImageSrc: card.iconImageSrc,
            iconKey:
              card.uiComponentKey === "customDataChip"
                ? "braces"
                : card.uiComponentKey === "customDropdownDemo"
                  ? "select"
                  : card.uiComponentKey === "customAutocompleteDemo"
                    ? "hash"
                    : undefined,
            uiComponent: resolveFeatureUi(card.uiComponentKey),
            viewDocsHref: card.viewDocsHref,
          }));
          return (
            <FeatureCardRow
              key={key}
              topAccent={i === firstLightIndex}
              eyebrow={section.eyebrow}
              heading={section.heading}
              subheading={section.subheading}
              viewDocsCta={section.viewDocsCta}
              primaryCta={section.primaryCta}
              cards={rowCards}
              testimonial={toTestimonial(section.inlineTestimonial)}
            />
          );
        }
        if (section._type === "featureImageCardSection") {
          return (
            <FeatureImageCard
              key={key}
              topAccent={i === firstLightIndex}
              eyebrow={section.eyebrow}
              heading={section.heading}
              subheading={section.subheading}
              viewDocsCta={section.viewDocsCta}
              primaryCta={section.primaryCta}
              imageSrc={section.imageSrc}
              imageAlt={section.imageAlt}
              imageWidth={section.imageWidth}
              imageHeight={section.imageHeight}
              imageBottomOffset={section.imageBottomOffset}
              testimonial={toTestimonial(section.inlineTestimonial)}
            />
          );
        }
        if (section._type === "featureCustomizerSection") {
          return (
            <FeatureCustomizer
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              subheading={section.subheading}
              viewDocsCta={section.viewDocsCta}
              primaryCta={section.primaryCta}
              playground={section.playground}
              examples={section.examples}
              controls={section.controls}
            />
          );
        }
        if (section._type === "featureFlowDiagramSection") {
          return (
            <FeatureFlowDiagram
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              subheading={section.subheading}
              viewDocsCta={section.viewDocsCta}
              primaryCta={section.primaryCta}
              stages={section.stages}
              testimonial={toTestimonial(section.inlineTestimonial)}
            />
          );
        }
        if (section._type === "featureIntegrationsSection") {
          return (
            <FeatureIntegrationsRow
              key={key}
              eyebrow={section.eyebrow}
              heading={section.heading}
              subheading={section.subheading}
              logos={section.logos}
            />
          );
        }
        if (section._type === "featureCustomerCarouselSection") {
          return (
            <FeatureCustomerCarousel
              key={key}
              heading={section.heading}
              subheading={section.subheading}
              primaryCta={section.primaryCta}
              secondaryCta={section.secondaryCta}
              cards={section.cards}
            />
          );
        }
        return null;
      })}
    </>
  );
}
