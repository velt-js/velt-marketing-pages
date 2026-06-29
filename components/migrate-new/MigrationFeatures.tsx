import type { ReactNode } from "react";
import "./MigrationFeatures.css";

/** A "feature used" chip; links out when an href is provided. */
type MigrationFeatureChip = {
  _key?: string;
  label: string;
  href?: string | null;
};

/** A single feature-mapping row (text + image). */
export type MigrationFeatureRow = {
  _key?: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  imagePosition?: "left" | "right";
  image?: string | null;
  features?: MigrationFeatureChip[] | null;
  /** Render-time override that replaces the default image visual entirely.
   *  Used for the Extensive Features row, whose hand-built comment-thread mock
   *  has no flat-image equivalent in Sanity. */
  customVisual?: ReactNode;
};

/** Props for the feature-mapping section. */
type MigrationFeaturesProps = {
  rows: MigrationFeatureRow[];
};

const SECTION_EYEBROW = "Feature parity";
const SECTION_TITLE = "Everything you shipped matches in Velt.";
const SECTION_SUB =
  "Every primitive you relied on has a drop-in equivalent, plus the modern surfaces that keep shipping.";
const CHIPS_LABEL = "Features used";

/**
 * Renders a single feature chip as a static span or an anchor when linked.
 * @param {{ chip: MigrationFeatureChip }} props The chip data.
 * @returns {JSX.Element} The chip element.
 */
function FeatureChip({ chip }: { chip: MigrationFeatureChip }) {
  if (!chip.href) {
    return <span className="mig-feat-chip">{chip.label}</span>;
  }
  const isExternal = chip.href.startsWith("http");
  return (
    <a
      href={chip.href}
      className="mig-feat-chip"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener" : undefined}
    >
      {chip.label}
    </a>
  );
}

/**
 * Editorial feature-mapping section: a left-aligned intro followed by a stack
 * of alternating split rows (copy + product image). Honors each row's
 * `imagePosition` so consecutive rows zig-zag. Pulls `--vlp-*` tokens only.
 * @param {MigrationFeaturesProps} props The rows to render.
 * @returns {JSX.Element | null} The section, or null when there are no rows.
 */
export default function MigrationFeatures({ rows }: MigrationFeaturesProps) {
  try {
    if (!rows || rows.length === 0) return null;

    return (
      <section className="mig-feat">
        <div className="mig-feat-inner">
          <div className="mig-feat-intro">
            <div className="mig-feat-eyebrow">
              <span className="mig-feat-eyebrow-dot" />
              {SECTION_EYEBROW}
            </div>
            <h2 className="mig-feat-intro-title">{SECTION_TITLE}</h2>
            <p className="mig-feat-intro-sub">{SECTION_SUB}</p>
          </div>

          <div className="mig-feat-rows">
            {rows.map((row, index) => {
              const hasVisual = Boolean(row.customVisual) || Boolean(row.image);
              // Flip only matters when there's a visual to swap sides with.
              const flip = hasVisual && row.imagePosition === "left";
              const hasFeatures = row.features && row.features.length > 0;
              const rowClassNames = ["mig-feat-row"];
              if (flip) rowClassNames.push("mig-feat-row--flip");
              // A row with no image and no custom visual collapses to a single
              // full-width text column — no reserved empty column or divider.
              if (!hasVisual) rowClassNames.push("mig-feat-row--no-visual");
              return (
                <div
                  className={rowClassNames.join(" ")}
                  key={row._key ?? `mig-feat-row-${index}`}
                >
                  <div className="mig-feat-row-text">
                    {row.eyebrow ? (
                      <div className="mig-feat-row-eyebrow">{row.eyebrow}</div>
                    ) : null}
                    {row.heading ? (
                      <h3 className="mig-feat-row-title">{row.heading}</h3>
                    ) : null}
                    {row.description ? (
                      <p className="mig-feat-row-desc">{row.description}</p>
                    ) : null}
                    {hasFeatures ? (
                      <>
                        <div className="mig-feat-row-chips-label">
                          {CHIPS_LABEL}
                        </div>
                        <div className="mig-feat-row-chips">
                          {row.features?.map((chip, chipIndex) => (
                            <FeatureChip
                              key={chip._key ?? `${chip.label}-${chipIndex}`}
                              chip={chip}
                            />
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>

                  {hasVisual ? (
                    <div
                      className={
                        row.customVisual
                          ? "mig-feat-row-visual mig-feat-row-visual--custom"
                          : "mig-feat-row-visual"
                      }
                    >
                      {row.customVisual ? (
                        row.customVisual
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={row.image ?? ""}
                          alt={row.heading ?? ""}
                          className="mig-feat-row-img"
                          loading="lazy"
                        />
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
