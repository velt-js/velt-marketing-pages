// Per-page testimonial block — big quote + logo + name + role.
// Mirrors Framer `testimonial__*`. Renders inside the white middle
// stack on its own row, centered.

import { Media } from "../comparison/Media";

export type UseCaseTestimonialProps = {
  quote?: string | null;
  name?: string | null;
  roleAndCompany?: string | null;
  logoSrc?: string | null;
};

export function UseCaseTestimonial({
  quote,
  name,
  roleAndCompany,
  logoSrc,
}: UseCaseTestimonialProps) {
  if (!quote && !name && !logoSrc) return null;

  return (
    <section
      className="w-full flex flex-col items-center"
      style={{ padding: "60px 20px" }}
    >
      <figure
        className="w-full flex flex-col items-center text-center"
        style={{ maxWidth: 880, gap: 32, margin: 0 }}
      >
        {logoSrc ? (
          <div style={{ height: 36, position: "relative" }}>
            <Media
              kind="image"
              src={logoSrc}
              alt={name ? `${name} logo` : "Customer logo"}
              style={{
                height: 36,
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ) : null}

        {quote ? (
          <blockquote
            className="font-urbanist"
            style={{
              fontSize: "clamp(22px, 2.8vw, 32px)",
              lineHeight: 1.3,
              letterSpacing: "-0.6px",
              color: "#111",
              margin: 0,
            }}
          >
            “{quote}”
          </blockquote>
        ) : null}

        {(name || roleAndCompany) && (
          <figcaption
            className="font-urbanist flex flex-col items-center"
            style={{ gap: 4 }}
          >
            {name ? (
              <span
                className="font-semibold"
                style={{ fontSize: 16, color: "#111" }}
              >
                {name}
              </span>
            ) : null}
            {roleAndCompany ? (
              <span style={{ fontSize: 14, color: "rgba(0,0,0,0.6)" }}>
                {roleAndCompany}
              </span>
            ) : null}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
