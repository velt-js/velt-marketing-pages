import type { UseCaseFeatureChip, UseCaseRow, UseCaseRowsContent } from "./content";

const CHIPS_LABEL = "Features used";

type UseCaseRowsProps = {
  content: UseCaseRowsContent;
};

/**
 * Render the "Features used" chip for a feature row. Links externally when an
 * href is present, otherwise renders a static chip.
 * @param {UseCaseFeatureChip} chip The chip data.
 * @returns {JSX.Element} The rendered chip.
 */
function FeatureChip({ chip }: { chip: UseCaseFeatureChip }) {
  try {
    if (chip?.href) {
      const isExternal = chip.href.startsWith("http");
      return (
        <a
          className="int-chip"
          href={chip.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          {chip.label}
        </a>
      );
    }
    return <span className="int-chip">{chip.label}</span>;
  } catch (error) {
    console.error("FeatureChip render failed", error);
    return null;
  }
}

/**
 * A single alternating feature row: copy column (eyebrow, heading, body,
 * optional feature chips) beside a visual column. Media side alternates per
 * the row's imagePosition.
 * @param {UseCaseRow} row The row content.
 * @returns {JSX.Element} The rendered row.
 */
function Row({ row }: { row: UseCaseRow }) {
  try {
    const mediaLeft = row.imagePosition === "left";
    const chips = row.chips ?? [];

    return (
      <article className={mediaLeft ? "vuc-row media-left" : "vuc-row"}>
        <div className="vuc-row-copy">
          {row.eyebrow ? <p className="kicker">{row.eyebrow}</p> : null}
          <h3>{row.heading}</h3>
          {row.description ? <p>{row.description}</p> : null}
          {chips.length > 0 ? (
            <>
              <p className="vuc-row-chips-label">{CHIPS_LABEL}</p>
              <div className="vuc-row-chips">
                {chips.map((chip, index) => (
                  <FeatureChip chip={chip} key={`${chip.label}-${index}`} />
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div className="vuc-row-visual">
          {row.imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.imageSrc} alt={row.heading} loading="lazy" />
          ) : (
            <span className="img-slot">{row.heading}</span>
          )}
        </div>
      </article>
    );
  } catch (error) {
    console.error("UseCaseRows Row render failed", error);
    return null;
  }
}

/**
 * The stacked feature rows on a use-case detail page (Build / Review / Approve).
 * Returns null when there are no rows to render.
 * @param {UseCaseRowsProps} props Section content.
 * @returns {JSX.Element | null} The feature rows section.
 */
export default function UseCaseRows({ content }: UseCaseRowsProps) {
  try {
    const rows = content?.rows ?? [];
    if (rows.length === 0) {
      return null;
    }

    return (
      <section className="band" id="capabilities" data-section="capabilities">
        <div className="wrap">
          <div className="sec-head">
            {content.kicker ? <p className="kicker">{content.kicker}</p> : null}
            <h2>{content.heading}</h2>
            {content.support ? <p className="vuc-hero-sub">{content.support}</p> : null}
          </div>
          <div className="vuc-rows">
            {rows.map((row) => (
              <Row row={row} key={row.key} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("UseCaseRows render failed", error);
    return null;
  }
}
