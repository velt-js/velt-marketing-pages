// Maps an integrationLibrary slug to its brand logo in /public/images/home/
// nav-icons (the same assets the homepage Integrations section uses). Surfaces
// without a bundled logo (e.g. Konva) and the plugin/agent spokes fall back to
// a text-only chip. Keep keys in sync with scripts/integration-libraries-content.json.

const NAV = "/images/home/nav-icons";

export const LIBRARY_LOGOS: Record<string, string> = {
  tiptap: `${NAV}/tiptap.svg`,
  lexical: `${NAV}/lexical.svg`,
  slatejs: `${NAV}/slatejs.png`,
  platejs: `${NAV}/plate.svg`,
  codemirror: `${NAV}/codemirror.svg`,
  ace: `${NAV}/ace.png`,
  quill: `${NAV}/quill.svg`,
  draftjs: `${NAV}/draftjs.svg`,
  blocknote: `${NAV}/blocknote.svg`,
  tinymce: `${NAV}/tinymce.svg`,
  monaco: `${NAV}/monaco.svg`,
  prosemirror: `${NAV}/prosemirror.svg`,
  ckeditor: `${NAV}/ckeditor.svg`,
  apryse: `${NAV}/apryse.svg`,
  nutrient: `${NAV}/nutrient.svg`,
  superdoc: `${NAV}/superdoc.png`,
  spreadjs: `${NAV}/spreadjs.svg`,
  "ag-grid": `${NAV}/aggrid.svg`,
  tanstack: `${NAV}/tanstack.svg`,
  "react-flow": `${NAV}/reactflow.svg`,
  chartjs: `${NAV}/chartjs.svg`,
  highcharts: `${NAV}/highcharts.svg`,
  nivo: `${NAV}/nivocharts.svg`,
  "chat-sdk": `${NAV}/vercel.svg`,
  // "Build with Velt" plugin spokes (dev-time tooling).
  cursor: `${NAV}/cursor.svg`,
  claude: `${NAV}/claude.svg`,
};

// Maps a "Works with the rest of your stack" link label to its brand logo in
// the same nav-icons set. Keyed by the chip's display label (the stack links
// carry no slug), so keep these in sync with the authored stackLinks labels in
// scripts/integrations-hub-content.json. Labels with no bundled logo fall back
// to a text-only chip.
export const STACK_LINK_LOGOS: Record<string, string> = {
  "Sync (Yjs)": `${NAV}/yjs.svg`,
  Slack: `${NAV}/slack.svg`,
  Teams: `${NAV}/microsoftteams.svg`,
  Discord: `${NAV}/discord.svg`,
  Resend: `${NAV}/resend.svg`,
  "Customer.io": `${NAV}/customerio.svg`,
  SendGrid: `${NAV}/sendgrid.svg`,
  Firebase: `${NAV}/firebase.svg`,
  Supabase: `${NAV}/supabase.svg`,
  Clerk: `${NAV}/clerk.svg`,
  Auth0: `${NAV}/auth0.svg`,
  React: `${NAV}/react.svg`,
  "Next.js": `${NAV}/nextdotjs.svg`,
  Vue: `${NAV}/vuedotjs.svg`,
  Angular: `${NAV}/angular.svg`,
  "Plain HTML": `${NAV}/html5.svg`,
};

// Slugs whose bundled logo is a wordmark (the brand name is already in the
// image): the chip renders the logo wide and omits the redundant text label.
// The rest are square icon marks that keep icon + text. (No intrinsic
// dimensions are available for these local assets, so the set is curated.)
const WORDMARK_LIBRARY_SLUGS = new Set<string>([
  "slatejs",
  "tinymce",
  "ckeditor",
  "apryse",
  "nutrient",
  "spreadjs",
]);

/**
 * Resolve a library's brand logo path, preferring a CMS-provided logo URL.
 * @param {string} slug The libraryPageV2 slug.
 * @param {string} [cmsLogo] An optional Sanity-resolved logo URL.
 * @returns {string | undefined} The logo path, or undefined when none exists.
 */
export function libraryLogo(
  slug: string,
  cmsLogo?: string,
): string | undefined {
  try {
    return cmsLogo ?? LIBRARY_LOGOS[slug];
  } catch (error) {
    console.error("libraryLogo failed", error);
    return undefined;
  }
}

/**
 * Resolve a stack-link chip's brand logo path by its display label.
 * @param {string} label The stack link's display label (e.g. "Slack").
 * @returns {string | undefined} The logo path, or undefined when none exists.
 */
export function stackLinkLogo(label: string): string | undefined {
  try {
    return STACK_LINK_LOGOS[label];
  } catch (error) {
    console.error("stackLinkLogo failed", error);
    return undefined;
  }
}

/**
 * Whether a library's logo is a wordmark (so the chip should hide the text
 * label and render the logo wide).
 * @param {string} slug The libraryPageV2 slug.
 * @returns {boolean} True for wordmark logos.
 */
export function isWordmarkLibraryLogo(slug: string): boolean {
  try {
    return WORDMARK_LIBRARY_SLUGS.has(slug);
  } catch (error) {
    console.error("isWordmarkLibraryLogo failed", error);
    return false;
  }
}
