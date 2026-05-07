#!/usr/bin/env node
/**
 * Seed the featurePage-comments document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-commenting.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-commenting.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-commenting.mjs
 *
 * Idempotent: re-runs replace the existing featurePage-comments doc and
 * re-upload the same image assets (Sanity dedupes by SHA-256).
 *
 * Reference: Figma node 93:1676 in HqWIZdR6ISJmaG2n4o3gr8 (Velt Marketing
 * 2026 — Comment page). Sections in order:
 *   1. Hero (chrome)
 *   2. TrustedLogos (chrome)
 *   3. Bento "Powerful and Beautiful Commenting" + testimonial
 *   4. Sidebar Showcase "Little Big Details"
 *   5. Card Row "Extend the Capabilities" + testimonial
 *   6. Customizer "Fully Customizable UI" (interactive)
 *   7. Bento "More than just Commenting" + testimonial
 *   8. Flow Diagram "REST APIs and Webhooks" + testimonial
 *   9. Customer Stories carousel ("How X Leverages Velt")
 *  10. Security (chrome)
 *  11. Customer Testimonial Carousel "Our Customers Trust Us" (placeholder
 *      content — polish deferred per user)
 *  12-14. FAQ + GetStartedSteps + Footer (chrome)
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN env var, or DRY_RUN=1 to preview without writing.");
  process.exit(1);
}

const client = DRY_RUN
  ? null
  : createClient({
      projectId: "fk9mezqa",
      dataset: "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

const PROJECT_ROOT = resolve(import.meta.dirname, "..");

async function uploadImage(relPath) {
  if (DRY_RUN) return { _type: "image", asset: { _ref: `dry-run-${basename(relPath)}` } };
  const filePath = resolve(PROJECT_ROOT, relPath);
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: basename(filePath),
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

const LITTLE_BIG_DETAILS_DIR = "public/images/features/comments/little-big-details";

/**
 * Maps each "Little Big Details" label to its screenshot filename inside
 * LITTLE_BIG_DETAILS_DIR. Null means no screenshot available yet.
 */
const LITTLE_BIG_DETAILS = [
  { label: "Permission Controls", file: "Document Access.png" },
  { label: "Conditional @ Mentions List", file: "Conditionally control @mention list.png" },
  { label: "Dynamic Sign-in", file: "Dynamic Sign In.png" },
  { label: "Guest Mode", file: "Guest Mode.png" },
  { label: "Private Mode", file: "Private.png" },
  { label: "Frontend APIs", file: "Frontend APIs and callbacks to extend into other apps.png" },
  { label: "Programmatic Commenting", file: "Programamtcially add comments.png" },
  { label: "Backend APIs", file: "REST APIs to extend the feature into other systems.png" },
  { label: "Webhooks", file: "Webhooks.png" },
  { label: "Cell Comments", file: "Cell.png" },
  { label: "Chart Comments", file: "Charts.png" },
  { label: "Comments on Right", file: "Website.png" },
  { label: "Inline Comments", file: "blog inline.png" },
  { label: "Pinned Element Comments", file: "Comment bubble on elements.png" },
  { label: "Moderator mode", file: "Moderator mode.png" },
  { label: "Text Rewrite Suggestions", file: "Suggestion.png" },
  { label: "Text comments", file: "google doc.png" },
  { label: "Frame by frame Video Comments", file: "Video.png" },
  { label: "Authentication", file: "Authentication.png" },
  { label: "Prebuilt Data Structure", file: "Data structure.png" },
  { label: "Managed File Storage", file: "File storage.png" },
  { label: "Realtime Resource Management", file: "Realtime database and server.png" },
  { label: "Individual @ Mentions", file: "@mentions individual.png" },
  { label: "Here @ Mentions", file: "@mention.png" },
  { label: "User Group @ Mentions", file: "User Group.png" },
  { label: "Assign Comments", file: "Group 1707479583.png" },
  { label: "Email Notifications", file: "Control what triggers a notifications.png" },
  { label: "In-app Notifications", file: "Control what triggers a notifications-1.png" },
  { label: "Seen by Status", file: "Seen by Status.png" },
  { label: "Sidebar Pagination", file: "Pagination.png" },
  { label: "Auto Categorization", file: "AI Tagging.png" },
  { label: "Comment Indicies", file: "Comment Index.png" },
  { label: "Sidebar Comments Search", file: "Search.png" },
  { label: "Sidebar Custom Filtering", file: "Filter.png" },
  { label: "Sidebar Custom Grouping", file: "Custom Grouping Sidebar.png" },
  { label: "Sidebar Custom Sorting", file: "Sort.png" },
  { label: "Navigate on Click", file: "navigate on click.png" },
  { label: "Programmatic Comment Selection", file: "Programatically select.png" },
  { label: "Scroll to Comment", file: "Scroll.png" },
  { label: "Sidebar Comment Viewing", file: "Sidebar to show all comments.png" },
  { label: "Read and Unread Indicators", file: "Unread.png" },
  { label: "Audio Recording", file: "Audio Recording.png" },
  { label: "Custom Dropdowns", file: "Custom Dropdown.png" },
  { label: "Multi-Threaded Comments", file: "Thread.png" },
  { label: "Reactions", file: "Reactions.png" },
  { label: "Player for Recordings", file: "Video Player.png" },
  { label: "Recording Transcripts and summaries", file: "Transcripts & Summary.png" },
  { label: "Screen Recording", file: "Screen Recording.png" },
  { label: "Video Recording", file: "Video Attachment.png" },
  { label: "Comment Anchoring Logic", file: "Comment Anchoring Logic.png" },
  { label: "Comment Data Binding Logic", file: "Comment data binding logic (Needs Animation).png" },
  { label: "Cross Browser Compatibility", file: "Cross browser compatibility for comments, recording etc.png" },
  { label: "DOM Change Awareness", file: "DOM Change Awareness.png" },
  { label: "Ghost Comments", file: "Ghost.png" },
  { label: "Robust Comment Placement", file: "Comment Anchoring Logic.png" },
  { label: "Offline Support", file: null },
  { label: "Component Overlay Logic", file: "Overlay Components.png" },
  { label: "Page Scroll Awareness", file: "Scroll Awareness.png" },
  { label: "Screen Edge Awareness", file: "Screen edge awareness.png" },
  { label: "Screen Size Awareness", file: "Mobile compatibility.png" },
  { label: "Pirority", file: "Pirority.png" },
  { label: "Quick Resolve", file: "Quick ResolveQuick Resolve.png" },
  { label: "Task Status", file: "Status.png" },
  { label: "Custom Metadata", file: "Custom metadata.png" },
  { label: "Device Info", file: "Device Info.png" },
  { label: "File Attachments", file: "File Attachments.png" },
  { label: "Collapseable Threads", file: "Thread.png" },
  { label: "Comment Indicator Bubbles", file: "Comment bubble on elements.png" },
  { label: "Notification Trigger Controls", file: "Control what triggers a notifications.png" },
  { label: "Dark Mode", file: "Dark Mode.png" },
  { label: "Deeplinking Comments", file: "Deep link.png" },
  { label: "Confirm on Delete", file: "Delete Confirmation.png" },
  { label: "Draft Comments", file: null },
  { label: "Editable Comments", file: "Edit.png" },
  { label: "Edited Comment indicator", file: "Edited.png" },
  { label: "Granular Control Area Control", file: "Restricted.png" },
  { label: "Group Notifications", file: "Group Notifications.png" },
  { label: "Commenting Hotkey", file: "Hotkey to turn on commenting.png" },
  { label: "Minimap", file: "Minimap.png" },
  { label: "Show/Hide Comments", file: "show or hide comments.png" },
  { label: "Message Truncation", file: "Truncate.png" },
  { label: "Highlighted Mentions", file: "@mention.png" },
  { label: "Attachment Previews", file: "File Attachment.png" },
  { label: "Persistent Filter Choices", file: "Filter.png" },
  { label: "Focused Threads in Sidebar", file: "All Comments.png" },
];

async function buildLittleBigDetailsItems() {
  console.log(`  Uploading ${LITTLE_BIG_DETAILS.length} Little Big Details screenshots...`);
  const items = [];
  for (const { label, file } of LITTLE_BIG_DETAILS) {
    const key = `li-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`;
    const item = { _key: key, label };
    if (file) {
      try {
        item.screenshot = await uploadImage(`${LITTLE_BIG_DETAILS_DIR}/${file}`);
      } catch (err) {
        console.warn(`    ⚠ Could not upload "${file}" for "${label}": ${err.message}`);
      }
    }
    items.push(item);
  }
  console.log(`  → ${items.length} items ready.`);
  return items;
}

async function main() {
  console.log("Uploading commenting feature assets...");
  const avatarLinda = await uploadImage("public/images/home/linda-steps.png");

  // Partner-logo carousel for the "REST APIs and Webhooks" third pill
  // (Figma 174:28953). Order matches the Figma column top-to-bottom; the
  // bottom of the visible window is masked by a white fade so only the
  // first ~2 logos are fully visible.
  const partnersDir = "public/images/features/comments/flow/partners";
  const partnerLogo = async (file, alt) => ({
    _type: "object",
    _key: file.replace(/[^a-z0-9]/gi, "-"),
    logo: await uploadImage(`${partnersDir}/${file}`),
    alt,
  });
  const partnerLogos = [
    await partnerLogo("hubspot.svg", "HubSpot"),
    await partnerLogo("close.svg", "Close"),
    await partnerLogo("zapier.svg", "Zapier"),
    await partnerLogo("calque.svg", "Brand mark"),
    await partnerLogo("brand-logo-1.svg", "Brand mark"),
    await partnerLogo("brand-logo-2.svg", "Brand mark"),
    await partnerLogo("loops.svg", "Loops"),
    await partnerLogo("keylines.svg", "Brand mark"),
    await partnerLogo("discord.svg", "Discord"),
    await partnerLogo("opentelemetry.svg", "OpenTelemetry"),
    await partnerLogo("inngest.png", "Inngest"),
  ];
  console.log("  → uploaded.");

  // Inline-testimonial bar that appears at the bottom of several sections.
  const lindaTestimonial = {
    name: "Linda Belcher",
    role: "Product Manager @HeyGen",
    quote: "Velt hosts all collaboration functionalities needed to boost engagement at HeyGen",
    accentFragment: "boost engagement",
    accentColor: "#625df5",
    avatar: avatarLinda,
  };

  const featureBentoCard = (key, title, description, uiComponentKey) => ({
    _type: "featureBentoCard",
    _key: key,
    title,
    description,
    uiComponentKey,
  });

  const cardRowCard = (key, title, uiComponentKey, viewDocsHref) => ({
    _key: key,
    title,
    uiComponentKey,
    viewDocsHref,
  });

  const doc = {
    _id: "featurePage-comments",
    _type: "featurePage",
    title: "Comments",
    slug: { _type: "slug", current: "comments" },
    category: "Async",
    tagline: "Build commenting into your product.",
    metaTitle: "Comments | Velt",
    metaDescription:
      "Build commenting into your product. Drop-in mentions, threads, recordings, reactions, notifications, and more — fully customizable.",
    hero: {
      heading: "Build Commenting into your product",
      subheading: "Let users communicate natively in your app",
      decorated: true,
      primaryCta: {
        _type: "ctaLink",
        label: "Get Free API Key",
        href: "https://console.velt.dev/",
        newTab: true,
      },
      secondaryCta: {
        _type: "ctaLink",
        label: "Book Demo",
        href: "/book-demo",
      },
    },
    showTrustedLogos: true,
    showSecurity: true,
    showCustomerStories: true,
    sections: [
      // ---- Bento 1: Powerful and Beautiful Commenting (asymmetric) ----
      {
        _type: "featurePowerfulBentoSection",
        _key: "bento-powerful",
        heading: "Powerful and Beautiful Commenting",
        subheading: "Build a complete commenting experience that enhances user workflow",
        viewDocsCta: {
          _type: "ctaLink",
          label: "View Docs",
          href: "https://docs.velt.dev/async-collaboration/comments",
          newTab: true,
        },
        primaryCta: {
          _type: "ctaLink",
          label: "View All Examples",
          href: "https://velt.dev/examples",
          newTab: true,
        },
        mentionsCard: {
          title: "@mentions",
          description:
            "Users can include the right people in conversations and even make assignments",
        },
        tasksCard: {
          title: "Task Management",
          description: "Let users manage comments, status and priority",
        },
        recordingsCard: {
          title: "Recordings",
          description: "Enable rich conversations with replies, @mentions, and reactions",
        },
        reactionsCard: {
          title: "Reactions",
          description: "Users can express themselves",
        },
        // Detached testimonial — renders as a SEPARATE dark card below the bento.
        inlineTestimonial: {
          ...lindaTestimonial,
          accentColor: "#b4b1fa",
        },
      },
      // ---- Sidebar Showcase: Little Big Details ----
      {
        _type: "featureSidebarShowcaseSection",
        _key: "sidebar-details",
        heading: "Little Big Details",
        subheading: "Everything that goes into building the best commenting experience",
        items: await buildLittleBigDetailsItems(),
      },
      // ---- Card Row: Extend the Capabilities ----
      {
        _type: "featureCardRowSection",
        _key: "row-extend",
        heading: "Extend the Capabilities",
        subheading: "Chronological event timeline to understand users journey",
        viewDocsCta: {
          _type: "ctaLink",
          label: "View Docs",
          href: "https://docs.velt.dev/async-collaboration/comments",
          newTab: true,
        },
        primaryCta: {
          _type: "ctaLink",
          label: "View All Examples",
          href: "https://velt.dev/examples",
          newTab: true,
        },
        cards: [
          cardRowCard(
            "ext-data",
            "Custom Data",
            "customDataChip",
            "https://docs.velt.dev/async-collaboration/comments/customize-behavior",
          ),
          cardRowCard(
            "ext-dropdown",
            "Custom Dropdown",
            "customDropdownDemo",
            "https://docs.velt.dev/async-collaboration/comments/customize-behavior#createcustomlistdataoncomment",
          ),
          cardRowCard(
            "ext-autocomplete",
            "Custom Autocomplete",
            "customAutocompleteDemo",
            "https://docs.velt.dev/async-collaboration/comments/customize-behavior#autocompletescrollconfig",
          ),
        ],
        inlineTestimonial: lindaTestimonial,
      },
      // ---- Customizer: Fully Customizable UI ----
      {
        _type: "featureCustomizerSection",
        _key: "cust-fullyCustomizable",
        heading: "Fully Customizable UI",
        subheading: "Customize the components using your own design system",
        viewDocsCta: {
          _type: "ctaLink",
          label: "View Docs",
          href: "https://docs.velt.dev/async-collaboration/comments/customize-behavior",
          newTab: true,
        },
        primaryCta: {
          _type: "ctaLink",
          label: "View Customization",
          href: "https://samples.velt.dev",
          newTab: true,
        },
        playground: { label: "Playground" },
        examples: [
          { _key: "ex-windowsxp", label: "WindowsXP" },
          { _key: "ex-figma", label: "Figma" },
        ],
        controls: {
          colors: ["#FFCD2E", "#3DB7E4", "#625DF5", "#E934BF"],
          onTheEdgeValue: "/comments",
          loggedInToggleLabel: "LOGGED IN/OUT",
          parentDefaultLabel: "PARENT-DEFAULT",
        },
      },
      // ---- Bento 2: More than just Commenting ----
      {
        _type: "featureBentoSection",
        _key: "bento-more",
        heading: "More than just Commenting",
        subheading: "Build a complete experience with features that complement each other",
        viewDocsCta: {
          _type: "ctaLink",
          label: "View Docs",
          href: "https://docs.velt.dev/async-collaboration",
          newTab: true,
        },
        primaryCta: {
          _type: "ctaLink",
          label: "View All Examples",
          href: "https://velt.dev/examples",
          newTab: true,
        },
        rowHeights: [493, 493],
        cards: [
          {
            _type: "featureBentoCard",
            _key: "card-inapp",
            title: "In-App Notifications",
            description: "See what changes have been made to a shared document with timestamps",
            image: await uploadImage("public/images/features/comments/extra-features/in-app-notification.png"),
          },
          {
            _type: "featureBentoCard",
            _key: "card-email",
            title: "Email Notifications",
            description: "Enable users to get notifications off app via email",
            image: await uploadImage("public/images/features/comments/extra-features/email-notifications.png"),
          },
          {
            _type: "featureBentoCard",
            _key: "card-sidebar",
            title: "Sidebar",
            description: "All comments are viewable in one easy to access place",
            image: await uploadImage("public/images/features/comments/extra-features/sidebar.png"),
          },
          {
            _type: "featureBentoCard",
            _key: "card-minimap",
            title: "Mini map",
            description: "Identifying and navigating to comments on a page is a delightful experience",
            image: await uploadImage("public/images/features/comments/extra-features/minimap.png"),
          },
        ],
        inlineTestimonial: lindaTestimonial,
      },
      // ---- Flow Diagram: REST APIs and Webhooks ----
      {
        _type: "featureFlowDiagramSection",
        _key: "flow-rest",
        heading: "REST APIs and Webhooks",
        subheading: "Seamlessly integrate with your systems for extended functionality",
        viewDocsCta: {
          _type: "ctaLink",
          label: "View Docs",
          href: "https://docs.velt.dev/api-reference",
          newTab: true,
        },
        primaryCta: {
          _type: "ctaLink",
          label: "View All Examples",
          href: "https://velt.dev/examples",
          newTab: true,
        },
        // Per Figma 174:28914: Comment Added (orange) → Transform (yellow,
        // dark text) → Partners (dark green, vertical logo column with
        // bottom white fade).
        stages: [
          { _key: "s-comment", label: "Comment Added", color: "#ff4f00" },
          { _key: "s-transform", label: "Transform", color: "#ffc12f", labelColor: "#111" },
          {
            _key: "s-partners",
            label: "Partners",
            color: "#0b353b",
            isCarousel: true,
            carouselLogos: partnerLogos,
          },
        ],
        inlineTestimonial: lindaTestimonial,
      },
      // Customer Stories carousel ("How X Leverages Velt") is rendered as
      // page chrome via the showCustomerStories toggle on the doc, not as a
      // section block — see app/features/[slug]/page.tsx.
      // Customer Trust Carousel ("Our Customers Trust Us") is also page
      // chrome now — rendered above the FAQ on every page that has one.
      // See components/feature/FeatureCustomerCarousel.tsx (TRUST_DEFAULTS).
    ],
    getStartedSteps: { step1PackageName: "@veltdev/react" },
    faq: {
      items: [
        {
          _key: "faq-anchor",
          question: "Where can I add comments?",
          answer:
            "Anywhere. Velt Comments anchor to text ranges, DOM elements, image regions, video timestamps, and chart coordinates. The same SDK powers all of them.",
        },
        {
          _key: "faq-customize",
          question: "Can I match my product's design?",
          answer:
            "Yes. Velt ships fully themeable defaults. For deeper changes, every component is replaceable via the slot API or you can render your own UI on top of the data layer.",
        },
        {
          _key: "faq-self-host",
          question: "Can comment data be self-hosted?",
          answer:
            "Yes. Velt supports both a managed cloud and self-hosted data backends so the user-generated content lives on your infrastructure.",
        },
      ],
    },
  };

  if (DRY_RUN) {
    console.log("DRY RUN — document shape:");
    console.log(JSON.stringify(doc, null, 2));
    return;
  }

  await client.createOrReplace(doc);
  console.log(`\nDone! Upserted ${doc._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
