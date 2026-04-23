import { defineType, defineField } from "sanity";

const ctaFields = [
  { name: "label", title: "Label", type: "string" },
  { name: "href", title: "URL", type: "string" },
  { name: "newTab", title: "Open in new tab", type: "boolean" },
];

export const sectionCta = defineType({
  name: "sectionCta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "primaryCta",
      title: "Primary Button",
      type: "object",
      fields: ctaFields,
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary Button",
      type: "object",
      fields: ctaFields,
    }),
    defineField({
      name: "background",
      title: "Background Style",
      type: "string",
      options: {
        list: [
          { title: "Light (default)", value: "light" },
          { title: "Dark", value: "dark" },
          { title: "Brand (purple gradient)", value: "brand" },
        ],
        layout: "radio",
      },
      initialValue: "light",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "primaryCta.label" },
  },
});
