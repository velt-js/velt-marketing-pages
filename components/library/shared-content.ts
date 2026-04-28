// Content shared across the /libraries landing and per-library pages.
// Ported from the Framer export's library-faq.jsx (the 4 hardcoded
// answers) and the CMS Libraries collection schema in chunk-5XPNNWAZ.js.

import type { FaqEntry } from "./LibraryFAQ";
import type { LibraryTab } from "./LibraryTabs";
import type { LibraryCardData } from "./AllLibraries";

// 4 FAQ items on the main /libraries page. Answer text is lifted verbatim
// from library-faq.jsx; questions are written to fit each answer (the
// export shipped all four with placeholder "Does it work with other
// libraries?" text, replaced at runtime by CMS questions).
//
// Per-library pages prepend their own library-specific Q+As (see
// `tiptapFAQ` below) before this shared list.
export const sharedFAQ: FaqEntry[] = [
  {
    question: "What counts as an active collaborator?",
    answer:
      "An active collaborator is a unique user who has has performed CRUD operations on any Velt Feature during the month. We charge for each user only once, regardless of the number of sessions they have.\n\nNote: This excludes users who merely connect without performing CRUD operations on features like comments, notifications, CRDT, etc.",
  },
  {
    question: "How does Velt's pricing model differ from MAU-based pricing?",
    answer:
      "MAU (Monthly Active User): Some providers charge you by all of your MAUs. Even if your users connect to their servers, they will charge you whether or not your user actually collaborated using their feature.\n\nMAC (Monthly Active Collaborator): We use this. A more specific metric representing users who actively utilize Velt's collaboration features within your application during a month.\n\nMAC is a subset of MAU. Typically, about 20% of MAUs perform meaningful collaboration actions on average. This varies by product category, with some higher or lower.\n\nVelt's MAC-based pricing ensures you're billed only for users who derive value from our collaboration features, offering a more cost-effective and transparent alternative to MAU-based models.",
  },
  {
    question: "Do I get billed for users who only connect but don't collaborate?",
    answer:
      "No. Billing applies only to Velt SDK CRUD operation usage. You are not billed for users that just connect to Velt.",
  },
  {
    question: "How long does implementation take?",
    answer: "On average, customers integrate with Velt SDK in under 30 minutes.",
  },
];

// Tiptap-specific FAQ entries. Rendered before the sharedFAQ on
// /libraries/tiptap so the page leads with library-specific questions
// before the general billing/implementation answers.
export const tiptapFAQ: FaqEntry[] = [
  {
    question: "Will comments move as the document changes?",
    answer:
      "Yes. Velt anchors each comment to a range in the Tiptap document and rebases that anchor as the surrounding content is edited. Comments stay attached to the right text even after multi-user edits, formatting changes, or block reflows.",
  },
  {
    question: "Does this work with custom Tiptap extensions?",
    answer:
      "Yes. The Velt Tiptap integration ships as a Tiptap extension that composes alongside your own extensions without overriding their schema, commands, or keyboard shortcuts. You can keep using any other extensions you already have.",
  },
];

// Tabs rendered inline inside AllLibraries. Categories match the reference
// Framer CMS enum (chunk-5XPNNWAZ.js: "Text Editor", "Chart", "Canvas").
// Labels go through LibraryTabs (Fira Mono UPPERCASE). "All" always first.
export const libraryTabs: LibraryTab[] = [
  { label: "All" },
  { label: "Text Editor" },
  { label: "Charts" },
  { label: "Canvas" },
];

// 10 libraries in the /libraries grid. Logos, order, slugs, and category
// assignment mirror production velt.dev/libraries (images downloaded from
// framerusercontent.com under public/images/home/libraries/).
const docsBase = "https://docs.velt.dev/async-collaboration/comments/setup";
const libBase = "/images/home/libraries";

export const allLibraryCards: LibraryCardData[] = [
  {
    name: "Yjs",
    logoSrc: `${libBase}/yjs.png`,
    logoAlt: "Yjs",
    logoWidth: 57,
    logoHeight: 67,
    category: "Text Editor",
    docsHref: "https://docs.velt.dev/realtime-collaboration/crdt",
    learnMoreHref: "/libraries/yjs",
  },
  {
    name: "Tiptap",
    logoSrc: `${libBase}/tiptap.png`,
    logoAlt: "Tiptap",
    logoWidth: 219,
    logoHeight: 53,
    category: "Text Editor",
    docsHref: `${docsBase}/tiptap`,
    learnMoreHref: "/libraries/tiptap",
  },
  {
    name: "React Flow",
    logoSrc: `${libBase}/react-flow.png`,
    logoAlt: "React Flow",
    logoWidth: 303,
    logoHeight: 56,
    category: "Canvas",
    docsHref: "https://docs.velt.dev/realtime-collaboration/crdt/setup/reactflow",
    learnMoreHref: "/libraries/reactflow",
  },
  {
    name: "BlockNote",
    logoSrc: `${libBase}/blocknote.png`,
    logoAlt: "BlockNote",
    logoWidth: 353,
    logoHeight: 67,
    category: "Text Editor",
    docsHref: "https://docs.velt.dev/realtime-collaboration/crdt/setup/blocknote",
    learnMoreHref: "/libraries/blocknote",
  },
  {
    name: "CodeMirror",
    logoSrc: `${libBase}/codemirror.png`,
    logoAlt: "CodeMirror",
    logoWidth: 289,
    logoHeight: 67,
    category: "Text Editor",
    docsHref: `${docsBase}/codemirror`,
    learnMoreHref: "/libraries/codemirror",
  },
  {
    name: "Lexical",
    logoSrc: `${libBase}/lexical.png`,
    logoAlt: "Lexical",
    logoWidth: 212,
    logoHeight: 48,
    category: "Text Editor",
    docsHref: `${docsBase}/lexical`,
    learnMoreHref: "/libraries/lexical",
  },
  {
    name: "Slate",
    logoSrc: `${libBase}/slatejs.png`,
    logoAlt: "Slate",
    logoWidth: 115,
    logoHeight: 75,
    category: "Text Editor",
    docsHref: "https://docs.velt.dev/async-collaboration/comments/setup/slatejs",
    learnMoreHref: "/libraries/slatejs",
  },
  {
    name: "Chart.js",
    logoSrc: `${libBase}/chartjs.png`,
    logoAlt: "Chart.js",
    logoWidth: 1364,
    logoHeight: 484,
    category: "Charts",
    docsHref: "https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/chartjs",
    learnMoreHref: "/libraries/chartjs",
  },
  {
    name: "nivo",
    logoSrc: `${libBase}/nivo-charts.png`,
    logoAlt: "nivo",
    logoWidth: 212,
    logoHeight: 66,
    category: "Charts",
    docsHref: "https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/nivo-charts",
    learnMoreHref: "/libraries/nivo-charts",
  },
  {
    name: "HighCharts",
    logoSrc: `${libBase}/highcharts.png`,
    logoAlt: "HighCharts",
    logoWidth: 422,
    logoHeight: 72,
    category: "Charts",
    docsHref: "https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/highcharts",
    learnMoreHref: "/libraries/highcharts",
  },
];
