// Central, CSS-driven hide for "anonymous" testimonials — role/industry bylines
// with no named individual (e.g. "Product lead · AI-native SaaS",
// "Marketing ops lead, content platform"). The components mark such cards with
// ANONYMOUS_TESTIMONIAL_CLASS + data-anonymous, and the actual hiding is a
// `display: none` rule in components/feature-new/styles.css.
//
// TODO: anonymous testimonials hidden until real named testimonials are
// available. To re-enable, remove the matching CSS block in styles.css (search
// for ANONYMOUS_TESTIMONIAL_CLASS / "testimonial--anonymous"). Detection here is
// intentionally conservative: only bylines whose FIRST word is a role keyword
// are flagged, so any future named testimonial (a real person's name) is left
// visible.

/**
 * Stable hook attached to anonymous testimonial elements at render time. The
 * `display: none` rule in styles.css keys on this class. Borderline cases that
 * use a real company but still no person name ("Product Manager, HeyGen" on
 * /devtools, "Senior PM, Google" on /customization) are flagged the same way —
 * see the TODO next to the CSS rule before re-enabling them.
 */
export const ANONYMOUS_TESTIMONIAL_CLASS = "testimonial--anonymous";

// Leading role words seen in the anonymous bylines (plus common synonyms). A
// byline whose first word is one of these is a role/industry descriptor rather
// than a real person's name. Kept lowercase for case-insensitive comparison.
const ROLE_LEADING_KEYWORDS: ReadonlySet<string> = new Set([
  "head",
  "staff",
  "marketing",
  "product",
  "founding",
  "founder",
  "cofounder",
  "engineering",
  "engineer",
  "compliance",
  "vp",
  "vice",
  "president",
  "review",
  "design",
  "designer",
  "controller",
  "cto",
  "ceo",
  "coo",
  "cfo",
  "cpo",
  "senior",
  "junior",
  "principal",
  "chief",
  "operations",
  "ops",
  "director",
  "lead",
  "manager",
  "owner",
  "analyst",
  "architect",
  "developer",
  "growth",
  "sales",
  "support",
  "data",
  "platform",
  "technical",
  "pm",
]);

/**
 * Normalize a byline's first word for keyword comparison: lowercased with any
 * surrounding punctuation/hyphens stripped (e.g. "Co-founder" -> "cofounder").
 * @param {string} firstWord The raw first whitespace-delimited token.
 * @returns {string} The normalized, letters-only token.
 */
function normalizeFirstWord(firstWord: string): string {
  try {
    return firstWord?.toLowerCase().replace(/[^a-z]/g, "") ?? "";
  } catch (error) {
    console.error("normalizeFirstWord failed", error);
    return "";
  }
}

/**
 * Whether a testimonial byline is "anonymous" — i.e. a role/industry descriptor
 * with no named individual. Conservative by design: only bylines whose first
 * word is a known role keyword are treated as anonymous, so a real person's name
 * is never hidden.
 * @param {string | null | undefined} who The testimonial byline (the "who" field).
 * @returns {boolean} True when the byline should be hidden as anonymous.
 */
export function isAnonymousTestimonial(who?: string | null): boolean {
  try {
    const byline = who?.trim() ?? "";
    if (!byline) return false;
    const firstWord = normalizeFirstWord(byline.split(/\s+/)[0] ?? "");
    if (!firstWord) return false;
    return ROLE_LEADING_KEYWORDS.has(firstWord);
  } catch (error) {
    console.error("isAnonymousTestimonial failed", error);
    return false;
  }
}

/**
 * Build the className for a testimonial element, appending the anonymous hook
 * when the byline is anonymous so the central CSS rule can hide it.
 * @param {string} baseClassName The element's existing class(es).
 * @param {string | null | undefined} who The testimonial byline.
 * @returns {string} The resolved className.
 */
export function testimonialClassName(
  baseClassName: string,
  who?: string | null,
): string {
  try {
    return isAnonymousTestimonial(who)
      ? `${baseClassName} ${ANONYMOUS_TESTIMONIAL_CLASS}`
      : baseClassName;
  } catch (error) {
    console.error("testimonialClassName failed", error);
    return baseClassName;
  }
}
