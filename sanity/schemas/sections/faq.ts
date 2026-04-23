import { defineType, defineField, defineArrayMember } from "sanity";

export const sectionFaq = defineType({
  name: "sectionFaq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
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
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                          {
                            name: "href",
                            type: "url",
                            title: "URL",
                            validation: (rule) =>
                              rule.uri({
                                allowRelative: true,
                                scheme: ["http", "https", "mailto"],
                              }),
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          preview: { select: { title: "question" } },
        }),
      ],
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
