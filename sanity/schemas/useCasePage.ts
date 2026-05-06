import { defineType, defineField } from "sanity";

// Schema for /use-case/[slug] pages — one document per use-case
// (e.g. "Video Editor", "Form Builder"). Mirrors `featurePage.ts`
// architecture: hero + polymorphic `sections[]` + chrome toggles +
// faq + seo. The polymorphic sections render between TrustedLogos
// and the standard chrome (Customer UI, Security, Customer Carousel,
// FAQ, GetStartedSteps, Footer).
//
// Section types (registered in sanity/schemas/index.ts):
//   - useCaseBentoSection      — 1- or 2-card bento with image visuals
//   - librarySupportSection    — "Works seamlessly with your libraries"
//
// To populate a new use case run scripts/seed-use-case-<slug>.mjs.

export const useCaseHero = defineType({
  name: "useCaseHero",
  title: "Use Case Hero",
  type: "object",
  fields: [
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
      title: "Sections",
      description:
        "Ordered list of content blocks rendered between the trusted-logos strip and the standard chrome (Customer UI / Security / etc.). Drag to reorder.",
      type: "array",
      group: "sections",
      of: [
        { type: "useCaseBentoSection" },
        { type: "librarySupportSection" },
      ],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: "showCustomerUI",
      title: 'Show "How [Customer] Uses Velt" carousel',
      description:
        "Renders the homepage CustomerUI carousel between the polymorphic sections and Security. Defaults to true.",
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

// ---- Section block: Use-Case Bento ----------------------------------------

export const useCaseBentoCard = defineType({
  name: "useCaseBentoCard",
  title: "Use Case Bento Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "image",
      title: "Visual",
      description:
        "Card visual (image today, video later via static asset). Falls back to a soft-purple placeholder if omitted.",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "accentColor",
      title: "Accent color (hex)",
      description:
        'Optional background tint for the card body, e.g. "#EFEEFD" for a soft purple.',
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
});

export const useCaseBentoSection = defineType({
  name: "useCaseBentoSection",
  title: "Use Case Bento Section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading (optional)",
      description: "Section heading rendered above the cards. Optional.",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      initialValue: "twoCol",
      options: {
        list: [
          { title: "Two-column (50/50)", value: "twoCol" },
          { title: "One-column (full width)", value: "oneCol" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cards",
      title: "Cards",
      description:
        "Two cards for twoCol variant; one card for oneCol variant.",
      type: "array",
      of: [{ type: "useCaseBentoCard" }],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(2)
          .custom((cards, ctx) => {
            const variant = (ctx.parent as { variant?: string } | undefined)
              ?.variant;
            if (!Array.isArray(cards)) return true;
            if (variant === "twoCol" && cards.length !== 2) {
              return "Two-column variant requires exactly 2 cards.";
            }
            if (variant === "oneCol" && cards.length !== 1) {
              return "One-column variant requires exactly 1 card.";
            }
            return true;
          }),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "variant" },
    prepare: ({ title, subtitle }) => ({
      title: `Bento: ${title ?? "(untitled)"}`,
      subtitle,
    }),
  },
});

// ---- Section block: Library Support ---------------------------------------

export const librarySupportLogo = defineType({
  name: "librarySupportLogo",
  title: "Library Logo",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
      validation: (r) => r.required(),
    }),
    defineField({ name: "href", title: "URL (optional)", type: "url" }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});

export const librarySupportSection = defineType({
  name: "librarySupportSection",
  title: "Library Support Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      description: 'e.g. "Works seamlessly with your libraries"',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "logos",
      title: "Library Logos",
      type: "array",
      of: [{ type: "librarySupportLogo" }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: `Library Support: ${title ?? "(untitled)"}`,
    }),
  },
});
