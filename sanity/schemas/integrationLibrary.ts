import { defineType, defineField } from "sanity";

// Schema for the NEW integrations collection: one document per "spoke" surface
// or tool rendered at /integrations/{slug} by app/integrations/[slug]/page.tsx
// via the shared SpokeView. This is intentionally SEPARATE from the legacy
// `integrationPage` type (Slack/Discord/etc.) — that collection and its docs
// are left untouched. Content is the final, rendered copy authored in
// scripts/integration-libraries-content.json and seeded via
// scripts/seed-integration-libraries.mjs.
//
// Three kinds share this template:
//   - surface  : an editor/grid/canvas/chart/PDF Velt anchors into (the matrix
//                rows). Renders problem + feature cards + setup + capabilities.
//   - plugin   : dev-time tooling (Cursor, Claude Code). Renders valueProps.
//   - agent    : runtime agent connection (Chat SDK Adapter, MCP). valueProps.

const KIND_OPTIONS = [
  { title: "Surface (in capability matrix)", value: "surface" },
  { title: "Plugin (build with Velt)", value: "plugin" },
  { title: "Agent integration (runtime)", value: "agent" },
];

const CATEGORY_OPTIONS = [
  { title: "Text and code editors", value: "text-code-editors" },
  { title: "Documents and PDF", value: "documents-pdf" },
  { title: "Grids and tables", value: "grids-tables" },
  { title: "Canvas and diagram", value: "canvas-diagram" },
  { title: "Charts and data viz", value: "charts-dataviz" },
  { title: "Plugin / dev tooling", value: "plugin" },
  { title: "Agent integration", value: "agent-integration" },
];

const CAPABILITY_OPTIONS = [
  { title: "Yes", value: "Yes" },
  { title: "Annotations", value: "Annotations" },
  { title: "n/a", value: "n/a" },
];

// ---- Nested object sub-types (registered in index.ts) ----

export const integrationCapabilities = defineType({
  name: "integrationCapabilities",
  title: "Capabilities (matrix row)",
  type: "object",
  description:
    "Per-surface capability states shown in the hub capability matrix. Surfaces only.",
  fields: [
    defineField({
      name: "comments",
      title: "Comments",
      type: "string",
      options: { list: CAPABILITY_OPTIONS },
      initialValue: "Yes",
    }),
    defineField({
      name: "coEditing",
      title: "Co-editing",
      type: "string",
      options: { list: CAPABILITY_OPTIONS },
      initialValue: "Yes",
    }),
    defineField({
      name: "suggestions",
      title: "Suggestions",
      type: "string",
      options: { list: CAPABILITY_OPTIONS },
      initialValue: "Yes",
    }),
    defineField({
      name: "presence",
      title: "Presence",
      type: "string",
      options: { list: CAPABILITY_OPTIONS },
      initialValue: "Yes",
    }),
    defineField({
      name: "agents",
      title: "Agents",
      type: "string",
      options: { list: CAPABILITY_OPTIONS },
      initialValue: "Yes",
    }),
  ],
  options: { columns: 5 },
});

export const integrationFeatureCard = defineType({
  name: "integrationFeatureCard",
  title: "Feature Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featureHref",
      title: "Feature page link",
      description: "Links the card to its feature page, e.g. /comments.",
      type: "string",
    }),
  ],
  preview: { select: { title: "title", subtitle: "featureHref" } },
});

// ---- The document ----

// NOTE: this document type is the "libraries v2" collection (rendered at
// /libraries via v2-first, v1-fallback). The exported const keeps its original
// identifier to avoid churn in schemas/index.ts; the Sanity `name` (the _type
// editors and queries use) is `libraryPageV2`.
export const integrationLibrary = defineType({
  name: "libraryPageV2",
  title: "Library Page (v2)",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "hero", title: "Hero" },
    { name: "content", title: "Content" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // -- Identity --
    defineField({
      name: "name",
      title: "Name",
      description: 'e.g. "Tiptap". Interpolated into hero, built-for, and SEO copy.',
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL segment. e.g. 'tiptap' -> /integrations/tiptap.",
      type: "slug",
      group: "identity",
      options: { source: "name", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      group: "identity",
      options: { list: KIND_OPTIONS, layout: "radio" },
      initialValue: "surface",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "identity",
      options: { list: CATEGORY_OPTIONS },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "beta",
      title: "Beta",
      description: "Adds a (beta) chip on the spoke, its grid chip, and its mirror.",
      type: "boolean",
      group: "identity",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Sort order within its grid band and the capability matrix.",
      type: "number",
      group: "identity",
      initialValue: 0,
    }),
    defineField({
      name: "logo",
      title: "Logo (optional)",
      description:
        "Brand logo for the grid chip. Optional — the name always renders as HTML text, so a missing logo degrades to a text chip.",
      type: "image",
      group: "identity",
      options: { hotspot: false },
    }),

    // -- Hero --
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSecondary",
      title: "Hero Secondary",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    defineField({
      name: "heroDemoKey",
      title: "Hero Demo Preset",
      description:
        "Demo-registry key for the hero visual (resolved in components/feature-new/demo-registry.tsx). Optional.",
      type: "string",
      group: "hero",
    }),

    // -- Content (surface kind) --
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "integrationCapabilities",
      group: "content",
      hidden: ({ parent }) => parent?.kind !== "surface",
    }),
    defineField({
      name: "problemHeader",
      title: "Problem Header",
      type: "string",
      group: "content",
      hidden: ({ parent }) => parent?.kind !== "surface",
    }),
    defineField({
      name: "problemBody",
      title: "Problem Body",
      type: "text",
      rows: 6,
      group: "content",
      hidden: ({ parent }) => parent?.kind !== "surface",
    }),
    defineField({
      name: "builtForLine",
      title: "Built-for Line",
      description: "The agent-quotable built-for sentence.",
      type: "text",
      rows: 3,
      group: "content",
      hidden: ({ parent }) => parent?.kind !== "surface",
    }),
    defineField({
      name: "featureCards",
      title: "Feature Cards",
      type: "array",
      of: [{ type: "integrationFeatureCard" }],
      group: "content",
      hidden: ({ parent }) => parent?.kind !== "surface",
    }),
    defineField({
      name: "agentsCardBody",
      title: "Agents Card Body",
      type: "text",
      rows: 4,
      group: "content",
      hidden: ({ parent }) => parent?.kind !== "surface",
    }),
    defineField({
      name: "setupPackages",
      title: "Setup Packages",
      description: 'e.g. "@veltdev/react + @veltdev/tiptap-crdt-react".',
      type: "string",
      group: "content",
      hidden: ({ parent }) => parent?.kind !== "surface",
    }),
    defineField({
      name: "migrateLine",
      title: "Migrate Line",
      type: "text",
      rows: 3,
      group: "content",
      hidden: ({ parent }) => parent?.kind !== "surface",
    }),

    // -- Content (plugin / agent kind) --
    defineField({
      name: "valueProps",
      title: "Value Props",
      description: "Bullet list rendered for plugin/agent kinds instead of feature cards.",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
      hidden: ({ parent }) => parent?.kind === "surface",
    }),
    defineField({
      name: "setupNote",
      title: "Setup Note",
      type: "text",
      rows: 3,
      group: "content",
      hidden: ({ parent }) => parent?.kind === "surface",
    }),

    // -- FAQ --
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{ type: "faqItem" }],
      group: "faq",
    }),

    // -- SEO --
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current", kind: "kind" },
    prepare: ({ title, subtitle, kind }) => ({
      title,
      subtitle: `${kind ?? "surface"} · ${subtitle ?? ""}`,
    }),
  },
});
