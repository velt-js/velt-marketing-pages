// White full-bleed wrapper + section dispatcher for /use-case/[slug].
// Mirrors components/feature/FeatureSections.tsx — receives the
// polymorphic `sections[]` array from the Sanity doc and renders each
// entry with the matching component, in document order. Owns
// `data-outcomes` (Nav theme switch).
//
// Section types: useCaseBentoSection, librarySupportSection.

import {
  UseCaseBentoSection,
  type UseCaseBentoSectionData,
} from "./UseCaseBentoSection";
import {
  LibrarySupportSection,
  type LibrarySupportSectionData,
} from "./LibrarySupportSection";

export type UseCaseSectionDoc =
  | ({ _type: "useCaseBentoSection"; _key?: string } & UseCaseBentoSectionData)
  | ({ _type: "librarySupportSection"; _key?: string } & LibrarySupportSectionData);

export function UseCaseSections({ sections }: { sections: UseCaseSectionDoc[] }) {
  return (
    <section
      data-outcomes
      className="relative flex flex-col items-center full-bleed-bg"
      style={{
        background: "#FFFFFF",
        paddingTop: 100,
        paddingBottom: 120,
        gap: 100,
        borderTopLeftRadius: 52,
        borderTopRightRadius: 52,
      }}
    >
      <div
        className="flex flex-col items-stretch"
        style={{ width: 1280, gap: 100 }}
      >
        {sections.map((section, i) => {
          const key = section._key ?? `${section._type}-${i}`;
          if (section._type === "useCaseBentoSection") {
            return <UseCaseBentoSection key={key} {...section} />;
          }
          if (section._type === "librarySupportSection") {
            return <LibrarySupportSection key={key} {...section} />;
          }
          // Unknown section types are ignored rather than thrown — keeps
          // partial drafts from breaking the static build.
          return null;
        })}
      </div>
    </section>
  );
}
