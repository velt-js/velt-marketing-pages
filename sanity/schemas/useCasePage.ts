import { defineType, defineField } from "sanity";

// Schema for /use-case/[slug] pages — one document per use-case
// (e.g. "Video Editor", "Form Builder"). Mirrors the Figma 2026
// template (HqWIZdR6ISJmaG2n4o3gr8 node 177:55703):
//   1. Hero — eyebrow + heading + subheading + CTAs (decorated bg)
//   2. TrustedLogos (chrome)
//   3. sections[] — N×useCaseFeatureRow (alternating 2-col text+image)
//   4. CustomerUI — "How [Customer] Uses Velt" carousel (toggle:
//      `showCustomerUI`).
//   5. Library showcase — fixed `AllLibraries` block (data sourced from
//      components/library/shared-content.ts, NOT this schema). Toggle
//      with `showLibrarySection`.
//   6. Security / Customer Carousel / FAQ / GetStartedSteps / Footer —
//      toggleable chrome.
//
// To populate / migrate a use case, edit + re-run scripts/seed-use-case-<slug>.mjs
// (idempotent — uses createOrReplace).

export const useCaseHero = defineType({
  name: "useCaseHero",
  title: "Use Case Hero",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description:
        'Small all-caps label above the heading, e.g. "Video Editor".',
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "decorated",
      title: "Decorated background",
      description:
        "Pixel-grid background + Sean/Emma cursor overlays. Default for use-case pages.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaLink",
    }),
  ],
});

export const useCaseFaq = defineType({
  name: "useCaseFaq",
  title: "Use Case FAQ",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
});

export const useCasePage = defineType({
  name: "useCasePage",
  title: "Use Case Page",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "hero", title: "Hero" },
    { name: "sections", title: "Sections" },
    { name: "chrome", title: "Page Chrome" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Use Case Name",
      description:
        'e.g. "Video Editor". Used in nav/listing and as the slug source.',
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "URL segment. e.g. 'video-editor' → /use-case/video-editor. Must match the slug in components/use-case/use-case-cards.ts so the listing page links resolve.",
      type: "slug",
      group: "identity",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short one-liner shown on the /use-case listing card.",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "thumbnail",
      title: "Listing Thumbnail",
      description:
        "Image shown on the /use-case listing card (594×404). Optional — listing card can fall back to a static image.",
      type: "image",
      group: "identity",
      options: { hotspot: false },
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "useCaseHero",
      group: "hero",
      options: { collapsible: true, collapsed: false },
    }),

    defineField({
      name: "sections",
      title: "Feature rows",
      description:
        "Ordered list of 2-column feature rows (Build / Review / Approve in the reference Figma). Image alternates left/right per row. Drag to reorder.",
      type: "array",
      group: "sections",
      of: [{ type: "useCaseFeatureRow" }],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: "showCustomerUI",
      title: 'Show "How [Customer] Uses Velt" carousel',
      description:
        "Renders the homepage CustomerUI carousel between the feature rows and the libraries section. Defaults to true.",
      type: "boolean",
      group: "chrome",
      initialValue: true,
    }),
    defineField({
      name: "showLibrarySection",
      title: 'Show "Works seamlessly with your libraries" section',
      description:
        "Renders the categorised libraries grid (same 10-library data as /libraries) immediately after the CustomerUI carousel. Defaults to true.",
      type: "boolean",
      group: "chrome",
      initialValue: true,
    }),
    defineField({
      name: "showSecurity",
      title: "Show Enterprise Security block",
      description:
        "Renders the standard Security component before the customer carousel. Defaults to true.",
      type: "boolean",
      group: "chrome",
      initialValue: true,
    }),
    defineField({
      name: "showCustomerCarousel",
      title: 'Show "Our Customers Trust Us" carousel',
      description:
        "Renders the FeatureCustomerCarousel before the FAQ. Defaults to true.",
      type: "boolean",
      group: "chrome",
      initialValue: true,
    }),
    defineField({
      name: "getStartedSteps",
      title: "Get Started Steps",
      type: "getStartedSteps",
      group: "chrome",
    }),

    defineField({
      name: "faq",
      title: "FAQ (use-case-specific)",
      type: "useCaseFaq",
      group: "faq",
    }),

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
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Title, A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "tagline", media: "thumbnail" },
  },
});

// ---- Section block: Use-Case Feature Row ----------------------------------

export const useCaseFeatureChip = defineType({
  name: "useCaseFeatureChip",
  title: "Feature Chip",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description:
        'Pill text under the row body, e.g. "Live State Sync", "Single Editor Mode".',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "URL (optional)",
      description: "If set, the chip becomes a link.",
      type: "url",
      validation: (r) =>
        r.uri({ allowRelative: true, scheme: ["http", "https"] }),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const useCaseFeatureRow = defineType({
  name: "useCaseFeatureRow",
  title: "Use Case Feature Row",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description: 'Pill above the heading, e.g. "Build" / "Review" / "Approve".',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "features",
      title: "Feature chips",
      description:
        "Up to 3 small pills under the body, typically the Velt features this row demonstrates.",
      type: "array",
      of: [{ type: "useCaseFeatureChip" }],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: "image",
      title: "Visual",
      description:
        "Right- or left-side screenshot/illustration. Falls back to a soft placeholder if omitted.",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "imagePosition",
      title: "Image position",
      type: "string",
      initialValue: "right",
      options: {
        list: [
          { title: "Right (text on left)", value: "right" },
          { title: "Left (text on right)", value: "left" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "eyebrow",
      media: "image",
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? "(untitled row)",
      subtitle: subtitle ? `Eyebrow: ${subtitle}` : undefined,
      media,
    }),
  },
});
