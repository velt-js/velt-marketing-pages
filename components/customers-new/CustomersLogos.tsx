import "./CustomersLogos.css";
import { customerLogos } from "@/components/customers/customer-logos";

/**
 * Editorial customer logo wall. Renders every customer logo (source data in
 * components/customers/customer-logos.ts) as a grayscale mark inside a
 * bordered card cell that lifts and regains color on hover. Each cell links
 * out to the customer's site.
 * @returns The customer logos section.
 */
export default function CustomersLogos() {
  try {
    return (
      <section className="cul-section" id="logos">
        <div className="cul-inner">
          <div className="cul-eyebrow">
            <span className="cul-eyebrow-dot" />
            Trusted by builders
          </div>
          <h2 className="cul-title">
            The teams shipping collaboration on Velt.
          </h2>
          <div className="cul-grid">
            {customerLogos.map((logo) => (
              <a
                key={logo.name}
                href={logo.href}
                target="_blank"
                rel="noopener"
                className="cul-cell hcard"
                aria-label={logo.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="cul-logo"
                  src={logo.logoSrc}
                  alt={logo.name}
                  width={logo.logoWidth}
                  height={logo.logoHeight}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
