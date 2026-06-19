// Maps between URL slugs (what users see in their address bar) and the slug
// stored on the legacy Sanity featurePage (v1) document. Only the two v1-only
// pages whose URL and CMS slug disagree remain here (/platform -> admin-console,
// /devtools -> dev-tools). The /recording and /multiplayer-editing URLs are now
// owned by featurePageV2 documents authored with matching slugs, so they no
// longer need a mapping. Keep this list small — every entry is a place where
// the URL and the CMS disagree, which is a debugging hazard. To remove an
// entry, rename the Sanity slug in Studio and drop the line here.

const URL_TO_SANITY: Record<string, string> = {
  platform: "admin-console",
  devtools: "dev-tools",
};

const SANITY_TO_URL: Record<string, string> = Object.fromEntries(
  Object.entries(URL_TO_SANITY).map(([url, sanity]) => [sanity, url])
);

export function urlSlugToSanity(slug: string): string {
  return URL_TO_SANITY[slug] ?? slug;
}

export function sanitySlugToUrl(slug: string): string {
  return SANITY_TO_URL[slug] ?? slug;
}
