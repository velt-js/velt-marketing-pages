import { defineType, defineField } from "sanity";

// Type's `name` must be "link" to preserve `_type: "link"` in 100+ stored
// blog body annotations. The export name `linkAnnotation` distinguishes the
// module from the inline shape it replaces.
export const linkAnnotation = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
    }),
  ],
});
