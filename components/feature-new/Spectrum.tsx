import SectionSplitHeader from "./SectionSplitHeader";

// Bespoke section for the /customization page: the presentation spectrum.
// Rendered as semantic HTML with real text labels (agent legible), not an
// image, per the customization content spec. Shows the four presentation
// layers ordered by effort, the "CSS layers on top of everything" bracket, and
// the parallel behavior axis.

export type SpectrumLayer = {
  name: string;
  sub: string;
};

export type SpectrumContent = {
  kicker: string;
  heading: string;
  support: string;
  axisLeft: string;
  axisRight: string;
  layers: SpectrumLayer[];
  cssBracket: string;
  behaviorLabel: string;
  behaviorItems: string[];
};

type SpectrumProps = {
  content: SpectrumContent;
};

/**
 * The presentation-spectrum key visual for the customization page.
 * @param {SpectrumProps} props The spectrum content.
 * @returns {JSX.Element} The spectrum section.
 */
export default function Spectrum({ content }: SpectrumProps) {
  return (
    <section className="band sp" id="spectrum" data-section="spectrum">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.support} />

        <div className="sp-board" role="img" aria-label={`${content.axisLeft} to ${content.axisRight}, four layers: ${content.layers.map((layer) => layer.name).join(", ")}`}>
          <div className="sp-axis">
            <span className="sp-axis-end">{content.axisLeft}</span>
            <span className="sp-axis-arrow" aria-hidden="true" />
            <span className="sp-axis-end sp-axis-end-right">{content.axisRight}</span>
          </div>

          <ol className="sp-layers">
            {content.layers.map((layer, index) => (
              <li className="sp-layer" key={layer.name}>
                <span className="sp-layer-step">{String(index + 1).padStart(2, "0")}</span>
                <span className="sp-layer-name">{layer.name}</span>
                <span className="sp-layer-sub">{layer.sub}</span>
              </li>
            ))}
          </ol>

          <div className="sp-bracket">
            <span className="sp-bracket-line" aria-hidden="true" />
            <span className="sp-bracket-label">{content.cssBracket}</span>
          </div>

          <div className="sp-behavior">
            <span className="sp-behavior-label">{content.behaviorLabel}</span>
            <div className="sp-behavior-items">
              {content.behaviorItems.map((item) => (
                <span className="sp-behavior-item" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
