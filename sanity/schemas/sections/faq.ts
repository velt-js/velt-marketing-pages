import { defineType, defineField } from "sanity";

// Section-level FAQ item: answer is a Portable-Text array, distinct from
// the doc-level shared `faqItem` whose answer is a plain `text`.
export const sectionFaqItem = defineType({
  name: "sectionFaqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [{ type: "link" }],
          },
        },
      ],
    }),
  ],
  preview: { select: { title: "question" } },
});

export const sectionFaq = defineType({
  name: "sectionFaq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [{ type: "sectionFaqItem" }],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: "heading", count: "items.length" },
    prepare({ title, count }) {
      return {
        title: title || "FAQ",
        subtitle: `${count ?? 0} question${count === 1 ? "" : "s"}`,
      };
    },
  },
});
