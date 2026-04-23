import { defineType, defineField } from "sanity";

// Static demo media for a library page. v1 is image or MP4 loop — see
// plan: we deliberately don't vendor the Framer interactive-demo runtime.
export const sectionDemo = defineType({
  name: "sectionDemo",
  title: "Demo",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video (MP4)", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),
    defineField({
      name: "video",
      title: "Video File",
      description: "MP4, looping playback. Keep under ~5 MB for page weight.",
      type: "file",
      options: { accept: "video/mp4" },
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { title: "heading", mediaType: "mediaType", media: "image" },
    prepare({ title, mediaType, media }) {
      return {
        title: title || "Demo",
        subtitle: mediaType === "video" ? "Video" : "Image",
        media,
      };
    },
  },
});
