import { defineType, defineField } from "sanity";

export const getStartedSteps = defineType({
  name: "getStartedSteps",
  title: "Get Started Steps",
  type: "object",
  fields: [
    defineField({
      name: "step1PackageName",
      title: "Step 1 npm package",
      description: 'e.g. "@veltdev/tiptap-collab"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
