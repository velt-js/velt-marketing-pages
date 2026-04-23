import { defineType, defineField } from "sanity";

// Schema for /libraries/[slug] pages. Each of the 11 Velt feature libraries
// (Comments, Notifications, Huddle, Recording, Presence, Cursors, Activity
// Logs, Single Editor Mode, Live State Sync, Live Selection, Customization)
// is one document of this type. Structure and content differ from the blog:
// richer, order-sensitive sections rendered by components/library/*.
//
// Sections live in sanity/schemas/sections/* and are registered alongside
// this type in sanity/schemas/index.ts.
export const libraryPage = defineType({
  name: "libraryPage",
  title: "Library Page",
  type: "document",
  fields: [
    // ---- Identity ----
    defineField({
      name: "title",
      title: "Page Title",
      description: 'e.g. "Comments". Used in nav/listing and the hero default.',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL segment. e.g. 'comments' → /libraries/comments",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "Grouping for the /libraries listing page.",
      type: "string",
      options: {
        list: [
          { title: "Core", value: "core" },
          { title: "Collaboration", value: "collaboration" },
          { title: "Productivity", value: "productivity" },
        ],
      },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short one-liner shown on the /libraries listing card.",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Icon/logo shown on the /libraries listing card.",
      type: "image",
      options: { hotspot: false },
    }),

    // ---- Hero ----
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "eyebrow", title: "Eyebrow / Badge", type: "string" },
        {
          name: "heading",
          title: "Heading",
          type: "string",
          validation: (rule) => rule.required(),
        },
        { name: "subheading", title: "Subheading", type: "text", rows: 3 },
        {
          name: "illustration",
          title: "Illustration",
          type: "image",
          options: { hotspot: true },
        },
        {
          name: "primaryCta",
          title: "Primary CTA",
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "URL", type: "string" },
            { name: "newTab", title: "Open in new tab", type: "boolean" },
          ],
        },
        {
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "URL", type: "string" },
            { name: "newTab", title: "Open in new tab", type: "boolean" },
          ],
        },
      ],
    }),

    // ---- Sections (block-based, order-sensitive) ----
    defineField({
      name: "sections",
      title: "Sections",
      description:
        "Compose the page body from section blocks. Render order matches this list.",
      type: "array",
      of: [
        { type: "sectionFeatureGrid" },
        { type: "sectionDemo" },
        { type: "sectionCodeBlock" },
        { type: "sectionFaq" },
        { type: "sectionCta" },
      ],
    }),

    // ---- SEO ----
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "metaTitle", title: "Meta Title", type: "string" },
        { name: "metaDescription", title: "Meta Description", type: "text", rows: 2 },
        { name: "ogImage", title: "OG Image", type: "image" },
      ],
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
