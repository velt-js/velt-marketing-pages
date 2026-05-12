import { defineType, defineField } from "sanity";
import {
  FEATURE_UI_KEYS,
  FEATURE_UI_TITLES,
} from "../../components/feature/uis/keys";

// Schema for top-level feature pages — one document per Velt product surface
// (Commenting, Notifications, Presence, Cursors, Huddle, Recorder, …).
//
// Unlike libraryPage which has a single fixed bento, a feature page strings
// together multiple bento + integrations + customer-grid sections in any
// order via the polymorphic `sections[]` array. Each entry carries a
// `_type` discriminator the renderer dispatches on.
//
// Top-level chrome (Security, GetStartedSteps, FAQ, Footer) lives outside
// the array as fixed fields/toggles so editors cannot accidentally remove
// or reorder them.
//
// To populate a new feature, run scripts/seed-feature-<slug>.mjs.

export const featureHero = defineType({
  name: "featureHero",
  title: "Feature Hero",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "decorated",
      title: "Decorated background",
      description:
        "Pixel-grid background + Sean/Emma cursor overlays. Default for feature pages.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaLink",
    }),
  ],
});

export const featureFaq = defineType({
  name: "featureFaq",
  title: "Feature FAQ",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
});

export const featurePage = defineType({
  name: "featurePage",
  title: "Feature Page",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "hero", title: "Hero" },
    { name: "sections", title: "Sections" },
    { name: "chrome", title: "Page Chrome" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Feature Name",
      description:
        'e.g. "Commenting". Used in nav/listing and as the slug source.',
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "URL segment. e.g. 'comments' → /comments. Must not collide with an existing top-level route (blog, pricing, libraries, etc.).",
      type: "slug",
      group: "identity",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description: 'Filter chip on /features (e.g. "Async", "Realtime").',
      type: "string",
      group: "identity",
      options: {
        list: [
          { title: "Async Collaboration", value: "Async" },
          { title: "Realtime Collaboration", value: "Realtime" },
          { title: "Platform", value: "Platform" },
        ],
      },
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short one-liner shown on the /features listing card.",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "logo",
      title: "Listing Logo",
      description: "Icon shown on the /features listing card.",
      type: "image",
      group: "identity",
      options: { hotspot: false },
    }),

    defineField({
      name: "hero",
      title: "Hero",
      type: "featureHero",
      group: "hero",
      options: { collapsible: true, collapsed: false },
    }),

    defineField({
      name: "sections",
      title: "Sections",
      description:
        "Ordered list of content blocks rendered between the hero and Security. " +
        "Drag to reorder. Each block type maps to one component.",
      type: "array",
      group: "sections",
      of: [
        { type: "featureBentoSection" },
        { type: "featurePowerfulBentoSection" },
        { type: "featureSidebarShowcaseSection" },
        { type: "featureCardRowSection" },
        { type: "featureImageCardSection" },
        { type: "featureCustomizerSection" },
        { type: "featureFlowDiagramSection" },
        { type: "featureIntegrationsSection" },
        { type: "featureCustomerCarouselSection" },
      ],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: "showSecurity",
      title: "Show Enterprise Security block",
      description:
        "Renders the standard Security component before the FAQ. Defaults to true.",
      type: "boolean",
      group: "chrome",
      initialValue: true,
    }),
    defineField({
      name: "showTrustedLogos",
      title: "Show Trusted Logos strip",
      description:
        "Renders the homepage TrustedLogos strip immediately under the hero. Defaults to true.",
      type: "boolean",
      group: "chrome",
      initialValue: true,
    }),
    defineField({
      name: "showCustomerStories",
      title: 'Show "How [Customer] Leverages Velt" carousel',
      description:
        "Renders the homepage CustomerUI carousel between the polymorphic sections and Security. Defaults to true.",
      type: "boolean",
      group: "chrome",
      initialValue: true,
    }),
    defineField({
      name: "getStartedSteps",
      title: "Get Started Steps",
      type: "getStartedSteps",
      group: "chrome",
    }),

    defineField({
      name: "faq",
      title: "FAQ (feature-specific)",
      description:
        "Feature-specific Q&A. Rendered before the 4 shared general Q&A from components/library/shared-content.ts.",
      type: "featureFaq",
      group: "faq",
    }),

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
    defineField({
      name: "ogImage",
      title: "OG Image",
      type: "image",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Title, A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Category",
      name: "categoryAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "logo" },
  },
});

// ---- Section block: Bento ----
export const featureBentoSection = defineType({
  name: "featureBentoSection",
  title: "Bento Section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      description:
        'Small all-caps purple pill above the heading, e.g. "Powerful & Beautiful".',
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "viewDocsCta", title: "View Docs CTA", type: "ctaLink" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "rowHeights",
      title: "Row Heights (px)",
      description:
        "Explicit row heights for the 2-column grid. Length determines row count and must equal cards.length / 2. Defaults to [493, 429, 424, 424] when omitted.",
      type: "array",
      of: [{ type: "number" }],
    }),
    defineField({
      name: "cards",
      title: "Cards (paired into 2 columns)",
      type: "array",
      of: [{ type: "featureBentoCard" }],
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .custom((cards) =>
            Array.isArray(cards) && cards.length % 2 === 0
              ? true
              : "Bento cards must come in pairs (2 columns).",
          ),
    }),
    defineField({
      name: "inlineTestimonial",
      title: "Attached Inline Testimonial",
      description:
        "Optional dark customer-quote bar attached to the bottom of the cards grid.",
      type: "inlineTestimonial",
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow" },
    prepare: ({ title, subtitle }) => ({
      title: `Bento: ${title ?? "(untitled)"}`,
      subtitle,
    }),
  },
});

export const featureIntegrationLogo = defineType({
  name: "featureIntegrationLogo",
  title: "Integration Logo",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "href", title: "URL", type: "url" }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});

// ---- Section block: Integrations row ----
export const featureIntegrationsSection = defineType({
  name: "featureIntegrationsSection",
  title: "Integrations Row",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      description: 'e.g. "Now Velt integrates with"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [{ type: "featureIntegrationLogo" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: `Integrations: ${title ?? "(untitled)"}`,
    }),
  },
});

export const featureCustomerCard = defineType({
  name: "featureCustomerCard",
  title: "Customer Card",
  type: "object",
  fields: [
    defineField({
      name: "customerLogo",
      title: "Customer Logo",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      description: "Bold heading-style quote at the top of the card.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      description: "Multi-line supporting paragraph.",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "authorName",
      title: "Author",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "authorRole", title: "Author Role", type: "string" }),
    defineField({
      name: "authorAvatar",
      title: "Author Avatar",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "authorName",
      subtitle: "pullQuote",
      media: "authorAvatar",
    },
  },
});

// ---- Section block: Customer testimonial carousel ----
export const featureCustomerCarouselSection = defineType({
  name: "featureCustomerCarouselSection",
  title: "Customer Testimonial Carousel",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      description: 'e.g. "Our Customers Trust Us"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "ctaLink",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [{ type: "featureCustomerCard" }],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: `Customer Carousel: ${title ?? "(untitled)"}`,
    }),
  },
});

// ---- Card type: Feature Bento Card ----
export const featureBentoCard = defineType({
  name: "featureBentoCard",
  title: "Feature Bento Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "uiComponentKey",
      title: "UI Component",
      description:
        "Picks a registered React UI component from components/feature/uis. Use this OR Card Image — not both.",
      type: "string",
      options: {
        list: FEATURE_UI_KEYS.map((key) => ({
          title: FEATURE_UI_TITLES[key],
          value: key,
        })),
      },
    }),
    defineField({
      name: "image",
      title: "Card Image (override)",
      description: "Optional fallback PNG/SVG. If set, overrides uiComponentKey.",
      type: "image",
      options: { hotspot: false },
    }),
  ],
  validation: (rule) =>
    rule.custom((card) => {
      if (!card) return true;
      const c = card as { uiComponentKey?: string; image?: unknown };
      if (!c.uiComponentKey && !c.image) {
        return "Either UI Component or Card Image is required.";
      }
      return true;
    }),
  preview: {
    select: { title: "title", subtitle: "uiComponentKey", media: "image" },
  },
});

export const featureSidebarItem = defineType({
  name: "featureSidebarItem",
  title: "Sidebar Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "screenshot",
      title: "Screenshot (per-item)",
      description: "Optional. Falls back to defaultScreenshot.",
      type: "image",
      options: { hotspot: false },
    }),
  ],
  preview: { select: { title: "label", media: "screenshot" } },
});

// ---- Section block: Sidebar Showcase ----
export const featureSidebarShowcaseSection = defineType({
  name: "featureSidebarShowcaseSection",
  title: "Sidebar Showcase",
  type: "object",
  fields: [
    defineField({
      name: "eyebrowIcon",
      title: "Eyebrow Icon",
      description: "Optional small purple icon above the heading.",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "items",
      title: "Sidebar Items",
      description:
        "Each entry is a clickable row; the active one swaps the right-panel screenshot when one is set.",
      type: "array",
      of: [{ type: "featureSidebarItem" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "defaultScreenshot",
      title: "Default Screenshot",
      description:
        "Shown when an item has no per-item screenshot of its own.",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "inlineTestimonial",
      title: "Attached Inline Testimonial",
      type: "inlineTestimonial",
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: `Sidebar Showcase: ${title ?? "(untitled)"}`,
    }),
  },
});

export const featureCardRowCard = defineType({
  name: "featureCardRowCard",
  title: "Card Row Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "iconImage",
      title: "Icon",
      description: "Optional small icon left of the title.",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "uiComponentKey",
      title: "UI Component",
      description: "Mini UI demo rendered in the card body.",
      type: "string",
      options: {
        list: FEATURE_UI_KEYS.map((key) => ({
          title: FEATURE_UI_TITLES[key],
          value: key,
        })),
      },
    }),
    defineField({ name: "viewDocsHref", title: "View Docs URL", type: "url" }),
  ],
  preview: {
    select: { title: "title", subtitle: "uiComponentKey", media: "iconImage" },
  },
});

// ---- Section block: Feature Card Row ----
export const featureCardRowSection = defineType({
  name: "featureCardRowSection",
  title: "Feature Card Row",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "viewDocsCta", title: "View Docs CTA", type: "ctaLink" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [{ type: "featureCardRowCard" }],
      validation: (rule) => rule.required().min(1).max(4),
    }),
    defineField({
      name: "inlineTestimonial",
      title: "Attached Inline Testimonial",
      type: "inlineTestimonial",
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: `Card Row: ${title ?? "(untitled)"}` }),
  },
});

// ---- Section block: Feature Image Card ----
// Same outer chrome as featureCardRowSection (white card · dark border ·
// centered heading + sub + CTA · attached dark testimonial banner) but
// the body is a single full-width image. Used on /features/recordings.
export const featureImageCardSection = defineType({
  name: "featureImageCardSection",
  title: "Feature Image Card",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "viewDocsCta", title: "View Docs CTA", type: "ctaLink" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "image",
      title: "Image",
      description: "Full-width mockup rendered inside the white card.",
      type: "image",
      options: { hotspot: false },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imageWidth",
      title: "Image Width (px)",
      description:
        "Display width in design pixels. Cards 1 and 3 from Figma use 1280; card 2 uses 1199.",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "imageHeight",
      title: "Image Height (px)",
      description:
        "Display height in design pixels. Cards 1 and 3 use 467; card 2 uses 297.",
      type: "number",
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: "imageBottomOffset",
      title: "Image Bottom Offset (px)",
      description:
        "Distance from the bottom edge of the white card to the bottom of the image. Negative pulls the image past the card edge. Cards 1/3 use -2.38; card 2 uses 68.62.",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "videoSrc",
      title: "Video Source",
      description:
        "Local path to a video file rendered instead of the image (e.g. /images/features/recordings/recording-customization.mp4).",
      type: "string",
    }),
    defineField({
      name: "marquee",
      title: "Marquee",
      description:
        "When enabled, the image scrolls horizontally in an infinite marquee loop.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "marqueeSvgSrc",
      title: "Marquee SVG Source",
      description:
        "Local path to an SVG file used instead of the Sanity image when marquee is enabled (e.g. /images/features/recordings/card-2-keep-users-in-app.svg).",
      type: "string",
      hidden: ({ parent }) => !parent?.marquee,
    }),
    defineField({
      name: "inlineTestimonial",
      title: "Attached Inline Testimonial",
      type: "inlineTestimonial",
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: { title: "heading", media: "image" },
    prepare: ({ title, media }) => ({
      title: `Image Card: ${title ?? "(untitled)"}`,
      media,
    }),
  },
});

export const featureCustomizerPlayground = defineType({
  name: "featureCustomizerPlayground",
  title: "Customizer Playground Tab",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      initialValue: "Playground",
    }),
    defineField({
      name: "iconImage",
      title: "Icon",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "previewImage",
      title: "Preview Image",
      type: "image",
      options: { hotspot: false },
    }),
  ],
});

export const featureCustomizerExample = defineType({
  name: "featureCustomizerExample",
  title: "Customizer Example Tab",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "iconImage",
      title: "Icon",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "previewImage",
      title: "Preview Image",
      type: "image",
      options: { hotspot: false },
    }),
  ],
  preview: { select: { title: "label", media: "iconImage" } },
});

export const featureCustomizerControls = defineType({
  name: "featureCustomizerControls",
  title: "Customizer Right Panel Controls",
  type: "object",
  fields: [
    defineField({
      name: "colors",
      title: "Mode Colors",
      type: "array",
      of: [{ type: "string" }],
      description:
        'Hex strings, e.g. "#FFCD2E", "#3DB7E4", "#625DF5", "#E934BF".',
    }),
    defineField({
      name: "onTheEdgeValue",
      title: '"On the edge" input value',
      type: "string",
      initialValue: "/comments",
    }),
    defineField({
      name: "loggedInToggleLabel",
      title: "Logged-in toggle label",
      type: "string",
      initialValue: "Logged In/Out",
    }),
    defineField({
      name: "parentDefaultLabel",
      title: "Parent / Default toggle label",
      type: "string",
      initialValue: "Parent / Default",
    }),
  ],
});

// ---- Section block: Customizer ----
export const featureCustomizerSection = defineType({
  name: "featureCustomizerSection",
  title: "UI Customizer",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "viewDocsCta", title: "View Docs CTA", type: "ctaLink" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "playground",
      title: "Playground tab",
      type: "featureCustomizerPlayground",
    }),
    defineField({
      name: "examples",
      title: "Live Example tabs",
      type: "array",
      of: [{ type: "featureCustomizerExample" }],
    }),
    defineField({
      name: "controls",
      title: "Right Panel Controls",
      description:
        "Color picker, edge input, login toggle, and parent-default toggle. All optional.",
      type: "featureCustomizerControls",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: `Customizer: ${title ?? "(untitled)"}`,
    }),
  },
});

export const featureFlowCarouselLogo = defineType({
  name: "featureFlowCarouselLogo",
  title: "Flow Carousel Logo",
  type: "object",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
      validation: (r) => r.required(),
    }),
    defineField({ name: "alt", title: "Alt text", type: "string" }),
  ],
  preview: { select: { title: "alt", media: "logo" } },
});

export const featureFlowStage = defineType({
  name: "featureFlowStage",
  title: "Flow Stage",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "color",
      title: "Color (hex)",
      type: "string",
      description:
        'e.g. "#ff4f00" (orange), "#ffc12f" (yellow), "#0b353b" (dark green).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "labelColor",
      title: "Label color (hex, optional)",
      type: "string",
      description:
        'Defaults to the pill color. Override when the pill bg is light, e.g. "#111" on the yellow Transform pill.',
    }),
    defineField({
      name: "logoImage",
      title: "Logo (optional)",
      type: "image",
      options: { hotspot: false },
      description:
        "Replaces the text label when set, e.g. HubSpot wordmark.",
    }),
    defineField({
      name: "isCarousel",
      title: "Logo carousel",
      type: "boolean",
      description:
        "When true, the right side of the pill renders a static partner-logo column (top portion visible, bottom faded to white).",
    }),
    defineField({
      name: "carouselLogos",
      title: "Carousel logos",
      type: "array",
      description:
        "Partner logos rendered in the column when 'Logo carousel' is on. Top of the list shows fully; lower entries are clipped by the bottom fade.",
      of: [{ type: "featureFlowCarouselLogo" }],
    }),
  ],
  preview: { select: { title: "label", media: "logoImage" } },
});

// ---- Section block: Flow Diagram ----
export const featureFlowDiagramSection = defineType({
  name: "featureFlowDiagramSection",
  title: "Flow Diagram",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "viewDocsCta", title: "View Docs CTA", type: "ctaLink" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "stages",
      title: "Stages",
      type: "array",
      of: [{ type: "featureFlowStage" }],
      validation: (rule) => rule.required().min(2).max(6),
    }),
    defineField({
      name: "inlineTestimonial",
      title: "Attached Inline Testimonial",
      type: "inlineTestimonial",
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: `Flow: ${title ?? "(untitled)"}` }),
  },
});

export const featurePowerfulCard = defineType({
  name: "featurePowerfulCard",
  title: "Powerful Bento Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
});

// ---- Section block: Powerful Bento (asymmetric 4-card) ----
export const featurePowerfulBentoSection = defineType({
  name: "featurePowerfulBentoSection",
  title: "Powerful Bento (asymmetric 4-card)",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "viewDocsCta", title: "View Docs CTA", type: "ctaLink" }),
    defineField({ name: "primaryCta", title: "Primary CTA", type: "ctaLink" }),
    defineField({
      name: "mentionsCard",
      title: "@mentions card",
      type: "featurePowerfulCard",
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "tasksCard",
      title: "Task Management card",
      type: "featurePowerfulCard",
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "recordingsCard",
      title: "Recordings card",
      type: "featurePowerfulCard",
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "reactionsCard",
      title: "Reactions card",
      type: "featurePowerfulCard",
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: "inlineTestimonial",
      title: "Detached Testimonial (renders below the bento)",
      type: "inlineTestimonial",
      options: { collapsible: true, collapsed: true },
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: `Powerful Bento: ${title ?? "(untitled)"}`,
    }),
  },
});
