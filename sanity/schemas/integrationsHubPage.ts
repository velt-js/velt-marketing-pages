import { defineType, defineField } from "sanity";

// Singleton document for the /integrations HUB page rendered by
// app/integrations/page.tsx via HubView. Holds the authored hub copy (hero,
// "what it is", how-it-works, grid framing, bring-your-own-surface, verticals,
// related primitives, enterprise, FAQ, final CTA). The integration GRID bands
// (surfaces/plugins/agents) and the CAPABILITY MATRIX are NOT stored here —
// they derive at runtime from the `integrationLibrary` doc set so the hub and
// the spokes can never disagree. This singleton only carries the band 4
// ("works with the rest of your stack") static links and the surrounding copy.
//
// Seeded by scripts/seed-integration-libraries.mjs from
// scripts/integrations-hub-content.json. Document id: integrationsHubPage.

// ---- Nested object sub-types (registered in index.ts) ----

export const integrationsHubHero = defineType({
  name: "integrationsHubHero",
  title: "Hub Hero",
  type: "object",
  fields: [
    defineField({ name: "kicker", title: "Kicker", type: "string" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "secondary", title: "Secondary", type: "text", rows: 4 }),
    defineField({ name: "microcopy", title: "Microcopy", type: "string" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "ctaLink" }),
    defineField({
      name: "demoKey",
      title: "Hero Demo Preset",
      description:
        "Demo-registry key for the hero surface-switcher visual. Optional.",
      type: "string",
    }),
  ],
  preview: { select: { title: "title" } },
});

export const integrationsHowItWorksStep = defineType({
  name: "integrationsHowItWorksStep",
  title: "How-it-works Step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({
      name: "code",
      title: "Code",
      description: "Optional code snippet shown in the step.",
      type: "text",
      rows: 4,
    }),
  ],
  preview: { select: { title: "title" } },
});

export const integrationsStackLink = defineType({
  name: "integrationsStackLink",
  title: "Stack Link",
  type: "object",
  description: 'Band 4 ("works with the rest of your stack") link.',
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "group",
      title: "Group",
      description: 'e.g. "Sync", "Notifications out", "Storage and auth", "Frameworks".',
      type: "string",
    }),
    defineField({ name: "href", title: "Href", type: "string" }),
  ],
  preview: { select: { title: "label", subtitle: "group" } },
});

export const integrationsVertical = defineType({
  name: "integrationsVertical",
  title: "Vertical",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({
      name: "forHref",
      title: "For-page link",
      description: "e.g. /for/legal.",
      type: "string",
    }),
  ],
  preview: { select: { title: "label", subtitle: "forHref" } },
});

export const integrationsFinalCta = defineType({
  name: "integrationsFinalCta",
  title: "Final CTA",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "secondary", title: "Secondary", type: "text", rows: 3 }),
    defineField({ name: "microcopy", title: "Microcopy", type: "string" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({ name: "secondaryCta", title: "Secondary CTA", type: "ctaLink" }),
  ],
  preview: { select: { title: "title" } },
});

// ---- The document (singleton) ----

export const integrationsHubPage = defineType({
  name: "integrationsHubPage",
  title: "Integrations Hub Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "grid", title: "Grid framing" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // -- Hero --
    defineField({
      name: "hero",
      title: "Hero",
      type: "integrationsHubHero",
      group: "hero",
    }),
    defineField({
      name: "logoStripLabel",
      title: "Logo Strip Label",
      type: "string",
      group: "hero",
    }),

    // -- What it is --
    defineField({
      name: "whatItIsHeader",
      title: "What-it-is Header",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "whatItIsBody",
      title: "What-it-is Body",
      type: "text",
      rows: 5,
      group: "sections",
    }),
    defineField({
      name: "whatItIsCards",
      title: "What-it-is Feature Cards",
      type: "array",
      of: [{ type: "integrationFeatureCard" }],
      group: "sections",
    }),

    // -- How it works --
    defineField({
      name: "howItWorksHeader",
      title: "How-it-works Header",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "howItWorksSteps",
      title: "How-it-works Steps",
      type: "array",
      of: [{ type: "integrationsHowItWorksStep" }],
      group: "sections",
    }),
    defineField({
      name: "mcpBanner",
      title: "MCP Agent-install Banner",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "buildVsBuy",
      title: "Build-vs-Buy Strip",
      type: "text",
      rows: 4,
      group: "sections",
    }),

    // -- Grid framing (bands derive from integrationLibrary docs) --
    defineField({
      name: "gridHeader",
      title: "Grid Header",
      type: "string",
      group: "grid",
    }),
    defineField({
      name: "gridSupportLine",
      title: "Grid Support Line",
      type: "string",
      group: "grid",
    }),
    defineField({
      name: "surfacesSubheader",
      title: "Surfaces Sub-header",
      type: "string",
      group: "grid",
    }),
    defineField({
      name: "matrixSubheader",
      title: "Matrix Sub-header",
      type: "string",
      group: "grid",
    }),
    defineField({
      name: "matrixCaption",
      title: "Matrix Caption",
      type: "text",
      rows: 3,
      group: "grid",
    }),
    defineField({
      name: "buildWithIntro",
      title: "Build-with-Velt Band Intro",
      type: "text",
      rows: 2,
      group: "grid",
    }),
    defineField({
      name: "agentsInsideIntro",
      title: "Agents-inside-Velt Band Intro",
      type: "text",
      rows: 2,
      group: "grid",
    }),
    defineField({
      name: "stackLabel",
      title: "Works-with-stack Band Label",
      type: "string",
      group: "grid",
    }),
    defineField({
      name: "stackLinks",
      title: "Works-with-stack Links",
      type: "array",
      of: [{ type: "integrationsStackLink" }],
      group: "grid",
    }),

    // -- Bring your own surface --
    defineField({
      name: "byosHeader",
      title: "Bring-your-own-surface Header",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "byosBody",
      title: "Bring-your-own-surface Body",
      type: "text",
      rows: 4,
      group: "sections",
    }),

    // -- Verticals --
    defineField({
      name: "verticalsHeader",
      title: "Verticals Header",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "verticals",
      title: "Verticals",
      type: "array",
      of: [{ type: "integrationsVertical" }],
      group: "sections",
    }),

    // -- Related primitives --
    defineField({
      name: "relatedHeader",
      title: "Related Primitives Header",
      type: "string",
      group: "sections",
    }),
    defineField({
      name: "relatedPrimitives",
      title: "Related Primitives",
      type: "array",
      of: [{ type: "integrationFeatureCard" }],
      group: "sections",
    }),

    // -- Enterprise --
    defineField({
      name: "enterpriseLine",
      title: "Enterprise Line",
      type: "text",
      rows: 3,
      group: "sections",
    }),

    // -- FAQ --
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{ type: "faqItem" }],
      group: "faq",
    }),

    // -- Final CTA --
    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "integrationsFinalCta",
      group: "sections",
    }),

    // -- SEO --
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Integrations Hub Page" }),
  },
});
