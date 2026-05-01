import { defineType, defineField } from "sanity";

// Schema for /demos/[slug] pages. Migrated from Framer collection
// `Demos` (collectionId rqK2l85bx). Flat shape matching Framer 1:1.
//
// Note: Demos are in draft status in Framer. Pulled docs land as
// Sanity drafts unless explicitly published.
export const demoPage = defineType({
  name: "demoPage",
  title: "Demo",
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
      name: "hide",
      title: "Hide from listing",
      description: "Mirrors the Framer `Hide` field. When true, the demo is suppressed from /demos.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "appName", title: "App Name", type: "string" }),
    defineField({
      name: "appLogo",
      title: "App Logo",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "appLink",
      title: "App Link",
      description: "External link to the app being demoed.",
      type: "url",
    }),
    defineField({
      name: "demoLink",
      title: "Demo Link",
      description: "Link to the live demo.",
      type: "url",
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "Filter chip on /demos. Free-form string until taxonomy stabilises.",
      type: "string",
    }),
    defineField({ name: "title1", title: "Title 1", type: "string" }),
    defineField({ name: "title2", title: "Title 2", type: "string" }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "feature1Name", title: "Feature 1 Name", type: "string" }),
    defineField({
      name: "feature1Image",
      title: "Feature 1 Image",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({ name: "feature2Name", title: "Feature 2 Name", type: "string" }),
    defineField({
      name: "feature2Image",
      title: "Feature 2 Image",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({ name: "feature3Name", title: "Feature 3 Name", type: "string" }),
    defineField({
      name: "feature3Image",
      title: "Feature 3 Image",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      description: "Primary visual for the demo card and hero.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "appName", media: "appLogo" },
  },
});
