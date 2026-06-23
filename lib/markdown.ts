// Shared helpers for LLM-friendly text endpoints. Consumed by:
//   - app/llms.txt/route.ts         : curated index
//   - app/llms-full.txt/route.ts    : full concatenated content
//   - app/api/md/[[...slug]]/route.ts : per-page .md endpoint
//     (reached via middleware.ts which rewrites velt.dev/foo.md → here)
//
// Two responsibilities:
//   1. portableTextToMarkdown: serialize Sanity Portable Text blocks to
//      CommonMark. Handles headings (h1-h4), paragraphs, ordered/bullet
//      lists with nesting, blockquotes, code blocks, inline marks
//      (strong/em/code/link), and Sanity's `code` + `image` + `table`
//      block types.
//   2. getPageMarkdown / getAllPageMarkdowns: central lookup that
//      returns { url, title, markdown } for every marketing-site URL.
//      Static React pages have hand-authored markdown summaries; Sanity
//      docs are fetched fresh and serialized on demand.

import { client } from "@/sanity/client";
import {
  getAllBlogPosts,
  getAllDemoPages,
  getAllFeaturePages,
  getAllFeatureV2Slugs,
  getAllIntegrationSlugs,
  getAllLibraryPages,
  getAllLibrariesV2,
  getAllLibraryV2Slugs,
  getAllSolutionSlugs,
  getAllUseCasePages,
  getBlogPostBySlug,
  getDemoPageBySlug,
  getFeaturePageBySlug,
  getFeaturePageV2BySlug,
  getIntegrationPageBySlug,
  getLibraryPageBySlug,
  getLibraryPageV2BySlug,
  getMigrationPageBySlug,
  getSolutionPageBySlug,
  getUseCasePageBySlug,
} from "@/sanity/queries";
import { sanitySlugToUrl, urlSlugToSanity } from "@/lib/feature-slugs";

export const SITE_URL = "https://velt.dev";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PageMarkdown = {
  /** Absolute URL of the canonical (HTML) page. */
  url: string;
  /** Human-readable title used for the H1 and the llms.txt link label. */
  title: string;
  /** CommonMark body, no frontmatter. */
  markdown: string;
};

type Span = {
  _type?: string;
  text?: string;
  marks?: string[];
};

type MarkDef = {
  _key: string;
  _type: string;
  href?: string;
};

type PtBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: Span[];
  markDefs?: MarkDef[];
  // code block
  code?: string;
  language?: string;
  // image block
  alt?: string;
  caption?: string;
  asset?: { url?: string };
  // table block (from @sanity/table)
  rows?: Array<{ _key?: string; cells?: string[] }>;
};

// ---------------------------------------------------------------------------
// Portable Text → Markdown
// ---------------------------------------------------------------------------

function spanToMarkdown(span: Span, markDefs: MarkDef[]): string {
  if (!span || span._type !== "span") return "";
  let text = (span.text ?? "").replace(/\r\n/g, "\n");
  const marks = span.marks ?? [];
  // Apply decorators first (innermost), then link annotations (outermost)
  const decorators = marks.filter((m) => ["strong", "em", "code", "underline"].includes(m));
  const links = marks.filter((m) => !decorators.includes(m));
  for (const mark of decorators) {
    if (mark === "strong") text = `**${text}**`;
    else if (mark === "em") text = `*${text}*`;
    else if (mark === "code") text = `\`${text}\``;
  }
  for (const mark of links) {
    const def = markDefs.find((d) => d._key === mark);
    if (def && def._type === "link" && def.href) {
      text = `[${text}](${def.href})`;
    }
  }
  return text;
}

function renderBlockText(block: PtBlock): string {
  return (block.children ?? [])
    .map((c) => spanToMarkdown(c, block.markDefs ?? []))
    .join("");
}

function renderTable(block: PtBlock): string {
  const rows = block.rows ?? [];
  if (rows.length === 0) return "";
  const [headerRow, ...bodyRows] = rows;
  const headerCells = (headerRow?.cells ?? []).map((c) => (c ?? "").replace(/\|/g, "\\|"));
  if (headerCells.length === 0) return "";
  const separator = headerCells.map(() => "---");
  const lines: string[] = [];
  lines.push("| " + headerCells.join(" | ") + " |");
  lines.push("| " + separator.join(" | ") + " |");
  for (const row of bodyRows) {
    const cells = (row.cells ?? []).map((c) => (c ?? "").replace(/\|/g, "\\|"));
    while (cells.length < headerCells.length) cells.push("");
    lines.push("| " + cells.join(" | ") + " |");
  }
  return lines.join("\n");
}

/**
 * Serialize an array of Sanity Portable Text blocks to CommonMark. Returns
 * an empty string when blocks is missing or empty. Consecutive list items
 * are coalesced into a single list with auto-numbered ordered items.
 */
export function portableTextToMarkdown(blocks?: PtBlock[] | null): string {
  if (!blocks || blocks.length === 0) return "";
  const parts: string[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (!b || typeof b !== "object") {
      i++;
      continue;
    }
    if (b._type === "block" && b.listItem) {
      // Group adjacent list items of the same kind into one list
      const items: string[] = [];
      const kind = b.listItem;
      let num = 1;
      while (
        i < blocks.length &&
        blocks[i]?._type === "block" &&
        blocks[i]?.listItem === kind
      ) {
        const child = blocks[i] as PtBlock;
        const text = renderBlockText(child);
        const indent = "  ".repeat(Math.max(0, (child.level ?? 1) - 1));
        const bullet = kind === "number" ? `${num++}. ` : "- ";
        items.push(`${indent}${bullet}${text}`);
        i++;
      }
      parts.push(items.join("\n"));
      continue;
    }
    if (b._type === "block") {
      const text = renderBlockText(b);
      const style = b.style ?? "normal";
      if (style === "h1") parts.push(`# ${text}`);
      else if (style === "h2") parts.push(`## ${text}`);
      else if (style === "h3") parts.push(`### ${text}`);
      else if (style === "h4") parts.push(`#### ${text}`);
      else if (style === "blockquote") parts.push(`> ${text}`);
      else parts.push(text);
    } else if (b._type === "code") {
      const lang = b.language ?? "";
      parts.push("```" + lang + "\n" + (b.code ?? "") + "\n```");
    } else if (b._type === "image" || b._type === "blogBodyImage") {
      const src = b.asset?.url ?? "";
      const alt = b.alt ?? "";
      if (src) {
        let imgMd = `![${alt}](${src})`;
        if (b.caption) imgMd += `\n\n*${b.caption}*`;
        parts.push(imgMd);
      }
    } else if (b._type === "table") {
      const table = renderTable(b);
      if (table) parts.push(table);
    }
    i++;
  }
  return parts.filter(Boolean).join("\n\n").trim();
}

// ---------------------------------------------------------------------------
// Plain-text helpers for structured Sanity sections
// ---------------------------------------------------------------------------

function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
}

function heading(level: number, text: string): string {
  if (!text) return "";
  const hashes = "#".repeat(Math.min(6, Math.max(1, level)));
  return `${hashes} ${text}`;
}

function bullet(label: string, href?: string | null): string {
  if (!label) return "";
  return href ? `- [${label}](${href})` : `- ${label}`;
}

function joinSections(parts: Array<string | null | undefined>): string {
  return parts.filter((p): p is string => Boolean(p && p.trim())).join("\n\n");
}

// ---------------------------------------------------------------------------
// CTA strip: removes marketing call-to-action links/text from .md mirrors.
// Goal: zero occurrences of "Get Free API Key" or "Book Demo" in any output.
// Does NOT touch the rendered HTML pages.
// ---------------------------------------------------------------------------

/**
 * Remove CTA links and bare CTA text from a markdown string. Also collapses
 * dangling " · " separators and 3+ consecutive blank lines to 2.
 *
 * @param md - Raw markdown string produced by a page serializer.
 * @returns Cleaned markdown with no CTA phrases.
 */
function stripCtas(md: string): string {
  const CTA_PATTERN =
    /get free api key|get api key|book a demo|book demo|book a slot|book a consult|book a migration call|apply now/i;

  // Remove markdown links whose visible text matches CTA_PATTERN
  let result = md.replace(/\[([^\]]+)\]\([^)]+\)/g, (match, label: string) => {
    if (CTA_PATTERN.test(label)) return "";
    return match;
  });

  // Remove bare standalone CTA strings that survived as plain text
  result = result.replace(/\bGet Free API Key\b/g, "");
  result = result.replace(/\bBook Demo\b/g, "");

  // Clean up leftover " · " separators at the start or end of lines
  result = result.replace(/^ ?· ?/gm, "");
  result = result.replace(/ ?· ?$/gm, "");

  // Collapse 3+ consecutive blank lines to 2
  result = result.replace(/\n{4,}/g, "\n\n\n");

  return result.trim();
}

// ---------------------------------------------------------------------------
// Blog-only Portable Text fetch (the body is fetched here for the markdown
// generator since the existing query inlines image URLs but not asset refs;
// we re-fetch body with image asset URLs so portableTextToMarkdown can emit
// real ![alt](url) links).
// ---------------------------------------------------------------------------

async function getBlogPostMarkdownBody(slug: string): Promise<PtBlock[] | null> {
  // Mirrors getBlogPostBySlug's body shape but expands image assets so the
  // serializer has URLs to emit. Sanity returns body as Portable Text.
  return client.fetch<PtBlock[] | null>(
    `*[_type == "blogPost" && slug.current == $slug][0].body[] {
      ...,
      _type == "image" => { ..., "asset": asset->{ url } },
      _type == "blogBodyImage" => { ..., "asset": asset->{ url } }
    }`,
    { slug }
  );
}

// ---------------------------------------------------------------------------
// Sanity-doc serializers
// ---------------------------------------------------------------------------

async function blogPostMarkdown(slug: string): Promise<PageMarkdown | null> {
  const post = await getBlogPostBySlug(slug);
  if (!post?.title) return null;
  const body = await getBlogPostMarkdownBody(slug);
  const parts: string[] = [];
  if (post.description) parts.push(clean(post.description));
  if (post.author?.name || post.publishedAt) {
    const meta: string[] = [];
    if (post.author?.name) meta.push(`By ${post.author.name}`);
    if (post.publishedAt) {
      const date = new Date(post.publishedAt);
      if (!Number.isNaN(date.getTime())) {
        meta.push(
          date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }
    }
    if (meta.length > 0) parts.push(`*${meta.join(" · ")}*`);
  }
  const bodyMd = portableTextToMarkdown(body ?? undefined);
  if (bodyMd) parts.push(bodyMd);
  return {
    url: `${SITE_URL}/blog/${slug}`,
    title: post.title,
    markdown: parts.join("\n\n").trim(),
  };
}

type DemoDoc = {
  title?: string;
  appName?: string;
  category?: string;
  title1?: string;
  title2?: string;
  content?: string;
  demoLink?: string;
  appLink?: string;
  feature1Name?: string;
  feature2Name?: string;
  feature3Name?: string;
};

async function demoMarkdown(slug: string): Promise<PageMarkdown | null> {
  const doc = (await getDemoPageBySlug(slug)) as DemoDoc | null;
  if (!doc?.title) return null;
  const parts: string[] = [];
  if (doc.appName) parts.push(`*App: ${doc.appName}*`);
  if (doc.category) parts.push(`*Category: ${doc.category}*`);
  if (doc.title1) parts.push(clean(doc.title1));
  if (doc.title2) parts.push(clean(doc.title2));
  if (doc.content) parts.push(clean(doc.content));
  const features = [doc.feature1Name, doc.feature2Name, doc.feature3Name]
    .map((f) => clean(f ?? ""))
    .filter(Boolean);
  if (features.length > 0) {
    parts.push(heading(2, "Features"));
    parts.push(features.map((f) => `- ${f}`).join("\n"));
  }
  if (doc.demoLink || doc.appLink) {
    parts.push(heading(2, "Links"));
    const links: string[] = [];
    if (doc.demoLink) links.push(`- [Open Demo](${doc.demoLink})`);
    if (doc.appLink) links.push(`- [Visit App](${doc.appLink})`);
    parts.push(links.join("\n"));
  }
  return {
    url: `${SITE_URL}/demos/${slug}`,
    title: doc.title,
    markdown: parts.join("\n\n").trim(),
  };
}

type CtaLink = { label?: string; href?: string };
type FaqItems = { items?: Array<{ question?: string; answer?: string }> };

type HeroDoc = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
};

function heroMarkdown(hero?: HeroDoc | null, tagline?: string | null): string {
  if (!hero) return "";
  const parts: string[] = [];
  if (hero.eyebrow) parts.push(`*${clean(hero.eyebrow)}*`);
  if (hero.subheading) parts.push(clean(hero.subheading));
  else if (tagline) parts.push(clean(tagline));
  const ctas: string[] = [];
  if (hero.primaryCta?.label && hero.primaryCta?.href) {
    ctas.push(`[${hero.primaryCta.label}](${hero.primaryCta.href})`);
  }
  if (hero.secondaryCta?.label && hero.secondaryCta?.href) {
    ctas.push(`[${hero.secondaryCta.label}](${hero.secondaryCta.href})`);
  }
  if (ctas.length > 0) parts.push(ctas.join(" · "));
  return parts.join("\n\n").trim();
}

function faqMarkdown(faq?: FaqItems | null): string {
  const items = (faq?.items ?? []).filter((i) => i?.question);
  if (items.length === 0) return "";
  const parts: string[] = [heading(2, "FAQ")];
  for (const item of items) {
    parts.push(`### ${clean(item.question)}`);
    if (item.answer) parts.push(clean(item.answer));
  }
  return parts.join("\n\n");
}

type FeatureSection = {
  _type?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  cards?: Array<{
    title?: string;
    description?: string;
    pullQuote?: string;
    body?: string;
    authorName?: string;
  }>;
  mentionsCard?: { title?: string; description?: string };
  tasksCard?: { title?: string; description?: string };
  recordingsCard?: { title?: string; description?: string };
  reactionsCard?: { title?: string; description?: string };
  items?: Array<{ label?: string }>;
};

function sectionsMarkdown(sections?: FeatureSection[] | null): string {
  if (!sections || sections.length === 0) return "";
  const parts: string[] = [];
  for (const section of sections) {
    if (section.heading) parts.push(`## ${clean(section.heading)}`);
    if (section.subheading) parts.push(clean(section.subheading));
    if (section.cards && section.cards.length > 0) {
      for (const card of section.cards) {
        if (card.title) parts.push(`### ${clean(card.title)}`);
        if (card.description) parts.push(clean(card.description));
        if (card.pullQuote) parts.push(`> ${clean(card.pullQuote)}`);
        if (card.body) parts.push(clean(card.body));
      }
    }
    const fixedCards = [
      section.mentionsCard,
      section.tasksCard,
      section.recordingsCard,
      section.reactionsCard,
    ].filter((c): c is { title?: string; description?: string } => Boolean(c?.title || c?.description));
    for (const card of fixedCards) {
      if (card.title) parts.push(`### ${clean(card.title)}`);
      if (card.description) parts.push(clean(card.description));
    }
    if (section.items && section.items.length > 0) {
      parts.push(
        section.items
          .map((it) => bullet(clean(it.label ?? "")))
          .filter(Boolean)
          .join("\n")
      );
    }
  }
  return parts.join("\n\n");
}

async function featureMarkdown(urlSlug: string): Promise<PageMarkdown | null> {
  const sanitySlug = urlSlugToSanity(urlSlug);
  const doc = (await getFeaturePageBySlug(sanitySlug)) as
    | {
        title?: string;
        tagline?: string;
        hero?: HeroDoc;
        sections?: FeatureSection[];
        faq?: FaqItems;
      }
    | null;
  if (!doc?.hero?.heading) return null;
  return {
    url: `${SITE_URL}/${urlSlug}`,
    title: doc.title ?? doc.hero.heading,
    markdown: joinSections([
      heroMarkdown(doc.hero, doc.tagline),
      sectionsMarkdown(doc.sections),
      faqMarkdown(doc.faq),
    ]),
  };
}

// ---------------------------------------------------------------------------
// v2 feature page serializer
// ---------------------------------------------------------------------------

/**
 * Serialize a v2 feature page (featurePageV2 Sanity type) to markdown.
 * Returns null when the document is missing or has no hero title.
 *
 * @param slug - The URL slug, used verbatim for the canonical URL.
 */
async function featureV2Markdown(slug: string): Promise<PageMarkdown | null> {
  const doc = await getFeaturePageV2BySlug(slug) as {
    title?: string;
    hero?: {
      title?: string;
      secondary?: string;
      kicker?: string;
    };
    whatItIs?: { heading?: string; body?: string };
    howItWorks?: {
      heading?: string;
      support?: string;
      steps?: Array<{ title?: string; code?: string; filename?: string }>;
      mechanics?: { body?: string };
      buildVsBuy?: { items?: string[] };
    };
    showcase?: {
      heading?: string;
      support?: string;
      cards?: Array<{ name?: string; headline?: string; code?: string }>;
      interstitial?: { quote?: string; who?: string };
    };
    details?: {
      heading?: string;
      support?: string;
      items?: Array<{ label?: string; soon?: boolean }>;
    };
    makeItYours?: {
      heading?: string;
      support?: string;
      cards?: Array<{ title?: string; body?: string; code?: string }>;
    };
    inProduction?: {
      heading?: string;
      support?: string;
      tabs?: Array<{ caption?: string }>;
      whereItFits?: { links?: Array<{ label?: string; href?: string }> };
    };
    testimonials?: {
      heading?: string;
      cards?: Array<{ metric?: string; quote?: string; who?: string }>;
    };
    faq?: { items?: Array<{ question?: string; answer?: string }> };
  } | null;

  if (!doc?.hero?.title) return null;

  const parts: string[] = [];

  // Lead paragraph from hero
  if (doc.hero?.secondary) parts.push(clean(doc.hero.secondary));

  // What it is
  const wii = doc.whatItIs;
  if (wii?.heading || wii?.body) {
    if (wii?.heading) parts.push(heading(2, clean(wii.heading)));
    if (wii?.body) parts.push(clean(wii.body));
  }

  // How it works
  const hiw = doc.howItWorks;
  if (hiw?.heading || hiw?.support) {
    if (hiw?.heading) parts.push(heading(2, clean(hiw.heading)));
    if (hiw?.support) parts.push(clean(hiw.support));
    for (const step of hiw?.steps ?? []) {
      if (step?.title) parts.push(heading(3, clean(step.title)));
      if (step?.code) parts.push("```\n" + step.code + "\n```");
    }
    if (hiw?.mechanics?.body) parts.push(clean(hiw.mechanics.body));
    const bvbItems = hiw?.buildVsBuy?.items ?? [];
    if (bvbItems.length > 0) {
      parts.push(
        bvbItems
          .map((item) => bullet(clean(typeof item === "string" ? item : String(item))))
          .filter(Boolean)
          .join("\n")
      );
    }
  }

  // Showcase
  const sc = doc.showcase;
  if (sc?.heading || sc?.support) {
    if (sc?.heading) parts.push(heading(2, clean(sc.heading)));
    if (sc?.support) parts.push(clean(sc.support));
    for (const card of sc?.cards ?? []) {
      const cardTitle = clean(card?.headline ?? card?.name ?? "");
      if (cardTitle) parts.push(heading(3, cardTitle));
      if (card?.code) parts.push("```\n" + card.code + "\n```");
    }
    if (sc?.interstitial?.quote) {
      parts.push(`> ${clean(sc.interstitial.quote)}`);
    }
  }

  // Details
  const det = doc.details;
  if (det?.heading || det?.support) {
    if (det?.heading) parts.push(heading(2, clean(det.heading)));
    if (det?.support) parts.push(clean(det.support));
    const detItems = (det?.items ?? [])
      .map((item) => {
        const label = clean(item?.label ?? "");
        if (!label) return "";
        return bullet(item?.soon ? `${label} (coming soon)` : label);
      })
      .filter(Boolean);
    if (detItems.length > 0) parts.push(detItems.join("\n"));
  }

  // Make it yours
  const miy = doc.makeItYours;
  if (miy?.heading || miy?.support) {
    if (miy?.heading) parts.push(heading(2, clean(miy.heading)));
    if (miy?.support) parts.push(clean(miy.support));
    for (const card of miy?.cards ?? []) {
      if (card?.title) parts.push(heading(3, clean(card.title)));
      if (card?.body) parts.push(clean(card.body));
      if (card?.code) parts.push("```\n" + card.code + "\n```");
    }
  }

  // In production (no ctaBanner)
  const inp = doc.inProduction;
  if (inp?.heading || inp?.support) {
    if (inp?.heading) parts.push(heading(2, clean(inp.heading)));
    if (inp?.support) parts.push(clean(inp.support));
    for (const tab of inp?.tabs ?? []) {
      if (tab?.caption) parts.push(clean(tab.caption));
    }
    const fitLinks = (inp?.whereItFits?.links ?? [])
      .map((link) => bullet(clean(link?.label ?? ""), link?.href ?? undefined))
      .filter(Boolean);
    if (fitLinks.length > 0) parts.push(fitLinks.join("\n"));
  }

  // Testimonials
  const test = doc.testimonials;
  if (test?.heading) {
    parts.push(heading(2, clean(test.heading)));
    for (const card of test?.cards ?? []) {
      if (!card?.quote) continue;
      const prefix = card?.metric ? `${clean(card.metric)}: ` : "";
      parts.push(`> ${prefix}${clean(card.quote)}`);
      if (card?.who) parts.push(`- ${clean(card.who)}`);
    }
  }

  // FAQ
  const faqMd = faqMarkdown(doc.faq);
  if (faqMd) parts.push(faqMd);

  return {
    url: `${SITE_URL}/${slug}`,
    title: clean(doc.title ?? doc.hero.title ?? ""),
    markdown: joinSections(parts),
  };
}

// ---------------------------------------------------------------------------
// Solution page serializer
// ---------------------------------------------------------------------------

/**
 * Serialize a v1 solution/vertical page (solutionPageV1 Sanity type) to markdown.
 * Returns null when the document is missing or has no hero title.
 *
 * @param slug - The URL slug; the canonical URL will be /for/{slug}.
 */
async function solutionMarkdown(slug: string): Promise<PageMarkdown | null> {
  const doc = await getSolutionPageBySlug(slug) as {
    title?: string;
    hero?: { title?: string; secondary?: string };
    reviewReality?: { heading?: string; items?: string[]; close?: string };
    theLoop?: {
      heading?: string;
      body?: string;
      beats?: Array<{ title?: string; body?: string; beta?: boolean }>;
    };
    featureMap?: {
      heading?: string;
      support?: string;
      cards?: Array<{ name?: string; oneLiner?: string; code?: string }>;
    };
    agentLayer?: { heading?: string; body?: string };
    inProduction?: {
      heading?: string;
      body?: string;
      metric?: string;
      quote?: string;
      who?: string;
    };
    compliance?: {
      heading?: string;
      lead?: string;
      items?: Array<{ title?: string; body?: string }>;
    };
    faq?: { items?: Array<{ question?: string; answer?: string }> };
  } | null;

  if (!doc?.hero?.title) return null;

  const parts: string[] = [];

  // Lead paragraph from hero
  if (doc.hero?.secondary) parts.push(clean(doc.hero.secondary));

  // Review reality
  const rr = doc.reviewReality;
  if (rr?.heading) {
    parts.push(heading(2, clean(rr.heading)));
    const rrItems = (rr?.items ?? [])
      .map((item) => bullet(clean(typeof item === "string" ? item : String(item))))
      .filter(Boolean);
    if (rrItems.length > 0) parts.push(rrItems.join("\n"));
    if (rr?.close) parts.push(clean(rr.close));
  }

  // The loop
  const tl = doc.theLoop;
  if (tl?.heading || tl?.body) {
    if (tl?.heading) parts.push(heading(2, clean(tl.heading)));
    if (tl?.body) parts.push(clean(tl.body));
    for (const beat of tl?.beats ?? []) {
      if (beat?.title) {
        const beatTitle = beat?.beta ? `${clean(beat.title)} (beta)` : clean(beat.title);
        parts.push(heading(3, beatTitle));
      }
      if (beat?.body) parts.push(clean(beat.body));
    }
  }

  // Feature map
  const fm = doc.featureMap;
  if (fm?.heading || fm?.support) {
    if (fm?.heading) parts.push(heading(2, clean(fm.heading)));
    if (fm?.support) parts.push(clean(fm.support));
    for (const card of fm?.cards ?? []) {
      if (card?.name) parts.push(heading(3, clean(card.name)));
      if (card?.oneLiner) parts.push(clean(card.oneLiner));
      if (card?.code) parts.push("```\n" + card.code + "\n```");
    }
  }

  // Agent layer
  const al = doc.agentLayer;
  if (al?.heading || al?.body) {
    if (al?.heading) parts.push(heading(2, clean(al.heading)));
    if (al?.body) parts.push(clean(al.body));
  }

  // In production (no ctaBanner)
  const inp = doc.inProduction;
  if (inp?.heading || inp?.body) {
    if (inp?.heading) parts.push(heading(2, clean(inp.heading)));
    if (inp?.body) parts.push(clean(inp.body));
    if (inp?.metric) parts.push(clean(inp.metric));
    if (inp?.quote) {
      parts.push(`> ${clean(inp.quote)}`);
      if (inp?.who) parts.push(`- ${clean(inp.who)}`);
    }
  }

  // Compliance
  const comp = doc.compliance;
  if (comp?.heading || comp?.lead) {
    if (comp?.heading) parts.push(heading(2, clean(comp.heading)));
    if (comp?.lead) parts.push(clean(comp.lead));
    for (const item of comp?.items ?? []) {
      if (item?.title) parts.push(heading(3, clean(item.title)));
      if (item?.body) parts.push(clean(item.body));
    }
  }

  // FAQ
  const faqMd = faqMarkdown(doc.faq);
  if (faqMd) parts.push(faqMd);

  return {
    url: `${SITE_URL}/for/${slug}`,
    title: clean(doc.title ?? doc.hero.title ?? ""),
    markdown: joinSections(parts),
  };
}

type LibraryDoc = {
  title?: string;
  tagline?: string;
  hero?: HeroDoc;
  bento?: {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    cards?: Array<{ title?: string; description?: string }>;
  };
  getStartedCallout?: {
    heading?: string;
    body?: string;
    viewDocsHref?: string;
    getApiKeyHref?: string;
    codeSnippet?: { code?: string; language?: string };
  };
  faq?: FaqItems;
};

async function libraryMarkdown(slug: string): Promise<PageMarkdown | null> {
  const doc = (await getLibraryPageBySlug(slug)) as LibraryDoc | null;
  if (!doc?.hero?.heading) return null;
  const parts: string[] = [heroMarkdown(doc.hero, doc.tagline)];
  if (doc.bento?.heading || doc.bento?.subheading) {
    parts.push(`## ${clean(doc.bento.heading ?? "Capabilities")}`);
    if (doc.bento.subheading) parts.push(clean(doc.bento.subheading));
    for (const card of doc.bento.cards ?? []) {
      if (card.title) parts.push(`### ${clean(card.title)}`);
      if (card.description) parts.push(clean(card.description));
    }
  }
  if (doc.getStartedCallout?.heading) {
    parts.push(`## ${clean(doc.getStartedCallout.heading)}`);
    if (doc.getStartedCallout.body) parts.push(clean(doc.getStartedCallout.body));
    const snippet = doc.getStartedCallout.codeSnippet;
    if (snippet?.code) {
      parts.push("```" + (snippet.language ?? "") + "\n" + snippet.code + "\n```");
    }
    const links: string[] = [];
    if (doc.getStartedCallout.viewDocsHref) {
      links.push(`[View Docs](${doc.getStartedCallout.viewDocsHref})`);
    }
    if (doc.getStartedCallout.getApiKeyHref) {
      links.push(`[Get API Key](${doc.getStartedCallout.getApiKeyHref})`);
    }
    if (links.length > 0) parts.push(links.join(" · "));
  }
  parts.push(faqMarkdown(doc.faq));
  return {
    url: `${SITE_URL}/libraries/${slug}`,
    title: doc.title ?? doc.hero.heading,
    markdown: joinSections(parts),
  };
}

type LibraryV2Doc = {
  name?: string;
  kind?: string;
  beta?: boolean;
  heroTitle?: string;
  heroSecondary?: string;
  problemHeader?: string;
  problemBody?: string;
  builtForLine?: string;
  featureCards?: Array<{ title?: string; body?: string; featureHref?: string }>;
  agentsCardBody?: string;
  setupPackages?: string;
  valueProps?: string[];
  setupNote?: string;
  faq?: Array<{ question?: string; answer?: string }>;
};

// .md mirror for the v2 libraries (libraryPageV2). Built from the same fields
// the SpokeView renders, so /libraries/{slug}.md matches the page.
async function libraryV2Markdown(slug: string): Promise<PageMarkdown | null> {
  const doc = (await getLibraryPageV2BySlug(slug)) as LibraryV2Doc | null;
  if (!doc?.name) return null;
  const betaSuffix = doc.beta ? " (beta)" : "";
  const title = `${doc.heroTitle ?? `Velt for ${doc.name}`}${betaSuffix}`;
  const parts: string[] = [];
  if (doc.heroSecondary) parts.push(clean(doc.heroSecondary));
  if (doc.problemBody) {
    parts.push(heading(2, doc.problemHeader ?? `Why build with Velt on ${doc.name}`));
    parts.push(clean(doc.problemBody));
  }
  if (doc.builtForLine) {
    parts.push(heading(2, `Built for ${doc.name}`));
    parts.push(clean(doc.builtForLine));
  }
  if (doc.featureCards && doc.featureCards.length > 0) {
    parts.push(heading(2, "Features"));
    parts.push(
      doc.featureCards
        .map((card) => {
          const body = card.body ? `: ${clean(card.body)}` : "";
          const href = card.featureHref ? ` (${SITE_URL}${card.featureHref})` : "";
          return `- **${clean(card.title ?? "")}**${body}${href}`;
        })
        .join("\n"),
    );
  }
  if (doc.agentsCardBody) {
    parts.push(heading(2, "Agents"));
    parts.push(clean(doc.agentsCardBody));
  }
  if (doc.valueProps && doc.valueProps.length > 0) {
    parts.push(heading(2, "What you get"));
    parts.push(doc.valueProps.map((prop) => `- ${clean(prop)}`).join("\n"));
  }
  if (doc.setupPackages) {
    parts.push(heading(2, "Setup"));
    parts.push("```bash\nnpm install " + doc.setupPackages.trim() + "\n```");
  } else if (doc.setupNote) {
    parts.push(heading(2, "Setup"));
    parts.push(clean(doc.setupNote));
  }
  if (doc.faq && doc.faq.length > 0) {
    parts.push(heading(2, "FAQ"));
    parts.push(
      doc.faq
        .map((entry) => `**${clean(entry.question ?? "")}** ${clean(entry.answer ?? "")}`)
        .join("\n\n"),
    );
  }
  return {
    url: `${SITE_URL}/libraries/${slug}`,
    title,
    markdown: joinSections(parts),
  };
}

type MigrationDoc = {
  title?: string;
  tagline?: string;
  hero?: HeroDoc;
  migrationSteps?: {
    headingPrefix?: string;
    headingHighlight?: string;
    subtitle?: string;
    step1?: { title?: string; description?: string };
    step2?: { title?: string; description?: string };
    step3?: { title?: string; description?: string };
  };
  featureRows?: Array<{
    eyebrow?: string;
    heading?: string;
    description?: string;
    features?: Array<{ label?: string; href?: string }>;
  }>;
  faq?: FaqItems;
};

async function migrationMarkdown(
  slug: string,
  pageUrl: string
): Promise<PageMarkdown | null> {
  const doc = (await getMigrationPageBySlug(slug)) as MigrationDoc | null;
  if (!doc?.hero?.heading) return null;
  const parts: string[] = [heroMarkdown(doc.hero, doc.tagline)];
  if (doc.migrationSteps) {
    const ms = doc.migrationSteps;
    const headerBits = [ms.headingPrefix, ms.headingHighlight]
      .map((s) => clean(s ?? ""))
      .filter(Boolean);
    if (headerBits.length > 0) parts.push(`## ${headerBits.join(" ")}`);
    if (ms.subtitle) parts.push(clean(ms.subtitle));
    const steps = [ms.step1, ms.step2, ms.step3].filter(
      (s): s is { title?: string; description?: string } =>
        Boolean(s?.title || s?.description)
    );
    steps.forEach((step, i) => {
      if (step.title) parts.push(`### Step ${i + 1}. ${clean(step.title)}`);
      if (step.description) parts.push(clean(step.description));
    });
  }
  if (doc.featureRows && doc.featureRows.length > 0) {
    parts.push(`## What you get`);
    for (const row of doc.featureRows) {
      if (row.heading) parts.push(`### ${clean(row.heading)}`);
      if (row.description) parts.push(clean(row.description));
      const feats = (row.features ?? [])
        .map((f) => bullet(clean(f.label ?? ""), f.href ?? undefined))
        .filter(Boolean);
      if (feats.length > 0) parts.push(feats.join("\n"));
    }
  }
  parts.push(faqMarkdown(doc.faq));
  return {
    url: `${SITE_URL}${pageUrl}`,
    title: doc.title ?? doc.hero.heading,
    markdown: joinSections(parts),
  };
}

type UseCaseDoc = {
  title?: string;
  tagline?: string;
  hero?: HeroDoc;
  sections?: Array<{
    eyebrow?: string;
    heading?: string;
    description?: string;
    features?: Array<{ label?: string; href?: string }>;
  }>;
  benefits?: Array<{
    tag?: string;
    title?: string;
    description?: string;
    useCases?: Array<{ name?: string; link?: string }>;
  }>;
  testimonial?: { quote?: string; name?: string; roleAndCompany?: string };
  faq?: FaqItems;
};

async function useCaseMarkdown(slug: string): Promise<PageMarkdown | null> {
  const doc = (await getUseCasePageBySlug(slug)) as UseCaseDoc | null;
  if (!doc?.hero?.heading) return null;
  const parts: string[] = [heroMarkdown(doc.hero, doc.tagline)];
  // Benefits are the "real" content on most use-case pages; sections is
  // the fallback for the older scaffold (Video Editor seed).
  if (doc.benefits && doc.benefits.length > 0) {
    for (const b of doc.benefits) {
      if (b.tag) parts.push(`*${clean(b.tag)}*`);
      if (b.title) parts.push(`## ${clean(b.title)}`);
      if (b.description) parts.push(clean(b.description));
      const uses = (b.useCases ?? [])
        .map((u) => bullet(clean(u.name ?? ""), u.link ?? undefined))
        .filter(Boolean);
      if (uses.length > 0) parts.push(uses.join("\n"));
    }
  } else if (doc.sections && doc.sections.length > 0) {
    for (const s of doc.sections) {
      if (s.eyebrow) parts.push(`*${clean(s.eyebrow)}*`);
      if (s.heading) parts.push(`## ${clean(s.heading)}`);
      if (s.description) parts.push(clean(s.description));
      const feats = (s.features ?? [])
        .map((f) => bullet(clean(f.label ?? ""), f.href ?? undefined))
        .filter(Boolean);
      if (feats.length > 0) parts.push(feats.join("\n"));
    }
  }
  if (doc.testimonial?.quote) {
    parts.push(`> ${clean(doc.testimonial.quote)}`);
    const attribution = [doc.testimonial.name, doc.testimonial.roleAndCompany]
      .map((s) => clean(s ?? ""))
      .filter(Boolean)
      .join(", ");
    if (attribution) parts.push(`- ${attribution}`);
  }
  parts.push(faqMarkdown(doc.faq));
  return {
    url: `${SITE_URL}/use-case/${slug}`,
    title: doc.title ?? doc.hero.heading,
    markdown: joinSections(parts),
  };
}

type IntegrationDoc = {
  name?: string;
  category?: string;
  heroTitle?: string;
  tagline?: string;
  description?: string;
  demoUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
  codeSnippet?: string;
  connectBody?: string;
  payloadBody?: string;
  unifiedBody?: string;
};

async function integrationMarkdown(slug: string): Promise<PageMarkdown | null> {
  const doc = (await getIntegrationPageBySlug(slug)) as IntegrationDoc | null;
  if (!doc?.name) return null;
  const title = doc.heroTitle ?? `Integrate Velt in ${doc.name}`;
  const parts: string[] = [];
  if (doc.category) parts.push(`*Category: ${clean(doc.category)}*`);
  const subheading =
    doc.description ??
    doc.tagline ??
    `Write 6 lines to integrate Velt in ${doc.name}.`;
  if (subheading) parts.push(clean(subheading));

  // Three optional content slots from the Sanity schema (connect / payload /
  // unified) -- these mirror the on-page sections rendered by
  // IntegrationConnectSection.
  if (doc.connectBody) {
    parts.push(heading(2, `Connect ${doc.name}`));
    parts.push(clean(doc.connectBody));
  }
  if (doc.payloadBody) {
    parts.push(heading(2, "Configure the payload"));
    parts.push(clean(doc.payloadBody));
  }
  if (doc.unifiedBody) {
    parts.push(heading(2, "Unified API"));
    parts.push(clean(doc.unifiedBody));
  }
  if (doc.codeSnippet) {
    parts.push("```ts\n" + doc.codeSnippet.trim() + "\n```");
  }
  const links: string[] = [];
  if (doc.demoUrl) links.push(`[Live demo](${doc.demoUrl})`);
  if (doc.docsUrl) links.push(`[Docs](${doc.docsUrl})`);
  if (doc.githubUrl) links.push(`[Source](${doc.githubUrl})`);
  if (links.length > 0) {
    parts.push(heading(2, "Links"));
    parts.push(links.join(" · "));
  }

  return {
    url: `${SITE_URL}/integrations/${slug}`,
    title,
    markdown: joinSections(parts),
  };
}

// ---------------------------------------------------------------------------
// Static-page registry: hand-authored markdown summaries for React pages
// whose meaningful content is buried in JSX. Order is the ordering the
// llms-full.txt route emits (high-priority pages first).
// ---------------------------------------------------------------------------

const STATIC_PAGES: PageMarkdown[] = [
  {
    url: `${SITE_URL}/`,
    title: "Velt: The Collaboration Stack for B2B",
    markdown: `Velt is the review and approval infrastructure layer for AI-generated work. Add powerful real-time and multiplayer features to your product with an embeddable SDK for comments, presence, annotations, notifications, recordings, and approval workflows.

## What you get

- **Comments**: block-anchored inline comments, threaded replies, reactions
- **Notifications**: in-app, email, and Slack delivery with native UI
- **Recordings**: Loom-style screen and webcam recording with auto-generated links
- **Presence & multiplayer**: live cursors, avatars, follow-me mode, shared state
- **Approval workflows**: review queues, status tracking, approve/reject UI
- **Admin console & analytics**: moderation, analytics, audit logs out of the box

## Built for B2B SaaS

Used by Stensul, trumpet, Privado, Cofactr, OpenEnvoy, and others. SOC 2 Type II and HIPAA compliant. Pre-built drop-in components for React, Next.js, Angular, Vue, and Vanilla JS, or use the headless APIs.

## Integration in minutes

Most teams ship a working integration in under 30 minutes. The free Hacker plan covers 100 Monthly Active Documents (MADs) for dev environments. Growth and Enterprise are contract-based.

[Get Free API Key](https://console.velt.dev/) · [Book a Demo](${SITE_URL}/book-demo) · [Read the Docs](${SITE_URL}/docs)`,
  },
  {
    url: `${SITE_URL}/pricing`,
    title: "Velt Pricing: Collaboration SDK Plans",
    markdown: `Pay only for meaningful collaboration usage. Velt bills on MADs (Monthly Active Documents): a document only counts when it has active CRUD operations from a Velt feature like comments, notifications, or CRDT. Documents that are merely initialized don't count.

## Plans

### Hacker: Free
For hackathon or side projects.
- 100 MADs
- All Features (15+)
- Pre-built Components
- Full Customization
- Basic Webhooks
- Real-time infrastructure
- Dev environments only (no production deployment)

### Growth: Contract-based
For teams shipping collaboration features to production.
- Everything in Hacker
- Production deployment
- Higher MAD limits
- Priority support
- Advanced webhooks and APIs

### Enterprise: Contract-based
For organizations with security, compliance, or self-hosting needs.
- Everything in Growth
- SOC 2 Type II / HIPAA
- Self-hosted deployment option
- 99.999% uptime SLA
- Dedicated support and account management

## Why MAD-based pricing?

Most collaboration vendors charge per MAR (Monthly Active Room): a room counts as active when any user connects, even if nothing happens. Velt only charges for documents where users actually use collaboration features. Typically about 20% of MARs perform meaningful collaboration actions, so MAD-based pricing is significantly cheaper for most workloads.

## Discounts

Special deals for early-stage startups (apply via the startup discount form). Volume discounts on Growth and Enterprise, book a demo to discuss.

[Get Free API Key](https://console.velt.dev/) · [Book a Demo](${SITE_URL}/book-demo)`,
  },
  {
    url: `${SITE_URL}/features`,
    title: "Velt Features: Full List",
    markdown: `Velt ships 15+ collaboration features as drop-in components or headless APIs. Mix and match: install the package, drop in the React components you need, and the rest of the SDK stays dormant.

## Core features

- **Comments**: block-anchored, threaded, with replies and reactions
- **Notifications**: in-app, email, Slack delivery with native UI
- **Recordings**: Loom-style screen + webcam capture
- **Multiplayer**: live cursors, avatars, follow-me mode
- **Presence**: see who's online and where
- **Reactions**: emoji reactions on any element
- **Mentions**: @-mentions with notifications and permissions
- **Tasks**: turn comments into tasks with assignees and statuses
- **Activity logs**: full audit trail of every action
- **Admin console**: moderate content, view analytics, manage users
- **Webhooks & API**: sync events into your backend or other tools

## Platforms

React, Next.js, Angular, Vue, Vanilla JS. SDK works in single-page apps, server-rendered apps, embedded iframes, and Chrome extensions.

## Customization

Every component is themeable via design tokens, or run headless and render your own UI on top of Velt's APIs.

[Browse all features](${SITE_URL}/features) · [View docs](${SITE_URL}/docs)`,
  },
  {
    url: `${SITE_URL}/enterprise`,
    title: "Velt for Enterprise",
    markdown: `Enterprise-grade collaboration infrastructure for organizations with security, compliance, or scale requirements.

## Security & compliance

- **SOC 2 Type II** certified
- **HIPAA** compliant
- **GDPR** ready
- Security and trust documentation at [trust.velt.dev](https://trust.velt.dev/)

## Deployment

- Multi-region cloud (default)
- Self-hosted in your VPC (Enterprise)
- Single-tenant deployment available
- Customer-managed encryption keys (CMEK)

## Reliability

- 99.999% uptime SLA on Growth and Enterprise
- Real-time infrastructure built for horizontal scaling
- 24/7 monitoring with on-call rotation

## Support

- Dedicated Slack channel
- Account manager and solution engineer
- Quarterly business reviews
- Priority incident response

## Integration support

- White-glove onboarding
- Custom UI build assistance
- Architecture review with the Velt engineering team

[Book a demo](${SITE_URL}/book-demo) · [Trust portal](https://trust.velt.dev/)`,
  },
  {
    url: `${SITE_URL}/comparison`,
    title: "Velt vs. Alternatives",
    markdown: `How Velt compares to other collaboration SDKs and infrastructure providers.

## Velt vs. Liveblocks

Velt ships ready-to-use UI components for comments, notifications, recordings, and approvals out of the box. Liveblocks focuses on primitives (presence, storage, broadcast), and you build the UI yourself. Velt also includes recordings, an admin console, approval workflows, and email/Slack notifications natively. Liveblocks doesn't.

Velt's MAD-based pricing typically runs ~5x cheaper than Liveblocks' MAR pricing for the same workload.

[Read the full comparison](${SITE_URL}/liveblocks-alternative) · [Migrate from Liveblocks](${SITE_URL}/migrate-from-liveblocks-to-velt)

## Velt vs. Cord

Cord shut down in 2024. Velt offers a drop-in replacement with similar comment APIs plus the rest of the collaboration stack: notifications, recordings, presence, admin console.

[Migrate from Cord](${SITE_URL}/migrate-from-cord-to-velt)

## Velt vs. building it yourself

Building a production-grade comments system takes 3-6 engineering months and ~5 FTEs to maintain (real-time infra, conflict resolution, moderation UI, notification delivery, email templates, analytics, etc.). Velt is one npm install and a few component drops. Customers report saving 3 FTEs and shipping 5x faster.

[Book a demo](${SITE_URL}/book-demo)`,
  },
  {
    url: `${SITE_URL}/customers`,
    title: "Velt Customers: Trusted by Google, Pendo & More",
    markdown: `Velt powers collaboration features for B2B SaaS products across enterprise, growth-stage, and high-velocity teams. Customers report 26% engagement increase, 3 FTEs saved, and 5x faster shipping after adopting Velt.

## Featured customers

- **Google**: collaboration features inside internal tools
- **Pendo**: in-app commenting on product analytics
- **Runway**: collaborative review on AI video edits
- **Stensul**: comments and approvals on marketing emails
- **trumpet**: buyer collaboration on B2B sales rooms
- **Privado**: comments on privacy assessments
- **Cofactr**: collaboration on supply-chain workflows
- **OpenEnvoy**: collaborative invoice review

## Stories

Customers use Velt to add comments to product analytics dashboards, marketing email editors, video review apps, sales rooms, internal admin panels, and compliance workflows. The same SDK works across all of these surfaces with different drop-in UIs.

[Read customer stories](${SITE_URL}/customers) · [Book a demo](${SITE_URL}/book-demo)`,
  },
  {
    url: `${SITE_URL}/customization`,
    title: "Customizing the Velt UI",
    markdown: `Every Velt component is themeable via design tokens, or you can run the SDK headless and render your own UI on top of the APIs.

## Themed mode

Drop in the React components and override CSS custom properties to match your brand: colors, typography, spacing, border radius. Components inherit your tokens by default.

## Composable mode

Compose smaller UI primitives (CommentBubble, NotificationItem, ReactionPicker) into your own layouts. Pull from the same data source as the default UI.

## Headless mode

Use the Velt hooks and APIs without rendering any of our UI. Build your own React, Angular, Vue, or Vanilla JS components on top; Velt handles the data, real-time sync, and storage.

## Server-side customization

Customize comment metadata, notification copy, recipient lists, email templates, and permissions via webhooks and the REST API.

[Customization docs](${SITE_URL}/docs)`,
  },
  {
    url: `${SITE_URL}/liveblocks-alternative`,
    title: "Liveblocks Alternative: Why Teams Pick Velt",
    markdown: `Velt is a Liveblocks alternative for B2B SaaS teams that want a full collaboration stack, not just primitives.

## What's different

- **Drop-in UI**: Velt ships components for comments, notifications, recordings, approvals, admin console. Liveblocks ships primitives (presence, storage, broadcast). With Velt you get a working UI on day one; with Liveblocks you build it yourself.
- **More features**: Recordings, admin console, approval workflows, email/Slack notifications. Liveblocks doesn't ship these.
- **MAD pricing**: Velt bills on documents with actual collaboration. Liveblocks bills on MAR (any connected room). For the same workload Velt is typically ~5x cheaper.
- **Faster to ship**: Most teams ship a working Velt integration in under 30 minutes vs. weeks for a custom Liveblocks build.

## When to pick Liveblocks instead

If you need only presence and shared state for a Figma-like app and you have engineering capacity to build your own commenting UI, Liveblocks may fit.

[Migrate from Liveblocks](${SITE_URL}/migrate-from-liveblocks-to-velt) · [Book a demo](${SITE_URL}/book-demo)`,
  },
  {
    url: `${SITE_URL}/launch-kit`,
    title: "Velt Launch Kit",
    markdown: `Pre-built launch assets for teams adopting Velt: landing page templates, customer announcement copy, in-app onboarding sequences, and support documentation.

## What's included

- Product landing page templates (Next.js + Tailwind)
- Customer email announcement templates
- In-app feature spotlight components
- Support article templates for common questions

[Browse the launch kit](${SITE_URL}/launch-kit)`,
  },
  // /integrations is rendered dynamically by integrationsIndexMarkdown()
  // (built from Sanity) so it always reflects the live integration roster.
  {
    url: `${SITE_URL}/add-comments-quick`,
    title: "Add Comments to Your Product: Fast",
    markdown: `Add a production-ready commenting system to your product in under 30 minutes. Drop in the Velt React components, point them at your DOM, and you have block-anchored inline comments, threaded replies, reactions, mentions, and notifications.

## What ships

- Inline comment pins on any DOM element
- Side-panel stream comments
- Threaded replies and reactions
- @mentions with notifications
- Email and in-app notifications
- Admin moderation console

## Quickstart

\`\`\`bash
npm install @veltdev/react
\`\`\`

Wrap your app, point Velt at your user object, drop in the comment components, ship.

[Get Free API Key](https://console.velt.dev/) · [View docs](${SITE_URL}/docs)`,
  },
  {
    url: `${SITE_URL}/add-notifications-quick`,
    title: "Add Notifications to Your Product: Fast",
    markdown: `Drop in a production-ready notification system: in-app inbox UI, native email delivery, Slack integration, and webhook events, in under 30 minutes.

## What ships

- In-app notification inbox UI
- Notification badges and toasts
- Email templates with full customization
- Slack delivery
- Webhook events for custom destinations
- Per-user notification preferences

[Get Free API Key](https://console.velt.dev/) · [View docs](${SITE_URL}/docs)`,
  },
  {
    url: `${SITE_URL}/add-recording-quick`,
    title: "Add Recordings to Your Product: Fast",
    markdown: `Add Loom-style screen and webcam recording to your product in under 30 minutes. Users record from anywhere in your app and share a link; Velt handles storage, transcoding, and playback.

## What ships

- One-click record button (screen + webcam + audio)
- Auto-generated shareable links
- Built-in playback UI
- Comments and reactions on recordings
- Recording library and admin console

[Get Free API Key](https://console.velt.dev/) · [View docs](${SITE_URL}/docs)`,
  },
  {
    url: `${SITE_URL}/google-spreadsheets-like-comments`,
    title: "Google Sheets-like Comments in Your Product",
    markdown: `Add Google Sheets-style cell-anchored commenting to your spreadsheet or table product. Comments attach to individual cells, ranges, rows, or columns, and stay anchored even as users edit, sort, and filter.

## Use cases

- Spreadsheet apps
- Data tables
- BI dashboards
- Analytics tools
- Database UIs

## Features

- Cell, range, row, and column anchoring
- Threaded replies and reactions
- @mentions and notifications
- Realtime sync across users

[Get Free API Key](https://console.velt.dev/)`,
  },
  {
    url: `${SITE_URL}/notion-like-comments`,
    title: "Notion-Style Comments in Your Product",
    markdown: `Empower your users to collaborate in-app with block-anchored inline comments, page-level stream comments, @mentions, and native notifications inside your docs, wikis, and note products.

## Three building blocks

### Inline comments on database entries
Anchor threaded comments to any row, field, or block inside your database views. Comments stay pinned as users edit, sort, and reorder, exactly like Notion.

### Stream comments on pages
Drop a stream comment composer into any doc or page. Users leave threaded comments, replies, and reactions on the right rail without leaving your product.

### Native notifications
Velt Comments and Notifications work together. In-app, email, and Slack notifications fire instantly whenever a teammate replies or @mentions them.

## Works with your editor

Velt anchors comments to any DOM element or document range. Works with custom block editors, Tiptap, BlockNote, Lexical, CodeMirror, SlateJS, and any HTML-based document UI.

[Get Free API Key](https://console.velt.dev/) · [Book Demo](${SITE_URL}/book-demo)`,
  },
  {
    url: `${SITE_URL}/tiptap-editor-comments`,
    title: "Tiptap Editor Comments",
    markdown: `Add production-grade commenting to Tiptap-based editors. Velt anchors comments to Tiptap nodes and selections, survives edits and formatting changes, and ships threaded replies, @mentions, and notifications out of the box.

## What's included

- Comment pins on any Tiptap node or selection
- Persistent anchoring across edits
- Side-panel and inline comment UI
- @mentions with notifications
- Email + Slack delivery
- Works in collaborative (multiplayer) Tiptap setups

[Get Free API Key](https://console.velt.dev/) · [View docs](${SITE_URL}/docs)`,
  },
  {
    url: `${SITE_URL}/knock-like-notifications`,
    title: "Knock Alternative: Build Notifications Fast",
    markdown: `Velt is a Knock alternative for teams that want in-app notifications, email, Slack, and webhooks, plus the rest of the collaboration stack (comments, recordings, presence) in one SDK.

## What ships

- In-app inbox UI
- Email templates with customization
- Slack and Teams delivery
- Webhooks for custom destinations
- Per-user notification preferences
- Notification analytics

## Why pick Velt over Knock

- Drop-in inbox UI (Knock requires you to build the UI)
- Bundled with the rest of the collaboration stack
- MAD-based pricing instead of MAU

[Get Free API Key](https://console.velt.dev/) · [Book Demo](${SITE_URL}/book-demo)`,
  },
  {
    url: `${SITE_URL}/migrate-from-cord-to-velt`,
    title: "Migrate from Cord to Velt",
    markdown: `Cord shut down in 2024. Velt is a drop-in replacement with a similar comment API plus the rest of the collaboration stack: notifications, recordings, presence, admin console.

## Migration in three steps

1. **Install**: \`npm install @veltdev/react\`. Wrap your app with VeltProvider, pass your existing user object.
2. **Swap components**: Replace Cord's CommentThread, ComposerWeb, etc. with Velt's equivalents. APIs are similar; most call sites need only a one-line change.
3. **Wire notifications**: Velt notifications work out of the box. Point your existing notification routing at Velt's webhooks.

Most Cord migrations take 1-3 days end-to-end. White-glove migration support is included for Growth and Enterprise customers.

[Book a migration call](${SITE_URL}/book-demo) · [Get Free API Key](https://console.velt.dev/)`,
  },
  {
    url: `${SITE_URL}/migrate-from-liveblocks-to-velt`,
    title: "Migrate from Liveblocks to Velt",
    markdown: `Move from Liveblocks primitives to Velt's full collaboration stack. Teams typically migrate to get ready-to-use UI for comments, notifications, recordings, and approvals, and to cut spend with MAD-based pricing.

## Why teams migrate

- **Drop-in UI** instead of building components on top of primitives
- **More features**: recordings, admin console, approval workflows, email/Slack notifications
- **Lower bill**: MAD pricing is typically ~5x cheaper than MAR for the same workload

## Migration in three steps

1. **Install Velt** alongside Liveblocks, they can coexist during the migration.
2. **Replace components** one feature at a time. Comments and notifications first, then presence, then storage.
3. **Cut over**: remove Liveblocks and reconcile any custom UI you built.

Most migrations finish in 1-2 weeks. White-glove migration support is included for Growth and Enterprise.

[Book a migration call](${SITE_URL}/book-demo) · [Get Free API Key](https://console.velt.dev/)`,
  },
  // ---------------------------------------------------------------------------
  // Lower-priority but still public pages: included so every route in app/
  // has a .md sibling. Kept terse; the HTML pages hold the full content.
  // ---------------------------------------------------------------------------
  {
    url: `${SITE_URL}/book-demo`,
    title: "Book a Velt Demo",
    markdown: `Schedule a 30-minute walkthrough with the Velt team. We'll go through your use case, show a live demo, and answer pricing, security, and integration questions.

## What to expect

- Live demo of the feature(s) most relevant to your product
- Architecture overview and integration guidance
- Pricing walkthrough: MAD-based pricing, volume discounts, startup discounts
- Q&A on security, compliance (SOC 2 Type II, HIPAA), and self-hosting

[Book a slot](${SITE_URL}/book-demo) · [Get Free API Key](https://console.velt.dev/)`,
  },
  {
    url: `${SITE_URL}/careers`,
    title: "Careers at Velt",
    markdown: `Velt is hiring engineers and designers to build the collaboration infrastructure layer for AI-generated work. Small team, high ownership, sub-week ship cycles, used by Google, Pendo, Runway, and others.

## Why join

- Ship to dozens of B2B SaaS customers with millions of MAUs collectively
- Work on real-time infrastructure, CRDTs, multiplayer UI, and developer tooling
- Backed by top investors; profitable revenue, sustainable growth

## Open roles

Roles update frequently. See the live list at ${SITE_URL}/careers.

[See open roles](${SITE_URL}/careers)`,
  },
  {
    url: `${SITE_URL}/consult`,
    title: "Velt Solutions Consult",
    markdown: `Book a paid solutions consult with the Velt team. We work directly with your engineers to architect, prototype, and ship collaboration features inside your product.

## What we deliver

- Architecture review of your existing app
- Working prototype using Velt SDK + your data model
- Custom UI build assistance: React, Next.js, Angular, Vue, vanilla JS
- Help with auth, permissions, real-time scaling, and notifications

## Who this is for

Teams with a tight ship date or an unusual use case (custom editors, regulated industries, embedded iframes, Chrome extensions, mobile WebViews) who want our engineers in the room.

[Book a consult](${SITE_URL}/consult)`,
  },
  {
    url: `${SITE_URL}/yc`,
    title: "Velt for Y Combinator Companies",
    markdown: `Special Velt offering for Y Combinator companies. Active YC batches and YC alumni get access to discounted Growth plans, white-glove onboarding, and a dedicated Slack channel with the founding team.

## What's included

- Discounted Growth plan pricing
- Free integration support: we'll pair with your engineers on the first build
- Direct line to the Velt founders
- Priority feature requests

[Apply](${SITE_URL}/yc) · [Book a Demo](${SITE_URL}/book-demo)`,
  },
  {
    url: `${SITE_URL}/thank-you`,
    title: "Thanks for Reaching Out",
    markdown: `Thanks for getting in touch with Velt. We've received your submission and a team member will follow up within one business day.

## While you wait

- [Read the docs](${SITE_URL}/docs)
- [Get a free API key](https://console.velt.dev/) and start building
- [Browse customer stories](${SITE_URL}/customers)
- [See the full feature list](${SITE_URL}/features)`,
  },
  {
    url: `${SITE_URL}/privacy`,
    title: "Velt Privacy Policy",
    markdown: `Velt's Privacy Policy explains how Velt collects, uses, stores, and protects personal information from users of the Velt SDK and the velt.dev marketing site.

## Topics covered

- What personal information Velt collects (account data, usage telemetry, integration data passed through the SDK)
- How that information is used (service operation, support, billing, product improvement)
- Third-party processors (cloud hosting, analytics, payment processing, customer support)
- User rights under GDPR and CCPA (access, deletion, correction, portability)
- Data retention and deletion timelines
- Contact information for privacy requests (privacy@velt.dev)

The full text of the Privacy Policy is the canonical legal document; see ${SITE_URL}/privacy for the authoritative version.`,
  },
  {
    url: `${SITE_URL}/terms`,
    title: "Velt Terms of Service",
    markdown: `Velt's Terms of Service govern your use of the Velt SDK, dashboard, APIs, and marketing site.

## Topics covered

- Acceptance of terms and account eligibility
- Service description and acceptable use
- Subscription, billing, and refunds
- Customer data ownership and license to Velt to operate the service
- Intellectual property and trademarks
- Confidentiality
- Warranty disclaimers and limitation of liability
- Indemnification
- Termination and survival
- Governing law and dispute resolution

The full text of the Terms of Service is the canonical legal document; see ${SITE_URL}/terms for the authoritative version.`,
  },
];

const STATIC_BY_PATH: Map<string, PageMarkdown> = new Map(
  STATIC_PAGES.map((p) => [urlPath(p.url), p])
);

function urlPath(url: string): string {
  try {
    const u = new URL(url);
    let p = u.pathname;
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p;
  } catch {
    return url;
  }
}

// Pages explicitly excluded from the LLM endpoints (privacy/legal,
// transactional, or low-content placeholders).
// Paths we will never serve as markdown: Sanity Studio admin UI and the
// internal /api/* namespace. Everything else in app/ gets a .md endpoint.
const EXCLUDED_PATHS = new Set<string>(["/studio"]);

function isExcludedPath(path: string): boolean {
  if (EXCLUDED_PATHS.has(path)) return true;
  return (
    path.startsWith("/studio/") ||
    path.startsWith("/api/") ||
    path.startsWith("/_next/")
  );
}

// ---------------------------------------------------------------------------
// Index-page builders (listings)
// ---------------------------------------------------------------------------

async function blogIndexMarkdown(): Promise<PageMarkdown> {
  const posts = (await getAllBlogPosts().catch(() => [])) as Array<{
    slug: string;
    title: string;
    description?: string;
    publishedAt?: string;
  }>;
  const lines: string[] = [
    "All Velt blog posts: guides, comparisons, tutorials, product updates, and thought leadership on collaboration, real-time infrastructure, and developer tooling.",
    "",
    "## Posts",
  ];
  for (const post of posts) {
    if (!post?.slug || !post?.title) continue;
    const desc = post.description ? `: ${clean(post.description)}` : "";
    lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug})${desc}`);
  }
  return {
    url: `${SITE_URL}/blog`,
    title: "Velt Blog",
    markdown: lines.join("\n"),
  };
}

async function librariesIndexMarkdown(): Promise<PageMarkdown> {
  const [v2Libs, v1Libs] = await Promise.all([
    getAllLibrariesV2().catch(() => []) as Promise<
      Array<{ slug?: string; name?: string; beta?: boolean }>
    >,
    getAllLibraryPages().catch(() => []) as Promise<
      Array<{ slug: string; title: string; tagline?: string }>
    >,
  ]);
  const lines: string[] = [
    "Add comments, co-editing, presence, and agent review to any editor, grid, canvas, or chart, for your users and your AI agents, or bring your own surface. Each library anchors Velt's review primitives to the surface you already render.",
    "",
    "## Libraries",
  ];
  const seen = new Set<string>();
  for (const lib of v2Libs) {
    if (!lib?.slug || !lib?.name || seen.has(lib.slug)) continue;
    seen.add(lib.slug);
    const tag = lib.beta ? " (beta)" : "";
    lines.push(`- [${lib.name}${tag}](${SITE_URL}/libraries/${lib.slug})`);
  }
  for (const lib of v1Libs) {
    if (!lib?.slug || !lib?.title || seen.has(lib.slug)) continue;
    seen.add(lib.slug);
    const tag = lib.tagline ? `: ${clean(lib.tagline)}` : "";
    lines.push(`- [${lib.title}](${SITE_URL}/libraries/${lib.slug})${tag}`);
  }
  return {
    url: `${SITE_URL}/libraries`,
    title: "Velt Libraries",
    markdown: lines.join("\n"),
  };
}

async function demosIndexMarkdown(): Promise<PageMarkdown> {
  const demos = (await getAllDemoPages().catch(() => [])) as Array<{
    slug: string;
    title: string;
    appName?: string;
    category?: string;
  }>;
  const lines: string[] = [
    "Live demo gallery: interactive product demos showing how Velt powers collaboration in real applications.",
    "",
    "## Demos",
  ];
  for (const demo of demos) {
    if (!demo?.slug || !demo?.title) continue;
    const meta = [demo.appName, demo.category].filter(Boolean).join(", ");
    const suffix = meta ? `: ${meta}` : "";
    lines.push(`- [${demo.title}](${SITE_URL}/demos/${demo.slug})${suffix}`);
  }
  return {
    url: `${SITE_URL}/demos`,
    title: "Velt Demos",
    markdown: lines.join("\n"),
  };
}

async function useCaseIndexMarkdown(): Promise<PageMarkdown> {
  const cases = (await getAllUseCasePages().catch(() => [])) as Array<{
    slug: string;
    title: string;
    tagline?: string;
  }>;
  const lines: string[] = [
    "Use-case pages explore how teams in specific verticals (video editing, design tools, data platforms, and more) use Velt to add collaboration.",
    "",
    "## Use cases",
  ];
  for (const c of cases) {
    if (!c?.slug || !c?.title) continue;
    const tag = c.tagline ? `: ${clean(c.tagline)}` : "";
    lines.push(`- [${c.title}](${SITE_URL}/use-case/${c.slug})${tag}`);
  }
  return {
    url: `${SITE_URL}/use-case`,
    title: "Velt Use Cases",
    markdown: lines.join("\n"),
  };
}

// Sanity-only integration listing: there's no getAllIntegrationPages helper
// today, so we fetch the slugs and pull title + tagline + category for each.
type IntegrationListItem = {
  slug: string;
  name?: string;
  category?: string;
  tagline?: string;
};

async function getAllIntegrationsList(): Promise<IntegrationListItem[]> {
  // Exclude drafts (Sanity stores draft revisions as drafts.<id>); otherwise
  // each integration shows up twice: once for the published doc, once for
  // the draft. getAllIntegrationSlugs() has the same shape; if you need to
  // dedupe further, normalize on slug.current.
  return client.fetch<IntegrationListItem[]>(
    `*[_type == "integrationPage" && defined(slug.current) && !(_id in path("drafts.**"))] | order(name asc) {
      "slug": slug.current, name, category, tagline
    }`
  );
}

async function integrationsIndexMarkdown(): Promise<PageMarkdown> {
  const items = await getAllIntegrationsList().catch(() => []);
  // The Sanity dataset currently contains multiple documents per integration
  // slug (one from each seed-script run, plus drafts). The published per-slug
  // detail page is resolved via getIntegrationPageBySlug([0]); we replicate
  // that "first-wins" behavior here so the index matches what /integrations/x
  // actually renders.
  const bySlug = new Map<string, IntegrationListItem>();
  for (const item of items) {
    if (!item?.slug || !item?.name) continue;
    if (!bySlug.has(item.slug)) bySlug.set(item.slug, item);
  }
  const lines: string[] = [
    "Velt connects to the tools your team already uses: Slack, Discord, Microsoft Teams, HubSpot, Zapier, Sendgrid, Resend, Segment, and more. Each integration ships with a working drop-in flow you can configure from the Velt dashboard.",
    "",
    "## Integrations",
  ];
  for (const item of bySlug.values()) {
    const meta = [item.category, item.tagline]
      .map((s) => clean(s ?? ""))
      .filter(Boolean)
      .join(": ");
    const suffix = meta ? `: ${meta}` : "";
    lines.push(
      `- [${item.name}](${SITE_URL}/integrations/${item.slug})${suffix}`
    );
  }
  return {
    url: `${SITE_URL}/integrations`,
    title: "Velt Integrations",
    markdown: lines.join("\n"),
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Look up the markdown representation of any marketing-site URL path. Returns
 * null for unknown paths, excluded paths (legal, transactional), or Sanity
 * docs that 404. The handler is async because Sanity-backed pages require a
 * fetch.
 *
 * @param rawPath - URL path with leading slash, e.g. "/pricing" or "/blog/x".
 */
export async function getPageMarkdown(rawPath: string): Promise<PageMarkdown | null> {
  let path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path === "" || path === "/") {
    const home = STATIC_BY_PATH.get("/");
    if (!home) return null;
    return { ...home, markdown: stripCtas(home.markdown) };
  }
  if (isExcludedPath(path)) return null;

  // Static-page registry first (covers /pricing, /enterprise, etc.)
  const staticMatch = STATIC_BY_PATH.get(path);
  if (staticMatch) return { ...staticMatch, markdown: stripCtas(staticMatch.markdown) };

  // Index pages: dynamically built from Sanity data
  try {
    if (path === "/blog") return await blogIndexMarkdown();
    if (path === "/libraries") return await librariesIndexMarkdown();
    if (path === "/demos") return await demosIndexMarkdown();
    if (path === "/use-case") return await useCaseIndexMarkdown();
    if (path === "/integrations") return await integrationsIndexMarkdown();
  } catch {
    return null;
  }

  // Sanity-backed nested routes
  const segments = path.split("/").filter(Boolean);
  try {
    if (segments[0] === "blog" && segments.length === 2) {
      return await blogPostMarkdown(segments[1]);
    }
    if (segments[0] === "demos" && segments.length === 2) {
      return await demoMarkdown(segments[1]);
    }
    if (segments[0] === "libraries" && segments.length === 2) {
      return (
        (await libraryV2Markdown(segments[1])) ??
        (await libraryMarkdown(segments[1]))
      );
    }
    if (segments[0] === "use-case" && segments.length === 2) {
      return await useCaseMarkdown(segments[1]);
    }
    if (segments[0] === "integrations" && segments.length === 2) {
      return await integrationMarkdown(segments[1]);
    }
    if (segments[0] === "migrate" && segments.length === 2) {
      return await migrationMarkdown(segments[1], path);
    }
    // Long-form migration landing routes share the same Sanity docs as
    // /migrate/cord and /migrate/liveblocks but live at a different URL.
    if (path === "/migrate-from-cord-to-velt") {
      return await migrationMarkdown("cord", path);
    }
    if (path === "/migrate-from-liveblocks-to-velt") {
      return await migrationMarkdown("liveblocks", path);
    }
    // Solution/vertical pages at /for/<slug>
    if (segments[0] === "for" && segments.length === 2) {
      const sol = await solutionMarkdown(segments[1]);
      if (sol) return { ...sol, markdown: stripCtas(sol.markdown) };
    }
    // Top-level dynamic feature pages (/comments, /notifications, etc.)
    // Try v2 first, fall back to v1 if not found.
    if (segments.length === 1) {
      const v2 = await featureV2Markdown(segments[0]);
      if (v2) return { ...v2, markdown: stripCtas(v2.markdown) };
      const v1 = await featureMarkdown(segments[0]);
      if (v1) return { ...v1, markdown: stripCtas(v1.markdown) };
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Build the ordered list of all marketing-site pages with markdown bodies.
 * Used by /llms-full.txt to concatenate the entire site. Sanity fetches
 * are individually try/caught: a single failing page doesn't kill the
 * whole response.
 */
export async function getAllPageMarkdowns(): Promise<PageMarkdown[]> {
  const results: PageMarkdown[] = [];

  // 1) Hand-curated priority order for static pages (top of the file)
  const priorityPaths = [
    "/",
    "/pricing",
    "/features",
    "/enterprise",
    "/comparison",
    "/customers",
    "/customization",
    "/liveblocks-alternative",
    "/launch-kit",
  ];
  for (const p of priorityPaths) {
    const md = STATIC_BY_PATH.get(p);
    if (md) results.push({ ...md, markdown: stripCtas(md.markdown) });
  }

  // 2) Static SEO/landing pages (lower priority)
  const seoPaths = [
    "/notion-like-comments",
    "/google-spreadsheets-like-comments",
    "/tiptap-editor-comments",
    "/knock-like-notifications",
    "/add-comments-quick",
    "/add-notifications-quick",
    "/add-recording-quick",
    "/migrate-from-liveblocks-to-velt",
    "/migrate-from-cord-to-velt",
  ];
  for (const p of seoPaths) {
    const md = STATIC_BY_PATH.get(p);
    if (md) results.push({ ...md, markdown: stripCtas(md.markdown) });
  }

  // 3) Index pages built from Sanity listings (includes /integrations)
  for (const builder of [
    blogIndexMarkdown,
    librariesIndexMarkdown,
    demosIndexMarkdown,
    useCaseIndexMarkdown,
    integrationsIndexMarkdown,
  ]) {
    try {
      results.push(await builder());
    } catch {
      // Skip silently: a Sanity outage shouldn't kill the whole file.
    }
  }

  // 4) Lower-priority static pages (transactional / legal). Emitted after
  //    the substantive content so LLMs prioritize product context first.
  const lowPriorityPaths = [
    "/book-demo",
    "/consult",
    "/yc",
    "/careers",
    "/thank-you",
    "/privacy",
    "/terms",
  ];
  for (const p of lowPriorityPaths) {
    const md = STATIC_BY_PATH.get(p);
    if (md) results.push({ ...md, markdown: stripCtas(md.markdown) });
  }

  // 5) Sanity-backed dynamic pages
  const [
    blogPosts,
    featureV2Slugs,
    featurePages,
    solutionSlugs,
    libraryPages,
    libraryV2Slugs,
    demoPages,
    useCasePages,
    migrationSlugs,
    integrationSlugs,
  ] = await Promise.all([
    getAllBlogPosts().catch(() => []),
    getAllFeatureV2Slugs().catch(() => [] as string[]),
    getAllFeaturePages().catch(() => []),
    getAllSolutionSlugs().catch(() => [] as string[]),
    getAllLibraryPages().catch(() => []),
    getAllLibraryV2Slugs().catch(() => [] as string[]),
    getAllDemoPages().catch(() => []),
    getAllUseCasePages().catch(() => []),
    client
      .fetch<string[]>(
        `*[_type == "migrationPage" && defined(slug.current)].slug.current`
      )
      .catch(() => [] as string[]),
    getAllIntegrationSlugs().catch(() => [] as string[]),
  ]);

  for (const post of blogPosts as Array<{ slug: string }>) {
    if (!post?.slug) continue;
    try {
      const md = await blogPostMarkdown(post.slug);
      if (md) results.push(md);
    } catch {
      // Skip failing post.
    }
  }
  // v2 feature pages (before v1 so v2 wins the URL de-dupe below)
  for (const slug of featureV2Slugs) {
    if (!slug) continue;
    try {
      const md = await featureV2Markdown(slug);
      if (md) results.push({ ...md, markdown: stripCtas(md.markdown) });
    } catch {
      // Skip.
    }
  }
  for (const feat of featurePages as Array<{ slug: string }>) {
    if (!feat?.slug) continue;
    const urlSlug = sanitySlugToUrl(feat.slug);
    try {
      const md = await featureMarkdown(urlSlug);
      if (md) results.push(md);
    } catch {
      // Skip.
    }
  }
  // /libraries serves v2-first with v1 fallback; enumerate the union once and
  // resolve each slug the same way the route does (v2 then v1).
  const allLibrarySlugs = new Set<string>([
    ...(libraryV2Slugs as string[]),
    ...(libraryPages as Array<{ slug: string }>)
      .map((lib) => lib?.slug)
      .filter((slug): slug is string => Boolean(slug)),
  ]);
  for (const slug of allLibrarySlugs) {
    try {
      const md = (await libraryV2Markdown(slug)) ?? (await libraryMarkdown(slug));
      if (md) results.push(md);
    } catch {
      // Skip.
    }
  }
  for (const demo of demoPages as Array<{ slug: string }>) {
    if (!demo?.slug) continue;
    try {
      const md = await demoMarkdown(demo.slug);
      if (md) results.push(md);
    } catch {
      // Skip.
    }
  }
  for (const uc of useCasePages as Array<{ slug: string }>) {
    if (!uc?.slug) continue;
    try {
      const md = await useCaseMarkdown(uc.slug);
      if (md) results.push(md);
    } catch {
      // Skip.
    }
  }
  // Migration pages: long-form variants live in STATIC_PAGES; only emit the
  // /migrate/{slug} canonical for additional vendors.
  const LONG_FORM = new Set(["cord", "liveblocks"]);
  for (const slug of migrationSlugs) {
    if (!slug || LONG_FORM.has(slug)) continue;
    try {
      const md = await migrationMarkdown(slug, `/migrate/${slug}`);
      if (md) results.push(md);
    } catch {
      // Skip.
    }
  }
  for (const slug of integrationSlugs) {
    if (!slug) continue;
    try {
      const md = await integrationMarkdown(slug);
      if (md) results.push(md);
    } catch {
      // Skip.
    }
  }
  // Solution/vertical pages at /for/<slug>
  for (const slug of solutionSlugs) {
    if (!slug) continue;
    try {
      const md = await solutionMarkdown(slug);
      if (md) results.push({ ...md, markdown: stripCtas(md.markdown) });
    } catch {
      // Skip.
    }
  }

  // De-dupe by URL: guards against any registry/sanity overlap.
  const seen = new Set<string>();
  const deduped = results.filter((r) => {
    if (seen.has(r.url)) return false;
    seen.add(r.url);
    return true;
  });

  // Final mirror-purity pass: strip CTA strings from every page type in one
  // place, so llms-full.txt stays CTA-free even for page types whose
  // serializers do not strip individually. stripCtas is idempotent.
  return deduped.map((r) => ({ ...r, markdown: stripCtas(r.markdown) }));
}
