// White full-bleed wrapper for the use-case feature rows.
// Receives `sections[]` from the Sanity doc and stacks them with
// consistent spacing inside the 1280-wide canvas. Owns `data-outcomes`
// (Nav theme switch from over-dark to over-light).

import {
  UseCaseFeatureRow,
  type UseCaseFeatureRowData,
} from "./UseCaseFeatureRow";

export type UseCaseSectionDoc = { _key?: string } & UseCaseFeatureRowData;

export function UseCaseSections({ sections }: { sections: UseCaseSectionDoc[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <section
      data-outcomes
      className="relative flex flex-col items-center full-bleed-bg px-6 lg:px-20 py-16 lg:py-[100px]"
      style={{
        background: "#FFFFFF",
        borderTopLeftRadius: 52,
        borderTopRightRadius: 52,
      }}
    >
      <div
        className="flex flex-col items-stretch w-full max-w-[1280px]"
        style={{ gap: 80 }}
      >
        {sections.map((section, i) => (
          <UseCaseFeatureRow
            key={section._key ?? `feature-row-${i}`}
            {...section}
          />
        ))}
      </div>
    </section>
  );
}
