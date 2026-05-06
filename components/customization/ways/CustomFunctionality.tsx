// Way 5 — Figma node 294:24478. Single video.
import { CustomizationCard } from "../CustomizationCard";
import { Media } from "../../comparison/Media";

const VIDEO_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
} as const;

export function CustomFunctionality() {
  return (
    <CustomizationCard
      num={5}
      height={632}
      heading="Custom Functionality"
      subheading="Add custom actions and behaviours to components"
      visual={
        <Media
          kind="video"
          src="/videos/customization/custom-functionality.mp4"
          style={VIDEO_STYLE}
        />
      }
    />
  );
}
