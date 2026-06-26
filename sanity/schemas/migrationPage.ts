import { defineType, defineField } from "sanity";

// Schema for /migrate/[slug] pages — one document per competitor
// migration (e.g. "Liveblocks", "Cord"). Mirrors the Figma 2026
// template (HqWIZdR6ISJmaG2n4o3gr8 node 217:1642):
//   1. Hero            — useCaseHero (reused)
//   2. TrustedLogos    — chrome (toggle)
//   3. MigrationSteps  — dark 3-column pill-chain panel + testimonial strip
//   4. Feature rows    — useCaseFeatureRow (reused, no chips)
//   5. Customer carousel — FeatureCustomerCarousel (heading/subheading override only;
//                          cards come from the carousel's hardcoded defaults)
//   6. FAQ             — useCaseFaq (reused)
//   7. Footer          — chrome (always rendered)
//
// To populate / migrate, edit + re-run scripts/seed-migrate-<slug>.mjs
// (idempotent — uses createOrReplace).

export const migrationStep = defineType({
  name: "migrationStep",
  title: "Migration Step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: 'e.g. "1. Export Data from Liveblocks".',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export const migrationStepsTestimonial = defineType({
  name: "migrationStepsTestimonial",
  title: "Migration Steps Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      description: 'e.g. "Product Manager @HeyGen".',
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "quotePrefix",
      title: "Quote: leading text",
      description: 'Plain text before the highlighted phrase, e.g. "Velt hosts all collaboration functionalities needed to ".',
      type: "string",
    }),
    defineField({
      name: "quoteHighlight",
      title: "Quote: highlighted phrase",
      description: 'Rendered in #0085ff blue, e.g. "boost engagement".',
      type: "string",
    }),
    defineField({
      name: "quoteSuffix",
      title: "Quote: trailing text",
      description: 'Plain text after the highlight, e.g. " at HeyGen".',
      type: "string",
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "avatar" } },
});

export const migrationStepsPanel = defineType({
  name: "migrationStepsPanel",
  title: "Migration Steps Panel",
  type: "object",
  fields: [
    defineField({
      name: "headingPrefix",
      title: "Heading: prefix",
      description: 'Plain text before the gradient, e.g. "Migrate".',
      type: "string",
      initialValue: "Migrate",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "headingHighlight",
      title: "Heading: gradient phrase",
      description: 'Rendered with the #bcbaff→#625df5 gradient, e.g. "in 3 Steps".',
      type: "string",
      initialValue: "in 3 Steps",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      initialValue: "All features take less than 5 minutes to get started",
    }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaLink",
    }),
    defineField({
      name: "step1",
      title: "Step 1",
      type: "migrationStep",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "step2",
      title: "Step 2",
      type: "migrationStep",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "step3",
      title: "Step 3",
      type: "migrationStep",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "testimonial",
      title: "Bottom testimonial strip",
      type: "migrationStepsTestimonial",
    }),
  ],
});

export const migrationCarouselSettings = defineType({
  name: "migrationCarouselSettings",
  title: "Customer Carousel Settings",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      description: 'e.g. "Liveblocks Customers Trust Us".',
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      description: "Optional. Falls back to the carousel's default subheading.",
      type: "text",
      rows: 2,
    }),
  ],
});

export const migrationPage = defineType({
  name: "migrationPage",
  title: "Migration Page",
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
      title: "Competitor Name",
      description: 'e.g. "Liveblocks". Used in nav/listing and as the slug source.',
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "URL segment. e.g. 'liveblocks' → /migrate/liveblocks. Must match the slug referenced from Nav.tsx and Footer migration links.",
      type: "slug",
      group: "identity",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short one-liner used in OG/meta defaults.",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "competitorLogo",
      title: "Competitor logo",
      description:
        "Logo shown inside the step 1 pill of the migration steps panel. SVG or transparent PNG.",
      type: "image",
      group: "identity",
      options: { hotspot: false },
    }),
    defineField({
      name: "thumbnail",
      title: "Listing Thumbnail (optional)",
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
      name: "migrationSteps",
      title: "Migration steps panel",
      type: "migrationStepsPanel",
      group: "sections",
    }),
    defineField({
      name: "featureRows",
      title: "Feature rows",
      description:
        "Three alternating 2-column rows (image right/left/right). Reuses the use-case feature-row schema; chips are typically left empty for migration pages.",
      type: "array",
      group: "sections",
      of: [{ type: "useCaseFeatureRow" }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "carousel",
      title: "Customer carousel",
      type: "migrationCarouselSettings",
      group: "sections",
    }),

    defineField({
      name: "showTrustedLogos",
      title: "Show Trusted-by logo strip",
      description: "Renders the standard logo strip below the hero. Defaults to true.",
      type: "boolean",
      group: "chrome",
      initialValue: true,
    }),
    defineField({
      name: "showCustomerCarousel",
      title: "Show customer carousel",
      type: "boolean",
      group: "chrome",
      initialValue: true,
    }),
    defineField({
      name: "showFaq",
      title: "Show FAQ accordion",
      type: "boolean",
      group: "chrome",
      initialValue: true,
    }),

    defineField({
      name: "faq",
      title: "FAQ (migration-specific)",
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
    select: { title: "title", subtitle: "tagline", media: "competitorLogo" },
  },
});
