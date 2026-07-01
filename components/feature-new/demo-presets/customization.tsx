import type { ReactNode } from "react";

import { CUSTOMIZATION_HERO_DEMOS, WhatItIsScene } from "./customization-hero";
import { CUSTOMIZATION_SHOWCASE_DEMOS } from "./customization-showcase";
import { CUSTOMIZATION_GALLERY_DEMOS } from "./customization-gallery";
import { CUSTOMIZATION_RELATED_DEMOS } from "./customization-related";

// Assembler for the static /customization page artifacts. The demo nodes are
// authored across four section modules (hero, showcase, gallery, related) plus
// the shared toolkit in customization-shared.tsx; this file merges them into the
// single CUSTOMIZATION_DEMOS lookup that app/customization/content.tsx reads by
// key, and re-exports the canonical WhatItIsScene (owned by the hero module).
// No Sanity document is read or written; visuals are simulated, not live SDK.

export { WhatItIsScene };

// Keyed lookup the content module reads from. Keys are local to this page.
export const CUSTOMIZATION_DEMOS: Record<string, ReactNode> = {
  ...CUSTOMIZATION_HERO_DEMOS,
  ...CUSTOMIZATION_SHOWCASE_DEMOS,
  ...CUSTOMIZATION_RELATED_DEMOS,
  ...CUSTOMIZATION_GALLERY_DEMOS,
};
