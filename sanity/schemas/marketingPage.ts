import { defineType, defineField, defineArrayMember } from "sanity";

export const marketingHeroCta = defineType({
  name: "marketingHeroCta",
  title: "Hero CTA",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href", title: "URL", type: "string" }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: { list: ["primary", "secondary"] },
    }),
  ],
});

export const marketingHero = defineType({
  name: "marketingHero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctas",
      title: "CTA Buttons",
      type: "array",
      of: [{ type: "marketingHeroCta" }],
    }),
  ],
});

export const marketingFeature = defineType({
  name: "marketingFeature",
  title: "Feature",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "icon", title: "Icon", type: "image" }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});

export const marketingTestimonial = defineType({
  name: "marketingTestimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({ name: "author", title: "Author Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "avatar", title: "Avatar", type: "image" }),
  ],
  preview: {
    select: { title: "author", subtitle: "role" },
  },
});

export const marketingPricingTier = defineType({
  name: "marketingPricingTier",
  title: "Pricing Tier",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Tier Name", type: "string" }),
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({ name: "period", title: "Period", type: "string" }),
    defineField({ name: "description", title: "Description", type: "string" }),
    defineField({ name: "highlighted", title: "Highlighted", type: "boolean" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA URL", type: "string" }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});

export const marketingPage = defineType({
  name: "marketingPage",
  title: "Marketing Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 200 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageType",
      title: "Page Type",
      type: "string",
      options: {
        list: [
          { title: "Product", value: "product" },
          { title: "Use Case", value: "use-case" },
          { title: "Integration", value: "integration" },
          { title: "Library", value: "library" },
          { title: "Comparison", value: "comparison" },
          { title: "Landing", value: "landing" },
          { title: "Legal", value: "legal" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "marketingHero",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [defineArrayMember({ type: "marketingFeature" })],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [defineArrayMember({ type: "marketingTestimonial" })],
    }),
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "array",
      of: [defineArrayMember({ type: "marketingPricingTier" })],
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({ name: "metaTitle", title: "Meta Title", type: "string" }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "ogImage", title: "OG Image", type: "image" }),
  ],
  preview: {
    select: { title: "title", subtitle: "pageType" },
  },
});
