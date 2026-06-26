// FAQ entries for /use-case. Figma 178:63591 ships placeholder
// content (4 rows of "Does it work with other libraries?"); these are
// real questions adapted to the use-case landing context. Easy to
// edit/extend in one place — `LibraryFAQ` accepts the array directly.

import type { FaqEntry } from "@/components/library/LibraryFAQ";

export const useCaseFaq: FaqEntry[] = [
  {
    question: "Does it work with other libraries?",
    answer:
      "Yes. Velt is framework-agnostic and ships first-class adapters for popular editor and chart libraries (Tiptap, Lexical, Slate, ProseMirror, CodeMirror, Highcharts, React Flow, and more). Drop our SDK in alongside whatever you already use.",
  },
  {
    question: "Do you support self-hosting?",
    answer:
      "Yes. Enterprise plans include a self-hosting option so your customers' sensitive data stays in your infrastructure. Velt provides multi-region hosting (Amsterdam, Tokyo, Texas) plus the ability to bring your own keys for end-to-end encryption.",
  },
  {
    question: "How long does integration take?",
    answer:
      "Most teams ship a working integration in under a week. The SDK exposes drop-in components for the common surfaces (comments, presence, notifications, huddles) so an intern can wire it up; senior engineers customize behavior via the underlying APIs and webhooks.",
  },
  {
    question: "Can I customize the look and feel?",
    answer:
      "Velt components support full layout, CSS, template-variable, and conditional-rendering customization. Style with your existing design system (Tailwind, plain CSS, or any CSS-in-JS), or build entirely custom UIs on top of our APIs while still getting realtime sync, presence, and notifications.",
  },
];
