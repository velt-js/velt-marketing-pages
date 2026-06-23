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
};

/**
 * Resolve a library's brand logo path, preferring a CMS-provided logo URL.
 * @param {string} slug The integrationLibrary slug.
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
