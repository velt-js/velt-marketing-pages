import { libraryLogo, isWordmarkLibraryLogo, stackLinkLogo } from "./library-logos";
import type { GridCategory, GridItem } from "./content";

type IntegrationGridProps = {
  surfacesSubheader?: string;
  surfaceCategories: GridCategory[];
  buildWithIntro?: string;
  buildWithItems: GridItem[];
  agentsInsideIntro?: string;
  agentsInsideItems: GridItem[];
  stackLabel?: string;
  stackLinks: { label: string; group?: string; href?: string }[];
};

/**
 * Render a single integration chip. Surfaces and tools link to their spoke
 * (/integrations/{slug}) and carry a stable #slug anchor for deep links. The
 * name is always real HTML text so search and agents resolve it.
 * @param {GridItem} item The grid item.
 * @returns {JSX.Element} The chip.
 */
function Chip({ item }: { item: GridItem }) {
  const logo = libraryLogo(item.slug, item.logo);
  // Wordmark logos (name already in the image) render wide with no text label;
  // square icon marks keep icon + text. A CMS-provided logo is treated as an
  // icon (we only know the bundled wordmarks).
  const wordmark = Boolean(logo) && !item.logo && isWordmarkLibraryLogo(item.slug);
  return (
    <a id={item.slug} className="vintg-chip" href={`/libraries/${item.slug}`}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={wordmark ? "vintg-chip-logo vintg-chip-logo--wide" : "vintg-chip-logo"}
          src={logo}
          alt={wordmark ? item.name : ""}
          aria-hidden={wordmark ? undefined : "true"}
        />
      ) : null}
      {wordmark ? null : item.name}
      {item.beta ? <span className="vintg-chip-beta">beta</span> : null}
    </a>
  );
}

/**
 * Render a single "works with the rest of your stack" chip. Carries an optional
 * brand logo (resolved by label) before the always-present text label, matching
 * the surface/tool Chip styling. Renders as a link when an href is set, else a
 * static span.
 * @param {{ label: string; href?: string }} link The stack link.
 * @returns {JSX.Element} The stack chip.
 */
function StackChip({ link }: { link: { label: string; href?: string } }) {
  const logo = stackLinkLogo(link.label);
  const inner = (
    <>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="vintg-chip-logo" src={logo} alt="" aria-hidden="true" />
      ) : null}
      {link.label}
    </>
  );
  return link.href ? (
    <a className="vintg-chip" href={link.href}>
      {inner}
    </a>
  ) : (
    <span className="vintg-chip">{inner}</span>
  );
}

/**
 * Group the stack links by their `group` label, preserving first-seen order.
 * @param {Array<{ label: string; group?: string; href?: string }>} links Stack links.
 * @returns {Array<{ group: string; links: Array<{ label: string; href?: string }> }>} Grouped links.
 */
function groupStackLinks(
  links: { label: string; group?: string; href?: string }[],
) {
  try {
    const order: string[] = [];
    const map = new Map<string, { label: string; href?: string }[]>();
    for (const link of links) {
      const group = link.group ?? "Other";
      if (!map.has(group)) {
        map.set(group, []);
        order.push(group);
      }
      map.get(group)?.push({ label: link.label, href: link.href });
    }
    return order.map((group) => ({ group, links: map.get(group) ?? [] }));
  } catch (error) {
    console.error("groupStackLinks failed", error);
    return [];
  }
}

/**
 * The three labeled integration bands (surfaces by category, build-with-Velt,
 * agents-inside-Velt) plus the "works with the rest of your stack" link band.
 * @param {IntegrationGridProps} props Grid content (derived from the roster).
 * @returns {JSX.Element} The grid.
 */
export default function IntegrationGrid({
  surfacesSubheader,
  surfaceCategories,
  buildWithIntro,
  buildWithItems,
  agentsInsideIntro,
  agentsInsideItems,
  stackLabel,
  stackLinks,
}: IntegrationGridProps) {
  const stackGroups = groupStackLinks(stackLinks);

  return (
    <div className="vintg-gridwrap">
      {/* Band 1: surfaces — one bordered card per category */}
      {surfacesSubheader ? (
        <p className="vintg-band-label">{surfacesSubheader}</p>
      ) : null}
      <div className="vintg-surfgrid">
        {surfaceCategories.map((category, index) => (
          <div
            key={category.key}
            className={
              index === 0 ? "vintg-bandcard vintg-bandcard--wide" : "vintg-bandcard"
            }
          >
            <p className="vintg-catgroup-label">{category.label}</p>
            <div className="vintg-chips">
              {category.items.map((item) => (
                <Chip key={item.slug} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bands 2 + 3: build with Velt + agents inside Velt */}
      {buildWithItems.length > 0 || agentsInsideItems.length > 0 ? (
        <div className="vintg-bandrow">
          {buildWithItems.length > 0 ? (
            <div className="vintg-bandcard">
              <p className="vintg-catgroup-label">Build with Velt</p>
              {buildWithIntro ? (
                <p className="vintg-band-intro">{buildWithIntro}</p>
              ) : null}
              <div className="vintg-chips">
                {buildWithItems.map((item) => (
                  <Chip key={item.slug} item={item} />
                ))}
              </div>
            </div>
          ) : null}
          {agentsInsideItems.length > 0 ? (
            <div className="vintg-bandcard">
              <p className="vintg-catgroup-label">Agents inside Velt</p>
              {agentsInsideIntro ? (
                <p className="vintg-band-intro">{agentsInsideIntro}</p>
              ) : null}
              <div className="vintg-chips">
                {agentsInsideItems.map((item) => (
                  <Chip key={item.slug} item={item} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Band 4: works with the rest of your stack (static feature-page links) */}
      {stackGroups.length > 0 ? (
        <div className="vintg-bandcard">
          <p className="vintg-catgroup-label">
            {stackLabel ?? "Works with the rest of your stack"}
          </p>
          <div className="vintg-stackgrid">
            {stackGroups.map((group) => (
              <div key={group.group}>
                <p className="vintg-stack-grouplabel">{group.group}</p>
                <div className="vintg-chips">
                  {group.links.map((link) => (
                    <StackChip key={link.label} link={link} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
