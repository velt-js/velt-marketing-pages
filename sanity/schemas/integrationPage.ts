import { defineType, defineField } from "sanity";

// Schema for /integrations/[slug] pages. Mirrors the Framer CMS `Integrations`
// collection (Z1rTLexh0) field-for-field so we can sync from Framer → Sanity
// without data loss. See `scripts/framer-field-map.mjs` for the field-ID map.
//
// The 7-section Framer template (hero, connect, payload, unified, security,
// FAQ, get-started) has fixed titles for sections 3–7 across all 17
// integrations — so the schema only covers the per-slug variable content
// (hero + connect + payload + unified bodies/images). Security/FAQ/Get-Started
// live in shared Framer components and are identical across integrations.
export const integrationPage = defineType({
  name: "integrationPage",
  title: "Integration Page",
  type: "document",
  fields: [
    // ---- Identity ----
    defineField({
      name: "name",
      title: "Integration Name",
      description: 'e.g. "OpenTelemetry". Interpolated into "Integrate Velt in {name}" and "Connect {name} with Velt Console".',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL segment. e.g. 'opentelemetry' → /integrations/opentelemetry",
      type: "slug",
      options: { source: "name", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "Messaging / Email / Analytics / Storage / CRM / etc.",
      type: "string",
    }),

    // ---- Hero ----
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      description: 'Typically "Integrate Velt in {name}".',
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short secondary hero line.",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Longer paragraph used as SEO meta description and hero body.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Hero Image / Logo",
      description: "Integration brand image displayed in the hero.",
      type: "image",
      options: { hotspot: false },
    }),

    // ---- Links / CTAs ----
    defineField({
      name: "demoUrl",
      title: "Demo URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "docsUrl",
      title: "Docs URL",
      type: "url",
    }),

    // ---- Get-Started code snippet ----
    defineField({
      name: "codeSnippet",
      title: "Code Snippet",
      description: "Code example shown in the Get-Started section.",
      type: "text",
      rows: 10,
    }),

    // ---- Section 2: Connect {name} with Velt Console ----
    defineField({
      name: "connectBody",
      title: "Connect Section Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "connectImage",
      title: "Connect Section Image",
      type: "image",
      options: { hotspot: false },
    }),

    // ---- Section 3: In-built payload transformation ----
    defineField({
      name: "payloadBody",
      title: "Payload Section Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "payloadImage",
      title: "Payload Section Image",
      type: "image",
      options: { hotspot: false },
    }),

    // ---- Section 4: Provide a unified customer experience ----
    defineField({
      name: "unifiedBody",
      title: "Unified Section Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "unifiedImage",
      title: "Unified Section Image",
      type: "image",
      options: { hotspot: false },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
});
