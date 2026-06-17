import { defineType, defineField } from "sanity";
import {
  FEATURE_NEW_DEMO_KEYS,
  FEATURE_NEW_DEMO_TITLES,
  FEATURE_NEW_ICON_KEYS,
  FEATURE_NEW_ICON_TITLES,
} from "../../components/feature-new/demo-keys";

// Schema for v10-template feature pages (Audit Trail, Memory, Notifications,
// Presence, ...). One document per feature, rendered at /new-features/<slug>
// by app/new-features/[slug]/page.tsx via the shared FeaturePageView.
//
// Unlike the legacy `featurePage` (polymorphic bento sections), this template
// has a FIXED 13-section structure: every page has the same sections in the
// same order, so each section is its own object field (not a reorderable
// array). The shape mirrors FeaturePageContent in
// components/feature-new/content.ts 1:1.
//
// Live demo visuals are not stored as data. Editors pick a `demoPreset` key
// from a code-backed registry (components/feature-new/demo-registry.tsx);
// engineering builds the matching React demo. All surrounding copy and the
// Preview|Code snippets ARE editable fields here.
//
// To populate a page, run scripts/seed-feature-v2-<slug>.mjs.

const DEMO_PRESET_OPTIONS = FEATURE_NEW_DEMO_KEYS.map((key) => ({
  title: FEATURE_NEW_DEMO_TITLES[key],
  value: key,
}));

const ICON_OPTIONS = FEATURE_NEW_ICON_KEYS.map((key) => ({
  title: FEATURE_NEW_ICON_TITLES[key],
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
      "Live demo visual rendered for this slot. Engineering wires the matching React component in components/feature-new/demo-registry.tsx.",
    type: "string",
    options: { list: DEMO_PRESET_OPTIONS },
  });
}

// ---- Shared sub-types (registered in index.ts) ----

export const vfpCtaBanner = defineType({
  name: "vfpCtaBanner",
  title: "CTA Banner",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "microcopy", title: "Microcopy", type: "string" }),
    defineField({ name: "cta", title: "CTA", type: "ctaLink" }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: { list: ["primary", "secondary"] },
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `CTA Banner: ${title ?? ""}` }) },
});

export const vfpInterstitial = defineType({
  name: "vfpInterstitial",
  title: "Interstitial Quote",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "who", title: "Attribution", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "who", subtitle: "quote" } },
});

// ---- The document ----

export const featurePageV2 = defineType({
  name: "featurePageV2",
  title: "Feature Page (v10 template)",
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
      title: "Feature Name",
      description: 'e.g. "Audit Trail". Used in nav/listing and as the slug source.',
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL segment. e.g. 'audit-trail' -> /new-features/audit-trail.",
      type: "slug",
      group: "identity",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "beta",
      title: "Beta page",
      description: "Page-level Beta badge (hero chip, nav tag). Meta titles stay clean.",
      type: "boolean",
      group: "identity",
      initialValue: false,
    }),
    defineField({
      name: "breadcrumbLabel",
      title: "Breadcrumb Label",
      description: "Label used in the breadcrumb trail / WebPage schema. Defaults to Feature Name.",
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
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "secondary", title: "Secondary", type: "text", rows: 3 }),
        defineField({ name: "accent", title: "Accent (Prevents line)", type: "text", rows: 2 }),
        defineField({ name: "microcopy", title: "Microcopy", type: "string" }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA", type: "ctaLink" }),
        defineField({ name: "buildChip", title: "Build-this chip", type: "ctaLink" }),
        defineField({
          name: "demoTabs",
          title: "Demo Tabs",
          type: "array",
          of: [
            {
              type: "object",
              name: "vfpHeroTab",
              fields: [
                defineField({ name: "id", title: "Anchor id", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "label", title: "Tab label", type: "string", validation: (rule) => rule.required() }),
                demoPresetField("demoPreset", "Demo"),
              ],
              preview: { select: { title: "label", subtitle: "demoPreset" } },
            },
          ],
          validation: (rule) => rule.required().min(1),
        }),
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
        defineField({ name: "label", title: "Label", type: "string" }),
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
      name: "whatItIs",
      title: "What It Is",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "body", title: "Body", type: "text", rows: 6 }),
        defineField({ name: "docLinks", title: "Doc Links", type: "array", of: [{ type: "ctaLink" }] }),
        demoPresetField("scene", "Mixed scene (visual)"),
      ],
    }),

    defineField({
      name: "howItWorks",
      title: "How It Works",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "support", title: "Support line", type: "text", rows: 3 }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              type: "object",
              name: "vfpStep",
              fields: [
                defineField({ name: "kicker", title: "Kicker", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "filename", title: "Editor filename", type: "string" }),
                defineField({ name: "code", title: "Code", type: "text", rows: 6 }),
                defineField({ name: "copyText", title: "Copy text (optional override)", type: "text", rows: 4 }),
              ],
              preview: { select: { title: "title", subtitle: "filename" } },
            },
          ],
        }),
        defineField({
          name: "mechanics",
          title: "Mechanics",
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 6 }),
            defineField({ name: "microcopy", title: "Microcopy", type: "string" }),
          ],
        }),
        defineField({
          name: "buildVsBuy",
          title: "Build vs Buy",
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "items", title: "Items", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "close", title: "Closing line", type: "text", rows: 3 }),
          ],
        }),
        defineField({
          name: "mcp",
          title: "MCP banner",
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "sub", title: "Subheading", type: "string" }),
            defineField({
              name: "tabs",
              title: "Tool tabs",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "vfpMcpTab",
                  fields: [
                    defineField({ name: "id", title: "Anchor id", type: "string" }),
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "command", title: "Command", type: "string" }),
                  ],
                  preview: { select: { title: "label", subtitle: "command" } },
                },
              ],
            }),
          ],
        }),
        defineField({
          name: "integrations",
          title: "Integration strip (grouped)",
          type: "array",
          of: [
            {
              type: "object",
              name: "vfpIntegrationGroup",
              fields: [
                defineField({ name: "label", title: "Group label", type: "string" }),
                defineField({
                  name: "chips",
                  title: "Chips",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      name: "vfpIntegrationChip",
                      fields: [
                        defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
                        defineField({ name: "href", title: "URL", type: "string" }),
                        defineField({ name: "newTab", title: "Open in new tab", type: "boolean", initialValue: true }),
                        defineField({
                          name: "icon",
                          title: "Icon",
                          description: "Public path to a logo (e.g. /images/home/nav-icons/react.svg). Optional.",
                          type: "string",
                        }),
                      ],
                      preview: { select: { title: "label", subtitle: "href" } },
                    },
                  ],
                }),
              ],
              preview: { select: { title: "label" } },
            },
          ],
        }),
        defineField({ name: "ctaBanner", title: "CTA Banner #1", type: "vfpCtaBanner" }),
      ],
    }),

    defineField({
      name: "showcase",
      title: "Showcase (Capabilities)",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "support", title: "Support line", type: "text", rows: 3 }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "vfpShowcaseCard",
              fields: [
                defineField({ name: "num", title: "Number label", type: "string" }),
                defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "codeKicker", title: "Code kicker", type: "string" }),
                defineField({ name: "headline", title: "Headline / body", type: "text", rows: 3 }),
                demoPresetField("preview", "Preview (visual)"),
                defineField({ name: "code", title: "Code", type: "text", rows: 5 }),
                defineField({ name: "copyText", title: "Copy text (optional override)", type: "text", rows: 4 }),
                defineField({ name: "comingSoon", title: "Coming soon", type: "boolean", initialValue: false }),
              ],
              preview: { select: { title: "name", subtitle: "preview" } },
            },
          ],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({ name: "docLinks", title: "Doc Links", type: "array", of: [{ type: "ctaLink" }] }),
        defineField({ name: "interstitial", title: "Interstitial quote #1", type: "vfpInterstitial" }),
      ],
    }),

    defineField({
      name: "details",
      title: "Little Big Details",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "support", title: "Support line", type: "text", rows: 3 }),
        defineField({
          name: "visibleCount",
          title: "Visible count (before expand)",
          type: "number",
          initialValue: 12,
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            {
              type: "object",
              name: "vfpDetailItem",
              fields: [
                defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "soon", title: "Coming soon", type: "boolean", initialValue: false }),
              ],
              preview: {
                select: { title: "label", soon: "soon" },
                prepare: ({ title, soon }) => ({ title, subtitle: soon ? "Coming soon" : undefined }),
              },
            },
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),

    defineField({
      name: "makeItYours",
      title: "Make It Yours",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "support", title: "Support line", type: "text", rows: 3 }),
        defineField({
          name: "cards",
          title: "Cards (Look / Behavior)",
          type: "array",
          of: [
            {
              type: "object",
              name: "vfpMakeItYoursCard",
              fields: [
                defineField({ name: "iconKey", title: "Icon", type: "string", options: { list: ICON_OPTIONS } }),
                defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
                demoPresetField("preview", "Preview (visual)"),
                defineField({ name: "code", title: "Code", type: "text", rows: 5 }),
                defineField({ name: "copyText", title: "Copy text (optional override)", type: "text", rows: 4 }),
              ],
              preview: { select: { title: "title", subtitle: "preview" } },
            },
          ],
        }),
        defineField({ name: "interstitial", title: "Interstitial quote #2", type: "vfpInterstitial" }),
      ],
    }),

    defineField({
      name: "inProduction",
      title: "In Production + Where It Fits",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "support", title: "Support line", type: "text", rows: 3 }),
        defineField({
          name: "tabs",
          title: "Tabs (by vertical)",
          type: "array",
          of: [
            {
              type: "object",
              name: "vfpProdTab",
              fields: [
                defineField({ name: "id", title: "Anchor id", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "label", title: "Tab label", type: "string", validation: (rule) => rule.required() }),
                defineField({
                  name: "screenshot",
                  title: "Customer screenshot",
                  description: "Preferred per template. If set, it renders instead of the demo preset.",
                  type: "image",
                  options: { hotspot: true },
                }),
                demoPresetField("demoPreset", "Demo preset (fallback when no screenshot)"),
                defineField({ name: "caption", title: "Caption", type: "text", rows: 3 }),
                defineField({ name: "link", title: "Link", type: "ctaLink" }),
              ],
              preview: { select: { title: "label", media: "screenshot" } },
            },
          ],
        }),
        defineField({
          name: "whereItFits",
          title: "Where it fits link row",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "links", title: "Links", type: "array", of: [{ type: "ctaLink" }] }),
          ],
        }),
        defineField({ name: "ctaBanner", title: "CTA Banner #2", type: "vfpCtaBanner" }),
      ],
    }),

    defineField({
      name: "related",
      title: "Related Primitives",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "support", title: "Support line", type: "text", rows: 3 }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "vfpRelatedCard",
              fields: [
                defineField({ name: "iconKey", title: "Icon", type: "string", options: { list: ICON_OPTIONS } }),
                defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
                demoPresetField("visual", "Mini visual"),
                defineField({ name: "link", title: "Link", type: "ctaLink" }),
              ],
              preview: { select: { title: "title", subtitle: "visual" } },
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "enterprise",
      title: "Enterprise Readiness Strip",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "badges", title: "Badges", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "line", title: "Trust line", type: "text", rows: 5 }),
        defineField({
          name: "links",
          title: "Inline links",
          description: "Rendered after the trust line (e.g. self-hosting, governance).",
          type: "array",
          of: [{ type: "ctaLink" }],
        }),
        defineField({ name: "cta", title: "CTA", type: "ctaLink" }),
      ],
    }),

    defineField({
      name: "testimonials",
      title: "Testimonial Wall",
      type: "object",
      group: "sections",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "kicker", title: "Kicker", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "support", title: "Support line", type: "text", rows: 3 }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              name: "vfpTestimonialCard",
              fields: [
                defineField({ name: "metric", title: "Metric", type: "string" }),
                defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (rule) => rule.required() }),
                defineField({ name: "who", title: "Attribution", type: "string" }),
              ],
              preview: { select: { title: "metric", subtitle: "quote" } },
            },
          ],
        }),
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
        defineField({ name: "items", title: "Items", type: "array", of: [{ type: "faqItem" }], validation: (rule) => rule.required().min(1) }),
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
      subtitle: subtitle ? `/new-features/${subtitle}` : "v10 feature page",
    }),
  },
});
