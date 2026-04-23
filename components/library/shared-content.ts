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

// Tabs at the top of the white "All Libraries" section. Labels render in
// Fira Mono UPPERCASE via LibraryTabs. "All" is the default-selected tab.
export const libraryTabs: LibraryTab[] = [
  { label: "All" },
  { label: "Text Editor" },
  { label: "Chart" },
  { label: "Canvas" },
];

// 6 libraries shown in the main /libraries landing "All Libraries" grid.
// Logo paths reuse the files already vendored for the home LibrarySupport
// section (public/images/home/). Each card links to its docs + landing.
// Docs URLs follow the pattern:
//   https://docs.velt.dev/async-collaboration/comments/setup/<library>
const docsBase = "https://docs.velt.dev/async-collaboration/comments/setup";

export const allLibraryCards: LibraryCardData[] = [
  {
    name: "CodeMirror",
    logoSrc: "/images/home/logo-codemirror-text.svg",
    logoAlt: "CodeMirror",
    docsHref: `${docsBase}/codemirror`,
    learnMoreHref: "/libraries/codemirror",
  },
  {
    name: "Lexical",
    logoSrc: "/images/home/logo-lexical.svg",
    logoAlt: "Lexical",
    docsHref: `${docsBase}/lexical`,
    learnMoreHref: "/libraries/lexical",
  },
  {
    name: "BlockNote",
    logoSrc: "/images/home/logo-blocknote.svg",
    logoAlt: "BlockNote",
    docsHref: `${docsBase}/blocknote`,
    learnMoreHref: "/libraries/blocknote",
  },
  {
    name: "Tiptap",
    logoSrc: "/images/home/logo-tiptap-wordmark.svg",
    logoAlt: "Tiptap",
    docsHref: `${docsBase}/tiptap`,
    learnMoreHref: "/libraries/tiptap",
  },
  {
    name: "Slate",
    logoSrc: undefined,
    logoAlt: "Slate",
    docsHref: `${docsBase}/slate`,
    learnMoreHref: "/libraries/slate",
  },
  {
    name: "Chart.js",
    logoSrc: "/images/home/logo-chartjs.svg",
    logoAlt: "Chart.js",
    docsHref:
      "https://docs.velt.dev/async-collaboration/comments/setup/chart-comments-setup/chartjs#chartjs-comments-setup",
    learnMoreHref: "/libraries/chartjs",
  },
];
