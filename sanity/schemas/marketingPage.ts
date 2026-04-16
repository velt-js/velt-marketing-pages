import { defineType, defineField, defineArrayMember } from "sanity";

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
      type: "object",
      fields: [
        { name: "subtitle", title: "Subtitle", type: "string" },
        { name: "heading", title: "Heading", type: "string" },
        { name: "description", title: "Description", type: "text", rows: 3 },
        {
          name: "ctas",
          title: "CTA Buttons",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "label", title: "Label", type: "string" },
                { name: "href", title: "URL", type: "string" },
                { name: "variant", title: "Variant", type: "string", options: { list: ["primary", "secondary"] } },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "icon", title: "Icon", type: "image" },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text", rows: 3 },
            { name: "author", title: "Author Name", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "avatar", title: "Avatar", type: "image" },
          ],
          preview: {
            select: { title: "author", subtitle: "role" },
          },
        }),
      ],
    }),
    defineField({
      name: "pricingTiers",
      title: "Pricing Tiers",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "name", title: "Tier Name", type: "string" },
            { name: "price", title: "Price", type: "string" },
            { name: "period", title: "Period", type: "string" },
            { name: "description", title: "Description", type: "string" },
            { name: "highlighted", title: "Highlighted", type: "boolean" },
            { name: "ctaLabel", title: "CTA Label", type: "string" },
            { name: "ctaHref", title: "CTA URL", type: "string" },
            {
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        }),
      ],
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
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta Title", type: "string" },
        { name: "metaDescription", title: "Meta Description", type: "text", rows: 2 },
        { name: "ogImage", title: "OG Image", type: "image" },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "pageType" },
  },
});
