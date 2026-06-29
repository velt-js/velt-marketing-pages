# Design Specification

Homepage reference implementation: `components/home-new/` (scoped under `.vlp` on `/`).  
Canonical tokens live in `components/home-new/styles.css` as `--vlp-*` CSS variables.

## 1. Typography

Editorial developer-tool aesthetic: warm neutrals, crisp sans-serif hierarchy, and monospace metadata.

### Font Families

| Role | Font | Token | Usage |
|------|------|-------|-------|
| Body | Inter Tight | `--vlp-font-body` | Paragraphs, UI copy, nav links |
| Headings & CTAs | Urbanist | `--vlp-font-heading` | `h1`–`h4`, buttons, proof card quotes, accent lines (e.g. How It Works tagline) |
| Labels & metadata | Geist Mono | `--vlp-font-mono` | Section eyebrows, chips, attribution, footer column labels |

### Capitalization

- Headings: sentence case
- Navigation links: sentence case
- Buttons: sentence case
- Section eyebrows and small labels: all-caps (mono, tracked)

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `--vlp-text-hero` | 62px | Hero title |
| `--vlp-text-section` | 36px | Section headings |
| `--vlp-text-card` | 24px | Card titles |
| `--vlp-text-quote` | 32px | Featured proof headline |
| `--vlp-text-cta` | 54px | Final CTA headline |
| `--vlp-text-body-lg` | 18px | Hero subcopy, large quotes |
| `--vlp-text-body` | 16px | Standard body |
| `--vlp-text-label` | 14px | Nav links, secondary UI |
| `--vlp-text-tag` | 12px | Eyebrows, small labels |
| `--vlp-text-micro` | 10px | Chips, proof badges |

### Font Weights

- **700** — badge labels, emphasis
- **600** — section headings (`h1`–`h4`), button text
- **500** — card quotes, medium UI
- **400** — body text, hero title (light weight for display scale)

### Line Heights

- `--vlp-leading-display-tight` (1.02) — hero title
- `--vlp-leading-snug` (1.08) — section headings
- `--vlp-leading-body` (1.5) — paragraphs
- `1.4` — proof small-card quotes

### Letter Spacing

- `--vlp-tracking-tight` (-0.03em) — hero title
- `--vlp-tracking-snug` (-0.02em) — section headings
- `--vlp-tracking-eyebrow` (0.06em) — all-caps mono labels
- `--vlp-tracking-mono` (0.04em) — compact mono metadata

## 2. Colors

Warm editorial palette dominated by ink and cream, with orange as the primary brand accent. Purple and neon cursor colors are reserved for collaboration UI demos, not page chrome.

### Core Palette

| Token | Value | Role |
|-------|-------|------|
| `--vlp-color-ink` | `#26251e` | Primary text, dark surfaces, primary button fill |
| `--vlp-color-ink-soft` | `#3a3934` | Dark outline buttons |
| `--vlp-color-cream` | `#f7f7f4` | Alt section background, text on dark |
| `--vlp-color-white` | `#ffffff` | Page background, cards |
| `--vlp-color-accent` | `#f54e00` | Brand orange — eyebrows, highlights, badges, links |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--vlp-color-text` | ink | Primary text on light |
| `--vlp-color-text-muted` | `#7a7974` | Body secondary |
| `--vlp-color-text-subtle` | `#a1a19f` | Tertiary copy |
| `--vlp-color-text-faint` | `#8f8e89` | Attribution, de-emphasized |
| `--vlp-color-text-on-dark` | cream | Text on dark sections |
| `--vlp-color-text-strong` | `rgba(0,0,0,0.65)` | Uppercase badge labels |

### Surfaces & Borders

| Token | Usage |
|-------|-------|
| `--vlp-bg-page` | White page default |
| `--vlp-bg-section-alt` / `--vlp-color-cream` | Alternating section fill |
| `--vlp-bg-card` | White card on cream/white |
| `--vlp-bg-card-dark` | Ink cards (proof anchor, enterprise, final CTA) |
| `--vlp-border-default` | `#d9d5cf` — card and section borders |
| `--vlp-border-on-dark` | `rgba(255,255,255,0.12)` — dividers on dark cards |

### Collaboration Accents (UI demos only)

Used inside product mockups — cursors, presence, threads — not for marketing chrome:

- Purple `#625DF5`, pink `#E934BF`, green `#0D9A5D`, orange `#FF7162`, yellow `#FFCD2E`, teal, amber, blue

## 3. Theme

Light-first editorial layout with cream/white rhythm and selective dark anchor sections.

- **Mode:** predominantly light
- **Contrast:** ink on cream/white; cream text on ink for dark sections
- **Accent:** orange dot + mono eyebrow on every major section
- **Not used:** full-page black hero, purple primary CTAs, zebra black/white alternation

### Section Backgrounds (homepage order)

| Section | Background |
|---------|------------|
| Nav | Frosted white (`rgba(255,255,255,0.82)` + blur) |
| Hero | White |
| Trust strip | White |
| Problem | Cream |
| Why Now | White |
| Primitives | Cream |
| Collaboration | White |
| How It Works | Cream (top/bottom border) |
| Integrations | White |
| Enterprise | Ink (dark) |
| Verticals | White |
| FAQ | Cream |
| Proof | White |
| Final CTA | Ink (dark) |
| Footer | White |

## 4. Spacing

Spacious vertical rhythm on an **8px base unit**. Prefer tokens over raw pixel values.

### Key Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--vlp-content-max` | 1200px | Page max width |
| `--vlp-gutter` | 32px | Horizontal page padding |
| `--vlp-space-20` | 80px | Standard section padding (vertical) |
| `--vlp-space-30` | 120px | Hero/problem large sections |
| `--vlp-gap-card` | 16px | Card grids, column gaps |
| `--vlp-gap-section` | 48px | Internal section spacing |
| `--vlp-card-padding` | 22px | Default card padding |
| `--vlp-card-padding-lg` | 32px | Featured/dark cards |

### Content Widths

- `--vlp-content-narrow` (640px) — section intros
- `--vlp-content-medium` (880px) — final CTA
- `--vlp-content-prose` (460px) — problem/checklist columns

## 5. Navigation

Sticky top bar with frosted glass treatment — always light, no dark-mode swap.

- **Position:** sticky, `z-index: 50`
- **Background:** semi-transparent white + `saturate(180%) blur(12px)`
- **Border:** 1px `--vlp-border-default` bottom
- **Layout:** logo left · links center-left · Sign In + CTA right
- **Link style:** 14px Inter Tight, muted gray, sentence case
- **CTA:** ink fill, cream text, Urbanist semibold, compact padding (`9px 18px`)

## 6. Background & Decoration

- **Page:** solid white/cream — no hero grid or glow effects
- **Section separation:** background color shifts and subtle 1px borders (e.g. How It Works)
- **Eyebrow motif:** 6px orange dot + mono all-caps label precedes every section heading
- **Product demos:** simulated UI inside bordered cards; marching-ants dashed connectors in timeline sections
- **Logo carousels:** horizontal marquee with edge fade mask; pause on hover

## 7. Content Layout

Grid-heavy, left-aligned intros with modular cards. Center alignment reserved for final CTA and select footer elements.

### Layout Patterns

#### Hero (2-column)

Copy left (badges, title, sub, dual CTAs) · live product artifact right.  
Title at 62px, regular weight, tight line-height.

#### Problem (split)

Fixed-width heading column left · checklist column right. Cream background, generous 120px padding.

#### Primitives / Collaboration

Section intro (narrow max-width) + card grid or tabbed demo below.

#### How It Works

Cream band with bordered timeline; step cards on alternating sides of a dashed spine.

#### Integrations

3-column category cards; each card holds cream tag chips with logo + label.

#### Proof

1.4fr dark anchor card + 1fr stack of three light quote cards. Logo marquee below.

#### Enterprise / Final CTA

Full-width ink sections; 2-column or centered layouts respectively.

## 8. Visual Style & Imagery

Technical, editorial tone using live UI simulations — no illustration library.

- **Illustrations:** none; product UI mockups demonstrate features directly
- **Icons:** Tabler for UI chrome; brand SVGs at native colors for integrations
- **Integration logos:** 16px (`--vlp-integ-logo-size`), `object-fit: contain`, explicit path fills in SVGs (root `fill` alone renders black via `<img>`)
- **Wordmarks with embedded text** (Tiptap, Resend, Customer.io): use icon-only asset + separate text label
- **Logo carousels:** muted gray silhouettes on light backgrounds (`LogoCarousel` invert filter)
- **Photography:** avatar initials in colored circles for testimonials
- **Tone:** developer-first, precise, editorial

## 9. Social Proof & Testimonials

Proof section combines one anchor case study with supporting quote cards and a logo bar.

### Anchor Card (dark)

- Ink background, cream text
- Header: company name left · orange mono badge right (`justify-content: space-between`)
- Headline: 32px Urbanist (inherits from `h3`)
- Body: muted subtle gray
- Stats row: 3-column grid with hairline dividers

### Small Quote Cards (light)

- White card, 1px border, 8px radius
- Label: mono, 10px, all-caps, orange (`FEATURE LAUNCHED · TRUMPET`)
- Tagline: **Urbanist** 20px medium (e.g. “Days, not quarters.”)
- Attribution: mono, muted gray (`Name · Role`)

### Logo Bars

- Trust strip: compact stat + marquee below hero
- Proof: wide-gap marquee (`--vlp-logo-gap: 72px`) below cards

## 10. Buttons & Interactive Elements

Rectangular buttons with **4px radius** (`--vlp-radius-md`) — not full pills. All CTAs use **Urbanist semibold**.

### Variants

| Variant | Background | Text | Border | Context |
|---------|------------|------|--------|---------|
| Primary filled | `--vlp-color-ink` | cream | none | Hero, nav CTA, section CTAs |
| Secondary outline | transparent | ink | 1px ink | Hero secondary on light |
| Light (inverted) | white | ink | none | CTAs on dark sections |
| Outline on dark | transparent | cream | 1px ink-soft | Secondary on dark sections |
| Compact / muted | transparent | muted | 1px border-default | Demo UI actions |

### Sizing

- Large: `12px 22px` padding, 15px type (hero, primary section CTAs)
- Medium: `11px 20px`, 14px type (nav CTA)
- Small: `9px 18px` (compact placements)

### Hover States

Global utility classes on `.vlp`: `.hl` (accent text), `.hcard` (lift + ink border), `.hdark` (darker fill), `.hfade`, `.houtline`, `.hsoft`.

## 11. Text Alignment & Content Width

- **Default:** left-aligned section intros and card content
- **Centered:** final CTA block, some footer elements
- **Max width:** 1200px (`--vlp-content-max`), centered with auto margins
- **Intro blocks:** capped at 640px for readable measure

## 12. Implementation Notes

### Scoping

All homepage styles are scoped under `.vlp` in `components/home-new/styles.css`. Section-specific rules live in sibling CSS files (e.g. `Hero.css`, `Proof.css`).

### Fonts (Google Fonts)

Loaded on the homepage in `app/page.tsx`:

```
Geist Mono, Inter Tight, Urbanist
```

### Cards & Chips

- Card radius: 8px (`--vlp-radius-card`)
- Card border: 1px `--vlp-border-default`
- Accent chip: mono text, orange border (`--vlp-chip-border-accent`), 4px radius

### When Adding New Sections

1. Use the standard eyebrow pattern (orange dot + mono label)
2. Section heading: 36px Urbanist, regular weight, snug tracking
3. Body: Inter Tight 16px, muted secondary color
4. Pull tokens from `styles.css` — do not hardcode hex values
5. CTAs: ink primary on light sections; light/outline variants on dark sections
