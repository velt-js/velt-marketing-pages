import { defineType, defineField } from "sanity";
import {
  ILLUSTRATION_KEYS,
  ILLUSTRATION_TITLES,
} from "../../components/library/illustrations/keys";

// Schema for /libraries/[slug] pages. One document per library (Yjs,
// Tiptap, BlockNote, …). Fields mirror the props of the components in
// /components/library/* so the dynamic route at app/libraries/[slug]
// becomes a thin pass-through from CMS to component.
//
// The shared FAQ items, the "All Libraries" grid, and the trusted-logos
// strip are intentionally NOT stored here — they live in
// components/library/shared-content.ts and are appended at render time.
//
// To populate a new library, run scripts/seed-library-<slug>.mjs.

export const libraryHero = defineType({
  name: "libraryHero",
  title: "Library Hero",
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
        "Pixel-grid background + Sean/Emma cursor overlays. Default for per-library pages.",
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

export const libraryDemoStage = defineType({
  name: "libraryDemoStage",
  title: "Library Demo Stage",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Library Label",
      description: 'Used in alt text and aria, e.g. "Yjs".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "demoUrl",
      title: "Demo URL",
      description: "URL the iframe loads when the user clicks TRY DEMO.",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "previewImage",
      title: "Preview Image",
      description: "Static screenshot shown before TRY DEMO is clicked.",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
  ],
});

export const libraryBento = defineType({
  name: "libraryBento",
  title: "Library Bento",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description:
        'Small all-caps purple pill, e.g. "No Custom Logic Required".',
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      description: 'e.g. "Built for Yjs"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "viewDocsCta", title: "View Docs CTA", type: "ctaLink" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "rowHeights",
      title: "Row Heights (px)",
      description:
        "Explicit row heights for the 2-column grid. Length determines row count and must equal cards.length / 2. Defaults to [493, 429, 424, 424] (tiptap/yjs) when omitted.",
      type: "array",
      of: [{ type: "number" }],
    }),
    defineField({
      name: "cards",
      title: "Cards (paired into 2 columns)",
      description:
        "Cards must come in pairs (2 columns). Total cards = rowHeights.length × 2 if rowHeights is set; otherwise must equal 8.",
      type: "array",
      of: [{ type: "bentoCard" }],
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .custom((cards) =>
            Array.isArray(cards) && cards.length % 2 === 0
              ? true
              : "Bento cards must come in pairs (2 columns).",
          ),
    }),
  ],
});

export const libraryCodeSnippet = defineType({
  name: "libraryCodeSnippet",
  title: "Inline Code Snippet",
  type: "object",
  fields: [
    defineField({ name: "code", title: "Code", type: "text", rows: 12 }),
    defineField({
      name: "language",
      title: "Language",
      description:
        'e.g. "tsx", "ts", "js". Used as a className on the <code> element.',
      type: "string",
    }),
  ],
});

export const libraryGetStartedCallout = defineType({
  name: "libraryGetStartedCallout",
  title: "Get-Started Callout",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "viewDocsHref",
      title: "View Docs URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "getApiKeyHref",
      title: "Get API Key URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "codeImage",
      title: "Code Snippet Image",
      description:
        "PNG/SVG render of the setup code. Rendered max-width 1280. Takes precedence over codeSnippet if both are set.",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "codeImageAlt",
      title: "Code Image Alt Text",
      type: "string",
    }),
    defineField({
      name: "codeSnippet",
      title: "Inline Code Snippet",
      description:
        "Renders as a <pre> block when no codeImage is set. Use this when you want the code as text instead of a PNG.",
      type: "libraryCodeSnippet",
    }),
  ],
});

export const libraryFaq = defineType({
  name: "libraryFaq",
  title: "Library FAQ",
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

export const libraryPage = defineType({
  name: "libraryPage",
  title: "Library Page",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "hero", title: "Hero" },
    { name: "demo", title: "Demo" },
    { name: "bento", title: "Built-for Bento" },
    { name: "testimonial", title: "Testimonial" },
    { name: "callout", title: "Get-Started Callout" },
    { name: "steps", title: "Get Started Steps" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ---- Identity ----
    defineField({
      name: "title",
      title: "Library Name",
      description: 'e.g. "Yjs". Used in nav/listing and as the slug source.',
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL segment. e.g. 'yjs' → /libraries/yjs",
      type: "slug",
      group: "identity",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description:
        'Filter chip on /libraries (e.g. "Text Editor", "Charts", "Canvas").',
      type: "string",
      group: "identity",
      options: {
        list: [
          { title: "Text Editor", value: "Text Editor" },
          { title: "Charts", value: "Charts" },
          { title: "Canvas", value: "Canvas" },
        ],
      },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short one-liner shown on the /libraries listing card.",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "logo",
      title: "Listing Logo",
      description: "Icon/logo shown on the /libraries listing card.",
      type: "image",
      group: "identity",
      options: { hotspot: false },
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "libraryHero",
      group: "hero",
      options: { collapsible: true, collapsed: false },
    }),

    defineField({
      name: "demoStage",
      title: "Demo Stage",
      type: "libraryDemoStage",
      group: "demo",
      options: { collapsible: true, collapsed: false },
    }),

    defineField({
      name: "bento",
      title: "Built-for Bento",
      type: "libraryBento",
      group: "bento",
      options: { collapsible: true, collapsed: false },
    }),

    defineField({
      name: "inlineTestimonial",
      title: "Inline Testimonial",
      description:
        "Mid-page testimonial card that sits between the bento and the get-started callout.",
      type: "inlineTestimonial",
      group: "testimonial",
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: "getStartedCallout",
      title: "Get-Started Callout",
      type: "libraryGetStartedCallout",
      group: "callout",
      options: { collapsible: true, collapsed: false },
    }),

    defineField({
      name: "getStartedSteps",
      title: "Get Started Steps",
      type: "getStartedSteps",
      group: "steps",
    }),

    defineField({
      name: "faq",
      title: "FAQ (library-specific)",
      description:
        "Library-specific Q&A. Rendered before the 4 shared general Q&A from components/library/shared-content.ts.",
      type: "libraryFaq",
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
    {
      title: "Category",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "logo",
    },
  },
});

// ---- Reusable inline objects ----

export const ctaLink = defineType({
  name: "ctaLink",
  title: "CTA Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href", title: "URL", type: "string" }),
    defineField({
      name: "newTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

export const bentoCard = defineType({
  name: "bentoCard",
  title: "Bento Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "illustrationKey",
      title: "Illustration",
      description:
        "Picks a registered React illustration from components/library/illustrations. Use this OR Card Image — not both.",
      type: "string",
      options: {
        list: ILLUSTRATION_KEYS.map((key) => ({
          title: ILLUSTRATION_TITLES[key],
          value: key,
        })),
      },
    }),
    defineField({
      name: "image",
      title: "Card Image",
      description:
        "Illustration-only PNG/SVG (no baked-in title) — rendered top-aligned at full width. Title and description still render as a CMS-driven overlay at the bottom-left.",
      type: "image",
      options: { hotspot: false },
    }),
  ],
  validation: (rule) =>
    rule.custom((card) => {
      if (!card) return true;
      const hasIllustration = Boolean(
        (card as { illustrationKey?: string }).illustrationKey,
      );
      const hasImage = Boolean((card as { image?: unknown }).image);
      if (hasIllustration && hasImage) {
        return "Set either Illustration or Card Image, not both.";
      }
      if (!hasIllustration && !hasImage) {
        return "Either Illustration or Card Image is required.";
      }
      return true;
    }),
  preview: {
    select: {
      title: "title",
      subtitle: "illustrationKey",
      media: "image",
    },
  },
});
