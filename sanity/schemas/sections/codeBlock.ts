import { defineType, defineField, defineArrayMember } from "sanity";

// Code block section with optional tabs. Each tab uses @sanity/code-input
// (registered in sanity.config.ts) for language-aware editing.
export const sectionCodeBlock = defineType({
  name: "sectionCodeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({
      name: "tabs",
      title: "Tabs",
      description: "One tab = one code snippet. A single tab renders without tab UI.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "codeTab",
          fields: [
            { name: "label", title: "Tab Label", type: "string" },
            { name: "filename", title: "Filename", type: "string" },
            {
              name: "code",
              title: "Code",
              type: "code",
              options: {
                withFilename: false,
                languageAlternatives: [
                  { title: "TypeScript", value: "typescript" },
                  { title: "JavaScript", value: "javascript" },
                  { title: "TSX", value: "tsx" },
                  { title: "JSX", value: "jsx" },
                  { title: "HTML", value: "html" },
                  { title: "CSS", value: "css" },
                  { title: "JSON", value: "json" },
                  { title: "Bash", value: "bash" },
                ],
              },
            },
          ],
          preview: {
            select: { title: "label", subtitle: "filename" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: "heading", count: "tabs.length" },
    prepare({ title, count }) {
      return {
        title: title || "Code Block",
        subtitle: `${count ?? 0} tab${count === 1 ? "" : "s"}`,
      };
    },
  },
});
