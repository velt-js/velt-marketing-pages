import { defineType, defineField, defineArrayMember } from "sanity";

export const sectionFeatureGrid = defineType({
  name: "sectionFeatureGrid",
  title: "Feature Grid",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "Feature Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "featureItem",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
            { name: "icon", title: "Icon", type: "image", options: { hotspot: false } },
          ],
          preview: {
            select: { title: "title", subtitle: "description", media: "icon" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
  ],
  preview: {
    select: { title: "heading", count: "items.length" },
    prepare({ title, count }) {
      return {
        title: title || "Feature Grid",
        subtitle: `${count ?? 0} card${count === 1 ? "" : "s"}`,
      };
    },
  },
});
