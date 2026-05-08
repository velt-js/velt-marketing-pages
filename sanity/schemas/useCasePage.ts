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
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "ctaLink",
      initialValue: {
        label: "Get Free API Key",
        href: "https://console.velt.dev/",
        newTab: true,
      },
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaLink",
      initialValue: {
        label: "Book Demo",
        href: "/book-demo",
      },
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
      name: "icon",
      title: "Icon",
      description: "Mirrors Framer Icon. Used as the listing card icon.",
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
      name: "previewBanner",
      title: "Preview Banner",
      description:
        "Two-line banner above the hero. Mirrors Framer preview_title_1/2.",
      type: "useCasePreviewBanner",
      group: "hero",
    }),

    defineField({
      name: "sections",
      title: "Feature rows",
      description:
        "Ordered list of 2-column feature rows (Build / Review / Approve in the reference Figma). Image alternates left/right per row. Drag to reorder. New docs are pre-populated with the Build / Review / Approve scaffold; fill in heading + description per page.",
      type: "array",
      group: "sections",
      of: [{ type: "useCaseFeatureRow" }],
      validation: (rule) => rule.required().min(1),
      initialValue: [
        {
          _key: "row-build",
          _type: "useCaseFeatureRow",
          eyebrow: "Build",
          imagePosition: "right",
          features: [
            {
              _key: "build-live-state-sync",
              _type: "useCaseFeatureChip",
              label: "Live State Sync",
            },
            {
              _key: "build-single-editor-mode",
              _type: "useCaseFeatureChip",
              label: "Single Editor Mode",
            },
          ],
        },
        {
          _key: "row-review",
          _type: "useCaseFeatureRow",
          eyebrow: "Review",
          imagePosition: "left",
          features: [
            {
              _key: "review-live-state-sync",
              _type: "useCaseFeatureChip",
              label: "Live State Sync",
            },
            {
              _key: "review-single-editor-mode",
              _type: "useCaseFeatureChip",
              label: "Single Editor Mode",
            },
          ],
        },
        {
          _key: "row-approve",
          _type: "useCaseFeatureRow",
          eyebrow: "Approve",
          imagePosition: "right",
          features: [
            {
              _key: "approve-live-state-sync",
              _type: "useCaseFeatureChip",
              label: "Live State Sync",
            },
            {
              _key: "approve-single-editor-mode",
              _type: "useCaseFeatureChip",
              label: "Single Editor Mode",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "problemSection",
      title: "Problem Section",
      description: "Mirrors Framer problem__* (3 image+text cards under two title lines).",
      type: "useCaseProblemSection",
      group: "sections",
    }),
    defineField({
      name: "exampleSection",
      title: "Example Section",
      description:
        "Mirrors Framer example__* (video + image + 4 feature texts + sandbox/docs links).",
      type: "useCaseExampleSection",
      group: "sections",
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      description: "Mirrors Framer testimonial__* (per-page testimonial block).",
      type: "useCaseTestimonial",
      group: "sections",
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      description:
        "Up to 4 benefit blocks. Mirrors Framer benefit__1..4__* (each with 4 sub-use-cases).",
      type: "array",
      group: "sections",
      of: [{ type: "useCaseBenefit" }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "codeSnippet",
      title: "Code Snippet",
      description: "Mirrors Framer code field. Uses @sanity/code-input.",
      type: "code",
      group: "sections",
    }),
    defineField({
      name: "actionCallout",
      title: "Action Callout",
      description:
        "Closing CTA text. Mirrors Framer action__text_1/2/3 (3 lines, no link).",
      type: "useCaseActionCallout",
      group: "sections",
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

// ---- Framer-shaped sub-types ----------------------------------------------
// These mirror Framer's `Use Case` collection (twoGcl0mT) so MT (or a manual
// port) can faithfully populate every Framer slot. All optional on the parent
// doc — Video Editor (seeded against the legacy `sections[]`) keeps rendering
// unchanged. Render wiring for these new fields is a follow-up tied to Figma.

export const useCasePreviewBanner = defineType({
  name: "useCasePreviewBanner",
  title: "Preview Banner",
  type: "object",
  fields: [
    defineField({ name: "title1", title: "Line 1", type: "string" }),
    defineField({ name: "title2", title: "Line 2", type: "string" }),
  ],
});

export const useCaseProblemItem = defineType({
  name: "useCaseProblemItem",
  title: "Problem Item",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "text", media: "image" } },
});

export const useCaseProblemSection = defineType({
  name: "useCaseProblemSection",
  title: "Problem Section",
  type: "object",
  fields: [
    defineField({ name: "title1", title: "Title Line 1", type: "string" }),
    defineField({ name: "title2", title: "Title Line 2", type: "string" }),
    defineField({
      name: "items",
      title: "Items",
      description:
        "Up to 3 problem cards (image + text). Mirrors Framer's problem__1/2/3 fields.",
      type: "array",
      of: [{ type: "useCaseProblemItem" }],
      validation: (r) => r.max(3),
    }),
  ],
});

export const useCaseExampleSection = defineType({
  name: "useCaseExampleSection",
  title: "Example Section",
  type: "object",
  fields: [
    defineField({ name: "video", title: "Video", type: "file" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "exampleUrl",
      title: "Example URL (text)",
      description:
        "Plain string per Framer (`example_URL`). Use `Sandbox Link` / `Docs Link` for navigable links.",
      type: "string",
    }),
    defineField({ name: "sandboxLink", title: "Sandbox Link", type: "url" }),
    defineField({ name: "docsLink", title: "Docs Link", type: "url" }),
    defineField({
      name: "featureCountText",
      title: "Feature Count Caption",
      description: 'e.g. "4 collaboration features".',
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Feature Texts",
      description:
        "Up to 4 feature labels. Mirrors Framer's example__feature_1..4__text.",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.max(4),
    }),
  ],
});

export const useCaseTestimonial = defineType({
  name: "useCaseTestimonial",
  title: "Use Case Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      description: "Maps to Framer `testimonial__title`.",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "roleAndCompany",
      title: "Role & Company",
      description: 'Single field per Framer (`testimonial__role_&_company`).',
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
    }),
  ],
  preview: { select: { title: "name", subtitle: "roleAndCompany", media: "logo" } },
});

export const useCaseActionCallout = defineType({
  name: "useCaseActionCallout",
  title: "Action Callout",
  type: "object",
  fields: [
    defineField({ name: "text1", title: "Line 1", type: "string" }),
    defineField({ name: "text2", title: "Line 2", type: "string" }),
    defineField({ name: "text3", title: "Line 3", type: "string" }),
  ],
});

export const useCaseBenefitSubCase = defineType({
  name: "useCaseBenefitSubCase",
  title: "Benefit Sub-Use-Case",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "link", title: "Link", type: "url" }),
  ],
  preview: { select: { title: "name", media: "image" } },
});

export const useCaseBenefit = defineType({
  name: "useCaseBenefit",
  title: "Benefit Block",
  type: "object",
  fields: [
    defineField({ name: "tag", title: "Tag", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      description:
        "Plain text. Framer used formattedText; we degrade to plain rows pending portable-text upgrade.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "useCases",
      title: "Sub-Use-Cases",
      description:
        "Up to 4 cards. Mirrors Framer's benefit__N__use_case_1..4__* slots.",
      type: "array",
      of: [{ type: "useCaseBenefitSubCase" }],
      validation: (r) => r.max(4),
    }),
  ],
  preview: { select: { title: "title", subtitle: "tag", media: "image" } },
});
