import { defineType, defineField } from "sanity";

export const inlineTestimonial = defineType({
  name: "inlineTestimonial",
  title: "Inline Testimonial",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({
      name: "role",
      title: "Role",
      description: 'e.g. "CTO @eqtble"',
      type: "string",
    }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({
      name: "accentFragment",
      title: "Accent Fragment",
      description:
        "Substring of the quote rendered in accent color. Must appear verbatim in the quote.",
      type: "string",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      description: "Hex color, e.g. #0085ff",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
