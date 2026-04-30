// Stacked-image highlight section used on /features/recordings. Shares
// the FeatureSectionShell chrome (1280-wide white card with dark border,
// centered heading + subheading + CTA at top, dark testimonial banner at
// the bottom) with FeatureCardRow, but the body is a single full-width
// image instead of a grid of demo cells.
//
// Figma nodes 219:22023, 219:22098, 219:22117 in HqWIZdR6ISJmaG2n4o3gr8.

import {
  FeatureSectionShell,
  type FeatureSectionShellTestimonial,
  type ShellCtaLink,
} from "./FeatureSectionShell";

export type FeatureImageCardProps = {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  viewDocsCta?: ShellCtaLink;
  primaryCta?: ShellCtaLink;
  imageSrc: string;
  imageAlt?: string;
  /** Image dimensions in design pixels. Card 1/3 are 1280×467; card 2 is 1199×297. */
  imageWidth: number;
  imageHeight: number;
  /**
   * Distance from the bottom edge of the white outer card to the bottom of
   * the image. Negative pulls the image past the bottom edge of the card.
   * Card 1/3 use -2.38; card 2 uses 68.62.
   */
  imageBottomOffset?: number;
  testimonial?: FeatureSectionShellTestimonial;
  /** Mark this as the first light section on the page so the shell renders
   *  the 48px rounded top + 80px margin transition from the dark hero strip. */
  topAccent?: boolean;
};

export function FeatureImageCard({
  eyebrow,
  heading,
  subheading,
  viewDocsCta,
  primaryCta,
  imageSrc,
  imageAlt = "",
  imageWidth,
  imageHeight,
  imageBottomOffset = 0,
  testimonial,
  topAccent = false,
}: FeatureImageCardProps) {
  // The outer body needs enough room for the image *plus* the centered
  // heading/CTA cluster the shell renders above it. The shell pads
  // 55+80=135px above the body and the heading cluster is ~150px tall, so
  // we just need the image height plus a small breathing buffer.
  const bodyHeight = imageHeight + Math.max(0, -imageBottomOffset);

  return (
    <FeatureSectionShell
      eyebrow={eyebrow}
      heading={heading}
      subheading={subheading}
      viewDocsCta={viewDocsCta}
      primaryCta={primaryCta}
      testimonial={testimonial}
      topAccent={topAccent}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: "100%",
          height: bodyHeight,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="absolute pointer-events-none select-none"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            bottom: imageBottomOffset,
            width: imageWidth,
            height: imageHeight,
            maxWidth: "none",
            objectFit: "cover",
          }}
        />
      </div>
    </FeatureSectionShell>
  );
}
