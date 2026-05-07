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
      className="relative flex flex-col items-center full-bleed-bg"
      style={{
        background: "#FFFFFF",
        paddingTop: 100,
        paddingBottom: 120,
        borderTopLeftRadius: 52,
        borderTopRightRadius: 52,
      }}
    >
      <div
        className="flex flex-col items-stretch"
        style={{ width: 1280, gap: 136 }}
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
