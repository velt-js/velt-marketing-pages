import { defineType, defineField } from "sanity";

// Schema for /examples/[slug] pages. Migrated from Framer collection
// `Examples` (collectionId swtrbT1mb). Flat shape matching Framer 1:1.
export const examplePage = defineType({
  name: "examplePage",
  title: "Example",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      description: "Card thumbnail shown on the /examples grid.",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "similarApp", title: "Similar App", type: "string" }),
    defineField({
      name: "similarAppIcon",
      title: "Similar App Icon",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({ name: "feature", title: "Feature", type: "string" }),
    defineField({
      name: "framework",
      title: "Framework",
      description: "Framer was an enum; kept as free-form string until taxonomy stabilises.",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Features",
      description: "Comma-separated or single string from Framer enum.",
      type: "string",
    }),
    defineField({ name: "githubLink", title: "GitHub Link", type: "url" }),
    defineField({ name: "previewLink", title: "Preview Link", type: "url" }),
    defineField({ name: "codesandboxLink", title: "Codesandbox Link", type: "url" }),
    defineField({ name: "vercelLink", title: "Vercel Link", type: "url" }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "framework", media: "thumbnail" },
  },
});
