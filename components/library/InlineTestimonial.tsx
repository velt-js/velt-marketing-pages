// Mid-page testimonial card used on per-library pages between the bento
// and the get-started callout. Wraps TestimonialStrip in an 824-wide
// rounded #111 container sitting on a white section.

import { TestimonialStrip } from "@/components/home/TestimonialStrip";

export type InlineTestimonialProps = {
  name?: string;
  role?: string;
  avatarSrc?: string;
  quote?: string;
  accentFragment?: string;
  accentColor?: string;
};

export function InlineTestimonial(props: InlineTestimonialProps) {
  return (
    <section
      className="flex justify-center w-full bg-white full-bleed-bg"
      style={{ padding: "0 80px 100px" }}
    >
      <div
        className="overflow-hidden"
        style={{ width: 824, background: "#111", borderRadius: 24 }}
      >
        <TestimonialStrip {...props} />
      </div>
    </section>
  );
}
