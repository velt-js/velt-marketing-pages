import { defineType, defineField } from "sanity";
import {
  FEATURE_NEW_DEMO_KEYS,
  FEATURE_NEW_DEMO_TITLES,
} from "../../components/feature-new/demo-keys";

// Schema for v1 Solutions (vertical) pages: sales-enablement, fintech,
// operations, ai-native-saas, compliance, legal. One document per vertical,
// rendered at /for/<slug> by app/for/[slug]/page.tsx via the shared
// SolutionPageView.
//
// Where the feature-page template (featurePageV2) answers "what is this
// primitive", a solutions page answers "does Velt understand MY business". It
// has a FIXED structure (template-solutions.md): hero, logo strip, review
// reality, the loop, feature map, agent layer, in production, compliance strip,
// FAQ, final CTA. Each section is its own object field. The shape mirrors
// SolutionPageContent in components/solutions-new/content.ts 1:1.
//
// Live demo visuals are not stored as data. Editors pick a `demoPreset` key
// from the same code-backed registry the feature pages use
// (components/feature-new/demo-registry.tsx). Solution-specific keys live under
// the "solutions/<slug>/..." namespace.
//
// To populate a page, run scripts/seed-solution-<slug>.mjs.

const DEMO_PRESET_OPTIONS = FEATURE_NEW_DEMO_KEYS.map((key) => ({
  title: FEATURE_NEW_DEMO_TITLES[key],
  value: key,
}));

/**
 * Build a "demo preset" dropdown field backed by the demo-registry keys.
 * @param {string} name Field name.
 * @param {string} title Field title.
 * @param {string} [description] Optional help text.
 * @returns {ReturnType<typeof defineField>} The field definition.
 */
function demoPresetField(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    description:
      description ??
      "Live demo visual rendered for this slot. Engineering wires the matching React component in components/feature-new/demo-registry.tsx (solutions/<slug>/... namespace).",
    type: "string",
    options: { list: DEMO_PRESET_OPTIONS },
  });
}

export const solutionPageV1 = defineType({
  name: "solutionPageV1",
  title: "Solution Page (vertical)",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "hero", title: "Hero" },
    { name: "sections", title: "Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // -- Identity --
    defineField({
      name: "title",
      title: "Vertical Name",
      description: 'e.g. "Sales enablement". Used in nav/listing and as the slug source.',
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL segment. e.g. 'sales-enablement' -> /for/sales-enablement.",
      type: "slug",
      group: "identity",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "breadcrumbLabel",
      title: "Breadcrumb Label",
      description: "Label used in the breadcrumb trail / WebPage schema. Defaults to Vertical Name.",
      type: "string",
      group: "identity",
    }),

    // -- Hero --
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "kicker", title: "Kicker", description: 'e.g. "For sales enablement".', type: "string" }),
        defineField({
          name: "title",
          title: "Title (fit-claim, h1)",
          description: "The vertical's review problem as Velt's claim, named in artifact nouns.",
          type: "text",
          rows: 2,
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "secondary", title: "Secondary", type: "text", rows: 4 }),
        defineField({ name: "microcopy", title: "Microcopy", type: "string" }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA", type: "ctaLink" }),
        defineField({ name: "buildChip", title: "Build-this chip (optional)", type: "ctaLink" }),
        demoPresetField("visual", "Hero visual", "This vertical's artifact mid-approval (deck, budget grid, shipment record, generated draft)."),
      ],
    }),

    // -- Sections --
    defineField({
      name: "logoStrip",
      title: "Logo Strip",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "label", title: "Label", description: "This vertical's customers only.", type: "string" }),
        defineField({
          name: "migration",
          title: "Migration sub-strip",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "links", title: "Links", type: "array", of: [{ type: "ctaLink" }] }),
          ],
        }),
      ],
    }),

    defineField({
      name: "reviewReality",
      title: "The Review Reality (checklist)",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "items",
          title: "Symptoms (3-4, vertical language)",
          type: "array",
          of: [{ type: "text", rows: 2 }],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({ name: "close", title: "Closing line", type: "text", rows: 2 }),
      ],
    }),

    defineField({
      name: "theLoop",
      title: "The Loop (centerpiece)",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({
          name: "body",
          title: "Body (agent-quotable first sentence)",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "beats",
          title: "Beats (the composed scene, ~5)",
          description:
            "Each beat is a step in the loop, rendered as a card with its own inline artifact in a linear vertical flow.",
          type: "array",
          of: [
            {
              type: "object",
              name: "vspLoopBeat",
              fields: [
                defineField({ name: "num", title: "Number label", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
                demoPresetField("visual", "Beat artifact", "The live demo visual rendered inside this step's card."),
                defineField({ name: "beta", title: "Beta", type: "boolean", initialValue: false }),
                defineField({ name: "links", title: "Feature links", type: "array", of: [{ type: "ctaLink" }] }),
              ],
              preview: { select: { title: "title", subtitle: "num" } },
            },
          ],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: "caption",
          title: "Closing caption (mono)",
          description: 'Optional one-line summary under the flow, e.g. "// one email, five steps, one record."',
          type: "text",
          rows: 2,
        }),
      ],
    }),

    defineField({
      name: "featureMap",
      title: "Feature Map",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "support", title: "Support line", type: "text", rows: 3 }),
        defineField({
          name: "cards",
          title: "Cards (4-6, ranked by what this vertical buys first)",
          type: "array",
          of: [
            {
              type: "object",
              name: "vspFeatureCard",
              fields: [
                defineField({ name: "num", title: "Number label", type: "string" }),
                defineField({ name: "name", title: "Feature name", type: "string", validation: (rule) => rule.required() }),
                defineField({
                  name: "oneLiner",
                  title: "Vertical one-liner",
                  description: "Vertical-specific rewrite, never the homepage line verbatim.",
                  type: "text",
                  rows: 3,
                }),
                defineField({ name: "link", title: "Link to feature page", type: "ctaLink" }),
                defineField({ name: "code", title: "Code", type: "text", rows: 4 }),
                demoPresetField("preview", "Preview (visual)"),
                defineField({ name: "beta", title: "Beta", type: "boolean", initialValue: false }),
              ],
              preview: { select: { title: "name", subtitle: "preview" } },
            },
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),

    defineField({
      name: "agentLayer",
      title: "Agent Action Layer (vertical edition)",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "body", title: "Body", type: "text", rows: 6 }),
        demoPresetField("visual", "Storyboard visual", "Agent proposes, human approves, change applies, audit line."),
      ],
    }),

    defineField({
      name: "inProduction",
      title: "In Production (case study)",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "body", title: "Body", type: "text", rows: 4 }),
        defineField({ name: "metric", title: "Metric (optional)", type: "string" }),
        defineField({ name: "quote", title: "Quote (this vertical only)", type: "text", rows: 4 }),
        defineField({ name: "who", title: "Attribution", type: "string" }),
        defineField({
          name: "screenshot",
          title: "Customer screenshot",
          description: "Preferred. If set, it renders instead of the demo preset.",
          type: "image",
          options: { hotspot: true },
        }),
        demoPresetField("visual", "Visual (fallback when no screenshot)"),
        defineField({ name: "ctaBanner", title: "CTA Banner", type: "vfpCtaBanner" }),
      ],
    }),

    defineField({
      name: "compliance",
      title: "Compliance Strip (tuned to vertical)",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "lead", title: "Lead line", type: "text", rows: 3 }),
        defineField({
          name: "items",
          title: "Trust items (2-3, the leading concern first)",
          type: "array",
          of: [
            {
              type: "object",
              name: "vspComplianceItem",
              fields: [
                defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
                defineField({ name: "link", title: "Link", type: "ctaLink" }),
              ],
              preview: { select: { title: "title" } },
            },
          ],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({ name: "note", title: "Verification note (optional)", type: "text", rows: 2 }),
      ],
    }),

    defineField({
      name: "faq",
      title: "FAQ",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "items", title: "Items (buying questions + 1 pricing)", type: "array", of: [{ type: "faqItem" }], validation: (rule) => rule.required().min(1) }),
      ],
    }),

    defineField({
      name: "finalCta",
      title: "Final CTA",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA", type: "ctaLink" }),
        defineField({ name: "microcopies", title: "Microcopies", type: "array", of: [{ type: "string" }] }),
      ],
    }),

    // -- SEO --
    defineField({ name: "metaTitle", title: "Meta Title", type: "string", group: "seo" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 2, group: "seo" }),
    defineField({ name: "ogImage", title: "OG Image", type: "image", group: "seo" }),
  ],
  orderings: [
    { title: "Title, A-Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "(untitled)",
      subtitle: subtitle ? `/for/${subtitle}` : "vertical solutions page",
    }),
  },
});
