import type { CtaLink, FaqEntry, FeatureCard } from "./content";

/**
 * Render a CTA anchor with the right target/rel for external links.
 * @param {{ cta?: CtaLink; variant: "primary" | "secondary" }} props CTA + style.
 * @returns {JSX.Element | null} The button, or null when absent.
 */
export function CtaButton({
  cta,
  variant,
}: {
  cta?: CtaLink;
  variant: "primary" | "secondary";
}) {
  if (!cta?.label) return null;
  return (
    <a
      className={`vintg-btn vintg-btn--${variant}`}
      href={cta.href}
      target={cta.newTab ? "_blank" : undefined}
      rel={cta.newTab ? "noreferrer" : undefined}
    >
      {cta.label}
    </a>
  );
}

/**
 * Primary + secondary CTA row with optional microcopy.
 * @param {{ primaryCta?: CtaLink; secondaryCta?: CtaLink; microcopy?: string }} props CTAs + microcopy.
 * @returns {JSX.Element} The CTA cluster.
 */
export function CtaRow({
  primaryCta,
  secondaryCta,
  microcopy,
}: {
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  microcopy?: string;
}) {
  return (
    <div>
      <div className="vintg-ctas">
        <CtaButton cta={primaryCta} variant="primary" />
        <CtaButton cta={secondaryCta} variant="secondary" />
      </div>
      {microcopy ? <p className="vintg-micro">{microcopy}</p> : null}
    </div>
  );
}

/**
 * Section header: eyebrow + heading + optional support copy.
 * @param {{ eyebrow?: string; heading?: string; support?: string }} props Header content.
 * @returns {JSX.Element | null} The header, or null when there is no heading.
 */
export function SectionHead({
  eyebrow,
  heading,
  support,
}: {
  eyebrow?: string;
  heading?: string;
  support?: string;
}) {
  if (!heading && !eyebrow) return null;
  return (
    <div className="vintg-sechead">
      {eyebrow ? <p className="vintg-eyebrow">{eyebrow}</p> : null}
      {heading ? <h2 className="vintg-h2">{heading}</h2> : null}
      {support ? <p className="vintg-lead">{support}</p> : null}
    </div>
  );
}

/**
 * A 3-up grid of feature cards, each optionally linking to its feature page.
 * @param {{ cards: FeatureCard[] }} props The feature cards.
 * @returns {JSX.Element | null} The card grid, or null when empty.
 */
export function FeatureCards({ cards }: { cards: FeatureCard[] }) {
  if (!cards || cards.length === 0) return null;
  return (
    <div className="vintg-cards">
      {cards.map((card) => (
        <div key={card.title} className="vintg-card">
          <h4>{card.title}</h4>
          {card.body ? <p>{card.body}</p> : null}
          {card.featureHref ? (
            <a className="vintg-card-link" href={card.featureHref}>
              Learn more
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/**
 * A native-disclosure FAQ list.
 * @param {{ items: FaqEntry[] }} props FAQ entries.
 * @returns {JSX.Element | null} The FAQ, or null when empty.
 */
export function FaqList({ items }: { items: FaqEntry[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="vintg-faq">
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
