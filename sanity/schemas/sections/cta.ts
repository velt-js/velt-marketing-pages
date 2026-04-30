import { defineType, defineField } from "sanity";

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
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "primaryCta",
      title: "Primary Button",
      type: "ctaLink",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary Button",
      type: "ctaLink",
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
