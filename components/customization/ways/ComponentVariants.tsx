// Way 6 — Figma node 294:24485. Single video.
import { CustomizationCard } from "../CustomizationCard";
import { Media } from "../../comparison/Media";

const VIDEO_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
} as const;

export function ComponentVariants() {
  return (
    <CustomizationCard
      num={6}
      height={604}
      heading="Component Variants"
      subheading="Create a collection of reusable components"
      visual={
        <Media
          kind="video"
          src="/videos/customization/component-variants.mp4"
          style={VIDEO_STYLE}
        />
      }
    />
  );
}
